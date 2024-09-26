import CryptoJS from "crypto-js";
import GameServiceConfig from "../../const/GameServiceConfig";
import Log4Ts, { Announcer, MessageGetter } from "mw-log4ts";
import Gtk, { Expression } from "gtoolkit";
import { JModuleC, JModuleData, JModuleS } from "../../depend/jibu-module/JModule";
import noReply = mwext.Decorator.noReply;
import { GameConfig } from "../../config/GameConfig";
import { addGMCommand } from "mw-god-mod";
import { Regulator } from "gtoolkit";
import { Yoact } from "../../depend/yoact/Yoact";
import createYoact = Yoact.createYoact;
import UUID from "pure-uuid";

//#region TTD & GodMod

addGMCommand(
    "refresh temp token | Auth",
    "void",
    () => {
        mwext.ModuleService.getModule(AuthModuleC).queryTempToken();
    },
    undefined,
    undefined,
    "Root",
);

addGMCommand(
    "use temp token | Auth",
    "string",
    undefined,
    (player, params) => {
        mwext.ModuleService.getModule(AuthModuleS)["getP12Token"](player.userId, params);
    },
    undefined,
    "Root",
);

addGMCommand(
    "query access | Auth",
    "void",
    undefined,
    (player) => {
        mwext.ModuleService.getModule(AuthModuleS)["queryAccess"](player.userId);
    },
    undefined,
    "Root",
);

addGMCommand(
    "refresh currency | Auth",
    "void",
    () => {
        mwext.ModuleService.getModule(AuthModuleC).refreshCurrency();
    },
    undefined,
    undefined,
    "Root",
);

addGMCommand(
    "consume currency | Auth",
    "number",
    undefined,
    (player, params) => {
        mwext.ModuleService.getModule(AuthModuleS).consumeCurrency(
            player.userId,
            "pet",
            ConsumeId.CaptureBall,
            params === 0 ? 1 : params);
    },
    undefined,
    "Root",
);

addGMCommand(
    "refresh p12 bag | Auth",
    "void",
    undefined,
    (player) => {
        Log4Ts.log(AuthModuleS, `query user bag...`);
        mwext.ModuleService.getModule(AuthModuleS)
            .queryUserP12Bag(player.userId, "pet")
            .then((value) => {
                Log4Ts.log(AuthModuleS, `query dragon ball success.`, `user bag: ${JSON.stringify(value)}`);
            });
    },
    undefined,
    "Root",
);

addGMCommand(
    "query user dragon | Auth",
    "void",
    undefined,
    (player) => {
        Log4Ts.log(AuthModuleS, `query user dragon...`);
        mwext.ModuleService.getModule(AuthModuleS)
            .queryUserDragon(player.playerId)
            .then((value) => {
                Log4Ts.log(AuthModuleS, `query user dragon success.`, `user dragons: ${JSON.stringify(value)}`);
            });
    },
    undefined,
    "Root",
);

addGMCommand(
    "request catch dragon | Auth",
    "void",
    undefined,
    (player) => {
        Log4Ts.log(AuthModuleS, `try catch dragon...`);
        let allDragonConfig = GameConfig["Dragon"]?.getAllElement() ?? [];
        if (allDragonConfig.length === 0) {
            Log4Ts.warn(AuthModuleS, `there is no valid dragon config.`);
            return;
        }
        mwext.ModuleService.getModule(AuthModuleS)
            .requestWebCatchDragon(player.playerId,
                Gtk.randomArrayItem(allDragonConfig)["dragonPalId"],
                Date.now())
            .then((value) => {
                Log4Ts.log(AuthModuleS, `try catch dragon success.`, `user dragon ball: ${JSON.stringify(value)}`);
            });
    },
    undefined,
    "Root",
);

addGMCommand(
    "refresh stamina limit | Auth",
    "void",
    undefined,
    (player) => {
        Log4Ts.log(AuthModuleS, `query stamina limit...`);
        mwext.ModuleService.getModule(AuthModuleS)
            .queryRegisterStaminaLimit(player.userId, "pet")
            .then(() => {
                Log4Ts.log(
                    AuthModuleS,
                    `query stamina limit success.`,
                    `current stamina limit: ${mwext.ModuleService.getModule(AuthModuleS)
                        .playerStaminaLimitMap.get(
                            player.userId,
                        )}`,
                );
            });
    },
    undefined,
    "Root",
);

addGMCommand(
    "report ps | Auth",
    "void",
    undefined,
    (player) => {
        Log4Ts.log(AuthModuleS, `report ps rank data...`);
        mwext.ModuleService.getModule(AuthModuleS)
            .reportPetSimulatorRankData(player.playerId, "pig", 0, 999, Date.now(), undefined, 0)
            .then(() => {
                Log4Ts.log(AuthModuleS, `report ps rank data success.`);
            });
    },
    undefined,
    "Root",
);

addGMCommand(
    "report bw | Auth",
    "void",
    undefined,
    (player) => {
        Log4Ts.log(AuthModuleS, `report ps rank data...`);
        mwext.ModuleService.getModule(AuthModuleS)
            .reportBattleWorldRankData(player.playerId, 0, 999, 0)
            .then(() => {
                Log4Ts.log(AuthModuleS, `report bw rank data success.`);
            });
    },
    undefined,
    "Root",
);

addGMCommand(
    "report ps statistic | Auth",
    "void",
    undefined,
    (player) => {
        Log4Ts.log(AuthModuleS, `report ps statistic data...`);
        const d = DataCenterS.getData(player, AuthModuleData);
        mwext.ModuleService.getModule(AuthModuleS)
            .reportPetSimulatorStatistic(player.userId,
                {
                    diamond: 0,
                    diamondAdd: 0,
                    diamondRed: 0,
                    gold_1: 0,
                    gold_1_add: 0,
                    gold_1_red: 0,
                    gold_2: 0,
                    gold_2_add: 0,
                    gold_2_red: 0,
                    gold_3: 0,
                    gold_3_add: 0,
                    gold_3_red: 0,
                    login: 0,
                    logout: 0,
                    online: 0,
                    pet: [],
                    petAdd: 0,
                    petCnt: 0,
                    petMax: 0,
                    petMaxEnchanted: "",
                    petMaxEnchantScore: 0,
                    totalScore: 0,
                    staMax: 0,
                    staPotAdd: 0,
                    staPotCnt: 0,
                    staRed: 0,
                    stamina: 0,
                }, {address: d?.holdAddress ?? '', nickname: d?.holdNickName ?? ''})
            .then(() => {
                Log4Ts.log(AuthModuleS, `report ps statistic data success.`);
            });
    },
    undefined,
    "Root",
);

addGMCommand(
    "report bw statistic | Auth",
    "void",
    undefined,
    (player) => {
        Log4Ts.log(AuthModuleS, `report bw statistic data...`);
        mwext.ModuleService.getModule(AuthModuleS)
            .reportBattleWorldStatistic(player.userId,
                {
                    stamina: 0,
                    login: 0,
                    logout: 0,
                    online: 0,
                    staMax: 0,
                    staRed: 0,
                    staPotCnt: 0,
                    staPotAdd: 0,
                    gold: 0,
                    goldRed: 0,
                    goldAdd: 0,
                    weapon: "",
                    wing: "",
                    tail: "",
                    level: 0,
                    lvRed: 0,
                    lvAdd: 0,
                    killCnt: 0,
                    killNum: 0,
                    killed: 0,
                    pvpCnt: 0,
                },
            )
            .then(() => {
                Log4Ts.log(AuthModuleS, `report ps statistic data success.`);
            });
    },
    undefined,
    "Root",
);

addGMCommand(
    "refresh sensitive data | Auth",
    "void",
    undefined,
    (player) => {
        Log4Ts.log(AuthModuleS, `refresh sensitive data by user ${player.userId}...`);
        AuthModuleS.refreshSensitiveData();
    },
    undefined,
    "Root",
);
//#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

type DataUpgradeMethod<SD extends mwext.Subdata> = (data: SD) => void;

/**
 * Salt Token.
 *
 * ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟
 * ⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄
 * ⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄
 * ⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄
 * ⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
 * @author LviatYi
 * @font JetBrainsMono Nerd Font Mono https://github.com/ryanoasis/nerd-fonts/releases/download/v3.0.2/JetBrainsMono.zip
 * @fallbackFont Sarasa Mono SC https://github.com/be5invis/Sarasa-Gothic/releases/download/v0.41.6/sarasa-gothic-ttf-0.41.6.7z
 */
class SaltToken {
    public content: string;
    public time: number;

    constructor(content: string, time: number) {
        this.content = content;
        this.time = time;
    }
}

/**
 * 加密信息.
 */
interface EncryptedData {
    encryptData: string;
}

type ReqRegulatorType = "temp-token" | "stamina" | "currency";

type SceneName = "pet" | "fight" | "tower" | "dragon";

//#region Param Interface
/**
 * 一般用户场景相关请求参数.
 */
