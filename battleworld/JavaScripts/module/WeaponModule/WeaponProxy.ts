import { GameConfig } from "../../config/GameConfig";
import { IWeaponElement } from "../../config/Weapon";
import { EModule_Events, EWeaponEvent_C } from "../../const/Enum";
import { Globaldata } from "../../const/Globaldata";
import { EventManager } from "../../tool/EventManager";
import { EquipManager } from "../EquipModule/EquipManager";
import { MotionModuleC } from "../MotionModule/MotionModuleC";

/**
 * 武器代理用来控制武器缓存、创建、表现等
 */
export class WeaponProxy {
    /**动效模块 */
    private mMotion: MotionModuleC = null;

    private pId: number = 0;
    private weaponId: number = 0;
    private weaponPlayer: mw.Player = null;

    /**当前装备的武器配置 */
    private weaponCfg: IWeaponElement = null;

    /**当前装备的武器对象数组 */
    private curWeapons: mw.GameObject[] = [];
    /**当前背部武器对象数组 */
    private curBackWeapons: mw.GameObject[] = [];

    /**武器动画 */
    private weaponTweens: Set<mw.Tween<any>> = new Set();

    private visibleKey: any = null;

    private _weaponTween: mw.Tween<any> = null;
    private _weaponTween2: mw.Tween<any> = null;

    private _targetObj: mw.GameObject = null;


    /**检测 移动时武器回收key */
    private _checkWeaponKey: any = null;
    /**把武器放到背部延迟key */
    private _hideWeaponKey: any = null;
    private _isReleaseSkill: boolean = false;
    /**武器是否在背部 */
    private _isBack: boolean = true;

    constructor(pId: number) {
        this.pId = pId;


        this._checkWeaponKey = TimeUtil.setInterval(this.update_checkPutWeapon.bind(this), 0.2);

        this.mMotion = ModuleService.getModule(MotionModuleC);
    }

    /**检测玩家自动收起武器 */
    private async update_checkPutWeapon() {
        if (this.weaponCfg == null) return;
        if (this.weaponCfg.backPendantIds == null || this.weaponCfg.backPendantIds.length <= 0) return;

        if (this._isBack) {
            return;
        }

        if (this._isReleaseSkill) {
            return;
        }

        // 暂时改为只要移动就收回武器
        if (this.mMotion == null) {
            this.mMotion = ModuleService.getModule(MotionModuleC);
        }
        if (this.mMotion == null) {
            return;
        }
        if (this.mMotion.isHasPlayMotion(this.pId)) {
            return;
        }

        // 容错 玩家可能为空
        let player = mw.Player.getPlayer(this.pId);
        if (player == null) {
            return;
        }
        if (player.character == null) {
            return;
        }

        // 判断玩家是否跳跃
        let isjump = player.character.isJumping;
        if (isjump) {
            this.puWeaponToBack(0, true);
            return;
        }

        // 判断玩家是否位移 
        let velocity = player.character.velocity;
        if ((Math.abs(velocity.x) > 100 || Math.abs(velocity.y) > 100)) {
            this.puWeaponToBack(0, true);
            return;
        }

    }


    /**监听将武器放到手部 */
    public takeWeaponToHand() {

        this._isReleaseSkill = true;

        this.clear_hideWeapon();

        if (this._isBack == false) {
            return;
        }

        // 背部武器隐藏
        this.setBackVisible(false);
        // 手部武器显示
        this.setVisible(true);


        this._isBack = false;
    }

    /**
     * 玩家攻击结束将武器放到背部
     * @param time 延迟时间
     * @returns 
     */
    public takeWeaponToBack(time: number = Globaldata.putWeaponTime_motion) {

        this._isReleaseSkill = false;

        this.clear_hideWeapon();

        this._hideWeaponKey = setTimeout(() => {
            this._hideWeaponKey = null;
            this.puWeaponToBack(0, true);
        }, time * 1000);
    }

    /**清理背部武器延迟key */
    private clear_hideWeapon() {
        if (this._hideWeaponKey) {
            clearTimeout(this._hideWeaponKey);
            this._hideWeaponKey = null;
        }
    }

    /**立刻设置手部武器到背部 */
    private puWeaponToBack(time: number = 0, isCheck: boolean = false) {
        if (this._isBack) {
            return;
        }

        if (isCheck && this.isCanPutWeapon() == false) {
            return;
        }

        this.clear_hideWeapon();

        this._hideWeaponKey = setTimeout(() => {
            this._hideWeaponKey = null;
            // 隐藏手部武器
            this.setVisible(false);
            // 显示背部模式
            this.setBackVisible(true);
            // 播放背部武器动画
            this.playBackWeaponTween();
            this._isBack = true;

        }, time * 1000);

    }

