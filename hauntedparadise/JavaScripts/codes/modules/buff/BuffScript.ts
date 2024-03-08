import { GameConfig } from "../../../config/GameConfig";
import { PlayerAttr } from "../player/PlayerAttr";
import { Buff, BuffDataHelper } from "./BuffData";
import { EBuffType } from "./BuffDefine";
import { BuffModuleC } from "./BuffModule";
import ExpBuffTipsHud from "./ui/ExpBuffTipsHud";



@Component
export class BuffScript extends PlayerState {

    public userId: string;

    @Property({ replicated: true })
    public playerAttr: PlayerAttr;

    @Property({ replicated: true, onChanged: "onBuffChanged" })
    public buffList: Buff[] = [];

    /** bff改变时的回调 */
    public onBuffChanged(path: string[], newValue: any, oldVal: any) {
        // console.log("DEBUG>>> onBuffChanged path:  " + JSON.stringify(path));
        // console.log("DEBUG>>> onBuffChanged newValue:  " + JSON.stringify(newValue));
        // console.log("DEBUG>>> onBuffChanged oldVal:  " + JSON.stringify(oldVal));
        if (this.buffList.find(v => {return v.type === EBuffType.DayExp}) != undefined) {
            UIService.show(ExpBuffTipsHud);
        }else {
            UIService.hide(ExpBuffTipsHud);
        }
    }

    /** 100毫秒检测一次buff是否还存在 */
    private readonly checkTime = 0.1;

    /**  */
    private checkTimer = this.checkTime;

    protected onUpdate(dt: number): void {
        this.checkTimer -= dt;
        if (this.checkTimer <= 0) {
            this.checkTimer = this.checkTime;
            this.server_checkAndRemoveExpiredBuffs(this.buffList);
        }
    }

    /**
     * 加载存档还存在的buff
     */
    public async server_loadBuff() {
        const buffData = await BuffDataHelper.reqGetData(this.userId);
        this.server_checkAndRemoveExpiredBuffs(buffData.buffList);
        this.server_updatePlayerStats();
    }

    /**
     * 添加一个buff
     * @param buffId buff配置Id
     */
    public server_addBuff(buffId: number, addCount: number = 1): void {
        const cfg = GameConfig.Buff.getElement(buffId);
        let buff = this.buffList.find(v => { return cfg.type === v.type });
        if (!buff) {
            buff = new Buff();
            buff.type = cfg.type;
            buff.value = cfg.value;
            buff.duration = this.getDurationSec(cfg.type, cfg.duration) * addCount;
            this.buffList.push(buff);
        } else {
            const isSameVal = buff.value === cfg.value;
            buff.value = cfg.value;
            const cfgDuration = this.getDurationSec(cfg.type, cfg.duration) * addCount;
            buff.duration = isSameVal ? buff.duration + cfgDuration : cfgDuration;
            buff.startTimeStamp = isSameVal ? buff.startTimeStamp : Date.now();
        }
        this.server_updatePlayerStats();
        BuffDataHelper.reqSaveData(this.userId, this.buffList);
    }

    /** 将持续时间转换成秒 */
    private getDurationSec(type: number, duration: number) {
        switch (type) {
            case EBuffType.DayExp:
                return duration * 24 * 60 * 60;
            default:
                return duration;
        }
    }

    /**  
     * 双端玩家的属性以反映当前的buff效果  
     */
    public server_updatePlayerStats(): void {
        this.playerAttr.init();
        this.buffList.forEach(buff => {
            switch (buff.type) {
                case EBuffType.DayExp:
                    this.playerAttr.expIndex *= buff.value;
                    break;
            }
        });
    }

    /**  
     * 检查并移除已经过期的buff  
     */
    private server_checkAndRemoveExpiredBuffs(buffList: Buff[]): void {
        const currentTime = Date.now();
        this.buffList = buffList.filter(buff => {
            if (currentTime - buff.startTimeStamp > buff.duration * 1e3) {
                return false;
            }
            return true;
        });
        if (this.buffList.length != buffList.length) {
            BuffDataHelper.reqSaveData(this.userId, this.buffList);
            this.server_updatePlayerStats();
        }
    }

    protected onStart(): void {
        if (this.isRunningClient()) {
            ModuleService.getModule(BuffModuleC).registerState(this);
        } else {
            this.useUpdate = true;
            this.playerAttr = new PlayerAttr();
        }
    }
}