// import { GameConfig } from "../../config/GameConfig";
// import { EModule_Events } from "../../const/Enum";
// import { EventManager } from "../../tool/EventManager";
// import { util } from "../../tool/Utils";
// import ItemDrop_Generate from "../../ui-generate/drop/ItemDrop_generate";
// import PDrop_Generate from "../../ui-generate/drop/PDrop_generate";


// class ItemDrop extends ItemDrop_Generate {

//     public itemId: number = 0;
//     public triggerGuid: string = null;

//     onStart() {
//         this.mBtn.onClicked.add(() => {
//             EventManager.instance.call(EModule_Events.drop_pickUpFromView, this.triggerGuid);
//         });
//     }

//     public init(itemId: number, triggerGuid: string) {
//         this.itemId = itemId;
//         this.triggerGuid = triggerGuid;
//         let bagCfg = GameConfig.Bag.getElement(this.itemId);

//         util.setIcon_modelGuid(this.mIcon, bagCfg);

//         this.mName.text = bagCfg.Name;
//     }

// }

// /**
//  * 道具拾取界面
//  */
// export class PDrop extends PDrop_Generate {

//     private _itemPool: ItemDrop[] = [];

//     private _showItems: ItemDrop[] = [];


//     onStart() {
//         EventManager.instance.add(EModule_Events.drop_pickUp2View, this.listen_pickUp2View.bind(this));
//         EventManager.instance.add(EModule_Events.drop_pickUpFromView, this.listen_pickUpFromView.bind(this));
//     }

//     /**监听拾取 */
//     private listen_pickUpFromView(triggerGuid: string) {
//         this.removeItemToList(triggerGuid);
//     }

//     /**
//      * 监听触发事件
//      * @param pickUp true进去触发器 false离开
//      * @param itemId 道具id
//      * @param triggerGuid 触发器的guid
//      */
//     private listen_pickUp2View(enter: boolean, itemId: number, triggerGuid: string) {
//         if (enter) {
//             this.addItemToList(itemId, triggerGuid);
//         } else {
//             this.removeItemToList(triggerGuid);
//         }
//     }


//     /**获取缓存 */
//     private getItemFromPool(): ItemDrop {
//         if (this._itemPool.length > 0) {
//             let item = this._itemPool.pop();
//             this.mContent.addChild(item.uiObject);
//             item.uiObject.visibility = mw.SlateVisibility.SelfHitTestInvisible;
//             return item;
//         }

//         let item = mw.UIService.create(ItemDrop);
//         this.mContent.addChild(item.uiObject);
//         return item;
//     }

//     /**添加物品到列表 */
//     private addItemToList(itemId: number, triggerGuid: string) {

//         // 避免重复添加
//         let index = this._showItems.findIndex((item) => {
//             return item.triggerGuid == triggerGuid;
//         });

//         if (index != -1) return;

//         if (this.visible == false) {
//             mw.UIService.showUI(this, mw.UILayerBottom);
//         }

//         let item = this.getItemFromPool();

//         item.init(itemId, triggerGuid);

//         this._showItems.push(item);
//     }

//     /**
//      * 移除拾取信息
//      * @param itemId 
//      * @param triggerGuid 
//      * @returns 
//      */
//     private removeItemToList(triggerGuid: string) {

//         let index = this._showItems.findIndex((item) => {
//             return item.triggerGuid == triggerGuid;
//         });

//         if (index == -1) return;

//         let item = this._showItems.splice(index, 1)[0];

//         this.rootCanvas.addChild(item.uiObject);

//         item.uiObject.visibility = mw.SlateVisibility.Collapsed;

//         this._itemPool.push(item);


//         if (this._showItems.length == 0 && this.visible) {
//             mw.UIService.hideUI(this);
//         }


//     }



// }