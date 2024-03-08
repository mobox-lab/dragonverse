import { ObjAniUtil } from "../../../utils/ObjAniUtil";
import { TimerOnly } from "../../../utils/AsyncTool";
import { CommonUtils } from "../../../utils/CommonUtils";
import { ObjInterModuleC } from "../ObjInterModuleC";
import { IEvtCom, RegisterEvt } from "./IEvtCom";

/** 猫猫的音效 */
const CatSounds: string[] = ["135448", "135489", "169090", "169095"];

@RegisterEvt
export class CatEvt implements IEvtCom {
    evtName: string = "CatEvt";

    constructor() {
        Event.addServerListener(this.evtName, this.resCatEvt.bind(this));
    }

    scaleTimer = new TimerOnly();

    initScale: Vector = Vector.one;

    toScale: Vector = Vector.one;

    resCatEvt() {
        let go = GameObject.findGameObjectById(this.goid)
        ObjAniUtil.playObjScatterAni(this.guid, go.worldTransform, this.minScaleRatio, this.maxScaleRatio, this.productNum);
        // 先变大，过十秒再变回原形
        ObjAniUtil.playScaleUpAni(go, this.toScale.clone(), 1e3, () => { this.scaleTimer.setTimeout(() => { ObjAniUtil.playScaleUpAni(go, this.initScale.clone()) }, 1e4); })
        SoundService.play3DSound(CommonUtils.getRandomValByArrList(CatSounds), go.worldTransform.position);
    }

    goid: string;

    guid: string;

    productNum: number = 10;

    minScaleRatio: number = 2;

    maxScaleRatio: number = 3;

    onGetCall(goid: string, guid: string, bigModelScaleRatio: string, smallModelScaleRatio: string, productNum: string) {
        this.goid = goid;
        this.guid = guid;
        let initScaleRatio = Number(bigModelScaleRatio.split("|")[0]);
        let toScaleRatio = Number(bigModelScaleRatio.split("|")[1]);
        this.initScale = new Vector(initScaleRatio, initScaleRatio, initScaleRatio);
        this.toScale = new Vector(toScaleRatio, toScaleRatio, toScaleRatio);
        this.minScaleRatio = Number(smallModelScaleRatio.split("|")[0]);
        this.maxScaleRatio = Number(smallModelScaleRatio.split("|")[1]);
        this.productNum = Number(productNum);
        ModuleService.getModule(ObjInterModuleC).reqSyncCatEvt();
    }
}
