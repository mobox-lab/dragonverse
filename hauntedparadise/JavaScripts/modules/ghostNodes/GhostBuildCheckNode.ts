import { BehaviorType, BehaviorRet } from "../../codes/behavior3/BehaviorDefine";
import { regBehaviorNode } from "../../codes/behavior3/BehaviorManager";
import { BehaviorNode } from "../../codes/behavior3/BehaviorNode";
import { Environment } from "../../codes/behavior3/BehaviorTree";
import { NodeBase, B3Define, B3Dec, B3ArgType } from "../../codes/behavior3/nodes/NodeBase";
import GhostBehavoirInst from "../../codes/modules/ghost/GhostBehavoir";
import { BuildModuleS } from "../build/BuildModuleS";


@regBehaviorNode()
class GhostCheckBuild extends NodeBase {
    define: B3Define = new B3Define(
        BehaviorType.Condition,
        "检查建筑物",
        `
        +检查自身附近是否有建筑物
        +返回是否成功和检测到的建筑表面位置
        `
    ).addOutput("建筑物id")

    private _boxExtends: Vector = new Vector(30, 30, 100);

    @B3Dec.ArgDec("检查高度抬高", B3ArgType.Number)
    public checkMin: number;

    public run(node: BehaviorNode, env: Environment) {
        let inst = env["inst"] as GhostBehavoirInst;
        let timer = env.getInnerVar(node, "interval");
        if (timer >= TimeUtil.elapsedTime()) {
            let pos = env.getInnerVar(node, "cachePos");
            if (!pos) {
                return BehaviorRet.Fail;
            }
            return [BehaviorRet.Success, pos];
        }
        timer = env.setInnerVar(node, "interval", TimeUtil.elapsedTime() + 0.5);
        let startLoc = inst.ghostChar.worldTransform.position.clone();
        let extendsZ = inst.ghostChar.collisionExtent.z;
        if (this.checkMin >= extendsZ / 2) {
            this.checkMin = extendsZ / 2;
        }
        startLoc.z += this.checkMin;
        let endLoc = startLoc.clone().add(inst.ghostChar.worldTransform.getForwardVector().multiply(60));
        this._boxExtends.z = extendsZ - this.checkMin;
        let hits = QueryUtil.boxOverlap(endLoc, this._boxExtends, true);
        const buildModuleS = ModuleService.getModule(BuildModuleS);
        let res: GameObject[] = hits.filter(e => {
            let buildUUid = e["BuildingUUID"];
            if (!buildUUid) {
                return false;
            }
            let info = buildModuleS.buildingMap.get(buildUUid);
            if (!info) {
                return false;
            }
            if (!info.info.creatorId) {
                return false
            }
            return true;
        })
        if (res.length == 0) {
            env.setInnerVar(node, "cachePos", null);
            inst.lastCheckBuildId = "";
            return BehaviorRet.Fail
        }
        env.setInnerVar(node, "cachePos", endLoc);
        inst.lastCheckBuildId = res[0]["BuildingUUID"];
        return [BehaviorRet.Success, endLoc];
    }
}
