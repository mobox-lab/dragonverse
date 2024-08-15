import Gtk from "gtoolkit";
import PlayerModuleData from "../../Modules/PlayerModule/PlayerModuleData";
import { PlayerUtil } from "../../Modules/PlayerModule/PlayerUtil";
import { STAGE_CONFIG } from "../../StageConfig";
import { TweenCommon } from "../../TweenCommon";
import { TipsManager } from "../../UI/Tips/CommonTipsManagerUI";
import Utils from "../../Utils";
import { GameConfig } from "../../config/GameConfig";
import { IMonsterElement } from "../../config/Monster";
import { StageMonsterSkillType } from "../../const/enum";
import { ElementEnum, advantageMap } from "../../enemy/EnemyBase";
import { ComponentFactory } from "../../enemy/components/ComponentFactory";
import { MGSTool } from "../../tool/MGSTool";
import StageSelectQueueItem_Generate from "../../ui-generate/HUD/StageSelectQueueItem_generate";
import StageDifficulty_Generate from "../../ui-generate/Level/StageDifficulty_generate";
import StageSelect_Generate from "../../ui-generate/Level/StageSelect_generate";
import { StageUtil } from "../Stage";
import StageTrigger from "../StageTrigger";
import { WaveUtil } from "../Wave";
import { GlobalData } from "../../const/GlobalData";

export class UIStageSelectItem extends StageSelectQueueItem_Generate {
    init() {}
}
export class UIStageDifficulty extends StageDifficulty_Generate {
    unlocked: boolean = true;
    difficulties: string[] = [
        GameConfig.Language.getElement("Text_Easy").Value,
        GameConfig.Language.getElement("Text_Normal").Value,
        GameConfig.Language.getElement("Text_Difficult").Value,
    ];
    difficultyColor: string[] = ["#01B652", "#B68B00", "#BC322C"];
    index: number;
    stageCfgId: number;
    init(stageWorldIndex: number, difficulty: number, stageGroupId: number) {
        this.stageCfgId = StageUtil.getIdFromGroupIndexAndDifficulty(stageWorldIndex, stageGroupId, difficulty);
        this.index = difficulty;
        this.mdifficultly.text = `${this.difficulties[difficulty]}`;
        // this.mdifficultly.setFontColorByHex(this.difficultyColor[index]);
        const stageCfg = StageUtil.getStageCfgById(this.stageCfgId);
        this.unlocked = false;
        const firstClears = DataCenterC.getData(PlayerModuleData).firstClears;
        const preDifficultyIds = StageUtil.getPreDifficultyIds(stageCfg);
        console.log("#debug preDifficultyIds:", preDifficultyIds, " firstClears:", firstClears);
        if (preDifficultyIds?.length) {
            for (const id of preDifficultyIds) {
                if (firstClears.includes(id)) {
                    this.unlocked = true;
                    break;
                }
            }
        } else this.unlocked = true;
        if (this.unlocked) {
            this.mRecommandedLevel.setFontColorByHex("#867160");
            this.mRecommandedLevel.text =
                GameConfig.Language.getElement("Text_RecommendLevel").Value + `${stageCfg.recommandedLevel}`;
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
            this.mdifficultly.text = `${this.difficulties[this.index]}`;
        } else {
            this.mSelected.visibility = SlateVisibility.Collapsed;
            this.mdifficultly.text = `${this.difficulties[this.index]}`;
        }
    }
}

