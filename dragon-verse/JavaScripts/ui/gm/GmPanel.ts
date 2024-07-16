import Log4Ts from "../../depend/log4ts/Log4Ts";
import { BagModuleC, BagModuleS } from "../../module/bag/BagModule";
import { CompanionModule_C } from "../../module/companion/CompanionModule_C";
import { EventDefine } from "../../const/EventDefine";
import GameObject = mw.GameObject;
import { QuestModuleS } from "../../module/quest/QuestModuleS";
import { HeadUIController } from "../../controller/HeadUIController";
import GToolkit, { RandomGenerator } from "gtoolkit";
import MainCurtainPanel from "../main/MainCurtainPanel";
import GameServiceConfig from "../../const/GameServiceConfig";
import Gtk from "gtoolkit";
import GlobalTips from "../../depend/global-tips/GlobalTips";
import CutScenePanel from "../jump-game/CutScenePanel";
import { addGMCommand } from "mw-god-mod";

const PLAYER_START_GUID: string = "DC5A4E2B47A0C6E31572FE9882BE6861";

addGMCommand("调整鼠标灵敏度", "string", (value) => {
    KeyboardSimulation.setLookUpRateScale(Number(value));
});

addGMCommand(
    "Hello world",
    "string",
    () => {
        Log4Ts.log(addGMCommand, `Hello world`);
    },
    undefined,
    undefined,
    "CHello",
);

addGMCommand(
    "Prompt",
    "string",
    () => {
        GlobalTips.getInstance().showGlobalTips("hello world");
    },
    undefined,
    undefined,
    "MainPanel",
);

addGMCommand(
    "Show Curtain",
    "string",
    (value) => {
        if (GToolkit.isNullOrEmpty(value)) Event.dispatchToLocal(MainCurtainPanel.MAIN_HIDE_CURTAIN_EVENT_NAME);
        else Event.dispatchToLocal(MainCurtainPanel.MAIN_SHOW_CURTAIN_EVENT_NAME);
    },
    undefined,
    undefined,
    "MainPanel",
);

addGMCommand(
    "传送至地图左下点.",
    "string",
    undefined,
    (player, value) => {
        player.character.worldTransform.position = GameServiceConfig.MAP_SCENE_AS_MAP_LEFT_DOWN_POS;
    },
    undefined,
    "MainPanel",
);

addGMCommand(
    "传送至地图右上点.",
    "string",
    undefined,
    (player, value) => {
        player.character.worldTransform.position = GameServiceConfig.MAP_SCENE_AS_MAP_RIGHT_TOP_POS;
    },
    undefined,
    "MainPanel",
);

addGMCommand(
    "返回出生点",
    "string",
    undefined,
    (player) => {
        Log4Ts.log(addGMCommand, `Back to player start.`);
        player.character.worldTransform.position = GameObject.findGameObjectById(
            PLAYER_START_GUID,
        ).worldTransform.position;
    },
    undefined,
    "传送",
);

addGMCommand(
    "输出当前角色位置",
    "string",
    () => {
        Log4Ts.log(addGMCommand, `Print current player location:`, Player.localPlayer.character.worldTransform.position);
    },
    undefined,
    undefined,
    "探针",
);

addGMCommand(
    "输出当前角色旋转",
    "string",
    () => {
        Log4Ts.log(addGMCommand, `Print current player rotation:`, Player.localPlayer.character.worldTransform.rotation);
    },
    undefined,
    undefined,
    "探针",
);

addGMCommand(
    "设置宠物为参战(输入bagId)",
    "string",
    (index: string) => {
        let module = mwext.ModuleService.getModule(CompanionModule_C);
        module.showUpCompanion(Number(index), true);
    },
    (player: mw.Player, index: string) => {
    },
    undefined,
    "宠物龙",
);

addGMCommand(
    "增加物品",
    "string",
    undefined,
    (player, value) => {
        let splice = value.split(",");
        let id = Number(splice[0]);
        let count = splice[1] ? Number(splice[1]) : 1;
        Log4Ts.log(addGMCommand, `增加物品 ${value} ${count}个`);
        ModuleService.getModule(BagModuleS).addItem(player.playerId, id, Number(count));
    },
    undefined,
    "背包",
);

addGMCommand(
    "进入对话",
    "string",
    (value) => {
        Log4Ts.log(addGMCommand, `进入对话 ${value}`);
        // DialogueManager.getInstance().chat(1);
    },
    undefined,
    undefined,
    "对话",
);

addGMCommand(
    "测试背包龙",
    "string",
    (value) => {
        // ModuleService.getModule(QuestModuleC).updateRunningGameScore(Number(value));
    },
    () => {
    },
);

addGMCommand(
    "加或删光暗龙",
    "string",
    () => {
    },
    (player, value) => {
        ModuleService.getModule(QuestModuleS).testAddOrDeleteLightDarkDragon(player.playerId, Number(value));
    },
    undefined,
    "龙",
);

