import { GameConfig } from "../../config/GameConfig";
import { EModule_Events } from "../../const/Enum";
//import { BagModuleC } from "../../module/BagModule/BagModuleC";
import { EventManager } from "../../tool/EventManager";
import { InteractObject, InteractLogic_C, InteractLogic_S } from "../InteractiveObjs/InteractObject";
import { SoundParam, RP_DestroyManager } from "./RP_DestroyManager";




@Serializable
class goodInfor {
    @mw.Property({ displayName: "奖励物品id" })
    public id: number = 0;
    @mw.Property({ displayName: "奖励物品Count" })
    public count: number = 0;
}

@Component
export default class RP_Destroy_OnlyHide extends InteractObject {

    @mw.Property({ displayName: "隐藏物父物体Guid(锚点)", group: "属性" })
    public rootObjGuid: string = "";
    @mw.Property({ displayName: "顺序隐藏间隔时间", group: "属性" })
    public hideTime: number = 0.5;
    @mw.Property({ displayName: "恢复检测时间", group: "属性" })
    public recoverTime: number = 1;
    @mw.Property({ displayName: "恢复检测间隔时间", group: "属性" })
    public recoverIntervalTime: number = 1;
    @mw.Property({ displayName: "恢复检测距离", group: "属性" })
    public recoverDistance: number = 400;

    @mw.Property({ displayName: "奖励", group: "奖励" })
    public goodInfors: goodInfor[] = [new goodInfor()];
    @mw.Property({ displayName: "奖励金钱", group: "奖励" })
    public money: number = 0;

    @mw.Property({ displayName: "音效Guid", group: "3D音效" })
    public soundGuid: string = "";
    @mw.Property({ displayName: "音效位置偏移", group: "3D音效" })
    public soundOffset: mw.Vector = mw.Vector.zero;
    @mw.Property({ displayName: "音效音量", group: "3D音效" })
    public soundVolume: number = 1;
    @mw.Property({ displayName: "播放次数", group: "3D音效" })
    public soundPlayTimes: number = 1;
    @mw.Property({ displayName: "播放参数", group: "3D音效" })
    public soundParam: SoundParam = new SoundParam();

    protected onStart(): void {
        this.init(RP_Destroy_OnlyHide_S, RP_Destroy_OnlyHide_C);
    }
}

export class RP_Destroy_OnlyHide_C extends InteractLogic_C<RP_Destroy_OnlyHide>{
    /**交互物数组 */
    private objArr: mw.GameObject[] = [];
    /**交互物guid数组（判断用） */
    private curRootGuid: string = null;

    private isHide: boolean = false;

    private canReset: boolean = false;
    private timer: number = 0

    private curAreaID: number = null;

    protected async onStart(): Promise<void> {
        let rootObj = await GameObject.asyncFindGameObjectById(this.info.rootObjGuid);
        if (!rootObj) {
            console.error(" 交互物-- RP_Destroy_OnlyHide -- 根节点物体未找到 挂载物体Guid = " + this.gameObject.gameObjectId);
            return
        }

        rootObj.getChildren().forEach((obj) => {
            this.objArr.push(obj);
        })

        this.sortObjArr();

        this.curRootGuid = this.objArr[0].gameObjectId;

        if (!AssetUtil.assetLoaded(this.info.soundGuid)) await AssetUtil.asyncDownloadAsset(this.info.soundGuid);

        EventManager.instance.add(EModule_Events.hitMeshObj_C, this.onHitMeshObj.bind(this));
        this.checkAreaId();
    }

    private checkAreaId(): void {
        let areaConfig = GameConfig.Area.getAllElement();
        for (let index = 0; index < areaConfig.length; index++) {
            if (this.curAreaID) continue;
            const element = areaConfig[index];
            // if (!element.centerPos || !element.areaRange) continue;
            // let dis = mw.Vector.squaredDistance(this.gameObject.worldTransform.position, element.centerPos);
            // if (dis < Math.pow(element.areaRange, 2)) {
            //     this.curAreaID = element.id;
            // }
        }
        if (this.curAreaID == null) this.curAreaID = -1;//如果没有找到区域id，就默认为虚空
        RP_DestroyManager.instance.save(this.curAreaID, this.objArr[0]);
    }

    private async onHitMeshObj(guid: string, playerID: number, force: mw.Vector) {
        if (this.isHide) return;
        if (this.curRootGuid != guid) return;

        let char = Player.getPlayer(playerID).character;
        SoundService.play3DSound(this.info.soundGuid, char.worldTransform.position.clone().add(this.info.soundOffset), this.info.soundPlayTimes, this.info.soundVolume, this.info.soundParam)

        for (let i = 0; i < this.objArr.length; i++) {
            let obj = this.objArr[i];
            this.changeObjState(obj, false);
            await TimeUtil.delaySecond(this.info.hideTime);
        }
        // for (let index = 0; index < this.info.goodInfors.length; index++) {
        //     const element = this.info.goodInfors[index].id;
        //     const count = this.info.goodInfors[index].count;
        //     if (element == 0 || count == 0) continue;
        //     ModuleService.getModule(BagModuleC).addItem(element, count)
        // }
        if (this.info.money > 0) {
            EventManager.instance.call(EModule_Events.add_money, this.info.money);
        }

        setTimeout(() => {
            this.canReset = true;
            this.useUpdate = true
        }, this.info.recoverTime * 1000);
    }

    public onUpdate(dt: number): void {
        if (!this.canReset) return;
        this.timer += dt;
        if (this.timer < this.info.recoverIntervalTime) return;
        let char = Player.localPlayer.character
        let dis = mw.Vector.squaredDistance(char.worldTransform.position, this.gameObject.worldTransform.position);
        if (dis > Math.pow(this.info.recoverDistance, 2)) {
            this.resetObj();
        }
        this.timer = 0;
    }

    private resetObj() {
        this.canReset = false;
        this.useUpdate = false;
        for (let i = 0; i < this.objArr.length; i++) {
            let obj = this.objArr[i];
            this.changeObjState(obj, true);
        }
        this.isHide = false;
    }

    private sortObjArr() {
        this.objArr.sort((a, b) => {
            let aName = Number(a.name.split("_")[1]);
            let bName = Number(b.name.split("_")[1]);
            return aName > bName ? 1 : -1;
        })
    }

    private changeObjState(obj: mw.GameObject, active: boolean) {
        obj.setVisibility(active ? mw.PropertyStatus.On : mw.PropertyStatus.Off);
        obj.setCollision(active ? mw.CollisionStatus.On : mw.CollisionStatus.Off);
    }
}

export class RP_Destroy_OnlyHide_S extends InteractLogic_S<RP_Destroy_OnlyHide>{
    protected onPlayerAction(playerId: number, active: boolean, param: any): void {
    }
    protected onStart(): void {
    }

}