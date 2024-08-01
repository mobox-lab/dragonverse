// import { IElementBase } from "../../config/ConfigBase";
// import { GameConfig } from "../../config/GameConfig";
// import { IVIPLVElement } from "../../config/VIPLV";
// import { IVIPLV111111111Element } from "../../config/VIPLV111111111";
// import { GlobalEnum } from "../../const/Enum";
// import { oTraceError } from "../../utils/LogManager";
// import { OnlineModuleData } from "../OnlineModule/OnlineModuleData";
// import { BagTool } from "../PetBag/BagTool";
// import { PetBagModuleData } from "../PetBag/PetBagModuleData";
// import { PetBagModuleS } from "../PetBag/PetBagModuleS";
// import { PlayerModuleS } from "../Player/PlayerModuleS";
// import { BuffModuleS } from "../buff/BuffModuleS";
// import { PassData, Task } from "./PassData";
// import { PassModuleC } from "./PassModuleC";
// import { PassTaskHelp } from "./PassTaskHelp";

// import { Extension as Extension_DataCenterS } from "../../ExtensionOdin/data/DataCenterS";
// // 027在改成编辑器接口
// import { Extension as Extension_ModuleManager } from "../../ExtensionOdin/manager/module/ModuleManager";
// import ModuleService = Extension_ModuleManager.ModuleService;;

// // 027在改成编辑器接口
// import { Extension as Extension_GameInitializer } from "../../ExtensionOdin/GameInitializer";

// export class PassModuleS extends ModuleS<PassModuleC, PassData> {

//     private playerMS: PlayerModuleS = null;
//     private buffMS: BuffModuleS = null;

//     /**玩家任务类型Map */
//     private playerTaskTypeMap: Map<GlobalEnum.VipTaskType, number[]> = new Map<GlobalEnum.VipTaskType, number[]>();

//     /**任务进度更新事件
//      * @param playerId 玩家id
//      * @param type 任务类型
//      * @param count 任务完成数量
//      */
//     public onTaskUpdateAC: Action3<number, GlobalEnum.VipTaskType, number> = new Action3();

//     protected onStart(): void {

//         this.playerMS = ModuleService.getModule(PlayerModuleS);
//         this.buffMS = ModuleService.getModule(BuffModuleS);
//         this.onTaskUpdateAC.add(this.onTaskComplete.bind(this));

//         PurchaseService.onPremiumMemberOrderDelivered.add(this.onKeyConsume.bind(this));
//     }

//     protected onPlayerEnterGame(player: mw.Player): void {

//         this.checkResetTask_onEnterGame(player, 0);
//         this.initPlayerTask(player.playerId);
//         this.getClient(player).net_startTask();

//         setTimeout(() => {
//             this.taskCompensate(player.playerId);
//         }, 1000);
//     }
//     protected onPlayerLeft(player: mw.Player): void {
//         try {
//             this.getPlayerData(player).saveLastDayNow(Date.now());
//         } catch (e) {
//             console.log(e);
//         }
//     }

//     public checkResetTask_onEnterGame_GM(player: mw.Player, day: number): void {
//         this.checkResetTask_onEnterGame(player, day * 86400 * 1000);
//         this.initPlayerTask(player.playerId);
//         this.getClient(player).net_startTask();
//     }


//     /**花费星星购买通行证 0背包满 1 成功 -1 星星不足 */
//     public net_buyStar(cfgId: number, isVip: boolean): number {
//         let cfg = GameConfig.VIPLV.getElement(cfgId);
//         if (!this.isBagFull(this.currentPlayerId, cfg, isVip)) {
//             return 0;
//         }

//         let isSuccess = this.currentData.changeStarCount(-cfg.StarCount);
//         if (isSuccess) {
//             this.currentData.setCurLv(cfgId, isVip);
//             //计算奖励
//             this.calculateReward(this.currentPlayerId, cfg, isVip);
//             return 1;
//         }
//         return -1;
//     }

