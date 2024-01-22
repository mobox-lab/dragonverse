import { PlayerManagerExtesion } from "../../../Modified027Editor/ModifiedPlayer";
import { GameConfig } from "../../../config/GameConfig";
import { ILandBuffElement } from "../../../config/LandBuff";
import { ELandBuffType, EModule_Events_S, EPlayerEvents_C } from "../../../const/Enum";
import { Globaldata } from "../../../const/Globaldata";
import { EventManager } from "../../../tool/EventManager";
import { util } from "../../../tool/Utils";
import { EHurtSource, THurtSourceData } from "../../AnalyticsModule/AnalyticsTool";
import { PlayerModuleC } from "../../PlayerModule/PlayerModuleC";
import { Attribute } from "../../PlayerModule/sub_attribute/AttributeValueObject";


/**
 * 地形Buff
 */
@Component
export default class TriggerLand extends Script {

    public static landIds: number[] = [];

    /**玩家是否减速*/
    public static isPlayerInSpeedTriggerLand = false;

    /**绑定物体id*/
    @mw.Property({ replicated: true, onChanged: "onChange_landId" })
    public landId: number = -1; //设置为null 不会继续同步了？

    /**配置id*/
    @mw.Property({ replicated: true })
    public cfgId: number = -1; //设置为null 不会继续同步了？


    /**触发器*/
    private triggerObj: mw.Trigger = null;

    /**绑定物体*/
    private landParcel: GameObject = null;

    /**配置 */
    private cfg: ILandBuffElement = null;

    /**计时器 */
    private timer: number = 0;

    /**是否可以触发 */
    private canHurt: boolean = false;

    /**特效key */
    private effectkey: any = null;

    /**是否减血 只触发一次 */
    private isHpHurt: boolean = false;

    /**绑定物体id缓存*/
    private landidCatch: number = -1;

    /**施加冲量的方向 */
    private impulseVector: Vector = Vector.zero;


