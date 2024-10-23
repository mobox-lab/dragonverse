import { CardActions, PlayerActions, StageActions, TowerActions } from "../../Actions";
import CommonTipsManagerUI from "../../UI/Tips/CommonTipsManagerUI";
import { GameConfig } from "../../config/GameConfig";
import { ITaskElement } from "../../config/Task";
import { EmTaskEvent } from "../../tool/Enum";
import CardModuleC from "../CardModule/CardModuleC";
import PlayerModuleData from "../PlayerModule/PlayerModuleData";
import { PlayerUtil } from "../PlayerModule/PlayerUtil";
import { EmTaskState, EmTaskType, EmTaskWay, TaskModuleC } from "./TaskModuleC";
import TalentModuleC from "../talent/TalentModuleC";
import { ElementEnum } from "../../enemy/EnemyBase";

/**
 * 任务的信息记录类
 */
export class Task {
    /**任务id */
    public taskID: number;
    /**当前完成次数 */
    public curSolveTime: number;
    /**总完成次数 */
    public totalSolveTime: number;
    /**任务状态 */
    private _taskState: EmTaskState;
    public get taskState(): EmTaskState {
        return this._taskState;
    }
    public set taskState(v: EmTaskState) {
        if (this._taskState == v) return;
        this._taskState = v;
        if (v == EmTaskState.Finish || v == EmTaskState.Reward) {
            this._taskModule.checkRedPoint();
        }
    }

    public get taskNameUI(): string {
        let name = StringUtil.format(this.cfg.taskName, this.cfg.id % 1000);

        switch (this.cfg.taskSolveType) {
            case EmTaskWay.UnlockTech:
                // name = "解锁科技";
                break;
            case EmTaskWay.UnlockTower:
                // name = "解锁塔";
                break;
            case EmTaskWay.PassLevel:
                // name = "通关关卡";
                break;
            case EmTaskWay.KillCount:
                // name = "KillCount";
                break;
            case EmTaskWay.PlayCount:
                // name = "PlayCount";
                break;
            case EmTaskWay.PerfectPassLevel:
                // name = "PerfectPassLevel";
                break;
            case EmTaskWay.PerfectPlayCount:
                // name = "PerfectPlayCount";
                break;
            case EmTaskWay.LightTowerCount:
                // name = "LightTowerCount";
                break;
            case EmTaskWay.DarkTowerCount:
                // name = "DarkTowerCount";
                break;
            case EmTaskWay.WaterTowerCount:
                // name = "WaterTowerCount";
                break;
            case EmTaskWay.FireTowerCount:
                // name = "FireTowerCount";
                break;
            case EmTaskWay.WoodTowerCount:
                // name = "WoodTowerCount";
                break;
            case EmTaskWay.EarthTowerCount:
                // name = "EarthTowerCount";
                break;
            case EmTaskWay.UserLevel:
                // name = "UserLevel";
                break;
            case EmTaskWay.InfinityWaveTimes:
                // name = "InfinityWaveTimes";
                break;
            case EmTaskWay.LevelThreeCount:
                // name = "LevelThreeCount";
                break;
            case EmTaskWay.KillHealCount:
                // name = "KillHealCount";
                break;
            case EmTaskWay.KillBerserkCount:
                // name = "KillBerserkCount";
                break;
            case EmTaskWay.KillFlyCount:
                // name = "KillFlyCount";
                break;
            case EmTaskWay.KillStealthCount:
                // name = "KillStealthCount";
                break;
            case EmTaskWay.InfinityGameTimes:
                // name = "InfinityGameTimes";
                break;
            case EmTaskWay.InfinityBossCount:
                // name = "InfinityBossCount";
                break;
            case EmTaskWay.TowerLevelUpCount:
                // name = "TowerLevelUpCount";
                break;
            case EmTaskWay.UnlockTowerDaily:
                // name = "UnlockTowerDaily";
                break;
            case EmTaskWay.TalentCount:
                // name = "TalentCount";
                break;
            case EmTaskWay.LevelUp:
                // name = "TalentCount";
                break;
            case EmTaskWay.TalentUlti01:
                // name = "TalentUlti01";
                break;
            case EmTaskWay.TalentUlti02:
                // name = "TalentUlti02";
                break;
            case EmTaskWay.TalentUlti03:
                // name = "TalentUlti03";
                break;
            default:
                break;
        }
        return name;
    }

