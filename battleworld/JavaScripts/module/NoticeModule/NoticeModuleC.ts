import { Notice } from "../../tool/Notice";
import { util } from "../../tool/Utils";
import { ITipMsg, NoticeModuleS } from "./NoticeModuleS";
import { EventManager } from "../../tool/EventManager";
import { EAnalyticsEvents, EModule_Events } from "../../const/Enum";
import { EKillType, TKillData } from "./UI/NoticeView";
import { AttributeModuleC } from "../AttributeModule/AttributeModuleC";
import { Attribute } from "../PlayerModule/sub_attribute/AttributeValueObject";
import { GameConfig } from "../../config/GameConfig";
import { DoubleKillPanel } from "./UI/DoubleKillPanel";
import { AnalyticsTool, EFirstDo } from "../AnalyticsModule/AnalyticsTool";

export class NoticeModuleC extends ModuleC<NoticeModuleS, null>
{
    private mAttribute: AttributeModuleC = null;

    protected onStart(): void {
        this.mAttribute = ModuleService.getModule(AttributeModuleC);

        EventManager.instance.add(EModule_Events.MGS_Room, this.mgs_Room.bind(this));
        EventManager.instance.add(EModule_Events.MGS_Game, this.mgs_Game.bind(this));



        InputUtil.onKeyDown(mw.Keys.F1, () => {

            let data: TKillData = {
                killType: EKillType.none,
                killerName: "玩家" + MathUtil.randomInt(1, 555),
                killerWeaponId: 1,
                beKillName: "玩家2" + MathUtil.randomInt(1, 555)
            }
            Notice.addKillTip(data);
        });
    }

    private mgs_Room(text: string) {
        this.server.net_Mgs_Room(text);
    }

    private mgs_Game(text: string) {
        this.server.net_Mgs_Game(text);
    }

    /**
     * 接受服务器tips消息
     * @param tips 
     */
    public net_receiveTipMsg(tips: ITipMsg[]) {
        for (let index = 0; index < tips.length; index++) {
            const tipData = tips[index];

            let msg = util.getLanguageById(tipData.languageId, tipData.params);
            Notice.showDownNotice(msg);
        }
    }

    /**
     * 提示玩家击杀信息
     */
    public net_killTip(killerId: number, killerWeaponId: number, beKillerId: number, killerCount: number) {


        let killData: TKillData = {
            killType: EKillType.none,
            killerWeaponId: killerWeaponId,
            killerName: this.mAttribute.getAttributeValue(Attribute.EnumAttributeType.playerName, killerId),
            beKillName: this.mAttribute.getAttributeValue(Attribute.EnumAttributeType.playerName, beKillerId),
        }
        Notice.addKillTip(killData);



        if (killerId == mw.Player.localPlayer.playerId) {
            // 技能点提示
            let msg = util.getLanguageById("SkillSelect_3", null);
            Notice.showDownNotice(msg);

            // 埋点
            EventManager.instance.call(EAnalyticsEvents.firstDo, EFirstDo.kill);
            if (killerCount == 2) {
                EventManager.instance.call(EAnalyticsEvents.firstDo, EFirstDo.double);
            } else if (killerCount == 3) {
                EventManager.instance.call(EAnalyticsEvents.firstDo, EFirstDo.Triple);
            }

            // 埋点
            AnalyticsTool.send_ts_action_kill(beKillerId);
        }

        // 击杀数量表里配置的才会执行下面逻辑
        let killCfg = GameConfig.KillTip.getElement(killerCount);
        if (killCfg == null) {
            return;
        }

        let name = this.mAttribute.getAttributeValue(Attribute.EnumAttributeType.playerName, killerId);

        let killDesc = mw.StringUtil.format(killCfg.tip, name);

        let killData2: TKillData = {
            killType: EKillType.doubleKill,
            killerName: killDesc,
        }
        Notice.addKillTip(killData2);

        if (StringUtil.isEmpty(killCfg.hudTip) == false) {
            UIService.show(DoubleKillPanel, killCfg.hudTip);

            if (killerId == mw.Player.localPlayer.playerId) {
                // 埋点
                if (killerCount == 5) {
                    EventManager.instance.call(EAnalyticsEvents.firstDo, EFirstDo.godlike);
                } else if (killerCount == 8) {
                    EventManager.instance.call(EAnalyticsEvents.firstDo, EFirstDo.legend);
                }
            }
        }

        if (killerId == mw.Player.localPlayer.playerId) {
            // 击杀音效
            if (killCfg.soundId && killCfg.soundId > 0) {
                util.play2DSoundByConfig(killCfg.soundId);
            }
        }
    }

}