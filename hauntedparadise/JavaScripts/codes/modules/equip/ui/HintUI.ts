import Hint_UI_Generate from "../../../../ui-generate/ShareUI/props/Hint_UI_generate";
import { ItemTraceHelper } from "../../inter/helper/ItemTraceHelper";
import GhostDistance_UI_Generate from "../../../../ui-generate/ShareUI/GhostDistance_UI_generate";
import { GeneralManager } from "../../../Modified027Editor/ModifiedStaticAPI";
import { CommonUtils } from "../../../utils/CommonUtils";
import { BagDefine, BagItemData } from "../../bag/BagDefine";
import { BagModuleC } from "../../bag/BagModuleC";
import { IItemElement } from "../../../../config/Item";
import { GameConfig } from "../../../../config/GameConfig";
import { CueCard } from "../items/CueCard";
import Tips from "../../../utils/Tips";
import { LanUtil } from "../../../utils/LanUtil";
import { UIBuyGiftBag } from "../../store/ui/UIBuyGiftBag";
import { IShopElement } from "../../../../config/Shop";

const nearVec = new Vector(200, 200, 200);

export class HintUI extends Hint_UI_Generate {
    private cardCfg: IItemElement;

    private _shopCfg: IShopElement;

    private _needCount: number = 0;

    onStart() {
        this.layer = UILayerBottom
        this.btn_useHint.onClicked.add(() => {
            if (!this.cardCfg) {
                console.error("没有提示卡道具配置！检查一下配置表拉！")
                return;
            }
            const itemCount = this.getItemCount();
            if (itemCount >= this._needCount) {
                let bagModC = ModuleService.getModule(BagModuleC);
                bagModC.reqChangeItemCount(-this._needCount, this.cardCfg.id);
                ItemTraceHelper.instance.startTrace();
                this.text_num.text = ""
            }
            else {
                if (this._shopCfg) {
                    UIService.show(UIBuyGiftBag, this._shopCfg.id);
                }
                else {
                    Tips.show(LanUtil.getText("hint_tips1"))
                }
            }
        })
        this.cardCfg = GameConfig.Item.getAllElement().find(e => {
            return e.clazz == CueCard.name;
        })
        if (this.cardCfg) {
            this._shopCfg = GameConfig.Shop.getAllElement().find(e => {
                return e.itemID == this.cardCfg.id;
            })
        }
        Event.addLocalListener(BagDefine.AddItemEvt, (itemData: BagItemData) => {
            if (!this.visible || !this.cardCfg) {
                return;
            }

            if (itemData.cfgId == this.cardCfg.id) {
                this.setNum(this._needCount);
            }
        })
    }

    setNum(num: number) {
        this._needCount = num;
        if (num == 0) {
            this.text_num.text = "";
        }
        else {
            let itemCount = this.getItemCount();
            this.text_num.text = `${num}/${itemCount}`
            if (this._needCount > itemCount) {
                this.text_num.fontColor = LinearColor.red;
            }
            else {
                this.text_num.fontColor = LinearColor.white;
            }
        }
    }

    private getItemCount() {
        if (!this.cardCfg) {
            console.error("没有提示卡道具配置！")
            return 0;
        }
        let itemNum = 0;
        let itemData = ModuleService.getModule(BagModuleC).getItemsById(this.cardCfg.id);
        if (itemData) {
            for (let index = 0; index < itemData.length; index++) {
                const element = itemData[index];
                itemNum += element.count;
            }
        }

        return itemNum;
    }
}


export class HintTraceUI extends GhostDistance_UI_Generate {
    /**角色 */
    private _char: mw.Character;
    /**玩家 */
    private _player: mw.Player;
    /** 追随的目标 */
    private _pathLoc: Vector

    private _target: Vector = Vector.zero;
    /**目标位置 */
    private _targetLoc: Vector = Vector.zero;
    /**屏幕外的位置 */
    private _outScreenPos: Vector2 = Vector2.zero;

    private _tempLoc: Vector = Vector.zero;

    private _startPos: Vector = Vector.zero;


    /** 叫声的计时器，到0就会叫一下，目前仅提供服务给墓地 */
    private timer: number = 0;

    /**
     * UI初始化，设置界面层级
     */
    onStart() {
        this.layer = mw.UILayerTop;
    }

