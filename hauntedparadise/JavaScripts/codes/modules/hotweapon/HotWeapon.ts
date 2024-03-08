import { IBulletElement } from '../../../config/Bullet';
import { GameConfig } from '../../../config/GameConfig';
import { IHotWeaponElement } from '../../../config/HotWeapon';
import { IItemElement } from '../../../config/Item';
import { PlayerManagerExtension } from '../../Modified027Editor/ModifiedPlayer';
import { GeneralManager } from '../../Modified027Editor/ModifiedStaticAPI';
import { TimerOnly, WaitLoop } from '../../utils/AsyncTool';
import { CommonUtils } from '../../utils/CommonUtils';
import MusicMgr from '../../utils/MusicMgr';
import { ObjAniUtil } from '../../utils/ObjAniUtil';
import Tips from '../../utils/Tips';
import { BagModuleC } from '../bag/BagModuleC';
import { EquipModuleC } from '../equip/EquipModuleC';
import { Item, registerItem } from '../equip/items/Item';
import HotWeaponModuleC from './HotWeaponC';
import HotWeaponPanel from './ui/HotWeaponPanel';

@registerItem
export class HotWeaponItem extends Item {

    private get selfModule() {
        return ModuleService.getModule(HotWeaponModuleC);
    }

    protected onHand(element: IItemElement, itemIns: GameObject, ownerId: number): void {
        this.selfModule.equip(element, itemIns, ownerId);
    }

    protected onRemoveHand(element: IItemElement, ownerId: number): void {
        this.selfModule.unEquip(ownerId);
    }

    protected onUse(element: IItemElement): boolean {
        return true;
    }
}

export class HotWeapon {

    /** 发射子弹位置的锚点 */
    private bulletAnchor: GameObject;
    /** 被创建出来的武器模型 */
    private go: GameObject;
    /** 武器配置 */
    private weaponCfg: IHotWeaponElement;
    /** 子弹配置 */
    private bulletCfg: IBulletElement;

    public fireEffRot: Rotation = Rotation.zero;

    /** 自己 */
    private selfCha: Character;

    /** 主人 */
    private owner: Character;

    /** 主人的姿态 */
    public ownerStance: SubStance;

    private get isOwner() {
        return this.selfCha === this.owner;
    }

    /** 获取枪的后坐力 */
    public get backForce() {
        return Camera.currentCamera.worldTransform.getForwardVector().negative.multiply(this.weaponCfg.force);
    }

    public async setWeaponInfo(ownerId: number, go: GameObject, weaponCfg: IHotWeaponElement) {
        this.resetInfo();
        this.selfCha = Player.localPlayer.character;
        this.bulletCfg = GameConfig.Bullet.getElement(weaponCfg.bulletID);
        this.weaponCfg = weaponCfg;
        const player = await Player.asyncGetPlayer(ownerId);
        if (!player) { ModuleService.getModule(EquipModuleC).equip(null); console.error("武器装备失败！"); return; }
        this.owner = player.character;
        if (!this.owner) { console.error("武器装备失败！"); return; }
        this.go = go;
        if (!AssetUtil.assetLoaded(this.bulletCfg.modelGuid)) { AssetUtil.asyncDownloadAsset(this.bulletCfg.modelGuid); }
        this.fireEffRot = new Rotation(weaponCfg.fireEffRot[0], weaponCfg.fireEffRot[1], weaponCfg.fireEffRot[2]);

        // 以下是枪主的设定
        if (this.isOwner) {
            // 缓缓
            this.shiftTimer = setTimeout(() => {
                // 绑定枪口抖动相对信息
                this.preRot = go.localTransform.rotation.clone();
                this.prePos = go.localTransform.position.clone();
                this.toRot = new Rotation(this.preRot.x, this.preRot.y + this.weaponCfg.shakeRotY, this.preRot.z);
                this.toPos = new Vector(this.prePos.x + this.weaponCfg.shakePosX, this.prePos.y, this.prePos.z);

                // 绑定武器换弹偏移位置
                this.reloadRot = new Rotation(this.preRot.x - 90, this.preRot.y, this.preRot.z);
                this.reloadPos = new Vector(this.prePos.x, this.prePos.y + 10, this.prePos.z);
                this.halfTime = this.weaponCfg.shiftTime / 2 * 1e3;

                // 换弹
                this.shiftBullet();
            }, 5e2);
        } else {
            let stance = this.owner.loadSubStance("99647");
            stance.blendMode = StanceBlendMode.BlendUpper;
            stance.play();
            this.ownerStance = stance;
        }

        this.bulletAnchor = await GameObject.asyncSpawn("Anchor");
        this.bulletAnchor.parent = (this.go);
        this.bulletAnchor.localTransform.position = (weaponCfg.bulletLoc);
        this.bulletAnchor.localTransform.rotation = (Rotation.zero);
    }

