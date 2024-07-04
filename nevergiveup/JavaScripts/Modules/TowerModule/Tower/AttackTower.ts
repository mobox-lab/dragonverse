/*
 * @Author: shifu.huang
 * @Date: 2023-12-04 16:11:53
 * @LastEditors: shifu.huang
 * @LastEditTime: 2024-01-22 18:58:42
 * @FilePath: \nevergiveup\JavaScripts\Modules\TowerModule\Tower\AttackTower.ts
 * @Description: 修改描述
 */
import { CycleUtil } from "../../../CycleUtil";
import { GameManager } from "../../../GameManager";
import { Config } from "../../../GameStart";
import Utils from "../../../Utils";
import { GameConfig } from "../../../config/GameConfig";
import { Enemy } from "../../../enemy/EnemyBase";
import { WaveManager } from "../../../stage/Wave";
import { SoundUtil } from "../../../tool/SoundUtil";
import { RANGEUNIT, TowerInfo } from "../TowerEnum";
import TowerBase from "./TowerBase";

export default class AttackTower extends TowerBase {
    public get outputStr(): string {
        return StringUtil.format(
            GameConfig.Language.getElement("Text_AttackTowerStr").Value,
            Utils.numTofix(this._accumulateDamage, 2)
        );
    }
    protected _attackAnim: Animation;
    protected _idleAnim: Animation;
    protected _weaponRoot: GameObject;
    protected _towerCha: Character;
    protected _accumulateDamage: number = 0;
    private _animationTime: number = 0;
    protected canBuffProperty: string[] = ["attackDamage", "attackRange", "findRange", "attackTime", "attackCount"];
    constructor(info: TowerInfo) {
        super(info, async () => {
            await AssetUtil.asyncDownloadAsset(this.cfg.attackAnim);
            await AssetUtil.asyncDownloadAsset(this.cfg.idleAnim);
            await this.root?.asyncReady();
            if (this.tower && this.tower instanceof Character) {
                this._towerCha = this.tower as Character;
                this._towerCha.asyncReady().then(async () => {
                    this._attackAnim = this._towerCha.loadAnimation(this.cfg.attackAnim);
                    this._attackAnim.speed = this.cfg.attackAnimSpeed[0];
                    this._attackAnim.loop = this.cfg.attackAnimSpeed[1];
                    this._idleAnim = this._towerCha.loadAnimation(this.cfg.idleAnim);
                    this._idleAnim.loop = 999999;
                    (await GameObjPool.asyncSpawn(this.cfg.weaponGuid)).asyncReady().then((go) => {
                        this._weaponRoot = go;
                        this._towerCha.attachToSlot(this._weaponRoot, HumanoidSlotType.RightHand);
                        this._weaponRoot.localTransform.position = Vector.zero;
                        this._weaponRoot.localTransform.rotation = Rotation.zero;
                    });
                });
            }
        });
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
        this.attackCheck(dt);
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

    protected attackCheck(dt: number) {
        this._updateTime += dt;
        if (this._updateTime >= this.property.attackTime) {
            this._updateTime -= this.property.attackTime;
            this.attack();
        }
    }

    protected attack() {
        const enemys = this.getRandEnemy(this.property.attackCount);
        if (!enemys || enemys.length <= 0) return;
        //没创建好就不旋转，让没创建好也能攻击
        if (
            this.tower?.worldTransform &&
            enemys[0]?.position?.x != null &&
            enemys[0]?.position?.y != null &&
            this.oriTransform
        ) {
            this.tower.worldTransform.rotation = Utils.TEMP_VECTOR.set(
                enemys[0].position.x - this.tower.worldTransform.position.x,
                enemys[0].position.y - this.tower.worldTransform.position.y,
                0
            )
                .toRotation()
                .add(this.oriTransform.rotation);
        }
        this.attackShow();
        this.makeDamage(enemys);
    }

    protected attackShow() {
        if (this._attackAnim) {
            this._attackAnim.play();
            this._animationTime = this.cfg.AtkAnimDur;
        }
        if (GameManager.useEffect) {
            setTimeout(() => {
                let effect = this._weaponRoot?.getChildren()[0]?.getChildren()[0] as Effect;
                if (effect) {
                    (effect as Effect).stop();
                    LinearColor.colorHexToLinearColor(this.cfg.effectColor[this.level], Utils.TEMP_COLOR);
                    effect.setColor("Color", Utils.TEMP_COLOR);
                    (effect as Effect).play();
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
            }, this.cfg.effectDelayTime);
        }
    }

    public makeDamage(enemys: Enemy[]) {
        // 造成伤害
        if (this.property.attackRange) {
            for (let enemy of enemys) {
                let around = WaveManager.getEnemiesInRadius(
                    [enemy.position.x, enemy.position.y],
                    this.property.attackRange * RANGEUNIT,
                    this.attackTags
                );
                if (!around || around.length === 0) return null;
                for (let i of around) {
                    let damage = 0;
                    if (this.cfg.attackBuff?.length > 0) {
                        damage = i.onHurt(this, () => {
                            for (let buff of this.cfg.attackBuff) {
                                i.applyBuff(buff);
                            }
                        });
                    } else {
                        damage = i.onHurt(this);
                    }
                    this.onDamage(damage);
                    const vScale = this.cfg.hitEffect * 2;
                    CycleUtil.playEffectOnPosition(
                        this.cfg.attackEffect,
                        enemy.position,
                        Utils.TEMP_VECTOR.set(vScale, vScale, vScale)
                    );
                }
            }
        } else {
            for (let enemy of enemys) {
                let damage = 0;
                if (this.cfg.attackBuff?.length > 0) {
                    damage = enemy.onHurt(this, () => {
                        for (let buff of this.cfg.attackBuff) {
                            enemy.applyBuff(buff);
                        }
                    });
                } else {
                    damage = enemy.onHurt(this);
                }
                this.onDamage(damage);
                const vScale = this.cfg.hitEffect * 2;
                CycleUtil.playEffectOnPosition(
                    this.cfg.attackEffect,
                    enemy.position,
                    Utils.TEMP_VECTOR.set(vScale, vScale, vScale)
                );
            }
        }
    }

    onDamage(amount: number) {
        this._accumulateDamage += amount;
        if (Utils.isLocalPlayer(this.info.playerID) && GameManager.getStageClient()) {
            GameManager.getStageClient().damage += amount;
        }
    }

    /**
     * 获取随机敌人
     * @returns 敌人
     */
    protected getRandEnemy(count: number = 1): Enemy[] {
        let attackRange = this.property.findRange;
        const enemies = WaveManager.getEnemiesInRadius(
            [this.oriPos.x, this.oriPos.y],
            RANGEUNIT / 2 + attackRange * RANGEUNIT,
            this.attackTags
        );
        if (!enemies && enemies.length === 0) return [];
        let targets: Enemy[] = [];
        for (let enemy of enemies) {
            // 0116 获取敌人就已经在攻击范围内的，不需要二次校验
            // if (this.checkInAttackRange(this.oriPos, enemy.position, this.property.findRange)) {
            if (targets.length < count) {
                targets.push(enemy);
            }
            if (targets.length >= count) break;
            // }
        }
        return targets;
    }

    /**
     * 检查敌人是否在攻击范围内
     * @param towerPos 炮塔位置
     * @param enemyPos 敌人位置
     * @param attackRange 攻击范围
     * @returns 是否在攻击范围内
     */
    protected checkInAttackRange(towerPos: Vector, enemyPos: Vector, attackRange: number) {
        if (towerPos.x + RANGEUNIT / 2 + attackRange * RANGEUNIT < enemyPos.x) return false;
        if (towerPos.x - RANGEUNIT / 2 - attackRange * RANGEUNIT > enemyPos.x) return false;
        if (towerPos.y - RANGEUNIT / 2 - attackRange * RANGEUNIT > enemyPos.y) return false;
        if (towerPos.y + RANGEUNIT / 2 + attackRange * RANGEUNIT < enemyPos.y) return false;
        return true;
    }
}
