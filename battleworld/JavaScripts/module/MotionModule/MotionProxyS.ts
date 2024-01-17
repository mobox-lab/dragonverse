import { GameConfig } from "../../config/GameConfig";

/**
 * 动效播放代理
 */
export class MotionProxyS {
    private pId: number = 0;


    // 技能释放缓存
    private skillReleaseCache: Map<number, number> = new Map();

    private wranningCount: number = 0;

    constructor(pId: number) {
        this.pId = pId;
    }

    public isInCD(skillId: number) {
        // 记录cd
        let skillCfg = GameConfig.MotionSkill.getElement(skillId);
        if (skillCfg == null) {
            return false;
        }
        if (this.skillReleaseCache.has(skillId) == false) {
            this.skillReleaseCache.set(skillId, Date.now());
            return false;
        }

        // 距离上次释放技能的时间
        let preReleaseTime = this.skillReleaseCache.get(skillId);
        let calTime = Date.now() - preReleaseTime;
        // 如果再次释放技能时间比cd时间的冷却一半要高 代表数据没问题
        if (calTime > skillCfg.cd * 1000) {
            return false;
        }

        return true;
    }

    /**增加动效播放记录 */
    // public addPlayMotioinRecord(skillId: number) {
    //     // 记录cd
    //     let skillCfg = GameConfig.MotionSkill.getElement(skillId);
    //     if (skillCfg == null) {
    //         return;
    //     }

    //     // 如果一个技能连续很短时间内 连续释放了5 次  直接踢出该玩家

    //     if (this.skillReleaseCache.has(skillId) == false) {
    //         this.skillReleaseCache.set(skillId, Date.now());
    //         return;
    //     }

    //     let preReleaseTime = this.skillReleaseCache.get(skillId);
    //     this.skillReleaseCache.set(skillId, Date.now());

    //     // 距离上次释放技能的时间
    //     let calTime = Date.now() - preReleaseTime;

    //     // 如果再次释放技能时间比cd时间的冷却一半要高 代表数据没问题
    //     if (calTime > skillCfg.cd * 1000 * 0.2) {
    //         return;
    //     }

    //     this.wranningCount++;

    //     if (this.wranningCount < 5) {
    //         return;
    //     }
    //     this.wranningCount = 0;
    //     let player = mw.Player.getPlayer(this.pId);
    //     if (player == null) {
    //         return;
    //     }

    //     console.error("====addPlayMotioinRecord 踢出玩家 ", skillId);
    //     RoomService.kick(player, `检测到有作弊行为请关闭第三方软件${player.userId}:${skillId}`);
    // }


}