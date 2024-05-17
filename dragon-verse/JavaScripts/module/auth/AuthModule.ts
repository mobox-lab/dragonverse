import CryptoJS from "crypto-js";
import GameServiceConfig from "../../const/GameServiceConfig";
import Log4Ts, { Announcer, LogString } from "../../depend/log4ts/Log4Ts";
import Gtk, { Expression } from "../../util/GToolkit";
import { JModuleC, JModuleData, JModuleS } from "../../depend/jibu-module/JModule";
import { Yoact } from "../../depend/yoact/Yoact";
import { AddGMCommand } from "module_gm";
import noReply = mwext.Decorator.noReply;
import { GameConfig } from "../../config/GameConfig";

//#region TTD & GM
AddGMCommand(
    "refresh dragon ball | Auth",
    undefined,
    (player, args) => {
        Log4Ts.log(AuthModuleS, `query dragon ball...`);
        mwext.ModuleService
            .getModule(AuthModuleS)
            .queryUserDragonBall(player.playerId)
            .then((value) => {
                Log4Ts.log(
                    AuthModuleS,
                    `query dragon ball success.`,
                    `user dragon ball: ${JSON.stringify(value)}`,
                );
            });
    },
    "Root");

AddGMCommand(
    "query user dragon | Auth",
    undefined,
    (player, args) => {
        Log4Ts.log(AuthModuleS, `query user dragon...`);
        mwext.ModuleService
            .getModule(AuthModuleS)
            .queryUserDragon(player.playerId)
            .then((value) => {
                Log4Ts.log(
                    AuthModuleS,
                    `query user dragon success.`,
                    `user dragons: ${JSON.stringify(value)}`,
                );
            });
    },
    "Root");

AddGMCommand(
    "request catch dragon | Auth",
    undefined,
    (player, args) => {
        Log4Ts.log(AuthModuleS, `try catch dragon...`);
        let allDragonConfig = GameConfig["Dragon"]?.getAllElement() ?? [];
        if (allDragonConfig.length === 0) {
            Log4Ts.warn(AuthModuleS, `there is no valid dragon config.`);
            return;
        }
        mwext.ModuleService
            .getModule(AuthModuleS)
            .requestWebCatchDragon(
                player.playerId,
                Gtk.randomArrayItem(allDragonConfig)["dragonPalId"],
                Date.now(),
            )
            .then((value) => {
                Log4Ts.log(
                    AuthModuleS,
                    `try catch dragon success.`,
                    `user dragon ball: ${JSON.stringify(value)}`,
                );
            });
    },
    "Root");

AddGMCommand(
    "refresh stamina limit | Auth",
    undefined,
    (player, args) => {
        Log4Ts.log(AuthModuleS, `query stamina limit...`);
        mwext.ModuleService
            .getModule(AuthModuleS)
            .queryRegisterStaminaLimit(player.playerId)
            .then(() => {
                Log4Ts.log(
                    AuthModuleS,
                    `query stamina limit success.`,
                    `current stamina limit: ${mwext.ModuleService.getModule(AuthModuleS).playerStaminaLimitMap.get(player.playerId)}`,
                );
            });
    },
    "Root");

AddGMCommand(
    "report ps | Auth",
    undefined,
    (player, args) => {
        Log4Ts.log(AuthModuleS, `report ps rank data...`);
        mwext.ModuleService
            .getModule(AuthModuleS)
            .reportPetSimulatorRankData(
                player.playerId,
                "pig",
                0,
                999,
                Date.now(),
                0,
            )
            .then(() => {
                Log4Ts.log(
                    AuthModuleS,
                    `report ps rank data success.`,
                );
            });
    },
    "Root");

