/*
 * @Author: shifu.huang
 * @Date: 2023-12-20 13:38:27
 * @LastEditors: shifu.huang
 * @LastEditTime: 2023-12-20 16:18:20
 * @FilePath: \nevergiveup\JavaScripts\Actions.ts
 * @Description: 修改描述
 */
/**
 * @Author       : xiaohao.li
 * @Date         : 2023-12-10 16:02:00
 * @LastEditors  : xiaohao.li
 * @LastEditTime : 2024-01-09 16:24:34
 * @FilePath     : \nevergiveup\JavaScripts\Actions.ts
 * @Description  : 修改描述
 */
import { RankItem } from "./Rank/RankManager";
import { ElementEnum, Enemy } from "./enemy/EnemyBase";
import { StageS } from "./stage/Stage";

export const CardActions = {
    onCardChanged: new Action1<number>(),
};
export const EnemyActions = {
    onDie: new Action1<Enemy>(),
    onEscaped: new Action1<Enemy>(),
    onBossSpawned: new Action1<Enemy>(),
    onBossHpChanged: new Action1<Enemy>(),
    onBossDie: new Action1<Enemy>(),
};
export const StageActions = {
    onStageStateChanged: new Action(),
    onHPChanged: new Action1<number>(),
    onStageEnd: new Action1<StageS>(),
    onGoldChanged: new Action1<number>(),
    onSpeedMultiplierChanged: new Action1<number>(),
    onMapLoaded: new Action(),
    onStageCreated: new Action1<number>(),
    onStageEndClient: new Action1<number>(),
    onPlayerCountChanged: new Action1<number>(),
    onStageWin: new Action1<number>(),
    onStagePerfectWin: new Action1<number>(),
    onStageComplete: new Action1<number>(),
    onPlayerLeaveStage: new Action1<Player>(),
    onTalentActivate: new Action1<number>(),
};
export const StageTriggerActions = {};

export const PlayerActions = {
    onPlayerDataChanged: new Action(),
    onPlayerDisplayNameFinishedS: new Action1<number>(),
    onPlayerNameChanged: new Action2<Player, string>(),
    onPlayerLevelChangedServer: new Action2<Player, number>(),
    onPlayerLevelChangedClient: new Action1<number>(),
    // 这是任务系统的，上面的是原来逻辑的，不动原来
    onPlayerLevelChangedClient2: new Action1<number>(),
};

export const DialogActions = {
    onDialogEnd: new Action1<number>(),
};

export const TowerActions = {
    onCreateTower: new Action1<number>(),
    onMyTowerCountChanged: new Action1<number>(),
    onTowerSelected: new Action1<number>(),
    onUpgradeTower: new Action1<number>(),
    // 新的逻辑，老的不动
    onTowerBuild: new Action1<ElementEnum>(),
    onSourceTowerCountChanged: new Action1<number>(),
};

export const InteractActions = {
    onInteract: new Action2<string, number>(),
    onInteractEnd: new Action2<string, number>(),
};

export const RankActions = {
    onRankItemsChanged: new Action1<RankItem[]>(),
};
