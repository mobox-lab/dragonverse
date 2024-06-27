import { DebugConsole } from "debug_console";
import { Bubble } from "module_bubble";
// import { GMBasePanel } from "module_gm";
import { GlobalEnum } from "../../const/Enum";
import { GlobalData } from "../../const/GlobalData";
import Log4Ts from "../../depend/log4ts/Log4Ts";
import GMHUD_Generate from "../../ui-generate/common/GM/GMHUD_generate";
import GMItem_Generate from "../../ui-generate/common/GM/GMItem_generate";
import { utils } from "../../util/uitls";
import AchievementModuleC from "../AchievementModule/AchievementModuleC";
import { EnergyModuleS } from "../Energy/EnergyModule";
import { PetBagModuleS } from "../PetBag/PetBagModuleS";
import { PlayerModuleS } from "../Player/PlayerModuleS";
import { Task_ModuleC } from "../Task/TaskModuleC";
import { Task_ModuleS } from "../Task/Task_ModuleS";
import { AuthModuleS } from "../auth/AuthModule";
import { BuffModuleS } from "../buff/BuffModuleS";
import { addGMCommand } from "mw-god-mod";

//主面板
// export class GMBasePanelUI extends GMBasePanel<GMHUD_Generate, GMItem_Generate> {
//     constructor() {
//         super(GMHUD_Generate, GMItem_Generate);
//     }
// }
// NEW GM
addGMCommand("传送第二世界", "string", () => {
    Player.localPlayer.character.worldTransform.position = new Vector(-18222.37, 100119.67, 79589.56);
});
addGMCommand(
    "成就",
    "string",
    (value: string) => {
        let str = value.split("|");
        let achievementType = Number(str[0]);
        let count = Number(str[1]);
        ModuleService.getModule(AchievementModuleC).onExecuteAchievementAction.call(achievementType, count);
    },
    (player: mw.Player, value: string) => {},
    undefined,
    "成就"
);

addGMCommand(
    "添加宠物",
    "string",
    undefined,
    (player: mw.Player, value: string) => {
        let id = Number(value);
        if (!id) id = 1;
        ModuleService.getModule(PetBagModuleS).net_addPetWithMissingInfo(player.playerId, id);
    },
    undefined,
    "全服"
);

addGMCommand(
    "攻击破坏物",
    "string",
    (value: string) => {},
    (player: mw.Player, value: string) => {},
    undefined,
    "破坏物"
);

addGMCommand(
    "跳跃高度",
    "string",
    (value: string) => {
        let id = Number(value);
        if (!id) id = 80;
        GlobalData.pet.jumpOrder.forEach((end) => {
            end.jumpHeight != 0 ? (end.jumpHeight = id) : (end.jumpHeight = 0);
        });
    },
    (player: mw.Player, value: string) => {},
    undefined,
    "宠物"
);
addGMCommand(
    "旋转角度",
    "string",
    (value: string) => {
        let id = Number(value);
        if (!id) id = 30;
        GlobalData.pet.jumpOrder.forEach((end) => {
            end.yRot < 0 ? (end.yRot = -id) : (end.yRot = id);
        });
    },
    (player: mw.Player, value: string) => {},
    undefined,
    "宠物"
);
addGMCommand(
    "跳跃时间",
    "string",
    (value: string) => {
        let id = Number(value);
        if (!id) id = 300;
        GlobalData.pet.jumpTime = id;
    },
    (player: mw.Player, value: string) => {},
    undefined,
    "宠物"
);
addGMCommand(
    "贝塞尔曲线",
    "string",
    (value: string) => {
        let ids = value.split(",");
        GlobalData.pet.jumpBezier = [Number(ids[0]), Number(ids[1]), Number(ids[2]), Number(ids[3])];
    },
    (player: mw.Player, value: string) => {},
    undefined,
    "宠物"
);
addGMCommand(
    "平滑",
    "string",
    (value: string) => {
        let id = Number(value);
        if (!id) id = 0.5;
        GlobalData.pet.smoothValue = id;
    },
    (player: mw.Player, value: string) => {},
    undefined,
    "宠物"
);
addGMCommand(
    "增加金币(第一世界)",
    "string",
    (value: string) => {},
    (player: mw.Player, value: string) => {
        let val = Number(value);
        ModuleService.getModule(PlayerModuleS).addGold(player.playerId, val, GlobalEnum.CoinType.FirstWorldGold);
        ModuleService.getModule(PlayerModuleS).addGold(player.playerId, val, GlobalEnum.CoinType.SummerGold);
    },
    undefined,
    "货币"
);
addGMCommand(
    "增加金币(第二世界)",
    "string",
    (value: string) => {},
    (player: mw.Player, value: string) => {
        let val = Number(value);
        ModuleService.getModule(PlayerModuleS).addGold(player.playerId, val, GlobalEnum.CoinType.SecondWorldGold);
    },
    undefined,
    "货币"
);
addGMCommand(
    "增加金币(第三世界)",
    "string",
    (value: string) => {},
    (player: mw.Player, value: string) => {
        let val = Number(value);
        ModuleService.getModule(PlayerModuleS).addGold(player.playerId, val, GlobalEnum.CoinType.ThirdWorldGold);
    },
    undefined,
    "货币"
);
addGMCommand(
    "增加钻石",
    "string",
    (value: string) => {},
    (player: mw.Player, value: string) => {
        let val = Number(value);
        ModuleService.getModule(PlayerModuleS).addDiamond(player.playerId, val);
    },
    undefined,
    "货币"
);

