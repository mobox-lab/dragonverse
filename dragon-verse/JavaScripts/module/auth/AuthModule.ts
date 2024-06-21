import CryptoJS from "crypto-js";
import GameServiceConfig from "../../const/GameServiceConfig";
import Log4Ts, { Announcer, LogString } from "../../depend/log4ts/Log4Ts";
import Gtk, { Expression } from "../../util/GToolkit";
import { JModuleC, JModuleData, JModuleS } from "../../depend/jibu-module/JModule";
import noReply = mwext.Decorator.noReply;
import { GameConfig } from "../../config/GameConfig";
import { addGMCommand } from "mw-god-mod";
import { Regulator } from "gtoolkit";
import { Yoact } from "../../depend/yoact/Yoact";
import createYoact = Yoact.createYoact;

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
    "refresh dragon ball | Auth",
    "void",
    undefined,
    (player) => {
        Log4Ts.log(AuthModuleS, `query dragon ball...`);
        mwext.ModuleService.getModule(AuthModuleS)
            .queryUserDragonBall(player.playerId)
            .then((value) => {
                Log4Ts.log(AuthModuleS, `query dragon ball success.`, `user dragon ball: ${JSON.stringify(value)}`);
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
            .requestWebCatchDragon(player.playerId, Gtk.randomArrayItem(allDragonConfig)["dragonPalId"], Date.now())
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
            .queryRegisterStaminaLimit(player.playerId)
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

//#region Param Interface
/**
 * 一般用户数据查询请求参数.
 */
interface UserDataQueryReq {
    userId: string;
    sceneId: string;
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
 * 查询 P12 mdbl 币数量 请求参数.
 */
interface QueryCurrencyResp {
    /**
     * 钱包地址.
     */
    walletAddress: string,

    symbol: "mdbl",

    /**
     * 余额.
     */
    balance: string,

    chainId: number
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
    stamina: 200;
}

/**
 * 汇报 宠物模拟器排行榜 请求参数.
 */
interface UpdatePetSimulatorRankDataReq extends UserDataQueryReq {
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
interface UpdateBattleWorldRankDataReq extends UserDataQueryReq {
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
    unclaim: number;

    /**
     * 总发放.
     */
    total: number;

    /**
     * 未使用.
     */
    unUsed: number;
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

    private _requestRegulator: Regulator = new Regulator(GameServiceConfig.REPORT_REQUEST_WAIT_TIME);

    /**
     * mdbl 币.
     * @type {{count: string | undefined}}
     */
    public currency: { count: string | undefined } = createYoact({count: undefined});

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

//#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

//#region Net Method
    public net_refreshToken() {
        this.queryTempToken();
    }

    public net_setCurrency(val: string) {
        this.currency.count = val;
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

    /**
     * 获取 MW 临时 token Uri.
     * @type {string}
     * @private
     */
    public static readonly GET_MW_TEMP_TOKEN_URI = "sso/universal/user/v1/get/temp/token";

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
     * 获取 P12 token Uri.
     * @private
     */
    private static readonly GET_P12_TOKEN_URI = "/pge-game/sso/oauth/gpark";

    /**
     * 查询货币余额 Uri.
     */
    private static readonly GET_CURRENCY_URI = "/user-fund/balance";

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
     * 测试用 token.
     * @type {string}
     * @private
     */
    private static readonly TEST_TOKEN = "KFSRJa8wkLfQ/iQ8USfrps0yCqeSarrT0YLu6WxEmFt09EjO0O85Y0bRWPJNRI7gqcQQoaYgxPUcHoI/4HxeTA==";

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

        mw.setTimeout(() => {
            this.userPSRankDataReporter.delete(player.userId);
            this.userBWRankDataReporter.delete(player.userId);
        }, GameServiceConfig.REPORT_REQUEST_WAIT_TIME * 2);
    }

    private static readonly CODE_VERIFY_TEST_AES_KEY_STORAGE_KEY = "CODE_VERIFY_TEST_AES_KEY_STORAGE_KEY";

    private static readonly CODE_VERIFY_RELEASE_AES_KEY_STORAGE_KEY = "CODE_VERIFY_RELEASE_AES_KEY_STORAGE_KEY";

    private static readonly CLIENT_ID_STORAGE_KEY = "CLIENT_ID_STORAGE_KEY";

    private static readonly SECRET_STORAGE_KEY = "SECRET_STORAGE_KEY";

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

        const success = respInJson.message === "success";
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
        const respInJson = await this.correspondHandler<QueryResp<QueryCurrencyResp>>(
            undefined,
            AuthModuleS.RELEASE_GET_CURRENCY_URL,
            AuthModuleS.TEST_GET_CURRENCY_URL,
            true,
            false,
            userId,
        );

        if (respInJson.code !== 200) {
            Log4Ts.error(AuthModuleS, `query currency failed. ${JSON.stringify(respInJson)}`);
            if (respInJson.code === 401) this.onTokenExpired(userId);
            return;
        }

        let count = respInJson.data?.balance;
        this.setCurrency(userId, count);
    }

    public async queryUserDragonBall(playerId: number): Promise<DragonBallRespData> {
        const userId = this.queryUserId(playerId);
        if (Gtk.isNullOrUndefined(userId)) return;

        const requestParam: UserDataQueryReq = {
            userId,
            sceneId: await this.querySceneId(userId),
        };

        const respInJson = await this.correspondHandler<QueryResp<DragonBallRespData>>(
            requestParam,
            AuthModuleS.RELEASE_QUERY_DRAGON_BALL_DATA_URL,
            AuthModuleS.TEST_QUERY_DRAGON_BALL_DATA_URL,
        );

        return respInJson.data;
    }

    public async requestWebCatchDragon(
        playerId: number,
        dragonPalId: number,
        catchTimeStamp: number,
    ): Promise<[boolean, DragonBallRespData]> {
        const userId = this.queryUserId(playerId);
        if (Gtk.isNullOrUndefined(userId)) return;

        const requestParam: CatchDragonReq = {
            userId,
            sceneId: await this.querySceneId(userId),
            dragonPalId,
            catchTimeStamp,
            attributionType: "game",
        };

        const respInJson = await this.correspondHandler<QueryResp<DragonBallRespData>>(
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
            sceneId: await this.querySceneId(userId),
        };

        const respInJson = await this.correspondHandler<QueryResp<UserDragonRespData>>(
            requestParam,
            AuthModuleS.RELEASE_QUERY_USER_DRAGON_URL,
            AuthModuleS.TEST_QUERY_USER_DRAGON_URL,
        );

        return respInJson.message === "success" ? respInJson.data : undefined;
    }

    public async queryRegisterStaminaLimit(playerId: number) {
        const userId = this.queryUserId(playerId);
        if (Gtk.isNullOrUndefined(userId)) return;

        const requestParam: UserDataQueryReq = {
            userId,
            sceneId: await this.querySceneId(userId),
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
            this.playerStaminaLimitMap.set(userId, respInJson.data.stamina);
        }

        if (Gtk.isNullOrUndefined(respInJson?.data?.gameStaminaRecoverySec))
            Log4Ts.log(AuthModuleS, `invalid value when query recovery time limit for user ${userId}.`);
        else this.playerStaminaRecoveryMap.set(userId, respInJson.data.gameStaminaRecoverySec);

        let data = this.getPlayerData(playerId);
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
        const requestParam: UpdatePetSimulatorRankDataReq = {
            userId,
            sceneId: await this.querySceneId(userId),
            userName,
            userAvatar,
            petName,
            petRarity,
            petOriginalAttack,
            petEnchantScore,
            recordTime: Math.floor(recordTime / 1000),
            round,
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

    public async reportBattleWorldRankData(playerId: number, grade: number, gradeOriginalPower: number, round: number) {
        const userId = this.queryUserId(playerId);
        if (Gtk.isNullOrEmpty(userId)) return;

        const player = Player.getPlayer(playerId);
        const userName = player.nickname;
        const userAvatar = player["avatarUrl"];
        const requestParam: UpdateBattleWorldRankDataReq = {
            userId,
            sceneId: await this.querySceneId(userId),
            userName,
            userAvatar,
            grade,
            gradeOriginalPower,
            round,
            recordTime: Math.floor(Date.now() / 1000),
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
        if (!GameServiceConfig.isBeta && !GameServiceConfig.isRelease) return "INVALID_SCENE_ID";
        return ((
            await mw.TeleportService.asyncGetPlayerRoomInfo(userId).catch((e) => {
                Log4Ts.error(AuthModuleS, e);
                return Promise.resolve(undefined as mw.RoomInfo);
            })
        )?.sceneId ?? "INVALID_SCENE_ID");
    }

    private async correspondHandler<D = object>(reqParam: object,
                                                releaseUrl: string,
                                                testUrl: string,
                                                silence: boolean = false,
                                                useEncrypt: boolean = true,
                                                authUserId?: string) {
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
        }

        const resp = await fetch(
            `${GameServiceConfig.isRelease || !GameServiceConfig.isUseTestUrl ? releaseUrl : testUrl}`,
            {
                method: "POST",
                headers,
                body: JSON.stringify(body),
            },
        );

        const respJson = await resp.json<D>();
        if (!silence) {
            Log4Ts.log(AuthModuleS, `get resp. ${JSON.stringify(respJson)}`);
        }
        return respJson;
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

    private setCurrency(userId: string, count: string) {
        this.userCurrencyMap.set(userId, count);
        this.getClient(Player.getPlayer(userId))?.net_setCurrency(count);
    }

    private onRefreshToken(userId: string) {
        this.queryCurrency(userId);
    }

    private onTokenExpired(userId: string) {
        Log4Ts.warn(AuthModuleS, `token expired. refreshing... userId: ${userId}`);
        this._tokenMap.set(userId, null);
        if (this._expiredRegulatorMap.get(userId).request())
            this.getClient(Player.getPlayer(userId))?.net_refreshToken();
    }

//#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

//#region Net Method
    public async net_getToken(): Promise<string> {
        const playerId = this.currentPlayerId;
        const uid = this.currentPlayer.userId;
        return `token-${playerId}-${uid}`;
    }

    @noReply()
    public net_initPlayerData(nickName: string) {
        this.currentData.holdUserId = this.currentPlayer.userId;
        this.currentData.holdPlayerId = this.currentPlayerId;
        this.currentData.holdNickName = nickName;
        this.currentData.save(false);
    }

    @noReply()
    public net_reportTempToken(token: string) {
        const currentPlayer = this.currentPlayer;
        if (!this.checkRequestRegulator(currentPlayer.playerId)) return;

        this.getP12Token(currentPlayer.userId, token);
    }

    @noReply()
    public net_refreshCurrency() {
        if (!this.checkRequestRegulator(this.currentPlayerId)) return;

        this.queryCurrency(this.currentPlayer.userId);
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

function logWPlayerNotExist(id: number | string, isPlayerId: boolean = true) {
    Log4Ts.warn(AuthModuleS, `can't find player ${isPlayerId ? "id" : "userId"}: ${id}.`);
}

function logEUserTokenInvalid(userId: string): void {
    Log4Ts.error(AuthModuleS, `user token invalid. id: ${userId}`);
}
