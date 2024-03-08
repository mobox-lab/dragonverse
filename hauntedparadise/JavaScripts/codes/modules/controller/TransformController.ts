/*
 * @Author: yudong.wu yudong.wu@appshahe.com
 * @Date: 2023-10-09 17:44:00
 * @LastEditors: yudong.wu yudong.wu@appshahe.com
 * @LastEditTime: 2023-10-12 17:52:46
 * @FilePath: \catcompanion\JavaScripts\modules\controller\TransformController.ts
 * @Description: 
 */

import { BoardHelper } from "../blackboard/BoardDefine";
import { InterEvtNameDef } from "../inter/ObjInterDefine";
import { EmProcedureState } from "../procedure/const/EmProcedureState";
import { Event_GameStateChange } from "../procedure/const/Events";

enum TransformType {
    Postion,
    Rotation,
    Scale,
}

@Serializable
class Attribute {
    @mw.Property({ group: "配置", displayName: "Transform数值" })
    public vec: Vector = Vector.zero;
    @mw.Property({ group: "配置", displayName: "是否使用世界Transform" })
    public isWorldTrans: boolean = true;
}

@Component
export default class TransformController extends mw.Script {
    @mw.Property({ group: "全局设置", displayName: "位置属性配置" })
    public posAttribute: Attribute = new Attribute();
    @mw.Property({ group: "全局设置", displayName: "旋转属性配置" })
    public rotAttribute: Attribute = new Attribute();
    @mw.Property({ group: "全局设置", displayName: "缩放属性配置" })
    public scaleAttribute: Attribute = new Attribute();
    @mw.Property({ group: "Tween动画配置", displayName: "是否使用世界transFrom" })
    public isWorldTrans: boolean = false;
    @mw.Property({ group: "Tween动画配置", displayName: "Tween动画类型", enumType: TransformType })
    public tweenType: TransformType = TransformType.Postion;
    @mw.Property({ group: "Tween动画配置", displayName: "Tween动画持续时间(s)" })
    public intervalTime: number = 0;
    public startPos: Vector = Vector.zero;
    @mw.Property({ group: "Tween动画配置", displayName: "Tween动画结束位置" })
    public endPos: Vector = Vector.zero;
    public isStartAtCur: boolean = true;

    public tween: any = null;

    private _cachePos: any;

