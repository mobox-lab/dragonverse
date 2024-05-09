import { AddGMCommand } from "module_gm";
import { GtkTypes } from "../../util/GToolkit";
import OperationGuider from "../../depend/guide/OperationGuider";
import { OperationTypes } from "../../controller/key-operation-manager/KeyOperationManager";
import { TaskOptionalTypes } from "../../depend/guide/base/OperationGuideTaskGroup";
import { GuideModuleC } from "./GuideModule";
import { StatisticModuleC } from "../statistic/StatisticModule";
import CutsceneOperationGuideTask from "../../depend/guide/cutscene/CutsceneOperationGuideTask";
import GlobalTips from "../../depend/global-tips/GlobalTips";
import i18n from "../../language/i18n";

//#region Config 策划配置项
/**
 * 操作引导生效次数.
 */
const GOperationTeachValidCount = 3;

/**
 * 操作引导提示间隔.
 */
const GOperationTeachInterval = 5e3;

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

//#region TTD & GM

AddGMCommand("Dont Use Guide | Guide",
    () => {
        manager.useGuide(false);
        manager.finishCurrent();
    },
    undefined,
    "Guide",
);

AddGMCommand("Use Guide | Guide",
    () => {
        manager.useGuide(true);
        manager.finishCurrent();
    },
    undefined,
    "Guide",
);

//#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

const loadGuide = () => {
    if (SystemUtil.isClient()) {
        let talkedDone = false;
        let operationGuided: boolean = false;

//#region 操作引导

        manager
            .addTaskGroup(
                GuideStep.GOperationTeach,
                TaskOptionalTypes.Sequence,
                () => {
                    let gm = mwext.ModuleService.getModule(GuideModuleC);
                    let sm = mwext.ModuleService.getModule(StatisticModuleC);
                    return !operationGuided && gm && sm && gm.isReady && sm.isReady && sm.getPlayerEnteredCounter() <= GOperationTeachValidCount;
                })
            .insertTaskToGroup(
                GuideStep.GOperationTeach,
                new CutsceneOperationGuideTask(
                    GuideStep.COperationTips,
                    () => talkedDone === true)
                    .sA((counter) => {
                            GlobalTips.getInstance().showGlobalTips(i18n.lan(OperationTeachTips[counter - 1]));
                            if (counter >= OperationTeachTips.length) talkedDone = true;
                        },
                        GOperationTeachInterval)
                    .sFd((completed) => operationGuided = true),
            );
//#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
    }
};

export default loadGuide;