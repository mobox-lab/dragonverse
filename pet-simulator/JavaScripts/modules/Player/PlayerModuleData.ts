import { MapEx, oTraceError } from "odin";
import { GlobalEnum } from "../../const/Enum";
import { GlobalData } from "../../const/GlobalData";
import { GameConfig } from "../../config/GameConfig";
import { PetBagModuleC } from "../PetBag/PetBagModuleC";

export class PetSimulatorPlayerModuleData extends Subdata {

    get dataName(): string {
        return "PlayerData";
    }

    /**玩家钻石 */
    @Decorator.persistence()
    public diamond: number = 0;
    /**玩家金币（第一世界） */
    @Decorator.persistence()
    public gold: number = 0;
    /**玩家金币（第二世界） */
    @Decorator.persistence()
    public gold2: number = 0;
    /**玩家金币（第三世界） */
    @Decorator.persistence()
    public gold3: number = 0;
    /**玩家夏日币 */
    @Decorator.persistence()
    public summerCoin: number = 0;
    @Decorator.persistence()
    public isPlaza: boolean = false;

    /**玩家退出位置 */
    @Decorator.persistence()
    public playerQuitLoc: number = 1001;
    /**升级数据 */
    @Decorator.persistence()
    public levelData: Array<number> = [0, 0, 0, 0, 0];
    /**埋点 */
    @Decorator.persistence()
    public buryingPoint: MapEx.MapExClass<number> = {};

    /**金币变化回调 */
    public onGoldChange: mw.Action1<GlobalEnum.CoinType> = new mw.Action1<GlobalEnum.CoinType>();
    /**钻石变化回调 */
    public onDiamondChange: mw.Action = new mw.Action();
    /**等级变化回调 */
    public onLevelChange: mw.Action2<number, number> = new mw.Action2<number, number>();

    protected onDataInit(): void {
        oTraceError("PlayerModuleData Init", this.currentVersion, this.version);
        if (this.currentVersion != this.version) {
            this.levelData = [0, 0, 0, 0, 0];
            this.currentVersion = this.version;
            this.save(false);
        }
    }

    get version() {
        return 2;
    }

    /**总的升级数 */
    public get totalLevel(): number {
        let total = 0;
        this.levelData.forEach((value) => {
            total += value;
        });
        return total;
    }

    /**
     * 升级
     */
    public levelUp(id: number): void {
        let curLevel = this.getLevelData(id);
        if (curLevel >= GlobalData.LevelUp.maxLevel) return;
        this.levelData[id] = curLevel + 1;
        this.save(true);
        this.onLevelChange.call(id, this.levelData[id]);
    }

    /**获取单个升级数据 */
    public getLevelData(index: number): number {
        let data = this.levelData[index];
        if (data == null) {
            data = 0;
        }
        return data;
    }

    /**增加金币 */
    public addGold(value: number, coinType: GlobalEnum.CoinType, isSync: boolean = true): void {
        this.changeGold(value, coinType, isSync);
    }

    /**减少金币 */
    public reduceGold(value: number, coinType: GlobalEnum.CoinType, isSync: boolean = true): boolean {
        let ret: boolean = true;
        switch (coinType) {
            case GlobalEnum.CoinType.FirstWorldGold:
                ret = (this.gold < value) ? false : true;
                break;
            case GlobalEnum.CoinType.SecondWorldGold:
                ret = (this.gold2 < value) ? false : true;
                break;
            case GlobalEnum.CoinType.ThirdWorldGold:
                ret = (this.gold3 < value) ? false : true;
                break;
            case GlobalEnum.CoinType.SummerGold:
                ret = (this.summerCoin < value) ? false : true;
                break;
            default:
                break;
        }
        if (!ret) {
            oTraceError("金币不足");
            return ret;
        }
        this.changeGold(-value, coinType, isSync);
        return ret;
    }

    /**金币改变 */
    private changeGold(value: number, coinType: GlobalEnum.CoinType, isSync: boolean): void {
        switch (coinType) {
            case GlobalEnum.CoinType.FirstWorldGold:
                this.gold += value;
                this.gold = this.isMaxCoin(this.gold);
                break;
            case GlobalEnum.CoinType.SecondWorldGold:
                this.gold2 += value;
                this.gold2 = this.isMaxCoin(this.gold2);
                break;
            case GlobalEnum.CoinType.ThirdWorldGold:
                this.gold3 += value;
                this.gold3 = this.isMaxCoin(this.gold3);
                break;
            case GlobalEnum.CoinType.SummerGold:
                this.summerCoin += value;
                this.summerCoin = this.isMaxCoin(this.summerCoin);
                break;
            default:
                break;
        }
        this.save(isSync);
        this.onGoldChange.call(coinType);
    }

    /**增加钻石 */
    public addDiamond(value: number, isSync: boolean = true): void {
        this.changeDiamond(value, true, isSync);
    }

    /**判断金币钻石是否达上限 */
    public isMaxCoin(coin: number): number {
        if (coin >= GlobalData.Global.goldMax) return GlobalData.Global.goldMax;
        return coin;
    }

    /**减少钻石 */
    public reduceDiamond(value: number, isSync: boolean = true): boolean {
        if (this.diamond < value) {
            oTraceError("钻石不足");
            return false;
        }
        this.changeDiamond(value, false, isSync);
        return true;
    }

    /**钻石改变 */
    private changeDiamond(value: number, isAdd: boolean, isSync: boolean): void {
        isAdd ? this.diamond += value : this.diamond -= value;
        this.diamond = this.isMaxCoin(this.diamond);
        this.save(isSync);
        this.onDiamondChange.call();
    }

}