addGMCommand(
    "清空货币",
    "void",
    () => {},
    (player: mw.Player) => {
        ModuleService.getModule(PlayerModuleS).clearDiamondAndGold(player.playerId);
    },
    undefined,
    "货币"
);

// 附魔
addGMCommand(
    "添加指定附魔id数组(第一个跟随宠物)",
    "string",
    () => {},
    (player: mw.Player, value: string) => {
        let enchantIds = value
            .trim()
            .split(/[,\s]/)
            .map((v) => Number(v));
        ModuleService.getModule(PetBagModuleS).gm_enchant(player, enchantIds);
    },
    undefined,
    "附魔"
);

addGMCommand(
    "聊天气泡",
    "string",
    (value: string) => {
        let id = Number(value);
        Bubble.showBubble(0, value);
    },
    (player: mw.Player, value: string) => {},
    undefined,
    "聊天"
);

addGMCommand(
    "测试数值转换",
    "string",
    (value: string) => {
        let id = Number(value);
        console.error("测试数值转换", utils.formatNumber(id));
    },
    (player: mw.Player, value: string) => {}
);
addGMCommand(
    "最小值",
    "string",
    (value: string) => {
        let id = Number(value);
        GlobalData.Camera.minLength = id;
    },
    (player: mw.Player, value: string) => {},
    undefined,
    "摄像机"
);
addGMCommand(
    "最大值",
    "string",
    (value: string) => {
        let id = Number(value);
        GlobalData.Camera.maxLength = id;
    },
    (player: mw.Player, value: string) => {},
    undefined,
    "摄像机"
);
addGMCommand(
    "倍率",
    "string",
    (value: string) => {
        let id = Number(value);
        GlobalData.Camera.zoomRate = id;
    },
    (player: mw.Player, value: string) => {},
    undefined,
    "摄像机"
);

addGMCommand(
    "打开商店",
    "string",
    (value: string) => {
        ModuleService.getModule(Task_ModuleC).showTaskShop();
    },
    (player: mw.Player, value: string) => {},
    undefined,
    "任务"
);

addGMCommand(
    "打破破坏物",
    "string",
    (value: string) => {},
    (player: mw.Player, value: string) => {
        let id = Number(value);
        ModuleService.getModule(Task_ModuleS).breakDestroy(player, id);
    },
    undefined,
    "任务"
);

addGMCommand(
    "获得宠物(两个参数逗号隔开)",
    "string",
    (value: string) => {},
    (player: mw.Player, value: string) => {
        let ids = value.split(",");
        let id = Number(ids[0]);
        let level = Number(ids[1]);
        ModuleService.getModule(Task_ModuleS).getPet(player, id, level);
    },
    undefined,
    "任务"
);

addGMCommand(
    "强化",
    "string",
    (value: string) => {},
    (player: mw.Player, value: string) => {
        let id = Number(value);
        ModuleService.getModule(Task_ModuleS).strengthen(player, id);
    },
    undefined,
    "任务"
);

addGMCommand(
    "融合",
    "string",
    (value: string) => {},
    (player: mw.Player, value: string) => {
        let id = Number(value);
        ModuleService.getModule(Task_ModuleS).fusion(player, id);
    },
    undefined,
    "任务"
);

