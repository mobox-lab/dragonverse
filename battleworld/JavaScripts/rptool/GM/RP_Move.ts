import { PlayerManagerExtesion, } from '../../Modified027Editor/ModifiedPlayer';
import { InteractLogic_C, InteractLogic_S, InteractObject } from "../InteractiveObjs/InteractObject";

@Component
export default class RP_Move extends InteractObject {

    @mw.Property({ displayName: "触发器Guid", group: "属性" })
    public triggerGuid: string = "";
    @mw.Property({ displayName: "移动起始点Guid(第一个起点，第二个终点)", group: "属性" })
    public moveGuid: string[] = ["", ""];
    @mw.Property({ displayName: "移动速度", group: "属性" })
    public moveSpeed: number = 1;

    protected onStart(): void {
        this.init(RP_Move_S, RP_Move_C);
    }

}

export class RP_Move_C extends InteractLogic_C<RP_Move>{

    private trigger: mw.Trigger = null;
    private startObj: mw.GameObject = null;
    private endObj: mw.GameObject = null;
    private dir: mw.Vector = null;
    private curChar: mw.Character = null;

    protected async onStart(): Promise<void> {

        this.trigger = await GameObject.asyncFindGameObjectById(this.info.triggerGuid) as mw.Trigger;
        this.startObj = await GameObject.asyncFindGameObjectById(this.info.moveGuid[0]);
        this.endObj = await GameObject.asyncFindGameObjectById(this.info.moveGuid[1]);
        if (!this.trigger || !this.startObj || !this.endObj) {
            console.error("--RP_Move-- 触发器有问题/起始点有问题 当前挂载物体Guid = " + this.gameObject.gameObjectId);
            return;
        }
        this.dir = mw.Vector.subtract(this.endObj.worldTransform.position, this.startObj.worldTransform.position).normalize();

        this.trigger.onEnter.add(this.onTriggerEnter.bind(this));
        this.trigger.onLeave.add(this.onTriggerExit.bind(this));
        this.useUpdate = true

    }

    public onUpdate(dt: number): void {
        if (!this.curChar) return;
        this.curChar.worldTransform.position = mw.Vector.add(this.curChar.worldTransform.position, mw.Vector.multiply(this.dir, this.info.moveSpeed * dt));
    }

    private onTriggerEnter(obj: mw.GameObject): void {
        if (!(PlayerManagerExtesion.isCharacter(obj))) return
        if (obj != Player.localPlayer.character) return
        this.curChar = obj;
    }

    private onTriggerExit(obj: mw.GameObject): void {
        if (!(PlayerManagerExtesion.isCharacter(obj))) return
        if (obj != Player.localPlayer.character) return
        this.curChar = null;
    }
}

export class RP_Move_S extends InteractLogic_S<RP_Move>{
    protected onPlayerAction(playerId: number, active: boolean, param: any): void {
    }
    protected onStart(): void {
    }
}