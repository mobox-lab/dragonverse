import { PlayerManagerExtesion, } from '../../Modified027Editor/ModifiedPlayer';
import { InteractLogic_C, InteractLogic_S, InteractObject } from "../InteractiveObjs/InteractObject";

@Component
export default class RP_Jump extends InteractObject {

    @mw.Property({ displayName: "触发器Guid", group: "属性" })
    public triggerGuid: string = "";
    @mw.Property({ displayName: "跳跃高度", group: "属性" })
    public jumpHeight: number = 300;
    @mw.Property({ displayName: "触发间隔时间", group: "属性" })
    public intervalTime: number = 1;

    protected onStart(): void {
        this.init(RP_Jump_S, RP_Jump_C);
    }

}

export class RP_Jump_C extends InteractLogic_C<RP_Jump>{

    private trigger: mw.Trigger = null;
    private curChar: mw.Character = null;
    private timer: number = 0;
    private canJump: boolean = true;
    private normalHeight: number = null;

    protected async onStart(): Promise<void> {
        this.trigger = await GameObject.asyncFindGameObjectById(this.info.triggerGuid) as mw.Trigger;
        if (!this.trigger) {
            console.error("--RP_Jump-- 找不到触发器 当前挂载物体Guid = " + this.gameObject.gameObjectId);
            return;
        }
        this.trigger.onEnter.add(this.onTriggerEnter.bind(this));
        this.trigger.onLeave.add(this.onTriggerExit.bind(this));
        this.useUpdate = true;
    }

    public onUpdate(dt: number): void {
        if (!this.curChar) return;
        if (this.curChar.isJumping) return
        if (this.canJump) {
            this.curChar.jump();
            this.canJump = false;
        } else {
            this.timer += dt;
            if (this.timer < this.info.intervalTime) return;
            this.canJump = true;
            this.timer = 0;
        }
    }

    private onTriggerEnter(obj: mw.GameObject): void {
        if (!(PlayerManagerExtesion.isCharacter(obj))) return
        if (obj != Player.localPlayer.character) return
        this.curChar = obj;
        this.normalHeight = this.curChar.maxJumpHeight;
        this.curChar.maxJumpHeight = this.info.jumpHeight;
        if (!this.curChar.isJumping) this.canJump = true;
    }

    private onTriggerExit(obj: mw.GameObject): void {
        if (!(PlayerManagerExtesion.isCharacter(obj))) return
        if (obj != Player.localPlayer.character) return
        this.curChar.maxJumpHeight = this.normalHeight;
        this.normalHeight = null;
        this.curChar = null;
    }


}

export class RP_Jump_S extends InteractLogic_S<RP_Jump>{
    protected onPlayerAction(playerId: number, active: boolean, param: any): void {
    }
    protected onStart(): void {
    }

}