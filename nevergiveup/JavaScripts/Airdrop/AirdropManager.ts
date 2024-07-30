/*
 * @Author: shifu.huang
 * @Date: 2024-01-17 17:30:48
 * @LastEditors: shifu.huang
 * @LastEditTime: 2024-01-25 15:45:09
 * @FilePath: \nevergiveup\JavaScripts\Airdrop\AirdropManager.ts
 * @Description: 修改描述
 */

import { StageActions } from "../Actions";
import { GameManager } from "../GameManager";
import { PlayerModuleS } from "../Modules/PlayerModule/PlayerModuleS";
import { TowerManager } from "../Modules/TowerModule/TowerManager";
import { TowerModuleC } from "../Modules/TowerModule/TowerModuleC";
import { EStageState } from "../StageEnums";
import { TipsManager } from "../UI/Tips/CommonTipsManagerUI";
import { LastWaveTipsUI } from "../UI/Tips/LastWaveTipsUI";
import { GameConfig } from "../config/GameConfig";
import { MGSTool } from "../tool/MGSTool";
import { DropConfig, DropType } from "./Airdrop";

export enum AirdropEvent {
    OnPickedCC = "OnPickedCCAirdropEvent",
    OnPickedC2S = "OnPickedC2SAirdropEvent",
    OnPickedS2C = "OnPickedS2CAirdropEvent",
    OnCreate = "OnCreateAirdropEvent",
}

export enum PropType {

}

export namespace AirdropManager {
    let airdrops: GameObject[];
    export let gameGold: number;
    export function init() {
        if (SystemUtil.isServer()) {
            Event.addClientListener(AirdropEvent.OnPickedC2S, (player: Player, cfg: DropConfig) => {
                switch (cfg.dropType) {
                    case DropType.Buff://广播buff
                        let players: number[] = GameManager.getStagePlayersServer(player);
                        for (let i = 0; i < players?.length; i++) {
                            Event.dispatchToClient(Player.getPlayer(players[i]), AirdropEvent.OnPickedS2C, cfg);
                        }
                        break;
                    case DropType.Gold:
                        ModuleService.getModule(PlayerModuleS).changeGold(player, cfg.count);
                        break;
                    default: break;
                }
            })
        } else {
            airdrops = [];
            gameGold = 0;
            Event.addServerListener(AirdropEvent.OnCreate, createAirdrop.bind(this));
            Event.addLocalListener(AirdropEvent.OnCreate, createAirdrop.bind(this));
            Event.addLocalListener(AirdropEvent.OnPickedCC, pickAirdropFromLocal.bind(this));
            Event.addServerListener(AirdropEvent.OnPickedS2C, pickAirdrop.bind(this));
            StageActions.onStageStateChanged.add(onStageStateChanged.bind(this));
        }
    }

    /**
     * 状态切换回调
     * @param state 状态
     */
    function onStageStateChanged(state: EStageState, waitTime: number, wave: number) {
        switch (state) {
            case EStageState.End:
                gameGold = 0;
                break;
            case EStageState.Settle:
                for (let i = 0; i < airdrops.length; i++) {
                    destroyAirdrop(airdrops[i--]);
                }
                airdrops = [];
                break;
            default: break;
        }
    }


    export function createAirdrop(id: number, position: Vector, players: Player[] = []) {
        let cfg = GameConfig.Airdrop.getElement(id);
        if (!cfg) {
            console.log('hsf====================== ', (id) + ' 空投表异常')
            return;
        }
        let guid = cfg.guid;
        if (SystemUtil.isServer()) {
            if (players.length > 0) {
                players.forEach(player => {
                    Event.dispatchToClient(player, AirdropEvent.OnCreate, guid, position)
                })
            }
        } else {
            TipsManager.showWaveTips(GameConfig.Language.getElement("Text_AirdropComing").Value, 64, () => {
                UIService.hide(LastWaveTipsUI);
            });
            GameObject.asyncSpawn(guid).then((go: GameObject) => {
                if (!go) return;
                go.worldTransform.position = position;
                airdrops.push(go);
            })
        }
    }

    function pickAirdropFromLocal(dropCfg: DropConfig, go: GameObject) {
        if (SystemUtil.isServer()) return;
        let index = airdrops.indexOf(go);
        let str = "";
        if (index >= 0) {
            let count = ""
            switch (dropCfg.dropType) {
                case DropType.Tower://本地处理，不需要RPC
                    //加一个试用塔
                    ModuleService.getModule(TowerModuleC).addTryTower(dropCfg.dropId, dropCfg.count);
                    let cfgTower = GameConfig.Tower.getElement(dropCfg.dropId);
                    str = " " + cfgTower.name + " x1";
                    count = dropCfg.dropId.toString();
                    break;
                case DropType.InGameGold://本地处理，不需要RPC
                    //TODO 本地加钱
                    GameManager.addGold(dropCfg.count, go?.worldTransform?.position);
                    str = GameConfig.Language.getElement("Text_AirdropGainInGameGold").Value.replace("{0}", dropCfg.count.toString());
                    count = dropCfg.count.toString();
                    break;
                case DropType.Buff://广播处理，需要RPC
                    Event.dispatchToServer(AirdropEvent.OnPickedC2S, dropCfg);
                    let cfgBuff = GameConfig.Buff.getElement(dropCfg.dropId);
                    str = " " + cfgBuff.buffName + " " + GameConfig.Language.getElement("Text_AirdropGainBuff").Value.replace("{0}", dropCfg.count.toString());
                    count = dropCfg.dropId.toString();
                    break;
                case DropType.Gold://局外金币，需要RPC
                    gameGold += dropCfg.count;
                    Event.dispatchToServer(AirdropEvent.OnPickedC2S, dropCfg);
                    str = GameConfig.Language.getElement("Text_AirdropGainCash").Value.replace("{0}", dropCfg.count.toString());
                    count = dropCfg.count.toString();
                    break;
                default: break;
            }
            airdrops.splice(index, 1);
            destroyAirdrop(go);
            TipsManager.showTips(GameConfig.Language.getElement("Text_AirdropGainText").Value + str);
            let stage = GameManager.getStageClient();
            let currentStage = stage ? stage.stageCfgId : -1;
            MGSTool.getAirdrop(dropCfg.dropType, count, currentStage);
        }
    }

    function pickAirdrop(dropCfg: DropConfig) {
        if (SystemUtil.isServer()) return;
        switch (dropCfg.dropType) {
            case DropType.Buff:
                //加buff
                TowerManager.towerMap?.forEach(tower => {
                    if (tower.cfg.type == 1 || tower.cfg.type == 4) {
                        tower.applyBuff(dropCfg.dropId);
                    }
                })
                break;
            default: break;
        }
    }

    function destroyAirdrop(go: GameObject) {
        if (SystemUtil.isServer()) return;
        let index = airdrops.indexOf(go);
        if (index >= 0) {
            airdrops.splice(index, 1);
        }
        go.destroy();
    }

}

