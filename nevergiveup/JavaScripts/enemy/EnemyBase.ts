/**
 * @Author       : xiaohao.li
 * @Date         : 2023-12-11 11:11:51
 * @LastEditors  : xiaohao.li
 * @LastEditTime : 2024-01-21 17:46:58
 * @FilePath     : \nevergiveup\JavaScripts\enemy\EnemyBase.ts
 * @Description  : 修改描
 */
import { EnemyActions, StageActions } from "../Actions";
import { CycleUtil } from "../CycleUtil";
import { GameManager } from "../GameManager";
import { MapManager } from "../MapScript";
import PlayerModuleC from "../Modules/PlayerModule/PlayerModuleC";
import TowerBase from "../Modules/TowerModule/Tower/TowerBase";
import TalentUtils from "../Modules/talent/TalentUtils";
import { WaveConfig } from "../StageEnums";
import GainUI from "../UI/Tower/GainUI";
import Utils from "../Utils";
import { GameConfig } from "../config/GameConfig";
import { IMonsterElement } from "../config/Monster";
import { StageUtil } from "../stage/Stage";
import { WaveUtil } from "../stage/Wave";
import { Buff, BuffBag, BuffManager } from "../tool/BuffTool";
import { BuffApplyType, EEnemyComponentType } from "../tool/Enum";
import { FlyText } from "../tool/FlyText";
import { BossComponent } from "./components/BossComponent";
import { ComponentFactory } from "./components/ComponentFactory";
import { FlyingComponent } from "./components/FlyingComponent";
import { IEnemyComponent } from "./components/IEnemyComponent";

export enum DamageType {
    ARMOR = 1,
    MAGIC = 2,
}
// （从1—6分别为光、暗、水、火、木、土）
export enum ElementEnum {
    LIGHT = 1,
    DARK = 2,
    WATER = 3,
    FIRE = 4,
    WOOD = 5,
    EARTH = 6,
}

export const advantageMap: { [key in ElementEnum]: ElementEnum } = {
    [ElementEnum.LIGHT]: ElementEnum.DARK, // 光克暗
    [ElementEnum.DARK]: ElementEnum.WOOD, // 暗克木
    [ElementEnum.WATER]: ElementEnum.FIRE, // 水克火
    [ElementEnum.FIRE]: ElementEnum.LIGHT, // 火克光
    [ElementEnum.WOOD]: ElementEnum.EARTH, // 木克土
    [ElementEnum.EARTH]: ElementEnum.WATER, // 土克水
};

export class Enemy implements BuffBag {
    time: number = 0;
    go: Character;
    destroyed: boolean = false;
    protected _speed: number = 100;
    hp: number = 100;
    hpMax: number = 100;
    escapeDamage: number = 30;
    position: Vector = new Vector(0, 0, 0);
    headUI: UIWidget;
    progressBar: ProgressBar;
    static count: number = 0;
    id: number;
    isHurt: boolean = false;
    goldAmount: number = 10;
    wave: number;
    name: string;
    configId: number;
    anim: Animation;
    hurtAmount: number;
    private _components: IEnemyComponent[] = [];
    buffManager: BuffManager;
    gate: number;

    // 护甲
    armor: number = 200;
    // 魔抗
    magicResist: number = 200;

    // 复原力参数
    healingTime: number = 0;

    // 狂暴化
    isBerserk: boolean = false;

    // 怪物初始化的时间
    createTime: number = 0;

    speedActive: boolean = false;
    armorActive: boolean = false;
    magicResistActive: boolean = false;
    isPromiseFinished: boolean = false;
    rootActiveTime: number = 0;

    constructor(wave: number, configId: number, gate: number, waveInfo?: WaveConfig) {
        this.id = Enemy.count;
        Enemy.count++;
        this.wave = wave;
        this.configId = configId;
        this.gate = gate;
        let config = GameConfig.Monster.getElement(configId);
        let stageConfig = GameManager.getStageConfig();
        let stage = GameManager.getStageClient();
        let waveConfig: WaveConfig;
        if (waveInfo) {
            waveConfig = waveInfo;
        } else {
            const [wc] = WaveUtil.fitOldConfig(stage.stageCfgId, wave + 1);
            waveConfig = wc;
        }

        let waveMultiplier = waveConfig?.hpMultiplier || 1;
        let difficlutyMutliplier = stageConfig.difficultyhp;
        let multiplayerMultiplier = GameManager.getMultiplayerMultiplier();
        this.hp = config.hp * difficlutyMutliplier * multiplayerMultiplier * waveMultiplier;
        this.armor = config.armor || 200;
        this.magicResist = config.magicResist || 200;
        this.hpMax = this.hp;
        this.speed = config.speed;
        this.hurtAmount = 0;
        const escapeDamagePercent = waveConfig?.escapeDamagePercent || 1;
        this.escapeDamage = Math.floor(config.escapeDamage * escapeDamagePercent);
        this.goldAmount = config.goldAmount;
        this.name = config.name;
        this.buffManager = new BuffManager();
        // 天赋树的 减速+减魔抗+减护甲
        const now = Math.floor(new Date().getTime() / 1000);
        this.createTime = now;
        // 减速持续5s
        const speedBonus = TalentUtils.getModuleCRunesValueById(1014);
        const speedBonus2 = TalentUtils.getModuleCRunesValueById(1038);
        const speedBonusD = TalentUtils.getModuleCRunesValueById(2004);
        this.speed = this.speed * (1 - (speedBonus + speedBonus2 + speedBonusD) / 100);
        // 减护甲和减魔抗持续10s
        const armorBonus = TalentUtils.getModuleCRunesValueById(1018);
        const MRBonus = TalentUtils.getModuleCRunesValueById(1019);
        const armorBonus2 = TalentUtils.getModuleCRunesValueById(1042);
        const MRBonus2 = TalentUtils.getModuleCRunesValueById(1043);
        this.armor = this.armor - armorBonus - armorBonus2;
        this.magicResist = this.magicResist - MRBonus - MRBonus2;
        // 初始化科技树的buff
        let unlockedTechNodes = GameManager.getStageClient().unlockedTechNodes;
        let buffIds = [];

        if (Array.isArray(config.buff)) {
            buffIds = buffIds.concat(config.buff);
        }

        for (let id in unlockedTechNodes) {
            let count = unlockedTechNodes[id];
            let cfg = GameConfig.TechTree.getElement(parseInt(id));
            if (!cfg) continue;
            for (let i = 0; i < count; i++) {
                buffIds = buffIds.concat(cfg.Effect);
            }
        }
        for (let i = 0; i < buffIds.length; i++) {
            const buffId = buffIds[i];
            let buff = GameConfig.Buff.getElement(buffId);
            if (buff.applyType == BuffApplyType.Enemy) {
                this.applyBuff(buffId);
            }
        }
        this.updateAttributes();
        this.init(config.guid, config);
    }

