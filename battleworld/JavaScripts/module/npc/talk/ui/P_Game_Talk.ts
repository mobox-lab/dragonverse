import { GameConfig } from "../../../../config/GameConfig";
import { INpcDialogElement } from "../../../../config/NpcDialog";
import { ITabTalkElement } from "../../../../config/TabTalk";
import { EModule_Events } from "../../../../const/Enum";
import { Globaldata } from "../../../../const/Globaldata";
import { EventManager } from "../../../../tool/EventManager";
import { util } from "../../../../tool/Utils";
import P_Game_Talk_Generate from "../../../../ui-generate/talk/P_Game_Talk_generate";
import { WriterHelper } from "../WriterHelper";

export class P_Game_Talk extends P_Game_Talk_Generate {

    // 按钮对应回调
    private callbacks: (() => void)[] = [() => { }, () => { }, () => { }];
    // 按钮
    private btns: mw.StaleButton[] = null;
    // 当前对话NPC  npd对话表id
    private npcId: number = 0;
    // 当前对话配置
    private config: ITabTalkElement = null;
    // 默认icon
    private defaultIcon: string = "179153";
    // 当前类型货币余额
    private currentMoney: number = 0;
    // 文字写入间隔
    private interval: number = -1;
    // 步长
    private step: number = 1;
    // 组动画
    private groupId: number = null;

    onStart() {
        this.interval = Globaldata.talkTextInterval;
        this.step = Globaldata.talkTextStep;
        this.registerButtonEvent();
    }

    onHide() {
        EventManager.instance.call(EModule_Events.ui_hideTalk, this.npcId, this.config);
    }

    /**
     * 注册按钮事件
     */
    private registerButtonEvent() {
        this.btns = [this.mBtn_1, this.mBtn_2, this.mBtn_3];
        for (let i = 0; i < this.btns.length; i++) {
            this.btns[i].onClicked.add(() => {
                if (this.callbacks[i] != null) this.callbacks[i]();
            });
        }

        this.mBtn_4.text = GameConfig.Language.Dialog_Npc_Btn_2.Value;
        this.mBtn_4.onClicked.add(() => {
            mw.UIService.hideUI(this);
        });

        this.mCloseBtn.onClicked.add(() => { mw.UIService.hideUI(this); });
    }

    /**
     * 设置数据
     * @param data 配置数据 
     */
    public setData(data: INpcDialogElement) {
        this.reset();
        // 首页开场白
        this.mBtn_4.visibility = mw.SlateVisibility.Visible;
        this.mText_1.visibility = mw.SlateVisibility.SelfHitTestInvisible;
        this.setText1(data.start);
        this.npcId = data.id;
        if (data.content == null) return;
        for (let i = 0; i < data.content.length; i++) {
            this.setButtonVisible(i, true);
            let ele = GameConfig.TabTalk.getElement(data.content[i]);
            if (ele == null) continue;
            this.btns[i].text = ele.tabName;
            this.setButtonCallback(i, () => {
                this.setContentByTabId(data.content[i]);
            });
        }
    }

    /**
     * 设置text1文本框的文本
     */
    private setText1(content: string) {
        WriterHelper.write(this.mText_1, content, this.interval);
    }

    /**
     * 通过tabID设置内容
     */
    public setContentByTabId(tabId: number) {
        this.reset();
        this.config = GameConfig.TabTalk.getElement(tabId);
        if (this.config == null) return;
        this.fillTalk();
        switch (this.config.type) {

        }

        if (!this.check()) {
            return;
        }

        let next = this.config.next.split("|");
        for (let i = 0; i < next.length; i++) {
            this.setButtonVisible(i, true);
            let nextEle = GameConfig.TabTalk.getElement(Number(next[i]));
            if (nextEle == null) continue;
            this.btns[i].text = nextEle.tabName;
            this.setButtonCallback(i, () => {
                let sps = this.config.next.split("|");
                this.setContentByTabId(Number(sps[i]));
            });
        }
    }

