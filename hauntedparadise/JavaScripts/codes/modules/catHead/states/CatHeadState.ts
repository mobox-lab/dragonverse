import { GameConfig } from "../../../../config/GameConfig";
import { GhostBaseState } from "../../../utils/GhostStateMachine";
import { CatHeadModuleS } from "../CatHeadModule";
import { CatHeadStatType, CatHeadStateMachine } from "./CatHeadStatType";

export abstract class BaseCatHeadState extends GhostBaseState {
    public time: number = 0;

    public constructor(public ctl: CatHeadStateMachine, protected _module: CatHeadModuleS) {
        super();
    }

    update(dt: number): void {
        if (this.time > 0) {
            this.time -= dt;
            if (this.time <= 0) {
                this.change2NextState();
            }
        }
    }

    abstract change2NextState();
}

export class CatHeadIdleState extends BaseCatHeadState {
    enter(): void {
        console.log("enter idle")
        this.time = GameConfig.CatHead.startCd.number;
    }

    change2NextState(): void {
        this.ctl.switch(CatHeadStatType.Pre);
    }
}

export class CatHeadPreState extends BaseCatHeadState {
    enter(): void {

        this._module.reqChangeStats(CatHeadStatType.Pre, []);
        console.log("enter pre")
        this.time = GameConfig.CatHead.preTime.number;
        GameConfig.CatHead.allAreaIds.ids.forEach(e => {
            this._module.getTargetAreaData(e).isPreFever = true;
        });

    }

    change2NextState(): void {
        let runCount = 0;
        this._module.getAllAreaData().forEach(e => {
            if (e.isPreFever) {
                Event.dispatchToLocal("")
                e.restTime = GameConfig.CatHead.runTime.number;
                runCount++;
            }
        });
        if (runCount == 0) {
            this.ctl.switch(CatHeadStatType.Idle);
        }
        else {
            this.ctl.switch(CatHeadStatType.Run);
        }
    }
}

export class CatHeadRunState extends BaseCatHeadState {
    enter(...params: any[]): void {
        console.log("enter run")
    }

    update(dt: number): void {
        let runCount = 0;
        this._module.getAllAreaData().forEach(e => {
            e.restTime -= dt;
            if (e.restTime >= 0) {
                runCount++;
            }
        });
        if (runCount == 0) {
            this.change2NextState()
        }
    }


    change2NextState() {
        console.log("no run cat head");
        this.ctl.switch(CatHeadStatType.Idle);
    }
}

