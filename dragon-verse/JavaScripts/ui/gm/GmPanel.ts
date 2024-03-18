import {AddGMCommand, GMBasePanel} from "module_gm";
import Log4Ts from "../../depend/log4ts/Log4Ts";
import BagModuleData, {BagModuleC, BagModuleS} from "../../module/bag/BagModule";
import GMHUD_Generate from "../../ui-generate/gm/GMHUD_generate";
import GMItem_Generate from "../../ui-generate/gm/GMItem_generate";
import {CompanionModule_C} from "../../module/companion/CompanionModule_C";
import {EventDefine} from "../../const/EventDefine";
import {AuthModuleC, AuthModuleS} from "../../module/auth/AuthModule";
import {SubGameTypes} from "../../const/SubGameTypes";
import GameObject = mw.GameObject;
import {QuestModuleS} from "../../module/quest/QuestModuleS";
import {QuestModuleC} from "../../module/quest/QuestModuleC";

import {HeadUIController} from "../../controller/HeadUIController";

import GToolkit, {RandomGenerator} from "../../util/GToolkit";
import MainCurtainPanel from "../main/MainCurtainPanel";
import UIScript = mw.UIScript;
import GameServiceConfig from "../../const/GameServiceConfig";
import i18n, {LanguageTypes} from "../../language/i18n";
import {ObbyModuleC, ObbyModuleS} from "../../module/obby/ObbyModule";
import Gtk from "../../util/GToolkit";


/**
 * GM.
 *
 * ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟
 * ⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄
 * ⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄
 * ⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄
 * ⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
 * @author LviatYi
 * @font JetBrainsMono Nerd Font Mono https://github.com/ryanoasis/nerd-fonts/releases/download/v3.0.2/JetBrainsMono.zip
 * @fallbackFont Sarasa Mono SC https://github.com/be5invis/Sarasa-Gothic/releases/download/v0.41.6/sarasa-gothic-ttf-0.41.6.7z
 */
export default class GMPanel extends GMBasePanel<GMHUD_Generate, GMItem_Generate> {
    //#region Constant
    public static readonly PLAYER_START_GUID: string = "DC5A4E2B47A0C6E31572FE9882BE6861";

    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
    constructor() {
        super(GMHUD_Generate, GMItem_Generate);
    }

    public show(): void {
        UIService.showUI(this["_view"], mw.UILayerSystem);
        Log4Ts.warn(GMPanel, `GMPanel show`);
    }
}

AddGMCommand("Hello world", () => {
    Log4Ts.log(GMPanel, `Hello world`);
},
    null,
    "CHello");
AddGMCommand("Prompt", () => {
    Event.dispatchToLocal(EventDefine.ShowGlobalPrompt, "Hello world");
},
    null,
    "MainPanel");

AddGMCommand("Show Curtain", (player, value) => {
    if (GToolkit.isNullOrEmpty(value)) Event.dispatchToLocal(MainCurtainPanel.MAIN_HIDE_CURTAIN_EVENT_NAME);
    else Event.dispatchToLocal(MainCurtainPanel.MAIN_SHOW_CURTAIN_EVENT_NAME);
},
    null,
    "MainPanel");

AddGMCommand("传送至地图左下点.",
    undefined,
    (player, value) => {
        player.character.worldTransform.position = GameServiceConfig.MAP_SCENE_AS_MAP_LEFT_DOWN_POS;
    },
    "MainPanel");

AddGMCommand("传送至地图右上点.",
    undefined,
    (player, value) => {
        player.character.worldTransform.position = GameServiceConfig.MAP_SCENE_AS_MAP_RIGHT_TOP_POS;
    },
    "MainPanel");

AddGMCommand("返回出生点",
    null,
    (player) => {
        Log4Ts.log(GMPanel, `Back to player start.`);
        player.character.worldTransform.position =
            GameObject.findGameObjectById(GMPanel.PLAYER_START_GUID).worldTransform.position;
    },
    "传送");

AddGMCommand("输出当前角色位置",
    (player) => {
        Log4Ts.log(GMPanel,
            `Print current player location:`,
            player.character.worldTransform.position,
        );
    },
    null,
    "探针");

AddGMCommand("输出当前角色旋转",
    (player) => {
        Log4Ts.log(GMPanel,
            `Print current player rotation:`,
            player.character.worldTransform.rotation,
        );
    },
    null,
    "探针");

AddGMCommand("设置宠物为参战(输入bagId)",
    (player, index: string) => {
        let module = mwext.ModuleService.getModule(CompanionModule_C);
        module.showUpCompanion(Number(index), true);
    },
    (player: mw.Player, index: string) => {

    },
    "宠物龙");

