import { SpawnManager, SpawnInfo, } from '../../../Modified027Editor/ModifiedSpawn';
import { Globaldata } from "../../../const/Globaldata";
import { MotioniFrameNode_ModelAnim } from "../../../editors/motionEditor/MotionFrameNodeBase";
import { Constants } from "../../../tool/Constants";

/**动效表现管理类 */
export class MotionEffectManager {

    private static _timeDilationKey: any = null;


    private static _tweenMap: Map<string, mw.Tween<any>> = new Map();

    /**
      * 开始时间膨胀
      * @param dilationRate  膨胀倍率
      * @param time 持续时间 秒
      */
    public static start_timeDilation(dilationRate: number, time: number) {

        if (this._timeDilationKey) {
            return;
        }

        let player = Player.localPlayer;

        player.character.customTimeDilation = (dilationRate);

        this._timeDilationKey = setTimeout(() => {
            this._timeDilationKey = null;
            this.clear_timeDilation();
        }, time * 1000);

    }

    /**清理时间膨胀 */
    public static clear_timeDilation() {
        if (this._timeDilationKey) {
            clearTimeout(this._timeDilationKey);
        }
        this._timeDilationKey = null;

        let player = Player.localPlayer;
        if (player.character.customTimeDilation != 1) {
            player.character.customTimeDilation = (1);
        }
    }


    /**播放模型动画 */
    public static async motion_playModelAnim(playObj: mw.GameObject, sheet: MotioniFrameNode_ModelAnim) {

        if (StringUtil.isEmpty(sheet.modelGuid)) {
            return;
        }

        if (playObj == null) {
            return;
        }


        let obj = await SpawnManager.modifyPoolAsyncSpawn(sheet.modelGuid, GameObjPoolSourceType.Asset);
        if (obj == null) {
            return;
        }

        if (sheet.delayTime > 0) {
            this.OpenRK(obj);
            await TimeUtil.delaySecond(sheet.delayTime);
        } else {
            this.OpenRK(obj);
        }

        let startPos = playObj.localTransform.transformPosition(sheet.startPos);
        let endPos = playObj.localTransform.transformPosition(sheet.endPos);

        obj.worldTransform.position = startPos;
        Globaldata.tmpRotation1.x = sheet.startRot.x;
        Globaldata.tmpRotation1.y = sheet.startRot.y;
        Globaldata.tmpRotation1.z = sheet.startRot.z;
        obj.worldTransform.rotation = Globaldata.tmpRotation1;

        let _tween = new mw.Tween({ value: 0 }).to({ value: 1 }, sheet.animTime * 1000).onUpdate((data) => {

            mw.Vector.lerp(startPos, endPos, data.value, Globaldata.tmpVector2);
            obj.worldTransform.position = Globaldata.tmpVector2;
            mw.Vector.lerp(sheet.startRot, sheet.endRot, data.value, Globaldata.tmpVector2);

            Globaldata.tmpRotation1.x = Globaldata.tmpVector2.x;
            Globaldata.tmpRotation1.y = Globaldata.tmpVector2.y;
            Globaldata.tmpRotation1.z = Globaldata.tmpVector2.z;

            obj.worldTransform.rotation = Globaldata.tmpRotation1;
            mw.Vector.lerp(sheet.endScale, sheet.endScale, data.value, Globaldata.tmpVector2);
            obj.worldTransform.scale = Globaldata.tmpVector2;
        }).easing(TweenUtil.Easing.Cubic.In).onComplete(() => {
            setTimeout(() => {
                this._tweenMap.delete(obj.gameObjectId);
                GameObjPool.despawn(obj);
            }, sheet.destroyTime * 1000);
        });
        _tween.start();

        this._tweenMap.set(obj.gameObjectId, _tween);
    }

    /**播放萝卜刀动画 */
    public static OpenRK(RKOuterShell: GameObject) {

        if (RKOuterShell == null) {
            return;
        }

        let RKInnerShell = RKOuterShell.getChildByName("shell");
        if (RKInnerShell == null) {
            return;
        }
        let RKBlade = RKOuterShell.getChildByName("blade");

        if (true) {
            //this.GoTween(RKOuterShell, 0.1, { newRotation: new Rotation(15, 0, 0) })
            this.GoTween(RKInnerShell, 0.1, { newRotation: new Rotation(45, 0, 0) })
            this.GoTween(RKBlade, 0.3, { newlocation: new Vector(0, 0, 40) })
            SoundService.play3DSound("224995", RKOuterShell, 1, 2, { radius: 400, falloffDistance: 800 });
            setTimeout(() => {
                //this.GoTween(RKOuterShell, 0.1, { newRotation: new Rotation(0, 0, 0) })
                this.GoTween(RKInnerShell, 0.1, { newRotation: new Rotation(0, 0, 0) })
                SoundService.play3DSound("224997", RKOuterShell, 1, 2, { radius: 400, falloffDistance: 800 });
            }, 150);
        } else {
            //this.GoTween(RKOuterShell, 0.15, { newRotation: new Rotation(-40, 0, 0) })
            this.GoTween(RKInnerShell, 0.15, { newRotation: new Rotation(40, 0, 0) })
            this.GoTween(RKBlade, 0.3, { newlocation: new Vector(0, 0, 0) })
            SoundService.play3DSound("224998", RKOuterShell, 1, 2, { radius: 400, falloffDistance: 800 });
            setTimeout(() => {
                this.GoTween(RKInnerShell, 0.1, { newRotation: new Rotation(0, 0, 0) })
                // this.GoTween(RKOuterShell, 0.1, { newRotation: new Rotation(0, 0, 0) })
            }, 200);
        }


    }

    /**
   * @param Gobj 需要做动画的物体
   * @param time 运动时间、秒
   * @param RotaAndLoc 结构体，传入非空的就会有变动
   */
    private static GoTween(Gobj: GameObject, time: number, RotaAndLoc?: { newRotation?: Rotation, newlocation?: Vector }) {
        time *= 1000;
        if (RotaAndLoc.newRotation != undefined) {
            let GoTween1 = new mw.Tween(Gobj.localTransform.rotation.clone()).to(RotaAndLoc.newRotation, time).onUpdate((obj) => {
                Gobj.localTransform.rotation = obj;
            })
            GoTween1.start();
        }
        if (RotaAndLoc.newlocation != undefined) {
            let GoTween2 = new mw.Tween(Gobj.localTransform.position.clone()).to(RotaAndLoc.newlocation, time).onUpdate((obj) => {
                Gobj.localTransform.position = obj;
            })
            GoTween2.start();
        }
    }

}