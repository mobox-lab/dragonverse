import { MapEx } from "odin";
import { GameConfig } from "../../config/GameConfig";
import { MotionFrameNode, MotionFrameNodeBase, MotionFrameNode_FlyEntity, MotionFrameNode_SkillRect } from "./MotionFrameNodeBase";
import { Singleton } from "../../tool/FunctionUtil";
import { EFrameNodeType } from "./MontionEnum";
import { Globaldata } from "../../const/Globaldata";
import { MotionEditConst } from "./MotionEditConst";
import { EventManager } from "../../tool/EventManager";
import Tips from "../../tool/P_Tips";
import { UIEvent_editMotion } from "./UIEvent_editMotion";


/**技能数据 */
export class motionClip {
    public motionId: number = 0;
    /**组名 */
    public groupName: string;
    /**技能名称 */
    public name: string;
    /**总帧数 */
    public frameCount: number = 0;
    /**是否仅触发一次 */
    public areaEffectOnce: boolean = false;
    /**帧节点表现 */
    public motionNodeMap: MapEx.MapExClass<MotionFrameNodeBase[]> = {};

    /**npc使用该技能时做校验的距离 初始化数据时才会计算出来 */
    public atkDistanceXY: number = 0;
}


@Singleton()
export class MotionDataManager {
    public static instance: MotionDataManager = null;

    /**技能数据数组 */
    public _motionClips: motionClip[] = [];
    /**缓存 */
    public _motionClipMap: Map<number, motionClip> = new Map();

    public _groupClipMap: Map<string, motionClip[]> = null;

    /**初始化 */
    public init() {

        let montionCfgs = GameConfig.MotionClip.getAllElement();
        for (let index = 0; index < montionCfgs.length; index++) {
            const cfg = montionCfgs[index];
            if (StringUtil.isEmpty(cfg.motionData)) {
                continue;
            }
            let motionData = this.addMotion(cfg.id, cfg.groupName, cfg.name, cfg.frameCount);



            motionData.motionNodeMap = JSON.parse(cfg.motionData);

            for (const key in motionData.motionNodeMap) {
                for (let i = 0; i < motionData.motionNodeMap[key].length; i++) {
                    let data = motionData.motionNodeMap[key][i];

                    // 只有编辑器下才做校验
                    if (MotionEditConst.isUseEdit) {
                        // 对数据字段增减进行校验
                        MotionFrameNode.verifyNodeVariate(data);
                    }

                    if (data.frameNodeType == EFrameNodeType.MotionFrameNode_SkillRect) {
                        let data1 = data as MotionFrameNode_SkillRect;
                        let dis = 0;
                        if (data1.type == 1) {
                            dis = data1.offsetLoc.x + data1.range * 50;
                        } else {
                            dis = data1.offsetLoc.x + data1.LWH.x * 50;
                        }
                        if (dis >= motionData.atkDistanceXY) motionData.atkDistanceXY = dis;
                    } else if (data.frameNodeType == EFrameNodeType.MotionFrameNode_FlyEntity) {
                        let data1 = data as MotionFrameNode_FlyEntity;
                        let bulletCfg = GameConfig.Bullet.getElement(data1.bulletId);
                        if (bulletCfg) {
                            let dis = bulletCfg.speed * bulletCfg.delayDestroy;
                            if (dis < Globaldata.bulletMinDistance) {
                                dis = Globaldata.bulletMinDistance;
                            }
                            motionData.atkDistanceXY = dis;
                        }
                    }
                    for (const key2 in data) {

                        if (key2 == "colorHex" && data[key2]["x"] != null) {
                            data[key2] = "";
                        }
                        else if (data[key2]["x"] != null) {
                            data[key2] = new mw.Vector(data[key2]["x"], data[key2]["y"], data[key2]["z"])
                        }
                        //console.error("===json ", cfg.name, key2, data[key2]);
                    }
                }
            }
        }

        EventManager.instance.add(UIEvent_editMotion.MotionAddGroupName, this.listen_addGroupName, this);
    }

    private listen_addGroupName(groupName: string) {
        if (this._groupClipMap.has(groupName)) {
            Tips.show("该组名已存在");
            return;
        }
        this._groupClipMap.set(groupName, []);
    }

    /**增加motion */
    public addMotion(configId: number, groupName: string, name: string, frameCount: number) {
        let motionData = new motionClip();
        motionData.motionId = configId;
        motionData.groupName = groupName;
        motionData.name = name;
        motionData.frameCount = frameCount;
        this._motionClips.push(motionData);


        if (MotionEditConst.isUseEdit) {
            if (this._groupClipMap == null) {
                this._groupClipMap = new Map();
            }
            if (this._groupClipMap.has(groupName) == false) {
                this._groupClipMap.set(groupName, []);
            }
            this._groupClipMap.get(groupName).push(motionData);
        }

        this._motionClipMap.set(configId, motionData);

        return motionData;
    }

    /**获取motion数据 */
    public getMotionData(motionId: number) {
        if (this._motionClipMap.has(motionId) == false) {
            return null;
        }
        return this._motionClipMap.get(motionId);
    }

}
