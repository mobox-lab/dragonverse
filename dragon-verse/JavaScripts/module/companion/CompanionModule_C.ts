import { CompanionController, ICompanionEntityCollection } from "./CompanionController";
import { CompanionData } from "./CompanionData";
import { CompanionModule_S } from "./CompanionModule_S";


export class CompanionModule_C extends ModuleC<CompanionModule_S, CompanionData> implements ICompanionEntityCollection {



    private _controller: CompanionController;

    protected onAwake(): void {

        this._controller = new CompanionController(Player.localPlayer.playerId);
    }





    /**
     * 将指定伙伴设定为参战状态
     * @param companionId 
     */
    public async showUpCompanion(bagId: number, isShowUp: boolean = true) {

        let ret = await this.server.net_switchCompanionShowup(bagId, isShowUp);

        this.data.setCompanionShowup(ret);


        return ret;
    }




    /**
     * 获取当前参战的伙伴对应的bagId
     * @returns 
     */
    public getCurrentShowupBagId() {

        return this.data.getCurrentShowup();
    }


    getController(playerId?: number): CompanionController {

        return this._controller;
    }

}



