import { AnalyticsUtil, oTraceWarning } from "odin";

/**
 * 埋点分析工具
 */

export class AnalyticsTool {


	/**ts游戏核心循环开始 */
	public static send_ts_coregameplay_start(): void {

		let msg = AnalyticsUtil.get(ts_coregameplay_start);
		msg.send();
	}

	/**ts游戏核心循环步骤 */
	public static send_ts_coregameplay_step(coreStep: ECoreStep): void {
		let msg = AnalyticsUtil.get(ts_coregameplay_step);
		msg.data.coregameplay_step = coreStep;
		msg.send();

	}

	/**ts游戏核心循环结束 */
	public static send_ts_coregameplay_end(): void {

		let msg = AnalyticsUtil.get(ts_coregameplay_end);
		msg.send();
	}

	/**首次行为 */
	public static send_ts_action_firstdo(first: string): void {
		let msg = AnalyticsUtil.get(ts_action_firstdo);
		msg.data.record = first;
		msg.data.lifetime = Math.floor(TimeUtil.elapsedTime());
		msg.send();
	}

	/**商店购买事件 */
	public static send_ts_page(name: EPageName): void {
		let msg = AnalyticsUtil.get(ts_page);
		msg.data.page_name = name;
		msg.send();
	}

	/**商店购买事件 */
	public static send_ts_action_buy_item(item_id: number): void {
		let msg = AnalyticsUtil.get(ts_action_buy_item);
		msg.data.item_id = item_id;
		msg.send();
	}


	/**武器购买事件 */
	public static send_ts_action_buy_weapon(weapon_id: number): void {
		let msg = AnalyticsUtil.get(ts_action_buy_weapon);
		msg.data.weapon_id = weapon_id;
		msg.send();
	}

	/**
	 * 玩家死亡事件
	 * @param death_type 死亡类型 
	 * @param kill_player 局内击杀玩家数量
	 * @param death_skill_id 伤害来源 motionskill id
	 * @param leftTime 单局存活时间
	 */
	public static send_ts_action_dead(death_type: EHurtSource, kill_player: number,
		death_skill_id: number, leftTime: number, player: mw.Player = null): void {
		let msg = AnalyticsUtil.get(ts_action_dead);
		msg.data.death_type = death_type;
		msg.data.kill_player = kill_player;
		msg.data.death_skill_id = death_skill_id;
		msg.data.play_time = leftTime;

		if (player) {
			msg.send(player);
		} else {
			msg.send();
		}

	}


	/**玩家击杀*/
	public static send_ts_action_kill(monster_id: number): void {
		let msg = AnalyticsUtil.get(ts_action_kill);
		msg.data.monster_id = monster_id;
		msg.send();
	}

	/**玩家拾取事件*/
	public static send_ts_action_pick(loot: ELootType): void {
		let msg = AnalyticsUtil.get(ts_action_pick);
		msg.data.loot = loot;
		msg.send();
	}

	/**点击事件 */
	public static send_ts_action_click(button: string): void {
		let msg = AnalyticsUtil.get(ts_action_click);
		msg.data.button = button;
		msg.send();

	}

	/**装备武器 */
	public static send_ts_game_result(install: number, player: mw.Player): void {
		let msg = AnalyticsUtil.get(ts_game_result);
		msg.data.install = install;
		msg.send(player);
	}


	/**
	 * 动作事件
	 */
	public static send_ts_action_do(moveType: EMovementType): void {
		let msg = AnalyticsUtil.get(ts_action_do);
		msg.data.movement_id = moveType;
		msg.send();
	}

	/**
	 * 新手引导开始
	 */
	public static send_ts_tutorial_start(): void {
		let msg = AnalyticsUtil.get(ts_tutorial_start);
		msg.send();
	}

	/**
	 * 新手引导步骤
	 */
	public static send_ts_tutorial_step(step: string): void {
		let msg = AnalyticsUtil.get(ts_tutorial_step);
		msg.data.tutorial_step = step;
		msg.send();
	}

	/**
	 * 新手引导结束
	 */
	public static send_ts_tutorial_end(): void {
		let msg = AnalyticsUtil.get(ts_tutorial_end);
		msg.send();
	}

}

//-----------------------------------------------separate----------------------------------------------------------------------------------

/**
 * 核心循环参数值
 */
export enum ECoreStep {
	coreEnd = -2,
	coreStart = -1,
	/**进入战场 */
	enterBattle = 1,
	/**拾取一次技能球 */
	pickUpSkillBall = 2,
	/**拾取一次增益BUFF */
	pickUpBuff = 3,
	/**拾取一次金钱 */
	pickUpMoney = 4,
	/**使用一次技能*/
	useSkill = 5,
}

