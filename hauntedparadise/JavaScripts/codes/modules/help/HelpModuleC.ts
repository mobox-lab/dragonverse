/*
 * @Author       : hangyuan.zhang hangyuan.zhang@appshahe.com
 * @Date         : 2023-12-26 15:50:43
 * @LastEditors  : hangyuan.zhang hangyuan.zhang@appshahe.com
 * @LastEditTime : 2024-01-05 09:36:44
 * @FilePath     : \hauntedparadise\JavaScripts\codes\modules\help\HelpModuleC.ts
 * @Description  : 
 */

import { GameConfig } from "../../../config/GameConfig";
import { LanUtil } from "../../utils/LanUtil";
import { GhostTraceHelper } from "../../utils/TraceHelper";
import { BoardHelper, BoardKeys } from "../blackboard/BoardDefine";
import { GoPool } from "../cameraCG/utils/GoPoole";
// import { GhostModuleC } from "../ghost/GhostModuleC";
import HelpModuleS from "./HelpModuleS";
import { HelpInVisibleUI } from "./ui/HelpInVisableUI";
import HelpUI from "./ui/HelpUI";
export const HelpTime = 25;
export default class HelpModuleC extends ModuleC<HelpModuleS, null> {


    public helpSuccess: Function;
    public helpFail: Function;

    public needHelpPlayerId: number[] = [];

    private WidgetInfoMap: Map<number, DeathInfo> = new Map();

    private updateTimer: number = 0;

    public isStartGame: boolean = false;

    private messageTween;

    protected onStart(): void {
        InputUtil.onKeyDown(Keys.K, () => {
            this.reqNeedHelp(null, null);
        })

        Player.onPlayerLeave.add((player) => {
            if (this.WidgetInfoMap.has(player.playerId)) {
                this.deletePlayerID(player.playerId);
                this.WidgetInfoMap.get(player.playerId).onDestory();
                this.WidgetInfoMap.delete(player.playerId);
            }
        })
    }

    endGame() {
        this.isStartGame = false
        this.WidgetInfoMap.forEach((value, key) => {
            UIService.hideUI(value.helpInVisibleUI);
        })
    }
    net_showHelpMessage(playerId: number) {
        //RPC过程种可能已经被销毁了
        if (!this.WidgetInfoMap.has(playerId)) return;
        // this.WidgetInfoMap.get(playerId).helpInVisibleUI.showHelpMessage();
        let TextBlock = this.WidgetInfoMap.get(playerId).widget.getTargetUIWidget().findChildByPath("RootCanvas/text_help") as TextBlock

        this.showHelpMessage(TextBlock, this.WidgetInfoMap.get(playerId).startPos);
    }

    reqShowHelpMessage() {
        this.server.net_showHelpMessage(Player.localPlayer.playerId);
    }

    reqNoHelp() {
        this.server.net_noHelp(Player.localPlayer.playerId);
    }

    protected async onUpdate(dt: number): Promise<void> {
        //UI需要实时更新
        for (let i of this.WidgetInfoMap) {
            i[1] = this.updateWorldUI(i[1], dt);
        }
        if (!this.isStartGame) return;
        //每0.5秒检测一次判断一次是否在视野范围内
        if (this.updateTimer < 0.5) {
            this.updateTimer += dt;
            return;
        }
        this.updateTimer = 0;
        for (let i of this.WidgetInfoMap) {
            //i[1] = this.updateWorldUI(i[1], dt);
            if (i[0] == Player.localPlayer.playerId) continue;
            //其他射线检测之类的下次

            let result = (await this.judgeIsInFOV(i[0]))
            if (result == true) {
                this.WidgetInfoMap.get(i[0]).widget.setVisibility(true);
                UIService.hideUI(this.WidgetInfoMap.get(i[0]).helpInVisibleUI)
            }
            //只显示距离最近的三个人 
            else if (result == false) {
                if (this.needHelpPlayerId.length >= 3 && !this.getThreePlayer().includes(i[0])) { return; }
                this.WidgetInfoMap.get(i[0]).widget.setVisibility(false);
                UIService.showUI(this.WidgetInfoMap.get(i[0]).helpInVisibleUI)
            }

        }


    }


    /**无敌状态的切换 */
    changeInvincibilityState(isInvincible: boolean) {
        BoardHelper.ChangeKeyValue(BoardKeys.PlayerInvincible, isInvincible)
        // ModuleService.getModule(GhostModuleC).protectedPlayer(isInvincible);

    }

