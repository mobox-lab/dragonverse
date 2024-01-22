import { LogManager } from "odin";
import { PlayerManagerExtesion } from "../../../Modified027Editor/ModifiedPlayer";
import { EventManager } from "../../../tool/EventManager";
import { EModule_Events, EPickUpCreType, EPickUpType } from "../../../const/Enum";
import { util } from "../../../tool/Utils";
import { GameConfig } from "../../../config/GameConfig";

/**
 * 拾取物 预制体基类
 * TODO结构优化
 */
@Component
export default class PickUpBase extends Script {

    @mw.Property({ displayName: "触发器Guid", group: "属性", capture: true })
    public triggerGuid: string = "";
    @mw.Property({ displayName: "坐标偏移", group: "属性" })
    public location: mw.Vector = new mw.Vector(0, 0, 105);
    @mw.Property({ displayName: "旋转", group: "属性" })
    public rotation: mw.Rotation = mw.Rotation.zero;
    @mw.Property({ displayName: "世界UIGuid", group: "属性", capture: true })
    public worldUIGuid: string = "";
    @mw.Property({ displayName: "世界UI路径", group: "属性" })
    public worldPath: string = "RootCanvas/TextBlock";
    @mw.Property({ displayName: "拾取特效ID关联特效表", group: "属性" })
    public effectCfgId: number = -1;
    @mw.Property({ displayName: "拾取音效ID关联音效表", group: "属性" })
    public suoundCfgId: number = -1;


    /**触发器*/
    protected trigger: mw.Trigger = null;

    /**地形唯一id*/
    public landParcesid: number = -1;

    /**拾取类型*/
    public pickUpType: EPickUpType = null;

    /**生成类型 */
    public createType: EPickUpCreType = null;

    // 世界UI 
    protected worldUI: mw.UIWidget = null;

    // 世界UI提示文本
    protected worldText: mw.TextBlock;

    /**触发器进入action */
    public onEnterAction: Action = new Action();

    private isEnter: boolean = false;

    /** 掉落表现配置id */
    public dropId: number = 0;

    /**动画缓存 */
    private mTweens: Set<mw.Tween<any>> = new Set();


    public async init_start(): Promise<void> {
        this.onEnterAction.clear();
        if (this.trigger == null) {
            this.trigger = await GameObject.asyncFindGameObjectById(this.triggerGuid) as mw.Trigger;

            if (this.trigger) {
                this.trigger.onEnter.clear();
                this.trigger.onEnter.add(this.onTriggerEnter.bind(this));
                this.trigger.onLeave.clear();
                this.trigger.onLeave.add(this.onTriggerExit.bind(this));
            }
        }

        if (this.worldUI == null) {
            this.worldUI = await GameObject.asyncFindGameObjectById(this.worldUIGuid) as mw.UIWidget;
        }

        if (this.worldText == null) {
            this.worldText = this.worldUI.getTargetUIWidget().findChildByPath(this.worldPath) as mw.TextBlock;
            this.worldText.text = util.getLanguageByKey(this.worldText.text);
            this.worldUI.refresh();
        }
        //多语言初始化的容错
        setTimeout(() => {
            this.worldText.text = util.getLanguageByKey(this.worldText.text);
        }, 1000);

        this.isEnter = false;
        this.trigger.enabled = true;

    }

    private onTriggerEnter(obj: mw.GameObject): void {
        if (!(PlayerManagerExtesion.isCharacter(obj))) return
        if (obj != Player.localPlayer.character) return
        this.onEnter();
    }

    private onTriggerExit(obj: mw.GameObject): void {
        if (!(PlayerManagerExtesion.isCharacter(obj))) return
        if (obj != Player.localPlayer.character) return
        this.onExit();
    }

    public async creat(parent: GameObject, pickUpType: EPickUpType, landParcesid: number) {
        await this.init_start();
        this.gameObject.parent = parent;
        this.gameObject.localTransform.position = this.location;
        this.gameObject.localTransform.rotation = this.rotation;
        this.pickUpType = pickUpType;
        this.landParcesid = landParcesid;
        this.createType = EPickUpCreType.land;
        this.gameObject.setVisibility(PropertyStatus.On, true);

    }

    /** npc掉落创建 */
    public async dropCreate(pickUpType: EPickUpType, startPos: Vector, endpos: Vector, id: number) {
        await this.init_start();
        let cfg = GameConfig.PropDrop.getElement(this.dropId);
        if (!cfg) return;
        this.pickUpType = pickUpType;
        this.landParcesid = id;
        this.createType = EPickUpCreType.npc;
        this.gameObject.setVisibility(PropertyStatus.On, true);
        let midPos = startPos.clone().add(endpos).divide(2).add(new Vector(0, 0, cfg.rewardFly));
        let tween1 = new mw.Tween({ x: startPos }).
            to({ x: midPos }, cfg.upTime * 1000)
            .onUpdate((data) => {
                this.gameObject.worldTransform.position = data.x;

                this.mTweens.delete(tween1);
            })
        let tween2 = new mw.Tween({ x: midPos })
            .to({ x: endpos }, cfg.fallTime * 1000).onUpdate((data) => {
                this.gameObject.worldTransform.position = data.x;
            })
            .onComplete(() => {
                this.mTweens.delete(tween2);
            })
        this.mTweens.add(tween1);
        this.mTweens.add(tween2);

        tween1.chain(tween2);
        tween1.start();
    }

    public recycle(): void {


        // 清理动画
        for (const [value, value1] of this.mTweens.entries()) {
            value.stop();
        }
        this.mTweens.clear();


        this.gameObject.parent = null;
        this.pickUpType = null;

        this.isEnter = false;
        if (this.trigger) {
            this.trigger.enabled = false;
        }
        if (this.gameObject) {
            this.gameObject.parent = null;
            this.gameObject.setVisibility(PropertyStatus.Off, true);
            this.gameObject.worldTransform.position = mw.Vector.zero;
            GameObjPool.despawn(this.gameObject);
        }

    }



    protected onEnter() {
        if (this.isEnter) {
            return;
        }
        let pickUp = this.pickUpType;
        let pickPos = this.gameObject.worldTransform.position;
        this.isEnter = true;
        this.recycle();

        this.onEnterAction.call(pickUp, pickPos);
    }

    protected onExit() {

    }


}



