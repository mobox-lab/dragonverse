import { PlayerHeadUIModuleS } from "./PlayerHeadUIModuleS";
import PlayerHeadUI from "../PlayerModule/UI/PlayerHeadUI";
import AttributeSync from "../AttributeModule/AttributeSync";
import { Attribute } from "../PlayerModule/sub_attribute/AttributeValueObject";
import { PlayerModuleC } from "../PlayerModule/PlayerModuleC";
import { AttributeModuleC } from "../AttributeModule/AttributeModuleC";
import { EAnalyticsEvents, EAttributeEvents_C, EPlayerEvents_C } from "../../const/Enum";
import { EventManager } from "../../tool/EventManager";
import { Globaldata } from "../../const/Globaldata";
import { MainUI } from "../PlayerModule/UI/MainUI";
import { PlayerManager } from "../PlayerModule/PlayerManager";
import { EFirstDo } from "../AnalyticsModule/AnalyticsTool";


export class PlayerHeadUIModuleC extends ModuleC<PlayerHeadUIModuleS, null> {
    /**属性模块*/
    private atrributeMD: AttributeModuleC;
    /**玩家模块*/
    private playerModuleC: PlayerModuleC = null;

    private worldUIMap: Map<number, mw.UIWidget> = new Map<number, mw.UIWidget>();
    /**头顶UI*/
    private playerHeadUIs: Map<number, PlayerHeadUI> = new Map<number, PlayerHeadUI>();

    /**正在加载头顶UI记录 */
    private loadingQueue: Set<number> = new Set();

    onStart() {
        this.localPlayer.character.displayName = "";
        this.playerModuleC = ModuleService.getModule(PlayerModuleC);
        this.atrributeMD = ModuleService.getModule(AttributeModuleC);

        EventManager.instance.add(EPlayerEvents_C.player_syncPlayerName_c, this.listen_playerJoin, this);
        EventManager.instance.add(EPlayerEvents_C.attr_change, this.listen_player_hpChange, this);
        EventManager.instance.add(EPlayerEvents_C.player_syncPlayerHPVisable_c, this.listen_HPVisable, this);
        EventManager.instance.add(EAttributeEvents_C.Attribute_RankScore_Change_C, this.listen_player_rankChange, this);
        EventManager.instance.add(EAttributeEvents_C.Attribute_RankShow_C, this.listen_player_rankShow, this);
        Player.onPlayerLeave.add(this.listen_onplayerLeft.bind(this));


    }

    onEnterScene(sceneType: number): void {
        this.server.net_PlayerJoin(this.getPlayerName(this.localPlayer));
    }


    /**监听其它玩家进入游戏 */
    public async listen_playerJoin(pId: number, name: string, lv: number, rankScore: number) {
        await this.creatPlayerHead(pId, name, lv, rankScore);
        //已登录玩家 可能属性同步过来的时候playerId没同步AttributeMap存在呢问题
        for (let [key, value] of AttributeSync.AttributeMap) {
            await this.creatPlayerHead(key, value.attr75, value.attr51, value.attr59);
        }
        if (this.localPlayerId == pId) {
            this.server.net_GetLv();
        }
    }

    /**玩家离开头顶销毁 */
    private listen_onplayerLeft(player: mw.Player) {

        if (player == null) {
            return;
        }

        let playerID = player.playerId;
        if (playerID == null || playerID == undefined) {
            return;
        }

        if (this.playerHeadUIs.has(playerID)) {
            let headUI = this.playerHeadUIs.get(playerID);
            this.playerHeadUIs.delete(playerID);
            headUI.destroy();
        }

        if (this.worldUIMap.has(playerID)) {
            let worldUI = this.worldUIMap.get(playerID);
            worldUI.destroy();
            this.worldUIMap.delete(playerID);
        }

        if (this.loadingQueue.has(playerID)) {
            this.loadingQueue.delete(playerID);
        }

    }

    /**监听玩家血量恢复*/
    private async listen_player_hpChange(playerId: number, type: Attribute.EnumAttributeType, value: number) {

        if (type != Attribute.EnumAttributeType.lv && type != Attribute.EnumAttributeType.hp && type != Attribute.EnumAttributeType.maxHp) {
            return;
        }

        let headUI = await this.getHeadUIWidget(playerId);

        if (type == Attribute.EnumAttributeType.lv) {
            if (headUI) {
                headUI.setName(null, value);
            }
        }

        if (this.localPlayerId == playerId && type == Attribute.EnumAttributeType.hp) {
            this.playerModuleC.setAttr(Attribute.EnumAttributeType.hp, value, false)
        }

        let maxHp = this.atrributeMD.getAttributeValue(Attribute.EnumAttributeType.maxHp, playerId)
        let hp = this.atrributeMD.getAttributeValue(Attribute.EnumAttributeType.hp, playerId)
        if (maxHp == null || hp == null) {
            return;
        }
        if (headUI) {
            headUI.refash(maxHp, hp);

            if (this.localPlayerId == playerId) {
                let ui = mw.UIService.getUI(MainUI);
                if (ui) {
                    ui.player_hpChange();
                }
            }
        }
        // }
    }

    /**
     * 监听玩家段位分变化
     */
    public async listen_player_rankChange(playerId: number, rankScore: number) {
        let rankId = PlayerManager.instance.getRankLevel(rankScore);
        let headUI = await this.getHeadUIWidget(playerId);
        if (headUI) {
            headUI.setRank(rankId);
        }
    }
    /**
     * 监听玩家段位显隐变化
     */
    public async listen_player_rankShow(playerId: number, isShow: number) {
        let headUI = await this.getHeadUIWidget(playerId);
        if (headUI) {
            headUI.setRankVis(isShow);
        }
    }

