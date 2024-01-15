import { AddGMCommand, GMBasePanel } from "module_gm";
import Log4Ts from "../../depend/log4ts/Log4Ts";
import { BagModuleC } from "../../module/bag/BagModule";
import GMHUD_Generate from "../../ui-generate/gm/GMHUD_generate";
import GMItem_Generate from "../../ui-generate/gm/GMItem_generate";
import { CompanionModule_C } from "../../module/companion/CompanionModule_C";
import { EventDefine } from "../../const/EventDefine";
import { AuthModuleC, AuthModuleS } from "../../module/auth/AuthModule";
import { SubGameTypes } from "../../const/SubGameTypes";
import GameObject = mw.GameObject;
import { QuestModuleS } from "../../module/quest/QuestModuleS";
import { QuestModuleC } from "../../module/quest/QuestModuleC";
import { HeadUIController } from "../../controller/HeadUIController";

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
        super.show();

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

AddGMCommand(
    "通过验证",
    (player, value) => {
        ModuleService.getModule(AuthModuleC).net_enableEnter();
    },
    (player) => {
        ModuleService.getModule(AuthModuleS).recordPlayer(player);
    },
    "Root 权限");

AddGMCommand("测试背包龙", (player, value) => {
    // ModuleService.getModule(QuestModuleC).updateRunningGameScore(Number(value));
}, () => {

})

AddGMCommand("加或删光暗龙", (player, value) => {

}, (player, value) => {

    // ModuleService.getModule(QuestModuleS).testAddOrDeleteLightDarkDragon(player.playerId, Number(value));
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

})

