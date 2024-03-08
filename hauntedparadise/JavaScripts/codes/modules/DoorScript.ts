import { GameConfig } from "../../config/GameConfig";
import GameStart, { EGameTheme } from "../GameStart";
import { SpawnManager } from '../Modified027Editor/ModifiedSpawn';
import { CommonUtils } from '../utils/CommonUtils';
import { LanUtil } from "../utils/LanUtil";
import Tips from '../utils/Tips';
import { GhostTraceHelper } from '../utils/TraceHelper';
import LevelBase from './Level/LevelBase';
import { ArchiveData } from './archive/ArchiveHelper';
import { BlackBoardModuleC } from "./blackboard/BlackBoardMdouleC";
import { BlackBoardModuleS } from "./blackboard/BlackBoardModuleS";
import { BoardHelper } from "./blackboard/BoardDefine";
import { EquipDefine } from "./equip/EquipDefine";
import { InterEvtData, InterEvtNameDef, ObjInterDefine } from "./inter/ObjInterDefine";
import { ChainHelper } from "./inter/helper/ChainHelper";
import { DifficultItemKey } from './inter/objInter/DifficultItem';

export enum EDoorType {
    /**上锁 */
    Lock = 0,
    /**未上锁 */
    UnLock = 1,
    /**打不开 */
    CanNotOpen = 2,
}

@Component
export default class DoorScript extends LevelBase {
    public static doorId: number = 0;

    @mw.Property({ replicated: true, displayName: "所属房间" })
    public belongRoom: number = 0;
    @mw.Property({ replicated: true, displayName: "交互物类型(0门1柜子)" })
    public interObjType: number = 0;
    @mw.Property({ replicated: true, displayName: "类型(0上锁，1未上锁，2打不开)" })
    public doorType: number = 0;
    @mw.Property({ replicated: true, displayName: "解锁所需道具ID" })
    public unlockItemId: number = 0;
    @mw.Property({ displayName: "开锁的延迟时间(s)" })
    public delayTime: number = 2;
    @mw.Property({ displayName: "是否开门后关闭碰撞" })
    public isOpen2CloseCollision: boolean = true;
    @mw.Property({ group: "事件设置", displayName: "开门触发事件" })
    public evtDataArr: InterEvtData[] = [new InterEvtData()];
    @mw.Property({ group: "事件设置", displayName: "关门触发事件" })
    public closeEvtDataArr: InterEvtData[] = [new InterEvtData()];
    @mw.Property({ group: "事件设置", displayName: "开锁触发事件" })
    public lockEvtDataArr: InterEvtData[] = [new InterEvtData()]
    @mw.Property({ group: "事件设置", displayName: "开锁失败触发事件" })
    public lockFailEvtDataArr: InterEvtData[] = [new InterEvtData()]

    /**门的状态 */
    public doorState: EDoorType = EDoorType.Lock;
    /**门是开启还是关闭状态 */
    private _doorOpen: boolean = false;
    /**是否可交互开门 */
    private _canInterOpen: boolean = true;

    public isUseCue: boolean = false;

    /** uuid,记录用 */
    private _uuid: string = "";

    protected onStart(): void {
        super.onStart();
        if (GameStart.GameTheme != EGameTheme.Graveyard) {
            setTimeout(() => {
                this.resetData();
            }, 5000 + (DoorScript.doorId * 100));
            DoorScript.doorId++;
        }
        ChainHelper.instance.addevt(InterEvtNameDef.doorInter, this);
    }