addGMCommand(
    "交易",
    "string",
    (value: string) => {},
    (player: mw.Player, value: string) => {
        ModuleService.getModule(Task_ModuleS).trade(player);
    },
    undefined,
    "任务"
);

addGMCommand(
    "增加点数",
    "string",
    (value: string) => {},
    (player: mw.Player, value: string) => {
        let id = Number(value);
        ModuleService.getModule(Task_ModuleS).addTaskPoint(player, id);
    },
    undefined,
    "任务"
);

addGMCommand(
    "坐标",
    "string",
    (value: string) => {
        let pos = value.split(",");
        let x = Number(pos[0]);
        let y = Number(pos[1]);
        let z = Number(pos[2]);
        //0,0,0
        let camera = Camera.currentCamera;
        let obj = GameObject.findGameObjectById("20619A46");

        let nPos = camera.worldTransform.transformPosition(new mw.Vector(x, y, z));
        console.error("测试蛋", nPos);
        obj.worldTransform.position = nPos;
        obj.worldTransform.rotation = camera.worldTransform.rotation;
        let oo = GameObject.findGameObjectById("03FC6A56");
        oo.localTransform.rotation = new mw.Rotation(30, 0, 0);
    },
    (player: mw.Player, value: string) => {},
    undefined,
    "蛋"
);
addGMCommand(
    "旋转",
    "string",
    (value: string) => {
        let pos = value.split(",");
        let x = Number(pos[0]);
        let y = Number(pos[1]);
        let z = Number(pos[2]);
        //0,0,0
        let camera = Camera.currentCamera;
        let obj = GameObject.findGameObjectById("20619A46");
        let nPos = camera.worldTransform.transformDirection(new mw.Vector(x, y, z));
        // console.error("测试蛋", nPos);
        let cTrasform = camera.worldTransform;
        obj.worldTransform.rotation = nPos.toRotation();
    },
    (player: mw.Player, value: string) => {},
    undefined,
    "蛋"
);

addGMCommand(
    "缩放",
    "string",
    (value: string) => {
        let pos = value.split(",");
        let x = Number(pos[0]);
        let y = Number(pos[1]);
        let z = Number(pos[2]);
        //0,0,0
        let camera = Camera.currentCamera;
        let obj = GameObject.findGameObjectById("20619A46");

        obj.worldTransform.scale = new mw.Vector(x, y, z);
    },
    (player: mw.Player, value: string) => {},
    undefined,
    "蛋"
);
addGMCommand(
    "掉落测试",
    "string",
    (value: string) => {
        let loc = new mw.Vector(424.72, -1082.13, 53.0);
        let count = Number(value);
        if (!count) count = 5;
        // DropManager.getInstance().createDrop(loc, GlobalEnum.RewardType.Gem, 100, count);
    },
    (player: mw.Player, value: string) => {},
    undefined,
    "掉落"
);

addGMCommand(
    "增加buff(buff类型)",
    "string",
    undefined,
    (player: mw.Player, value: string) => {
        let sps = value.split(",").map((str) => Number(str));
        for (const sp of sps) {
            ModuleService.getModule(BuffModuleS).addBuff(player.playerId, sp);
        }
    },
    undefined,
    "buff"
);

addGMCommand(
    "导出",
    "string",
    async (value: string) => {
        let arr: AreaData[] = [];
        await getPoints(arr, "3B548E5D");
        let str = JSON.stringify(arr);
        console.log("areaDatas:" + str);
    },
    (player: mw.Player, value: string) => {},
    undefined,
    "导出所有点"
);
addGMCommand(
    "格式表type|完成数",
    "string",
    (value: string) => {},
    (player: mw.Player, value: string) => {
        let values = value.split("|");
        //  ModuleService.getModule(PassModuleS).onTaskUpdateAC.call(player.playerId, Number(values[0]), Number(values[1]));
    },
    undefined,
    "通行证&任务"
);
addGMCommand(
    "当前时间偏移几天",
    "string",
    (value: string) => {},
    (player: mw.Player, value: string) => {
        //    ModuleService.getModule(PassModuleS).checkResetTask_onEnterGame_GM(player, Number(value));
    },
    undefined,
    "通行证&任务"
);

addGMCommand(
    "添加星星币",
    "string",
    (value: string) => {},
    (player: mw.Player, value: string) => {
        //  ModuleService.getModule(PassModuleS).changeStarCount(player.playerId, Number(value));
    },
    undefined,
    "通行证&任务"
);