    public get taskInfoUI(): string {
        let info = this.cfg.taskInfo;
        switch (this.cfg.taskSolveType) {
            case EmTaskWay.UnlockTech:
                info = StringUtil.format(this.cfg.taskInfo);
                break;
            case EmTaskWay.UnlockTower:
                info = StringUtil.format(this.cfg.taskInfo, this.cfg.taskSolvetime);
                break;
            case EmTaskWay.PassLevel:
                info = StringUtil.format(this.cfg.taskInfo, this.cfg.taskName);
                break;
            case EmTaskWay.KillCount:
                info = StringUtil.format(this.cfg.taskInfo, this.cfg.taskSolvetime);
                break;
            case EmTaskWay.PlayCount:
                info = StringUtil.format(this.cfg.taskInfo, this.cfg.taskSolvetime);
                break;
            case EmTaskWay.PerfectPassLevel:
                info = StringUtil.format(this.cfg.taskInfo, this.cfg.taskName);
                break;
            case EmTaskWay.PerfectPlayCount:
                info = StringUtil.format(this.cfg.taskInfo, this.cfg.taskSolvetime);
                break;
            case EmTaskWay.LightTowerCount:
                info = StringUtil.format(this.cfg.taskInfo, this.cfg.taskSolvetime);
                break;
            case EmTaskWay.DarkTowerCount:
                info = StringUtil.format(this.cfg.taskInfo, this.cfg.taskSolvetime);
                break;
            case EmTaskWay.WaterTowerCount:
                info = StringUtil.format(this.cfg.taskInfo, this.cfg.taskSolvetime);
                break;
            case EmTaskWay.FireTowerCount:
                info = StringUtil.format(this.cfg.taskInfo, this.cfg.taskSolvetime);
                break;
            case EmTaskWay.WoodTowerCount:
                info = StringUtil.format(this.cfg.taskInfo, this.cfg.taskSolvetime);
                break;
            case EmTaskWay.EarthTowerCount:
                info = StringUtil.format(this.cfg.taskInfo, this.cfg.taskSolvetime);
                break;
            case EmTaskWay.UserLevel:
                info = StringUtil.format(this.cfg.taskInfo, this.cfg.taskSolvetime);
                break;
            case EmTaskWay.InfinityWaveTimes:
                info = StringUtil.format(this.cfg.taskInfo, this.cfg.taskSolvetime);
                break;
            case EmTaskWay.LevelThreeCount:
                info = StringUtil.format(this.cfg.taskInfo, this.cfg.taskSolvetime);
                break;
            case EmTaskWay.KillHealCount:
                info = StringUtil.format(this.cfg.taskInfo, this.cfg.taskSolvetime);
                break;
            case EmTaskWay.KillBerserkCount:
                info = StringUtil.format(this.cfg.taskInfo, this.cfg.taskSolvetime);
                break;
            case EmTaskWay.KillFlyCount:
                info = StringUtil.format(this.cfg.taskInfo, this.cfg.taskSolvetime);
                break;
            case EmTaskWay.KillStealthCount:
                info = StringUtil.format(this.cfg.taskInfo, this.cfg.taskSolvetime);
                break;
            case EmTaskWay.InfinityGameTimes:
                info = StringUtil.format(this.cfg.taskInfo, this.cfg.taskSolvetime);
                break;
            case EmTaskWay.InfinityBossCount:
                info = StringUtil.format(this.cfg.taskInfo, this.cfg.taskSolvetime);
                break;
            case EmTaskWay.TowerLevelUpCount:
                info = StringUtil.format(this.cfg.taskInfo, this.cfg.taskSolvetime);
                break;
            case EmTaskWay.UnlockTowerDaily:
                info = StringUtil.format(this.cfg.taskInfo, this.cfg.taskSolvetime);
                break;
            case EmTaskWay.TalentCount:
                info = StringUtil.format(this.cfg.taskInfo, this.cfg.taskSolvetime);
                break;
            case EmTaskWay.LevelUp:
                info = StringUtil.format(this.cfg.taskInfo, this.cfg.taskSolvetime);
                break;
            case EmTaskWay.TalentUlti01:
                info = StringUtil.format(this.cfg.taskInfo, this.cfg.taskSolvetime);
                break;
            case EmTaskWay.TalentUlti02:
                info = StringUtil.format(this.cfg.taskInfo, this.cfg.taskSolvetime);
                break;
            case EmTaskWay.TalentUlti03:
                info = StringUtil.format(this.cfg.taskInfo, this.cfg.taskSolvetime);
                break;
            default:
                break;
        }
        return info;
    }

