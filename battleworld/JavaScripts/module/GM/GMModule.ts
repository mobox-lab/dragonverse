import { util } from "../../tool/Utils";
import { MotionManager } from "../../editors/motionEditor/MotionManager";
import Tips from "../../tool/P_Tips";
import { PlayerModuleS } from "../PlayerModule/PlayerModuleS";
import { Globaldata } from "../../const/Globaldata";
import { EventManager } from "../../tool/EventManager";
import {
    EAttributeEvents_S,
    EModule_Events,
    EMotion_Events,
    ENotice_Events_S,
    EPlayerEvents_C,
    EPlayerEvents_S,
} from "../../const/Enum";
import { GameConfig } from "../../config/GameConfig";
import { BuffModuleS } from "../buffModule/BuffModuleS";
import { MotionModuleC } from "../MotionModule/MotionModuleC";
import { Attribute } from "../PlayerModule/sub_attribute/AttributeValueObject";
import { PlayerModuleC } from "../PlayerModule/PlayerModuleC";
import { BattleWorldPlayerModuleData } from "../PlayerModule/PlayerModuleData";
import { BulletModuleS } from "../BulletModule/BulletModuleS";
import { WeaponModuleS } from "../WeaponModule/WeaponModuleS";
import { LandModuleS } from "../LandModule/LandModuleS";
import GMHUD_Generate from "../../ui-generate/GM/GMHUD_generate";
import { LandModuleC } from "../LandModule/LandModuleC";
import { BuffModuleC } from "../buffModule/BuffModuleC";
import { MascotModuleS } from "../npc/mascotNpc/MascotModuleS";
import { PlayerHeadUIModuleC } from "../PlayerHeadUIModule/PlayerHeadUIModuleC";
import Log4Ts from "mw-log4ts";
import WoodUnit from "../npc/WoodUnit";
import Gtk from "gtoolkit";
import GodModService, { addGMCommand } from "mw-god-mod";

// export class GMBasePanelUI extends GMBasePanel<GMHUD_Generate, GMItem_Generate> {
//     constructor() {
//         super(GMHUD_Generate, GMItem_Generate);
//     }

//     show() {
//         mw.UIService.showUI(this["_view"], mw.UILayerSystem);
//     }
// }

export class GMModuleData extends Subdata {
    @Decorator.persistence()
    public isSuperGM: boolean = false;
}

export class GMModuleC extends ModuleC<GMModuleS, GMModuleData> {
    protected onEnterScene(sceneType: number): void {
        if (Globaldata.isOpenGm || this.data.isSuperGM) {
            this.open_gm();
        }
    }

    private open_gm() {
        Globaldata.isOpenGm = true;
        // GM.start(GMBasePanelUI);
        GodModService.getInstance().showGm();
        EventManager.instance.add(EModule_Events.gm_HideShowUI, this.listen_hideShowUI.bind(this));
    }

    private listen_hideShowUI() {
        let gmUI = mw.UIService.getUI(GMHUD_Generate);
        let visibility = gmUI.visible ? mw.SlateVisibility.Collapsed : mw.SlateVisibility.SelfHitTestInvisible;
        gmUI.setVisible(visibility);
    }
}

export class GMModuleS extends ModuleS<GMModuleC, GMModuleData> {
    protected onPlayerEnterGame(player: mw.Player): void {
        let pData = this.getPlayerData(player);
        // 这里必须要访问下属性，不然不会触发属性的初始化
        let isGm = pData.isSuperGM;
    }

    public testCount: number = 0;

    public addCount() {
        this.testCount++;
        console.error(" check cur testCount = " + this.testCount);
    }
}

export class GM_ParrySuccTime {
    public static parrySuccTime_Before: number = null;
    public static parrySuccTime_After: number = null;
}

// New GM

addGMCommand(
    "打开技能编辑器",
    "string",
    (value: string) => {
        EventManager.instance.call(EModule_Events.gm_HideShowUI);
        MotionManager.instance.showEditor();
    },
    undefined,
    undefined,
    "编辑器"
);

addGMCommand(
    "播放动效id",
    "string",
    (value: string) => {
        ModuleService.getModule(MotionModuleC).gm_invoke_motion(Number(value));
    },
    undefined,
    undefined,
    "编辑器"
);
addGMCommand(
    "发射子弹id",
    "string",
    (value: string) => {},
    (player: mw.Player, value: string) => {
        ModuleService.getModule(BulletModuleS).gm_fireSkillBullet(player, Number(value));
    },
    undefined,
    "编辑器"
);

