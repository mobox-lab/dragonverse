import { GeneralManager, } from '../Modified027Editor/ModifiedStaticAPI';
import { PlayerManagerExtesion, } from '../Modified027Editor/ModifiedPlayer';
import { oTrace } from "odin";
import { GameConfig } from "../config/GameConfig";
import { Globaldata } from "../const/Globaldata";
import { MainUI } from "../module/PlayerModule/UI/MainUI";
// import { ISceneUnitBase } from "../module/SceneUnitModule/model/ISceneUnitBase";
import { EventManager } from "./EventManager";
import { EModule_Events } from "../const/Enum";

/**
 * 相机索敌 &&  视野缩放
 */
export default class CameraArmManger {

    private static _instance: CameraArmManger;
    public static get instance() {
        return this._instance || (this._instance = new CameraArmManger());
    }

    private camera: Camera = null;
    private character: mw.Character = null;
    private currentPlayer: mw.Player = null;


    /**玩家-遥感移动输入*/
    private touchController: mw.TouchInput;
    private mainUI: MainUI = null;
    private touchNum: number = 0;
    private oldPointSize: number = 0;

    private target: any /* ISceneUnitBase | undefined */;



    constructor() {

    }

    public init(): void {
        this.currentPlayer = Player.localPlayer;
        this.character = this.currentPlayer.character;
        this.camera = Camera.currentCamera;

        this.mainUI = mw.UIService.getUI(MainUI);

        this.touchController = new mw.TouchInput();
        // this.touchController.setPlayerController();
        this.touchController.onTouchBegin.add(this.onTouchScreenBegin.bind(this));
        this.touchController.onTouchMove.add(this.onTouchScreenMove.bind(this));
        this.touchController.onTouchEnd.add(this.onTouchScreenEnd.bind(this));

        InputUtil.onKeyDown(mw.Keys.MouseScrollUp, () => {

            let curLen = Camera.currentCamera.springArm.length;

            curLen -= 30;
            curLen = MathUtil.clamp(curLen, Globaldata.targetArmMinLen, Globaldata.targetArmMaxLen);

            Camera.currentCamera.springArm.length = curLen;

            EventManager.instance.call(EModule_Events.SetingModuleC_cameratargetArmLength);
        });

        InputUtil.onKeyDown(mw.Keys.MouseScrollDown, () => {
            let curLen = Camera.currentCamera.springArm.length;

            curLen += 30;
            curLen = MathUtil.clamp(curLen, Globaldata.targetArmMinLen, Globaldata.targetArmMaxLen);

            Camera.currentCamera.springArm.length = curLen;

            EventManager.instance.call(EModule_Events.SetingModuleC_cameratargetArmLength);
        });

        // TimeUtil.onEnterFrame.add(this.onUpdate, this);
    }

    private onUpdate(dt: number): void {

    }

    //正在锁定状态时点击屏幕空白处则移除锁定视角效果
    private onTouchScreenBegin() {

        this.touchNum++;
        if (this.touchNum >= 2) {
            //当出现第二个触摸点时，移除UI对象中的摄像机滑动区
            this.mainUI.mTouchPad.visibility = mw.SlateVisibility.Collapsed;
            //使用oldPointSize记录两个触摸点的初始距离
            let touchPoint = this.touchController.getTouchVectorArray();
            this.oldPointSize = touchPoint[0].subtract(touchPoint[1]).length;
        }


        if (!this.target) return;
        this.camera.unlock();
        this.target = undefined;
    }

    private onTouchScreenMove() {
        if (this.touchNum < 2) return

        //计算两个触摸点移动过程中的最新距离
        let touchPoint = this.touchController.getTouchVectorArray();
        let newPointSize = touchPoint[0].subtract(touchPoint[1]).length;
        //计算初始距离和最新距离之差
        let char = Player.localPlayer.character;
        let distance = newPointSize - this.oldPointSize;
        //使用length记录当前弹簧臂长度，也就是摄像机距离，加上或者减去两个触摸点初始距离和最新距离之差
        let length = Camera.currentCamera.springArm.length;
        length += (distance > 0 ? -1 : distance < 0 ? 1 : 0) * 1 * Math.abs(distance);
        length = Math.max(length, Globaldata.targetArmMinLen);
        length = Math.min(length, Globaldata.targetArmMaxLen);
        //应用length记录的弹簧臂长度，并且用oldPointSize再次记录两个触摸点的初始距离
        Camera.currentCamera.springArm.length = length;
        this.oldPointSize = newPointSize;
        EventManager.instance.call(EModule_Events.SetingModuleC_cameratargetArmLength);
    }

    private onTouchScreenEnd() {
        this.touchNum--;
        this.touchNum = 0;
        //当最后一个触摸点离开屏幕时，重新挂载UI对象中的摄像机滑动区
        if (this.touchNum < 1) {
            if (this.mainUI.mTouchPad.visible == false) {
                this.mainUI.mTouchPad.visibility = mw.SlateVisibility.Visible;
            }
        }
    }


    // //锁定特效
    // public playLockEffect(isplay: boolean, npc: mw.Character | mw.GameObject) {

    //     let effectcfg = GameConfig.Effect.getElement(this.lockeffect);
    //     if (!effectcfg) {
    //         oTrace("error effectcfg")
    //         return
    //     }
    //     if (isplay) {

    //         if (this.effectid) {
    //             EffectService.stop(this.effectid)
    //             this.effectid = null;
    //         }
    //         if (PlayerManagerExtesion.isNpc(npc)) {
    //             this.effectid = GeneralManager.rpcPlayEffectOnPlayer(
    //                 effectcfg.EffectID,
    //                 npc as any,
    //                 effectcfg.EffectPoint,
    //                 effectcfg.EffectTime,
    //                 effectcfg.EffectLocation,
    //                 effectcfg.EffectRotate.toRotation(),
    //                 effectcfg.EffectLarge);
    //         } else if (npc instanceof mw.GameObject) {
    //             this.effectid = GeneralManager.rpcPlayEffectOnGameObject(
    //                 effectcfg.EffectID,
    //                 npc as any,
    //                 effectcfg.EffectTime,
    //                 effectcfg.EffectLocation,
    //                 effectcfg.EffectRotate.toRotation(),
    //                 effectcfg.EffectLarge
    //             )
    //         }


    //     } else {
    //         if (this.effectid) {
    //             EffectService.stop(this.effectid)
    //             this.effectid = null;
    //         }
    //     }
    // }

    /**怪的仇恨修改相机FOV----------------------------------------------------------------------------------------------------------------------------- */
    // private fightFOV: number = GameConfig.Global.getElement(60).int_Value;
    // private NofightFOV: number = GameConfig.Global.getElement(61).int_Value;
    // private switchTime: number = GameConfig.Global.getElement(62).float_Value;
    // private isfight: boolean = false;

    // // 玩家怪的仇恨
    // @updater.updateByFrameInterval(20)
    // public moster_hatred_player() {
    //     let ishave = this.sceneUnitMD.isNearSceneUnitXY();
    //     if (ishave) {
    //         if (this.isfight) return;
    //         this.startCameraFov(this.fightFOV, this.switchTime);
    //         this.isfight = true;
    //     } else {
    //         if (!this.isfight) return;
    //         this.startCameraFov(this.NofightFOV, this.switchTime);
    //         this.isfight = false;
    //     }
    // }

}