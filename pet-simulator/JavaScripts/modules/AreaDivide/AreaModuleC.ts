import { PlayerManagerExtesion, } from '../../Modified027Editor/ModifiedPlayer';
import { GameConfig } from "../../config/GameConfig";
import { GlobalEnum } from "../../const/Enum";
import { GlobalData } from "../../const/GlobalData";
import WallInteract_Generate from '../../ui-generate/WorldUI/WallInteract_generate';
import MessageBox from "../../util/MessageBox";
import { numberArrToString, utils } from "../../util/uitls";
import { TipsManager } from "../Hud/P_TipUI";
import { SceneWall } from "../InteractiveObjs/SceneWall";
import { TeleportationGate } from "../InteractiveObjs/TeleportationGate";
import { PlayerNameManager } from "../Trading/PlayerNameManager";
import { AreaDivideManager } from "./AreaDivideManager";
import { AreaModuleData } from "./AreaModuleData";
import { AreaModuleS } from "./AreaModuleS";
import { P_Transmit, P_TransmitTips } from "./P_Transmit";


export class AreaModuleC extends ModuleC<AreaModuleS, AreaModuleData> {

    private transmitUI: P_Transmit = null;
    /**玩家进行传送 */
    public onTransmit: mw.Action1<number> = new mw.Action1<number>();

    private areaArr: number[] = [];

    /**传送交互物数组 */
    private transferArr = [];
    private transmitTips: P_TransmitTips;

    protected async onStart(): Promise<void> {
        AreaDivideManager.instance.init();
        AreaDivideManager.instance.checkArea();
        AreaDivideManager.instance.onAreaChangeAC.add(this.worldChange.bind(this));

        this.transmitUI = mw.UIService.getUI(P_Transmit);
        this.transmitTips = mw.UIService.getUI(P_TransmitTips);
        this.transmitUI.onPointBtnAC.add(this.pointClick.bind(this))

        this.data.onAreaUnLockAC.add(this.changeArea.bind(this));

        this.initArea();
        this.initSceneWallTele();

    }
    protected async onEnterScene(sceneType: number): Promise<void> {
        if (!this.data.isSendDefault)
            this.addWorldArea(1002)

        await this.initTransmit();
        this.initWorldUI();
    }

    /**初始化场景世界ui多语言 */
    private async initWorldUI() {
        //点击金币引导
        let ui = await GameObject.asyncFindGameObjectById("040D3D06") as mw.UIWidget;
        let text = ui.getTargetUIWidget().rootContent.findChildByPath("TextBlock") as mw.TextBlock;
        text.text = GameConfig.Language.World_3D_2.Value;
        //升级引导
        ui = await GameObject.asyncFindGameObjectById("079EA973") as mw.UIWidget;
        text = ui.getTargetUIWidget().rootContent.findChildByPath("TextBlock") as mw.TextBlock;
        text.text = GameConfig.Language.World_3D_13.Value;
        text = ui.getTargetUIWidget().rootContent.findChildByPath("TextBlock_1") as mw.TextBlock;
        text.text = GameConfig.Language.World_3D_14.Value;
        //融合引导
        ui = await GameObject.asyncFindGameObjectById("1425447B") as mw.UIWidget;
        text = ui.getTargetUIWidget().rootContent.findChildByPath("TextBlock") as mw.TextBlock;
        text.text = GameConfig.Language.World_3D_9.Value;
        text = ui.getTargetUIWidget().rootContent.findChildByPath("TextBlock_1") as mw.TextBlock;
        text.text = GameConfig.Language.World_3D_10.Value;
        //彩虹引导
        ui = await GameObject.asyncFindGameObjectById("3BE90DE3") as mw.UIWidget;
        text = ui.getTargetUIWidget().rootContent.findChildByPath("TextBlock") as mw.TextBlock;
        text.text = GameConfig.Language.World_3D_11.Value;
        text = ui.getTargetUIWidget().rootContent.findChildByPath("TextBlock_1") as mw.TextBlock;
        text.text = GameConfig.Language.World_3D_12.Value;

        //爱心话引导
        ui = await GameObject.asyncFindGameObjectById("36710735") as mw.UIWidget;
        text = ui.getTargetUIWidget().rootContent.findChildByPath("TextBlock") as mw.TextBlock;
        text.text = GameConfig.Language.World_3D_3.Value;
        text = ui.getTargetUIWidget().rootContent.findChildByPath("TextBlock_1") as mw.TextBlock;
        text.text = GameConfig.Language.World_3D_4.Value;
        //附魔引导
        ui = await GameObject.asyncFindGameObjectById("0717B329") as mw.UIWidget;
        text = ui.getTargetUIWidget().rootContent.findChildByPath("TextBlock") as mw.TextBlock;
        text.text = GameConfig.Language.Tips_Enchants_7.Value;
        text = ui.getTargetUIWidget().rootContent.findChildByPath("TextBlock_1") as mw.TextBlock;
        text.text = GameConfig.Language.World_3D_5.Value;
        //传送交易广场
        // ui = await GameObject.asyncFindGameObjectById("0784B261") as mw.UIWidget;
        // text = ui.getTargetUIWidget().rootContent.findChildByPath("TextBlock") as mw.TextBlock;
        // text.text = GameConfig.Language.Page_Title_12.Value;

    }

