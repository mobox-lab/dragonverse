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
import Regulator from "../../depend/regulator/Regulator";

export default class BattleWorldAuthModuleData extends JModuleData {
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

interface GetTempTokenResponse {
    code: number,
    message: string,
    data?: string,
}

interface GetP12TokenParam {
    gtoken: string;
}

interface GetP12TokenResponse {
    code: number;
    info: string;
    data: {
        token: string
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

interface UpdateBattleWorldRankDataParam {
    userId: string;
    userName: string;
    headUrl: string;
    grade: number;
    gradePower: number;
    round: number;
    requestTs: number;
}

interface MoboxDragonData {
    tokenId: number,
    /**
     * 原型 Id.
     */
    protoId: number,
    /**
     * 品质.
     */
    quality: number,
    /**
     * 属性.
     */
    elements: number,
    /**
     * 潜力.
     */
    potential: number,
    /**
     * 主属性.
     */
    primaryEle: number,
    /**
     * 副属性.
     */
    secondEle: number,
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
    skills: number,
    /**
     * 个性.
     */
    personality: number,
}

interface MoboxDragonInstanceQuality {
    quality: number,
    primaryEle: number,
    secondEle: number,
}

interface QueryMoboxDragonDataResponse {
    code: number;
    message?: string;
    data?: { dragons: MoboxDragonData[] };
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
    /**
     * 格斗世界体力.
     * @type {ConsumeTypes.BattleWorldEnergy}
     */
    BattleWorldEnergy = 75001,
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
export class AuthModuleC extends JModuleC<AuthModuleS, BattleWorldAuthModuleData> {
    //#region Member
    private _eventListeners: EventListener[] = [];

    private _originToken: string = null;

    public currency = createYoact({ count: 0 });

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

        this.queryTempToken();
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

    /**
     * 查询临时 token.
     * 一个连续的动作. 成功刷新后将更新 服务器端 token.
     */
    public queryTempToken() {
        const handler: HttpResponse = (result, content, responseCode) => {
            if (result && responseCode === 200) {
                const resp = JSON.parse(content) as GetTempTokenResponse;
                if (GToolkit.isNullOrEmpty(resp.data)) {
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
        generalHttpRequest(handler, HttpRequestURL.CobblestoneService, AuthModuleS.GET_MW_TEMP_TOKEN_URL_SUFFIX, "", HttpRequestType.Post);
    }

    public reportTempToken(token: string) {
        this.server.net_reportTempToken(token).then(
            (value) => {
                if (value) {
                    Log4Ts.log(AuthModuleC, `registered token report success.`);
                } else {
                    Log4Ts.warn(AuthModuleC, `temp token report failed. reason: ${value[1] ?? ""}.`);
                }
            }
        );
    }

    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

    //#region Net Method
    public net_setCurrency(val: string) {
        this.currency.count = Number(val);
    }

    public net_refreshToken() {
        this.queryTempToken();
    }

    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
}

export class AuthModuleS extends JModuleS<AuthModuleC, BattleWorldAuthModuleData> {
    //#region Constant

    /**
     * 测试用 mobox Url.
     */
    private static readonly TEST_MOBOX_URL = "https://test-game-api.modragon.io";

    /**
     * 发布用 mobox Url.
     */
    private static readonly RELEASE_MOBOX_URL = "https://accountapi.mobox.io";

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
     * 获取 MW 临时 token 后缀.
     * @type {string}
     * @private
     */
    public static readonly GET_MW_TEMP_TOKEN_URL_SUFFIX = "sso/universal/user/v1/get/temp/token";

    /**
     * 获取 P12 token 后缀.
     * @type {string}
     * @private
     */
    private static readonly GET_P12_TOKEN_URL_SUFFIX = "/oauth/gpark";

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
     * 更新战斗世界排行榜数据后缀.
     * @type {string}
     * @private
     */
    private static readonly UPDATE_BATTLE_WORLD_RANK_DATA_URL_SUFFIX = "/mo-rank/fight/update";

    /**
     * 查询 Mobox 龙信息后缀.
     * @type {string}
     * @private
     */
    private static readonly QUERY_MOBOX_DRAGON_URL_SUFFIX = "/nft/dragon/infos";

    /**
     * 测试用 token.
     * @type {string}
     * @private
     */
    private static readonly TEST_TOKEN = "d42d78c2a78d03a234defda7b34e0f63cc962feb0cdfa5c39409427eaaad85479896b6";

    /**
     * 测试用 getToken Url.
     * @get
     */
    private static get TEST_GET_P12_TOKEN_URL() {
        return this.TEST_MOBOX_URL + this.GET_P12_TOKEN_URL_SUFFIX;
    }

    /**
     * 发布用 getToken Url.
     * @get
     */
    private static get RELEASE_GET_P12_TOKEN_URL() {
        return this.RELEASE_MOBOX_URL + this.GET_P12_TOKEN_URL_SUFFIX;
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
     * 测试用 更新战斗世界排行榜数据 Url.
     */
    private static get TEST_UPDATE_BATTLE_WORLD_RANK_DATA_URL() {
        return this.TEST_MOBOX_NFT_URL + this.UPDATE_BATTLE_WORLD_RANK_DATA_URL_SUFFIX;
    }

    /**
     * 发布用 更新战斗世界排行榜数据 Url.
     */
    private static get RELEASE_UPDATE_BATTLE_WORLD_RANK_DATA_URL() {
        return this.RELEASE_MOBOX_NFT_URL + this.UPDATE_BATTLE_WORLD_RANK_DATA_URL_SUFFIX;
    }

    /**
     * 测试用 查询 Mobox 龙信息 Url.
     */
    private static get TEST_QUERY_MOBOX_DRAGON_URL() {
        return this.TEST_MOBOX_NFT_URL + this.QUERY_MOBOX_DRAGON_URL_SUFFIX;
    }

    /**
     * 发布用 查询 Mobox 龙信息 Url.
     */
    private static get RELEASE_QUERY_MOBOX_DRAGON_URL() {
        return this.RELEASE_MOBOX_NFT_URL + this.QUERY_MOBOX_DRAGON_URL_SUFFIX;
    }

    private static readonly HEADER_TOKEN = "x-bits-token";

    private static CODE_VERIFY_AES_KEY = "";

    private static CODE_VERIFY_AES_IV = "";

    private static CLIENT_ID = "";

    private static SECRET = "";


    private static readonly CODE_VERIFY_AES_KEY_STORAGE_KEY = "CODE_VERIFY_AES_KEY_STORAGE_KEY";

    private static readonly CLIENT_ID_STORAGE_KEY = "CLIENT_ID_STORAGE_KEY";

    private static readonly SECRET_STORAGE_KEY = "SECRET_STORAGE_KEY";

    private static readonly PLACE_HOLDER = "REPLACE_IT";

    public static readonly KEY_STORAGE_GET_FAILED_REFRESH_INTERVAL = 3e3;

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
                    }
                }
            }
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

    /**
     * @type {Map<number, Regulator>} key: playerId, value: Regulator.
     * @private
     */
    private _expiredRegulatorMap: Map<number, Regulator> = new Map<number, Regulator>();
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
            // DataStorage.asyncSetData(AuthModuleS.CODE_VERIFY_AES_KEY_STORAGE_KEY, AuthModuleS.CODE_VERIFY_AES_KEY);
            // DataStorage.asyncSetData(AuthModuleS.CLIENT_ID_STORAGE_KEY, AuthModuleS.CLIENT_ID);
            // DataStorage.asyncSetData(AuthModuleS.SECRET_STORAGE_KEY, AuthModuleS.SECRET);
        }

        // AuthModuleS.CODE_VERIFY_AES_IV = AuthModuleS.CODE_VERIFY_AES_KEY.slice(0, 16).split("").reverse().join("");
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
        const playerId = player.playerId;
        this._tokenMap.set(player.playerId, null);
        this._expiredRegulatorMap.set(playerId, new Regulator(Globaldata.EXPIRED_REFRESH_INTERVAL));
    }

    protected onPlayerLeft(player: Player): void {
        super.onPlayerLeft(player);
        const playerId = player.playerId;
        this._tokenMap.delete(player.playerId);
        this._expiredRegulatorMap.delete(playerId);
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
        if (GToolkit.isNullOrEmpty(AuthModuleS.CODE_VERIFY_AES_IV) || GToolkit.isNullOrEmpty(AuthModuleS.CODE_VERIFY_AES_KEY)) {
            Log4Ts.log(AuthModuleS, `code verify aes iv or key is null or empty.`);
            return null;
        }
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
        if (GToolkit.isNullOrEmpty(AuthModuleS.SECRET)) {
            Log4Ts.log(AuthModuleS, `secret is null or empty.`);
            return;
        }
        let paramStr = Object
            .keys(params)
            .sort()
            .reduce((x, y) => {
                return `${x}${params[y]}`;
            }, "");
        return CryptoJS.HmacSHA256(paramStr, AuthModuleS.SECRET).toString(CryptoJS.enc.Hex);
    }

    /**
     * 获取并注册 P12 token.
     * @return {Promise<boolean>}
     * @private
     * @param playerId
     * @param tempToken
     */
    private async getP12Token(playerId: number, tempToken: string): Promise<[boolean, string]> {
        if (GToolkit.isNullOrEmpty(tempToken)) {
            Log4Ts.warn(AuthModuleS, `temp token of player ${playerId} is invalid.`);
            return [false, "token invalid."];
        }

        const resp = await fetch(`${Globaldata.isRelease ?
            AuthModuleS.RELEASE_GET_P12_TOKEN_URL :
            AuthModuleS.TEST_GET_P12_TOKEN_URL}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
            },
            body: JSON.stringify({
                gtoken: tempToken,
            } as GetP12TokenParam),
        });

        const respInJson = await resp.json<GetP12TokenResponse>();

        if (respInJson?.code !== 200 || GToolkit.isNullOrUndefined(respInJson.data?.token ?? undefined)) {
            const msg = `get token failed. ${JSON.stringify(respInJson)}`;
            Log4Ts.error(AuthModuleS, msg);
            return [false, msg];
        } else {
            if (this._tokenMap.has(playerId)) {
                this._tokenMap.set(playerId, respInJson.data?.token);
                this.onRefreshToken(playerId);
                return [true, "success."];
            } else {
                this.logPlayerNotExist(playerId);
                return [false, "player not exist."];
            }
        }
    }

    private onRefreshToken(playerId: number) {
        this.queryCurrency(playerId);
    }

    private onTokenExpired(playerId: number) {
        Log4Ts.warn(AuthModuleS, `token expired. refreshing... playerId: ${playerId}`);
        this._tokenMap.set(playerId, null);
        if (this._expiredRegulatorMap.get(playerId).ready()) this.getClient(playerId)?.net_refreshToken();
    }

    private async queryCurrency(playerId: number) {
        let token = this._tokenMap.get(playerId);
        if (GToolkit.isNullOrUndefined(token)) {
            this.logPlayerTokenInvalid(playerId);
            if (Globaldata.isRelease || Globaldata.isBeta) {
                return;
            } else {
                Log4Ts.log(AuthModuleS, `use test token.`);
                token = AuthModuleS.TEST_TOKEN;
            }
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

    public async pay(playerId: number, cost: number, consumeType: ConsumeTypes): Promise<boolean> {
        let token = this._tokenMap.get(playerId);
        if (GToolkit.isNullOrUndefined(token)) {
            this.logPlayerTokenInvalid(playerId);
            if (Globaldata.isRelease || Globaldata.isBeta) {
                return Promise.resolve(false);
            } else {
                Log4Ts.log(AuthModuleS, `use test token.`);
                token = AuthModuleS.TEST_TOKEN;
            }
        }

        Log4Ts.log(AuthModuleS, `player paid. playerId: ${playerId}, cost: ${cost}`);
        const order = this.generateOrder(cost, consumeType);
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
        if (GToolkit.isNullOrEmpty(AuthModuleS.CLIENT_ID)) {
            Log4Ts.log(AuthModuleS, `client id is null or empty.`);
            return null;
        }
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

    public async reportBWRankData(playerId: number, grade: number, gradePower: number, round: number) {
        const player = Player.getPlayer(playerId) ?? null;
        if (GToolkit.isNullOrUndefined(player)) {
            Log4Ts.error(AuthModuleS, `player not exist. id: ${playerId}`);
            return;
        }
        const userId = player.userId;
        const userName = player.nickname;
        const headUrl = player["avatarUrl"];
        const param: UpdateBattleWorldRankDataParam = {
            userId,
            userName,
            headUrl,
            grade,
            gradePower,
            round,
            requestTs: Math.floor(Date.now() / 1000),
        };
        const body: EncryptedRequest = {
            encryptData: this.getSecret(JSON.stringify(param)),
        };
        const resp = await fetch(`${Globaldata.isRelease ?
            AuthModuleS.RELEASE_UPDATE_BATTLE_WORLD_RANK_DATA_URL :
            AuthModuleS.TEST_UPDATE_BATTLE_WORLD_RANK_DATA_URL}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json;charset=UTF-8",
                },
                body: JSON.stringify(body),
            });

        const respInJson = await resp.json();
        Log4Ts.log(AuthModuleS, `get resp when report sub game info. ${JSON.stringify(respInJson)}`);
    }
    // public async reportPetRankData(playerId: number, petName: string, rarity: PetQuality, attack: number, obtainTime: number, round: number) {
    //     const userId = Player.getPlayer(playerId)?.userId ?? null;
    //     if (GToolkit.isNullOrUndefined(userId)) {
    //         Log4Ts.error(AuthModuleS, `player not exist. id: ${playerId}`);
    //         return;
    //     }