    /**监听事件arr */
    private _listenerArr: mw.EventListener[] = [];
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        if (SystemUtil.isClient()) {
            let resetFunc = () => {
                if (!this._cachePos) {
                    return;
                }
                if (this.tween) {
                    this.tween.stop();
                    TweenUtil.TWEEN.remove(this.tween);
                    this.tween = null;
                }
                switch (this.tweenType) {
                    case TransformType.Postion:
                        if (this.isWorldTrans) {
                            this.gameObject.worldTransform.position = this._cachePos.clone();
                        }
                        else {
                            this.gameObject.localTransform.position = this._cachePos.clone();
                        }
                        break;
                    case TransformType.Rotation:
                        if (this.isWorldTrans) {
                            this.gameObject.worldTransform.rotation = this._cachePos.clone();
                        }
                        else {
                            this.gameObject.localTransform.rotation = this._cachePos.clone();
                        }
                        break;
                    case TransformType.Scale:
                        if (this.isWorldTrans) {
                            this.gameObject.worldTransform.scale = this._cachePos.clone();
                        }
                        else {
                            this.gameObject.localTransform.scale = this._cachePos.clone();
                        }
                        break;
                    default:
                        break;
                }
            }

            this._listenerArr.push(Event.addLocalListener(BoardHelper.BoardLoadingEvt, resetFunc));

            //this._listenerArr.push(Event.addLocalListener(BoardHelper.BoardClearEvent, resetFunc));

            this._listenerArr.push(Event.addLocalListener(InterEvtNameDef.setLocationEvtName, (guid: string) => {
                if (this.gameObject.gameObjectId == guid) {
                    if (this.posAttribute.isWorldTrans) {
                        this.gameObject.worldTransform.position = this.posAttribute.vec;
                    } else {
                        this.gameObject.localTransform.position = this.posAttribute.vec;
                    }

                }
            }));

            this._listenerArr.push(Event.addLocalListener(InterEvtNameDef.setRotationEvtName, (guid: string) => {
                if (this.gameObject.gameObjectId == guid) {
                    if (this.rotAttribute.isWorldTrans) {
                        this.gameObject.worldTransform.rotation = new Rotation(this.posAttribute.vec);
                    } else {
                        this.gameObject.localTransform.rotation = new Rotation(this.posAttribute.vec);
                    }

                }
            }));

            this._listenerArr.push(Event.addLocalListener(InterEvtNameDef.setScaleEvtName, (guid: string) => {
                if (this.gameObject.gameObjectId == guid) {
                    if (this.scaleAttribute.isWorldTrans) {
                        this.gameObject.worldTransform.scale = this.posAttribute.vec;
                    } else {
                        this.gameObject.localTransform.scale = this.posAttribute.vec;
                    }

                }
            }));

            this._listenerArr.push(Event.addLocalListener(InterEvtNameDef.playTweenEvtName, (guid: string, forwardPlay: string) => {
                if (this.gameObject.gameObjectId == guid) {
                    this.playTween(forwardPlay == "true");
                }
            }));

        }
    }

    playTween(forwardPlay: boolean) {
        if (this.tween) {
            this.tween.stop();
            TweenUtil.TWEEN.remove(this.tween);
            this.tween = null;
        }
        let startPos: any = forwardPlay ? this.startPos.clone() : this.endPos.clone();
        console.log(forwardPlay + "[TransformCtl]forwardPlay" + this.gameObject.gameObjectId)
        let endPos: any = forwardPlay ? this.endPos.clone() : this.startPos.clone();
        if (this.tweenType == TransformType.Rotation) {
            startPos = new Rotation(startPos.x, startPos.y, startPos.z);
            endPos = new Rotation(endPos.x, endPos.y, endPos.z);
        }
        if (this.isStartAtCur) {
            switch (this.tweenType) {
                case TransformType.Postion:
                    startPos = this.isWorldTrans ? this.gameObject.worldTransform.position.clone() : this.gameObject.localTransform.position.clone();
                    break;
                case TransformType.Rotation:
                    startPos = this.isWorldTrans ? this.gameObject.worldTransform.rotation.clone() : this.gameObject.localTransform.rotation.clone();
                    break;
                case TransformType.Scale:
                    startPos = this.isWorldTrans ? this.gameObject.worldTransform.scale.clone() : this.gameObject.localTransform.scale.clone();
                    break;
                default:
                    break;
            }
        }

        if (!this._cachePos) {
            this.startPos = startPos.clone();
            this._cachePos = startPos.clone();
            if (!forwardPlay) {
                console.error("[TransformCtl]未设置初始位置，无法反向播放");
                return;
            }
        }
        console.log("[TransformCtl]targetRot" + endPos);
        this.tween = new mw.Tween(startPos)
            .to(endPos, this.intervalTime * 1000)
            .onUpdate((obj) => {
                if (!this.gameObject) { this.tween.stop(); return; }
                try {
                    switch (this.tweenType) {
                        case TransformType.Postion:
                            this.isWorldTrans ? this.gameObject.worldTransform.position = obj : this.gameObject.localTransform.position = obj;
                            break;
                        case TransformType.Rotation:
                            this.isWorldTrans ? this.gameObject.worldTransform.rotation = obj : this.gameObject.localTransform.rotation = obj;
                            break;
                        case TransformType.Scale:
                            this.isWorldTrans ? this.gameObject.worldTransform.scale = obj : this.gameObject.localTransform.scale = obj;
                            break;
                        default:
                            break;
                    }
                } catch (error) {
                    console.error(error);
                }
            }).onComplete(() => {
                try {
                    TweenUtil.TWEEN.remove(this.tween);
                } catch (error) {
                    console.error(error);
                }
            })
            .start();
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