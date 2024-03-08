import { IItemElement } from "../../../../config/Item";
import SupportCard_Generate from "../../../../ui-generate/ShareUI/common/SupportCard_generate";
import { LanUtil } from "../../../utils/LanUtil";
import { PlayerModuleC } from "../../player/PlayerModuleC";
import { EquipModuleC } from "../EquipModuleC";
import { DialogUI } from "../ui/DialogUI";
import { Item, registerItem } from "./Item";

/**
 * 牌子道具类，继承自玩具道具类
 * 用于控制玩家牌子的显示，具体文字的设置
*/
@registerItem
export class BrandItem extends Item {
    /** 缓存牌子文本 */
    public static cacheBrandTxt: string = "";

    /**
     * 拿起道具时触发的方法，打开输入框
     * @param element 道具元素
     */
    public onHand(element: IItemElement, itemIns: GameObject, ownerId: number): void {
        const player = Player.getPlayer(ownerId);
        if (!player || !player.character || !player.character.worldTransform) {
            return;
        }
        const stance = player.character.loadAnimation("174562");
        stance.slot = AnimSlot.Upper;
        stance.loop = 0;
        stance.play();
        if (ownerId == Player.localPlayer.playerId) {
            this.onUse(element);
        }
    }

    public setText(itemIns: GameObject, txt: string) {
        let children = itemIns.getChildren();
        if (!children) {
            return;
        }
        for (let index = 0; index < children.length; index++) {
            const child = children[index] as mw.UIWidget;
            if (child.name == "brand") {
                let ui = child["brandUI"]
                if (!ui) {
                    ui = UIService.create(SupportCard_Generate);
                    child.setTargetUIWidget(ui.uiWidgetBase);
                    child["brandUI"] = ui;
                }
                ui.txt_name.text = txt;
            }
        }
    }

    /**
     * 使用道具时触发的方法，打开输入框
     * @param element 道具元素
     */
    public onUse(element: IItemElement): boolean {
        /** 打开输入框 */
        UIService.getUI(DialogUI).show(element.name, LanUtil.getText("Brand_1"), BrandItem.cacheBrandTxt, false, 10, (text: string) => {
            BrandItem.cacheBrandTxt = text;
            ModuleService.getModule(EquipModuleC).reqChangeBrandTxt(text);
        })
        return true;
    }

    /**
     * 放下道具时触发的方法，清空牌子同步文本
     * @param element 道具元素
     */
    public onRemoveHand(element: IItemElement, ownerId: number): void {
        const player = Player.getPlayer(ownerId);
        player.character.currentAnimation?.stop();
    }
}