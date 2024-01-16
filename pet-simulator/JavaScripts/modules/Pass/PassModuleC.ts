// import { GameConfig } from "../../config/GameConfig";
// import { GlobalEnum } from "../../const/Enum";
// import { GlobalData } from "../../const/GlobalData";
// import { oTraceError } from "../../utils/LogManager";
// import MessageBox from "../../utils/MessageBox";
// import { utils } from "../../utils/uitls";
// import { AnalyticsTool } from "../Analytics/AnalyticsTool";
// import { TipsManager } from "../Hud/P_TipUI";
// import { EggMachineTween } from "../InteractiveObjs/EggMachineTween";
// import { PlayerModuleC } from "../Player/PlayerModuleC";
// import { PassData } from "./PassData";
// import { PassModuleS } from "./PassModuleS";
// import { P_PassTask } from "./PassPanel";
// import { PassTaskHelp } from "./PassTaskHelp";
// import { P_KeyTips, P_TaskHud, P_VIPBuyTips } from "./PassTips";
// // 027在改成编辑器接口
// import { Extension as Extension_ModuleManager } from "../../ExtensionOdin/manager/module/ModuleManager";
// import ModuleService = Extension_ModuleManager.ModuleService;;

// // 027在改成编辑器接口
// import { Extension as Extension_GameInitializer } from "../../ExtensionOdin/GameInitializer";

// export class PassModuleC extends ModuleC<PassModuleS, PassData> {

//     //UI
//     private keyTips: P_KeyTips = null;
//     private bigVipTips: P_VIPBuyTips = null;
//     private passTask: P_PassTask = null;
//     private taskHud: P_TaskHud = null;


//     private isVIP: boolean = false;

//     protected onStart(): void {

//         this.createUI();
//         this.bindEvent();
//         this.initShow();
//         this.initEggTween();
//     }
//     /**创建ui */
//     private createUI(): void {
//         this.bigVipTips = mw.UIService.getUI(P_VIPBuyTips);
//         this.keyTips = mw.UIService.getUI(P_KeyTips);
//         this.passTask = mw.UIService.getUI(P_PassTask);
//         this.taskHud = mw.UIService.getUI(P_TaskHud);
//         this.passTask.setStarCount(this.data.starCount);
//     }

//     /**绑定事件 */
//     private bindEvent(): void {
//         this.keyTips.onBuyAC.add(this.buyKeyVIP.bind(this));
//         this.passTask.onBuyLv.add(() => { this.keyTips.showItems(this.data.curLv) });
//         this.passTask.onBuyBigVip.add(() => { this.bigVipTips.show(); });
//         this.passTask.onBtnClickAC.add(this.onBtnClick.bind(this));

// this.data.onStarChange.add(() => {
//     this.passTask.setStarCount(this.data.starCount);
//     ModuleService.getModule(PlayerModuleC).checkCoinGradient(GlobalEnum.BuryingPointCoin.Star, this.data.starCount);
// });
// this.data.onTaskFinish.add(this.finshTask.bind(this));
// this.data.onTaskRefresh.add(this.refreshCount.bind(this));
// this.taskHud.onShowVipAC.add(() => { this.showPassTask(); });
// this.taskHud.onFlushTaskAC.add(() => { this.server.net_refreshTask(); });

//         PurchaseService.onPremiumMemberStatusUpdate.add((result) => {
//             if (result) {
//                 this.isVIP = false;//TODO
//                 this.bigVipTips.hide();
//                 //AnalyticsTool.send_ts_action_unlock(0, 1, 0);//通过游戏按钮购买了会员时上报1 默认填0
//             }
//         });
//     }
//     /**初始化显示 */
//     private initShow(): void {
//         this.taskHud.setRefreshCount(this.data.refreshCount);
//     }

//     public showPassTask(): void {

//         if (this.data.vipGetArr.length < this.data.curLv && this.isVIP) {
//             //之前不是Vip，现在是Vip
//             this.passTask.show(this.data.curLv, this.data.vipGetArr);
//         }
//         this.passTask.show(this.data.curLv);
//     }

