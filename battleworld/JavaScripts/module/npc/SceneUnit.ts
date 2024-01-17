/** 
 * @Author       : fengqi.han
 * @Date         : 2023-11-30 17:44:50
 * @LastEditors  : fengqi.han
 * @LastEditTime : 2024-01-03 19:03:11
 * @FilePath     : \battleworld\JavaScripts\module\npc\SceneUnit.ts
 * @Description  : 修改描述
 */
import { PlayerManagerExtesion } from "../../Modified027Editor/ModifiedPlayer";
import { SpawnManager } from "../../Modified027Editor/ModifiedSpawn";
import { GameConfig } from "../../config/GameConfig";
import { IMascotNpcElement } from "../../config/MascotNpc";
import { Globaldata } from "../../const/Globaldata";
import { util } from "../../tool/Utils";
import { PickManagerS } from "../LandModule/PickManagerS";
import PlayerHeadUI from "../PlayerModule/UI/PlayerHeadUI";
import { Attribute } from "../PlayerModule/sub_attribute/AttributeValueObject";
import { IUnitBase } from "./IUnitBase";
import { UnitManager } from "./UnitManager";
import { MascotModuleS } from "./mascotNpc/MascotModuleS";

@Component
export default class SceneUnit extends Script implements IUnitBase {
    /** 场景单位唯一id */
    @mw.Property({ replicated: true, onChanged: "initUnit" })
    public unitId: number = 0;
    /** 当前血量 */
    @mw.Property({ replicated: true, onChanged: "updateHp" })
    public curHp: number = 0;
    /** 配置id */
    @mw.Property({ replicated: true })
    public cfgId: number = 0;
    /**属性信息(类型) */
    @mw.Property({ replicated: true })
    public attributeType: number[] = [];
    /**属性信息(值) */
    @mw.Property({ replicated: true })
    public attributeValue: number[] = [];
    /** 头顶信息ui */
    private _ui: PlayerHeadUI = null;
    /** 头顶widget */
    private _widget: UIWidget = null;

    /** 受伤阶段 */
    private _hurtIndex: number = 1;

    /**
     * 场景单位id修改，同步头顶ui和数据
     */
    protected async initUnit() {
        // 校验脚本绑定对象可能为空情况
        if (!this.gameObject) {
            await this.asyncReady();
        }
        if (!this.gameObject) return;
        // tserror 
        if (mw.Player.localPlayer == null) {
            let localPlayer = await mw.Player.asyncGetLocalPlayer();
            if (localPlayer) {
                await localPlayer.character.asyncReady();
            }
        }

        UnitManager.instance.addUnit(this.unitId, this);
        // 头顶ui
        if (!this._ui) {
            this._ui = mw.UIService.create(PlayerHeadUI);
        }
        let name = GameConfig.MascotNpc.getElement(this.cfgId).Name;
        this._ui.setName(name, 0);
        this._ui.setBindPId(this.unitId);
        // 创建ui控件
        if (!this._widget) {
            this._widget = (await GameObject.asyncSpawn("UIWidget")) as mw.UIWidget;
            this._widget.setTargetUIWidget(this._ui.uiWidgetBase);
            this._widget.widgetSpace = mw.WidgetSpaceMode.OverheadUI;
        }
        // 绑定
        if (PlayerManagerExtesion.isNpc(this.gameObject)) {
            this.gameObject.attachToSlot(this._widget, HumanoidSlotType.Root);
            this.gameObject.displayName = "";

        }
        this._widget.localTransform.position = new Vector(0, 0, 220);

        // tserror: tag undefined情况 容错处理
        if (this.gameObject instanceof mw.Character) {
            if (this.gameObject.isReady == false) {
                await this.gameObject.asyncReady();
                let tagId = this.unitId.toString();
                if (tagId != undefined && tagId != null && tagId != "") {
                    this.gameObject.tag = tagId;
                }
            }
        }

    }