addGMCommand(
    "白天到黄昏",
    "string",
    (value: string) => {
        console.log("白天到黄昏");

        let dayToDuskDuration = GlobalData.Environment.dayToDuskDuration * 1000;
        // 改变天空盒顶层色调
        let skyBoxDayTop = mw.LinearColor.colorHexToLinearColor(GlobalData.Environment.skyBoxDayTop);
        let skyBoxDuskTop = mw.LinearColor.colorHexToLinearColor(GlobalData.Environment.skyBoxDuskTop);
        new mw.Tween(skyBoxDayTop)
            .to(skyBoxDuskTop, dayToDuskDuration)
            .onUpdate((color) => {
                Skybox.skyDomeTopColor = color;
            })
            .start();

        // 改变天空盒上层色调
        let skyBoxDayUp = mw.LinearColor.colorHexToLinearColor(GlobalData.Environment.skyBoxDayUp);
        let skyBoxDuskUp = mw.LinearColor.colorHexToLinearColor(GlobalData.Environment.skyBoxDuskUp);
        new mw.Tween(skyBoxDayUp)
            .to(skyBoxDuskUp, dayToDuskDuration)
            .onUpdate((color) => {
                Skybox.skyDomeMiddleColor = color;
            })
            .start();

        // 改变天空盒下层色调
        let skyBoxDayBottom = mw.LinearColor.colorHexToLinearColor(GlobalData.Environment.skyBoxDayBottom);
        let skyBoxDuskBottom = mw.LinearColor.colorHexToLinearColor(GlobalData.Environment.skyBoxDuskBottom);
        new mw.Tween(skyBoxDayBottom)
            .to(skyBoxDuskBottom, dayToDuskDuration)
            .onUpdate((color) => {
                Skybox.skyDomeBottomColor = color;
            })
            .start();

        // 改变云色调
        let dayCloudColor = mw.LinearColor.colorHexToLinearColor(GlobalData.Environment.dayCloudColor);
        let duskCloudColor = mw.LinearColor.colorHexToLinearColor(GlobalData.Environment.duskCloudColor);
        new mw.Tween(dayCloudColor)
            .to(duskCloudColor, dayToDuskDuration)
            .onUpdate((color) => {
                Skybox.cloudColor = color;
            })
            .start();

        // 改变环境光色调
        let dayLightingColor = mw.LinearColor.colorHexToLinearColor(GlobalData.Environment.dayLightingColor);
        let duskLightingColor = mw.LinearColor.colorHexToLinearColor(GlobalData.Environment.duskLightingColor);
        new mw.Tween(dayLightingColor)
            .to(duskLightingColor, dayToDuskDuration)
            .onUpdate((color) => {
                Lighting.lightColor = color;
            })
            .start();

        // 改变环境光强度
        let dayLightingIntensity = GlobalData.Environment.dayLightingIntensity;
        let duskLightingIntensity = GlobalData.Environment.duskLightingIntensity;
        new mw.Tween({ intensity: dayLightingIntensity })
            .to({ intensity: duskLightingIntensity }, dayToDuskDuration)
            .onUpdate((o) => {
                Lighting.brightness = o.intensity;
            })
            .start();

        // 改变天空盒明度
        let daySkyBoxBrightness = GlobalData.Environment.daySkyBoxIntensity;
        let duskSkyBoxBrightness = GlobalData.Environment.duskSkyBoxIntensity;
        new mw.Tween({ intensity: daySkyBoxBrightness })
            .to({ intensity: duskSkyBoxBrightness }, dayToDuskDuration)
            .onUpdate((o) => {
                Skybox.skyDomeIntensity = o.intensity;
            })
            .start();
    },
    (player: mw.Player, value: string) => {},
    undefined,
    "环境"
);