    updateBuffs(dt: number) {
        let buffs = this.buffManager.buffs;
        for (let i = buffs.length - 1; i >= 0; i--) {
            const buff = buffs[i];
            if (buff.cfg.duration >= 0) {
                buff.duration -= dt;
                if (buff.duration <= 0) {
                    let cfg = GameConfig.Buff.getElement(buff.id);
                    if (cfg.speed === 999) {
                        const config = GameConfig.Monster.getElement(this.configId);
                        this.speed = config.speed;
                        this.anim = this.go.loadAnimation(config.walkAnim);
                        if (GameManager.getStageClient()) {
                            this.anim.speed = GameManager.getStageClient().speedMultipler;
                            this.anim.loop = 0;
                            this.anim.play();
                        }
                    }
                    this.destroyBuff(buff);
                }
            }
            if (this.go?.isReady && buff.go?.isReady && !buff.attached) {
                buff.attached = true;
                let cfg = GameConfig.Monster.getElement(this.configId);
                this.go.attachToSlot(buff.go, cfg.buffSlot);
                buff.go.localTransform.position = cfg.buffSlotRelativePos.clone();
            }
        }
    }

    get speed() {
        return this._speed;
    }

    set speed(value: number) {
        let distance = this._speed * this.time;
        if (value <= 0) {
            this._speed = 1;
        } else {
            this._speed = value;
        }
        this.time = distance / this._speed;
    }

    applyBuff(buff: number) {
        const addBuffRes = this.buffManager.addBuff(buff);
        console.log(buff, addBuffRes, "addBuff");

        if (addBuffRes) {
            this.updateAttributes();
        }
    }

    destroyBuff(buff: Buff) {
        this.buffManager.removeBuff(buff);
        this.updateAttributes();
    }

    updateAttributes() {
        // for (const p in this.property) {
        //     // console.log(`${property}: ${this.property[property]}`);
        //     this.property[p] = this.calculateAttribute(p);
        // }
        // this.speed = this.calculateAttribute("speed");
        // this.hurtAmount = this.calculateAttribute("hurtAmount");
        const config = GameConfig.Monster.getElement(this.configId);
        const armorBonus = TalentUtils.getModuleCRunesValueById(1018);
        const MRBonus = TalentUtils.getModuleCRunesValueById(1019);
        const armorBonus2 = TalentUtils.getModuleCRunesValueById(1042);
        const MRBonus2 = TalentUtils.getModuleCRunesValueById(1043);
        // 削魔抗，削弱护甲，减速，禁锢，在这里处理 恢复也需要处理(测试失效)

        // 削弱魔抗
        const magicReductions = this.buffManager.buffs.filter((buff) => buff.cfg.magicReduction !== 0);
        if (magicReductions.length > 0) {
            // const sumMagicReduction = magicReductions.reduce((sum, item) => {
            //     return sum + item.cfg.magicReduction;
            // }, 0);
            const maxMagicReductionItem = magicReductions.reduce((maxItem, currentItem) => {
                return currentItem.cfg.magicReduction > (maxItem ? maxItem.cfg.magicReduction : -Infinity)
                    ? currentItem
                    : maxItem;
            }, null);
            if (this.magicResistActive) {
                this.magicResist = config.magicResist - maxMagicReductionItem.cfg.magicReduction;
            } else {
                this.magicResist = config.magicResist - maxMagicReductionItem.cfg.magicReduction - MRBonus - MRBonus2;
            }
        } else {
            if (this.magicResistActive) {
                this.magicResist = config.magicResist;
            } else {
                this.magicResist = config.magicResist - MRBonus - MRBonus2;
            }
        }
        // 削护甲
        const armorReductions = this.buffManager.buffs.filter((buff) => buff.cfg.armorReduction !== 0);
        if (armorReductions.length > 0) {
            // const sumArmorReductions = armorReductions.reduce((sum, item) => {
            //     return sum + item.cfg.armorReduction;
            // }, 0);
            const maxArmorReductionItem = armorReductions.reduce((maxItem, currentItem) => {
                return currentItem.cfg.armorReduction > (maxItem ? maxItem.cfg.armorReduction : -Infinity)
                    ? currentItem
                    : maxItem;
            }, null);
            if (this.armorActive) {
                this.armor = config.armor - maxArmorReductionItem.cfg.armorReduction;
            } else {
                this.armor = config.armor - maxArmorReductionItem.cfg.armorReduction - armorBonus - armorBonus2;
            }
        } else {
            if (this.armorActive) {
                this.armor = config.armor;
            } else {
                this.armor = config.armor - armorBonus - armorBonus2;
            }
        }

        // 减速和禁锢
        const buffs = this.buffManager.buffs;
        let speedUpTotal = 1;
        // 狂暴化
        const berserks = buffs.filter((buff) => buff.cfg.berserk !== 0);
        if (berserks.length > 0) {
            const maxBerserksItem = berserks.reduce((maxItem, currentItem) => {
                return currentItem.cfg.berserk > (maxItem ? maxItem.cfg.berserk : -Infinity) ? currentItem : maxItem;
            }, null);
            const speedUp = maxBerserksItem.cfg.berserk;
            if (this.isBerserk) {
                speedUpTotal = speedUp;
            }
        }

        const slowAndRoot = this.buffManager.buffs.filter((buff) => buff.cfg.speed !== 0);
        const speedBonus = TalentUtils.getModuleCRunesValueById(1014);
        const speedBonus2 = TalentUtils.getModuleCRunesValueById(1038);
        const speedBonusD = TalentUtils.getModuleCRunesValueById(2004);
        if (slowAndRoot.length > 0) {
            // 记录生效时间，和生效的时长
            const root = slowAndRoot.filter((buff) => buff.cfg.speed === 999);
            if (root.length > 0) {
                const now = Math.floor(new Date().getTime() / 1000);
                if (now - this.rootActiveTime > 5) {
                    this.rootActiveTime = now;
                    this.speed = 1;
                    this.anim = this.go.loadAnimation("217836");
                    if (GameManager.getStageClient()) {
                        this.anim.loop = 1;
                        let speedMultipler = GameManager.getStageClient().speedMultipler || 1;
                        this.anim.speed = speedMultipler;
                        this.anim.play();
                    }
                }
            } else {
                const maxSpeedItem = slowAndRoot.reduce((maxItem, currentItem) => {
                    return currentItem.cfg.speed > (maxItem ? maxItem.cfg.speed : -Infinity) ? currentItem : maxItem;
                }, null);
                if (this.speedActive) {
                    this.speed = config.speed * (1 - (speedBonusD + maxSpeedItem.cfg.speed) / 100) * speedUpTotal;
                } else {
                    this.speed =
                        config.speed *
                        (1 - maxSpeedItem.cfg.speed / 100 - (speedBonus + speedBonus2 + speedBonusD) / 100) *
                        speedUpTotal;
                }
                console.log(maxSpeedItem.cfg.speed, speedBonus, speedBonus2, speedBonusD, "生效的减速百分比");
                console.log("减速后的速度", this.speed);
            }
        } else {
            console.log("减速恢复", config.speed);
            if (this.speedActive) {
                this.speed = config.speed * (1 - speedBonusD / 100) * speedUpTotal;
            } else {
                this.speed = config.speed * (1 - (speedBonus + speedBonus2 + speedBonusD) / 100) * speedUpTotal;
            }
        }
    }

