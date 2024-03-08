import { UtilEx } from "../../../utils/UtilEx";
import { HomeModuleC } from "../../home/HomeModuleC";
import { BuildModuleC } from "../BuildModuleC";
import { BuildingHelper } from "./BuildingHelper";
import { BuildingInfo } from "../building/BuildingInfo";
import Tips from "../../../codes/utils/Tips";
import { CommonUtils } from "../../../codes/utils/CommonUtils";
import { GhostTraceHelper } from "../../../codes/utils/TraceHelper";
import { GameConfig } from "../../../config/GameConfig";

/*
 * @Author: chen.liang chen.liang@appshahe.com
 * @Date: 2023-12-21 19:03:58
 * @LastEditors: chen.liang chen.liang@appshahe.com
 * @LastEditTime: 2024-01-22 10:27:23
 * @FilePath: \hauntedparadise\JavaScripts\modules\build\helper\BuildingEditorHelper.ts
 * @Description: 
 */

/** 建造的可视距离 */
const MaxBuildDis: number = 1000;

export class BuildingEditorHelper {
    private static _ins: BuildingEditorHelper;
    public static get instance() {
        if (!this._ins) {
            this._ins = new BuildingEditorHelper();
        }
        return this._ins;
    };

    public static defaultExclude(go: GameObject): boolean {
        if (go instanceof Character) return true;
        if (go instanceof Trigger) return true;
        if (go.tag.includes("Ghost")) return true;
        return false;
    }

    qOffset = Quaternion.identity;
    rZ = 0;
    private useUpdate: boolean = false;
    editorGO: GameObject;
    private itemId: number;
    private hitRes: HitResult;
    private traceTimer: number = 0;
    constructor() {
        this.useUpdate = false;
        TimeUtil.onEnterFrame.add(this.update, this);
    }

    // client 创建建筑

    async openEdit(itemId: number) {
        const cfg = BuildingHelper.getBuildCfgByItemId(itemId);
        if (!cfg) {
            console.error("openEdit error cfg", itemId);
            return;
        }
        // 生成物体
        const go = await UtilEx.AssetEx.spawnByPoolAsync(cfg.prefabClient, false, "edit");
        if (!go) {
            console.error("openEdit error go", itemId, cfg.prefabClient);
            return;
        }
        await go.asyncReady();
        if (this.editorGO) {
            UtilEx.AssetEx.release(this.editorGO);
        }
        this.editorGO = go;

        // 添加材质
        this.setMaterial(this.editorGO, "83DC4BAA46491FD3D7D3519C88E62A38");

        // 开始检测
        this.itemId = itemId;
        this.hitRes = null;
        this.useUpdate = true;
        this.qOffset = Quaternion.identity;
        this.rZ = 0;
        Event.dispatchToLocal("EnableLineTrace", false);
    }
    /**
     * 取消建筑,退出编辑模式
     */
    cancelEdit() {

        this.itemId = 0;
        this.hitRes = null;
        this.useUpdate = false;
        if (this.editorGO) {
            UtilEx.AssetEx.release(this.editorGO);
            this.editorGO = null;
        }
        Event.dispatchToLocal("EnableLineTrace", true);
    }

    /**
     * 检测建筑能否创建
     * @returns 
     */
    checkCanBuild() {
        if (!this.hitRes) {
            Tips.show(GameConfig.Language["buildtips_0"].Value);
            return false;
        }
        // 拿到家园
        const localHome = ModuleService.getModule(HomeModuleC).localHome;
        let isInHome = false;
        if (localHome) {
            isInHome = localHome.checkIn(this.editorGO.worldTransform.position);
        }

        // 如果在家园里,父节点也得在家园
        const parent = BuildingHelper.tryGetBuildingByGO(this.hitRes.gameObject);
        if (parent) {
            if (false == StringUtil.isEmpty(parent.info.ownerId) && parent.info.ownerId != Player.localPlayer.userId) {
                // Tips.show("不能在别人家园建造");
                // return false;
            }
            else if (isInHome && parent.info.ownerId != Player.localPlayer.userId) {
                // Tips.show("父节点在家园外");
                return false;
            }
            else if (!isInHome && parent.info.ownerId == Player.localPlayer.userId) {
                // Tips.show("父节点在家园内");
                return false;
            }
        }

        return true
    }