interface UserSceneReq {
    sceneId: string;
    sceneName: SceneName;
}

/**
 * 一般用户相关请求参数.
 */
interface UserDataReq extends UserSceneReq {
    userId: string;
    gameId: string;
}

/**
 * 一般用户统计相关请求参数.
 * @desc 如果某统计条目实际数据为内容是 ConfigId 的数组.
 * @desc 而上报时的类型为 string. 则应该转为 `id-名称,(id-名称)...`.
 */
interface UserStatisticReq<S extends object>
    extends UserDataReq {
    address: string;
    sceneName: SceneName;
    time?: number; // 目前只有宠物数组统计需要，判断赛季
    data: S;
}

/**
 * 一般查询返回数据.
 */
interface QueryResp<D = undefined> {
    code: number;
    message: "success" | string;
    data?: D;
}

/**
 * 查询 P12 Token 请求参数.
 */
interface GetTokenReq {
    /**
     * 临时 Token.
     */
    tempToken: string;
}

/**
 * 查询 P12 mdbl 币数量 返回值.
 */
interface QueryCurrencyRespData {
    /**
     * 钱包地址.
     */
    walletAddress: string,

    symbol: "mdbl",

    /**
     * 余额.
     */
    balance: string,

    chainId?: number,
}

/**
 * 商品 Id.
 */
export enum ConsumeId {
    CaptureBall = 1,
    DragonEgg = 2,
    StaminaPotion = 3,
}

/**
 * 消费 P12 mdbl 币 请求参数.
 */
interface ConsumeCurrencyReq extends UserSceneReq {
    /**
     * 全局唯一订单 id.
     */
    orderId: string;

    /**
     * 商品 Id.
     */
    consumeId: ConsumeId;

    /**
     * 购买次数.
     */
    buyCnt: number;

    /**
     * 时间戳. s
     */
    timestamp: number;

    action?: number;

    /**
     * 总价值.
     * @desc 未定.
     */
    price?: number;

    /**
     * 游戏发布所在的链Chain
     */
    gameId: string;
}

/**
 * 消耗 体力药水 请求参数.
 */
interface ConsumePotionReq extends UserDataReq {
    /**
     * 使用数量.
     */
    useAmount: number;
}

/**
 * 消耗 体力药水 返回值.
 */
interface ConsumePotionRespData {
    walletAddress: string,
    /**
     * 体力上限恢复时长预期. s
     */
    gameStaminaRecoverySec: number,
    /**
     * 当前体力上限.
     */
    stamina: number,
    /**
     * 剩余数量.
     */
    balance: number,
    /**
     * 回复量.
     */
    recoveryStaminaAmount: number,
}

/**
 * P12 Token 查询返回值.
 */
interface GetTokenRespData {
    /**
     * P12 Token.
     */
    accessToken: string;
}

/**
 * 体力上限查询返回值.
 */
interface QueryStaminaLimitRespData {
    /**
     * 钱包地址.
     */
    walletAddress: string;

    /**
     * 体力上限恢复时长预期. s
     */
    gameStaminaRecoverySec: number;

    /**
     * 体力上限.
     */
    stamina: number;
}

/**
 * 汇报 宠物模拟器排行榜 请求参数.
 */
interface UpdatePetSimulatorRankDataReq extends UserDataReq {
    userName: string;
    userAvatar: string;
    petName: string;
    petRarity: number;
    petOriginalAttack: number;
    petEnchantScore: number;
    round: number;
    /**
     * 宠物获得时间. s
     */
    recordTime: number;
}

/**
 * 汇报 无限乱斗排行榜 请求参数.
 */
interface UpdateBattleWorldRankDataReq extends UserDataReq {
    userName: string;
    userAvatar: string;
    grade: number;
    gradeOriginalPower: number;
    round: number;
    recordTime: number;
}

/**
 * 查询 用户 P12 背包 返回值.
 */
interface UserP12BagRespData {
    list: UserP12BagItem[];
}

/**
 * 用户 P12 背包物品 数据.
 * @desc resId 含义 注册于: {@link P12ItemId}
 */
interface UserP12BagItem {
    /**
     * P12 Item Id.
     */
    resId: P12ItemResId,

    /**
     * 可使用.
     */
    unuse: number,

    /**
     * 总发放.
     */
    total: number,

    /**
     * 未领取.
     */
    unclaim: number
}

/**
 * 抓取龙 请求参数.
 */
interface CatchDragonReq extends UserDataReq {
    /**
     * DragonId.
     */
    dragonPalId: number;

    /**
     * 客户端抓取时间. ms
     */
    catchTimeStamp: number;

    /**
     * 来源地.
     * @desc 游戏或场景
     */
    attributionType: "pge" | "game" | string;
}

/**
 * 抓取龙 返回值.
 */
interface CatchDragonRespData {
    /**
     * 是否 抓取成功.
     */
    isCaptureSuccessful: boolean,

    /**
     * 可使用.
     */
    unUsed: number
}

/**
 * 查询 用户龙 返回值.
 */
export interface UserDragonRespData {
    /**
     * 用户龙列表.
     */
    DragonPalList: {
        /**
         * DragonId.
         */
        dragonPalId: number;

        /**
         * 数量.
         */
        amount: number;

        /**
         * 抓取时间. ms
         */
        catchTimeStamp: number;

        /**
         * 是否休眠.
         */
        sleep: boolean;
    }[];
}

/**
 * 宠物模拟器 统计信息.
 */
interface PetSimulatorStatistic {
    user_id: string;
    address: string;
    nickname: string;
    device_id: string;

    /**
     * 上线时间. s
     */
    login: number;
    /**
     * 下线时间. s
     */
    logout: number;
    /**
     * 本次在线时长. s
     */
    online: number;
    /**
     * 当前体力.
     */
    stamina: number;
    /**
     * 体力上限.
     */
    staMax: number;
    /**
     * 本次体力消耗.
     */
    staRed: number;
    /**
     * 体力药水使用次数.
     */
    staPotCnt: number;
    /**
     * 体力药水增加体力.
     */
    staPotAdd: number;
    /**
     * 当前钻石.
     */
    diamond: number;
    /**
     * 本次钻石消耗.
     */
    diamondRed: number;
    /**
     * 本次钻石获取.
     */
    diamondAdd: number;
    /**
     * 本次世界 1 当前值.
     */
    gold_1: number;
    /**
     * 本次世界 1 消耗值.
     */
    gold_1_red: number;
    /**
     * 本次世界 1 增加值.
     */
    gold_1_add: number;
    /**
     * 本次世界 2 当前值.
     */
    gold_2: number;
    /**
     * 本次世界 2 消耗值.
     */
    gold_2_red: number;
    /**
     * 本次世界 2 增加值.
     */
    gold_2_add: number;
    /**
     * 本次世界 3 当前值.
     */
    gold_3: number;
    /**
     * 本次世界 3 消耗值.
     */
    gold_3_red: number;
    /**
     * 本次世界 3 增加值.
     */
    gold_3_add: number;
    /**
     * 本次增加宠物数量.
     */
    petAdd: number;
    /**
     * 当前宠物数量.
     */
    petCnt: number;
    /**
     * 最强战力.
     */
    petMax: number;
    /**
     * 最强战力宠物的附魔数组
     */
    petMaxEnchanted: string;
    /**
     * 最强战力宠物总附魔分数
     */
    petMaxEnchantScore: number;
    /**
     * 最强战力宠物总分 = petMax + petMaxEnchantScore
     */
    totalScore: number;
    pet: PetSimulatorStatisticPetObj[];
}

/**
 * 宠物模拟器 统计信息 宠物对象.
 */
export interface PetSimulatorStatisticPetObj {
    /**
     * 背包 Key.
     */
    petkey: number;
    /**
     * Config Id.
     */
    proId: number;
    name: string;
    attack: number;
    /**
     * 当前状态，销毁、存在.
     */
    status: "destroyed" | "exist";

    /**
     * 创建来源.
     * "删除" 为主动删除.
     * 其余为合成时被动删除.
     */
    creSource: "孵化" | "合成" | "爱心化" | "彩虹化" | "初始化";
    /**
     * 销毁来源.
     */
    desSource: "删除" | "合成" | "爱心化" | "彩虹化" | "";

    /**
     * 创建时间.
     */
    create: number;
    /**
     * 更新时间.
     * 任何触发以上属性更新的操作都应更新这个时间.
     */
    update: number;
    /**
     * 附魔信息.
     */
    enchanted: string;
}

/**
 * 无限乱斗 统计信息.
 */
interface BattleWorldStatistic {
    user_id: string;
    address: string;
    nickname: string;
    device_id: string;

