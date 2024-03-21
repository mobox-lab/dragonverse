/*
 * @Author       : dal
 * @Date         : 2024-02-01 11:11:34
 * @LastEditors  : dal
 * @LastEditTime : 2024-02-05 13:54:54
 * @FilePath     : \hauntedparadise\JavaScripts\modules\build\BuildModuleS.ts
 * @Description  : 
 */
import {ArchiveHelper} from "../../codes/modules/archive/ArchiveHelper";
import {BuildModuleC} from "./BuildModuleC";
import {BuildingBase} from "./building/BuildingBase";
import {BuildingFactory} from "./building/BuildingFactory";
import {BuildingInfo} from "./building/BuildingInfo";
import {BuildingHomeData} from "./helper/BuildingHomeData";
import {BuildingHelper} from "./helper/BuildingHelper";
import BuildingSpawnTrigger, {BuildingSpawner} from "./spawnTrigger/BuildingSpawnTrigger";
import {ProcedureModuleS} from "../../codes/modules/procedure/ProcedureModuleS";
import {BuildingEditorHelper} from "./helper/BuildingEditorHelper";
import {WaitLoop} from "../../codes/utils/AsyncTool";
import {GameConfig} from "../../config/GameConfig";
import {twoDateDis} from "../mailbox/UIMailBox";
import {HomeModuleS} from "../home/HomeModuleS";

interface HsTeleportData {
    /**
     * 是否为访客.
     */
    isVisitor: boolean;
    /**
     * 访客的目标 userId.
     */
    visitorTo: string;
}


/**
 * 建筑信息的id
 */
let uuid = 0;

class MoveInfo {
    go: GameObject;
    offset: Vector;
}

/**
 * Build模块Server端
 */
export class BuildModuleS extends ModuleS<BuildModuleC, null> {

    /**
     * 看一个建筑是否合理可用
     */
    async net_checkIllegal(uuid: string): Promise<boolean> {
        return !this.dirtyMarkList.includes(uuid);
    }

    private dirtyMarkList: string[] = [];

    /**
     * 脏标记
     * @param uuid 建筑唯一id
     * @param isMark 标记or取消
     */
    @Decorator.noReply()
    public net_reqMarkDirty(uuid: string, isMark: boolean) {
        if (isMark) {
            this.dirtyMarkList.push(uuid);
        } else {
            this.dirtyMarkList.includes(uuid) && this.dirtyMarkList.splice(this.dirtyMarkList.indexOf(uuid), 1);
        }
    }

    /**
     * 在家里的数据map
     */
    dataMap = new Map<string, BuildingHomeData>();
    /**
     * 建筑map
     */
    buildingMap = new Map<string, BuildingBase>();

    /**
     * 访客记录表.
     * @type {Map<number, boolean>} {playerId, isVisitor}
     *
     * 访客模式将：
     *  - 禁用搭建功能.
     * @type {boolean}
     */
    visitorMap = new Map<number, boolean>();

    /**建筑信息表 */
    private buildingInfoMap = new Map<string, BuildingInfo>();
    /**
     * 同步map
     */
    updateMap = new Map<number, BuildingInfo[]>();
    private updateFlagMap = new Map<number, boolean>();
    /**
     * 建筑自动生成器
     */
    spawner: Set<BuildingSpawner> = new Set();

    /**
     * 保存建筑信息的定时器
     */
    private saveTimer = 0;

    /**
     * 建筑显示定时器
     */
    private showTimer = 0;

    private showFlag = false;


    protected onStart(): void {

        // 建筑物也会受伤
        Event.addLocalListener("S2S_ChangeBuildingHP", (uuid: string, hpChange: number) => {
            this.net_ChangeBuildingHP(uuid, hpChange);
        });

        Event.addLocalListener("EndProcedureServer", this.recycleBuilding.bind(this));

        Event.addLocalListener("DeleteArchiveSuccess", this.clearHomeBuilding.bind(this));

        this.showTimer = 1;
        this.saveTimer = 10;

        this.MaxBuildingNum = GameConfig.Global.MaxBuildingNum.number;

        Player.onPlayerJoin.add((player) => {
            const dataRaw = TeleportService.getTeleportData(player.teleportId) ?? null;
            if (dataRaw) {
                const data = JSON.parse(dataRaw as string) as HsTeleportData;
                this.setIsVisitor(player.playerId, data.isVisitor);
                //TODO_LviatYi jump to player's island.
            }
        });
    }

