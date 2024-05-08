import { GameConfig } from "../../config/GameConfig";
import { BagModuleS } from "../bag/BagModule";
import { CompanionController, ICompanionEntityCollection } from "./CompanionController";
import { CompanionData } from "./CompanionData";
import { CompanionHelper } from "./CompanionHelper";
import { CompanionModule_C } from "./CompanionModule_C";
import ForeignKeyIndexer from "../../const/ForeignKeyIndexer";

export class CompanionModule_S extends ModuleS<CompanionModule_C, CompanionData> implements ICompanionEntityCollection {

    private _map: Map<number, CompanionController> = new Map();


    protected onPlayerEnterGame(player: mw.Player): void {
        this.initializePlayerCompanion(player.playerId);
    }


    /**
     * 请求将一个宠物设置为参战状态
     * @param bagId
     * @param playerId 玩家id
     * @param showUp 是否参战斗
     * @returns
     */
    public async net_switchCompanionShowup(bagId: number, showUp = true, playerId: number = this.currentPlayerId) {

        let data = this.getPlayerData(playerId);
        let bagModule = mwext.ModuleService.getModule(BagModuleS);

        if (!bagModule.hasItem(playerId, bagId)) {
            // 背包里没有这个东西，return
            return data.currentShowupBagId;
        }


        if (!CompanionHelper.isDragon(bagId)) {

            // 也不是龙
            return data.currentShowupBagId;
        }


        if (bagId === data.currentShowupBagId) {

            if (showUp) {
                // 已经是参战状态了
                return data.currentShowupBagId;
            } else {

                this.onCompanionShowUp(bagId, playerId, false);
                data.setCompanionShowup(0);
                return data.currentShowupBagId;
            }
        }

        if (!showUp) {
            // 不是参战状态
            return data.currentShowupBagId;
        }

        if (data.currentShowupBagId) {

            // 有参战的宠物，先取消参战
            this.onCompanionShowUp(data.currentShowupBagId, playerId, false);
        }

        data.setCompanionShowup(bagId);
        this.onCompanionShowUp(data.currentShowupBagId, playerId, true);
        return data.currentShowupBagId;


    }


    getController(playerId: number): CompanionController {

        if (!this._map.get(playerId)) {
            this._map.set(playerId, new CompanionController(playerId));
        }

        return this._map.get(playerId);
    }


    private async onCompanionShowUp(bagId: number, playerId: number, isShowUp = true) {


        let controller = this.getController(playerId);
        if (isShowUp) {
            let dragonId = ForeignKeyIndexer.getInstance().queryDragonByBagId(bagId);
            let config = GameConfig.Dragon.getElement(dragonId);
            if (!config) {
                throw new Error(`can not find dragon config with id ${dragonId}`);
            }
            let nickName = GameConfig.BagItem.getElement(bagId).name;
            //翅膀信息读表
            let wingGuid = config.wingGuid;
            let wingTransform = config.wingTransform;
            let transform = null;
            if (wingTransform) {
                transform = new Transform(new Vector(wingTransform[0][0], wingTransform[0][1], wingTransform[0][2]), new Rotation(wingTransform[1][0], wingTransform[1][1], wingTransform[1][2]), new Vector(wingTransform[2][0], wingTransform[2][1], wingTransform[2][2]));
            }

            controller.createCompanion(config.avatar.toString(), bagId.toString(), nickName, wingGuid, transform);
        } else {
            controller.removeCompanionWithSign(bagId.toString());
        }
    }


    private initializePlayerCompanion(playerId: number) {
        let data = this.getPlayerData(playerId);

        let currentShowupBagId = data.currentShowupBagId;

        if (currentShowupBagId) {
            this.onCompanionShowUp(currentShowupBagId, playerId, true);
        }


    }


}