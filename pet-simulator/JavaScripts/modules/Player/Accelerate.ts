import { SpawnManager, SpawnInfo, } from '../../Modified027Editor/ModifiedSpawn';
import { GameConfig } from "../../config/GameConfig";
import { GlobalData } from "../../const/GlobalData";
import { cubicBezier } from "../../utils/MoveUtil";
import petBehiver from "./petBehiver";

export class rateEff {

    /**目标宠物 */
    protected targetPet: petBehiver = null;
    /**当前玩家 */
    protected char: mw.Character = null;
    /**是否销毁 */
    public isDestroy: boolean = false;

    constructor(targetPet: petBehiver, char: mw.Character) {
        this.targetPet = targetPet;
        this.char = char;
    }

    update(dt: number) {
        if (this.isDestroy) return;
        if (!this.targetPet || !this.targetPet.isAttack) {
            this.destroy();
            return;
        }
    }

    /**销毁 */
    destroy() {

    }
}


export class Accelerate extends rateEff {

    /**当前特效 */
    private effect: mw.Effect = null;
    /**移动至目标tween */
    private moveToTargetTween: mw.Tween<mw.Vector> = null;

    /**初始化 */
    async init(): Promise<void> {
        if (!this.targetPet.isAttack) {
            this.destroy();
            return;
        }
        let effInfo = GameConfig.Effect.getElement(GlobalData.SpeedUp.effectId);
        const startLoc = this.char.getSlotWorldPosition(mw.HumanoidSlotType.RightHand);
        startLoc.z += effInfo.EffectPoint;
        let nTransform = new mw.Transform(
            startLoc,
            new mw.Rotation(0, 0, 0),
            effInfo.EffectLarge
        );
        this.effect = await SpawnManager.asyncSpawn<mw.Effect>({ guid: effInfo.EffectID, transform: nTransform });
        this.effect.loop = true;
        let dis = mw.Vector.distance(startLoc, this.targetPet.position);
        let speed = GlobalData.SpeedUp.speed;
        let time = dis / speed * 1000;
        const endPoint = this.targetPet.position;
        const bezier = GlobalData.SpeedUp.bezier;
        this.moveToTargetTween = new mw.Tween<mw.Vector>(startLoc).to(endPoint, time).onUpdate((value) => {
            if ((!this.targetPet) || (!this.targetPet.isAttack)) {
                this.destroy();
                return;
            }
            this.effect.worldTransform.position = value;
        }).onComplete(() => {
            this.arrive();
        }).easing(cubicBezier(bezier[0], bezier[1], bezier[2], bezier[3])).start().onStart((loc) => {
            this.effect.worldTransform.position = loc;
            this.effect.play();
        });
    }

    /**销毁 */
    destroy() {
        if (this.effect) {
            this.effect.destroy();
            this.effect = null;
        }
        if (this.moveToTargetTween) {
            this.moveToTargetTween.stop();
            this.moveToTargetTween = null;
        }
        if (this.targetPet) {
            this.targetPet.accelerateNum--;
            if (this.targetPet.accelerateNum < 0) this.targetPet.accelerateNum = 0;
            this.targetPet = null;
        }
        this.isDestroy = true;
    }

    /**到达目的地 */
    async arrive() {
        if (this.effect) {
            this.effect.destroy();
            let effInfo = GameConfig.Effect.getElement(GlobalData.SpeedUp.petEffectId);
            console.error(`lwj Accelerate  arrive  ${effInfo.EffectID}`);
            this.effect = await SpawnManager.asyncSpawn<mw.Effect>({ guid: effInfo.EffectID });
            if (this.isDestroy) {
                this.effect?.destroy();
                return;
            }
            this.effect.worldTransform.position = this.targetPet.position;
            this.effect.worldTransform.scale = effInfo.EffectLarge;
            this.effect.play();
        }
        if (this.targetPet) {
            this.targetPet.accelerateNum++;
        }
    }

    /**存活时长 */
    private lifeTime: number = 0;

    update(dt: number) {
        if (this.isDestroy) return;
        if (!this.targetPet || !this.targetPet.isAttack) {
            this.destroy();
            return;
        }
        this.lifeTime += dt;
        if (this.lifeTime >= GlobalData.SpeedUp.petEffectStay) {
            this.destroy();
        }
    }

}

/**长按特效 */
export class LongPress extends rateEff {

    /**当前特效 */
    private effect: mw.Effect = null;
    private effectInit: boolean = false;
    /**强化特效 */
    private stEffect: mw.Effect = null;
    private stEffectInit: boolean = false;
    /**箭头缩放 */
    private arrowScale: mw.Vector = GlobalData.SpeedUp.longPressScale;
    /**引导线单位长度 */
    private length: number = 200;
    private targetZ: number = 16;

    async update(dt: number) {
        if (this.isDestroy) return;
        if (!this.targetPet || !this.targetPet.isAttack) {
            this.destroy();
            return;
        }
        if (!this.effectInit) {
            this.effectInit = true;
            this.targetPet.accelerateNum++;
            let effInfo = GameConfig.Effect.getElement(GlobalData.SpeedUp.longPressEffectId);
            this.effect = (await GameObject.asyncFindGameObjectById(effInfo.EffectID)).clone() as mw.Effect;
            if (this.isDestroy) {
                this.effect?.destroy();
                return;
            }
            this.targetZ = effInfo.EffectPoint;
            this.effect.loop = true;
            this.effect.play();
        }
        if (!this.stEffectInit) {
            this.stEffectInit = true;
            let effInfo = GameConfig.Effect.getElement(GlobalData.SpeedUp.petEffectId);
            this.stEffect = await SpawnManager.asyncSpawn<mw.Effect>({ guid: effInfo.EffectID });
            if (this.isDestroy) {
                this.stEffect?.destroy();
                this.effect?.destroy();
                return;
            }
            this.stEffect.worldTransform.position = this.targetPet.position;
            this.stEffect.worldTransform.scale = effInfo.EffectLarge;
            this.stEffect.loop = true;
            this.stEffect.play();
        }
        const endPos = this.targetPet.position;
        const startPos = this.char.getSlotWorldPosition(mw.HumanoidSlotType.RightHand);
        let subdir = mw.Vector.subtract(endPos, startPos);
        let scale = subdir.length / this.length;
        let rot = subdir.toRotation();
        this.effect.worldTransform.position = new mw.Vector(startPos.x, startPos.y, startPos.z + this.targetZ);
        this.effect.worldTransform.rotation = new mw.Rotation(-rot.y, rot.x, rot.z - 90);
        this.arrowScale.y = scale;
        this.effect.worldTransform.scale = this.arrowScale;
    }

    /**销毁 */
    destroy() {
        if (this.effect) {
            this.effect.destroy();
            this.effect = null;
        }
        if (this.stEffect) {
            this.stEffect.destroy();
            this.stEffect = null;
        }
        if (this.targetPet) {
            this.targetPet.accelerateNum--;
            if (this.targetPet.accelerateNum < 0) this.targetPet.accelerateNum = 0;
        }
        this.isDestroy = true;
    }
}