    /**任务类型 */
    public way: EmTaskWay;
    /**是否是主线任务*/
    public type: EmTaskType;
    /**任务文本信息 */
    public cfg: ITaskElement;
    /**任务模块 */
    private _taskModule: TaskModuleC;

    private ownType: ElementEnum;
    constructor(id: number) {
        this._taskModule = ModuleService.getModule(TaskModuleC);
        this.initProperty(id);
        this.initByType();
        this.initAction();
    }

    private initAction() {
        this.type == EmTaskType.Main && Event.addLocalListener(EmTaskEvent.TaskFinish, this.onTaskFinish.bind(this));
        this.type == EmTaskType.Daily &&
            PlayerActions.onPlayerLevelChangedClient.add((v) => {
                if (this.taskState == EmTaskState.Lock) {
                    this.checkState();
                }
            });
    }

    /**
     * 初始化属性
     * @param id 任务id
     * @returns
     */
    private initProperty(id: number) {
        const cfg = GameConfig.Task.getElement(id);
        if (!cfg) return;
        this.cfg = cfg;
        this.taskID = id;
        this.curSolveTime = 0;
        this.totalSolveTime = cfg.taskSolvetime;
        this._taskState = EmTaskState.Lock;
        this.way = cfg.taskSolveType;
        this.type = cfg.taskType;
    }

    /**
     * 根据类型进行初始化
     */
    private initByType() {
        const type = this.cfg.taskSolveType;
        switch (type) {
            case EmTaskWay.PassLevel:
                this.initPassLevel();
                break;
            case EmTaskWay.UnlockTech:
                this.initUnlockTech();
                break;
            case EmTaskWay.UnlockTower:
                this.initUnlockTower();
                break;
            // case EmTaskWay.GainStar:
            //     this.initGainStar();
            //     break;
            case EmTaskWay.PlayCount:
                this.initPlayCount();
                break;
            case EmTaskWay.KillCount:
                this.initKillCount();
                break;
            case EmTaskWay.PerfectPassLevel:
                this.initPerfectPassLevel();
                break;
            case EmTaskWay.PerfectPlayCount:
                this.initPerfectPlayCount();
                break;
            case EmTaskWay.LightTowerCount:
                this.initTowerCount(ElementEnum.LIGHT);
                break;
            case EmTaskWay.DarkTowerCount:
                this.initTowerCount(ElementEnum.DARK);
                break;
            case EmTaskWay.WaterTowerCount:
                this.initTowerCount(ElementEnum.WATER);
                break;
            case EmTaskWay.FireTowerCount:
                this.initTowerCount(ElementEnum.FIRE);
                break;
            case EmTaskWay.WoodTowerCount:
                this.initTowerCount(ElementEnum.WOOD);
                break;
            case EmTaskWay.EarthTowerCount:
                this.initTowerCount(ElementEnum.EARTH);
                break;
            case EmTaskWay.UserLevel:
                this.initUserLevel();
                break;
            case EmTaskWay.InfinityWaveTimes:
                this.initInfinityWaveTimes();
                break;
            case EmTaskWay.LevelThreeCount:
                this.initLevelThreeCount();
                break;
            case EmTaskWay.KillHealCount:
                this.initKillMonsterTypeCount("killHealEnemyCount");
                break;
            case EmTaskWay.KillBerserkCount:
                this.initKillMonsterTypeCount("killBerserkEnemyCount");
                break;
            case EmTaskWay.KillFlyCount:
                this.initKillMonsterTypeCount("killFlyEnemyCount");
                break;
            case EmTaskWay.KillStealthCount:
                this.initKillMonsterTypeCount("killStealthEnemyCount");
                break;
            case EmTaskWay.InfinityGameTimes:
                this.initInfinityGameTimes();
                break;
            case EmTaskWay.InfinityBossCount:
                this.initStageCompleteByType("infinityBossCount");
                break;
            case EmTaskWay.TowerLevelUpCount:
                this.initStageCompleteByType("towerLevelUpCount");
                break;
            case EmTaskWay.LevelUp:
                this.initLevelUpCount();
                break;
            case EmTaskWay.UnlockTowerDaily:
                this.initUnlockTowerDaily();
                break;
            case EmTaskWay.TalentCount:
                this.initTalentCount();
                break;
            case EmTaskWay.TalentUlti01:
                this.initTalentUlti(EmTaskWay.TalentUlti01);
                break;
            case EmTaskWay.TalentUlti02:
                this.initTalentUlti(EmTaskWay.TalentUlti02);
                break;
            case EmTaskWay.TalentUlti03:
                this.initTalentUlti(EmTaskWay.TalentUlti03);
                break;
            default:
                break;
        }
        setTimeout(() => {
            this.checkState();
        }, 1000);
    }