addGMCommand(
    "id|旋转x|旋转y|z",
    "string",
    (value: string) => {
        let values = value.split("|");
        let id = Number(values[0]);

        let effectCfg = GameConfig.Effect.getElement(id);

        if (effectCfg == null) {
            Tips.show("没有找到id为" + id + "的特效配置");
            return;
        }
        let rot = new mw.Vector(Number(values[1]), Number(values[2]), Number(values[3]));

        effectCfg.EffectRotate = rot;

        Tips.show("修改成功");
    },
    (player: mw.Player, value: string) => {
        let values = value.split("|");
        let id = Number(values[0]);

        let effectCfg = GameConfig.Effect.getElement(id);

        if (effectCfg == null) {
            console.error("没有找到id为" + id + "的特效配置");
            return;
        }
        let rot = new mw.Vector(Number(values[1]), Number(values[2]), Number(values[3]));

        effectCfg.EffectRotate = rot;
    },
    undefined,
    "配置表"
);

addGMCommand(
    "播放特效表id",
    "string",
    (value: string) => {
        let values = value.split("|");
        let id = Number(values[0]);

        let effectCfg = GameConfig.Effect.getElement(id);

        if (effectCfg == null) {
            Tips.show("没有找到id为" + id + "的特效配置");
            return;
        }
        util.playEffectOnPlayer(Player.localPlayer.playerId, id);

        Tips.show("播放成功");
    },
    (player: mw.Player, value: string) => {},
    undefined,
    "配置表"
);

addGMCommand("修改时间膨胀，格式：延时|持续时间", "string", (value: string) => {
    if (!value) {
        console.error(" 数据初始化 ！！！！！！！！！");
        GM_ParrySuccTime.parrySuccTime_Before = null;
        GM_ParrySuccTime.parrySuccTime_After = null;
        return;
    }
    if (value.indexOf("|") == -1) {
        console.error(" 参数错误 value = " + value);
        return;
    }
    let newV = value.split("|");
    if (newV.length != 2) {
        console.error(" 参数长度错误 value = " + value);
        return;
    }
    GM_ParrySuccTime.parrySuccTime_Before = Number(newV[0]);
    GM_ParrySuccTime.parrySuccTime_After = Number(newV[1]);
    console.error(
        " 参数修改成功 \n Num1 = " +
            GM_ParrySuccTime.parrySuccTime_Before +
            "\n Num2 = " +
            GM_ParrySuccTime.parrySuccTime_After
    );
});

addGMCommand(
    "无敌1取消0",
    "string",
    (value: string) => {
        let va = Number(value[0]);
        Globaldata.isInvincible = va == 1;

        DataCenterC.getData(BattleWorldPlayerModuleData).isInvincible = va == 1;
    },
    (player: mw.Player, value: string) => {
        let va = Number(value[0]);

        Globaldata.isInvincible = va == 1;
        DataCenterS.getData(player, BattleWorldPlayerModuleData).isInvincible = va == 1;
    },
    undefined,
    "玩家"
);
addGMCommand(
    "无限能量1取消0",
    "string",
    (value: string) => {
        let va = Number(value[0]);
        Globaldata.isInfiniteEnergy = va == 1;
        DataCenterC.getData(BattleWorldPlayerModuleData).isInfiniteEnergy = va == 1;
    },
    (player: mw.Player, value: string) => {
        let va = Number(value[0]);

        Globaldata.isInvincible = va == 1;

        DataCenterS.getData(player, BattleWorldPlayerModuleData).isInfiniteEnergy = va == 1;
    },
    undefined,
    "玩家"
);

addGMCommand(
    "增加经验",
    "string",
    undefined,
    (player: mw.Player, value: string) => {
        if (!value) {
            console.error(" 数据有问题 ！！！！！！！！！");
            return;
        }
        let v2 = Number(value);
        ModuleService.getModule(PlayerModuleS).addPlayerAttr(player.playerId, Attribute.EnumAttributeType.exp, v2);
    },
    undefined,
    "玩家"
);

addGMCommand(
    "改变段位分",
    "string",
    undefined,
    (player: mw.Player, value: string) => {
        if (!value) {
            console.error(" 数据有问题 ！！！！！！！！！");
            return;
        }
        let v2 = Number(value);
        ModuleService.getModule(PlayerModuleS).setPlayerAttr(
            player.playerId,
            Attribute.EnumAttributeType.dayRankScore,
            0
        );
        ModuleService.getModule(PlayerModuleS).changeRankScore(player.playerId, v2);
    },
    undefined,
    "玩家"
);

