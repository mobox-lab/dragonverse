import { QuestStateEnum } from "../../module/quest/Config";
import GToolkit from "../../util/GToolkit";
import { KeyItemPuzzle } from "../interactive/KeyItemPuzzel";
import { PickableItem } from "../interactive/PickableItem";
import WoodRewardPuzzle from "../interactive/WoodRewardPuzzle";
import { Quest } from "./Quest";


interface SingleTaskInfo {


    index: number;

    complete: boolean;

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

    private _cacheInfo: SingleTaskInfo[];

    private _puzzle: Map<KeyItemPuzzle, PuzzleInfo> = new Map();

    private _reward: WoodRewardPuzzle;


    protected onSerializeCustomData(customData: string) {
        if (customData) {

            this._cacheInfo = JSON.parse(customData);

        } else {

            this._cacheInfo = this._taskConfig.map((value, index) => {
                return {
                    index: index,
                    complete: false,
                };
            });
        }
    }


    protected onInitialize(): void {
        super.onInitialize();
        this.generateAllPrefabs();
    }


    private async generateAllPrefabs() {

        let isAllSubTaskCompleted = true;
        for (const value of this._cacheInfo) {
            const config = this._taskConfig[value.index];

            // 先生成机关
            let puzzle = await GameObject.asyncFindGameObjectById(config.puzzleGuid);


            let puzzleScript: KeyItemPuzzle = GToolkit.getFirstScript(puzzle, KeyItemPuzzle);


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

                let stoneScript: PickableItem = GToolkit.getFirstScript(stone, PickableItem);
                if (!stoneScript) {
                    throw new Error("配置的预制体中，没有PickableItem脚本");
                }
                stoneScript.initializePosition = stone.worldTransform.position;
                cacheInfo.stone = stoneScript;
                isAllSubTaskCompleted = false;
            } else {
                stone.destroy();
            }

            this._puzzle.set(puzzleScript, cacheInfo);
        }


        let reward = await GameObject.asyncFindGameObjectById(this._rewardGuid);
        const rewardScript: WoodRewardPuzzle = this._reward = GToolkit.getFirstScript(reward, WoodRewardPuzzle);
        if (!rewardScript) {
            throw new Error(" 奖励预制体没有存放脚本");
        }


        rewardScript.locked = this.status !== QuestStateEnum.Complete;
        rewardScript.isOpened = isAllSubTaskCompleted;
        rewardScript.onPlayerGetReward.add(this.onPlayerGetReward, this);

    }


    private onStorageProgressUpdated(keyItem: KeyItemPuzzle) {

        let puzzleInfo = this._puzzle.get(keyItem);
        if (!puzzleInfo) {
            return;
        }
        let index = puzzleInfo.index;
        let cacheInfo = this._cacheInfo[index];
        cacheInfo.complete = !keyItem.locked;
        this.updateProgressInfo();
    }

    private onPlayerGetReward() {
        this.updateProgressInfo(1);
    }


    private updateProgressInfo(base: number = 0) {
        let progress = base;
        this._cacheInfo.forEach((value) => {
            if (value.complete) {
                progress++;
            }
        });
        this.updateTaskProgress(progress, JSON.stringify(this._cacheInfo));
    }

    onActivated(): void {

    }


    onComplete(): void {

    }
}