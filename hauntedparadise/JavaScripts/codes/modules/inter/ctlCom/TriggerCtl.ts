import { CommonUtils } from "../../../utils/CommonUtils";
import LevelBase from "../../Level/LevelBase";
import { BoardHelper, BoardKeys } from "../../blackboard/BoardDefine";
import { InterEvtData, ObjInterDefine } from "../ObjInterDefine";
import { AutoMover, TriAutoMoveData } from "./AutoMover";
import { WindPusher } from "./WindPusher";

@Component
export default class TriggerCtl extends LevelBase {
    @mw.Property({ group: "自动移动组件", displayName: "是否启用" })
    public isMoveEnable: boolean = false;

    @mw.Property({ group: "自动移动组件", displayName: "移动速度" })
    public moveSpd: number = 500;

    @mw.Property({ group: "自动移动组件", displayName: "移动路径配置" })
    public movePathes: TriAutoMoveData[] = [new TriAutoMoveData()];

    @mw.Property({ group: "事件设置", displayName: "触发事件" })
    public evtDataArr: InterEvtData[] = [new InterEvtData()];

    @mw.Property({ replicated: true, hideInEditor: true, onChanged: "onEnableChanged" })
    public enable: boolean = true;

    @mw.Property({ displayName: "触发间隔(s)" })
    public intervalTime: number = 2;

    @mw.Property({ displayName: "触发时长(s)", tooltip: "如果需要永久，则配为-1" })
    public keepTime: number = 2;

    @mw.Property({ displayName: "关闭后等待的时间(s)" })
    public idleTime: number = 4;

    @mw.Property({ group: "风力设置", displayName: "风力大小", tooltip: "会自动乘上玩家的移动速度" })
    public windForce: Vector = Vector.zero;

    @mw.Property({ group: "风力设置", displayName: "是否启用" })
    public windEnable: boolean = false;

    private _autoMover: AutoMover;

    private _windPusher: WindPusher;

    /** 当前状态的持续事件 */
    private _enableTimer = 0;

    /** 是否为玩家关闭的这个组件 */
    private _isDisableByPlayer: boolean = false;

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onLevelStart(): void {
        if (SystemUtil.isClient()) {
            this.evtDataArr.forEach(e => {
                e.params.push("true");
            })
            this._windPusher = new WindPusher();
            let trigger = this.gameObject.getChildByName("trigger") as Trigger;
            trigger.onEnter.add(this.cli_onEnter.bind(this));
            trigger.onLeave.add(this.cli_onLeave.bind(this));
            this.addLocalListen("TriggerCtl", (goid: string) => {
                if (goid != this.gameObject.gameObjectId) {
                    return;
                }
                this.ser_disable();
            })
        }
        else {
            this.useUpdate = true
            this._autoMover = new AutoMover(this.movePathes, this.gameObject, this.moveSpd);
        }
    }

    onLoadData(): void {
        let trigger = this.gameObject.getChildByName("trigger") as Trigger;
        let showGo = this.gameObject.getChildByName("showGo");
        if (!trigger || !showGo) {
            return;
        }
        if (!trigger.enabled) {
            showGo.setVisibility(PropertyStatus.Off);
            return;
        }
        showGo.setVisibility(this.enable ? PropertyStatus.On : PropertyStatus.Off);
        this.enable && this.enableGo(showGo);
    }

    protected onUpdate(dt: number): void {
        if (SystemUtil.isClient()) {
            return;
        }
        if (!this._isDisableByPlayer) {
            this.isMoveEnable && this._autoMover.onUpdate(dt);
        }
        if (this._enableTimer == -1) {
            this._isDisableByPlayer = false;
            return;
        }
        this._enableTimer -= dt;
        if (this._enableTimer >= 0) {
            return;
        }
        if (!this.enable && this._isDisableByPlayer) {
            let trigger = this.gameObject.getChildByName("trigger") as Trigger;
            let allPlayers = Player.getAllPlayers();
            for (let index = 0; index < allPlayers.length; index++) {
                const char = allPlayers[index].character;
                let res = trigger.checkInArea(char);
                if (!res) {
                    this._isDisableByPlayer = false;
                    break;
                }
            }
            if (this._isDisableByPlayer) {
                this._enableTimer = 3;
                return;
            }
        }

        this.enable = !this.enable;

        if (this.enable) {
            this._enableTimer = this.keepTime;
        }
        else {
            this._enableTimer = this.intervalTime;
        }
    }

    /**
     * 当触发器再次被启动
     */
    onEnableChanged() {
        if (!this.gameObject) { return; }
        let player = Player.localPlayer;
        if (!player || !player.character) {
            return;
        }
        let trigger = this.gameObject.getChildByName("trigger") as Trigger;
        let showGo = this.gameObject.getChildByName("showGo");
        if (!trigger.enabled) {
            showGo.setVisibility(PropertyStatus.Off);
            return;
        }

        showGo.setVisibility(this.enable ? PropertyStatus.On : PropertyStatus.Off);
        this.enable && this.enableGo(showGo);
        if (this.enable) {

            let isIn = trigger.checkInArea(player.character);
            if (isIn) {
                this.cli_onPlayerEntry();
            }
        }
        else {
            this.closeOtherComs();
        }
    }

    public enableGo(go: GameObject) {
        if (go instanceof Effect) {
            go.loop = true;
            go.loopCount = -1;
            go.play();
        }
        let childs = go.getChildren();
        childs.forEach(e => {
            this.enableGo(e);
        })
    }

    /**
     * 当被确认玩家在这个触发器内
     */
    cli_onPlayerEntry() {
        this.evtDataArr.forEach(e => {
            e.params[e.params.length - 1] = "true";
        });
        ObjInterDefine.dispatchClientByData(this.evtDataArr, this.gameObject.gameObjectId);
        if (this.windEnable) {
            let force = this.gameObject.worldTransform.rotation.rotateVector(this.windForce);
            this._windPusher.setForce(force, true);
        }
    }

    private closeOtherComs() {
        if (!this._windPusher) {
            return;
        }
        if (this.windEnable) {
            this._windPusher.setForce(this.windForce, false);
        }
    }

    /**
     * 当玩家进入了这个触发器
     * @param char 进入的玩家
     */
    cli_onEnter(char: Character) {
        if (!this.enable) {
            return;
        }
        if (!CommonUtils.isSelfChar(char)) {
            return;
        }
        this.cli_onPlayerEntry();
    }

    cli_onLeave(char: Character) {
        if (!this.enable) {
            return;
        }
        if (!CommonUtils.isSelfChar(char)) {
            return;
        }
        this.closeOtherComs();
    }

    /**
     * 一个玩家请求关闭这个组件
     */
    @RemoteFunction(Server)
    ser_disable() {
        this.enable = false;
        this._enableTimer = this.idleTime;
        this._isDisableByPlayer = true;
    }
}