    /**
     * 确认建筑
     */
    confirmEdit() {
        if (!this.hitRes) return;

        const info = new BuildingInfo();
        const cfg = BuildingHelper.getBuildCfgByItemId(this.itemId);
        info.itemId = this.itemId;

        GhostTraceHelper.itemTrace(info.itemId, 4);

        info.pos = this.editorGO.worldTransform.position;
        info.rot = this.editorGO.worldTransform.rotation;

        // 确认是否是家园建筑
        info.ownerId = null;
        const localHome = ModuleService.getModule(HomeModuleC).localHome;
        if (localHome) {
            console.log("building editor find home:", localHome.guid);
            const checkRes = localHome.checkIn(this.editorGO.worldTransform.position);
            if (checkRes) info.ownerId = Player.localPlayer.userId;
        }
        console.log("check it")

        if (StringUtil.isEmpty(info.ownerId) == false) {
            info.homePos = this.editorGO.worldTransform.position.subtract(localHome.gameObject.worldTransform.position);
            info.homeRot = this.editorGO.worldTransform.rotation.subtract(localHome.gameObject.worldTransform.rotation);
            info.homePos = localHome.gameObject.worldTransform.rotation.getInverse().rotateVector(info.homePos);
        }

        // 检测父节点
        const parent = BuildingHelper.tryGetBuildingByGO(this.hitRes.gameObject);
        if (parent && parent.info.ownerId == info.ownerId) {
            console.log("building editor find parent:", parent.info.uuid);
            info.parentUUID = parent.info.uuid;
        }

        // 添加血量
        info.hp = cfg.hp;

        // 创建者
        info.creatorId = Player.localPlayer.userId;

        ModuleService.getModule(BuildModuleC).reqBuild(info);

        this.hitRes = null;
        this.qOffset = Quaternion.identity
        this.rZ = 0
    }

    private update(dt: number) {
        if (!this.useUpdate) return;
        if (this.traceTimer >= 0) {
            this.traceTimer -= dt;
            if (this.traceTimer <= 0) {
                this.traceTimer = 0.1;
                this.trace();
                // 关闭所有节点的碰撞 - 就在onUpdate中刷碰撞，在初始化关碰撞，门的关不了
                CommonUtils.switchCollision(this.editorGO, false, true);
            }
        }
    }

    private tempImpactNormal: Vector;

    /**
     * 射线检测
     */
    private trace() {

        const trans = Camera.currentCamera.worldTransform;
        const pos = trans.position;
        const forward = trans.getForwardVector();
        const res = QueryUtil.lineTrace(pos, pos.clone().add(forward.multiply(MaxBuildDis)), true, false);
        for (let hit of res) {
            if (BuildingEditorHelper.defaultExclude(hit.gameObject)) continue;

            // 检测是否为物体本身
            if (hit.gameObject == this.editorGO) continue;
            let childFlag = false;
            for (let child of this.editorGO.getChildren()) {
                if (child == hit.gameObject) {
                    childFlag = true;
                    break;
                };
            }
            if (childFlag) continue;

            // 检测成功
            this.hitRes = hit;
            this.editorGO.worldTransform.position = hit.impactPoint;
            this.tempImpactNormal = hit.impactNormal;
            break;
        }
        const q1 = Quaternion.multiply(this.tempImpactNormal.toRotation().toQuaternion(), new Rotation(0, -90, 0).toQuaternion());
        const q2 = Quaternion.multiply(this.qOffset, q1);
        this.editorGO.worldTransform.rotation = q2.toRotation();
    }
    // client setMaterial

    /**
     * 材质map
     */
    matMap = new Map<string, string>();

    /**
     * 设置材质
     * @param go 
     * @param matId 如果为空则还原
     */
    async setMaterial(go: GameObject, matId: string = null) {

        if (!matId) {
            if (go instanceof Model && this.matMap.has(go.gameObjectId)) {
                matId = this.matMap.get(go.gameObjectId);
                this.matMap.delete(go.gameObjectId);
                go.resetMaterial();
                // go.setMaterial(matId);
            }
            go.getChildren().forEach((child) => {
                this.setMaterial(child, matId);
            });
            return;
        }

        await UtilEx.AssetEx.asyncLoadAsset(matId);

        if (go instanceof Model) {
            this.matMap.set(go.gameObjectId, go.gameObjectId);
            go.setMaterial(matId);
        }

        go.getChildren().forEach((child) => {
            this.setMaterial(child, matId);
        });
    }
}