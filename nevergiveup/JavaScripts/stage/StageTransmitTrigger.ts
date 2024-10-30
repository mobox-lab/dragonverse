import Nolan from "../depend/nolan/Nolan";
import CutsceneUI from "../UI/CutsceneUI";
import { GlobalData } from "../const/GlobalData";
import GameServiceConfig from "../const/GameServiceConfig";
import JumpProgress_Generate from "../ui-generate/JumpProgress_generate";

const progressTag = "StageProgress";

@Component
export default class StageTransmitTrigger extends Script {
    
    @Property({ displayName: "sceneID", group: "属性"})
    public sceneID: number = 2;
    @Property({ displayName: "传送坐标", group: "属性" })
    public location: mw.Vector = new mw.Vector(1125, 697, 30);

    @Property({
        displayName: "是否刷新玩家物体旋转",
        tooltip: "true 时 将玩家物体旋转调整为 endRotation.",
        group: "Config-rotation",
    })
    public isRefreshObjectRotation: boolean = true;

    @Property({
        displayName: "是否刷新相机旋转",
        tooltip: "true 时 将玩家相机调整为 endRotation.",
        group: "Config-rotation",
    })
    public isRefreshCameraRotation: boolean = true;


    @Property({ displayName: "角色目标旋转", group: "Config-rotation" })
    public endRotation: Rotation = Rotation.zero;

    private _nolan: Nolan;
    private _progressBar: ProgressBar;
    private _cnvProgressBar: Canvas;

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        super.onStart();
        if (SystemUtil.isClient()) {
            this._nolan = Nolan.getInstance();
            const trigger = this.gameObject as Trigger;
            trigger.onEnter.add(this.onPlayerEnter.bind(this));
            trigger.onLeave.add(this.onPlayerLeave.bind(this));
        }
    }

    onPlayerEnter(other: GameObject) {
        if (other instanceof Character) {
            Player.asyncGetLocalPlayer().then((player) => {
                if (player.character === other) {
                    // 展示进度掉
                    const ui = UIService.show(JumpProgress_Generate);
                    this._progressBar = ui.progressBar;
                    this._cnvProgressBar = ui.cnvProgressBar;
                    this._progressBar.percent = 0;
                    this._cnvProgressBar.renderOpacity = 0;
                    this.playProgress();
                }
            });
        }
    }

    onPlayerLeave(other: GameObject) {
        if (other instanceof Character) {
            Player.asyncGetLocalPlayer().then((player) => {
                if (player.character === other) {
                    //关闭进度条
                    actions.tweens.stopAllByTag(progressTag);
                    UIService.hide(JumpProgress_Generate);
                }
            });
        }
    }

    /**
     * 播放 Progress 动画.
     */
    public playProgress() {
        const progressTask = actions.tween(this._progressBar).setTag(progressTag).to(GameServiceConfig.SUB_GAME_SCENE_JUMP_PROGRESS_DURATION, {percent: 1}).call(() => {
            this.onProgressDone();
        });

        actions.tween(this._cnvProgressBar).setTag(progressTag).to(100, {renderOpacity: 1}).call(() => {
            progressTask.start();
        }).start();
    }

    onProgressDone() {
        UIService.show(CutsceneUI, () => {
            const character = Player.localPlayer.character;
            character.worldTransform = new Transform(
                this.location,
                this.isRefreshObjectRotation ? this.endRotation : character.worldTransform.rotation,
                character.worldTransform.scale,
            );
            if (this.isRefreshCameraRotation) this._nolan.lookToward(this.endRotation.rotateVector(Vector.forward));

        });
        TimeUtil.delaySecond(GlobalData.Anim.stageCrossAnimSeconds).then(() => {
            UIService.getUI(CutsceneUI).hideCanvas();
        });
    }
}