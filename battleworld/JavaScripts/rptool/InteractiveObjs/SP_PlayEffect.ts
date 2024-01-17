import { GeneralManager, } from '../../Modified027Editor/ModifiedStaticAPI';
import { InteractLogic_C, InteractLogic_S, InteractObject } from "./InteractObject";

/**
 * 交互物-播放特效
 * 作用：往所挂载的gameObject上播放特效
 */
@Component
export default class SP_PlayEffect extends InteractObject {
    @mw.Property({ displayName: "资源ID", group: "属性" })
    public resGuid: string = "";
    @mw.Property({ displayName: "循环次数", group: "属性" })
    public loopNum: number = 0;
    @mw.Property({ displayName: "坐标偏移", group: "属性" })
    public offset: mw.Vector = mw.Vector.zero;
    @mw.Property({ displayName: "旋转", group: "属性" })
    public rotation: mw.Rotation = mw.Rotation.zero;
    @mw.Property({ displayName: "缩放", group: "属性" })
    public scale: mw.Vector = mw.Vector.one;

    onStart() {
        this.init(PlayEffect_S, PlayEffect_C);
    }
}
//客户端
class PlayEffect_C extends InteractLogic_C<SP_PlayEffect> {
    onStart(): void {

    }
}
//服务端
class PlayEffect_S extends InteractLogic_S<SP_PlayEffect> {
    private playId: number = 0;
    onStart(): void {

    }
    onPlayerAction(playerId: number, active: boolean, param: any): void {
        let resGuid: string = param != null ? param : this.info.resGuid;
        if (mw.StringUtil.isEmpty(resGuid)) return;
        if (active) {
            if (this.info.loopNum == 0 && this.playId != 0) return;
            this.playId = GeneralManager.rpcPlayEffectOnGameObject(resGuid, this.gameObject, this.info.loopNum, this.info.offset, this.info.rotation, this.info.scale);
        } else {
            EffectService.stop(this.playId);
            this.playId = 0;
        }
    }
}