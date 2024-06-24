export class WaveUtilConstant {
    static readonly PLUS_AMOUNT = 3; // 每个回合增加的小怪个数
    static readonly BLOOD_ROUND = 2; // 每bloodRound个回合增加怪物20%血量
    static readonly TYPE_ROUND = 4; // 每typeRound个回合增加一个种类的怪物
    static readonly BOSS_ROUND = 8; // 每bossRound个回合增加一个全新boss
    static readonly BOSS_BLOOD_ROUND = 4; //在boss刷新后，每bossBloodRound给boss增加 10%血量

    static readonly WAVE_TIME = 90;
    static readonly WAVE_GOLD = 100;
    static readonly HP_MULTIPLIER = 1;

    static readonly HP_PERCENT = 1.2;
    static readonly HP_BOSS_PERCENT = 1.1;
}
