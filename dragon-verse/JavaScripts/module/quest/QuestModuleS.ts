import { GameConfig } from "../../config/GameConfig";
import { BagModuleS } from "../bag/BagModule";
import { QuestStateEnum } from "./Config";
import { QuestData } from "./QuestData";
import { QuestModuleC } from "./QuestModuleC";
import Enum = UE.Enum;
import Enumerable from "linq";
import GToolkit from "../../util/GToolkit";
import { DragonElemental } from "../../const/DragonElemental";
import Log4Ts from "../../depend/log4ts/Log4Ts";

export class QuestModuleS extends ModuleS<QuestModuleC, QuestData> {


    protected onPlayerJoined(player: mw.Player): void {
    }

    public net_UpdateTaskStatus(taskId: number, progress: number, customData: string): Promise<QuestStateEnum> {
        let taskInfo = this.currentData.getTaskInfo(taskId);
        if (!taskInfo) {
            return;
        }
        let taskConfig = GameConfig.Task.getElement(taskInfo.questCfgId);
        let oldState = taskInfo.status;
        if (oldState === QuestStateEnum.Complete && !taskConfig.repeat) {
            return;
        }
        let status = (progress === taskConfig.count) ? QuestStateEnum.Complete : QuestStateEnum.Running;
        if (oldState !== status && status === QuestStateEnum.Complete) {
            this.onTaskStatusComplete(taskId, this.currentPlayerId);
        }

        if (taskConfig.repeat && status === QuestStateEnum.Complete) {
            // 如果可以重复完成就再度标记成可完成
            status = QuestStateEnum.Running;
        }

        this.currentData.updateTaskInfo(taskId, progress, status, customData);

        return Promise.resolve(status);
    }


    /**
     * 下发奖励
     * @param taskId
     */
    private onTaskStatusComplete(taskId: number, playerId: number) {

        if (taskId === 5) {
            let count = this.getTotalLightAndDarkDragonCount();
            //如果之前没获得过光暗龙就走表发奖励，不然走自定义发奖励
            if (count > 0) {
                this.net_giveLightOrDarkDragonGift();
                return;
            }
        }

        let rewards = GameConfig.Task.getElement(taskId).reward ?? [];

        const reward = rewards[
            GToolkit.randomWeight(
                Enumerable
                    .from(rewards)
                    .select(reward => reward[reward.length - 1] ?? 0)
                    .toArray(),
            )];
        if (!reward) return;
        for (let i = 0; i < reward.length - 1; i += 2) {
            let bagId = reward[i];
            let count = reward[i + 1];

            mwext.ModuleService.getModule(BagModuleS).addItem(playerId, bagId, count);
        }


    }

    public net_UpdateRunningGameScore(score: number) {

        this.currentData.updateRunningGameScore(score);
        this.currentData.save(false);
    }

    /** 
     * @description: 发跑酷奖励龙
     * @param score 分数
     */
    public net_getRunningGameReward(score: number): Promise<boolean> {
        //分数大于2800且没发过，再发奖励
        if (score >= GameConfig.Global.RG_REWARD_SCORE.value && !this.currentData.hasRunningGameReward) {
            this.net_giveLightOrDarkDragonGift();
            this.currentData.hasRunningGameReward = true;
            this.currentData.save(false);
            return Promise.resolve(true);
        }
        return Promise.resolve(false);
    }