addGMCommand(
    "增加金币",
    "string",
    undefined,
    (player: mw.Player, value: string) => {
        if (!value) {
            console.error(" 数据有问题 ！！！！！！！！！");
            return;
        }
        let v2 = Number(value);
        ModuleService.getModule(PlayerModuleS).addPlayerAttr(player.playerId, Attribute.EnumAttributeType.money, v2);
    },
    undefined,
    "玩家"
);

addGMCommand(
    "自杀",
    "string",
    (value: string) => {
        let damage = 999999999;
        if (value != null && isNaN(Number(value)) == false) {
            damage = Number(value);
        }

        EventManager.instance.call(EModule_Events.hurtPlayer, damage);
    },
    (player: mw.Player, value: string) => {},
    undefined,
    "玩家"
);

addGMCommand(
    "自杀并释放技能",
    "string",
    (value: string) => {
        let damage = 999999999;
        if (value != null && isNaN(Number(value)) == false) {
            damage = Number(value);
        }

        EventManager.instance.call(EModule_Events.hurtPlayer, damage);
        EventManager.instance.call(EMotion_Events.MotionInvokeMotion, 308);
    },
    (player: mw.Player, value: string) => {},
    undefined,
    "玩家"
);

addGMCommand(
    "修改玩家属性key|value",
    "string",
    (value: string) => {
        let values = value.split("|");
        if (values.length != 2) {
            console.error(" 参数错误 value = " + value);
            return;
        }
        let attrType = Number(values[0]);
        let attrValue = Number(values[1]);
        if (isNaN(attrType) || isNaN(attrValue)) {
            console.error(" 参数错误 value = " + value);
            return;
        }
        if (attrValue > 0) {
            ModuleService.getModule(PlayerModuleC).addAttr(attrType, attrValue);
        } else {
            ModuleService.getModule(PlayerModuleC).reduceAttr(attrType, -attrValue);
        }
    },
    (player: mw.Player, value: string) => {},
    undefined,
    "玩家"
);

addGMCommand(
    "设置所有玩家头顶ui，0隐藏，1显示",
    "string",
    (value: string) => {
        ModuleService.getModule(PlayerHeadUIModuleC).setAllHeadUIVisible(Number(value) == 1);
    },
    (player: mw.Player, value: string) => {},
    undefined,
    "玩家"
);

addGMCommand(
    "增加技能点属",
    "string",
    (value: string) => {},
    (player: mw.Player, value: string) => {
        EventManager.instance.call(
            EPlayerEvents_S.PlayerEvent_CalculateAttr_S,
            player.playerId,
            Attribute.EnumAttributeType.weaponSkillPoints,
            Number(value)
        );
    },
    undefined,
    "玩家"
);

addGMCommand(
    "显示玩家信息",
    "string",
    (value: string) => {
        EventManager.instance.call(EPlayerEvents_C.Player_GM_PlayerInfo_C);
    },
    (player: mw.Player, value: string) => {},
    undefined,
    "玩家"
);

addGMCommand(
    "增加杀戮值",
    "string",
    (value: string) => {},
    (player: mw.Player, value: string) => {
        EventManager.instance.call(
            EAttributeEvents_S.AttrEvent_CalculateAttr_S,
            player.playerId,
            Attribute.EnumAttributeType.massacreValue,
            Number(value)
        );
    },
    undefined,
    "玩家"
);

addGMCommand(
    "传送指定坐标",
    "string",
    (value: string) => {
        let values = value.split("|");
        Player.localPlayer.character.worldTransform.position = new mw.Vector(
            Number(values[0]),
            Number(values[1]),
            Number(values[2])
        );
    },
    (player: mw.Player, value: string) => {},
    undefined,
    "玩家"
);
addGMCommand(
    "调整头顶UI偏移",
    "string",
    (value: string) => {
        let values = value.split("|");
        Player.localPlayer.character.overheadUI.localTransform.position = new mw.Vector(
            Number(values[0]),
            Number(values[1]),
            Number(values[2])
        );
    },
    (player: mw.Player, value: string) => {},
    undefined,
    "玩家"
);
addGMCommand(
    "增加怒气值",
    "string",
    (value: string) => {},
    (player: mw.Player, value: string) => {
        EventManager.instance.call(
            EAttributeEvents_S.AttrEvent_CalculateAttr_S,
            player.playerId,
            Attribute.EnumAttributeType.angerValue,
            Number(value)
        );
    },
    undefined,
    "玩家"
);

