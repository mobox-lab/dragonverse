/*
 * @Author: shifu.huang
 * @Date: 2024-01-17 17:19:54
 * @LastEditors: shifu.huang
 * @LastEditTime: 2024-01-23 18:48:05
 * @FilePath: \nevergiveup\JavaScripts\Airdrop\Airdrop.ts
 * @Description: 修改描述
 */

import { CycleUtil } from "../CycleUtil";
import { TowerModuleC } from "../Modules/TowerModule/TowerModuleC";
import { TipsManager } from "../UI/Tips/CommonTipsManagerUI";
import Utils from "../Utils";
import { ZwtTween } from "../ZwtTween";
import { GameConfig } from "../config/GameConfig";
import { SoundUtil } from "../tool/SoundUtil";
import { AirdropEvent } from "./AirdropManager";

export enum DropType {
    Tower = 1,
    Buff = 2,
    Gold = 3,
    InGameGold = 4,
}

@Serializable
export class DropConfig {
    @mw.Property({ displayName: "空投类型", enumType: DropType })
    public dropType: DropType;
    @mw.Property({ displayName: "空投数量" })
    public count: number;
    @mw.Property({ displayName: "空投权重" })
    public dropProbability: number;
    @mw.Property({ displayName: "空投ID(塔和Buff的ID)" })
    public dropId: number;
    constructor(dropType: DropType, count: number, dropId: number, dropProbability: number) {
        this.dropType = dropType;
        this.count = count;
        this.dropId = dropId;
        this.dropProbability = dropProbability;
    }
}
@Component
export default class Airdrop extends Script {
    @mw.Property({ displayName: "空投配置", arrayDefault: new DropConfig(DropType.Tower, 1, 1001, 100), group: "基础配置" })
    public dropConfigs: DropConfig[] = [];
    @Property({ displayName: "开启出场动画", group: "出场动画" })
    public isShow: boolean = true;
    @Property({ displayName: "出场动画时间", group: "出场动画" })
    public showDuration: number = 3;
    @Property({ displayName: "降落高度", group: "出场动画" })
    public landZ: number = 1000;
    private _dropConfigs: DropConfig;
    private _canTrigger: boolean = true;
    private _oriPos;
    private _tween: ZwtTween;
    /**
     * The function is called when the script is instantiated, before the first frame of the game
     */
    protected onStart(): void {
        let index = Utils.getRandomProbability(this.dropConfigs.map(x => x.dropProbability));
        let config = this.dropConfigs[index];
        if (!config) {
            console.log('hsf====================== ', (this.gameObject.name) + ' 无空投配置')
            return;
        }
        this._oriPos = this.gameObject.worldTransform.position.clone();
        this._dropConfigs = config;
        this.gameObject.setVisibility(false);
        let go = this.gameObject.getChildByName("Trigger") as Trigger;
        if (this.gameObject?.getChildren().length > 0) {
            for (let i of this.gameObject?.getChildren()) {
                if (i instanceof Sound) {
                    if (i["hsfVolume"] == null) i["hsfVolume"] = i.volume
                    i.volume = SoundUtil.attackVoiceFactor * i["hsfVolume"];
                    i.play();
                }
            }
        }
        // if (go.checkInArea(Player?.localPlayer?.character)) {
        // Event.dispatchToLocal(AirdropEvent.OnPickedCC, this._dropConfigs, this.gameObject);
        // } else {
        go && go.onEnter.add(this.onTriggerEnter);
        // }
        if (this.isShow) {
            this.show();
        }
        TimeUtil.delayExecute(() => {
            this.gameObject.setVisibility(true);
        }, 1)
    }

    private show() {
        this.gameObject.worldTransform.position = this._oriPos.clone().add(new Vector(0, 0, this.landZ));
        let rotationZ = Math.random() * 180;
        this._tween = new ZwtTween(this.gameObject)
            .moveTo(this._oriPos, this.showDuration, false, TweenUtil.Easing.Linear.None, true)
            .rotateTo(new Rotation(15, 15, rotationZ * 1 / 4), this.showDuration / 4)
            .rotateTo(new Rotation(-15, -15, rotationZ * 3 / 4), this.showDuration / 2)
            .rotateTo(new Rotation(0, 0, rotationZ * 4 / 4), this.showDuration / 4)
            .start();
    }

    private onTriggerEnter = (go) => {
        if (go instanceof Character && Utils.isLocalPlayer(go) && this._canTrigger) {
            // 如果是试用塔
            if (this._dropConfigs.dropType == DropType.Tower &&
                ModuleService.getModule(TowerModuleC).checkTryTowerFull(this._dropConfigs.dropId)) {
                TipsManager.showTips(GameConfig.Language.getElement("Text_AirdropBagFull").Value)
                return;
            } else {
                this._canTrigger = false;
                Event.dispatchToLocal(AirdropEvent.OnPickedCC, this._dropConfigs, this.gameObject);
            }
        }
    }

    protected onDestroy(): void {
        this._tween.stop();
        CycleUtil.playEffectOnPosition("27422", this.gameObject.worldTransform.position.clone());
        if (this._canTrigger && this._dropConfigs.dropType == DropType.Gold) {
            Event.dispatchToLocal(AirdropEvent.OnPickedCC, this._dropConfigs, this.gameObject);
        }
    }

}

