import { AddGMCommand } from "module_gm";
import { GameConfig } from "../../../config/GameConfig";
import { BagItemData } from "../bag/BagDefine";
import { EquipDefine } from "./EquipDefine";
import { EquipModuleC } from "./EquipModuleC";
import { GlobalDefine } from "../../../DefNoSubModule";

@Component
export default class EquipScript extends mw.Script {

    @mw.Property({ replicated: true, onChanged: "onEquipDataChanged" })
    public equipData: BagItemData;

    @mw.Property({ replicated: true, onChanged: "onBrandTxtChanged" })
    public brandTxt: string = "";

    public lastEquipData: BagItemData = null;

    public screenGo: mw.GameObject;
    private _screenGoLocOffset = new Vector(0, 0, 0);
    private _screenGoQuatOffset = new Quaternion();

    private _cameraSys: Camera;

    private _isSelfChar: boolean = false;

    private _char: Character;

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        if (SystemUtil.isClient()) {
            this.initClient();
            ModuleService.ready().then(() => {
                ModuleService.getModule(EquipModuleC).registerEquipScript(this);
            })
        }
    }

    protected async initClient() {
        this._char = this.gameObject as Character;
        let localPlayer = await Player.asyncGetLocalPlayer();
        await this._char.asyncReady();
        this._isSelfChar = localPlayer.playerId == this._char.player.playerId;
        this._cameraSys = Camera.currentCamera;
        this.onEquipDataChanged();
        if (this.gameObject instanceof mw.Character) {
            if (this.gameObject.player && this.gameObject.player.playerId == Player.localPlayer.playerId) {
                // Test Command
                AddGMCommand("装备位置调整", (player, value) => {
                    const v = value.split("|").map((v) => Number(v));
                    this._screenGoLocOffset = new Vector(v[0], v[1], v[2]);
                    this.updateScreenItemPos();
                }, null, "屏幕物品");
                AddGMCommand("装备旋转调整", (player, value) => {
                    const v = value.split("|").map((v) => Number(v));
                    this._screenGoQuatOffset = new Rotation(v[0], v[1], v[2]).toQuaternion();
                    this.updateScreenItemPos();
                }, null, "屏幕物品");
                AddGMCommand("装备缩放调整", (player, value) => {
                    const v = value.split("|").map((v) => Number(v));
                    this._screenGoTrans.scale = new Vector(v[0], v[1], v[2]);
                    this.updateScreenItemPos();
                }, null, "屏幕物品");
            }
        }
    }

    private _screenGoTrans = new Transform();
    private _screenGoLocTarget = new Vector(0, 0, 0);
    private _tempQuat = new Quaternion();
    private _tempWorldSpace = new Vector(0, 0, 0);
    private _tempGoQuat = new Quaternion();

    protected onUpdate(dt: number): void {
        if (this.screenGo && this._cameraSys) {
            // this.updateScreenItemPos();
        }
    }

    async onEquipDataChanged() {
        if (!this._char || !this._char.worldTransform || !this._char.player) {
            return;
        }
        await ModuleService.ready();
        const clazzMap = ModuleService.getModule(EquipModuleC).clazzMap;
        if (this.lastEquipData) {
            const lastEle = GameConfig.Item.getElement(this.lastEquipData.cfgId);
            clazzMap.get(lastEle.clazz)?.removeHand(lastEle, this._char.player.playerId);
        }
        this.lastEquipData = this.equipData;

        let itemIns: GameObject;

        if (this._isSelfChar) {
            this._cameraSys = Camera.currentCamera;
            if (GlobalDefine.isThirdPerson) {
                itemIns = await this.tryEquipGoToChar();
            }
            else {
                itemIns = await this.tryEquipGoToScreen();
            }

            Event.dispatchToLocal(EquipDefine.EquipEvt, this.equipData)
        }
        else {
            itemIns = await this.tryEquipGoToChar();
        }

        if (this.equipData) {
            const ele = GameConfig.Item.getElement(this.equipData.cfgId);
            if (!ele) {
                console.error("[EquipScript] 道具配置不存在 : " + this.equipData.cfgId);
            }
            clazzMap.get(ele.clazz)?.hand(ele, itemIns, this._char.player.playerId);
            console.log("[EquipScript] 装备了道具 : " + JSON.stringify(this.equipData));
        }

        this.onBrandTxtChanged();
    }

    protected onDestroy(): void {
        this.screenGo?.destroy();
        this.screenGo = null;
    }

    private async tryEquipGoToChar() {
        if (!this.equipData) {
            this.screenGo?.destroy();
            this.screenGo = null;
            return;
        }
        const ele = GameConfig.Item.getElement(this.equipData.cfgId);
        if (!ele.res) {
            if (this.screenGo) {
                this.screenGo?.destroy();
                this.screenGo = null;
                this.useUpdate = false;
            }
            return;
        }
        if (!ele) {
            this.screenGo.destroy();
            this.screenGo = null;
        }
        let newGo = await GameObject.asyncSpawn(ele.res);
        if (!newGo || !newGo.worldTransform) {
            newGo = null;
            console.error("手持物资源生成失败" + ele.id)
            return;
        }
        newGo.setCollision(PropertyStatus.Off, true);
        if (this.screenGo) {
            this.screenGo.destroy();
            this.screenGo = null;
        }
        this.screenGo = newGo;
        this._char.attachToSlot(newGo, HumanoidSlotType.RightHand);
        newGo.localTransform.position = ele.otherLoc.clone();
        newGo.localTransform.rotation = new Rotation(ele.otherRot);
        newGo.localTransform.scale = ele.otherScale.clone();
        return newGo;
    }

    private async tryEquipGoToScreen() {
        if (this.screenGo) {
            this.screenGo?.destroy();
            this.screenGo = null;
            this.useUpdate = false;
        }
        if (!this.equipData) return;
        const curPlayer = await Player.asyncGetLocalPlayer();
        if (curPlayer.character != this.gameObject) return;
        const ele = GameConfig.Item.getElement(this.equipData.cfgId);
        if (!ele) return;
        if (!ele.res) {
            if (this.screenGo) {
                this.screenGo?.destroy();
                this.screenGo = null;
                this.useUpdate = false;
            }
            return;
        }
        let newGo = await GameObject.asyncSpawn(ele.res);
        if (this.screenGo) {
            this.screenGo?.destroy();
            this.screenGo = null;
            this.useUpdate = false;
        }
        this.screenGo = newGo;
        if (!this.screenGo || !this.screenGo.worldTransform) {
            this.screenGo = null;
            console.error("手持物资源生成失败" + ele.id)
            return;
        }
        (this.screenGo as Model).setCollision(PropertyStatus.Off, true);
        TimeUtil.delayExecute(() => {
            if (this.screenGo["setData"]) this.screenGo["setData"](this.equipData.customData);
        })
        this._screenGoLocOffset = ele.offsetLoc.clone();
        this._screenGoQuatOffset = new mw.Rotation(ele.offsetRot.x, ele.offsetRot.y, ele.offsetRot.z).toQuaternion();
        this._screenGoTrans.scale = ele.scale.clone();
        // 模拟物品拿出动画
        // const cameraTran = this._cameraSys.worldTransform;
        // this._tempQuat.fromRotation(cameraTran.rotation);
        const startLoc = this._screenGoLocOffset.clone();
        startLoc.y += 30;
        startLoc.z -= 40;
        Quaternion.multiplyVector(startLoc, this._tempQuat, this._tempWorldSpace);
        // Vector.add(cameraTran.position, this._tempWorldSpace, this._screenGoLocTarget)
        // this._screenGoTrans.position.set(this._screenGoLocTarget);
        this.screenGo.parent = this._cameraSys;

        this.updateScreenItemPos();

        this.useUpdate = true;
        // this.screenGo.worldTransform.position = (curPlayer.character.worldTransform.position)
        // const cameraGo = Camera.currentCamera["go"] as mw.GameObject;
        // this.screenGo.parent = cameraGo;
        // this.screenGo.localTransform.position = new Vector(0, 0, 0);
        return this.screenGo;
    }

    /** 更新玩家屏幕上物品的位置 */
    private updateScreenItemPos() {
        const cameraTran = this._cameraSys.worldTransform;
        this._tempQuat.fromRotation(cameraTran.rotation);
        Quaternion.multiplyVector(this._screenGoLocOffset, this._tempQuat, this._tempWorldSpace);
        Vector.add(cameraTran.position, this._tempWorldSpace, this._screenGoLocTarget)
        // Rotation.add(cameraTran.rotation, this._screenGoRotOffset, this._screenGoTrans.rotation);
        Quaternion.multiply(this._tempQuat, this._screenGoQuatOffset, this._tempGoQuat)
        this._screenGoTrans.rotation.fromQuaternion(this._tempGoQuat);
        // 模拟缓动
        // Vector.lerp(this._screenGoTrans.position, this._screenGoLocTarget, 0.7, this._screenGoTrans.position);
        this._screenGoTrans.position = this._screenGoLocTarget;
        this.screenGo.worldTransform = this._screenGoTrans;
    }

    onBrandTxtChanged() {
        if (!this.screenGo || this.brandTxt == "") {
            return;
        }
        if (!this.equipData) {
            return;
        }
        const clazzMap = ModuleService.getModule(EquipModuleC).clazzMap;
        const ele = GameConfig.Item.getElement(this.equipData.cfgId);
        if (!ele) {
            console.error("[EquipScript] 道具配置不存在 : " + this.equipData.cfgId);
        }
        clazzMap.get(ele.clazz)?.setText(this.screenGo, this.brandTxt);
    }
}