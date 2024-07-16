import { GlobalEnum } from "../../const/Enum";
import { PetBagModuleC } from "../PetBag/PetBagModuleC";
import { PetBagModuleS } from "../PetBag/PetBagModuleS";
import { PlayerModuleS } from "../Player/PlayerModuleS";
import AchievementData from "./AchievementData";
import AchievementModuleC from "./AchievementModuleC";

export default class AchievementModuleS extends ModuleS<
    AchievementModuleC,
    AchievementData
> {
    private playerModuleS: PlayerModuleS = null;
    private petBagModuleC: PetBagModuleC = null; // TODO: Change to PetBagModuleS
    private petBagModuleS: PetBagModuleS = null;

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        this.playerModuleS = ModuleService.getModule(PlayerModuleS);
        this.petBagModuleC = ModuleService.getModule(PetBagModuleC);
        this.petBagModuleS = ModuleService.getModule(PetBagModuleS);
    }

    /**
     * 保存成就数据
     * @param achievementType 成就类型
     * @param progress 进度
     * @param isOnComplete 是否完成
     */
    public net_saveAchievementStage(
        achievementIds: number[],
        achievementTypes: GlobalEnum.AchievementType[],
        progresss: number[],
        isOnCompletes: boolean[],
    ): void {
        for (let i = 0; i < achievementTypes.length; i++) {
            this.currentData.saveAchievementStage(
                achievementIds[i],
                achievementTypes[i],
                progresss[i],
                isOnCompletes[i],
            );
        }
        this.currentData.save(true);
    }

    public broadcastAchievement_destroy(playerId: number, destroyType: GlobalEnum.DestructorType): void {
        this.getClient(playerId).net_broadcastAchievement_destroy(destroyType);
    }

    /**
     * 获取成就奖励
     * @param achievementReward 成就奖励类型
     * @param reward 奖励数量
     */
    @Decorator.noReply()
    public net_getAchievementReward(
        achievementReward: GlobalEnum.AchievementReward,
        reward: number,
    ): void {
        switch (achievementReward) {
            case GlobalEnum.AchievementReward.FirstWorldGold:
                this.playerModuleS.addGold(
                    this.currentPlayerId,
                    reward,
                    GlobalEnum.CoinType.FirstWorldGold,
                );
                break;
            case GlobalEnum.AchievementReward.SecondWorldGold:
                this.playerModuleS.addGold(
                    this.currentPlayerId,
                    reward,
                    GlobalEnum.CoinType.SecondWorldGold,
                );
                break;
            case GlobalEnum.AchievementReward.ThirdWorldGold:
                this.playerModuleS.addGold(
                    this.currentPlayerId,
                    reward,
                    GlobalEnum.CoinType.ThirdWorldGold,
                );
                break;
            case GlobalEnum.AchievementReward.Diamond:
                this.playerModuleS.addDiamond(this.currentPlayerId, reward);
                break;
            case GlobalEnum.AchievementReward.BagExpand:
                this.petBagModuleC.addBagCapacity(reward);
                break;
            case GlobalEnum.AchievementReward.PetExpand:
                this.petBagModuleS.net_addPetWithMissingInfo(this.currentPlayerId, reward, "孵化");// TODO: 成就里应该不奖励宠物了，可删除
                break;
            default:
                break;
        }
    }
}
