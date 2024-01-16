// import { GameConfig } from "../../config/GameConfig";
// import { GlobalData } from "../../const/GlobalData";
// import VIPBuy_Generate from "../../ui-generate/PetVIP/VIPBuy_generate";
// import VIPHud_Generate from "../../ui-generate/PetVIP/VIPHud_generate";
// import VIPKey_Generate from "../../ui-generate/PetVIP/VIPKey_generate";
// import VIPKeyitem_Generate from "../../ui-generate/PetVIP/VIPKeyitem_generate";
// import { oTraceError } from "../../utils/LogManager";
// import { cubicBezier } from "../../utils/MoveUtil";
// import { bezierCurve } from "../../utils/uitls";

// /**花费钥匙买提示 */
// export class P_KeyTips extends VIPKey_Generate {

//     /**购买事件*/
//     public onBuyAC: Action = new Action();

//     private items: Array<VIPKeyitem_Generate> = [];

//     onStart() {
//         this.mBtn_Close.onClicked.add(() => {
//             this.hide();
//         });
//         this.mBtn_Buy.onClicked.add(() => {
//             this.hide();
//             this.onBuyAC.call();
//         });

//     }

//     public showItems(curLv: number): void {
//         //计算需要几个item
//         let cfgs: number[] = [];
//         let curStar = GlobalData.PassTask.keyToStar;
//         while (curStar > 0) {
//             curLv++;
//             curStar -= GameConfig.VIPLV.getElement(curLv).StarCount;
//             if (curStar > 0)
//                 cfgs.push(curLv);
//         }

//         let needCount = cfgs.length - this.items.length;
//         if (needCount > 0) {
//             for (let i = 0; i < needCount; i++) {
//                 let item = mw.UIService.create(VIPKeyitem_Generate);
//                 this.items.push(item);
//                 item.uiObject.size = item.mCanvas.size;
//                 this.mCanvas.addChild(item.uiObject);
//             }
//         }
//         //更新item
//         for (let i = 0; i < this.items.length; i++) {
//             this.items[i].mImage_Icon.imageGuid = GameConfig.VIPLV.getElement(cfgs[i]).Icon;
//         }

//         this.show();

//     }


// }


// /**大会员提示 */
// export class P_VIPBuyTips extends VIPBuy_Generate {

//     onStart() {
//         this.mBtn_Close.onClicked.add(() => {
//             this.hide();
//         });
//         this.mBtn_Yes.onClicked.add(() => {
//             this.hide();
//         });
//     }
// }

// /**任务显示页 */
// export class P_TaskHud extends VIPHud_Generate {

//     private curX: number;
//     private X: number;
//     private isOpne: boolean = true;
//     private closeTween: mw.Tween<{ locX: number; }>;
//     private openTween: mw.Tween<{ locX: number; }>;

//     public onShowVipAC: Action = new Action();
//     /**刷新任务事件 */
//     public onFlushTaskAC: Action = new Action();

//     onStart() {
//         this.curX = this.mCanvas.position.x;
//         this.X = this.mCanvas.size.x;
//         this.setTaskText(1, GameConfig.Language.VIP_Tips_6.Value);
//         this.setTaskText(2, GameConfig.Language.VIP_Tips_6.Value);
//         this.setTaskText(3, GameConfig.Language.VIP_Tips_6.Value);
//         this.mBtn_Main.onClicked.add(() => {
//             this.isOpne = !this.isOpne;
//             this.isOpne ? this.openUI() : this.closeUI();
//         });
//         this.mBtn_Vip.onClicked.add(() => {
//             this.onShowVipAC.call();
//         });
//         this.mBtn_Flush.onClicked.add(() => {
//             this.onFlushTaskAC.call();
//             this.mBtn_Flush.enable = false;
//             setTimeout(() => {
//                 //防止连点
//                 this.mBtn_Flush.enable = true;
//             }, 1000);
//         })
//     }


//     /**设置任务文本 */
//     public setTaskText(star: number, text: string): void {
//         switch (star) {
//             case 1:
//                 this.mStarText_1.text = text;
//                 break;
//             case 2:
//                 this.mStarText_2.text = text;
//                 break;
//             case 3:
//                 this.mStarText_3.text = text;
//                 break;

//             default:
//                 break;
//         }
//     }
//     /**设置刷新次数 */
//     public setRefreshCount(count: number): void {
//         if (count == 0) {
//             this.mBtn_Flush.onClicked.clear();
//         }
//         if (!this.mBtn_Flush.visible) this.mBtn_Flush.visibility = mw.SlateVisibility.Visible;
//         this.mTextBlock.text = StringUtil.format(GameConfig.Language.VIPHud_Text_2.Value, count.toString());
//     }
//     public closeUI() {
//         if (this.closeTween) {
//             // this.closeTween.stop();
//             // this.mCanvas.position = new mw.Vector2(this.curX + this.X, this.mCanvas.position.y)
//             return;
//         }
//         let bezier = GlobalData.PassTask.closeTipsBezier;
//         let y = this.mCanvas.position.y;

//         // tween进行到一半时翻转箭头
//         setTimeout(() => {
//             this.mBtn_Main.renderTransformAngle += 180;
//         }, GlobalData.PassTask.closeTpisTime / 2);
//         // 折叠动画
//         this.closeTween = new mw.Tween({ locX: this.curX, alpha: 1 }).to({ locX: - this.X, alpha: 0 }, GlobalData.PassTask.closeTpisTime)
//             .start()
//             .onUpdate((item) => {
//                 this.mCanvas.position = new mw.Vector2(item.locX, y);
//                 this.mBtn_Flush.renderOpacity = item.alpha;
//             })
//             .onComplete(() => {
//                 // 隐藏刷新按钮和打开通行证按钮
//                 this.mBtn_Flush.visibility = mw.SlateVisibility.Hidden;
//                 this.closeTween = null;
//                 this.mCanvas.position = new mw.Vector2(- this.X, y)
//             })
//             .easing(cubicBezier(bezier[0], bezier[1], bezier[2], bezier[3]));
//     }

//     public openUI() {
//         if (this.openTween) {
//             this.openTween.stop();
//             this.mCanvas.position = new mw.Vector2(- this.X, this.mCanvas.position.y)
//         }
//         let y = this.mCanvas.position.y;
//         let x = this.mCanvas.position.x;
//         let bezier = GlobalData.PassTask.openTipsBezier;
//         // 显示刷新按钮和打开通行证按钮
//         this.mBtn_Flush.visibility = mw.SlateVisibility.Visible;
//         // tween进行到一半时翻转箭头
//         setTimeout(() => {
//             this.mBtn_Main.renderTransformAngle += 180;
//         }, GlobalData.PassTask.openTipsTime / 2);
//         // 展开动画
//         this.openTween = new mw.Tween({ locX: x, alpha: 0 }).to({ locX: this.curX, alpha: 1 }, GlobalData.PassTask.openTipsTime)
//             .start()
//             .onUpdate((item) => {
//                 this.mCanvas.position = new mw.Vector2(item.locX, y)
//                 this.mBtn_Flush.renderOpacity = item.alpha;
//             })
//             .onComplete(() => {
//                 this.openTween = null;
//                 this.mCanvas.position = new mw.Vector2(this.curX, y)
//             })
//             .easing(cubicBezier(bezier[0], bezier[1], bezier[2], bezier[3]));
//     }

// }