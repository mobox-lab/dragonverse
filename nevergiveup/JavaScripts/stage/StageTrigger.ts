/**
 * @Author       : xiaohao.li
 * @Date         : 2023-12-07 15:37:27
 * @LastEditors  : xiaohao.li
 * @LastEditTime : 2024-01-09 14:32:21
 * @FilePath     : \nevergiveup\JavaScripts\stage\StageTrigger.ts
 * @Description  : 修改描述
 */

import { GameManager } from "../GameManager";
import { EnergyModuleS } from "../Modules/Energy/EnergyModule";
import { TweenCommon } from "../TweenCommon";
import CommonTipsManagerUI from "../UI/Tips/CommonTipsManagerUI";
import Utils from "../Utils";
import { GameConfig } from "../config/GameConfig";
import GameServiceConfig from "../const/GameServiceConfig";
import { GlobalEventName } from "../const/enum";
import Log4Ts from "mw-log4ts";
import { StageUtil } from "./Stage";
import { UIStageSelect } from "./ui/UIStageSelect";

export namespace StageTriggerInst {
    export let posMap: { [stageId: number]: Vector } = {};
}

@Component
export default class StageTrigger extends Script {
    @mw.Property({ replicated: true, onChanged: "onTriggeredPlayerChanged", hideInEditor: true })
    public triggeredPlayers: string = "";
    @mw.Property({ displayName: "世界UI", capture: true })
    public worldUIGUID: string = "";
    @mw.Property({ displayName: "关卡GroupID" })
    public stageGroupId: number = 10001;
    @mw.Property({ displayName: "世界索引" })
    public stageWorldIndex: number = 0;

