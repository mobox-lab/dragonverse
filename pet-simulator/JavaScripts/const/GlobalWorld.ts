import { GeneralManager, } from '../Modified027Editor/ModifiedStaticAPI';

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
    public static gameId1: string = "P_8724a60b560862674dd316a9ae21d16e4c4738a1";
    /**第二世界游戏id */
    public static gameId2: string = "P_7b2a65b26b5fb21d8ea2796931f4177f03b0ffe9";



    /**从第二世界跳转到第一世界的携带的数据字符串 */
    public static jumpDataStr: string = "jumpNewToOld";

    /**获取自定义数据  */
    public static async getCustomdata(key: string) {
        let data = null;

        data = await DataStorage.asyncGetData(key)


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

    /**
     * 跳转游戏接口
     */
    public static jumpGame(target: EWorldType, type: ETransferType) {
        let info: string = "";
        if (type != null) {
            info = new TransferInfo(type).encode();
        }

        if (target == EWorldType.world1) {
            RouteService.enterNewGame(this.gameId1, info);
        } else if (target == EWorldType.world2) {
            RouteService.enterNewGame(this.gameId2, info);
        }
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