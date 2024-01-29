import CryptoJS from "crypto-js";
import { JModuleC, JModuleData, JModuleS } from "../../depend/jibu-module/JModule";
import GToolkit from "../../utils/GToolkit";
import Log4Ts from "../../depend/log4ts/Log4Ts";
import noReply = mwext.Decorator.noReply;
import { Yoact } from "../../depend/yoact/Yoact";
import createYoact = Yoact.createYoact;
import UUID from "pure-uuid";
import Enumerable from "linq";
import { Globaldata } from "../../const/Globaldata";

export default class AuthModuleData extends JModuleData {
    //@Decorator.persistence()
    //public isSave: bool;

    public orderLogs: string[] = [];

    /**
     * 记录一个订单.
     * 自带 save.
     * @server 仅服务端
     * @param {ConsumeParam} order
     */
    public serverSaveOrder(order: ConsumeParam) {
        const str = JSON.stringify(order);
        if (this.orderLogs.length >= Globaldata.MAX_ORDER_LOG_COUNT) {
            this.orderLogs.shift();
        }
        this.orderLogs.push(str);
        this.save(false);
    }
}

interface QueryP12Param {
    userId?: string;
    walletAddress?: string;
}

interface EncryptedRequest {
    encryptData: string;
}

interface GetTokenResponse {
    code: number;
    path: string;
    message: string;
    timestamp: string;
    data?: {
        walletAddress?: string;
        mToken?: string;
    };
}

interface QueryCurrencyParam {
    symbol: "mbox";
}

interface QueryCurrencyResponse {
    code: number;
    info?: string;
    data?: { balance: string };
}

interface ConsumeParam {
    /**
     * 分配的client_id.
     */
    client_id: string;
    /**
     * 订单id, 相同订单id, 不能重复提交.
     */
    order_id: string;
    /**
     * 币种类型.
     */
    symbol: string;
    /**
     * 当前轮次.
     */
    round: number;
    /**
     * 消费要进入的奖池Id, 2表示赛季奖励池, 20表示暂存池(主要用户擂台, 交易等不入消费池).
     */
    pool_id: number;
    /**
     * 数量.
     */
    amount: number;
    /**
     * 扣款类型75000 - 79999.
     */
    action: number;
    /**
     * 发起时间.
     */
    ts: number;
    /**
     * 签名, 根据参数的字母序拼接之后, 用Hmac-sha256 client_secret加密.
     */
    sign: string;
}

interface PoolInfo {
    pool_id: number,
    balance: string,
    coin: string
}

interface ConsumeData {
    order_id: string,
    /**
     * 余额.
     */
    balance: string,
    pools: PoolInfo[]
}

interface ConsumeResponse {
    code: number;
    info?: string;
    data?: ConsumeData;
}

interface UpdatePetSimulatorRankDataParam {
    userId: string;
    petName: string;
    petRarity: number;
    petAttack: string;
    petObtainTime: number;
    round: number;
}

interface MoboxDragonData {
    tokenId: number,
    name: string,
    /**
     * 品质.
     */
    quality: number,
    /**
     * 属性.
     */
    element: number[]
    /**
     * 能力值.
     */
    ,
    ability: number,
    /**
     * 潜力.
     */
    potential: number
    /**
     * 星级.
     */
    star: number,
    /**
     * 等级.
     */
    level: number,
    /**
     * 繁殖次数，最多7次.
     */
    mating: number,
    /**
     * 技能.
     */
    skills: number[],
    /**
     * 个性.
     */
    personality: number,
}

interface QueryMoboxDragonDataResponse {
    code: number;
    message?: string;
    data?: MoboxDragonData[];
}

/**
 * 消费类型.
 */
export enum ConsumeTypes {
    /**
     * 空置.
     * @type {ConsumeTypes.Null}
     */
    Null = 0,
    /**
     * 娃娃机.
     * @type {ConsumeTypes.DollMachine}
     */
    DollMachine = 75000,
}