    @mw.Property({ replicated: true, onChanged: "onWaitTimeChanged", hideInEditor: true })
    public waitTime: number = 20;
    public worldUI: UIWidget;
    private mapNameUI: TextBlock;
    private playerCountUI: TextBlock;
    private waitProgress: ProgressBar;
    private waitTimerUI: TextBlock;
    private _triggered = false;
    @mw.Property({ replicated: true, onChanged: "onDifficultyChanged", hideInEditor: true })
    public difficulty = 0;
    @mw.Property({ replicated: true, onChanged: "onOwnerChanged", hideInEditor: true })
    public owner = 0;
    countDown: number = 30;
    public stageCfgId: number = 1;

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        if (SystemUtil.isServer()) {
            this.useUpdate = true;
            let trigger = this.gameObject as Trigger;
            trigger.onEnter.add((gameObject: GameObject) => {
                if (gameObject instanceof mw.Character) {
                    if (gameObject.player) {
                        this.addPlayerId(gameObject.player.playerId);
                    }
                }
            });

            trigger.onLeave.add((gameObject: GameObject) => {
                if (gameObject instanceof mw.Character) {
                    if (gameObject.player) {
                        this.removePlayerId(gameObject.player.playerId);
                    }
                }
            });

            Player.onPlayerLeave.add((player: Player) => {
                this.removePlayerId(player.playerId);
            });
        } else {
            mw.Event.addServerListener("TD_STAGE_SELECT_CLOSE_UI", this.closeUI);
            this.stageCfgId = StageUtil.getIdFromGroupIndexAndDifficulty(
                this.stageWorldIndex,
                this.stageGroupId,
                this.difficulty
            );
            const stageCfg = GameConfig.Stage.getElement(this.stageCfgId);
            StageTriggerInst.posMap[this.stageCfgId] = this.gameObject.worldTransform.position.clone();
            GameObject.asyncFindGameObjectById(this.worldUIGUID).then((widget: UIWidget) => {
                this.worldUI = widget;
                this.worldUI.drawSize = new Vector2(800, 174);
                let ui = this.worldUI.getTargetUIWidget();
                if (ui) {
                    this.mapNameUI = ui.findChildByPath("RootCanvas/mMapName") as TextBlock;
                    this.playerCountUI = ui.findChildByPath("RootCanvas/Canvas/mPlayerCount") as TextBlock;
                    this.waitProgress = ui.findChildByPath("RootCanvas/Canvas/mWaitProgress") as ProgressBar;
                    this.waitTimerUI = ui.findChildByPath("RootCanvas/Canvas/mTranportText") as TextBlock;
                    this.mapNameUI.text = stageCfg?.stageName ?? "";
                }
                this.onWaitTimeChanged();
                this.onTriggeredPlayerChanged();
                this.onOwnerChanged();
            });
            let trigger = this.gameObject as Trigger;
            trigger.onEnter.add((gameObject: GameObject) => {
                if (gameObject instanceof mw.Character) {
                    if (Utils.isLocalPlayer(gameObject?.player?.playerId)) {
                        this.onTrigger();
                    }
                }
            });
            // When player leaves the trigger, hide the stage select UI.
            trigger.onLeave.add((gameObject: GameObject) => {
                if (gameObject instanceof mw.Character) {
                    if (Utils.isLocalPlayer(gameObject?.player?.playerId)) {
                        this._triggered = false;
                        TweenCommon.popUpHide(UIService.getUI(UIStageSelect).rootCanvas, () => {
                            UIService.hide(UIStageSelect);
                        });
                    }
                }
            });
        }
    }

    public closeUI = () => {
        this._triggered = false;
        TweenCommon.popUpHide(UIService.getUI(UIStageSelect).rootCanvas, () => {
            UIService.hide(UIStageSelect);
        });
    };

    onTrigger() {
        this._triggered = true;
        let ui = UIService.getUI(UIStageSelect);
        ui.setData(this.stageWorldIndex, this.difficulty, this.stageGroupId);
        this.onDifficultyChanged();
        this.onOwnerChanged();
        const stageC = GameManager.getStageClient();
        if (stageC) {
            // game is already exist
        } else {
            UIService.show(UIStageSelect, this);
        }
    }

    parsePlayerIds() {
        if (!this.triggeredPlayers) return [];
        let arr = this.triggeredPlayers.split("|").filter((id) => id != "");
        return arr.map((id) => +id);
    }

    addPlayerId(id: number) {
        let ids = this.parsePlayerIds();
        if (ids.indexOf(id) == -1) {
            ids.push(id);
            this.triggeredPlayers = ids.join("|");
            this.changeOwner();
        }
    }

    removePlayerId(id: number) {
        let ids = this.parsePlayerIds();
        let index = ids.indexOf(id);
        if (index != -1) {
            ids.splice(index, 1);
            this.triggeredPlayers = ids.join("|");
            this.changeOwner();
        }
    }

    @mw.RemoteFunction(mw.Server)
    changeOwnerByClick(owner: number) {
        this.owner = owner;
    }

    changeOwner() {
        let ids = this.parsePlayerIds();
        if (ids.length == 1 && this.owner != ids[0]) {
            this.owner = ids[0];
            console.log(this.owner, "owner");
            this.waitTime = this.countDown;
            this.difficulty = 0;
        } else if (ids.length == 0) {
            this.owner = 0;
            this.waitTime = this.countDown;
            this.difficulty = 0;
        }
    }

    onTriggeredPlayerChanged() {
        if (this.playerCountUI) {
            let count = this.parsePlayerIds().length;
            if (count > 4) count = 4;
            this.playerCountUI.text = count + "/" + 4;
        }

        if (this._triggered) {
            let ids = this.parsePlayerIds();
            let ui = UIService.getUI(UIStageSelect);
            ui.updatePlayerQueue(ids);
        }
        console.log("onTriggeredPlayerChanged", this.parsePlayerIds());
    }

    onWaitTimeChanged() {
        if (this.waitProgress) {
            this.waitProgress.percent = 1 - this.waitTime / this.countDown;
        }
        if (this.waitTimerUI) {
            this.waitTimerUI.text = Math.ceil(this.waitTime) + GameConfig.Language.getElement("Text_SecondStart").Value;
        }

        if (this._triggered) {
            let ui = UIService.getUI(UIStageSelect);
            ui.updateCountDown(Math.ceil(this.waitTime));
        }
    }

    /**
     * 周期函数 每帧执行
     * 此函数执行需要将this.useUpdate赋值为true
     * @param dt 当前帧与上一帧的延迟 / 秒
     */
    protected onUpdate(dt: number): void {
        // if (SystemUtil.isServer()) {
        //     let ids = this.parsePlayerIds();
        //     if (ids.length > 0) {
        //         this.waitTime -= dt;
        //         if (this.waitTime <= 0) {
        //             this.waitTime = this.countDown;
        //             this.startGame(this.owner);
        //         }
        //     }
        //     else {
        //         this.waitTime = this.countDown;
        //     }
        // }
    }

    @mw.RemoteFunction(mw.Server)
    clickLeaveBtn(playerID: number) {
        this.removePlayerId(playerID);
        const player = Player.getPlayer(playerID);
        mw.Event.dispatchToClient(player, "TD_STAGE_SELECT_CLOSE_UI");
    }

    @mw.RemoteFunction(mw.Server)
    startGame(playerID: number) {
        if (playerID == this.owner) {
            // let ids = this.parsePlayerIds().splice(0, 4);
            const stageInfo = StageUtil.getCfgFromGroupIndexAndDifficulty(
                this.stageWorldIndex,
                this.stageGroupId,
                this.difficulty
            );
            this.stageCfgId = stageInfo?.id;
            const ids = [this.owner];
            const stages = GameManager.getStages();
            const allGroupIndex = stages.map((stage) => stage.stageCfg.groupIndex);
            const isAlreadyUsed = allGroupIndex.includes(stageInfo.groupIndex);
            const groupIndex = stageInfo.groupIndex;

            if (isAlreadyUsed && groupIndex !== 10056 && groupIndex !== 10057) {
                const player = Player.getPlayer(playerID);
                mw.Event.dispatchToClient(
                    player,
                    GlobalEventName.ServerTipsEventName,
                    GameConfig.Language.getElement("Text_stageAlreadyUsed").Value
                );
                return false;
            } else {
                Log4Ts.log(StageTrigger, `startGame playerID:${playerID}`);
                if (Utils.isInfiniteMode(groupIndex)) {
                    // 无尽模式直接开始
                    GameManager.startGame(ids, this.stageCfgId);
                    return true;
                } else {
                    if (
                        !ModuleService.getModule(EnergyModuleS).isAfford(
                            playerID,
                            GameServiceConfig.STAMINA_COST_START_GAME
                        )
                    ) {
                        Log4Ts.log(StageTrigger, `Stamina is not enough. playerID:${playerID}`);
                        mw.Event.dispatchToClient(
                            Player.getPlayer(playerID),
                            GlobalEventName.ServerTipsEventName,
                            GameConfig.Language.getElement("Text_insufficientStamina").Value
                        );
                        return false;
                    }
                    ModuleService.getModule(EnergyModuleS).consume(playerID, GameServiceConfig.STAMINA_COST_START_GAME);
                    GameManager.startGame(ids, this.stageCfgId);
                    return true;
                }
            }
        }
    }

    /** 脚本被销毁时最后一帧执行完调用此函数 */
    protected onDestroy(): void {}

    @mw.RemoteFunction(mw.Server)
    setDifficulty(playerId: number, value: number) {
        if (playerId == this.owner) {
            this.difficulty = value;
            this.stageCfgId = StageUtil.getIdFromGroupIndexAndDifficulty(
                this.stageWorldIndex,
                this.stageGroupId,
                this.difficulty
            );
        }
    }

    onDifficultyChanged() {
        if (this._triggered) {
            this.stageCfgId = StageUtil.getIdFromGroupIndexAndDifficulty(
                this.stageWorldIndex,
                this.stageGroupId,
                this.difficulty
            );
            let ui = UIService.getUI(UIStageSelect);
            ui.setSelectDifficulty(this.difficulty);
            ui.setData(this.stageWorldIndex, this.difficulty, this.stageGroupId);
        }
        if (this.mapNameUI?.text) {
            this.mapNameUI.text = StageUtil.getStageCfgById(this.stageCfgId)?.stageName;
        }
    }

    onOwnerChanged() {
        if (this._triggered) {
            let ui = UIService.getUI(UIStageSelect);
            ui.setOwner(this.owner);
            ui.setData(this.stageWorldIndex, this.difficulty, this.stageGroupId);
        }
        if (this.mapNameUI) {
            this.mapNameUI.text = StageUtil.getStageCfgById(this.stageCfgId)?.stageName;
        }
    }
}
