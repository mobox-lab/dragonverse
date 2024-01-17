import { InteractLogic_C, InteractLogic_S, InteractObject } from "./InteractObject";

/**
 * 交互物-播放声音
 * 作用：往所挂载的gameObject上播放3D音效
 */
@Component
export default class SP_PlaySound extends InteractObject {
    @mw.Property({ displayName: "资源ID", group: "属性" })//如果写了就播放固定id 如果没写就播放上个节点传下来的声音
    public resGuid: string = "";
    @mw.Property({ displayName: "循环次数", group: "属性" })
    public loopNum: number = 1;

    onStart() {
        this.init(PlaySound_S, PlaySound_C);
    }
}
//客户端
class PlaySound_C extends InteractLogic_C<SP_PlaySound> {
    onStart(): void {

    }
}
//服务端
class PlaySound_S extends InteractLogic_S<SP_PlaySound> {
    private playId: number = 0;
    onStart(): void {

    }
    onPlayerAction(playerId: number, active: boolean, param: any): void {
        let resGuid: string = param != null ? param : this.info.resGuid;
        if (mw.StringUtil.isEmpty(resGuid)) return;
        if (active) {
            if (this.playId != 0) {
                mw.SoundService.stop3DSound(this.playId);
            }
            this.playId = mw.SoundService.play3DSound(resGuid, this.gameObject, this.info.loopNum);
        } else {
            mw.SoundService.stop3DSound(this.playId);
            this.playId = 0;
        }
    }
}