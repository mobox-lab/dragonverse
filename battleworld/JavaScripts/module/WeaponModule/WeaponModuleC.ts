import { GameConfig } from "../../config/GameConfig";
import { IWeaponTriggerElement } from "../../config/WeaponTrigger";
import { EAnalyticsEvents, EAttributeEvents_C, EEquipEvents_C, EModule_Events, EPlayerEvents_C, EWeaponEvent_C } from "../../const/Enum";
import { Globaldata } from "../../const/Globaldata";
import { EventManager } from "../../tool/EventManager";
import { MessageBox } from "../../tool/MessageBox";
import { Notice } from "../../tool/Notice";
import { AnalyticsTool, EFirstDo } from "../AnalyticsModule/AnalyticsTool";
import { AttributeModuleC } from "../AttributeModule/AttributeModuleC";
import { Attribute } from "../PlayerModule/sub_attribute/AttributeValueObject";
import { WeaponModuleData } from "./WeaponModuleData";
import { WeaponModuleS } from "./WeaponModuleS";
import { WeaponProxy } from "./WeaponProxy";


/**
 * 武器模块
 */
export class WeaponModuleC extends ModuleC<WeaponModuleS, WeaponModuleData>{

    /**玩家属性同步模块 */
    private mAttribute: AttributeModuleC = null;

    /**玩家武器代理 */
    private weaponProxyMap: Map<number, WeaponProxy> = new Map();



    protected onStart(): void {

        this.mAttribute = ModuleService.getModule(AttributeModuleC);

        // 监听玩家切换了武器
        EventManager.instance.add(EAttributeEvents_C.Attribute_WeaponId_Change_C, this.listen_weaponIdChange, this);
        // 监听批量修改玩家武器显隐
        EventManager.instance.add(EModule_Events.playerChangeEquipState, this.listen_playerChangeEquipState.bind(this));
        // 监听玩家指定索引位武器显隐
        EventManager.instance.add(EEquipEvents_C.equip_visibleWeapon_c, this.listen_visibleWeaponByIndex, this);
        // 播放武器动画  目前只有火炮  后续拓展为动画编辑器
        EventManager.instance.add(EEquipEvents_C.equip_playWeaponTween, this.listen_playWeaponTween.bind(this));


        // 监听玩家释放技能，将武器从背部拿出来
        EventManager.instance.add(EWeaponEvent_C.WeaponEvent_TakeWeaponToHand_C,
            this.listen_takeWeaponToHand, this);
        // 监听玩家释放技能结束，将武器放到背部
        EventManager.instance.add(EWeaponEvent_C.WeaponEvent_TakeWeaponToBack_C,
            this.listen_takeWeaponToBack, this);

        EventManager.instance.add(EPlayerEvents_C.Player_Visible_C, this.listen_playerVisible, this);

        this.init_weaponTrigger();

        mw.Player.onPlayerLeave.add(this.listen_playerLeave.bind(this));
    }

    /**
     * 玩家显示隐藏
     * @param pId 玩家id
     * @param visible true显示 false隐藏
     */
    private listen_playerVisible(pId: number, visible: boolean) {
        if (this.weaponProxyMap.has(pId) == false) {
            return;
        }
        // 判断当前装备的武器是否为背部武器是的话就隐藏下

        if (visible == false) {
            return;
        }
        let weaponProxy = this.weaponProxyMap.get(pId);
        if (weaponProxy.isHasBackWeapon()) {
            // 编辑器问题，已经提单子了
            // setTimeout(() => {
            weaponProxy.setVisible(false);
            // }, 1000);
        }
    }

    private listen_playerLeave(player: mw.Player) {
        let pId = player.playerId;
        if (this.weaponProxyMap.has(pId) == false) {
            return;
        }
        this.weaponProxyMap.get(pId).destroy();

        this.weaponProxyMap.delete(pId);
    }


    /**
     * 监听将武器放到手部
     * @param pId 玩家id
     */
    private listen_takeWeaponToHand(pId: number) {
        if (this.weaponProxyMap.has(pId) == false) {
            return;
        }
        let weaponProxy = this.weaponProxyMap.get(pId);
        weaponProxy.takeWeaponToHand();
    }

    private listen_takeWeaponToBack(pId: number, time: number = Globaldata.putWeaponTime_motion) {
        if (this.weaponProxyMap.has(pId) == false) {
            return;
        }
        let weaponProxy = this.weaponProxyMap.get(pId);
        weaponProxy.takeWeaponToBack(time);
    }

    /**
     * 玩家切换武器
     * @param pId 玩家对象id
     * @param weaponId 武器id
     */
    private listen_weaponIdChange(pId: number, weaponId: number) {

        if (this.weaponProxyMap.has(pId) == false) {
            let weaponProxy = new WeaponProxy(pId);
            this.weaponProxyMap.set(pId, weaponProxy);
        }
        this.weaponProxyMap.get(pId).changeWeaponId(weaponId);
    }



    /**
     * 控制一批玩家武器隐藏
     * @param pIds 玩家id数组
     * @param isShow 是否显示
     */
    private listen_playerChangeEquipState(pIds: number[], isShow: boolean) {
        if (pIds == null) {
            return;
        }

        for (let index = 0; index < pIds.length; index++) {
            const pId = pIds[index];
            if (this.weaponProxyMap.has(pId) == false) {
                continue;
            }
            this.weaponProxyMap.get(pId).setVisible(isShow);
        }
    }


    /**
     * 监听玩家指定索引位武器显隐
     * @param pId 玩家id
     * @param weaponIndex 武器索引 
     * @param time 隐藏时间 秒
     */
    private listen_visibleWeaponByIndex(pId: number, weaponIndex: number, time: number) {
        if (this.weaponProxyMap.has(pId) == false) {
            return;
        }
        let weaponProxy = this.weaponProxyMap.get(pId);
        weaponProxy.setVisibleWeaponByIndex(weaponIndex, time);
    }