    /**
     * 上线时间. s
     */
    login: number;
    /**
     * 下线时间. s
     */
    logout: number;
    /**
     * 本次在线时长. s
     */
    online: number;
    /**
     * 当前体力.
     */
    stamina: number;
    /**
     * 体力上限.
     */
    staMax: number;
    /**
     * 本次体力消耗.
     */
    staRed: number;
    /**
     * 体力药水使用次数.
     */
    staPotCnt: number;
    /**
     * 体力药水增加体力.
     */
    staPotAdd: number;
    /**
     * 当前金币值.
     */
    gold: number;
    /**
     * 本次消耗值.
     */
    goldRed: number;
    /**
     * 本次增加值.
     */
    goldAdd: number;
    /**
     * 已解锁的武器，array 也行.
     */
    weapon: string;
    /**
     * 已解锁的翅膀，array 也行.
     */
    wing: string;
    /**
     * 已解锁的拖尾，array 也行.
     */
    tail: string;
    /**
     * 当前段位分.
     */
    level: number;
    /**
     * 本次段位分减少.
     */
    lvRed: number;
    /**
     * 本次段位分增加.
     */
    lvAdd: number;
    /**
     * 本次击杀数量， 含小丑.
     */
    killCnt: number;
    /**
     * 本次击杀数量，不包含小丑.
     */
    killNum: number;
    /**
     * 本次被击杀.
     */
    killed: number;
    /**
     * 本次参战次数.
     */
    pvpCnt: number;
}

/**
 * TD塔防 统计信息.
 */
interface TDStatistic {
    user_id: string;
    address: string;
    nickname: string;
    device_id: string;

    login: number;   // 上线时间
    logout: number;  // 下线时间 不准
    online: number;  // 本次在线时长 不准
    
    stamina: number;  // 当前体力
    staMax: number;   // 体力上限
    staRed: number;   // 本次体力消耗
    
    staPotCnt: number;  // 体力药水使用次数
    staPotAdd: number;  // 体力药水增加体力
    
    // level: number;    // 当前等级
    // expAdd: number;   // 本次经验获得
    // scoreMax: string; // 最好成绩 round - 击杀血量比重
    
    // gold: number;    // 当前金币
    // goldRed: number; // 本次金币消耗
    // goldAdd: number; // 本次金币获取
    
    // technology: number;    // 当前科技点
    // technologyAdd: number; // 本次获得科技点
    // technologyRed: number; // 本次消耗科技点

    // talentCnt: number;   // 已解锁天赋数量
    // talent: { [key: number]: number };      // 已解锁赋天赋详情 {"1001":2,"1002":1}
    // talentAdd: { [key: number]: number };   // 本次解锁天赋详情
    
    // talentGold: number; // 本次天赋金币消耗
    // talentTech: number; // 本次天赋科技消耗
   
    // towerCnt: number; // 已解锁塔数量 4
    // tower: number[];     // 已解锁塔详情 [1001, 1004, 1005, 1024]
    // towerAdd: number[];  // 本次解锁塔详情 [1001，1004]
    // towerGold: number; // 本次解锁塔金币消耗
    
    // mainCnt: number;  // 本次完成主线
    // dailyCnt: number; // 本次完成日常
    // taskOk: number[];   // 本次完成 任务ID [10001,10002,10003]
    // taskRes: { [key: number]: string, t: number }[]; // 本次任务完成详情 [ {10001: "res", t:123456479} ] 任务ID : 奖励
    
    // taskGold: number; // 本次任务金币获得
    // taskTech: number; // 本次任务科技获得
    // taskExp: number;  // 本次任务经验获得
}

/**
 * 自动填充属性.
 */
type AutoFillProps = {
    user_id: string;
    address: string;
    nickname: string;
    device_id: string;
}

/**
 * 待填充的 宠物模拟器 统计信息.
 */
export type PetSimulatorStatisticNeedFill = {
    [K in keyof Omit<PetSimulatorStatistic, keyof AutoFillProps>]: NonNullable<PetSimulatorStatistic[K]>;
};

/**
 * 待填充的 无限乱斗 统计信息.
 */
export type BattleWorldStatisticNeedFill = {
    [K in keyof Omit<BattleWorldStatistic, keyof AutoFillProps>]: NonNullable<BattleWorldStatistic[K]>;
};

/**
 * 待填充的 TD塔防 统计信息.
 */
export type TDStatisticNeedFill = {
    [K in keyof Omit<TDStatistic, keyof AutoFillProps>]: NonNullable<TDStatistic[K]>;
};


/**
 * P12 物品 ID 映射枚举表.
 */
export enum P12ItemResId {
    /**
     * 精灵球
     */
    CaptureBall = "10001",

    /**
     * 龙蛋
     */
    DragonEgg = "10002",

    /**
     * 体力药水
     */
    StaminaPotion = "10003",
}

//#endregion

export default class AuthModuleData extends JModuleData {
    /**
     * 已经发布的正式数据版本号.
     * @desc 以版本发布时间 升序排列.
     * @desc 定义为符号 RV.
     * @desc bitwise readonly.
     */
    protected get releasedVersions(): number[] {
        return [
            2024510151409,
        ];
    }

    /**
     * 版本升级办法.
     * UVM[n] : 从 RV[n] 升级到 RV[n+1] 的方法.
     */
    protected get updateVersionMethod(): DataUpgradeMethod<this>[] {
        return [
            // (data) => {
            // },
        ];
    }

    @Decorator.persistence()
    public holdUserId: string;

    @Decorator.persistence()
    public holdPlayerId: number;

    @Decorator.persistence()
    public holdNickName: string;

    @Decorator.persistence()
    public holdAddress: string;

    @Decorator.persistence()
    public lastVisitSceneId: string;
}

/**
 * Auth Module.
 * 用户认证模块.
 *
 * @desc **认证 (Auth)** 模块用于用户 Code 验证，验证以开放 **权限**。
 * @desc
 * @desc Auth 通过 Https 通信向远端验证 api，这需要与服务端配合。
 * @desc
 * @desc **权限** 是一组状态、物品或功能的集合，其能够被 **给予** 或 **收回**，分别对应两种行为，其拥有其他任何模块的物品及状态的增删能力。
 * @desc ---
 * ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟
 * ⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄
 * ⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄
 * ⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄
 * ⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
 * @author LviatYi
 * @font JetBrainsMono Nerd Font Mono https://github.com/ryanoasis/nerd-fonts/releases/download/v3.0.2/JetBrainsMono.zip
 * @fallbackFont Sarasa Mono SC https://github.com/be5invis/Sarasa-Gothic/releases/download/v0.41.6/sarasa-gothic-ttf-0.41.6.7z
 */
export class AuthModuleC extends JModuleC<AuthModuleS, AuthModuleData> {
//#region Member
    private _originToken: string = null;

    private _requestRegulator: Regulator = new Regulator(GameServiceConfig.REPORT_REQUEST_WAIT_TIME);

    /**
     * mdbl 币.
     * @type {{count: string | undefined}}
     */
    public currency: { count: string | undefined } = createYoact({count: undefined});

    /**
     * 是否 处于白名单.
     * @type {boolean|undefined}
     */
    public access: boolean | undefined = undefined;

//#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

//#region MetaWorld Event
    protected onAwake(): void {
        super.onAwake();
    }

    protected onJStart(): void {
        //#region Member init
        //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

        //#region Event Subscribe
        this.heartbeatC();
        //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
    }

    protected onUpdate(dt: number): void {
        super.onUpdate(dt);
    }

    protected onEnterScene(sceneType: number): void {
        super.onEnterScene(sceneType);
        this.server.net_initPlayerData(AccountService.getNickName());
        this.server.net_getToken().then((value) => {
            this._originToken = value;
        });

        this.queryTempToken();
    }

    protected onDestroy(): void {
        super.onDestroy();
        //#region Event Unsubscribe
        //#endregion ------------------------------------------------------------------------------------------
    }

    protected onExecute(type: number, ...params: any[]): void {
        super.onExecute(type, ...params);
    }

//#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

//#region Method
    public queryTempToken() {
        if (!this._requestRegulator.request()) return;

        const handler: HttpResponse = (result, content, responseCode) => {
            if (result && responseCode === 200) {
                const resp = JSON.parse(content) as QueryResp;
                if (Gtk.isNullOrEmpty(resp.data)) {
                    Log4Ts.warn(AuthModuleC, `get an invalid temp token. content: ${content}.`);
                } else {
                    Log4Ts.log(AuthModuleC, `get temp token. token: ${resp.data}.`);
                    this.reportTempToken(resp.data);
                }
            } else {
                Log4Ts.log(AuthModuleC, `receive an invalid response. code: ${responseCode}. content: ${content}.`);
            }
        };

        Log4Ts.log(AuthModuleC, `trying to query temp token.`);
        generalHttpRequest(handler, HttpRequestURL.CobblestoneService,
            AuthModuleS.GET_MW_TEMP_TOKEN_URI,
            "",
            HttpRequestType.Post);
    }

    public reportTempToken(token: string) {
        this.server.net_reportTempToken(token);
    }

