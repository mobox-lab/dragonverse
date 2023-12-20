import CryptoJS from "crypto-js";
import GameStart from "../../GameStart";
import { EventDefine } from "../../const/EventDefine";
import GameServiceConfig from "../../const/GameServiceConfig";
import { SubGameTypes } from "../../const/SubGameTypes";
import Log4Ts, { Announcer, LogString } from "../../depend/log4ts/Log4Ts";
import FixedQueue from "../../depend/queue/FixedQueue";
import Regulator from "../../depend/regulator/Regulator";
import i18n from "../../language/i18n";
import GToolkit, { Expression, TimeFormatDimensionFlags } from "../../util/GToolkit";
import ModuleS = mwext.ModuleS;
import ModuleC = mwext.ModuleC;
import SubData = mwext.Subdata;
import noReply = mwext.Decorator.noReply;
import { TimeManager } from "../../controller/TimeManager";

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
 * Code 验证请求.
 */
interface CodeVerifyRequest {
    secret: string;
    userId: string;
    address?: string;
}

/**
 * 子游戏信息 记录请求.
 */
interface SubGameRequest {
    secret: string;
    userId: string;
    takeTime: number;
}

/**
 * Code 验证回复.
 */
interface CodeVerifyResponse {
    code: number;
    message: string;
    data: boolean;
}

export default class AuthModuleData extends SubData {
    //@Decorator.saveProperty
    //public isSave: bool;

    /**
     * 玩家准入权限.
     */
    @Decorator.persistence()
    public enterEnable: boolean = false;

    /**
     * 玩家 Code 验证请求时间记录.
     */
    @Decorator.persistence()
    public codeVerifyReqData: number[] = [];
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

