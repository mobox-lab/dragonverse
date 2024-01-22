import SecondNoticeItem_Generate from "../../../ui-generate/notice/SecondNoticeItem_generate"
import { Attribute } from "../../PlayerModule/sub_attribute/AttributeValueObject"

export class SecondNoticeItem extends SecondNoticeItem_Generate {
    lifeTime: number
    targetHeight: number
    position: mw.Vector2
    effTween: Tween<{ x: number }>
    private static startPoint: mw.Vector2 = new mw.Vector2(-60, -30)
    private static endPoint: mw.Vector2 = new mw.Vector2(300, -30)

    onStart() {
        this.effTween = new Tween({ x: 0 }).to({ x: 1 }, 500).onStart(() => {
            this.effect.position = SecondNoticeItem.startPoint
        }).onUpdate(obj => {
            this.effect.position = mw.Vector2.lerp(SecondNoticeItem.startPoint, SecondNoticeItem.endPoint, obj.x)
        })
    }

    // vae
    // setItemInfo(itemInfo: ItemBaseInfo) {
    //     let itemCfg = GameConfig.Item.getElement(itemInfo.cfgID)
    //     this.icon.imageGuid = itemCfg.Icon
    //     if (itemCfg.Color) {
    //         this.txt_context.setFontColorByHex(itemCfg.Color)
    //     } else {
    //         this.txt_context.setFontColorByHex('#FFFFFFFF')
    //     }
    //     this.txt_context.text = `${itemCfg.Name} * ${itemInfo.count}`
    // }

    setAttrInfo(attrType: Attribute.EnumAttributeType, value: number) {
        this.icon.imageGuid = Attribute.AttributeIcon[attrType]
        this.txt_context.text = `${Attribute.AttributeName[attrType]} * ${value}`
    }

    setLocation(x: number, y: number) {
        if (!this.position) {
            this.position = new mw.Vector2(x, y)
        }
        else {
            this.position.x = x
            this.position.y = y
        }
        this.uiObject.position = this.position
    }

    startEffect() {
        this.effTween.start()
    }
}
