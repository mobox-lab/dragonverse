export abstract class InitializeCheckerScript extends mw.Script {
    private static _requireMap: Map<string, string[]> = new Map<string, string[]>();

    protected isInitializeComplete: boolean = false;

    public static required(target: object, propertyKey: string) {
        const name = target.constructor.name;

        if (!InitializeCheckerScript._requireMap.has(name)) {
            InitializeCheckerScript._requireMap.set(name, []);
        }

        let requireList = InitializeCheckerScript._requireMap.get(name);
        requireList.push(propertyKey);

        mw.Property({ replicated: true, onChanged: "onStart" })(target, propertyKey);
    }

    protected onStart(): void {
        let proto = this.constructor["__proto__"];
        const name = proto.name;

        while (proto) {
            let name = proto.name;
            if (name === "InitializeCheckerScript") {
                break;
            }
            if (InitializeCheckerScript._requireMap.has(name)) {
                const requireList = InitializeCheckerScript._requireMap.get(name);
                if (requireList && requireList.length >= 0) {
                    for (const requireName of requireList) {
                        if (this[requireName] === undefined) return;
                    }
                }
            }

            proto = proto.__proto__;
        }

        this.initializeComplete();
    }

    /**
     * 手动初始化完毕
     */
    public initializeComplete() {

        if (this.isInitializeComplete) {
            return;
        }
        this.isInitializeComplete = true;

        mwext.ModuleService.ready().then((value) => {
            this.onInitialize();
            this.afterInitialize();
        })

    }

    protected afterInitialize() {

    }

    /**
     * 覆盖Script的onStart声明周期
     * 只有当 {@link InitializeCheckerScript.required} 的所有属性都不为 undefined 时才会调用
     * 所以不应该在onStart中执行任何逻辑了
     */
    protected abstract onInitialize(): void;

    public onDestroyed: mw.Action1<this> = new mw.Action1<this>();

    protected onDestroy(): void {
        super.onDestroy();
        this.onDestroyed.call(this);
        this.onDestroyed.clear();
        this.onDestroyed = null;
    }
}