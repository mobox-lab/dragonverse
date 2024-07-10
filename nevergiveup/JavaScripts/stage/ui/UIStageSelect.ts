import { GameManager } from "../../GameManager";
import { GuideManager } from "../../Guide/GuideManager";
import GuideStageTrigger from "../../GuideStageTrigger";
import PlayerModuleData from "../../Modules/PlayerModule/PlayerModuleData";
import { PlayerUtil } from "../../Modules/PlayerModule/PlayerUtil";
import { NEW_STAGE_CONFIG, STAGE_CONFIG } from "../../StageConfig";
import { TweenCommon } from "../../TweenCommon";
import { TipsManager } from "../../UI/Tips/CommonTipsManagerUI";
import Utils from "../../Utils";
import { GameConfig } from "../../config/GameConfig";
import { ComponentFactory } from "../../enemy/components/ComponentFactory";
import { MGSTool } from "../../tool/MGSTool";
import StageSelectQueueItem_Generate from "../../ui-generate/HUD/StageSelectQueueItem_generate";
import StageDifficulty_Generate from "../../ui-generate/Level/StageDifficulty_generate";
import StageSelect_Generate from "../../ui-generate/Level/StageSelect_generate";
import { StageUtil } from "../Stage";
import StageTrigger from "../StageTrigger";

export class UIStageSelectItem extends StageSelectQueueItem_Generate {
    init() {}
}
export class UIStageDifficulty extends StageDifficulty_Generate {
    unlocked: boolean = true;
    difficluty: string[] = [
        GameConfig.Language.getElement("Text_Easy").Value,
        GameConfig.Language.getElement("Text_Normal").Value,
        GameConfig.Language.getElement("Text_Difficult").Value,
    ];
    difficultyColor: string[] = ["#01B652", "#B68B00", "#BC322C"];
    index: number;
    stageId: number;

    init(stageId: number, index: number) {
        this.stageId = stageId;
        this.index = index;
        this.mdifficultly.text = `${this.difficluty[index]}`;
        // this.mdifficultly.setFontColorByHex(this.difficultyColor[index]);
        let stages = StageUtil.getStageDataWithId(this.stageId);
        let config = stages[index];
        this.unlocked = true;
        if (index != 0) {
            let firstClears = DataCenterC.getData(PlayerModuleData).firstClears;
            let lastDifficulty = stages[index - 1];
            if (firstClears.indexOf(lastDifficulty.id) == -1) {
                this.unlocked = false;
            }
        }
        if (this.unlocked) {
            this.mRecommandedLevel.setFontColorByHex("#867160");
            this.mRecommandedLevel.text =
                GameConfig.Language.getElement("Text_RecommendLevel").Value + `${config.recommandedLevel}`;
            this.mdifficultly.renderOpacity = 1;
        } else {
            this.mRecommandedLevel.setFontColorByHex("#A1A1A1");
            this.mRecommandedLevel.text = GameConfig.Language.getElement("Text_UnlockAfterLastDifficulty").Value;
            this.mdifficultly.renderOpacity = 0.7;
        }

        this.setSelectIndex(0);
    }

    setSelectIndex(index: number) {
        if (index == this.index) {
            this.mSelected.visibility = SlateVisibility.Visible;
            this.mdifficultly.text = `${this.difficluty[this.index]}`;
        } else {
            this.mSelected.visibility = SlateVisibility.Collapsed;
            this.mdifficultly.text = `${this.difficluty[this.index]}`;
        }
    }
}

export class UIStageSelect extends StageSelect_Generate {
    private _queueItem: UIStageSelectItem[] = [];
    private _difficulty: UIStageDifficulty[] = [];
    private _ownerId: number = 0;
    private _script: StageTrigger | GuideStageTrigger;
    onStart() {
        this.layer = UILayerTop;
        for (let i = 0; i < 4; i++) {
            let item = UIService.create(UIStageSelectItem);
            item.init();
            this._queueItem.push(item);
            this.mPlayerQueue.addChild(item.uiObject);
        }

        this.mGo.onClicked.add(() => {
            if (Utils.isLocalPlayer(this._ownerId)) {
                this._script.startGame(Player.localPlayer.playerId);
            } else {
                TipsManager.showTips(GameConfig.Language.getElement("Text_StartHouseOwner").Value);
            }
        });
        
        this.mClose.onClicked.add(() => {
            if (Utils.isLocalPlayer(this._ownerId)) {
                this._script.clickLeaveBtn(Player.localPlayer.playerId);
            }
        });

        this.mOff.onClicked.add(() => {
            if (Utils.isLocalPlayer(this._ownerId)) {
                this._script.clickLeaveBtn(Player.localPlayer.playerId);
            }
        });
    }

