import MainCurtainPanel_Generate from "../../ui-generate/main/MainCurtainPanel_generate";
import Waterween from "../../depend/waterween/Waterween";
import GameServiceConfig from "../../const/GameServiceConfig";
import { FlowTweenTask } from "../../depend/waterween/tweenTask/FlowTweenTask";
import Easing, { CubicBezierBase } from "../../depend/easing/Easing";
import Log4Ts from "../../depend/log4ts/Log4Ts";
import { Expression } from "../../util/GToolkit";

export default class MainCurtainPanel extends MainCurtainPanel_Generate {
//#region Constant
    public static readonly MAIN_SHOW_CURTAIN_EVENT_NAME = "__MAIN_SHOW_CURTAIN__";
    public static readonly MAIN_HIDE_CURTAIN_EVENT_NAME = "__MAIN_HIDE_CURTAIN__";
    public static readonly MAIN_SHOW_CURTAIN_FINISH_EVENT_NAME = "__MAIN_SHOW_CURTAIN_FINISH__";
    public static readonly MAIN_HIDE_CURTAIN_FINISH_EVENT_NAME = "__MAIN_HIDE_CURTAIN_FINISH__";
//#endregion

//#region Member
    private _curtainTask: FlowTweenTask<number>;
//#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

//#region MetaWorld UI Event

    protected onAwake(): void {
        super.onAwake();
        this.canUpdate = true;

//#region Member init
        this._curtainTask = Waterween
            .flow(
                () => this.cnvCurtain.renderOpacity,
                (val) => {
                    Log4Ts.log(MainCurtainPanel, `shown opa update val: ${val}`);
                    this.cnvCurtain.renderOpacity = val;
                },
                GameServiceConfig.MAIN_PANEL_CURTAIN_SHOWN_DURATION,
                Easing.linear,
                undefined,
                true,
                false,
            );

//#endregion ------------------------------------------------------------------------------------------

//#region Widget bind
        Event.addLocalListener(MainCurtainPanel.MAIN_SHOW_CURTAIN_EVENT_NAME, (cb: Expression<void>) => this.showCurtain(true, cb));
        Event.addLocalListener(MainCurtainPanel.MAIN_HIDE_CURTAIN_EVENT_NAME, (cb: Expression<void>) => this.showCurtain(false, cb));
//#endregion ------------------------------------------------------------------------------------------

//#region Event subscribe
//#endregion ------------------------------------------------------------------------------------------
    }

    protected onUpdate() {
    }

    protected onShow() {
    }

    protected onHide() {
    }

//#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

//#region Init
//#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

//#region UI Behavior
    public showCurtain(enable: boolean = true, callback?: Expression<void>) {
        if (enable) {
            this._curtainTask
                .to(1, GameServiceConfig.MAIN_PANEL_CURTAIN_SHOWN_DURATION)
                .onDone
                .once(() => {
                    Event.dispatchToLocal(MainCurtainPanel.MAIN_SHOW_CURTAIN_FINISH_EVENT_NAME);
                    callback?.();
                });
        } else {
            this._curtainTask
                .to(0, GameServiceConfig.MAIN_PANEL_CURTAIN_HIDDEN_DURATION)
                .onDone
                .once(() => {
                    Event.dispatchToLocal(MainCurtainPanel.MAIN_HIDE_CURTAIN_FINISH_EVENT_NAME);
                    callback?.();
                });
        }
    }

//#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
}