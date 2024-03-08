/*
 * @Author       : dal
 * @Date         : 2023-11-10 18:40:59
 * @LastEditors  : dal
 * @LastEditTime : 2024-03-04 18:01:17
 * @FilePath     : \hauntedparadise\JavaScripts\codes\common\gm\config.ts
 * @Description  : 
 */
import { DebugConsole } from "debug_console";
import { ArchiveDataType, ArchiveHelper } from "../../modules/archive/ArchiveHelper";
import { DegreeType } from "../../modules/blackboard/BoardDefine";
import { GlobalRankModuleC } from "../../modules/globalRank/GlobalRankModuleC";
import { GlobalRankModuleS } from "../../modules/globalRank/GlobalRankModuleS";
import { ProcedureModuleC } from "../../modules/procedure/ProcedureModuleC";
import { LosePanel } from "../../modules/procedure/ui/LosePanel";
import { VictoryPanel } from "../../modules/procedure/ui/VictoryPanel";
import { BagDefine } from "../../modules/bag/BagDefine";
import GhostInst from "../../modules/ghost/GhostInst";
import { GhostModuleS } from "../../modules/ghost/GhostModuleS";
import { PlayerModuleC } from "../../modules/player/PlayerModuleC";
import { BehaviorNode } from "../../behavior3/BehaviorNode";
import TimeModuleS from "../../modules/time/TimeModuleS";
import { EGameTheme } from "../../GameStart";
import JumpGameBox from "../../modules/route/ui/JumGameBox";
import GhostGraphPanel from "../../modules/ghost/ui/GhostGraphPanel";
import { RouteDefine } from "../../modules/route/RouteDefine";
import { RouteModuleC } from "../../modules/route/RouteModule";
import { GameConfig } from "../../../config/GameConfig";
import { GhostModuleC } from "../../modules/ghost/GhostModuleC";

export type GMData = {
    label: string,
    group: string,
    clientCmd: (player: mw.Player, params: string) => void,
    serverCmd: (player: mw.Player, params: string) => void
};

let temp: any;

