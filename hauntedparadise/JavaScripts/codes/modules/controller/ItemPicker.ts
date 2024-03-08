/*
 * @Author       : enyu.liu enyu.liu@appshahe.com
 * @Date         : 2023-10-16 18:14:53
 * @LastEditors  : dal
 * @LastEditTime : 2024-01-12 11:39:40
 * @FilePath     : \hauntedparadise\JavaScripts\codes\modules\controller\ItemPicker.ts
 * @Description  : 
 */
import { ListenContainer } from "../../utils/CommonUtils";
import { MapEx } from "../../utils/MapEx";
import { GhostTraceHelper } from "../../utils/TraceHelper";
import LevelBase from "../Level/LevelBase";
import { ArchiveData, ClueSaveData } from "../archive/ArchiveHelper";
import { BagDefine } from "../bag/BagDefine";
import { BagModuleC } from "../bag/BagModuleC";
import { BoardHelper, BoardKeys } from "../blackboard/BoardDefine";
import { InterSaveModuleC } from "../inter/InterSaveHelper";
import { InterEvtData, ObjInterDefine } from "../inter/ObjInterDefine";
import { ItemTraceHelper } from "../inter/helper/ItemTraceHelper";
import { PickItemId, PickItemTag } from "../procedure/const/ClueDefine";

@Component
export default class ItemPicker extends LevelBase {
    @mw.Property({ group: "全局设置", displayName: "物品id", numberType: mw.NumberType.Int64 })
    public itemId: number = 0;

    @mw.Property({ group: "事件设置", displayName: "触发事件" })
    public evtDataArr: InterEvtData[] = [new InterEvtData()];

    @mw.Property({ group: "全局设置", displayName: "提示特效" })
    public effectGuid: string = "158178";

    @mw.Property({ group: "全局设置", displayName: "特效scale" })
    public effectScale: number = 0.1;

    /** 可以捡到的数量 */
    @mw.Property({ group: "全局设置", displayName: "默认堆叠的数量" })
    public count: number = 1;

    @mw.Property({ group: "全局设置", displayName: "是否可以重复拾取" })
    public canRepeatPick: boolean = false;

    protected itemKey: string = "";

    private _lisenArr: ListenContainer = new ListenContainer();

    private _tryCount;

    /** 是否需要在拾取时选中 */
    private needSelect: boolean = true;

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        if (!this.gameObject) {
            setTimeout(() => {
                if (this._tryCount <= 10) {
                    this._tryCount++;
                    this.onStart();
                }
            }, 1000);
            return;
        }
        this.itemKey = StringUtil.format(BoardKeys.InterStats, this.gameObject.gameObjectId)
        if (SystemUtil.isClient()) {
            ItemTraceHelper.instance.addItemPicker(this);
            super.onStart();
            if (this.gameObject.getCollision() != CollisionStatus.On && this.gameObject.getCollision() != CollisionStatus.QueryCollisionOnly) {
                console.error("这个道具没有开碰撞，请注意是否设计如此" + this.gameObject.gameObjectId);
            }
            if (this.effectGuid) {
                GameObject.asyncSpawn(this.effectGuid).then((go: GameObject) => {
                    if (!this.gameObject) {
                        go.destroy();
                        return;
                    }
                    go.parent = this.gameObject;
                    go.localTransform.position = Vector.zero;
                    go.worldTransform.scale = Vector.one.multiply(this.effectScale);
                    go.localTransform.rotation = Rotation.zero;
                    if (go instanceof Effect) {
                        go.loop = true;
                        go.play();
                    }
                })
            }

            this._lisenArr.addListener(Event.addLocalListener("EnableNeedSelectWhenPick", (enable: boolean) => {
                this.needSelect = enable;
            }));

            //this.gameObj.setCollision(CollisionStatus.On);
            this._lisenArr.addListener(Event.addLocalListener(BoardHelper.BoardValueChangeEvent, (key: string, val: string) => {
                if (key != this.itemKey) {
                    return;
                }
                this.gameObject.setVisibility(val ? PropertyStatus.Off : PropertyStatus.FromParent, true);
                this.gameObject.setCollision(val ? CollisionStatus.Off : CollisionStatus.On, true);
                ObjInterDefine.dispatchServerByData(this.evtDataArr, this.gameObject.gameObjectId);
                if (val) {
                    ItemTraceHelper.instance.removePicker(this, true);
                }
                else {
                    ItemTraceHelper.instance.addItemPicker(this);
                }
            }));
            this._lisenArr.addListener(Event.addLocalListener(BoardHelper.BoardClearEvent, () => {
                if (!(this.gameObject as Model).setCollision || !this.gameObject.worldTransform) {
                    console.error("[itemPickerSetCollsionError]")
                    return;
                }
                this.gameObject.setVisibility(PropertyStatus.FromParent, true);
                (this.gameObject as Model).setCollision(CollisionStatus.On, true);
                ItemTraceHelper.instance.addItemPicker(this);
            }))
            this._lisenArr.addListener(Event.addLocalListener("evt_itemPick", (guid: string) => {
                if (guid != this.gameObject.gameObjectId) {
                    return;
                }
                this.pickUpItem(Player.localPlayer.playerId);
                GhostTraceHelper.itemTrace(this.itemId, 0);
            }))
        }
    }

    onLoadData(data: ArchiveData): void {
        let id = this.getSaveStatId(data);
        if (!id) {
            return;
        }
        BoardHelper.ChangeKeyValue(this.itemKey, true);
    }

    // @RemoteFunction(mw.Server)
    protected async pickUpItem(playerId: number) {
        if (this.gameObject[PickItemId]) {
            this.itemId = this.gameObject[PickItemId];
        }
        let isPick = BoardHelper.GetTargetKeyValue(this.itemKey);
        if (!isPick) {
            let res = true;
            if (!ModuleService.getModule(BagModuleC).checkItemCanPick(playerId, this.itemId, "", this.gameObject[PickItemTag], this.count)) {
                return;
            }

            if (this.canRepeatPick) {
                BagDefine.AddItem(playerId, this.itemId, "", "", this.count, this.needSelect);
                return;
            }

            BoardHelper.ChangeKeyValue(this.itemKey, true);
            if (!this.gameObject[PickItemTag]) {
                this.save2ArchiveAndAddItem(1, this.itemId, this.count, this.needSelect);
            }
            else {
                res = await BagDefine.AddItem(playerId, this.itemId, "", this.gameObject[PickItemTag], this.count, this.needSelect);
            }

            if (res) {
                Event.dispatchToLocal("discardItem", this.gameObject[PickItemTag]);
            }
            else {
                BoardHelper.ChangeKeyValue(this.itemKey, false);
            }
        }
    }

    protected onDestroy(): void {
        super.onDestroy();
        this._lisenArr.destroy();
        ItemTraceHelper.instance.removePicker(this);
    }
}