    public refreshCurrency() {
        if (!this._requestRegulator.request()) return;
        this.server.net_refreshCurrency();
    }

    private heartbeatC() {
        Event.addServerListener(GameServiceConfig.HEARTBEAT_KIND, (sentTime: number) => {
            Event.dispatchToServerUnreliable(GameServiceConfig.HEARTBEAT_KIND, sentTime);
        });
    }

//#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

//#region Net Method
    public net_refreshToken() {
        this.queryTempToken();
    }

    public net_setCurrency(val: string) {
        this.currency.count = val;
    }

    public net_refreshAccess(access: boolean) {
        this.access = access;
    }

//#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
}

export class AuthModuleS extends JModuleS<AuthModuleC, AuthModuleData> {
//#region Constant
    /**
     * 验证时间容差.
     * 容差范围内的时间允许通过验证.
     * @private
     */
    private static readonly TIME_TOLERATE: number = 1e3 * 10;

    private static readonly INVALID_SCENE_ID = "INVALID_SCENE_ID";

    /**
     * 获取 MW 临时 token Uri.
     * @type {string}
     * @private
     */
    public static readonly GET_MW_TEMP_TOKEN_URI = "sso/universal/user/v1/get/temp/token";

    /**
     * 测试用 P12 端 域名.
     */
    private static readonly TEST_P12_DOMAIN = "https://modragon-api-test.mobox.app";

    /**
     * 发布用 P12 端 域名.
     */
    private static readonly RELEASE_P12_DOMAIN = "https://modragon-api.mobox.app";

    /**
     * 获取 P12 token Uri.
     * @private
     */
    private static readonly GET_P12_TOKEN_URI = "/pge-game/sso/oauth/gpark";

    /**
     * 获取 P12 token Uri.
     * @private
     */
    private static readonly GET_P12_ACCESS_URI = "/pge-game/stamina/whitelist-game";

    /**
     * 查询 体力上限 Uri.
     * @private
     */
    private static readonly STAMINA_LIMIT_URI = "/pge-game/stamina/obtain-in-game";

    /**
     * 查询货币余额 Uri.
     */
    private static readonly GET_CURRENCY_URI = "/user-fund/balance";

    /**
     * 消费货币 Uri.
     */
    private static readonly CONSUME_CURRENCY_URI = "/pge-game/consume";

    /**
     * 消耗体力药水 Uri.
     */
    private static readonly POTION_USE_URI = "/pge-game/stamina/potion-use";

    /**
     * 汇报 宠物模拟器排行榜 Uri.
     * @private
     */
    private static readonly P_S_RANK_REPORT_URI = "/pge-game/rank/pet/update";

    /**
     * 汇报 无限乱斗排行榜 Uri.
     * @private
     */
    private static readonly B_W_RANK_REPORT_URI = "/pge-game/rank/fight/update";

    /**
     * 汇报 统计信息 Uri.
     * @private
     */
    private static readonly STATISTIC_REPORT_URI = "/pge-client-log/add";

    /**
     * 宠物汇报 统计信息 Uri.
     * @private
     */
    private static readonly PET_STATISTIC_REPORT_URI = "/pge-client-log/pet";

    /**
     * 查询 用户 P12 背包 Uri.
     * @private
     */
    private static readonly QUERY_USER_P12_BAG_URI = "/pge-game/dragon-verse-assets/game-user-asset";

    /**
     * 请求 抓龙 Uri.
     * @private
     */
    private static readonly CATCH_DRAGON_URI = "/pge-game/dragon-verse-pal/get-pal";

    /**
     * 查询 用户背包龙 Uri.
     * @private
     */
    private static readonly QUERY_USER_DRAGON_URI = "/pge-game/dragon-verse-pal/get-user-dragon-pal";

    /**
     * 测试用 token.
     * @type {string}
     * @private
     */
    private static readonly TEST_TOKEN = "TEST_TOKEN";

    /**
     * 测试用 getToken Url.
     * @private
     */
    private static get TEST_GET_P12_TOKEN_URL() {
        return this.TEST_P12_DOMAIN + this.GET_P12_TOKEN_URI;
    }

    /**
     * 发布用 getToken Url.
     * @private
     */
    private static get RELEASE_GET_P12_TOKEN_URL() {
        return this.RELEASE_P12_DOMAIN + this.GET_P12_TOKEN_URI;
    }

    /**
     * 测试用 白名单验证 Url.
     * @private
     */
    private static get TEST_GET_P12_ACCESS_URL() {
        return this.TEST_P12_DOMAIN + this.GET_P12_ACCESS_URI;
    }

    /**
     * 发布用 白名单验证 Url.
     * @private
     */
    private static get RELEASE_GET_P12_ACCESS_URL() {
        return this.RELEASE_P12_DOMAIN + this.GET_P12_ACCESS_URI;
    }

    /**
     * 测试用 查询货币余额 Url.
     * @private
     */
    private static get TEST_GET_CURRENCY_URL() {
        return this.TEST_P12_DOMAIN + this.GET_CURRENCY_URI;
    }

    /**
     * 发布用 查询货币余额 Url.
     * @private
     */
    private static get RELEASE_GET_CURRENCY_URL() {
        return this.RELEASE_P12_DOMAIN + this.GET_CURRENCY_URI;
    }

    /**
     * 测试用 消费货币 Url.
     * @private
     */
    private static get TEST_CONSUME_CURRENCY_URL() {
        return this.TEST_P12_DOMAIN + this.CONSUME_CURRENCY_URI;
    }

    /**
     * 发布用 消费货币 Url.
     * @private
     */
    private static get RELEASE_CONSUME_CURRENCY_URL() {
        return this.RELEASE_P12_DOMAIN + this.CONSUME_CURRENCY_URI;
    }

    /**
     * 测试用 消耗体力药水 Url.
     * @private
     */
    private static get TEST_POTION_USE_URL() {
        return this.TEST_P12_DOMAIN + this.POTION_USE_URI;
    }

    /**
     * 发布用 消耗体力药水 Url.
     * @private
     */
    private static get RELEASE_POTION_USE_URL() {
        return this.RELEASE_P12_DOMAIN + this.POTION_USE_URI;
    }

    /**
     * 测试用 查询 用户 P12 背包 Url.
     */
    private static get TEST_QUERY_USER_P12_BAG_URL() {
        return this.TEST_P12_DOMAIN + this.QUERY_USER_P12_BAG_URI;
    }

    /**
     * 发布用 查询 用户 抓根宝 信息 Url.
     */
    private static get RELEASE_QUERY_USER_P12_BAG_URL() {
        return this.RELEASE_P12_DOMAIN + this.QUERY_USER_P12_BAG_URI;
    }

    /**
     * 测试用 请求 抓龙 Url.
     */
    private static get TEST_CATCH_DRAGON_URL() {
        return this.TEST_P12_DOMAIN + this.CATCH_DRAGON_URI;
    }

    /**
     * 发布用 请求 抓龙 Url.
     */
    private static get RELEASE_CATCH_DRAGON_URL() {
        return this.RELEASE_P12_DOMAIN + this.CATCH_DRAGON_URI;
    }

    /**
     * 测试用 查询 用户背包龙 Url.
     */
    private static get TEST_QUERY_USER_DRAGON_URL() {
        return this.TEST_P12_DOMAIN + this.QUERY_USER_DRAGON_URI;
    }

    /**
     * 发布用 查询 用户背包龙 Url.
     */
    private static get RELEASE_QUERY_USER_DRAGON_URL() {
        return this.RELEASE_P12_DOMAIN + this.QUERY_USER_DRAGON_URI;
    }

    /**
     * 测试用 体力上限查询 Url.
     */
    private static get TEST_STAMINA_LIMIT_URL() {
        return this.TEST_P12_DOMAIN + this.STAMINA_LIMIT_URI;
    }

    /**
     * 发布用 体力上限查询 Url.
     */
    private static get RELEASE_STAMINA_LIMIT_URL() {
        return this.RELEASE_P12_DOMAIN + this.STAMINA_LIMIT_URI;
    }

    /**
     * 测试用 汇报 宠物模拟器排行榜 Url.
     */
    private static get TEST_P_S_RANK_REPORT_URL() {
        return this.TEST_P12_DOMAIN + this.P_S_RANK_REPORT_URI;
    }

    /**
     * 发布用 汇报 宠物模拟器排行榜 Url.
     */
    private static get RELEASE_P_S_RANK_REPORT_URL() {
        return this.RELEASE_P12_DOMAIN + this.P_S_RANK_REPORT_URI;
    }

    /**
     * 测试用 汇报 无限乱斗排行榜 Url.
     */
    private static get TEST_B_W_RANK_REPORT_URL() {
        return this.TEST_P12_DOMAIN + this.B_W_RANK_REPORT_URI;
    }

    /**
     * 发布用 汇报 无限乱斗排行榜 Url.
     */
    private static get RELEASE_B_W_RANK_REPORT_URL() {
        return this.RELEASE_P12_DOMAIN + this.B_W_RANK_REPORT_URI;
    }

