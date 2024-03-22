// import { GameConfig } from "../../../../config/GameConfig";
// import { IGhostGraphElement } from "../../../../config/GhostGraph";
// import GhostItem_UI_Generate from "../../../../ui-generate/ShareUI/GhostItem_UI_generate";
// import GhostPic_UI_Generate from "../../../../ui-generate/ShareUI/GhostPic_UI_generate";
// import Handbook_UI_Generate from "../../../../ui-generate/ShareUI/Handbook_UI_generate";
// import { GhostTraceHelper } from "../../../utils/TraceHelper";
// import { GridContainer } from "../../../utils/UIPool";
// import { RouteModuleC } from "../../route/RouteModule";
//
// export class GhostGraphItem extends GhostItem_UI_Generate {
//
//     onStart() {
//         this.btn_type.onClicked.add(() => {
//             if (this.isUnlocked) {
//                 UIService.show(GhostGraphDetails, this.cfg);
//             } else {
//                 if (this.canvas_tips.visible) {
//                     this.canvas_tips.visibility = SlateVisibility.Collapsed;
//                     this.text_questionMark.visibility = SlateVisibility.SelfHitTestInvisible;
//                 } else {
//                     this.canvas_tips.visibility = SlateVisibility.SelfHitTestInvisible;
//                     this.text_questionMark.visibility = SlateVisibility.Collapsed;
//                 }
//             }
//         });
//     }
//
//     private cfg: IGhostGraphElement;
//
//     /** 是否解锁 */
//     private isUnlocked: boolean = false;
//
//     setData(cfg: IGhostGraphElement, unlockedGraphList: number[]) {
//         this.cfg = cfg;
//         if (unlockedGraphList.includes(cfg.id)) { this.isUnlocked = true; }
//         if (this.isUnlocked) {
//             this.img_ghost.imageGuid = cfg.unlockedImgGuid;
//             this.nameTxt.text = cfg.name;
//             this.text_questionMark.visibility = SlateVisibility.Collapsed;
//         } else {
//             this.img_ghost.imageGuid = cfg.imgGuid;
//             this.nameTxt.text = GameConfig.SubLanguage["ghostLock_01"].Value;
//             this.text_questionMark.visibility = SlateVisibility.SelfHitTestInvisible;
//         }
//         this.canvas_tips.visibility = SlateVisibility.Collapsed;
//         this.text_tips.text = this.cfg.unlockTips;
//     }
// }
//
// export class GhostGraphDetails extends GhostPic_UI_Generate {
//
//     onStart() {
//         this.btn_back.onClicked.add(() => { UIService.hideUI(this) });
//     }
//
//     onShow(cfg: IGhostGraphElement) {
//
//         GhostTraceHelper.uploadMGS("ts_action_buy_box", "打开详情页", { item_id: cfg.id });
//
//         this.img_ghost.imageGuid = cfg.unlockedImgGuid;
//         this.nameTxt.text = cfg.name;
//         this.typeTxt.text = cfg.typeDesc;
//         this.weakTxt.text = cfg.weekDesc;
//         this.backTxt.text = cfg.backDesc;
//     }
// }
//
// export default class GhostGraphPanel extends Handbook_UI_Generate {
//
//     private container: GridContainer<GhostGraphItem>;
//
//     protected onStart() {
//
//         this.btn_back.onClicked.add(() => { UIService.hideUI(this) });
//
//         this.container = new GridContainer<GhostGraphItem>(this.canvas_type, GhostGraphItem);
//     }
//
//     protected onShow() {
//
//         let cfgList = GameConfig.GhostGraph.getAllElement();
//         /** 按权重排序，决定显示顺序 */
//         cfgList.sort((v1, v2) => { return v2.viewWeight - v1.viewWeight });
//         this.container.removeAllNode();
//
//         DataCenterC.ready().then(async () => {
//             const unlockedGraphList = await ModuleService.getModule(RouteModuleC).reqUnlockedGraphList();
//             cfgList.forEach(e => {
//                 let node = this.container.addNode();
//                 node.setData(e, unlockedGraphList);
//             })
//         })
//     }
// }