AddGMCommand(
    "report bw | Auth",
    undefined,
    (player, args) => {
        Log4Ts.log(AuthModuleS, `report ps rank data...`);
        mwext.ModuleService
            .getModule(AuthModuleS)
            .reportBattleWorldRankData(
                player.playerId,
                0,
                999,
                0,
            )
            .then(() => {
                Log4Ts.log(
                    AuthModuleS,
                    `report bw rank data success.`,
                );
            });
    },
    "Root");
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

//#region Param Interface
/**
 * 一般用户数据查询请求参数.
 */
interface UserDataQueryReq {
    userId: string;
}

/**
 * 一般查询返回数据.
 */
interface QueryResp<D = undefined> {
    code: number,
    message: "success" | string,
    data?: D
}

/**
 * 体力上限查询返回值.
 */
interface QueryStaminaLimitRespData {
    /**
     * 钱包地址.
     */
    walletAddress: string,

    /**
     * 体力上限恢复时长预期. s
     */
    gameStaminaRecoverySec: number,

    /**
     * 体力上限.
     */
    stamina: 200,
}

/**
 * 汇报 宠物模拟器排行榜 请求参数.
 */
interface PetSimulatorRankDataReq {
    userId: string;
    userName: string;
    userAvatar: string;
    petName: string;
    petRarity: number;
    petOriginalAttack: number;
    round: number;
    /**
     * 宠物获得时间. s
     */
    recordTime: number;
}

/**
 * 汇报 无限乱斗排行榜 请求参数.
 */
interface UpdateBattleWorldRankDataReq {
    userId: string;
    userName: string;
    userAvatar: string;
    grade: number;
    gradeOriginalPower: number;
    round: number;
    recordTime: number;
}

/**
 * 抓根宝 返回值.
 */
interface DragonBallRespData {
    /**
     * 未领取.
     */
    unclaim: number,

    /**
     * 总发放.
     */
    total: number,

    /**
     * 未使用.
     */
    unUsed: number
}

/**
 * 抓取龙 请求参数.
 */
interface CatchDragonReq extends UserDataQueryReq {
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
 * 查询 用户龙 返回值.
 */
interface UserDragonRespData {
    /**
     * 用户龙列表.
     */
    DragonPalList: {
        /**
         * DragonId.
         */
        dragonPalId: number,

        /**
         * 数量.
         */
        amount: number,

        /**
         * 抓取时间. ms
         */
        catchTimeStamp: number,

        /**
         * 是否休眠.
         */
        sleep: boolean
    }[];
}

//#endregion

export default class AuthModuleData extends JModuleData {
    /**
     * 已经发布的正式数据版本号.
     * 以版本发布时间 升序排列.
     * RV.
     */
    public static readonly RELEASE_VERSIONS: number[] = [2024510151409];

    /**
     * 版本升级办法.
     * UVM[n] : 从 RV[n] 升级到 RV[n+1] 的方法.
     */
    public static readonly UPDATE_VERSION_METHOD: DataUpgradeMethod<AuthModuleData>[] = [];

    @Decorator.persistence()
    public holdUserId: string;

    @Decorator.persistence()
    public holdPlayerId: number;

    @Decorator.persistence()
    public holdNickName: string;

    @Decorator.persistence()
    public holdAddress: string;
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

    private _lastSubGameReportTime: number = 0;

    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

    //#region MetaWorld Event
    protected onAwake(): void {
        super.onAwake();
    }

    protected onJStart(): void {
        //#region Member init
        this.server.net_initPlayerData(AccountService.getNickName());
        //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

        //#region Event Subscribe
        //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
    }

    protected onUpdate(dt: number): void {
        super.onUpdate(dt);
    }

