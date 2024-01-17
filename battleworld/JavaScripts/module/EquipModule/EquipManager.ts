import { SpawnManager } from '../../Modified027Editor/ModifiedSpawn';
import { LogManager } from "odin";
import { IAppearancePendantElement } from "../../config/AppearancePendant";
import { GameConfig } from "../../config/GameConfig";
import { EModule_Events, ELogName } from "../../const/Enum";
import { EventManager } from "../../tool/EventManager";
import { Singleton } from "../../tool/FunctionUtil";


@Singleton()
export class EquipManager {

    public static instance: EquipManager;


    /**挂件 缓存 */
    private _pendentMap: Map<number, Map<string, mw.GameObject>> = new Map();

    /**挂件可见 玩家手中是否持有武器 */
    private _pendentVisableMap: Map<number, boolean> = new Map();


    private _isInit: boolean = false;

    /**初始化 */
    public init() {

        if (this._isInit) {
            return;
        }
        this._isInit = true;

        EventManager.instance.add(EModule_Events.equip_addPendant, this.listen_addPendant.bind(this));
        EventManager.instance.add(EModule_Events.equip_removePendant, this.listen_removePendant.bind(this));

        Player.onPlayerLeave.add(this.listen_playerLeft.bind(this));
    }




    /**玩家离开游戏  清理单端的配件 */
    private listen_playerLeft(player: mw.Player) {

        let pId = player.playerId;


        // 2.清理武器模型
        if (this._pendentMap.has(pId) == false) {
            return;
        }

        let pendMap = this._pendentMap.get(pId);

        for (const [key, value] of pendMap.entries()) {

            value.destroy();
        }

        this._pendentMap.delete(pId);
        this._pendentVisableMap.delete(pId);
    }





    /**添加挂件 */
    public async listen_addPendant(pId: number, pendantId: number, isAddWeapon: boolean = false) {
        let player = await Player.asyncGetPlayer(pId);
        if (player == null) {
            return null;
        }

        let pendantCfg = GameConfig.AppearancePendant.getElement(pendantId);
        if (pendantCfg == null) {
            LogManager.instance.logErrorWithTag(ELogName.VAE, "EquipModuleC.listen_addPendant.pendantCfg == null ", pId, pendantId);
            return null;
        }

        let character = player.character;

        let pendentKey = this.getPendantKey(pId, pendantCfg);
        // 如果重复记录 则移除
        this.removePendantRecord(pId, pendentKey);


        let newPendant = await SpawnManager.asyncSpawn({ guid: pendantCfg.assetGuid });
        //ts报错兼容
        if (!newPendant) return;
        await newPendant.asyncReady();
        newPendant.setCollision(mw.PropertyStatus.Off);

        character.attachToSlot(newPendant, pendantCfg.slot);
        newPendant.localTransform.position = (pendantCfg.weaPos);
        newPendant.localTransform.rotation = (new mw.Rotation(pendantCfg.weaRot));
        newPendant.localTransform.scale = (pendantCfg.weaScale);
        if (newPendant instanceof mw.Effect) {
            newPendant.loop = true;
            newPendant.play();
        }

        this.addPendantRecord(pId, pendentKey, newPendant);
        this._pendentVisableMap.set(pId, false);

    }


    /**添加玩家 挂件记录 */
    private addPendantRecord(pId: number, pendentKey: string, obj: mw.GameObject) {
        if (this._pendentMap.has(pId) == false) {
            this._pendentMap.set(pId, new Map<string, mw.GameObject>());
        }

        let set = this._pendentMap.get(pId);
        set.set(pendentKey, obj);
    }

    /**移除玩家 挂件记录 */
    private removePendantRecord(pId: number, pendentKey: string) {
        if (this._pendentMap.has(pId) == false) {
            return;
        }
        let objMap = this._pendentMap.get(pId);
        if (objMap.has(pendentKey) == false) { return; }
        objMap.get(pendentKey).destroy();

        objMap.delete(pendentKey);
    }


