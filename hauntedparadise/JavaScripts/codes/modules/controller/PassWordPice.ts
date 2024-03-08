import { CommonUtils, ListenContainer } from "../../utils/CommonUtils";
import { LanUtil } from "../../utils/LanUtil";
import Tips from "../../utils/Tips";
import { GhostTraceHelper } from "../../utils/TraceHelper";
import LevelBase from "../Level/LevelBase";
import { ArchiveData } from "../archive/ArchiveHelper";
import { BagDefine } from "../bag/BagDefine";
import { BoardHelper, BoardKeys } from "../blackboard/BoardDefine";
import { InterSaveModuleC } from "../inter/InterSaveHelper";
import { InterEvtData, ObjInterDefine } from "../inter/ObjInterDefine";
import { PassWordHelper } from "../inter/PassWordHelperS";
import { PickItemTag } from "../procedure/const/ClueDefine";

@Component
export default class PassWordPice extends LevelBase {
    //@mw.Property({ hideInEditor: true, replicated: true, onChanged: "onNumChanged" })
    public num: string = "";

    @mw.Property({ group: "全局设置", displayName: "物品id", numberType: mw.NumberType.Int64 })
    public itemId: number = 0;

    @mw.Property({ group: "全局设置", displayName: "UI", capture: true })
    public uiGuid: string = "";

    @mw.Property({ group: "全局设置", displayName: "第几位数字" })
    public th: number = 1;
    @mw.Property({ group: "全局设置", displayName: "哪个密码锁(id)的碎片" })
    public lockId: string = "";
    @mw.Property({ group: "事件设置", displayName: "触发事件" })
    public evtDataArr: InterEvtData[] = [new InterEvtData()];

    protected itemKey: string = "";

    private _lisenterCon: ListenContainer = new ListenContainer()

    gameObj: Model;

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        this.gameObj = this.gameObject as Model;
        this.itemKey = StringUtil.format(BoardKeys.InterStats, this.gameObj.gameObjectId)
        if (SystemUtil.isClient()) {
            super.onStart();
            this.gameObj.setCollision(CollisionStatus.On);
            this._lisenterCon.addListener(Event.addLocalListener(BoardHelper.BoardValueChangeEvent, (key: string, val: boolean) => {
                if (key != this.itemKey) {
                    return;
                }
                this.gameObj.setVisibility(val ? PropertyStatus.Off : PropertyStatus.On);
                this.gameObj.setCollision(val ? CollisionStatus.Off : CollisionStatus.On, true);
                ObjInterDefine.dispatchServerByData(this.evtDataArr, this.gameObj.gameObjectId);
            }))
            this._lisenterCon.addListener(Event.addLocalListener(PassWordHelper.WordUpdateEvt, (key: string) => {
                this.checkNumPice(key);
            }))
            this._lisenterCon.addListener(Event.addLocalListener(BoardHelper.BoardClearEvent, () => {
                this.gameObj.setVisibility(PropertyStatus.On, true);
                this.gameObj.setCollision(CollisionStatus.On, true);
            }))

            this._lisenterCon.addListener(Event.addLocalListener("evt_itemPick", (guid: string) => {
                if (guid != this.gameObj.gameObjectId) {
                    return;
                }
                Tips.show(CommonUtils.formatString(LanUtil.getText("Door_Tips4"), this.th, this.num));
                // if (!this.gameObject["pickId"]) { 
                //     this.save2Archive(1);
                // }
                // this.pickUpItem(Player.localPlayer.playerId);
                // GhostTraceHelper.uploadMGS("ts_item_give", "拾取道具时上发", { item_id: this.itemId });
            }))

            this.onNumChanged();
        }
    }

    protected onDestroy(): void {
        super.onDestroy();
        this._lisenterCon.destroy();
    }

    private checkNumPice(key: string) {
        if ((BoardKeys.Password + this.lockId) != key) {
            return;
        }
        if (this.th - 1 < 0) {
            console.error("密码取的位数不对，要填1~4", this.gameObj.gameObjectId);
        }
        this.num = PassWordHelper.instance.getNewNum(this.lockId, Math.max(this.th - 1, 0));
        console.log("密码", this.num)
        this.onNumChanged();
    }

    private onNumChanged() {
        if (!this.gameObj) {
            return;
        }
        GameObject.asyncFindGameObjectById(this.uiGuid).then((ui: mw.UIWidget) => {
            let uiwdiget = ui.getTargetUIWidget();
            let txt = uiwdiget.findChildByPath("RootCanvas/num_txt") as mw.TextBlock;
            txt.text = this.num;
        })
    }

    onLoadData(data: ArchiveData): void {
        let id = this.getSaveStatId(data);
        if (!id) {
            return;
        }
        BoardHelper.ChangeKeyValue(this.itemKey, true);
    }

    //@RemoteFunction(mw.Server)
    protected async pickUpItem(playerId: number) {
        let isPick = BoardHelper.GetTargetKeyValue(this.itemKey);
        if (!isPick) {
            BoardHelper.ChangeKeyValue(this.itemKey, true);
            let res = await BagDefine.AddItem(playerId, this.itemId, this.num.toString(), this.gameObj[PickItemTag]);
            if (res) {
                Event.dispatchToLocal("discardItem", this.gameObj[PickItemTag]);
            }
            else {
                BoardHelper.ChangeKeyValue(this.itemKey, false);
            }
        }
    }
}