    /** 回收玩家的家园 */
    private recycleBuilding(userId: string) {
        // 保存玩家建筑信息
        this.getDataInfo(userId).onLeave();
        this.net_removeBuilding(this.getPlayerBuildingInfo(userId).map(v => {
            return v.uuid;
        }));
    }

    /**
     * 清空一个家园的建筑
     */
    private clearHomeBuilding(userId: string, archiveId: number) {
        this.getDataInfo(userId).clearHomeBuilding(archiveId);
    }

    protected onUpdate(dt: number) {

        // 检测建筑生成
        this.spawner.forEach(spawn => spawn.checkSpawn(dt));

        // 计算玩家位置,显示建筑
        this.checkShow(dt);

        // 保存建筑信息
        this.checkSave(dt);

        // 同步信息
        this.checkUpdate();
    }

    protected onPlayerJoined(player: mw.Player): void {
        if (!this.updateMap.has(player.playerId)) this.updateMap.set(player.playerId, []);
        if (!this.dataMap.has(player.userId)) this.dataMap.set(player.userId, new BuildingHomeData());
    }

    private getUpdateInfo(pid: number) {
        let updateInfo = this.updateMap.get(pid);
        if (!updateInfo) {
            updateInfo = [];
            this.updateMap.set(pid, updateInfo);
        }
        return updateInfo;
    }

    private getDataInfo(userId: string) {
        let dataInfo = this.dataMap.get(userId);
        if (!dataInfo) {
            dataInfo = new BuildingHomeData();
            this.dataMap.set(userId, dataInfo);
        }
        return dataInfo;
    }

    protected async onPlayerEnterGame(player: mw.Player): Promise<void> {

        // 同步建筑信息
        const infos = Array.from(this.buildingInfoMap.values());
        this.getUpdateInfo(player.playerId).push(...infos);
    }

    protected onPlayerLeft(player: mw.Player): void {
        this.updateMap.delete(player.playerId);

        // 保存玩家建筑信息
        this.recycleBuilding(player.userId);
        this.dataMap.delete(player.userId);
    }


    /**
     * 检测同步客户端信息
     */
    private checkUpdate() {

        Player.getAllPlayers().forEach((player) => {
            if (this.updateMap.has(player.playerId) && this.getUpdateInfo(player.playerId).length > 0) {
                if (this.updateFlagMap.get(player.playerId)) return;
                const updateArr = this.getUpdateInfo(player.playerId);

                // 同步消息切片
                if (updateArr.length > BuildingHelper.UpdateMaxCount) {
                    const newInfos = updateArr.splice(0, BuildingHelper.UpdateMaxCount);
                    this.getClient(player).net_updateInfos(newInfos);

                    // 减少rpc频率
                    this.updateFlagMap.set(player.playerId, true);
                    setTimeout(() => {
                        this.updateFlagMap.set(player.playerId, false);
                    }, 100);
                }
                // 直接发
                else {
                    this.getClient(player).net_updateInfos(updateArr);
                    updateArr.length = 0;
                }
            }
        });
    }