    private checkUnlock(): boolean {
        let isOpen = true;
        switch (this.type) {
            case EmTaskType.Daily:
                isOpen = this.cfg.preconditions[0] <= PlayerUtil.getPlayerScript(Player.localPlayer.playerId)?.level;
                break;
            case EmTaskType.Main:
                for (let i = 0; i < this.cfg.preconditions?.length; i++) {
                    if (!this._taskModule.judgeFinish(this.cfg.preconditions[i])) {
                        isOpen = false;
                        break;
                    }
                }
                break;
            default:
                break;
        }
        return isOpen;
    }

    /**
     * 判断任务是否已经开启
     * @param isFirst 判断是否完成 逻辑上不会无线递归
     */
    public checkState(isFirst: boolean = true) {
        switch (this.taskState) {
            case EmTaskState.Lock:
                //check finishState && isOpen
                if (this._taskModule.judgeFinish(this.taskID)) {
                    this.taskState = EmTaskState.Finish;
                } else {
                    //check isOpen
                    if (this.checkUnlock()) {
                        this.taskState = EmTaskState.Doing;
                    }
                    //在调用一次自己，然后判断是否完成 逻辑上不会无线递归 但是加一个isfirst 防止无限递归
                    if (isFirst) this.checkState(false);
                }
                break;
            case EmTaskState.Doing:
                if (this.curSolveTime >= this.totalSolveTime) {
                    this.taskState = EmTaskState.Reward;
                    // const str = StringUtil.format(this.cfg.taskName, this.totalSolveTime);
                    // const tips = str + " " + GameConfig.Language.getElement("UI_9").Value;
                    // const tips = StringUtil.format(GameConfig.Language.getElement("{0} 已完成!").Value, str);
                    // mw.UIService.show(CommonTipsManagerUI).showTips(tips);
                }
                break;
            case EmTaskState.Reward:
                break;
            default:
                break;
        }
        this._taskModule.refreshUI();
    }

    /**
     * 别的任务完成的回调
     * @param id 完成的任务的ID
     */
    public onTaskFinish(id: number) {
        if (this.taskState == EmTaskState.Lock) {
            if (this.cfg.preconditions.includes(id)) {
                this.checkState();
            }
        }
    }

    /**
     * 初始化单一种任务类型
     */
    private initPassLevel() {
        this.totalSolveTime = 1;
        this.curSolveTime = DataCenterC.getData(PlayerModuleData).firstClears.includes(this.cfg.taskSolvetime) ? 1 : 0;
        StageActions.onStageWin.add((id: number) => {
            this.curSolveTime = DataCenterC.getData(PlayerModuleData).firstClears.includes(this.cfg.taskSolvetime)
                ? 1
                : 0;
            this.checkState();
        });
    }