//     public net_getReward(cfgId: number): boolean {
//         //计算奖励
//         let cfg = GameConfig.VIPLV.getElement(cfgId);
//         if (!this.isBagFull(this.currentPlayerId, cfg, false)) {
//             return false;
//         }
//         this.calculateReward(this.currentPlayerId, cfg, false);
//         return true;
//     }

//     /**刷新任务 */
//     public net_refreshTask(): void {

//         let task: number[] = [];
//         let finishStarArr = PassTaskHelp.checkFinishTask(this.currentData.finishTaskIds);
//         finishStarArr.forEach((element, index) => {
//             if (element != 3) {
//                 task.push(index + 1);
//             }
//         });
//         this.currentData.refreshTask(PassTaskHelp.getStarTasks(this.currentPlayerId, task));

//         this.playerTaskTypeMap.set(this.currentPlayerId, []);
//         this.currentData.curTaskList.forEach(task => {
//             let cfg = GameConfig.VIPTask.getElement(task.i);
//             this.addPlayerTaskType(this.currentPlayerId, cfg.VIPTaskType);
//         });
//         this.currentData.onTaskRefresh.call(this.currentData.refreshCount);
//     }

//     /**背包是否满了 */
//     public isBagFull(playerId: number, cfg: IVIPLVElement, isvip: boolean): boolean {

//         if (cfg.Rewardtype == GlobalEnum.PassLVRewardType.PassEgg) {
//             let count = cfg.Reward * (isvip ? 2 : 1)
//             let data = Extension_DataCenterS.DataCenterS.getData(playerId, PetBagModuleData)
//             if (data.CurBagCapacity + count > data.BagCapacity)
//                 return false;
//         }
//         return true;
//     }

//     /**计算奖励 */
//     private calculateReward(playerId: number, cfg: IVIPLVElement, isVIP: boolean): void {
//         let rate = isVIP ? 2 : 1;
//         let type = GlobalEnum.PassLVRewardType;
//         switch (cfg.Rewardtype) {
//             case type.Diamond:
//                 this.playerMS.addDiamond(playerId, cfg.Reward * rate);
//                 break;
//             case type.FirstWorldGold:
//                 this.playerMS.addGold(playerId, cfg.Reward * rate, GlobalEnum.CoinType.FirstWorldGold);
//                 break;
//             case type.SecondWorldGold:
//                 this.playerMS.addGold(playerId, cfg.Reward * rate, GlobalEnum.CoinType.SecondWorldGold);
//                 break;
//             case type.SummerGold:
//                 this.playerMS.addGold(playerId, cfg.Reward * rate, GlobalEnum.CoinType.SummerGold);
//                 break;
//             case type.ThreeTimesAttack:
//                 this.buffMS.addBuff(playerId, GlobalEnum.BuffType.ThreeTimesDamage, cfg.Reward * rate);
//                 break;
//             case type.ThreeTimesGold:
//                 this.buffMS.addBuff(playerId, GlobalEnum.BuffType.ThreeTimesGold, cfg.Reward * rate);
//                 break;
//             case type.LuckyPotion:
//                 this.buffMS.addBuff(playerId, GlobalEnum.BuffType.LuckyPotion, cfg.Reward * rate);
//                 break;
//             case type.SuperLuckyPotion:
//                 this.buffMS.addBuff(playerId, GlobalEnum.BuffType.SuperLuckyPotion, cfg.Reward * rate);
//                 break;
//             case type.PassEgg:
//                 let count = cfg.Reward;
//                 while (count > 0) {
//                     let id = this.addEgg(2019);
//                     ModuleService.getModule(PetBagModuleS).addPetById(playerId, id);
//                     this.getClient(playerId).net_getEgg(id);
//                     count--;
//                 }
//                 break;
//             default:
//                 break;
//         }
//     }

