import { AddGMCommand, GMBasePanel } from "module_gm";
import Log4Ts from "../../depend/log4ts/Log4Ts";
import DialogueManager from "../../gameplay/dialogue/DialogueManager";
import { BagModuleC } from "../../module/bag/BagModule";
import { CompanionModule_S } from "../../module/companion/CompanionModule_S";
import GMHUD_Generate from "../../ui-generate/gm/GMHUD_generate";
import GMItem_Generate from "../../ui-generate/gm/GMItem_generate";
import GameObject = mw.GameObject;
import FunctionOption = mw.FunctionOption;
import { CompanionModule_C } from "../../module/companion/CompanionModule_C";
import { EventDefine } from "../../const/EventDefine";

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
        Event.dispatchToLocal(EventDefine.ShowGlobalPrompt, {message: "Hello world"});
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
        DialogueManager.getInstance().chat(1);
    },
    undefined,
    "对话");

