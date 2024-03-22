

import { BuildingBase } from "./building/BuildingBase";
import { AddGMCommand } from "module_gm";
import { BuildModuleS } from "./BuildModuleS";
import { BuildingEditorHelper } from "./helper/BuildingEditorHelper";
import { BuildingInfo } from "./building/BuildingInfo";
import { BuildingHelper } from "./helper/BuildingHelper";
import { BagDefine } from "../../codes/modules/bag/BagDefine";
import { BuildingFactory } from "./building/BuildingFactory";
import Tips from "../../codes/utils/Tips";
import { Event_LoadArchiveData } from "../../codes/modules/procedure/const/Events";
import { ArchiveData } from "../../codes/modules/archive/ArchiveHelper";
import { GameConfig } from "../../config/GameConfig";
import { CommonUtils } from "../../codes/utils/CommonUtils";
import { LanUtil } from "../../codes/utils/LanUtil";


AddGMCommand("确认编辑", (p, args: string) => {
    BuildingEditorHelper.instance.confirmEdit();
}, null, "建筑模块")
AddGMCommand("增加建筑(id,num)", null, (p, args: string) => {
    const [id, num] = args.split(",");
    const itemId = +id;
    const count = +num;
    const infos = []
    for (let i = 0; i < count; i++) {
        const info = new BuildingInfo();
        info.itemId = itemId;
        info.pos = p.character.worldTransform.position.clone().add(Vector.forward.multiply(i * 100)).add(Vector.up.multiply(100));
        info.rot = p.character.worldTransform.rotation.clone();
        infos.push(info);
    }
    const m = ModuleService.getModule(BuildModuleS)
    m.net_createBuilding(infos, p.userId).then(() => {
        Event.dispatchToClient(p, "tips_build", "build go:" + m.buildingMap.size + "info:" + m["buildingInfoMap"].size)
    });
}, "建筑模块")
/**
 * Build模块Client端
 */
export class BuildModuleC extends ModuleC<BuildModuleS, null> {

    /** 使用之前检测合法性 */
    async checkIllegal(uuid: string): Promise<boolean> {
        let illegal = await this.server.net_checkIllegal(uuid);
        if (!illegal) { Tips.show("不可操作该建筑"); }
        return illegal;
    }

    buildingMap = new Map<string, BuildingBase>();
    buildingInfoMap = new Map<string, BuildingInfo>();
    showTimer = 0;
    showFlag = false;
    protected onStart(): void {

        BuildingHelper.MoveSpeed = GameConfig.Global["BuildDropSpeed"]["number"];

        Event.addServerListener("tips_build", (str: string) => {
            Tips.show(str);
        })
        // 加载家园建筑
        Event.addLocalListener(Event_LoadArchiveData, (data: ArchiveData) => {
            this.reqInitHome();
        })

        Event.addLocalListener("ClearBuildingDirtyMark", () => { this.reqMarkDirty(this.interBuildingUUID, false); this.interBuildingUUID = null; });

        let lastGettime = 0;
        Event.addLocalListener("showTreeTips", async () => {
            let curTime = TimeUtil.elapsedTime();
            if (curTime - lastGettime < 1) {
                return;
            }
            let time = await this.server.net_getNearFruitTime();
            if (time != 0) {
                Tips.show(CommonUtils.formatString(LanUtil.getText("tips_show_07"), time.toFixed(0) + "s"));
            } else {
                Tips.show(LanUtil.getText("tips_show_08"));
            }

        })
    }

    /** 正在交互建筑的uuid */
    public interBuildingUUID: string;

    protected onUpdate(dt: number): void {
        this.checkShow(dt);
    }