AddGMCommand("增加物品",
    (player, value) => {
        let splice = value.split(",");
        let id = Number(splice[0]);
        let count = splice[1] ? Number(splice[1]) : 1;
        Log4Ts.log(GMPanel, `增加物品 ${value} ${count}个`);
        ModuleService.getModule(BagModuleC).addItem(id, Number(count));
    },
    undefined,
    "背包");

AddGMCommand("进入对话",
    (player, value) => {
        Log4Ts.log(GMPanel, `进入对话 ${value}`);
        // DialogueManager.getInstance().chat(1);
    },
    undefined,
    "对话");

AddGMCommand("测试背包龙", (player, value) => {
    // ModuleService.getModule(QuestModuleC).updateRunningGameScore(Number(value));
}, () => {

});

AddGMCommand("加或删光暗龙", (player, value) => {

}, (player, value) => {

    ModuleService.getModule(QuestModuleS).testAddOrDeleteLightDarkDragon(player.playerId, Number(value));
}, "龙");

AddGMCommand(
    "上报跑酷信息",
    (player, value) => {
        ModuleService.getModule(AuthModuleC).reportSubGameInfo(
            Date.now(),
            SubGameTypes.Parkour,
            Number(value) ?? 100,
        );
    },
    undefined,
    "Root 权限");

AddGMCommand("获取名字", (player, value) => {
    console.log(HeadUIController.getInstance().getNickNameByPlayerId(Number(value)));
}, () => {

});

AddGMCommand("跳宠物模拟器", () => {
}, (player) => {
    const onFailed = (result: mw.TeleportResult) => {
        // 将错误信息发给所有参与的客户端
        for (const userId in result.userIds) {
            const player = Player.getPlayer(userId);
            if (player) {
                Event.dispatchToClient(player, "onJumpGameFailed", result.message);
                Log4Ts.log(GMPanel, "onJumpGameFailed", result.message);
            }
        }
    };
    TeleportService.asyncTeleportToScene("pet-simulator", [player.userId],).then(() => {
    }, onFailed);
});

AddGMCommand("跳Battle World", () => {
}, (player) => {
    const onFailed = (result: mw.TeleportResult) => {
        // 将错误信息发给所有参与的客户端
        for (const userId in result.userIds) {
            const player = Player.getPlayer(userId);
            if (player) {
                Event.dispatchToClient(player, "onJumpGameFailed", result.message);
                Log4Ts.log(GMPanel, "onJumpGameFailed", result.message);
            }
        }
    };
    TeleportService.asyncTeleportToScene("battleworld", [player.userId],).then(() => {
    }, onFailed);
});

AddGMCommand("切语言", (player, value) => {

    i18n.use(Number(value), true);
});

//#region TDD-Obby Coin & Ticket
AddGMCommand(
    "触发每日领取 ObbyCoin",
    undefined,
    (player) => {
        ModuleService.getModule(BagModuleS).dailyDrawObbyCoin(player.playerId);
    },
    "TTD"
);

AddGMCommand(
    "刷新每日领取 ObbyCoin 时间",
    () => {
        const data = ModuleService.getModule(BagModuleC)["data"];
        data.lastDailyObbyCoinDrawTime = 0;
    },
    (player) => {
        const data = ModuleService.getModule(BagModuleS)["getPlayerData"](player);
        data.lastDailyObbyCoinDrawTime = 0;
        data.save(false);
    },
    "TTD"
);

AddGMCommand(
    "设置 ObbyCoin (9999)",
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
    "TTD",
);

AddGMCommand(
    "触发每日领取 ObbyTicket",
    undefined,
    (player) => {
        ModuleService.getModule(BagModuleS).dailyDrawObbyTicket(player.playerId);
    },
    "TTD",
);

AddGMCommand(
    "刷新每日领取 ObbyTicket 时间",
    () => {
        const data = ModuleService.getModule(BagModuleC)["data"];
        data.lastDailyObbyTicketDrawTime = 0;
    },
    (player) => {
        const data = ModuleService.getModule(BagModuleS)["getPlayerData"](player);
        data.lastDailyObbyTicketDrawTime = 0;
        data.save(false);
    },
    "TTD"
);

AddGMCommand(
    "设置 ObbyTicket (9999)",
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
    "TTD"
);
//#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

//#region TDD-Obby Star
AddGMCommand(
    "附近生成 ObbyStar",
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
                new mw.Rotation,
                mw.Vector.one)
        }).then(
            (value) => {
                Log4Ts.log({name: "TTD"}, `ObbyStar Spawned: ${value}`);
            }
        );
    },
    "TTD"
);
AddGMCommand(
    "重置所有 ObbyStar",
    undefined,
    (player) => {
        Event.dispatchToLocal(EventDefine.ObbyStarReset, player);
    },
    "TTD"
);
//#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