    /**是否支持 把武器收到背部 */
    private isCanPutWeapon() {
        if (this.weaponCfg == null) {
            return false;
        }
        if (this.weaponCfg.backPendantIds == null ||
            this.weaponCfg.backPendantIds.length <= 0) {
            return false;
        }

        return true;
    }


    /**
     * 切换武器id
     * @param weaponId 武器id
     */
    public async changeWeaponId(weaponId: number) {
        if (this.weaponId == weaponId) {
            return;
        }

        if (this.weaponPlayer == null) {
            this.weaponPlayer = await mw.Player.asyncGetPlayer(this.pId);
        }

        if (this.weaponPlayer == null) {
            return;
        }

        this.weaponCfg = GameConfig.Weapon.getElement(weaponId);
        if (this.weaponCfg == null) {
            console.error("WeaponProxy:changeWeaponId ", this.pId, this.weaponId, weaponId);
            return;
        }
        this.weaponId = weaponId;

        this._isReleaseSkill = false;


        // 停止武器动画
        this.stopAllTween();
        // 停止隐藏延迟器
        this.clear_visibleKey();

        // 销毁之前装备的武器
        this.destroyWeapons();

        if (this.weaponCfg.pendantIds == null || this.weaponCfg.pendantIds.length == 0) {
            return;
        }

        // 添加武器
        for (let index = 0; index < this.weaponCfg.pendantIds.length; index++) {
            const pendantId = this.weaponCfg.pendantIds[index];
            let weaponObj = await EquipManager.instance.addPendant(this.weaponPlayer.character, pendantId);
            this.curWeapons.push(weaponObj);
        }

        // 添加背部武器如果存在的话
        if (this.weaponCfg.backPendantIds) {

            // 隐藏手部武器
            this.setVisible(false);
            for (let index = 0; index < this.weaponCfg.backPendantIds.length; index++) {
                const pendantId = this.weaponCfg.backPendantIds[index];
                let weaponObj = await EquipManager.instance.addPendant(this.weaponPlayer.character, pendantId);
                this.curBackWeapons.push(weaponObj);
            }
        }

    }

    /**
     * 销毁所有玩家当前装备的武器
     */
    private destroyWeapons() {

        for (let index = 0; index < this.curWeapons.length; index++) {
            const weaponObj = this.curWeapons[index];
            weaponObj.destroy();
        }
        this.curWeapons.length = 0;

        for (let index = 0; index < this.curBackWeapons.length; index++) {
            const weaponObj = this.curBackWeapons[index];
            weaponObj.destroy();
        }
        this.curBackWeapons.length = 0;
    }


    /**
     * 设置手部武器显示隐藏
     * @param visible true显示 false隐藏
     */
    public setVisible(visible: boolean) {

        let visibility = visible ? mw.PropertyStatus.On : mw.PropertyStatus.Off;
        for (let index = 0; index < this.curWeapons.length; index++) {
            const weaponObj = this.curWeapons[index];
            weaponObj.setVisibility(visibility, true);
        }

        EventManager.instance.call(EWeaponEvent_C.WeaponEvent_HasVisibleHandleWeapon_C, this.pId, visible);
    }

    /**手部武器是否显示 */
    public getVisible() {
        for (let index = 0; index < this.curWeapons.length; index++) {
            const weaponObj = this.curWeapons[index];
            if (weaponObj.getVisibility() == false) {
                return false;
            }
        }

        return true;
    }

    public isBack() {
        return this._isBack;
    }

    /**
     * 设置背部武器显示隐藏
     * @param visible true显示 false隐藏
     */
    public setBackVisible(visible: boolean) {
        let visibility = visible ? mw.PropertyStatus.On : mw.PropertyStatus.Off;

        for (let index = 0; index < this.curBackWeapons.length; index++) {
            const weaponObj = this.curBackWeapons[index];
            weaponObj.setVisibility(visibility, true);
        }

    }

    /**是否有背部武器 */
    public isHasBackWeapon() {
        return this.curBackWeapons.length > 0;
    }


