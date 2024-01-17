import { oTrace } from "odin";
import { EModule_Events } from "../../const/Enum";
import { EventManager } from "../../tool/EventManager";
import { PlayerModuleC } from "../PlayerModule/PlayerModuleC";
import { MainUI } from "../PlayerModule/UI/MainUI";
import { RedDotManager } from "./RedDotTree/RedDotManager";
import { RedPointModuleS } from "./RedPointModuleS";
 
export enum ERedPointPath {
    MainUI = "MainUI",
    mPic_Ability = "MainUI/mPic_Ability", //玩家属性
    mPic_Status = "MainUI/mPic_Status",//职业卡按钮
    mPic_Props = "MainUI/mPic_Props",// 背包
    mPic_mail = "MainUI/mPic_mail",// 邮件
}

/**红点模块*/
export class RedPointModuleC extends ModuleC<RedPointModuleS, null>{

    /**主控*/
    public mainUI: MainUI = null;

    protected onStart(): void {
        //test
        // InputUtil.onKeyDown(mw.Keys.F8, () => {
        //     EventManager.instance.call(EModule_Events.changeRedDotNum,ERedPointPath.mPic_Ability,1);
        // })
        // InputUtil.onKeyDown(mw.Keys.F9, () => {
        //     EventManager.instance.call(EModule_Events.changeRedDotNum,ERedPointPath.mPic_Ability,0);
        // })
    }

    protected onEnterScene(sceneType: number): void {

        this.mainUI = ModuleService.getModule(PlayerModuleC).mainUI;  // mw.UIService.getUI(MainUI)

        //可以认为这里是全局初始化的地方
        RedDotManager.init();
        //添加红点结点
        RedDotManager.redDotTree.addNode(ERedPointPath.MainUI, false);
        RedDotManager.redDotTree.addNode(ERedPointPath.mPic_Ability, true);
        RedDotManager.redDotTree.addNode(ERedPointPath.mPic_Props, true);
        RedDotManager.redDotTree.addNode(ERedPointPath.mPic_Status, true);
        RedDotManager.redDotTree.addNode(ERedPointPath.mPic_mail, true);

        //初始化红点数值
        RedDotManager.redDotTree.changeRedDotNum(ERedPointPath.mPic_Ability, 0);
        RedDotManager.redDotTree.changeRedDotNum(ERedPointPath.mPic_Props, 0);
        RedDotManager.redDotTree.changeRedDotNum(ERedPointPath.mPic_Status, 0);
        RedDotManager.redDotTree.changeRedDotNum(ERedPointPath.mPic_mail, 0);

        RedDotManager.redDotTree.registerCallback(ERedPointPath.MainUI, this.onMainUIRedDotChanged.bind(this));
        RedDotManager.redDotTree.registerCallback(ERedPointPath.mPic_Ability, this.onmPicAbilityRedDotChanged.bind(this));
        RedDotManager.redDotTree.registerCallback(ERedPointPath.mPic_Props, this.onmPicPropsRedDotChanged.bind(this));
        RedDotManager.redDotTree.registerCallback(ERedPointPath.mPic_Status, this.onmPicStatusRedDotChanged.bind(this));
        RedDotManager.redDotTree.registerCallback(ERedPointPath.mPic_mail, this.onmPicMailRedDotChanged.bind(this));

        EventManager.instance.add(EModule_Events.changeRedDotNum, (redDotPath: ERedPointPath, newValue: number) => {
            return RedDotManager.redDotTree.changeRedDotNum(redDotPath, newValue);
        });
        EventManager.instance.add(EModule_Events.changeRedDotState, (redDotPath: ERedPointPath, newValue: boolean) => {
            return RedDotManager.redDotTree.changeRedDotState(redDotPath, newValue);
        });
    }


    /**
    * 修改一个红点节点的当前值
    * @param redDotPath 使用"/"作为分隔符的红点节点路径
    * @param newValue 新的红点值
    * @returns 修改成功返回true，修改失败或值没有变化返回false
    */
    public net_changeRedDotNum(redDotPath: ERedPointPath, newValue: number) {
        return RedDotManager.redDotTree.changeRedDotNum(redDotPath, newValue);
    }

    /**
     * 修改一个红点节点的值，新的值非0即1。可以认为是changeRedDotNum()的便利方法
     * @param redDotPath 使用"/"作为分隔符的红点节点路径
     * @param newValue 新的红点显示状态，true即显示（值为1），false即不显示（值为0）
     * @returns 
     */
    public net_changeRedDotState(redDotPath: ERedPointPath, newValue: boolean) {
        return RedDotManager.redDotTree.changeRedDotState(redDotPath, newValue);
    }

    /**主控根节点*/
    private onMainUIRedDotChanged(redNum: number) {
        //oTrace("onMailRedDotChanged---------------------------------------redNum:", redNum);
    }

    /**属性按钮红点*/
    private onmPicAbilityRedDotChanged(redNum: number) {
        // this.mainUI.mPic_Ability.visibility = redNum > 0 ? mw.SlateVisibility.HitTestInvisible : mw.SlateVisibility.Collapsed;
    }

    /**背包按钮红点*/
    private onmPicPropsRedDotChanged(redNum: number) {
        //this.mainUI.mPic_Props.visibility = redNum > 0 ? mw.SlateVisibility.HitTestInvisible : mw.SlateVisibility.Collapsed;
    }

    /**职业卡红点*/
    private onmPicStatusRedDotChanged(redNum: number) {
        //this.mainUI.mPic_Status.visibility = redNum > 0 ? mw.SlateVisibility.HitTestInvisible : mw.SlateVisibility.Collapsed;
    }

    /**邮件红点todo*/
    private onmPicMailRedDotChanged(redNum: number) {
        //this.mainUI.mPic_mail.visibility = redNum > 0 ? mw.SlateVisibility.HitTestInvisible : mw.SlateVisibility.Collapsed;
    }


}


