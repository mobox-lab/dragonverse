import CryptoJS from "crypto-js";
import { EventDefine } from "../../const/EventDefine";
import GameServiceConfig from "../../const/GameServiceConfig";
import Log4Ts, { Announcer, LogString } from "../../depend/log4ts/Log4Ts";
import FixedQueue from "../../depend/queue/FixedQueue";
import i18n from "../../language/i18n";
import GToolkit, { Expression, GtkTypes, Regulator } from "../../util/GToolkit";
import noReply = mwext.Decorator.noReply;
import { TimeManager } from "../../controller/TimeManager";
import GlobalTips from "../../depend/global-tips/GlobalTips";
import Gtk from "../../util/GToolkit";
import { JModuleC, JModuleData, JModuleS } from "../../depend/jibu-module/JModule";
import { Yoact } from "../../depend/yoact/Yoact";
import createYoact = Yoact.createYoact;

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
interface UserDataQueryRequestParam {
    userId: string;
}

/**
 * 一般查询返回数据.
 */
interface QueryResponse<D = undefined> {
    code: number,
    message: string,
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
 * 体力上限查询请求参数.
 */
interface PetSimulatorRankDataRequestParam {
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

    public staminaLimit: { data: number } = createYoact({data: 0});

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
        return new SaltToken(AuthModuleS.encryptToken(this._originToken, time), time);
    }

    /**
     * 放行玩家.
     * 容忍重复调用.
     * @private
     */
    private releasePlayer() {
        logState(AuthModuleC, "log", `release player. enjoy!`, true, Player.localPlayer.playerId);
        Event.dispatchToLocal(EventDefine.PlayerEnableEnter);
    }

    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

