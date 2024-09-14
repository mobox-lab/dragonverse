import { MapEx } from "odin";
import { IAchievementsElement } from "../../config/Achievements";
import { GameConfig } from "../../config/GameConfig";
import { GlobalEnum } from "../../const/Enum";
import { oTraceError } from "../../util/LogManager";
import { utils } from "../../util/uitls";
import { AreaDivideManager } from "../AreaDivide/AreaDivideManager";
import { TipsManager } from "../Hud/P_TipUI";
import AchievementData, { AchievementNew } from "./AchievementData";
import AchievementModuleS from "./AchievementModuleS";
import CompletedPanel from "./ui/CompletedPanel";
import Log4Ts from "mw-log4ts";


export default class AchievementModuleC extends ModuleC<AchievementModuleS, AchievementData> {
    private completedPanel: CompletedPanel = null;
    /**执行成就（参数成就类型-对应次数） */
    public onExecuteAchievementAction: Action2<GlobalEnum.AchievementType, number> = new Action2<GlobalEnum.AchievementType, number>();
    /**批量执行成就（参数成就类型-对应次数）*/
    public onExecuteAchievementActionBatch: Action2<GlobalEnum.AchievementType, number> = new Action2<GlobalEnum.AchievementType, number>();
    /**成就奖励事件 */
    public onAchievementRewardAction: Action3<number, GlobalEnum.AchievementReward, number> = new Action3<number, GlobalEnum.AchievementReward, number>();

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        // oTraceError("[AchievementModuleC--onStart]");
        this.initDatas();
        this.bindActions();
				mw.Event.addServerListener("FUSE_BROADCAST_ACHIEVEMENT_BLEND_TYPE",
					 this.broadcastAchievementBlendType
				);
				mw.Event.addServerListener("FUSE_BROADCAST_ACHIEVEMENT_CHANGE_TYPE",
					 this.broadcastAchievementChangeType
				);
				mw.Event.addServerListener("ENCHANT_BROADCAST_ACHIEVEMENT_ENCHANT_SPECIAL",
					 this.broadcastAchievementEnchantSpecial
				);
    }

    /**初始化数据 */
    private initDatas(): void {
        this.completedPanel = mw.UIService.getUI(CompletedPanel);
        this.initAchievements();
    }

    /**客户端维护一份数据 */
    private achievementStageC: MapEx.MapExClass<AchievementC> = {};

    protected onEnterScene(sceneType: number): void {
        this.getAchievementDataFromServer();
    }

    /**维护一个需要保存的成就数据 */
    private tempAchievementStage: MapEx.MapExClass<AchievementNew> = {};
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onUpdate(dt: number): void {
        this.saveAchievementToServer();
    }

    /**事件绑定 */
    private bindActions(): void {
        this.onExecuteAchievementAction.add(this.executeAchievementAction.bind(this));
        this.onExecuteAchievementActionBatch.add(this.executeAchievementActionBatch.bind(this));
        AreaDivideManager.instance.onAreaChangeAC.add((preId: number, curId: number) => {
            if (preId < 2000 && curId >= 2000) {
                this.onExecuteAchievementAction.call(GlobalEnum.AchievementType.ReachFantasyWorldNum, 1)
            }
        });

        this.onAchievementRewardAction.add(this.server.net_getAchievementReward.bind(this));
    }

    /**成就表数据 */
    private achievements: IAchievementsElement[] = [];
    /**根据难易程度分类 */
    private achievementGradeMap: Map<number, AchievementC[]> = new Map<number, AchievementC[]>();
    /**根据成就类型分类 */
    private achievementJudgeMap: Map<number, IAchievementsElement> = new Map<number, IAchievementsElement>();

    /**初始化成就数据 */
    private initAchievements(): void {
        this.achievements = GameConfig.Achievements.getAllElement();
        for (let i = 0; i < this.achievements.length; ++i) {
            let judge = this.achievements[i].Judge;
            if (this.achievementJudgeMap.has(judge)) continue;
            if (MapEx.has(this.data.AchievementStage, judge)) {
                let i = MapEx.get(this.data.AchievementStage, judge).i;
                this.achievementJudgeMap.set(judge, GameConfig.Achievements.getElement(i));
            }
            else {
                this.achievementJudgeMap.set(judge, this.achievements[i]);
            }
        }
        // oTraceError("[AchievementModuleC--initAchievements] achievementJudgeMap.size = ", this.achievementJudgeMap.size);
    }

    /**
     * 更新成就数据(根据成就类型分类)
     * @param i 成就ID
     * @returns 
     */
    private updateAchievementJudgeData(i: number): void {
        let tmpIAchievementsElement = GameConfig.Achievements.getElement(i);
        let judge = tmpIAchievementsElement.Judge;
        if (!this.achievementJudgeMap.has(judge)) return;
        let nextId = tmpIAchievementsElement.NextId;
        if (!nextId) return;
        this.achievementJudgeMap.set(judge, GameConfig.Achievements.getElement(nextId));
    }

    /**
     * 获取成就数据
     * @returns 返回根据（难易程度&完成进度排序）的成就数据
     */
    public getAchievementGradeMap(): Map<number, AchievementNew[]> {
        this.achievementGradeMap.clear();
        for (let [key, value] of this.achievementJudgeMap) {
            let grade = value.Grade;
            let arr: AchievementC[] = [];
            if (this.achievementGradeMap.has(grade)) {
                arr = this.achievementGradeMap.get(grade);
            }
            if (MapEx.has(this.achievementStageC, key)) {
                arr.push(MapEx.get(this.achievementStageC, key));
            }
            else {
                arr.push(new AchievementC(value.id, 0, false, [false, false, false, false]));
            }
            this.achievementGradeMap.set(grade, arr);
        }
        this.sortAchievementGradeMap();
        return this.achievementGradeMap;
    }

    /**
     * 排序（根据难易程度&完成进度排序）
     */
    private sortAchievementGradeMap(): void {
        for (let [key, value] of this.achievementGradeMap) {
            value.sort((a, b) => {
                let tragetNumB = GameConfig.Achievements.getElement(b.i).TragetNum;
                let tragetNumA = GameConfig.Achievements.getElement(a.i).TragetNum;
                return b.p / tragetNumB - a.p / tragetNumA;
            });
        }
        let arrayObj = Array.from(this.achievementGradeMap);
        arrayObj.sort((a, b) => {
            return a[0] - b[0];
        });
        this.achievementGradeMap = new Map<number, AchievementC[]>(arrayObj);
    }

    /**
     * 执行成就
     * @param achievementType 成就类型
     * @param num 完成的进度
     */
    private executeAchievementAction(achievementType: GlobalEnum.AchievementType, num: number): void {
        this.saveAchievementStage(achievementType, num);
    }
    /**
     * 批量执行成就
     * @param achievementType 成就类型
     * @param num 完成的进度
     */
    private executeAchievementActionBatch(achievementType: GlobalEnum.AchievementType, num: number): void {
        this.saveAchievementStageBatch(achievementType, num);
    }

    /**
     * 保存成就数据 - 批量的场景（如宠物批量开蛋）
     * @param achievementType 成就类型
     * @param num 本次增加的进度
     * @returns 
     */
    private saveAchievementStageBatch(achievementType: GlobalEnum.AchievementType, num: number): void {
        let hasOld = MapEx.has(this.achievementStageC, achievementType);
        let curAchievement: AchievementC | AchievementNew | null = hasOld ? MapEx.get(this.achievementStageC, achievementType) : null;
        let costNum = 0;
        // console.log("#ach " + JSON.stringify(curAchievement) + " hasOld:" + hasOld + " num:" + num + " costNum:" + costNum);
        if(!hasOld) {
            // 之前没有完成过该系列成就
            if (!this.achievementJudgeMap.has(achievementType)) {
                Log4Ts.error(AchievementC, "[成就类型为" + achievementType + "的成就不存在]");
                return;
            }
            const achievementCfg = this.achievementJudgeMap.get(achievementType);
            const targetNum = achievementCfg?.TragetNum;
            const aid = achievementCfg.id;
            const achievement = new AchievementNew(aid, 0, false);
            if (!targetNum) return;
            const needNum = targetNum;
            const leftNum = num - costNum;
            if(leftNum < needNum) {
                achievement.p = leftNum;
                achievement.o = false;
                costNum += leftNum;
            } else {
                achievement.p = 0;
                achievement.o = true;
                costNum += needNum;
            }
            this.saveAchievementStageC(aid, achievementType, achievement.p, achievement.o);
            this.achievementTips(aid, achievementType, achievement.p, targetNum, achievement.o);
            if(!achievement.o) {
                let tmpAchievement = new AchievementNew(aid, achievement.p, achievement.o);
                MapEx.set(this.tempAchievementStage, achievementType, tmpAchievement);
                // console.log("#temp tempAchievementStage:" + JSON.stringify(this.tempAchievementStage) + " count:" + MapEx.count(this.tempAchievementStage) + " tempAchievement:" + JSON.stringify(tmpAchievement));
                return;
            }
            const nextId = GameConfig.Achievements.getElement(aid)?.NextId;
            if(!nextId && achievement.o) {
                let tmpAchievement = new AchievementNew(aid, achievement.p, achievement.o);
                MapEx.set(this.tempAchievementStage, achievementType, tmpAchievement);
                // console.log("#temp tempAchievementStage:" + JSON.stringify(this.tempAchievementStage) + " count:" + MapEx.count(this.tempAchievementStage) + " tempAchievement:" + JSON.stringify(tmpAchievement));
                return;
            }
            curAchievement = new AchievementNew(nextId, 0, false);
        }
        while(costNum < num) {
            if(!curAchievement?.i) break;
            // 之前有完成过该系列成就
            const achievement = new AchievementNew(curAchievement.i, curAchievement.p, curAchievement.o);
            // console.log("#ach " + JSON.stringify(achievement));
            if (achievement.o) {
                Log4Ts.error(AchievementC, "[成就ID为" + achievement.i + "的成就已完成]");
                return;
            }
            const aid = achievement.i;
            const targetNum = GameConfig.Achievements.getElement(aid)?.TragetNum;
            if (!targetNum) break;
            const needNum = targetNum - achievement.p; // 5 - 2 = 3
            const leftNum = num - costNum;
            if(leftNum < needNum) { // 6 < 3
                achievement.p = achievement.p + leftNum;
                achievement.o = false;
                costNum += leftNum;
            } else {
                achievement.p = 0;
                achievement.o = true;
                costNum += needNum;
            }
            this.saveAchievementStageC(aid, achievementType, achievement.p, achievement.o);
            this.achievementTips(aid, achievementType, achievement.p, targetNum, achievement.o);
            const nextId = GameConfig.Achievements.getElement(aid).NextId;
            if(!achievement.o) {
                let tmpAchievement = new AchievementNew(aid, achievement.p, achievement.o);
                MapEx.set(this.tempAchievementStage, achievementType, tmpAchievement);
                // console.log("#temp tempAchievementStage:" + JSON.stringify(this.tempAchievementStage) + " count:" + MapEx.count(this.tempAchievementStage) + " tempAchievement:" + JSON.stringify(tmpAchievement));
                return;
            } 
            if(!nextId && achievement.o) {
                let tmpAchievement = new AchievementNew(aid, achievement.p, achievement.o);
                MapEx.set(this.tempAchievementStage, achievementType, tmpAchievement);
                // console.log("#temp tempAchievementStage:" + JSON.stringify(this.tempAchievementStage) + " count:" + MapEx.count(this.tempAchievementStage) + " tempAchievement:" + JSON.stringify(tmpAchievement));
                return;
            }
            curAchievement = new AchievementNew(nextId, 0, false);
            if(costNum >= num) {
                let tmpAchievement = curAchievement;
                MapEx.set(this.tempAchievementStage, achievementType, tmpAchievement);
                // console.log("#temp tempAchievementStage:" + JSON.stringify(this.tempAchievementStage) + " count:" + MapEx.count(this.tempAchievementStage) + " tempAchievement:" + JSON.stringify(tmpAchievement));
                return;
            }
        }
    }

    /**
     * 保存成就数据
     * @param achievementType 成就类型
     * @param num 完成的进度
     * @returns 
     */
    private saveAchievementStage(achievementType: GlobalEnum.AchievementType, num: number): void {
        let p = 0;
        let tragetNum = 0;
        let achievementId = 0;
        let o = false;
        if (MapEx.has(this.achievementStageC, achievementType)) {
            let achievement = MapEx.get(this.achievementStageC, achievementType);
            if (achievement.o) {
                oTraceError("[成就ID为" + achievement.i + "的成就已完成]");
                return;
            }
            else {
                p = achievement.p + num;
                tragetNum = GameConfig.Achievements.getElement(achievement.i).TragetNum;
                achievementId = achievement.i;
            }
        }
        else {
            if (!this.achievementJudgeMap.has(achievementType)) {
                oTraceError("[成就类型为" + achievementType + "的成就不存在]");
                return;
            }
            let achievementsElement = this.achievementJudgeMap.get(achievementType);
            p = num;
            tragetNum = achievementsElement.TragetNum;
            achievementId = achievementsElement.id;
        }
        o = (p >= tragetNum) ? true : false;
        if (o) p = 0;
        this.saveAchievementStageC(achievementId, achievementType, p, o);
        this.achievementTips(achievementId, achievementType, p, tragetNum, o);
        let tmpAchievement = new AchievementNew(achievementId, p, o);
        MapEx.set(this.tempAchievementStage, achievementType, tmpAchievement);
    }

    /**
     * 保存成就数据给服务器
     */
    private saveAchievementToServer(): void {
        try {
            if (MapEx.count(this.tempAchievementStage) <= 0) return;
            // oTraceError("[MapEx.count(this.tempAchievementStage)] A = " + MapEx.count(this.tempAchievementStage));
            let achievementTypes: number[] = [];
            let achIds: number[] = [];
            let progresss: number[] = [];
            let isOnCompletes: boolean[] = [];
            MapEx.forEach(this.tempAchievementStage, (key: number, value: AchievementNew) => {
                achievementTypes.push(key);
                achIds.push(value.i);
                progresss.push(value.p);
                isOnCompletes.push(value.o);
                MapEx.del(this.tempAchievementStage, key);
                //  oTraceError("[key] = " + key);
            });
            // console.log("#ach achIds:", JSON.stringify(achIds) + " achievementTypes:" + JSON.stringify(achievementTypes) + " progresss:" + JSON.stringify(progresss) + " isOnCompletes:" + JSON.stringify(isOnCompletes));
            this.server.net_saveAchievementStage(achIds, achievementTypes, progresss, isOnCompletes);
            //  oTraceError("[MapEx.count(this.tempAchievementStage)] B = " + MapEx.count(this.tempAchievementStage));
        } catch (error) {
            console.error("#achError [saveAchievementToServer] error = " + error);
        }
    }

    /**
     * 成就提示
     * @param achievementId 成就ID 
     * @param achievementType 成就类型
     * @param p 当前进度
     * @param tragetNum 目标数据
     * @param o 是否已完成
     * @returns 
     */
    private achievementTips(achievementId: number, achievementType: GlobalEnum.AchievementType, p: number, targetNum: number, o: boolean): void {
        try {        
            Log4Ts.log(AchievementModuleC, "[成就ID为" + achievementId + "的成就进度为" + p + "/" + targetNum + "]" + " a:" + JSON.stringify({achievementId, p, o, achievementType}));
            let currentValue = Number((p / targetNum).toFixed(2));
            if (o) {
                this.completedPanel.showCompletedTips(achievementId, o, p, targetNum, currentValue);
                this.updateAchievementJudgeData(achievementId);
                this.calculateRewardType(achievementId);
            }
            else {
                let isTips: boolean = true;
                let isTipsIndex: number = -1;
                let achievement = MapEx.get(this.achievementStageC, achievementType);
                if (currentValue >= 0.25 && currentValue < 0.5) {
                    isTips = achievement.isTips[0];
                    isTipsIndex = 0;
                }
                else if (currentValue >= 0.5 && currentValue < 0.75) {
                    isTips = achievement.isTips[1];
                    isTipsIndex = 1;
                }
                else if (currentValue >= 0.75 && currentValue < 0.9) {
                    isTips = achievement.isTips[2];
                    isTipsIndex = 2;
                }
                else if (currentValue >= 0.9 && currentValue < 1) {
                    isTips = achievement.isTips[3];
                    isTipsIndex = 3;
                }
                if (isTips || isTipsIndex == -1) return;
                achievement.isTips[isTipsIndex] = true;
                MapEx.set(this.achievementStageC, achievementType, achievement);
                this.completedPanel.showCompletedTips(achievementId, o, p, targetNum, currentValue);
            }        
        } catch (error) {
            console.error("#achError [achievementTip] error = " + error);
        }
    }

    /**
     * 计算奖励类型
     * @param achievementId 成就ID
     * @returns 
     */
    private calculateRewardType(achievementId: number): void {
        let achievementsElement = GameConfig.Achievements.getElement(achievementId);
        let rewardAmount: number = 0;
        let rewardType: GlobalEnum.AchievementReward = null;
        let tipsTxt = "";
        if (achievementsElement.CoinType) {
            switch (achievementsElement.CoinType) {
                case CoinType.FirstWorld:
                    rewardType = GlobalEnum.AchievementReward.FirstWorldGold;
                    break;
                case CoinType.SecondWorld:
                    rewardType = GlobalEnum.AchievementReward.SecondWorldGold;
                    break;
                case CoinType.ThirdWorld:
                    rewardType = GlobalEnum.AchievementReward.ThirdWorldGold;
                    break;
                default:
                    break;
            }
            tipsTxt = GameConfig.Language.Tips_gift_1.Value;
            rewardAmount = achievementsElement.CoinAward;
        }
        else if (achievementsElement.DMAward) {
            rewardType = GlobalEnum.AchievementReward.Diamond;
            rewardAmount = achievementsElement.DMAward;
            tipsTxt = GameConfig.Language.Tips_gift_2.Value;
        }
        else if (achievementsElement.BagAward) {
            rewardType = GlobalEnum.AchievementReward.BagExpand;
            rewardAmount = achievementsElement.BagAward;
            tipsTxt = GameConfig.Language.Achievement_Detail_27.Value;
        }
        else if (achievementsElement.PetAward) {
            rewardType = GlobalEnum.AchievementReward.PetExpand;
            rewardAmount = achievementsElement.PetAward;
            tipsTxt = GameConfig.Language.Tips_gift_3.Value;
        }
        if (rewardAmount == 0) return;
        this.onAchievementRewardAction.call(achievementId, rewardType, rewardAmount);
        TipsManager.instance.showTip(utils.Format(tipsTxt, rewardAmount));
    }

    /**临时存一份成就数据在客户端 */
    private getAchievementDataFromServer(): void {
        if (this.data.AchievementStage == null) return;
        let AchievementStage = this.data.AchievementStage;
        MapEx.forEach(AchievementStage, (key: number, value: AchievementNew) => {
            let achievement: AchievementC = null;;
            if (value.o) {
                achievement = new AchievementC(value.i, value.p, value.o, []);
            }
            else {
                let p = value.p;
                let tragetNum = GameConfig.Achievements.getElement(value.i).TragetNum;
                let currentValue = Number((p / tragetNum).toFixed(2));
                let index = 0;
                if (currentValue >= 0.25 && currentValue < 0.5) {
                    index = 0;
                }
                else if (currentValue >= 0.5 && currentValue < 0.75) {
                    index = 1;
                }
                else if (currentValue >= 0.75 && currentValue < 0.9) {
                    index = 2;
                }
                else if (currentValue >= 0.9 && currentValue < 1) {
                    index = 3;
                }
                let isTips: boolean[] = [];
                for (let i = 0; i <= index; ++i) {
                    isTips.push(true);
                }
                for (let i = index + 1; i < 4; ++i) {
                    isTips.push(false);
                }
                achievement = new AchievementC(value.i, value.p, value.o, isTips);
            }
            MapEx.set(this.achievementStageC, key, achievement)
        });
    }

    /**
     * 保存成就数据在客户端)
     * @param achievementId 成就ID
     * @param achievementType 成就类型
     * @param p 进度
     * @param o 是否完成
     */
    private saveAchievementStageC(achievementId: number, achievementType: GlobalEnum.AchievementType, p: number, o: boolean): void {
        let nextId = GameConfig.Achievements.getElement(achievementId).NextId;
        let achievement: AchievementC = null;
        if (MapEx.has(this.achievementStageC, achievementType)) {
            achievement = MapEx.get(this.achievementStageC, achievementType);
            if (o) {
                if (nextId != 0) {
                    achievement.i = nextId;
                    achievement.p = p;
                    achievement.o = false;
                    achievement.isTips = [false, false, false, false];
                }
                else {
                    achievement.o = true;
                }
            }
            else {
                achievement.p = p;
            }
        }
        else {
            if (o) {
                if (nextId != 0) {
                    achievement = new AchievementC(nextId, p, false, [false, false, false, false]);
                }
                else {
                    achievement = new AchievementC(achievementId, p, true, [true, true, true, true]);
                }
            }
            else {
                achievement = new AchievementC(achievementId, p, false, [false, false, false, false]);
            }
        }
        MapEx.set(this.achievementStageC, achievementType, achievement);
    }

    /**
     * 广播附魔出了 special 词条成就 43~45
     */
    public broadcastAchievementEnchantSpecial = () => {
        this.onExecuteAchievementAction.call(GlobalEnum.AchievementType.PetEnchantUniqueTagSuccessNum, 1);
        Log4Ts.log(AchievementModuleC, 'broadcastAchievementEnchantSpecial');
    }

    /**
     * 广播融合类型成就（融合成功数=9&融合传奇宠物数=20）
     * @param endPetId 融合后的宠物ID 
     */
    public broadcastAchievementBlendType = (endPetId: number) => {// TODO: 重构 AchievementModuleC.broadcastAchievementBlendType 到 S 端，主要是有个 C 端的toast 现在先用的 Event
        this.onExecuteAchievementAction.call(GlobalEnum.AchievementType.FusionNum, 1);//融合成功数
        let cfg = GameConfig.PetARR.getElement(endPetId);
        if (cfg.QualityType == GlobalEnum.PetQuality.Legend) {
            this.onExecuteAchievementAction.call(GlobalEnum.AchievementType.FusionLegendPetNum, 1);//融合传奇宠物数
        }
    }

    /**
     * 广播转化类型成就
     * @param endPetId 转化后的宠物ID
     * @param isSucc 是否成功
     * @param petIds 使用的宠物ID
     */
    public broadcastAchievementChangeType = (endPetId: number, isSucc: boolean, petIds: number[]): void => {
        this.broadcastAchievementType_Num(endPetId, isSucc);
        this.broadcastAchievementType_Only(endPetId, isSucc, petIds);
    }

    public net_broadcastAchievement_destroy(destroyType: GlobalEnum.DestructorType):void{
        this.broadcastAchievement_destory(destroyType);
    }
    /**
     * 广播成就破坏物
     * @param destoryType 破坏物类型
     */
    public broadcastAchievement_destory(destoryType: GlobalEnum.DestructorType): void {
        let achievementType: GlobalEnum.AchievementType = null;
        switch (destoryType) {
            case GlobalEnum.DestructorType.Diamond1:
            case GlobalEnum.DestructorType.Diamond2:
                achievementType = GlobalEnum.AchievementType.DestroyDiamondNum;
                break;
            case GlobalEnum.DestructorType.Gold1:
            case GlobalEnum.DestructorType.Gold2:
            case GlobalEnum.DestructorType.Gold3:
                achievementType = GlobalEnum.AchievementType.DestroyCoinNum;
                break;
            case GlobalEnum.DestructorType.Gold4:
                achievementType = GlobalEnum.AchievementType.DestroyGiftBoxNum;
                break;
            case GlobalEnum.DestructorType.Gold5:
            case GlobalEnum.DestructorType.Gold6:
                achievementType = GlobalEnum.AchievementType.DestroyBoxNum;
                break;
            case GlobalEnum.DestructorType.DesertBigBox:
                achievementType = GlobalEnum.AchievementType.DestroyDesertBigBoxNum;
                break;
            case GlobalEnum.DestructorType.HeavenBigBox:
                achievementType = GlobalEnum.AchievementType.DestroyHeavenBigBoxNum;
                break;
            default:
                break;
        }
        Log4Ts.log(AchievementModuleC, "[broadcastAchievement_destory] achievementType = " + achievementType + " destoryType = " + destoryType);
        this.onExecuteAchievementAction.call(achievementType, 1);
    }

    /**
     * 广播数量转化型成就（爱心转化成功数=7|爱心化失败数=10|彩虹化成功数=8）
     * @param endPetId 转化后的宠物ID
     * @param isSucce 是否成功
     */
    private broadcastAchievementType_Num(endPetId: number, isSucc: boolean): void {
        let petDevType = GlobalEnum.PetDevType;
        let petInfo = GameConfig.PetARR.getElement(endPetId);
        let achievementType: GlobalEnum.AchievementType = null;
        if (petInfo.DevType == petDevType.Love) {//爱心化
            achievementType = (isSucc) ? GlobalEnum.AchievementType.HeartTransformNum : GlobalEnum.AchievementType.HeartTransformFailNum;
        }
        else if (petInfo.DevType == petDevType.Rainbow) {//彩虹化
            if (isSucc) achievementType = GlobalEnum.AchievementType.RainbowTransformNum;
        }
        Log4Ts.log(AchievementModuleC, "broadcastAchievementType_Num_achievementType = " + achievementType);
        this.onExecuteAchievementAction.call(achievementType, 1);
    }

    /**
     * 广播唯一转化型成就（使用一只宠物爱心化成功=17|使用一只传说宠物爱心化成功=18|使用五只宠物爱心化失败=19|使用一只传奇宠物彩虹化成功=21）
     * @param endPetId 转化后的宠物ID
     * @param isSucc 是否成功
     * @param petIds 使用的宠物ID
     */
    private broadcastAchievementType_Only(endPetId: number, isSucc: boolean, petIds: number[]): void {
        Log4Ts.log(AchievementModuleC, "broadcastAchievementChangeType endPetId = " + endPetId + " isSucc = " + isSucc + " petIds.length = " + petIds.length);
        let achievementType: GlobalEnum.AchievementType = null;
        let petInfo = GameConfig.PetARR.getElement(endPetId);
        let petDevType = GlobalEnum.PetDevType;
        let petIdLenght = petIds.length;
        if (petIdLenght == 1 && isSucc && petInfo.DevType == petDevType.Love) {
            achievementType = GlobalEnum.AchievementType.UsePetToGoldSuccessNum;
            let prePetInfo = GameConfig.PetARR.getElement(petIds[0]);
            if (prePetInfo.QualityType == GlobalEnum.PetQuality.Legend) {
                achievementType = GlobalEnum.AchievementType.UseLegendPetToGoldSuccessNum;
            }
        }
        else if (petIdLenght == 5 && !isSucc && petInfo.DevType == petDevType.Love) {
            achievementType = GlobalEnum.AchievementType.UsePetToGoldFailNum;
        }
        else if (petIdLenght == 1 && isSucc && petInfo.DevType == petDevType.Rainbow) {
            let prePetInfo = GameConfig.PetARR.getElement(petIds[0]);
            if (prePetInfo.QualityType == GlobalEnum.PetQuality.Legend) {
                achievementType = GlobalEnum.AchievementType.UseLegendPetToRainbowSuccessNum;
            }
        }
        Log4Ts.log(AchievementModuleC, "broadcastAchievementChangeType = " + achievementType);
        this.onExecuteAchievementAction.call(achievementType, 1);
    }
}

/**金币类型 */
export enum CoinType {
    /**第一世界 */
    FirstWorld = 1,
    /**第二世界 */
    SecondWorld = 2,
    /**第三世界 */
    ThirdWorld = 3
}

export class AchievementC {
    /**成就id */
    i: number;
    /**进度 */
    p: number;
    /**是否完成 */
    o: boolean;
    /**是提示 */
    isTips: boolean[];

    constructor(i: number, p: number, o: boolean, isTips: boolean[]) {
        this.i = i;
        this.p = p;
        this.o = o;
        this.isTips = isTips;
    }
}