import { PlayerManagerExtesion, } from '../../Modified027Editor/ModifiedPlayer';
import { LogManager } from "odin";
import { InteractLogic_C, InteractLogic_S, InteractObject } from "../InteractiveObjs/InteractObject";

@Component
export default class RP_ChangeSpeed extends InteractObject {

    @mw.Property({ displayName: "触发器Guid", group: "属性" })
    public triggerGuid: string = "";
    @mw.Property({ displayName: "最大速度", group: "属性" })
    public speed: number = 400;

    protected onStart(): void {
        this.init(RP_ChangeSpeed_S, RP_ChangeSpeed_C);
    }

}

export class RP_ChangeSpeed_C extends InteractLogic_C<RP_ChangeSpeed>{

    private trigger: mw.Trigger = null;
    private normalSpeed: number = null;
    private acceleration: number = null;
    protected async onStart(): Promise<void> {
        this.trigger = await GameObject.asyncFindGameObjectById(this.info.triggerGuid) as mw.Trigger;
        if (!this.trigger) {
            LogManager.instance.logError("--RP_ChangeSpeed-- 找不到触发器 当前挂载物体Guid = " + this.gameObject.gameObjectId);
            return;
        }
        this.trigger.onEnter.add(this.onTriggerEnter.bind(this));
        this.trigger.onLeave.add(this.onTriggerExit.bind(this));

    }

    private onTriggerEnter(obj: mw.GameObject): void {
        if (!(PlayerManagerExtesion.isCharacter(obj))) return
        if (obj != Player.localPlayer.character) return
        if (this.normalSpeed != null || this.acceleration != null) return
        this.normalSpeed = obj.maxWalkSpeed;
        this.acceleration = obj.maxAcceleration;
        obj.maxWalkSpeed = this.info.speed;
        obj.maxAcceleration = 99999999;
    }

    private onTriggerExit(obj: mw.GameObject): void {
        if (!(PlayerManagerExtesion.isCharacter(obj))) return
        if (obj != Player.localPlayer.character) return
        obj.maxWalkSpeed = this.normalSpeed;
        obj.maxAcceleration = this.acceleration;
        this.normalSpeed = null;
        this.acceleration = null;
    }
}

export class RP_ChangeSpeed_S extends InteractLogic_S<RP_ChangeSpeed>{
    protected onPlayerAction(playerId: number, active: boolean, param: any): void {
        throw new Error("Method not implemented.");
    }
    protected onStart(): void {
        throw new Error("Method not implemented.");
    }
}