    /**监听挂件移除 */
    private async listen_removePendant(pId: number, pendantId: number) {
        let player = await Player.asyncGetPlayer(pId);
        if (player == null) {
            return;
        }

        let pendantCfg = GameConfig.AppearancePendant.getElement(pendantId);
        if (pendantCfg == null) {
            LogManager.instance.logErrorWithTag(ELogName.VAE, "EquipModuleC.listen_removePendant.pendantCfg == null ", pId, pendantId);
            return;
        }

        let key = this.getPendantKey(pId, pendantCfg);

        this.removePendantRecord(pId, key);

        // 背部挂件
        let weaponKey = this.getPendantKey1(pId, pendantCfg);

        this.removePendantRecord(pId, weaponKey);
    }

    /**获取挂件key */
    private getPendantKey(pId: number, cfg: IAppearancePendantElement) {
        return `pendant_cfg${cfg.id}_slot${cfg.slot}_${pId}`;
    }

    /**获取背部武器key */
    private getPendantKey1(pId: number, cfg: IAppearancePendantElement) {
        return `pendant_cfg${cfg.id}_slot${cfg.slot}_new_${pId}`;
    }



    /**获取配件对象 */
    public getWeaponObj(pId: number, pendantId: number) {
        if (this._pendentMap.has(pId) == false) {
            console.warn("EquipManager:getWeaponObj this._pendentMap.has(pId) == false ", pId, pendantId)
            return null;
        }
        let pendentMap = this._pendentMap.get(pId);
        let pendantCfg = GameConfig.AppearancePendant.getElement(pendantId);
        if (pendantCfg == null) {
            console.warn("EquipManager:getWeaponObj pendantCfg == null", pId, pendantId)
            return null;
        }
        let pendentKey = this.getPendantKey(pId, pendantCfg);

        if (pendentMap.has(pendentKey) == false) {
            return null;
        }
        return pendentMap.get(pendentKey);
    }

    /**获取背部配件对象 */
    public getWeaponObj_back(pId: number, pendantId: number) {
        if (this._pendentMap.has(pId) == false) {
            console.warn("EquipManager:getWeaponObj this._pendentMap.has(pId) == false ", pId, pendantId)
            return null;
        }
        let pendentMap = this._pendentMap.get(pId);
        let pendantCfg = GameConfig.AppearancePendant.getElement(pendantId);
        if (pendantCfg == null) {
            console.warn("EquipManager:getWeaponObj pendantCfg == null", pId, pendantId)
            return null;
        }
        let pendentKey = this.getPendantKey1(pId, pendantCfg);

        if (pendentMap.has(pendentKey) == false) {
            return null;
        }
        return pendentMap.get(pendentKey);
    }



    /**添加挂件 */
    public async addPendant(charaObj: mw.Character, pendantId: number) {
        if (charaObj == null) {
            return null;
        }
        let pendantCfg = GameConfig.AppearancePendant.getElement(pendantId);
        if (pendantCfg == null) {
            LogManager.instance.logErrorWithTag(ELogName.VAE, "EquipModuleC.listen_addPendant.pendantCfg == null ", pendantId);
            return null;
        }
        let newPendant = await SpawnManager.asyncSpawn({ guid: pendantCfg.assetGuid });
        (newPendant as mw.Model).setCollision(mw.PropertyStatus.Off, true);
        charaObj.attachToSlot(newPendant, pendantCfg.slot);
        newPendant.localTransform.position = (pendantCfg.weaPos);
        newPendant.localTransform.rotation = new mw.Rotation(pendantCfg.weaRot);
        newPendant.localTransform.scale = (pendantCfg.weaScale);
        if (newPendant instanceof mw.Effect) {
            newPendant.loop = true;
            newPendant.play();
        }

        return newPendant;
    }

    /**
     * 获取玩家指定插槽上的挂件id
     * @param playerId 玩家id
     * @param slot 插槽
     * @returns 挂件id，如果没有，返回空数组
     */
    public getPendantFromSlot(playerId: number, slot: number): number[] {
        const pendantMap = this._pendentMap.get(playerId);
        let res = [];
        if (pendantMap) {
            const suffixKey = `_slot${slot}_${playerId}`;
            for (const [pendantKey, _] of pendantMap) {
                if (pendantKey.endsWith(suffixKey)) {
                    //解析出id
                    const id = pendantKey.split('_')[1].substring('cfg'.length);
                    res.push(Number(id));
                }
            }
        }
        return res;
    }
}