    private async checkShow(dt: number) {
        if (this.showFlag) return;
        this.showTimer -= dt;
        if (this.showTimer > 0) return;
        this.showFlag = true;
        this.showTimer = 1;

        // 获取玩家位置
        const player = Player.localPlayer;

        if (!player || !player.character || !player.character.worldTransform) { return; }

        const playerLoc = player.character.worldTransform.position;

        // 获取玩家附近的建筑
        let nearInfos: BuildingInfo[] = [];
        for (let info of this.buildingInfoMap.values()) {
            const dis = Vector.distance(playerLoc, info.pos);
            if (dis < BuildingHelper.ClientShowDistance) {
                nearInfos.push(info);
                info["dis"] = dis;
            }
        }
        nearInfos.sort((a, b) => {
            return a["dis"] - b["dis"];
        })

        const newMap = new Map<string, BuildingBase>();
        // 显示建筑
        for (let i = 0; i < nearInfos.length && i < BuildingHelper.ShowCount; i++) {
            const info = nearInfos[i];
            if (this.buildingMap.has(info.uuid)) {
                const building = this.buildingMap.get(info.uuid);
                newMap.set(info.uuid, building);
                this.buildingMap.delete(info.uuid);
                continue;
            }
            const building = await BuildingFactory.createBuilding(info);
            newMap.set(info.uuid, building);
        }
        // 移除不在附近的建筑
        const oldMap = this.buildingMap;
        for (let [, building] of oldMap) {
            building.release();
        }
        oldMap.clear();
        this.buildingMap = newMap;
        this.showFlag = false;
    }

    /**
     * 请求服务端捡起建筑
     * @param info 
     */
    async repPick(building: BuildingBase) {
        if (await ModuleService.getModule(BuildModuleC).checkIllegal(building.info.uuid)) {
            let res = await BagDefine.AddItem(Player.localPlayer.playerId, building.info.itemId, "", "", 1, false);
            if (res) {
                this.reqRemove([building.info.uuid]);
            }
        }
    }

    reqHurt(uuid: string, damage: number) {
        this.server.net_ChangeBuildingHP(uuid, damage);
    }

    async checkBuildingOver() {
        return this.server.net_checkBuildingOver(this.localPlayer.userId);
    }

    /**
     * 请求服务端创建建筑
     * @param info 
     */
    reqBuild(info: BuildingInfo) {
        this.server.net_createBuilding([info], this.localPlayer.userId);
    }

    /**
     * 请求删除建筑
     * @param uuids 
     */
    reqRemove(uuids: string[]) {
        for (let index = 0; index < uuids.length; index++) {
            const uuid = uuids[index];
            this.buildingInfoMap.delete(uuid);
            if (this.buildingMap.has(uuid)) {
                this.buildingMap.get(uuid).release();
                this.buildingMap.delete(uuid);
            }

        }
        this.server.net_removeBuilding(uuids);
    }

    /** 请求对这个建筑脏标记，脏标记了的建筑都不能拾取，优先级最高 */
    reqMarkDirty(uuid: string, isMark: boolean) {
        this.server.net_reqMarkDirty(uuid, isMark);
    }

    reqInitHome() {
        this.server.net_initHome(this.localPlayer.userId);
    }

    async net_updateInfos(infos: BuildingInfo[]) {
        console.log("net_updateInfos", JSON.stringify(infos));
        for (let info of infos) {
            if (!info) {
                console.error("MyTypeError:存在不存在的建筑物")
                continue;
            }
            this.buildingInfoMap.set(info.uuid, info);
            let building = this.buildingMap.get(info.uuid);
            if (building) {
                building.updateInfo(info);
            }
            else {
                if (!Player.localPlayer || !Player.localPlayer.character || !Player.localPlayer.character.worldTransform) { return; }
                const dis = Vector.distance(info.pos, Player.localPlayer.character.worldTransform.position);
                if (dis > BuildingHelper.ClientShowDistance) continue;
                if (this.buildingInfoMap.size > BuildingHelper.ShowCount + 1) continue;
                building = await BuildingFactory.createBuilding(info);
                if (this.buildingInfoMap.has(info.uuid) == false) {
                    building.release();
                    continue;
                }
                this.buildingMap.set(info.uuid, building);
            }
        }
    }

    net_removeInfos(uuids: string[]) {
        console.log("net_removeInfos", uuids.length);

        for (let uuid of uuids) {
            this.buildingInfoMap.delete(uuid);
            const building = this.buildingMap.get(uuid);
            if (building) {
                building.release();
                this.buildingMap.delete(uuid);
            }
        }
    }

}