    /**
     * 检查是否有下一步
     */
    private check() {
        if (this.config == null || this.config.next == null) {
            this.mCloseBtn.visibility = mw.SlateVisibility.Visible;
            this.mBtn_4.visibility = mw.SlateVisibility.Collapsed;
            return false;
        }
        return true;
    }

    /**
     * 对话填充
     */
    private fillTalk() {
        if (this.config == null || this.config.content == null) return;
        if (this.config.content.length > 1) {
            this.mContent.visibility = mw.SlateVisibility.SelfHitTestInvisible;
            this.fillContent(this.config.content);
        } else if (this.config.content.length == 1) {
            this.mText_1.visibility = mw.SlateVisibility.SelfHitTestInvisible;
            this.fillText();
        }
        let icon: string = this.defaultIcon;
        if (StringUtil.isEmpty(this.config.icon) == false) {
            icon = this.config.icon;
        }
        this.mIcon.imageGuid = icon;
    }

    /**
     * 填充content画布信息
     */
    private fillContent(content: string[]) {
        if (content == null || content.length < 3) return;

        // 拷贝一份
        let copyContents: string[] = content.slice(); // 此为浅拷贝, 由于是基本类型也无所谓吧
        // 设置copyContents[0]的值
        // if (content[0] == "{1}") { // 旅行商人消失时间
        //     copyContents[0] = this.getTravelTime();
        // } else {
        copyContents[0] = util.getLanguageByKey(content[0]);
        // }

        // 设置copyContents[1]的值
        copyContents[1] = util.getLanguageByKey(content[1]);

        // 设置copyContents[2]的值

        copyContents[2] = util.getLanguageByKey(content[2]);
        // 先隐藏掉
        this.mIcon.visibility = mw.SlateVisibility.Collapsed;
        if (this.groupId != null) {
            WriterHelper.stopGroup(this.groupId);
            this.groupId = null;
        }
        // 依次写入
        this.groupId = WriterHelper.writeGroup([this.mText_Name, this.mText_Desc, this.mText_Coin], copyContents, this.interval, this.step, (index: number) => {
            if (index == 1) { // 说明第二个文本框写入完毕
                this.mIcon.visibility = mw.SlateVisibility.SelfHitTestInvisible;
            }
        });
    }

    /**
     * 填充文本信息
     */
    private fillText() {
        let text = util.getLanguageByKey(this.config.content[0]);
        this.setText1(text);
        // if (text.includes("{3}")) { // 用于显示旅行商人购买后的物品信息
        //     let ele = GameConfig.Bag.getElement(TravelUtil.reward);
        //     if (ele == null) return;
        //     text = text.replace("{3}", ele.Name);
        //     this.setText1(text);
        // }
    }

    /**
     * 重置
     */
    private reset() {
        for (let i = 0; i < this.btns.length; i++) {
            this.setButtonVisible(i, false);
        }
        this.mContent.visibility = mw.SlateVisibility.Collapsed;
        this.mText_1.visibility = mw.SlateVisibility.Collapsed;
        this.mCloseBtn.visibility = mw.SlateVisibility.Collapsed;
    }

    /**
     * 设置按钮显隐
     */
    private setButtonVisible(index: number, visible: boolean) {
        if (visible) {
            this.btns[index].visibility = mw.SlateVisibility.Visible;
        } else {
            this.btns[index].visibility = mw.SlateVisibility.Collapsed;
        }
    }

    /**
     * 设置按钮回调
     */
    private setButtonCallback(index: number, fun: () => void) {
        if (index < 0 || index >= this.callbacks.length) {
            return;
        }
        this.callbacks[index] = fun;
    }

    /**
     * 设置货币数量
     * @param value 数量
     */
    private setMoneyText(value: number) {
        let num = parseInt(value.toString());
        if (isNaN(num)) {
            num = 0;
            return;
        }
        this.currentMoney = num;
        this.mText_value.text = num.toString();
    }

    /**
     * 设置货币canvas显隐
     */
    private setMoneyVisible(visible: boolean) {
        let vis = visible ? mw.SlateVisibility.SelfHitTestInvisible : mw.SlateVisibility.Collapsed;
        this.mCanvas_cash.visibility = vis;
    }

}