    public get isEquip() {
        return this.go;
    }

    /** 清楚武器信息 */
    public clearWeaponInfo() {
        if (this.ownerStance) { this.ownerStance.stop(); }
        this.curBulletNum > 0 && ModuleService.getModule(BagModuleC).reqChangeItemCount(this.curBulletNum, this.bulletCfg.itemId);
        this.weaponCfg = null;
        this.go = null;
        this.resetInfo();
    }

    private resetInfo() {
        this.curBulletNum = 0;
        this._flyDirIndex = null;
        this.isShifting = false;
        this.shiftTimer && clearTimeout(this.shiftTimer);
        if (this.bulletAnchor) {
            this.bulletAnchor.destroy();
            this.bulletAnchor = null;
        }
    }

    /** 设置子弹显示信息 */
    public setUIBulletNum() {
        this.panel.setBulletLeft(this.curBulletNum);
    }

    /** 获取射击终点 */
    public getShootEndLoc() {
        let rst = ScreenUtil.getGameObjectByScreenPosition(this.centerPos.x, this.centerPos.y, this.weaponCfg.range, true, false);
        let endLoc;
        // 找到第一个不是触发器或者不是character的带碰撞的gameObj
        for (const hit of rst) {
            const go = hit.gameObject;
            if (go.parent && go.parent.name.includes("空气墙")) { continue; }
            if (go instanceof mw.Trigger || PlayerManagerExtension.isCharacter(go)) { continue; }
            endLoc = hit.position;
            return endLoc;
        }

        if (!endLoc) {
            let cs = Camera.currentCamera;
            let nowPos = cs.worldTransform.position;
            let toPos = cs.worldTransform.getForwardVector().multiply(this.weaponCfg.range);
            endLoc = toPos.add(nowPos);
        }
        return endLoc;
    }

    private _centerPos: Vector2;

    private get centerPos() {
        if (!this._centerPos) { this._centerPos = new Vector2(mw.getViewportSize().x / 2, mw.getViewportSize().y / 2); }
        return this._centerPos;
    }

    /** 当前子弹数量 */
    private curBulletNum: number = 0;

    /** 检查子弹够不够 */
    private checkBulletEnough() {
        if (this.curBulletNum <= 0) { this.shiftBullet(); return false; }
        return true;
    }

    private shiftTimer;

    public isShifting: boolean = false;

    private get panel() {
        return UIService.getUI(HotWeaponPanel);
    }

    /** 判断此时的枪中还有没有子弹 */
    public get bulletEnoughInWeapon(): boolean {
        return this.curBulletNum > 0;
    }

    /** 判断背包中还有没有子弹 */
    public get bulletEnoughInBag(): boolean {
        return ModuleService.getModule(BagModuleC).checkItemExist(this.bulletCfg.itemId);
    }

    public bulletCheck(id: number) {
        return this.bulletCfg.itemId === id;
    }