    protected onLevelStart(): void {
        if (SystemUtil.isClient()) {
            this.doorState = this.doorType;
            if (this.gameObject.parent) {
                let cacheTrans = this.gameObject.parent.worldTransform.clone();
                let trigger = this.gameObject.parent;
                if (trigger instanceof Trigger) {
                    console.error("该DoorScripts的父节点的父节点为触发器,请及时替换" + this.gameObject.gameObjectId)
                    trigger.onEnter.add(this.onGoEnter.bind(this))
                    trigger.onLeave.add(this.onGoLeave.bind(this))
                    this.gameObject.parent = null;
                    SpawnManager.asyncSpawn({ guid: "Anchor", replicates: false }).then(go => {
                        go.worldTransform = cacheTrans;
                        this.gameObject.parent = go;
                        go.setCollision(PropertyStatus.On, true);
                        this.resetData();
                    })
                }
            }
            let trigger = this.gameObject.getChildByName("trigger");
            if (trigger && trigger instanceof Trigger) {
                trigger.parent = null;
                trigger.onEnter.add(this.onGoEnter.bind(this))
                trigger.onLeave.add(this.onGoLeave.bind(this))
            }
            //this.resetData();

            this.addLocalListen(BoardHelper.BoardClearEvent, () => {
                this.resetData();
            });
            //监听交互事件
            this.addLocalListen(InterEvtNameDef.doorInter, (interObj: string) => {
                if (this.gameObject["BuildingUUID"]) {
                    return;
                }
                let player = Player.localPlayer;
                if (!this.gameObject) return;
                if (this.gameObject.gameObjectId == interObj) {
                    if (!this._canInterOpen) return;
                    //打着门，若此时门关着则打开
                    let showEffect: boolean = false;
                    if (this.doorState == EDoorType.Lock) {
                        //判断是否有钥匙
                        if (EquipDefine.getCurItem(player.playerId) == this.unlockItemId) {
                            this.doorState = EDoorType.UnLock;
                            showEffect = !this._doorOpen;
                            this.save2ArchiveAndUseItem(1);
                            ObjInterDefine.dispatchServerByData(this.lockEvtDataArr, this.gameObject.gameObjectId)
                            this._canInterOpen = false;
                            GhostTraceHelper.interTrace(3, 0, this.gameObject.gameObjectId);
                            setTimeout(() => {
                                if (this.doorState == EDoorType.Lock) return;
                                this.openCloseDoor(showEffect);
                                this._canInterOpen = true;
                            }, this.delayTime * 1000)
                        } else {
                            GhostTraceHelper.interTrace(3, 0, this.gameObject.gameObjectId, false);
                            let itemCfg = GameConfig.Item.getElement(this.unlockItemId);
                            if (itemCfg) {
                                Tips.show(CommonUtils.formatString(LanUtil.getText("Door_Tips2"), itemCfg.name));
                            }
                            ObjInterDefine.dispatchServerByData(this.lockFailEvtDataArr, this.gameObject.gameObjectId)
                        }
                    } else if (this.doorState == EDoorType.UnLock) {
                        GhostTraceHelper.interTrace(3, 0, this.gameObject.gameObjectId);
                        showEffect = !this._doorOpen;
                        this.openCloseDoor(showEffect);
                    } else {
                        GhostTraceHelper.interTrace(3, 0, this.gameObject.gameObjectId, false);
                        Tips.show(LanUtil.getText("Door_Tips1"));
                    }
                }
            })
            this.addLocalListen(InterEvtNameDef.doorInter, (interObj: string) => {
                if (!this.gameObject["BuildingUUID"]) {
                    return;
                }
                if (this.gameObject.gameObjectId == interObj) {
                    Event.dispatchToServer(InterEvtNameDef.doorInter, this.gameObject["BuildingUUID"]);
                }
            })
            this.addServerListen(InterEvtNameDef.doorInter, (buildUUid: string, isOpen: boolean) => {
                ModuleService.getModule(BlackBoardModuleC).setInterStats(buildUUid, isOpen ? 1 : 0);
                if (this.gameObject["BuildingUUID"] != buildUUid) {
                    return;
                }
                this.openCloseDoor(isOpen);
                this._uuid = buildUUid;
            })
            if (this.gameObject["BuildingUUID"] && ModuleService.getModule(BlackBoardModuleC).getInterStat(this.gameObject["BuildingUUID"])) {
                this.openCloseDoor(true);
            }
        }
        else {
            this.addClientListen(InterEvtNameDef.doorInter, (player: Player, buildUUid: string) => {
                if (this.gameObject["BuildingUUID"] != buildUUid) {
                    return;
                }
                this._doorOpen = !this._doorOpen;
                this._uuid = buildUUid;
                ModuleService.getModule(BlackBoardModuleS).setInterStats(buildUUid, this._doorOpen ? 1 : 0);
                Event.dispatchToAllClient(InterEvtNameDef.doorInter, buildUUid, this._doorOpen)
                console.log("当前门的开关状态为" + this._doorOpen)
                if (this._doorOpen) {
                    this.gameObject.setCollision(CollisionStatus.Off, true);
                }
                else {
                    this.gameObject.setCollision(CollisionStatus.On, true);
                }
            })
        }
    }

