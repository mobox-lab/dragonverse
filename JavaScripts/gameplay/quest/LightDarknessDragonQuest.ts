/*
 * @Author: 余泓 hong.yu@appshahe.com
 * @Date: 2023-12-19 13:39:41
 * @LastEditors: haoran.zhang haoran.zhang@appshahe.com
 * @LastEditTime: 2024-01-04 14:10:26
 * @FilePath: \DragonVerse\JavaScripts\gameplay\quest\LightDarknessDragonQuest.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { EventDefine } from "../../const/EventDefine";
import { QuestModuleC } from "../../module/quest/QuestModuleC";
import { Quest } from "./Quest";
import Trigger = mw.Trigger;
import GToolkit from "../../util/GToolkit";
import { Bubble } from "module_bubble";
import { GameConfig } from "../../config/GameConfig";

/**
 * 光暗龙任务
 */
@mw.Component
export default class LightDraknessDragonQuest extends Quest {

    @mw.Property({displayName: "火龙魔法阵guid"})
    private _fireObjGuid: string = "";

    private _fireObj: mw.GameObject;

    @mw.Property({displayName: "火龙气泡触发器guid"})
    private _fireBubbleTriggerGuid: string = "";

    private _fireBubbleTrigger: mw.Trigger;

    @mw.Property({displayName: "水龙魔法阵guid"})
    private _waterObjGuid: string = "";

    private _waterObj: mw.GameObject;

    @mw.Property({displayName: "水龙气泡触发器guid"})
    private _waterBubbleTriggerGuid: string = "";

    private _waterBubbleTrigger: mw.Trigger;

    @mw.Property({displayName: "木龙魔法阵guid"})
    private _woodObjGuid: string = "";

    private _woodObj: mw.GameObject;

    @mw.Property({displayName: "木龙气泡触发器guid"})
    private _woodBubbleTriggerGuid: string = "";

    private _woodBubbleTrigger: mw.Trigger;

    @mw.Property({displayName: "土龙魔法阵guid"})
    private _soilObjGuid: string = "";

    private _soilObj: mw.GameObject;

    @mw.Property({displayName: "土龙气泡触发器guid"})
    private _soilBubbleTriggerGuid: string = "";

    private _soilBubbleTrigger: mw.Trigger;

    @mw.Property({displayName: "终极魔法阵guid"})
    private _finalObjGuid: string = "";

    private _finalObj: mw.GameObject;

    @mw.Property({displayName: "终极魔法阵碰撞guid"})
    private _finalCollisionGuid: string = "";

    private _finalCollision: mw.GameObject;

    @mw.Property({displayName: "终极魔法阵触发器guid"})
    private _finalTriggerGuid: string = "";

    private _finalTrigger: mw.Trigger;

    protected get progress(): number {
        return this._infos.isComplete ? 1 : 0;
    }

    private _infos: { isComplete: boolean };

    protected onSerializeCustomData(customData: string): void {
        if (customData) {
            this._infos = JSON.parse(customData);
        } else {
            this._infos = {isComplete: false};
        }
    }

    protected onInitialize(): void {
        super.onInitialize();
        this.initObj();

        if (this._infos.isComplete) {
            this.taskComplete();
        } else {
            this.showMagicCircle();

            Event.addLocalListener(EventDefine.OnDragonQuestsComplete, () => {
                this.showMagicCircle();
            });
        }
    }

    private initObj() {
        this._fireObj = mw.GameObject.findGameObjectById(this._fireObjGuid);
        this._fireBubbleTrigger = mw.GameObject.findGameObjectById(this._fireBubbleTriggerGuid) as Trigger;
        this._waterObj = mw.GameObject.findGameObjectById(this._waterObjGuid);
        this._waterBubbleTrigger = mw.GameObject.findGameObjectById(this._waterBubbleTriggerGuid) as Trigger;
        this._woodObj = mw.GameObject.findGameObjectById(this._woodObjGuid);
        this._woodBubbleTrigger = mw.GameObject.findGameObjectById(this._woodBubbleTriggerGuid) as Trigger;
        this._soilObj = mw.GameObject.findGameObjectById(this._soilObjGuid);
        this._soilBubbleTrigger = mw.GameObject.findGameObjectById(this._soilBubbleTriggerGuid) as Trigger;
        this._finalObj = mw.GameObject.findGameObjectById(this._finalObjGuid);
        this._finalCollision = mw.GameObject.findGameObjectById(this._finalCollisionGuid);
        this._finalTrigger = mw.GameObject.findGameObjectById(this._finalTriggerGuid) as mw.Trigger;

    }


