import CryptoJS from "crypto-js";
import {EventDefine} from "../../const/EventDefine";
import GameServiceConfig from "../../const/GameServiceConfig";
import {SubGameTypes} from "../../const/SubGameTypes";
import Log4Ts, {Announcer, LogString} from "../../depend/log4ts/Log4Ts";
import FixedQueue from "../../depend/queue/FixedQueue";
import Regulator from "../../depend/regulator/Regulator";
import i18n from "../../language/i18n";
import GToolkit, {Expression, TimeFormatDimensionFlags} from "../../util/GToolkit";
import noReply = mwext.Decorator.noReply;
import {TimeManager} from "../../controller/TimeManager";
import AreaManager from "../../gameplay/area/AreaManager";
import {isPointInShape2D} from "../../util/area/Shape";
import GlobalProperty from "../../GlobalProperty";

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
 * 子游戏信息 记录请求.
 */
interface EncryptedData {
    encryptData: string;
}

/**
 * 子游戏信息.
 */
interface SubGameInfo {
    /**
     * 用户 uuid.
     */
    userId: string,
    /**
     * 闯关的积分.
     */
    point: number,
    /**
     * 这是第几个小游戏，目前只能填 6.
     */
    gameNum: number,
    /**
     * 完成时间.
     */
    achievedAt: number,
    /**
     * 当前签名时间.
     */
    timestamp: number,
}

/**
 * Code 验证回复.
 */
interface CodeVerifyResponse {
    code: number;
    message: string;
    data: boolean;
}

/**
 * 彩虹跳跳乐 排行榜更新参数.
 */
interface RainbowLeapRankUpdateParams {
    userId: string;
    userName: string;
    headUrl: string;
    star: number;
    round: number;
    requestTs: number;
}

export default class DragonVerseAuthModuleData extends mwext.Subdata {
    /**
     * 已经发布的正式数据版本号.
     * 以版本发布时间 升序排列.
     * RV.
     */
    public static readonly RELEASE_VERSIONS: number[] = [
        1,
        202401051219,
        202403181323,
    ];

    /**
     * 版本升级办法.
     * UVM[n] : 从 RV[n] 升级到 RV[n+1] 的方法.
     */
    public static readonly UPDATE_VERSION_METHOD: DataUpgradeMethod<DragonVerseAuthModuleData>[] = [
        (data: DragonVerseAuthModuleData) => {
            data.holdUserId = null;
            data.holdPlayerId = null;
            data.holdNickName = null;
        },
        (data: DragonVerseAuthModuleData) => {
            data["enterEnable"] = undefined;
        },
    ];

    @Decorator.persistence()
    public holdUserId: string;

    @Decorator.persistence()
    public holdPlayerId: number;

    @Decorator.persistence()
    public holdNickName: string;

    /**
     * 玩家 Code 验证请求时间记录.
     */
    @Decorator.persistence()
    public codeVerifyReqData: number[] = [];

    //#region Sub data
    protected initDefaultData(): void {
        super.initDefaultData();
        this.holdUserId = null;
        this.holdPlayerId = null;
        this.holdNickName = null;
    }

    protected onDataInit(): void {
        super.onDataInit();
        this.checkVersion();
    }

    /**
     * 定义为最新版本号.
     * 为什么不做成只读属性而是个 getter 呢.
     */
    public get version(): number {
        return DragonVerseAuthModuleData.RELEASE_VERSIONS[DragonVerseAuthModuleData.RELEASE_VERSIONS.length - 1];
    }

    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

    /**
     * 数据版本检查.
     */
    public checkVersion() {
        if (this.currentVersion === this.version) return;

        Log4Ts.log(DragonVerseAuthModuleData,
            `数据准备升级`,
            () => `当前版本: ${this.currentVersion}`,
            () => `最新版本: ${this.version}.`,
        );

        const startIndex = DragonVerseAuthModuleData.RELEASE_VERSIONS.indexOf(this.currentVersion);
        if (startIndex < 0) {
            Log4Ts.error(
                DragonVerseAuthModuleData,
                `数据号版本异常`,
                `不是已发布的版本号`,
                () => `当前版本: ${this.currentVersion}.`);
            return;
        }

        for (let i = startIndex; i < DragonVerseAuthModuleData.UPDATE_VERSION_METHOD.length - 1; ++i) {
            DragonVerseAuthModuleData.UPDATE_VERSION_METHOD[i](this);
            this.currentVersion = DragonVerseAuthModuleData.RELEASE_VERSIONS[i + 1];
        }
    }
}

