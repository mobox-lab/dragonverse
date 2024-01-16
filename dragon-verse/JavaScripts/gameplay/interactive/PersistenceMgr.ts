
const PersistenceKeySheets = 'PersistenceSheet'


type HeadSheetName = Set<string>;


interface IPersistenceData {


    isDirty: boolean;

    data: any;

}




export class PersistenceMgr {

    private static _ins: PersistenceMgr;

    private _playerMap: Map<string, PlayerPersistenceMgr> = new Map();


    private localPersistence: PlayerPersistenceMgr;

    private constructor() {
        this.initialize();
    }

    public static get ins() {
        return this._ins || (this._ins = new PersistenceMgr());
    }


    private initialize() {

        mw.Event.addClientListener("PersistenceWrite", (player: mw.Player, ...params: unknown[]) => {

            let [headKey, content, immediately, childKey] = params;

            this.onPersistenceWrite(player, headKey as string, content, immediately as boolean, childKey as string);
        })

        mw.Event.addClientListener("PersistenceGet", (player: mw.Player, ...params: unknown[]) => {

            let [headKey, content, immediately, childKey] = params;

            this.onPersistenceWrite(player, headKey as string, content, immediately as boolean, childKey as string);
        })

        mw.Event.addServerListener("PersistenceGetRep", (tokenId: string, data: any) => {

        })

        if (mw.SystemUtil.isClient()) {
            const userId = mw.Player.localPlayer.userId;
            this.localPersistence = new PlayerPersistenceMgr(userId);
            this._playerMap.set(userId, this.localPersistence);
        }

    }

    onPersistenceWrite(player: mw.Player, headKey: string, content: unknown, immediately: boolean, childKey: string,) {

        this.write(player.userId, headKey, content, immediately, childKey);
    }

    write(userId: string, headKey: string, content: unknown, saveImmediately: boolean = false, childKey?: string) {

        let playerMgr = this.getPlayerMgr(userId);

        playerMgr.write(headKey, content, saveImmediately, childKey);
        if (this.localPersistence) {
            mw.Event.dispatchToServer("PersistenceWrite", userId, headKey, content, saveImmediately, childKey)
        }
    }


    async get(userId: string, headKey: string, childKey?: string) {


        let playerMgr = this.getPlayerMgr(userId);

        return await playerMgr.get(headKey, childKey);
    }


    private getPlayerMgr(userId: string) {

        if (!this._playerMap.has(userId)) {
            this._playerMap.set(userId, new PlayerPersistenceMgr(userId));
        }
        return this._playerMap.get(userId);
    }





}

/**
 * 持久化
 */
class PlayerPersistenceMgr {



    private _keys: HeadSheetName = new Set();


    private _data: Record<string, IPersistenceData> = {};

    constructor(public readonly userId: string) {


    }







    public write(headKey: string, content: unknown, saveImmediately = false, childKey?: string) {

        let writeTarget = !childKey ? this.getHeadKeyMainData(headKey) : this.getChildKeyData(headKey, childKey);
        Object.assign(writeTarget.data, content);
        writeTarget.isDirty = true;
    }


    public async get(headKey: string, childKey?: string) {

        if (!this.isPersistenceDataCached(headKey)) {

            const data = await mw.DataStorage.asyncGetData(this.normalizedHeadKey(headKey));

            if (data.code !== mw.DataStorageResultCode.Success) {

                return;
            }

            this.write(headKey, data.data, false, childKey);

        }

        let data = this.getChildKeyData(headKey, childKey);
        return data;

    }




    private getHeadKeyMainData(headKey: string): IPersistenceData {

        if (!this._keys.has(headKey)) {

            this._keys.add(headKey);

            this._data[headKey] = {
                isDirty: false,
                data: {}
            };
        }

        return this._data[headKey];
    }




    private getChildKeyData(headKey: string, childKey?: string): IPersistenceData {

        let mainData = this.getHeadKeyMainData(headKey);

        if (!childKey) {
            return mainData;
        }

        if (!mainData.data[childKey]) {
            mainData.isDirty = true;
            mainData.data[childKey] = {
                isDirty: false,
                data: {}
            };
        }

        return mainData.data[childKey];
    }

    private isPersistenceDataCached(key: string) {
        return this._keys.has(key);
    }

    private normalizedHeadKey(key: string) {
        return `${this.userId}_PlayerPersistenceMgr_${key}`
    }

}