addGMCommand(
    "黄昏到黑夜",
    "string",
    (value: string) => {
        console.warn("黄昏到黑夜");

        let duskToNightDuration = GlobalData.Environment.duskToNightDuration * 1000;
        // 改变环境光强度
        let duskLightingIntensity = GlobalData.Environment.duskLightingIntensity;
        let nightLightingIntensity = GlobalData.Environment.nightLightingIntensity;
        new mw.Tween({ intensity: duskLightingIntensity })
            .to({ intensity: nightLightingIntensity }, duskToNightDuration)
            .onUpdate((o) => {
                Lighting.brightness = o.intensity;
                console.log(Lighting.brightness);
            })
            .start();

        // 改变天空盒明度
        let duskSkyBoxBrightness = GlobalData.Environment.duskSkyBoxIntensity;
        let nightSkyBoxBrightness = GlobalData.Environment.nightSkyBoxIntensity;
        new mw.Tween({ intensity: duskSkyBoxBrightness })
            .to({ intensity: nightSkyBoxBrightness }, duskToNightDuration)
            .onUpdate((o) => {
                Skybox.skyDomeIntensity = o.intensity;
                console.log(Skybox.skyDomeIntensity);
            })
            .start();

        // 云渐隐
        new mw.Tween({ opcity: 1 })
            .to({ opcity: 0 }, duskToNightDuration)
            .onUpdate((o) => {
                Skybox.cloudOpacity = o.opcity;
            })
            .onComplete(() => {
                Skybox.cloudVisible = false;
            })
            .start();

        // 星渐出
        Skybox.starVisible = true;
        new mw.Tween({ intensity: 0 })
            .to({ intensity: 0.6 }, duskToNightDuration)
            .onUpdate((o) => {
                Skybox.starIntensity = o.intensity;
            })
            .start();
        // 月渐出
        Skybox.moonVisible = true;
        new mw.Tween({ intensity: 0.5 })
            .to({ intensity: 2 }, duskToNightDuration)
            .onUpdate((o) => {
                Skybox.moonIntensity = o.intensity;
            })
            .start();
    },
    (player: mw.Player, value: string) => {},
    undefined,
    "环境"
);

addGMCommand(
    "黑夜到白天",
    "string",
    (value: string) => {
        let nightToDayDuration = GlobalData.Environment.nightToDayDuration * 1000;
        // 改变天空盒顶层色调
        let skyBoxDayTop = mw.LinearColor.colorHexToLinearColor(GlobalData.Environment.skyBoxDayTop);
        let skyBoxDuskTop = mw.LinearColor.colorHexToLinearColor(GlobalData.Environment.skyBoxDuskTop);
        new mw.Tween(skyBoxDuskTop)
            .to(skyBoxDayTop, nightToDayDuration)
            .onUpdate((color) => {
                Skybox.skyDomeTopColor = color;
            })
            .start();

        // 改变天空盒上层色调
        let skyBoxDayUp = mw.LinearColor.colorHexToLinearColor(GlobalData.Environment.skyBoxDayUp);
        let skyBoxDuskUp = mw.LinearColor.colorHexToLinearColor(GlobalData.Environment.skyBoxDuskUp);
        new mw.Tween(skyBoxDuskUp)
            .to(skyBoxDayUp, nightToDayDuration)
            .onUpdate((color) => {
                Skybox.skyDomeMiddleColor = color;
            })
            .start();

        // 改变天空盒下层色调
        let skyBoxDayBottom = mw.LinearColor.colorHexToLinearColor(GlobalData.Environment.skyBoxDayBottom);
        let skyBoxDuskBottom = mw.LinearColor.colorHexToLinearColor(GlobalData.Environment.skyBoxDuskBottom);
        new mw.Tween(skyBoxDuskBottom)
            .to(skyBoxDayBottom, nightToDayDuration)
            .onUpdate((color) => {
                Skybox.skyDomeBottomColor = color;
            })
            .start();

        // 改变云色调
        let dayCloudColor = mw.LinearColor.colorHexToLinearColor(GlobalData.Environment.dayCloudColor);
        let duskCloudColor = mw.LinearColor.colorHexToLinearColor(GlobalData.Environment.duskCloudColor);
        new mw.Tween(duskCloudColor)
            .to(dayCloudColor, nightToDayDuration)
            .onUpdate((color) => {
                Skybox.cloudColor = color;
            })
            .start();

        // 改变环境光色调
        let dayLightingColor = mw.LinearColor.colorHexToLinearColor(GlobalData.Environment.dayLightingColor);
        let duskLightingColor = mw.LinearColor.colorHexToLinearColor(GlobalData.Environment.duskLightingColor);
        new mw.Tween(duskLightingColor)
            .to(dayLightingColor, nightToDayDuration)
            .onUpdate((color) => {
                Lighting.lightColor = color;
            })
            .start();

        // 改变环境光强度
        let dayLightingIntensity = GlobalData.Environment.dayLightingIntensity;
        let nightLightingIntensity = GlobalData.Environment.nightLightingIntensity;
        new mw.Tween({ intensity: nightLightingIntensity })
            .to({ intensity: dayLightingIntensity }, nightToDayDuration)
            .onUpdate((o) => {
                Lighting.brightness = o.intensity;
            })
            .start();

        // 改变天空盒明度
        let daySkyBoxBrightness = GlobalData.Environment.daySkyBoxIntensity;
        let nightSkyBoxIntensity = GlobalData.Environment.nightSkyBoxIntensity;
        new mw.Tween({ intensity: nightSkyBoxIntensity })
            .to({ intensity: daySkyBoxBrightness }, nightToDayDuration)
            .onUpdate((o) => {
                Skybox.skyDomeIntensity = o.intensity;
            })
            .start();

        // 云渐出
        Skybox.cloudVisible = true;
        new mw.Tween({ opcity: 0 })
            .to({ opcity: 1 }, nightToDayDuration)
            .onUpdate((o) => {
                Skybox.cloudOpacity = o.opcity;
            })
            .start();

        // 星渐隐
        new mw.Tween({ intensity: 0.6 })
            .to({ intensity: 0 }, nightToDayDuration)
            .onUpdate((o) => {
                Skybox.starIntensity = o.intensity;
            })
            .onComplete(() => {
                Skybox.starVisible = false;
            })
            .start();

        // 月渐隐
        new mw.Tween({ intensity: 2 })
            .to({ intensity: 0.5 }, nightToDayDuration / 2)
            .onUpdate((o) => {
                Skybox.moonIntensity = o.intensity;
            })
            .onComplete(() => {
                Skybox.moonVisible = false;
            })
            .start();

        new mw.Tween(LinearColor.colorHexToLinearColor(GlobalData.Environment.nightMoonColor))
            .to(LinearColor.colorHexToLinearColor(GlobalData.Environment.dayMoonColor), nightToDayDuration / 2)
            .onUpdate((color) => {
                Skybox.moonColor = color;
            })
            .start();
    },
    (player: mw.Player, value: string) => {},
    undefined,
    "环境"
);

