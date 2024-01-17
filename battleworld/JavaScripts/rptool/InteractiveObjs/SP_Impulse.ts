import { Globaldata } from "../../const/Globaldata";
import { InteractiveHelper, InteractLogic_C, InteractLogic_S, InteractObject } from "./InteractObject";


//交互物触发器-碰触交互
@Component
export default class SP_Impulse extends InteractObject {

    @mw.Property({ displayName: "冲量方向", group: "属性" })
    public impulseDir: mw.Vector = new mw.Vector(0, 0, 1);
    @mw.Property({ displayName: "冲量大小", group: "属性" })
    public impulseSize: number = 3000;

    onStart() {
        this.init(Impulse_S, Impulse_C);
    }


}
//客户端
class Impulse_C extends InteractLogic_C<SP_Impulse> {
    onStart(): void {

    }

    protected onPlayerAction(playerId: number, active: boolean, param: any) {
        let localPlayer = mw.Player.localPlayer;

        if (localPlayer == null) return;



        Globaldata.tmpVector2.x = this.info.impulseDir.x;
        Globaldata.tmpVector2.y = this.info.impulseDir.y;
        Globaldata.tmpVector2.z = this.info.impulseDir.z;

        Globaldata.tmpVector2.normalize();

        mw.Vector.multiply(Globaldata.tmpVector2, this.info.impulseSize, Globaldata.tmpVector2);

        localPlayer.character.addImpulse(Globaldata.tmpVector2, true);
    }

}
//服务端
class Impulse_S extends InteractLogic_S<SP_Impulse> {
    protected onPlayerAction(playerId: number, active: boolean, param: any): void {

    }
    protected onStart(): void {

    }

}