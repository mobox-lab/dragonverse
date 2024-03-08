import GhostInst from "../../GhostInst";

export interface IGhostCom { 
    onUpdate(dt: number);

    onEnter(...params: any[]);

    onExit();
}


export abstract class BaseGhostCom implements IGhostCom{


    public constructor(protected ctl: GhostInst) { 
    }

    onEnter(...params: any[]) {
    }

    onExit() {
    }

    onUpdate(dt: number) {
    }
}

export abstract class BaseGhostCheckCom extends BaseGhostCom { 
    public get updateInterval(): number { 
        return 1;
    }

    public updateTimer: number = 0;
}
