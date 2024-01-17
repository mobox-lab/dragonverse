import { PlayerManagerExtesion, } from '../../Modified027Editor/ModifiedPlayer';
import { EModule_Events } from "../../const/Enum";
// import { BagModuleC } from "../../module/BagModule/BagModuleC";
import { EventManager } from "../../tool/EventManager";
import { util } from "../../tool/Utils";
import { ClickUIPools } from "../InteractiveObjs/ClickUIs";
import { InteractLogic_C, InteractLogic_S, InteractObject } from "../InteractiveObjs/InteractObject";
import { SoundParam } from "./RP_DestroyManager";




import { EPlayerState } from "../../module/PlayerModule/FSM/PlyerState";

enum actionPlayMode {
    Count = "Count",
    Time = "Time",
}

@Serializable
class goodInfor {
    @mw.Property({ displayName: "奖励物品id" })
    public id: number = 0;
    @mw.Property({ displayName: "奖励物品Count" })
    public count: number = 0;
}

@Component
export default class RP_Collect extends InteractObject {

    @mw.Property({ displayName: "动作Guid", group: "动作" })
    public actionGuid: string = "";
    @mw.Property({ displayName: "动作播放模式", selectOptions: { "时间": actionPlayMode.Time, "次数": actionPlayMode.Count }, group: "动作" })
    public actionCount: actionPlayMode = actionPlayMode.Count;
    @mw.Property({ displayName: "动作播放次数/时间", group: "动作" })
    public actionTime: number = 1;
    @mw.Property({ displayName: "动作播放速率", group: "动作" })
    public actionRate: number = 1;

    // @mw.Property({ displayName: "可采集次数", group: "采集" })
    // public collectCount: number = 1;
    @mw.Property({ displayName: "采集物冷却CD(s)", group: "采集" })
    public collectCD: number = 1;
    @mw.Property({ displayName: "采集物父物体Guid(子物体的名字要用“_序号”结尾)", group: "采集" })
    public collectRootGuid: string = "";

    @mw.Property({ displayName: "采集特效Guid", group: "采集特效" })
    public collectEffectGuid: string = "";

    @mw.Property({ displayName: "玩家位置偏移", group: "玩家" })
    public playerOffset: mw.Vector = mw.Vector.zero;

    @mw.Property({ displayName: "交互触发器Guid", group: "触发器" })
    public triggerGuid: string = "";

    @mw.Property({ displayName: "交互UI的Icon的Guid", group: "交互UI" })
    public iconGuid: string = "";
    @mw.Property({ displayName: "交互UI偏移", group: "交互UI" })
    public iconOffset: mw.Vector = mw.Vector.zero;
    @mw.Property({ displayName: "交互UI文本多语言ID", group: "交互UI" })
    public iconTextID: number = 0;

    @mw.Property({ displayName: "奖励物品", group: "奖励" })
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
        this.init(RP_Collect_S, RP_Collect_C);
    }
}

export class RP_Collect_C extends InteractLogic_C<RP_Collect>{

    private saveAllObj: Map<number, Fruit> = new Map();
    private curTrigger: mw.Trigger = null;
    private playerAnim: mw.Animation = null;
    private curPlayer: mw.Player = null;
    private maxCount: number = null;
    private curObjNum: number = null;
    private collectEffect: mw.Effect = null;
    private inTrigger: boolean = false;
    private onClick: () => void = null;

