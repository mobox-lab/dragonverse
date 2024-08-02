/**
 * @Author       : xiaohao.li
 * @Date         : 2023-12-05 17:18:45
 * @LastEditors  : xiaohao.li
 * @LastEditTime : 2024-01-19 13:37:04
 * @FilePath     : \nevergiveup\JavaScripts\Modules\TowerModule\Tower\TowerBase.ts
 * @Description  : 修改描述
 */
/*
 * @Author: shifu.huang
 * @Date: 2023-12-04 16:11:53
 * @LastEditors: shifu.huang
 * @LastEditTime: 2024-01-30 09:47:48
 * @FilePath: \nevergiveup\nevergiveup\JavaScripts\Modules\TowerModule\Tower\TowerBase.ts
 * @Description: 修改描述
 */
import { GameManager } from "../../../GameManager";
import { MapManager } from "../../../MapScript";
import Utils from "../../../Utils";
import { GameConfig } from "../../../config/GameConfig";
import { ITowerElement } from "../../../config/Tower";
import { Buff, BuffBag, BuffManager } from "../../../tool/BuffTool";
import { BuffApplyType, EEnemyComponentType } from "../../../tool/Enum";
import { MGSTool } from "../../../tool/MGSTool";
import { TowerEvent, TowerInfo } from "../TowerEnum";
import Log4Ts from "mw-log4ts";
import TalentUtils from "../../talent/TalentUtils";

export type TowerProperty = {
    attackTime: number;
    attackCount: number;
    attackRange: number;
    findRange: number;
    attackDamage: number;
};

export default abstract class TowerBase implements BuffBag {
    public info: TowerInfo;
    public root: GameObject;
    public tower: GameObject;
    public id: number;
    public cfg: ITowerElement;
    protected _useUpdate: boolean = false;
    protected _updateTime: number = 0;
    private _bottomEff: GameObject;
    private _levelShow: GameObject[] = [];
    public oriPos: Vector;
    protected _isFisrtShow: boolean = true;
    public buffManager: BuffManager;
    public property: TowerProperty;
    // 临时存的，用来兼容之前的代码
    public property2: TowerProperty;
    // 暖机的特效
    public propertyWarmUp: TowerProperty;
    public oriTransform: Transform;
    private _attackTags: EEnemyComponentType[];
    protected canBuffProperty: string[] = [];
    public get attackTags(): EEnemyComponentType[] {
        return this._attackTags;
    }
    public set attackTags(v: EEnemyComponentType[]) {
        this._attackTags = v;
    }
    public get level(): number {
        return this.info.level;
    }

    // 暖机
    createTime: number = 0;
    isWarmUp: boolean = false;

    private async setLevelEffect(ids: number[]) {
        try {
            // 卸载旧特效
            this._levelShow.forEach((go) => go && GameObjPool.despawn(go));
            this._levelShow = [];
            const elements = ids.map((id) => GameConfig.LevelEffect.getElement(id));
            const elementGos = await Promise.all(elements.map((element) => GameObjPool.asyncSpawn(element.effectGuid)));
            // 在升级组件初始化出来前，这个塔被删了
            if (!this.root) {
                elementGos.forEach((effect) => GameObjPool.despawn(effect));
                return;
            }
            elements.forEach((element, index) => {
                const go = elementGos[index];
                const tower = this.tower as Character;
                tower.attachToSlot(go, element.slot);
                go.localTransform.position = element.location ? new Vector(...element.location) : Vector.zero;
                if (go instanceof Effect) {
                    if (element.circulate) {
                        go.loopCount = 0;
                    }
                    go.play();
                }
                this._levelShow[index] = go;
            });
        } catch (error) {
            Log4Ts.error(TowerBase, error);
        }
    }

    public set level(v: number) {
        if (this.level == v) return;
        this.info.level = v;
        this.updateAttributes();
        // 一级, 暂时没有
        if (v === 0) {
            this.setLevelEffect([]).then();
        }
        // 二级
        if (v === 1) {
            const ids = this.cfg.guid2 ?? [];
            this.setLevelEffect(ids).then();
        }
        // 三级
        if (v === 2) {
            const ids = this.cfg.guid3 ?? [];
            this.setLevelEffect(ids).then();
        }
    }

    public get attackDamage(): number {
        return this.property.attackDamage;
    }

