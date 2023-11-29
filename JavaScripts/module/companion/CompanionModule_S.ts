import { GameConfig } from "../../config/GameConfig";
import GToolkit from "../../util/GToolkit";
import { CompanionController, ICompanionEntityCollection } from "./CompanionController";
import { CompanionData, CompanionDataHelper, CompanionEvents, CompanionInfo } from "./CompanionData";
import { CompanionModule_C } from "./CompanionModule_C";

export class CompanionModule_S extends ModuleS<CompanionModule_C, CompanionData> implements ICompanionEntityCollection {

    private _map: Map<number, CompanionController> = new Map();


    protected onPlayerEnterGame(player: mw.Player): void {
        this.initializePlayerCompanion(player.playerId);
    }

    /**
     * 给玩家添加一个伙伴
     * @param playerId 
     * @param companionId 
     * @returns 
     */
    addCompanionForPlayer(playerId: number, companionId: number): void {

        let player = this.getClient(playerId);

        if (!player) return;

        let companion = CompanionDataHelper.createSingleCompanionInfo(Date.now(), companionId);
        let data = this.getPlayerData(playerId);
        data.addCompanion(companion);

        player.net_companionAdded(companion);
        mw.Event.dispatchToLocal(CompanionEvents.PlayerCompanionAdded, companion, playerId);
        GToolkit.warn(this.constructor, `给${playerId}玩家添加${companionId}伙伴成功}`)
        this.getPlayerData(playerId).save(false);
    }



    /**
     * 请求将一个宠物设置为参战状态
     * @param companionSign 宠物唯一id
     * @param playerId 玩家id
     * @param showUp 是否参战斗
     * @returns 
     */
    public async net_switchCompanionShowup(companionSign: string, playerId: number = this.currentPlayerId, showUp = true) {

        let data = this.getPlayerData(playerId);;

        let companion = data.getCompanion(companionSign);

        if (companion) {

            if (companion.isShowUp === showUp) {
                GToolkit.warn(this.constructor, `${playerId} 设置${companionSign}伙伴为参战状态失败,重复的参战状态`);
                return false;
            }

            companion.isShowUp = showUp;
            GToolkit.warn(this.constructor, `${playerId} 设置${companionSign}伙伴为参战状态成功,当前状态:${showUp}`);
            this.onCompanionShowUp(companion, playerId);
            data.save(false);
            return true;
        }

        return false;
    }




    getController(playerId: number): CompanionController {

        if (!this._map.get(playerId)) {
            this._map.set(playerId, new CompanionController(playerId));
        }

        return this._map.get(playerId);
    }




    public getPlayerCompanionIdList(playerId: number) {

        return this.getPlayerData(playerId).getCompanionIdList();
    }


    public getCompanionDetailInfo(playerId: number, dragonSign: string) {
        let data = this.getPlayerData(playerId);
        return data.getCompanion(dragonSign);
    }



    private async onCompanionShowUp(companion: CompanionInfo, playerId: number) {

        let config = GameConfig.Dragon.getElement(companion.companionId);
        let controller = this.getController(playerId);
        if (companion.isShowUp) {
            controller.createCompanion(config.avatar, companion.companionSign);
        } else {
            controller.removeCompanionWithSign(companion.companionSign);
        }
    }



    private initializePlayerCompanion(playerId: number) {
        let data = this.getPlayerData(playerId);

        data.foreachCompanion((value) => {
            if (value.isShowUp) {
                this.onCompanionShowUp(value, playerId);
            }
        })

    }


}