    private async checkShow(dt: number) {
        if (this.showFlag) return;
        this.showTimer -= dt;
        if (this.showTimer > 0) return;
        this.showTimer = 1;
        this.showFlag = true;

        // 获取玩家位置
        const players = Player.getAllPlayers();

        // 获取玩家附近的建筑
        const buildingInfos = Array.from(this.buildingInfoMap.values());

        const nearBuildings = new Set<BuildingInfo>();
        for (let player of players) {
            const playerLoc = player.character.worldTransform.position;
            const nearInfos = [];
            for (let info of buildingInfos) {
                const dis = Vector.distance(playerLoc, info.pos);
                // 显示距离
                if (dis > BuildingHelper.ServerShowDistance) continue;
                info["dis"] = dis;
                nearInfos.push(info);
            }
            ;
            nearInfos.sort((a, b) => {
                return a["dis"] - b["dis"];
            });
            if (nearInfos.length > BuildingHelper.ShowCount) {
                nearInfos.length = BuildingHelper.ShowCount;
            }
            nearInfos.forEach(info => nearBuildings.add(info));
        }

        // 创建建筑实例
        const newMap = new Map<string, BuildingBase>();
        for (let info of nearBuildings) {
            if (this.buildingMap.has(info.uuid)) {
                const building = this.buildingMap.get(info.uuid);
                newMap.set(info.uuid, building);
                this.buildingMap.delete(info.uuid);
            } else {
                const building = await BuildingFactory.createBuilding(info);
                newMap.set(info.uuid, building);
            }
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
     *  保存建筑信息
     * @param dt
     */
    private checkSave(dt) {
        if (this.saveTimer > 0) {
            this.saveTimer -= dt;
            if (this.saveTimer <= 0) {
                this.saveTimer = 10;
                const players = Player.getAllPlayers();
                for (let player of players) {
                    const data = this.getDataInfo(player.userId);
                    if (data.needSave) {
                        data.saveBuildings();
                    }

                }
            }
        }

    }

    /**
     *  初始化家园建筑
     * @param userId
     * @param archiveId
     */
    @Decorator.noReply()
    async net_initHome(userId: string) {
        if (!userId) {
            userId = this.currentPlayer.userId;
            console.error(`DEBUG MyTypeError>>> 初始化家的时候遇到的一个问题 客户端传来的userId没了，试试服务端的userId${userId}`);
        }
        this.getDataInfo(userId).initBuildings(userId);
    }

    /**
     *  家园创建建筑
     * @param infos
     */
    homeCreateBuildings(infos: BuildingInfo[]) {
        for (let info of infos) {
            this.buildingInfoMap.set(info.uuid, info);
        }
        Player.getAllPlayers().forEach(player => {
            this.getUpdateInfo(player.playerId).push(...infos);
        });

    }

    /**
     *  家园移除建筑
     * @param uuids
     */
    homeRemoveBuildings(uuids: string[]) {
        for (let uuid of uuids) {
            this.buildingInfoMap.delete(uuid);
        }
        this.getAllClient().net_removeInfos(uuids);
    }

    /** 玩家建筑信息map，用于控制玩家建筑数量，玩家退出游戏回收建筑等操作 */
    public playerBuildingInfoMap: Map<string, Array<BuildingInfo>> = new Map();

    /** 每个玩家最多建造不得超过200个 */
    private MaxBuildingNum: number = 5;

    public getPlayerBuildingInfo(userId: string): Array<BuildingInfo> {
        if (!this.playerBuildingInfoMap.has(userId)) {
            return [new BuildingInfo()];
        }
        return this.playerBuildingInfoMap.get(userId);
    }

    /** 检测自家的建筑是否超限 */
    public net_checkBuildingOver(userId: string): boolean {
        return this.getPlayerBuildingInfo(userId).length > this.MaxBuildingNum;
    }

    /** 存入玩家的 */
    private pushNewBuildingIntoMap(buildingInfo: BuildingInfo) {
        const userId = buildingInfo.creatorId;
        const buildingInfoList = this.getPlayerBuildingInfo(userId);
        buildingInfoList.push(buildingInfo);
        this.playerBuildingInfoMap.set(userId, buildingInfoList);
    }

    /**
     *  创建建筑
     * @param info
     * @param playerId
     */
    async net_createBuilding(infos: BuildingInfo[], uId?: string) {
        if (!uId) uId = this.currentPlayer.userId;
        // console.log("net_createBuilding", JSON.stringify(infos), uId);
        const updateInfos: BuildingInfo[] = [];
        for (let info of infos) {

            // 如果有建造者信息
            if (!StringUtil.isEmpty(info.creatorId)) {
                // 先看是否建筑超限
                if (this.net_checkBuildingOver(info.creatorId)) {
                    return;
                }
                this.pushNewBuildingIntoMap(info);
            }

            if (!info.uuid) info.uuid = `${uId}_${uuid++}_${Date.now()}`;
            this.buildingInfoMap.set(info.uuid, info);


            // 在家的话，保存当前建筑
            if (!StringUtil.isEmpty(info.ownerId)) {
                this.getDataInfo(info.ownerId).addBuilding(info);
            }

            // 父子节点添加联系
            if (info.parentUUID) {
                const parent = this.buildingInfoMap.get(info.parentUUID);
                if (parent) {
                    parent.childrenUUIDs.push(info.uuid);
                }
            }

            updateInfos.push(info);

            // 创建建筑实例
            const building = await BuildingFactory.createBuilding(info);
            this.buildingMap.set(info.uuid, building);
        }
        Player.getAllPlayers().forEach((player) => {
            this.getUpdateInfo(player.playerId).push(...updateInfos);
        });
    }

    /**
     * 移除建筑
     * @param uuid
     */
    net_removeBuilding(uuids: string[]) {
        console.log("net_removeBuilding", uuids);
        const updateInfos: BuildingInfo[] = [];
        const removeUUIds: string[] = [];
        for (let i = 0; i < uuids.length; i++) {
            const uuid = uuids[i];
            this.spawner.forEach(spawn => spawn.checkRemove(uuid));
            const info = this.buildingInfoMap.get(uuid);
            if (!info) continue;

            if (!StringUtil.isEmpty(info.creatorId)) {
                const ownerId = info.creatorId;
                const plyerBuildingInfo = this.getPlayerBuildingInfo(ownerId);
                let index = plyerBuildingInfo.indexOf(info);
                if (index != -1) {
                    plyerBuildingInfo.splice(index, 1);
                    this.playerBuildingInfoMap.set(ownerId, plyerBuildingInfo);
                }
            }

            this.buildingInfoMap.delete(uuid);
            removeUUIds.push(uuid);

            // 父子节点删除联系
            if (info.parentUUID) {
                const parent = this.buildingInfoMap.get(info.parentUUID);
                if (parent) {
                    const index = parent.childrenUUIDs.indexOf(info.uuid);
                    if (index >= 0) {
                        parent.childrenUUIDs.splice(index, 1);
                    }
                    updateInfos.push(parent);
                }
            }
            if (info.childrenUUIDs.length > 0) {
                for (let childUUID of info.childrenUUIDs) {
                    const child = this.buildingInfoMap.get(childUUID);
                    if (child) {
                        child.parentUUID = null;
                        this.checkBuildingDown(child, info.uuid, updateInfos, removeUUIds);
                    }
                }
            }

            // 在家的话，删除当前建筑
            if (false == StringUtil.isEmpty(info.ownerId)) {
                this.getDataInfo(info.ownerId).removeBuilding(uuid);
            }

            // 移除建筑实例
            if (this.buildingMap.has(uuid)) {
                const building = this.buildingMap.get(uuid);
                building.release();
                this.buildingMap.delete(uuid);
            }
        }
        updateInfos.forEach(info => {
            if (false == StringUtil.isEmpty(info.ownerId)) {
                this.getDataInfo(info.ownerId).addBuilding(info);
            }
        });
        Player.getAllPlayers().forEach(player => {
            let arr = this.getUpdateInfo(player.playerId);
            if (!arr) {
                arr = [];
            }
            arr.push(...updateInfos);
            for (let i = arr.length - 1; i >= 0; i--) {
                if (removeUUIds.includes(arr[i].uuid)) {
                    arr.splice(i, 1);
                }
            }
        });
        this.getAllClient().net_removeInfos(removeUUIds);
    }

    /**
     * 伤害建筑
     * @param uuid
     * @param hpChange
     * @returns
     */
    net_ChangeBuildingHP(uuid: string, hpChange: number) {
        const info = this.buildingInfoMap.get(uuid);
        if (!info) return;
        hpChange = Math.ceil(hpChange);
        console.log("tryHurt", hpChange, JSON.stringify(info));
        const cfg = BuildingHelper.getBuildCfgByItemId(info.itemId);
        if (hpChange < 0 && !cfg.canAttack) {
            console.log("canAttack is false");
            return;
        }
        info.hp += hpChange;

        // 建筑被摧毁
        if (info.hp <= 0) {

            EffectService.playAtPosition(cfg.effectGuid, info.pos.clone().add(cfg.effectOffset), {scale: cfg.effectZoom});
            this.net_removeBuilding([uuid]);
            return;
        }

        // 更新建筑信息
        this.updateMap.forEach((arr, playerId) => {
            arr.push(info);
        });

        // 更新家园建筑
        if (false == StringUtil.isEmpty(info.ownerId)) {
            this.getDataInfo(info.ownerId).addBuilding(info);
        }

        // 更新建筑实例
        const building = this.buildingMap.get(uuid);
        if (building) {
            building.updateInfo(info);
        }
    }

    /**
     *  检测建筑掉落
     * @param info
     * @param oldParentUUID
     * @param changeArr
     * @param removeArr
     * @returns
     */
    private async checkBuildingDown(info: BuildingInfo, oldParentUUID: string, changeArr: BuildingInfo[], removeArr: string[]) {
        const pos = info.pos;
        const exUUID: string[] = [];
        exUUID.push(oldParentUUID);
        exUUID.push(...this.getAllChildrenUUId(info));
        // 射线检测
        const res = QueryUtil.lineTrace(pos.clone().add(Vector.down.multiply(-100)), pos.clone().add(Vector.down.multiply(4000)), true, true);
        for (let hit of res) {
            if (BuildingEditorHelper.defaultExclude(hit.gameObject)) continue;

            const hitBuilding = BuildingHelper.tryGetBuildingByGO(hit.gameObject);
            if (hitBuilding && exUUID.includes(hitBuilding.info.uuid)) continue;
            if (hitBuilding && hitBuilding.info.ownerId != info.ownerId) continue;
            const offsetPos = hit.impactPoint.subtract(info.pos);

            this.updatePos(info, offsetPos, changeArr);
            if (hitBuilding) {
                info.parentUUID = hitBuilding.info.uuid;
                hitBuilding.info.childrenUUIDs.push(info.uuid);
            }
            return;
        }

        // 没有找到，说明在空中
        console.error("MyTypeError not find ground ", JSON.stringify(info));
        removeArr.push(info.uuid);

    }

    /**
     *  更新建筑位置
     * @param info
     * @param pos
     * @param changeArr
     */
    private updatePos(info: BuildingInfo, pos: Vector, changeArr: BuildingInfo[]) {
        info.pos = info.pos.add(pos);
        changeArr.push(info);
        info.childrenUUIDs.forEach(uuid => {
            const child = this.buildingInfoMap.get(uuid);
            if (child) {
                this.updatePos(child, pos, changeArr);
            }
        });

        // 在家的话，更新家里的位置,保存当前建筑
        if (!StringUtil.isEmpty(info.ownerId) && info.homePos != null && info.homePos.add) {
            info.homePos = info.homePos.add(pos);
            this.getDataInfo(info.ownerId).addBuilding(info);
        }

        // 更新建筑实例
        if (this.buildingMap.has(info.uuid)) {
            const building = this.buildingMap.get(info.uuid);
            building.updateInfo(info);
        }
    }

    /**
     *  获取所有子节点的uuid
     * @param info
     * @returns
     */
    private getAllChildrenUUId(info: BuildingInfo) {
        const uuids = [];
        uuids.push(info.uuid);
        info.childrenUUIDs.forEach(uuid => {
            const child = this.buildingInfoMap.get(uuid);
            if (child) {
                uuids.push(...this.getAllChildrenUUId(child));
            }
        });
        return uuids;
    }

    /** 用于获取水果的剩余时间 */
    public fruitArr: BuildingSpawner[] = [];

    /**
     * 获取水果的刷新时间
     * @returns 水果的刷新时间
     */
    public net_getNearFruitTime(): number {
        let restTime = 0;
        let isSpawning = false;
        this.fruitArr.forEach(e => {
            if (e.isStopSpawn) {
                return;
            }
            if (e.restTime < restTime || !isSpawning) {
                restTime = e.restTime;
                isSpawning = true;
            }
        });
        if (!isSpawning) {
            return 0;
        }
        return restTime;
    }

    /**
     * 设置玩家访客属性.
     * @param {number} playerId
     * @param {boolean} isVisitor
     */
    public setIsVisitor(playerId: number, isVisitor: boolean) {
        this.visitorMap.set(playerId, isVisitor);
    }

    public async visitTo(player: Player, targetUserId: string) {
        const roomInfo = await TeleportService.asyncGetPlayerRoomInfo(targetUserId);
        if (!roomInfo) return "Player is not online.";
        if (roomInfo.roomId === RoomService.getRoomId()) {
            this.setIsVisitor(player.playerId, true);
            ModuleService.getModule(HomeModuleS).transportPlayerToHome(player, targetUserId);
            return "Visit player directly.";
        } else {
            const result = await TeleportService.asyncTeleportToRoom(roomInfo.roomId, [player.userId], {
                teleportData: JSON.stringify({
                    isVisitor: true,
                    visitorTo: targetUserId
                } as HsTeleportData)
            });

            return "try teleporting to player's room. result: " + result;
        }
    }

    public exitVisit(player: Player) {
        this.setIsVisitor(player.playerId, false);
        ModuleService.getModule(HomeModuleS).transportPlayerToHome(player, player.userId);
    }
}