    /** 
     * @description: 获取背包里光暗龙的总数
     */
    private getTotalLightAndDarkDragonCount() {
        //先找所有光暗龙的id和类别id
        let typeIds = Enumerable.from(GameConfig.Dragon.getAllElement())
            .where(item => item.elementalId === DragonElemental.Light || item.elementalId === DragonElemental.Dark)
            .select(item => {
                return { id: item.id, type: item.elementalId }
            });
        //再找所有属于光暗龙的背包id
        let bagIds = Enumerable.from(GameConfig.CharacterfulDragon.getAllElement())
            .where(item => typeIds.any(type => type.id === item.dragonId))
            .select(item => {
                return { bagId: item.bagId, type: typeIds.first(type => type.id === item.dragonId).type }
            });

        //光暗龙背包id
        let lightDragonMap = new Map<number, number>();
        let darkDragonMap = new Map<number, number>();
        //遍历背包id，查看背包里有没有对应的龙
        bagIds.forEach((item) => {
            if (ModuleService.getModule(BagModuleS).hasItem(this.currentPlayerId, item.bagId)) {
                let count = ModuleService.getModule(BagModuleS).getItemCount(this.currentPlayerId, item.bagId);
                if (item.type === DragonElemental.Light) {
                    lightDragonMap.set(item.bagId, lightDragonMap.get(item.bagId) ? lightDragonMap.get(item.bagId) + count : count);
                } else if (item.type === DragonElemental.Dark) {
                    darkDragonMap.set(item.bagId, darkDragonMap.get(item.bagId) ? darkDragonMap.get(item.bagId) + count : count);
                }
            }
        })
        let hasLightDragonCount = [...lightDragonMap.values()].reduce((a, b) => a + b, 0);
        let hasDarkDragonCount = [...darkDragonMap.values()].reduce((a, b) => a + b, 0);
        return hasLightDragonCount + hasDarkDragonCount;
    }

    /** 
     * @description: 发光暗龙奖励
     */
    public net_giveLightOrDarkDragonGift() {
        //完成了看下包里的龙
        //先找所有光暗龙的id和类别id
        let typeIds = Enumerable.from(GameConfig.Dragon.getAllElement())
            .where(item => item.elementalId === DragonElemental.Light || item.elementalId === DragonElemental.Dark)
            .select(item => {
                return { id: item.id, type: item.elementalId }
            });
        //再找所有属于光暗龙的背包id
        let bagIds = Enumerable.from(GameConfig.CharacterfulDragon.getAllElement())
            .where(item => typeIds.any(type => type.id === item.dragonId))
            .select(item => {
                return { bagId: item.bagId, type: typeIds.first(type => type.id === item.dragonId).type }
            });

        //光暗龙背包id
        let lightDragonMap = new Map<number, number>();
        let darkDragonMap = new Map<number, number>();
        //遍历背包id，查看背包里有没有对应的龙
        bagIds.forEach((item) => {
            if (ModuleService.getModule(BagModuleS).hasItem(this.currentPlayerId, item.bagId)) {
                let count = ModuleService.getModule(BagModuleS).getItemCount(this.currentPlayerId, item.bagId);
                if (item.type === DragonElemental.Light) {
                    lightDragonMap.set(item.bagId, lightDragonMap.get(item.bagId) ? lightDragonMap.get(item.bagId) + count : count);
                } else if (item.type === DragonElemental.Dark) {
                    darkDragonMap.set(item.bagId, darkDragonMap.get(item.bagId) ? darkDragonMap.get(item.bagId) + count : count);
                }
            }
        })
        let hasLightDragonCount = [...lightDragonMap.values()].reduce((a, b) => a + b, 0);
        let hasDarkDragonCount = [...darkDragonMap.values()].reduce((a, b) => a + b, 0);
        Log4Ts.log(QuestModuleS, "hasLightDragonCount", hasLightDragonCount);
        Log4Ts.log(QuestModuleS, "hasDarkDragonCount", hasDarkDragonCount);
        if (hasLightDragonCount === 2 && hasDarkDragonCount === 0) {
            //之前重复做了光暗图腾，扣一条光龙变成暗龙
            let deleteItem = GToolkit.randomArrayItem([...lightDragonMap]);
            ModuleService.getModule(BagModuleS).addItem(this.currentPlayerId, deleteItem[0], -1);
            //随机一条暗龙
            let item = GToolkit.randomArrayItem(bagIds.where(item => item.type === DragonElemental.Dark).toArray());
            ModuleService.getModule(BagModuleS).addItem(this.currentPlayerId, item.bagId, 1);
            //通知客户端
        } else if (hasLightDragonCount === 0 && hasDarkDragonCount === 2) {
            //之前重复做了光暗图腾，扣一条暗龙变成光龙
            let deleteItem = GToolkit.randomArrayItem([...darkDragonMap]);
            ModuleService.getModule(BagModuleS).addItem(this.currentPlayerId, deleteItem[0], -1);
            //随机一条光龙
            let item = GToolkit.randomArrayItem(bagIds.where(item => item.type === DragonElemental.Light).toArray());
            ModuleService.getModule(BagModuleS).addItem(this.currentPlayerId, item.bagId, 1);
            //通知客户端

        } else if (hasLightDragonCount === 1 && hasDarkDragonCount === 1) {
            //之前重复做了光暗图腾，不发了
            Log4Ts.log(QuestModuleS, "奖励上限了");
            //通知客户端

        } else if (hasLightDragonCount === 1 && hasDarkDragonCount === 0) {
            //发一条暗龙
            let item = GToolkit.randomArrayItem(bagIds.where(item => item.type === DragonElemental.Dark).toArray());
            ModuleService.getModule(BagModuleS).addItem(this.currentPlayerId, item.bagId, 1);
            //通知客户端

        } else if (hasLightDragonCount === 0 && hasDarkDragonCount === 1) {
            //发一条光龙
            let item = GToolkit.randomArrayItem(bagIds.where(item => item.type === DragonElemental.Light).toArray());
            ModuleService.getModule(BagModuleS).addItem(this.currentPlayerId, item.bagId, 1);
            //通知客户端

        } else if (hasLightDragonCount === 0 && hasDarkDragonCount === 0) {
            //发一条光龙或暗龙
            let item = GToolkit.randomArrayItem(bagIds.where(item => item.type === DragonElemental.Dark || item.type === DragonElemental.Light).toArray());
            ModuleService.getModule(BagModuleS).addItem(this.currentPlayerId, item.bagId, 1);
        }
    }

