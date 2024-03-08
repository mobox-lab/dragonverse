/*
 * @Author: yudong.wu yudong.wu@appshahe.com
 * @Date: 2023-10-09 17:44:00
 * @LastEditors: yudong.wu yudong.wu@appshahe.com
 * @LastEditTime: 2023-10-10 18:38:03
 * @FilePath: \catcompanion\JavaScripts\modules\controller\VisibilityController.ts
 * @Description: 
 */

import { BoardHelper } from "../blackboard/BoardDefine";
import { InterEvtNameDef } from "../inter/ObjInterDefine";

class PreData {
    public constructor(public visiable: boolean = false, public collsion: CollisionStatus | PropertyStatus) {
    }
}

@Component
export default class VisibilityController extends mw.Script {
    /**监听事件arr */
    private _listenerArr: mw.EventListener[] = [];

    private _preData: PreData;

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        if (SystemUtil.isClient()) {
            this._listenerArr.push(Event.addLocalListener(BoardHelper.BoardClearEvent, () => {
                if (this._preData) {
                    this.gameObject.setVisibility(this._preData.visiable ? PropertyStatus.On : PropertyStatus.Off);
                    this.gameObject.setCollision(this._preData.collsion);
                }
            }));
            this._listenerArr.push(Event.addLocalListener(InterEvtNameDef.setVisibilityEvtName, (guid: string, visible: string) => {
                if (this.gameObject["forbidVisCtl"]) {
                    return;
                }
                if (!this._preData) {
                    this._preData = new PreData(this.gameObject.getVisibility(), this.gameObject.getCollision());
                }
                if (this.gameObject.gameObjectId == guid) {
                    this.gameObject.setVisibility(visible == "true" ? PropertyStatus.On : PropertyStatus.Off);
                    if (visible != "true") {
                        this.gameObject.setCollision(CollisionStatus.Off, true);
                    }
                }
            }));
        }
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