    private taskComplete() {
        this._fireObj.setVisibility(mw.PropertyStatus.On);
        this._waterObj.setVisibility(mw.PropertyStatus.On);
        this._woodObj.setVisibility(mw.PropertyStatus.On);
        this._soilObj.setVisibility(mw.PropertyStatus.On);

        this._finalObj.destroy();
        this._finalCollision.destroy();
    }

    /**
     * 根据数据显示魔法阵
     */
    private showMagicCircle() {
        const datas = ModuleService.getModule(QuestModuleC).getDragonsQuestIscomplete();
        let isAllComplete: boolean = true;
        for (const data of datas) {
            switch (data.configId) {
                case 1:
                    if (data.isComplete) {
                        this._woodObj.setVisibility(mw.PropertyStatus.On);
                        this._woodBubbleTrigger?.onEnter.clear();
                    } else {
                        this._woodObj.setVisibility(mw.PropertyStatus.Off);
                        this._woodBubbleTrigger?.onEnter.clear();
                        this._woodBubbleTrigger?.onEnter.add((gameObject) => {
                            if (GToolkit.isSelfCharacter(gameObject))
                                Bubble.showBubble(2,GameConfig.Language.WoodMonolithTips003.Value.replace("*", GameConfig.Language.ElementalName0003.Value));
                        });
                    }
                    break;
                case 2:
                    if (data.isComplete) {
                        this._fireObj.setVisibility(mw.PropertyStatus.On);
                        this._fireBubbleTrigger?.onEnter.clear();
                    } else {
                        this._fireObj.setVisibility(mw.PropertyStatus.Off);
                        this._fireBubbleTrigger?.onEnter.clear();
                        this._fireBubbleTrigger?.onEnter.add((gameObject) => {
                            if (GToolkit.isSelfCharacter(gameObject))
                                Bubble.showBubble(2,GameConfig.Language.FireMonolithTips001.Value.replace("*", GameConfig.Language.ElementalName0001.Value));
                        });
                    }
                    break;
                case 3:
                    if (data.isComplete) {
                        this._waterObj.setVisibility(mw.PropertyStatus.On);
                        this._waterBubbleTrigger?.onEnter.clear();
                    } else {
                        this._waterObj.setVisibility(mw.PropertyStatus.Off);
                        this._waterBubbleTrigger?.onEnter.clear();
                        this._waterBubbleTrigger?.onEnter.add((gameObject) => {
                            if (GToolkit.isSelfCharacter(gameObject))
                                Bubble.showBubble(1,GameConfig.Language.WaterMonolithTips002.Value.replace("*", GameConfig.Language.ElementalName0002.Value));
                        });
                    }
                    break;
                case 4:
                    if (data.isComplete) {
                        this._soilObj.setVisibility(mw.PropertyStatus.On);
                        this._soilBubbleTrigger?.onEnter.clear();
                    } else {
                        this._soilObj.setVisibility(mw.PropertyStatus.Off);
                        this._soilBubbleTrigger?.onEnter.clear();
                        this._soilBubbleTrigger?.onEnter.add((gameObject) => {
                            if (GToolkit.isSelfCharacter(gameObject))
                                Bubble.showBubble(2,GameConfig.Language.EarthMonolithTips004.Value.replace("*", GameConfig.Language.ElementalName0004.Value));
                        });
                    }
                    break;
                default:
                    break;
            }
            if (!data.isComplete) {
                isAllComplete = false;
            }
        }

        if (isAllComplete) {
            this._finalObj?.destroy();
            this._finalCollision?.destroy();
            this._finalTrigger.onEnter.clear();
            this._finalTrigger.onEnter.add(this.onEnter);
        }
    }

    private onEnter = (obj: mw.GameObject) => {
        if (obj instanceof mw.Character) {
            if (obj === Player.localPlayer.character) {
                this._finalTrigger.destroy();
                this._infos.isComplete = true;
                this.updateTaskProgress(JSON.stringify(this._infos));
            }
        }
    };

    onActivated(): void {
    }

    onComplete(): void {
    }
}