/**
 * Auth Module.
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
export class AuthModuleC extends JModuleC<AuthModuleS, AuthModuleData> {
//#region Member
    private _eventListeners: EventListener[] = [];

    private _originToken: string = null;

    public currency = createYoact({count: 0});

    private _lastQueryCurrencyTime: number = 0;
//#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

//#region MetaWorld Event
    protected onAwake(): void {
        super.onAwake();

//#region Inner Member init
//#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
    }

    protected onJStart(): void {
//#region Member init
//#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

//#region Event Subscribe
        // this._eventListeners.push(Event.addLocalListener(EventDefine.EVENT_NAME, CALLBACK));
//#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
    }

    protected onUpdate(dt: number): void {
        super.onUpdate(dt);
    }

    protected onEnterScene(sceneType: number): void {
        super.onEnterScene(sceneType);
    }

    protected onDestroy(): void {
        super.onDestroy();
//#region Event Unsubscribe
        this._eventListeners.forEach(value => value.disconnect());
//#endregion ------------------------------------------------------------------------------------------
    }

    protected onExecute(type: number, ...params: any[]): void {
        super.onExecute(type, ...params);
    }

//#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

//#region Method
    public queryCurrency() {
        if (Date.now() - this._lastQueryCurrencyTime > Globaldata.MIN_ACCESS_INTERVAL) {
            this.server.net_queryCurrency();
        } else {
            return;
        }
    }

    public payFor(cost: number): boolean {
        if (this.currency.count < cost) {
            return false;
        }
    }

//#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

//#region Net Method
    public net_setCurrency(val: string) {
        this.currency.count = Number(val);
    }

//#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
}

export class AuthModuleS extends JModuleS<AuthModuleC, AuthModuleData> {
//#region Constant
    /**
     * 测试用 P12 端 Url.
     */
    private static readonly TEST_P12_URL = "https://modragon-api-test.mobox.app";

    /**
     * 发布用 P12 端 Url.
     */
    private static readonly RELEASE_P12_URL = "https://modragon-api.mobox.app";

    /**
     * 测试用 mobox Url.
     */
    private static readonly TEST_MOBOX_URL = "https://test-game-api.modragon.io";
    /**
     * 发布用 mobox Url.
     */
    private static readonly RELEASE_MOBOX_URL = "https://accountapi.mobox.io";

    /**
     * getToken 后缀.
     * @private
     */
    private static readonly GET_TOKEN_URL_SUFFIX = "/modragon/mo-sso/m-token";

    /**
     * 查询货币余额后缀.
     * @type {string}
     */
    private static readonly GET_CURRENCY_URL_SUFFIX = "/user/symbol/balance";

    /**
     * 消费货币后缀.
     * @type {string}
     */
    private static readonly CONSUME_URL_SUFFIX = "/payment/app/pool/consume";

    /**
     * 更新宠物模拟器排行榜数据后缀.
     * @type {string}
     * @private
     */
    private static readonly UPDATE_PET_SIMULATOR_RANK_DATA_URL_SUFFIX = "/modragon/mo-rank/pet/update";

    /**
     * 查询 Mobox 龙信息后缀.
     * @type {string}
     * @private
     */
    private static readonly QUERY_MOBOX_DRAGON_URL_SUFFIX = "/modragon/mo-assets/dragon";

    /**
     * 测试用 getToken Url.
     */
    private static get TEST_GET_TOKEN_URL() {
        return this.TEST_P12_URL + this.GET_TOKEN_URL_SUFFIX;
    }

    /**
     * 发布用 getToken Url.
     */
    private static get RELEASE_GET_TOKEN_URL() {
        return this.RELEASE_P12_URL + this.GET_TOKEN_URL_SUFFIX;
    }

    /**
     * 测试用 查询货币余额 Url.
     */
    private static get TEST_GET_CURRENCY_URL() {
        return this.TEST_MOBOX_URL + this.GET_CURRENCY_URL_SUFFIX;
    }

    /**
     * 发布用 查询货币余额 Url.
     */
    private static get RELEASE_GET_CURRENCY_URL() {
        return this.RELEASE_MOBOX_URL + this.GET_CURRENCY_URL_SUFFIX;
    }

    /**
     * 测试用 消费货币 Url.
     */
    private static get TEST_CONSUME_URL() {
        return this.TEST_MOBOX_URL + this.CONSUME_URL_SUFFIX;
    }

    /**
     * 发布用 消费货币 Url.
     */
    private static get RELEASE_CONSUME_URL() {
        return this.RELEASE_MOBOX_URL + this.CONSUME_URL_SUFFIX;
    }

    /**
     * 测试用 更新宠物模拟器排行榜数据 Url.
     */
    private static get TEST_UPDATE_PET_SIMULATOR_RANK_DATA_URL() {
        return this.TEST_P12_URL + this.UPDATE_PET_SIMULATOR_RANK_DATA_URL_SUFFIX;
    }

    /**
     * 发布用 更新宠物模拟器排行榜数据 Url.
     */
    private static get RELEASE_UPDATE_PET_SIMULATOR_RANK_DATA_URL() {
        return this.RELEASE_P12_URL + this.UPDATE_PET_SIMULATOR_RANK_DATA_URL_SUFFIX;
    }

    /**
     * 测试用 更新宠物模拟器排行榜数据 Url.
     */
    private static get TEST_QUERY_MOBOX_DRAGON_URL() {
        return this.TEST_P12_URL + this.QUERY_MOBOX_DRAGON_URL_SUFFIX;
    }

    /**
     * 发布用 更新宠物模拟器排行榜数据 Url.
     */
    private static get RELEASE_QUERY_MOBOX_DRAGON_URL() {
        return this.RELEASE_P12_URL + this.QUERY_MOBOX_DRAGON_URL_SUFFIX;
    }

    private static readonly HEADER_TOKEN = "x-bits-token";

    private static CODE_VERIFY_AES_KEY = "MODRAGONMODRAGONMODRAGON";

    private static CODE_VERIFY_AES_IV = "";

    private static CLIENT_ID = "12000169457322200012";

    private static SECRET = "6430d2d6497e136df763b572377361678f303f4d624be7ca9ee9b3b28985fe60";

    private static readonly CODE_VERIFY_AES_KEY_STORAGE_KEY = "CODE_VERIFY_AES_KEY_STORAGE_KEY";

    private static readonly CLIENT_ID_STORAGE_KEY = "CLIENT_ID_STORAGE_KEY";

    private static readonly SECRET_STORAGE_KEY = "SECRET_STORAGE_KEY";

    private static getSensitiveData() {
        this.getCodeVerifyAesKey();
        this.getClientId();
        this.getSecret();
    }

    private static getCodeVerifyAesKey() {
        DataStorage.asyncGetData(AuthModuleS.CODE_VERIFY_AES_KEY_STORAGE_KEY).then(
            (value) => {
                if (value.code === 200) AuthModuleS.CODE_VERIFY_AES_KEY = value.data;
                else {
                    this.logGetDataError();
                    this.getCodeVerifyAesKey();
                }
            },
        );
    }

    private static getClientId() {
        DataStorage.asyncGetData(AuthModuleS.CLIENT_ID_STORAGE_KEY).then(
            (value) => {
                if (value.code === 200) AuthModuleS.CLIENT_ID = value.data;
                else {
                    this.logGetDataError();
                    this.getClientId();
                }
            },
        );
    }

    private static getSecret() {
        DataStorage.asyncGetData(AuthModuleS.SECRET_STORAGE_KEY).then(
            (value) => {
                if (value.code === 200) AuthModuleS.SECRET = value.data;
                else {
                    this.logGetDataError();
                    this.getSecret();
                }
            },
        );
    }

    private static logGetDataError() {
        Log4Ts.error(AuthModuleS, `get data failed.`, `refreshing.`);
    }

