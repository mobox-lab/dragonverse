import { SpawnManager } from '../../Modified027Editor/ModifiedSpawn';
import { Globaldata } from "../../const/Globaldata";
import { util } from "../../tool/Utils";
import { PlayerManager } from "../PlayerModule/PlayerManager";

// 玩家宠物
export class Pet {
    // 主人
    private owner: mw.Character = null;
    // 宠物预制体
    private pet: mw.GameObject = null;
    // 下标
    private flyIndex: number = 0;
    // tween
    private flyTween: mw.Tween<any> = null;
    // 当前飞行的数据
    private flyData: mw.Vector2 = new mw.Vector2();
    // 主人的ID
    private ownerId: number = null;
    // 是否到达
    private isArrive: boolean = false;

    public constructor(owner: mw.Character, prefabGuid: string) {
        this.owner = owner;
        this.ownerId = owner.player.playerId;

        SpawnManager.modifyPoolAsyncSpawn(prefabGuid, GameObjPoolSourceType.Prefab).then(go => {
            this.pet = go;
            if (this.owner == null) {
                this.destroy();
                return;
            }
            let transform = this.owner.localTransform;
            go.worldTransform.position = transform.transformPosition(Globaldata.petOffset);
        });
    }

    public onUpdate(dt: number): void {
        let currentPlayerId = PlayerManager.instance.currentPlayerId;
        if (this.owner == null || this.pet == null || currentPlayerId == null || this.ownerId == null || this.ownerId != currentPlayerId) return;
        this.moveUpdate();
    }

    /**
     * 判断是否到达目标点
     */
    private check(curLoc: mw.Vector, endLoc: mw.Vector): boolean {
        return curLoc.equals(endLoc, 10);
    }

    /**
     * 移动状态update
     */
    private moveUpdate(): void {
        let petTransform = this.pet.worldTransform;
        let transform: mw.Transform = PlayerManager.instance.getPlayerTransform();

        if (transform == null) return;
        let endPos = transform.transformPosition(Globaldata.petOffset);
        if (this.check(petTransform.position, endPos)) {  // 到达目标点
            this.stopMove();
            return;
        }
        mw.Vector.subtract(endPos, petTransform.position, transform.position); // 用transform.location存储差值 只是为了减少new 无其他意义
        transform.position.z = 0;
        let endRotaion = transform.position.toRotation();
        this.flyToPos(petTransform, endPos, endRotaion);
    }

    /**
     * 停止tween
     */
    private stopMove(): void {
        if (this.isArrive) return;
        if (this.flyTween != null) {
            this.flyTween.stop();
            this.flyTween = null;
        }
        let transform = this.owner.localTransform;
        this.pet.worldTransform.position = transform.transformPosition(Globaldata.petOffset);
        this.pet.worldTransform.rotation = transform.getForwardVector().toRotation();
        this.isArrive = true;
    }

    /**
     * 跳跃移动到目标点
     */
    private flyToPos(petTransform: mw.Transform, endPos: mw.Vector, endRot: mw.Rotation): void {
        this.isArrive = false;
        if (this.flyTween == null) this.tweenInit();

        mw.Vector.lerp(petTransform.position, endPos, Globaldata.petSmoothLoc, endPos);
        endPos.z += this.flyData.x;
        endRot = mw.Rotation.lerp(petTransform.rotation, endRot, Globaldata.petSmoothRot);
        petTransform.position = endPos;
        petTransform.rotation = endRot;

        this.pet.worldTransform = petTransform

    }

    /**
     * tween初始化
     */
    private tweenInit(): void {
        let start = Globaldata.flyArr[this.flyIndex];
        let end = Globaldata.flyArr[this.flyIndex + 1];
        let bezier = Globaldata.flyBezier;
        this.flyTween = new mw.Tween(start.clone()).to(end.clone(), 300).onUpdate(obj => {
            this.flyData = obj;
        }).onComplete(() => {
            this.flyIndex++;
            if (this.flyIndex >= Globaldata.flyArr.length - 1) this.flyIndex = 0;
            this.tweenInit();
        }).easing(util.cubicBezier(bezier[0], bezier[1], bezier[2], bezier[3])).start();
    }

    /**
     * 销毁
     */
    public destroy() {
        if (this.pet != null) {
            GameObjPool.despawn(this.pet);
            this.pet = null;
        }
        this.owner = null;
    }
}