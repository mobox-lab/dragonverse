// import { GameConfig } from "../../config/GameConfig";
// import { EModule_Events } from "../../const/Enum";
// import { EventManager } from "../../tool/EventManager";
// import Money_Generate from "../../ui-generate/common/Money_generate";
// import { MoveUIUtil } from "../AlchemyModule/AlchemyUI/P_Alchemy";
// import { PlayerModuleData } from "../PlayerModule/PlayerModuleData";
// import { Attribute } from "../PlayerModule/sub_attribute/AttributeValueObject";





// const time: number = GameConfig.Global.getElement(124).float_Value;

// export class P_Money extends Money_Generate {

//     private startLoc: mw.Vector2 = null;

//     private endLoc: mw.Vector2 = null;

//     onStart() {
//         this.layer = mw.UILayerTop;
//         EventManager.instance.add(EModule_Events.moneyChange, this.changeMoney.bind(this));
//         this.startLoc = new mw.Vector2(this.mMoney_Canvas.position.x, this.mMoney_Canvas.position.y - this.mMoney_Canvas.size.y);
//         this.endLoc = this.mMoney_Canvas.position.clone()
//     }

//     onShow() {
//         let curMoney = DataCenterC.getData(PlayerModuleData).getAttrValue(Attribute.EnumAttributeType.money);

//         this.changeMoney(curMoney);
//         MoveUIUtil.locMove(this.mMoney_Canvas, this.startLoc.clone(), this.endLoc, time);
//     }

//     private changeMoney(value: number) {
//         this.mText_money.text = value.toString();
//     }
// }