    /**
     * 测试用 汇报 游戏统计信息 Url.
     */
    private static get TEST_STATISTIC_REPORT_URL() {
        return this.TEST_P12_DOMAIN + this.STATISTIC_REPORT_URI;
    }

    /**
     * 发布用 汇报 游戏统计信息 Url.
     */
    private static get RELEASE_STATISTIC_REPORT_URL() {
        return this.RELEASE_P12_DOMAIN + this.STATISTIC_REPORT_URI;
    }

    /**
     * 测试用 汇报 游戏统计信息 Url.
     */
    private static get TEST_PET_STATISTIC_REPORT_URL() {
        return this.TEST_P12_DOMAIN + this.PET_STATISTIC_REPORT_URI;
    }

    /**
     * 发布用 汇报 游戏统计信息 Url.
     */
    private static get RELEASE_PET_STATISTIC_REPORT_URL() {
        return this.RELEASE_P12_DOMAIN + this.PET_STATISTIC_REPORT_URI;
    }

    /**
     * encrypt token with time salt.
     * @param token
     * @param saltTime
     */
    public static encryptToken(token: string, saltTime: number): string {
        if (Gtk.isNullOrEmpty(token)) {
            Log4Ts.log({name: "AuthModule"}, `token is empty when encrypt.`);
            return null;
        }
        //TODO_LviatYi encrypt token with time salt
        const saltTimeStr = saltTime.toString();
        return (
            saltTimeStr.substring(0, saltTimeStr.length / 2) +
            token +
            saltTimeStr.substring(saltTimeStr.length / 2, saltTimeStr.length)
        );
    }

    /**
     * decrypt token with time salt.
     * @param saltToken
     * @param saltTime
     */
    public static decryptToken(saltToken: string, saltTime: number): string {
        if (Gtk.isNullOrEmpty(saltToken)) {
            return null;
        }
        //TODO_LviatYi decrypt token with time salt
        const saltTimeStr = saltTime.toString();
        const token = saltToken.substring(saltTimeStr.length / 2, saltToken.length - saltTimeStr.length / 2);
        const timeStr =
            saltToken.substring(0, saltTimeStr.length / 2) +
            saltToken.substring(saltToken.length - saltTimeStr.length / 2, saltToken.length);

        return timeStr === saltTime.toString() ? token : null;
    }

//#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

//#region Member
    private _userRequestRegulatorMap: Map<string, Map<ReqRegulatorType, number>> = new Map();

    /**
     * 玩家体力上限表.
     */
    public playerStaminaLimitMap: Map<string, number> = new Map();

    /**
     * 玩家体力恢复预期时长表. s
     */
    public playerStaminaRecoveryMap: Map<string, number> = new Map();

    /**
     * 用户货币表.
     */
    public userCurrencyMap: Map<string, string> = new Map();

    /**
     * 用户 PS 上报函数.
     * @type {Map<string, () => void>}
     */
    public userPSRankDataReporter: Map<string, (requestParam: UpdatePetSimulatorRankDataReq) => void> = new Map();

    /**
     * 用户 BW 上报函数.
     * @type {Map<string, () => void>}
     */
    public userBWRankDataReporter: Map<string, (requestParam: UpdateBattleWorldRankDataReq) => void> = new Map();

    /**
     * @type {Map<string, string>} key: userId, value: token.
     * @private
     */
    private _tokenMap: Map<string, string> = new Map();

    /**
     * @type {Map<string, Regulator>} key: userId, value: Regulator.
     * @private
     */
    private _expiredRegulatorMap: Map<string, Regulator> = new Map();

//#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

//#region MetaWorld Event
    protected onAwake(): void {
        super.onAwake();
    }

    protected onJStart(): void {
        //#region Member init
        AuthModuleS.getSensitiveData();
        //#endregion ------------------------------------------------------------------------------------------

        //#region Event Subscribe
        this.heartbeatS();
        //#endregion ------------------------------------------------------------------------------------------
    }

    protected onUpdate(dt: number): void {
        super.onUpdate(dt);

        //定时检测
        // if (this._patrolRegulator.ready()) {
        //     Player.getAllPlayers().forEach(player => {
        //         this.initiativePatrol(player.playerId);
        //     });
        // }
    }

    protected onDestroy(): void {
        super.onDestroy();
        //#region Event Unsubscribe
        //#endregion ------------------------------------------------------------------------------------------
    }

    protected onExecute(type: number, ...params: any[]): void {
        super.onExecute(type, ...params);
    }

    protected onPlayerJoined(player: Player): void {
        super.onPlayerJoined(player);
        this.userPSRankDataReporter.set(this.queryUserId(player.playerId), (requestParam) => {
            this.innerReportPetSimulatorRankData(requestParam);
        });
        this.userBWRankDataReporter.set(this.queryUserId(player.playerId), (requestParam) =>
            this.innerReportBattleWorldRankData(requestParam),
        );
    }

    protected onPlayerEnterGame(player: Player): void {
        super.onPlayerEnterGame(player);
        this._tokenMap.set(player.userId, null);
        this._expiredRegulatorMap.set(
            player.userId,
            new Regulator(GameServiceConfig.EXPIRED_REFRESH_INTERVAL));

        // this.queryRegisterStaminaLimit(player.playerId);
    }

    protected onPlayerLeft(player: Player): void {
        super.onPlayerLeft(player);

        this._tokenMap.delete(player.userId);
        this._expiredRegulatorMap.delete(player.userId);
        this._userRequestRegulatorMap.delete(player.userId);

        mw.setTimeout(() => {
            this.userPSRankDataReporter.delete(player.userId);
            this.userBWRankDataReporter.delete(player.userId);
        }, GameServiceConfig.REPORT_REQUEST_WAIT_TIME * 2);
    }

    private static readonly CODE_VERIFY_TEST_AES_KEY_STORAGE_KEY = "CODE_VERIFY_TEST_AES_KEY_STORAGE_KEY";

    private static readonly CODE_VERIFY_RELEASE_AES_KEY_STORAGE_KEY = "CODE_VERIFY_RELEASE_AES_KEY_STORAGE_KEY";

    private static readonly PLACE_HOLDER = "REPLACE_IT";

    private static CODE_VERIFY_TEST_AES_KEY = "";

    private static CODE_VERIFY_RELEASE_AES_KEY = "";

    private static CODE_VERIFY_TEST_AES_IV = "";

    private static CODE_VERIFY_RELEASE_AES_IV = "";

    public static readonly KEY_STORAGE_GET_FAILED_REFRESH_INTERVAL = 5e3;

    private static getSensitiveData() {
        Gtk.doUntilTrue(
            () => !Gtk.isNullOrEmpty(this.CODE_VERIFY_TEST_AES_KEY),
            () => this.getCodeVerifyAesKey(false),
            AuthModuleS.KEY_STORAGE_GET_FAILED_REFRESH_INTERVAL,
        );
        Gtk.doUntilTrue(
            () => !Gtk.isNullOrEmpty(this.CODE_VERIFY_RELEASE_AES_KEY),
            () => this.getCodeVerifyAesKey(true),
            AuthModuleS.KEY_STORAGE_GET_FAILED_REFRESH_INTERVAL,
        );
    }

    private static getCodeVerifyAesKey(isRelease: boolean) {
        const aesKeyStorageKey =
            isRelease ?
                AuthModuleS.CODE_VERIFY_RELEASE_AES_KEY_STORAGE_KEY :
                AuthModuleS.CODE_VERIFY_TEST_AES_KEY_STORAGE_KEY;

        DataStorage.asyncGetData(aesKeyStorageKey)
            .then(value => {
                Log4Ts.log(AuthModuleS, `value`, value.code);
                if (value.code === 200) {
                    if (!Gtk.isNullOrUndefined(value.data)) {
                        if (isRelease) {
                            AuthModuleS.CODE_VERIFY_RELEASE_AES_KEY = value.data;
                            AuthModuleS.CODE_VERIFY_RELEASE_AES_IV = AuthModuleS.CODE_VERIFY_RELEASE_AES_KEY
                                .slice(0, 16)
                                .split("")
                                .reverse()
                                .join("");
                        } else {
                            AuthModuleS.CODE_VERIFY_TEST_AES_KEY = value.data;
                            AuthModuleS.CODE_VERIFY_TEST_AES_IV = AuthModuleS.CODE_VERIFY_TEST_AES_KEY
                                .slice(0, 16)
                                .split("")
                                .reverse()
                                .join("");
                        }
                    } else {
                        Log4Ts.log(AuthModuleS, `getCodeVerifyAesKey for test Failed`);
                        DataStorage.asyncSetData(
                            aesKeyStorageKey,
                            AuthModuleS.PLACE_HOLDER,
                        );
                    }
                }
            });
    }

