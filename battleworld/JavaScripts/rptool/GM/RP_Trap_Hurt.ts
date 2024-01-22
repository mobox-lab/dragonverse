import { PlayerManagerExtesion, } from '../../Modified027Editor/ModifiedPlayer';
import { EModule_Events } from "../../const/Enum";
import { EventManager } from "../../tool/EventManager";
import { InteractLogic_C, InteractLogic_S, InteractObject } from "../InteractiveObjs/InteractObject";

@Component
export default class PR_Trap_Hurt extends InteractObject {

    @mw.Property({ displayName: " 触发器Guid", group: "属性" })
    public triggerGuid: string = "";
    @mw.Property({ displayName: "伤害值", group: "属性" })
    public hurtValue: number = 0;
    @mw.Property({ displayName: "伤害间隔(为0则只触发一次)", group: "属性" })
    public hurtInterval: number = 1;

    protected onStart(): void {
        this.init(PR_Trap_Hurt_S, PR_Trap_Hurt_C);
    }

}

export class PR_Trap_Hurt_C extends InteractLogic_C<PR_Trap_Hurt>{

    private triggerObj: mw.Trigger = null;
    private timer: number = 0;
    private canHurt: boolean = false;
    private curPlayer: mw.Player = null;

    protected async onStart(): Promise<void> {
        this.triggerObj = await GameObject.asyncFindGameObjectById(this.info.triggerGuid) as mw.Trigger;
        if (!this.triggerObj) {
            console.error(" --RP_Trap_Hurt-- 当前触发器的Guid有问题 挂载物体Guid为：" + this.gameObject.gameObjectId);
            return;
        }
        this.canHurt = true;
        this.useUpdate = true;

        this.triggerObj.onEnter.add(this.onTriggerEnter.bind(this));
        this.triggerObj.onLeave.add(this.onTriggerExit.bind(this));
    }

    private onTriggerEnter(other: mw.GameObject) {
        if (!this.canHurt || this.curPlayer) return
        if (!(PlayerManagerExtesion.isCharacter(other))) return
        if (other != Player.localPlayer.character) return
        this.curPlayer = other.player;
        //玩家受伤
        this.hurtPlayer();
    }

    private onTriggerExit(other: mw.GameObject) {
        if (!this.curPlayer) return
        if (!(PlayerManagerExtesion.isCharacter(other))) return
        if (other != Player.localPlayer.character) return
        this.canHurt = true;
        this.timer = 0;
        this.curPlayer = null;

    }

    private hurtPlayer() {
        if (!this.curPlayer) return
        //玩家扣血
        EventManager.instance.call(EModule_Events.hurtPlayer, this.info.hurtValue);
        this.canHurt = false;
    }

    onUpdate(dt: number): void {
        if (this.canHurt) return
        if (this.info.hurtInterval == 0) return
        this.timer += dt;
        if (this.timer < this.info.hurtInterval) return
        this.hurtPlayer();
        this.timer = 0;
    }
}

export class PR_Trap_Hurt_S extends InteractLogic_S<PR_Trap_Hurt>{

    protected onPlayerAction(playerId: number, active: boolean, param: any): void {

    }
    protected async onStart(): Promise<void> {

    }

}