    constructor(info: TowerInfo, cb: () => void = () => {}) {
        const date = new Date();
        const timestampInSeconds = Math.floor(date.getTime() / 1000);
        this.createTime = timestampInSeconds;
        this.info = info;
        this.cfg = GameConfig.Tower.getElement(info.configID);
        this.oriPos = MapManager.getPositionFromId(this.info.placeID);
        this.property = {
            attackTime: 0,
            attackCount: 0,
            attackRange: 0,
            findRange: 0,
            attackDamage: 0,
        };
        this.buffManager = new BuffManager();
        // todo 初始化天赋树的攻速增强 距离增强
        // todo 龙娘祝福的增加
        const attackSpeed = TalentUtils.getModuleCRunesValueById(1004);
        const attackSpeed2 = TalentUtils.getModuleCRunesValueById(1028);
        const attackSpeedD = TalentUtils.getModuleCRunesValueById(2006);

        const attackRange = TalentUtils.getModuleCRunesValueById(1016);
        const attackRange2 = TalentUtils.getModuleCRunesValueById(1040);
        const attackRangeD = TalentUtils.getModuleCRunesValueById(2003);

        this.property2 = {
            attackTime: this.property.attackTime * (1 - (attackSpeed + attackSpeed2 + attackSpeedD) / 100),
            findRange: this.property.findRange * (1 + (attackRange + attackRange2 + attackRangeD) / 100),
            attackCount: 0,
            attackRange: 0,
            attackDamage: 0,
        };

        // 初始化科技树的buff
        let unlockedTechNodes = GameManager.getStageClient().getUnlockedTechNodes(info.playerID);
        console.log(unlockedTechNodes, "unlockedTechNodes");

        let buffIds: number[] = unlockedTechNodes.reduce((pre, cur) => {
            let cfg = GameConfig.TechTree.getElement(cur);
            if (!cfg) return pre;
            return pre.concat(cfg.Effect);
        }, []);
        if (Array.isArray(this.cfg.attackBuff) && Array.isArray(this.cfg.attackBuff?.[this.level])) {
            buffIds = buffIds.concat(this.cfg.attackBuff[this.level]);
        }
        for (let i = 0; i < buffIds.length; i++) {
            const buffId = buffIds[i];
            let buff = GameConfig.Buff.getElement(buffId);
            if (buff.applyType == BuffApplyType.Tower) {
                this.applyBuff(buffId);
            }
        }
        console.log(JSON.stringify(this.buffManager.buffs), "Tower Buff");

        this._attackTags = this.cfg.attackTags ? this.cfg.attackTags : [];
        Event.dispatchToLocal(TowerEvent.Create, this.info.placeID);
        this._useUpdate = true;
        this.initObj().then(async () => {
            cb && (await cb());
        });
        TimeUtil.delayExecute(() => {
            //类初始化完才加上这个
            this.updateAttributes();
        }, 1);
    }
    updateBuffs(dt: number) {
        let buffs = this.buffManager.buffs;
        for (let i = buffs.length - 1; i >= 0; i--) {
            const buff = buffs[i];
            if (buff.cfg.duration >= 0) {
                buff.duration -= dt;
                if (buff.duration <= 0) {
                    this.destroyBuff(buff);
                }
            }
            // 解决buff or 父节点还没ready的处理方式
            if (this.tower?.isReady && buff.go?.isReady && buff.go.parent != this.tower) {
                buff.go.parent = this.tower;
                const position =
                    Array.isArray(buff.cfg.guidPosition) && buff.cfg.guidPosition.length === 3
                        ? new Vector(buff.cfg.guidPosition[0], buff.cfg.guidPosition[1], buff.cfg.guidPosition[2])
                        : Vector.zero;
                buff.go.localTransform.position = position;
            }
        }
    }

    applyBuff(buff: number) {
        if (this.buffManager.addBuff(buff)) {
            this.updateAttributes();
        }
    }

    destroyBuff(buff: Buff) {
        this.buffManager.removeBuff(buff);
        this.updateAttributes();
    }

    updateAttributes() {
        for (const p in this.property) {
            // console.log(`${property}: ${this.property[property]}`);
            if (this.isWarmUp) {
                this.property[p] = this.property2[p] + this.calculateAttribute(p) + this.propertyWarmUp[p];
            } else {
                this.property[p] = this.property2[p] + this.calculateAttribute(p);
            }
        }
        console.log("hsfproperty====================== ", JSON.stringify(this.property));
        Event.dispatchToLocal(TowerEvent.UpdateInfo, this);
    }

    calculateAttribute(attribute: string) {
        let baseValue = this.cfg[attribute][this.level];
        let modifiedValue = baseValue;
        //只有攻击塔有累加伤害
        if (!this.canBuffProperty?.includes(attribute)) {
            return modifiedValue;
        } else {
            for (const buff of this.buffManager.buffs) {
                const buffCfg = buff.cfg;
                let value = buffCfg[attribute] ? buffCfg[attribute] : 0;
                if (buffCfg[`${attribute}Percent`]) {
                    value += (baseValue * buffCfg[`${attribute}Percent`]) / 10000;
                }
                modifiedValue += value;
            }
            return modifiedValue;
        }
    }

    public abstract get outputStr(): string;

    /**
     * 初始化物体
     */
    protected async initObj() {
        this.root = await GameObjPool.asyncSpawn(this.cfg.guid[0]);
        if (!this.root) return; //解决线上报错问题
        this.tower = this.root.getChildren()[0];
        if (!this.tower) return;
        this.initTower();
        this.oriTransform = this.tower.worldTransform.clone();
    }