    /**
     * 玩家头顶UI颜色
     * @param playerids 
     * @param color 名字颜色
     * @param isAnemy 是否敌人 敌人血条红色  队友血条蓝色
     */
    public async refashPlayerHeadUI(playerids: number[], color: mw.LinearColor, isAnemy: boolean) {
        if (playerids == null || playerids == undefined) {
            return;
        }
        for (let index = 0; index < playerids.length; index++) {
            const element = playerids[index];
            let player = Player.getPlayer(element);
            if (player) {
                let headUI: PlayerHeadUI = await this.getHeadUIWidget(element);
                if (headUI) {
                    //headUI.text_Name.fontColor = color;
                    if (isAnemy) {
                        headUI.setColor(Globaldata.redHpColor, Globaldata.redHpColorback)
                    } else {
                        headUI.setColor(Globaldata.buleHpColor, Globaldata.buleHpColorback)
                    }
                    headUI.setHpVisible(true);
                } else {
                    //oTraceError("refashHeadUI__________________ERROR", element);
                }
            }
        }
    }





    /**设置血条显示隐藏*/
    public async setHpState(playerID: number, isShowhp: boolean) {
        let ui = await this.getHeadUIWidget(playerID);
        if (ui) {
            ui.setHpVisible(isShowhp);
        }
    }
    /**获取头顶ui */
    public async getHeadUIWidget(playerID: number): Promise<PlayerHeadUI> {
        if (!this.playerHeadUIs.has(playerID)) {
            await this.creatPlayerHead(playerID, null, null, -1);
        }
        return this.playerHeadUIs.get(playerID);
    }

    /**设置头顶UI可见性*/
    public setAllHeadUIVisible(isHpVisable: boolean) {
        for (let [key, value] of this.playerHeadUIs) {
            if (value) {
                value.setHeadUIVisable(isHpVisable);
            }
        }
    }

    /**设置hp可见性*/
    public setAllHPVisible(isHpVisable: boolean) {
        for (let [key, value] of this.playerHeadUIs) {
            if (value) {
                try {
                    value.setHpVisible(isHpVisable);
                } catch (e) {
                    //玩家离开没有销毁的UI
                    this.playerHeadUIs.delete(key);
                }
            }
        }
    }


    /**同步显示*/
    private async listen_HPVisable(playerId: number, isShow: number) {

        let player = await mw.Player.asyncGetPlayer(playerId);
        if (player == null) {
            return;
        }

        if (player.character == null) {
            return;
        }

        await player.character.asyncReady();

        const widget = player.character.overheadUI
        if (widget == null) {
            return;
        }

        if (isShow) {
            widget.setVisibility(mw.PropertyStatus.On, true);
        } else {
            widget.setVisibility(mw.PropertyStatus.Off, true);
        }

    }


    /** 玩家登录 显示玩家头顶UI */
    private async creatPlayerHead(playerId: number, name: string, lv: number, rankScore: number): Promise<void> {

        let player = await mw.Player.getPlayer(playerId);
        if (player == null) {
            return;
        }
        if (player.character == null) {
            return;
        }
        await player.character.asyncReady();

        if (player.character.overheadUI == null) {
            return;
        }

        let ui: PlayerHeadUI = null;
        let rankId = PlayerManager.instance.getRankLevel(rankScore);
        if (this.playerHeadUIs.has(playerId)) {
            ui = this.playerHeadUIs.get(playerId);
            if (name != null && name != undefined && name != "") {
                ui.setName(name, lv);
            }
            if (rankId) {
                ui.setRank(rankId);
            }
        } else {
            //console.error("=====vae load playerhead ", playerId, this.loadingQueue.has(playerId))
            if (this.loadingQueue.has(playerId)) {
                return;
            }

            this.loadingQueue.add(playerId);

            player.character.displayName = ""
            player.character.overheadUI.setVisibility(mw.PropertyStatus.Off, true);
            let worldUI = await mw.GameObject.asyncSpawn("UIWidget") as mw.UIWidget;
            worldUI.widgetSpace = mw.WidgetSpaceMode.OverheadUI;
            worldUI.hideByDistanceEnable = true;
            ui = mw.UIService.create(PlayerHeadUI);
            worldUI.setTargetUIWidget(ui.uiWidgetBase);
            player.character.attachToSlot(worldUI, mw.HumanoidSlotType.ChatFrame);
            if (name != null && name != undefined && name != "") {
                ui.setName(name, lv);
            }
            if (rankId) {
                ui.setRank(rankId);
            }

            ui.setBindPId(playerId);

            worldUI.localTransform.position = Globaldata.playerHeadUIOffset;

            this.playerHeadUIs.set(playerId, ui);

            this.worldUIMap.set(playerId, worldUI);

            if (this.loadingQueue.has(playerId)) {
                this.loadingQueue.delete(playerId);
            }
        }

    }

    /**获得玩家名字 */
    private getPlayerName(player: mw.Player) {
        let name = mw.AccountService.getNickName();
        if (name == null || name == undefined || name == "" || name.length <= 0) {
            //oTrace("玩家名字为空____name",)
            name = player.character.displayName;
            //oTrace("玩家名字为空____name22", name)
            if (StringUtil.isEmpty(name)) {
                name = "麻瓜" + MathUtil.randomInt(1, 999999);
            }
        }
        return name;
    }

    /**
     * 设置玩家段位显隐
     */
    public setRankVis(isShow: number) {
        this.server.net_setRankVis(isShow);
    }
}
