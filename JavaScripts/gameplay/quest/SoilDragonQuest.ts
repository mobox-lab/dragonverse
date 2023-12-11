import { GameConfig } from "../../config/GameConfig";
import { IceBlock } from "../interactive/IceBlock";
import { Quest } from "./Quest";




/**
 * 土龙任务
 */
@mw.Component
export default class SoilDragonQuest extends Quest {


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