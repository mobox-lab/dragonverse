/*
 * @Author: 余泓 hong.yu@appshahe.com
 * @Date: 2023-12-10 16:47:15
 * @LastEditors: 余泓 hong.yu@appshahe.com
 * @LastEditTime: 2023-12-13 16:49:45
 * @FilePath: \DragonVerse\JavaScripts\gameplay\quest\SoilDragonQuest.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { GameConfig } from "../../config/GameConfig";
import { IceBlock } from "../interactive/IceBlock";
import { Quest } from "./Quest";




/**
 * 土龙任务
 */
@mw.Component
export default class SoilDragonQuest extends Quest {

    protected get progress(): number {
        return 0;
    }



    private _infos: { index: number, complete: boolean }[];


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
        this.creatIceBlock();
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