        if (this._q.length - this._p - 1 < 3) {
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
export class AuthModuleC extends ModuleC<AuthModuleS, AuthModuleData> {
    //#region Member
    private _originToken: string = null;

    private _lastVerifyCodeTime: number = null;

    private _codeVerityGuard: RequestGuard = new RequestGuard();

    private _lastSubGameReportTime: number = 0;

    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

    //#region MetaWorld Event
    protected onAwake(): void {
        super.onAwake();
    }

    protected onStart(): void {
        super.onStart();

        //#region Member init
        //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

        //#region Event Subscribe
        //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
    }

    protected onUpdate(dt: number): void {
        super.onUpdate(dt);

        //改到服务端处理，减少rpc调用
        // if (this._patrolRegulator.ready()) this.patrol();
    }

    protected onEnterScene(sceneType: number): void {
        super.onEnterScene(sceneType);
        this._codeVerityGuard.init(this.data.codeVerifyReqData);
        this.server.net_getToken().then((value) => {
            this._originToken = value;
        });
        if (this.data.enterEnable) {
            this.releasePlayer();
        } else {
            this.forbiddenPlayer();
        }

    }

    protected onDestroy(): void {
        super.onDestroy();
        //#region Event Unsubscribe
        //TODO_LviatYi 
        //#endregion ------------------------------------------------------------------------------------------
    }

    protected onExecute(type: number, ...params: any[]): void {
        super.onExecute(type, ...params);
    }

    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

    //#region Method
    /**
     * 验证 Code.
     * @param code
     */
    public verifyCode(code: string): void {
        const playerId = Player.localPlayer.playerId;
        logState(
            AuthModuleC,
            "log",
            `try to verify code.`,
            true,
            playerId,
            Player.localPlayer.userId,
            code,
        );

        if (this.isVerifyCodeRunning()) {
            Log4Ts.log(
                AuthModuleC,
                `player is verifying code.`);
            Event.dispatchToLocal(EventDefine.ShowGlobalPrompt, { message: i18n.lan("isVerifying") });
            return;
        }

        if (this.data.enterEnable) {
            Log4Ts.log(
                AuthModuleC,
                `player already enable enter.`,
                `try patrol in server.`);

            this.releasePlayer();
            this.server.net_patrol();
            return;
        }

        const now = TimeManager.getInstance().currentTime;
        if (this._codeVerityGuard.req(now)) {
            this._lastVerifyCodeTime = now;
            this.server.net_verifyCode(this.generateSaltToken(), code);
        } else {
            Log4Ts.warn(AuthModuleC, `code verify request too frequently.`);
            Event.dispatchToLocal(EventDefine.ShowGlobalPrompt, { message: i18n.lan("verifyCodeTooFrequently") });
        }
    }

    /**
     * 是否 仍在验证过程.
     */
    public isVerifyCodeRunning(): boolean {
        if (this._lastVerifyCodeTime === null || TimeManager.getInstance().currentTime - this._lastVerifyCodeTime >= GameServiceConfig.MAX_AUTH_WAITING_TIME) {
            this._lastVerifyCodeTime = null;
            return false;
        }

        return true;
    }

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
     * @description: 玩家禁止进入
     */
    private forbiddenPlayer() {
        logState(
            AuthModuleC,
            "log",
            `forbidden player`,
            true, Player.localPlayer.playerId);
        Event.dispatchToLocal(EventDefine.PlayerDisableEnter);
    }

    /**
     * 巡逻.
     */
    public patrol() {
        //TODO_LviatYi 圈定新手村区域 进行区域检查

        if (!this.data.enterEnable) return;
        this.server.net_patrol();
    }

    /**
     * 是否 允许请求 code 验证.
     * @private
     */
    private isVerityCodeEnable(): boolean {
        return this._lastVerifyCodeTime === null || TimeManager.getInstance().currentTime - this._lastVerifyCodeTime >= GameServiceConfig.MAX_AUTH_WAITING_TIME;
    }

    /**
     * 上报子游戏信息.
     * @param subGameType
     * @param duration
     */
    public reportSubGameInfo(subGameType: SubGameTypes, duration: number) {
        const now = TimeManager.getInstance().currentTime;
        const thanLastReport = now - this._lastSubGameReportTime;
        if (thanLastReport > GameServiceConfig.MIN_SUB_GAME_INFO_INTERVAL && thanLastReport > duration) {
            this._lastSubGameReportTime = now;
            this.server.net_reportSubGameInfo(subGameType, duration);
        }
    }

    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

    //#region Net Method
    public net_verifyFail() {
        this._lastVerifyCodeTime = null;
        Event.dispatchToLocal(EventDefine.ShowGlobalPrompt, { message: i18n.lan("verifyCodeFail") });
    }

    public net_enableEnter() {
        this._lastVerifyCodeTime = null;
        if (this.data.enterEnable) {
            logState(
                AuthModuleC,
                "log",
                `player already enable enter.`,
                true, Player.localPlayer.playerId);
            return;
        }
        Event.dispatchToLocal(EventDefine.ShowGlobalPrompt, { message: i18n.lan(i18n.keyTable.verifyCodeSuccess) });
        this.data.enterEnable = true;
        this.releasePlayer();
    }

    /**
     * 是否 通过验证.
     */
    public canEnterGame(): boolean {
        let res = this.data.enterEnable;
        if (res) {
            //去服务端校验一下，不一样会踢下线
            this.patrol();
        }
        return res;
    }

    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
}

export class AuthModuleS extends ModuleS<AuthModuleC, AuthModuleData> {
    //#region Constant
    /**
     * 验证时间容差.
     * 容差范围内的时间允许通过验证.
     * @private
     */
    private static readonly TIME_TOLERATE: number = 1e3 * 10;

    /**
     * 测试用 Code 验证 Url.
     */
    private static readonly TEST_CODE_VERIFY_URL = "https://platform-api-test.p12.games/modragon/code/status";

    /**
     * 发布用 Code 验证 Url.
     */
    private static readonly RELEASE_CODE_VERIFY_URL = "https://platform-api.p12.games/modragon/code/status";

    private static readonly CODE_VERIFY_AES_KEY = "MODRAGONMODRAGONMODRAGON";

    private static readonly CODE_VERIFY_AES_IV = this.CODE_VERIFY_AES_KEY.slice(0, 16).split("").reverse().join("");

    private _patrolRegulator: Regulator = new Regulator(GameServiceConfig.GUARD_PATROL_INTERVAL);

    /**
     * encrypt token with time salt.
     * @param token
     * @param saltTime
     */
    public static encryptToken(token: string, saltTime: number): string {
        if (GToolkit.isNullOrEmpty(token)) {
            Log4Ts.log({ name: "AuthModule" }, `token is empty when encrypt.`);
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

        //#region Member init     
        //#endregion ------------------------------------------------------------------------------------------ 

        //#region Event Subscribe
        //#endregion ------------------------------------------------------------------------------------------
    }

    protected onUpdate(dt: number): void {
        super.onUpdate(dt);

        //定时检测
        if (this._patrolRegulator.ready()) {
            Player.getAllPlayers().forEach(player => {
                this.checkPlayerEnterEnable(player.playerId);
            });
        }
    }

    protected onDestroy(): void {
        super.onDestroy();
        //#region Event Unsubscribe
        //TODO_LviatYi 
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

    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

    //#region Method
    private timeVerify(reqTime: number): boolean {
        const serverNow = Date.now();
        return Math.abs(serverNow - reqTime) < AuthModuleS.TIME_TOLERATE;
    }

    private tokenVerify(saltToken: SaltToken): boolean {
        if (!this.timeVerify(saltToken.time)) {
            Log4Ts.log({ name: "AuthModule" }, `token time verify failed.`);
            return false;
        }
        const token = AuthModuleS.decryptToken(saltToken.content, saltToken.time);
        if (GToolkit.isNullOrEmpty(token)) {
            Log4Ts.log({ name: "AuthModule" }, `token invalid.`);
            return false;
        }

        //TODO_LviatYi 与现存 token 进行比对.
        return true;
    }

    private async verifyEnterCode(code: string, uid: string): Promise<boolean> {
        //#region Exist for Test
        //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
        const codeSalt = `${code}-${Date.now()}`;
        const e = CryptoJS.AES.encrypt(
            codeSalt,
            CryptoJS.enc.Utf8.parse(AuthModuleS.CODE_VERIFY_AES_KEY),
            {
                iv: CryptoJS.enc.Utf8.parse(AuthModuleS.CODE_VERIFY_AES_IV),
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7,
            },
        );
        const secret = e.ciphertext.toString(CryptoJS.enc.Base64);
        const body: CodeVerifyRequest = {
            secret: secret,
            userId: uid,
        };

        const url = `${GameStart.instance.isRelease ?
            AuthModuleS.RELEASE_CODE_VERIFY_URL :
            AuthModuleS.TEST_CODE_VERIFY_URL}`;
        console.log(url);
        const resp = await fetch(`${GameStart.instance.isRelease ?
            AuthModuleS.RELEASE_CODE_VERIFY_URL :
            AuthModuleS.TEST_CODE_VERIFY_URL}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json;charset=UTF-8",
                },
                body: JSON.stringify(body),
            });

        const respInJson = await resp.json<CodeVerifyResponse>();
        return (respInJson?.code ?? null) === 200;
        // return respInJson?.data ?? false;
    }

    /**
     * 记录玩家准入权限.
     * @param player
     */
    public recordPlayer(player: number | Player): boolean {
        logState(
            AuthModuleS,
            "log",
            `release player. enjoy!`,
            true,
            typeof player === "number" ? player : player.playerId,
            GToolkit.queryPlayer(player).userId);

        const data = this.getPlayerData(player);
        if (data.enterEnable) {
            logState(
                AuthModuleS,
                "warn",
                `player already recorded.`,
                true,
                typeof player === "number" ? player : player.playerId);
            return false;
        }

        data.enterEnable = true;
        data.save(false);
        return true;
    }

    /**
     * 上报子游戏信息.
     * @param playerId
     * @param subGameType
     * @param duration
     */
    public reportSubGameInfo(playerId: number, subGameType: SubGameTypes, duration: number) {
        const thanLastReport = Date.now() - this._subGameReportMap.get(playerId) ?? 0;
        if (thanLastReport > GameServiceConfig.MIN_SUB_GAME_INFO_INTERVAL && thanLastReport > duration) {
            this._subGameReportMap.set(playerId, Date.now());
            //TODO_LviatYi 报告子游戏信息.
        }
    }

    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

    //#region Net Method
    public net_getToken(): Promise<string> {
        const playerId = this.currentPlayerId;
        const uid = this.currentPlayer.userId;
        return new Promise<string>((resolve, reject) => {
            resolve(`token-${playerId}-${uid}`);
        });
    }

    /**
     * 无准入 C 请求 P12 端验证 Code.
     * 如通过则放行.
     * @param token
     * @param code
     */
    @noReply()
    public net_verifyCode(token: SaltToken, code: string) {
        const currPlayerId = this.currentPlayerId;
        if (!this._codeVerifyMap.get(currPlayerId).req()) {
            this.getClient(currPlayerId)?.net_verifyFail();
            return;
        }
        const uid = this.currentPlayer.userId;
        logState(
            AuthModuleS,
            "log",
            `receive code verify request.`,
            true,
            currPlayerId,
            uid,
            code);

        if (!this.tokenVerify(token)) {
            logState(
                AuthModuleS,
                "warn",
                `token verify failed. token is invalid`,
                true,
                currPlayerId,
                uid,
            );
            this.getClient(this.currentPlayerId)?.net_verifyFail();
            return;
        }

        this
            .verifyEnterCode(code, uid)
            .then((value) => {
                if (!value) {
                    logState(
                        AuthModuleS,
                        "log",
                        `verify failed.`,
                        true,
                        currPlayerId,
                        uid,
                    );
                    this.getClient(currPlayerId)?.net_verifyFail();
                    return;
                }
                this.recordPlayer(currPlayerId);
                if (value) this.getClient(currPlayerId)?.net_enableEnter();
            },
            )
            .catch((reason) => {
                this.getClient(currPlayerId)?.net_verifyFail();
            });
    }

    /**
     * 无准入 C 请求检查 S 端是否具有准入权限.
     * 如有请求放行.
     */
    @noReply()
    public net_checkPlayEnterEnable() {
        logState(
            AuthModuleS,
            "log",
            `receive check auth request.`,
            true,
            this.currentPlayerId,
            Player.getPlayer(this.currentPlayerId).userId,
        );

        if (this.getPlayerData(this.currentPlayerId).enterEnable) {
            logState(
                AuthModuleS,
                "log",
                `enable enter.`,
                true,
                this.currentPlayerId,
                Player.getPlayer(this.currentPlayerId).userId,
            );

            this.getClient(this.currentPlayerId)?.net_enableEnter();
        }
    }

    /**
     * 有准入 C 巡逻 请求检查 S 端是否具有准入权限.
     * 如无则踢出.
     */
    @noReply()
    public net_patrol() {
        logState(
            AuthModuleS,
            "log",
            `receive patrol request.`,
            true,
            this.currentPlayerId,
            Player.getPlayer(this.currentPlayerId).userId,
        );

        if (this.currentData.enterEnable) return;

        logState(
            AuthModuleS,
            "warn",
            `detect player don't have access when patrolling.`,
            true,
            this.currentPlayerId,
            Player.getPlayer(this.currentPlayerId).userId,
        );

        RoomService.kick(this.currentPlayer, "You don't have access");
    }

    /**
     * 上报子游戏信息.
     * @param subGameType
     * @param duration
     */
    @noReply()
    public net_reportSubGameInfo(subGameType: SubGameTypes, duration: number) {
        this.reportSubGameInfo(this.currentPlayerId, subGameType, duration);
    }

    /**
     * @description: 检测玩家是否有准入权限，没有且不在新手村就归位
     * @param playerId 玩家id
     */
    private checkPlayerEnterEnable(playerId: number) {
        if (this.getPlayerData(playerId).enterEnable) return;

        //判断在不在新手村，不在就归位
        let trigger = GameObject.findGameObjectByName("beginnerChecker") as Trigger;
        let player = Player.getPlayer(playerId);
        if (trigger && player) {
            if (!trigger.checkInArea(player.character)) {
                player.character.worldTransform.position = trigger.worldTransform.position;
            }
        }
    }

    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
}

function logState(
    announcer: Announcer,
    logType: "log" | "warn" | "error",
    messages: string[] | string | LogString,
    showTime: boolean = true,
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