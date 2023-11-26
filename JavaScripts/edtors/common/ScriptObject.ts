import Asset from "../Assets";


type ScriptObjectType<A, B> = {
    [K in Exclude<keyof A, keyof B>]: A[K];
};


type ReadonlyScriptObjectType<A> = {
    readonly [K in Exclude<keyof A, keyof mw.Script>]: A[K];
};

export default abstract class ScriptObject extends Asset {


    private static defaultPools: Map<string, ScriptObject> = new Map();



    protected onStart(): void {

        let object = this.clone({} as any);

        Object.defineProperty(object, "clone", {
            value: this.clone
        })

        ScriptObject.defaultPools.set(this.constructor.name, object as any);

        // 暂存完毕就销毁
        this.destroy();

    }


    protected abstract clone(outer: ScriptObjectType<this, ScriptObject>): ScriptObjectType<this, ScriptObject>


    static default<T extends ScriptObject>(t: new (...args: any[]) => T): ReadonlyScriptObjectType<T> {

        return ScriptObject.defaultPools.get(t.name) as any;
    }




}