/**
 * 请求频率守卫.
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
class RequestGuard {
    private _q: FixedQueue<number> = new FixedQueue<number>(GameServiceConfig.DAILY_MAX_TRIAL_COUNT);
    private _p: number = -1;

    public req(time: number = undefined): boolean {
        const now = time ?? TimeManager.getInstance().currentTime;
        if (now < this._q.back()) {
            // 失序.
            return false;
        }

        this._p -= this._q.shiftAll(item => now - item > GToolkit.timeConvert(1, TimeFormatDimensionFlags.Day, TimeFormatDimensionFlags.Millisecond));
        let p = this._p;
        while (true) {
            const item = this._q.get(++p);
            if (item === null || now - item <= GToolkit.timeConvert(1, TimeFormatDimensionFlags.Hour, TimeFormatDimensionFlags.Millisecond)) break;
        }
        this._p = p - 1;

        if (this._q.length - this._p - 1 < GameServiceConfig.HOUR_MAX_TRIAL_COUNT) {
            this._q.push(time);
            return true;
        }

        return false;
    }

    public init(data: number[]): this {
        this._q.length = 0;
        for (const d of data) {
            this.req(d);
        }

        return this;
    }

    public toArray() {
        return this._q.toArray();
    }
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
export class AuthModuleC extends mwext.ModuleC<AuthModuleS, DragonVerseAuthModuleData> {
    //#region Member
    private _originToken: string = null;

    private _lastSubGameReportTime: number = 0;

    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

    //#region MetaWorld Event
    protected onAwake(): void {
        super.onAwake();
    }

    protected onStart(): void {
        super.onStart();

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
        this.releasePlayer();
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

    private generateSaltToken(): SaltToken {
        const time = TimeManager.getInstance().currentTime;
        return new SaltToken(
            AuthModuleS.encryptToken(this._originToken, time),
            time);
    }

    /**
     * 放行玩家.
     * 容忍重复调用.
     * @private
     */
    private releasePlayer() {
        logState(
            AuthModuleC,
            "log",
            `release player. enjoy!`,
            true, Player.localPlayer.playerId);
        Event.dispatchToLocal(EventDefine.PlayerEnableEnter);
    }

    /**
     * 上报子游戏信息.
     * @param clientTimeStamp
     * @param subGameType
     * @param value
     */
    public reportSubGameInfo(clientTimeStamp: number, subGameType: SubGameTypes, value: number) {
        const now = TimeManager.getInstance().currentTime;
        const thanLastReport = now - this._lastSubGameReportTime;
        if (thanLastReport <= GameServiceConfig.MIN_SUB_GAME_INFO_INTERVAL) {
            return;
        }
        this._lastSubGameReportTime = now;
        this.server.net_reportSubGameInfo(clientTimeStamp, subGameType, value);
    }

    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

    //#region Net Method
    public net_verifyFail() {
        Event.dispatchToLocal(EventDefine.ShowGlobalPrompt, i18n.lan("verifyCodeFail"));
    }

    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
}

export class AuthModuleS extends mwext.ModuleS<AuthModuleC, DragonVerseAuthModuleData> {
    //#region Constant
    /**
     * 验证时间容差.
     * 容差范围内的时间允许通过验证.
     * @private
     */
    private static readonly TIME_TOLERATE: number = 1e3 * 10;

    /**
     * 测试用 P12 端 Url.
     */
    private static readonly TEST_P12_URL = "https://modragon-api-test.mobox.app";

    /**
     * 发布用 P12 端 Url.
     */
    private static readonly RELEASE_P12_URL = "https://modragon-api.mobox.app";

    /**
     * 测试用 mobox NFT Url.
     * @type {string}
     * @private
     */
    private static readonly TEST_MOBOX_NFT_URL = "http://16.163.58.210:8087";

    /**
     * 发布用 mobox NFT Url.
     * @type {string}
     * @private
     */
    private static readonly RELEASE_MOBOX_NFT_URL = "https://nft-api.mobox.io";

    /**
     * Code 验证 Url 后缀.
     * @private
     */
    private static readonly CODE_VERIFY_URL_SUFFIX = "/modragon/code/status";

    /**
     * 子游戏信息汇报 Url 后缀.
     * @private
     */
    private static readonly SUB_GAME_REPORT_URL_SUFFIX = "/modragon/achievement";