/**首次做某事 */
export enum EFirstDo {
	/**【首次击杀其他玩家时发送】 */
	kill = 1,
	double,
	Triple,
	godlike,
	legend,
	box1,
	box2,
	box3,
	box4,
	box5,
	box6,
	skillget,
	skillselect,
	skillmax,
	skillreplace,
	skillgiveup,
	skillretract,
	skillexpand,
	skilluse,
	skillexplanation,
	back,
	backed,
	buy,
	bought,
	Portal,
	weapon,
	/**首次到达段位1 */
	rank1,
	rank2,
	rank3,
	rank4,
	rank5,
	rank6,
	rank7,
}



/**动作事件 */
export enum EMovementType {
	/**【玩家成功通过回城功能回城】*/
	backSafe = 1,
	/**【玩家通过传送门进入战场】 */
	enterBattle = 2,
}

export enum EPageName {
	/**主界面 */
	main = "main",
	/**商店界面 */
	shop = "shop",
	/**设置界面 */
	setting = "setting",
	/**段位界面 */
	rank = "rank",
}

/**伤害来源信息 */
export type THurtSourceData = {
	source: EHurtSource,
	skillId: number,
	skillEffectId: number,
}

export enum EHurtSource {
	/**【死于场景火海】 */
	fire = "fire",
	/** 【死于场景毒池】*/
	poison = "poison",
	/**【死于场景雷击】 */
	light = "light",
	/**【死于场景炮击】 */
	cannon = "cannon",
	/**【死于掉出场景的海水扣血】 */
	sea = "sea",
	/**【死于其他玩家】 */
	player = "player"
}

export enum ELootType {
	skillBox = 1,
	pickHp = 2,
	pickMoney = 3,
	pickPillAttack = 4,
	pickPillHP = 5,
	pickPillDef = 6
}

export enum EClickEvent {
	skillselect = "skillselect",
	skillreplace = "skillreplace",
	skillgiveup = "skillgiveup",
	skillretract = "skillretract",
	back = "back",
	rankset = "rankset",
}

/**
 * 基础埋点加上了日志
 */
abstract class BasePoint extends AnalyticsUtil {
	send(player?: Player) {
		super.send(player)
		oTraceWarning(`埋点>desc:${this.desc},data:${JSON.stringify(this.data)}`)
	}
}
/**ts游戏核心循环开始 */
export class ts_coregameplay_start extends BasePoint {
	desc: string = "ts游戏核心循环开始";
	data: {

	};
}

/**ts游戏核心循环步骤 */
export class ts_coregameplay_step extends BasePoint {
	desc: string = "ts游戏核心循环步骤";
	data: {
		coregameplay_step: number
	};
}


/**ts游戏核心循环结束 */
export class ts_coregameplay_end extends BasePoint {
	desc: string = "ts游戏核心循环结束";
	data: {};
}


/**记录第一次做的事 */
class ts_action_firstdo extends BasePoint {
	desc: string = "记录第一次做的事";
	data: {
		record: string,
		lifetime: number,
	}
}


/**打开界面行为埋点 */
export class ts_page extends BasePoint {
	desc: string = "打开界面行为";
	data: {
		page_name: string,
	};
}


/**商店购买事件 */
export class ts_action_buy_item extends BasePoint {
	desc: string = "商店购买事件";
	data: {
		/**物品id */
		item_id: number,
	};
}

/**武器购买事件 */
export class ts_action_buy_weapon extends BasePoint {
	desc: string = "武器购买事件";
	data: {
		/**物品id */
		weapon_id: number,
	};
}

/**玩家死亡行为埋点 */
class ts_action_dead extends BasePoint {
	desc: string = "玩家死亡行为";
	data: {
		death_type: string,
		kill_player: number,
		death_skill_id: number,
		play_time: number,
	}
}

/**玩家击杀埋点 */
class ts_action_kill extends BasePoint {
	desc: string = "玩家击杀埋点";
	data: {
		monster_id: number,
	}
}

/**玩家拾取事件 */
class ts_action_pick extends BasePoint {
	desc: string = "玩家拾取事件";
	data: {
		loot: number,
	}
}

class ts_action_click extends BasePoint {
	desc: string = "点击事件";
	data: {
		button: string,
	}
}

class ts_game_result extends BasePoint {
	desc: string = "单人结算事件";
	data: {
		//玩家死亡时根据武器表发送其装备的武器id
		install: number,
	}
}

//动作事件
class ts_action_do extends BasePoint {
	desc: string = "动作事件";
	data: {
		movement_id: number,
	}
}



class ts_tutorial_start extends BasePoint {
	desc: string = "新手引导开始";
	data: {
	}
}

class ts_tutorial_step extends BasePoint {
	desc: string = "新手引导步骤";
	data: {
		tutorial_step: string,
	}
}

class ts_tutorial_end extends BasePoint {
	desc: string = "新手引导结束";
	data: {
	}
}