    /**
     * 设置目标位置，功能为：初始化玩家和角色，设置目标位置，开启每帧更新
     * @param loc 目标位置
     */
    public setTargetLoc(pos: Vector, targetPos: Vector) {
        mw.UIService.showUI(this);
        if (!this._char) {
            this._player = Player.localPlayer;
            this._char = this._player.character;
        }
        this._pathLoc = pos;
        this._target = targetPos;
        this.canUpdate = true;
    }

    updateNextPos(charPos: Vector, dt: number) {
        this._startPos.set(charPos);
        this.timer += dt;
        if (this.timer <= 0.1) {
            return;
        }
        this.timer = 0;
        if (Navigation["getClosestReachablePoint"]) {
            this._startPos = Navigation["getClosestReachablePoint"](this._startPos, nearVec);
        }
        let pathes = Navigation.findPath(this._startPos, this._pathLoc);
        if (!pathes || pathes.length == 0) {
            pathes = [this._startPos, this._tempLoc.set(this._pathLoc)];
        }
        //pathes.push(this._target);
        //this._targetLoc.set(pathes[0]);
        this.showPointers(pathes);
    }

    /**
     * 每帧执行的方法，功能为：根据玩家当前位置和目标位置，计算出任务引导箭头的方向，当玩家与目标位置距离不足1时，关闭每帧执行
     * @param dt 时间间隔
     */
    onUpdate(dt: number) {
        this._targetLoc.set(this._target);
        if (!this._char || !this._char.worldTransform || !this._char.worldTransform.position) { this.canUpdate = false; return; }
        this.updateNextPos(this._char.worldTransform.position, dt);
        let dis = Vector.distance(this._char.worldTransform.position, this._targetLoc) / 100;

        let playerPos = this._char.worldTransform.position.clone();
        const sizeY = this.rootCanvas.size.y - 180;
        const sizeX = this.rootCanvas.size.x - 360;
        if (GeneralManager.modifyProjectWorldLocationToWidgetPosition(Player.localPlayer, this._targetLoc, this._outScreenPos, false)) {
            this._outScreenPos.subtract(new Vector2(90, 160));
            this._outScreenPos.x = MathUtil.clamp(this._outScreenPos.x, 0, sizeX)
            this._outScreenPos.y = MathUtil.clamp(this._outScreenPos.y, 0, sizeY)
            this.mCav.position = this._outScreenPos;
        } else {

            const vec2Offset = new Vector2(this._targetLoc.x, this._targetLoc.y)
                .subtract(playerPos)
                .normalize()
            const forwardVec = Camera.currentCamera.worldTransform.getForwardVector()
            const vec2Forward = new Vector2(forwardVec.x, forwardVec.y)
            const dotResult = vec2Forward.x * vec2Offset.x + vec2Forward.y * vec2Offset.y

            const rad = Math.acos(dotResult)
            const relativeVec = new Vector2(100 * Math.cos(rad), 100 * Math.sin(rad))
            const crossResult = this.V3Cross(new Vector(vec2Offset.x, vec2Offset.y, 0), new Vector(-forwardVec.x, -forwardVec.y, 0))
            if (crossResult.z > 0) {
                relativeVec.x = 1920 - relativeVec.x
            }
            let playerScreenPos = mw.Vector2.zero
            GeneralManager.modifyProjectWorldLocationToWidgetPosition(Player.localPlayer, playerPos, playerScreenPos, false)
            const guideUIPos = relativeVec.add(playerScreenPos)
            guideUIPos.x = MathUtil.clamp(guideUIPos.x, 0, sizeX)
            guideUIPos.y = MathUtil.clamp(guideUIPos.y, 0, sizeY)
            this.mCav.position = guideUIPos
        }
        if (dis >= 1000) {
            this.text_distance.text = CommonUtils.formatString("{0}", (dis / 1000).toFixed(2) + "km")
        }
        else {
            this.text_distance.text = CommonUtils.formatString("{0}", dis.toFixed(0) + "m")
        }
    }

    public V3Cross(v1: mw.Vector, v2: mw.Vector) {
        let x = v1.y * v2.z - v1.z * v2.y
        let y = v2.x * v1.z - v1.x * v2.z
        let z = v1.x * v2.y - v1.y * v2.x
        return new mw.Vector(x, y, z)
    }

