import { Globaldata } from "../../const/Globaldata";
import { InteractObject, InteractLogic_C, InteractLogic_S } from "./InteractObject";
import SP_TransferImpulse from "./SP_TransferImpulse";

@Component
export default class SP_Cannon extends InteractObject {

    @mw.Property({ displayName: "退膛相对坐标", group: "属性" })
    public endRelativePos: mw.Vector = new mw.Vector(-20, 0.03, 90);
    @mw.Property({ displayName: "退膛时间秒", group: "属性" })
    public tweenTime: number = 1;
    @mw.Property({ displayName: "炮管名字", group: "属性" })
    public cannonName: string = "大炮";

    @mw.Property({ displayName: "发射特效", group: "属性" })
    public launchEffectGuid: string = "13605";
    @mw.Property({ displayName: "发射特效位置", group: "属性" })
    public launchEffectPos: mw.Vector = new mw.Vector(220026, 3666, 35805.16);
    @mw.Property({ displayName: "发射特效位置", group: "属性" })
    public launchEffectScale: mw.Vector = new mw.Vector(1, 1, 1);
    @mw.Property({ displayName: "发射音效", group: "属性" })
    public launchSoundGuid: string = "201395";

    onStart() {
        this.init(Cannon_S, Cannon_C);
    }

}


//客户端
class Cannon_C extends InteractLogic_C<SP_Cannon> {

    private cannonObj: mw.GameObject = null;
    private startPos: mw.Vector = null;


    private cannonTween: mw.Tween<any> = null;

    onStart(): void {
        this.cannonObj = this.info.gameObject.getChildByName(this.info.cannonName);
        this.startPos = this.cannonObj.localTransform.position;
        this.cannonTween = new mw.Tween({ value: 1 }).to({ value: 0 }, this.info.tweenTime * 1000).onUpdate((data) => {
            mw.Vector.lerp(this.startPos, this.info.endRelativePos, data.value, Globaldata.tmpVector2);

            this.cannonObj.localTransform.position = Globaldata.tmpVector2;
        });

        this.cannonTween.repeat(1);

        // this.init_effect();
    }

    // private async init_effect() {
    //     this.launchEffect = await mw.GameObject.asyncSpawn(this.info.launchEffectGuid) as mw.Effect;
    //     this.launchEffect.stop();
    //     this.launchEffect.worldTransform.scale = this.info.launchEffectScale;
    // }



    protected onPlayerAction(playerId: number, active: boolean, param: any) {

        EffectService.playAtPosition(this.info.launchEffectGuid, this.info.launchEffectPos, {
            scale: this.info.launchEffectScale
        });

        this.cannonTween.start();
        // 播放3D音效
        let playParam = {
            innerRadius: 0,
            falloffDistance: 3000
        }

        SoundService.play3DSound(this.info.launchSoundGuid, this.info.launchEffectPos, 1, 1, playParam);
    }

}


//服务端
class Cannon_S extends InteractLogic_S<SP_TransferImpulse> {
    protected onPlayerAction(playerId: number, active: boolean, param: any): void {

    }
    protected onStart(): void {

    }

}