addGMCommand(
    "跳BattleWorld",
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
        TeleportService.asyncTeleportToScene("battleworld", [player.userId]).then(() => {}, onFailed);
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

addGMCommand("Show Debug log", "string", () => {
    DebugConsole.start(false);
});
addGMCommand("Hide Debug log", "string", () => {
    DebugConsole.stop();
});

addGMCommand(
    "恢复满体力",
    "string",
    undefined,
    (p, v) => {
        ModuleService.getModule(EnergyModuleS).addEnergy(p.playerId, 100);
    },
    undefined,
    "体力"
);

addGMCommand(
    "刷新货币",
    "string",
    undefined,
    (player, value) => {
        ModuleService.getModule(AuthModuleS)["queryCurrency"](player.userId);
    },
    undefined,
    "Auth"
);

type AreaData = {
    id: number;
    areaPoints: mw.Vector[];
};

/**颜色改变tween */
function colorTween(fromColor: mw.LinearColor, toColor: mw.LinearColor, tweenDuration: number, obj: mw.LinearColor) {
    new mw.Tween(fromColor)
        .to(toColor, tweenDuration)
        .onUpdate((color) => {
            obj = color;
        })
        .start();
}

/**光照强度改变tween */
function intensityTween(fromIntensity: number, toIntensity: number, tweenDuration, obj: number) {
    new mw.Tween({ intensity: fromIntensity })
        .to({ intensity: toIntensity }, tweenDuration)
        .onUpdate((o) => {
            obj = o.intensity;
        })
        .start();
}

async function getPoints(arr: AreaData[], guid: string) {
    let obj = await GameObject.asyncFindGameObjectById(guid);

    for (let i = 0; i < obj.getChildren().length; i++) {
        const element = obj.getChildren()[i];
        let a: AreaData = {
            id: 0,
            areaPoints: [],
        };
        a.id = i + 1;
        let loc = element.worldTransform.position.clone();
        loc.x = Number(loc.x.toFixed(2));
        loc.y = Number(loc.y.toFixed(2));
        loc.z = Number(loc.z.toFixed(2));
        a.areaPoints.push(loc);
        arr.push(a);
    }
}
