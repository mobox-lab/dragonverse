import { AddGMCommand, GMBasePanel } from "module_gm";
import { BagModuleC } from "../../module/bag/BagModule";
import { CompanionModule_S } from "../../module/companion/CompanionModule_S";
import GMHUD_Generate from "../../ui-generate/gm/GMHUD_generate";
import GMItem_Generate from "../../ui-generate/gm/GMItem_generate";
import GToolkit from "../../util/GToolkit";

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
    constructor() {
        super(GMHUD_Generate, GMItem_Generate);
    }

    public show(): void {
        super.show();

        GToolkit.warn(GMPanel, `GMPanel show`);
    }
}

AddGMCommand("Hello world", () => {
    GToolkit.log(GMPanel, `Hello world`);
}, null, "CHello");

AddGMCommand("给玩家添加宠物", () => {



}, (player: mw.Player) => {
    mwext.ModuleService.getModule(CompanionModule_S).addCompanionForPlayer(player.playerId, 1)
})

AddGMCommand("设置宠物为参战", () => {



}, (player: mw.Player, index: string) => {

    let module = mwext.ModuleService.getModule(CompanionModule_S);
    let companions = module.getPlayerCompanionIdList(player.playerId);
    module.net_switchCompanionShowup(companions[Number(0)], player.playerId);
})

AddGMCommand("取消所有宠物参战状态", () => {



}, (player: mw.Player, index: string) => {

    let module = mwext.ModuleService.getModule(CompanionModule_S);
    let companions = module.getPlayerCompanionIdList(player.playerId);
    for (let id of companions) {
        module.net_switchCompanionShowup(id, player.playerId, false);
    }
})
AddGMCommand("增加测试物品", (player, value) => {
    GToolkit.log(GMPanel, `增加测试物品 ${value}`);
    ModuleService.getModule(BagModuleC).addItem(1, Number(value));
});
