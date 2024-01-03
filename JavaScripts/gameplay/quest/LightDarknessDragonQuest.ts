/*
 * @Author: 余泓 hong.yu@appshahe.com
 * @Date: 2023-12-19 13:39:41
 * @LastEditors: 余泓 hong.yu@appshahe.com
 * @LastEditTime: 2023-12-19 15:12:02
 * @FilePath: \DragonVerse\JavaScripts\gameplay\quest\LightDarknessDragonQuest.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { EventDefine } from "../../const/EventDefine";
import { QuestModuleC } from "../../module/quest/QuestModuleC";
import { Quest } from "./Quest";

/**
 * 光暗龙任务
 */
@mw.Component
export default class LightDraknessDragonQuest extends Quest {

    @mw.Property({ displayName: "火龙魔法阵guid" })
    private _fireObjGuid: string = "";

    private _fireObj: mw.GameObject;

    @mw.Property({ displayName: "水龙魔法阵guid" })
    private _waterObjGuid: string = "";

    private _waterObj: mw.GameObject;

    @mw.Property({ displayName: "木龙魔法阵guid" })
    private _woodObjGuid: string = "";

    private _woodObj: mw.GameObject;

    @mw.Property({ displayName: "土龙魔法阵guid" })
    private _soilObjGuid: string = "";

    private _soilObj: mw.GameObject;

    @mw.Property({ displayName: "终极魔法阵guid" })
    private _finalObjGuid: string = "";

    private _finalObj: mw.GameObject;

    @mw.Property({ displayName: "终极魔法阵碰撞guid" })
    private _finalCollisionGuid: string = "";

    private _finalCollision: mw.GameObject;

    @mw.Property({ displayName: "终极魔法阵触发器guid" })
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
            this._infos = { isComplete: false }
        }
    }

    protected onInitialize(): void {
        super.onInitialize();
        this.initObj();

        // if (this._infos.isComplete) {
        //     this.taskComplete();
        // } else {
        this.showMagicCircle();

        Event.addLocalListener(EventDefine.OnDragonQuestsComplete, () => {
            this.showMagicCircle();
        })
        //}
    }

    private initObj() {
        this._fireObj = mw.GameObject.findGameObjectById(this._fireObjGuid);
        this._waterObj = mw.GameObject.findGameObjectById(this._waterObjGuid);
        this._woodObj = mw.GameObject.findGameObjectById(this._woodObjGuid);
        this._soilObj = mw.GameObject.findGameObjectById(this._soilObjGuid);
        this._finalObj = mw.GameObject.findGameObjectById(this._finalObjGuid);
        this._finalCollision = mw.GameObject.findGameObjectById(this._finalCollisionGuid)
        // this._finalTrigger = mw.GameObject.findGameObjectById(this._finalTriggerGuid) as mw.Trigger;

    }


    // private taskComplete() {
    //     this._fireObj.setVisibility(mw.PropertyStatus.On);
    //     this._waterObj.setVisibility(mw.PropertyStatus.On);
    //     this._woodObj.setVisibility(mw.PropertyStatus.On);
    //     this._soilObj.setVisibility(mw.PropertyStatus.On);

    //     this._finalObj.destroy();
    //     //this._finalTrigger.destroy();
    //     this._finalCollision.destroy();
    // }

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
                    } else {
                        this._woodObj.setVisibility(mw.PropertyStatus.Off);
                    }
                    break;
                case 2:
                    if (data.isComplete) {
                        this._fireObj.setVisibility(mw.PropertyStatus.On);
                    } else {
                        this._fireObj.setVisibility(mw.PropertyStatus.Off);
                    }
                    break;
                case 3:
                    if (data.isComplete) {
                        this._waterObj.setVisibility(mw.PropertyStatus.On);
                    } else {
                        this._waterObj.setVisibility(mw.PropertyStatus.Off);
                    }
                    break;
                case 4:
                    if (data.isComplete) {
                        this._soilObj.setVisibility(mw.PropertyStatus.On);
                    } else {
                        this._soilObj.setVisibility(mw.PropertyStatus.Off);
                    }
                    break;
                default: break;
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
                this.updateTaskProgress(JSON.stringify(this._infos));
            }
        }
    }

    onActivated(): void {
    }

    onComplete(): void {
    }
}