    /**切换为幽灵状态 */
    changeGhostState() {
        GhostTraceHelper.change2GhostTrace();
        this.changeInvincibilityState(true);
        BoardHelper.ChangeKeyValue(BoardKeys.PlayerDeathState, true)
    }

    /**切换为人状态 */
    changeHumanState() {
        this.changeInvincibilityState(false);
        BoardHelper.ChangeKeyValue(BoardKeys.PlayerDeathState, false);
    }

    /**转变到死亡形态 */
    reqNeedHelp(success: Function, fail: Function) {
        Player.localPlayer.character.movementEnabled = false;
        this.helpSuccess = success;
        this.helpFail = fail;
        Camera.currentCamera.preset = CameraPreset.ThirdPerson;
        this.server.net_needHelp(Player.localPlayer.playerId);
        UIService.show(HelpUI, HelpTime);
        this.changeGhostState();
    }

    /**
     * 不要被帮助人的表现
     * @param playerId 
     */
    net_needHelpPerformance(playerId: number) {
        this.net_showOtherHelpUI(playerId)
        if (!this.needHelpPlayerId.includes(playerId))
            this.needHelpPlayerId.push(playerId);
    }
    /**获得帮助重生了 */
    reqGetHelp(playerId: number) {
        this.helpSuccess && this.helpSuccess();
        this.server.net_getHelp(Player.localPlayer.playerId, playerId);
    }

    async net_getHelp(playerId: number, helpPlayerId: number) {
        this.resumeState(playerId, false);
        this.showHeartUI([playerId, helpPlayerId]);
        if (playerId == Player.localPlayer.playerId) {
            GhostTraceHelper.change2HumanTrace(0);
        }
    }
    /**没有获得帮助死亡了 */
    net_noHelp(playerId: number, isnatrueDie: boolean) {
        if (playerId == Player.localPlayer.playerId) {
            this.helpFail && this.helpFail();
            GhostTraceHelper.change2HumanTrace(isnatrueDie ? 1 : 2);
        }
        this.resumeState(playerId, true);
    }

    /** 
     * 恢复成非死亡的状态
    */
    async resumeState(playerId: number, isdie: boolean) {
        let player = await Player.asyncGetPlayer(playerId);
        this.deletePlayerID(playerId);
        this.WidgetInfoMap.get(playerId)?.onDestory();
        this.WidgetInfoMap.delete(playerId);
        player.character.setPostProcessOutline(false);
        player.character.setVisibility(true);


        if (playerId == Player.localPlayer.playerId) {
            Player.localPlayer.character.movementEnabled = true;
            this.changeHumanState();
            Camera.currentCamera.preset = CameraPreset.FirstPerson
            Player.getAllPlayers().forEach(player => {
                if (!player.character || !player.character.worldTransform) {
                    return;
                }
                player.character.setPostProcessOutline(false);
            })
            UIService.hide(HelpUI);

        }
        if (isdie) {
            return;
        }
        if (!AssetUtil.assetLoaded("20237")) {
            await AssetUtil.asyncDownloadAsset("20237");
        }
        //TODO配表？
        player.character?.loadAnimation("20237").play();
    }
    /**服务端 */
    public net_showOtherHelpUI(playerId: number) {
        this.playerDeath(playerId);
    }