    /**
     * 播放武器动画   目前只有火炮  后续拓展为动画编辑器
     * @param pId 玩家id
     */
    private listen_playWeaponTween(pId: number) {
        if (this.weaponProxyMap.has(pId) == false) {
            return;
        }
        let weaponProxy = this.weaponProxyMap.get(pId);
        weaponProxy.playWeaponTween();
    }

    private mWeaponTriggerDatas: IWeaponTriggerData[] = [];

    /**初始化武器触发器 */
    private async init_weaponTrigger() {

        this.mWeaponTriggerDatas.length = 0;

        let weaponCfgss = GameConfig.WeaponTrigger.getAllElement();
        for (let index = 0; index < weaponCfgss.length; index++) {
            const cfg = weaponCfgss[index];
            let trigger = await mw.GameObject.asyncFindGameObjectById(cfg.triggerGuid) as mw.Trigger;
            let worldUI = await mw.GameObject.asyncFindGameObjectById(cfg.worldUIGuid) as mw.UIWidget;

            trigger.onEnter.add((obj: mw.GameObject) => {
                if (obj instanceof mw.Character) {
                    this.trigger_enter(cfg, obj);
                }
            });

            // trigger.onLeave.add((obj: mw.GameObject) => {
            //     if (obj instanceof mw.Character) {
            //         this.trigger_leave(cfg, obj);
            //     }
            // });

            let data: IWeaponTriggerData = {
                cfg: cfg,
                trigger: trigger,
                worldUI: worldUI,
            }
            this.mWeaponTriggerDatas.push(data);
        }

        this.refresh_weaponWorldUI();
    }

    /**刷新世界UI */
    private refresh_weaponWorldUI() {
        if (this.mWeaponTriggerDatas.length == 0) return;

        for (let index = 0; index < this.mWeaponTriggerDatas.length; index++) {
            const data = this.mWeaponTriggerDatas[index];
            let ownWeaponIds = this.data.getOwnWeaponIds();
            if (ownWeaponIds.includes(data.cfg.weaponId)) {
                let msg = GameConfig.Language.WeaponTip_1;
                let text = data.worldUI.getTargetUIWidget().findChildByPath("RootCanvas/mGold") as mw.TextBlock;
                text.text = msg.Value;
                continue;
            }
            let text = data.worldUI.getTargetUIWidget().findChildByPath("RootCanvas/mGold") as mw.TextBlock;
            text.text = data.cfg.sellValue.toString();
        }

    }

    /**
     * 玩家进入触发器
     * @param cfg 武器配置
     * @param chara 玩家对象
     * @returns 
     */
    private trigger_enter(cfg: IWeaponTriggerElement, chara: mw.Character) {
        if (chara.player == null) return;
        if (chara.player.playerId != mw.Player.localPlayer.playerId) {
            return;
        }

        // 玩家选择武器后需要死亡才能再次选武器
        let isCanChangeWeapon = this.mAttribute.getAttributeValue(Attribute.EnumAttributeType.isCanChangeWeapon);
        if (isCanChangeWeapon == 1) {
            let tipText = GameConfig.Language.WeaponTip_4.Value;
            Notice.showDownNotice(tipText);
            return;
        }

        let ownWeaponIds = this.data.getOwnWeaponIds();
        if (ownWeaponIds.includes(cfg.weaponId)) {

            // 当前装备的武器id
            let curEquipWeaponId = this.data.getEquipWeaponId();
            if (curEquipWeaponId == cfg.weaponId) {
                // 如果拥有直接替换成基础的武器
                this.server.net_changeWeaponId(1);
            } else {
                this.server.net_changeWeaponId(cfg.weaponId);
            }
            return;
        }

        // 判断玩家金币是否足够
        let money = this.mAttribute.getAttributeValue(Attribute.EnumAttributeType.money);
        if (money < cfg.sellValue) {
            let tipText = GameConfig.Language.Shop_tips_2.Value;
            Notice.showDownNotice(tipText);
            return;
        }


        let tittle = GameConfig.Language.Shop_btn_5.Value;
        let content = GameConfig.Language.WeaponTip_2.Value;
        let content1 = StringUtil.format(content, cfg.sellValue);

        MessageBox.showTwoBtnMessage(tittle, content1, (res) => {
            if (res) {
                this.shopWeapon(cfg.weaponId);
            }
        });
    }

    /**
     * 购买武器
     * @param weaponId 武器id 
     */
    private shopWeapon(weaponId: number) {
        let ownWeaponIds = this.data.getOwnWeaponIds();
        if (ownWeaponIds.includes(weaponId)) {
            return;
        }

        this.data.addWeaponId(weaponId);

        this.server.net_shopWeapon(weaponId);

        this.refresh_weaponWorldUI();

        // 埋点
        EventManager.instance.call(EAnalyticsEvents.firstDo, EFirstDo.weapon);

        // 埋点
        AnalyticsTool.send_ts_action_buy_weapon(weaponId);
    }

    /**获取手部武器是否显示 */
    public getHandWeaponVisible(pId: number = this.localPlayerId) {
        if (this.weaponProxyMap.has(pId) == false) {
            return;
        }
        return this.weaponProxyMap.get(pId).getVisible();
    }

    /**武器是否在背部 */
    public isWeaponInBack(pId: number = this.localPlayerId) {
        if (this.weaponProxyMap.has(pId) == false) {
            return;
        }
        return this.weaponProxyMap.get(pId).isBack();
    }


}

interface IWeaponTriggerData {
    cfg: IWeaponTriggerElement;
    trigger: mw.Trigger,
    worldUI: mw.UIWidget
}