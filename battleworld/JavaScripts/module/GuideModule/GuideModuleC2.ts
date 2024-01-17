import { GuideInfo, GuideModuleC, GuideModuleView } from "module_guide";
import { GuideDialog } from "./UI/GuideDialog";
import ActionUI from "../PlayerModule/UI/ActionUI";
import { Globaldata } from "../../const/Globaldata";
import PickUpBase from "../LandModule/PickUp/PickUpBase";
import { EventManager } from "../../tool/EventManager";
import { EAnalyticsEvents, EGuide_Event_C, EPlayerEvents_C, ESkillEvent_C } from "../../const/Enum";
import { SkillPanel } from "../SkillModule/UI/SkillPanel";
import WoodUnit from "../npc/WoodUnit";
import { GameConfig } from "../../config/GameConfig";
import { GuideModuleS2 } from "./GuideModuleS2";
import { Tools } from "../../tool/Tools";
import { LoginModuleC } from "../LoginModule/LoginModuleC";

export class GuideModuleC2 extends ModuleC<GuideModuleS2, null> {

    private guidePaoTrigger: mw.Trigger = null;
    private mGuide: GuideModuleC = null;
    protected onStart(): void {

        EventManager.instance.add(EGuide_Event_C.GuideEvent_StartGuide_C, this.listen_startGuide, this);

    }

    private listen_startGuide() {
        this.start_guide();

    }


    private async start_guide() {


        if (this.mGuide == null) {
            this.mGuide = ModuleService.getModule(GuideModuleC);
        }

        this.guidePaoTrigger = await mw.GameObject.asyncFindGameObjectById(Globaldata.guide_triggerGuid) as mw.Trigger;
        this.guidePaoTrigger.enabled = false;

        // 引导a
        let guideInfo = this.mGuide.addGuideStageHandle(1);
        guideInfo.addRunFunc(() => {
            this.addGuideA(guideInfo);
        });

        // 新手引导开始
        EventManager.instance.call(EAnalyticsEvents.guide_start);


        this.mGuide.triggerGuide(1);
    }

    /**
     * 1. 在主控界面显示对话框，玩家点击屏幕任意位置推进对话
     * @param guideInfo   
     */
    private addGuideA(guideInfo: GuideInfo) {

        // 调整玩家旋转
        this.localPlayer.character.worldTransform.rotation = Globaldata.guide_player_rotation;
        mw.Player.setControllerRotation(Globaldata.guide_player_rotation);


        this.showDialog(Globaldata.guide_stepB_Dialogs);

        guideInfo.addCondition(() => {
            let dialogView = UIService.getUI(GuideDialog, false);
            if (dialogView == null) {
                return true;
            }
            return dialogView.visible == false;
        }).addRunFunc(() => {
            this.addGuideB(guideInfo);
        });
    }

    /**
     *   2. 所有对话完毕后，UI弱引导玩家点击一次攻击按钮
     * @param guideInfo 
     * @returns 
     */
    private addGuideB(guideInfo: GuideInfo) {
        // 引导b
        let actionUI = UIService.getUI(ActionUI, false);
        if (actionUI == null) {
            console.error("start_guide mainMenu == null ");
            return;
        }
        let invokeBtn = actionUI.mCanvasSkill0.getChildByName("Btn_invoke") as mw.Button;
        if (invokeBtn == null) {
            console.error("start_guide invokeBtn == null ");
            return;
        }

        let tip = GameConfig.Language.guide_text_1.Value;
        let guideView = UIService.getUI(GuideModuleView, false);
        if (guideView) {
            guideView.tipOffset.x = Globaldata.guide_stepB_tipOffset.x;
            guideView.tipOffset.y = Globaldata.guide_stepB_tipOffset.y;
        }
        // 重置摇杆
        EventManager.instance.call(EPlayerEvents_C.PlayerEvent_ResetJoyStick_C);
        guideInfo.addBindUIAndTips(actionUI.mCanvasSkill0, tip).addRunFunc(() => {

            // 埋点
            EventManager.instance.call(EAnalyticsEvents.guide_step, "1");

            invokeBtn.onPressed.broadcast();
            invokeBtn.onReleased.broadcast();
        }).addRunFunc(() => {
            this.addGuideC(guideInfo);
        });

    }