    /**
     * 初始化单一种任务类型
     */
    private initPerfectPassLevel() {
        this.totalSolveTime = 1;
        this.curSolveTime = DataCenterC.getData(PlayerModuleData).firstPerfectClears.includes(this.cfg.taskSolvetime)
            ? 1
            : 0;
        StageActions.onStagePerfectWin.add((id: number) => {
            this.curSolveTime = DataCenterC.getData(PlayerModuleData).firstPerfectClears.includes(
                this.cfg.taskSolvetime
            )
                ? 1
                : 0;
            this.checkState();
        });
    }

    /**
     * 初始化单一种任务类型
     */
    private initUnlockTech() {
        this.totalSolveTime = 1;
        if (this.type === EmTaskType.Daily) {
            this.curSolveTime = Math.min(ModuleService.getModule(TalentModuleC).getDailyCount(), this.totalSolveTime);
            StageActions.onTalentActivate.add((id: number) => {
                this.curSolveTime = Math.min(ModuleService.getModule(TalentModuleC).getDailyCount(), this.totalSolveTime);
                this.checkState();
            });
            return;
        }
        this.curSolveTime = ModuleService.getModule(TalentModuleC).getTalentIndex(this.cfg.taskSolvetime) ? 1 : 0;
        StageActions.onTalentActivate.add((id: number) => {
            this.curSolveTime = ModuleService.getModule(TalentModuleC).getTalentIndex(this.cfg.taskSolvetime) ? 1 : 0;
            this.checkState();
        });
    }

    /**
     * 初始化单一种任务类型
     */
    private initKillCount() {
        this.curSolveTime =
            DataCenterC.getData(PlayerModuleData).killEnemyCount[this.type == EmTaskType.Daily ? "daily" : "sum"];
        StageActions.onStageComplete.add(() => {
            this.curSolveTime =
                DataCenterC.getData(PlayerModuleData).killEnemyCount[this.type == EmTaskType.Daily ? "daily" : "sum"];
            this.checkState();
        });
    }

    /**
     * 初始化单一种任务类型
     */
    private initKillMonsterTypeCount(type: string) {
        this.curSolveTime =
            DataCenterC.getData(PlayerModuleData)[type][this.type == EmTaskType.Daily ? "daily" : "sum"];
        StageActions.onStageComplete.add(() => {
            this.curSolveTime =
                DataCenterC.getData(PlayerModuleData)[type][this.type == EmTaskType.Daily ? "daily" : "sum"];
            this.checkState();
        });
    }

    /**
     * 初始化单一种任务类型
     */
    private initPlayCount() {
        this.curSolveTime =
            DataCenterC.getData(PlayerModuleData).completeStageCount[this.type == EmTaskType.Daily ? "daily" : "sum"];
        StageActions.onStageComplete.add(() => {
            this.curSolveTime =
                DataCenterC.getData(PlayerModuleData).completeStageCount[
                    this.type == EmTaskType.Daily ? "daily" : "sum"
                ];
            this.checkState();
        });
    }

    /**
     * 初始化单一种任务类型
     */
    private initPerfectPlayCount() {
        this.curSolveTime =
            DataCenterC.getData(PlayerModuleData).perfectCompleteStageCount[
                this.type == EmTaskType.Daily ? "daily" : "sum"
            ];
        StageActions.onStageComplete.add(() => {
            this.curSolveTime =
                DataCenterC.getData(PlayerModuleData).perfectCompleteStageCount[
                    this.type == EmTaskType.Daily ? "daily" : "sum"
                ];
            this.checkState();
        });
    }

    /**
     * 初始化单一种任务类型
     */
    private initUserLevel() {
        const playerId = Player.localPlayer?.playerId;
        this.curSolveTime = PlayerUtil.getPlayerScript(playerId)?.level;
        PlayerActions.onPlayerLevelChangedClient2.add((v) => {
            this.curSolveTime = v;
            this.checkState();
        });
    }

    /**
     * 初始化单一种任务类型
     */
    private initInfinityWaveTimes() {
        this.curSolveTime = DataCenterC.getData(PlayerModuleData).infinityWaveTimes;
        StageActions.onStageComplete.add(() => {
            this.curSolveTime = DataCenterC.getData(PlayerModuleData).infinityWaveTimes;
            this.checkState();
        });
    }

