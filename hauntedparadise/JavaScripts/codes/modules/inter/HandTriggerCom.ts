import { GlobalDefine } from "../../../DefNoSubModule";
import { WaitLoop } from "../../utils/AsyncTool";
import { ListenContainer } from "../../utils/CommonUtils";
import { GhostTraceHelper } from "../../utils/TraceHelper";
import DoorScript, { EDoorType } from "../DoorScript";
import PushItemControl from "../Level/PushItemControl";
import { BoardHelper } from "../blackboard/BoardDefine";
import { HandTrigger } from "./HandTrigger";
import { InterEvtData, InterEvtNameDef, ObjInterDefine } from "./ObjInterDefine";
import { ChainHelper } from "./helper/ChainHelper";
import { ItemTraceHelper } from "./helper/ItemTraceHelper";

@Component
export default class HandTriggerCom extends HandTrigger {
    @mw.Property({ group: "事件设置", displayName: "触发事件" })
    public evtDataArr: InterEvtData[] = [new InterEvtData()];

    @mw.Property({ group: "交互设置", displayName: "是否初始化可以交互" })
    public isInitCanInter: boolean = true;

    @mw.Property({ group: "交互设置", displayName: "是否开启提示", tooltip: "如果不能提示，填0" })
    public isNeedTip: number = 1;

    private _goes: mw.GameObject[] = [];

    private _container: ListenContainer = new ListenContainer();

    private _isChanged: boolean = false;

    protected onStart(): void {
        if (SystemUtil.isClient()) {
            WaitLoop.loop(() => { return this.gameObject }).then(() => {
                if (GlobalDefine.isThirdPerson) {
                    this.initHandTrigger();
                }
                else {
                    this.gameObject.asyncReady().then(() => { this.addFunc(this.gameObject) });
                }
            })
            this._container.addListener(Event.addLocalListener("evt_changeInterAble", (goid: string, val: string) => {
                if (goid != this.gameObject.gameObjectId) {
                    return;
                }
                this._isChanged = true;
                if (val == "true") {
                    this.setInter(true, this.gameObject);
                    if (this.gameObject.getCollision() != CollisionStatus.QueryOnly && this.gameObject.getCollision() != CollisionStatus.On) {
                        this.gameObject.setCollision(CollisionStatus.QueryOnly);
                    }
                }
                else {
                    this.setInter(false, this.gameObject);
                }

            }))
            this._container.addListener(Event.addLocalListener(BoardHelper.BoardLoadingEvt, () => {
                if (!this._isChanged) {
                    return;
                }
                this._isChanged = false;
                this.setInter(this.isInitCanInter, this.gameObject);
            }))
        }
    }

    private setInter(isInter: boolean, go: GameObject) {
        if (!isInter) {
            go.tag = "";
        }
        else {
            go.tag = "interObj";
        }
        go.getChildren().forEach(e => {
            this.setInter(isInter, e);
        })
    }

    private addFunc(go: mw.GameObject) {
        if (!go || !go.worldTransform) {
            console.error("[HandInterCompoent]配置错误" + this.gameObject.gameObjectId)
            return;
        }

        if (go.name == "separator") {
            return;
        }
        // 防止重复绑定
        if (!go["interFunc"]) {
            go["interFunc"] = this.interFunc.bind(this);
            go["interTag"] = this.gameObject.gameObjectId;
            go["highFunc"] = this.highLight.bind(this);
            go["shighFunc"] = this.highLightByColor.bind(this);
            this._goes.push(go);
            //console.log(go.gameObjectId + "++" + this.gameObject.gameObjectId)
        }
        if (this.isInitCanInter) {
            go.tag = "interObj";
        }
        else {
            go.tag = "";
        }
        let childs = go.getChildren().slice(0);
        for (let index = 0; index < childs.length; index++) {
            const c = childs[index];
            this.addFunc(c);
        }
    }

    private highLight(isHigh: boolean) {
        this._goes.forEach(e => {
            if (e instanceof mw.Model) {
                e.setPostProcessOutline(isHigh, LinearColor.white, 2);
                if (!isHigh) {
                    ItemTraceHelper.instance.checkGo(e);
                }
            }
        })
        let isShow = false;
        if (isHigh && this.isNeedTip) {
            isShow = this.checkDoor();
            if (!isShow) isShow = this.checkPsuh();
        }
        !isShow && ItemTraceHelper.instance.hideTraceUI();
    }


    public highLightByColor(isHigh: boolean, color: LinearColor) {
        this._goes.forEach(e => {
            if (e instanceof mw.Model) {
                e.setPostProcessOutline(isHigh, color, 4);
            }
        })
    }

    private checkDoor() {
        let chain = ChainHelper.instance.checkChain<DoorScript>(this.evtDataArr, InterEvtNameDef.doorInter);
        if (chain && chain.doorState == EDoorType.Lock) {
            ItemTraceHelper.instance.traceItem(chain.unlockItemId, this, chain);
            return true;
        }
        return false;
    }

    private checkPsuh() {
        let chain = ChainHelper.instance.checkChain<PushItemControl>(this.evtDataArr, InterEvtNameDef.evt_useItem);
        if (chain && chain.isPushed == false) {
            ItemTraceHelper.instance.traceItem(chain.canPushItemCfgId[0], this, chain);
            return true;
        }
        return false;
    }

    private interFunc() {
        ObjInterDefine.dispatchClientByData(this.evtDataArr, this.gameObject.gameObjectId);
        GhostTraceHelper.interTrace(4, 0, this.gameObject.gameObjectId, true);
        console.log("触碰了一个物品")
    }

    protected onDestroy(): void {
        super.onDestroy();
        this._container.destroy();
    }

    public onClickHand(isHumanClick?: boolean): void {
        this.interFunc();
    }

    //#region handTriggerPart
    // @mw.Property({ group: "事件设置", displayName: "触发事件" })
    // public evtDataArr: InterEvtData[] = [new InterEvtData()];

    // public onClickHand(): void {
    //     ObjInterDefine.dispatchClientByData(this.evtDataArr, this.gameObject.gameObjectId);
    // }
    //#endregion
}