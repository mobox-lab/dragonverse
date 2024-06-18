import { GameManager } from "../GameManager";
import PlayerModuleC from "../Modules/PlayerModule/PlayerModuleC";
import { GameConfig } from "../config/GameConfig";
import { ItemType } from "./Enum";

/**
 * 埋点数据类
 */
export enum FirstEvent {
	/**核心循环开始 */
	CoreStart = "CoreStart",
	/**核心循环步骤1 */
	CoreStep1 = "CoreStep1",
	/**核心循环步骤2 */
	CoreStep2 = "CoreStep2",
	/**核心循环步骤3 */
	CoreStep3 = "CoreStep3",
	/**核心循环步骤4 */
	CoreStep4 = "CoreStep4",
	/**核心循环结束 */
	CoreEnd = "CoreEnd",
}

/**
 * 埋点工具类
 * 埋点全部放到这个类里面
 */
export class MGSTool {
	/**
	 * 记录第一次做的事
	 * @param event 事件类型
	 */
	static doFirstEvent(event: FirstEvent) {
		if (!ModuleService.getModule(PlayerModuleC).hasFirstAction(event)) {
			switch (event) {
				case FirstEvent.CoreStart:
					this.coreStart();
					break;
				case FirstEvent.CoreStep1:
					this.coreStep(1);
					break;
				case FirstEvent.CoreStep2:
					this.coreStep(2);
					break;
				case FirstEvent.CoreStep3:
					this.coreStep(3);
					break;
				case FirstEvent.CoreStep4:
					this.coreStep(4);
					break;
				case FirstEvent.CoreEnd:
					this.coreEnd();
					break;
				default:
					this.firstDo(event)
					break;
			}
			ModuleService.getModule(PlayerModuleC).setFirstAction(event)
		}
	}

	/** 
	 * ts游戏核心循环开始
	 */
	static coreStart() {
		this.msgUpload(`ts_coregameplay_start`, `核心循环开始`, {});
	}

	/**
	 * 核心循环步骤埋点:
	 * @param index 步骤索引
	 * 1——到达健身器材区域
	 * 2——点击“交互”按钮
	 * 3——点击“健身技能”按钮
	 * 4——点击“健身”按钮
	 */
	static coreStep(index: number) {
		this.msgUpload(`ts_coregameplay_step`, `核心循环步骤`, { coregameplay_step: index });
	}

	/**
	 * ts游戏核心循环结束
	 */
	static coreEnd() {
		this.msgUpload(`ts_coregameplay_end`, `核心循环结束`, {});
	}

	/** 
	 * 新手引导埋点
	 * @param index 引导 第几步
	 */
	static guide(index: number) {
		if (index == 1) {
			this.msgUpload(`ts_tutorial_start`, `新手引导开始`, {});
		}
		this.msgUpload(`ts_tutorial_step`, `新手引导`, { guide_step: index });
		if (index == 17) {
			this.msgUpload(`ts_tutorial_end`, `新手引导结束`, {});
		}
	}

	/** 
	 * 进入页面埋点
	 * @param index 页面参数
	 */
	static page(index: string) {
		this.msgUpload(`ts_page`, `进入界面`, { page_name: index });
	}

	/** 
	 * 点击按钮埋点
	 * @param index 按钮参数
	 */
	static clickBtn(index: string) {
		this.msgUpload(`ts_action_click`, `点击按钮`, { button: index });
	}

	/** 
	 * 科技树相关
	 * @param boxID 解锁科技树的id
	 */
	static unlockTech(boxID: number) {
		this.msgUpload(`ts_action_open_box`, `科技树相关`, { box_id: boxID });
	}

	/** 
	 * 任务相关
	 * @param taskID 完成任务的id
	 */
	static finishTask(taskType: string, taskID: number) {
		this.msgUpload(`ts_task`, `任务相关`, { task_id: taskType, taskid: taskID });
	}

	/** 
	 * 资产变化埋点
	 * @param index1 1.局外金币增加2.局外金币消耗3.局内金币增加4.局内金币消耗
	 * @param index2 金币数量
	 * @param index3 1.完成关卡结算奖励，无论输赢2.解锁塔消耗3.关卡内击杀怪物4.关卡内波次奖励5.关卡内升级塔6.关卡内拆除塔
	 */
	static goldChange(index1: number, index2: number, index3: number,) {
		this.msgUpload(`ts_action_buy_plane`, `记录玩家资产变化及其来源`, { plane_id: index1, lifetime: Math.abs(index2), play_time: index3 });
	}

	/** 
	 * 卡牌 资产变化埋点
	 * @param index1 解锁对应的塔id1001,1002-1006触发
	 */
	static cardChange(index1: number) {
		this.msgUpload(`ts_action_buy_storage`, `记录玩家卡牌解锁变化`, { play_time: index1, });
	}