    /**
     * 彩虹跳跳乐 信息汇报 Url 后缀.
     * @type {string}
     * @private
     */
    private static readonly RAINBOW_LEAP_REPORT_URL_SUFFIX = "/mo-rank/rainbow-leap/update";

    /**
     * 测试用 Code 验证 Url.
     */
    private static get TEST_CODE_VERIFY_URL() {
        return this.TEST_P12_URL + this.CODE_VERIFY_URL_SUFFIX;
    }

    /**
     * 发布用 Code 验证 Url.
     */
    private static get RELEASE_CODE_VERIFY_URL() {
        return this.RELEASE_P12_URL + this.CODE_VERIFY_URL_SUFFIX;
    }

    /**
     * 测试用 子游戏信息汇报 Url.
     */
    private static get TEST_SUB_GAME_REPORT_URL() {
        return this.TEST_P12_URL + this.SUB_GAME_REPORT_URL_SUFFIX;
    }

    /**
     * 发布用 子游戏信息汇报 Url.
     */
    private static get RELEASE_SUB_GAME_REPORT_URL() {
        return this.RELEASE_P12_URL + this.SUB_GAME_REPORT_URL_SUFFIX;
    }

    /**
     * 测试用 彩虹跳跳乐 信息汇报 Url.
     */
    private static get TEST_RAINBOW_LEAP_REPORT_URL() {
        return this.TEST_MOBOX_NFT_URL + this.RAINBOW_LEAP_REPORT_URL_SUFFIX;
    }

    /**
     * 发布用 彩虹跳跳乐 信息汇报 Url.
     */
    private static get RELEASE_RAINBOW_LEAP_REPORT_URL() {
        return this.RELEASE_MOBOX_NFT_URL + this.RAINBOW_LEAP_REPORT_URL_SUFFIX;
    }

    private _patrolRegulator: Regulator = new Regulator(GameServiceConfig.GUARD_PATROL_INTERVAL);

    /**
     * encrypt token with time salt.
     * @param token
     * @param saltTime
     */
    public static encryptToken(token: string, saltTime: number): string {
        if (GToolkit.isNullOrEmpty(token)) {
            Log4Ts.log({name: "AuthModule"}, `token is empty when encrypt.`);
            return null;
        }
        //TODO_LviatYi encrypt token with time salt
        const saltTimeStr = saltTime.toString();
        return saltTimeStr.substring(0, saltTimeStr.length / 2) +
            token +
            saltTimeStr.substring(saltTimeStr.length / 2, saltTimeStr.length);
    }

    /**
     * decrypt token with time salt.
     * @param saltToken
     * @param saltTime
     */
    public static decryptToken(saltToken: string, saltTime: number): string {
        if (GToolkit.isNullOrEmpty(saltToken)) {
            return null;
        }
        //TODO_LviatYi decrypt token with time salt
        const saltTimeStr = saltTime.toString();
        const token = saltToken.substring(saltTimeStr.length / 2, saltToken.length - saltTimeStr.length / 2);
        const timeStr = saltToken.substring(0, saltTimeStr.length / 2) + saltToken.substring(saltToken.length - saltTimeStr.length / 2, saltToken.length);

        return timeStr === saltTime.toString() ? token : null;
    }

    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

    //#region Member
    private _codeVerifyMap: Map<number, RequestGuard> = new Map<number, RequestGuard>();

    private _subGameReportMap: Map<number, number> = new Map<number, number>();
    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

    //#region MetaWorld Event
    protected onAwake(): void {
        super.onAwake();
    }