//     private addEgg(cfgId: number) {
//         let cfg = GameConfig.EggMachine.getElement(cfgId);
//         let index = BagTool.calculateWeight(cfg.Weight);
//         return cfg.petArr[index];
//     }

//     public net_changeStarCount(count: number) {
//         return this.changeStarCount(this.currentPlayerId, count);
//     }
//     public changeStarCount(playerId: number, count: number) {
//         return this.getPlayerData(playerId).changeStarCount(count);
//     }

//     /**奖励补偿 版本升级*/
//     public taskCompensate(playerId: number): void {
//         let data = this.getPlayerData(playerId);
//         if (data.isCompensate) return;
//         let cfgV2 = GameConfig.VIPLV.getAllElement();
//         let cfgV1 = GameConfig.VIPLV111111111.getAllElement();
//         //是否需要补偿
//         let isNeedCompensate = false;
//         //已经领取的奖励数组
//         let hasArr = this.getReward(data.curLv, cfgV1);
//         //当前版本的奖励数组
//         let curArr = this.getReward(data.curLv, cfgV2);
//         //需要补偿的奖励数组
//         let compensateArr: { [key: number]: number } = {};
//         for (const key in curArr) {
//             if (hasArr[key] < curArr[key]) {
//                 isNeedCompensate = true;
//                 compensateArr[key] = curArr[key] - hasArr[key];
//             }
//         }
//         //  补偿奖励
//         for (const key in compensateArr) {
//             if (compensateArr.hasOwnProperty(key)) {
//                 const element = compensateArr[key];
//                 switch (Number(key)) {
//                     case GlobalEnum.PassLVRewardType.Diamond:
//                         if (element > 0)
//                             this.playerMS.addDiamond(playerId, element);
//                         break;
//                     case GlobalEnum.PassLVRewardType.FirstWorldGold:
//                         if (element > 0)
//                             this.playerMS.addGold(playerId, element, GlobalEnum.CoinType.FirstWorldGold);
//                         break;
//                     case GlobalEnum.PassLVRewardType.SecondWorldGold:
//                         if (element > 0)
//                             this.playerMS.addGold(playerId, element, GlobalEnum.CoinType.SecondWorldGold);
//                         break;
//                     case GlobalEnum.PassLVRewardType.SummerGold:
//                         if (element > 0)
//                             this.playerMS.addGold(playerId, element, GlobalEnum.CoinType.SummerGold);
//                         break;
//                     case GlobalEnum.PassLVRewardType.ThreeTimesAttack:
//                         this.buffMS.addBuff(playerId, GlobalEnum.BuffType.ThreeTimesDamage, element);
//                         break;
//                     case GlobalEnum.PassLVRewardType.ThreeTimesGold:
//                         if (element > 0)
//                             this.buffMS.addBuff(playerId, GlobalEnum.BuffType.ThreeTimesGold, element);
//                         break;
//                     case GlobalEnum.PassLVRewardType.LuckyPotion:
//                         if (element > 0)
//                             this.buffMS.addBuff(playerId, GlobalEnum.BuffType.LuckyPotion, element);
//                         break;
//                     case GlobalEnum.PassLVRewardType.SuperLuckyPotion:
//                         if (element > 0)
//                             this.buffMS.addBuff(playerId, GlobalEnum.BuffType.SuperLuckyPotion, element);
//                         break;
//                     case GlobalEnum.PassLVRewardType.PassEgg:
//                         let count = element;
//                         while (count > 0) {
//                             let id = this.addEgg(2019);
//                             ModuleService.getModule(PetBagModuleS).addPetById(playerId, id);
//                             this.getClient(playerId).net_getEgg(id);
//                             count--;
//                         }
//                         break;
//                     default:
//                         break;
//                 }
//             }
//         }
//         data.isCompensate = true;
//         data.save(false);
//         if (!isNeedCompensate) return;