//     /**按钮解锁 */
//     private onBtnClick(cfgId: number, isVip: boolean): void {
//         if (isVip) {
//             this.getReward(cfgId);
//             return;
//         }
//         this.buyStar(cfgId);
//     }


//     /**钥匙购买 */
//     private buyKeyVIP(): void {
//         if (SystemUtil.isPIE) {
//             this.server.net_changeStarCount(GlobalData.PassTask.keyToStar)
//         } else {
//             if (this.isVIP) {
//                 this.consumeKey();
//             } else {
//                 this.bigVipTips.show();
//             }
//         }
//     }
//     private consumeKey(): void {
//         PurchaseService.getUserKeyNumber((keyNumber) => {
//             // 钥匙足够，消费钥匙
//             if (keyNumber > 0) {
//                 PurchaseService.consumeKey(this.currentPlayerId.toString(), 1, 1, (status: mw.consumeKeyStatus) => {
//                     if (status == mw.consumeKeyStatus.Error) {
//                         MessageBox.showOneBtnMessage(GameConfig.Language.VIP_Tips_1.Value);
//                         return;
//                     }
//                     if (status == mw.consumeKeyStatus.Success) {
//                         // 下单成功，不处理，等待服务端通知
//                         // Tips.show(GameConfig.Language.Tips_svip_update.Value);
//                     }
//                 });
//             }
//             else {
//                 MessageBox.showOneBtnMessage(GameConfig.Language.VIP_Tips_1.Value);
//             }
//         });
//     }
//     public net_consumeKeyGetReward(): void {
//         this.server.net_changeStarCount(GlobalData.PassTask.keyToStar)
//         TipsManager.instance.showTip(GameConfig.Language.VIP_Tips_2.Value);
//     }

//     /**星星购买通行证 */
//     private async buyStar(cfgId: number): Promise<void> {
//         let isSuccess = await this.server.net_buyStar(cfgId, this.isVIP);
//         if (isSuccess == 0) {
//             MessageBox.showOneBtnMessage(GameConfig.Language.Text_messagebox_4.Value);

//         } else if (isSuccess == -1) {
//             MessageBox.showOneBtnMessage(GameConfig.Language.VIP_Tips_3.Value);
//         } else {
//             //当前等级==cfgID
//             this.passTask.successBuy(cfgId);
//             //TIPs 播报奖励
//             let cfg = GameConfig.VIPLV.getElement(cfgId);
//             let rate = this.isVIP ? 2 : 1;
//             this.showTips(cfg.Rewardtype, cfg.Reward * rate);

//             //埋点
//             AnalyticsTool.task_get(cfgId);
//         }
//     }
//     /**之后开VIP 领取未领取的会员奖励 */
//     private async getReward(cfgId: number): Promise<void> {
//         let isSuccess = await this.server.net_getReward(cfgId);
//         if (!isSuccess) {
//             MessageBox.showOneBtnMessage(GameConfig.Language.Text_messagebox_4.Value);
//         }
//     }

//     /**是否在领取奖励 */
//     private isGettingItem: boolean = false;
//     /**初始化扭蛋动画 */
//     private initEggTween() {
//         EggMachineTween.instance.onTweenAc.add((isStart) => {
//             if (!isStart) {
//                 this.isGettingItem = false;
//             }
//         })
//     }

//     private showTips(rewardtype: number, reward: number) {
//         let type = GlobalEnum.PassLVRewardType;
//         switch (rewardtype) {
//             case type.Diamond:
//                 TipsManager.instance.showTip(StringUtil.format(GameConfig.Language.Tips_gift_2.Value, reward))
//                 break;
//             case type.FirstWorldGold:
//                 TipsManager.instance.showTip(StringUtil.format(GameConfig.Language.Tips_gift_1.Value, reward))
//                 break;
//             case type.SecondWorldGold:
//                 TipsManager.instance.showTip(StringUtil.format(GameConfig.Language.Tips_gift_1.Value, reward))
//                 break;
//             case type.SummerGold:
//                 TipsManager.instance.showTip(GameConfig.Language.Claw_Tips_7.Value)
//                 break;
//             case type.ThreeTimesAttack:
//                 TipsManager.instance.showTip(utils.GetUIText(282));
//                 break;
//             case type.ThreeTimesGold:
//                 TipsManager.instance.showTip(utils.GetUIText(283));
//                 break;
//             case type.LuckyPotion:
//                 TipsManager.instance.showTip(utils.GetUIText(284));
//                 break;
//             case type.SuperLuckyPotion:
//                 TipsManager.instance.showTip(utils.GetUIText(285));
//                 break;
//             case type.PassEgg:
//                 break;
//             default:
//                 break;
//         }
//     }