    public static refreshSensitiveData() {
        this.getCodeVerifyAesKey(true);
        this.getCodeVerifyAesKey(false);
    }

//#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

//#region Method
    private timeVerify(reqTime: number): boolean {
        const serverNow = Date.now();
        return Math.abs(serverNow - reqTime) < AuthModuleS.TIME_TOLERATE;
    }

    private tokenVerify(saltToken: SaltToken): boolean {
        if (!this.timeVerify(saltToken.time)) {
            Log4Ts.log({name: "AuthModule"}, `token time verify failed.`);
            return false;
        }
        const token = AuthModuleS.decryptToken(saltToken.content, saltToken.time);
        if (Gtk.isNullOrEmpty(token)) {
            Log4Ts.log({name: "AuthModule"}, `token invalid.`);
            return false;
        }

        //TODO_LviatYi 与现存 token 进行比对.
        return true;
    }

    private getSecret(message: string) {
        const e = CryptoJS.AES.encrypt(
            message,
            CryptoJS.enc.Utf8.parse(
                GameServiceConfig.isRelease
                    ? AuthModuleS.CODE_VERIFY_RELEASE_AES_KEY
                    : AuthModuleS.CODE_VERIFY_TEST_AES_KEY,
            ),
            {
                iv: CryptoJS.enc.Utf8.parse(
                    GameServiceConfig.isRelease
                        ? AuthModuleS.CODE_VERIFY_RELEASE_AES_IV
                        : AuthModuleS.CODE_VERIFY_TEST_AES_IV,
                ),
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7,
            },
        );
        return e.ciphertext.toString(CryptoJS.enc.Base64);
    }

    /**
     * 获取并注册 P12 token.
     * @private
     * @param userId
     * @param tempToken
     * @returns {Promise<[boolean, string]>} [result, reason]
     */
    private async getP12Token(userId: string, tempToken: string) {
        if (Gtk.isNullOrEmpty(tempToken)) {
            Log4Ts.warn(AuthModuleS, `temp token of player userId: ${userId} is invalid.`);
            return;
        }

        const requestParam: GetTokenReq = {tempToken};

        const respInJson = await this.correspondHandler<QueryResp<GetTokenRespData>>(
            requestParam,
            AuthModuleS.RELEASE_GET_P12_TOKEN_URL,
            AuthModuleS.TEST_GET_P12_TOKEN_URL,
            true,
            false,
        );

        const success = respInJson?.message === "success";
        if (!success) {
            Log4Ts.warn(AuthModuleS, `report temp token failed. result: ${respInJson.message}`);
            return;
        }

        if (Gtk.isNullOrEmpty(respInJson.data?.accessToken ?? undefined)) {
            Log4Ts.error(AuthModuleS, `get token failed. ${JSON.stringify(respInJson.message)}`);
            return;
        } else if (this._tokenMap.has(userId)) {
            this._tokenMap.set(userId, respInJson.data?.accessToken);
            this.onRefreshToken(userId);
            return;
        } else {
            logWPlayerNotExist(userId, false);
            return;
        }
    }

    private async queryCurrency(userId: string): Promise<void> {
        const respInJson = await this.correspondHandler<QueryResp<QueryCurrencyRespData>>(
            undefined,
            AuthModuleS.RELEASE_GET_CURRENCY_URL,
            AuthModuleS.TEST_GET_CURRENCY_URL,
            true,
            false,
            userId,
        );

        if (respInJson?.code !== 200) {
            Log4Ts.error(AuthModuleS, `query currency failed. ${JSON.stringify(respInJson)}`);
            if (respInJson?.code === 401) this.onTokenExpired(userId);
            return;
        }

        let currentCurrency = respInJson.data?.balance;
        this.setCurrency(userId, currentCurrency);
    }

    private async queryAccess(userId: string): Promise<boolean> {
        const requestParam = {userId};
        const respInJson = await this.correspondHandler<QueryResp<boolean>>(
            requestParam,
            AuthModuleS.RELEASE_GET_P12_ACCESS_URL,
            AuthModuleS.TEST_GET_P12_ACCESS_URL,
            false,
            true,
            userId,
        );

        if (respInJson?.code !== 200) {
            Log4Ts.error(AuthModuleS, `query access failed. ${JSON.stringify(respInJson)}`);
            if (respInJson?.code === 401) this.onTokenExpired(userId);
            return;
        }

        return respInJson.data ?? false;
    }

    public async consumeCurrency(userId: string,
                                 sceneName: SceneName,
                                 consumeId: ConsumeId,
                                 count: number,
                                 price?: number): Promise<boolean> {
        const d = mwext.DataCenterS.getData(userId, AuthModuleData);
        if (!d) {
            Log4Ts.error(AuthModuleS, `player data of user ${userId} is not exist.`);
            return false;
        }

        const sceneId = await this.querySceneId(userId);
        const gameId = GameServiceConfig.chainId;
        const requestParam: ConsumeCurrencyReq = {
            sceneId,
            sceneName,
            orderId: new UUID(4).toString(),
            consumeId,
            buyCnt: count,
            timestamp: Math.floor(Date.now() / 1e3),
            price,
            gameId,
        };

        const respInJson =
            await this.correspondHandler<QueryResp<QueryCurrencyRespData>>(
                requestParam,
                AuthModuleS.RELEASE_CONSUME_CURRENCY_URL,
                AuthModuleS.TEST_CONSUME_CURRENCY_URL,
                true,
                true,
                userId,
            );

        if (respInJson?.code !== 200) {
            Log4Ts.error(AuthModuleS, `consume currency failed. ${JSON.stringify(respInJson)}`);
            if (respInJson?.code === 401) this.onTokenExpired(userId);
            return false;
        }

        let currentCurrency = respInJson.data?.balance;
        this.setCurrency(userId, currentCurrency);

        return respInJson.message === "success";
    }

    public async consumePotion(userId: string, sceneName: SceneName, count: number): Promise<ConsumePotionRespData | undefined> {
        const d = mwext.DataCenterS.getData(userId, AuthModuleData);
        if (!d) {
            Log4Ts.error(AuthModuleS, `player data of user ${userId} is not exist.`);
            return undefined;
        }

        const sceneId = await this.querySceneId(userId);
        const gameId = GameServiceConfig.chainId;
        const requestParam: ConsumePotionReq = {
            userId,
            sceneId,
            sceneName,
            useAmount: count,
            gameId,
        };

        const respInJson = await this.correspondHandler<QueryResp<ConsumePotionRespData>>(
            requestParam,
            AuthModuleS.RELEASE_POTION_USE_URL,
            AuthModuleS.TEST_POTION_USE_URL,
        );

        if (respInJson?.code !== 200) {
            Log4Ts.error(AuthModuleS, `consume potion failed. ${JSON.stringify(respInJson)}`);
            if (respInJson?.code === 401) this.onTokenExpired(userId);
            return undefined;
        }

        respInJson.data.balance = Number(respInJson.data?.balance ?? 0);
        respInJson.data.gameStaminaRecoverySec = Number(respInJson.data?.gameStaminaRecoverySec ?? 0);
        respInJson.data.recoveryStaminaAmount = Number(respInJson.data?.recoveryStaminaAmount ?? 0);
        respInJson.data.stamina = Number(respInJson.data?.stamina ?? 0);

        this.playerStaminaRecoveryMap.set(userId, respInJson.data.gameStaminaRecoverySec);
        this.playerStaminaLimitMap.set(userId, respInJson.data.stamina);

        return respInJson.data;
    }

    public async queryUserP12Bag(userId: string, sceneName: SceneName): Promise<UserP12BagRespData | undefined> {
        const sceneId = await this.querySceneId(userId);
        const gameId = GameServiceConfig.chainId;
        const requestParam: UserDataReq = {
            userId,
            sceneId,
            sceneName,
            gameId,
        };

        const respInJson = await this.correspondHandler<QueryResp<UserP12BagRespData>>(
            requestParam,
            AuthModuleS.RELEASE_QUERY_USER_P12_BAG_URL,
            AuthModuleS.TEST_QUERY_USER_P12_BAG_URL,
            false,
            true);

        if (respInJson?.message === "success" &&
            respInJson?.data) {
            for (const item of respInJson.data.list) {
                item.unuse = Number(item.unuse ?? 0);
                item.total = Number(item.total ?? 0);
                item.unclaim = Number(item.unclaim ?? 0);
            }

            return respInJson.data;
        } else return undefined;
    }

