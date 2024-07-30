/*
 * @Author: shifu.huang
 * @Date: 2024-01-11 17:38:35
 * @LastEditors: shifu.huang
 * @LastEditTime: 2024-01-22 18:01:04
 * @FilePath: \nevergiveup\JavaScripts\enemy\components\ComponentFactory.ts
 * @Description: 修改描述
 */
/** 
 * @Author       : xiaohao.li
 * @Date         : 2023-12-11 14:24:59
 * @LastEditors  : xiaohao.li
 * @LastEditTime : 2023-12-12 15:06:11
 * @FilePath     : \nevergiveup\JavaScripts\enemy\components\ComponentFactory.ts
 * @Description  : 修改描述
 */

import { GameConfig } from "../../config/GameConfig";
import { EEnemyComponentType } from "../../tool/Enum";
import { ArmoredComponent } from "./ArmoredComponent";
import { BossComponent } from "./BossComponent";
import { FlyingComponent } from "./FlyingComponent";
import { ImmuneControlComponent } from "./ImmueControlComponent";
import { StealthComponent } from "./StealthComponent";





export namespace ComponentFactory {
    export let EnemeyTypeString = []
    export function init(){
        EnemeyTypeString = [
            "",
            GameConfig.Language.getElement("Text_AttackTagStage1").Value,
            GameConfig.Language.getElement("Text_AttackTagStage2").Value,
            GameConfig.Language.getElement("Text_AttackTagStage3").Value,
            GameConfig.Language.getElement("Text_AttackTagStage4").Value,
            ""
        ]
    }
    export function createComponent(type: number) {
        switch (type) {
            case EEnemyComponentType.Stealth:
                return new StealthComponent();
            case EEnemyComponentType.Flying:
                return new FlyingComponent();
            case EEnemyComponentType.Armored:
                return new ArmoredComponent();
            case EEnemyComponentType.ImmuneControl:
                return new ImmuneControlComponent();
            case EEnemyComponentType.Boss:
                return new BossComponent();
            default:
                return null;
        }
    }
}