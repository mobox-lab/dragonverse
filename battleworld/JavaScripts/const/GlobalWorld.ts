
export enum EWorldType {
    /**默认世界 */
    world1 = 0,
    /**新世界 */
    world2 = 1,
}

export enum ETransferType {
    /**主动回去 */
    active = 0,
    /**被动回去 */
    passive = 1,
}

export class GlobalWorld {

    /**当前世界类型 */
    public static worldType: EWorldType = EWorldType.world1;
    /**第一世界游戏id */
    public static gameId1: string = "P_529a8d2ddcedf57f0ebbfce6d5ac78f5d7fc3151";
    /**第二世界游戏id */
    public static gameId2: string = "P_cd66533884eec73a08f66b7e86429d1273396ebc";



    /**从第二世界跳转到第一世界的携带的数据字符串 */
    public static jumpDataStr: string = "jumpNewToOld";

    /**获取自定义数据  */
    public static async getCustomdata(key: string) {
        let data = null;
        if (GlobalWorld.worldType == EWorldType.world1 || SystemUtil.isPIE) {
            data = await DataStorage.asyncGetData(key);// 加载1版数据
        } else {
            data = await DataStorage.asyncGetOtherGameData(GlobalWorld.gameId1, key);// 加载1版数据
        }

        return data;
    }

    /**
     * 设置自定义数据
     * @param saveKey 保存key
     * @param dataInfo 保存数据
     * @param pId 如果填了玩家id，那么如果保存失败，会给玩家发送错误信息并从客户端上报埋点
     * @returns 是否保存成功
     */
    public static async setCustomData(saveKey: string, dataInfo: any, pId?: number | string) {
        let code: mw.DataStorageResultCode = null;
        if (GlobalWorld.worldType == EWorldType.world1 || SystemUtil.isPIE) {
            code = await DataStorage.asyncSetData(saveKey, dataInfo);
        } else {
            code = await DataStorage.asyncSetOtherGameData(GlobalWorld.gameId1, saveKey, dataInfo);
        }

        if (code != mw.DataStorageResultCode.Success && pId != null) {
            try {
                console.error("ErrorInfo_setCustomData: ", saveKey, code);
                let player = mw.Player.getPlayer(pId);

                if (player) {
                    Event.dispatchToClient(player, "ErrorInfo_setCustomData", saveKey, code);
                }
            } catch (error) {
                console.error("setCustomData error:", error);
            }
        }

        return code == mw.DataStorageResultCode.Success;
    }


}

/**
 * 跳转游戏的格式
 */
export class TransferInfo {
    public constructor(
        public season: ETransferType,
        public flag: string = GlobalWorld.jumpDataStr
    ) { }

    /**
     * 编码
     */
    public encode(): string {
        return this.season + "|" + this.flag;
    }

    /**
     * 解码
     */
    public static decode(str: string): TransferInfo {
        let sps = str.split("|");
        if (sps == null || sps.length <= 0) return null;
        let season = Number(sps[0]);
        let flag = sps[1];
        return new TransferInfo(season, flag);
    }
}