/*
 * @Author       : hangyuan.zhang hangyuan.zhang@appshahe.com
 * @Date         : 2023-12-26 13:13:25
 * @LastEditors  : dal
 * @LastEditTime : 2024-01-29 13:18:54
 * @FilePath     : \hauntedparadise\JavaScripts\codes\modules\procedure\ui\LoadingGameUI.ts
 * @Description  : 
 */
import BackGround_UI_Generate from "../../../../ui-generate/ShareUI/BackGround_UI_generate";
import Background_Generate from "../../../../ui-generate/ShareUI/Background_generate";
import GameStart, { EGameTheme } from "../../../GameStart";
import { PlayerManagerExtension, } from '../../../Modified027Editor/ModifiedPlayer';
import { MainUI } from "../../../ui/MainUI";
import { TipsUI } from '../../../ui/TipsUI';
import MusicMgr from "../../../utils/MusicMgr";
import { UtilEx } from "../../../utils/UtilEx";
import HelpModuleC from '../../help/HelpModuleC';
import { StartProcedureStateClient } from "../state/ProcedureStateClient";


/** 加载游戏界面 */
export class LoadingGameUI extends Background_Generate {

    private tween: mw.Tween<any>;
    onStart(): void {
    }
    async onShow() {

        if (GameStart.GameTheme === EGameTheme.Graveyard) {
            // 显示深色背景UI
            UIService.show(BackGround_UI_Generate);
        }

        this.img_background.renderOpacity = 1;
        if (this.tween) {
            this.tween.stop();
            this.tween = null;
        }

        if (GameStart.IsTesting) {
            UIService.hide(LoadingGameUI);
            this.tween = null;
            const char = Player.localPlayer.character
            // await UtilEx.asyncLoadAsset("14629")
            await TimeUtil.delaySecond(0.5);
            MusicMgr.instance.play(200);
            await TimeUtil.delaySecond(0.5);
            // const anim = PlayerManagerExtension.loadAnimationExtesion(char, "14629");
            // anim.play();
            //
            // let loadTime = anim.length * 1000 / anim.speed;
            // if (loadTime > 6000) {
            //     loadTime = 6000;
            // }
            // setTimeout(() => {
                char.jumpEnabled = true;
                char.movementEnabled = true;
                UIService.show(MainUI);
                UIService.show(TipsUI);
                ModuleService.getModule(HelpModuleC).isStartGame = true;
            // }, loadTime);
        } else {
            this.tween = new mw.Tween({ val: 1 }).to({ val: 0 }, 1)
                .repeat(1)
                .yoyo(true)
                .easing(TweenUtil.Easing.Quadratic.InOut)
                .onUpdate((obj) => {
                    this.img_background.renderOpacity = obj.val;
                })
                .onComplete(async () => {
                    mw.UIService.hide(LoadingGameUI);
                    this.tween = null;
                    const char = Player.localPlayer.character
                    // await UtilEx.asyncLoadAsset("14629")
                    await TimeUtil.delaySecond(0.5);
                    MusicMgr.instance.play(200);
                    await TimeUtil.delaySecond(0.5);

                    // const anim = PlayerManagerExtension.loadAnimationExtesion(char, "14629");
                    // anim.speed = 0.3;
                    // anim.play();
                    //
                    // let loadTime = anim.length * 1000 / anim.speed;
                    // if (loadTime > 6000) {
                    //     loadTime = 6000;
                    // }
                    // setTimeout(() => {
                        char.jumpEnabled = true;
                        char.movementEnabled = true;
                        UIService.show(MainUI);
                        UIService.show(TipsUI);
                        ModuleService.getModule(HelpModuleC).isStartGame = true;

                        if (GameStart.GameTheme === EGameTheme.Graveyard) {
                            MusicMgr.instance.play(StartProcedureStateClient.BGMSoundItemCfgId);
                        }
                    // }, loadTime);
                    // anim.onFinish.add(() => {

                    // })
                })
                .start();
        }
    }
}