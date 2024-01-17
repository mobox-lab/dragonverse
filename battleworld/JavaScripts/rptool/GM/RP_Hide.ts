import { PlayerManagerExtesion, } from '../../Modified027Editor/ModifiedPlayer';
import { InteractLogic_C, InteractLogic_S, InteractObject } from "../InteractiveObjs/InteractObject";

@Component
export default class RP_Hide extends InteractObject {

    @mw.Property({ displayName: "触发器Guid", group: "属性" })
    public triggerGuid: string = "";
    @mw.Property({ displayName: "隐藏物体Guid", group: "属性" })
    public objGuid: string = "";
    @mw.Property({ displayName: "隐藏时间", group: "属性" })
    public hideTime: number = 1;

    protected onStart(): void {
        this.init(RP_Hide_S, RP_Hide_C);
    }
}

export class RP_Hide_C extends InteractLogic_C<RP_Hide>{

    private trigger: mw.Trigger = null;
    private hideObj: mw.GameObject = null;
    private timeOut: number = null;

    protected async onStart(): Promise<void> {
        this.trigger = await GameObject.asyncFindGameObjectById(this.info.triggerGuid) as mw.Trigger;
        if (!this.trigger) {
            console.error("--RP_Hide-- 找不到触发器 当前挂载物体Guid = " + this.gameObject.gameObjectId);
            return;
        }
        this.hideObj = await GameObject.asyncFindGameObjectById(this.info.objGuid);
        if (!this.hideObj) {
            console.error("--RP_Hide-- 找不到隐藏物体 当前挂载物体Guid = " + this.gameObject.gameObjectId);
            return;
        }

        this.trigger.onEnter.add(this.onTriggerEnter.bind(this));
        this.trigger.onLeave.add(this.onTriggerExit.bind(this));

    }

    private onTriggerEnter(obj: mw.GameObject): void {
        if (!(PlayerManagerExtesion.isCharacter(obj))) return
        if (obj != Player.localPlayer.character) return
        this.clearTimeOut();
        this.changeObjState(false);
    }

    private changeObjState(isShow: boolean) {
        this.hideObj.setVisibility(isShow ? mw.PropertyStatus.On : mw.PropertyStatus.Off);
        this.hideObj.setCollision(isShow ? mw.CollisionStatus.On : mw.CollisionStatus.Off);
    }

    private onTriggerExit(obj: mw.GameObject): void {
        if (!(PlayerManagerExtesion.isCharacter(obj))) return
        if (obj != Player.localPlayer.character) return
        this.timeOut = setTimeout(() => {
            this.timeOut = null;
            this.changeObjState(true);
            this.clearTimeOut();
        }, this.info.hideTime * 1000);
    }

    private clearTimeOut() {
        if (this.timeOut) {
            clearTimeout(this.timeOut);
            this.timeOut = null;
        }
    }


}

export class RP_Hide_S extends InteractLogic_S<RP_Hide>{
    protected onPlayerAction(playerId: number, active: boolean, param: any): void {
    }
    protected onStart(): void {
    }
}