import { GameConfig } from "../../config/GameConfig";
import { EDressUpType, EModule_Events, EModule_Events_S } from "../../const/Enum";
import { EventManager } from "../../tool/EventManager";
import { EquipManager } from "../EquipModule/EquipManager";


@Component
export default class DressUpSync extends mw.Script {

    /** 当前绑定的玩家id */
    @Property({ replicated: true, multicast: true, onChanged: "client_call_pId" })
    public currentPlayerId: number = 0;

    /** 当前外观guid */
    @Property({ replicated: true, multicast: true, onChanged: "client_call_curDescGuid" })
    public curDescGuid: string = "";

    /** 挂件 */
    @Property({ replicated: true, multicast: true, onChanged: "client_call_pendantId" })
    private _pendantId: number = 0;

    /** 装扮倒计时 */
    @Property({ replicated: true, onChanged: "client_call_countdown" })
    private _countdown: number = 0;

    /** 之前的外观guid */
    private _preDescGuid: string = "";

    /** 特效id */
    private _effectIds: number[] = [];

    /** 默认形象的外观 */
    private _defaultDesc: CharacterDescription = null;

    /** 计时用 */
    private _refreshRrequency: number = 0;

    /** 在变身前，玩家指定部位的挂件 */
    private _beforeDressUpPendantIdMap: Map<number, number[]> = new Map();

    /** 当前换装类型 */
    private _dressUpType: EDressUpType = EDressUpType.v2;

    /** 默认姿态 */
    private _defaultStance: Stance = null;

    /** 变身对应的姿态 */
    private _stanceMap: Map<string, Stance> = new Map();

    protected onStart(): void {
        this.useUpdate = SystemUtil.isServer();
    }

    protected onUpdate(dt: number): void {
        this.dressUpCountdown(dt);
    }

    /**
     * 当前玩家外观guid
     */
    private client_call_curDescGuid() {
        if (this._preDescGuid == this.curDescGuid) {
            this._preDescGuid = this.curDescGuid;
            return;
        }
        this._preDescGuid = this.curDescGuid;
        this.update_appearance();
    }

    /**
     * 当前玩家挂件id改变
     * @param path 无用，不填的话拿不到后面两个值
     * @param newPendantId 修改后的挂件id
     * @param oldPendantId 修改前的挂件id
     */
    private client_call_pendantId(path: string[], newPendantId: number, oldPendantId: number) {
        if (oldPendantId != 0) {
            //卸下变装的挂件
            EventManager.instance.call(EModule_Events.equip_removePendant, this.currentPlayerId, oldPendantId);
        } else {
            //记录下这个部位最初的挂件，时间到了用于还原
            const config = GameConfig.AppearancePendant.getElement(newPendantId);
            if (config) {
                let pendants = this._beforeDressUpPendantIdMap.get(this.currentPlayerId);
                if (!pendants) {
                    pendants = []
                    this._beforeDressUpPendantIdMap.set(this.currentPlayerId, pendants);
                }

                const originlaPendants = EquipManager.instance.getPendantFromSlot(this.currentPlayerId, config.slot);
                if (originlaPendants && originlaPendants.length > 0) {
                    //卸下挂件并进行记录
                    for (let i = 0; i < originlaPendants.length; i++) {
                        EventManager.instance.call(EModule_Events.equip_removePendant, this.currentPlayerId, originlaPendants[i]);
                        pendants.push(originlaPendants[i]);
                    }
                }
                // console.error(`rkc--------------记录，${this.currentPlayerId}原本的挂件：${pendants}`);
            }
        }
        if (newPendantId != 0) {
            //替换挂件
            EventManager.instance.call(EModule_Events.equip_addPendant, this.currentPlayerId, newPendantId);
        } else {
            //替换为变身前的挂件（如果有的话）
            let pendants = this._beforeDressUpPendantIdMap.get(this.currentPlayerId);
            if (pendants && pendants.length > 0) {
                //恢复
                for (let i = 0; i < pendants.length; i++) {
                    EventManager.instance.call(EModule_Events.equip_addPendant, this.currentPlayerId, pendants[i]);
                }
            }
            // console.error(`rkc--------------恢复原来的挂件：${pendants}`);
            pendants.length = 0;
        }
    }

