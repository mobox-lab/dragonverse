import { BuffC, BuffManagerC, BuffSpawnInObjData, BuffSpawnInPlaceData, BuffSpawnInPlayerData, EBuffHostType, convertArrayToRotation, convertArrayToVector } from "module_buff";
import { BuffModuleS } from "./BuffModuleS";
import { GameConfig } from "../../config/GameConfig";
import BuffView from "./UI/BuffView";
import { BuffViewItem } from "./UI/BuffViewItem";
import { EBuffEffectType, getBuffClass } from "./Util/BuffUtil";
import { EventManager } from "../../tool/EventManager";
import { EAreaId, EModule_Events } from "../../const/Enum";
import { BuffC_Base } from "./Buff/BuffC_Base";
import { AttributeModuleC } from "../AttributeModule/AttributeModuleC";
import { Attribute } from "../PlayerModule/sub_attribute/AttributeValueObject";

export class BuffModuleC extends ModuleC<BuffModuleS, null>{
    private atrributeMD: AttributeModuleC = null;

    /**buffview 界面*/
    private buffview: BuffView;
    /**当前执行中的 buffViewItem key:buff配置表id  vlaue:buff界面ui*/
    private buffViewItemMap: Map<number, BuffViewItem> = new Map;
    /**buffViewItem 缓存池*/
    private buffViewItemPool: mwext.ObjPool<BuffViewItem>;
    /**客户端buff表现*/
    private buffs: Map<number, BuffC> = new Map<number, BuffC>();
    /**自己的buffmap */
    private selfBuffs: Set<BuffC> = new Set<BuffC>();

    onStart() {
        this.atrributeMD = ModuleService.getModule(AttributeModuleC);

        //初始化客户端的buff管理器 this._onBuffEffectPreCreate  this._onBuffPreCreate
        BuffManagerC.instance.init(GameConfig.Buff.getAllElement(), true, true);
        //监听buff表现开始创建,可以外部来创建buff表现 
        BuffManagerC.instance.onBuffPreCreate.add(this.listen_onBuffPreCreate.bind(this));
        //监听buff创建成功 spawnRule: EBuffSpawnRule = EBuffSpawnRule.Client
        BuffManagerC.instance.onBuffCreated.add(this.listen_onBuffCreated.bind(this));
        //监听buff开始创建特效，可以外部来生成特效
        BuffManagerC.instance.onBuffEffectPreCreate.add(this.listen_onBuffEffectPreCreate.bind(this));
        //监听buff将要销毁
        BuffManagerC.instance.onBuffPreDestroy.add(this.listen_onBuffPreDestroy.bind(this));

        this.buffview = mw.UIService.create(BuffView)

        //任务标记池初始化
        this.buffViewItemPool = new mwext.ObjPool<BuffViewItem>(
            () => {
                let buffViewItem = mw.UIService.create(BuffViewItem);
                mw.UIService.showUI(buffViewItem);
                return buffViewItem;
            },
            (item: BuffViewItem) => {
                // item.hide(); ERROR
            }
            ,
            (item: BuffViewItem) => {
                item.destroy();
            },
            (item: BuffViewItem) => {
                //item.hide(); ERROR
            },
            0,
        );

        EventManager.instance.add(EModule_Events.ui_openMainView, this.listen_openMainView.bind(this));
    }

    onEnterScene(sceneType: number): void {

    }

    protected onUpdate(dt: number): void {
        for (const [key, value] of this.buffs) {
            if (value instanceof BuffC_Base) {
                (value as BuffC_Base).onUpdate(dt)
            }
        }
    }

    /**自定义Buff管理 bug callAllClientFun */
    private listen_onBuffPreCreate(data: BuffSpawnInPlayerData | BuffSpawnInObjData | BuffSpawnInPlaceData, hostType: EBuffHostType): void {
        //console.error("自定义Buff buff管理 BuffModuleC:  onBuffPreCreate: buffName: ", JSON.stringify(data) + " hostType: " + hostType);
        //let areaId = this.atrributeMD.getAttributeValue(Attribute.EnumAttributeType.areaId, this.localPlayerId);
        let cls = null;
        // if (areaId == EAreaId.SecretArea) {
        //     cls = getBuffClass2(data.configId)[0]
        // } else {
        cls = getBuffClass(data.configId)[0]
        // }

        let buff = null

        //可以自己创建，指定buff类和新的位置朝向缩放
        if (hostType == EBuffHostType.Player) {
            let spawnInPlayerData = data as BuffSpawnInPlayerData;
            buff = BuffManagerC.instance.createBuffInPlayer(data.id,
                data.configId,
                spawnInPlayerData.playerId,
                cls, [spawnInPlayerData.playerId, spawnInPlayerData.args], spawnInPlayerData.slotIndex,
                convertArrayToVector(spawnInPlayerData.lPos),
                convertArrayToRotation(spawnInPlayerData.lRot),
                convertArrayToVector(spawnInPlayerData.scale, 1));

            if (spawnInPlayerData.playerId == this.localPlayerId.toString()) {
                this.selfBuffs.add(buff);
            }
        }
        else if (hostType == EBuffHostType.GameObject) {
            let spawnInObjData = data as BuffSpawnInObjData;
            buff = BuffManagerC.instance.createBuffInGameObject(data.id,
                data.configId,
                spawnInObjData.objGuid,
                cls,
                null,
                convertArrayToVector(spawnInObjData.lPos),
                convertArrayToRotation(spawnInObjData.lRot),
                convertArrayToVector(spawnInObjData.scale, 1));
        }
        else {
            let spawnInPlaceData = data as BuffSpawnInPlaceData;
            buff = BuffManagerC.instance.createBuffInPlace(data.id,
                data.configId,
                cls,
                null,
                convertArrayToVector(spawnInPlaceData.wPos),
                convertArrayToRotation(spawnInPlaceData.wRot),
                convertArrayToVector(spawnInPlaceData.scale, 1))
        }

        this.buffs.set(buff.id, buff);

    }