    public async requestWebCatchDragon(
        playerId: number,
        dragonPalId: number,
        catchTimeStamp: number,
    ): Promise<[boolean | undefined, CatchDragonRespData | undefined]> {
        const userId = this.queryUserId(playerId);
        if (Gtk.isNullOrUndefined(userId)) return [undefined, undefined];

        const sceneId = await this.querySceneId(userId);
        const gameId = GameServiceConfig.chainId;
        const requestParam: CatchDragonReq = {
            userId,
            dragonPalId,
            catchTimeStamp,
            attributionType: "game",
            sceneId,
            sceneName: "dragon",
            gameId,
        };

        const respInJson =
            await this.correspondHandler<QueryResp<CatchDragonRespData>>(
                requestParam,
                AuthModuleS.RELEASE_CATCH_DRAGON_URL,
                AuthModuleS.TEST_CATCH_DRAGON_URL,
            );

        if (!respInJson) return [undefined, undefined];
        respInJson.data.unUsed = Number(respInJson.data.unUsed);

        const success = respInJson.message === "success";
        if (!success) Log4Ts.warn(AuthModuleS,
            `report catch failed. result: ${respInJson.message}`);

        return [success, respInJson.data];
    }

    public async queryUserDragon(playerId: number): Promise<UserDragonRespData> {
        const userId = this.queryUserId(playerId);
        if (Gtk.isNullOrUndefined(userId)) return;

        const sceneId = await this.querySceneId(userId);
        const gameId = GameServiceConfig.chainId;
        const requestParam: UserDataReq = {
            userId,
            sceneId,
            sceneName: "dragon",
            gameId,
        };

        const respInJson = await this.correspondHandler<QueryResp<UserDragonRespData>>(
            requestParam,
            AuthModuleS.RELEASE_QUERY_USER_DRAGON_URL,
            AuthModuleS.TEST_QUERY_USER_DRAGON_URL,
        );

        if (respInJson?.message === "success") {
            for (const item of respInJson.data.DragonPalList) {
                item.dragonPalId = Number(item.dragonPalId);
                item.amount = Number(item.amount);
                item.catchTimeStamp = Number(item.catchTimeStamp);
            }
        }
        return respInJson?.message === "success" ? respInJson.data : undefined;
    }

    public async queryRegisterStaminaLimit(userId: string,
                                           sceneName: SceneName) {
        const sceneId = await this.querySceneId(userId);
        const gameId = GameServiceConfig.chainId;
        const requestParam: UserDataReq = {
            userId,
            sceneId,
            sceneName,
            gameId,
        };

        const respInJson = await this.correspondHandler<QueryResp<QueryStaminaLimitRespData>>(
            requestParam,
            AuthModuleS.RELEASE_STAMINA_LIMIT_URL,
            AuthModuleS.TEST_STAMINA_LIMIT_URL,
        );

        if (Gtk.isNullOrUndefined(respInJson?.data?.stamina)) {
            Log4Ts.log(
                AuthModuleS,
                `invalid value when query stamina limit for user ${userId}.`,
                `reason: ${JSON.stringify(respInJson)}`,
            );
        } else {
            this.playerStaminaLimitMap.set(userId, Number(respInJson.data.stamina));
        }

        if (Gtk.isNullOrUndefined(respInJson?.data?.gameStaminaRecoverySec))
            Log4Ts.log(AuthModuleS, `invalid value when query recovery time limit for user ${userId}.`);
        else this.playerStaminaRecoveryMap.set(userId, Number(respInJson.data.gameStaminaRecoverySec));

        let data = this.getPlayerData(userId);
        if (
            !Gtk.isNullOrEmpty(respInJson?.data?.walletAddress ?? undefined) &&
            (data?.holdAddress ?? undefined) !== respInJson.data.walletAddress
        ) {
            data.holdAddress = respInJson.data.walletAddress;
            data.save(false);
        }
    }

    public async reportPetSimulatorRankData(
        playerId: number,
        petName: string,
        petRarity: number,
        petOriginalAttack: number,
        recordTime: number,
        petEnchantScore: number,
        round: number,
    ) {
        const userId = this.queryUserId(playerId);
        if (Gtk.isNullOrEmpty(userId)) return;

        const player = Player.getPlayer(playerId);
        const userName = this.getPlayerData(player)?.holdNickName ?? player.nickname;
        const userAvatar = player["avatarUrl"];
        const sceneId = await this.querySceneId(userId);
        const gameId = GameServiceConfig.chainId;
        const requestParam: UpdatePetSimulatorRankDataReq = {
            userId,
            sceneId,
            sceneName: "pet",
            userName,
            userAvatar,
            petName,
            petRarity,
            petOriginalAttack,
            petEnchantScore,
            recordTime: Math.floor(recordTime / 1000),
            round,
            gameId,
        };

        Gtk.waitDo(requestParam, this.userPSRankDataReporter.get(userId), GameServiceConfig.REPORT_REQUEST_WAIT_TIME);
    }

    private async innerReportPetSimulatorRankData(requestParam: UpdatePetSimulatorRankDataReq) {
        this.correspondHandler<QueryResp>(
            requestParam,
            AuthModuleS.RELEASE_P_S_RANK_REPORT_URL,
            AuthModuleS.TEST_P_S_RANK_REPORT_URL,
        );
    }

    public async reportBattleWorldRankData(playerId: number,
                                           grade: number,
                                           gradeOriginalPower: number,
                                           round: number) {
        const userId = this.queryUserId(playerId);
        if (Gtk.isNullOrEmpty(userId)) return;

        const player = Player.getPlayer(playerId);
        const userName = player.nickname;
        const userAvatar = player["avatarUrl"];
        const sceneId = await this.querySceneId(userId);
        const gameId = GameServiceConfig.chainId;
        const requestParam: UpdateBattleWorldRankDataReq = {
            userId,
            sceneId,
            sceneName: "fight",
            userName,
            userAvatar,
            grade,
            gradeOriginalPower,
            round,
            recordTime: Math.floor(Date.now() / 1000),
            gameId,
        };

        Gtk.waitDo(requestParam, this.userBWRankDataReporter.get(userId), GameServiceConfig.REPORT_REQUEST_WAIT_TIME);
    }

    public async innerReportBattleWorldRankData(requestParam: UpdateBattleWorldRankDataReq) {
        this.correspondHandler<QueryResp>(
            requestParam,
            AuthModuleS.RELEASE_B_W_RANK_REPORT_URL,
            AuthModuleS.TEST_B_W_RANK_REPORT_URL,
        );
    }

    public async reportPetSimulatorStatistic(userId: string, statistic: PetSimulatorStatisticNeedFill, authInfo?: { address: string, nickname: string }) {
        // 可能在 onPlayerLeft 的时候调用，所以在外层传 authInfo。
        const { address, nickname } = authInfo ?? {};
        const gameId = GameServiceConfig.chainId;
        const requestParam: UserStatisticReq<PetSimulatorStatistic> = {
            userId,
            sceneId: this.getPlayerData(userId)?.lastVisitSceneId,
            address,
            sceneName: "pet",
            gameId,
            data: {
                ...statistic,
                user_id: userId,
                address,
                nickname,
                device_id: "",
            },
        };

        const respInJson = await this.correspondHandler<QueryResp>(
            requestParam,
            AuthModuleS.RELEASE_STATISTIC_REPORT_URL,
            AuthModuleS.TEST_STATISTIC_REPORT_URL,
        );

        return respInJson?.message === "success";
    }

    public async reportPetSimulatorPetDataStatistic(userId: string, statistic: PetSimulatorStatisticPetObj[], authInfo?: { address: string, nickname: string }) {
        // 可能在 onPlayerLeft 的时候调用，所以在外层传 authInfo。
        const { address } = authInfo ?? {};
        const gameId = GameServiceConfig.chainId;
        const time = Math.floor(Date.now() / 1000);
        const requestParam: UserStatisticReq<PetSimulatorStatisticPetObj[]> = {
            userId,
            sceneId: this.getPlayerData(userId)?.lastVisitSceneId,
            address,
            sceneName: "pet",
            gameId,
            time,
            data: statistic,
        };

        const respInJson = await this.correspondHandler<QueryResp>(
            requestParam,
            AuthModuleS.RELEASE_PET_STATISTIC_REPORT_URL,
            AuthModuleS.TEST_PET_STATISTIC_REPORT_URL,
        );

        return respInJson?.message === "success";
    }

    public async reportBattleWorldStatistic(userId: string, statistic: BattleWorldStatisticNeedFill) {
        const d = mwext.DataCenterS.getData(userId, AuthModuleData);
        if (!d) {
            Log4Ts.error(AuthModuleS, `player data of user ${userId} is not exist.`);
            return false;
        }

        const gameId = GameServiceConfig.chainId;
        const requestParam: UserStatisticReq<BattleWorldStatistic> = {
            userId,
            sceneId: this.getPlayerData(userId)?.lastVisitSceneId,
            address: d.holdAddress,
            sceneName: "fight",
            gameId,
            data: {
                ...statistic,
                user_id: userId,
                address: d.holdAddress,
                nickname: d.holdNickName,
                device_id: "",
            },
        };

        const respInJson = await this.correspondHandler<QueryResp>(
            requestParam,
            AuthModuleS.RELEASE_STATISTIC_REPORT_URL,
            AuthModuleS.TEST_STATISTIC_REPORT_URL,
        );

        return respInJson?.message === "success";
    }
    

