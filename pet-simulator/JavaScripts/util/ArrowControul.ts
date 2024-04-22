import { SpawnManager } from '../Modified027Editor/ModifiedSpawn';
import { GeneralManager, } from '../Modified027Editor/ModifiedStaticAPI';
import { GlobalData } from "../const/GlobalData";

export class Arrow {
    /**引导线 */
    private guideArrow: mw.GameObject;
    /**引导线缩放 */
    private arrowScale: mw.Vector = mw.Vector.one;
    /**引导线单位长度 */
    private length: number = 100;
    /**引导线guid */
    private arrowGuid: string = GlobalData.pet.guideLineS;
    /**特效guid */
    private effGuid: string = GlobalData.pet.lightCircleS;
    private startEffId: number;
    /**起点特效 */
    private startPartical: mw.Effect;
    private endEffId: number;
    /**终点特效 */
    private endPartical: mw.Effect;
    private isReady: boolean = false;

    constructor(startPos: mw.Vector, endPos: mw.Vector) {
        this.isReady = true;
        this.guideArrow = SpawnManager.modifyPoolSpawn(this.arrowGuid, GameObjPoolSourceType.Scene);
        this.endEffId = GeneralManager.rpcPlayEffectAtLocation(this.effGuid, endPos, 0);
        EffectService.getEffectById(this.endEffId).then(obj => {
            if (!this.isReady) EffectService.stop(this.endEffId);
            this.endPartical = obj;
        })
        this.startEffId = GeneralManager.rpcPlayEffectAtLocation(this.effGuid, startPos, 0);
        EffectService.getEffectById(this.startEffId).then(obj => {
            if (!this.isReady) EffectService.stop(this.startEffId);
            this.startPartical = obj;
        })
        this.guideArrow?.setVisibility(mw.PropertyStatus.On);
        this.guideArrow?.setCollision(mw.PropertyStatus.Off);
        if (this.guideArrow) this.arrowScale = this.guideArrow.worldTransform.scale;
    }

    /**
     * 引导线轮询
     */
    public update(startPos: mw.Vector, endPos: mw.Vector) {
        if (!this.isReady) return;
        if (this.guideArrow == null) {
            this.guideArrow = SpawnManager.modifyPoolSpawn(this.arrowGuid, GameObjPoolSourceType.Scene);
            return;
        }
        let subdir = mw.Vector.subtract(endPos, startPos);
        let scale = subdir.length / this.length;
        let offsetPos = mw.Vector.multiply(subdir, 0.5);
        this.guideArrow.worldTransform.position = mw.Vector.add(startPos, offsetPos);
        this.guideArrow.worldTransform.rotation = offsetPos.toRotation();
        this.arrowScale.x = scale;
        this.guideArrow.worldTransform.scale = this.arrowScale;
        if (this.startPartical) this.startPartical.worldTransform.position = startPos;
        if (this.endPartical) this.endPartical.worldTransform.position = endPos;
    }

    /**
     * 销毁引导线
     */
    public destroy() {
        this.isReady = false;
        if (this.guideArrow) {
            GameObjPool.despawn(this.guideArrow);
            this.guideArrow = null;
        }
        EffectService.stop(this.endEffId);
        EffectService.stop(this.startEffId);
    }

}