    protected async onStart(): Promise<void> {
        if (this.info.collectRootGuid == "") {
            console.error(" 采集物父物体Guid 不能为空 !!!!");
            return
        }
        let rootObj = await GameObject.asyncFindGameObjectById(this.info.collectRootGuid);
        if (rootObj == null) {
            console.error(" 采集物父物体Guid 不存在 !!!!");
            return;
        }

        Player.asyncGetLocalPlayer().then((player) => {
            this.curPlayer = player;
        });

        rootObj.getChildren().forEach(async (obj) => {
            let fruit = new Fruit(obj.gameObjectId, this.info.collectCD);
            await fruit.init();
            fruit.onReadyAC.add(this.fruitReset.bind(this))
            let num = Number(obj.name.split("_")[1]);
            if (!this.curObjNum || this.curObjNum < num) this.curObjNum = num;
            this.saveAllObj.set(num, fruit);
        });
        this.maxCount = this.curObjNum;

        if (this.info.collectEffectGuid != "") {
            this.collectEffect = await GameObject.asyncFindGameObjectById(this.info.collectEffectGuid) as mw.Effect;
            this.collectEffect.setVisibility(mw.PropertyStatus.Off);
        }

        this.curTrigger = await GameObject.asyncFindGameObjectById(this.info.triggerGuid) as mw.Trigger;
        this.curTrigger.onEnter.add(this.enterTrigger.bind(this));
        this.curTrigger.onLeave.add(this.leaveTrigger.bind(this));

        if (!AssetUtil.assetLoaded(this.info.soundGuid)) await AssetUtil.asyncDownloadAsset(this.info.soundGuid);

        this.useUpdate = true;
    }

    private fruitReset() {
        this.curObjNum++;
        if (this.maxCount && this.curObjNum > this.maxCount) this.curObjNum = this.maxCount;
        let res = ClickUIPools.instance.getState(this.gameObject)
        if (res == null) return
        if (this.inTrigger && res == false) {
            if (this.playerAnim && this.playerAnim.isPlaying) return;
            ClickUIPools.instance.show(this.info.iconGuid, (this.info.iconTextID == 0 || this.info.iconTextID == null) ? "" : util.getLanguageById(this.info.iconTextID, null), this.gameObject, this.info.iconOffset, this.onClick)
        }
    }

    private enterTrigger(obj: mw.GameObject) {
        if (!(PlayerManagerExtesion.isCharacter(obj))) return;
        let char = obj as mw.Character;
        if (char.player != this.curPlayer) return;
        let hasCanUse: boolean = false;
        this.saveAllObj.forEach((value, key) => {
            if (value.canUse) hasCanUse = true;
        })
        if (!hasCanUse) return;
        this.interact(this.curPlayer.playerId, true, null);
    }

    private leaveTrigger(obj: mw.GameObject) {
        if (!(PlayerManagerExtesion.isCharacter(obj))) return;
        let char = obj as mw.Character;
        if (char.player != this.curPlayer) return;
        this.interact(this.curPlayer.playerId, false, null);
    }

    protected onPlayerAction(playerId: number, active: boolean, param: any): void {
        let player = Player.getPlayer(playerId);
        if (player != this.curPlayer) return;
        if (this.onClick == null) this.onClick = this.playAnim.bind(this);
        if (active) {
            // this.playAnim();
            this.inTrigger = true;
            let res = ClickUIPools.instance.getState(this.gameObject)
            if (res == false) ClickUIPools.instance.show(this.info.iconGuid, (this.info.iconTextID == 0 || this.info.iconTextID == null) ? "" : util.getLanguageById(this.info.iconTextID, null), this.gameObject, this.info.iconOffset, this.onClick)
        } else {
            ClickUIPools.instance.hide(this.gameObject);
            if (this.playerAnim && this.playerAnim.isPlaying) this.playerAnim.stop();
            if (this.collectEffect) this.collectEffect.forceStop();
            this.inTrigger = false;
            EventManager.instance.call(EModule_Events.changetoBaseState, -1);
        }
    }

