import { EAnalyticsEvents, EAttributeEvents_C, EPlayerEvents_C } from "../../const/Enum";
import { Globaldata } from "../../const/Globaldata";
import { EFirstDo } from "../../module/AnalyticsModule/AnalyticsTool";
import { EnergyModuleC } from "../../module/Energy/EnergyModule";
import { InteractiveModuleC } from "../../module/InteractiveModule/InteractiveModuleC";
import { EPlayerState } from "../../module/PlayerModule/FSM/PlyerState";
import { PlayerManager } from "../../module/PlayerModule/PlayerManager";
import { EventManager } from "../../tool/EventManager";
import { InteractLogic_C, InteractLogic_S, InteractObject } from "./InteractObject";

/**
 * 大炮传送交互物体
 */

@Component
export default class SP_TransferImpulse extends InteractObject {

    @mw.Property({ displayName: "世界坐标位置", group: "属性" })
    public worldPos: mw.Vector = new mw.Vector(220026, 3666, 35805.16);

    @mw.Property({ displayName: "特效guid", group: "属性" })
    public effectGuid: string = "30497";
    @mw.Property({ displayName: "特效缩放", group: "属性" })
    public effectScale: mw.Vector = new mw.Vector(1, 1, 1);
    @mw.Property({ displayName: "动画时间秒", group: "属性" })
    public tweenTime: number = 3;
    @mw.Property({ displayName: "进去大炮动画", group: "属性" })
    public enterAnimGuid: string = "33572";
    @mw.Property({ displayName: "进入动画延迟时间", group: "属性" })
    public enterAnimTime: number = 1;

    @mw.Property({ displayName: "冲量方向", group: "属性" })
    public impulseDir: mw.Vector = new mw.Vector(100, 0, 200);
    @mw.Property({ displayName: "冲量大小", group: "属性" })
    public impulseSize: number = 6000;
    @mw.Property({ displayName: "延迟发射时间秒", group: "属性" })
    public delayLaunchTime: number = 0.5;

    onStart() {
        this.init(TransferImpulse_S, TransferImpulse_C);


    }



}


//客户端
class TransferImpulse_C extends InteractLogic_C<SP_TransferImpulse> {


    private impulseDir: mw.Vector = null;

    private effectTween: mw.Tween<any> = null;

    onStart(): void {
        this.impulseDir = this.gameObject.worldTransform.transformDirection(this.info.impulseDir);


    }

    protected async onPlayerAction(playerId: number, active: boolean, param: any) {
        let localPlayer = mw.Player.localPlayer;

        if (localPlayer == null) return;

        if (playerId == localPlayer.playerId) {

            localPlayer.character.movementEnabled = false;
            localPlayer.character.jumpEnabled = false;
            localPlayer.character.complexMovementEnabled = false;
        }

        // 如果动画不为空，不等动画播放结束
        if (StringUtil.isEmpty(this.info.enterAnimGuid) == false) {
            let player = mw.Player.getPlayer(playerId);
            if (player) {
                let anim = player.character.loadAnimation(this.info.enterAnimGuid);
                anim.play();
                await TimeUtil.delaySecond(this.info.enterAnimTime);
            }
        }


        // 玩家进入时的坐标
        let enterPos = localPlayer.character.worldTransform.position;

        mw.Camera.currentCamera.springArm.collisionEnabled = false;

        // 玩家设置旋转与大炮方向相同
        let rotation = this.info.gameObject.worldTransform.getForwardVector().toRotation();
        rotation.x = 0;
        rotation.y = 0;
        localPlayer.character.worldTransform.rotation = rotation;

        if (this.effectTween) {
            this.effectTween.stop();
            this.effectTween = null;
        }

        let module = ModuleService.getModule(InteractiveModuleC);
        if (module) {
            module.listen_enterTransfer(this.info.tweenTime, this.info.effectGuid, this.info.effectScale);
        }

        this.effectTween = new mw.Tween({ value: 0 }).to({
            value: 1
        }, this.info.tweenTime * 1000).onUpdate((data) => {

            mw.Vector.lerp(enterPos, this.info.worldPos, data.value, Globaldata.tmpVector2);

            localPlayer.character.worldTransform.position = Globaldata.tmpVector2;

        }).onComplete(() => {
            this.interactNext(playerId, true);

            setTimeout(() => {

                localPlayer.character.complexMovementEnabled = true;

                localPlayer.character.movementEnabled = true;
                localPlayer.character.jumpEnabled = true;
                Globaldata.tmpVector2.x = this.impulseDir.x;
                Globaldata.tmpVector2.y = this.impulseDir.y;
                Globaldata.tmpVector2.z = this.impulseDir.z;
                Globaldata.tmpVector2.normalize();
                mw.Vector.multiply(Globaldata.tmpVector2, this.info.impulseSize, Globaldata.tmpVector2);
                localPlayer.character.addImpulse(Globaldata.tmpVector2, true);

                mw.Camera.currentCamera.springArm.collisionEnabled = true;
                EventManager.instance.call(EPlayerEvents_C.Player_ChangePlayerState, EPlayerState.Dive);

                // 埋点
                EventManager.instance.call(EAnalyticsEvents.firstDo, EFirstDo.Portal);
                //扣体力
                ModuleService.getModule(EnergyModuleC).consume(1, true);
                //通知ui，体力变更
                EventManager.instance.call(EAttributeEvents_C.Attribute_Energy_Change_C);
            }, this.info.delayLaunchTime * 1000);

        });

        this.effectTween.start();

    }

}
//服务端
class TransferImpulse_S extends InteractLogic_S<SP_TransferImpulse> {
    protected onPlayerAction(playerId: number, active: boolean, param: any): void {

    }
    protected onStart(): void {

    }

}