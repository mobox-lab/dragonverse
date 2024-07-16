import Gtk, { GtkTypes } from "gtoolkit";
import OperationGuider from "../../depend/guide/OperationGuider";
import { OperationTypes } from "../../controller/key-operation-manager/KeyOperationManager";
import { TaskOptionalTypes } from "../../depend/guide/base/OperationGuideTaskGroup";
import { GuideModuleC } from "./GuideModule";
import { StatisticModuleC } from "../statistic/StatisticModule";
import CutsceneOperationGuideTask from "../../depend/guide/cutscene/CutsceneOperationGuideTask";
import GlobalTips from "../../depend/global-tips/GlobalTips";
import i18n from "../../language/i18n";
import Tf = GtkTypes.Tf;
import { addGMCommand } from "mw-god-mod";

addGMCommand(
    "Dont Use Guide | Guide",
    "string",
    () => {
        manager.useGuide(false);
        manager.finishCurrent();
    },
    undefined,
    undefined,
    "Guide"
);

addGMCommand(
    "Use Guide | Guide",
    "string",
    () => {
        manager.useGuide(true);
        manager.finishCurrent();
    },
    undefined,
    undefined,
    "Guide"
);

addGMCommand(
    "Step All | Guide",
    "string",
    () => {
        Gtk.enumVals(GuideStep).forEach((step) => {
            Gtk.enumVals(GuideStep).forEach((step) => {
                manager["_taskDoneMap"].set(step, true);
                manager.onComplete.invoke(step);
            });
        });
        manager.finishCurrent();
    },
    undefined,
    undefined,
    "Guide"
);

addGMCommand(
    "Reset All | Guide",
    "string",
    () => {
        Gtk.enumVals(GuideStep).forEach((step) => {
            manager["_taskDoneMap"].set(step, false);
        });
    },
    undefined,
    undefined,
    "Guide"
);

addGMCommand(
    "Operation Teach | Guide",
    "string",
    () => {
        manager.resetComplete(GuideStep.GOperationTeach);
        manager.requestNext(GuideStep.GOperationTeach);
    },
    undefined,
    undefined,
    "Guide"
);

//#region Config 策划配置项

//#region Controller Config
/**
 * 引导线组件 预制体 Guid.
 * @type {string}
 */
const GUIDELINE_COMPONENT_PREFAB_GUID = "1CD734AF477D0D32F630329B981F3D28";

/**
 * 引导线组件 预制体 长度.
 * @type {string}
 */
const GUIDELINE_COMPONENT_PREFAB_LENGTH = 166;

/**
 * 引导线预制体生成间隔.
 * @type {number}
 */
const GUIDELINE_PREFAB_INTERVAL = 300;

/**
 * 最小引导线预制体生成间隔.
 * @type {number}
 */
const MIN_GUIDELINE_PREFAB_INTERVAL = 160;

/**
 * 默认超时时间.
 * @type {number}
 */
const DEFAULT_TIMEOUT = Gtk.timeConvert(5, Tf.M, Tf.Ms);

/**
 * 根组测试间隔.
 * @type {number}
 */
const ROOT_GROUP_TEST_INTERVAL = 3e3;

/**
 * 存活检查间隔.
 * @type {number}
 */
const ALIVE_CHECK_INTERVAL = 6e3;
//#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

/**
 * 操作引导生效次数.
 */
const G_OPERATION_TEACH_VALID_COUNT = 3;

/**
 * 操作引导提示间隔.
 */
const G_OPERATION_TEACH_INTERVAL = 5e3;

/**
 * 操作引导提示.
 */
const OperationTeachTips = [
    i18n.lanKeys.Guide0001,
    i18n.lanKeys.Guide0002,
    i18n.lanKeys.Guide0003,
    i18n.lanKeys.Guide0004,
    i18n.lanKeys.Guide0005,
];

//#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

export enum GuideStep {
    Null,
    GOperationTeach,
    COperationTips,
}

const manager = OperationGuider.getInstance();

const loadGuide = () => {
    if (SystemUtil.isClient()) {
        let talkedDone = false;
        let operationGuided: boolean = false;

        manager
            .sGl(GUIDELINE_COMPONENT_PREFAB_GUID)
            .sGlLen(GUIDELINE_COMPONENT_PREFAB_LENGTH)
            .sTstItv(ROOT_GROUP_TEST_INTERVAL)
            .sGlItv(GUIDELINE_PREFAB_INTERVAL)
            .sMinGlItv(MIN_GUIDELINE_PREFAB_INTERVAL)
            .sDfSeTout(DEFAULT_TIMEOUT);

        //#region 操作引导

        manager
            .aTG(GuideStep.GOperationTeach, TaskOptionalTypes.Sequence, () => {
                let gm = mwext.ModuleService.getModule(GuideModuleC);
                let sm = mwext.ModuleService.getModule(StatisticModuleC);
                return (
                    !operationGuided &&
                    gm &&
                    sm &&
                    gm.isReady &&
                    sm.isReady &&
                    sm.getPlayerData().playerEnteredCounterS <= G_OPERATION_TEACH_VALID_COUNT
                );
            })
            .iTG(
                GuideStep.GOperationTeach,
                new CutsceneOperationGuideTask(GuideStep.COperationTips, () => talkedDone === true)
                    .sA((counter) => {
                        GlobalTips.getInstance().showGlobalTips(i18n.lan(OperationTeachTips[counter - 1]));
                        if (counter >= OperationTeachTips.length) talkedDone = true;
                    }, G_OPERATION_TEACH_INTERVAL)
                    .sFd((completed) => (operationGuided = true))
            );
        //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
    }
};

export default loadGuide;
