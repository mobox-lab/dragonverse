/*
 * @Author: shifu.huang
 * @Date: 2023-12-15 15:44:09
 * @LastEditors: shifu.huang
 * @LastEditTime: 2024-01-23 10:24:14
 * @FilePath: \nevergiveup\JavaScripts\GMPanel.ts
 * @Description: 修改描述
 */
import { GameManager } from "./GameManager";
import { GuideManager } from "./Guide/GuideManager";
import { PlayerModuleS } from "./Modules/PlayerModule/PlayerModuleS";
import { SettleState } from "./stage/Stage";
import { UIMain } from "./stage/ui/UIMain";
import { TowerModuleC } from "./Modules/TowerModule/TowerModuleC";
import { TowerManager } from "./Modules/TowerModule/TowerManager";
import { MapManager } from "./MapScript";
import { AirdropManager } from "./Airdrop/AirdropManager";
import { addGMCommand } from "mw-god-mod";
import { GameConfig } from "./config/GameConfig";
import TalentModuleS from "./Modules/talent/TalentModuleS";
import { Wave, WaveManager } from "./stage/Wave";
import { TaskModuleC } from "./Modules/taskModule/TaskModuleC";

// new GMPanel
addGMCommand(
    "2倍速速度",
    "number",
    (value) => {
        UIService.getUI(UIMain).maxSpeed = +value;
    },
    undefined,
    undefined,
    "测试"
);

addGMCommand(
    "结束游戏",
    "void",
    () => {
        let gameID = GameManager.getStageClient().id;
        Event.dispatchToServer("gmEndGame", gameID);
    },
    () => {},
    undefined,
    undefined
);

addGMCommand(
    "清空日常任务",
    "void",
    () => {
        ModuleService.getModule(TaskModuleC).clearDaily(true);
    },
    () => {},
    undefined,
    undefined
);

addGMCommand("打开粒子", "string", (value) => {
    console.log(!!+value, "testttt");
    GameManager.useEffect = !!+value;
});

addGMCommand(
    "增加局外金币",
    "string",
    () => {},
    (player: mw.Player, value: string) => {
        ModuleService.getModule(PlayerModuleS).changeGold(player, +value ? +value : 100);
    }
);

addGMCommand(
    "刷一波怪物",
    "string",
    (value: string) => {
        const data = value.split(",");
        const monster = data?.[0] ? Number(data?.[0]) : 1031;
        const count = data?.[1] ? Number(data?.[1]) : 1;
        const spawnInterval = data?.[2] ? Number(data?.[2]) : 5;
        const hpMultiplier = data?.[3] ? Number(data?.[3]) : 1;
        const wave = {
            enemies: [{ type: monster, count, spawnInterval }],
            waveGold: 0,
            waveTime: 99999,
            hpMultiplier,
        };
        WaveManager.addWave(new Wave(wave));
    },
    () => {},
    undefined,
    undefined
);

addGMCommand("增加局内金币", "string", (value) => {
    if (value) {
        GameManager.addGold(+value);
    } else {
        GameManager.addGold(+100000);
    }
});

addGMCommand("进入结算", "string", undefined, (player: Player) => {
    let stage = GameManager.getPlayerStage(player);
    if (stage) {
        stage["_fsm"].changeState(SettleState);
    }
});

addGMCommand(
    "加经验",
    "number",
    () => {},
    (player: Player, value: number) => {
        ModuleService.getModule(PlayerModuleS).changeExp(player, +value);
    }
);

addGMCommand(
    "跳过引导",
    "void",
    () => {
        GuideManager.skip();
    },
    undefined,
    undefined,
    "引导"
);

addGMCommand(
    "增加科技点",
    "string",
    () => {},
    (player, value: string) => {
        ModuleService.getModule(PlayerModuleS).changeTechPoint(player, +value ? +value : 100);
    },
    undefined,
    "科技树"
);

addGMCommand(
    "增加试用塔",
    "string",
    (value: string) => {
        ModuleService.getModule(TowerModuleC).addTryTower(+value ? +value : 1001);
    },
    (player, value: string) => {}
);

addGMCommand(
    "生成空投",
    "string",
    (value: string) => {
        let pos = MapManager.getRandLandPos();
        AirdropManager.createAirdrop(+value ? +value : 1001, new Vector(pos[0], pos[1], pos[2]));
    },
    (player, value: string) => {}
);

addGMCommand(
    "增加Buff",
    "string",
    (value: string) => {
        TowerManager.towerMap?.forEach((tower) => {
            if (tower.cfg.type == 1) {
                tower.applyBuff(+value ? +value : 3001);
            }
        });
    },
    (player, value: string) => {}
);

addGMCommand(
    "修改天赋数等级",
    "string",
    null,
    (player, params) => {
        const talentE = GameConfig.TalentTree.getAllElement();
        const talentS = ModuleService.getModule(TalentModuleS);
        if (params && params.includes("-")) {
            const [id, level] = params.split("-").map((item) => parseInt(item));
            if (!isNaN(id) && !isNaN(level) && level >= 0) {
                const talentItemE = GameConfig.TalentTree.getElement(id);
                if (talentItemE) {
                    talentS.setTalent(player, talentItemE.id, Math.min(level, talentItemE.maxLevel)).then();
                    talentS.updatePlayerTalent(player, talentItemE.id);
                }
            }
        }
        let resultStr = "";
        for (let i = 0; i < talentE.length; i += 2) {
            resultStr += `${talentE[i].id}-${talentE[i].nameCN}-${talentS.getPlayerTalentIndex(
                player.userId,
                talentE[i].id
            )}`;
            resultStr += talentE[i + 1]
                ? `  ${talentE[i + 1].id}-${talentE[i + 1].nameCN}-${talentS.getPlayerTalentIndex(
                      player.userId,
                      talentE[i + 1].id
                  )}\n`
                : "\n";
        }
        return resultStr;
    },
    {
        label: "天赋ID-天赋等级, 不清楚ID可直接点Run",
    }
);

// AddGMCommand("获取队伍", (player, value) => {
//     console.log(GameManager.getStagePlayersClient());
// }, (player) => {
//     console.log(GameManager.getStagePlayersServer(player));
// }, "测试");

// AddGMCommand("刷一波怪", () => {

// }, () => {
//     Event.dispatchToAllClient("addWave");
// });

// AddGMCommand("显示结算面板", (player, value) => {
//     UIService.show(UISettle, {
//         hasWin: false,
//         time: 100,
//         waves: 20,
//         wavesMax: 20,
//         reward: [{ guid: "124664", amount: 100 }, { guid: "47596", amount: 500 }]
//     });
// }, null, "结算");

// AddGMCommand("显示对话", () => {
//     GuideDialog.show();
// }, null, "引导");

// AddGMCommand("对话测试", (player, value) => {
//     let str = value;
//     GameManager.boardcastMessage(str);
// });
