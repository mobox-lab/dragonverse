import { Attribute } from "../module/PlayerModule/sub_attribute/AttributeValueObject"
import { EventManager } from "./EventManager"
import { EModule_Events } from "../const/Enum"
import { TKillData, NoticeView } from "../module/NoticeModule/UI/NoticeView"


export class Notice {
    private static view: NoticeView

    /**注意: 目前统一走这类型个Notice */
    static showDownNotice(context: string) {
        this.checkView()
        this.view.topNoticeComponent2.insert(notice => {
            notice.setInfo(context)
        })
    }

    static showTopNotice(context: string) {
        this.checkView()
        this.view.topNoticeComponent.insert(notice => {
            notice.setInfo(context)
        })
    }

    // vae
    // static showSecondNotice(itemInfo: ItemBaseInfo) {
    //     this.checkView()
    //     this.view.secondNoticeComponent.insert(notice => {
    //         notice.setItemInfo(itemInfo)
    //     })
    // }

    static showSecondNoticeWithAttribute(attrType: Attribute.EnumAttributeType, value: number) {
        this.checkView()
        this.view.secondNoticeComponent.insert(notice => {
            notice.setAttrInfo(attrType, value)
        })
    }

    /**
     * 向当前房间的聊天框和tips显示消息
     * @param context 消息内容
     * @description 限制字符1024，除富文本描述外实际展示字符128
     */
    static showNotice_MGSAndDown_Room(context: string) {
        this.showDownNotice(context)
        this.showMGS_Room(context)
    }

    /**
     * 向当前游戏的全部房间的聊天框和tips显示消息
     * @param context 消息内容
     * @description 限制字符1024，除富文本描述外实际展示字符128
     */
    static showNotice_MGSAndDown_Game(context: string) {
        this.showDownNotice(context)
        this.showMGS_Game(context)
    }

    /**
     * 向当前房间的聊天框显示消息
     * @param context 消息内容
     * @description 限制字符1024，除富文本描述外实际展示字符128
     */
    static showMGS_Room(text: string) {
        EventManager.instance.call(EModule_Events.MGS_Room, text);
    }
    /**
     * 向当前游戏的全部房间的聊天框显示消息
     * @param context 消息内容
     * @description 限制字符1024，除富文本描述外实际展示字符128
     */
    static showMGS_Game(text: string) {
        EventManager.instance.call(EModule_Events.MGS_Game, text);
    }

    private static checkView() {
        if (this.view) return
        this.view = mw.UIService.show(NoticeView)
    }

    public static addKillTip(killData: TKillData) {
        this.checkView();
        this.view.addKillTip(killData);
    }

}