    /**
     * 更新客户端的倒计时
     */
    private client_call_countdown() {

        // tserror:属性同步回调的 玩家对象不可信判空下
        if (Player.localPlayer == null) {
            return;
        }
        if (this.currentPlayerId != Player.localPlayer.playerId) return;
        EventManager.instance.call(EModule_Events.land_dressUp_countdown, this._countdown);
    }

    /**
     * 更新形象
     * @returns 
     */
    private async update_appearance() {
        //默认平台的形象，不用改变
        if (this.curDescGuid != "" || this.currentPlayerId != Player.localPlayer.playerId) {
            return;
        }
        let character = Player.localPlayer.character;
        if (character == null) {
            return;
        }
        // 平台形象
        mw.AccountService.downloadData(character, () => { });
    }

    /**----------------------------------------服务器--------------------------------------------------- */

    /**
     * 服务器初始化
     * @param playerId 玩家id
     */
    public async server_init(playerId: number) {
        this.currentPlayerId = playerId;
        let player = await Player.asyncGetPlayer(this.currentPlayerId);
        if (player == null) {
            return;
        }
        let character = player.character;
        await character.asyncReady();
        this._defaultDesc = character.getDescription();
        this._defaultStance = character.currentStance;
    }

    /**
     * 服务器设置玩家的形象id
     * @param descGuid 新的形象id
     */
    public server_setDescGuid(descGuid: string, stance: string = "", descType: EDressUpType = EDressUpType.v2) {
        this.curDescGuid = descGuid;
        this.refresh_appearance(stance, descType);
    }

    /**
     * 刷新玩家外观
     */
    private async refresh_appearance(stance: string = "", descType: EDressUpType = EDressUpType.v2) {
        let player = await Player.asyncGetPlayer(this.currentPlayerId);
        if (player == null) {
            return;
        }
        if (this._preDescGuid == this.curDescGuid && this.curDescGuid != "") {
            return;
        }
        if (this.curDescGuid == "") {
            this._preDescGuid = this.curDescGuid;
            if (this._defaultDesc) {
                //恢复默认
                let character = player.character;
                if (character) {
                    await character?.asyncReady();
                    character?.clearDescription(true, true);
                    if (this._dressUpType == EDressUpType.v2) {
                        character?.setDescription(this._defaultDesc);
                    }
                    else {
                        character.description.base.wholeBody = this._defaultDesc.base.wholeBody;
                    }
                    this._defaultStance.play();
                }
            }
            return;
        }
        this._preDescGuid = this.curDescGuid;
        this._dressUpType = descType;
        let character = player.character;
        if (character) {
            await character?.asyncReady();
            //刷新外观
            character?.clearDescription(true, true);
            if (descType == EDressUpType.v2) {
                character?.setDescription([this.curDescGuid]);
            }
            else {
                character.description.base.wholeBody = this.curDescGuid;
            }
            if (!stance) return;
            if (this._stanceMap.has(stance)) {
                this._stanceMap.get(stance).play();
            }
            else {
                let tmp = character.loadStance(stance);
                tmp.play();
                this._stanceMap.set(stance, tmp);
            }

        }
    }

    /**
     * 服务器设置玩家的挂件id
     * @param pendentId 新挂件id
     */
    public server_setPendentId(pendentId: number) {
        this._pendantId = pendentId;
    }

    /**
     * 倒计时
     * @param cd 倒计时
     */
    public server_setCountdown(cd: number) {
        this._countdown = cd;
    }

    /**
     * 装扮倒计时
     * @param dt 
     */
    private dressUpCountdown(dt: number) {
        this._refreshRrequency += dt;
        if (this._refreshRrequency >= 0.1) {
            //刷新一次
            if (this._countdown > 0) {
                this._countdown -= this._refreshRrequency;
                if (this._countdown <= 0) {
                    EventManager.instance.call(EModule_Events_S.pickUp_dressUp_timeout, this.currentPlayerId);
                }
            }
            this._refreshRrequency = 0;
        }
    }
}