    setDifficulty() {
        for (let i = 0; i < 3; i++) {
            let item: UIStageDifficulty;
            if (this._difficulty.length > i) {
                item = this._difficulty[i];
            } else {
                item = UIService.create(UIStageDifficulty);
                item.mDifficulty.onClicked.add(() => {
                    console.log(this._ownerId, "ownerId");
                    if (Utils.isLocalPlayer(this._ownerId)) {
                        if (item.unlocked) {
                            this._script.setDifficulty(Player.localPlayer.playerId, i);
                        } else {
                            TipsManager.showTips(GameConfig.Language.getElement("Text_AfterLastDifficulty").Value);
                        }
                    } else {
                        TipsManager.showTips(GameConfig.Language.getElement("Text_DifficultyHouseOwner").Value);
                    }
                });
                this._difficulty.push(item);
                this.mSelectDifficulty.addChild(item.uiObject);
            }
            item.init(this._script.stageId, i);
        }
    }

    setData(stageId: number, difficluty: number) {
        let stages = StageUtil.getStageDataWithId(stageId);
        let config = stages[difficluty];
        this.mMapImage.imageGuid = config.stageImageGuid;
        this.mStageName.text = `${config.stageName}`;
        let typeString = this.getEnemyTypeString(stageId, difficluty);
        if (typeString.length == 0) {
            this.mMonsters.text = "";
        } else {
            this.mMonsters.text = GameConfig.Language.getElement("Text_SpecialEnemy").Value + `${typeString.join(" ")}`;
        }
    }

    getEnemyTypeString(stageId: number, difficluty: number) {
        // todo 这里要改
        let index = StageUtil.getIndexFromIdAndDifficulty(stageId, difficluty);
        let stageConfig = STAGE_CONFIG[index];
        let waves = stageConfig.waves;
        let typeString: string[] = [];
        for (let i = 0; i < waves.length; i++) {
            let wave = waves[i];
            for (let j = 0; j < wave.enemies.length; j++) {
                let enemyConfig = GameConfig.Monster.getElement(wave.enemies[j].type);
                let types = enemyConfig.types;
                if (!types) {
                    types = [0];
                }
                for (let k = 0; k < types.length; k++) {
                    let enemyTypeStr = ComponentFactory.EnemeyTypeString[types[k]];
                    if (!typeString.includes(enemyTypeStr) && enemyTypeStr != "") {
                        typeString.push(enemyTypeStr);
                    }
                }
            }
        }
        return typeString;
    }

    updateCountDown(time: number) {
        let timeStr = time > 9 ? time : "0" + time;
        this.mCountDown.text = GameConfig.Language.getElement("Text_CountDown").Value + `${timeStr}`;
    }

    updatePlayerQueue(ids: number[]) {
        let players = ids.map((id) => Player.getPlayer(id));
        for (let i = 0; i < 4; i++) {
            let player = players[i];
            if (player) {
                let script = PlayerUtil.getPlayerScript(player.playerId);
                if (script) {
                    this._queueItem[i].mName.text = Utils.truncateString(script.playerName, 8);
                    this._queueItem[i].mLevel.text = `Lv.${script.level}`;
                }
                this._queueItem[i].setVisible(SlateVisibility.Visible);
            } else {
                this._queueItem[i].setVisible(SlateVisibility.Hidden);
            }
        }
    }

    setSelectDifficulty(index: number) {
        for (let i = 0; i < this._difficulty.length; i++) {
            this._difficulty[i].setSelectIndex(index);
        }
    }

    setOwner(id: number) {
        this._ownerId = id;
    }

    onShow(script: StageTrigger | GuideStageTrigger) {
        MGSTool.page("level");
        this._script = script;
        this.setDifficulty();
        TweenCommon.popUpShow(this.rootCanvas);
    }
}
