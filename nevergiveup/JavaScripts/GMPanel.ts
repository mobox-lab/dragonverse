/*
 * @Author: shifu.huang
 * @Date: 2023-12-15 15:44:09
 * @LastEditors: shifu.huang
 * @LastEditTime: 2024-01-23 10:24:14
 * @FilePath: \nevergiveup\JavaScripts\GMPanel.ts
 * @Description: 修改描述
 */
import { AddGMCommand, GMBasePanel } from "module_gm";
import { GameManager } from "./GameManager";
import { GuideManager } from "./Guide/GuideManager";
import PlayerModuleC from "./Modules/PlayerModule/PlayerModuleC";
import { PlayerModuleS } from "./Modules/PlayerModule/PlayerModuleS";
import { GuideDialog } from "./UI/UIDialog";
import { SettleState } from "./stage/Stage";
import { UISettle } from "./stage/ui/UISettle";
import GMHUD_Generate from "./ui-generate/gmModule/GMHUD_generate";
import GMItem_Generate from "./ui-generate/gmModule/GMItem_generate";
import { UIMain } from "./stage/ui/UIMain";
import { Config } from "./GameStart";
import { TowerModuleC } from "./Modules/TowerModule/TowerModuleC";
import { TowerManager } from "./Modules/TowerModule/TowerManager";
import { MapManager } from "./MapScript";
import { AirdropManager } from "./Airdrop/AirdropManager";

export class GMPanel extends GMBasePanel<GMHUD_Generate, GMItem_Generate> {
    constructor() {
        super(GMHUD_Generate, GMItem_Generate);
    }
}

// AddGMCommand("获取队伍", (player, value) => {
//     console.log(GameManager.getStagePlayersClient());
// }, (player) => {
//     console.log(GameManager.getStagePlayersServer(player));
// }, "测试");

AddGMCommand("2倍速速度", (player, value) => {
    UIService.getUI(UIMain).maxSpeed = +value;
}, (player) => {
}, "测试");


AddGMCommand("结束游戏", () => {
    let gameID = GameManager.getStageClient().id;
    Event.dispatchToServer("gmEndGame", gameID);
}, (player, value: string) => {

}, Keys.E);

// AddGMCommand("刷一波怪", () => {

// }, () => {
//     Event.dispatchToAllClient("addWave");
// });

AddGMCommand("打开粒子", (player, value) => {
    console.log(!!+value, "testttt");
    GameManager.useEffect = !!+value;
});

AddGMCommand("增加局外金币", () => {
}, (player, value: string) => {
    ModuleService.getModule(PlayerModuleS).changeGold(player, +value ? +value : 100);
});

AddGMCommand("增加局内金币", (player, value) => {
    GameManager.addGold(+value);
});

// AddGMCommand("显示结算面板", (player, value) => {
//     UIService.show(UISettle, {
//         hasWin: false,
//         time: 100,
//         waves: 20,
//         wavesMax: 20,
//         reward: [{ guid: "124664", amount: 100 }, { guid: "47596", amount: 500 }]
//     });
// }, null, "结算");

AddGMCommand("进入结算", null, (player: Player) => {
    let stage = GameManager.getPlayerStage(player);
    if (stage) {
        stage["_fsm"].changeState(SettleState);
    }
});

// AddGMCommand("显示对话", () => {
//     GuideDialog.show();
// }, null, "引导");

AddGMCommand("加经验", () => {

}, (player: Player, value: string) => {
    ModuleService.getModule(PlayerModuleS).changeExp(player, +value);
});

// AddGMCommand("对话测试", (player, value) => {
//     let str = value;
//     GameManager.boardcastMessage(str);
// });

AddGMCommand("跳过引导", () => {
    GuideManager.skip();
}, null, "引导", Keys.C);

AddGMCommand("增加科技点", () => {
}, (player, value: string) => {
    ModuleService.getModule(PlayerModuleS).changeTechPoint(player, +value ? +value : 100);
}, "科技树", Keys.E);

AddGMCommand("增加试用塔", (player, value: string) => {
    ModuleService.getModule(TowerModuleC).addTryTower(+value ? +value : 1001);
}, (player, value: string) => {
});

AddGMCommand("生成空投", (player, value: string) => {
    let pos = MapManager.getRandLandPos();
    AirdropManager.createAirdrop(+value ? +value : 1001, new Vector(pos[0], pos[1], pos[2]));
}, (player, value: string) => {
});

AddGMCommand("增加Buff", (player, value: string) => {
    TowerManager.towerMap?.forEach(tower => {
        if (tower.cfg.type == 1) {
            tower.applyBuff(+value ? +value : 3001);
        }
    })
}, (player, value: string) => {
});