import { PlayerManagerExtesion, } from '../../Modified027Editor/ModifiedPlayer';
import { GameConfig } from "../../config/GameConfig";
import { EModule_Events } from "../../const/Enum";
//import { BagModuleC } from "../../module/BagModule/BagModuleC";
import { EventManager } from "../../tool/EventManager";
import { util } from "../../tool/Utils";
import { ClickUIPools } from '../InteractiveObjs/ClickUIs';
import { InteractObject, InteractLogic_C, InteractLogic_S } from '../InteractiveObjs/InteractObject';
import { SoundParam, RP_DestroyManager } from './RP_DestroyManager';

@Serializable
class goodInfor {
    @mw.Property({ displayName: "奖励物品id" })
    public id: number = 0;
    @mw.Property({ displayName: "奖励物品Count" })
    public count: number = 0;
}

@Component
export default class RP_Destroy_ChangeState extends InteractObject {

    @mw.Property({ displayName: "物体A根节点Guid", group: "属性" })
    public rootObjGuid_A: string = "";
    @mw.Property({ displayName: "物体B根节点Guid", group: "属性" })
    public rootObjGuid_B: string = "";
    @mw.Property({ displayName: "首先显示的物体根节点", selectOptions: { "A": "1", "B": "2" }, group: "属性" })
    public firstShow: string = "1";
    @mw.Property({ displayName: "触发器Guid", group: "属性" })
    public triggerGuid: string = "";
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

    @mw.Property({ displayName: "交互UI的Icon的Guid", group: "交互UI" })
    public iconGuid: string = "";
    @mw.Property({ displayName: "UI文本多语言ID", group: "交互UI" })
    public iconTextID: number = 0;
    @mw.Property({ displayName: "UI位置偏移", group: "交互UI" })
    public iconOffset: mw.Vector = mw.Vector.zero;

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
        this.init(RP_Destroy_ChangeState_S, RP_Destroy_ChangeState_C);
    }
}

export class RP_Destroy_ChangeState_C extends InteractLogic_C<RP_Destroy_ChangeState>{

    private rootA: mw.GameObject = null;
    private rootB: mw.GameObject = null;
    private trigger: mw.Trigger = null;
    /**存储所有对象的Guid，判断用 */
    private curRootGuid: string = null;
    private isBroken: boolean = false;
    private curChar: mw.Character = null;
    private isAShow: boolean = false;
    private canReset: boolean = false;
    private timer: number = 0;
    private curAreaID: number = null;
    private onClick: () => void = null;

    protected async onStart(): Promise<void> {
        if (this.info.rootObjGuid_A == null
            || this.info.rootObjGuid_A == ""
            || this.info.rootObjGuid_B == null
            || this.info.rootObjGuid_B == ""
            || this.info.triggerGuid == null
            || this.info.triggerGuid == "") {
            console.error(" 交互物-- RP_Destroy_ChangeState -- 属性参数有问题 挂载物体Guid = " + this.gameObject.gameObjectId
                + "\n rootA Guid = " + this.info.rootObjGuid_A
                + "\n rootB Guid = " + this.info.rootObjGuid_B
                + "\n trigger Guid = " + this.info.triggerGuid);
            return;
        }

        this.rootA = await GameObject.asyncFindGameObjectById(this.info.rootObjGuid_A);
        this.rootB = await GameObject.asyncFindGameObjectById(this.info.rootObjGuid_B);

        if (this.info.firstShow == "1") {
            this.isAShow = true;
        } else if (this.info.firstShow == "2") {
            this.isAShow = false;
        }
        this.changeObjState(this.isAShow);

        this.trigger = await GameObject.asyncFindGameObjectById(this.info.triggerGuid) as mw.Trigger;
        this.trigger.onEnter.add(this.onTriggerEnter.bind(this));
        this.trigger.onLeave.add(this.onTriggerExit.bind(this));

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
        let curRoot: mw.GameObject = null;
        if (this.info.firstShow == "1") {
            this.curRootGuid = this.info.rootObjGuid_A;
            curRoot = this.rootA;
        } else if (this.info.firstShow == "2") {
            this.curRootGuid = this.info.rootObjGuid_B;
            curRoot = this.rootB;
        }
        RP_DestroyManager.instance.save(this.curAreaID, curRoot);
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

    private async onHitMeshObj(guid: string, playerID: number, force: mw.Vector) {
        if (this.isBroken) return;
        if (this.curRootGuid != guid) return;
        this.canReset = false;
        this.isAShow = !this.isAShow;
        this.changeObjState(this.isAShow);
        this.isBroken = true;
        let char = Player.getPlayer(playerID).character;
        SoundService.play3DSound(this.info.soundGuid, char.worldTransform.position.clone().add(this.info.soundOffset), this.info.soundPlayTimes, this.info.soundVolume, this.info.soundParam)
        setTimeout(() => {
            this.useUpdate = true
            this.canReset = true;
        }, this.info.recoverTime * 1000);
    }

    private onTriggerEnter(other: mw.GameObject) {
        if (!this.isBroken) return
        if (!(PlayerManagerExtesion.isCharacter(other))) return;
        if (other != Player.localPlayer.character) return
        this.curChar = other as mw.Character;
        if (!this.onClick) this.onClick = this.getReward.bind(this)
        ClickUIPools.instance.show(this.info.iconGuid, (this.info.iconTextID == 0 || this.info.iconTextID == null) ? "" : util.getLanguageById(this.info.iconTextID, null), this.curChar, this.info.iconOffset, this.onClick)
    }

    private getReward() {

        // for (let index = 0; index < this.info.goodInfors.length; index++) {
        //     const element = this.info.goodInfors[index].id;
        //     const count = this.info.goodInfors[index].count;
        //     if (element == 0 || count == 0) continue;
        //     ModuleService.getModule(BagModuleC).addItem(element, count)
        // }
        if (this.info.money > 0) {
            EventManager.instance.call(EModule_Events.add_money, this.info.money);
        }
        ClickUIPools.instance.hide(this.curChar)
    }

    private onTriggerExit(other: mw.GameObject) {
        if (this.curChar == null) return
        if (!this.isBroken) return
        if (!(PlayerManagerExtesion.isCharacter(other))) return;
        if (other != Player.localPlayer.character) return
        let char = other as mw.Character;
        if (char != this.curChar) return
        ClickUIPools.instance.hide(this.curChar)
        this.curChar = null;
    }

    private changeObjState(active: boolean) {
        this.rootA.setCollision(active ? mw.CollisionStatus.On : mw.CollisionStatus.Off);
        this.rootA.setVisibility(active ? mw.PropertyStatus.On : mw.PropertyStatus.Off);
        this.rootB.setCollision(!active ? mw.CollisionStatus.On : mw.CollisionStatus.Off);
        this.rootB.setVisibility(!active ? mw.PropertyStatus.On : mw.PropertyStatus.Off);
    }

    private resetObj() {
        this.isBroken = false;
        this.canReset = false;
        this.useUpdate = false;
        this.isAShow = !this.isAShow;
        this.changeObjState(this.isAShow);
    }
}

export class RP_Destroy_ChangeState_S extends InteractLogic_S<RP_Destroy_ChangeState>{

    protected onPlayerAction(playerId: number, active: boolean, param: any): void {

    }
    protected onStart(): void {

    }
}