    //#region Net Method
    public net_changeStaminaLimit(value: number) {
        this.staminaLimit.data = value;
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
     * 测试用 P12 端 Url.
     */
    private static readonly TEST_P12_DOMAIN = "https://modragon-api-test.mobox.app";

    /**
     * 发布用 P12 端 Url.
     */
    private static readonly RELEASE_P12_DOMAIN = "https://modragon-api.mobox.app";

    /**
     * PGE 查询 体力上限 Uri.
     * @private
     */
    private static readonly PGE_STAMINA_LIMIT_URI = "/pge-game/stamina/obtain-in-game";

    /**
     * PGE 汇报 宠物模拟器排行榜 Uri.
     * @private
     */
    private static readonly PGE_P_S_RANK_REPORT_URI = "/pge-game/rank/pet/update";

    /**
     * PGE 汇报 无限乱斗排行榜 Uri.
     * @private
     */
    private static readonly PGE_B_W_RANK_REPORT_URI = "/pge-game/rank/fight/update";

    /**
     * 测试用 体力上限查询 Url.
     */
    private static get TEST_PGE_STAMINA_LIMIT_URL() {
        return this.TEST_P12_DOMAIN + this.PGE_STAMINA_LIMIT_URI;
    }

    /**
     * 发布用 体力上限查询 Url.
     */
    private static get RELEASE_PGE_STAMINA_LIMIT_URL() {
        return this.RELEASE_P12_DOMAIN + this.PGE_STAMINA_LIMIT_URI;
    }

    /**
     * 测试用 汇报 宠物模拟器排行榜 Url.
     */
    private static get TEST_PGE_P_S_RANK_REPORT_URL() {
        return this.TEST_P12_DOMAIN + this.PGE_P_S_RANK_REPORT_URI;
    }

    /**
     * 发布用 汇报 宠物模拟器排行榜 Url.
     */
    private static get RELEASE_PGE_P_S_RANK_REPORT_URL() {
        return this.RELEASE_P12_DOMAIN + this.PGE_P_S_RANK_REPORT_URI;
    }

    /**
     * 测试用 汇报 无限乱斗排行榜 Url.
     */
    private static get TEST_PGE_B_W_RANK_REPORT_URL() {
        return this.TEST_P12_DOMAIN + this.PGE_B_W_RANK_REPORT_URI;
    }

    /**
     * 发布用 汇报 无限乱斗排行榜 Url.
     */
    private static get RELEASE_PGE_B_W_RANK_REPORT_URL() {
        return this.RELEASE_P12_DOMAIN + this.PGE_B_W_RANK_REPORT_URI;
    }

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
        if (GToolkit.isNullOrEmpty(saltToken)) {
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
     * 玩家体力恢复预期时长表.
     */
    public playerStaminaRecoveryMap: Map<number, number> = new Map();
    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

    //#region MetaWorld Event
    protected onAwake(): void {
        super.onAwake();
    }

    protected onJStart(): void {
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
        } else {
            Log4Ts.log(AuthModuleS, `there is no data for player ${player.playerId}.`);
        }
    }

    protected onPlayerEnterGame(player: Player): void {
        super.onPlayerEnterGame(player);
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
        DataStorage.asyncGetData(AuthModuleS.CODE_VERIFY_AES_KEY_STORAGE_KEY).then((value) => {
            Log4Ts.log(AuthModuleS, `value`, value.code);
            if (value.code === 200) {
                if (!GToolkit.isNullOrUndefined(value.data) && value.data !== AuthModuleS.PLACE_HOLDER) {
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

    private static getClientId() {
        DataStorage.asyncGetData(AuthModuleS.CLIENT_ID_STORAGE_KEY).then((value) => {
            if (value.code === 200) {
                if (!GToolkit.isNullOrUndefined(value.data) && value.data !== AuthModuleS.PLACE_HOLDER) {
                    AuthModuleS.CLIENT_ID = value.data;
                } else {
                    Log4Ts.log(AuthModuleS, `getClientId Failed`);
                    DataStorage.asyncSetData(AuthModuleS.CLIENT_ID_STORAGE_KEY, AuthModuleS.PLACE_HOLDER);
                }
            }
        });
    }

    private static querySecret() {
        DataStorage.asyncGetData(AuthModuleS.SECRET_STORAGE_KEY).then((value) => {
            if (value.code === 200) {
                if (!GToolkit.isNullOrUndefined(value.data) && value.data !== AuthModuleS.PLACE_HOLDER) {
                    AuthModuleS.SECRET = value.data;
                } else {
                    Log4Ts.log(AuthModuleS, `querySecret Failed`);
                    DataStorage.asyncSetData(AuthModuleS.SECRET_STORAGE_KEY, AuthModuleS.PLACE_HOLDER);
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
        if (GToolkit.isNullOrEmpty(token)) {
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

    public async queryRegisterStaminaLimit(playerId: number) {
        const userId = Player.getPlayer(playerId)?.userId ?? undefined;
        if (Gtk.isNullOrEmpty(userId)) {
            logEPlayerNotExist(playerId);
            return;
        }

        const requestParam: UserDataQueryRequestParam = {
            userId: userId,
        };
        const encryptBody = {
            encryptData: this.getSecret(JSON.stringify(requestParam)),
        };

        const resp = await fetch(
            `${
                GameServiceConfig.isRelease
                    ? AuthModuleS.RELEASE_PGE_STAMINA_LIMIT_URL
                    : AuthModuleS.TEST_PGE_STAMINA_LIMIT_URL
            }`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json;charset=UTF-8",
                },
                body: JSON.stringify(encryptBody),
            },
        );
        const respInJson = await resp.json<QueryResponse<QueryStaminaLimitRespData>>();
        Log4Ts.log(AuthModuleS, `get resp when query stamina limit. ${JSON.stringify(respInJson)}`);

        if (Gtk.isNullOrUndefined(respInJson?.data?.stamina))
            Log4Ts.log(AuthModuleS, `invalid value when query stamina limit for user ${userId}.`);
        else {
            this.playerStaminaLimitMap.set(playerId, respInJson.data.stamina);
            this.getClient(playerId)?.net_changeStaminaLimit(respInJson.data.stamina);
        }
        if (Gtk.isNullOrUndefined(respInJson?.data?.gameStaminaRecoverySec))
            Log4Ts.log(AuthModuleS, `invalid value when query recovery time limit for user ${userId}.`);
        else this.playerStaminaRecoveryMap.set(playerId, respInJson.data.gameStaminaRecoverySec);

        let data = this.getPlayerData(playerId);
        if (!Gtk.isNullOrEmpty(respInJson?.data?.walletAddress ?? undefined) && data.holdAddress !== respInJson.data.walletAddress) {
            data.holdAddress = respInJson.data.walletAddress;
            data.save(false);
        }
    }

    public async reportPetSimulatorRankData(playerId: number, petName: string, petRarity: number, petOriginalAttack: number, recordTime: number, round: number) {
        const player = Player.getPlayer(playerId) ?? null;
        if (GToolkit.isNullOrUndefined(player)) {
            Log4Ts.error(AuthModuleS, `player not exist. id: ${playerId}`);
            return;
        }
        const userId = player.userId;
        const userName = player.nickname;
        const userAvatar = player["avatarUrl"];
        const requestParam: PetSimulatorRankDataRequestParam = {
            userId,
            userName,
            userAvatar,
            petName,
            petRarity,
            petOriginalAttack,
            recordTime,
            round,
        };
        const encryptBody: EncryptedData = {
            encryptData: this.getSecret(JSON.stringify(requestParam)),
        };
        const resp = await fetch(`${GameServiceConfig.isRelease ?
                AuthModuleS.RELEASE_PGE_P_S_RANK_REPORT_URL :
                AuthModuleS.TEST_PGE_P_S_RANK_REPORT_URL}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json;charset=UTF-8",
                },
                body: JSON.stringify(encryptBody),
            });

        const respInJson = await resp.json<QueryResponse>();
        Log4Ts.log(AuthModuleS, `get resp when report p.s. rank info. ${JSON.stringify(respInJson)}`);
    }

    public async reportBattleWorldRankData() {

    }

    private checkRequestRegulator(playerId: number): boolean {
        let last = this._playerRequestRegulatorMap.get(playerId) ?? 0;
        let now = Date.now();
        if (now - last < GameServiceConfig.MIN_OTHER_REQUEST_INTERVAL) {
            return false;
        }

        this._playerRequestRegulatorMap.set(playerId, now);
        return true;
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

    @noReply()
    public net_requestRefreshStaminaLimit() {
        if (!this.checkRequestRegulator(this.currentPlayerId)) return;
        this.queryRegisterStaminaLimit(this.currentPlayerId);
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
