import { oTraceWarning } from "odin";
import { SpawnManager } from '../../Modified027Editor/ModifiedSpawn';
import { GameConfig } from "../../config/GameConfig";
import { GlobalEnum } from "../../const/Enum";
import { GlobalData } from "../../const/GlobalData";
import { oTraceError } from "../../util/LogManager";
import { utils } from "../../util/uitls";
import { AnalyticsTool } from "../Analytics/AnalyticsTool";
import { AreaDivideManager } from "../AreaDivide/AreaDivideManager";
import { PetSimulatorPlayerModuleData } from "../Player/PlayerModuleData";
import { Task_ModuleS } from "../Task/Task_ModuleS";
import { PlayerNameManager } from "../Trading/PlayerNameManager";
import { P_GlobalTips } from "../UI/P_GlobalTips";
import { DropManagerS } from "./DropResouce";
import resourceScript, { SceneResourceMap } from "./resource";
import { BonusUI } from "./scenceUnitUI";
import { RewardTipsManager } from "../UI/RewardTips";

export class ResourceModuleC extends ModuleC<ResourceModuleS, null> {

    /**破化物个数 */
    private breakCount: number = 0;
    private curIndex: number = 0;
    /**刮痧公告 */
    private guaShaArr: number[] = [];

    protected onStart(): void {
 				RewardTipsManager.getInstance().registerEvent();
        AreaDivideManager.instance.onAreaChangeAC.add(this.areaChange.bind(this));
        BonusUI.instance;
				this.server.net_start()
        Event.addLocalListener(GlobalEnum.EventName.AttackDestroy, () => {
            this.breakCount++;
            if (this.breakCount == 3) {
                this.uis.forEach((item) => {
                    item.parent = null;
                    GameObjPool.despawn(item);
                })
            }
            AnalyticsTool.game_over(this.breakCount);
        });
        Event.addLocalListener(GlobalEnum.EventName.GuaShaNotice, (cfg: number, isLife: boolean) => {
            let isHas = this.guaShaArr.includes(cfg);

            if (!isLife && isHas) {
                this.guaShaArr.splice(this.guaShaArr.indexOf(cfg), 1);
                this.server.net_noticeGuaSha(cfg, isLife);
                return;
            }
            if (!isHas) {
                this.guaShaArr.push(cfg);
                this.server.net_noticeGuaSha(cfg, isLife);
            }
        })
    }
    protected onEnterScene(sceneType: number): void {
        this.guideClickDestroyable();
    }

    private objs: mw.GameObject[] = [];
    /**引导点击破坏物 */
    public guideClickDestroyable(): void {
        let PlayerData = DataCenterC.getData(PetSimulatorPlayerModuleData);
        let isNewPlayer = PlayerData.gold == 0;
        if (!isNewPlayer) {
            return;
        }
        this.createObj();

        SceneResourceMap.get(1002)?.forEach((item) => {
            if (item.cfgId == 3) {
                let pointCfg = GameConfig.DropPoint.getElement(item.pointId);
                if (pointCfg.areaPoints.y >= GlobalData.SceneResource.areaY) {
                    if (this.objs.indexOf(item.Obj) == -1 && this.objs.length <= 10)
                        this.objs.push(item.Obj);
                }
            }
        });

        for (let i = this.curIndex; i < this.objs.length; i++) {
            const element = this.objs[i];
            let ui = this.uis[i];
            if (!ui) {
                break;
            }
            ui.parent = element;
            ui.localTransform.position = (new mw.Vector(0, 0, 0));
            this.curIndex++;
        }
        if (this.objs.length < 10) {
            setTimeout(() => {
                this.guideClickDestroyable();
            }, 5000);
            return;
        }

    }
    private uis: mw.GameObject[] = [];
    private async createObj() {
        if (this.uis.length < 10) {
            let is = await AssetUtil.asyncDownloadAsset("86D759734C10E0628324CD8DBA68FC43");
        }
        while (this.uis.length < 10) {
            let ui = await this.create();
            this.uis.push(ui);
        }
    }
    private async create() {
        let ui = await SpawnManager.modifyPoolAsyncSpawn("86D759734C10E0628324CD8DBA68FC43", GameObjPoolSourceType.Prefab);
        ui.worldTransform.position = new Vector(0, 0, -5000);
        let wid = ui.getChildByName("世界UI") as mw.UIWidget;
        let text = wid.getTargetUIWidget().rootContent.findChildByPath("TextBlock") as mw.TextBlock;
        text.text = GameConfig.Language.World_3D_1.Value;
        wid.headUIMaxVisibleDistance = 1500;
        wid.scaledByDistanceEnable = false;
        return ui;
    }

