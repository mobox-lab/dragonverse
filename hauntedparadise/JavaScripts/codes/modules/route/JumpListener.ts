/*
 * @Author       : feifei.song
 * @Date         : 2023-09-21 17:59:33
 * @LastEditors  : feifei.song
 * @LastEditTime : 2024-02-28 10:35:02
 * @FilePath     : \PM_hall\JavaScripts\commonTS\match\JumpListener.ts
 * @Description  : 
 */

import { AddGMCommand } from "module_gm";
import { TimerOnly, WaitReady } from "../../utils/AsyncTool";

export class JumpPlayerInfo {

    /** 主游戏的 gameID */
    public mainGameID: string = "";

    /** 当前的 gameID */
    public curGameID: string = "";

    /** 当前的场景名字 */
    public curScene: string = "";

    /** 跳进来的 gameID */
    public fromGameID: string = "";

    /** 跳进来的场景名字 */
    public fromScene: string = "";

    /** 是否是跳进来的 */
    public isJump: boolean = false;

    /** 跳进来携带的数据 */
    public jumpData: any;

    /** 队伍成员 */
    public team: string[] = [];

    /**  */
    private connectTimer: TimerOnly = new TimerOnly();

    /**  */
    private isStop: boolean = false;


    constructor(private player: mw.Player) {

    }

    /**
     * 开始连接测试
     */
    public start() {
        if (this.isStop) {
            return;
        }

        this.connectTimer.setInterval(() => {
            Event.dispatchToClient(this.player, "evt_jump_connect", this.curGameID, this.fromGameID, this.fromScene, this.jumpData);
        }, 500);
    }

    /**
     * 停止连接测试
     */
    public stop() {
        this.isStop = true;
        this.connectTimer.stop();
    }

}

/**
 * 跳游戏的数据监听
 */
export class JumpListener {

    /** 单例 */
    public static instance: JumpListener = new JumpListener();

    /** 是否是主游戏 */
    public static isMain: boolean = true;

    /** 主游戏的 gameID */
    public static mainGameID: string = "";

    /** (前端) 玩家数据 */
    public ready: WaitReady<void> = new WaitReady();

    /** (前端) 玩家数据 */
    public selfJump: JumpPlayerInfo;

    /** 玩家数据 */
    private playerInfo: Map<number, JumpPlayerInfo> = new Map();

    /** 玩家数据 */
    private isConnect: boolean = false;


