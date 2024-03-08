import DoorScript from "../../DoorScript";
import PushItemControl from "../../Level/PushItemControl";
import { BagModuleC } from "../../bag/BagModuleC";
import { BoardHelper } from "../../blackboard/BoardDefine";
import ItemPicker from "../../controller/ItemPicker";
import { HintTraceUI, HintUI } from "../../equip/ui/HintUI";
import HandTriggerCom from "../HandTriggerCom";

const nearVec = new Vector(200, 200, 200);

interface IChainItem {
    isUseCue: boolean;
    setCueSave();
}

export class ItemTraceHelper {
    public static instance: ItemTraceHelper = new ItemTraceHelper();

    private itemPickerMap: Map<number, ItemPicker[]> = new Map();

    private _curId: number = 0;

    private _traceItem: ItemPicker;

    private _targetPos: Vector = Vector.zero;

    private _selectedChain: IChainItem;

    private _handTri: HandTriggerCom;

    public constructor() {
        Event.addLocalListener(BoardHelper.BoardClearEvent, () => {
            UIService.hide(HintTraceUI);
            if (this._traceItem) {
                let go = this._traceItem.gameObject;
                go.worldTransform && this.highLightByColor(go, false);
                this._traceItem = null;
            }
        })
    }

    public addItemPicker(picker: ItemPicker) {
        if (!this.itemPickerMap.has(picker.itemId)) {
            this.itemPickerMap.set(picker.itemId, []);
        }
        this.itemPickerMap.get(picker.itemId).push(picker);
    }

    public removePicker(picker: ItemPicker, isItem: boolean = false) {
        if (!picker) {
            return;
        }
        if (this.itemPickerMap.has(picker.itemId)) {
            const arr = this.itemPickerMap.get(picker.itemId);
            const index = arr.indexOf(picker);
            if (index !== -1) {
                arr.splice(index, 1);
            }
        }
        if (!isItem) {
            return;
        }
        if (this._traceItem && this._traceItem.itemId == picker.itemId) {
            UIService.hide(HintTraceUI);
            const go = this._traceItem.gameObject;
            go.worldTransform && this.highLightByColor(go, false);
            this._traceItem = null;
        }
    }

    public traceItem(itemId: number, trigger: HandTriggerCom, chain: IChainItem) {
        let itemNum = trigger.isNeedTip;
        if (chain.isUseCue) {
            itemNum = 0;
        }
        this._curId = itemId;
        let arr = this.itemPickerMap.get(itemId);
        if (!arr || arr.length == 0) {
            return;
        }
        let ui = UIService.show(HintUI);
        ui.setNum(itemNum);
        this._selectedChain = chain
    }

    public hideTraceUI() {
        UIService.hide(HintUI);
    }

    public startTrace() {
        if (this._selectedChain) {
            this._selectedChain.setCueSave();
        }
        if (this._traceItem) {
            this.highLightByColor(this._traceItem.gameObject, false);
        }
        let arr = this.itemPickerMap.get(this._curId);
        let charpos = Player.localPlayer.character.worldTransform.position;
        let item = arr[0];
        let curDis = Vector.distance(charpos, arr[0].gameObject.worldTransform.position);
        for (let index = 1; index < arr.length; index++) {
            const newItem = arr[index];
            let trans = newItem.gameObject.worldTransform
            if (!trans) {
                continue;
            }
            const dis = Vector.distance(trans.position, charpos);
            if (curDis > dis) {
                curDis = dis;
                item = newItem;
            }
        }
        this._traceItem = item;
        this._targetPos.set(item.gameObject.worldTransform.position);
        this.highLightByColor(item.gameObject, true);
        let newPos = this._targetPos;
        if (Navigation["getClosestReachablePoint"]) {
            newPos = Navigation["getClosestReachablePoint"](newPos, nearVec);
        }
        UIService.getUI(HintTraceUI).setTargetLoc(newPos, this._targetPos);
    }

    public checkGo(go: GameObject) {
        if (!this._traceItem) {
            return;
        }
        if (go["interTag"] == this._traceItem.gameObject["interTag"]) {
            let model = go as Model
            model.setPostProcessOutline(true, LinearColor.yellow, 4);
        }
    }

    private highLightByColor(root: GameObject, isHigh: boolean) {
        root["shighFunc"](isHigh, LinearColor.yellow);
        // if (root instanceof mw.Model) {
        //     root.setPostProcessOutline(isHigh, LinearColor.yellow, 4);
        // }
        // let children = root.getChildren();
        // for (let index = 0; index < children.length; index++) {
        //     const element = children[index];
        //     this.highLightByColor(element, isHigh);
        // }
    }
}