    protected onEnterScene(sceneType: number): void {
        super.onEnterScene(sceneType);
        this.server.net_getToken().then((value) => {
            this._originToken = value;
        });
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
    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

    //#region Net Method
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

    /**
     * 测试用 P12 端 域名.
     */
    private static readonly TEST_P12_DOMAIN = "http://modragon-api-test.mobox.app";

    /**
     * 发布用 P12 端 域名.
     */
    private static readonly RELEASE_P12_DOMAIN = "http://modragon-api.mobox.app";

    /**
     * 查询 体力上限 Uri.
     * @private
     */
    private static readonly STAMINA_LIMIT_URI = "/pge-game/stamina/obtain-in-game";

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
     * 查询 用户 抓根宝 信息 Uri.
     * @private
     */
    private static readonly QUERY_DRAGON_BALL_DATA_URI = "/pge-game/dragon-verse-capture-ball/get-dragon-capture-ball";

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
     * 测试用 查询 用户 抓根宝 信息 Url.
     */
    private static get TEST_QUERY_DRAGON_BALL_DATA_URL() {
        return this.TEST_P12_DOMAIN + this.QUERY_DRAGON_BALL_DATA_URI;
    }

    /**
     * 发布用 查询 用户 抓根宝 信息 Url.
     */
    private static get RELEASE_QUERY_DRAGON_BALL_DATA_URL() {
        return this.RELEASE_P12_DOMAIN + this.QUERY_DRAGON_BALL_DATA_URI;
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
    private _playerRequestRegulatorMap: Map<number, number> = new Map();

    /**
     * 玩家体力上限表.
     */
    public playerStaminaLimitMap: Map<number, number> = new Map();

    /**
     * 玩家体力恢复预期时长表. s
     */
    public playerStaminaRecoveryMap: Map<number, number> = new Map();
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

    protected onPlayerLeft(player: Player): void {
        super.onPlayerLeft(player);

        const playerData = this.getPlayerData(player);
        if (playerData) {
        } else {
            Log4Ts.log(AuthModuleS, `there is no data for player ${player.playerId}.`);
        }
    }

    protected onPlayerJoined(player: Player): void {
        super.onPlayerJoined(player);
    }

    protected onPlayerEnterGame(player: Player): void {
        super.onPlayerEnterGame(player);

        // this.queryRegisterStaminaLimit(player.playerId);
    }

    private static readonly CODE_VERIFY_AES_KEY_STORAGE_KEY = "CODE_VERIFY_AES_KEY_STORAGE_KEY";

    private static readonly CLIENT_ID_STORAGE_KEY = "CLIENT_ID_STORAGE_KEY";

    private static readonly SECRET_STORAGE_KEY = "SECRET_STORAGE_KEY";

    private static readonly PLACE_HOLDER = "REPLACE_IT";

    private static CODE_VERIFY_AES_KEY = "";

    private static CODE_VERIFY_AES_IV = "";

    public static readonly KEY_STORAGE_GET_FAILED_REFRESH_INTERVAL = 5e3;

    private static getSensitiveData() {
        Gtk.doUntilTrue(
            () => !Gtk.isNullOrEmpty(this.CODE_VERIFY_AES_KEY),
            this.getCodeVerifyAesKey,
            AuthModuleS.KEY_STORAGE_GET_FAILED_REFRESH_INTERVAL,
        );
    }

    private static getCodeVerifyAesKey() {
        DataStorage.asyncGetData(AuthModuleS.CODE_VERIFY_AES_KEY_STORAGE_KEY).then((value) => {
            Log4Ts.log(AuthModuleS, `value`, value.code);
            if (value.code === 200) {
                if (!Gtk.isNullOrUndefined(value.data) && value.data !== AuthModuleS.PLACE_HOLDER) {
                    AuthModuleS.CODE_VERIFY_AES_KEY = value.data;
                    AuthModuleS.CODE_VERIFY_AES_IV = AuthModuleS.CODE_VERIFY_AES_KEY.slice(0, 16)
                        .split("")
                        .reverse()
                        .join("");
                } else {
                    Log4Ts.log(AuthModuleS, `getCodeVerifyAesKey Failed`);
                    DataStorage.asyncSetData(AuthModuleS.CODE_VERIFY_AES_KEY_STORAGE_KEY, AuthModuleS.PLACE_HOLDER);
                }
            }
        });
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
        const e = CryptoJS.AES.encrypt(message, CryptoJS.enc.Utf8.parse(AuthModuleS.CODE_VERIFY_AES_KEY), {
            iv: CryptoJS.enc.Utf8.parse(AuthModuleS.CODE_VERIFY_AES_IV),
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7,
        });
        return e.ciphertext.toString(CryptoJS.enc.Base64);
    }

    public async queryUserDragonBall(playerId: number): Promise<DragonBallRespData> {
        const userId = this.queryUserId(playerId);
        if (Gtk.isNullOrUndefined(userId)) return;

        const requestParam: UserDataQueryReq = {
            userId,
        };

        const respInJson = await
            this.correspondHandler<QueryResp<DragonBallRespData>>(
                requestParam,
                AuthModuleS.RELEASE_QUERY_DRAGON_BALL_DATA_URL,
                AuthModuleS.TEST_QUERY_DRAGON_BALL_DATA_URL,
            );

        return respInJson.data;
    }

    public async requestWebCatchDragon(playerId: number,
                                       dragonPalId: number,
                                       catchTimeStamp: number): Promise<[boolean, DragonBallRespData]> {
        const userId = this.queryUserId(playerId);
        if (Gtk.isNullOrUndefined(userId)) return;

        const requestParam: CatchDragonReq = {
            userId,
            dragonPalId,
            catchTimeStamp,
            attributionType: "game",
        };

        const respInJson = await
            this.correspondHandler<QueryResp<DragonBallRespData>>(
                requestParam,
                AuthModuleS.RELEASE_CATCH_DRAGON_URL,
                AuthModuleS.TEST_CATCH_DRAGON_URL,
            );

        const success = respInJson.message === "success";
        if (!success) {
            Log4Ts.warn(AuthModuleS, `report catch failed. result: ${respInJson.message}`);
        }

        return [success, respInJson.data];
    }

    public async queryUserDragon(playerId: number): Promise<UserDragonRespData> {
        const userId = this.queryUserId(playerId);
        if (Gtk.isNullOrUndefined(userId)) return;

        const requestParam: UserDataQueryReq = {
            userId,
        };

        const respInJson = await
            this.correspondHandler<QueryResp<UserDragonRespData>>(
                requestParam,
                AuthModuleS.RELEASE_QUERY_USER_DRAGON_URL,
                AuthModuleS.TEST_QUERY_USER_DRAGON_URL,
            );

        return respInJson.message === "success" ?
            respInJson.data :
            undefined;
    }

    public async queryRegisterStaminaLimit(playerId: number) {
        const userId = this.queryUserId(playerId);
        if (Gtk.isNullOrUndefined(userId)) return;

        const requestParam: UserDataQueryReq = {
            userId,
        };

        const respInJson = await
            this.correspondHandler<QueryResp<QueryStaminaLimitRespData>>(
                requestParam,
                AuthModuleS.RELEASE_STAMINA_LIMIT_URL,
                AuthModuleS.TEST_STAMINA_LIMIT_URL,
            );

        if (Gtk.isNullOrUndefined(respInJson?.data?.stamina))
            Log4Ts.log(AuthModuleS,
                `invalid value when query stamina limit for user ${userId}.`,
                `reason: ${JSON.stringify(respInJson)}`);
        else {
            this.playerStaminaLimitMap.set(playerId, respInJson.data.stamina);
        }
        if (Gtk.isNullOrUndefined(respInJson?.data?.gameStaminaRecoverySec))
            Log4Ts.log(AuthModuleS, `invalid value when query recovery time limit for user ${userId}.`);
        else this.playerStaminaRecoveryMap.set(playerId, respInJson.data.gameStaminaRecoverySec);

        let data = this.getPlayerData(playerId);
        if (!Gtk.isNullOrEmpty(respInJson?.data?.walletAddress ?? undefined) &&
            (data?.holdAddress ?? undefined) !== respInJson.data.walletAddress) {
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
        round: number) {
        const userId = this.queryUserId(playerId);
        if (Gtk.isNullOrEmpty(userId)) return;

        const player = Player.getPlayer(playerId);
        const userName = player.nickname;
        const userAvatar = player["avatarUrl"];
        const requestParam: PetSimulatorRankDataReq = {
            userId,
            userName,
            userAvatar,
            petName,
            petRarity,
            petOriginalAttack,
            recordTime: recordTime / 1000,
            round,
        };

        this.correspondHandler<QueryResp>(requestParam,
            AuthModuleS.RELEASE_P_S_RANK_REPORT_URL,
            AuthModuleS.TEST_P_S_RANK_REPORT_URL,
        );
    }

    public async reportBattleWorldRankData(playerId: number, grade: number, gradeOriginalPower: number, round: number) {
        const userId = this.queryUserId(playerId);
        if (Gtk.isNullOrEmpty(userId)) return;

        const player = Player.getPlayer(playerId);
        const userName = player.nickname;
        const userAvatar = player["avatarUrl"];
        const requestParam: UpdateBattleWorldRankDataReq = {
            userId,
            userName,
            userAvatar,
            grade,
            gradeOriginalPower,
            round,
            recordTime: Math.floor(Date.now() / 1000),
        };

        this.correspondHandler<QueryResp>(requestParam,
            AuthModuleS.RELEASE_B_W_RANK_REPORT_URL,
            AuthModuleS.TEST_B_W_RANK_REPORT_URL,
        );
    }

    private queryUserId(playerId: number): string | undefined {
        if (!GameServiceConfig.isRelease && !GameServiceConfig.isBeta) return "1025696";

        const userId = Player.getPlayer(playerId)?.userId ?? undefined;
        if (Gtk.isNullOrEmpty(userId)) {
            logEPlayerNotExist(playerId);
            return undefined;
        }
        return userId;
    }

    private async correspondHandler<D = object>(reqParam: object, releaseUrl: string, testUrl: string) {
        const encryptBody = {
            encryptData: this.getSecret(JSON.stringify(reqParam)),
        };

        const resp = await fetch(
            `${
                GameServiceConfig.isRelease || !GameServiceConfig.isUseTestUrl
                    ? releaseUrl
                    : testUrl
            }`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json;charset=UTF-8",
                },
                body: JSON.stringify(encryptBody),
            },
        );

        Log4Ts.log(AuthModuleS, `get resp. ${JSON.stringify(resp)}`);
        return await resp.json<D>();
    }

    public checkRequestRegulator(playerId: number): boolean {
        let last = this._playerRequestRegulatorMap.get(playerId) ?? 0;
        let now = Date.now();
        if (now - last < GameServiceConfig.MIN_OTHER_REQUEST_INTERVAL) {
            return false;
        }

        this._playerRequestRegulatorMap.set(playerId, now);
        return true;
    }

    public requestRefreshStaminaLimit(playerId: number) {
        if (!this.checkRequestRegulator(playerId)) return;
        return this.queryRegisterStaminaLimit(playerId);
    }

    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

    //#region Net Method
    public net_getToken(): Promise<string> {
        const playerId = this.currentPlayerId;
        const uid = this.currentPlayer.userId;
        return Promise.resolve(`token-${playerId}-${uid}`);
    }

    @noReply()
    public net_initPlayerData(nickName: string) {
        this.currentData.holdUserId = this.currentPlayer.userId;
        this.currentData.holdPlayerId = this.currentPlayerId;
        this.currentData.holdNickName = nickName;
        this.currentData.save(false);
    }

    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
}

function logState(
    announcer: Announcer,
    logType: "log" | "warn" | "error",
    messages: string[] | string | LogString,
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

function logEPlayerNotExist(playerId: number) {
    Log4Ts.error(AuthModuleS, `can't find player ${playerId}.`);
}