    /**初始化场景墙 */
    private async initSceneWallTele() {
        let cfgs = GameConfig.AreaDivide.getAllElement();
        for (let i = 0; i < cfgs.length; i++) {
            const element = cfgs[i];
            if (element.Guid && GlobalData.TransferPoint.wallIds.includes(element.id)) {
                TimeUtil.delaySecond(0.2).then(() => {
                    this.transferArr.push(new SceneWall(element.id));
                })

            } else if (element.Guid && GlobalData.TransferPoint.doorIds.includes(element.id)) {
                TimeUtil.delaySecond(1).then(() => {
                    this.transferArr.push(new TeleportationGate(element.id));
                });
            }
        }
    }

    /**初始化场景传送特效门 */
    private async initTransmit() {
        let trigger_1 = await GameObject.asyncFindGameObjectById("04C97D8E") as mw.Trigger;
        let trigger_2 = await GameObject.asyncFindGameObjectById("3EC1A4D5") as mw.Trigger;
        let trigger_3 = await GameObject.asyncFindGameObjectById("19FCCAF8") as mw.Trigger;
        let trigger_4 = await GameObject.asyncFindGameObjectById("2503B6A9") as mw.Trigger;
        let trigger_5 = await GameObject.asyncFindGameObjectById("31155E9F") as mw.Trigger;
        let trigger_6 = await GameObject.asyncFindGameObjectById("2359AAE5") as mw.Trigger;
        let trigger_7 = await GameObject.asyncFindGameObjectById("1D27E537") as mw.Trigger;
        let trigger_8 = await GameObject.asyncFindGameObjectById("38D42710") as mw.Trigger;
        //三世界-》一世界
        // let trigger_9 = await GameObject.asyncFindGameObjectById("155F1359") as mw.Trigger;
        //解锁三世界
        let trigger_10 = await GameObject.asyncFindGameObjectById("16AE3F2D") as mw.Trigger;

        trigger_1.onEnter.add((obj: mw.GameObject) => { this.enterWorldTrigger(obj, trigger_1, 2002, new mw.Vector(-300, -500)); });
        trigger_2.onEnter.add((obj: mw.GameObject) => { this.enterWorldTrigger(obj, trigger_2, 2003, new mw.Vector(0, -200)) });
        trigger_3.onEnter.add((obj: mw.GameObject) => { this.enterWorldTrigger(obj, trigger_3, 2003, new mw.Vector(0, -200)) });
        trigger_5.onEnter.add((obj: mw.GameObject) => { this.enterWorldTrigger(obj, trigger_5, 2003, new mw.Vector(0, -200)) });
        trigger_6.onEnter.add((obj: mw.GameObject) => { this.enterWorldTrigger(obj, trigger_6, 2003, new mw.Vector(0, -200)) });
        trigger_7.onEnter.add((obj: mw.GameObject) => { this.enterWorldTrigger(obj, trigger_7, 2003, new mw.Vector(0, -200)) });
        trigger_8.onEnter.add((obj: mw.GameObject) => { this.enterWorldTrigger(obj, trigger_8, 2003, new mw.Vector(0, -200)) });
        trigger_10.onEnter.add((obj: mw.GameObject) => { this.enterWorldTrigger(obj, trigger_10, 3001, new mw.Vector(0, -200)) });
        trigger_4.onEnter.add((obj: mw.GameObject) => { this.enterWorldTrigger(obj, trigger_4, 1001) });
        // trigger_9.onEnter.add((obj: mw.GameObject) => { this.enterWorldTrigger(obj, trigger_9, 1001) });
        // trigger_9.onLeave.add(this.exitTrigger.bind(this));
        trigger_10.onLeave.add(this.exitTrigger.bind(this));
        trigger_1.onLeave.add(this.exitTrigger.bind(this));
        trigger_2.onLeave.add(this.exitTrigger.bind(this));
        trigger_3.onLeave.add(this.exitTrigger.bind(this));
        trigger_4.onLeave.add(this.exitTrigger.bind(this));
        trigger_5.onLeave.add(this.exitTrigger.bind(this));
        trigger_6.onLeave.add(this.exitTrigger.bind(this));
        trigger_7.onLeave.add(this.exitTrigger.bind(this));
        trigger_8.onLeave.add(this.exitTrigger.bind(this));
    }


