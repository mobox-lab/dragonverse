import { ModifiedCameraSystem } from '../../Modified027Editor/ModifiedCamera';
import { GameConfig } from "../../config/GameConfig";
import { GlobalEnum } from "../../const/Enum";
import { GlobalData } from "../../const/GlobalData";
import MessageBox from "../../utils/MessageBox";
import { SoundManager } from "../../utils/SoundManager";
import { UICtrl } from "../../utils/UICtrl";
import { utils } from "../../utils/uitls";
import { AnalyticsTool, ButtonAnaly, Page } from "../Analytics/AnalyticsTool";
import { P_Transmit } from "../AreaDivide/P_Transmit";
import { EggMachineTween } from "../InteractiveObjs/EggMachineTween";
import { P_HudPetGift } from "../OnlineModule.ts/P_HudPetGift";
import { PetBagModuleC } from "../PetBag/PetBagModuleC";
import { PlayerModuleC } from "../Player/PlayerModuleC";
import { P_Guide } from "./P_Guide";
import { P_HudUI } from "./P_HudUI";

import GameIngo_Generate from "../../ui-generate/common/GameIngo_generate";

export class HudModuleS extends ModuleS<HudModuleC, null>{

}

export class HudModuleC extends ModuleC<HudModuleS, null>{

    /**当前hudUI */
    private hudUI: P_HudUI = null;
    /**玩家模块 */
    private playerModule: PlayerModuleC = null;
    private petBagModule: PetBagModuleC = null;
    private hudPetUI: P_HudPetGift = null;
    /**引导UI */
    private guideUI: P_Guide = null;

    onAwake(): void {
        this.hudUI = mw.UIService.getUI(P_HudUI);
        this.guideUI = mw.UIService.getUI(P_Guide);
        this.hudPetUI = mw.UIService.getUI(P_HudPetGift);
        this.guideUI.pickPetAction.add((id) => {
            this.initPet(id);
        })
        this.hudUI.onJumpAction.add(this.jump.bind(this));
        this.hudUI.ontransmitAC.add(this.transmit.bind(this));
        this.hudUI.onFastTranAC.add(this.fastTransmit.bind(this));
        this.playerModule = ModuleService.getModule(PlayerModuleC);
        this.petBagModule = ModuleService.getModule(PetBagModuleC);
        this.playerModule.onGoldChange.add((coinType: GlobalEnum.CoinType, gold: number) => {
            if (coinType == GlobalEnum.CoinType.SummerGold) return;
            this.hudUI.changeGold(gold);
            if (coinType != GlobalEnum.CoinType.FirstWorldGold) return;
            this.judgeGold(gold);
        });
        this.playerModule.onDiamondChange.add(diamond => {
            this.hudUI.changeDiamond(diamond);
        });


    }

    protected onStart(): void {
        EggMachineTween.instance.init();
        UICtrl.instance.init();
    }

    protected onEnterScene(sceneType: number): void {
        this.gameInfo();
        SoundManager.instance.playBGM(GlobalData.Music.bgm);
        Event.addLocalListener("PlayButtonClick", () => {
            SoundManager.instance.playSound(GlobalData.Music.click);
        })
        let bagCount = this.petBagModule.getCurPetNum();
        if (bagCount > 0) {
            this.hudUI.show();
            AnalyticsTool.page(Page.main);
            this.hudPetUI.show();
            return;
        }
        this.guideUI.show();
        AnalyticsTool.page(Page.choose);
    }

    /**游戏房间信息 */
    private gameInfo() {
        //游戏信息
        let info = mw.UIService.getUI(GameIngo_Generate);
        let text = "";

        // text += `_${RoomService.getRoomId()}`
        // text += `u:${AccountService.getUserId()}`
        info.mText.text = text;
        info.show();
    }

    /**初始UI选择 */
    private initPet(id: number): void {
        if (id == 1) {
            this.petBagModule.addPet(GlobalData.pet.initPets[0]);
        } else {
            this.petBagModule.addPet(GlobalData.pet.initPets[1]);
        }
        this.guideUI.hide();
        this.hudUI.show();
        AnalyticsTool.page(Page.main);
        this.hudPetUI.show();
    }

    private jump(): void {
        if (!this.localPlayer.character.isJumping) {
            if (PlayerModuleC.curPlayer)
                SoundManager.instance.play3DSound(GlobalData.Music.jump, PlayerModuleC.curPlayer.currentTransform.position);
        }
        this.localPlayer.character.jump();
    }

    private transmit() {
        mw.UIService.getUI(P_Transmit).show();
    }

    /**判断金币数 */
    private judgeGold(gold: number) {
        let tarGold = GameConfig.EggMachine.getElement(1001).Price[0];
        if (gold >= tarGold) {
            this.hudUI.setShortcutBtnShow(true);
        } else {
            this.hudUI.setShortcutBtnShow(false);
        }
    }

    /**快捷传送 */
    private fastTransmit() {
        AnalyticsTool.action_click(ButtonAnaly.quickegg);
        MessageBox.showTwoBtnMessage(GameConfig.Language.Text_messagebox_2.Value, (res) => {
            if (res) {
                // 初始城镇的扭蛋位置
                let tarLoc = GameConfig.AreaDivide.getElement(1001).Loc.add(new mw.Vector(0, 0, 100));
                this.localPlayer.character.worldTransform.position = tarLoc;
                this.localPlayer.character.worldTransform.rotation = new Rotation(0, 0, 90);
                // 将摄像机方向旋转到人物面朝方向
                ModifiedCameraSystem.setOverrideCameraRotation(new Rotation(0, 0, 90));
                TimeUtil.delayExecute(() => {
                    ModifiedCameraSystem.resetOverrideCameraRotation();
                }, 5);
            }
        });
    }


    protected onUpdate(dt: number): void {
        //当前dt对应的一秒帧数
        utils.frameCount = 1 / dt;
        EggMachineTween.instance.onUpdate(dt);
    }

}