//#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

//#region Member
    private _eventListeners: EventListener[] = [];

    protected useJAntiCheat: boolean = true;

    /**
     * @type {Map<number, string>} key: playerId, value: token.
     * @private
     */
    private _tokenMap: Map<number, string> = new Map<number, string>();
//#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

//#region MetaWorld Event
    protected onAwake(): void {
        super.onAwake();
    }

    protected onJStart(): void {
//#region Member init

        if (GToolkit.isNullOrEmpty(AuthModuleS.CODE_VERIFY_AES_KEY)) {
            AuthModuleS.getSensitiveData();
        } else {
            DataStorage.asyncSetData(AuthModuleS.CODE_VERIFY_AES_KEY_STORAGE_KEY, AuthModuleS.CODE_VERIFY_AES_KEY);
            DataStorage.asyncSetData(AuthModuleS.CLIENT_ID_STORAGE_KEY, AuthModuleS.CLIENT_ID);
            DataStorage.asyncSetData(AuthModuleS.SECRET_STORAGE_KEY, AuthModuleS.SECRET);
        }

        AuthModuleS.CODE_VERIFY_AES_IV = AuthModuleS.CODE_VERIFY_AES_KEY.slice(0, 16).split("").reverse().join("");
//#endregion ------------------------------------------------------------------------------------------

//#region Event Subscribe
        // this._eventListeners.push(Event.addLocalListener(EventDefine.EVENT_NAME, CALLBACK));
//#endregion ------------------------------------------------------------------------------------------
    }

    protected onUpdate(dt: number): void {
        super.onUpdate(dt);
    }

    protected onDestroy(): void {
        super.onDestroy();
//#region Event Unsubscribe
        this._eventListeners.forEach(value => value.disconnect());
//#endregion ------------------------------------------------------------------------------------------
    }

    protected onExecute(type: number, ...params: any[]): void {
        super.onExecute(type, ...params);
    }

    protected onPlayerJoined(player: Player): void {
        super.onPlayerJoined(player);
    }

    protected onPlayerEnterGame(player: Player): void {
        super.onPlayerEnterGame(player);
        this._tokenMap.set(player.playerId, null);
        this.getToken(player.playerId);
    }

    protected onPlayerLeft(player: Player): void {
        super.onPlayerLeft(player);
        this._tokenMap.delete(player.playerId);
    }

