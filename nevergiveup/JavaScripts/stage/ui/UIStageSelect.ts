import Gtk from "gtoolkit";
import { GameManager } from "../../GameManager";
import PlayerModuleData from "../../Modules/PlayerModule/PlayerModuleData";
import { PlayerUtil } from "../../Modules/PlayerModule/PlayerUtil";
import { NEW_STAGE_CONFIG } from "../../StageConfig";
import { TweenCommon } from "../../TweenCommon";
import { TipsManager } from "../../UI/Tips/CommonTipsManagerUI";
import Utils from "../../Utils";
import { GameConfig } from "../../config/GameConfig";
import { IMonsterElement } from "../../config/Monster";
import { GlobalData } from "../../const/GlobalData";
import { StageMonsterSkillType } from "../../const/enum";
import { ComponentFactory } from "../../enemy/components/ComponentFactory";
import { MGSTool } from "../../tool/MGSTool";
import { SoundUtil } from "../../tool/SoundUtil";
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
        if (this.stageCfgId) {
            this.index = difficulty;
            this.mdifficultly.text = `${this.difficulties[difficulty]}`;
            // this.mdifficultly.setFontColorByHex(this.difficultyColor[index]);
            const stageCfg = StageUtil.getStageCfgById(this.stageCfgId);
            this.unlocked = false;
            const firstClears = DataCenterC.getData(PlayerModuleData).firstClears;
            // const preDifficultyIds = StageUtil.getPreDifficultyIds(stageCfg);
            const preDifficultyIds = StageUtil.getPreDifficultyUniqueIds(stageCfg);
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
                // this.mRecommandedLevel.setFontColorByHex("#867160");
                // this.mRecommandedLevel.text =
                //     GameConfig.Language.getElement("Text_RecommendLevel").Value + `${stageCfg.recommandedLevel}`;
                this.mDifficultyImg.imageGuid = "420746";
                this.mdifficultly.setOutlineColorByHex("#412013");
                this.mdifficultly.setFontColorByHex("#FFFFFF");
            } else {
                // this.mRecommandedLevel.setFontColorByHex("#A1A1A1");
                // this.mRecommandedLevel.text = GameConfig.Language.getElement("Text_UnlockAfterLastDifficulty").Value;
                this.mDifficultyImg.imageGuid = "425722";
                this.mdifficultly.setOutlineColorByHex("#A08F82");
                this.mdifficultly.setFontColorByHex("#FFFEF8");
            }
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
            this._script.changeOwnerByClick(Player.localPlayer.playerId);
            setTimeout(() => {
                if (Utils.isLocalPlayer(this._ownerId)) {
                    const stageC = GameManager.getStageClient();
                    if (stageC) {
                        console.log("game is already exist");
                        // game is already exist
                    } else {
                        const res = this._script.startGame(Player.localPlayer.playerId);
                        if (res) SoundUtil.PlaySoundById(2011);
                    }
                } else {
                    TipsManager.showTips(GameConfig.Language.getElement("Text_StartHouseOwner").Value);
                }
            }, 1000);
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

    setPerfectImg(stageCfgId: number) {
        const firstPerfectClears = DataCenterC.getData(PlayerModuleData).firstPerfectClears;
        const cfg = StageUtil.getStageCfgById(stageCfgId);
        const unique = Number(cfg.index.toString() + cfg.difficulty.toString());
        console.log("#debug firstPerfectClears:" + firstPerfectClears + " stageCfgId:" + stageCfgId);
        if (firstPerfectClears.includes(unique)) {
            Gtk.trySetVisibility(this.imgPerfect, mw.SlateVisibility.Visible);
            Gtk.trySetVisibility(this.imgImperfect, mw.SlateVisibility.Collapsed);
        } else {
            Gtk.trySetVisibility(this.imgPerfect, mw.SlateVisibility.Collapsed);
            Gtk.trySetVisibility(this.imgImperfect, mw.SlateVisibility.Visible);
        }
    }

    setDifficulty() {
        let unlockMaxDifficultyIdx = 0;
        for (let i = 0; i < 3; i++) {
            let item: UIStageDifficulty;
            if (this._difficulty.length > i) {
                item = this._difficulty[i];
            } else {
                item = UIService.create(UIStageDifficulty);
                item.mDifficulty.onClicked.add(() => {
                    if (Utils.isLocalPlayer(this._ownerId)) {
                        if (item.unlocked) {
                            this._script.setDifficulty(Player.localPlayer.playerId, i);
                            this.setPerfectImg(item.stageCfgId);
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
            if (item.unlocked) unlockMaxDifficultyIdx = i;
        }
        setTimeout(() => {
            let initSelectDifficulty = 0; // 默认0 初始难度
            if (this._script.stageWorldIndex !== 5 && this._script.stageWorldIndex !== 6) {
                initSelectDifficulty = unlockMaxDifficultyIdx; // 选择已解锁的最高难度
            }
            this._script.setDifficulty(Player.localPlayer.playerId, initSelectDifficulty);
            const stageCfgId = StageUtil.getIdFromGroupIndexAndDifficulty(
                this._script.stageWorldIndex,
                this._script.stageGroupId,
                initSelectDifficulty
            );
            this.setPerfectImg(stageCfgId);
        }, 0);
    }

    setData(stageWorldIndex: number, difficulty: number, stageGroupId: number) {
        const stageCfg = StageUtil.getCfgFromGroupIndexAndDifficulty(stageWorldIndex, stageGroupId, difficulty);
        const stageCfgId = stageCfg.id;
        if (stageWorldIndex === 5 || stageWorldIndex === 6) {
            this._difficulty = [];
            this.mSelectDifficulty.removeAllChildren();
        }
        const elementIds = this.getRecommendElement(stageCfgId, stageWorldIndex);
        this.mCanvas_recoElements.removeAllChildren();
        for (const id of elementIds) {
            const icon = Image.newObject(this.mCanvas_recoElements, `element_${id}`) as Image;
            icon.size = new Vector2(40, 40);
            icon.imageGuid = GlobalData.Stage.stageRecommendElementIcon[id - 1];
        }
        const { stealth, fly, healing, berserk } = GlobalData.Stage.getWorldMonsterBuff(stageCfgId, stageWorldIndex);
        const skills: StageMonsterSkillType[] = [];
        if (healing) skills.push(StageMonsterSkillType.Healing);
        if (berserk) skills.push(StageMonsterSkillType.Berserk);
        if (stealth) skills.push(StageMonsterSkillType.Stealth);
        if (fly) skills.push(StageMonsterSkillType.Fly);

        if (skills?.length) {
            Gtk.trySetVisibility(this.can_Monster, mw.SlateVisibility.Visible);
            this.bg.size = new Vector2(444, 540);
        } else {
            Gtk.trySetVisibility(this.can_Monster, mw.SlateVisibility.Collapsed);
            this.bg.size = new Vector2(444, 372);
        }

        this.selectedMonsterSkillIndex = 0;
        this.monsterSkillTypes = skills;
        console.log("#debug monsterSkillTypes", skills);
        const len = skills?.length ?? 0;
        for (let i = 0; i < 5; i++) {
            const skillEle = this[`canvas_MonsterSkillDesc_${i + 1}`] as mw.Canvas;
            const textEle = this[`textMonsterSkill${i + 1}`] as mw.TextBlock;
            const textDescEle = this[`textMonsterSkillDesc${i + 1}`] as mw.TextBlock;

            console.log("#debug skillEle", skillEle);
            if (!skillEle || !textEle) continue;
            const isSelect = i === this.selectedMonsterSkillIndex;
            skillEle.zOrder = isSelect ? 1 : 0;
            textEle.setFontColorByHex(isSelect ? "#FFCB1C" : "#FFFFFF");
            if (i < len) {
                Gtk.trySetVisibility(skillEle, mw.SlateVisibility.SelfHitTestInvisible);
                const skillType = skills[i];
                const { title, desc } = GlobalData.Stage.getStageMonsterSkillInfo(skillType) ?? {};
                textEle.text = title;
                textDescEle.text = desc;
                const btn: mw.Button = this[`btn_monsterSkill_${i + 1}`];
                btn?.onClicked?.clear();
                btn?.onClicked?.add(() => {
                    this.selectedMonsterSkillIndex = i;
                    this.setMonsterSkillUI();
                });
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
        for (let i = 0; i < this.monsterSkillTypes.length; i++) {
            const skillEle = this[`canvas_MonsterSkillDesc_${i + 1}`] as mw.Canvas;
            const textEle = this[`textMonsterSkill${i + 1}`] as mw.TextBlock;
            const isSelect = i === this.selectedMonsterSkillIndex;
            skillEle.zOrder = isSelect ? 1 : 0;
            textEle.setFontColorByHex(isSelect ? "#FFCB1C" : "#FFFFFF");
        }
    }
    getEnemyTypeString(stageCfgId: number) {
        let index = StageUtil.getWaveIndexFromId(stageCfgId);
        let stageConfig = NEW_STAGE_CONFIG[index];
        let waves = stageConfig.waves;
        if (Array.isArray(waves)) {
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
        } else {
            return [];
        }
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
        if (this._script.stageWorldIndex === 5 || this._script.stageWorldIndex === 6) {
            this._difficulty = [];
            this.mSelectDifficulty.removeAllChildren();
            Gtk.trySetVisibility(this.imgImperfect, mw.SlateVisibility.Collapsed);
            Gtk.trySetVisibility(this.imgPerfect, mw.SlateVisibility.Collapsed);
        } else {
            this.setDifficulty();
        }
        TweenCommon.popUpShow(this.rootCanvas);
    }

    getRecommendElement(id: number, index: number) {
        // 如果是无尽模式，输出全部
        let monsters: IMonsterElement[] = [];
        if (index === 5 || index === 6) {
            monsters = GameConfig.Monster.getAllElement();
        } else {
            monsters = GlobalData.Stage.getFitEnemies(id);
        }

        const elementIds = monsters.map((item) => {
            return item.elementTy;
        });
        // 转换成克制的
        // const counterElementIds = [];
        // for (let i = 0; i < elementIds.length; i++) {
        //     const counterId = this.findEnemyCounter(elementIds[i]);
        //     if (!counterElementIds.includes(counterId)) counterElementIds.push(counterId);
        // }
        return [...new Set(elementIds)];
    }

    // getFitEnemies(id: number): IMonsterElement[] {
    //     const allWaves = WaveUtil.getAllConfig(id);
    //     if (allWaves && Array.isArray(allWaves)) {
    //         const enemyIds: number[] = [];
    //         for (let i = 0; i < allWaves.length; i++) {
    //             const wave = allWaves[i];
    //             for (let j = 0; j < wave.enemies.length; j++) {
    //                 const enemy = wave.enemies[j];
    //                 enemyIds.push(enemy.type);
    //             }
    //         }
    //         const uniqueEnemyIds = [...new Set(enemyIds)];
    //         const allMonster = GameConfig.Monster.getAllElement();
    //         const monsters = allMonster.filter((item) => uniqueEnemyIds.includes(item.id));
    //         return monsters;
    //     }
    //     return [];
    // }

    // findCounter(element: ElementEnum): ElementEnum {
    //     for (const [key, value] of Object.entries(advantageMap)) {
    //         if (value === element) {
    //             return Number(key) as ElementEnum;
    //         }
    //     }
    //     throw new Error("Invalid element");
    // }

    // getMonsterBuff(id: number, index: number) {
    //     if (index === 5 || index === 6) {
    //         return {
    //             stealth: true,
    //             fly: true,
    //             healing: true,
    //             berserk: true,
    //         };
    //     }
    //     const monsters = this.getFitEnemies(id);
    //     let stealth = false;
    //     let fly = false;

    //     // 隐身 和 飞行读的老数据，types
    //     for (let i = 0; i < monsters.length; i++) {
    //         const monster = monsters[i];
    //         const types = monster.types;
    //         if (types && Array.isArray(types)) {
    //             for (let j = 0; j < types.length; j++) {
    //                 const type = types[j];
    //                 if (type === 1) {
    //                     stealth = true;
    //                 }
    //                 if (type === 2) {
    //                     fly = true;
    //                 }
    //             }
    //         }
    //     }
    //     const monsterBuffIds: number[] = [];
    //     for (let i = 0; i < monsters.length; i++) {
    //         const monster = monsters[i];
    //         const buffs = monster.buff;
    //         if (buffs && Array.isArray(buffs)) {
    //             for (let j = 0; j < buffs.length; j++) {
    //                 const buffId = buffs[j];
    //                 monsterBuffIds.push(buffId);
    //             }
    //         }
    //     }

    //     const allBuffs = GameConfig.Buff.getAllElement();
    //     const activeBuffs = allBuffs.filter((buff) => monsterBuffIds.includes(buff.id));
    //     let healing = false;
    //     let berserk = false;

    //     for (let i = 0; i < activeBuffs.length; i++) {
    //         const buff = activeBuffs[i];
    //         if (buff.healing > 0) {
    //             healing = true;
    //         }
    //         if (buff.berserk > 0) {
    //             berserk = true;
    //         }
    //     }
    //     console.log(stealth, fly, healing, berserk, "stealth, fly, healing, berserk");

    //     return {
    //         stealth,
    //         fly,
    //         healing,
    //         berserk,
    //     };
    // }
}