    /**
     * 初始化单一种任务类型
     */
    private initLevelThreeCount() {
        this.curSolveTime =
            DataCenterC.getData(PlayerModuleData).levelThreeCount[this.type == EmTaskType.Daily ? "daily" : "sum"];
        StageActions.onStageComplete.add(() => {
            this.curSolveTime =
                DataCenterC.getData(PlayerModuleData).levelThreeCount[this.type == EmTaskType.Daily ? "daily" : "sum"];
            this.checkState();
        });
    }

    /**
     * 初始化单一种任务类型
     */
    private initLevelUpCount() {
        this.curSolveTime =
            DataCenterC.getData(PlayerModuleData).levelUpCount[this.type == EmTaskType.Daily ? "daily" : "sum"];
        PlayerActions.onPlayerLevelChangedClient2.add((v) => {
            this.curSolveTime =
                DataCenterC.getData(PlayerModuleData).levelUpCount[this.type == EmTaskType.Daily ? "daily" : "sum"];
            this.checkState();
        });
    }

    /**
     * 初始化单一种任务类型
     */
    private initInfinityGameTimes() {
        this.curSolveTime =
            DataCenterC.getData(PlayerModuleData).infinityGameTimes[this.type == EmTaskType.Daily ? "daily" : "sum"];
        StageActions.onStageComplete.add(() => {
            this.curSolveTime =
                DataCenterC.getData(PlayerModuleData).infinityGameTimes[
                    this.type == EmTaskType.Daily ? "daily" : "sum"
                ];
            this.checkState();
        });
    }

    /**
     * 初始化以游戏结束为结算的任务
     */
    private initStageCompleteByType(type: string) {
        this.curSolveTime =
            DataCenterC.getData(PlayerModuleData)[type][this.type == EmTaskType.Daily ? "daily" : "sum"];
        StageActions.onStageComplete.add(() => {
            this.curSolveTime =
                DataCenterC.getData(PlayerModuleData)[type][this.type == EmTaskType.Daily ? "daily" : "sum"];
            this.checkState();
        });
    }

    /**
     * 元素塔部署次数信息
     */
    private initTowerCount(type: ElementEnum) {
        this.ownType = type;
        if (type === ElementEnum.LIGHT) {
            this.curSolveTime =
                DataCenterC.getData(PlayerModuleData).lightTowerCount[this.type == EmTaskType.Daily ? "daily" : "sum"];
        } else if (type === ElementEnum.DARK) {
            this.curSolveTime =
                DataCenterC.getData(PlayerModuleData).darkTowerCount[this.type == EmTaskType.Daily ? "daily" : "sum"];
        } else if (type === ElementEnum.WATER) {
            this.curSolveTime =
                DataCenterC.getData(PlayerModuleData).waterTowerCount[this.type == EmTaskType.Daily ? "daily" : "sum"];
        } else if (type === ElementEnum.FIRE) {
            this.curSolveTime =
                DataCenterC.getData(PlayerModuleData).fireTowerCount[this.type == EmTaskType.Daily ? "daily" : "sum"];
        } else if (type === ElementEnum.WOOD) {
            this.curSolveTime =
                DataCenterC.getData(PlayerModuleData).woodTowerCount[this.type == EmTaskType.Daily ? "daily" : "sum"];
        } else if (type === ElementEnum.EARTH) {
            this.curSolveTime =
                DataCenterC.getData(PlayerModuleData).earthTowerCount[this.type == EmTaskType.Daily ? "daily" : "sum"];
        }
        // 部署回调
        // TowerActions.onTowerBuild.add(this.towerBuildByType);
        TowerActions.onTowerBuild.add((type: ElementEnum) => {
            if (type === ElementEnum.LIGHT && this.ownType === type) {
                this.curSolveTime =
                    DataCenterC.getData(PlayerModuleData).lightTowerCount[
                        this.type == EmTaskType.Daily ? "daily" : "sum"
                    ];
            } else if (type === ElementEnum.DARK && this.ownType === type) {
                this.curSolveTime =
                    DataCenterC.getData(PlayerModuleData).darkTowerCount[
                        this.type == EmTaskType.Daily ? "daily" : "sum"
                    ];
            } else if (type === ElementEnum.WATER && this.ownType === type) {
                this.curSolveTime =
                    DataCenterC.getData(PlayerModuleData).waterTowerCount[
                        this.type == EmTaskType.Daily ? "daily" : "sum"
                    ];
            } else if (type === ElementEnum.FIRE && this.ownType === type) {
                this.curSolveTime =
                    DataCenterC.getData(PlayerModuleData).fireTowerCount[
                        this.type == EmTaskType.Daily ? "daily" : "sum"
                    ];
            } else if (type === ElementEnum.WOOD && this.ownType === type) {
                this.curSolveTime =
                    DataCenterC.getData(PlayerModuleData).woodTowerCount[
                        this.type == EmTaskType.Daily ? "daily" : "sum"
                    ];
            } else if (type === ElementEnum.EARTH && this.ownType === type) {
                this.curSolveTime =
                    DataCenterC.getData(PlayerModuleData).earthTowerCount[
                        this.type == EmTaskType.Daily ? "daily" : "sum"
                    ];
            }
            this.checkState();
        });
    }