addGMCommand(
    "装备武器id",
    "string",
    (value: string) => {},
    (player: mw.Player, value: string) => {
        ModuleService.getModule(WeaponModuleS).changeWeaponId(player.playerId, Number(value));
    },
    undefined,
    "武器"
);

addGMCommand(
    "创建拾取物:类型(1血量 2钱 3技能)|地形id",
    "string",
    (value: string) => {},
    (player: mw.Player, value: string) => {
        let values = value.split("|");
        ModuleService.getModule(LandModuleS).gm_pickUp(Number(values[0]), Number(values[1]));
    },
    undefined,
    "地形"
);

addGMCommand(
    "创建地形移动显隐: 类型(1移动 2显隐)| 地形id |移动速度x | 移动速度y | 移动速度z | 移动时间 ",
    "string",
    (value: string) => {},
    (player: mw.Player, value: string) => {
        let values = value.split("|");
        let x = Number(values[2]) == null ? 0 : Number(values[2]);
        let y = Number(values[3]) == null ? 0 : Number(values[3]);
        let z = Number(values[4]) == null ? 100 : Number(values[4]);
        let time = Number(values[5]) == null ? 5 : Number(values[5]);
        ModuleService.getModule(LandModuleS).gm_land(Number(values[0]), Number(values[1]), x, y, z, time);
    },
    undefined,
    "地形"
);

addGMCommand(
    "创建地形BUFF:地形buffId|地形id",
    "string",
    (value: string) => {},
    (player: mw.Player, value: string) => {
        let values = value.split("|");
        ModuleService.getModule(LandModuleS).gm_landBuff(Number(values[0]), Number(values[1]));
    },
    undefined,
    "地形"
);

addGMCommand(
    "npc重随",
    "string",
    (value: string) => {},
    (player: mw.Player, value: string) => {
        let values = value.split("|");
        let unit = ModuleService.getModule(MascotModuleS).getUnit(-1);
        let pos = ModuleService.getModule(LandModuleS).noRunRandom(1);
        if (Gtk.isNullOrEmpty(pos)) return;
        unit.getModel().worldTransform.position = pos[0];
    },
    undefined,
    "地形"
);

addGMCommand(
    "清除所有地形效果",
    "string",
    (value: string) => {},
    (player: mw.Player, value: string) => {
        ModuleService.getModule(LandModuleS).gm_recycle();
    },
    undefined,
    "地形"
);

addGMCommand(
    "重启地形效果",
    "string",
    (value: string) => {},
    (player: mw.Player, value: string) => {
        ModuleService.getModule(LandModuleS).gm_reStart();
    },
    undefined,
    "地形"
);

addGMCommand(
    "输出地形客户端",
    "string",
    (value: string) => {
        ModuleService.getModule(LandModuleC).gm_loglandPos(Number(value));
    },
    (player: mw.Player, value: string) => {},
    undefined,
    "地形"
);

addGMCommand(
    "输出地形服务端",
    "string",
    (alue: string) => {},
    (player: mw.Player, value: string) => {
        ModuleService.getModule(LandModuleS).gm_loglandPos(Number(value));
    },
    undefined,
    "地形"
);

addGMCommand(
    "玩家加BUFF(buffID)",
    "string",
    undefined,
    (player: mw.Player, value: string) => {
        if (!value) {
            console.error(" 数据有问题 ！！！！！！！！！");
            return;
        }
        let buffID = Number(value);
        ModuleService.getModule(BuffModuleS).createBuff(buffID, player.playerId, player.playerId);
    },
    undefined,
    "Buff"
);

addGMCommand(
    "怪加BUFF(buffID)",
    "string",
    (value: string) => {
        if (!value) {
            console.error(" 数据有问题 ！！！！！！！！！");
            return;
        }
        let buffID = Number(value);
        ModuleService.getModule(BuffModuleC).createBuffOnScenceUnit(buffID, -1, true);
    },
    undefined,
    undefined,
    "Buff"
);