    /** 换弹 */
    public shiftBullet() {
        if (this.curBulletNum === this.weaponCfg.bulletNum) { console.error("欸，魔法披风哦兄die，子弹满滴得哇"); return; }
        // 正在换弹中不允许换弹了
        if (this.isShifting) { return; }
        // 背包中子弹不够了不允许换弹
        if (!this.bulletEnoughInBag) { console.error("背包中没得这把枪的子弹哦老表~_~"); return; }
        this.panel.enterCool(this.weaponCfg.shiftTime);
        this.isShifting = true;
        this.shiftTimer && clearTimeout(this.shiftTimer);
        this.playReloadBulletAni();
        MusicMgr.instance.play(this.weaponCfg.shiftMus);
        this.shiftTimer = setTimeout(async () => {
            this.isShifting = false;
            this.curBulletNum += await ModuleService.getModule(BagModuleC).reqChangeItemCount(this.curBulletNum - this.weaponCfg.bulletNum, this.bulletCfg.itemId);
            // 设置界面上子弹的数量
            this.setUIBulletNum();
        }, 1e3 * this.weaponCfg.shiftTime);
    }

    /** 开火 */
    public async fire(endPos: Vector) {
        /** 没有的话，就屏蔽了 */
        if (!this.weaponCfg) {
            return;
        }
        MusicMgr.instance.play(this.weaponCfg.fireSound, this.go.worldTransform.position);

        // 计算飞行时间
        let flyTime = Vector.distance(endPos, await this.getBulletPos()) / this.bulletCfg.flySpeed * 1e2;

        // 发射子弹
        let bullet = await this.createBullet(this.bulletCfg, this.weaponCfg);
        Vector.subtract(endPos, bullet.worldTransform.position, this.tempToRot);
        bullet.worldTransform.rotation = (this.tempToRot.toRotation());
        this.bulletAnchor && EffectService.playOnGameObject(this.weaponCfg.fireEffect, this.bulletAnchor, {
            position: this.weaponCfg.fireEffOffset,
            rotation: this.fireEffRot,
            scale: this.weaponCfg.fireEffScale,
            loopCount: 1
        });

        let bulletCfg = this.bulletCfg;

        ObjAniUtil.playPosAni(bullet, endPos, flyTime, () => {
            if (!bullet.getVisibility()) { return; }
            this.recycleBullet(bullet, bulletCfg, false);
        }, true, TweenUtil.Easing.Quadratic.Out);

        if (this.isOwner) {
            // 每次开完火，检查子弹够不够
            this.curBulletNum--;
            this.checkBulletEnough();
            // 设置界面上子弹的数量
            this.setUIBulletNum();
            this.playShakeAni();
        }
    }

    private reloadPos: Vector = Vector.zero;
    private reloadRot: Rotation = Rotation.zero;
    /** 换弹的一半时间 */
    private halfTime: number = 100;

    /** 播放武器换弹动画 */
    private playReloadBulletAni() {
        this.playCycleAni(this.halfTime, this.reloadRot, this.reloadPos);
    }

    /** 武器最初的相对镜头的旋转 */
    private preRot = Rotation.zero;

    private prePos = Vector.zero;

    /** 武器开火要抖动的相对幅度 */
    private toRot = Rotation.zero;

    /** 武器开火要抖动的相对位置 */
    private toPos = Vector.zero;

    /** 播放武器抖动动画 */
    public playShakeAni() {
        this.playCycleAni(this.weaponCfg.shakeTime, this.toRot, this.toPos);
    }

    /**
     * 播放一轮物体相对旋转和位置的yoyo动画
     * @param singleTime 单程动画时间
     */
    private playCycleAni(singleTime: number, toRot?: Rotation, toPos?: Vector) {
        toRot && ObjAniUtil.playRotAni(this.go, toRot, singleTime, () => {
            ObjAniUtil.playRotAni(this.go, this.preRot, singleTime, () => { }, false, TweenUtil.Easing.Quadratic.In)
        }, false, TweenUtil.Easing.Back.Out);

        toPos && ObjAniUtil.playPosAni(this.go, toPos, singleTime, () => {
            ObjAniUtil.playPosAni(this.go, this.prePos, singleTime, () => { }, false, TweenUtil.Easing.Quadratic.In)
        }, false, TweenUtil.Easing.Back.Out);
    }

    private tempToRot: Vector = Vector.zero;

    public async getBulletPos() {
        return this.bulletAnchor && this.bulletAnchor.worldTransform ? this.bulletAnchor.worldTransform.position : ((await WaitLoop.loop(() => { return this.bulletAnchor }, 10, 1e2)).worldTransform.position);
    }

