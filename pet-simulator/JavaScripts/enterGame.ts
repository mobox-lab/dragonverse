/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-09-14 17:41:48
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-09-14 18:18:04
 * @FilePath: \pet-simulator\JavaScripts\enterGame.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { GameConfig } from "./config/GameConfig";
import { GlobalData } from "./const/GlobalData";
import { PetSimulatorPlayerModuleData } from "./modules/Player/PlayerModuleData";
import MessageBox from "./util/MessageBox";

import { utils } from "./util/uitls";
import { PlayerModuleC } from "./modules/Player/PlayerModuleC";

@Component
export default class enterGame extends mw.Script {


    public gameId: string = "P_7b2a65b26b5fb21d8ea2796931f4177f03b0ffe9";

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected async onStart(): Promise<void> {
        // 不是客户端则返回
        if (!SystemUtil.isClient()) return;

        await DataCenterC.ready();

        this.initTrigger();


    }

    private async initTrigger() {

        let playerMC = ModuleService.getModule(PlayerModuleC);

        let player = await Player.asyncGetLocalPlayer();
        let currentChar = player.character;
        let trigger = await this.gameObject.asyncReady() as mw.Trigger;
        trigger.onEnter.add((other: mw.GameObject) => {
            if (other != currentChar) return;


            //判断是否解锁
            let isCan = this.isUnlock();
            if (!isCan) {
                let str = StringUtil.format(GameConfig.Language.Text_messagebox_1.Value, utils.formatNumber(GlobalData.UnlockSquare.diamond));
                MessageBox.showTwoBtnMessage(str, async (res) => {
                    if (res) {
                        // let isSuccess = await playerMC.reduceDiamond(GlobalData.UnlockSquare.diamond);
                        // if (!isSuccess) {
                        //     MessageBox.showOneBtnMessage(GameConfig.Language.Text_Fuse_UI_3.Value);
                        //     return;
                        // }
                        playerMC.setPlaza(true);
                        MessageBox.showOneBtnMessage(GameConfig.Language.Text_tips_1.Value);
                    }
                })
            } else {
                //提示玩家是否确认跳转
                let msg = GameConfig.Language.Plaza_Text_19.Value;
                MessageBox.showTwoBtnMessage(msg, async (res) => {
                    if (res) {
                        RouteService.enterNewGame(this.gameId, GlobalData.JumpGame.mainJumpToTradingPlaza);
                    }
                });
            }


        });
    }

    /**是否解锁 */
    private isUnlock() {
        return DataCenterC.getData(PetSimulatorPlayerModuleData).isPlaza;
    }


    /**
     * 周期函数 每帧执行
     * 此函数执行需要将this.useUpdate赋值为true
     * @param dt 当前帧与上一帧的延迟 / 秒
     */
    protected onUpdate(dt: number): void {

    }

    /** 脚本被销毁时最后一帧执行完调用此函数 */
    protected onDestroy(): void {

    }
}