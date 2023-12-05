import { AddGMCommand, GMBasePanel } from "module_gm";
import GMHUD_Generate from "../../ui-generate/gm/GMHUD_generate";
import GMItem_Generate from "../../ui-generate/gm/GMItem_generate";
import { BagModuleC } from "../../module/bag/BagModule";
import Log4Ts from "../../depend/log4ts/Log4Ts";
import { CompanionModule_S } from "../../module/companion/CompanionModule_S";
import DialogueManager from "../../gameplay/dialogue/DialogueManager";
import GameObject = mw.GameObject;
import FunctionOption = mw.FunctionOption;

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
            `Print current player location:`,
            player.character.worldTransform.rotation,
        );
    },
    null,
    "探针");

AddGMCommand("给玩家添加宠物",
    undefined,
    (player: mw.Player) => {
        mwext.ModuleService.getModule(CompanionModule_S).addCompanionForPlayer(player.playerId, 1);
    },
    "宠物龙");

AddGMCommand("设置宠物为参战",
    undefined,
    (player: mw.Player, index: string) => {
        let module = mwext.ModuleService.getModule(CompanionModule_S);
        let companions = module.getPlayerCompanionIdList(player.playerId);
        module.net_switchCompanionShowup(companions[Number(0)], player.playerId);
    },
    "宠物龙");

AddGMCommand("取消所有宠物参战状态",
    undefined,
    (player: mw.Player, index: string) => {
        let module = mwext.ModuleService.getModule(CompanionModule_S);
        let companions = module.getPlayerCompanionIdList(player.playerId);
        for (let id of companions) {
            module.net_switchCompanionShowup(id, player.playerId, false);
        }
    },
    "宠物龙");

AddGMCommand("增加测试物品",
    (player, value) => {
        Log4Ts.log(GMPanel, `增加测试物品 ${value}`);
        ModuleService.getModule(BagModuleC).addItem(1, Number(value));
    },
    undefined,
    "背包");

AddGMCommand("进入对话",
    (player, value) => {
        Log4Ts.log(GMPanel, `进入对话 ${value}`);
        DialogueManager.getInstance().greet(1);
    },
    undefined,
    "对话");

