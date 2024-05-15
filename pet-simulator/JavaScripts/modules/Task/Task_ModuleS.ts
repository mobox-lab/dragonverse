import { GameConfig } from "../../config/GameConfig";
import { GlobalEnum } from "../../const/Enum";
import { GlobalData } from "../../const/GlobalData";
import { PetBagModuleS } from "../PetBag/PetBagModuleS";
import { PlayerModuleS } from "../Player/PlayerModuleS";
import { Task_ModuleC } from "./TaskModuleC";
import { TaskModuleData } from "./TaskModuleData";

enum TaskType {
    /**打破破坏物 */
    BreakDestroy = 1,
    /**获得宠物 */
    GetPet = 2,
    /**强化相关 */
    Strengthen = 3,
    /**融合 */
    Fusion = 4,
    /**交易 */
    Trade = 5,
}

export class Task_ModuleS extends ModuleS<Task_ModuleC, TaskModuleData> {

    /**所有任务 */
    private allTask: Map<TaskType, number[]> = new Map<TaskType, number[]>();

    protected onStart(): void {
        let taskInfo = GameConfig.Task.getAllElement();
        taskInfo.forEach((value, key) => {
            let id = value.id;
            let taskType = value.Type;
            let taskList = this.allTask.get(taskType);
            if (taskList == null) {
                taskList = [];
                this.allTask.set(taskType, taskList);
            }
            taskList.push(id);
        });
    }

    /**任务商店购买 */
    public net_taskShopBuy(id: number): number {
        let data = this.currentData;
        let res = data.setTaskShopData(id);
        if (res <= 0) this.buyItem(id, this.currentPlayer);
        return res;
    }

    /**购买对应id物品 */
    private buyItem(id: number, player: mw.Player): void {
        let diamonds = GlobalData.Task.diamondIds;
        let equips = GlobalData.Task.petEquipId;
        let pets = GlobalData.Task.petBagId;
        let gashapon = GlobalData.Task.gashaponId;
        let info = GameConfig.TaskShop.getElement(id);
        if (info == null) return;
        let award = info.Award;
        if (id >= diamonds[0] && id <= diamonds[1]) {
            this.buyDiamond(award, player);
        } else if (id >= equips[0] && id <= equips[1]) {
            this.addPetEquipCount(award, player);
        } else if (id >= pets[0] && id <= pets[1]) {
            this.addPetCount(award, player);
        } else if (id >= gashapon[0] && id <= gashapon[1]) {
            this.getGashapon(award, player);
        }
    }

    /**获得扭蛋 */
    private getGashapon(award: number, player: mw.Player): void {

    }

    /**增加宠物装备量 */
    private addPetEquipCount(award: number, player: mw.Player): void {
        ModuleService.getModule(PetBagModuleS).addSlot(player);
    }

    /**增加宠物容量 */
    private addPetCount(award: number, player: mw.Player): void {
        ModuleService.getModule(PetBagModuleS).addBagCapacity(player.playerId, award);
    }

    /**购买钻石 */
    private buyDiamond(award: number, player: mw.Player): void {
        ModuleService.getModule(PlayerModuleS).net_addDiamond(award, player);
    }

    /**
     * 打破破坏物
     * @param player 玩家
     * @param breakId 破坏物id
     * @param sceneId 区域id
     * @returns
     */
    public breakDestroy(player: mw.Player, breakId: number, sceneId?: number): void {
        this.checkTaskComplete(player, TaskType.BreakDestroy, breakId, sceneId);
    }

    /**
     * 获得宠物
     * @param player 玩家
     * @param petId 宠物id
     * @param sceneId 宠物蛋区域id
     * @returns
     */
    public getPet(player: mw.Player, petId: number, sceneId: number): void {
        if (!sceneId) return;
        let petInfo = GameConfig.PetARR.getElement(petId);
        this.checkTaskComplete(player, TaskType.GetPet, petInfo.QualityType, sceneId);
    }

    /**
     * 升级/爱心化/彩虹化/附魔
     * @param player 玩家
     * @param strengthenId 强化id
     * @returns
     */
    public strengthen(player: mw.Player, strengthenId: GlobalEnum.StrengthenType): void {
        this.checkTaskComplete(player, TaskType.Strengthen, strengthenId);
    }

    /**
     * 多次升级
     */
    public strengthenCount(player: mw.Player, count: number): void {
        let levelCount = this.getPlayerData(player).getTaskData(GlobalData.Task.levelUpId);
        if (levelCount) {
            count -= levelCount;
        }
        if (count <= 0) return;
        this.checkTaskComplete(player, TaskType.Strengthen, GlobalEnum.StrengthenType.LevelUp, null, count);
    }

    /**
     * 融合
     * @param player 玩家
     * @param fusionId 融合宠物的稀有度
     * @returns
     */
    public fusion(player: mw.Player, fusionId: GlobalEnum.PetQuality): void {
        this.checkTaskComplete(player, TaskType.Fusion, fusionId);
    }

    /**
     * 交易
     * @param player 玩家
     */
    public trade(player: mw.Player): void {
        let playerData = this.getPlayerData(player);
        if (playerData == null) return;
        let allIds = this.allTask.get(TaskType.Trade);
        if (allIds == null) return;
        for (let i = 0; i < allIds.length; i++) {
            let id = allIds[i];
            if (playerData.completeTask(id)) {
                return;
            }
        }
    }

    /**增加任务点数 */
    public addTaskPoint(player: mw.Player, num: number): void {
        let playerData = this.getPlayerData(player);
        if (playerData == null) return;
        playerData.addTaskPoint(num);
    }

    /**检查任务完成 */
    private checkTaskComplete(player: mw.Player, taskType: TaskType, taskId: number, sceneId: number = null, addCount: number = 1): void {
        let playerData = this.getPlayerData(player);
        if (playerData == null) return;
        let allIds = this.allTask.get(taskType);
        if (allIds == null) return;
        for (let i = 0; i < allIds.length; i++) {
            let id = allIds[i];
            let taskInfo = GameConfig.Task.getElement(id);
            if (sceneId && taskInfo.Area != sceneId) {
                continue;
            }
            if (taskInfo.NumA == null) return;
            if (taskInfo.NumA.indexOf(taskId) != -1) {
                playerData.completeTask(id, addCount);
                return;
            }
        }
    }

}
