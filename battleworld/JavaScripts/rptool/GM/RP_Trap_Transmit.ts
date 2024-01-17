import { PlayerManagerExtesion, } from '../../Modified027Editor/ModifiedPlayer';
import { InteractLogic_C, InteractLogic_S, InteractObject } from "../InteractiveObjs/InteractObject";

@Component
export default class RP_Trap_Transmit extends InteractObject {

    @mw.Property({ displayName: "触发器Guid", group: "属性" })
    public triggerGuid: string = "";
    @mw.Property({ displayName: "传送点位置", group: "属性" })
    public transmitGuid: mw.Vector = mw.Vector.one;

    protected onStart(): void {
        this.init(RP_Trap_Transmit_S, RP_Trap_Transmit_C);
    }

}

export class RP_Trap_Transmit_C extends InteractLogic_C<RP_Trap_Transmit>{

    private triggerObj: mw.Trigger = null;

    protected async onStart(): Promise<void> {
        this.triggerObj = await GameObject.asyncFindGameObjectById(this.info.triggerGuid) as mw.Trigger;
        this.triggerObj.onEnter.add(this.onTriggerEnter.bind(this));
        // this.triggerObj.onLeave.add(this.onTriggerExit.bind(this));
    }

    private onTriggerEnter(other: mw.GameObject) {
        if (!(PlayerManagerExtesion.isCharacter(other))) return
        if (other != Player.localPlayer.character) return
        Player.localPlayer.character.worldTransform.position = this.info.transmitGuid;
    }

    // private onTriggerExit(other: mw.GameObject) {
    // }
}

export class RP_Trap_Transmit_S extends InteractLogic_S<RP_Trap_Transmit>{
    protected onPlayerAction(playerId: number, active: boolean, param: any): void {
    }
    protected onStart(): void {
    }
}