import { EAttributeEvents_S, EModule_Events_S, EPlayerEvents_S } from "../../const/Enum";
import { MotionDataManager } from "../../editors/motionEditor/MotionDataManager";
import { Constants } from "../../tool/Constants";
import { EventManager } from "../../tool/EventManager";
import { TriggerHelper } from "../../tool/TriggerHelper";
import { util } from "../../tool/Utils";
import { MotionRegister } from "./MotionModule";
import { MotionModuleC } from "./MotionModuleC";
import { ServerMotion, ActionContext } from "./motionBase/MotionBase";
import { PlayerModuleS, THurtData } from "../PlayerModule/PlayerModuleS";
import { PlayerManager } from "../PlayerModule/PlayerManager";
import { MascotModuleS } from "../npc/mascotNpc/MascotModuleS";
import { GameConfig } from "../../config/GameConfig";
import { MotionProxyS } from "./MotionProxyS";
import { AttributeModuleS } from "../AttributeModule/AttributeModuleS";
import { Attribute } from "../PlayerModule/sub_attribute/AttributeValueObject";


export class MotionModuleS extends ModuleS<MotionModuleC, null> {

    private mPlayer: PlayerModuleS = null;
    private mAttr: AttributeModuleS = null;

    private recycleQueue: ServerMotion[]
    private stageMotion: Set<ServerMotion>
    private motionPool: Set<ServerMotion>

    /**动效代理类 */
    private mMotionProxyS: Map<number, MotionProxyS> = new Map();

    protected onAwake(): void {
        MotionDataManager.instance.init();
    }

    onStart() {

        this.mPlayer = ModuleService.getModule(PlayerModuleS);
        this.mAttr = ModuleService.getModule(AttributeModuleS);

        this.motionPool = new Set()
        this.stageMotion = new Set()
        this.recycleQueue = [];
        TriggerHelper.init(2);

        TimeUtil.setInterval(this.logicUpdate.bind(this), Constants.LogicFrameInterval);

        EventManager.instance.add(EPlayerEvents_S.player_deadState_s, this.listen_playerDead, this);
    }

    /**监听玩家死亡 */
    private listen_playerDead(pId: number) {
        let player = Player.getPlayer(pId);
        if (player == null) return;

        this.getAllClient().net_server_abort_motion(pId);
    }


    protected onPlayerEnterGame(player: mw.Player): void {
        if (this.mMotionProxyS.has(player.playerId)) {
            return;
        }

        let newProxy = new MotionProxyS(player.playerId);
        this.mMotionProxyS.set(player.playerId, newProxy);
    }

    protected onPlayerLeft(player: mw.Player): void {
        if (this.mMotionProxyS.has(player.playerId) == false) {
            return;
        }
        let motionProxy = this.mMotionProxyS.get(player.playerId);
        motionProxy.onDestroy();
        this.mMotionProxyS.delete(player.playerId);
    }

    private logicUpdate() {
        for (let motion of this.stageMotion) {

            try { motion.updateLogic() }
            catch (e) { console.error(`Server Motion/${motion.constructor.name}/updateLogic 出现错误!,错误信息:${e.message}\n${e.stack}`) }
            finally { motion.currentFrame++ }

            if (motion.currentFrame >= motion.motionData.frameCount) this.recycleQueue.push(motion)
        }

        if (this.recycleQueue.length > 0) {
            let count = this.recycleQueue.length
            for (let i = 0; i < count; i++) {
                let ac = this.recycleQueue.shift();
                this.recycleMotion(ac)
            }
        }
    }

    // 回收Motion
    private recycleMotion(motion: ServerMotion) {
        motion.finish()

        motion.stage = false
        // 从stage删掉
        this.stageMotion.delete(motion)

        // 添加到容器
        this.motionPool.add(motion)
    }

    // 获取一个Motion
    private getMotionFromPool(motionId: number): ServerMotion {
        // 没有此池子则创建pool

        if (this.motionPool.size == 0) {
            let abs = MotionRegister.getNumericalMotionInstance(motionId)
            this.stageMotion.add(abs)
            return abs
        }

        let motion: ServerMotion

        for (let value of this.motionPool.values()) {
            if (value.stage == false) {
                motion = value
                this.stageMotion.add(motion)
                this.motionPool.delete(motion)
                break;
            }
        }
        if (!motion) {
            let abs = MotionRegister.getNumericalMotionInstance(motionId)
            motion = abs
            this.stageMotion.add(abs)
        }
        return motion
    }

    // 服务器主动派发Motion
    public invokeServerMotion(motionId: number, from: number, to: number) {

        let motionData = MotionDataManager.instance.getMotionData(motionId);

        if (motionData == null) {
            console.error(`未定义此Motion, motionId:${motionId}`)
            return;
        }


        let motion = this.getMotionFromPool(motionId);
        motion.currentFrame = 0;
        motion.stage = true;
        motion.invoke(from, motionData, to);
        this.syncMotion(motionId, from, to);
    }

    stopMotion(id: number) {
        for (let motion of this.stageMotion) {
            if (motion.owner.sceneId == id) {

                motion.stop();
            }
        }
    }