    //     const param: UpdateBattleWorldRankDataParam = {
    //         userId: userId,
    //         petName: petName,
    //         headUrl: headUrl,
    //         petRarity: rarity,
    //         petAttack: attack.toString(),
    //         petObtainTime: obtainTime,
    //         round: round,
    //     };
    //     const body: EncryptedRequest = {
    //         encryptData: this.getSecret(JSON.stringify(param)),
    //     };
    //     const resp = await fetch(`${Globaldata.isRelease ?
    //         AuthModuleS.RELEASE_UPDATE_PET_SIMULATOR_RANK_DATA_URL :
    //         AuthModuleS.TEST_UPDATE_PET_SIMULATOR_RANK_DATA_URL}`,
    //         {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json;charset=UTF-8",
    //             },
    //             body: JSON.stringify(body),
    //         });

    //     const respInJson = await resp.json();
    //     Log4Ts.log(AuthModuleS, `get resp when report sub game info. ${JSON.stringify(respInJson)}`);
    // }

    public async getMoboxDragonAbility(playerId: number): Promise<number> {
        let userId = Player.getPlayer(playerId)?.userId ?? null;
        if (GToolkit.isNullOrUndefined(userId)) {
            this.logPlayerTokenInvalid(playerId);
            return;
        }

        const resp = await fetch(`${Globaldata.isRelease ?
            AuthModuleS.RELEASE_QUERY_MOBOX_DRAGON_URL :
            AuthModuleS.TEST_QUERY_MOBOX_DRAGON_URL}?uid=${userId}`,
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
            .from(respInJson.data.dragons)
            .doAction(item => {
                const qua = formatElements(item.elements);
                item.quality = qua.quality;
                item.primaryEle = qua.primaryEle;
                item.secondEle = qua.secondEle;
            },
            )
            .defaultIfEmpty({
                elements: 0,
                level: 0,
                mating: 0,
                personality: 0,
                potential: 0,
                primaryEle: 0,
                protoId: 0,
                quality: 0,
                secondEle: 0,
                skills: 0,
                star: 0,
                tokenId: 0,
            })
            .sum(item => item ? calAbility(
                item.quality,
                item.star,
                item.potential,
                item.level) : 0) + (Globaldata.isRelease || Globaldata.isBeta ? 0 : 250));
    }

    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

