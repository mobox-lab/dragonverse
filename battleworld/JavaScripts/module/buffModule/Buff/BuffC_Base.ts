import { BuffC, BuffData, EBuffLifecycleType, buffArgs } from "module_buff";
import { oTraceError } from "odin";
import { PlayerModuleC } from "../../PlayerModule/PlayerModuleC";
// import { SceneUnitModuleC } from "../../SceneUnitModule/SceneUnitModuleC";
import { GameConfig } from "../../../config/GameConfig";
import { IBuffElement } from "../../../config/Buff";
import { util } from "../../../tool/Utils";
import { MascotModuleS } from "../../npc/mascotNpc/MascotModuleS";
import { MascotModuleC } from "../../npc/mascotNpc/MascotModuleC";
import { AreaModuleC } from "../../AreaModule/AreaModuleC";
import SceneUnit from "../../npc/SceneUnit";
import { UnitManager } from "../../npc/UnitManager";



// import { ISceneUnitBase } from "../../SceneUnitModule/model/ISceneUnitBase";

/**
 * 自定义update的buffC
 */
export class BuffC_Base extends BuffC {

    /**玩家模块*/
    protected playerModuleC: PlayerModuleC = null;

    /**怪模块*/
    // protected sceneUnitModuleC: SceneUnitModuleC = null;

    /**宿主id*/
    public hostId: number = null

    /**特效ids key */
    private buffEffectIds: Array<number> = [];

    /**
     * 已经过去的时间,有时间限制的buff使用
     */
    protected elapsedTime: number = 0
    /**
     * 上次触发时间，有触发次数类型的buff使用
     */
    protected lastOccurredTime: number = 0;
    /**
     * 当前触发的次数，有触发次数类型的buff使用
     */
    protected curOccurredCount: number = 0;

    /**
    * 当触发了buff效果时，给外部一个回调
    */
    protected _onTrigger: mw.Action1<BuffC> = null;
    public get onTrigger(): mw.Action1<BuffC> {
        return this._onTrigger;
    }

    /**
     * 当触buff完成初始化后，当帧初时执行时，给外部一个回调
     */
    protected _onExecute: mw.Action1<BuffC> = null;
    public get onExecute(): mw.Action1<BuffC> {
        return this._onExecute;
    }


    /**RPC参数*/
    public arg: buffArgs = null;


    /**
      * buff开始执行了
      */
    public execute() {
        if (this._onExecute) {
            this._onExecute.call(this);
        }
    }

    /**
     * 
     * @param _id 
     * @param staticConfig 
     * @param arg 
     */
    constructor(_id: number, staticConfig: BuffData, arg: any) {
        //console.error("CenterBuffC constructor _id:==================================== ", _id, " configId: ", staticConfig.id, JSON.stringify(arg));
        super(_id, staticConfig);
        let pid = Number(arg[0]);
        if (isNaN(pid) == false) {
            this.hostId = pid;
            this.arg = arg[1] as buffArgs;
            //console.error("this.arg=======>>", JSON.stringify(this.arg));
        } else {
            oTraceError("AttributeBuffS isNaN(pid) ", arg);
        }
        this.curOccurredCount = 0;
        this.lastOccurredTime = this._triggerInterval;
        this._onExecute = new mw.Action1<BuffC>();
        this._onTrigger = new mw.Action1<BuffC>();
    }


    /**
     * 初始化
     */
    public init() {
        //oTrace("AttributeBuffC init", this.hostId);
        super.init();
        // this.sceneUnitModuleC = ModuleService.getModule(SceneUnitModuleC);
        this.playerModuleC = ModuleService.getModule(PlayerModuleC);

        if (this.hostId == null) {
            return;
        }

        if (Number(this.hostId) > 0) {
            //this.playEffectInPlayer(this.hostId, this.mountSlotIndex, this.relativePos, this.relativeRot, this.scale);
            this.playEffectInPlayers(this.hostId);
        } else {
            let unit = UnitManager.instance.getUnit(this.hostId);
            if (unit) {
                if (!unit.getModel()) {
                    return
                }
                this.playEffectInScenceUints(unit.getModel());
            }

        }

        this.onTrigger.add(this.onTriggerHandler, this);
    }


    /**
     * 帧驱动
     * @param dt  s
     */
    public onUpdate(dt: number) {
        if (this._dead)
            return;
        if (this._buffLifecycleType == EBuffLifecycleType.LimitByTime) {
            //更新时限类型的周期
            this.elapsedTime += dt;
            if (this.elapsedTime >= this._duration) {
                this._dead = true;//时间到就标记其死亡
            }
        }
        else if (this._buffLifecycleType == EBuffLifecycleType.LimitByTriggerCount) {
            //更新触发性类型的周期
            this.lastOccurredTime += dt;
            if (this.lastOccurredTime >= this._triggerInterval) {
                //触发一次
                if (this._onTrigger) {
                    this._onTrigger.call(this);
                }
                this.lastOccurredTime -= this._triggerInterval;
                this.curOccurredCount++;
                if (this.curOccurredCount == this._triggerCount) {
                    //触发完全了 标记其死亡
                    this._dead = true;
                }
            }
        }
    }

