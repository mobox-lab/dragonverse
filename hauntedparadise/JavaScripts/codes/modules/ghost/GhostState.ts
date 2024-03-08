/*
 * @Author       : enyu.liu enyu.liu@appshahe.com
 * @Date         : 2023-10-10 15:55:13
 * @LastEditors  : enyu.liu enyu.liu@appshahe.com
 * @LastEditTime : 2023-10-16 09:50:26
 * @FilePath     : \catcompanion\JavaScripts\modules\ghost\GhostState.ts
 * @Description  : 
 */
import { GhostBaseState } from "../../utils/GhostStateMachine";
import { PlayerInterModuleS } from "../inter/PlayerInterModule";
import { GhostEvents, GhostLogicState, GhostMoveState } from "./GhostDefine";
import GhostInst from "./GhostInst";
import { IGhostCom } from "./com/base/IGhostCom";

export class GhostComGroup {

    public constructor(protected owner: GhostInst, public coms: IGhostCom[]) {
    }

    public enter() {
        this.coms.forEach(e => {
            e.onEnter();
        })
    }

    onUpdate(dt: number) {
        if (this.coms.length == 0) {
            return;
        }
        for (let index = 0; index < this.coms.length; index++) {
            const element = this.coms[index];
            element.onUpdate(dt);

        }
    }

    public end() {
        this.coms.forEach(e => {
            e.onExit();
        })
    }
}

export class GhostStateBase extends GhostBaseState {
    protected comGroup: GhostComGroup;

    constructor(protected owner: GhostInst, ...coms: IGhostCom[]) {
        super();
        this.comGroup = new GhostComGroup(owner, coms);
    }

    enter(...parms: any[]) {
        this.comGroup.enter();
    }

    update(dt: number) {
        this.comGroup.onUpdate(dt);
    }

    exit() {
        this.comGroup.end();
    }
}

export class GhostStateCasual extends GhostStateBase {
    enter() {
        console.log("enter casual");
        this.owner.setCasualConfigs();
        this.owner.logicState = GhostLogicState.Casual;
        this.owner.moveState = GhostMoveState.Hang;
        console.log("casual enter hang");
        super.enter();
        Event.dispatchToLocal(GhostEvents.ChangeState, this.owner.logicState);
    }

    exit(): void {
        Navigation.stopNavigateTo(this.owner.ghostChar);
        super.exit();
    }
}


export class GhostStateChase extends GhostStateBase {
    enter() {
        console.log("enter chase");
        this.owner.logicState = GhostLogicState.Chase;
        this.owner.moveState = GhostMoveState.Follow;
        super.enter();
        this.owner.stopAni();
        Event.dispatchToLocal(GhostEvents.ChangeState, this.owner.logicState);
    }

    exit() {
        Navigation.stopNavigateTo(this.owner.ghostChar);
        console.log("exit chase");
        super.exit();
        this.owner.targetId = 0;
    }
}

export class GhostStateKill extends GhostStateBase {
    enter() {
        console.log("enter kill");
        this.owner.logicStateTimer = 2;
        Navigation.stopNavigateTo(this.owner.ghostChar);
        this.owner.logicState = GhostLogicState.Killing;
        this.owner.moveState = GhostMoveState.Wait;
        this.owner.ghostChar.movementEnabled = false;
        this.owner.playAni("attackAni");
        super.enter();
        Event.dispatchToLocal(GhostEvents.ChangeState, this.owner.logicState);
    }

    exit() {
        console.log("exit kill");
        super.exit();
        this.owner.ghostChar.movementEnabled = true;
        this.owner.targetId = 0;
    }
}

export class GhostStateProtected extends GhostStateBase {
    enter(...parms: any[]): void {
        console.log("enter protected");
        this.owner.logicState = GhostLogicState.Protected;
        this.owner.moveState = GhostMoveState.Wait;
        this.owner.ghostChar.movementEnabled = false;
        this.owner.targetId = 0;
        super.enter();
    }

    exit() {
        console.log("exit protected");
        super.exit();
        this.owner.ghostChar.movementEnabled = true;
        this.owner.targetId = 0;
    }
}
