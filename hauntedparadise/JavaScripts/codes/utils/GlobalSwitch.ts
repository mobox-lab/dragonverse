/*
 * @Author       : dal
 * @Date         : 2023-12-26 10:38:50
 * @LastEditors  : dal
 * @LastEditTime : 2024-03-01 19:21:58
 * @FilePath     : \hauntedparadise\JavaScripts\codes\utils\GlobalSwitch.ts
 * @Description  : 
 */

import { EGameTheme } from "../Defines";
import GameStart from "../GameStart";

/** 全局开关 */
export namespace GlobalSwitch {

    /** 需要开启血条hud的游戏,后续有需要开启血条的子游戏直接push到列表中 */
    const EnableHpHudGames: EGameTheme[] = [EGameTheme.Graveyard, EGameTheme.Town];

    /** 是否启用hp hud */
    export function enableHpHud(): boolean {
        return EnableHpHudGames.includes(GameStart.GameTheme);
    }

    /** 动态难度的游戏列表，动态难度的游戏将没有难度选择界面，难度将会根据情况自适应 */
    const DynamicDegreeGames: EGameTheme[] = [EGameTheme.Graveyard];

    /** 是否动态难度 */
    export function isDynamicDegree(): boolean {
        return DynamicDegreeGames.includes(GameStart.GameTheme);
    }

    /** 不能选择风格的游戏 */
    const BanChooseStyleGames: EGameTheme[] = [EGameTheme.Graveyard, EGameTheme.Town];

    /** 能否选择风格 */
    export function canChooseStyle(): boolean {
        return !BanChooseStyleGames.includes(GameStart.GameTheme);
    }

    /** 带有跳跃按钮的游戏 */
    const EnableJumpBtnGames: EGameTheme[] = [EGameTheme.Graveyard, EGameTheme.Hall];

    /** 是否启用跳跃按钮 */
    export function enableJumpBtn(): boolean {
        return EnableJumpBtnGames.includes(GameStart.GameTheme);
    }

    /** 时间系统 */
    const EnableTimeSysGames: EGameTheme[] = [EGameTheme.Graveyard];

    /** 是否开启时间系统 */
    export function enableTimeSys(): boolean {
        return EnableTimeSysGames.includes(GameStart.GameTheme);
    }

    /** 有道具角标的项目 */
    const EnableBagItemMarkGames: EGameTheme[] = [EGameTheme.Graveyard];

    export function enableBagItemMark(): boolean {
        return EnableBagItemMarkGames.includes(GameStart.GameTheme);
    }
}