    /**
     * 销毁，清理
     */
    public destroy() {

        super.destroy();

        if (this._onExecute) {
            this._onExecute.clear();
            this._onExecute = null;
        }

        if (this._onTrigger) {
            this._onTrigger.clear();
            this._onTrigger = null;
        }

        this.destroyEffect();
    }

    /**
     * buff销毁前特效
     */
    private destroyEffect() {
        //注意: 一定要销毁
        for (let index = 0; index < this.buffEffectIds.length; index++) {
            const element = this.buffEffectIds[index];
            EffectService.stop(element);
        }
        this.buffEffectIds = [];
    }

    /**
     * 使用Odin的EffectService在玩家身上绑定一个buff特效,出现时间会收buff配置中的延迟影响
     * @param playerTarget 玩家id 或者玩家对象
     * @param slotIndex 玩家绑定的插槽位置索引
     * @param relativePos 绑定的相对位置
     * @param relativeRot  绑定的相对朝向
     * @param scale 缩放
     */
    public playEffectInPlayers(playerTarget: number | mw.Player) {
        //oTrace("playEffectInPlayers==================>>>>>", this.configId);
        let cfg: IBuffElement = GameConfig.Buff.getElement(this.configId);

        if (!cfg) {
            return;
        }

        let effectIds = cfg.effectGuids;

        if (!effectIds || effectIds.length == 0) {
            return;
        }

        this.destroyEffect();
        //oTrace("playEffectInPlayers===========一定要销毁========>>>>>", effectIds);

        let playEffect = (player: mw.Player) => {
            if (this.dead)
                return;
            this._host = player;
            this._hostGuid = player.playerId.toString();

            for (let index = 0; index < effectIds.length; index++) {
                const element = effectIds[index];
                let effectId = util.playEffectOnPlayer(player.playerId, element);
                this.buffEffectIds.push(effectId);
            }
            // oTrace("playEffectInPlayers===================>>>>>", this.buffEffectIds, effectIds);
        }

        let delayPlayEffect = () => {
            if (playerTarget instanceof mw.Player) {
                playEffect(playerTarget as mw.Player);
            }
            else {
                Player.asyncGetPlayer(playerTarget as number).then((player) => {
                    playEffect(player);
                });
            }
        }

        if (this._effectDelayShow > 0) {
            //延迟一会
            mw.TimeUtil.delaySecond(this._effectDelayShow).then(() => {
                if (this.dead)
                    return;
                delayPlayEffect();
            })
        }
        else {
            delayPlayEffect();
        }
    }


    /**
      * 使用Odin的EffectService在客户端怪物身上绑定一个buff特效,出现时间会收buff配置中的延迟影响
      * @param playerTarget 玩家id 或者玩家对象
      * @param slotIndex 玩家绑定的插槽位置索引
      * @param relativePos 绑定的相对位置
      * @param relativeRot  绑定的相对朝向
      * @param scale 缩放
      */
    public playEffectInScenceUints(playerTarget: mw.Character | mw.GameObject) {
        //oTrace("playEffectInScenceUints==================>>>>>");
        let cfg: IBuffElement = GameConfig.Buff.getElement(this.configId);

        if (!cfg) {
            return;
        }

        let effectIds = cfg.effectGuids;

        if (!effectIds || effectIds.length == 0) {
            return;
        }

        this.destroyEffect();
        //oTrace("playEffectInScenceUint===========一定要销毁========>>>>>", effectIds);


        let playEffect = (player: mw.Character | mw.GameObject) => {
            this._host = player;
            for (let index = 0; index < effectIds.length; index++) {
                const element = effectIds[index];
                let effectId = util.playEffectOnScenceUint(player, element);
                this.buffEffectIds.push(effectId);
            }
            //oTrace("playEffectInScenceUint===================>>>>>", this.buffEffectIds, effectIds);
        }


        let delayPlayEffect = () => {
            playEffect(playerTarget);
        }

        if (this._effectDelayShow > 0) {
            //延迟一会
            mw.TimeUtil.delaySecond(this._effectDelayShow).then(() => {
                delayPlayEffect();
            })
        }
        else {
            delayPlayEffect();
        }
    }



