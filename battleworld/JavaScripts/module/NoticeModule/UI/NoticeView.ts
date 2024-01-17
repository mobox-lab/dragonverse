
import { GameConfig } from "../../../config/GameConfig"
import { ENotice_Events_C } from "../../../const/Enum"
import { Globaldata } from "../../../const/Globaldata"
import { EventManager } from "../../../tool/EventManager"
import { TimerTool } from "../../../tool/TimerTool"
import ItemKillTip_Generate from "../../../ui-generate/notice/ItemKillTip_generate"
import NoticeView_Generate from "../../../ui-generate/notice/NoticeView_generate"
import { SecondNoticeComponent } from "./SecondNoticeComponent"
import { TopNoticeComponent } from "./TopNoticeComponent"
import { TopNoticeComponent2 } from "./TopNoticeComponent2"

/**击杀类型 */
export enum EKillType {
    /**默认击杀信息 */
    none = 0,
    doubleKill = 1,
}

/**击杀信息 */
export type TKillData = {
    /**击杀类型 */
    killType: EKillType;
    /**击杀的玩家id */
    killerName?: string;
    /**击杀玩家的武器 */
    killerWeaponId?: number;
    /**被击杀的玩家id */
    beKillName?: string,
}

class ItemKillTip extends ItemKillTip_Generate {

    /**父级脚本 */
    private parent: NoticeView = null;
    /**延迟回收key */
    private delayRecycleKey: any = null;
    /**是否被push了 */
    private isBePushed: boolean = false;
    /**展示时的时间戳 */
    private showTimeStamp: number = 0;

    onStart() {

    }


    /**设置父级脚本 */
    public setParent(parent: NoticeView) {
        this.parent = parent;
    }


    public showKillTip(killData: TKillData) {

        this.uiObject.visibility = mw.SlateVisibility.SelfHitTestInvisible;

        switch (killData.killType) {
            case EKillType.none:
                {

                    this.mKillTip.visibility = mw.SlateVisibility.Collapsed;
                    this.mWeaponTip.visibility = mw.SlateVisibility.SelfHitTestInvisible;

                    let weaponCfg = GameConfig.Weapon.getElement(killData.killerWeaponId);
                    if (weaponCfg) {
                        this.mWeaponIcon.visibility = mw.SlateVisibility.Collapsed;
                        //this.mWeaponIcon.imageGuid = weaponCfg.killIcon;

                        this.mWeapon1.text = killData.killerName;
                        this.mWeapon2.text = killData.beKillName;
                    }
                }
                break;
            case EKillType.doubleKill:
                {
                    this.mWeaponTip.visibility = mw.SlateVisibility.Collapsed;
                    this.mKillTip.visibility = mw.SlateVisibility.SelfHitTestInvisible;

                    this.mKillTip.text = killData.killerName;
                }
                break;
            default:
                break;
        }
        this.showTimeStamp = Date.now();
        this.isBePushed = false;
        this.clear_delayRecycleKey();
        this.delayRecycleKey = TimerTool.setTimeout(() => {
            this.delayRecycleKey = null;
            this.parent.recycleKillTip(this);
        }, 10 * 1000);

    }

    /**加快tip的消失 */
    public pushEnd() {
        if (this.isBePushed) {
            return;
        }
        this.isBePushed = true;

        // 如果还剩两秒就别清理了
        if (Date.now() - this.showTimeStamp > 8 * 1000) {
            return;
        }

        this.clear_delayRecycleKey();
        this.delayRecycleKey = TimerTool.setTimeout(() => {
            this.delayRecycleKey = null;
            this.parent.recycleKillTip(this);
        }, 2 * 1000);
    }

    /**清理tip的延迟key */
    private clear_delayRecycleKey() {
        if (this.delayRecycleKey) {
            TimerTool.clearTimeout(this.delayRecycleKey);
            this.delayRecycleKey = null;
        }
    }

}

export class NoticeView extends NoticeView_Generate {


    topNoticeComponent: TopNoticeComponent
    topNoticeComponent2: TopNoticeComponent2
    secondNoticeComponent: SecondNoticeComponent;

    /**击杀提示对象池 */
    private killTipPools: ItemKillTip[] = [];
    /**当前正在显示的tip数组 */
    private curShowTips: ItemKillTip[] = [];

    /**当前缓存的击杀提示信息数组 */
    private curKillDatas: TKillData[] = [];

    onStart() {
        this.topNoticeComponent = new TopNoticeComponent()
        this.topNoticeComponent.init(this.con_top_notice)
        this.secondNoticeComponent = new SecondNoticeComponent()
        this.secondNoticeComponent.init(this.con_second_notice)
        this.topNoticeComponent2 = new TopNoticeComponent2()
        this.topNoticeComponent2.init(this.con_top_notice_2)

        this.canUpdate = true;
        this.layer = mw.UILayerDialog;

        for (let index = 0; index < Globaldata.noticeKillMaxCount; index++) {
            let itemRoot = UIService.create(ItemKillTip);
            itemRoot.setParent(this);

            this.rootCanvas.addChild(itemRoot.uiObject);
            itemRoot.uiObject.visibility = mw.SlateVisibility.Collapsed;
            this.killTipPools.push(itemRoot);
        }

    }

    onUpdate() {
        this.topNoticeComponent.update()
        this.secondNoticeComponent.update()
        this.topNoticeComponent2.update()
    }


    /**
     * 击杀提示
     */
    public addKillTip(data: TKillData) {

        this.curKillDatas.push(data);

        this.start_tip();
    }

    /**开始提示 */
    private start_tip() {
        if (this.curKillDatas.length == 0) {
            return;
        }
        if (this.killTipPools.length == 0) {
            if (this.curShowTips.length > 0) {
                this.curShowTips[0].pushEnd();
            }
            return;
        }


        let killData = this.curKillDatas.shift();

        let tipView = this.killTipPools.pop();

        tipView.showKillTip(killData);
        this.curShowTips.push(tipView);
        this.mKillCanvas.addChild(tipView.uiObject);
    }

    /**
     * 回收击杀提示
     */
    public recycleKillTip(tip: ItemKillTip) {

        tip.uiObject.visibility = mw.SlateVisibility.Collapsed;
        this.rootCanvas.addChild(tip.uiObject);
        let findIndex = this.curShowTips.findIndex((tmpTip) => {
            return tmpTip == tip;
        });
        if (findIndex != -1) {
            this.curShowTips.splice(findIndex, 1);
        }
        this.killTipPools.push(tip);

        this.start_tip();
    }

}