    /**解锁二区域前两个 */
    private async unlockArea(areaIds: number[]) {
        let areas: number[] = [];
        areaIds.forEach((item) => {
            let area_1 = this.data.getAreaDataById(item);
            if (area_1 == 1)
                areas.push(item);
        })
        if (areas.length == 0) return;
        let str = numberArrToString(areas);
        this.server.net_addArea(str, true);

    }

    private enterWorldTrigger(obj: mw.GameObject, trigger: mw.Trigger, locId: number, offest: mw.Vector = new mw.Vector(0, 0)) {
        if (PlayerManagerExtesion.isCharacter(obj) == false) {
            return;
        }
        let char = obj as mw.Character;
        if (char != Player.localPlayer.character) return;
        let ui = UIService.show(WallInteract_Generate);
        ui.mBtn_Interact.onClicked.add(() => {
            if (trigger.gameObjectId == "2503B6A9" || trigger.gameObjectId == "155F1359") {
                MessageBox.showTwoBtnMessage(GameConfig.Language.Portol_Tip_3.Value, (res) => {
                    if (res) {
                        let transformLoc = GameConfig.AreaDivide.getElement(locId).Loc.add(new mw.Vector(0, 0, 100));
                        Player.localPlayer.character.worldTransform.position = transformLoc;
                        this.onTransmit.call(1);
                    }
                });
            } else if (locId == 3001) {
                MessageBox.showTwoBtnMessage(GameConfig.Language.Portol_Tip_4.Value, (res) => {
                    if (res) {
                        let transformLoc = GameConfig.AreaDivide.getElement(locId).Loc.add(new mw.Vector(0, 0, 100));
                        Player.localPlayer.character.worldTransform.position = transformLoc;
                        this.onTransmit.call(1);
                    }
                });
            } else {
                let transformLoc = GameConfig.AreaDivide.getElement(locId).Loc.clone().add(new mw.Vector(0, 0, 100));
                Player.localPlayer.character.worldTransform.position = transformLoc;
                this.onTransmit.call(1);
            }

            UIService.hide(WallInteract_Generate);
        });
        // InterBtn.instance.show(trigger, () => {

        //     if (trigger.gameObjectId == "2503B6A9" || trigger.gameObjectId == "155F1359") {
        //         MessageBox.showTwoBtnMessage(GameConfig.Language.Portol_Tip_3.Value, (res) => {
        //             if (res) {
        //                 let transformLoc = GameConfig.AreaDivide.getElement(locId).Loc.add(new mw.Vector(0, 0, 100));
        //                 Player.localPlayer.character.worldTransform.position = transformLoc;
        //                 this.onTransmit.call(1);
        //             }
        //         });
        //     } else if (locId == 3001) {
        //         MessageBox.showTwoBtnMessage(GameConfig.Language.Portol_Tip_4.Value, (res) => {
        //             if (res) {
        //                 let transformLoc = GameConfig.AreaDivide.getElement(locId).Loc.add(new mw.Vector(0, 0, 100));
        //                 Player.localPlayer.character.worldTransform.position = transformLoc;
        //                 this.onTransmit.call(1);
        //             }
        //         });
        //     } else {
        //         let transformLoc = GameConfig.AreaDivide.getElement(locId).Loc.clone().add(new mw.Vector(0, 0, 100));
        //         Player.localPlayer.character.worldTransform.position = transformLoc;
        //         this.onTransmit.call(1);
        //     }

        // }, offest);

        if (locId == 2002) {
            this.unlockArea([2001, 2002])
        } else if (locId == 3001) {
            this.unlockArea([3001, 3002])
        }
    }