    //#region Net Method
    public async net_queryCurrency() {
        this.queryCurrency(this.currentPlayerId);
    }

    public async net_reportTempToken(token: string): Promise<[boolean, string]> {
        const currentPlayerId = this.currentPlayerId;
        return this.getP12Token(currentPlayerId, token);
    }

    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
}

/**
 * 计算龙能力值.
 * @param {number} quality 品质.
 * @param {number} star 星级.
 * @param {number} attribute 潜力.
 * @param {number} level 等级.
 * @return {number}
 */
function calAbility(quality: number, star: number, attribute: number, level: number): number {
    let ratio = [0.4, 0.5, 0.6, 0.8, 1];
    return Math.round(
        Math.pow(star,
            ratio[GToolkit.safeIndex(quality, ratio, "cut")])
        * attribute * level / 20);
}

//示例代码参考
/**
 *
 * @param {number} data
 * @return {{primaryEle: number, secondEle: number, quality: number}}
 */
function formatElements(data: number): MoboxDragonInstanceQuality {
    let quality = (data >> 20);         //品质
    let primaryEle = (data & 0x00000f); //主元素
    let secondEle = 0;  //副元素，用十进制表示(3600表示副元素为3、6)
    secondEle = secondEle * 10 + ((data & 0x0000f0) >> 4);
    if (quality > 2) {
        secondEle = secondEle * 10 + ((data & 0x000f00) >> 8);
        secondEle = secondEle * 10 + ((data & 0x00f000) >> 12);
        secondEle = secondEle * 10 + ((data & 0x0f0000) >> 16);
    }
    return { primaryEle: quality, quality: primaryEle, secondEle: secondEle };
}