addGMCommand(
    "获取名字",
    "string",
    (value) => {
        console.log(HeadUIController.getInstance().getNickNameByPlayerId(Number(value)));
    },
    () => {
    },
);

addGMCommand(
    "跳宠物模拟器",
    "string",
    () => {
    },
    (player) => {
        const onFailed = (result: mw.TeleportResult) => {
            // 将错误信息发给所有参与的客户端
            for (const userId in result.userIds) {
                const player = Player.getPlayer(userId);
                if (player) {
                    Event.dispatchToClient(player, "onJumpGameFailed", result.message);
                    Log4Ts.log(addGMCommand, "onJumpGameFailed", result.message);
                }
            }
        };
        TeleportService.asyncTeleportToScene("pet-simulator", [player.userId]).then(() => {
        }, onFailed);
    },
);

addGMCommand(
    "跳Battle World",
    "string",
    () => {
    },
    (player) => {
        const onFailed = (result: mw.TeleportResult) => {
            // 将错误信息发给所有参与的客户端
            for (const userId in result.userIds) {
                const player = Player.getPlayer(userId);
                if (player) {
                    Event.dispatchToClient(player, "onJumpGameFailed", result.message);
                    Log4Ts.log(addGMCommand, "onJumpGameFailed", result.message);
                }
            }
        };
        TeleportService.asyncTeleportToScene("battleworld", [player.userId]).then(() => {
        }, onFailed);
    },
);

//#region TDD-Obby Coin & Ticket
addGMCommand(
    "触发每日领取 ObbyCoin",
    "string",
    undefined,
    (player) => {
        ModuleService.getModule(BagModuleS).dailyDrawObbyCoin(player.playerId);
    },
    undefined,
    "TTD",
);

addGMCommand(
    "刷新每日领取 ObbyCoin 时间",
    "string",
    () => {
        const data = ModuleService.getModule(BagModuleC)["data"];
        data.lastDailyObbyCoinDrawTime = 0;
    },
    (player) => {
        const data = ModuleService.getModule(BagModuleS)["getPlayerData"](player);
        data.lastDailyObbyCoinDrawTime = 0;
        data.save(false);
    },
    undefined,
    "TTD",
);

addGMCommand(
    "设置 ObbyCoin (9999)",
    "string",
    undefined,
    (player, value) => {
        const module = ModuleService.getModule(BagModuleS);
        const data = module["getPlayerData"](player);
        if (data) {
            data.obbyCoin = GToolkit.isNullOrEmpty(value) ? 9999 : Number(value);
            data.save(false);
            module.getClient(player).net_setObbyCoin(data.obbyCoin);
        }
    },
    undefined,
    "TTD",
);

addGMCommand(
    "触发每日领取 ObbyTicket",
    "string",
    undefined,
    (player) => {
        ModuleService.getModule(BagModuleS).dailyDrawObbyTicket(player.playerId);
    },
    undefined,
    "TTD",
);

addGMCommand(
    "刷新每日领取 ObbyTicket 时间",
    "string",
    () => {
        const data = ModuleService.getModule(BagModuleC)["data"];
        data.lastDailyObbyTicketDrawTime = 0;
    },
    (player) => {
        const data = ModuleService.getModule(BagModuleS)["getPlayerData"](player);
        data.lastDailyObbyTicketDrawTime = 0;
        data.save(false);
    },
    undefined,
    "TTD",
);

addGMCommand(
    "设置 ObbyTicket (9999)",
    "string",
    undefined,
    (player, value) => {
        const module = ModuleService.getModule(BagModuleS);
        const data = module["getPlayerData"](player);
        if (data) {
            data.obbyTicket = GToolkit.isNullOrEmpty(value) ? 9999 : Number(value);
            data.save(false);
            module.getClient(player).net_setObbyTicket(data.obbyTicket);
        }
    },
    undefined,
    "TTD",
);
//#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

//#region TDD-Obby Star
addGMCommand(
    "附近生成 ObbyStar",
    "string",
    undefined,
    (player) => {
        GameObject.asyncSpawn("6EDF95564D6DA29E3D8CA7BD1C854B77", {
            replicates: true,
            transform: new Transform(
                new RandomGenerator()
                    .from(Gtk.randomDimensionSphere(2))
                    .handle((value) => {
                        return value * 500;
                    })
                    .toVector3()
                    .add(player.character.worldTransform.position),
                new mw.Rotation(),
                mw.Vector.one,
            ),
        }).then((value) => {
            Log4Ts.log({name: "TTD"}, `ObbyStar Spawned: ${value}`);
        });
    },
    undefined,
    "TTD",
);
addGMCommand(
    "重置所有 ObbyStar",
    "string",
    undefined,
    (player) => {
        Event.dispatchToLocal(EventDefine.ObbyStarReset, player);
    },
    undefined,
    "TTD",
);
addGMCommand("显示转场", "string", () => {
    UIService.show(CutScenePanel);
});

//#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