    private async asyncReady() {
        return new Promise<void>((resolve, reject) => {
            if (this.gameObject != null) {
                resolve();
                return;
            }
            let count = 1;
            let readyId = setInterval(() => {
                if (this.gameObject != null || count > 10) {
                    clearInterval(readyId);
                    resolve();
                } else {
                    count++;
                }
            }, 100)
        });
    }


    /**
     * 血量同步，更新ui
     * @returns 
     */
    protected updateHp() {
        let maxHp = GameConfig.MascotNpc.getElement(this.cfgId).Hp;
        if (this.curHp <= 0) {
            UnitManager.instance.removeUnit(this.unitId);
        }
        if (!this._ui) return;
        this._ui.refash(maxHp, this.curHp);
    }

    /**
     * 服务端初始化npc
     */
    public init_S(cfg: IMascotNpcElement) {
        this.unitId = scenceIDManager.instance.getScenceID();
        this.curHp = cfg.Hp;
        this.cfgId = cfg.ID;
        this.setAttribute(Attribute.EnumAttributeType.maxHp, cfg.Hp);
        this.setAttribute(Attribute.EnumAttributeType.speed, cfg.DefaultSpeed);

        // npc显示
        this.init_awake();

        UnitManager.instance.addUnit(this.unitId, this);
    }

    /**唤醒npc */
    private async init_awake() {
        if (!this.gameObject) {
            await this.asyncReady();
        }
        if (this.gameObject instanceof mw.Character) {
            this.gameObject.complexMovementEnabled = true;
            this.gameObject.setVisibility(true);
            this.gameObject.setCollision(mw.PropertyStatus.On);
            this.gameObject.gravityScale = Globaldata.npc_gravityScale;
        }
    }

    public getUnitId() {
        return this.unitId;
    }
    /**获取npc模型 */
    public getModel() {
        if (this.gameObject == null) {
            return;
        }
        return this.gameObject as mw.Character;
    }

    /** 
     * 获取是否死亡
     */
    public isDead(): boolean {
        return this.curHp <= 0;
    }

    /**
     * 获取npc模型的坐标
     */
    public getModelLocaction() {
        if (this.gameObject == null) {
            return;
        }

        return this.gameObject.worldTransform.position;
    }

    setModelLocation(pos: mw.Vector) {
        if (this.gameObject == null) {
            return;
        }
        this.gameObject.worldTransform.position = pos;
    }


    /** 
     * 被攻击
     * @param atkVal 伤害
     */
    public onHurt(atkVal: number) {
        if (this.isDead()) return;
        this.curHp -= atkVal;
        let cfg = GameConfig.MascotNpc.getElement(this.cfgId)
        let maxHp = cfg.Hp;
        let dropHp = cfg.DropHp;
        if (this.curHp <= maxHp - dropHp * this._hurtIndex) {
            let drop = GameConfig.PropDrop.getElement(cfg.DropId);
            if (!drop) return;
            let loc = this.gameObject.worldTransform.position;
            PickManagerS.instance.creatDrop(drop.dropGuid, drop.dropType, drop, loc);
            this._hurtIndex++;
        }

        //死亡
        if (this.curHp <= 0) {
            this.npcDead(cfg);
        }
    }
    /**
     * npc死亡
     */
    private npcDead(cfg: IMascotNpcElement) {
        let effId = cfg.DisEff;
        let pos = this.gameObject.worldTransform.position;
        if (effId) {
            effId.forEach((id) => {
                util.playEffectAtLocation(id, pos);
            })
        }

        this.recycleNpc();

        this._hurtIndex = 0;
        ModuleService.getModule(MascotModuleS).unitRecycle(this.unitId);

    }

    /**
     * 回收npc
     */
    private recycleNpc() {
        if (this.gameObject == null) {
            return;
        }

        if (this.gameObject instanceof mw.Character) {
            this.gameObject.complexMovementEnabled = false;
            this.gameObject.setVisibility(false);
            this.gameObject.setCollision(mw.PropertyStatus.Off);
        }

        GameObjPool.despawn(this.gameObject);
        this.gameObject = null;
    }