//#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

//#region Method

    private logPlayerNotExist(playerId: number) {
        Log4Ts.error(AuthModuleS, `player not exist. id: ${playerId}`);
    }

    private logPlayerTokenInvalid(playerId: number) {
        Log4Ts.error(AuthModuleS, `player token invalid. id: ${playerId}`);
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

    private getSign(params: object) {
        let paramStr = Object
            .keys(params)
            .sort()
            .reduce((x, y) => {
                return `${x}${params[y]}`;
            }, "");
        return CryptoJS.HmacSHA256(paramStr, AuthModuleS.SECRET).toString(CryptoJS.enc.Hex);
    }

    private async getToken(playerId: number) {
        const player = Player.getPlayer(playerId);
        if (!player) {
            this.logPlayerNotExist(playerId);
            return;
        }
        const param: QueryP12Param = {
            userId: Globaldata.isRelease ? player.userId : "1026061",
        };

        const body: EncryptedRequest = {
            encryptData: this.getSecret(JSON.stringify(param)),
        };
        const resp = await fetch(`${Globaldata.isRelease ?
                AuthModuleS.RELEASE_GET_TOKEN_URL :
                AuthModuleS.TEST_GET_TOKEN_URL}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json;charset=UTF-8",
                },
                body: JSON.stringify(body),
            });

        const respInJson = await resp.json<GetTokenResponse>();

        if (GToolkit.isNullOrUndefined(respInJson.data?.mToken)) {
            Log4Ts.error(AuthModuleS, `get token failed. ${JSON.stringify(respInJson)}`);
        } else {
            if (this._tokenMap.has(playerId)) {
                this._tokenMap.set(playerId, Globaldata.isRelease ? respInJson.data?.mToken : "19dce05a6d90cbfa09f157c20a33a525fa2c5d827940ee8b31fc88fc76db9f83989683");
                this.onRefreshToken(playerId);
            } else {
                this.logPlayerNotExist(playerId);
            }
        }
    }

    private onRefreshToken(playerId: number) {
        this.queryCurrency(playerId);
    }

    private onTokenExpired(playerId: number) {
        Log4Ts.warn(AuthModuleS, `token expired. refreshing... playerId: ${playerId}`);
        this.getToken(playerId);
    }

    private async queryCurrency(playerId: number) {
        const token = this._tokenMap.get(playerId);
        if (GToolkit.isNullOrUndefined(token)) {
            this.logPlayerTokenInvalid(playerId);
            return;
        }
        const queryCurrencyParam: QueryCurrencyParam = {
            symbol: "mbox",
        };
        const resp = await fetch(`${Globaldata.isRelease ?
                AuthModuleS.RELEASE_GET_CURRENCY_URL :
                AuthModuleS.TEST_GET_CURRENCY_URL}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json;charset=UTF-8",
                    [AuthModuleS.HEADER_TOKEN]: token,
                },
                body: JSON.stringify(queryCurrencyParam),
            });

        const respInJson = await resp.json<QueryCurrencyResponse>();

        if (GToolkit.isNullOrUndefined(respInJson.code) ||
            respInJson.code !== 200 ||
            GToolkit.isNullOrUndefined(respInJson?.data?.balance ?? undefined)) {
            Log4Ts.error(AuthModuleS, `query currency failed. ${JSON.stringify(respInJson)}`);
            if (respInJson.code === 401) this.onTokenExpired(playerId);
            return;
        }

        this.getClient(playerId).net_setCurrency(respInJson.data.balance);
    }

    public async pay(playerId: number, cost: number): Promise<boolean> {
        const token = this._tokenMap.get(playerId);
        if (GToolkit.isNullOrUndefined(token)) {
            this.logPlayerTokenInvalid(playerId);
            return Promise.resolve(false);
        }

        Log4Ts.log(AuthModuleS, `player paid. playerId: ${playerId}, cost: ${cost}`);
        const order = this.generateOrder(cost, ConsumeTypes.DollMachine);
        this.getPlayerData(playerId)?.serverSaveOrder(order);

        const resp = await fetch(`${Globaldata.isRelease ?
                AuthModuleS.RELEASE_CONSUME_URL :
                AuthModuleS.TEST_CONSUME_URL}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json;charset=UTF-8",
                    [AuthModuleS.HEADER_TOKEN]: token,
                },
                body: JSON.stringify(order),
            });

        const respInJson = await resp.json<ConsumeResponse>();

        if (GToolkit.isNullOrUndefined(respInJson.code) ||
            respInJson.code !== 200 ||
            GToolkit.isNullOrUndefined(respInJson?.data?.balance ?? undefined)) {
            Log4Ts.error(AuthModuleS, `consume failed. ${JSON.stringify(respInJson)}`);
            if (respInJson.code === 401) this.onTokenExpired(playerId);
            return Promise.resolve(false);
        }

        this.getClient(playerId).net_setCurrency(respInJson.data.balance);
        return Promise.resolve(true);
    }

    private generateOrder(cost: number, action: ConsumeTypes): ConsumeParam {
        const p = {
            client_id: AuthModuleS.CLIENT_ID,
            order_id: new UUID(4).toString(),
            symbol: "mbox",
            action: action,
            amount: cost,
            pool_id: 2,
            round: 1,
            sign: "",
            ts: (Date.now() / 1e3) | 0,
        };

        p.sign = this.getSign(p);
        return p;
    }

    // public async reportPetRankData(playerId: number, petName: string, rarity: PetQuality, attack: number, obtainTime: number, round: number) {
    //     const userId = Player.getPlayer(playerId)?.userId ?? null;
    //     if (GToolkit.isNullOrUndefined(userId)) {
    //         Log4Ts.error(AuthModuleS, `player not exist. id: ${playerId}`);
    //         return;
    //     }
    //
    //     const param: UpdatePetSimulatorRankDataParam = {
    //         userId: userId,
    //         petName: petName,
    //         petRarity: rarity,
    //         petAttack: attack.toString(),
    //         petObtainTime: obtainTime,
    //         round: round,
    //     };
    //     const body: EncryptedRequest = {
    //         encryptData: this.getSecret(JSON.stringify(param)),
    //     };
    //     const resp = await fetch(`${Globaldata.isRelease ?
    //             AuthModuleS.RELEASE_UPDATE_PET_SIMULATOR_RANK_DATA_URL :
    //             AuthModuleS.TEST_UPDATE_PET_SIMULATOR_RANK_DATA_URL}`,
    //         {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json;charset=UTF-8",
    //             },
    //             body: JSON.stringify(body),
    //         });
    //
    //     const respInJson = await resp.json();
    //     Log4Ts.log(AuthModuleS, `get resp when report sub game info. ${JSON.stringify(respInJson)}`);
    // }

    public async getMoboxDragonAbility(playerId: number): Promise<number> {
        let userId = Player.getPlayer(playerId)?.userId ?? null;
        if (GToolkit.isNullOrUndefined(userId)) {
            this.logPlayerTokenInvalid(playerId);
            return;
        }

        userId = Globaldata.isRelease ? userId : "1234567";

        const resp = await fetch(`${Globaldata.isRelease ?
                AuthModuleS.RELEASE_QUERY_MOBOX_DRAGON_URL :
                AuthModuleS.TEST_QUERY_MOBOX_DRAGON_URL}?userId=${userId}`,
            {
                method: "GET",
            });

        const respInJson = await resp.json<QueryMoboxDragonDataResponse>();

        if (GToolkit.isNullOrUndefined(respInJson.code) ||
            respInJson.code !== 200 ||
            GToolkit.isNullOrUndefined(respInJson?.data ?? undefined)) {
            Log4Ts.error(AuthModuleS, `query mobox dragon ability failed. ${JSON.stringify(respInJson)}`);
            if (respInJson.code === 401) this.onTokenExpired(playerId);
            return Promise.resolve(0);
        }

        return Promise.resolve(Enumerable
            .from(respInJson.data)
            .defaultIfEmpty({
                ability: 0,
                element: [],
                level: 0,
                mating: 0,
                name: "",
                personality: 0,
                potential: 0,
                quality: 0,
                skills: [],
                star: 0,
                tokenId: 0,
            })
            .sum(item => item?.ability ?? 0));
    }

//#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

//#region Net Method
    public async net_queryCurrency() {
        this.queryCurrency(this.currentPlayerId);
    }

//#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
}