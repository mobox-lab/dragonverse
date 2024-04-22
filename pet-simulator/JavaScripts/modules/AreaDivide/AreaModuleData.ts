import { GameConfig } from "../../config/GameConfig";
import { oTraceError } from "../../util/LogManager";

export class AreaModuleData extends Subdata {

    /**id:level-123 */
    @Decorator.persistence()
    private unlockArea: { [key: number]: number } = {};

    /**是否发送默认埋点 */
    @Decorator.persistence()
    public isSendDefault: boolean = false;

    /**解锁区域 */
    public readonly onAreaUnLockAC: Action2<number, number> = new Action2();

    protected initDefaultData(): void {
        GameConfig.AreaDivide.getAllElement().forEach((cfg) => {
            if (cfg.id == 1001 || cfg.id == 1002)
                this.unlockArea[cfg.id] = 3;
            else
                this.unlockArea[cfg.id] = 1;
        });
    }

    get dataName(): string {
        return "AreaModuleData";
    }
    get version(): number {
        return 3;
    }
    protected onDataInit(): void {
        while (this.currentVersion != this.version) {
            if (this.currentVersion == 1) {
                this.unlockArea[2001] = 1;
                this.unlockArea[2002] = 1;
                this.currentVersion = 2;
            } else if (this.currentVersion == 2) {
                this.unlockArea[3001] = 1;
                this.unlockArea[3002] = 1;
                this.currentVersion = 3;
            }
            this.save(false);
        }
    }


    /**解锁区域数据 */
    public get AreaData() {
        return this.unlockArea;
    }
    public getAreaDataById(id: number): number {
        if (!this.unlockArea[id]) {
            return 0;
        }
        return this.unlockArea[id];
    }

    /**解锁区域 */
    public unlockAreaById(id: number, isFirst: boolean) {
        if (id == 1002 && isFirst && !this.isSendDefault) {
            this.isSendDefault = true;
            this.save(true);
            this.onAreaUnLockAC.call(id, 2);
        }

        if (!this.unlockArea[id]) {
            oTraceError('lwj 没有这个区域');
            return;

        } else {

            if (isFirst && this.unlockArea[id] == 1) {
                this.unlockArea[id] = 2;
            } else if (!isFirst && this.unlockArea[id] == 2) {
                this.unlockArea[id] = 3;
            } else {
                oTraceError('lwj 解锁顺序错误');
            }

        }
        this.save(true);
        this.onAreaUnLockAC.call(id, this.unlockArea[id]);
    }
}