export abstract class InitializeCheckerScript extends mw.Script {




    private static _requireMap: Map<string, string[]> = new Map<string, string[]>();

    protected isInitializeComplete: boolean = false;

    public static required(target: unknown, propertyKey: string) {

        const name = target.constructor.name;

        if (!InitializeCheckerScript._requireMap.has(name)) {

            InitializeCheckerScript._requireMap.set(name, []);
        }

        let requireList = InitializeCheckerScript._requireMap.get(name);
        requireList.push(propertyKey);

        mw.Property({ replicated: true, onChanged: "onStart" })(target, propertyKey);
    }


    protected onStart(): void {

        const name = this.constructor['__proto__'].name;



        if (!InitializeCheckerScript._requireMap.has(name)) {

            this.initializeComplete();
            return;
        }

        const requireList = InitializeCheckerScript._requireMap.get(name);

        if (requireList.length == 0) {

            this.initializeComplete();
            return;
        }

        let isAllReady = true;
        for (const requireName of requireList) {

            if (!this[requireName]) {

                isAllReady = false;
                break;
            }
        }

        if (isAllReady) {

            this.initializeComplete();
        }
    }


    /**
     * 手动初始化完毕
     */
    public initializeComplete() {

        if (this.isInitializeComplete) {
            return;
        }
        this.onInitialize();
        this.isInitializeComplete = true;

    }

    /**
     * 覆盖Script的onStart声明周期
     * 只有当 {@link InitializeCheckerScript.required} 的所有属性都不为undefine时才会调用
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