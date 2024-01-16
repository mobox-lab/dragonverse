import { GlobalEnum } from "../../const/Enum";
import AchievementData from "./AchievementData";
import AchievementModuleC from "./AchievementModuleC";

export default class AchievementModuleS extends ModuleS<AchievementModuleC, AchievementData> {

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {

    }

    /**
     * 保存成就数据
     * @param achievementType 成就类型 
     * @param progress 进度
     * @param isOnComplete 是否完成
     */
    public net_saveAchievementStage(achievementIds: number[], achievementTypes: GlobalEnum.AchievementType[], progresss: number[], isOnCompletes: boolean[]): void {
        for (let i = 0; i < achievementTypes.length; i++) {
            this.currentData.saveAchievementStage(achievementIds[i], achievementTypes[i], progresss[i], isOnCompletes[i]);
        }
        this.currentData.save(true);
    }
}