//         this.getClient(playerId).net_taskCompensate(JSON.stringify(compensateArr));
//     }
//     private getReward(lv: number, cfg: IVIPLVElement[] | IVIPLV111111111Element): { [key: number]: number; } {
//         let arr: { [key: number]: number } = {};
//         let type = GlobalEnum.PassLVRewardType;
//         arr[type.Diamond] = 0;
//         arr[type.FirstWorldGold] = 0;
//         arr[type.SecondWorldGold] = 0;
//         arr[type.SummerGold] = 0;
//         arr[type.ThreeTimesAttack] = 0;
//         arr[type.ThreeTimesGold] = 0;
//         arr[type.LuckyPotion] = 0;
//         arr[type.SuperLuckyPotion] = 0;
//         arr[type.PassEgg] = 0;

//         for (let i = 0; i < lv; i++) {
//             arr[cfg[i].Rewardtype] += cfg[i].Reward;
//         }
//         return arr;
//     }



//     /*************任务************** */

//     /**
//      * 检查重置任务（每日）(玩家进入游戏时的检查)
//      */
//     private checkResetTask_onEnterGame(player: mw.Player, day: number): void {

//         let data = this.getPlayerData(player);

//         let currentDayNow: number = 0;
//         if (day == 0) {
//             currentDayNow = Date.now();
//         } else {
//             currentDayNow = Date.now() + day;
//         }
//         let lastDayNow = data.lastDayNow;

//         //计算两个时间戳相差的秒数
//         let seconds = Math.floor((currentDayNow - lastDayNow) / 1000);

//         let lastDate = new Date(lastDayNow);
//         let currentDate = new Date(currentDayNow);

//         let lastDay = lastDate.getDay();
//         let currentDay = currentDate.getDay();

//         let lastHours = lastDate.getHours();
//         let currentHours = currentDate.getHours();

//         let lastMinutes = lastDate.getMinutes();
//         let currentMinutes = currentDate.getMinutes();

//         let lastSeconds = lastDate.getSeconds();
//         let currentSeconds = currentDate.getSeconds();

//         let lastSecondss = lastHours * 3600 + lastMinutes * 60 + lastSeconds;
//         let currentSecondss = currentHours * 3600 + currentMinutes * 60 + currentSeconds;

//         //检查每日任务
//         if (seconds >= 86400) {
//             //超过一天
//             data.resetTask();
//         } else {
//             //不超过一天
//             if (lastDay == currentDay) {
//                 //同一天
//                 if (lastSecondss < 4 * 3600 && currentSecondss >= 4 * 3600) {
//                     data.resetTask();
//                 }
//             } else {
//                 //不同一天
//                 if ((lastSecondss >= 0 && lastSecondss < 4 * 3600 && currentSecondss >= 0 && currentSecondss < 4 * 3600) ||
//                     (lastSecondss >= 4 * 3600 && lastSecondss < 24 * 3600 && currentSecondss >= 4 * 3600 && currentSecondss < 24 * 3600)) {
//                     data.resetTask();
//                 }
//             }
//         }
//     }

//     /**初始化玩家任务 */
//     public initPlayerTask(playerId: number) {
//         let data = this.getPlayerData(playerId);
//         if (data.curTaskList.length == 0 && data.finishTaskIds.length == 0) {
//             data.addTask(PassTaskHelp.getStarTasks(playerId, [1, 2, 3]));
//         }
//         data.curTaskList.forEach(task => {
//             let cfg = GameConfig.VIPTask.getElement(task.i);
//             this.addPlayerTaskType(playerId, cfg.VIPTaskType);
//         });
//     }

//     /**添加玩家任务类型 */
//     public addPlayerTaskType(playerId: number, type: number) {
//         let arr = this.playerTaskTypeMap.get(playerId);
//         if (!arr) {
//             arr = [];
//             this.playerTaskTypeMap.set(playerId, arr);
//         }
//         arr.push(type);
//     }
//     /**移除玩家任务类型 */
//     public removePlayerTaskType(playerId: number, type: number) {
//         let arr = this.playerTaskTypeMap.get(playerId);
//         if (arr) {
//             let index = arr.indexOf(type);
//             if (index != -1) {
//                 arr.splice(index, 1);
//             }
//         }
//     }
//     /**获取玩家任务类型 */
//     public getPlayerTaskType(playerId: number): number[] {
//         return this.playerTaskTypeMap.get(playerId);
//     }
//     /**删除玩家 */
//     public deletePlayer(playerId: number) {
//         this.playerTaskTypeMap.delete(playerId);
//     }

