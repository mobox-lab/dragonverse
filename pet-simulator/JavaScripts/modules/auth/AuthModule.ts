import CryptoJS from "crypto-js";
import { JModuleC, JModuleData, JModuleS } from "../../depend/jibu-module/JModule";
import GToolkit, { Tf } from "../../utils/GToolkit";
import Log4Ts from "../../depend/log4ts/Log4Ts";
import noReply = mwext.Decorator.noReply;
import { GlobalEnum } from "../../const/Enum";
import PetQuality = GlobalEnum.PetQuality;
import { GlobalData } from "../../const/GlobalData";
import { Yoact } from "../../depend/yoact/Yoact";
import createYoact = Yoact.createYoact;

export default class AuthModuleData extends JModuleData {
    //@Decorator.persistence()
    //public isSave: bool;
}

interface GetTokenParam {
    userId: string;
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
    data?: { balance: number };
}

interface UpdatePetSimulatorRankDataParam {
    mwGameId: string;
    petName: string;
    petRarity: number;
    petAttack: string;
    petObtainTime: number;
    round: number;
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
        if (Date.now() - this._lastQueryCurrencyTime > GlobalData.Auth.MIN_ACCESS_INTERVAL) {
            this.server.net_queryCurrency();
        } else {
            return;
        }
    }

//#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

//#region Net Method
    public net_setCurrency(val: number) {
        this.currency.count = val;
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
     * 更新宠物模拟器排行榜数据后缀.
     * @type {string}
     * @private
     */
    private static readonly UPDATE_PET_SIMULATOR_RANK_DATA_URL_SUFFIX = "/modragon/mo-rank/pet/update";

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

    private static readonly HEADER_TOKEN = "x-bits-token";

    private static readonly CODE_VERIFY_AES_KEY = "MODRAGONMODRAGONMODRAGON";

    private static readonly CODE_VERIFY_AES_IV = this.CODE_VERIFY_AES_KEY.slice(0, 16).split("").reverse().join("");

//#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

//#region Member
    private _eventListeners: EventListener[] = [];

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
        // CryptoJS.HmacSHA256("hello","world")

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

    private async getToken(playerId: number) {
        const player = Player.getPlayer(playerId);

//#region Exist for Test
//R <<<<<<
        // if (!player) {
        //     this.logPlayerNotExist(playerId);
        //     return;
        // }
        // const getTokenParam: GetTokenParam = {
        //     userId: player.userId,
        // };
//
//  ------
        const getTokenParam: GetTokenParam = {
            userId: "1026061",
        };
//T >>>>>>
//#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

        const body: EncryptedRequest = {
            encryptData: this.getSecret(JSON.stringify(getTokenParam)),
        };
        const resp = await fetch(`${GlobalData.Global.isRelease ?
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
                this._tokenMap.set(playerId, respInJson.data?.mToken);
                this.onRefreshToken(playerId);
            } else {
                this.logPlayerNotExist(playerId);
            }
        }
    }

    private onRefreshToken(playerId: number) {
        this.queryCurrency(playerId);
    }

    private async queryCurrency(playerId: number) {
        //#region Exist for Test
        //R <<<<<<
        //
        // const token = this._tokenMap.get(playerId);
        //  ------
        const token = "19dce05a6d90cbfa09f157c20a33a525fa2c5d827940ee8b31fc88fc76db9f83989683";
        //T >>>>>>
        //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
        if (GToolkit.isNullOrUndefined(token)) {
            this.logPlayerTokenInvalid(playerId);
            return;
        }
        const queryCurrencyParam: QueryCurrencyParam = {
            symbol: "mbox",
        };
        const resp = await fetch(`${GlobalData.Global.isRelease ?
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
            return Promise.resolve(null);
        }

        this.getClient(playerId).net_setCurrency(respInJson.data.balance);
    }

//#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

//#region Net Method
    public async net_queryCurrency() {
        this.queryCurrency(this.currentPlayerId);
    }

    @noReply()
    public net_updatePetSimulatorRankData(userId: string,
                                          petName: string,
                                          petRarity: PetQuality,
                                          petAttack: number,
                                          petObtainTime: number,
                                          round: number = 1) {
        const p: UpdatePetSimulatorRankDataParam = {
            mwGameId: userId,
            petName: petName,
            petRarity: petRarity,
            petAttack: petAttack.toString(),
            petObtainTime: petObtainTime,
            round: round,
        };
        const body: EncryptedRequest = {
            encryptData: this.getSecret(JSON.stringify(p)),
        };

        fetch(`${GlobalData.Global.isRelease ?
                AuthModuleS.RELEASE_UPDATE_PET_SIMULATOR_RANK_DATA_URL :
                AuthModuleS.TEST_UPDATE_PET_SIMULATOR_RANK_DATA_URL}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json;charset=UTF-8",
                },
                body: JSON.stringify(body),
            }).then(
            resp => {
                if (resp.status !== 200) {
                    Log4Ts.error(AuthModuleS, `update pet simulator rank data failed. ${resp.status}`);
                }
            },
        );

    }

//#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
}