    protected onStart(): void {
        super.onStart();
        AuthModuleS.getSensitiveData();
        //#region Member init     
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
            playerData.codeVerifyReqData = this._codeVerifyMap.get(player.playerId).toArray();
            playerData.save(false);
        } else {
            Log4Ts.log(AuthModuleS, `there is no data for player ${player.playerId}.`);
        }
        this._codeVerifyMap.delete(player.playerId);
        this._subGameReportMap.delete(player.playerId);
    }

    protected onPlayerEnterGame(player: Player): void {
        super.onPlayerEnterGame(player);
        this._codeVerifyMap.set(player.playerId, new RequestGuard().init(this.getPlayerData(player).codeVerifyReqData));
    }

    protected onPlayerJoined(player: Player): void {
        super.onPlayerJoined(player);
    }

    private static readonly CODE_VERIFY_AES_KEY_STORAGE_KEY = "CODE_VERIFY_AES_KEY_STORAGE_KEY";

    private static readonly CLIENT_ID_STORAGE_KEY = "CLIENT_ID_STORAGE_KEY";

    private static readonly SECRET_STORAGE_KEY = "SECRET_STORAGE_KEY";

    private static readonly PLACE_HOLDER = "REPLACE_IT";

    private static CODE_VERIFY_AES_KEY = "";

    private static CODE_VERIFY_AES_IV = "";

    private static CLIENT_ID = "";

    private static SECRET = "";

    public static readonly KEY_STORAGE_GET_FAILED_REFRESH_INTERVAL = 5e3;

    private static getSensitiveData() {
        GToolkit.doUntilTrue(
            () => !GToolkit.isNullOrEmpty(this.CODE_VERIFY_AES_KEY),
            this.getCodeVerifyAesKey,
            AuthModuleS.KEY_STORAGE_GET_FAILED_REFRESH_INTERVAL,
        );
        GToolkit.doUntilTrue(
            () => !GToolkit.isNullOrEmpty(this.CLIENT_ID),
            this.getClientId,
            AuthModuleS.KEY_STORAGE_GET_FAILED_REFRESH_INTERVAL,
        );
        GToolkit.doUntilTrue(
            () => !GToolkit.isNullOrEmpty(this.SECRET),
            this.querySecret,
            AuthModuleS.KEY_STORAGE_GET_FAILED_REFRESH_INTERVAL,
        );
    }

    private static getCodeVerifyAesKey() {
        DataStorage.asyncGetData(AuthModuleS.CODE_VERIFY_AES_KEY_STORAGE_KEY).then(
            (value) => {
                Log4Ts.log(AuthModuleS, `value`, value.code);
                if (value.code === 200) {
                    if (!GToolkit.isNullOrUndefined(value.data) && value.data !== AuthModuleS.PLACE_HOLDER) {
                        AuthModuleS.CODE_VERIFY_AES_KEY = value.data;
                        AuthModuleS.CODE_VERIFY_AES_IV = AuthModuleS.CODE_VERIFY_AES_KEY.slice(0, 16).split("").reverse().join("");
                    } else {
                        Log4Ts.log(AuthModuleS, `getCodeVerifyAesKey Failed`);
                        DataStorage.asyncSetData(AuthModuleS.CODE_VERIFY_AES_KEY_STORAGE_KEY, AuthModuleS.PLACE_HOLDER);
                    }
                }
            }
        );
    }

    private static getClientId() {
        DataStorage.asyncGetData(AuthModuleS.CLIENT_ID_STORAGE_KEY).then(
            (value) => {
                if (value.code === 200) {
                    if (!GToolkit.isNullOrUndefined(value.data) && value.data !== AuthModuleS.PLACE_HOLDER) {
                        AuthModuleS.CLIENT_ID = value.data;
                    } else {
                        Log4Ts.log(AuthModuleS, `getClientId Failed`);
                        DataStorage.asyncSetData(AuthModuleS.CLIENT_ID_STORAGE_KEY, AuthModuleS.PLACE_HOLDER);
                    }
                }
            }
        );
    }

    private static querySecret() {
        DataStorage.asyncGetData(AuthModuleS.SECRET_STORAGE_KEY).then(
            (value) => {
                if (value.code === 200) {
                    if (!GToolkit.isNullOrUndefined(value.data) && value.data !== AuthModuleS.PLACE_HOLDER) {
                        AuthModuleS.SECRET = value.data;
                    } else {
                        Log4Ts.log(AuthModuleS, `querySecret Failed`);
                        DataStorage.asyncSetData(AuthModuleS.SECRET_STORAGE_KEY, AuthModuleS.PLACE_HOLDER);
                    }
                }
            }
        );
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
        if (GToolkit.isNullOrEmpty(token)) {
            Log4Ts.log({name: "AuthModule"}, `token invalid.`);
            return false;
        }

        //TODO_LviatYi 与现存 token 进行比对.
        return true;
    }

    private getSecret(message: string) {
        const e = CryptoJS.AES.encrypt(
            message,
            CryptoJS.enc.Utf8.parse(AuthModuleS.CODE_VERIFY_AES_KEY),
            {
                iv: CryptoJS.enc.Utf8.parse(AuthModuleS.CODE_VERIFY_AES_IV),
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7,
            },
        );
        return e.ciphertext.toString(CryptoJS.enc.Base64);
    }

    /**
     * 上报子游戏信息.
     * @param playerId 玩家 Id.
     * @param clientTimeStamp 客户端完成时间戳.
     * @param subGameType 子游戏类型.
     * @param value 汇报值.
     */
    public async reportSubGameInfo(playerId: number, clientTimeStamp: number, subGameType: SubGameTypes, value: number) {
        // if (!this.subGameIntervalCheck(playerId)) {
        //     Log4Ts.log(AuthModuleS, `report sub game info too frequently.`);
        //     return;
        // }
        // const uid = Player.getPlayer(playerId)?.userId ?? null;
        // if (GToolkit.isNullOrEmpty(uid)) {
        //     Log4Ts.error(AuthModuleS, `can't find player ${playerId} when report sub game info.`);
        //     return;
        // }
        // const reportInfo: SubGameInfo = {
        //     userId: uid,
        //     point: value,
        //     gameNum: subGameType,
        //     achievedAt: clientTimeStamp,
        //     timestamp: Date.now(),
        // };
        // const secret = this.getSecret(JSON.stringify(reportInfo));
        // const body: SubGameRequest = {
        //     secret: secret,
        // };
        //
        // const resp = await fetch(`${GlobalProperty.getInstance().isRelease ?
        //         AuthModuleS.RELEASE_SUB_GAME_REPORT_URL :
        //         AuthModuleS.TEST_SUB_GAME_REPORT_URL}`,
        //     {
        //         method: "POST",
        //         headers: {
        //             "Content-Type": "application/json;charset=UTF-8",
        //         },
        //         body: JSON.stringify(body),
        //     });
        //
        // const respInJson = await resp.json();
        // Log4Ts.log(AuthModuleS, `get resp when report sub game info. ${JSON.stringify(respInJson)}`);
    }

    /**
     * 上报彩虹跑酷信息.
     * @param playerId 玩家 Id.
     * @param star 星星数量.
     * @param round 轮次.
     */
    public async reportRainbowLeapInfo(playerId: number, star: number, round: number) {
        if (!this.subGameIntervalCheck(playerId)) {
            Log4Ts.log(AuthModuleS, `report rainbow leap info too frequently.`);
            return;
        }
        const player = Player.getPlayer(playerId) ?? null;
        if (GToolkit.isNullOrUndefined(player)) {
            Log4Ts.error(AuthModuleS, `can't find player ${playerId} when report rainbow leap info.`);
            return;
        }

        const reportInfo: RainbowLeapRankUpdateParams = {
            userId: player.userId,
            userName: player.nickname,
            headUrl: player["avatarUrl"],
            star,
            round,
            requestTs: Math.ceil(Date.now() / 1000),
        };
        const encryptData = this.getSecret(JSON.stringify(reportInfo));
        const body: EncryptedData = {
            encryptData,
        };

        const resp = await fetch(`${GlobalProperty.getInstance().isRelease ?
                AuthModuleS.RELEASE_RAINBOW_LEAP_REPORT_URL :
                AuthModuleS.TEST_RAINBOW_LEAP_REPORT_URL}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json;charset=UTF-8",
                },
                body: JSON.stringify(body),
            });

        const respInJson = await resp.json();
        Log4Ts.log(AuthModuleS, `get resp when report rainbow leap info. ${JSON.stringify(respInJson)}`);
    }

    private subGameIntervalCheck(playerId: number): boolean {
        const thanLastReport = Date.now() - (this._subGameReportMap.get(playerId) ?? 0);
        if (thanLastReport <= GameServiceConfig.MIN_SUB_GAME_INFO_INTERVAL) return false;
        this._subGameReportMap.set(playerId, Date.now());
        return true;
    }

    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

    //#region Net Method
    public net_getToken(): Promise<string> {
        const playerId = this.currentPlayerId;
        const uid = this.currentPlayer.userId;
        return Promise.resolve(`token-${playerId}-${uid}`);
    }

    /**
     * 上报子游戏信息.
     * @param clientTimeStamp 客户端完成时间戳.
     * @param subGameType 子游戏类型.
     * @param value 汇报值.
     */
    @noReply()
    public net_reportSubGameInfo(clientTimeStamp: number, subGameType: SubGameTypes, value: number) {
        this.reportSubGameInfo(this.currentPlayerId, clientTimeStamp, subGameType, value);
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
    code: string = undefined): void {
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