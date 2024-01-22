/*
 * @Author: 余泓 hong.yu@appshahe.com
 * @Date: 2023-12-10 16:47:15
 * @LastEditors: 余泓 hong.yu@appshahe.com
 * @LastEditTime: 2023-12-15 11:40:07
 * @FilePath: \DragonVerse\JavaScripts\gameplay\quest\SoilDragonQuest.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { GameConfig } from "../../config/GameConfig";
import { EventDefine } from "../../const/EventDefine";
import { IceBlock } from "../interactive/IceBlock";
import { Quest } from "./Quest";




/**
 * 土龙任务
 */
@mw.Component
export default class SoilDragonQuest extends Quest {

    @mw.Property({ displayName: "全解锁后普通物块guid" })
    private _objGuid: string = "";

    private _obj: mw.GameObject;

    protected get progress(): number {
        return this.checkIsAllComplete();
    }

    private _infos: { index: number, complete: boolean }[];


    private checkIsAllComplete() {
        let isAllComplete = true;
        for (const info of this._infos) {
            if (!info.complete) {
                isAllComplete = false;
                break;
            }
        }
        return isAllComplete ? 1 : 0;
    }

    protected onSerializeCustomData(customData: string): void {
        if (customData) {
            this._infos = JSON.parse(customData);
        } else {
            this._infos = GameConfig.IceBlock.getAllElement().map((val) => {
                return { index: val.id, complete: false }
            })

        }
    }

    protected onInitialize(): void {
        super.onInitialize();

        Event.addLocalListener(EventDefine.PlayerEnterIceTrigger, (index: number) => {
            const info = this._infos.find((val) => {
                return val.index === index;
            });




            if (info) {
                info.complete = true;
                this.updateTaskProgress(JSON.stringify(this._infos));
            }
            this.checkNormalIceBlock();
        });

        this._obj = mw.GameObject.findGameObjectById(this._objGuid);
        this.checkNormalIceBlock();
        this.creatIceBlock();





    }


    private checkNormalIceBlock() {
        if (this._obj && this.checkIsAllComplete()) {
            (this._obj as mw.Model).setCollision(mw.CollisionStatus.Off);
            (this._obj as mw.Model).setVisibility(mw.PropertyStatus.Off);
        }
    }


    private creatIceBlock() {
        for (const info of this._infos) {
            if (info.complete) continue;
            const config = GameConfig.IceBlock.getElement(info.index);
            new IceBlock(config);
        }
    }

    onActivated(): void {
    }

    onComplete(): void {
    }

}