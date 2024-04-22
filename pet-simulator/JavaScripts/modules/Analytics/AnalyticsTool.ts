
import { AnalyticsUtil } from "odin";
import { oTraceError } from "../../util/LogManager";

export class AnalyticsTool {

    /*玩家破坏场景物品时上报*/
    public static game_over(damage: number) {
        let msg = AnalyticsUtil.get(ts_game_over);
        msg.data.damage = damage;
        msg.send(Player.localPlayer);

        oTraceError('破坏场景物品：' + damage);
    }
    /**玩家发射线打到资源 */
    public static action_hit(count: number) {
        let msg = AnalyticsUtil.get(ts_action_hit);
        msg.data.count = count;
        msg.send(Player.localPlayer);
        oTraceError('玩家发射线打到资源：' + count);
    }


    /*玩家解锁区域时上报区域信息*/
    public static action_unlock_area(area_id: number) {
        let msg = AnalyticsUtil.get(ts_action_unlock_area);
        msg.data.area_id = area_id;
        msg.send(Player.localPlayer);
        oTraceError(' 玩家解锁区域时上报区域信息' + area_id);
    }
    /*玩家抽卡时上报卡池信息*/
    public static action_buy_item(item_id: number) {
        let msg = AnalyticsUtil.get(ts_action_buy_item);
        msg.data.item_id = item_id;
        msg.send(Player.localPlayer);
        oTraceError(' 玩家抽卡时上报卡池信息' + item_id);
    }
    /*玩家领取在线奖励*/
    public static action_open_box(box_id: number) {
        let msg = AnalyticsUtil.get(ts_action_open_box);
        msg.data.box_id = box_id;
        msg.send(Player.localPlayer);
        oTraceError(' 玩家领取在线奖励' + box_id);
    }
    /*获得宠物的时候上报宠物id和背包的数量*/
    public static action_get_item(item_id: number, item_num: number) {
        let msg = AnalyticsUtil.get(ts_action_get_item);
        msg.data.item_id = item_id;
        msg.data.item_num = item_num;
        msg.send(Player.localPlayer);
        oTraceError(' 获得宠物的时候上报宠物id和背包的数量' + item_id + '  ' + item_num + '  ');
    }
    /*按钮点击上报*/
    public static action_click(button: ButtonAnaly) {
        let msg = AnalyticsUtil.get(ts_action_click);
        msg.data.button = button;
        msg.send(Player.localPlayer);
        oTraceError(' 按钮点击上报' + button + '');
    }
    /*界面*/
    public static page(page_name: Page) {
        let msg = AnalyticsUtil.get(ts_page);
        msg.data.page_name = page_name;
        msg.send(Player.localPlayer);
        oTraceError(' 界面' + page_name + '');
    }
    /*图鉴新增上报图鉴id*/
    public static action_unlock_atlas(atlas_id: number) {
        let msg = AnalyticsUtil.get(ts_action_unlock_atlas);
        msg.data.atlas_id = atlas_id;
        msg.send(Player.localPlayer);
        oTraceError(' 图鉴新增上报图鉴id' + atlas_id + '');
    }
    /**技能升级 */
    public static action_upgrade_skill(skill_id: Skill, skill_level: number) {
        let msg = AnalyticsUtil.get(ts_action_upgrade_skill);
        msg.data.skill_id = skill_id;
        msg.data.skill_level = skill_level;
        msg.send(Player.localPlayer);
        oTraceError(' 技能升级' + skill_id + ' ' + skill_level + '');
    }
    /**宠物爱心化 彩虹化 */
    public static action_upgrade_pet(pet_id: number, isfirstupgrade: boolean) {
        let msg = AnalyticsUtil.get(ts_action_upgrade_pet);
        msg.data.pet_id = pet_id;
        msg.data.isfirstupgrade = isfirstupgrade ? 'yes' : 'no';
        msg.send(Player.localPlayer);
        oTraceError(' 宠物爱心化 彩虹化' + pet_id + ' ' + msg.data.isfirstupgrade);
    }
    /**宠物合成 */
    public static action_buy_pet(rebirth_num: number, pet_id: number) {
        let msg = AnalyticsUtil.get(ts_action_buy_pet);
        msg.data.rebirth_num = rebirth_num;
        msg.data.pet_id = pet_id;
        msg.send(Player.localPlayer);
        oTraceError(' 宠物合成' + rebirth_num + ' ' + pet_id + '');
    }
    /**玩家交易 */
    public static action_sell(totalgoods: number, goods_id: number, goods: number) {
        let msg = AnalyticsUtil.get(ts_action_sell);
        msg.data.totalgoods = totalgoods;
        msg.data.goods_id = goods_id;
        msg.data.goods = goods;
        msg.send(Player.localPlayer);
        oTraceError(' 玩家发起交易：' + totalgoods + ' 拒绝2 接受1: ' + goods_id + '  交易完成3 中断4:  ' + goods + '');
    }
    /**玩家进行附魔相关操作 */
    public static action_enchant(model_id: AnalyModel, item_id: number) {
        let msg = AnalyticsUtil.get(ts_action_build);
        msg.data.model_id = model_id;
        msg.data.item_id = item_id;
        msg.send();
        oTraceError(' 玩家进行附魔相关操作：' + model_id + '  ' + item_id + '');
    }