    /**隔墙显示其他玩家的轮廓 */
    public JudgeOutLine(playerId: number[]) {
        if (playerId.includes(Player.localPlayer.playerId)) {
            Player.getAllPlayers().forEach(async (player) => {
                if (player == Player.localPlayer) return;
                this.showOutLine(player);
            })
        }
        if (!playerId.includes(Player.localPlayer.playerId)) {
            this.needHelpPlayerId.forEach(async (id) => {
                let player = await Player.asyncGetPlayer(id);
                if (!player) return;
                this.showOutLine(player);
            })
        }
    }
    /**
     * 玩家死亡后，显示世界UI，特效，触发器
     * @param playerId 
     */
    private async playerDeath(playerId: number) {
        let player = await Player.asyncGetPlayer(playerId);
        let widget = (await GoPool.getInstance().asyncSpawn("02BC1F2D48F0378140E9FC82D97576DD", GameObjPoolSourceType.Prefab)).getChildByName("WorldUI") as UIWidget
        let effect: Effect;
        let inViableUI = UIService.create(HelpInVisibleUI);
        inViableUI.setTarget(player)
        let trigger = (await GoPool.getInstance().asyncSpawn("Trigger")) as Trigger
        trigger.worldTransform.position = player.character.worldTransform.position;
        widget.worldTransform.position = player.character.worldTransform.position.add(new Vector(0, 0, 100));
        //会用触发器的位置判断谁是被复活者
        trigger.onEnter.add((obj) => {
            if (obj instanceof Character && obj.player && player == Player.localPlayer) {
                this.reqGetHelp(obj.player.playerId);
            }
        })
        //生成模型
        let isGirl = (player.character.description.advance.base.characterSetting.somatotype) % 2 == 0;
        if (isGirl) {
            effect = (await GoPool.getInstance().asyncSpawn("157253")) as Effect
        } else {
            effect = (await GoPool.getInstance().asyncSpawn("157254")) as Effect
        }
        effect.loop = true;
        effect.play();
        effect.setVisibility(true);
        effect.worldTransform.position = player.character.worldTransform.position.clone();
        this.WidgetInfoMap.set(playerId, new DeathInfo(playerId, widget, HelpTime, 0, effect, trigger, inViableUI));
        player.character.setVisibility(false);
    }

    /**
     * 显示轮廓线
     */
    private showOutLine(player) {

        //通过距离判断设定
        if (Vector.distance(player.character.worldTransform.position, Player.localPlayer.character.worldTransform.position) > 500) {
            player.character.setPostProcessOutline(true, LinearColor.white, 3);
        }

        if (Vector.distance(player.character.worldTransform.position, Player.localPlayer.character.worldTransform.position) < 500) {
            player.character.setPostProcessOutline(false);
        }
    }


    private deletePlayerID(id: number) {
        let index = this.needHelpPlayerId.indexOf(id);
        if (index != -1) {
            this.needHelpPlayerId.splice(index, 1);
        }
    }
    /**
     * 仅表现，实际控制是在服务端
     * @param curTime 
     * @param secondTimer 
     * @param dt 
     * @param ui 
     */
    updateWorldUI(value: DeathInfo, dt: number) {
        value.secondTimer += dt;
        let maskBtn_color = value.widget.getTargetUIWidget().findChildByPath("RootCanvas/canvas_countDown/maskBtn_color") as MaskButton
        let text_time = value.widget.getTargetUIWidget().findChildByPath("RootCanvas/canvas_countDown/text_time") as TextBlock
        //秒为单位减少
        if (value.secondTimer >= 1) {
            value.curTimer -= 1;
            value.secondTimer = 0;
            text_time.text = value.curTimer.toString();
            //剩余三秒红色提示
            if (value.curTimer <= 3) {
                maskBtn_color.normalImageColor = LinearColor.red;
            }
            //剩余五秒黄色提示ui
            else if (value.curTimer <= 7) {
                maskBtn_color.normalImageColor = LinearColor.yellow;
            }
        }
        value.helpInVisibleUI.updateMaskBtn(value.curTimer, value.secondTimer, HelpTime);
        maskBtn_color.fanShapedValue = 1 - (value.curTimer - value.secondTimer) / HelpTime;
        return value;
    }
    /**
     * 显示三秒爱心以及无敌状态
     */
    public async showHeartUI(playerIds: number[]) {

        playerIds.forEach(async (playerId) => {
            if (playerId == Player.localPlayer.playerId)
                this.changeInvincibilityState(true);
            let heartUI = (await GoPool.getInstance().asyncSpawn("8E84B1D14181E84E74369AB63923EE84", GameObjPoolSourceType.Prefab)).getChildByName("worldUI") as UIWidget;
            (await Player.asyncGetPlayer(playerId)).character.attachToSlot(heartUI, HumanoidSlotType.Rings);
            //三秒后无敌状态，世界UI的心心消失
            setTimeout(() => {
                if (playerId == Player.localPlayer.playerId)
                    this.changeInvincibilityState(false);
                heartUI.destroy();
            }, 3000);
        })
    }
    public showHelpMessage(text: TextBlock, startPos: Vector2) {

        if (this.messageTween) {
            this.messageTween.stop();
            this.messageTween = null;
        }
        this.messageTween = new Tween(startPos.clone()).to(startPos.clone().add(new Vector2(0, -50)), 2000)
            .onUpdate((value: Vector2) => {
                try {
                    text.position = value;
                } catch (error) {

                }
            }).onComplete(() => {
                try {

                    text.position = startPos.clone();
                    text.visibility = SlateVisibility.Hidden;
                } catch (error) {

                }
            }).onStart(() => {
                try {
                    text.visibility = SlateVisibility.Visible;
                } catch (error) {

                }

            })
            .start();
    }