    public async reportTDStatistic(userId: string, statistic: TDStatisticNeedFill, authInfo?: { address: string, nickname: string }) {
        // 可能在 onPlayerLeft 的时候调用，所以在外层传 authInfo。
        const { address, nickname } = authInfo ?? {};
        const gameId = GameServiceConfig.chainId;
        const requestParam: UserStatisticReq<TDStatistic> = {
            userId,
            sceneId: this.getPlayerData(userId)?.lastVisitSceneId,
            address,
            sceneName: "tower",
            gameId,
            data: {
                ...statistic,
                user_id: userId,
                address,
                nickname,
                device_id: "",
            },
        };

        const respInJson = await this.correspondHandler<QueryResp>(
            requestParam,
            AuthModuleS.RELEASE_STATISTIC_REPORT_URL,
            AuthModuleS.TEST_STATISTIC_REPORT_URL,
        );

        return respInJson?.message === "success";
    }

    private queryUserId(playerId: number): string | undefined {
        if (!GameServiceConfig.isRelease && !GameServiceConfig.isBeta) return "2033226";

        const userId = Player.getPlayer(playerId)?.userId ?? undefined;
        if (Gtk.isNullOrEmpty(userId)) {
            logWPlayerNotExist(playerId);
            return undefined;
        }
        return userId;
    }

    private async querySceneId(userId: string): Promise<string> {
        if (!GameServiceConfig.isBeta && !GameServiceConfig.isRelease) {
            return AuthModuleS.INVALID_SCENE_ID;
        }
        if (Gtk.getEditorVersion().main >= 35 && !Gtk.isNullOrEmpty(mw.SystemUtil["sceneId"]))
            return mw.SystemUtil["sceneId"];

        const roomInfo = await mw.TeleportService.asyncGetPlayerRoomInfo(userId).catch((e) => {
            Log4Ts.error(AuthModuleS, e);
            return Promise.resolve(undefined as mw.RoomInfo);
        });
        if (roomInfo) {
            Log4Ts.log(AuthModuleS, `query scene info. ${JSON.stringify(roomInfo)}`);
            return roomInfo.sceneId;
        } else return AuthModuleS.INVALID_SCENE_ID;
    }

    private async correspondHandler<D = object>(reqParam: object,
                                                releaseUrl: string,
                                                testUrl: string,
                                                silence: boolean = false,
                                                useEncrypt: boolean = true,
                                                authUserId?: string): Promise<D> {
        const body = useEncrypt ?
            {encryptData: this.getSecret(JSON.stringify(reqParam ?? {}))} :
            (reqParam ?? {});

        let headers = {
            "Content-Type": "application/json;charset=UTF-8",
        };

        if (!Gtk.isNullOrUndefined(authUserId)) {
            let token = this._tokenMap.get(authUserId);
            if (Gtk.isNullOrUndefined(token)) {
                if (GameServiceConfig.isRelease || GameServiceConfig.isBeta) {
                    logEUserTokenInvalid(authUserId);
                    return;
                } else {
                    Log4Ts.log(AuthModuleS, `token invalid when test env. use test token.`);
                    token = AuthModuleS.TEST_TOKEN;
                }
            }
            headers["Authorization"] = `Bearer ${token}`;

            if (GameServiceConfig.isRelease) silence = true;
        }

        const url = GameServiceConfig.isRelease || !GameServiceConfig.isUseTestUrl ? releaseUrl : testUrl;
        Log4Ts.log(AuthModuleS,
            `req for ${url}.`,
            silence ? "" :
                `data: ${JSON.stringify(body)}`);
        const resp = await fetch(
            url,
            {
                method: "POST",
                headers,
                body: JSON.stringify(body),
            },
        );

        try {
            const respJson = await resp.json<D>();
            if (!silence) {
                Log4Ts.log(AuthModuleS, `get resp. ${JSON.stringify(respJson)}`);
            }
            return respJson;
        } catch (e) {
            Log4Ts.error(AuthModuleS, `error occurs in resp.json()`);
            return undefined;
        }
    }

    public checkRequestRegulator(userId: string, reqType: ReqRegulatorType): boolean {
        const reqRegulatorMap = Gtk.tryGet(this._userRequestRegulatorMap,
            userId,
            () => new Map<ReqRegulatorType, number>());
        let last = reqRegulatorMap.get(reqType) ?? 0;
        let now = Date.now();
        if (now - last < GameServiceConfig.MIN_OTHER_REQUEST_INTERVAL) return false;

        reqRegulatorMap.set(reqType, now);
        return true;
    }

    public requestRefreshStaminaLimit(userId: string, sceneName: SceneName) {
        if (!this.checkRequestRegulator(userId, "stamina")) return;
        return this.queryRegisterStaminaLimit(userId, sceneName);
    }

    private setCurrency(userId: string, count: string) {
        this.userCurrencyMap.set(userId, count);
        this.getClient(Player.getPlayer(userId))?.net_setCurrency(count);
    }

    private onRefreshToken(userId: string) {
        this.queryCurrency(userId);
        this.queryAccess(userId).then((value) =>
            this.getClient(Player.getPlayer(userId))?.net_refreshAccess(value));
    }

    private onTokenExpired(userId: string) {
        Log4Ts.warn(AuthModuleS, `token expired. refreshing... userId: ${userId}`);
        this._tokenMap.set(userId, null);
        if (this._expiredRegulatorMap.get(userId).request())
            this.getClient(Player.getPlayer(userId))?.net_refreshToken();
    }

    private heartbeatS() {
        if (SystemUtil.isPIE) return;

        TimeUtil.setInterval(() => {
            const timestamp = Date.now();
            Event.dispatchToAllClientUnreliable(GameServiceConfig.HEARTBEAT_KIND, timestamp);
        }, GameServiceConfig.HEARTBEAT_REFRESH);

        Event.addClientListener(GameServiceConfig.HEARTBEAT_KIND, (player: mw.Player, sentTime: number) => {
            const receivedTime = Date.now();
            const rtt = receivedTime - sentTime;
            this.serverLog(GameServiceConfig.HEARTBEAT_KIND, [GameServiceConfig.SCENE_NAME, player.userId, player.ping, rtt]);
        });
    }

    public serverLog(kind: string, params: any) {
        Log4Ts.log({name: kind}, JSON.stringify(params) + " #P12");
    }

//#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

//#region Net Method
    public async net_getToken(): Promise<string> {
        const playerId = this.currentPlayerId;
        const uid = this.currentPlayer.userId;
        return `token-${playerId}-${uid}`;
    }

    @noReply()
    public async net_initPlayerData(nickName: string) {
        let data = this.currentData;
        let userId = this.currentPlayer.userId;
        let playerId = this.currentPlayerId;
        data.holdUserId = userId;
        data.holdPlayerId = playerId;
        data.holdNickName = nickName;
        data.lastVisitSceneId = await this.querySceneId(this.currentPlayer.userId);
        data.save(false);
    }

    @noReply()
    public net_reportTempToken(token: string) {
        const currentPlayer = this.currentPlayer;
        if (!this.checkRequestRegulator(currentPlayer.userId, "temp-token")) return;

        this.getP12Token(currentPlayer.userId, token);
    }

    @noReply()
    public net_refreshCurrency() {
        const userId = this.currentPlayer.userId;
        if (!this.checkRequestRegulator(userId, "currency")) return;

        this.queryCurrency(userId);
    }

    @noReply()
    public net_serverLog(kind: string, params: any) {
        this.serverLog(kind, params);
    }

//#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
}

function logState(
    announcer: Announcer,
    logType: "log" | "warn" | "error",
    messages: string[] | string | MessageGetter,
    showTime: boolean,
    playerId: number,
    uid: string = undefined,
    code: string = undefined,
): void {
    let logFunc: Function;
    switch (logType) {
        case "log":
            logFunc = Log4Ts.log;
            break;
        case "warn":
            logFunc = Log4Ts.warn;
            break;
        case "error":
            logFunc = Log4Ts.error;
            break;
    }

    const result: Expression<string>[] = [];
    if (messages) {
        if (typeof messages === "string") {
            result.push(() => messages);
        } else if (messages instanceof Array) {
            for (const msg of messages) {
                result.push(() => msg);
            }
        } else {
            result.push(messages);
        }
    }
    result.push(() => `player: ${playerId.toString()}`);
    if (uid) result.push(() => `uid: ${uid}`);
    if (code) result.push(() => `code: ${code}`);
    if (showTime) result.push(() => `time: ${Date.now().toString()}`);

    logFunc(announcer, ...result);
}

function logWPlayerNotExist(id: number | string, isPlayerId: boolean = true) {
    Log4Ts.warn(AuthModuleS, `can't find player ${isPlayerId ? "id" : "userId"}: ${id}.`);
}

function logEUserTokenInvalid(userId: string): void {
    Log4Ts.error(AuthModuleS, `user token invalid. id: ${userId}`);
}
