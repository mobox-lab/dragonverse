/** 
 * @Author       : xiaohao.li
 * @Date         : 2023-12-10 18:45:52
 * @LastEditors  : xiaohao.li
 * @LastEditTime : 2024-01-19 13:06:44
 * @FilePath     : \nevergiveup\JavaScripts\Modules\TowerModule\Tower\FarmTower.ts
 * @Description  : 修改描述
 */
/*
 * @Author: shifu.huang
 * @Date: 2023-12-04 16:11:53
 * @LastEditors: shifu.huang
 * @LastEditTime: 2024-01-23 16:34:53
 * @FilePath: \nevergiveup\JavaScripts\Modules\TowerModule\Tower\FarmTower.ts
 * @Description: 修改描述
 */
import { CycleUtil } from '../../../CycleUtil';
import { GameManager } from '../../../GameManager';
import GainUI from '../../../UI/Tower/GainUI';
import Utils from '../../../Utils';
import { GameConfig } from '../../../config/GameConfig';
import { SoundUtil } from '../../../tool/SoundUtil';
import { TowerInfo } from '../TowerEnum';
import TowerBase from './TowerBase';

export default class FarmTower extends TowerBase {
    protected _accumulateDamage: number = 0;
    constructor(info: TowerInfo) {
        super(info, async () => {

        });
    }

    public get outputStr(): string {
        return StringUtil.format(GameConfig.Language.getElement("Text_FarmTowerStr").Value, Utils.numTofix(this._accumulateDamage, 2));
    }
    /**
     * 周期函数 每帧执行
     * @param dt 当前帧与上一帧的延迟 / 秒
     */
    public onUpdate(dt: number): void {
        if (!this._useUpdate) return;
        super.onUpdate(dt);
        this.farmCheck(dt);
    }

    public onDestroy(): void {
        super.onDestroy();
    }

    protected farmCheck(dt: number) {
        this._updateTime += dt;
        if (this._updateTime >= this.property.attackTime) {
            this._updateTime -= this.property.attackTime;
            this.farm();
        }
    }

    protected farm() {
        let value = this.property.attackDamage;
        GameManager.addGold(this.property.attackDamage, this.tower?.worldTransform?.position);
        this._accumulateDamage += value;

        let pos = Vector2.zero;
        let towerPos = this.tower?.worldTransform?.position;
        towerPos && ScreenUtil.projectWorldPositionToWidgetPosition(Player.localPlayer, towerPos, pos, true);
        if (pos && pos.x > 0 && pos.y > 0) {
            CycleUtil.playUIOnPosition(GainUI, pos, UILayerBottom, "+" + this.property.attackDamage);
        }
        this.farmShow();
    }

    private farmShow() {
        if (this.root?.getChildren().length > 0) {
            for (let i of this.root?.getChildren()) {
                if (i instanceof Sound) {
                    if (this._isFisrtShow || i["hsfVolume"] == null) i["hsfVolume"] = i.volume
                    i.volume = SoundUtil.attackVoiceFactor * i["hsfVolume"];
                    i.worldTransform.position = this.oriPos;
                    i.stop();
                    i.play();
                }
            }
        }
        this._isFisrtShow = false;
    }
}