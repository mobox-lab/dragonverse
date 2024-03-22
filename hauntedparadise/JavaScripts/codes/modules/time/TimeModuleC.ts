import { MainUI } from "../../ui/MainUI";
import { TipsUI } from "../../ui/TipsUI";
import { LanUtil } from "../../utils/LanUtil";
import Tips from "../../utils/Tips";
import SkySystem from "./SkySystem";
import TimeModuleS from "./TimeModuleS";

/*
 * @Author       : hangyuan.zhang hangyuan.zhang@appshahe.com
 * @Date         : 2023-12-21 13:35:15
 * @LastEditors  : dal
 * @LastEditTime : 2024-01-07 17:26:11
 * @FilePath     : \hauntedparadise\JavaScripts\codes\modules\time\TimeModuleC.ts
 * @Description  : 
 */
export default class TimeModuleC extends ModuleC<TimeModuleS, null> {

    public skyBoxSys: SkySystem = null;

    public timer: number = 0;

    public dayTime: number = 1;

    private tipsarr: string[] = ["day_tips1", "day_tips2"];

    protected onStart(): void {
        this.startSkyBoxChange();

    }

    public async startSkyBoxChange() {
        this.skyBoxSys = await Script.spawnScript("1044DDA04178F9AAD02FB595A12F9AA5");
    }

    public net_tips(tipsid: number) {
        UIService.getUI(TipsUI).showCatTips(LanUtil.getText(this.tipsarr[tipsid]));
    }
}