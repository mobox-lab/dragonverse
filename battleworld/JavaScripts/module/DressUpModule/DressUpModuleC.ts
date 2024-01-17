import { EModule_Events } from "../../const/Enum";
import { EventManager } from "../../tool/EventManager";
import { DressUpInfo } from "../LandModule/PickUp/PickUpDressUp";
import DressUpModuleS from "./DressUpModuleS";

export default class DressUpModuleC extends ModuleC<DressUpModuleS, null> {

    /** 记录的限时装扮倒计时 */
    private _countdown : number;
    /** 当前使用的限时的装扮 */
    private _dressUpInfo : DressUpInfo;

    protected onStart(): void {
        EventManager.instance.add(EModule_Events.land_dressUp_countdown, this.listen_land_dressUp_countdown, this);
        EventManager.instance.add(EModule_Events.land_pickUp_dressUp, this.listen_land_pickUp_dressUp, this);
    }

    /**
     * 监听装扮限时时间改变
     * @param cd 倒计时
     */
    private listen_land_dressUp_countdown(cd: number) {
        this._countdown = cd;
        if (this.countdown <= 0) {
            this.dressUpInfo = null;
        }
    }

    /**
     * 监听拾取到装扮道具
     * @param info 拾取的道具信息
     */
    private listen_land_pickUp_dressUp(info: DressUpInfo) {
        this.dressUpInfo = info;
    }

    /**
     * 是否正在使用限时装扮
     * @returns
     */
    public isInLimited(): boolean {
        return this._countdown > 0;
    }

    public get countdown() : number {
        return this._countdown;
    }

    public get dressUpInfo() : DressUpInfo {
        return this._dressUpInfo;
    }
    public set dressUpInfo(v : DressUpInfo) {
        this._dressUpInfo = v;
    }
}