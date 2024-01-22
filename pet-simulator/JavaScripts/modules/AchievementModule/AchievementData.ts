import { MapEx } from "odin";
import { GameConfig } from "../../config/GameConfig";
import { GlobalEnum } from "../../const/Enum";
export class Achievement {
    /**成就id */
    achId: number;
    /**进度 */
    progress: number;
    /**是否完成 */
    isOnComplete: boolean;

    constructor(achId: number, progress: number, isOnComplete: boolean) {
        this.achId = achId;
        this.progress = progress;
        this.isOnComplete = isOnComplete;
    }
}
export class AchievementNew {
    /**成就id */
    i: number;
    /**进度 */
    p: number;
    /**是否完成 */
    o: boolean;

    constructor(i: number, p: number, o: boolean) {
        this.i = i;
        this.p = p;
        this.o = o;
    }
}
export default class AchievementData extends Subdata {
    /**成就状态 （key-成就类型）*/
    @Decorator.persistence()
    public achievementStage: MapEx.MapExClass<Achievement>;

    @Decorator.persistence()
    private _achievementNewData: MapEx.MapExClass<AchievementNew> = {};

    public get AchievementStage(): MapEx.MapExClass<AchievementNew> {
        return this._achievementNewData;
    }


    protected initDefaultData(): void {
        this.achievementStage = {};
    }


    get version(): number {
        return 2;
    }
    protected onDataInit(): void {
        if (this.currentVersion != this.version) {

            switch (this.currentVersion) {
                case 1:
                    this.changeDataName();
                    this.currentVersion = this.version;
                    break;

                default:
                    break;
            }

        }
        this.save(false);
    }

    /**更改名字 */
    public changeDataName(): void {
        MapEx.forEach(this.achievementStage, (key: number, value: Achievement) => {
            MapEx.set(this._achievementNewData, key, new AchievementNew(value.achId, value.progress, value.isOnComplete));
        });
        this.achievementStage = {};
    }



    /**
     * 保存成就数据
     */
    public saveAchievementStage(achievementId: number, achievementType: GlobalEnum.AchievementType, progress: number, isOnComplete: boolean): void {
        let nextId = GameConfig.Achievements.getElement(achievementId).NextId;
        let achievement: AchievementNew = null;
        if (MapEx.has(this.AchievementStage, achievementType)) {
            achievement = MapEx.get(this.AchievementStage, achievementType);
            if (isOnComplete) {
                if (nextId != 0) {
                    achievement.i = nextId;
                    achievement.p = progress;
                    achievement.o = false;
                }
                else {
                    achievement.o = true;
                }
            }
            else {
                achievement.p = progress;
            }
        }
        else {
            if (isOnComplete) {
                if (nextId != 0) {
                    achievement = new AchievementNew(nextId, progress, false);
                }
                else {
                    achievement = new AchievementNew(achievementId, progress, true);
                }
            }
            else {
                achievement = new AchievementNew(achievementId, progress, false);
            }
        }
        MapEx.set(this.AchievementStage, achievementType, achievement);
    }
}