    /**
     * 判断是否在范围内
     * @param playerId 
     * @returns 有返回null情况，说明是自己
     */
    async judgeIsInFOV(playerId: number) {
        if (playerId == Player.localPlayer.playerId) { return null };
        let char = (await Player.asyncGetPlayer(playerId)).character
        let curChar = Player.localPlayer.character
        let vector = Vector.subtract(char.worldTransform.position, Player.localPlayer.character.worldTransform.position);
        //求两个向量的夹角,同时打射线
        let angel = this.calculateAngleBetweenVectors(Camera.currentCamera.worldTransform.getForwardVector(), vector);
        //判断是否在视野范围内


        let result = QueryUtil.lineTrace(curChar.worldTransform.position.add(curChar.worldTransform.getUpVector().multiply(50)), char.worldTransform.position.add(char.worldTransform.getUpVector().multiply(50)), true)
        //为啥是2 以为0自己  1才是
        if (result.length < 2) {
            console.error("当前检测没有目标")
            return false;
        }
        if (angel < Camera.currentCamera.fov / 2 && (result[1].gameObject instanceof Character) && (result[1].gameObject.player?.playerId == playerId)) {
            return true;
        }
        return false;
    }
    /**
     * 计算两个向量的夹角
     * @param vectorA 
     * @param vectorB 
     * @returns 
     */
    public calculateAngleBetweenVectors(vectorA, vectorB) {
        const dotProduct = vectorA.x * vectorB.x + vectorA.y * vectorB.y;
        const magnitudeA = Math.sqrt(vectorA.x ** 2 + vectorA.y ** 2);
        const magnitudeB = Math.sqrt(vectorB.x ** 2 + vectorB.y ** 2);

        // 计算余弦值
        const cosineTheta = dotProduct / (magnitudeA * magnitudeB);

        // 计算夹角（弧度）
        const angleInRadians = Math.acos(cosineTheta);

        return angleInRadians * (180 / Math.PI);
    }

    /**
     * 获得距离最近的三个需要帮助的人
     */
    getThreePlayer() {
        let playerIds = [];
        type Struct = { playerId: number, distance: number };
        let playerDistance: Struct[] = [];
        this.needHelpPlayerId.forEach((playerId) => {
            if (playerId == Player.localPlayer.playerId) return;
            let player = Player.getPlayer(playerId);
            playerDistance.push({ playerId: playerId, distance: Vector.distance(player.character.worldTransform.position, Player.localPlayer.character.worldTransform.position) })
        })
        playerDistance.sort((a, b) => {
            return a.distance - b.distance;
        })
        for (let index = 0; index < 3; index++) {
            if (playerDistance.length - 1 < index) break;
            playerIds.push(playerDistance[index].playerId);
        }
        return playerIds;
    }
}


/**死亡后信息管理 */
class DeathInfo {
    public startPos: Vector2 = new Vector2();
    constructor(
        public playerId: number,
        public widget: UIWidget,
        public curTimer: number,
        public secondTimer: number,
        public effect: Effect,
        public trigger: Trigger,
        public helpInVisibleUI: HelpInVisibleUI
    ) {
        let text_time = this.widget.getTargetUIWidget().findChildByPath("RootCanvas/canvas_countDown/text_time") as TextBlock
        let text_help = this.widget.getTargetUIWidget().findChildByPath("RootCanvas/text_help") as TextBlock
        text_help.text = LanUtil.getText("help_02")
        this.startPos = text_help.position.clone();
        if (Player.localPlayer.playerId == this.playerId) {
            text_time.visibility = SlateVisibility.Visible;
            text_time.text = curTimer.toString();
        }
        if (Player.localPlayer.playerId != this.playerId) {
            text_time.visibility = SlateVisibility.Hidden;
        }

    }
    onDestory() {
        GoPool.getInstance().despawn(this.effect);
        this.widget.destroy();
        this.effect = null;
        this.trigger.destroy()
        this.helpInVisibleUI.destroy();
    }
}

