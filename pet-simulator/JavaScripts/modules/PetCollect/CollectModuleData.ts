import { GameConfig } from "../../config/GameConfig";
import { GlobalData } from "../../const/GlobalData";
import { oTraceError } from "../../util/LogManager";
import { utils } from "../../util/uitls";



export class CollectModuleData extends Subdata {

    /**拥有过的所有宠物 */
    @Decorator.persistence()
    private hasArr: number[] = [];

    @Decorator.persistence()
    public level: number;

    public readonly onLevelChangeAC: Action1<number> = new Action1<number>();
    public readonly onHasChangeAC: Action1<number> = new Action1();

    protected initDefaultData(): void {
        this.hasArr = [];
        this.level = 1;
        this.save(true);
    }

    get version(): number {
        return 3;
    }
    protected onDataInit(): void {
        if (this.currentVersion != this.version) {
            oTraceError('lwj CollectModuleData  onDataInit  this.currentVersion != this.version');
            if (this.currentVersion == 1) {
                if (this.level == 2 && this.hasArr.length >= GlobalData.Collect.levelCount[1]) {
                    this.addLevle(1);
                }
            }
            if (this.currentVersion == 2) {
                this.refreshID();
                this.level = 1;
            }
            this.currentVersion = this.version;
            this.save(false);
        }
    }
    /**刷新id */
    private refreshID() {
        let delIndexArr: number[] = [];

        for (let i = 0; i < this.hasArr.length; i++) {
            let curID = this.hasArr[i]
            if (Number(curID) == 0) {
                delIndexArr.push(i);
                continue;
            }
            let newID = utils.refreshPetId(curID);
            this.hasArr[i] = newID;
        }
        delIndexArr.forEach(index => {
            this.hasArr.splice(index, 1);
        })
        delIndexArr.length = 0;
    }

    public get HasArr(): number[] {
        return this.hasArr;
    }

    public addHas(id: number): boolean {
        if (this.hasArr.indexOf(id) != -1) return false;
        this.hasArr.push(id);
        this.save(true);
        return true
    }

    public batchAddHas(ids: number[]): boolean {
        let hasNew = false;
        for (let i = 0; i < ids.length; i++) {
            if (!this.hasArr.includes(ids[i])) {
                this.hasArr.push(ids[i]);
                if(!hasNew) hasNew = true;
            }
        }
        this.save(hasNew);
        return hasNew;
    }

    public addLevle(val: number) {
        if (this.level > GlobalData.Collect.levelCount.length) {
            return;
        }
        this.level += val;
        this.save(true);
        this.onLevelChangeAC.call(val);
    }

    /** GM 解锁全部 测试用 */
    public gmUnlockAll() {
        this.hasArr = GameConfig.PetARR.getAllElement().map(item => item.id);
        console.log("#debug hasArr:", JSON.stringify(this.hasArr));
        this.onHasChangeAC.call(10);
        this.save(true);
    }
}