    /**
     * 塔主体初始化
     */
    private initTower() {
        if (this.tower instanceof Character) {
            //人形塔的初始化
            this.tower.displayName = "";
            let setPos = () => {
                if (!this.tower) return;
                let tempTower = this.tower as Character;
                if (!tempTower || !this.oriPos) return; //可能setpos执行时候已经销毁了，所以oripos要判空，下同
                tempTower.complexMovementEnabled = false;
                tempTower.collisionWithOtherCharacterEnabled = false;
                tempTower.worldTransform.position = this.oriPos
                    ?.clone()
                    .add(Utils.TEMP_VECTOR.set(0, 0, tempTower.collisionExtent.z / 2));
                tempTower.setCollision(CollisionStatus.QueryOnly);
            };
            (this.tower as Character).asyncReady().then(() => {
                //防御性代码，编辑器改了，预计上车最晚030，处理报错https://pandora.233leyuan.com/crashAnalysis/exceptionDetails?app_name=com.meta.box&start_time=1704816000&end_time=1704949200&request_id=1745310285780140033&requestIdDetail=1745310374485475329&kindIndex=0
                (this.tower as Character)?.overheadUI?.onDestroyDelegate?.clear();
            });

            let cb = () => {
                setPos();
                // 解决报错(this.tower as Character)是null
                (this.tower as Character)?.onDescriptionComplete.remove(cb);
            };
            setPos();
            this.tower.onDescriptionComplete.add(cb);
            this.tower.setPostProcessOutline(true, new LinearColor(0, 0, 0), 2);
        } else {
            //非人形塔的初始化
            this.tower.worldTransform.position = this.oriPos;
            (this.tower as Model).setPostProcessOutline(true, new LinearColor(0, 0, 0), 2);
            (this.tower as Model).setCollision(CollisionStatus.QueryOnly);
        }
        this.tower.tag = "tower" + this.info.placeID;
        GameObjPool.asyncSpawn(
            Utils.isLocalPlayer(this.info.playerID)
                ? "C9F5FFD94363A60D67BC4397C21AEC3D"
                : "056EFC0F43BA0708EFCC0091F5BB59DC"
        ).then((effect) => {
            if (!effect) return;
            this._bottomEff = effect;
            this._bottomEff.worldTransform.position = this.oriPos;
        });
    }

    /**
     * 周期函数 每帧执行
     * @param dt 当前帧与上一帧的延迟 / 秒
     */
    public onUpdate(dt: number): void {
        this.updateBuffs(dt);
        this.warmUp();
    }

    // 暖机
    warmUp() {
        const buffs = this.buffManager.buffs;
        const warmUps = buffs.filter((buff) => buff.cfg.warmUp !== 0);
        if (warmUps.length > 0) {
            // todo 当前获取的规则就是第一个
            const warmUp = warmUps[0];
            const date = new Date();
            const timestampInSeconds = Math.floor(date.getTime() / 1000);
            if (timestampInSeconds - this.createTime > warmUp.cfg.warmUp && !this.isWarmUp) {
                this.isWarmUp = true;
                this.property = {
                    ...this.property,
                    attackTime: this.property.attackTime - warmUp.cfg.warmUpAttackTime,
                    findRange: this.property.findRange + warmUp.cfg.warmUpFindRange,
                    attackDamage: this.property.attackDamage + warmUp.cfg.warmUpAttackDamage,
                };
                this.propertyWarmUp = {
                    ...this.property,
                    attackTime: warmUp.cfg.warmUpAttackTime,
                    findRange: warmUp.cfg.warmUpFindRange,
                    attackDamage: warmUp.cfg.warmUpAttackDamage,
                };
            }
        }
    }
    /**
     * 销毁函数
     */
    public onDestroy(isPassive: boolean = false) {
        if (!isPassive && this.info.playerID == Player?.localPlayer?.playerId) {
            GameManager.addGold(this.cfg.sellBack[this.level], this.oriPos);
            MGSTool.goldChange(3, this.cfg.sellBack[this.level], 6);
        }
        this._useUpdate = false;
        if (this.tower) {
            if (this.tower instanceof Character) {
                (this.tower as Character)?.setCollision(CollisionStatus.Off);
            } else {
                (this.tower as Model)?.setCollision(CollisionStatus.Off);
            }
            this.tower.worldTransform = this.oriTransform;
            this.tower.tag = "";
        }
        this.root && GameObjPool.despawn(this.root);
        this._bottomEff && GameObjPool.despawn(this._bottomEff);
        this.buffManager?.destroy();
        this._levelShow.forEach((go) => go && GameObjPool.despawn(go));
        this._levelShow = [];
        this.root = null;
        this.tower = null;
        this._bottomEff = null;
        this.oriPos = null;
        Event.dispatchToLocal(TowerEvent.Destroy, this.info.placeID);
    }
}
