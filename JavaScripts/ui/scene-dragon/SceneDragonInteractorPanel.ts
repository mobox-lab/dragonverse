import ModuleService = mwext.ModuleService;
import GameServiceConfig from "../../const/GameServiceConfig";
import Easing from "../../depend/easing/Easing";
import Log4Ts from "../../depend/log4ts/Log4Ts";
import Regulator from "../../depend/regulator/Regulator";
import SceneDragonBehavior from "../../module/scene-dragon/SceneDragonBehavior";
import { SceneDragonModuleC } from "../../module/scene-dragon/SceneDragonModule";
import SceneDragonPanel_Generate from "../../ui-generate/scene-dragon/SceneDragonPanel_generate";
import MwBehaviorDelegate from "../../util/MwBehaviorDelegate";
import Character = mw.Character;

/**
 * 玩家锁定 场景龙.
 */
export interface DragonSyncKeyEventArgs {
    syncKey: string;
}

export class SceneDragonInteractorPanel extends SceneDragonPanel_Generate {
    //#region Member
    private _eventListeners: EventListener[] = [];

    public syncKey: string;

    public behavior: SceneDragonBehavior;

    private _obj: GameObject;

    private _module: SceneDragonModuleC;

    private _activityBehavior: MwBehaviorDelegate;

    private _activityCheckRegulator: Regulator;

    private _character: Character;
    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

    //#region MetaWorld UI Event

    protected onAwake(): void {
        super.onAwake();
        this.canUpdate = true;

        //#region Member init
        this._module = ModuleService.getModule(SceneDragonModuleC);
        this._character = Player.localPlayer.character;
        this._activityCheckRegulator = new Regulator(GameServiceConfig.SCENE_DRAGON_UI_DORMANT_DETECT_INTERVAL);
        Script.spawnScript(MwBehaviorDelegate)
            .then(value => {
                this._activityBehavior = value;
                this._activityBehavior.delegate.add(this.activityDistanceDetect);
                this._activityBehavior.delegate.add(this.renderPosition);
            });
        this.uiObject.visibility = mw.SlateVisibility.Collapsed;
        //#endregion ------------------------------------------------------------------------------------------

        //#region Widget bind
        //#endregion ------------------------------------------------------------------------------------------

        //#region Event subscribe
        //#endregion ------------------------------------------------------------------------------------------
    }

    protected onUpdate() {
        if (this._activityCheckRegulator.ready()) {
            this.dormantDistanceDetect();
        }
    }

    protected onShow() {
    }

    protected onHide() {
        Log4Ts.log(SceneDragonInteractorPanel, `hided`);
    }

    protected onDestroy() {
        Log4Ts.log(SceneDragonInteractorPanel, `destroyed`);
        //#region Event Unsubscribe
        this._eventListeners.forEach(value => value.disconnect());
        //#endregion ------------------------------------------------------------------------------------------
        this._activityBehavior.destroy();
    }

    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

    //#region Init
    public init(syncKey: string) {
        this.syncKey = syncKey;
        this.behavior = this._module.syncItemMap.get(this.syncKey).behavior;
        this._obj = this._module.syncItemMap.get(this.syncKey).object;
        this.btnCatch.onClicked.add(this.lockOnMe);
        this.renderPosition();

    }

    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

    //#region UI Behavior
    private renderPosition = () => {
        const v = new Vector2();
        ScreenUtil.projectWorldPositionToWidgetPosition(
            Player.localPlayer,
            this._obj.worldTransform.position,
            v,
            true);

        if (v.x <= 0 && v.y <= 0) {
            this.uiObject.visibility = mw.SlateVisibility.Collapsed;
        } else {
            this.uiObject.visibility = mw.SlateVisibility.Visible;

        }
        v.x -= this.uiObject.size.x / 2;
        v.y -= this.uiObject.size.y / 2;

        this.uiObject.position = v;
    };

    private activityDistanceDetect = () => {
        const currentDistanceSqr = this.currentDistanceSqr;

        let t: number = currentDistanceSqr < GameServiceConfig.SQR_SCENE_DRAGON_CATCHABLE_DISTANCE ?
            1 :
            1 -
            (currentDistanceSqr - GameServiceConfig.SQR_SCENE_DRAGON_CATCHABLE_DISTANCE) /
            (GameServiceConfig.SQR_SCENE_DRAGON_UI_TRANSITION_START_DISTANCE - GameServiceConfig.SQR_SCENE_DRAGON_CATCHABLE_DISTANCE);

        this.setTransition(t);

        if (currentDistanceSqr > GameServiceConfig.SQR_SCENE_DRAGON_UI_ACTIVITY_DISTANCE) {
            this._activityBehavior.pause();
            this.setTransition(0);
        }
    };

    private dormantDistanceDetect = () => {
        if (this._activityBehavior.running) {
            return;
        }
        if (this.currentDistanceSqr <= GameServiceConfig.SQR_SCENE_DRAGON_UI_ACTIVITY_DISTANCE) {
            this.uiObject.visibility = mw.SlateVisibility.Visible;
            this._activityBehavior.run();
        } else {
            this.uiObject.visibility = mw.SlateVisibility.Collapsed;

        }
    };

    /**
     * 根据 t 值设定过渡效果
     * @param t will be clamped in [0,1]
     */
    public setTransition(t: number) {
        t = Easing.clamp01(t);
        this.rootCanvas.renderOpacity = t;
        this.btnCatch.renderOpacity = t >= 1 ? 1 : 0;
    }

    private get currentDistanceSqr() {
        return Vector.squaredDistance(this.behavior.gameObject.worldTransform.position, this._character.worldTransform.position);
    }

    private lockOnMe = () => {
        this._module.lock(this.syncKey);
    };

    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

    //#region Event Callback
    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
}