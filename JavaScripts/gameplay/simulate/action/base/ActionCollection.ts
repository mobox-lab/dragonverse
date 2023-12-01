import { AAction } from "./Action";


type IAction = AAction<any>;

export class ActionCollection {

    private _actionsMap: Map<string, IAction>;

    constructor() {
        this._actionsMap = new Map<string, IAction>();
    }

    add(action: IAction): boolean {
        if (action == null) {
            console.error("ActionCollection.add: action is null")
            return false;
        }

        if (action.nameId === null || action.nameId.length === 0) {
            console.error("ActionCollection.add: action.nameId is null or empty")
            return false;
        }

        if (this._actionsMap.has(action.nameId)) {
            console.error(`ActionCollection.add: action.nameId:${action.nameId} already exists in collection`)
            return false;
        }

        this._actionsMap.set(action.nameId, action);
        return true;
    }

    remove(actionId: string): boolean {
        return this._actionsMap.delete(actionId);
    }

    contains(actionId: string): boolean {
        return this._actionsMap.has(actionId);
    }

    clear(): void {
        this._actionsMap.clear();
    }



}