import Enumerable from "linq";
import {QuestStateEnum} from "../../module/quest/Config";
import GToolkit from "gtoolkit";
import {KeyItemPuzzle} from "../interactive/KeyItemPuzzel";
import {PickableItem} from "../interactive/PickableItem";
import WoodRewardPuzzle from "../interactive/WoodRewardPuzzle";
import {Quest} from "./Quest";

interface LiftTaskInfo {
    index: number;

    complete: boolean;
}


interface WoodDragonTaskInfo {
    base: boolean;

    liftTasks: LiftTaskInfo[];
}

@mw.Serializable
class StoneTaskInfo {


    @mw.Property({displayName: "机关预制体场景guid"})
    public puzzleGuid: string = "";


    @mw.Property({displayName: "石头预制体场景guid"})
    public stoneGuid: string = "";
}


interface PuzzleInfo {

    index: number;

    puzzle: KeyItemPuzzle;

    stone?: PickableItem;
}


@mw.Component
export default class WoodDragonQuest extends Quest {

    @mw.Property({displayName: "任务配置"})
    private _taskConfig: StoneTaskInfo[] = [new StoneTaskInfo()];


    @mw.Property({displayName: "奖励预制体的guid"})

    private _rewardGuid: string = "";


    @WoodDragonQuest.required
    private _cacheInfo: WoodDragonTaskInfo;

    private _puzzle: Map<KeyItemPuzzle, PuzzleInfo> = new Map();

    private _reward: WoodRewardPuzzle;

    protected get progress(): number {
        return Enumerable
            .from(this._cacheInfo.liftTasks)
            .count(info => info.complete) + (this._cacheInfo.base ? 1 : 0);
    }


    protected onSerializeCustomData(customData: string) {
        if (customData) {
            this._cacheInfo = JSON.parse(customData);
        } else {
            this._cacheInfo = {
                base: false,
                liftTasks: this._taskConfig.map((value, index) => {
                    return {
                        index: index,
                        complete: false,
                    };
                }),
            };
        }
    }


    protected onInitialize(): void {
        super.onInitialize();
        this.generateAllPrefabs();
    }


    private async generateAllPrefabs() {

        let isAllSubTaskCompleted = true;
        for (const value of this._cacheInfo.liftTasks) {
            const config = this._taskConfig[value.index];

            // 先生成机关
            let puzzle = await GameObject.asyncFindGameObjectById(config.puzzleGuid);


            let puzzleScript: KeyItemPuzzle = GToolkit.getFirstComponent(puzzle, KeyItemPuzzle);


            if (!puzzleScript) {
                throw new Error("配置的预制体中，没有Puzzle脚本");
            }

            let cacheInfo: PuzzleInfo = {
                puzzle: puzzleScript,
                index: value.index,
            };
            puzzleScript.setup(!value.complete);
            puzzleScript.onStorageProgressUpdate.add(this.onStorageProgressUpdated, this);

            let stone = await GameObject.asyncFindGameObjectById(config.stoneGuid);

            if (!value.complete) {

                let stoneScript: PickableItem = GToolkit.getFirstComponent(stone, PickableItem);
                if (!stoneScript) {
                    throw new Error("配置的预制体中，没有PickableItem脚本");
                }
                stoneScript.initializePosition = stone.worldTransform.position;
                cacheInfo.stone = stoneScript;
                isAllSubTaskCompleted = false;
                stoneScript.onBeenPutInStorage.add(this.onPickItemBeenStorage, this);
            } else {
                stone.destroy();
            }

            this._puzzle.set(puzzleScript, cacheInfo);
        }


        let reward = await GameObject.asyncFindGameObjectById(this._rewardGuid);
        const rewardScript: WoodRewardPuzzle = this._reward = GToolkit.getFirstComponent(reward, WoodRewardPuzzle);
        if (!rewardScript) {
            throw new Error(" 奖励预制体没有存放脚本");
        }

        this._reward = rewardScript;
        rewardScript.onPlayerGetReward.add(this.onPlayerGetReward, this);

        let progress = this.getCurrentCompleteSubProgress();

        this._reward.setup(this.status !== QuestStateEnum.Complete, progress >= this._cacheInfo.liftTasks.length, progress);
    }


    private getCurrentCompleteSubProgress() {

        return Enumerable
            .from(this._cacheInfo.liftTasks)
            .count(info => info.complete);
    }


    private updateRewardTaskInfo() {

        let progress = this.getCurrentCompleteSubProgress();
        this._reward.progress = progress;
        this._reward.locked = this.status !== QuestStateEnum.Complete;
        this._reward.isOpened = progress >= this._cacheInfo.liftTasks.length;
    }


    private async onPickItemBeenStorage(keyItem: PickableItem) {

        for (const puzzle of this._puzzle.values()) {
            if (puzzle.stone === keyItem) {
                puzzle.stone = null;
                keyItem.onBeenPutInStorage.remove(this.onPickItemBeenStorage, this);
                await TimeUtil.delaySecond(0);
                // 下一帧删除
                keyItem.gameObject.destroy();
                break;
            }
        }

    }


    private onStorageProgressUpdated(keyItem: KeyItemPuzzle) {

        let puzzleInfo = this._puzzle.get(keyItem);
        if (!puzzleInfo) {
            return;
        }
        let index = puzzleInfo.index;
        let cacheInfo = this._cacheInfo.liftTasks[index];
        cacheInfo.complete = !keyItem.locked;
        keyItem.onStorageProgressUpdate.remove(this.onStorageProgressUpdated, this);

        this.updateRewardTaskInfo();
        this.updateProgressInfo();
    }

    private onPlayerGetReward() {
        this._cacheInfo.base = true;
        this.updateProgressInfo();
    }


    private updateProgressInfo() {
        this.updateTaskProgress(JSON.stringify(this._cacheInfo));
    }

    onActivated(): void {

    }


    onComplete(): void {
        if (this._reward) {
            this._reward.locked = false;

        }
    }
}