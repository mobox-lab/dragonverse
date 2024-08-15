/*
 * @Author: shifu.huang
 * @Date: 2024-01-11 17:38:35
 * @LastEditors: shifu.huang
 * @LastEditTime: 2024-01-22 17:54:03
 * @FilePath: \nevergiveup\JavaScripts\Modules\globalRank\component\GlobalRankCom.ts
 * @Description: 修改描述
 */
/** 
 * @Author       : xiaohao.li
 * @Date         : 2023-12-26 13:10:29
 * @LastEditors  : xiaohao.li
 * @LastEditTime : 2023-12-26 19:01:38
 * @FilePath     : \nevergiveup\JavaScripts\modules\globalRank\component\GlobalRankCom.ts
 * @Description  : 修改描述
 */
import { GameConfig } from "../../../config/GameConfig";
import { GlobalRankDataHelper } from "../GlobalRankDataHelper";
import { GlobalRankModuleC } from "../GlobalRankModuleC";
import { GlobalRankModuleS } from "../GlobalRankModuleS";
import { EmRankType, EmRankTypeMap } from "../const/EmRankType";

/**
 * 全局排行榜组件,这里是使用实例
 */
@Component
export default class GlobalRankCom extends Script {
    @mw.Property({ displayName: "世界ui", capture: true })
    public worldUIGuid: string = "";

    @mw.Property({ displayName: "key", enumType: EmRankType, defaultValue: EmRankType.Gold })
    public key: EmRankType = EmRankType.Gold;
    worldUI: UIWidget;
    protected async onStart(): Promise<void> {

        EmRankTypeMap.set(EmRankType.Level, {
            key: "level",
            title: GameConfig.Language.getElement("Text_LevelRank").Value,
            typeString: GameConfig.Language.getElement("Text_Level").Value
        });
        EmRankTypeMap.set(EmRankType.Gold, {
            key: "gold",
            title: GameConfig.Language.getElement("Text_GoldRank").Value,
            typeString: GameConfig.Language.getElement("Text_Gold").Value
        });
        // 注册全局排行榜模块,可以改为在自己的onStart中注册
        ModuleService.registerModule(GlobalRankModuleS, GlobalRankModuleC, GlobalRankDataHelper);
        let rankData = EmRankTypeMap.get(this.key);
        // Test 使用实例
        if (SystemUtil.isClient()) {
            console.log(this.key);
            this.worldUI = await GameObject.asyncFindGameObjectById(this.worldUIGuid) as UIWidget;
            // 初始化ui
            // const rankPanel = UIService.create(GlobalRankPanel);
            // rankPanel.initRank(rankData.key, rankData.title, true, [GameConfig.Language.getElement("Text_RankLevel").Value, GameConfig.Language.getElement("Text_Name").Value, rankData.typeString]);
            // this.worldUI.setTargetUIWidget(rankPanel.uiWidgetBase);

            // 设置积分
            InputUtil.onKeyDown(Keys.F7, () => {
                const score = Math.random() * 100;
                const rankModuleC = ModuleService.getModule(GlobalRankModuleC);
                // 设置积分
                rankModuleC.reqSetScore(this.key, score);
                // // 设置本地积分
                // rankModuleC.reqSetScore(EmRankType.Attack + EmRankCustomKey.LocalOnly, score);
                // // 设置时间积分
                // rankModuleC.reqSetScore(EmRankType.Attack + EmRankCustomKey.UpdateByTime, score);
            })

            // 设置积分
            InputUtil.onKeyDown(Keys.F8, () => {
                const score = Math.random() * 100;
                const rankModuleC = ModuleService.getModule(GlobalRankModuleC);
                // 设置积分
                // rankModuleC.reqSetScore(rankData.key + EmRankCustomKey.LocalOnly, score);
                // // 设置本地积分
                // rankModuleC.reqSetScore(EmRankType.Attack + EmRankCustomKey.LocalOnly, score);
                // // 设置时间积分
                // rankModuleC.reqSetScore(EmRankType.Attack + EmRankCustomKey.UpdateByTime, score);
            })

            // 显示排行榜
            InputUtil.onKeyDown(Keys.R, () => {
                // UIService.show(GlobalRankPanel)
            })
        }
        if (SystemUtil.isServer()) {
            const score = Math.random() * 100;
            const rankModuleS = ModuleService.getModule(GlobalRankModuleS);
            // 设置积分

            Player.onPlayerJoin.add((player: Player) => {
                // rankModuleS.setScoreOnServer(rankData.key, score, player.playerId);
            });


        }
    }
}