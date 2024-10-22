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
import { CycleUtil } from "../../../CycleUtil";
import { GameManager } from "../../../GameManager";
import GainUI from "../../../UI/Tower/GainUI";
import Utils from "../../../Utils";
import { GameConfig } from "../../../config/GameConfig";
import { SoundUtil } from "../../../tool/SoundUtil";
import TalentUtils from "../../talent/TalentUtils";
import { TowerInfo } from "../TowerEnum";
import TowerBase from "./TowerBase";

export default class FarmTower extends TowerBase {
    protected _accumulateDamage: number = 0;
    protected _weaponRoot: GameObject;
    protected _attackAnims: string[];
    protected _towerCha: Character;
    protected _attackAnim: Animation;
    protected _idleAnim: Animation;
    protected _attackRandomIndex: number = 0;
    private _animationTime: number = 0;

    constructor(info: TowerInfo) {
        super(info, async () => {
            this._attackAnims = [...this.cfg.attackAnim];
            await Promise.any(this._attackAnims.map((item) => AssetUtil.asyncDownloadAsset(item)));
            await AssetUtil.asyncDownloadAsset(this.cfg.idleAnim);
            await this.root?.asyncReady();
            if (this.tower && this.tower instanceof Character) {
                this._towerCha = this.tower as Character;
                this._towerCha.asyncReady().then(async () => {
                    this._attackAnim = this._towerCha.loadAnimation(this._attackAnims[0]);
                    this._attackAnim.speed = this.cfg.attackAnimSpeed[0];
                    this._attackAnim.loop = this.cfg.attackAnimSpeed[1];
                    this._idleAnim = this._towerCha.loadAnimation(this.cfg.idleAnim);
                    this._idleAnim.loop = 999999;
                    (await GameObjPool.asyncSpawn(this.cfg.weaponGuid)).asyncReady().then((go) => {
                        this._weaponRoot = go;
                        this._towerCha.attachToSlot(
                            this._weaponRoot,
                            this.cfg.weaponSlot ?? HumanoidSlotType.RightHand
                        );
                        this._weaponRoot.localTransform.position = this.cfg.weaponLocation
                            ? new Vector(...this.cfg.weaponLocation)
                            : Vector.zero;
                        this._weaponRoot.localTransform.rotation = Rotation.zero;
                    });
                });
            }
        });
    }

    public get outputStr(): string {
        return StringUtil.format(
            GameConfig.Language.getElement("Text_FarmTowerStr").Value,
            Utils.formatNumber(Math.floor(this._accumulateDamage))
        );
    }
    /**
     * 周期函数 每帧执行
     * @param dt 当前帧与上一帧的延迟 / 秒
     */
    public onUpdate(dt: number): void {
        if (!this._useUpdate) return;
        super.onUpdate(dt);
        if (this._attackAnim?.isPlaying) {
            //判空是为了让模型还没加载出来也能攻击
            this._animationTime -= dt;
            if (this._animationTime <= 0) {
                this._animationTime = 0;
                if (!this._idleAnim?.isPlaying) {
                    this._idleAnim?.play();
                }
            }
        } else if (!this._idleAnim?.isPlaying) {
            this._idleAnim?.play();
        }
        this.farmCheck(dt);
    }

    public onDestroy(): void {
        if (this._weaponRoot) {
            this._weaponRoot.parent = null;
            GameObjPool.despawn(this._weaponRoot);
        }
        if (this._idleAnim) {
            this._idleAnim.stop();
            this._idleAnim = null;
        }
        if (this._attackAnim) {
            this._attackAnim.stop();
            this._attackAnim = null;
        }
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
        // let value = this.property.attackDamage;
        // 这里不该读取加成后的
        const value = this.cfg.attackDamage[this.level];
        const goldAffect = TalentUtils.getModuleCRunesValueById(1006);
        const goldAffect2 = TalentUtils.getModuleCRunesValueById(1030);
        GameManager.addGold(
            Math.floor(this.property.attackDamage * (1 + goldAffect / 100 + goldAffect2 / 100)),
            this.tower?.worldTransform?.position
        );
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
        const effectDelay = this.cfg.effectDelayTime?.[this._attackRandomIndex] ?? 0;
        const characterDelay = this.cfg.characterDelayTime?.[this._attackRandomIndex] ?? 0;

        if (this._attackAnim) {
            // 随机攻击动画
            this._attackAnim = this._towerCha.loadAnimation(this._attackAnims[this._attackRandomIndex]);
            this._attackAnim.play();
            this._animationTime = this.cfg.AtkAnimDur;
        }

        // 武器攻击特效
        setTimeout(() => {
            const effect = this._weaponRoot?.getChildren()[0]?.getChildren()[0] as Effect;
            if (effect) {
                effect.stop();
                LinearColor.colorHexToLinearColor(this.cfg.effectColor[this.level], Utils.TEMP_COLOR);
                effect.setColor("Color", Utils.TEMP_COLOR);
                effect.play();
            }
            if (this.root?.getChildren().length > 0) {
                for (let i of this.root?.getChildren()) {
                    if (i instanceof Sound) {
                        if (this._isFisrtShow || i["hsfVolume"] == null) i["hsfVolume"] = i.volume;
                        i.volume = SoundUtil.attackVoiceFactor * i["hsfVolume"];
                        i.worldTransform.position = this.oriPos;
                        i.stop();
                        i.play();
                    }
                }
            }
            this._isFisrtShow = false;
        }, effectDelay);

        // Tower 特效
        setTimeout(() => {
            const effect = this.tower.getChildByName("effect01") as Effect;
            if (effect) {
                effect.stop();
                effect.play();
            }
        }, characterDelay);
    }
}