    private areaChange(preId: number, curId: number) {

        this.server.net_createArea(preId, curId)
        //开始生成资源
        if (curId == 1001) {
            //初始点
            this.getResMapByAreaId(1002);
        } else if (curId == 2001) {
            this.getResMapByAreaId(2002);
        } else
            this.getResMapByAreaId(curId);

        this.checkAreaRecycle(preId, curId);
    }
    /**通过区域id 找资源Map */
    public async getResMapByAreaId(areaId: number) {
        let isHas = SceneResourceMap.has(areaId);
        if (!isHas) {
            oTraceError('lwj MAp 没有找到对应的资源点' + areaId);
            return;
        }
        let resArr = SceneResourceMap.get(areaId);
        let isInit: boolean = true;
        for (let i = 0; i < resArr.length; i++) {
            const element = resArr[i];
            if (GlobalData.SceneResource.ignoreAreaArr.includes(areaId)) {
                isInit = await element.createDefaultObj();
            } else {
                isInit = await element.createObjANDStart();
            }
            if (isInit) {
                await TimeUtil.delaySecond(0.8);
            }
        }
    }

    /**判断前区域回收 */
    private checkAreaRecycle(preId: number, curId: number) {

        //三世界跳转到一二世界
        if (preId > 3000 && curId < 3000) {
            this.returnResMapByAreaId(3002);
            this.returnResMapByAreaId(3003);
            this.returnResMapByAreaId(3004);
            this.returnResMapByAreaId(3005);
            this.returnResMapByAreaId(3006);
            this.returnResMapByAreaId(3007);
            return;
        }

        //没规则，只能硬写
        if (curId == 3003 && (preId == 3004 || preId == 3005)) {
            this.returnResMapByAreaId(3006);
            return;
        }

        //一三区域回收前一个区域
        if (preId < 2000 || (preId > 3000 && curId > 3000)) {
            if (curId > preId) {
                this.returnResMapByAreaId(preId - 1);
            } else {
                this.returnResMapByAreaId(preId + 1);
            }
        } else {
            //二区域直接回收
            this.returnResMapByAreaId(preId);
        }

    }

    /**回收区域资源 */
    private returnResMapByAreaId(areaId: number) {

        if (GlobalData.SceneResource.clientIgnoreAreaArr.includes(areaId)) {
            oTraceError('lwj  该区域不需要回收' + areaId);
            return;
        }

        let isHas = SceneResourceMap.has(areaId);
        if (!isHas) {
            oTraceError('lwj  没有找到对应的资源点 回收 ' + areaId);
            return;
        }
        let resArr = SceneResourceMap.get(areaId);
        for (let i = 0; i < resArr.length; i++) {
            const element = resArr[i];
            element.recycleResourceModel();
        }
    }


    public async net_guaShaNotice(playerId: number, cfg: number) {
        let name = await PlayerNameManager.instance.getPlayerName(playerId);
        const element = GlobalData.Notice.bigBoxTips;
        let str = "";
        switch (cfg) {
            case element[0]:
                str = GameConfig.Language.World_Tips_6.Value;
                break;
            case element[1]:
                str = GameConfig.Language.World_Tips_7.Value;
                break;
            case element[2]:
                str = GameConfig.Language.World_Tips_8.Value;
                break;
            case element[3]:
                str = GameConfig.Language.World_Tips_9.Value;
            default:
                break;
        }
        str = name + " " + str;
        mw.UIService.getUI(P_GlobalTips).showTips(str);
    }

    protected onUpdate(dt: number): void {
				this.server.net_onResourceUpdate(dt)
    }

}


export class ResourceModuleS extends ModuleS<ResourceModuleC, null> {

    /**资源区域Map 个数 areaID,pointID */
    private areaMap: Map<number, number> = new Map<number, number>();
    /**资源区域对应表格属性 */
    private areaPointMap: Map<number, Array<number>> = new Map<number, Array<number>>();
    /**资源回收历史记录Map */
    private areaHistoryMap: Map<number, Array<number>> = new Map<number, Array<number>>();
    /**场景初始化MAp */
    private sceneInitMap: Map<number, boolean> = new Map<number, boolean>();
    /**区域资源点权重 */
    // private areaWeightMap: Map<number, number[]> = new Map<number, number[]>();
    /**脚本缓存池 */
    private scriptPool: resourceScript[] = [];
    /**刮痧map */
    private guaShaArr: number[] = [];

