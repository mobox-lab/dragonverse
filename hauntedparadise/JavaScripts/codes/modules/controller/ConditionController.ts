/*
 * @Author: yudong.wu yudong.wu@appshahe.com
 * @Date: 2023-10-09 17:44:00
 * @LastEditors: yudong.wu yudong.wu@appshahe.com
 * @LastEditTime: 2023-10-10 18:51:30
 * @FilePath: \catcompanion\JavaScripts\modules\controller\ConditionController.ts
 * @Description: 
 */

import { BoardHelper } from "../blackboard/BoardDefine";
import { InterEvtData, ObjInterDefine } from "../inter/ObjInterDefine";

@Serializable
class ConditionEvtData {
    @mw.Property({ displayName: "判断数据key" })
    public key: string = "";
    @mw.Property({ displayName: "判断数据value值" })
    public value: string = "";
    @Property({ hideInEditor: true })
    public isOk: boolean = false;
}

@Component
export default class ConditionController extends mw.Script {
    @mw.Property({ group: "全局配置", displayName: "条件检测" })
    public conditionDataArr: ConditionEvtData[] = [new ConditionEvtData];
    @mw.Property({ displayName: "相等时发送的事件" })
    public equalEvtData: InterEvtData[] = [new InterEvtData()];
    @mw.Property({ displayName: "不相等时发送的事件" })
    public unequalEvtData: InterEvtData[] = [new InterEvtData()];
    /**监听事件arr */
    private _listenerArr: mw.EventListener[] = [];
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        this._listenerArr.push(Event.addLocalListener(BoardHelper.BoardValueChangeEvent, (key: string, value: string) => {
            let arr = key.split("_");
            if (this.gameObject.gameObjectId == arr[1]) {
                for (let index = 0; index < this.conditionDataArr.length; index++) {
                    const element = this.conditionDataArr[index];
                    if (element.key == arr[0]) { 
                        element.isOk = element.value == value;
                    }
                }
                let isAllOk = true;
                for (let index = 0; index < this.conditionDataArr.length; index++) {
                    const element = this.conditionDataArr[index];
                    if (!element.isOk) { 
                        isAllOk = false;
                        break;
                    }
                }
                if (isAllOk) {
                    ObjInterDefine.dispatchClientByData(this.equalEvtData, this.gameObject.gameObjectId);
                }
                else { 
                    ObjInterDefine.dispatchClientByData(this.unequalEvtData, this.gameObject.gameObjectId);
                }
            }
        }));
        Event.addLocalListener(BoardHelper.BoardClearEvent, () => { 
            this.conditionDataArr.forEach(e => {
                e.isOk = false;
            })
        })
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