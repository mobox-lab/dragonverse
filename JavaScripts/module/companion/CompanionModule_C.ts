import { CompanionController, ICompanionEntityCollection } from "./CompanionController";
import { CompanionData, CompanionEvents, CompanionInfo } from "./CompanionData";
import { CompanionModule_S } from "./CompanionModule_S";


export class CompanionModule_C extends ModuleC<CompanionModule_S, CompanionData> implements ICompanionEntityCollection {



    private _controller: CompanionController;

    protected onAwake(): void {

        this._controller = new CompanionController(Player.localPlayer.playerId);
    }

    /**
     * 服务端刷新玩家获得新的伙伴
     * @param companionInfo 
     */
    net_companionAdded(companionInfo: CompanionInfo) {
        this.data.addCompanion(companionInfo);
        mw.Event.dispatchToLocal(CompanionEvents.PlayerCompanionAdded, companionInfo)
    }



    /**
     * 将指定伙伴设定为参战状态
     * @param companionId 
     */
    public async showUpCompanion(companionId: string) {

        let ret = await this.server.net_switchCompanionShowup(companionId);

        if (ret) {
            this.data.getCompanion(companionId).isShowUp = true;
        }

        return ret;

    }


    /**
     * 获取玩家拥有的所有伙伴id列表
     * @returns 
     */
    public getCompanionIdList() {
        return this.data.getCompanionIdList();
    }


    getController(playerId?: number): CompanionController {

        return this._controller;
    }

}