    /**监听buff 创建回调 */
    private listen_onBuffCreated(buff: BuffC): void {
        //oTrace("BuffModuleC:  onBuffCreated: buffName: ", buff.name);
    }

    /**监听buff开始创建特效，可以外部来生成特效 */
    private listen_onBuffEffectPreCreate(data: BuffSpawnInPlayerData | BuffSpawnInObjData | BuffSpawnInPlaceData, hostType: EBuffHostType) {
        //oTrace("BuffModuleC: listen_onBuffEffectPreCreate: ", JSON.stringify(data) + hostType);
    }

    /**监听buff将要销毁 */
    private listen_onBuffPreDestroy(buff: BuffC) {
        //oTrace("BuffModuleC:  onBuffPreDestroy: buffName: ", buff.name);
        this.buffs.delete(buff.id)

        if (buff.hostGuid == this.localPlayerId.toString()) {
            if (this.selfBuffs.has(buff)) {
                this.selfBuffs.delete(buff);
            }
        }
    }

    /**创建一个buff给玩家 */
    public createBuffOnPlayer(buffId: number): void {
        this.server.net_createBuff(buffId, this.localPlayerId, false);
    }

    /**创建一个buff给怪 */
    public createBuffOnScenceUnit(buffId: number, sceneUnitID: number, isClient: boolean, pos?: mw.Vector): void {
        this.server.net_createBuff(buffId, sceneUnitID, isClient, pos);
    }


    /**
    * 检查玩家有自生灼烧buff
    * @param formPlayerId 
    * @param toPlayID 
    */
    public checkCauterizeSelfBuff(toPlayID: number) {
        this.server.net_checkCauterizeSelfBuff(toPlayID);
    }


    /**主控界面控制 */
    private listen_openMainView(open: boolean) {

        if (this.buffview == null) return;
        if (open) {
            mw.UIService.showUI(this.buffview, mw.UILayerMiddle);
        } else {
            mw.UIService.hideUI(this.buffview);
        }

    }


    /**
     * 添加buffViewItems
     * @param buffConfigId 配置表id
     * @param time 时间 秒
     */
    public addBuffViewItems(buffConfigId: number[], time: number[]): void {
        for (let i = 0; i < buffConfigId.length; i++) {
            this.addBuffViewItem(buffConfigId[i], time[i])
        }
    }

    /**
     *  移除buffViewItems
     * @param buffConfigId 
     */
    public net_removeBuffViewItem(buffConfigId: number[]): void {
        for (let i = 0; i < buffConfigId.length; i++) {
            this.removeViewItem(buffConfigId[i])
        }
    }

    /**
    * 添加buffViewItem
    * @param buffConfigId 配置表id
    * @param time 时间 秒
    */
    public net_addBuffViewItem(buffConfigId: number, time: number): void {
        this.addBuffViewItem(buffConfigId, time)
    }

    /**
     * 添加buffViewItem
     * @param buffConfigId 配置表id
     * @param time  时间 秒
     * @returns 
     */
    public addBuffViewItem(buffConfigId: number, time: number): void {
        //没有icon不显示
        let cfg = GameConfig.Buff.getElement(buffConfigId);
        if (!cfg) return;
        let cfgicon = cfg.icon;
        if (!cfgicon || cfgicon == 0) return;

        let buffView: BuffViewItem = null;
        if (this.buffViewItemMap.has(buffConfigId)) {
            buffView = this.buffViewItemMap.get(buffConfigId);
        }
        else {
            buffView = this.buffViewItemPool.spawn()
            this.buffViewItemMap.set(buffConfigId, buffView);
            this.buffview.mBuffCanvas.addChild(buffView.uiObject);
            buffView.uiObject.size = new mw.Vector2(64, 64)  //buffView.uiObject.size = (new mw.Vector2(buffView.uiObject.size.x, buffView.uiObject.size.y));         
        }

        buffView.refash(cfg, this.removeViewItem.bind(this), time);
        //oTrace("net_addBuffViewItem_______________________", buffConfigId, cfg, cfg.icon);
    }

    /**
     * 移除某个buffbuffView
     * @param configId  配置表id
     */
    public removeViewItem(configId: number) {
        let buffView: BuffViewItem = null;
        if (this.buffViewItemMap.has(configId)) {
            buffView = this.buffViewItemMap.get(configId);
        }
        if (buffView) {
            this.buffViewItemMap.delete(configId);
            this.buffViewItemPool.despawn(buffView);
            buffView.hide();
        }
        //oTrace("removeViewItem__________________", configId);
    }

    /**
     * 移除所有buffViewItem
     */
    public removeAllBuffViewItem(): void {
        for (const [key, value] of this.buffViewItemMap) {
            this.buffViewItemPool.despawn(value);
        }
        this.buffViewItemMap.clear();
    }

    /**是否包含禁锢类型buff */
    public isHasLockBuff() {

        for (const tmpBuff of this.selfBuffs.values()) {

            if (tmpBuff.staticConfig.buffEffectType == EBuffEffectType.LockUp) {
                return true;
            }
        }

        return false;
    }

}


