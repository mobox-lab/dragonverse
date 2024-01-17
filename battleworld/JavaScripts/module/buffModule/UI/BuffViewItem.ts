import { oTrace } from "odin";
 
import { GameConfig } from "../../../config/GameConfig";
import { EBuffLifecycleType, EBuffOverlayType } from "module_buff";
import { IBuffElement } from "../../../config/Buff";
import P_buffviewItem_Generate from "../../../ui-generate/buffModule/P_buffviewItem_generate";


export class BuffViewItem extends P_buffviewItem_Generate {
    
    /**当前时间 */
    private time: number = 0;
    /**回收回调 */
    private hideFunc:(configId: number)=> void ;
    /**配置 */
    private cfg:IBuffElement = null

    onStart() {
      
    }
    onShow(){
        this.canUpdate = true;
    }
    onUpdate(dt) {
        this.time -= dt;
        if (this.time < 0) {
             if(this.hideFunc){
                this.hideFunc(this.cfg.id);
                this.hideFunc = null;
             }
        } else {
            this.mText_time.text = this.formatTime_MS(Number(this.time.toFixed(0)));
        }
    }
    /**刷新*/
    public refash(cfg: IBuffElement,hideFunc:(configId: number)=> void,time:number = null) {
        this.rootCanvas.visibility = mw.SlateVisibility.SelfHitTestInvisible;
        this.uiObject.visibility = mw.SlateVisibility.SelfHitTestInvisible;
        this.cfg = cfg
        this.hideFunc = hideFunc;
        if(time){
            this.time = time;
        }else{
            switch (cfg.lifecycleType) {
                case EBuffLifecycleType.Forever:
                    break;
                case EBuffLifecycleType.LimitByTime:
                    switch (cfg.overlayType) {
                        case EBuffOverlayType.Only:
                            this.time = cfg.duration;
                            break;
                        case EBuffOverlayType.Overlap:
                            this.time = cfg.duration;
                            break;
                        case EBuffOverlayType.AddTime:
                            this.time = cfg.duration + this.time;
                            break;
                        case EBuffOverlayType.RefreshTime:
                            this.time = cfg.duration;
                            break;
                        default:
                            break;
                    }
                    break;
                case EBuffLifecycleType.LimitByTriggerCount:
                    break;
                default:
                    break;
            }
        }
        this.mText_time.text = this.formatTime_MS(this.time);
        this.mImg_buff.imageGuid = (cfg.icon.toString());
        //oTrace("刷新显示refash this.mText_time" + this.time);
    }
    /**回收 */
    public hide() {
        //oTrace("回收hide---------");
        this.canUpdate = false;
        this.time = 0;
        this.cfg = null;
        this.rootCanvas.visibility = (mw.SlateVisibility.Collapsed);
        this.uiObject.visibility = (mw.SlateVisibility.Collapsed);
    }

    /**
     * 60M 59M  
     * 1M 59 58 57 56 55 54
     * @param time 秒  
     * @returns 
     */
    public formatTime_MS(time: number): string {
        if(time/60 >= 1) {
            return `${Math.ceil(time/60)}M`
        }
        else{
            return `${time}`;
        }
    }

 
    // /** 将数字转换成标准时间格式 num 为分钟数或者秒数  时:分 / 分:秒 */
    // public getFormatTime__HM(num: number): string {
    //     return `${num / 60 < 10 ? "0" + Math.floor(num / 60) : Math.floor(num / 60)}:${num % 60 < 10 ? "0" + Math.floor(num % 60) : Math.floor(num % 60)}`
    // }

}