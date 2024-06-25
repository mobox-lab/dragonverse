export class WaveUtilConstant {
    /**
     * 这里是所有的默认值配置
     */
    static readonly PLUS_AMOUNT = 3; // 每个回合增加的小怪个数
    static readonly BLOOD_ROUND = 2; // 每bloodRound个回合增加怪物20%血量
    static readonly TYPE_ROUND = 4; // 每typeRound个回合增加一个种类的怪物
    static readonly BOSS_ROUND = 8; // 每bossRound个回合增加一个全新boss
    static readonly BOSS_BLOOD_ROUND = 4; //在boss刷新后，每bossBloodRound给boss增加 10%血量

    static readonly WAVE_TIME = 90; // 回合时间
    static readonly WAVE_GOLD = 100; // 回合结束后的奖励金币
    static readonly HP_MULTIPLIER = 1; // 基础血量

    static readonly HP_PERCENT = 1.2; // 每次增加的小怪血量 对应上面的BLOOD_ROUND的20% 就是1.2
    static readonly HP_BOSS_PERCENT = 1.1; // 每次增加的Boss血量 BOSS_BLOOD_ROUND的10% 就是1.1
}