    /**当前是否有玩家加入 */
    private isHasPlayer: boolean = false;

    /**攻击破坏物事件
     * @param boolean 是否是巨大宝箱
     * @param number 玩家id
     */
    public onAttackDestroy: Action2<boolean, number> = new Action2()

    protected onPlayerEnterGame(player: mw.Player): void {
        if (!this.isHasPlayer) {
            this.isHasPlayer = true;
            AreaDivideManager.instance.init();
            this.initArea();
            this.initBigBox();
        }
    }

    //初始化区域
    private initArea() {
        for (let i = 0; i < GlobalData.SceneResource.defaultAreaArr.length; i++) {
            let id = GlobalData.SceneResource.defaultAreaArr[i];
            this.areaFirstRefresh(id);
        }
    }

    /**当前区域首次刷新至上限 */
    private async areaFirstRefresh(areaId: number) {
        let size = GlobalData.SceneResource.maxResourceCount;
        let need = size;
        if (this.areaPointMap.has(areaId)) {
            let hasCount = this.areaPointMap.get(areaId);
            need = size - hasCount.length;
        }
        for (let i = 0; i < need; i++) {
            await this.areaRandomRefresh(areaId);
        }
    }

    /**当前区域随机生成一个 */
    private async areaRandomRefresh(areaId: number) {
        let cfgId = this.getAreaResCount(areaId);
        await TimeUtil.delaySecond(GlobalData.SceneResource.initResourceRefresh);
        this.addTranArea(areaId, cfgId);
    }

    /**获取当前区域的剩余资源点 */
    private getAreaResCount(areaId: number): number {
        if (!this.areaPointMap.has(areaId)) {
            this.areaPointMap.set(areaId, this.getAreaResIds(areaId));
        }
        let cfgs = this.areaPointMap.get(areaId);
        //从该Array中取出第一个元素
        return cfgs.shift();
    }

    /**返还当前区域资源点 */
    private returnAreaResCount(areaId: number, pointId: number, sceneId: number) {
        if (!this.areaPointMap.has(areaId)) {
            this.areaPointMap.set(areaId, this.getAreaResIds(areaId));
        }
        let cfgs = this.areaPointMap.get(areaId);
        cfgs.push(pointId);

        //保存历史记录
        if (!this.areaHistoryMap.has(areaId)) {
            this.areaHistoryMap.set(areaId, []);
        }
        let arr = this.areaHistoryMap.get(areaId);
        arr.push(sceneId);
    }
    /**获取历史记录 */
    public getHistoryRes(areaId: number): number {
        if (!this.areaHistoryMap.has(areaId)) {
            return 0;
        }
        let arr = this.areaHistoryMap.get(areaId);
        if (arr.length == 0) return 0;
        let scenceID = arr.shift();

        let cfgs = GameConfig.SceneUnit.findElements("AreaID", areaId);
        let delArr = [];
        for (let i = 0; i < cfgs.length; i++) {
            const element = cfgs[i].ID;
            if (GlobalData.BigBox.boxId.includes(element)) {
                delArr.push(i);
            }
        }
        for (let i = delArr.length - 1; i >= 0; i--) {
            cfgs.splice(delArr[i], 1);
        }

        let otherProbability = 100 - GlobalData.SceneResource.sameProbability;
        let rate: number[] = [];
        for (let id = 0; id < cfgs.length; id++) {
            const element = cfgs[id].ID;
            if (GlobalData.BigBox.boxId.includes(element)) continue;
            if (element == scenceID) {
                rate.push(GlobalData.SceneResource.sameProbability);
            } else
                rate.push(Number((otherProbability / (cfgs.length - 1)).toFixed(2)));
        }

        let probability = 0;
        let random = MathUtil.randomFloat(0, 99)
        for (let i = 0; i < rate.length; i++) {
            probability += rate[i];
            if (random <= probability) {
                return cfgs[i].ID;
            }
        }
        oTraceError('lwj 获取历史记录失败' + scenceID + "  " + rate + "  " + random);
        return 0;
    }

