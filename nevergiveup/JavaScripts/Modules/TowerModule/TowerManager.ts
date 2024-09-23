/*
 * @Author: shifu.huang
 * @Date: 2023-12-05 14:06:33
 * @LastEditors: shifu.huang
 * @LastEditTime: 2024-01-09 15:56:03
 * @FilePath: \nevergiveup\JavaScripts\Modules\TowerModule\TowerManager.ts
 * @Description: 修改描述
 */
import { TowerActions } from "../../Actions";
import { MapManager } from "../../MapScript";
import Utils from "../../Utils";
import { GameConfig } from "../../config/GameConfig";
import { Point, QuadTree, Rectangle } from "../../tool/QuadTree";
import { SoundUtil } from "../../tool/SoundUtil";
import PlayerModuleC from "../PlayerModule/PlayerModuleC";
import AttackTower from "./Tower/AttackTower";
import BuffTower from "./Tower/BuffTower";
import FarmTower from "./Tower/FarmTower";
import ThrowTower from "./Tower/ThrowTower";
import TowerBase from "./Tower/TowerBase";
import { TowerInfo, TowerType } from "./TowerEnum";

export namespace TowerManager {
    export let towerMap: Map<number, TowerBase> = new Map();
    export let myTowerCount: number = 0;
    export let sourceTowerCount: number = 0;
    let quadTree: QuadTree;

    export function init() {}

    export function findTowers(position: number[], radius: number) {
        return queryTowers(position[0], position[1], radius, radius);
    }

    export function createTower(info: TowerInfo, playerId: number = null) {
        if (SystemUtil.isServer()) return;
        if (!MapManager.getPositionFromId(info.placeID)) return;
        let cfg = GameConfig.Tower.getElement(info.configID);
        if (!cfg) return;
        let tower: TowerBase = null;
        SoundUtil.PlaySoundById(2005);
        switch (cfg.type) {
            case TowerType.Attack:
                tower = new AttackTower(info);
                break;
            case TowerType.Buff:
                tower = new BuffTower(info);
                break;
            case TowerType.Farm:
                tower = new FarmTower(info);
                break;
            case TowerType.Throw:
                tower = new ThrowTower(info);
                break;
            default:
                break;
        }
        towerMap.set(info.placeID, tower);
        ModuleService.getModule(PlayerModuleC).onTowerBuild(cfg.elementTy);
        TowerActions.onCreateTower.call(info.placeID);
        TowerActions.onTowerBuild.call(cfg.elementTy);
        if (Utils.isLocalPlayer(info.playerID)) {
            updateMyTouwerCount();
        }
    }

    function updateMyTouwerCount() {
        //获取towerMap里面tower的playerid是本地玩家的
        let playerID = Player.localPlayer.playerId;
        let count = 0;
        towerMap.forEach((value) => {
            if (value.info.playerID === playerID) {
                count++;
            }
        });
        myTowerCount = count;

        let sourceCount = 0;
        const sourceTower = GameConfig.Tower.getAllElement()
            .filter((o) => o.type === 3)
            .map((i) => i.id);
        towerMap.forEach((value) => {
            if (value.info.playerID === playerID && sourceTower.includes(value.info.configID)) {
                sourceCount++;
            }
        });
        sourceTowerCount = sourceCount;
        TowerActions.onMyTowerCountChanged.call(myTowerCount);
        TowerActions.onSourceTowerCountChanged.call(sourceTowerCount);
    }

    export function upgradeTower(info: TowerInfo, playerId: number = null) {
        if (SystemUtil.isServer()) return;

        let tower = towerMap.get(info.placeID);
        if (tower) {
            const targetLevel = Math.max(info.level, tower.level);
            if (info.playerID === Player.localPlayer.playerId) {
                ModuleService.getModule(PlayerModuleC).onLevelUp(targetLevel);
            }
            tower.level = targetLevel;
            TowerActions.onUpgradeTower.call(info.placeID);
        }
    }

    export function getTowerByPlaceID(placeID: number): TowerBase {
        return towerMap?.get(placeID);
    }

    export function destroyTower(placeID: number) {
        if (SystemUtil.isServer()) return;
        if (!towerMap.has(placeID)) return;
        let tower = towerMap.get(placeID);
        tower.onDestroy();
        towerMap.delete(placeID);
        Utils.isLocalPlayer(tower.info.playerID) && updateMyTouwerCount();
    }

    export function destroyAllTower() {
        if (SystemUtil.isServer()) return;
        for (let tower of towerMap.values()) {
            tower.onDestroy();
        }
        towerMap.clear();
        towerMap = null;
        towerMap = new Map();
        updateMyTouwerCount();
    }

    export function destroyTowerByPlayer(player: Player) {
        if (SystemUtil.isServer()) return;
        let placeIDs = [];
        for (let tower of towerMap.values()) {
            if (tower.info.playerID == player.playerId) {
                placeIDs.push(tower.info.placeID);
            }
        }
        for (let placeID of placeIDs) {
            destroyTower(placeID);
        }
    }

    export function hasTower(placeID: number): boolean {
        if (SystemUtil.isServer()) return;
        return towerMap.has(placeID);
    }

    export function onUpdate(dt) {
        let bounds = MapManager.getBounds();
        if (bounds) {
            let [x, y, w, h] = bounds;
            quadTree = new QuadTree(new Rectangle(x, y, w, h), 4);
        } else {
            quadTree = null;
        }
        for (let tower of towerMap.values()) {
            if (quadTree && tower && tower.oriPos) {
                let towerPos = tower.oriPos;
                quadTree.insert(new Point(towerPos.x, towerPos.y, tower));
            }
        }
        // console.log('hsfquadTree====================== ', (quadTree))
        for (let tower of towerMap.values()) {
            tower.onUpdate(dt);
        }
    }

    export function queryTowers(x: number, y: number, w: number, h) {
        if (!quadTree) return [];
        return quadTree.query(new Rectangle(x, y, w, h)).map((point) => point.obj as TowerBase);
    }
}