    public setCueSave() {
        if (this.isUseCue) {
            return;
        }
        this.save2Archive(2);
        this.isUseCue = true;
    }

    onLoadData(data: ArchiveData): void {
        this.isUseCue = false;
        let isUnlock = this.getSaveStatId(data);
        if (!isUnlock) {
            return;
        }
        if (isUnlock == 1) {
            this.doorState = EDoorType.UnLock;
            if (this.isOpen2CloseCollision) {
                this.gameObject.setCollision(CollisionStatus.QueryOnly, true);
            }
            ObjInterDefine.dispatchClientDirect(this.lockEvtDataArr);
            ObjInterDefine.dispatchClientDirect(this.evtDataArr);
        }
        if (isUnlock == 2) {
            this.isUseCue = true;
        }
    }

    /**开关门 */
    private openCloseDoor(open: boolean) {
        if (this._doorOpen == open) {
            return;
        }
        this._doorOpen = open;
        if (open) {
            if (this.isOpen2CloseCollision) {
                this.gameObject.setCollision(CollisionStatus.QueryOnly, true);
            }
            ObjInterDefine.dispatchServerByData(this.evtDataArr, this.gameObject.gameObjectId);
        }
        else {
            ObjInterDefine.dispatchServerByData(this.closeEvtDataArr, this.gameObject.gameObjectId);
            this.gameObject.setCollision(CollisionStatus.On, true);
        }
    }

    /**获取门的状态 */
    public getDoorState() {
        return this.doorState;
    }

    /**获取门的开关状态 */
    public getDoorOpen() {
        return this._doorOpen;
    }

    onGoEnter(go: GameObject) {
        if (!GameConfig.Global.isGhostCloseDoor.number) {
            return;
        }
        if (!(go instanceof Character)) {
            return;
        }
        if (this.doorType != 1) {
            return;
        }
        if (go.tag == "GhostHang" && !this.getDoorOpen()) {
            this.openCloseDoor(true);
        }
    }

    onGoLeave(go: GameObject) {
        if (!GameConfig.Global.isGhostCloseDoor.number) {
            return;
        }
        if (!(go instanceof Character)) {
            return;
        }
        if (this.doorType != 1) {
            return;
        }
        if (go.tag == "GhostHang" && this.getDoorOpen()) {
            this.openCloseDoor(false);
        }
    }

    resetData() {
        this.doorState = this.doorType;
        this._canInterOpen = true;
        this._doorOpen = false;
        if (!this.gameObject[DifficultItemKey]) {
            this.gameObject.setCollision(CollisionStatus.On, true);
        }
    }


    protected onDestroy(): void {
        if (this._uuid != "") {
            if (SystemUtil.isServer()) {
                ModuleService.getModule(BlackBoardModuleS).delInter(this._uuid);
            }
            else {
                ModuleService.getModule(BlackBoardModuleC).delInter(this._uuid);
            }
        }
        super.onDestroy();
    }
}