    /**获取当前区域的所有资源id数组 */
    private getAreaResIds(areaId: number): Array<number> {
        let arr = new Array<number>();
        let cfgs = GameConfig.DropPoint.getAllElement();
        for (let i = 0; i < cfgs.length; i++) {
            const cfg = cfgs[i];
            if (cfg.areaID == areaId) {
                arr.push(cfg.id);
                if (arr.length >= GlobalData.SceneResource.maxResourceCount + 10) break;
            }
        }
        return arr;
    }

    /**向当前坐标里添加指定点 */
    private async addTranArea(areaId: number, pointId: number) {
        let isHas = this.areaMap.has(areaId);
        if (!isHas) {
            this.areaMap.set(areaId, 0);
        }
        let count = this.areaMap.get(areaId);


        if (count >= GlobalData.SceneResource.maxResourceCount) {
            oTraceWarning('lwj 超过上限');
            return;
        }
        let historyScenceId = this.getHistoryRes(areaId);
        // if (historyScenceId == 0 && areaId == 1002) { //初始默认区域
        //     let type = this.isAreaOneFront(pointId);
        //     historyScenceId = this.getScenceUnitId(areaId, type);
        // } else if (historyScenceId == 0) {
        //     let type = this.randomCreate(areaId);
        //     historyScenceId = this.getScenceUnitId(areaId, type);
        // } else if (historyScenceId != 0 && areaId == 1002) {
        //     let type = this.isAreaOneFront(pointId);
        //     historyScenceId = this.getScenceUnitId(areaId, type);
        // }

        if (historyScenceId == 0) {
            historyScenceId = this.randomCreate(areaId);
            // historyScenceId = this.getScenceUnitId(areaId, type);
        }

        let res = await this.getScript();
        count++;
        this.areaMap.set(areaId, count);

        res.initServer(pointId, historyScenceId);
        res.onDead.add((playerId: number) => {
            let count = this.areaMap.get(areaId)
            count--;
            this.areaMap.set(areaId, count);

            this.returnScript(res);
            this.returnAreaResCount(areaId, pointId, historyScenceId);

            if (count < GlobalData.SceneResource.minResourceCount) {
                oTraceError('lwj 低于下限');
                this.areaRandomRefresh(areaId);
            }
            this.onAttackDestroy.call(false, playerId);
            ModuleService.getModule(Task_ModuleS).breakDestroy(Player.getPlayer(playerId), historyScenceId, areaId);

            // if (res.ResourceType >= GlobalEnum.DestructorType.Gold1) {
            //     if (res.ResourceType == GlobalEnum.DestructorType.Gold4) {
            //         ModuleService.getModule(PassModuleS).onTaskUpdateAC.call(playerId, GlobalEnum.VipTaskType.GiftBox, 1);
            //     } else {
            //         ModuleService.getModule(PassModuleS).onTaskUpdateAC.call(playerId, GlobalEnum.VipTaskType.illRes, 1);
            //     }
            // }
        })

    }

    // /**判断是区域一的前后部分，生成类型 */
    // public isAreaOneFront(pointId: number): number {
    //     let X = GlobalData.SceneResource.areaY;
    //     let loc = GameConfig.DropPoint.getElement(pointId).areaPoints;
    //     if (loc.y >= X) {
    //         return this.getResTypeByWeight(GlobalData.SceneResource.area1Weight);
    //     } else {
    //         return this.getResTypeByWeight(GlobalData.SceneResource.area2Weight);
    //     }

    // }
    // /**根据权重数组 返回资源类型 */
    // public getResTypeByWeight(weightArr: number[]): number {
    //     let weight = 0;
    //     weightArr.forEach((item) => {
    //         weight += item;
    //     })
    //     let random = utils.GetRandomNum(0, weight);
    //     let probability = 0;
    //     for (let i = 0; i < weightArr.length; i++) {
    //         probability += weightArr[i];
    //         if (random <= probability) {

    //             return GlobalData.SceneResource.resourceType[i];
    //         }
    //     }
    //     console.error('lwj error返回 0 ');
    //     return 0;
    // }