    private preLandId: number = -1;


    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        if (SystemUtil.isClient()) {
            this.useUpdate = true;
        }
    }


    /**
     * 触发器landId改变
     * @returns 
     */
    private async onChange_landId(): Promise<void> {

        if (this.preLandId == this.landId) {
            return;
        }
        this.preLandId = this.landId;

        if (this.landId == -1) {
            if (this.triggerObj) {
                GameObjPool.despawn(this.triggerObj);
                this.triggerObj.onEnter.clear();
                this.triggerObj.onLeave.clear();
            }
            let model = this.landParcel as Model;
            model.setMaterial(Globaldata.land_material);
            this.landParcel = null;
            this.cfg = null;
            this.timer = 0;
            this.canHurt = false;
            if (this.effectkey) {
                EffectService.stop(this.effectkey);
            }
            this.isHpHurt = false;
            if (this.landidCatch != -1) {
                const index = TriggerLand.landIds.findIndex((value) => { return value == this.landidCatch });
                if (index != -1) {
                    TriggerLand.landIds.splice(index, 1);
                }
            }
            this.landidCatch = -1;
            return;
        }

        this.cfg = GameConfig.LandBuff.getElement(this.cfgId);
        if (!this.cfg) {
            console.error("TriggerLand onChange_landId", this.cfgId, this.cfg);
            return;
        }

        let landguid = GameConfig.LandParcel.getElement(this.landId).Guid;
        this.landParcel = await mw.GameObject.asyncFindGameObjectById(landguid);
        TriggerLand.landIds.push(this.landId);
        this.landidCatch = this.landId;

        this.triggerObj = await GameObjPool.asyncSpawn("Trigger") as mw.Trigger;
        this.triggerObj.parent = this.landParcel;
        this.triggerObj.shape = TriggerShapeType.Box;
        // fix:bug 和编辑器显示不一致 this.triggerObj.localTransform.position = new Vector(0, 0, 200.00);
        this.triggerObj.worldTransform.position = this.landParcel.worldTransform.position.clone().add(new Vector(0, 0, this.landParcel.getBoundingBoxExtent().z));
        this.triggerObj.localTransform.rotation = mw.Rotation.zero
        this.triggerObj.worldTransform.scale = this.cfg.TriggerScale;

        this.triggerObj.onEnter.clear();
        this.triggerObj.onLeave.clear();
        this.triggerObj.onEnter.add(this.onTriggerEnter.bind(this));
        this.triggerObj.onLeave.add(this.onTriggerExit.bind(this));

        //特效
        if (this.cfg.Effectguid) {
            let effectcfg = GameConfig.Effect.getElement(this.cfg.Effectguid);
            let position = this.landParcel.worldTransform.position.clone()
                .add(effectcfg.EffectLocation)
                .add(new Vector(0, 0, this.landParcel.getBoundingBoxExtent().z));
            this.effectkey = util.playEffectAtLocation(this.cfg.Effectguid, position);
        }
        if (this.cfg.MaterialId) {
            let model = this.landParcel as Model;
            model.setMaterial(this.cfg.MaterialId);
        }

        //创建时是否在触发器内 不会调用onTriggerEnter?
        let isInTrigger: boolean = this.triggerObj.checkInArea(Player.localPlayer.character);
        if (isInTrigger) {
            this.triggerPlayer();
            this.canHurt = true;
            this.timer = 0;
        }
        //hpOnce 只生效一次
        this.isHpHurt = true;
    }

    public onUpdate(dt: number): void {
        if (!this.canHurt) return
        if (!this.cfg) return;
        if (!this.cfg.Frequency) return;
        this.timer += dt;
        if (this.timer < this.cfg.Frequency) return
        this.triggerPlayer();
        this.timer = 0;
    }

    /**
     *  进入触发器
     * @param other 
     * @returns 
     */
    private onTriggerEnter(other: mw.GameObject) {
        if (!(PlayerManagerExtesion.isCharacter(other))) return
        if (other != Player.localPlayer.character) return

        this.triggerPlayer();
        this.canHurt = true;
        this.timer = 0;
    }

    /**
     *  离开触发器
     * @param other 
     * @returns 
     */
    private onTriggerExit(other: mw.GameObject) {
        if (!(PlayerManagerExtesion.isCharacter(other))) return
        if (other != Player.localPlayer.character) return

        this.backPlayer();
        this.canHurt = false;
        this.timer = 0;
    }

    /**
     *  回收玩家
     * @returns 
     */
    private backPlayer() {
        if (!this.cfg) return;

        let playerModule = ModuleService.getModule(PlayerModuleC);

        switch (this.cfg.BuffType) {
            case ELandBuffType.hpRepeat:
            case ELandBuffType.hpOnce:
                {

                }
                break;
            case ELandBuffType.speed:
                {
                    TriggerLand.isPlayerInSpeedTriggerLand = false;
                    playerModule.addAttr(this.cfg.ValueType, -this.cfg.Value)

                }
                break;
            default:
                break;
        }

    }

    /**
     * 触发玩家
     * @returns 
     */
    private triggerPlayer() {

        if (!this.cfg.ValueType || !this.cfg.Value) {
            return;
        }

        let playerModule = ModuleService.getModule(PlayerModuleC);

        switch (this.cfg.BuffType) {
            case ELandBuffType.hpRepeat:
            case ELandBuffType.hpOnce:
                {
                    if (this.isHpHurt && this.cfg.BuffType == ELandBuffType.hpOnce) {
                        return;
                    }

                    if (playerModule.isDead()) {
                        return;
                    }
                    if (this.cfg.Value > 0) {
                        playerModule.addAttr(this.cfg.ValueType, this.cfg.Value);
                    } else {

                        // 埋点信息

                        let hurtSourceData: THurtSourceData = {
                            source: EHurtSource[this.cfg.msgKey],
                            skillId: 0,
                            skillEffectId: 0,
                        };

                        playerModule.reduceAttr(this.cfg.ValueType, -this.cfg.Value, true, 0, hurtSourceData);
                    }
                }
                break;
            case ELandBuffType.speed:
                {
                    EventManager.instance.call(EPlayerEvents_C.player_stop_sprintEffect);
                    TriggerLand.isPlayerInSpeedTriggerLand = true;  //玩家在此方块时，无法冲刺，可跳跃 
                    playerModule.addAttr(this.cfg.ValueType, this.cfg.Value);
                }
                break;
            case ELandBuffType.impulseJump:
                {
                    if (Player.localPlayer && Player.localPlayer.character) {
                        this.impulseVector.z = this.cfg.Value;
                        Player.localPlayer.character.addImpulse(this.impulseVector, true);
                    }
                }
                break;
            default:
                break;
        }

    }





    /************************************************************S端************************************************************************** */

    /**
     * S创建
     */
    public async creat(landId: number, cfgId: number) {
        this.landId = landId;
        this.cfgId = cfgId;
    }

    /**
     * S回收
     */
    public recycle() {
        this.landId = -1;
        this.cfgId = -1;
    }



    /** 脚本被销毁时最后一帧执行完调用此函数 */
    protected onDestroy(): void {

    }

}