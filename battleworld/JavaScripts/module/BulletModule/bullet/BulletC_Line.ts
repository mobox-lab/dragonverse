import { PlayerManagerExtesion, } from '../../../Modified027Editor/ModifiedPlayer';
import { BulletC } from "./BulletC";
import { PlayerModuleC } from "../../PlayerModule/PlayerModuleC";
// import { SceneUnitModuleC } from "../../SceneUnitModule/SceneUnitModuleC";
import { Globaldata } from "../../../const/Globaldata";


export class BulletC_Line extends BulletC {

    /**是否自动导航 */
    private _isNaved: boolean = true;

    private _mPlayer: PlayerModuleC = null;

    // private _mNpc: SceneUnitModuleC = null;

    private _defaultRot: mw.Rotation = mw.Rotation.zero;

    private navTarget: mw.GameObject = null;

    /**
     * 子弹一切初始化完成了 hook
     */
    initOver() {
        //oTrace("BulletC_Line initOver !!!!!!!!!");
        this.moveDir = mw.Vector.subtract(this.targetPos, this.launchPos, this.moveDir).normalize();
        this.moveDistance = mw.Vector.squaredDistance(this.targetPos, this.launchPos);



        this.worldPos = new mw.Vector(this.launchPos.x, this.launchPos.y, this.launchPos.z);
        super.initOver();
        this.flying = true;


        this._isNaved = this.staticConfig.autoNav;

    }

    private getPlayerModule() {
        if (this._mPlayer == null) {
            this._mPlayer = ModuleService.getModule(PlayerModuleC);
        }
        return this._mPlayer;
    }

    // private getNpcModule() {
    //     if (this._mNpc == null) {
    //         this._mNpc = ModuleService.getModule(SceneUnitModuleC);
    //     }
    //     return this._mNpc;
    // }

    /**开启巡航校准 */
    private async start_autoNav() {

        if (this._isNaved == false) {
            return;
        }

        if (StringUtil.isEmpty(this._launchData.traceTargetGuid)) {
            return;
        }

        this.navTarget = GameObject.findGameObjectById(this._launchData.traceTargetGuid);
        if (this.navTarget == null) {
            return;
        }

        if (PlayerManagerExtesion.isCharacter(this.navTarget)) {
            if (this.getPlayerModule().isDead()) {
                this._isNaved = false;
            }
        } else {
            // let unit = this.getNpcModule().getSceneUnitByGuid(this._launchData.traceTargetGuid);
            // if (unit == null || unit.isDead) {
            //     this._isNaved = false;
            // }
        }

        if (this._isNaved == false) {
            return;
        }

        let loc = this.navTarget.worldTransform.position;
        mw.Vector.subtract(loc, this.worldPos, Globaldata.tmpVector1);

        let angle = mw.Vector.angle(this._bulletObj.localTransform.getForwardVector(), Globaldata.tmpVector1);

        if (angle >= 70) {
            this._isNaved = false;
            return;
        }

        let rot = this._bulletObj.worldTransform.rotation;

        mw.Vector.subtract(loc, this.worldPos, Globaldata.tmpVector1);

        mw.Rotation.fromVector(Globaldata.tmpVector1, Globaldata.tmpRotation);

        this._defaultRot.z = MathUtil.lerp(rot.z, Globaldata.tmpRotation.z, 0.5);
        this._defaultRot.y = MathUtil.lerp(rot.y, Globaldata.tmpRotation.y, 0.5);

        this._defaultRot.getForce(this.moveDir);


        this._bulletObj.worldTransform.rotation = this._bulletObj.worldTransform.rotation.set(this._defaultRot);
    }

    /**
     * 更新位移
     * @param dt 
     */
    protected updateMovement(dt: number) {

        if (this.flying && !this.reachedTarget) {

            /** CCD 连续碰撞检测 */
            // let moveDis = this.speed * dt;
            // let maxMoveDis = this.staticConfig.triggerRelativeScale[0] * 100;

            // Globaldata.tmpVector1.x = this.worldPos.x;
            // Globaldata.tmpVector1.y = this.worldPos.y;
            // Globaldata.tmpVector1.z = this.worldPos.z;
            // let oldWorldPos = Globaldata.tmpVector1;

            mw.Vector.multiply(this.moveDir, this.speed * dt, Globaldata.tmpVector2);

            mw.Vector.add(this.worldPos, Globaldata.tmpVector2, this.worldPos);

            this.start_autoNav();

            //this._bulletObj.worldTransform.position = this._bulletObj.worldTransform.position.set(this.worldPos);
            this._bulletObj.worldTransform.position = this.worldPos;

            let nowDist = mw.Vector.squaredDistance(this.launchPos, this.worldPos);
            if (nowDist >= this.moveDistance) {
                /** 检测完毕 */
                this.markReached();
            }
        }
    }


    private check_hitPoint() {
        // 连续碰撞检测点 目前用不到屏蔽减少性能消耗
        // if (this._hostPlayerId == Player.localPlayer.playerId) {
        //     let hit = this.hitDetector;
        //     if (moveDis > maxMoveDis) {

        //         let res2 = [];
        //         if (this.firstCheckLine) {

        //             res2 = QueryUtil.lineTrace(this.worldPos, oldWorldPos, true, false);
        //             this.firstCheckLine = false;
        //         }

        //         let res = QueryUtil.lineTrace(oldWorldPos, this.worldPos, true, false);
        //         let tracePos: boolean = false;
        //         for (let i = 0; i < res.length; i++) {
        //             if (res[i].gameObject == Player.localPlayer.character) continue;
        //             /** 前置设置worldPos 是为了打击点表现得时候正确 */
        //             if (hit.onBulletHitObj(res[i].gameObject)) {
        //                 this.worldPos.set(res[i].impactPoint);
        //                 tracePos = true
        //                 break;
        //             }
        //         }

        //         if (!tracePos) {
        //             for (let i = 0; i < res2.length; i++) {
        //                 if (res2[i].gameObject == Player.localPlayer.character) continue;
        //                 /** 前置设置worldPos 是为了打击点表现得时候正确 */
        //                 if (hit.onBulletHitObj(res2[i].gameObject)) {
        //                     this.worldPos.set(res2[i].impactPoint);
        //                     break;
        //                 }
        //             }
        //         }
        //     }
        // }
    }

    /**
     * 当到达目标时
     */
    protected markReached() {
        this._isNaved = false;
        super.markReached();

        this.markDead();
    }


}