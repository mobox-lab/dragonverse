/**
 * @Author       : xiaohao.li
 * @Date         : 2023-12-10 18:45:52
 * @LastEditors  : xiaohao.li
 * @LastEditTime : 2023-12-11 14:12:22
 * @FilePath     : \nevergiveup\JavaScripts\Modules\TowerModule\Tower\FarmTower.ts
 * @Description  : 修改描述
 */
/*
 * @Author: shifu.huang
 * @Date: 2023-12-04 16:11:53
 * @LastEditors: shifu.huang
 * @LastEditTime: 2024-01-05 18:57:10
 * @FilePath: \nevergiveup\JavaScripts\Modules\TowerModule\Tower\BuffTower.ts
 * @Description: 修改描述
 */
import { CycleUtil } from "../../../CycleUtil";
import { GameManager } from "../../../GameManager";
import GainUI from "../../../UI/Tower/GainUI";
import Utils from "../../../Utils";
import { Buff } from "../../../tool/BuffTool";
import { SoundUtil } from "../../../tool/SoundUtil";
import { RANGEUNIT, TowerInfo } from "../TowerEnum";
import { TowerManager } from "../TowerManager";
import AttackTower from "./AttackTower";
import TowerBase from "./TowerBase";

export default class BuffTower extends TowerBase {
    protected canBuffProperty: string[] = ["findRange"];
    protected _towerCha: Character;
    protected _idleAnim: Animation;
    protected _weaponRoot: GameObject;

    constructor(info: TowerInfo) {
        super(info, async () => {
            await this.root?.asyncReady();
            if (this.tower && this.tower instanceof Character) {
                this._towerCha = this.tower as Character;
                this.tower.asyncReady().then(async () => {
                    this._idleAnim = this._towerCha.loadAnimation(this.cfg.idleAnim);
                    this._idleAnim.loop = 999999;
                    if (this.cfg.weaponGuid) {
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
                    }
                });
            }
        });
    }

    public get outputStr(): string {
        return "";
        // return "增益数: " + "还没做";
    }
    /**
     * 周期函数 每帧执行
     * @param dt 当前帧与上一帧的延迟 / 秒
     */
    public onUpdate(dt: number): void {
        if (!this._useUpdate) return;
        super.onUpdate(dt);
        if (!this._idleAnim?.isPlaying) {
            this._idleAnim?.play();
        }
        this.buffCheck(dt);
    }

    public onDestroy(): void {
        super.onDestroy();
        if (this._weaponRoot) {
            this._weaponRoot.parent = null;
            GameObjPool.despawn(this._weaponRoot);
        }
        if (this._idleAnim) {
            this._idleAnim.stop();
            this._idleAnim = null;
        }
    }

    protected buffCheck(dt: number) {
        this._updateTime += dt;
        if (this._updateTime >= this.cfg.attackTime[this.level]) {
            this._updateTime -= this.cfg.attackTime[this.level];
            this.addBuff();
        }
    }

    protected addBuff() {
        let towers = TowerManager.findTowers(
            [this.oriPos.x, this.oriPos.y],
            RANGEUNIT / 2 + this.property.findRange * RANGEUNIT
        );
        towers = towers.filter((tower) => tower instanceof AttackTower);
        towers.forEach((tower) => {
            if (Array.isArray(this.cfg.attackBuff?.[this.level])) {
                this.cfg.attackBuff[this.level].forEach((buff) => {
                    tower.applyBuff(buff);
                });
            }
        });
        this.farmShow();
    }

    private farmShow() {
        if (this.tower?.getChildren().length > 0) {
            for (let i of this.tower?.getChildren()) {
                if (i instanceof Sound) {
                    if (this._isFisrtShow || i["hsfVolume"] == null) i["hsfVolume"] = i.volume;
                    i.volume = SoundUtil.attackVoiceFactor * i["hsfVolume"];
                    i.play();
                }
            }
        }
        this._isFisrtShow = false;
    }
}