    towerBuildByType(type: ElementEnum) {
        if (type === ElementEnum.LIGHT) {
            this.curSolveTime =
                DataCenterC.getData(PlayerModuleData).lightTowerCount[this.type == EmTaskType.Daily ? "daily" : "sum"];
        } else if (type === ElementEnum.DARK) {
            this.curSolveTime =
                DataCenterC.getData(PlayerModuleData).darkTowerCount[this.type == EmTaskType.Daily ? "daily" : "sum"];
        } else if (type === ElementEnum.WATER) {
            this.curSolveTime =
                DataCenterC.getData(PlayerModuleData).waterTowerCount[this.type == EmTaskType.Daily ? "daily" : "sum"];
        } else if (type === ElementEnum.FIRE) {
            this.curSolveTime =
                DataCenterC.getData(PlayerModuleData).fireTowerCount[this.type == EmTaskType.Daily ? "daily" : "sum"];
        } else if (type === ElementEnum.WOOD) {
            this.curSolveTime =
                DataCenterC.getData(PlayerModuleData).woodTowerCount[this.type == EmTaskType.Daily ? "daily" : "sum"];
        } else if (type === ElementEnum.EARTH) {
            this.curSolveTime =
                DataCenterC.getData(PlayerModuleData).earthTowerCount[this.type == EmTaskType.Daily ? "daily" : "sum"];
        }
        this.checkState();
    }

    // /**
    //  * 初始化单一种任务类型
    //  */
    // private initGainStar() {
    //     this.curSolveTime = ModuleService.getModule(PetModuleC)?.getSumEvoCount();
    //     Actions.onSumEvoCountChangedC.add((count) => {
    //         this.curSolveTime = count;
    //         this.checkState();
    //     })
    // }

    /**
     * 初始化单一种任务类型
     */
    private initUnlockTower() {
        this.curSolveTime = ModuleService.getModule(CardModuleC)?.unlockCards.length;
        CardActions.onCardChanged.add((count) => {
            this.curSolveTime = ModuleService.getModule(CardModuleC)?.unlockCards.length;
            this.checkState();
        });
    }

    private initUnlockTowerDaily() {
        this.curSolveTime = DataCenterC.getData(PlayerModuleData).unlockTowerDaily;
        CardActions.onCardChanged.add((count) => {
            this.curSolveTime = DataCenterC.getData(PlayerModuleData).unlockTowerDaily;
            this.checkState();
        });
    }

    private initTalentCount() {
        this.curSolveTime = ModuleService.getModule(TalentModuleC).getTalentTotalUnlockCnt();
        StageActions.onTalentActivate.add(() => {
            this.curSolveTime = ModuleService.getModule(TalentModuleC).getTalentTotalUnlockCnt();
            this.checkState();
        });
    }

    private initTalentUlti(id: number) {
        this.curSolveTime = ModuleService.getModule(TalentModuleC).getTalentIndex(id);
        StageActions.onTalentActivate.add(() => {
            this.curSolveTime = ModuleService.getModule(TalentModuleC).getTalentIndex(id);
            this.checkState();
        });
    }
}
