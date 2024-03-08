import { GhostModuleS } from "./GhostModuleS";

let oristopFollow = Navigation.stopFollow.bind(Navigation);
Navigation.stopFollow = function (char: Character) {
    if (SystemUtil.isServer()) {
        ModuleService.getModule(GhostModuleS).stopMov(char);
    }

    oristopFollow(char);
}


let oristopNav = Navigation.stopNavigateTo.bind(Navigation);
Navigation.stopNavigateTo = function (char: Character) {
    if (SystemUtil.isServer()) {
        ModuleService.getModule(GhostModuleS).stopMov(char);
    }
    oristopNav(char);
}


let orinav = Navigation.navigateTo.bind(Navigation);
Navigation.navigateTo = function (char: Character, pos: Vector, radius: number, suc, fail) {
    if (SystemUtil.isServer()) {
        ModuleService.getModule(GhostModuleS).stopMov(char);
        orinav(char, pos, radius, suc, fail);
    }
    else {
        orinav(char, pos, radius, suc, fail);
    }
}


let orifollow = Navigation.follow.bind(Navigation);
Navigation.follow = function (char: Character, target: Character, radius: number, suc, fail) {
    if (SystemUtil.isServer()) {
        ModuleService.getModule(GhostModuleS).stopMov(char);
        return orifollow(char, target, radius, suc, fail);
    }
    else {
        return orifollow(char, target, radius, suc, fail);
    }
}