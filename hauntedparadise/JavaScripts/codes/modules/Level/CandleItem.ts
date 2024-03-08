import { GameConfig } from "../../../config/GameConfig";
import { CommonUtils } from "../../utils/CommonUtils";
import { LanUtil } from "../../utils/LanUtil";
import Tips from "../../utils/Tips";
import { ArchiveData } from "../archive/ArchiveHelper";
import { BoardHelper, BoardKeys } from "../blackboard/BoardDefine";
import { EquipDefine } from "../equip/EquipDefine";
import { InterSaveModuleC } from "../inter/InterSaveHelper";
import { InterEvtData, ObjInterDefine } from "../inter/ObjInterDefine";
import { DifficultItemKey } from "../inter/objInter/DifficultItem";
import CandleCenter from "./CandleCenter";
import LevelBase from "./LevelBase";

@Component
export default class CandleItem extends LevelBase {
    @Property({ displayName: "检测手持道具" })
    checkItemId: number = 0;

    @Property({ displayName: "蜡烛中心id" })
    candleId: number = 0;

    @Property({ displayName: "难度等级", tooltip: "需要大于或者等于这个难度等级才会显示出来的东西" })
    public level: number = 0;

    @Property({ displayName: "需要显隐的物体", capture: true })
    public goId: string = "";

    @mw.Property({ group: "事件设置", displayName: "触发事件" })
    public evtDataArr: InterEvtData[] = [new InterEvtData()];

    private _isActive: boolean = false;

    protected onStart(): void {
        if (SystemUtil.isServer()) {
            return;
        }
        super.onStart();
        this.addLocalListen(BoardHelper.BoardValueChangeEvent, (key: string, value: string) => {
            if (key != BoardKeys.Degree) {
                return;
            }
            let degree = Number(value);
            this.gameObject[DifficultItemKey] = true;
            if (this.level > degree) {
                this._isActive = true;
                Event.dispatchToLocal("CandleActive", this.candleId)
                this.gameObject.setCollision(CollisionStatus.Off, true);
                this.gameObject.setVisibility(PropertyStatus.Off);
                return;
            }
            this.gameObject.setCollision(CollisionStatus.On, true);
            this.gameObject.setVisibility(PropertyStatus.On);
        })
    }

    protected onLevelStart(): void {
        this.addLocalListen("CandleItem", (goid: string) => {
            if (this._isActive) {
                return;
            }
            if (goid != this.gameObject.gameObjectId) {
                return;
            }
            if (EquipDefine.getCurItem(Player.localPlayer.playerId) != this.checkItemId && this.checkItemId != 0) {
                let itemCfg = GameConfig.Item.getElement(this.checkItemId);
                if (itemCfg) {
                    Tips.show(CommonUtils.formatString(LanUtil.getText("Door_Tips2"), itemCfg.name));
                }
                return;
            }
            EquipDefine.useItem(Player.localPlayer.playerId);
            this.activeCandle();
        })
        let count = CandleCenter.candleMap.get(this.candleId) || 0;
        CandleCenter.candleMap.set(this.candleId, count + 1);
        GameObject.asyncFindGameObjectById(this.goId).then((go: GameObject) => {
            go.setVisibility(PropertyStatus.Off);
        })
    }

    onReset(): void {
        this._isActive = false;
        GameObject.asyncFindGameObjectById(this.goId).then((go: GameObject) => {
            go.setVisibility(PropertyStatus.Off);
        })
    }

    activeCandle() {
        if (this._isActive) {
            return;
        }
        this._isActive = true;
        Event.dispatchToLocal("CandleActive", this.candleId)
        this.save2Archive(1);
        GameObject.asyncFindGameObjectById(this.goId).then((go: GameObject) => {
            if (go instanceof Effect) {
                go.loop = true;
                go.play();
            }
            go.setVisibility(PropertyStatus.On);
        })
        ObjInterDefine.dispatchClientByData(this.evtDataArr, this.gameObject.gameObjectId);
    }

    onLoadData(data: ArchiveData): void {
        let stat = this.getSaveStatId(data);
        if (!stat) {
            this._isActive = false;
            return;
        }
        this.activeCandle();
    }
}