//     /**客户端获得蛋UI */
//     public async net_getEgg(petId: number) {
//         // 正在操作娃娃机或正在领取奖励时则等待
//         if (this.isGettingItem) {
//             setTimeout(() => {
//                 this.net_getEgg(petId);
//             }, 1000);
//             return;
//         }
//         this.isGettingItem = true;
//         let eggObj: GameObject = await GameObject.asyncFindGameObjectById(GlobalData.SpecialEgg.passportEgg);

//         EggMachineTween.instance.startTween(eggObj, petId, new Rotation(0, 0, -90));
//     }

//     /**版本升级 补偿奖励 */
//     public net_taskCompensate(str: string): void {
//         let arr = JSON.parse(str) as { [key: number]: number; };
//         MessageBox.showOneBtnMessage(GameConfig.Language.VIP_Tips_7.Value, () => {
//             for (const key in arr) {
//                 if (arr.hasOwnProperty(key)) {
//                     const element = arr[key];
//                     if (element == 0) continue;
//                     this.showTips(Number(key), element);
//                 }
//             }
//         })
//     }



//     //#region 任务

//     /**当前任务map taskId ,Level */
//     private curTaskMap: Map<number, number> = new Map<number, number>();


//     /**完成一个任务 */
//     private finshTask(taskId: number) {
//         let newTaskId = PassTaskHelp.getNewTask(taskId, this.data.finishTaskIds, this.isVIP);
//         let cfg = GameConfig.VIPTask.getElement(taskId);
//         //埋点
//         AnalyticsTool.task_over(taskId, cfg.VIPTaskType, cfg.level);

//         if (this.curTaskMap.has(taskId)) {
//             this.curTaskMap.delete(taskId);
//         }
//         if (cfg.Giftcoin > 0)
//             TipsManager.instance.showTip(StringUtil.format(GameConfig.Language.Tips_gift_2.Value, cfg.Giftcoin));
//         if (cfg.Star > 0)
//             TipsManager.instance.showTip(StringUtil.format(GameConfig.Language.VIP_Tips_5.Value, cfg.Star))

//         if (newTaskId == 0) {
//             this.taskHud.setTaskText(cfg.level, GameConfig.Language.VIP_Tips_4.Value);
//         } else {
//             cfg = GameConfig.VIPTask.getElement(newTaskId);
//             let str = StringUtil.format(cfg.Name, cfg.TragetNum)
//             this.taskHud.setTaskText(cfg.level, str);
//             this.server.net_addTask(newTaskId);

//             this.curTaskMap.set(newTaskId, cfg.level);
//         }
//     }

//     /**刷新任务 */
//     private refreshCount(count: number) {
//         this.setTask();
//         this.taskHud.setRefreshCount(count);
//     }



//     public net_startTask(): void {
//         this.setTask();
//         this.taskHud.setRefreshCount(this.data.refreshCount);
//     }
//     /**设置任务 */
//     private setTask() {
//         this.data.curTaskList.forEach((taskId) => {
//             let cfg = GameConfig.VIPTask.getElement(taskId.i);
//             let str = StringUtil.format(cfg.Name, cfg.TragetNum - taskId.p)
//             this.taskHud.setTaskText(cfg.level, str);
//             this.curTaskMap.set(taskId.i, cfg.level);
//         });
//         this.taskHud.show();
//     }

//     public net_updateTaskProgress(taskId: number[], progress: number[]): void {
//         taskId.forEach((id, index) => {
//             let cfg = GameConfig.VIPTask.getElement(id);
//             let str = StringUtil.format(cfg.Name, cfg.TragetNum - progress[index])
//             this.taskHud.setTaskText(cfg.level, str);
//         })

//     }




//     //#endregion
// }