    calculateAttribute(attribute: string) {
        let config = GameConfig.Monster.getElement(this.configId);
        let baseValue = config[attribute] || 1;
        let modifiedValue = baseValue || 0;

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

    async addComponent(component: IEnemyComponent) {
        component.enemy = this;
        await component.init();
        this._components.push(component);
    }

    hasComponent<T extends IEnemyComponent>(componentClass: new (...args: any[]) => T): boolean {
        return this._components.some((c) => c instanceof componentClass);
    }

    hasComponentType(type: EEnemyComponentType) {
        if (this.isPromiseFinished) {
            return this._components.some((c) => c.type == type);
        } else {
            return true;
        }
    }

    getPositionAndIndex(
        points: number[][],
        distances: number[],
        totalDistance: number,
        speed: number,
        totalTime: number
    ): [number[], number] {
        const lerp = (a: number[], b: number[], t: number): number[] => {
            return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
        };

        let distanceTraveled = speed * totalTime;
        if (distanceTraveled >= totalDistance) {
            return [points[points.length - 1], points.length - 1]; // Reached the last point
        }

        let accumulatedDistance = 0;
        for (let i = 1; i < distances.length; i++) {
            accumulatedDistance += distances[i];
            if (accumulatedDistance >= distanceTraveled) {
                let segmentDistance = distances[i];
                let t = (distanceTraveled - (accumulatedDistance - segmentDistance)) / segmentDistance;
                return [lerp(points[i - 1], points[i], t), i - 1];
            }
        }
        return [points[0], 0];
    }

    private getRotation(a: number[], b: number[]): number {
        return (Math.atan2(b[1] - a[1], b[0] - a[0]) * 180) / Math.PI;
    }

    private setV1Desc(go: Character, desc: string) {
        let promise = new Promise(async (resolve, reject) => {
            if (go) {
                let character = go as Character;
                character.description.base.wholeBody = desc;
                let cb = () => {
                    character.onDescriptionComplete.remove(cb);
                    resolve(null);
                };
                character.onDescriptionComplete.add(cb);
            } else {
                resolve(null);
            }
        });
        return promise;
    }

    private async initHeadUI(character: Character) {
        let go = await GameObjPool.asyncSpawn("UIWidget");
        this.headUI = go as UIWidget;
        this.headUI.setUIbyID("D2D529D044E625A9633D50BC3325592D");
        this.headUI.getTargetUIWidget();
        this.headUI.interaction = true;
        this.headUI.widgetSpace = WidgetSpaceMode.OverheadUI;
        this.headUI.drawSize = new Vector2(200, 50);
        let ui = this.headUI.getTargetUIWidget();
        if (ui) {
            this.progressBar = ui.findChildByPath("RootCanvas/mHp") as ProgressBar;
        }
        this.onHealthChanged();
        character.attachToSlot(this.headUI, HumanoidSlotType.Nameplate);
        const v = this.configId === 1013 ? new Vector(0, 0, 220) : new Vector(0);

        this.headUI.localTransform.position = v;
    }

    private async initTail(character: Character, guid: string, slot: HumanoidSlotType) {
        let go = (await GameObjPool.asyncSpawn(guid)) as Effect;
        character.attachToSlot(go, slot);
        go.localTransform.position = new Vector(0, 0, 0);
        go.localTransform.scale = new Vector(0.5);
    }

    async init(desc: string, config: IMonsterElement) {
        if (MapManager.script) {
            let position = MapManager.getRoadPositions(this.gate)[0];
            if (!position) position = [0, 0, 0];
            this.position.set(position[0], position[1], position[2]);
        }
        const guideType = config?.guidType || 1;
        let go =
            guideType === 2
                ? ((await GameObjPool.asyncSpawn(desc)) as Character)
                : ((await GameObjPool.asyncSpawn("Character")) as Character);

        if (!go) {
            GameObjPool.despawn(go);
            return;
        }
        go.asyncReady().then(() => {
            //防御性代码，编辑器改了，预计上车最晚030，处理报错https://pandora.233leyuan.com/crashAnalysis/exceptionDetails?app_name=com.meta.box&start_time=1704816000&end_time=1704949200&request_id=1745310285780140033&requestIdDetail=1745310374485475329&kindIndex=0
            go?.overheadUI?.onDestroyDelegate?.clear();
        });
        go.complexMovementEnabled = false;
        go.worldTransform.position = new Vector(0, 0, 300000);
        go.collisionWithOtherCharacterEnabled = false;
        go.displayName = "";
        if (guideType === 1) {
            await this.setV1Desc(go, desc);
        }
        go.complexMovementEnabled = false;
        await this.initHeadUI(go);
        // await this.initTail(go, "142959", HumanoidSlotType.LeftFoot);
        // await this.initTail(go, "142959", HumanoidSlotType.RightFoot);

        let promises = [];
        let components = config.types || [];
        components.forEach((component) => {
            let c = ComponentFactory.createComponent(component);
            promises.push(this.addComponent(c));
        });
        this.anim = go.loadAnimation(config.walkAnim);
        if (GameManager.getStageClient()) {
            this.anim.speed = GameManager.getStageClient().speedMultipler;
            this.anim.loop = 0;
            this.anim.play();
        }

        StageActions.onSpeedMultiplierChanged.add((speed: number) => {
            if (!this.destroyed && this.anim) {
                this.anim.speed = speed;
            }
        });

        this.updatePosionAndRotation();

        await Promise.all(promises);
        this.isPromiseFinished = true;
        this.go = go;
        this.go.worldTransform.scale = new Vector(1);

        if (this.destroyed) {
            this.onDestroy(true);
        }
    }

    updatePosionAndRotation() {
        const lerp = (a: number, b: number, t: number): number => {
            if (t < 0) t = 0;
            if (t > 1) t = 1;
            return a + (b - a) * t;
        };
        let positions = this.hasComponent(FlyingComponent)
            ? MapManager.getFlyPositions(this.gate)
            : MapManager.getRoadPositions(this.gate);
        let distances = this.hasComponent(FlyingComponent)
            ? MapManager.getFlyDistances(this.gate)
            : MapManager.getDistances(this.gate);
        let totalDistance = this.hasComponent(FlyingComponent)
            ? MapManager.getTotalFlyDistance(this.gate)
            : MapManager.getTotalDistance(this.gate);
        let [position, index] = this.getPositionAndIndex(positions, distances, totalDistance, this._speed, this.time);

        if (index === positions.length - 1) {
            EnemyActions.onEscaped.call(this);
            if (position) {
                CycleUtil.playEffectOnPosition(
                    "113899",
                    new Vector(position[0], position[1], position[2]),
                    Vector.one,
                    LinearColor.colorHexToLinearColor("#FF6D63FF")
                );
            }
            this.destroy(false);
            return;
        }
        if (!position) return;
        this.position.set(position[0], position[1], position[2]);
        if (this.go) {
            this.go.worldTransform.position = this.position.add(
                Utils.TEMP_VECTOR.set(0, 0, (this.go.collisionExtent.z / 2) * this.go.worldTransform.scale.z)
            );
            let rotateSpeed = 360;

            // get the rotation of the current segment
            if (index > 0) {
                // get how much time into the current segment we are
                let accumulatedDistance = 0;
                for (let i = 1; i <= index; i++) {
                    accumulatedDistance += distances[i];
                }
                let timeInSegment = this.time - accumulatedDistance / this._speed;
                let fromRotation = this.getRotation(positions[index - 1], positions[index]);
                let toRotation = this.getRotation(positions[index], positions[index + 1]);
                if (toRotation - fromRotation > 180) {
                    fromRotation += 360;
                }

                if (fromRotation - toRotation > 180) {
                    toRotation += 360;
                }
                // rotate the minimum amount to get from the fromRotation to the toRotatiom

                let angleDiff = Math.abs(toRotation - fromRotation);
                let rotated = rotateSpeed * timeInSegment;
                let rotation = lerp(fromRotation, toRotation, rotated / angleDiff);
                this.go.worldTransform.rotation = Utils.TEMP_ROTATION.set(0, 0, rotation);
            } else {
                let rotation = this.getRotation(positions[index], positions[index + 1]);
                this.go.worldTransform.rotation = Utils.TEMP_ROTATION.set(0, 0, rotation);
            }
        }
    }

    scale(effect: number) {
        this.go.worldTransform.scale = new Vector(effect);
    }

    onDestroy(showAnim: boolean) {
        if (this._components) {
            this._components.forEach((component) => component.destroy());
        }
        if (this.headUI) {
            GameObjPool.despawn(this.headUI);
            this.headUI = null;
        }
        if (this.anim) {
            this.anim.stop();
            this.anim = null;
        }

        this.buffManager?.destroy();
        if (this.go) {
            if (showAnim) {
                let cfg = GameConfig.Monster.getElement(this.configId);
                let anim = this.go.loadAnimation(cfg.deadAnim);
                let speedMultipler = 1;
                if (GameManager.getStageClient()) {
                    speedMultipler =
                        GameManager.getStageClient().speedMultipler === 0
                            ? 1
                            : GameManager.getStageClient().speedMultipler;
                    anim.speed = speedMultipler;
                }
                anim.loop = 1;
                anim.play();
                setTimeout(() => {
                    GameObjPool.despawn(this.go);
                    this.go = null;
                }, (cfg.deadAnimDur * 1000) / speedMultipler);
            } else {
                GameObjPool.despawn(this.go);
                this.go = null;
            }
        }
    }

    onUpdate(dt: number) {
        this.healingMonster();
        this.dealRunes();
        // this.speedRecover();
        this.time += dt;
        this.updatePosionAndRotation();
        this._components.forEach((component) => component.update(dt));
        this.updateBuffs(dt);
    }

    destroy(showAnim: boolean) {
        this.destroyed = true;
        this.onDestroy(showAnim);
    }

    kill(showAnim: boolean = true) {
        if (this.destroyed) return;
        this.motherDead();
        // AirdropManager.createAirdrop(1001, this.position);
        this.destroy(showAnim);
        ModuleService.getModule(PlayerModuleC).onEnemyKilled();
        try {
            const monsterConfig = GameConfig.Monster.getElement(this.configId);
            const typesPlus: number[] = [...monsterConfig.types];
            const buffs = (monsterConfig?.buff || []).map((item) => GameConfig.Buff.getElement(item));
            const heal = buffs.filter((buff) => buff.healing !== 0);
            const berserk = buffs.filter((buff) => buff.berserk !== 0);
            if (heal.length > 0) {
                // 复原力
                typesPlus.push(11);
            }
            if (berserk.length > 0) {
                // 狂暴
                typesPlus.push(12);
            }
            let stage = GameManager.getStageClient();
            const stageCfg = GameConfig.Stage.getElement(stage.stageCfgId);
            const isInfinity = Utils.isInfiniteMode(stageCfg.groupIndex);
            ModuleService.getModule(PlayerModuleC).onEnemyTypeKilled(typesPlus, isInfinity);
        } catch (error) {
            console.log(error);
        }
        EnemyActions.onDie.call(this);
    }

    onHurt(tower: TowerBase, cb = () => {}) {
        if (this.destroyed) return 0;
        // 先让buff生成
        cb && cb();
        const buffs = this.buffManager.buffs;
        // 增伤buff
        // let sumHurtAmount = 0;
        // let sumHurtAmountPercent = 0;

        // buffs.forEach((item) => {
        //     sumHurtAmount += item.cfg.hurtAmount;
        //     sumHurtAmountPercent += item.cfg.hurtAmountPercent;
        // });
        // 飞行增伤
        let flyingDamageBoost = 0;
        let flyingBonus = 0;
        let flyingBonus2 = 0;
        if (this.hasComponent(FlyingComponent)) {
            const flyingDamageBoosts = buffs.filter((buff) => buff.cfg.flyingDamageBoost !== 0);
            if (flyingDamageBoosts.length > 0) {
                const maxArmorPenItem = flyingDamageBoosts.reduce((maxItem, currentItem) => {
                    return currentItem.cfg.flyingDamageBoost > (maxItem ? maxItem.cfg.flyingDamageBoost : -Infinity)
                        ? currentItem
                        : maxItem;
                }, null);
                flyingDamageBoost = maxArmorPenItem.cfg.flyingDamageBoost;
            }
            // 天赋树的对空加成
            flyingBonus = TalentUtils.getModuleCRunesValueById(1020);
            flyingBonus2 = TalentUtils.getModuleCRunesValueById(1044);
        }

        // 破甲和法穿
        const armorPens = buffs.filter((buff) => buff.cfg.armorPen !== 0);
        let armorPen: number = 0;
        if (armorPens.length > 0) {
            const maxArmorPenItem = armorPens.reduce((maxItem, currentItem) => {
                return currentItem.cfg.armorPen > (maxItem ? maxItem.cfg.armorPen : -Infinity) ? currentItem : maxItem;
            }, null);
            armorPen = maxArmorPenItem.cfg.armorPen;
        }

        const magicPens = buffs.filter((buff) => buff.cfg.magicPen !== 0);
        let magicPen: number = 0;
        if (magicPens.length > 0) {
            const maxMagicPenItem = magicPens.reduce((maxItem, currentItem) => {
                return currentItem.cfg.magicPen > (maxItem ? maxItem.cfg.magicPen : -Infinity) ? currentItem : maxItem;
            }, null);
            magicPen = maxMagicPenItem.cfg.magicPen;
        }

        // 基础伤害
        let damage = tower.attackDamage;
        console.log(damage, "damage");
        // 判断伤害的类型，根据tower的类型来判断
        const damageType = tower.cfg.adap;
        if (damageType === DamageType.ARMOR) {
            // 天赋树的物理攻击加成
            // 龙娘祝福
            const adBonus = TalentUtils.getModuleCRunesValueById(1001);
            const adBonus2 = TalentUtils.getModuleCRunesValueById(1025);
            const adBonusD = TalentUtils.getModuleCRunesValueById(2001);
            const adBonusInfinite = TalentUtils.getModuleCRunesValueById(1047);
            damage = damage * (1 + (adBonus + adBonus2 + adBonusD + adBonusInfinite) / 100);
            console.log(
                adBonus,
                adBonus2,
                adBonusD,
                adBonusInfinite,
                damage,
                "adBonus,adBonus2,adBonusD,adBonusInfinite,damage"
            );
        } else if (damageType === DamageType.MAGIC) {
            // 天赋树的魔法攻击加成
            // 龙娘祝福
            const apBonus = TalentUtils.getModuleCRunesValueById(1002);
            const apBonus2 = TalentUtils.getModuleCRunesValueById(1026);
            const apBonusD = TalentUtils.getModuleCRunesValueById(2002);
            const apBonusInfinite = TalentUtils.getModuleCRunesValueById(1048);
            damage = damage * (1 + (apBonus + apBonus2 + apBonusD + apBonusInfinite) / 100);
            console.log(
                apBonus,
                apBonus2,
                apBonusD,
                apBonusInfinite,
                damage,
                "apBonus,apBonus2,apBonusD,apBonusInfinite,damage"
            );
        }

        // 固定增伤
        let attackFixDamage = 0;
        const attackFixes = buffs.filter((buff) => buff.cfg.attackFixDamage !== 0);
        if (attackFixes.length > 0) {
            const maxAttackFixItem = attackFixes.reduce((maxItem, currentItem) => {
                return currentItem.cfg.attackFixDamage > (maxItem ? maxItem.cfg.attackFixDamage : -Infinity)
                    ? currentItem
                    : maxItem;
            }, null);
            attackFixDamage = maxAttackFixItem.cfg.attackFixDamage;
        }

        let attackDamagePercent = 0;
        const attackPercents = buffs.filter((buff) => buff.cfg.attackDamagePercent !== 0);
        if (attackPercents.length > 0) {
            const maxAttackPercentItem = attackPercents.reduce((maxItem, currentItem) => {
                return currentItem.cfg.attackDamagePercent > (maxItem ? maxItem.cfg.attackDamagePercent : -Infinity)
                    ? currentItem
                    : maxItem;
            }, null);
            attackDamagePercent = maxAttackPercentItem.cfg.attackDamagePercent;
        }
        const attackDamagePercentValue = tower.attackDamage * attackDamagePercent;
        const fixedDamage = attackFixDamage >= attackDamagePercentValue ? attackFixDamage : attackDamagePercentValue;
        // P1 伤害
        const P1Damage = damage * (1 + (flyingBonus + flyingBonus2) / 100) + flyingDamageBoost + fixedDamage;
        console.log(
            flyingBonus,
            flyingBonus2,
            attackFixDamage,
            attackDamagePercentValue,
            P1Damage,
            "flyingBonus,flyingBonus2,attackFixDamage,attackDamagePercentValue,P1Damage"
        );
        // P2 伤害
        const P2Percent = this.elementalRestraint(tower);
        const P2Damage = P1Damage * P2Percent;
        console.log(P2Percent, P2Damage, "P2Percent, P2Damage");
        // P3 伤害
        // 天赋树的物理斩杀和魔法压制
        const adExecute = TalentUtils.getModuleCRunesValueById(1017);
        const adExecute2 = TalentUtils.getModuleCRunesValueById(1041);

        const apExecute = TalentUtils.getModuleCRunesValueById(1021);
        const apExecute2 = TalentUtils.getModuleCRunesValueById(1045);
        let P3Damage = 0;
        if (damageType === DamageType.ARMOR) {
            // 物理伤害
            P3Damage = P2Damage * (1 - (this.armor - armorPen) / (200 + this.armor - armorPen));
            if (this.hp < this.hpMax * 0.2) {
                // 物理对于血量低于20%造成x%额外伤害
                P3Damage = P3Damage * (1 + (adExecute + adExecute2) / 100);
                console.log(adExecute, adExecute2, P3Damage, "adExecute, adExecute2, P3Damage");
            }
        } else if (damageType === DamageType.MAGIC) {
            P3Damage = P2Damage * (1 - (this.magicResist - magicPen) / (200 + this.magicResist - magicPen));
            if (this.hp > this.hpMax * 0.8) {
                // 魔法对于血量高于80%造成x%额外伤害
                P3Damage = P3Damage * (1 + (apExecute + apExecute2) / 100);
                console.log(apExecute, apExecute2, P3Damage, "apExecute, apExecute2, P3Damage");
            }
        } else {
            P3Damage = 0;
        }

        // 天赋树的全体怪物受到伤害增加x%
        const damageBonus = TalentUtils.getModuleCRunesValueById(1015);
        const damageBonus2 = TalentUtils.getModuleCRunesValueById(1024);
        const damageBonus3 = TalentUtils.getModuleCRunesValueById(1039);
        const damageBonus4 = TalentUtils.getModuleCRunesValueById(1046);

        P3Damage = P3Damage * (1 + (damageBonus + damageBonus2 + damageBonus3 + damageBonus4) / 100);
        console.log(
            damageBonus,
            damageBonus2,
            damageBonus3,
            damageBonus4,
            P3Damage,
            "damageBonus, damageBonus2, damageBonus3, damageBonus4, P3Damage"
        );
        const finalDamage = Math.min(P3Damage, this.hp);
        console.log(finalDamage, "finalDamage");
        this._components.forEach((component) => component.onHurt({ amount: damage }, tower.attackTags));
        // 多段伤害
        const multiHits = buffs.filter((buff) => buff.cfg.multiHit !== 0);

        if (multiHits.length > 0) {
            const maxMultiHitItem = multiHits.reduce((maxItem, currentItem) => {
                return currentItem.cfg.multiHit > (maxItem ? maxItem.cfg.multiHit : -Infinity) ? currentItem : maxItem;
            }, null);
            for (let i = 0; i < maxMultiHitItem.cfg.multiHit; i++) {
                GameManager.showDamage && this.damageShow(P3Damage);
                this.hp -= finalDamage;
                this.onHealthChanged();
                this.isHurt = true;
                if (this.position) {
                    FlyText.instance.showFlyText(finalDamage.toFixed(0), this.position);
                }
                if (this.hp < 0) {
                    break;
                }
            }
        } else {
            GameManager.showDamage && this.damageShow(P3Damage);
            this.hp -= finalDamage;
            this.onHealthChanged();
            this.isHurt = true;
            if (this.position) {
                FlyText.instance.showFlyText(finalDamage.toFixed(0), this.position);
            }
        }
        // 处理怪物本身的
        this.monsterBuffActive();
        if (this.hp <= 0) {
            this.kill();
        } else {
            if (this.go) {
                let cfg = GameConfig.Monster.getElement(this.configId);
                console.log(JSON.stringify(cfg), "config monster");

                if (cfg.hurtAnim) {
                    let anim = this.go.loadAnimation(cfg.hurtAnim);
                    anim.loop = 1;
                    anim.play();
                    setTimeout(() => {
                        if (this.anim) {
                            this.anim.play();
                        }
                    }, cfg.hurtAnimDur * 1000);
                }
            }
        }
        return finalDamage;
        // if (this.destroyed) return 0;
        // let damage = { amount: tower.attackDamage };
        // this._components.forEach((component) => component.onHurt(damage, tower.attackTags));
        // let finalDamage = Math.min(damage.amount * this.hurtAmount, this.hp);
        // GameManager.showDamage && this.damageShow(damage.amount * this.hurtAmount);
        // this.hp -= finalDamage;
        // this.onHealthChanged();
        // this.isHurt = true;
        // cb && cb();
        // if (this.position) {
        //     FlyText.instance.showFlyText(finalDamage.toFixed(0), this.position);
        // }
        // if (this.hp <= 0) {
        //     this.kill();
        // } else {
        //     if (this.go) {
        //         let cfg = GameConfig.Monster.getElement(this.configId);
        //         if (cfg.hurtAnim) {
        //             let anim = this.go.loadAnimation(cfg.hurtAnim);
        //             anim.loop = 1;
        //             anim.play();
        //             setTimeout(() => {
        //                 if (this.anim) {
        //                     this.anim.play();
        //                 }
        //             }, cfg.hurtAnimDur * 1000);
        //         }
        //     }
        // }
        // return finalDamage;
    }

    elementalRestraint(tower: TowerBase): number {
        // 获取tower的属性，获取怪物的属性，进行克制关系对比
        let monsterConfig = GameConfig.Monster.getElement(this.configId);
        const monsterElement = monsterConfig.elementTy;
        const towerElement = tower.cfg.elementTy;
        let result = 1;
        if (!monsterElement || !towerElement) {
            return result;
        }
        // 光克暗 暗克木 木克土 土克水 水克火 火克光
        // （从1—6分别为光、暗、水、火、木、土）
        const buffPercent = 0.3;
        const debuffPercent = 0.3;

        if (advantageMap[towerElement] === monsterElement) {
            // 塔克制怪物
            result = result * (1 + buffPercent);
            // 天赋树的元素克制时额外造成x%伤害
            const counter = TalentUtils.getModuleCRunesValueById(1022);
            result = result * (1 + counter / 100);
        } else if (advantageMap[monsterElement] === towerElement) {
            // 怪物克制塔
            result = result * (1 - debuffPercent);
            // 元素被克制时减少x%伤害削弱
            const countered = TalentUtils.getModuleCRunesValueById(1023);
            result = result * (1 - countered / 100);
        }
        // 天赋树的元素增伤
        // 光系塔伤害增加x%
        const lightBonus = TalentUtils.getModuleCRunesValueById(1007);
        // 暗系塔伤害增加x%
        const darkBonus = TalentUtils.getModuleCRunesValueById(1011);
        // 水系塔伤害增加x%
        const waterBonus = TalentUtils.getModuleCRunesValueById(1008);
        // 火系塔伤害增加x%
        const fireBonus = TalentUtils.getModuleCRunesValueById(1012);
        // 土系塔伤害增加x%
        const earthBonus = TalentUtils.getModuleCRunesValueById(1009);
        // 木系塔伤害增加x%
        const woodBonus = TalentUtils.getModuleCRunesValueById(1013);

        // 光系塔伤害增加x%
        const lightBonus2 = TalentUtils.getModuleCRunesValueById(1031);
        // 暗系塔伤害增加x%
        const darkBonus2 = TalentUtils.getModuleCRunesValueById(1032);
        // 水系塔伤害增加x%
        const waterBonus2 = TalentUtils.getModuleCRunesValueById(1033);
        // 火系塔伤害增加x%
        const fireBonus2 = TalentUtils.getModuleCRunesValueById(1035);
        // 土系塔伤害增加x%
        const earthBonus2 = TalentUtils.getModuleCRunesValueById(1036);
        // 木系塔伤害增加x%
        const woodBonus2 = TalentUtils.getModuleCRunesValueById(1037);

        if (towerElement === ElementEnum.LIGHT) {
            result = result * (1 + (lightBonus + lightBonus2) / 100);
        } else if (towerElement === ElementEnum.DARK) {
            result = result * (1 + (darkBonus + darkBonus2) / 100);
        } else if (towerElement === ElementEnum.WATER) {
            result = result * (1 + (waterBonus + waterBonus2) / 100);
        } else if (towerElement === ElementEnum.FIRE) {
            result = result * (1 + (fireBonus + fireBonus2) / 100);
        } else if (towerElement === ElementEnum.EARTH) {
            result = result * (1 + (earthBonus + earthBonus2) / 100);
        } else if (towerElement === ElementEnum.WOOD) {
            result = result * (1 + (woodBonus + woodBonus2) / 100);
        }

        return result;
    }

    monsterBuffActive() {
        const buffs = this.buffManager.buffs;
        // 狂暴化
        const berserks = buffs.filter((buff) => buff.cfg.berserk !== 0);
        if (berserks.length > 0) {
            const maxBerserksItem = berserks.reduce((maxItem, currentItem) => {
                return currentItem.cfg.berserk > (maxItem ? maxItem.cfg.berserk : -Infinity) ? currentItem : maxItem;
            }, null);
            const speedUp = maxBerserksItem.cfg.berserk;
            let config = GameConfig.Monster.getElement(this.configId);
            const percentHp = this.hp / config.hp;
            if (percentHp < 0.5 && !this.isBerserk) {
                this.isBerserk = true;
                this.speed = this.speed * speedUp;
            }
        }
    }

    motherDead() {
        const buffs = this.buffManager.buffs;
        // 母体
        const mothers = buffs.filter((buff) => buff.cfg.mother !== 0);
        if (mothers.length > 0) {
            const maxMotherItem = mothers.reduce((maxItem, currentItem) => {
                return currentItem.cfg.mother > (maxItem ? maxItem.cfg.mother : -Infinity) ? currentItem : maxItem;
            }, null);
            // todo 母体分裂
        }
    }

    healingMonster() {
        const buffs = this.buffManager.buffs;
        // 复原力
        const healings = buffs.filter((buff) => buff.cfg.healing !== 0);
        let healing: number = 0;
        if (healings.length > 0) {
            const maxHealingItem = healings.reduce((maxItem, currentItem) => {
                return currentItem.cfg.healing > (maxItem ? maxItem.cfg.healing : -Infinity) ? currentItem : maxItem;
            }, null);
            healing = maxHealingItem.cfg.healing;
            const date = new Date();
            const timestampInSeconds = Math.floor(date.getTime() / 1000);
            if (timestampInSeconds - this.healingTime > 1) {
                this.hp = this.hp + healing;
                this.healingTime = timestampInSeconds;
                this.onHealthChanged();
            }
        }
    }

    dealRunes() {
        const now = Math.floor(new Date().getTime() / 1000);
        const config = GameConfig.Monster.getElement(this.configId);
        const buffs = this.buffManager.buffs;
        let speedUpTotal = 1;
        // 狂暴化
        const berserks = buffs.filter((buff) => buff.cfg.berserk !== 0);
        if (berserks.length > 0) {
            const maxBerserksItem = berserks.reduce((maxItem, currentItem) => {
                return currentItem.cfg.berserk > (maxItem ? maxItem.cfg.berserk : -Infinity) ? currentItem : maxItem;
            }, null);
            const speedUp = maxBerserksItem.cfg.berserk;
            if (this.isBerserk) {
                speedUpTotal = speedUp;
            }
        }
        if (now - this.createTime > 5 && !this.speedActive) {
            this.speedActive = true;
            // 恢复速度
            const speedBonus = TalentUtils.getModuleCRunesValueById(1014);
            const speedBonus2 = TalentUtils.getModuleCRunesValueById(1038);
            const speedBonusD = TalentUtils.getModuleCRunesValueById(2004);
            // this.speed = this.speed * (1 + (speedBonus + speedBonus2 + speedBonusD) / 100);
            // 减速和禁锢
            const slowAndRoot = this.buffManager.buffs.filter((buff) => buff.cfg.speed !== 0);
            if (slowAndRoot.length > 0) {
                // 记录生效时间，和生效的时长
                const root = slowAndRoot.filter((buff) => buff.cfg.speed === 999);
                if (root.length > 0) {
                    this.speed = 1;
                    this.anim = this.go.loadAnimation("217836");
                    if (GameManager.getStageClient()) {
                        this.anim.loop = 1;
                        let speedMultipler = GameManager.getStageClient().speedMultipler || 1;
                        this.anim.speed = speedMultipler;
                        this.anim.play();
                    }
                } else {
                    const maxSpeedItem = slowAndRoot.reduce((maxItem, currentItem) => {
                        return currentItem.cfg.speed > (maxItem ? maxItem.cfg.speed : -Infinity)
                            ? currentItem
                            : maxItem;
                    }, null);
                    this.speed = config.speed * (1 - (speedBonusD + maxSpeedItem.cfg.speed) / 100) * speedUpTotal;
                }
            } else {
                this.speed = config.speed * (1 - speedBonusD / 100) * speedUpTotal;
            }
        }
        if (now - this.createTime > 10 && !this.armorActive) {
            // 恢复护甲
            this.armorActive = true;
            const armorBonus = TalentUtils.getModuleCRunesValueById(1018);
            const armorBonus2 = TalentUtils.getModuleCRunesValueById(1042);
            this.armor = this.armor + armorBonus + armorBonus2;
        }
        if (now - this.createTime > 10 && !this.magicResistActive) {
            // 恢复魔抗
            this.magicResistActive = true;
            const MRBonus = TalentUtils.getModuleCRunesValueById(1019);
            const MRBonus2 = TalentUtils.getModuleCRunesValueById(1043);
            this.magicResist = this.magicResist + MRBonus + MRBonus2;
        }
    }

    private damageShow(damage: number) {
        let pos = Vector2.zero;
        ScreenUtil.projectWorldPositionToWidgetPosition(
            Player.localPlayer,
            this.go?.worldTransform?.position,
            pos,
            true
        );
        if (pos.x > 0 && pos.y > 0) {
            CycleUtil.playUIOnPosition(GainUI, pos, UILayerBottom, "-" + damage);
        }
    }

    private onHealthChanged() {
        if (this.hasComponent(BossComponent)) {
            EnemyActions.onBossHpChanged.call(this);
        } else {
            if (!this.headUI) return;
            if (this.hp == this.hpMax) {
                this.headUI.setVisibility(PropertyStatus.Off);
            } else {
                if (!this.headUI.getVisibility()) {
                    this.headUI.setVisibility(PropertyStatus.On);
                }
            }
            if (this.progressBar) {
                this.progressBar.percent = this.hp / this.hpMax;
            }
        }
    }
}
