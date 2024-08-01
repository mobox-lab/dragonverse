
import { GlobalData } from "../../const/GlobalData";
import { AreaDivideManager } from "../AreaDivide/AreaDivideManager";
import { P_HudUI } from "../Hud/P_HudUI";
import ResourceScript, { SceneResourceMap } from "../Resources/Resource";


class resTime {
    public res: ResourceScript;
    public time: number;
    constructor(res: ResourceScript, time: number) {
        this.res = res;
        this.time = time;
    }
}

export class InputModuleC extends ModuleC<InputModuleS, null> {

    public onLineTraceAC: Action2<ResourceScript, boolean> = new Action2<ResourceScript, boolean>();
    // private touch: mw.TouchInput = null;
    private touchNum: number = 0;
    private oldPointSize: number = 0;
    private camera: Camera = null;
    /**按下时击中的物体 */
    private hitObjects: Map<number, resTime> = new Map<number, resTime>();

    /**射线检测到资源 数量 */
    public hitCount: number = 0;
    /**当前场景区域 */
    public curAreaId: number = 0;

    protected onStart(): void {
        this.startLineTrace();
        // this.setFinger();
        this.camera = Camera.currentCamera;
        mw.UIService.getUI(P_HudUI).onSwitchDefaultArm.add(() => {
            this.camera.springArm.length = GlobalData.Camera.defaultLength;
        });
        mw.UIService.getUI(P_HudUI).onSwitchFarArm.add(() => {
            this.camera.springArm.length = GlobalData.Camera.farLength;
        });
        mw.UIService.getUI(P_HudUI).onSwitchNearArm.add(() => {
            this.camera.springArm.length = GlobalData.Camera.nearLength;
        });

        AreaDivideManager.instance.onAreaChangeAC.add((preId, curId) => {
            this.curAreaId = curId;
        })

        InputUtil.onKeyDown(mw.Keys.MouseScrollDown, () => { this.changeTargetArmLength(5) })
        InputUtil.onKeyDown(mw.Keys.MouseScrollUp, () => { this.changeTargetArmLength(-5) })
    }

    private startLineTrace() {
        // this.touch = n
        InputUtil.onTouchBegin(index => console.log('onTouchBegin: ', index));
        // InputUtil.onTouchBegin(this.touchEvent.bind(this));
        InputUtil.onTouchEnd((index, loc, touchType) => {
            let v3 = InputUtil.convertScreenLocationToWorldSpace(loc.x, loc.y);
            let forVect = v3.worldDirection;
            let tarLoc = v3.worldPosition.clone().add(forVect.multiply(GlobalData.LineTrace.lineTraceDistance));
            let sc = this.isHitObject(v3, tarLoc);
            let hitSc = this.hitObjects.get(index);
            if (sc && hitSc && hitSc.res == sc) {
                this.sendLineTraceAC();
                let time = Date.now() - hitSc.time;
                if (time < GlobalData.LineTrace.lineTraceTime) {
                    this.onLineTraceAC.call(sc, GlobalData.Global.isSameGoBack);
                } else {
                    this.onLineTraceAC.call(sc, !GlobalData.Global.isSameGoBack);
                }
            }
        })
    }

    private touchEvent(index, loc) {
        let v3 = InputUtil.convertScreenLocationToWorldSpace(loc.x, loc.y);
        let forVect = v3.worldDirection;
        let tarLoc = v3.worldPosition.clone().add(forVect.multiply(GlobalData.LineTrace.lineTraceDistance));
        let sc = this.isHitObject(v3, tarLoc);
        if (sc) {
            this.hitObjects.set(index, new resTime(sc, Date.now()));
        }
    }
    /**判断是否按住可击中物体 */
    private isHitObject(v3: mw.ConvertScreenResult, tarLoc: mw.Vector): ResourceScript {
        let hits = QueryUtil.lineTrace(v3.worldPosition, tarLoc, true, GlobalData.LineTrace.isShowLineTrace);
        for (let hit of hits) {
            if (!hit.gameObject) continue;
            if (hit.gameObject.name == "世界UI") {
                return null;
            }
            if (hit.gameObject.name == "1" || hit.gameObject.name == "2" || hit.gameObject.name == "3" || hit.gameObject.name == "宝箱"
                || hit.gameObject.name == "马桶") {
                let script = this.getTargetRes(this.curAreaId, hit);
                if (script) {
                    return script;
                }
                script = this.getTargetRes(this.curAreaId - 1, hit);
                if (script) return script;
                script = this.getTargetRes(this.curAreaId + 1, hit);
                if (script) return script;
                break;
            }
        }
        return null;
    }
    /**获取目标资源 */
    public getTargetRes(areaId: number, hit: mw.HitResult): ResourceScript {
        let arr = SceneResourceMap.get(areaId);
        if (arr)
            console.error(`lwj 射线检测 arrLen = ${arr.length} areaId = ${areaId} `);

        let script = SceneResourceMap.get(areaId)?.find((item) => {
            if (!hit.gameObject.parent) return false;
            return item.Obj?.gameObjectId == hit.gameObject.parent.gameObjectId
        })
        return script;
    }
    /**发送检测资源埋点 */
    public sendLineTraceAC() {
        this.hitCount++;
    }