    /**
     * 初始化跳游戏功能
     * @effect 双端可用
     */
    public async init(isMain: boolean, mainGameID?: string) {

        JumpListener.isMain = isMain;
        if (mainGameID) {
            JumpListener.mainGameID = mainGameID;
        }

        if (SystemUtil.isServer()) {

            // // 监听玩家进入
            // mw.Player.onPlayerJoin.add(async (player: mw.Player) => {
            //     const playerid = player.playerId;
            //     const info = new JumpPlayerInfo(player);
            //     info.mainGameID = JumpListener.mainGameID;
            //     this.playerInfo.set(playerid, info);

            //     // 获取玩家的跳转信息
            //     try {
            //         const jumpRoom = TeleportService.getSourceInfo(player.teleportId);
            //         if (jumpRoom) {
            //             info.fromGameID = jumpRoom?.gameId;
            //             info.fromScene = jumpRoom?.sceneName;
            //             info.isJump = true;

            //             // 处理队伍信息
            //             let data: any = TeleportService.getTeleportData(player.teleportId);
            //             console.log("ftest4===jump.init===7===", JSON.stringify(data))
            //             if (!data) {
            //                 info.jumpData = data;
            //             } else if (Array.isArray(data)) {
            //                 const it = data[data.length - 1];
            //                 if (it.__team) {
            //                     info.team = it.__team;
            //                     data.splice(data.length - 1, 1);
            //                     info.jumpData = data;
            //                 } else {
            //                     info.jumpData = data;
            //                 }

            //             } else if (data["__team"]) {
            //                 info.team = data["__team"];
            //                 info.jumpData = data["data"];
            //             } else {
            //                 info.jumpData = data;
            //             }

            //             // 发送队员进入游戏事件
            //             console.log("ftest4===jump.init===8===", JSON.stringify(info.team))
            //             Event.dispatchToLocal("evt_jump_team", playerid, info.team, info.team[0] == player.userId);
            //         }

            //     } catch (e) {
            //         console.error(e);
            //     }

            //     // 获取当前房间信息，没有场景信息
            //     const curRoom = await TeleportService.asyncGetPlayerRoomInfo(player.userId);
            //     info.curGameID = curRoom.gameId;
            //     info.curScene = curRoom.sceneName;

            //     info.start();
            // });
            mw.Player.onPlayerLeave.add((player: mw.Player) => {
                this.playerInfo.get(player.playerId)?.stop();
                this.playerInfo.delete(player.playerId);
            });

            Event.addClientListener("evt_jump_game", (player: mw.Player, team: string[], gameID?: string, data?: Record<string, unknown>[]) => {
                JumpListener.instance.jumpGame(team, gameID, data);
            });
            // Event.addClientListener("evt_jump_scene", (player: mw.Player, userID: string[], sceneName: string, data?: mw.TeleportOptions) => {
            //     this.jumpScene(userID, sceneName, data);
            // })
            // Event.addClientListener("evt_jump_user_room", (player: mw.Player, targetUserID: string, userID: string[], data?: mw.TeleportOptions) => {
            //     this.jumpUserRoom(targetUserID, userID, data);
            // })
            Event.addClientListener("evt_jump_connect", (player: mw.Player) => {
                this.playerInfo.get(player.playerId)?.stop();
            });
        }

        if (SystemUtil.isClient()) {
            Event.addServerListener("evt_jump_connect", (curGameID: string, fromGameID: string, fromScene: string, jumpData) => {
                Event.dispatchToServer("evt_jump_connect");
                if (this.isConnect) {
                    return;
                }
                this.isConnect = true;

                this.selfJump = new JumpPlayerInfo(mw.Player.localPlayer);
                this.selfJump.curGameID = curGameID;
                this.selfJump.fromGameID = fromGameID;
                this.selfJump.fromScene = fromScene;
                Event.dispatchToLocal("evt_jump_game_onEnter", fromGameID, fromScene);
                this.ready.over();
            });
        }

    }

    /**
     * 获取一个玩家数据
     * @param player 被获取的玩家 id，前端不传默认为自己
     * @effect 后端可用
     * @returns 
     */
    public getPlayer(player: number): JumpPlayerInfo {
        let item = this.playerInfo.get(player);
        if (!item) {
            item = new JumpPlayerInfo(mw.Player.getPlayer(player));
            this.playerInfo.set(player, item);
        }
        return item;
    }

    /**
     * 中途加入游戏
     * @param isLock 是否锁定
     * @effect 后端可用
     */
    public lockRoom(isLock: boolean) {
        RoomSettings.enableJoiningMidgame(!isLock);
    }

    /**
     * 双端组队跳游戏
     * @param player 组队跳转的玩家 playerId
     * @param gameID 目标游戏 gameID，默认先取跳来的游戏，没有再跳默认主游戏
     * @param data 携带数据
     * @effect 双端可用
     */
    public async jumpGame(player?: number | mw.Player | string | string[], gameID?: string, data?: Record<string, unknown>[]) {
        const userIDs = this.getUserID(player);
        if (!gameID) {
            const info = this.getPlayer(this.getPlayerID(userIDs));
            if (info) {
                gameID = info.fromGameID;
            }
            if (!gameID) {
                gameID = JumpListener.mainGameID;
            }
        }
        if (SystemUtil.isServer()) {
            data = data || [];
            data.push({ __team: userIDs });
            console.log("这些人跳了游戏" + userIDs)
            await mw["TeleportService"].asyncTeleportToGame(gameID, userIDs);
        } else {
            Event.dispatchToServer("evt_jump_game", userIDs, gameID, data);
            Event.dispatchToLocal("evt_jump_game", gameID, JumpListener.isMain);
        }
    }

