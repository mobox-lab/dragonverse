import { GameConfig } from "../../../config/GameConfig";
import { EAttributeEvents_C, EModule_Events, ESkillEvent_C } from "../../../const/Enum";
import { EventManager } from "../../../tool/EventManager";
import Main_action_Generate from "../../../ui-generate/Main/Main_action_generate";
import { MainUISkillButton } from "./MainUISkillButton";


/**动作攻击UI */
export default class ActionUI extends Main_action_Generate {

    /**武器绑定的按钮 */
    private weaponSkillBtns: MainUISkillButton[] = [];
    /**随机技能绑定的按钮 */
    private skillBtns: MainUISkillButton[] = [];

    protected onStart(): void {

        for (let i = 0; i <= 2; i++) {
            let skillPrefab = this.rootCanvas.getChildByName(`mCanvasSkill${i}`);
            let rootCanvas = null;
            if (skillPrefab instanceof mw.Canvas) {
                rootCanvas = skillPrefab;
            } else {
                rootCanvas = (skillPrefab as mw.UserWidget).rootContent;
            }
            let b = new MainUISkillButton();
            b.init(rootCanvas, i);
            b.setVisible(false);
            this.weaponSkillBtns.push(b);
        }
        for (let i = 3; i <= 6; i++) {
            let skillPrefab = this.rootCanvas.getChildByName(`mCanvasSkill${i}`);
            let rootCanvas = null;
            if (skillPrefab instanceof mw.Canvas) {
                rootCanvas = skillPrefab;
            } else {
                rootCanvas = (skillPrefab as mw.UserWidget).rootContent;
            }
            let b = new MainUISkillButton();
            b.init(rootCanvas, i);
            b.setVisible(false);
            this.skillBtns.push(b);
        }

        EventManager.instance.add(EAttributeEvents_C.Attribute_WeaponId_Change_C, this.listen_weaponIdChange, this);
        EventManager.instance.add(ESkillEvent_C.SkillEvent_RandomSkill_C, this.listen_randomSkill, this);

        this.canUpdate = true;
    }

    /**武器发生变化 */
    private listen_weaponIdChange(pId: number, weaponId: number) {
        if (pId != mw.Player.localPlayer.playerId) {
            return;
        }

        let weaponCfg = GameConfig.Weapon.getElement(weaponId);
        if (weaponCfg == null) {
            return;
        }

        let motionBtnCfg = GameConfig.MotionBtn.getElement(weaponCfg.skillBtnBindId);
        if (motionBtnCfg == null) {
            return;
        }

        for (let index = 0; index < this.weaponSkillBtns.length; index++) {
            let btnDataId: number = motionBtnCfg[`mCanvasSkill${index}`];
            if (btnDataId == null ||
                btnDataId == 0) {
                this.weaponSkillBtns[index].hideBtn();
                continue;
            }
            this.weaponSkillBtns[index].setInfo(btnDataId);
        }

    }

    /**刷新选择的技能 */
    private listen_randomSkill(skillLibIds: number[]) {
        for (let index = 0; index < this.skillBtns.length; index++) {
            let skillLibId = skillLibIds[index];
            let skillLibCfg = GameConfig.SkillLib.getElement(skillLibId);
            if (skillLibCfg == null || skillLibCfg.motionBtnDataId == 0) {
                this.skillBtns[index].hideBtn();
                continue;
            }
            this.skillBtns[index].setInfo(skillLibCfg.motionBtnDataId);
        }
    }

    onUpdate(dt) {
        for (let index = 0; index < this.weaponSkillBtns.length; index++) {
            this.weaponSkillBtns[index].onUpdate(dt);
        }

        for (let index = 0; index < this.skillBtns.length; index++) {
            this.skillBtns[index].onUpdate(dt);
        }
    }



}