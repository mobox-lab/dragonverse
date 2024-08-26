/*
 * @Author: shifu.huang
 * @Date: 2023-02-08 14:41:36
 * @LastEditors: shifu.huang
 * @LastEditTime: 2024-01-09 16:40:45
 * @FilePath: \nevergiveup\JavaScripts\Modules\TowerModule\TowerModuleS.ts
 * @Description:塔模块服务端
 */

import { StageActions } from '../../Actions';
import { GameManager } from "../../GameManager";
import { SettleState, StageS } from "../../stage/Stage";
import { TowerInfo } from "./TowerEnum";
import { TowerModuleC } from "./TowerModuleC";
import { TowerModuleData } from "./TowerModuleData";


/**
 * 玩家模块的服务端，提供各种属性数据的持久化接口
 */
export class TowerModuleS extends ModuleS<TowerModuleC, TowerModuleData> {

    private _stageMap: Map<StageS, TowerInfo[]> = new Map<StageS, TowerInfo[]>();

    protected onStart(): void {
        console.log('hsfTowerModuleS====================== 启动')
        StageActions.onStageEnd.add(this.onStageEnd, this);
        StageActions.onPlayerLeaveStage.add((player: Player) => {
            let stage = GameManager.getPlayerStage(player);
            if (stage) {
                let towerInfos = this._stageMap.get(stage);
                if (!towerInfos) return;
                towerInfos = towerInfos.filter(v => v.playerID != player.playerId);
                if (towerInfos.length > 0) {
                    this._stageMap.set(stage, towerInfos);
                } else {
                    this._stageMap.delete(stage);
                }
                let players = stage.players;
                players.forEach((p) => {
                    p.playerId != player.playerId && this.getClient(p).net_destroyTowerByPlayer(player);
                })
            }
        });
    }

    private onStageEnd(stage: StageS) {
        this.clearTowerMap(stage);
    }


    /**
     * 创建塔
     * @param info 塔的信息
     * @returns 
     */
    public net_createTower(info: TowerInfo): boolean {
        const stage = GameManager.getPlayerStage(this.currentPlayer);
        let towerInfos = this._stageMap.get(stage);
        if (towerInfos) {
            if (towerInfos.find(v => v.placeID == info.placeID) != null) {
                return false;
            }
            let playerIDs = GameManager.getStagePlayersServer(this.currentPlayer);
            playerIDs.forEach((playerID) => {
                this.getClient(playerID).net_createTower(info);
            })
            towerInfos.push(info);
        } else {
            towerInfos = [info];
            this._stageMap.set(stage, towerInfos);
            let playerIDs = GameManager.getStagePlayersServer(this.currentPlayer);
            playerIDs.forEach((playerID) => {
                this.getClient(playerID).net_createTower(info);
            })
        }
        return true;
    }

    /**
     * 创建塔
     * @param info 塔的信息
     * @returns 
     */
    @Decorator.noReply()
    public net_upgradeTower(info: TowerInfo, addLevel: number = 1): boolean {
        const stage = GameManager.getPlayerStage(this.currentPlayer);
        let towerInfos = this._stageMap.get(stage);
        if (towerInfos && (towerInfos.find(v => v.placeID == info.placeID))) {
            info.level += addLevel;
            let playerIDs = GameManager.getStagePlayersServer(this.currentPlayer);
            playerIDs.forEach((playerID) => {
                this.getClient(playerID).net_upgradeTower(info);
            })
            return true;
        }
        return false;
    }


    /**
     * 销毁塔
     * @param placeID 塔的placeid
     * @returns 
     */
    @Decorator.noReply()
    public net_destroyTower(placeID: number) {
        const stage = GameManager.getPlayerStage(this.currentPlayer);
        let towerInfos = this._stageMap.get(stage);
        if (towerInfos && (towerInfos.find(v => v.placeID == placeID) != null)) {
            let playerIDs = GameManager.getStagePlayersServer(this.currentPlayer);
            playerIDs.forEach((playerID) => {
                this.getClient(playerID).net_destroyTower(placeID);
            })
            towerInfos.splice((towerInfos.findIndex(v => v.placeID == placeID)), 1); //删除塔
            return true;
        }
        return false;
    }

    /**
     * 清空某一局的塔的id
     */
    private clearTowerMap(stage: StageS) {
        if (stage) {
            if (this._stageMap.has(stage)) {
                let placeIDS = this._stageMap.get(stage);
                placeIDS = [];
                this._stageMap.delete(stage);
            }
        }
    }

    /** 提前结束 */
    public net_earlySettle() {
        if(!this.currentPlayer) return;
        const stage = GameManager.getPlayerStage(this.currentPlayer);
        if (stage) {
            stage["_fsm"].changeState(SettleState);
        }
    }
}