import { AAction } from "./Action";


type IAction = AAction<any>;

export class ActionCollection implements IterableIterator<[string, IAction]> {

    private _actionsMap: Map<string, IAction>;

    constructor() {
        this._actionsMap = new Map<string, IAction>();
    }




    [Symbol.iterator](): IterableIterator<[string, IAction]> {
        return this._actionsMap[Symbol.iterator]()
    }

    next(...args: [] | [undefined]): IteratorResult<[string, IAction], any> {
        return this._actionsMap.entries().next(...args);
    }
    return?(value?: any): IteratorResult<[string, IAction], any> {
        return this._actionsMap.entries().return(value);

    }
    throw?(e?: any): IteratorResult<[string, IAction], any> {
        return this._actionsMap.entries().throw(e);
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