    // 同步 Motion
    syncMotion(motionId: number, from: number, to: number, excludeID?: number) {
        let sourcePosX: number
        let sourcePosY: number

        if (from > 0) {
            let playerLoc = PlayerManager.instance.getPlayerLoc(from);
            if (playerLoc == null) {
                return;
            }
            sourcePosX = playerLoc.x;
            sourcePosY = playerLoc.y;
        } else {
            let unit = ModuleService.getModule(MascotModuleS).getUnit(from);
            if (unit == null) {
                return;
            }
            let loc = unit.getModel().worldTransform.position;
            sourcePosX = loc.x
            sourcePosY = loc.y
        }

        for (const player of Player.getAllPlayers()) {
            let playerID = player.playerId

            // 过滤发起者
            if (playerID == excludeID) continue

            let playerPos = PlayerManager.instance.getPlayerLoc(playerID);
            if (playerPos == null) continue;

            let disXY = util.distanceNumberXY(sourcePosX, sourcePosY, playerPos.x, playerPos.y)

            // 过滤超出范围的接收者
            if (disXY > Constants.SceneUnitInfoCullDistanceXY) continue

            this.getClient(player).net_room_player_invoke_motion(motionId, from, to);
        }
    }

    getMotionBySceneID(sceneID: number): ServerMotion | undefined {
        for (const motion of this.stageMotion.values()) {
            if (motion.owner.sceneId == sceneID) return motion
        }
        return undefined
    }

    abortMotion(sceneID: number) {
        let stageMotion = this.getMotionBySceneID(sceneID)
        if (!stageMotion) return
        this.recycleMotion(stageMotion)
        this.getAllClient().net_server_abort_motion(sceneID)
    }

    //客户端请求转发Motion
    @Decorator.noReply()
    public net_player_invoke_motion(skillId: number, motionId: number, target: number) {

        if (this.mPlayer.isDead(this.currentPlayerId)) {
            return;
        }

        if (this.mMotionProxyS.has(this.currentPlayerId) == false) {
            return;
        }

        let motionProxy = this.mMotionProxyS.get(this.currentPlayerId);
        if (motionProxy.isInCD(skillId)) {
            return;
        }


        //let context = new ActionContext(this.currentPlayerId, target);
        this.syncMotion(motionId, this.currentPlayerId, target, this.currentPlayerId);

    }

    //客户端请求转发Motion
    @Decorator.noReply()
    net_player_invoke_motion_charge(motionId: number, target: number | undefined = undefined) {
        let context = new ActionContext(this.currentPlayerId, target);

        let pLoc = PlayerManager.instance.getPlayerLoc(this.currentPlayerId);

        if (pLoc == null) return;

        for (const player of Player.getAllPlayers()) {
            let playerID = player.playerId

            // 过滤发起者
            if (playerID == this.currentPlayerId) continue;

            let playerPos = PlayerManager.instance.getPlayerLoc(playerID);
            if (playerPos == null) continue;

            let disXY = util.distanceNumberXY(pLoc.x, pLoc.y, playerPos.x, playerPos.y);

            // 过滤超出范围的接收者
            if (disXY > Constants.SceneUnitInfoCullDistanceXY) continue;

            this.getClient(player).net_room_player_invoke_motion_charge(motionId, context);
        }
    }

    private _playerIds: number[] = [];
    private _sceneIds: number[] = [];

    /**
     * 客户端动效攻击
     * @param beHurtIds 被攻击者id数组
     * @param motionId 
     * @param frame 
     * @param motionEffectId 
     */
    @Decorator.noReply()
    public net_motionAttackInfo(beHurtIds: number[], hurtData: THurtData) {

        this._playerIds.length = 0;
        this._sceneIds.length = 0;

        for (let index = 0; index < beHurtIds.length; index++) {
            const pId = beHurtIds[index];
            let player = Player.getPlayer(pId);
            if (player) {
                this._playerIds.push(pId);
            } else {
                this._sceneIds.push(pId);
            }
        }

        if (this._playerIds.length > 0) {
            EventManager.instance.call(EModule_Events_S.player_beAttack, this.currentPlayerId, this._playerIds, hurtData);
        }

        if (this._sceneIds.length > 0) {
            EventManager.instance.call(EModule_Events_S.sceneUnit_beAttack, this.currentPlayerId, this._sceneIds, hurtData);
        }

    }

    /**播放motion */
    public playMotoin(pId: number, motionId: number) {
        let client = this.getAllClient();
        if (client == null) {
            return;
        }

        client.net_room_player_invoke_motion(motionId, pId, 0);
    }

    /**玩家释放终极大招 */
    @Decorator.noReply()
    public net_releaseFinalSkill() {
        // 判断下怒气值
        let maxAngerValue = this.mAttr.getAttrValue(this.currentPlayerId, Attribute.EnumAttributeType.maxAngerValue);
        let curAngerValue = this.mAttr.getAttrValue(this.currentPlayerId, Attribute.EnumAttributeType.angerValue);
        if (curAngerValue < maxAngerValue) {
            return;
        }
        // 释放成功
        //EventManager.instance.call(EAttributeEvents_S.attr_change_s, this.currentPlayerId, Attribute.EnumAttributeType.angerValue, 0);

        if (this.mMotionProxyS.has(this.currentPlayerId)) {
            this.mMotionProxyS.get(this.currentPlayerId).releaseFinalSkill();
        }


    }

    /**是否爆气状态 */
    public isExplosiveGas(pId: number) {
        if (this.mMotionProxyS.has(pId) == false) {
            return false;
        }

        return this.mMotionProxyS.get(pId).isExplosiveGas();
    }

}