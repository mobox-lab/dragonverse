/*
 * @Author       : dal
 * @Date         : 2024-01-22 16:30:33
 * @LastEditors  : dal
 * @LastEditTime : 2024-02-25 10:06:40
 * @FilePath     : \hauntedparadise\JavaScripts\codes\modules\route\RouteConst.ts
 * @Description  : 
 */

import { GameConfig } from "../../../config/GameConfig";
import GameStart, { EGameTheme } from "../../GameStart";

export default class RouteConst {

    static getGameIdByGameTheme(gameTheme: EGameTheme) {
        return GameStart.isGPark ? this.getGameThemeCfg(gameTheme)["gameIdGPark"]: this.getGameThemeCfg(gameTheme).gameId;
    }

    static getGameThemeCfg(gameTheme: EGameTheme) {
        return GameConfig.GameTheme.getAllElement().filter((e) => { return e.key === gameTheme })[0];
    }
}