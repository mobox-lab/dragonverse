/*
 * @Author: yudong.wu yudong.wu@appshahe.com
 * @Date: 2023-10-09 17:44:00
 * @LastEditors: yudong.wu yudong.wu@appshahe.com
 * @LastEditTime: 2023-10-10 17:49:32
 * @FilePath: \catcompanion\JavaScripts\modules\controller\StateController.ts
 * @Description: 
 */
import { BoardHelper } from "../blackboard/BoardDefine";
import { InterEvtNameDef } from "../inter/ObjInterDefine";

@Serializable
class CustomData {
    @mw.Property({ displayName: "自定义数据key" })
    public customKey: string = "";
    @mw.Property({ displayName: "自定义数据默认value" })
    public defaultValue: string = "";
}

@Component
export default class StateController extends mw.Script {
    @mw.Property({ group: "全局配置", displayName: "自定义数据" })
    public customDataArr: CustomData[] = [new CustomData()];
    /**监听事件arr */
    private _listenerArr: mw.EventListener[] = [];
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        if (SystemUtil.isClient()) {
            this._listenerArr.push(Event.addLocalListener(InterEvtNameDef.modifyDataEvtName, (guid: string, key: string, value: string) => {
                if (this.gameObject.gameObjectId == guid) {
                    BoardHelper.ChangeKeyValue(key + "_" + guid, value);
                }
            }));
        }
        // if (SystemUtil.isServer()) {
        //     this.customDataArr.forEach(e => {
        //         BoardHelper.ChangeKeyValue(e.customKey + "_" + this.gameObject.gameObjectId, e.defaultValue);
        //     });
        // }
    }


    /**
     * 周期函数 每帧执行
     * 此函数执行需要将this.useUpdate赋值为true
     * @param dt 当前帧与上一帧的延迟 / 秒
     */
    protected onUpdate(dt: number): void {

    }

    /** 脚本被销毁时最后一帧执行完调用此函数 */
    protected onDestroy(): void {
        this._listenerArr.forEach(e => {
            e.disconnect();
        })
    }
}