addGMCommand(
    "相机旋转",
    "string",
    (value: string) => {
        let values = value.split("|");

        let cam = Camera.currentCamera;
        cam.localTransform.rotation = new mw.Rotation(Number(values[0]), Number(values[1]), Number(values[2]));
    },
    (player: mw.Player, value: string) => {},
    undefined,
    "相机"
);
addGMCommand(
    "相机相对位置偏移",
    "string",
    (value: string) => {
        let values = value.split("|");
        let camera = Camera.currentCamera;
        let tr = camera.springArm.localTransform.clone();
        tr.position = new mw.Vector(Number(values[0]), Number(values[1]), Number(values[2]));
        camera.springArm.localTransform = tr;
    },
    (player: mw.Player, value: string) => {},
    undefined,
    "相机"
);

addGMCommand(
    "屏幕特效Pos",
    "string",
    (value: string) => {
        let values = value.split("|");
        ModuleService.getModule(PlayerModuleC).diveEffect.localTransform.position = new mw.Vector(
            Number(values[0]),
            Number(values[1]),
            Number(values[2])
        );
    },
    undefined,
    undefined,
    "特效"
);

addGMCommand(
    "屏幕特效Rot",
    "string",
    (value: string) => {
        let values = value.split("|");
        ModuleService.getModule(PlayerModuleC).diveEffect.localTransform.rotation = new mw.Rotation(
            Number(values[0]),
            Number(values[1]),
            Number(values[2])
        );
    },
    undefined,
    undefined,
    "特效"
);

addGMCommand(
    "跳Pet-Simulator",
    "string",
    () => {},
    (player) => {
        const onFailed = (result: mw.TeleportResult) => {
            // 将错误信息发给所有参与的客户端
            for (const userId in result.userIds) {
                const player = Player.getPlayer(userId);
                if (player) {
                    Event.dispatchToClient(player, "onJumpGameFailed", result.message);
                    Log4Ts.log({ name: "GM" }, "onJumpGameFailed", result.message);
                }
            }
        };
        TeleportService.asyncTeleportToScene("pet-simulator", [player.userId]).then(() => {}, onFailed);
    }
);

addGMCommand(
    "跳DragonVerse",
    "string",
    () => {},
    (player) => {
        const onFailed = (result: mw.TeleportResult) => {
            // 将错误信息发给所有参与的客户端
            for (const userId in result.userIds) {
                const player = Player.getPlayer(userId);
                if (player) {
                    Event.dispatchToClient(player, "onJumpGameFailed", result.message);
                    Log4Ts.log({ name: "GM" }, "onJumpGameFailed", result.message);
                }
            }
        };
        TeleportService.asyncTeleportToScene("dragon-verse", [player.userId]).then(() => {}, onFailed);
    }
);

addGMCommand(
    "技能释放",
    "string",
    (value: string) => {
        let values = value.split("|");
        let skillId = Number(values[0]);
        let forCount = Number(values[1]);
        for (let index = 0; index < forCount; index++) {
            let skillCfg = GameConfig.MotionSkill.getElement(skillId);
            ModuleService.getModule(PlayerModuleC).weaponSkill(skillCfg, true);
        }
    },
    undefined,
    undefined,
    "技能"
);

addGMCommand(
    "击杀提示：数量",
    "string",
    undefined,
    (player: mw.Player, value: string) => {
        let killId = player.playerId;
        let players = mw.Player.getAllPlayers();
        let beKillId = 0;
        for (let index = 0; index < players.length; index++) {
            const element = players[index];
            if (element.playerId != killId) {
                beKillId = element.playerId;
                break;
            }
        }
        EventManager.instance.call(ENotice_Events_S.NoticeEvent_KillTip_S, killId, 0, beKillId, Number(value));
    },
    undefined,
    "击杀提示"
);

addGMCommand("加木桩", "string", async () => {
    let prefabNpc = await mw.Script.spawnScript(WoodUnit);
    //ts报错兼容
    if (!prefabNpc) return;
    await prefabNpc.initUnit(Globaldata.guide_npcId, Globaldata.guide_woodPrefabGuid);
    prefabNpc.setModelLocation(Globaldata.wood_bornPos);
});

addGMCommand("显示/隐藏技能范围", "string", (value) => {
    Globaldata.showSkillRange = !!value;
});

addGMCommand(
    "改名",
    "string",
    (value) => {
        ModuleService.getModule(PlayerHeadUIModuleC)
            .getHeadUIWidget(Player.localPlayer.playerId)
            .then((ui) => {
                ui.mOwnName_txt.text = value;
            });
    },
    () => {}
);