    public onTriggerHandler() {
        //oTrace("onTriggerHandler--------------------------------------------", this.hostId)
        if (this.hostId > 0) {
            if (this.hostId == Player.localPlayer.playerId) {

            }
            this.playEffectInPlayers(this.hostId);
        } else {
            // //客户端怪物灼烧特效表现
            // let unit: ISceneUnitBase = this.sceneUnitModuleC.getSceneUnit(this.hostId)
            // if (unit) {
            //     if (!unit.model) {
            //         return
            //     }
            //     this.playEffectInScenceUints(unit.model);
            // }
        }
    }



    //     /**
    //   * 使用Odin的EffectService在客户端怪物身上绑定一个buff特效,出现时间会收buff配置中的延迟影响
    //   * @param playerTarget 玩家id 或者玩家对象
    //   * @param slotIndex 玩家绑定的插槽位置索引
    //   * @param relativePos 绑定的相对位置
    //   * @param relativeRot  绑定的相对朝向
    //   * @param scale 缩放
    //   */
    //     public playEffectInScenceUint(playerTarget: mw.Character | mw.GameObject, slotIndex: number, relativePos: mw.Vector, relativeRot: mw.Rotation, scale: mw.Vector) {
    //         if (!Number(this.effectGuid)) {
    //             return
    //         }

    //         oTrace("playEffectInScenceUint===================>>>>>",
    //             this._buffEffectId, playerTarget, slotIndex, relativePos, relativeRot, scale)

    //         //注意: 一定要销毁
    //         if (this.buffEffectId) {
    //             EffectService.stop(this.buffEffectId);
    //             this._buffEffectId = null;
    //         }

    //         let playEffect = (player: mw.Character | mw.GameObject) => {
    //             this._host = player;
    //             if (PlayerManagerExtesion.isNpc(player)) {
    //                 this._buffEffectId = GeneralManager.rpcPlayEffectOnPlayer(this.effectGuid, player as any, slotIndex, this._effectLoop == 0 ? 1 : 0, relativePos, relativeRot, scale);
    //             } else {
    //                 this._buffEffectId = GeneralManager.rpcPlayEffectOnGameObject(this.effectGuid, player as any, this._effectLoop == 0 ? 1 : 0, relativePos, relativeRot, scale)
    //             }

    //         }

    //         let delayPlayEffect = () => {
    //             playEffect(playerTarget);
    //         }

    //         if (this._effectDelayShow > 0) {
    //             //延迟一会
    //             mw.TimeUtil.delaySecond(this._effectDelayShow).then(() => {
    //                 delayPlayEffect();
    //             })
    //         }
    //         else {
    //             delayPlayEffect();
    //         }
    //     }


    //     /**
    //      * 使用Odin的EffectService在玩家身上绑定一个buff特效,出现时间会收buff配置中的延迟影响
    //      * @param playerTarget 玩家id 或者玩家对象
    //      * @param slotIndex 玩家绑定的插槽位置索引
    //      * @param relativePos 绑定的相对位置
    //      * @param relativeRot  绑定的相对朝向
    //      * @param scale 缩放
    //      */
    //     public playEffectInPlayer(playerTarget: number | mw.Player, slotIndex: number, relativePos: mw.Vector, relativeRot: mw.Rotation, scale: mw.Vector) {

    //         if (!Number(this.effectGuid)) {
    //             return
    //         }

    //         oTrace("playEffectInPlayer===========一定要销毁========>>>>>", this._buffEffectId)

    //         //注意: 一定要销毁
    //         if (this.buffEffectId) {
    //             EffectService.stop(this.buffEffectId);
    //             this._buffEffectId = null;
    //         }

    //         let playEffect = (player: mw.Player) => {
    //             if (this.dead)
    //                 return;
    //             this._host = player;
    //             this._hostGuid = player.playerId.toString();
    //             this._buffEffectId = GeneralManager.rpcPlayEffectOnPlayer(this.effectGuid, player, slotIndex, this._effectLoop == 0 ? 1 : 0, relativePos, relativeRot, scale);
    //             // if (this._onAttachedEffect)
    //             //     this._onAttachedEffect.call(this);
    //         }

    //         let delayPlayEffect = () => {
    //             if (playerTarget instanceof mw.Player) {
    //                 playEffect(playerTarget as mw.Player);
    //             }
    //             else {
    //                 Player.asyncGetPlayer(playerTarget as number).then((player) => {
    //                     playEffect(player);
    //                 });
    //             }
    //         }

    //         if (this._effectDelayShow > 0) {
    //             //延迟一会

    //             mw.TimeUtil.delaySecond(this._effectDelayShow).then(() => {
    //                 if (this.dead)
    //                     return;
    //                 delayPlayEffect();
    //             })
    //         }
    //         else {
    //             delayPlayEffect();
    //         }
    //     }



}

