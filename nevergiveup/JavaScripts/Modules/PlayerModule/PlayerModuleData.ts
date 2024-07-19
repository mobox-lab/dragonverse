import { GameConfig } from "../../config/GameConfig";

/** 
 * @Author       : xiaohao.li
 * @Date         : 2024-01-04 09:25:32
 * @LastEditors  : xiaohao.li
 * @LastEditTime : 2024-01-08 18:57:50
 * @FilePath     : \nevergiveup\JavaScripts\Modules\PlayerModule\PlayerModuleData.ts
 * @Description  : 修改描述
 */
export type SumCount = {
    sum: number;
    daily: number;
}

export default class PlayerModuleData extends Subdata {
    @Decorator.persistence()
    gold: number;
    @Decorator.persistence()
    techPoint: number;
    @Decorator.persistence()
    firstPerfectClears: number[];
    @Decorator.persistence()
    firstClears: number[];
    @Decorator.persistence()
    completeStageCount: SumCount;
    @Decorator.persistence()
    killEnemyCount: SumCount;
    /** 第一次做某事 */
    @Decorator.persistence()
    firstAction: string[];
    @Decorator.persistence()
    exp: number;
    /**
     * 已解锁的科技点
     * @type {number[]}
     * @deprecated 改用天赋树
     */
    @Decorator.persistence()
    unlockedTechNodes: number[];
    // 攻击音效
    @Decorator.persistence()
    attackVoiceFactor: number;
    // bgm音量
    @Decorator.persistence()
    bgmVoiceFactor: number;
    @Decorator.persistence()
    firstMonsterTags: number[];


    protected initDefaultData(): void {
        this.gold = GameConfig.Global.getAllElement()[0].initialGold;
        this.techPoint = GameConfig.Global.getAllElement()[0].initialTechPoint;
        this.firstPerfectClears = [];
        this.firstClears = [];
        this.firstAction = [];
        this.firstMonsterTags = [];
        this.exp = 0;
        this.unlockedTechNodes = [];
        this.attackVoiceFactor = 1;
        this.bgmVoiceFactor = 1;
        this.completeStageCount = {
            sum: 0,
            daily: 0
        }
        this.killEnemyCount = {
            sum: 0,
            daily: 0
        }
    }

    protected onDataInit(): void {
        if (this.gold === undefined) this.gold = GameConfig.Global.getAllElement()[0].initialGold;;
        if (this.techPoint === undefined) this.techPoint = GameConfig.Global.getAllElement()[0].initialTechPoint;
        if (this.firstPerfectClears === undefined) this.firstPerfectClears = [];
        if (this.firstClears === undefined) this.firstClears = [];
        if (this.firstAction === undefined) this.firstAction = [];
        if (this.firstMonsterTags === undefined) this.firstMonsterTags = [];
        if (this.exp === undefined) this.exp = 0;
        if (this.unlockedTechNodes === undefined) this.unlockedTechNodes = [];
        if (this.completeStageCount === undefined) this.completeStageCount = {
            sum: 0,
            daily: 0
        }
        if (this.killEnemyCount === undefined) this.killEnemyCount = {
            sum: 0,
            daily: 0
        }
        if (this.attackVoiceFactor === undefined) this.attackVoiceFactor = 1;
        if (this.bgmVoiceFactor === undefined) this.bgmVoiceFactor = 1;
    }
}