    /**完成成就 */
    public static achieveDone(achievement_id: number) {
        let msg = AnalyticsUtil.get(ts_achievement);
        msg.data.achievement_id = achievement_id;
        msg.send();
        oTraceError(' 完成成就：' + achievement_id + '');
    }
    /**玩家任务上报 */
    public static action_task(taskid: number) {
        let msg = AnalyticsUtil.get(ts_task);
        msg.data.taskid = taskid;
        msg.send();
        oTraceError(' 玩家任务上报：' + taskid + '');
    }
    /**玩家购买商店物品上报 */
    public static action_buy_energybag(bag_id: number) {
        let msg = AnalyticsUtil.get(ts_action_buy_energybag);
        msg.data.bag_id = bag_id;
        msg.send();
        oTraceError(' 玩家购买商店物品上报：' + bag_id + '');
    }
    /**货币梯度 */
    public static game_result(record: string) {
        let msg = AnalyticsUtil.get(ts_game_result);
        msg.data.record = record;
        msg.send();
        oTraceError(' 货币梯度：' + record + '');
    }
    /**通行证任务完成 */
    public static task_over(taskid: number, starCount: number, left_num: number) {
        let msg = AnalyticsUtil.get(ts_acition_quest_end);
        msg.data.quest_id = taskid;
        msg.data.end_type = starCount;
        msg.data.left_num = left_num;
        msg.send();
        oTraceError(' 通行证任务完成：' + taskid + '  ' + starCount + ' ' + left_num);
    }
    /**通行证奖励领取 */
    public static task_get(taskid: number) {
        let msg = AnalyticsUtil.get(ts_acition_quest_get);
        msg.data.quest_id = taskid;
        msg.send();
        oTraceError(' 通行证奖励领取：' + taskid + '');
    }

}

class ts_achievement extends AnalyticsUtil {
    desc: string = "玩家达成成就时上报";
    data: { achievement_id: number };
}

export class ts_game_over extends AnalyticsUtil {
    desc: string = "玩家破坏场景物品时上报";
    data: { damage: number };
}
export class ts_action_hit extends AnalyticsUtil {
    desc: string = "玩家发射线打到资源";
    data: { count: number };
}

export class ts_action_unlock_area extends AnalyticsUtil {
    desc: string = "玩家解锁区域时上报区域信息";
    data: { area_id: number };
}

export class ts_action_buy_item extends AnalyticsUtil {
    desc: string = "玩家抽卡时上报卡池信息";
    data: { item_id: number };
}

export class ts_action_open_box extends AnalyticsUtil {
    desc: string = "玩家领取在线奖励";
    data: { box_id: number };
}

export class ts_action_get_item extends AnalyticsUtil {
    desc: string = "获得宠物的时候上报宠物id和背包的数量";
    data: {
        item_id: number,
        item_num: number
    };
}
export class ts_action_click extends AnalyticsUtil {
    desc: string = "按钮点击上报";
    data: {
        button: ButtonAnaly;
    };
}
export class ts_page extends AnalyticsUtil {
    desc: string = "界面";
    data: {
        page_name: Page;
    };
}

export class ts_action_unlock_atlas extends AnalyticsUtil {
    desc: string = "图鉴新增上报图鉴id";
    data: {
        atlas_id: number
    };
}

export class ts_action_upgrade_skill extends AnalyticsUtil {
    desc: string = "技能升级";
    data: {
        skill_id: Skill,
        skill_level: number
    };
}
export class ts_action_upgrade_pet extends AnalyticsUtil {
    desc: string = "宠物爱心化 彩虹化";
    data: {
        pet_id: number,
        isfirstupgrade: string
    };
}

export class ts_action_buy_pet extends AnalyticsUtil {
    desc: string = "宠物合成";
    data: {
        rebirth_num: number,
        pet_id: number
    };
}
export class ts_action_sell extends AnalyticsUtil {
    desc: string = "玩家交易";
    data: {
        totalgoods: number,
        goods_id: number,
        goods: number
    };
}
class ts_action_build extends AnalyticsUtil {
    desc: string = "玩家附魔上传相关信息";
    data: {
        model_id: AnalyModel,
        item_id: number,
    };
}
class ts_task extends AnalyticsUtil {
    desc: string = "玩家任务上报";
    data: {
        taskid: number,
    }
}
class ts_action_buy_energybag extends AnalyticsUtil {
    desc: string = "玩家购买商店物品上报";
    data: {
        bag_id: number,
    }
}
class ts_game_result extends AnalyticsUtil {
    desc: string = "货币梯度";
    data: {
        record: string
    }
}
class ts_acition_quest_end extends AnalyticsUtil {
    desc: string = "通行证任务完成";
    data: {
        quest_id: number,
        end_type: number,
        left_num: number,
    }
}
class ts_acition_quest_get extends AnalyticsUtil {
    desc: string = "通行证奖励领取";
    data: {
        quest_id: number,
    }
}

export enum AnalyModel {
    undefined = 0,
    /**选择左侧列表词条 */
    choose = 2,
    /**附魔人次 */
    enchants_times = 1,
    /**附魔时 */
    enchants = 3,
    /**手动停止 */
    stop2 = 4,
}


export enum Skill {
    /**金币吸收范围 */
    gold_range = 1,
    /**更多钻石 */
    more_diamond = 2,
    /**攻击力 */
    attack = 3,
    /**攻击速度 */
    attack_speed = 4,
    /**背包容量 */
    bag_capacity = 5,
}
export enum ButtonAnaly {
    opendelete = "opendelete",
    suredelete = "suredelete",
    choose = "choose",
    speed = "speed",
    quickegg = "Quickegg",
    claw = "claw",
    BackToPet = "BackToPet",
    NoTrade = "NoTrade",

}
export enum Page {
    choose = "choose",
    main = "main",
    enchants = "Enhance",
    achieve = "Achieve",
    petInfo = "Petinfo",
}






