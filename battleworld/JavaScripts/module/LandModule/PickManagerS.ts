import { IPropDropElement } from "../../config/PropDrop";
import { EPickUpType } from "../../const/Enum";
import { Singleton } from "../../tool/FunctionUtil";
import { util } from "../../tool/Utils";
import PickUp from "./PickUp/PickUp";

/**
 * 拾取物管理类
 */
@Singleton()
export class PickManagerS {

    public static instance: PickManagerS = null;

    private onlyGuid: number = 1000;

    /**拾取物池*/
    private pickUps: PickUp[] = [];


    /**地形拾取物 */
    public pickUpMap: Map<string, PickUp> = new Map<string, PickUp>();

    /**npc受伤掉落物 */
    public dropMap: Map<string, PickUp> = new Map();

    /**存在地形拾取物的地块数组 */
    public hasPickLands: number[] = [];

    /**当前存在的技能球数量 */
    public skillNum: number = 0;

    /**
     * 获取拾取物脚本
     * @returns 
     */
    public async getPickUpScript() {
        let script: PickUp = null;
        if (this.pickUps.length > 0) {
            script = this.pickUps.pop();
        } else {
            script = await mw.Script.spawnScript(PickUp, true) as PickUp;

        }

        return script;
    }

    /**
     * 随机拾取物一个
     */
    public async creatPickUp(landId: number, pickUpType: EPickUpType) {
        let pickUp = await this.getPickUpScript();
        if (pickUp == null) {
            return;
        }
        pickUp.creat(landId, pickUpType);
        if (pickUpType == EPickUpType.skill) this.skillNum++; 
        this.pickUpMap.set(pickUp.guid, pickUp);
        if (!this.hasPickLands.includes(landId)) {
            this.hasPickLands.push(landId);
        }
    }

    /**
     * 根据guid创建掉落物
     * 注意：这里有异步的行为，此时npc可能被回收了 所以要传坐标过来
     */
    public async creatDrop(guid: string, dropType: EPickUpType, cfg: IPropDropElement, dropPos: mw.Vector) {

        let pickUp = await PickManagerS.instance.getPickUpScript();
        if (pickUp == null) {
            return;
        }

        let loc = util.getCircleBorderPoint(dropPos, cfg.rewardMove);
        pickUp.dropCreate(guid, dropPos, loc.add(new Vector(0, 0, cfg.rewardOffsetZ)), 1, dropType, cfg.id);

        this.dropMap.set(pickUp.guid, pickUp);
    }



    /**场景是否有该拾取物 */
    public isHasPickUp(pickScriptGuid: string) {
        if (this.pickUpMap.has(pickScriptGuid)) return true;

        return this.dropMap.has(pickScriptGuid);
    }

    /**拾取物的预制体信息*/
    public getPickupPrefab(pickScriptGuid: string) {
        let pickUpScript = this.getPickUp(pickScriptGuid);
        if (pickUpScript == null) return;
        return pickUpScript.pickUpPrefabInfo;
    }


    /**获取当前在场景中的 pickup */
    private getPickUp(pickScriptGuid: string) {
        if (this.pickUpMap.has(pickScriptGuid)) {
            return this.pickUpMap.get(pickScriptGuid);
        }

        if (this.dropMap.has(pickScriptGuid)) {
            return this.dropMap.get(pickScriptGuid);
        }
        return null;
    }

    /**
     * 清理拆关键的缓存
     * @param pickScriptGuid 
     */
    private deleMap(pickScriptGuid: string) {
        if (this.pickUpMap.has(pickScriptGuid)) {
            this.pickUpMap.delete(pickScriptGuid);
        }

        if (this.dropMap.has(pickScriptGuid)) {
            this.dropMap.delete(pickScriptGuid);
        }
    }

    /**回收拾取物脚本 */
    public recyclePickUp(pickScriptGuid: string) {
        let pickUpScript = this.getPickUp(pickScriptGuid);
        if (pickUpScript == null) {
            return;
        }
        this.dealLandSkillPick(pickUpScript);
        pickUpScript.recycle();

        this.deleMap(pickScriptGuid);
        this.recycleToPool(pickUpScript);
    }

    /**地块拾取物与技能球数量减少 */
    private dealLandSkillPick(pickUpScript: PickUp) {
        //地块存在拾取物处理
        let index = this.hasPickLands.indexOf(pickUpScript.landParcesid);
        if (index != -1) {
            this.hasPickLands.splice(index, 1);
        }
        //技能球数量减少
        if (pickUpScript.pickUpType == EPickUpType.skill) {
            this.skillNum--;
        }
    }


    /**回收脚本到对象池 */
    private recycleToPool(pickUp: PickUp) {
        if (pickUp == null) {
            return;
        }
        if (this.pickUps.includes(pickUp)) {
            return;
        }

        this.pickUps.push(pickUp);
    }


    /**回收所有地形拾取物 */
    public recycleAllLandPick() {
        for (const [key, pickUpScript] of this.pickUpMap) {
            this.dealLandSkillPick(pickUpScript);
            pickUpScript.recycle();
            this.recycleToPool(pickUpScript);
        }
        this.pickUpMap.clear();
    }

    /**
     * 地形是否存在地形掉落物
     */
    public hasLandPick(landId: number) {
        return this.hasPickLands.includes(landId);
    }    

}