//     public net_addTask(taskId: number) {
//         this.currentData.addTask([taskId]);

//         let cfg = GameConfig.VIPTask.getElement(taskId);
//         let type = GlobalEnum.VipTaskType;
//         this.addPlayerTaskType(this.currentPlayerId, cfg.VIPTaskType);

//         if (cfg.VIPTaskType == type.OnlineTime) {
//             this.onlineTask(this.currentPlayerId, [this.currentData.getTaskById(taskId)]);
//         }
//     }




//     /**完成任务 */
//     public completeTask(playerId: number, taskId: number) {
//         let cfg = GameConfig.VIPTask.getElement(taskId);
//         this.removePlayerTaskType(playerId, cfg.VIPTaskType);

//         if (cfg.Giftcoin) {
//             this.playerMS.addDiamond(playerId, cfg.Giftcoin);
//         }
//         this.changeStarCount(playerId, cfg.Star);
//         this.getPlayerData(playerId).finishTask(taskId);
//     }

//     /**监听任务完成 */
//     private onTaskComplete(playerId: number, curtype: GlobalEnum.VipTaskType, count: number) {
//         let types = this.playerTaskTypeMap.get(playerId);
//         if (!types) {
//             oTraceError('lwj 没有找到玩家 ERROR' + playerId);
//             return;
//         }
//         if (!types.includes(curtype)) {
//             return;
//         }

//         let task = this.getPlayerData(playerId).getTaskByType(curtype);
//         if (task.length == 0) {
//             oTraceError('lwj 没有找到任务 ERROR' + playerId + "  " + curtype);
//             return;
//         }
//         let type = GlobalEnum.VipTaskType;

//         if (curtype == type.OnlineTime) {
//             this.onlineTask(playerId, task);
//         } else {
//             this.updateTaskProgress(playerId, task, count);
//         }

//     }
//     /**在线任务
//     * @param playerId 玩家id
//     * @param task 任务
//     */
//     private onlineTask(playerId: number, taskId: Task[]) {

//         for (let i = 0; i < taskId.length; i++) {
//             const element = taskId[i];
//             let target = GameConfig.VIPTask.getElement(element.i).TragetNum;

//             let arr = DataCenterS.getData(playerId, OnlineModuleData).HasGetArr;
//             if (arr.includes(target)) {
//                 this.completeTask(playerId, element.i);
//             }
//         }


//     }

//     /**更新任务进度 */
//     public updateTaskProgress(playerId: number, task: Task[], count: number) {

//         let ids: number[] = [];
//         let progress: number[] = [];

//         for (let i = 0; i < task.length; i++) {
//             const element = task[i];
//             let tar = GameConfig.VIPTask.getElement(element.i).TragetNum;
//             element.p += count;
//             if (element.p >= tar) {
//                 this.completeTask(playerId, element.i);
//             } else {
//                 ids.push(element.i);
//                 progress.push(element.p);
//             }
//         }

//         this.getClient(playerId).net_updateTaskProgress(ids, progress)
//     }




//     /**
//      * 当服务器端收到玩家的发货信息时，进行发货
//      * @param player
//      * @param orderId
//      * @param boxId
//      * @param amount
//      * @param confirmOrder
//      */
//     private onKeyConsume(player: mw.Player, orderId: string, boxId: string, amount: number, confirmOrder: (bReceived: boolean) => void): void {
//         this.getClient(player).net_consumeKeyGetReward();
//         confirmOrder(true);
//     }
// }