    /**
     * Pointer渲染模式中，缓存的渲染对象。
     */
    _cachePointerGo = [];

    /**
     * 获取引导线地标生成间隔距离，主要用于Pointer的渲染模式
     * @returns
     */
    getGuideArrowIntervalDis() {
        return 150;
    }

    /**
    * 获取引导线最多显示的地标数量，主要用于Pointer的渲染模式
    * @returns
    */
    getGuideArrorShowMaxPointer() {
        return 10;
    }

    /**
     * 获取引导线地标是否粒子效果，主要用于Pointer的渲染模式
     * @returns
     */
    getGuideArrowPointerIsEffect() {
        return true;
    }

    /**
    * 获取引导线地标guid，主要用于Pointer的渲染模式
    * @returns
    */
    getGuideArrowPointerGuid() {
        return GameConfig.SubGlobal.CurCardEffect.string;
    }

    /**
     * 获取引导线地标缩放信息，主要用于Pointer的渲染模式
     * @returns
     */
    getGuideArrowPointerScale() {
        return GameConfig.SubGlobal.CurCardEffect.vector;
    }

    /**
     * 显示/更新 Pointer 的位置。以渲染引导线。
     * @param pos 所有要引导的位置
     */
    async showPointers(pos) {
        let intervalDis = this.getGuideArrowIntervalDis();
        let newPos = [];
        for (let i = pos.length - 1; i >= 0; i--) {
            let curPos = pos[i];
            if (i - 1 < 0) {
                break;
            }
            newPos.push(curPos);
            let nextPos = pos[i - 1];
            let dirInfo = nextPos.clone().subtract(curPos);
            let length = dirInfo.length;
            let dirNormal = dirInfo.normalized;
            let count = 1;
            while (length > intervalDis) {
                newPos.push(curPos.clone().add(dirNormal.clone().multiply(intervalDis * count)));
                length -= intervalDis;
                count++;
            }
        }
        pos = newPos;
        let lastDir;
        let cacheLength = this._cachePointerGo.length;
        let useCount = 0;
        for (let i = Math.max(0, pos.length - this.getGuideArrorShowMaxPointer()); i < pos.length; i++) {
            let go = null;
            const index = i;
            if (useCount >= cacheLength) {
                let trans = new Transform(pos[index], Rotation.zero, Vector.negOne.multiply(-1));
                if (this.getGuideArrowPointerIsEffect()) {
                    go = await mw.Effect.asyncSpawn(this.getGuideArrowPointerGuid(), { replicates: false, transform: trans });
                    if (go instanceof mw.Effect) {
                        go.loopCount = 0// = true;
                        go.play();
                    }
                }
                else {
                    go = await mw.GameObject.asyncSpawn(this.getGuideArrowPointerGuid(), { replicates: false, transform: trans });
                }
                go.setCollision(mw.PropertyStatus.Off);
                // go.setCollision(mw.PropertyStatus.Off);
                go.worldTransform.scale = this.getGuideArrowPointerScale();
                this._cachePointerGo.push(go);
                useCount++;
            }
            else {
                go = this._cachePointerGo[useCount];
                useCount++;
                if (this.getGuideArrowPointerIsEffect()) {
                    if (go instanceof mw.Effect) {
                        go.loop = true;
                        go.play();
                    }
                }
                go.worldTransform.position = pos[index];
            }
            if (pos.length > index + 1) {
                lastDir = (pos[index].subtract(pos[index + 1]));
                let dir = lastDir.toRotation();
                dir.x = 0;
                dir.y = 0;
                lastDir = dir.getForce();
                go.worldTransform.rotation = dir;
            }
            else {
                if (lastDir) {
                    go.worldTransform.rotation = lastDir.toRotation();
                }
            }
            go.setVisibility(mw.PropertyStatus.On);
        }
        for (let i = useCount; i < cacheLength; i++) {
            if (this.getGuideArrowPointerIsEffect()) {
                let eff = this._cachePointerGo[i];
                if (eff instanceof mw.Effect) {
                    eff.loop = false;
                    eff.stop();
                }
            }
            this._cachePointerGo[i].setVisibility(mw.PropertyStatus.Off);
        }
    }
}