    /**
     * 设置NPC属性
     */
    public setAttribute(type: Attribute.EnumAttributeType, value: number) {
        let typeIndex = this.attributeType.indexOf(type);
        if (type == Attribute.EnumAttributeType.hp) {
            value = Math.min(value, this.getValue(Attribute.EnumAttributeType.maxHp))
        }

        if (typeIndex == -1) {
            this.attributeType.push(type);
            this.attributeValue.push(value);
        }
        else {
            this.attributeValue[typeIndex] = value;
        }
        this.syncUnitSpeed(type);
    }
    /**
     * 同步npc速度
     */
    private syncUnitSpeed(type: Attribute.EnumAttributeType) {
        // 设置npc移动速度
        if (type == Attribute.EnumAttributeType.speed || type == Attribute.EnumAttributeType.speedAdd || type == Attribute.EnumAttributeType.speedMultiple) {
            let minSpeed = GameConfig.MascotNpc.getElement(this.cfgId).DefaultSpeed;
            let speed = Math.max(this.getValue(Attribute.EnumAttributeType.speed), minSpeed);

            if (!this.gameObject) return;
            let cha = this.gameObject as Character;
            cha.maxWalkSpeed = speed;
        }
    }
    /**
     * 获取npc属性
     * @param type 
     * @param isAdd 
     * @returns 
     */
    public getValue(type: Attribute.EnumAttributeType, isAdd: boolean = true) {
        let typeIndex = this.attributeType.indexOf(type);

        if (type >= 100) {
            return typeIndex == -1 ? 0 : this.attributeValue[typeIndex];
        }

        if (isAdd) {
            //加成类型
            let t_addType = type + Globaldata.addAttribueTypeVale;
            let t_MultipleType = type + Globaldata.multiplyAttribueTypeVale;

            let t_addTypeIndex = this.attributeType.indexOf(t_addType);
            let t_MultipleTypeIndex = this.attributeType.indexOf(t_MultipleType);
            //没有加成类型的属性 hp state
            if ((t_addType in Attribute.EnumAttributeType) == false || (t_MultipleType in Attribute.EnumAttributeType) == false) {
                return typeIndex == -1 ? 0 : this.attributeValue[typeIndex];
            } else {
                //加成类型的属性
                let t_normalValue = typeIndex == -1 ? 0 : this.attributeValue[typeIndex];
                let t_addValue = t_addTypeIndex == -1 ? 0 : this.attributeValue[t_addTypeIndex];
                let t_MultipleValue = t_MultipleTypeIndex == -1 ? 0 : this.attributeValue[t_MultipleTypeIndex];
                let t_finalValue = t_normalValue * (1 + t_MultipleValue / 100) + t_addValue;
                return t_finalValue;
            }
        } else {
            //一般类型的属性
            return typeIndex == -1 ? 0 : this.attributeValue[typeIndex];
        }
    }
    /**
     * 添加npc属性
     * @param type 
     * @param value 
     */
    public addValue(type: Attribute.EnumAttributeType, value: number) {
        let val = this.getValue(type);
        this.setAttribute(type, val + value);
    }
    /**
     * 减少npc属性
     * @param type 
     * @param value 
     */
    public reduceValue(type: Attribute.EnumAttributeType, value: number) {
        if (type == Attribute.EnumAttributeType.hp) {

        }
        let val = this.getValue(type);
        this.setAttribute(type, val - value);
    }

}

export class scenceIDManager {

    private static _instance: scenceIDManager = null;

    private static num = 0;
    public static get instance(): scenceIDManager {
        if (!this._instance) {
            this._instance = new scenceIDManager();
        }
        return this._instance;
    }

    public getScenceID(): number {
        //设置为7为数 8位数数组属性同步有问题
        scenceIDManager.num--;
        let id = scenceIDManager.num;
        return id;
    }

}