    private isStepOver: boolean = false;

    /**
     *   3. 玩家点击攻击按钮后，弹出对话UI，点击任意位置进行下一步，对话结束后，在设定位置刷新出客户端可见的技能球预置体，并路线引导玩家走过去拾取技能球
     * @param guideInfo 
     */
    private addGuideC(guideInfo: GuideInfo) {
        this.create_skillPrefab();

        // 弹出对话框
        this.showDialog(Globaldata.guide_stepC_Dialogs);

        guideInfo.addCondition(() => {
            let dialogView = UIService.getUI(GuideDialog, false);
            if (dialogView == null) {
                return true;
            }
            return dialogView.visible == false;
        }).addRunFunc(() => {
            this.isStepOver = false;
            this.mGuide.reSetToTargetPosDistance(Globaldata.guide_guideRangeC);
        }).addBindWorldPos(Globaldata.guide_skillPrefabBorns[0])
            .addCondition(() => {
                return this.isStepOver;
            }).addRunFunc(() => {
                this.addGuideD(guideInfo);
            });
    }

    /**
     *   4. 技能选择页面屏蔽“稍后选择按钮”及“放弃”按钮，即玩家必须点选择选一个技能
     * @param guideInfo 
     * @returns 
     */
    private addGuideD(guideInfo: GuideInfo) {
        let skillPanel = UIService.getUI(SkillPanel, false);
        if (skillPanel == null) {
            console.error("start_guide skillPanel == null ");
            return;
        }
        skillPanel.onAction_closePanel.add(this.listen_closePanel, this);
        this.isStepOver = false;
        guideInfo.addCondition(() => {
            return this.isStepOver;
        }).addRunFunc(() => {

            // 埋点
            EventManager.instance.call(EAnalyticsEvents.guide_step, "2");

            this.addGuideE(guideInfo);
        });
    }

    private listen_closePanel() {
        this.isStepOver = true;
    }


    /**
     *   5. 玩家选择技能后在设定位置刷新出一只客户端木桩NPC，同时引导玩家至NPC范围
     * @param guideInfo 
     */
    private addGuideE(guideInfo: GuideInfo) {
        // 弹出对话框
        this.showDialog(Globaldata.guide_stepE_Dialogs);
        guideInfo.addCondition(() => {
            let dialogView = UIService.getUI(GuideDialog, false);
            if (dialogView == null) {
                return true;
            }
            return dialogView.visible == false;
        }).addRunFunc(() => {
            this.create_npc();
            this.mGuide.reSetToTargetPosDistance(Globaldata.guide_guideRangeE);
        }).addBindWorldPos(Globaldata.guide_npcBorn).addRunFunc(() => {
            this.addGuideF(guideInfo);
        });
    }

    private addGuideF(guideInfo: GuideInfo) {
        guideInfo.addCondition(() => {
            let dialogView = UIService.getUI(GuideDialog, false);
            if (dialogView == null) {
                return true;
            }
            return dialogView.visible == false;
        }).addRunFunc(() => {
            let actionUI = UIService.getUI(ActionUI, false);
            if (actionUI == null) {
                console.error("start_guide mainMenu == null ");
                return;
            }
            let invokeBtn = actionUI.mCanvasSkill3.rootContent.getChildByName("Btn_invoke") as mw.Button;
            if (invokeBtn == null) {
                console.error("start_guide invokeBtn == null ");
                return;
            }

            // 重置cd
            EventManager.instance.call(EPlayerEvents_C.PlayerEvent_ResetSkilCD_C);

            let tip = GameConfig.Language.guide_text_2.Value;
            let guideView = UIService.getUI(GuideModuleView, false);
            if (guideView) {
                guideView.tipOffset.x = Globaldata.guide_stepF_tipOffset.x;
                guideView.tipOffset.y = Globaldata.guide_stepF_tipOffset.y;
            }
            // 重置摇杆
            EventManager.instance.call(EPlayerEvents_C.PlayerEvent_ResetJoyStick_C);
            guideInfo.addBindUIAndTips(invokeBtn, tip).addRunFunc(() => {
                invokeBtn.onPressed.broadcast();
                invokeBtn.onReleased.broadcast();

                // 埋点 释放了一次技能
                EventManager.instance.call(EAnalyticsEvents.guide_step, "3");

                this.addGuideG(guideInfo);
            });

            let skillPanel = UIService.getUI(SkillPanel, false);
            if (skillPanel == null) {
                console.error("start_guide skillPanel == null ");
                return;
            }
            skillPanel.onAction_closePanel.add(this.listen_closePanel, this);
        });

    }