    // 设置手指事件
    // private setFinger() {
    //     // 使用touchNum记录当前屏幕的触摸点数量
    //     this.touchNum = 0
    //     //开始触摸（包括第一个和第二个触摸点）
    //     this.touch.onTouchBegin.add(() => {
    //         this.touchNum++;
    //         if (this.touchNum < 2) return;
    //         mw.UIService.getUI(P_HudUI).mTouchPad.removeObject();
    //         //使用oldPointSize记录两个触摸点的初始距离
    //         let touchPoint = this.touch.getTouchVectorArray();
    //         this.oldPointSize = touchPoint[0].subtract(touchPoint[1]).length;
    //     });

    //     //触摸点移动（包括第一个和第二个触摸点）
    //     this.touch.onTouchMove.add(() => {
    //         if (this.touchNum < 2) return
    //         //计算两个触摸点移动过程中的最新距离
    //         let touchPoint = this.touch.getTouchVectorArray();
    //         let newPointSize = touchPoint[0].subtract(touchPoint[1]).length;
    //         //计算初始距离和最新距离之差
    //         let char = this.localPlayer.character;
    //         let distance = newPointSize - this.oldPointSize;
    //         //使用length记录当前弹簧臂长度，也就是摄像机距离，加上或者减去两个触摸点初始距离和最新距离之差
    //         let length = Camera.currentCamera.springArm.length;
    //         let addLength = (distance > 0 ? -1 : distance < 0 ? 1 : 0) * 1 * Math.abs(distance);
    //         addLength *= GlobalData.Camera.zoomRate;
    //         length += addLength;
    //         length = Math.max(length, GlobalData.Camera.minLength);
    //         length = Math.min(length, GlobalData.Camera.maxLength);
    //         //应用length记录的弹簧臂长度，并且用oldPointSize再次记录两个触摸点的初始距离
    //         Camera.currentCamera.springArm.length = length;
    //         this.oldPointSize = newPointSize;
    //     });

    //     //结束触摸点离开（包括第一个和第二个触摸点）
    //     this.touch.onTouchEnd.add(() => {
    //         this.touchNum--;
    //         //当最后一个触摸点离开屏幕时，重新挂载UI对象中的摄像机滑动区
    //         if (this.touchNum < 1) {
    //             mw.UIService.getUI(P_HudUI).rootCanvas.addChild(mw.UIService.getUI(P_HudUI).mTouchPad);
    //         }
    //     })
    // }

    private isFirst: boolean = false;
    private curLenth: number = 0;
    public changeFirst() {
        if (this.isFirst) { return }
        this.curLenth = this.camera.springArm.length;
        this.camera.springArm.length = 0;
        this.localPlayer.character.setVisibility(mw.PropertyStatus.Off);
        this.isFirst = true;
    }
    public changeThird() {
        if (!this.isFirst) { return }
        this.camera.springArm.length = this.curLenth;
        this.localPlayer.character.setVisibility(mw.PropertyStatus.On);
        this.isFirst = false;
    }

    private changeTargetArmLength(value: number) {
        if (value > 0) {
            if (this.isFirst) {
                this.changeThird();
                return
            }
            if (this.camera.springArm.length > 1000) { return }
            this.camera.springArm.length += value;
        }
        else if (value < 0) {
            if (this.isFirst) { return }
            this.camera.springArm.length += value;
            if (this.camera.springArm.length < 50) {
                this.changeFirst();
            }
        }
    }

}
export class InputModuleS extends ModuleS<InputModuleC, null> {

}