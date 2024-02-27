import { GameConfig } from "../../../config/GameConfig";
import { EAttributeEvents_C, EModule_Events, EMotionEvents_C, ESkillEvent_C } from "../../../const/Enum";
import { Globaldata } from "../../../const/Globaldata";
import KeyOperationManager from "../../../controller/key-operation-manager/KeyOperationManager";
import { EventManager } from "../../../tool/EventManager";
import Main_action_Generate from "../../../ui-generate/Main/Main_action_generate";
import { AttributeModuleC } from "../../AttributeModule/AttributeModuleC";
import { Attribute } from "../sub_attribute/AttributeValueObject";
import { MainUISkillButton } from "./MainUISkillButton";


/**动作攻击UI */
export default class ActionUI extends Main_action_Generate {

    private atrributeMD: AttributeModuleC = null;

    /**武器绑定的按钮 */
    private weaponSkillBtns: MainUISkillButton[] = [];
    /**随机技能绑定的按钮 */
    private skillBtns: MainUISkillButton[] = [];

    private mfinalTween: Tween<any> = null;
    private renderTransformAngle: number = 0;

    protected onStart(): void {
        this.atrributeMD = ModuleService.getModule(AttributeModuleC);

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
            let button = rootCanvas.getChildByName("Btn_invoke") as mw.Button;
            switch (i) {
                case 3: {
                    button.addKey(Keys.E);
                    (rootCanvas.getChildByName("ShortCutKey") as TextBlock).text = Keys.E.toString();
                    break;
                }
                case 4: {
                    button.addKey(Keys.R);
                    (rootCanvas.getChildByName("ShortCutKey") as TextBlock).text = Keys.R.toString();
                    break;
                }
                case 5: {
                    button.addKey(Keys.T);
                    (rootCanvas.getChildByName("ShortCutKey") as TextBlock).text = Keys.T.toString();
                    break;
                }
                case 6: {
                    button.addKey(Keys.Y);
                    (rootCanvas.getChildByName("ShortCutKey") as TextBlock).text = Keys.Y.toString();
                    break;
                }
                default: break;
            }

        }

        /**释放大招 */
        this.mFinalSkill.onPressed.add(() => {
            EventManager.instance.call(EMotionEvents_C.MotionEvent_ReleaseFinalSkill_C);
        });

        EventManager.instance.add(EAttributeEvents_C.Attribute_WeaponId_Change_C, this.listen_weaponIdChange, this);
        EventManager.instance.add(ESkillEvent_C.SkillEvent_RandomSkill_C, this.listen_randomSkill, this);
        // 怒气值变化
        // EventManager.instance.add(EAttributeEvents_C.Attribute_AngerValue_C, this.listen_angerChange, this);

        EventManager.instance.add(EAttributeEvents_C.Attribute_gasExplosion_C, this.listen_gasExplosion, this);


        this.mFireCanvas.visibility = mw.SlateVisibility.Collapsed;


        this.mfinalTween = new Tween({ value: 0 }).to({ value: 1 }, 500).onUpdate((data) => {
            this.mBackImg.renderOpacity = MathUtil.lerp(0.7, 1, data.value);
            this.renderTransformAngle += 1;
            this.mBackImg.renderTransformAngle = this.renderTransformAngle;
            let scale = MathUtil.lerp(1, 1.1, data.value);
            Globaldata.tmpUIVector.x = scale;
            Globaldata.tmpUIVector.y = scale;
            this.mFireCanvas.renderScale = Globaldata.tmpUIVector;
        }).yoyo(true).repeat(Infinity);

        this.canUpdate = true;
    }

    /**
     * 监听玩家爆气状态 
     * @param pId 玩家id
     * @param state 爆气状态 0未爆气 1爆气中
     * @returns 
     */
    private listen_gasExplosion(pId: number, state: number) {

        if (pId != mw.Player.localPlayer.playerId) {
            return;
        }

        let weaponId = this.atrributeMD.getAttributeValue(Attribute.EnumAttributeType.weaponId);
        let weaponCfg = GameConfig.Weapon.getElement(weaponId);
        if (weaponCfg == null) {
            return;
        }


        if (state == 0) {
            let motionBtnCfg = GameConfig.MotionBtn.getElement(weaponCfg.skillBtnBindId);
            if (motionBtnCfg == null) {
                return;
            }
            let btnDataId: number = motionBtnCfg[`mCanvasSkill${0}`];
            this.weaponSkillBtns[0].setInfo(btnDataId);
            return;
        }

        this.weaponSkillBtns[0].setInfo(weaponCfg.motionBtnDataId);
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
        this.weaponName.text = GameConfig.Language[`Weapon_Name_${weaponId}`].Value;
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


    /**玩家怒气值变化 */
    // private listen_angerChange() {
    //     let maxAngerValue = this.atrributeMD.getAttributeValue(Attribute.EnumAttributeType.maxAngerValue);
    //     let curAngerValue = this.atrributeMD.getAttributeValue(Attribute.EnumAttributeType.angerValue);

    //     if (curAngerValue < maxAngerValue) {

    //         this.showVisibleFinalSkill(false);
    //         return;
    //     }

    //     this.showVisibleFinalSkill(true);
    // }

    public showVisibleFinalSkill(show: boolean) {
        if (show) {
            if (this.mFireCanvas.visible) {
                return;
            }
            this.mFireCanvas.visibility = mw.SlateVisibility.SelfHitTestInvisible;
            this.renderTransformAngle = 0;
            if (this.mfinalTween) {
                this.mfinalTween.start();
            }
            return;
        }
        if (this.mFireCanvas.visible == false) {
            return;
        }
        this.mFireCanvas.visibility = mw.SlateVisibility.Collapsed;
        if (this.mfinalTween) {
            this.mfinalTween.stop();
        }
    }

    public setAbilitiesVisible(visible: boolean) {
        //设置显影的时候要判断原ui是否已经显影
        if (visible) {
            this.weaponSkillBtns.forEach(item => {
                if (item.currentVisible === visible) {
                    item.outerSetVisible(visible);
                }
            })
            this.skillBtns.forEach(item => {
                if (item.currentVisible === visible) {
                    item.outerSetVisible(visible);
                }
            })
        } else {
            this.weaponSkillBtns.forEach(item => {
                if (item.currentVisible !== visible) {
                    item.outerSetVisible(visible);
                }
            })
            this.skillBtns.forEach(item => {
                if (item.currentVisible !== visible) {
                    item.outerSetVisible(visible);
                }
            })
        }

    }
}