	/** 
	 * 波次结束
	 * @param getinfoType 1.塔的ID
	 * @param getinfoID 2.塔的放置次数
	 * @param getinfoNum 3.波次
	 * @param costinfoType 4.关卡
	 * @param costinfoID 5.是否首次
	 */
	static waveOver(getinfoType: number, getinfoID: number, getinfoNum: number, costinfoType: number, costinfoID: number) {
		this.msgUpload(`ts_action_resource_change`, `局内玩家行为`, {
			getinfo_type: getinfoType,
			getinfo_id: getinfoID,
			getinfo_num: getinfoNum,
			costinfo_type: costinfoType,
			costinfo_id: costinfoID,
		});
	}

	static gameOver(waves: number, stageId: number, hasWin: boolean, isFirst: boolean, isPerfect: boolean, hp: number, gold: number, spent: number, lastMonster: number, tryTower: string) {
		let winCamp;
		if (!hasWin) {
			winCamp = 5;
		} else if (isPerfect) {
			winCamp = isFirst ? 1 : 3;
		} else {
			winCamp = isFirst ? 2 : 4;
		}

		let obj = {
			round_length: waves,
			round_id: stageId,
			win_camp: winCamp,
			polong_hold: Math.max(hp, 0),
			round_money: gold,
			stage_level: spent,
			all_item: tryTower
		}

		if (lastMonster != null) {
			obj["disaster_id"] = lastMonster;
		}

		this.msgUpload(`ts_game_over`, `用于描述玩家结算的相关信息和这一局局内的相关数据`, obj);
	}

	/** 
	 * 交互物使用上传一次埋点
	 * @param index ： 索引 
	 * @param lifetime ： 时间:每个步骤首次触发时上报1次
	 * 索引值 具体看埋点文档
	 */
	static firstDo(index: string, lifetime: number = 0) {
		this.msgUpload(`ts_action_firstdo`, `记录第1次做的事`, { record: index, lifetime: lifetime });
	}

	/** 
	 * 局内玩家空投信息
	 * @param type ： 领取空投类型：1234代表塔，buff，局内金币，局外金币 
	 * @param count ： 用于描述rebornid的值，塔id，buffid，局内金币数，局外金币数
	 * @param stageID ： 玩家领取空投的关卡id
	 * 索引值 具体看埋点文档
	 */
	static getAirdrop(type: number, count: string, stageID: number) {
		this.msgUpload(`ts_action_buy_reborn`, `局内玩家空投信息`, { reborn_id: type, isfirstbuy: count, play_time: stageID });
	}

	/**
	 * 开局埋点
	 */
	static gameStart(gameMode: number, playerCount: number, ranks: number[], cardIds: number[]) {
		this.msgUpload(`ts_game_result`, "用于描述玩家开局的相关信息", {
			round: gameMode,
			value: playerCount,
			camp: ranks.reduce((a, b) => a + b) / ranks.length,
			record: cardIds.map(card => card.toFixed(0)).join("")
		});
	}

	/**
	 * 快捷聊天埋点
	 */
	static quickChat(index: number) {
		let statge = GameManager.getStageClient();
		let placeId = statge ? statge.stageId : 1;
		this.msgUpload(`ts_interaction`, "快捷聊天埋点", {
			area_id: placeId,
			interaction_id: index + 10001
		});
	}
	/**
	 * 快捷表情埋点
	 */
	static quickEmoji(index: number) {
		let statge = GameManager.getStageClient();
		let placeId = statge ? statge.stageId : 1;
		this.msgUpload(`ts_interaction`, "快捷表情埋点", {
			area_id: placeId,
			interaction_id: index + 20001
		});
	}

	/**
	 * 奖励埋点
	 * @param rewards 
	 * @param type 
	 */
	static rewardMGS(rewards: number[][], type: number, isCost: boolean = false) {
		for (let i = 0; i < rewards.length; i++) {
			let itemCfg = rewards[i];
			let [id, amount] = itemCfg;
			let item = GameConfig.Item.getElement(id);
			if (item.itemType == ItemType.Gold) {
				MGSTool.goldChange(isCost ? 2 : 1, amount, type);
			}
			else if (item.itemType == ItemType.TechPoint) {
				MGSTool.goldChange(isCost ? 6 : 5, amount, type);
			}
		}
	}

	static costMGS(costs: number[][], type: number) {
		MGSTool.rewardMGS(costs, type, true);
	}


	/**
	 * 埋点数据上报函数
	 * @param key key值
	 * @param des 描述值
	 * @param data 数据
	 */
	static msgUpload(key: string, des: string, data: {}) {
		console.log("统计", key, des, JSON.stringify(data));
		mw.RoomService.reportLogInfo(key, des, JSON.stringify(data));
	}
}