    private exitTrigger(obj: mw.GameObject) {
        if (PlayerManagerExtesion.isCharacter(obj) == false) {
            return;
        }
        let char = obj as mw.Character;
        if (char != Player.localPlayer.character) return;
        // InterBtn.instance.hide();
        let ui = UIService.getUI(WallInteract_Generate, false);
        ui.mBtn_Interact.onClicked.clear();
        UIService.hide(WallInteract_Generate);

    }

    //初始化区域
    private initArea() {
        let cfgs = GameConfig.AreaDivide.getAllElement();

        for (let i = 0; i < cfgs.length; i++) {
            let id = cfgs[i].id;
            if (this.data.getAreaDataById(id) != 1) {
                this.changeArea(id, 1, false)
            }
        }

        GameConfig.EggMachine.getAllElement().forEach((item) => {
            if (!this.areaArr.includes(item.AreaID))
                this.areaArr.push(item.AreaID);
        })


    }
    private changeArea(areaId: number, level: number, isData: boolean = true): void {
        this.transferArr.forEach((item) => {
            item.changeArea(areaId, level);
        })

        if (areaId == 1002 && level == 2 && isData) {
            return;
        }
        if (level == 2) {

            if (isData && areaId < 3000) {
                //临时修改为解锁第二世界时不提示购买成功，没法改了，这流程只能这么写了(ˉ▽ˉ；)...
                if (areaId !== 2001 && areaId !== 2002) MessageBox.showOneBtnMessage(GameConfig.Language.Text_tips_1.Value);
            }
        } else {
        }
        if (isData)
            this.transmitUI.updateUI(areaId, level)
        if (level == 2 && this.areaArr.includes(areaId)) {
            TipsManager.instance.showTip(GameConfig.Language.Text_tips_8.Value);
        }

    }

    private async pointClick(id: number, level: number) {
        let cfg = GameConfig.AreaDivide.getElement(id);
        if (level == 1) {
            return;
        } else if (level == 2) {
            MessageBox.showTwoBtnMessage(
                utils.Format(
                    GameConfig.Language.Text_messagebox_1.Value,
                    utils.formatNumber(cfg.Gem)
                ),
                async (res) => {
                    if (res) {
                        const isSuccess = await this.server.net_buyTranArea(id);
                        if (!isSuccess)
                            MessageBox.showOneBtnMessage(
                                GameConfig.Language.Text_tips_3.Value
                            );
                    } else return;
                }
            );
        } else {
            Player.localPlayer.character.worldTransform.position =
                cfg.Loc.clone().add(new mw.Vector(0, 0, 100));
            this.onTransmit.call(id);
        }
    }

    /**解锁传送区域 */
    public addTranArea(areaId: number) {
        this.server.net_addArea(numberArrToString([areaId]), true);
    }
    /**解锁世界墙 */
    public addWorldArea(areaId: number) {
        this.server.net_addArea(numberArrToString([areaId]), true);
    }

    /**区域是否锁 */
    public isArealock(areaId: number): boolean {
        return this.data.getAreaDataById(areaId) == 1;
    }

    private worldChange(preId: number, curId: number) {
        if (curId < 2000) {
            this.transmitTips.showWorld(GlobalEnum.World.First);
        } else if (curId == 2001 || curId == 2003 || curId == 2002) {
            this.transmitTips.showWorld(GlobalEnum.World.Second);
        } else if (curId == 2004) {
            this.transmitTips.showWorld(GlobalEnum.World.AncientRuins);
        } else if (curId == 2005) {
            this.transmitTips.showWorld(GlobalEnum.World.CherryBlossomCourtyard);
        } else if (curId == 3001) {
            this.transmitTips.showWorld(GlobalEnum.World.Third);
        }
    }

    public async net_areaNotice(playerId: number) {
        let str = await PlayerNameManager.instance.getPlayerNameAsync(playerId);
        str = str + " " + GameConfig.Language.World_Tips_13.Value;
        // mw.UIService.getUI(P_GlobalTips).showTips(str);
    }
}