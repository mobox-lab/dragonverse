import { GeneralManager, } from '../../Modified027Editor/ModifiedStaticAPI';
import { GameConfig } from "../../config/GameConfig";
import { GlobalEnum } from "../../const/Enum";
import { GlobalData } from "../../const/GlobalData";
import { oTraceError } from "../../util/LogManager";
import { PetBagModuleS } from "../PetBag/PetBagModuleS";
import { Task_ModuleS } from "../Task/Task_ModuleS";
import { CollectModuleC } from "./CollectModuleC";
import { CollectModuleData } from "./CollectModuleData";



export class CollectModuleS extends ModuleS<CollectModuleC, CollectModuleData>{

    /**临时宠物数Map 用于存到全服数据中 */
    private tempPetCountMap: Map<number, number> = new Map<number, number>();

    /**临时全服数据缓存Map */
    private allServerDataMap: Map<number, number> = new Map<number, number>();

    private interval: any;
    protected onStart(): void {
        this.initGetAllServerData();

        this.interval = TimeUtil.setInterval(this.timeInterval.bind(this), 100);
    }


    protected onPlayerEnterGame(player: mw.Player): void {
        let data = this.getPetCountByServer();
        if (data == null) return;
        this.getClient(player).net_getCollectCount(data);
    }
    protected onPlayerLeft(player: mw.Player): void {
        try {
            this.addPetCount();
            TimeUtil.clearInterval(this.interval);
            this.interval = TimeUtil.setInterval(this.timeInterval.bind(this), 100);
        } catch (error) {
            oTraceError(error);
        }
    }

    /**定时操作 */
    private async timeInterval() {
        let isScess = await this.addPetCount();
        if (!isScess) return;
        this.getAllDataSend();

    }
    /**发送数据 */
    private getAllDataSend() {
        let data = this.getPetCountByServer();
        if (data == null) return;
        Player.getAllPlayers().forEach((player) => {
            this.getClient(player).net_getCollectCount(data);
        });
    }


    public net_AddPet(id: number) {
        this.currentData.addHas(id);
    }

    public addPet(playerId: number, id: number, type?: GlobalEnum.PetGetType) {
        if (type) this.isCompleteTask(playerId, id, type);
        let isNew = this.getPlayerData(playerId).addHas(id);
        if (!isNew) return;
        this.petNotice(playerId);

        if (!this.tempPetCountMap.has(id)) {
            this.tempPetCountMap.set(id, 0);
        }
        this.tempPetCountMap.set(id, this.tempPetCountMap.get(id) + 1);
    }
    /**公告 */
    public petNotice(playerId: number) {
        let count = this.getPlayerData(playerId).HasArr.length;

        let index = GlobalData.Notice.collectPetCount.findIndex((item) => { return item == count });
        if (index != -1) {
            this.getAllClient().net_petNotice(playerId, index);
        }
    }

    /**判断获得该宠物是否完成任务 */
    public isCompleteTask(playerId: number, id: number, type?: GlobalEnum.PetGetType) {
        let taskModules = ModuleService.getModule(Task_ModuleS);
        let player = Player.getPlayer(playerId);
        if (!player) return;
        switch (type) {
            case GlobalEnum.PetGetType.Fusion:
                taskModules.fusion(player, id);
                break;
        }
    }

    public net_addLevle(val: number) {
        this.currentData.addLevle(val);
        ModuleService.getModule(PetBagModuleS).addSlot(this.currentPlayer, val);
    }

    /**********全服数据 *************** */
    //宠物ID  宠物数量

    /**添加数据 */
    public async addPetCount() {
        if (this.tempPetCountMap.size == 0) return false;
        for (let [key, value] of this.tempPetCountMap) {
            await this.addPetCountByServer(key.toString(), value);
        }
        this.tempPetCountMap.clear();
        return true;
    }
    /**添加全服数据 */
    public async addPetCountByServer(id: string, count: number) {
        let counyStr = await GeneralManager.asyncRpcGetData(id);
        let curCount = count;
        if (counyStr) {
            curCount += parseInt(counyStr);
        }
        this.allServerDataMap.set(parseInt(id), curCount);

        DataStorage.asyncSetData(id, curCount.toString()).then((res) => {
            if (res != mw.DataStorageResultCode.Success) {
                oTraceError('lwj 保存全服数据失败 错误码：' + res);
                setTimeout(() => {
                    this.addPetCountByServer(id, count);
                }, 6050)
            }
        })

    }

    /**获取全服数据发送给客户端 */
    public getPetCountByServer(): string {
        let arr = [];
        for (let [key, value] of this.allServerDataMap) {
            arr.push({ id: key, count: value });
        }
        if (arr.length == 0) return null;
        return JSON.stringify(arr);
    }

    /**初始化获取全部数据 */
    public async initGetAllServerData() {
        let cfgs = GameConfig.PetARR.getAllElement();
        for (let i = 0; i < cfgs.length; i++) {
            let counyStr = await GeneralManager.asyncRpcGetData(cfgs[i].id.toString());
            if (counyStr) {
                this.allServerDataMap.set(cfgs[i].id, parseInt(counyStr));
            } else {
                this.allServerDataMap.set(cfgs[i].id, 0);
            }
        }
        this.getAllDataSend();
    }

}