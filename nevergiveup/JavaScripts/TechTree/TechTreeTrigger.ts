/*
 * @Author: shifu.huang
 * @Date: 2024-01-11 17:38:35
 * @LastEditors: shifu.huang
 * @LastEditTime: 2024-01-16 10:20:05
 * @FilePath: \nevergiveup\JavaScripts\TechTree\TechTreeTrigger.ts
 * @Description: 修改描述
 */
import PlayerModuleC from "../Modules/PlayerModule/PlayerModuleC";
import Utils from "../Utils";
import { GameConfig } from "../config/GameConfig";
import { UITechTree } from "./ui/UITechTree";

@Component
export default class TechTreeTrigger extends Script {

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        let trigger = this.gameObject as Trigger;
        trigger.onEnter.add((go: GameObject) => {
            if (go instanceof Character) {
                let character = go as Character;
                if (character.player) {
                    if (Utils.isLocalPlayer(character.player)) {
                        // 解决报错tech会是undefined的问题
                        ModuleService.getModule(PlayerModuleC)?.techTree?.show();
                    }
                }
            }
        });

        trigger.onLeave.add((go: GameObject) => {
            if (go instanceof Character) {
                let character = go as Character;
                if (character.player) {
                    if (Utils.isLocalPlayer(character.player)) {
                        UIService.getUI(UITechTree).hideTween();
                    }
                }
            }
        });
    }

    /**
     * 周期函数 每帧执行
     * 此函数执行需要将this.useUpdate赋值为true
     * @param dt 当前帧与上一帧的延迟 / 秒
     */
    protected onUpdate(dt: number): void {

    }

    /** 脚本被销毁时最后一帧执行完调用此函数 */
    protected onDestroy(): void {

    }
}