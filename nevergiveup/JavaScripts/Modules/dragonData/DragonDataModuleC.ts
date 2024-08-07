import { JModuleC } from "../../depend/jibu-module/JModule";
import { UserDragonRespData } from "../auth/AuthModule";
import DragonDataModuleData from "./DragonDataModuleData";
import { DragonDataModuleS } from "./DragonDataModuleS";

export class DragonDataModuleC extends JModuleC<DragonDataModuleS, DragonDataModuleData> {
    /**
     * 龙娘数据
     * @type {UserDragonRespData|undefined}
     */
    public dragonData: UserDragonRespData | undefined = undefined;

    public async net_queryDragon() {
        const res = await this.server.queryLocalUserDragon();
        this.dragonData = res;
    }
}