    private playAnim() {
        let hasCanUse: boolean = false;
        this.saveAllObj.forEach((value, key) => {
            if (value.canUse) hasCanUse = true;
        })
        if (!hasCanUse) {
            // Notice.showTopNotice("采集物已经被采集完了");
            return;
        }
        this.curPlayer.character.worldTransform.position = this.gameObject.worldTransform.position.clone().add(this.info.playerOffset);
        this.curPlayer.character.lookAt(this.gameObject.worldTransform.position);
        if (!this.playerAnim) {
            this.playerAnim = PlayerManagerExtesion.loadAnimationExtesion(this.curPlayer.character, this.info.actionGuid, true)
            this.playerAnim.speed = this.info.actionRate;
            if (this.info.actionCount == actionPlayMode.Count) this.playerAnim.onFinish.add(this.animDone.bind(this));
        }
        if (this.info.actionCount == actionPlayMode.Count) {
            this.playerAnim.loop = this.info.actionTime;
        } else {
            this.playerAnim.loop = 0;
            setTimeout(() => {
                this.playerAnim.stop();
                this.animDone();
            }, this.info.actionTime * 1000);
        }
        this.playerAnim.play();
        EventManager.instance.call(EModule_Events.changeState, EPlayerState.Action);

        if (this.collectEffect && this.collectEffect instanceof mw.Effect) {
            this.collectEffect.setVisibility(mw.PropertyStatus.On);
            this.collectEffect.play();
        }
        ClickUIPools.instance.hide(this.gameObject);
    }

    private animDone() {
        //console.error("animDone----------------------")
        EventManager.instance.call(EModule_Events.changetoBaseState, -1);
        if (this.collectEffect) {
            this.collectEffect.forceStop();
            this.collectEffect.setVisibility(mw.PropertyStatus.Off);
        }
        let hasReward: boolean = false;
        // for (let index = 0; index < this.info.goodInfors.length; index++) {
        //     const element = this.info.goodInfors[index].id;
        //     const count = this.info.goodInfors[index].count;
        //     ModuleService.getModule(BagModuleC).addItem(element, count)
        //     hasReward = true;
        // }
        if (this.info.money > 0) {
            EventManager.instance.call(EModule_Events.add_money, this.info.money);
            hasReward = true;
        }
        if (hasReward) {
            SoundService.play3DSound(this.info.soundGuid, Player.localPlayer.character.worldTransform.position.clone().add(this.info.soundOffset), this.info.soundPlayTimes, this.info.soundVolume, this.info.soundParam)
        }
        let isCollect: boolean = false;
        this.saveAllObj.forEach((value, key) => {
            if (isCollect) return;
            if (value.canUse) {
                value.use();
                isCollect = true;
            }
        })
        this.curObjNum--;
        let res = ClickUIPools.instance.getState(this.gameObject)
        if (this.inTrigger && this.curObjNum > 0 && res == false) ClickUIPools.instance.show(this.info.iconGuid, (this.info.iconTextID == 0 || this.info.iconTextID == null) ? "" : util.getLanguageById(this.info.iconTextID, null), this.gameObject, this.info.iconOffset, this.onClick)
    }

    public onUpdate(dt: number): void {
        this.saveAllObj.forEach((fruit, key) => {
            fruit.update(dt);
        })
    }
}

export class RP_Collect_S extends InteractLogic_S<RP_Collect>{
    protected onPlayerAction(playerId: number, active: boolean, param: any): void {
        throw new Error("Method not implemented.");
    }
    protected onStart(): void {
        throw new Error("Method not implemented.");
    }

}

export class Fruit {

    private fruitObj: mw.GameObject = null;
    private timer: number = 0;
    public canUse: boolean = true;
    onReadyAC: Action = new Action();

    constructor(
        private objGuid: string,
        private cdTime: number,
    ) { }

    async init() {
        this.fruitObj = await GameObject.asyncFindGameObjectById(this.objGuid);
        this.fruitObj.setVisibility(mw.PropertyStatus.On);
        this.canUse = true;
    }

    update(dt: number) {
        if (this.fruitObj == null || this.canUse) return;
        this.timer += dt;
        if (this.timer < this.cdTime) return;
        this.fruitObj.setVisibility(mw.PropertyStatus.On);
        this.timer = 0;
        this.canUse = true;
        this.onReadyAC.call();
    }

    use() {
        this.fruitObj.setVisibility(mw.PropertyStatus.Off);
        this.canUse = false;
    }

    destroy() {
        this.fruitObj.destroy();
    }
}