    // /**
    //  * 跳场景
    //  * @param sceneName 场景名字
    //  * @param player 跳的玩家，前端不传默认自己
    //  * @returns 前端不返回
    //  * @effect 双端端使用
    //  */
    // public async jumpScene(player?: number | mw.Player | string | string[], sceneName?: string, data?: mw.TeleportOptions): Promise<mw.TeleportResult> {
    //     if (SystemUtil.isClient()) {
    //         Event.dispatchToServer("evt_jump_scene", player || mw.Player.localPlayer.userId, sceneName, data);
    //     } else {
    //         if (!sceneName) {
    //             sceneName = this.getPlayer(this.getPlayerID(player))?.fromScene
    //         }
    //         const users = this.getUserID(player);
    //         if (!data?.teleportData["__team"]) {
    //             data = { teleportData: { data: data, __team: users } };
    //         }
    //         console.log("ftest4===jumpScene===1===" + sceneName + "|" + JSON.stringify(users))
    //         return await TeleportService.asyncTeleportToScene(sceneName, users, data);
    //     }
    // }

    // /**
    //  * 跳到某个玩家的房间
    //  * @param targetUserID 目标玩家的 userid
    //  */
    // public async jumpUserRoom(targetUserID: string, player?: number | mw.Player | string | string[], data?: mw.TeleportOptions) {
    //     if (SystemUtil.isClient()) {
    //         Event.dispatchToServer("evt_jump_user_room", targetUserID, this.getUserID(player), data);
    //         return;
    //     }

    //     TeleportService.asyncGetPlayerRoomInfo(targetUserID).then((room: mw.RoomInfo) => {
    //         const users = this.getUserID(player);
    //         data = { teleportData: { data: data, __team: users } };
    //         TeleportService.asyncTeleportToRoom(room.roomId, users, data).then(() => {

    //         }, (result: mw.TeleportResult) => {
    //             switch (result.status) {
    //                 case mw.TeleportStatus.success:
    //                     break;
    //                 case mw.TeleportStatus.ignored:
    //                     // 触发太频繁了，本次请求被忽略
    //                     break;
    //                 case mw.TeleportStatus.timeout:
    //                     // 超时了，可以选择重试传送或者提示玩家
    //                     break;
    //                 case mw.TeleportStatus.error:
    //                 // 将错误信息发给所有参与的客户端
    //                 // for (const userId in result.userIds) {
    //                 //     const player = Player.getPlayer(userId)
    //                 //     if (player) {
    //                 //         Event.dispatchToClient(player, "TeleportResult", result);
    //                 //     }
    //                 // }
    //             }
    //         });
    //     }).catch((error: Error) => {
    //         console.error(`getPlayerRoomInfo has error: ${error.message}`);
    //     });
    // }


    /**
     * 获取 userid 数组
     * @param player 玩家
     * @returns 
     */
    private getUserID(player: number | mw.Player | string | string[]): string[] {
        if (player == null) {
            return [mw.Player.localPlayer.userId];
        } else if (player instanceof mw.Player) {
            return [player.userId];
        } else if (typeof player === "string") {
            return [player];
        } else if (typeof player === "number") {
            return [mw.Player.getPlayer(player).userId];
        }
        return player;
    }

    /**
     * 获取玩家的 playerid
     * @param player 玩家
     * @returns 
     */
    private getPlayerID(player?: number | mw.Player | string | string[]): number {
        if (player == null) {
            return mw.Player.localPlayer.playerId;
        } else if (player instanceof mw.Player) {
            return player.playerId;
        } else if (typeof player === "string") {
            return mw.Player.getAllPlayers().find((p) => p.userId === player).playerId;
        } else if (typeof player === "number") {
            return player;
        }
        return this.getPlayerID(player[0]);
    }

}

// AddGMCommand("跳场景", async (player: mw.Player, value: string) => {
//     JumpListener.instance.jumpScene(player, value || "scene1");
// }, async (player: mw.Player, value: string) => { }, "Jump");
// AddGMCommand("跳游戏", async (player: mw.Player, value: string) => {
//     JumpListener.instance.jumpGame([player.userId], value || "");
// }, async (player: mw.Player, value: string) => { }, "Jump");
// AddGMCommand("测试1", async (player: mw.Player, value: string) => {
// }, async (player: mw.Player, value: string) => {
//     const curRoom = await TeleportService.asyncGetPlayerRoomInfo(player.userId);
// }, "Jump");