export class UIStageSelect extends StageSelect_Generate {
    private _queueItem: UIStageSelectItem[] = [];
    private _difficulty: UIStageDifficulty[] = [];
    private _ownerId: number = 0;
    private _script: StageTrigger;
    public selectedMonsterSkillIndex: number = 0;
    public monsterSkillTypes: StageMonsterSkillType[] = [];

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
            item.init(this._script.stageWorldIndex, i, this._script.stageGroupId);
        }
    }

    setData(stageWorldIndex: number, difficulty: number, stageGroupId: number) {
        const stageCfg = StageUtil.getCfgFromGroupIndexAndDifficulty(stageWorldIndex, stageGroupId, difficulty);
        const stageCfgId = stageCfg.id;
        const elementIds = this.getRecommendElement(stageCfgId);
        this.mCanvas_recoElements.removeAllChildren();
        for (const id of elementIds) {
            const icon = Image.newObject(this.mCanvas_recoElements, `element_${id}`) as Image;
            icon.size = new Vector2(40, 40)
            icon.imageGuid = GlobalData.Shop.shopItemCornerIconGuid[id - 1]
        }
        const {  stealth, fly, healing, berserk } = this.getMonsterBuff(stageCfgId);
        const skills = [];
        if(healing) skills.push(StageMonsterSkillType.Healing);
        if(berserk) skills.push(StageMonsterSkillType.Berserk);
        if(stealth) skills.push(StageMonsterSkillType.Stealth);
        if(fly) skills.push(StageMonsterSkillType.Fly);
        this.monsterSkillTypes = skills;
        console.log("#debug monsterSkillTypes", skills);
        for(let i = 0; i < 5; i++) {
            const skillEle = this[`canvas_MonsterSkillDesc_${i+1}`] as mw.Canvas;
            console.log("#debug skillEle", skillEle);
            if(!skillEle) continue;
            if(i < skills.length) {
                const skillType = skills[i];
                Gtk.trySetVisibility(skillEle, mw.SlateVisibility.SelfHitTestInvisible);
                const btn: mw.Button = this[`btn_monsterSkill_${i+1}`]
                btn?.onClicked?.clear();
                btn?.onClicked?.add(() => {
                    this.selectedMonsterSkillIndex = i;
                    this.setMonsterSkillUI();
                })
            } else {
                Gtk.trySetVisibility(skillEle, mw.SlateVisibility.Collapsed);
            }
        }
        this.mMapImage.imageGuid = stageCfg.stageImageGuid;
        this.mStageName.text = `${stageCfg.stageName}`;
        let typeString = this.getEnemyTypeString(stageCfg.id);
        if (typeString.length == 0) {
            this.mMonsters.text = "";
        } else {
            this.mMonsters.text = GameConfig.Language.getElement("Text_SpecialEnemy").Value + `${typeString.join(" ")}`;
        }
    }
    setMonsterSkillUI() {
        for(let i = 0; i < this.monsterSkillTypes.length; i++) {
            const skillEle = this[`canvas_MonsterSkillDesc_${i+1}`] as mw.Canvas;
            skillEle.zOrder = i === this.selectedMonsterSkillIndex ? 1 : 0;
        }
    }
    getEnemyTypeString(stageCfgId: number) {
        // todo 这里要改
        let index = StageUtil.getWaveIndexFromId(stageCfgId);
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

    onShow(script: StageTrigger) {
        MGSTool.page("level");
        this._script = script;
        this.setDifficulty();
        TweenCommon.popUpShow(this.rootCanvas);
    }

    getRecommendElement(id: number) {
        const monsters = this.getFitEnemies(id);
        const elementIds = monsters.map((item) => {
            return item.elementTy;
        });
        // 转换成克制的
        const counterElementIds = [];
        for (let i = 0; i < elementIds.length; i++) {
            const counterId = this.findCounter(elementIds[i]);
            if(!counterElementIds.includes(counterId)) counterElementIds.push(counterId);
        }
        console.log(JSON.stringify(counterElementIds), "counterElementIds");
        return counterElementIds;
    }

    getFitEnemies(id: number): IMonsterElement[] {
        const allWaves = WaveUtil.getAllConfig(id);
        if (allWaves && Array.isArray(allWaves)) {
            const enemyIds: number[] = [];
            for (let i = 0; i < allWaves.length; i++) {
                const wave = allWaves[i];
                for (let j = 0; j < wave.enemies.length; j++) {
                    const enemy = wave.enemies[j];
                    enemyIds.push(enemy.type);
                }
            }
            const uniqueEnemyIds = [...new Set(enemyIds)];
            const allMonster = GameConfig.Monster.getAllElement();
            const monsters = allMonster.filter((item) => uniqueEnemyIds.includes(item.id));
            return monsters;
        }
        return [];
    }

    findCounter(element: ElementEnum): ElementEnum {
        for (const [key, value] of Object.entries(advantageMap)) {
            if (value === element) {
                return Number(key) as ElementEnum;
            }
        }
        throw new Error("Invalid element");
    }

    getMonsterBuff(id: number) {
        const monsters = this.getFitEnemies(id);
        let stealth = false;
        let fly = false;

        // 隐身 和 飞行读的老数据，types
        for (let i = 0; i < monsters.length; i++) {
            const monster = monsters[i];
            const types = monster.types;
            if (types && Array.isArray(types)) {
                for (let j = 0; j < types.length; j++) {
                    const type = types[j];
                    if (type === 1) {
                        stealth = true;
                    }
                    if (type === 2) {
                        fly = true;
                    }
                }
            }
        }
        const monsterBuffIds: number[] = [];
        for (let i = 0; i < monsters.length; i++) {
            const monster = monsters[i];
            const buffs = monster.buff;
            if (buffs && Array.isArray(buffs)) {
                for (let j = 0; j < buffs.length; j++) {
                    const buffId = buffs[j];
                    monsterBuffIds.push(buffId);
                }
            }
        }

        const allBuffs = GameConfig.Buff.getAllElement();
        const activeBuffs = allBuffs.filter((buff) => monsterBuffIds.includes(buff.id));
        let healing = false;
        let berserk = false;

        for (let i = 0; i < activeBuffs.length; i++) {
            const buff = activeBuffs[i];
            if (buff.healing > 0) {
                healing = true;
            }
            if (buff.berserk > 0) {
                berserk = true;
            }
        }
        return {
            stealth,
            fly,
            healing,
            berserk,
        };
    }
}