/** GM命令配置组 */
export const localGMConfig: GMData[] = [
    {
        label: "进入安全区",
        group: "触发器测试",
        clientCmd: (player: Player, params: string) => {
            ModuleService.getModule(GhostModuleC).isinvinci = (true);
        },
        serverCmd: (player: Player, params: string) => {
            ModuleService.getModule(GhostModuleS).protectedPlayer(player.playerId, true);
        }
    },
    {
        label: "离开安全区",
        group: "触发器测试",
        clientCmd: (player: Player, params: string) => {
            ModuleService.getModule(GhostModuleC).isinvinci = (false);
        },
        serverCmd: (player: Player, params: string) => {
            ModuleService.getModule(GhostModuleS).protectedPlayer(player.playerId, false);
        }
    },
    {
        label: "获得特殊道具",
        group: "商店",
        clientCmd: (player: Player, params: string) => {
            const param1 = Number(params.split("|")[0]);
            const param2 = Number(params.split("|")[1]);
            RouteDefine.addSpecialItem(player.userId, param1, param2 ? param2 : 1);
        },
        serverCmd: (player: Player, params: string) => {
        }
    },
    {
        label: "改变多少钱",
        group: "商店",
        clientCmd: (player: Player, params: string) => {
            RouteDefine.changeFearCoin(player.userId, Number(params));
        },
        serverCmd: (player: Player, params: string) => {

        }
    },
    {
        label: "现在的钱",
        group: "商店",
        clientCmd: async (player: Player, params: string) => {
            console.log("DEBUG>>> 现在的恐惧币是：" + (await RouteDefine.getFearCoin(player.userId)));
        },
        serverCmd: (player: Player, params: string) => {

        }
    },
    {
        label: "跳游戏界面",
        group: "大厅",
        clientCmd: (player: Player, params: string) => {
            let gameTheme = EGameTheme.Graveyard;
            UIService.show(JumpGameBox, gameTheme);
        },
        serverCmd: (player: Player, params: string) => {
        }
    },
    {
        label: "解锁全部图录",
        group: "大厅",
        clientCmd: (player: Player, params: string) => {
            ModuleService.getModule(RouteModuleC).reqSaveGraph(GameConfig.GhostGraph.getAllElement().map(v => { return v.id }));
        },
        serverCmd: (player: Player, params: string) => {
        }
    },
    {
        label: "打开图录",
        group: "大厅",
        clientCmd: (player: Player, params: string) => {
            UIService.show(GhostGraphPanel);
        },
        serverCmd: (player: Player, params: string) => {
        }
    },
    {
        label: "玩家穿墙术",
        group: "墓地",
        clientCmd: (player: Player, params: string) => {
            const char = player.character;
            let charpos = char.worldTransform.position
            let checkDis = 500 + (Number(params)) * 300
            let charfor = char.worldTransform.getForwardVector().multiply(checkDis);
            let end = charfor.add(charpos)
            let res = QueryUtil.lineTrace(end, charpos, true, true);
            for (let index = 0; index < res.length; index++) {
                const element = res[index];
                if (element.gameObject instanceof Trigger) {
                    continue;
                }
                char.worldTransform.position = element.position.add(char.worldTransform.getForwardVector().multiply(100));
                break;
            }
        },
        serverCmd: (player: Player, params: string) => {
            // ModuleService.getModule(GhostModuleS)["ghostMap"].forEach(e => {
            //     e.ghostChar.maxWalkSpeed = Number(params);
            // })
        }
    },
    {
        label: "修改鬼的移动速度",
        group: "墓地",
        clientCmd: (player: Player, params: string) => {
            // CommonUtils.blackDescription(player.character.description);
            // player.character.syncDescription();
        },
        serverCmd: (player: Player, params: string) => {
            ModuleService.getModule(GhostModuleS)["ghostMap"].forEach(e => {
                e.ghostChar.maxWalkSpeed = Number(params);
            })
        }
    },
    {
        label: "天气加速",
        group: "墓地",
        clientCmd: (player: Player, params: string) => {
            // CommonUtils.blackDescription(player.character.description);
            // player.character.syncDescription();
        },
        serverCmd: (player: Player, params: string) => {
            let num = Number(params) || 1;
            num = MathUtil.clamp(num, 0, Number.MAX_SAFE_INTEGER);
            ModuleService.getModule(TimeModuleS).timeScript.timeScale = num;
        }
    },
    {
        label: "立刻进入夜晚",
        group: "墓地",
        clientCmd: (player: Player, params: string) => {
            // CommonUtils.blackDescription(player.character.description);
            // player.character.syncDescription();
        },
        serverCmd: (player: Player, params: string) => {
            ModuleService.getModule(TimeModuleS).timeScript.enterNight();
        }
    },
    {
        label: "服务器命令",
        group: "测试气泡",
        clientCmd: (player: Player, params: string) => {
        },
        serverCmd: (player: Player, params: string) => {
            UE.KismetSystemLibrary.ExecuteConsoleCommand(player.character["actor"], params);
        }
    },
    {
        label: "碰撞扫荡",
        group: "测试气泡",
        clientCmd: (player: Player, params: string) => {
            // let startLoc = char.worldTransform.position;
            // let endLoc = startLoc.add(char.worldTransform.getForwardVector().multiply(200));

            // let startLoc = Camera.currentCamera.worldTransform.position.clone();
            // let endLoc = startLoc.clone().add(Camera.currentCamera.worldTransform.getForwardVector().multiply(200));

            // let hits = QueryUtil.lineTrace(startLoc, endLoc, true, true);
            // hits.forEach(e => {
            //     console.log("hit hit" + e.gameObject.gameObjectId)
            // })
            let startLoc = player.character.worldTransform.position.clone();
            let endLoc = startLoc.clone().add(player.character.worldTransform.getForwardVector().multiply(60));
            let hits = QueryUtil.boxOverlap(endLoc, new Vector(100, 100, 200), true);
            let res: GameObject[] = hits.filter(e => {
                return e["BuildingUUID"];
            })
            res.forEach(e => {
                console.log(e["BuildingUUID"]);
            })
        },
        serverCmd: (player: Player) => {
        }
    },
    {
        label: "测试气泡",
        group: "测试气泡",
        clientCmd: (player: Player, params: string) => {
            Event.dispatchToLocal("Bubble_scMsg", params)
            Event.dispatchToLocal("evt_sendDanmaku", params);
        },
        serverCmd: (player: Player) => {
        }
    },
    {
        label: "改变玩家移速",
        group: "默认",
        clientCmd: (player: Player, params: string) => {
            player.character.maxWalkSpeed += Number(params);
        },
        serverCmd: (player: Player) => {
        }
    },
    {
        label: "无敌",
        group: "无敌",
        clientCmd: () => {
            GhostInst.isInvincible = true;
        },
        serverCmd: (player: Player) => {
            ModuleService.getModule(GhostModuleS).setPlayerCd(player, 999999999);
        }
    },
    {
        label: "取消无敌",
        group: "无敌",
        clientCmd: () => {
            GhostInst.isInvincible = false;
        },
        serverCmd: (player: Player) => {
            ModuleService.getModule(GhostModuleS).setPlayerCd(player, -100);
        }
    }
    ,
    {
        label: "解锁一个笔记",
        group: "笔记本",
        clientCmd: (player: mw.Player, params: string) => {
            let noteId = params != "" ? Number(params) : 1;
            ModuleService.getModule(ProcedureModuleC).unlockNote(noteId);
        },
        serverCmd: null,
    },
    {
        label: "改变玩家生命值",
        group: "默认",
        clientCmd: (player: mw.Player, params: string) => {
            let noteId = params != "" ? Number(params) : 1;
            ModuleService.getModule(PlayerModuleC).changeHp(noteId);
        },
        serverCmd: null,
    },
    {
        label: "打开行为树调试log",
        group: "默认",
        clientCmd: (player: mw.Player, params: string) => {
            BehaviorNode.isOpenLog = true;
        },
        serverCmd: null,
    },
    {
        label: "设置自己简单难度的通关时间（秒）",
        group: "全服排行榜",
        clientCmd: (player: mw.Player, params: string) => {
            let count = params != "" ? Number(params) : 1000;
            ModuleService.getModule(GlobalRankModuleC).reqSetPassTime(DegreeType.Simple, count);
        },
        serverCmd: null,
    },
    {
        label: "添加N个人到简单排行榜",
        group: "全服排行榜",
        clientCmd: null,
        serverCmd: (player: mw.Player, params: string) => {
            let count = params != "" ? Number(params) : 1;
            for (let index = 0; index < count; index++) {
                ModuleService.getModule(GlobalRankModuleS)["dataMap"].get(DegreeType.Simple).setData({
                    i: Date.now() + MathUtil.randomInt(0, 100) + "",
                    n: "测试用名",
                    t: MathUtil.randomInt(0, 3600)
                });
            }
        },
    },
    {
        label: "打印当前位置",
        group: "默认",
        clientCmd: (player: mw.Player, params: string) => {
            console.log(player.character.worldTransform);
            UE.KismetSystemLibrary.ExecuteConsoleCommand(Player.localPlayer.character["actor"], "stat unit");
        },
        serverCmd: null,
    },
    {
        label: "获取开船四件套",
        group: "默认",
        clientCmd: (player: mw.Player, params: string) => {
            BagDefine.AddItem(player.playerId, 43);
            BagDefine.AddItem(player.playerId, 18);
            BagDefine.AddItem(player.playerId, 19);
            BagDefine.AddItem(player.playerId, 20);
        },
        serverCmd: null,
    },
    {
        label: "输入传送玩家x|y|z",
        group: "默认",
        clientCmd: (player: mw.Player, params: string) => {
            if (params === "") { return; }
            let posArr = params.split("|");
            Player.localPlayer.character.worldTransform.position = new Vector(Number(posArr[0]), Number(posArr[1]), Number(posArr[2]));
        },
        serverCmd: null,
    },
    {
        label: "MGS气泡",
        group: "默认",
        clientCmd: (player: mw.Player, params: string) => {
            Event.dispatchToLocal("Bubble_scMsg", params);
        },
        serverCmd: null,
    },
    {
        label: "打开胜利界面",
        group: "UI调试",
        clientCmd: (player: mw.Player, params: string) => { UIService.show(VictoryPanel); },
        serverCmd: (player: mw.Player, params: string) => { }
    },
    {
        label: "打开失败界面",
        group: "UI调试",
        clientCmd: (player: mw.Player, params: string) => { UIService.show(LosePanel); },
        serverCmd: (player: mw.Player, params: string) => { }
    },
    {
        label: "增加存档",
        group: "存档调试",
        clientCmd: (player: mw.Player, params: string) => { },
        serverCmd: (player: mw.Player, params: string) => {
            let id = params === "" ? 1 : Number(params);
            ArchiveHelper.reqSetData(player.userId, [ArchiveDataType.LIFE], [2]);
        }
    },
    {
        label: "删除存档",
        group: "存档调试",
        clientCmd: (player: mw.Player, params: string) => { },
        serverCmd: (player: mw.Player, params: string) => {
            let id = params === "" ? 1 : Number(params);
            ArchiveHelper.reqDeleteData(player.userId, Number(id));
        }
    },
    {
        label: "拿所有存档",
        group: "存档调试",
        clientCmd: (player: mw.Player, params: string) => { },
        serverCmd: (player: mw.Player, params: string) => {
            let id = params === "" ? 1 : Number(params);
            ArchiveHelper.reqGetAllData(player.userId).then(eles => {
                eles.forEach((data, id) => {
                    console.log(`DEBUG>>> id = ${id}, value = ${JSON.stringify(data)}`);
                });
            });
        }
    },
    {
        label: "拉起",
        group: "控制台",
        clientCmd: (player: mw.Player, params: string) => {
            DebugConsole.start(params === "1");
        },
        serverCmd: (player: mw.Player, params: string) => {
        }
    },
    {
        label: "停止",
        group: "控制台",
        clientCmd: (player: mw.Player, params: string) => {
            DebugConsole.stop();
        },
        serverCmd: (player: mw.Player, params: string) => {
        }
    },
]

/** 分割命令参数
 * @param params
 * @returns 参数数组
 */
function splitParams(params: string): string[] {
    return params.split(",");
}
