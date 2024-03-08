import { GameConfig } from "../../../../config/GameConfig";
import TeamJump_UI_Generate from "../../../../ui-generate/ShareUI/hall/TeamJump_UI_generate";
import GameStart from "../../../GameStart";
import { CommonUtils } from "../../../utils/CommonUtils";
import { LanUtil } from "../../../utils/LanUtil";
import { JumpListener } from "../JumpListener";

@Component
export default class RouteTeamEntry extends Script {

    @Property({ hideInEditor: true, replicated: true, onChanged: "onPlayerNumChanged" })
    public playerNums: number = 0;

    @Property({ hideInEditor: true, replicated: true, onChanged: "onResetTimeChanged" })
    public restTime: number = -1;

    @Property({ displayName: "游戏id", tooltip: "指的是GameTheam表格中的id" })
    public gameid: number = 1;

    private _enterPlayers: string[] = [];

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        if (SystemUtil.isClient()) {
            ModuleService.ready().then(() => {
                this.hideUI();
            })
            return;
        }
        Player.onPlayerLeave.add((player: Player) => {
            this.removePlayer(player.userId);
        })
        const trigger = this.gameObject.getChildByName("trigger") as Trigger;
        trigger.onEnter.add((char: Character) => {
            if (!char.player) {
                return;
            }
            this.addPlayer(char.player.userId);
        })
        trigger.onLeave.add((char: Character) => {
            if (!char.player) {
                return;
            }
            this.removePlayer(char.player.userId);
        })
    }

    protected onUpdate(dt: number): void {
        this.restTime -= dt;
        if (this.restTime <= 0) {
            const cfg = GameConfig.GameTheme.getElement(this.gameid);
            if (!cfg) {
                return;
            }
            let arr = [];
            if (this._enterPlayers.length > cfg.maxNum) {
                arr = this._enterPlayers.slice(0, cfg.maxNum)
                this._enterPlayers.splice(0, cfg.maxNum);
                this.restTime = 15;
            }
            else {
                arr = this._enterPlayers.slice(0);
                this._enterPlayers.length = 0;
                this.useUpdate = false;
            }
            this.playerNums = this._enterPlayers.length;
            JumpListener.instance.jumpGame(arr, GameStart.isGPark ? cfg["gameIdGPark"] : cfg.gameId);
        }
    }

    private addPlayer(userId: string) {
        const index = this._enterPlayers.indexOf(userId);
        if (index == -1) {
            this._enterPlayers.push(userId);
            this.playerNums = this._enterPlayers.length;
        }
        if (!this.useUpdate) {
            this.restTime = 15;
            this.useUpdate = true;
        }
    }

    private removePlayer(userId: string) {
        const index = this._enterPlayers.indexOf(userId);
        if (index != -1) {
            this._enterPlayers.splice(index, 1);
            this.playerNums = this._enterPlayers.length;
        }
        if (this.playerNums == 0) {
            this.useUpdate = false;
        }
    }

    public onPlayerNumChanged() {
        if (!this.gameObject) return;
        const uiwidget = this.gameObject.getChildByName("uiwidget") as UIWidget;
        const cfg = GameConfig.GameTheme.getElement(this.gameid);
        if (this.playerNums == 0) {
            this.hideUI();
            return;
        }
        uiwidget.setVisibility(PropertyStatus.On);
        const ui = this.getUI();
        ui.mtxt_num.text = CommonUtils.formatString(LanUtil.getText("RouteTeam_01"), this.playerNums, cfg.maxNum);
    }

    private hideUI() {
        const uiwidget = this.gameObject.getChildByName("uiwidget") as UIWidget;
        uiwidget.setVisibility(PropertyStatus.Off);
    }

    public onResetTimeChanged() {
        if (!this.gameObject) return;
        const ui = this.getUI();
        ui.mtxt_time.text = CommonUtils.formatString(LanUtil.getText("RouteTeam_02"), this.restTime.toFixed(0));
    }

    private getUI(): TeamJump_UI_Generate {
        const uiwidget = this.gameObject.getChildByName("uiwidget") as UIWidget;
        if (!uiwidget["bindUUI"]) {
            const ui = UIService.create(TeamJump_UI_Generate);
            ui.mtxt_num.text = "";
            ui.mtxt_time.text = "";
            uiwidget["bindUUI"] = ui;
            uiwidget.setTargetUIWidget(ui.uiWidgetBase);
        }
        return uiwidget["bindUUI"] as TeamJump_UI_Generate;
    }
}