    /** 
     * @description: 测试光暗龙增删
     * @param playerId 玩家id
     * @param type 操作类型
     * @return 
     */
    public testAddOrDeleteLightDarkDragon(playerId: number, type: number) {
        //先找所有光暗龙的id和类别id
        let typeIds = Enumerable.from(GameConfig.Dragon.getAllElement())
            .where(item => item.elementalId === DragonElemental.Light || item.elementalId === DragonElemental.Dark)
            .select(item => {
                return { id: item.id, type: item.elementalId }
            });
        //再找所有属于光暗龙的背包id
        let bagIds = Enumerable.from(GameConfig.CharacterfulDragon.getAllElement())
            .where(item => typeIds.any(type => type.id === item.dragonId))
            .select(item => {
                return { bagId: item.bagId, type: typeIds.first(type => type.id === item.dragonId).type }
            });
        //光暗龙背包id和对应数量
        let lightDragonMap = new Map<number, number>();
        let darkDragonMap = new Map<number, number>();
        //遍历背包id，查看背包里有没有对应的龙
        bagIds.forEach((item) => {
            if (ModuleService.getModule(BagModuleS).hasItem(playerId, item.bagId)) {
                if (item.type === DragonElemental.Light) {
                    lightDragonMap.set(item.bagId, lightDragonMap.get(item.bagId) ? lightDragonMap.get(item.bagId) + 1 : 1);
                } else if (item.type === DragonElemental.Dark) {
                    darkDragonMap.set(item.bagId, darkDragonMap.get(item.bagId) ? darkDragonMap.get(item.bagId) + 1 : 1);
                }
            }
        })
        if (type === 0) {
            //发一条暗龙
            let item = GToolkit.randomArrayItem(bagIds.where(item => item.type === DragonElemental.Dark).toArray());
            ModuleService.getModule(BagModuleS).addItem(playerId, item.bagId, 1);
        } else if (type === 1) {
            //发一条光龙
            let item = GToolkit.randomArrayItem(bagIds.where(item => item.type === DragonElemental.Light).toArray());
            ModuleService.getModule(BagModuleS).addItem(playerId, item.bagId, 1);
        } else if (type === 2) {
            //删一个光龙
            let deleteItem = GToolkit.randomArrayItem([...lightDragonMap]);
            ModuleService.getModule(BagModuleS).addItem(playerId, deleteItem[0], -1);
        } else if (type === 3) {
            //删一个暗龙
            let deleteItem = GToolkit.randomArrayItem([...darkDragonMap]);
            ModuleService.getModule(BagModuleS).addItem(playerId, deleteItem[0], -1);
        }

    }
}