    /**随机生成 */
    private randomCreate(areaId: number) {
        // if (!this.areaWeightMap.has(areaId)) {
        //     this.areaWeightMap.set(areaId, this.getAreaWeight(areaId));
        // }
        let weight = 0;
        let weightArr = this.getAreaWeight(areaId);
        weightArr.forEach((item) => {
            weight += item.weight;
        })
        let random = utils.GetRandomNum(0, weight);
        let probability = 0;
        let sum = 0;
        for (let i = 0; i < weightArr.length; i++) {
            probability += weightArr[i].weight;
            if (random < probability && random >= sum) {
                //表里不是配了吗，为啥再写一份？这样限制死了配表顺序还有type了
                // return GlobalData.SceneResource.resourceType[i];
                return weightArr[i].id;
            }
            sum += weightArr[i].weight;
        }
        //=probability的话就返回最后一个
        return weightArr[weightArr.length - 1].id;
    }
    private getAreaWeight(areaId: number): { id: number, weight: number }[] {
        let cfgs = GameConfig.SceneUnit.findElements("AreaID", areaId);
        // let cfgs = GameConfig.SceneUnit.getAllElement();
        let weightArr: { id: number, weight: number }[] = [];
        // let weight = 0;
        cfgs.forEach((item) => {
            // if (item.AreaID == areaId) {
            // if (item.Weight != 0) {
            // weight += item.Weight;
            weightArr.push({ id: item.ID, weight: item.Weight });
            // }
            // }
        });
        return weightArr;
    }


    /**
     * 玩家进入区域
     * @param preId 之前所在区域id
     * @param currentId 当前所在区域id
     */
    public net_createArea(preId: number, currentId: number) {

        if (GlobalData.SceneResource.ignoreAreaArr.includes(currentId)) { return }

        let isHas = this.sceneInitMap.has(currentId)
        if (!isHas) {
            this.sceneInitMap.set(currentId, true);
            this.areaFirstRefresh(currentId);
        }

    }

    /**根据areaId 与 Type 查找对应id */
    // public getScenceUnitId(areaId: number, type: number): number {
    //     let cfgs = GameConfig.SceneUnit.findElements("AreaID", areaId);
    //     let cfg = cfgs.find((item) => {
    //         let curType = item.resType;
    //         return curType == type;
    //     })
    //     if (cfg)
    //         return cfg.ID;
    //     else
    //         oTraceError('lwj 没有找到对应的场景单元点' + areaId + type);
    // }

    /**初始化巨大宝箱 */
    private initBigBox() {

        let locArrId = GlobalData.BigBox.boxLocationId;
        GlobalData.BigBox.boxId.forEach((item, index) => {
            this.createBigBox(locArrId[index], item);
        });
    }

    /**创建宝箱 */
    private async createBigBox(pointId: number, cfgId: number) {
        let res = await this.getScript()
        res.initServer(pointId, cfgId, true);
        res.onDead.add((str: string, playerId: number) => {
            let arr = str.split("_");
            let cfgId = Number(arr[0]);
            let pointId = Number(arr[1]);
            this.returnScript(res);
            setTimeout(() => {
                this.createBigBox(pointId, cfgId);
            }, GlobalData.BigBox.boxAppearTime * 1000);
            let areaId = GameConfig.SceneUnit.getElement(cfgId).AreaID;
            ModuleService.getModule(Task_ModuleS).breakDestroy(Player.getPlayer(playerId), cfgId, areaId);
            // ModuleService.getModule(PassModuleS).onTaskUpdateAC.call(playerId, GlobalEnum.VipTaskType.Box, 1);
        });
    }

    /**获取脚本 */
    public async getScript(): Promise<resourceScript> {
        let script = this.scriptPool.shift();
        if (!script) {
            script = await mw.Script.spawnScript(resourceScript, true);
        }
        return script;
    }
    /**回收脚本 */
    public returnScript(script: resourceScript) {
        this.scriptPool.push(script);
    }

    public net_noticeGuaSha(cfg: number, isLife: boolean) {
        let isHas = this.guaShaArr.includes(cfg);

        if (!isHas && isLife) {
            this.guaShaArr.push(cfg);
            this.getAllClient().net_guaShaNotice(this.currentPlayerId, cfg);
        }
        if (!isLife && isHas) {
            this.guaShaArr.splice(this.guaShaArr.indexOf(cfg), 1);
        }
    }

    /**刮痧广播 */
    public guaShaNotice(playerId: number, sceneId: number) {

    }
	
		@Decorator.noReply()
		public net_onResourceUpdate(dt) {
				ModuleService.getModule(DropManagerS).onResourceUpdate(dt); 
		}

		@Decorator.noReply()
		public net_start() {
				ModuleService.getModule(DropManagerS).start();
		}
}
