import { ELandCommon_Event_C } from "../../../const/Enum";
import { EventManager } from "../../../tool/EventManager";

/**
 * 公共地块属性同步脚本
 */
@Component
export default class LandCommonSync extends Script {

    /**地形透明度*/
    @mw.Property({ replicated: true, onChanged: "onChange_landOpacity" })
    public landOpacity: number = 0;


    private onChange_landOpacity() {

        // 同步地块透明度
        EventManager.instance.call(ELandCommon_Event_C.LaneCommonEvent_Opcatity_C, this.landOpacity);
    }



    public server_setOpacity(opacity: number) {
        this.landOpacity = opacity;
    }


    public recycle() {
        this.landOpacity = 1;
    }

}