    /** 拿子弹 */
    private async createBullet(bulletCfg: IBulletElement, weaponCfg: IHotWeaponElement) {
        let bullet = await GameObjPool.asyncSpawn(bulletCfg.modelGuid);
        this.bindTriggerEvt(bullet, bulletCfg, weaponCfg.damage);
        (bullet as Model).setCollision(mw.PropertyStatus.Off);
        bullet.setVisibility(PropertyStatus.On, true);
        bullet.worldTransform.position = await this.getBulletPos();
        CommonUtils.enableEffFromHost(bullet);
        return bullet;
    }

    /** 力的方向轴系数 */
    private _flyDirIndex: Vector;

    public get flyDirIndex() {
        if (!this._flyDirIndex) { this._flyDirIndex = new Vector(0, 0, this.bulletCfg.dirZIndex); }
        return this._flyDirIndex;
    }

    /** 绑定触发器事件 */
    private async bindTriggerEvt(bullet: GameObject, bulletCfg: IBulletElement, dmg: number) {
        if (!bullet) { await WaitLoop.loop(() => { return bullet; }) }
        let trigger = bullet.getChildren()[0] as Trigger;
        trigger.enabled = true;
        trigger.onEnter.clear();
        trigger.onEnter.add((obj: GameObject) => {
            if (obj.parent && obj.parent.name.includes("空气墙")) { return; }
            if (obj instanceof Character || obj instanceof mw.Trigger) { return; }
            if (obj.tag && obj.tag.includes("Ghost")) {
                // 真正造成伤害的权威端
                if (this.isOwner) {
                    // 计算子弹的力会包含方向
                    let force = bullet.worldTransform.getForwardVector().add(this.flyDirIndex).normalized.multiply(this.bulletCfg.force);
                    Event.dispatchToLocal("HitMonster", obj.gameObjectId, dmg, obj.tag, "hotHit", force);
                }
                MusicMgr.instance.play(bulletCfg.hitSound, bullet.worldTransform.position);
            }
            this.recycleBullet(bullet, bulletCfg, this.isOwner, this.getImpactPoint(trigger.worldTransform.position).toRotation());
        });
    }

    /** 获取打击点法线 */
    private getImpactPoint(endPos: Vector): Vector {
        let player = Player.localPlayer;
        if (!player) { return Vector.zero; }
        let startPos = player.character.worldTransform.position;
        // 延长一些
        let rotVec = endPos.clone().subtract(startPos).normalized.multiply(1e3);
        endPos = endPos.add(rotVec);
        let hitRes = QueryUtil.lineTrace(startPos, endPos, true);
        for (const res of hitRes) {
            if (res.gameObject && res.gameObject != player.character && !(res.gameObject instanceof Trigger)) {
                return res.impactNormal;
            }
        }
        return Vector.zero;
    }

    /** 回收位置 */
    private readonly farLoc = new Vector(0, 0, -1e9);

    private readonly hitEffRotOff: Rotation = new Rotation(0, -90, 0);

    /**
     * 回收子弹
     * @param bullet 子弹
     * @param bulletCfg 子弹配置
     * @param needEff 是否需要回收特效也就是击中特效
     * @param effRot 击中时特效的相对旋转 needEff为true时传这个才有用
     */
    private recycleBullet(bullet: mw.GameObject, bulletCfg: IBulletElement, needEff: boolean, effRot?: Rotation) {
        CommonUtils.disableEffFromHost(bullet);
        needEff && EffectService.playAtPosition(bulletCfg.hitEffect, bullet.worldTransform.position, {
            duration: 0.35,
            rotation: effRot.add(this.hitEffRotOff),
            scale: bulletCfg.effectZoom,
            loopCount: 1
        });
        GameObjPool.despawn(bullet);
        bullet.setVisibility(PropertyStatus.Off);
        let trigger = bullet.getChildren()[0] as mw.Trigger;
        trigger.enabled = false;
        bullet.worldTransform.position = this.farLoc.clone();
    }
}