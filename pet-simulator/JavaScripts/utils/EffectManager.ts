import { GeneralManager, } from '../Modified027Editor/ModifiedStaticAPI';
import { oTrace, oTraceError } from "odin";
import { GameConfig } from "../config/GameConfig";

export class EffectManager {

    private static _instance: EffectManager;
    public static get instance(): EffectManager {
        if (!this._instance) this._instance = new EffectManager();
        return this._instance;
    }

    public playEffectOnObj(id: number, obj: mw.GameObject): number {
        const effInfo = GameConfig.Effect.getElement(id);
        return GeneralManager.rpcPlayEffectOnGameObject(effInfo.EffectID, obj, effInfo.EffectTime, effInfo.EffectLocation, new mw.Rotation(effInfo.EffectRotate), effInfo.EffectLarge);
    }

    public stopEffect(id: number): void {
        EffectService.stop(id);
    }

    /**
     * 播放特效并设置裁剪
     * @param id 特效表id
     * @param obj 父物体
     * @param clip 裁剪
     * @returns 
     */
    public playEffOnObjScene(id: number, obj: mw.GameObject, clip: number = 5000): mw.Effect {
        const effInfo = GameConfig.Effect.getElement(id);
        let Particle = GameObject.findGameObjectById(effInfo.EffectID);
        if (!Particle) return;
        let nParticle = (Particle.clone()) as mw.Effect;
        nParticle.parent = obj;
        nParticle.localTransform.position = effInfo.EffectLocation;
        nParticle.localTransform.rotation = new mw.Rotation(effInfo.EffectRotate);
        nParticle.worldTransform.scale = effInfo.EffectLarge;
        nParticle.setCullDistance(clip);
        nParticle.play();
        nParticle.onFinish.add(() => {
            oTraceError("特效播放完毕");
            nParticle.play();
        })
        return nParticle;
    }

    public playEffectOnPos(id: number, pos: mw.Vector): number {
        const effInfo = GameConfig.Effect.getElement(id);
        if (effInfo.EffectLocation.z != 0) {
            pos.z += effInfo.EffectLocation.z;
        }
        return GeneralManager.rpcPlayEffectAtLocation(effInfo.EffectID, pos, effInfo.EffectTime, new mw.Rotation(effInfo.EffectRotate), effInfo.EffectLarge);
    }

}