    private addGuideG(guideInfo: GuideInfo) {

        /**显示对话框 */
        this.showDialog(Globaldata.guide_stepG_Dialogs);

        if (this.guidePaoTrigger) {
            this.guidePaoTrigger.enabled = true;
        }

        this.isStepOver = false;
        // 结束
        this.guidePaoTrigger.onEnter.add(this.listen_onEnter.bind(this));

        guideInfo.addCondition(() => {

            let dialogView = UIService.getUI(GuideDialog, false);
            if (dialogView == null) {
                return true;
            }
            return dialogView.visible == false;

        }).addBindWorldPos(this.guidePaoTrigger.worldTransform.position).addCondition(() => {
            return this.isStepOver;
        });
    }

    /**监听玩家进入大炮触发器 */
    private listen_onEnter(obj: mw.GameObject) {
        let isLocalPlayer = Tools.isLocalPlayer(obj);
        if (isLocalPlayer == false) {
            return;
        }
        this.isStepOver = true;

        this.guide_over();
    }


    private skillPrefabs: mw.GameObject[] = [];

    /**创建技能预制体 */
    private async create_skillPrefab() {

        for (let index = 0; index < Globaldata.guide_skillPrefabBorns.length; index++) {
            const prefabBorn = Globaldata.guide_skillPrefabBorns[index];

            let skillPrefab = await mw.GameObject.asyncSpawn(Globaldata.guide_skillPrefabGuid);
            skillPrefab.worldTransform.position = prefabBorn;
            let pickUp = skillPrefab.getScriptByName("PickUpSkill") as PickUpBase;

            this.skillPrefabs.push(skillPrefab);

            await pickUp.init_start();
            pickUp.onEnterAction.add(this.listen_enter, this);
        }

    }

    /**拾取一个技能 球 */
    private listen_enter(type: number, pos: mw.Vector) {
        this.isStepOver = true;

        EventManager.instance.call(ESkillEvent_C.SkillEvent_AddSkillPoint_C);

        UIService.show(SkillPanel, true);
        // // 拾取技能求
        // EventManager.instance.call(ESkillEvent_C.SkillEvent_PickUpSkillBall_C);
    }

    private prefabNpc: WoodUnit = null;

    private async create_npc() {
        this.prefabNpc = await mw.Script.spawnScript(WoodUnit);
        await this.prefabNpc.initUnit(Globaldata.guide_npcId, Globaldata.guide_woodPrefabGuid);
        this.prefabNpc.setModelLocation(Globaldata.guide_npcBorn);
    }

    private showDialog(dialogLanguages: string[]) {
        let dialogs = [];
        for (let index = 0; index < dialogLanguages.length; index++) {
            const element = dialogLanguages[index];
            let language = GameConfig.Language.getElement(element);
            if (language == null) {
                continue;
            }
            dialogs.push(language.Value);
        }

        UIService.show(GuideDialog, dialogs);
    }

    /**引导结束 */
    private guide_over() {
        for (let index = 0; index < this.skillPrefabs.length; index++) {
            const element = this.skillPrefabs[index];
            element.destroy();
        }
        this.skillPrefabs.length = 0;

        if (this.prefabNpc) {
            this.prefabNpc.destroy();
            this.prefabNpc = null;
        }
        // 埋点 引导结束
        EventManager.instance.call(EAnalyticsEvents.guide_end);
        // 引导结束
        ModuleService.getModule(LoginModuleC).firstLogin();
    }


}   