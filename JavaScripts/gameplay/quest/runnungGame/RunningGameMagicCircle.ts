/*
 * @Author: 余泓 hong.yu@appshahe.com
 * @Date: 2023-12-15 15:57:26
 * @LastEditors: 余泓 hong.yu@appshahe.com
 * @LastEditTime: 2023-12-19 15:35:21
 * @FilePath: \DragonVerse\JavaScripts\gameplay\quest\runnungGame\RunningGameMagicCircle.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { Bubble } from "module_bubble";
import { EventDefine } from "../../../const/EventDefine";
import { CompanionHelper } from "../../../module/companion/CompanionHelper";
import { CompanionModule_C } from "../../../module/companion/CompanionModule_C";
import { GameConfig } from "../../../config/GameConfig";
import Log4Ts from "../../../depend/log4ts/Log4Ts";


/**
 * 跑酷游戏解锁魔法阵
 */
export class RunningGameMagicCircle {

    private _trigger: mw.Trigger;

    private _obj: mw.GameObject;

    private _type: number;

    private _breakObj: mw.Effect;

    constructor(objGuid: string, breakGuid: string, triggerGuid: string, type: number, isComplete: boolean) {
        this._type = type;
        this._obj = mw.GameObject.findGameObjectById(objGuid);
        this._breakObj = mw.GameObject.findGameObjectById(breakGuid) as mw.Effect;
        this._trigger = mw.GameObject.findGameObjectById(triggerGuid) as mw.Trigger;
        if (isComplete) {
            this._obj.destroy();
            this._breakObj.destroy();
            this._trigger.destroy();
        } else {
            this._trigger?.onEnter.add(this.onTriggerEnter);
            this._trigger?.onLeave.add(this.onTriggerLeave);
        }

    }

    private onTriggerEnter = (obj: mw.GameObject) => {
        if (obj instanceof mw.Character) {
            if (obj === Player.localPlayer.character) {
                const type = CompanionHelper.getCompanionType(ModuleService.getModule(CompanionModule_C).getCurrentShowupBagId());
                if (type === this._type) {
                    this._trigger.destroy();
                    this._obj.destroy();
                    this._breakObj.play(() => {
                        this._breakObj.destroy();
                    })
                    Event.dispatchToLocal(EventDefine.OnRunningGameUnlockMagicCircle, this._type);
                } else {
                    let str: string;
                    if (this._type === 1) {
                        str = GameConfig.Language.ElementalName0001.Value;
                    } else if (this._type === 2) {
                        str = GameConfig.Language.ElementalName0002.Value;
                    } else if (this._type === 3) {
                        str = GameConfig.Language.ElementalName0003.Value;
                    } else if (this._type === 4) {
                        str = GameConfig.Language.ElementalName0004.Value;
                    }
                    Log4Ts.log(RunningGameMagicCircle, `want show bubble. string: ${GameConfig.Language.Dragontip_Content_0001.Value.replace("*", str)}`);
                    Bubble.showBubble(1, GameConfig.Language.Dragontip_Content_0001.Value.replace("*", str));
                }

            }
        }
    }

    private onTriggerLeave = (obj: mw.GameObject) => {

    }


}