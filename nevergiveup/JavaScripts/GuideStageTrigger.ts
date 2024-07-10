import { GuideActions } from "./Actions";
import { GuideManager } from "./Guide/GuideManager";
import { TweenCommon } from "./TweenCommon";
import { UIStageSelect } from "./stage/ui/UIStageSelect";

@Component
export default class GuideStageTrigger extends Script {
    _triggered: boolean = false;
    public owner = 0;
    public triggeredPlayers: string = "";
    public stageId: number = 0;
    public difficulty = 0;

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        if (SystemUtil.isClient()) {
            GuideActions.onGuideStageTriggered.add(() => {
                this.onTriggerGuide();
            });

            GuideActions.onGuideStageSelect.add(() => {
                this._triggered = false;
                TweenCommon.popUpHide(UIService.getUI(UIStageSelect).rootCanvas, () => {
                    UIService.hide(UIStageSelect);
                });
            });
        }
    }


    onTriggerGuide() {
        this._triggered = true;
        this.owner = Player.localPlayer.playerId;
        this.triggeredPlayers = "" + Player.localPlayer.playerId;
        let ui = UIService.getUI(UIStageSelect);
        ui.setData(this.stageId, this.difficulty);
        this.onDifficultyChanged();
        this.onOwnerChanged();
        this.onTriggeredPlayerChanged();
        ui.updateCountDown(30)
        UIService.show(UIStageSelect, this);
    }

    onDifficultyChanged() {
        if (this._triggered) {
            let ui = UIService.getUI(UIStageSelect);
            ui.setSelectDifficulty(this.difficulty);
            ui.setData(this.stageId, this.difficulty);
        }
    }

    onOwnerChanged() {
        if (this._triggered) {
            let ui = UIService.getUI(UIStageSelect);
            ui.setOwner(this.owner);
            ui.setData(this.stageId, this.difficulty);
        }
    }

    onTriggeredPlayerChanged() {
        if (this._triggered) {
            let ids = this.parsePlayerIds();
            let ui = UIService.getUI(UIStageSelect);
            ui.updatePlayerQueue(ids);
        }
    }

    parsePlayerIds() {
        if (!this.triggeredPlayers) return [];
        let arr = this.triggeredPlayers.split("|").filter(id => id != "");
        return arr.map(id => +id);
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

    }

    clickLeaveBtn(playerID: number) {
        
    }

    startGame(playerID: number) {

    }

    setDifficulty(playerId: number, value: number) {

    }
}