    /**
     * 播放背部武器动画
     */
    private playBackWeaponTween() {
        for (let index = 0; index < this.curBackWeapons.length; index++) {
            const weaponObj = this.curBackWeapons[index];
            this.setWeaponMaterial(weaponObj, this.weaponCfg.material);
        }
        let weaponTween = new mw.Tween({ value: 0 }).to({ value: 1 }, Globaldata.putWeaponTime * 1000).onUpdate((data) => {
            Globaldata.tmpVector.x = 1;
            Globaldata.tmpVector.y = 1;
            Globaldata.tmpVector.z = data.value;
            for (let index = 0; index < this.curBackWeapons.length; index++) {
                const weaponObj = this.curBackWeapons[index];
                weaponObj.localTransform.scale = Globaldata.tmpVector;
            }
        }).onComplete(() => {
            for (let index = 0; index < this.curBackWeapons.length; index++) {
                const weaponObj = this.curBackWeapons[index] as mw.Model;
                weaponObj.localTransform.scale = Globaldata.tmpVector;
                if (weaponObj) {
                    let key = setTimeout(() => {
                        this.setWeaponMaterial(weaponObj, this.weaponCfg.resetMaterial);
                    }, Globaldata.putWeaponMaterial * 1000);
                }
            }
            this.weaponTweens.delete(weaponTween);
        });
        weaponTween.start();
        this.weaponTweens.add(weaponTween);
    }

    /**停止所有武器动画 */
    private stopAllTween() {
        if (this.weaponTweens.size == 0) {
            return;
        }
        this.weaponTweens.forEach((tween) => {
            tween.stop();
        });
        this.weaponTweens.clear();
    }


    /**设置玩家身上背的 */
    private setWeaponMaterial(weapon: mw.GameObject, material: string) {

        if (weapon instanceof mw.Model) {
            if (StringUtil.isEmpty(material)) {
                weapon.resetMaterial();
            } else {
                weapon.setMaterial(material);
            }
        }

        let childs = weapon.getChildren();

        if (childs == null) return;

        for (let index = 0; index < childs.length; index++) {
            const obj = childs[index];

            this.setWeaponMaterial(obj, material);
        }
    }

    /**
     * 控制指定索引武器隐藏
     * @param weaponIndex 
     * @param time 
     */
    public setVisibleWeaponByIndex(weaponIndex: number, time: number) {
        if (weaponIndex == -1) {
            this.setVisible(false);
            this.visibleKey = setTimeout(() => {
                this.visibleKey = null;
                this.setVisible(true);
            }, time * 1000);
            return;
        }

        let weaponObj = this.curWeapons[weaponIndex];
        if (weaponObj == null) {
            return;
        }

        weaponObj.setVisibility(mw.PropertyStatus.Off);
        this.visibleKey = setTimeout(() => {
            this.visibleKey = null;
            weaponObj.setVisibility(mw.PropertyStatus.On);
        }, time * 1000);

    }

    private clear_visibleKey() {
        if (this.visibleKey) {
            clearTimeout(this.visibleKey);
            this.visibleKey = null;
        }
    }

    /**
     * 播放武器动画  TODO 兼容动画编辑器多好
     * 火炮特有
     */
    public playWeaponTween() {
        if (this._targetObj) {

            if (this._weaponTween2) {
                this._weaponTween2.stop();
            }
            if (this._weaponTween) {
                this._weaponTween.stop();
            }

            this._weaponTween.start();
            return;
        }


        let prefabRoot = this.curWeapons[0];
        if (prefabRoot == null) {
            return;
        }

        this._targetObj = prefabRoot.getChildByName("cannon");
        if (this._targetObj == null) {
            return;
        }
        this._weaponTween = new mw.Tween({ time: 0 }).to({ time: 1 }, Globaldata.cannon_startTime * 1000).onUpdate((data) => {

            if (this._targetObj == null) {
                this._weaponTween.stop();
                return;
            }
            mw.Vector.lerp(Globaldata.cannon_startPos, Globaldata.cannon_endPos, data.time, Globaldata.tmpVector2);
            this._targetObj.localTransform.position = Globaldata.tmpVector2;
        }).onComplete(() => {
            this._weaponTween2.start();
        });

        this._weaponTween2 = new mw.Tween({ time: 1 }).to({ time: 0 }, Globaldata.cannon_endTime * 1000).onUpdate((data) => {

            if (this._targetObj == null) {
                this._weaponTween2.stop();
                return;
            }
            mw.Vector.lerp(Globaldata.cannon_startPos, Globaldata.cannon_endPos, data.time, Globaldata.tmpVector2);
            this._targetObj.localTransform.position = Globaldata.tmpVector2;
        });
        this._weaponTween.start();
    }


    /**销毁该脚本 */
    public destroy() {
        // 停止武器动画
        this.stopAllTween();
        // 停止隐藏延迟器
        this.clear_visibleKey();

        // 销毁武器
        this.destroyWeapons();


    }


}