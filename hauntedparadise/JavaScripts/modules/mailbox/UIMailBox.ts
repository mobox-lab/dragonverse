import { GridSelectContainer } from "../../codes/utils/UIPool";
import { GameConfig } from "../../config/GameConfig";
import { IMailBoxElement } from "../../config/MailBox";
import MailItem_UI_Generate from "../../ui-generate/ShareUI/MailItem_UI_generate";
import Postbox_UI_Generate from "../../ui-generate/ShareUI/Postbox_UI_generate";
import { MailBoxModuleC } from "./MailBoxModule";

/** replaceAll方法一用就会报错, 这个仅用于时间 */
export function ReplaceAllEx(str: string, symbol: string, toSymbol: string) {
    str = str.replace(symbol, toSymbol);
    str = str.replace(symbol, toSymbol);
    return str
}

/** 两个日期之间间隔几天 */
export function twoDateDis(date1: Date, date2: Date) {
    // 将两个 Date 对象转换为时间戳并求差值
    let diffInMilliseconds = Math.abs(date2.getTime() - date1.getTime());

    // 将差值转换为天数
    let diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));

    return diffInDays;
}

export class MailItem extends MailItem_UI_Generate {

    cfg: IMailBoxElement;

    curDate: string;

    onSelect: Action = new Action();
    isSelected: boolean;

    static selectColor = LinearColor.colorHexToLinearColor("#FFF500");
    static unSelectColor = LinearColor.colorHexToLinearColor("#C6C6C6FF");

    public onStart() {
        this.btn_click.onClicked.add(this.onClick.bind(this, true));
    }

    onClick() {
        this.onSelect.call();
        this.img_point.visibility = SlateVisibility.Collapsed;
        ModuleService.getModule(MailBoxModuleC).readMail(this.cfg.id);
    }

    /** 设置是否选中 */
    public setSelected(isSelect: boolean) {
        this.isSelected = isSelect;
        this.img_frame.visibility = isSelect ? SlateVisibility.SelfHitTestInvisible : SlateVisibility.Collapsed;
    }

    public setData(cfgId: number, curDate: string) {
        this.curDate = curDate;
        this.cfg = GameConfig.MailBox.getElement(cfgId);
        this.text_letterWriter.text = this.cfg.name;
        let dateStr1 = ReplaceAllEx(this.cfg.date, "|", "-");
        let dateStr2 = ReplaceAllEx(this.curDate, "|", "-");
        let date1 = new Date(dateStr1);
        let date2 = new Date(dateStr2);
        let dateDis = twoDateDis(date1, date2);
        this.text_time.text = dateDis === 0 ? GameConfig.Language["LetterDay_01"].Value : StringUtil.format(GameConfig.Language["LetterDay_02"].Value, dateDis);
        if (UIService.getUI(MailBoxPanel).mailItemInfo.readMails.includes(cfgId)) {
            this.img_point.visibility = SlateVisibility.Collapsed;
        } else {
            this.img_point.visibility = SlateVisibility.SelfHitTestInvisible;
        }
    }
}

export class MailBoxPanel extends Postbox_UI_Generate {

    private mailItemContainer: GridSelectContainer<MailItem>;

    protected onStart() {
        this.layer = mw.UILayerSystem;
        this.mailItemContainer = new GridSelectContainer(this.canvas_letters, MailItem);
        this.btn_back.onClicked.add(() => { UIService.hideUI(this) });
    }

    public get mailItemInfo() {
        return ModuleService.getModule(MailBoxModuleC).mailInfo;
    }

    protected onShow() {
        this.mailItemContainer.removeAllNode();
        this.setMailInfo(null);
        const mailInfo = this.mailItemInfo;
        // 按照两种排序规则
        // 先将已读和未读邮件拆开
        let readMails = mailInfo.readMails;
        let unreadMails = mailInfo.allMails.filter((item) => { return !readMails.includes(item) });
        // 已读和未读的邮件分别排序
        readMails.sort((a, b) => { return b - a });
        unreadMails.sort((a, b) => { return b - a });
        // 拼接两个数组 把未读的放在前面
        let newMails = unreadMails.concat(readMails);
        newMails.forEach((cfgId, id) => {
            let node = this.mailItemContainer.addNode();
            node.setData(cfgId, mailInfo.curDate)
            node.onSelect.add(() => { this.setMailInfo(node) });
        });
        // 默认选中第一个
        let firstNode = this.mailItemContainer.getFirstUsedNode();
        this.mailItemContainer.selectNode(firstNode);
        firstNode.onClick();
    }

    private setMailInfo(mailItem: MailItem) {
        if (!mailItem) {
            this.text_title.text = "";
            this.text_content.text = "";
            this.text_writter.text = "";
            this.text_date.text = "";
        } else {
            this.text_title.text = mailItem.cfg.theme;
            this.text_content.text = mailItem.cfg.content;
            this.text_writter.text = mailItem.cfg.name;
            this.text_date.text = ReplaceAllEx(mailItem.cfg.date, "|", "-");
        }
    }
}