import { ModifiedCameraSystem } from '../../Modified027Editor/ModifiedCamera';
import { SpawnManager } from '../../Modified027Editor/ModifiedSpawn';
import { GameConfig } from "../../config/GameConfig";
import { GlobalEnum } from "../../const/Enum";
import { EggEndInfo, GlobalData } from "../../const/GlobalData";
import GToolkit from '../../util/GToolkit';
import { EffectManager } from "../../util/EffectManager";

import { cubicBezier } from "../../util/MoveUtil";
import { SoundManager } from "../../util/SoundManager";
import { UICtrl } from "../../util/UICtrl";
import { utils } from "../../util/uitls";
import { BagTool } from "../PetBag/BagTool";
import { PlayerModuleC } from "../Player/PlayerModuleC";
import { P_EggGet } from "./P_EggMachine";


export class EggMachineTween {

    public onTweenAc: Action1<boolean> = new Action1();

    private char: mw.Character;
    private camera: Camera;

    private cube1: mw.GameObject = null;
    private cube2: mw.GameObject = null;
    private egg: mw.GameObject = null;
    private pet: mw.GameObject = null;
    private petId: number = 0;
    private isStart: boolean = false;
    private currentEndInfo: EggEndInfo = GlobalData.EggMachine.eggEndInfos[0];
    private endTween: mw.Tween<EggEndInfo> = null;
    private order: number = 0;

    private static _instance: EggMachineTween = null;
    private touch: mw.TouchInput;
    private taskEgg: mw.GameObject;
    private dollEgg_1: mw.GameObject;
    private dollEgg_2: mw.GameObject;
    private dollEgg_3: mw.GameObject;

    public static get instance(): EggMachineTween {
        if (!this._instance) {
            this._instance = new EggMachineTween();

        }
        return this._instance;
    }

    private isInit: boolean = false;
    /**当前是否为第一阶段 */
    private isStage1: boolean = true;

    public async init() {
        if (this.isInit) return;
        this.isInit = true;
        this.char = Player.localPlayer.character;
        this.camera = Camera.currentCamera;
        SpawnManager.asyncSpawn({ guid: "7669" }).then(obj => {
            this.cube1 = obj;
            this.cube1.setVisibility(mw.PropertyStatus.Off);
            this.cube1.setCollision(mw.PropertyStatus.Off);
            SpawnManager.asyncSpawn({ guid: "7669" }).then(obj => {
                this.cube2 = obj
                this.cube2.parent = this.cube1;
                this.cube2.localTransform.position = (mw.Vector.zero);
                this.cube2.setVisibility(mw.PropertyStatus.Off);
                this.cube2.setCollision(mw.PropertyStatus.Off);
            });
        });
        this.taskEgg = await GameObject.asyncFindGameObjectById(GlobalData.SpecialEgg.taskEggGuid);
        this.dollEgg_1 = await GameObject.asyncFindGameObjectById(GlobalData.SpecialEgg.egg1);
        this.dollEgg_2 = await GameObject.asyncFindGameObjectById(GlobalData.SpecialEgg.egg2);
        this.dollEgg_3 = await GameObject.asyncFindGameObjectById(GlobalData.SpecialEgg.egg3);
        this.touch = new mw.TouchInput();
    }
    private _wing: Effect = null;
    /**
     * 开始动画
     * @param obj 蛋模型
     * @param guid 开出的宠物表id
     * @param eggId 扭蛋id
     */
    public async startTween(obj: mw.GameObject, petId: number, eggId?: number) {
        if (this.isStart) return;
        if (!this.cube1 || !this.cube2) return;
        UICtrl.instance.closeAllUI();
        PlayerModuleC.curPlayer.setAllPetVisible(false);
        this.petId = petId;
        // 蛋模型扭蛋动画的transform (传入eggid并且存在配置时优先读配置，否则使用默认值)
        let eggConf = GameConfig.EggMachine.getElement(eggId);
        let eggOffset = GlobalData.EggMachine.eggParentOffset;
        eggOffset = eggId && eggConf.AnimLocation ? Vector.add(eggOffset, eggConf.AnimLocation) : eggOffset;
        let eggRot = eggId && eggConf.AnimRotation ? new Rotation(eggConf.AnimRotation[0], eggConf.AnimRotation[1], eggConf.AnimRotation[2]) : new Rotation(0, 0, 90);

        this.egg = obj.clone();
        this.egg.setCollision(mw.PropertyStatus.Off);
        this.egg.parent = this.cube2;
        this.egg.localTransform.position = (eggOffset);
        this.egg.localTransform.rotation = (eggRot);
        if (eggId && eggConf.AnimScale) {
            this.egg.localTransform.scale = (eggConf.AnimScale);
        }
        this.egg.setVisibility(mw.PropertyStatus.On);
        let petConf = GameConfig.PetARR.getElement(petId);
        let guid = petConf.ModelGuid;
        let isDown = AssetUtil.assetLoaded(guid);
        if (!isDown) {
            await AssetUtil.asyncDownloadAsset(guid);
        }
        if (petConf.CharacterType === GlobalData.PetCharacterType.Character) {
            this.pet = await SpawnManager.asyncSpawn({ guid: "Character" });
            GToolkit.safeSetDescription(this.pet as Character, guid);
            (this.pet as Character).gravityScale = 0;
            (this.pet as Character).physicsEnabled = false;
            (this.pet as Character).movementEnabled = false;
            (this.pet as Character).jumpEnabled = false;
            (this.pet as Character).maxFallingSpeed = 0;

            let stance = (this.pet as Character).loadSubStance(GlobalData.pet.petShowStanceGuid);
            stance.play();

            (this.pet as Character).displayName = "";
            //加翅膀
            if (petConf.wingGuid && petConf.wingTransform) {
                this._wing = await mw.GameObject.asyncSpawn(petConf.wingGuid);

                (this.pet as Character).attachToSlot(this._wing, HumanoidSlotType.BackOrnamental);
                TimeUtil.delayExecute(() => {
                    //延迟隐藏，否则还会显示，可能某些属性生效会改变显影
                    (this.pet as Character).setVisibility(false);
                    (this._wing as Effect).play();
                    this._wing.localTransform = new Transform(new Vector(petConf.wingTransform[0][0], petConf.wingTransform[0][1], petConf.wingTransform[0][2]), new Rotation(petConf.wingTransform[1][0], petConf.wingTransform[1][1], petConf.wingTransform[1][2]), new Vector(petConf.wingTransform[2][0], petConf.wingTransform[2][1], petConf.wingTransform[2][2]));;
                }, 10);
                this._wing.setVisibility(false);
            }

        } else if (petConf.CharacterType === GlobalData.PetCharacterType.GameObject) {
            this.pet = await SpawnManager.asyncSpawn({ guid: guid });
        }
        // 宠物模型扭蛋动画的transform
        let offset = petConf.MoveWay == 1 ? GlobalData.EggMachine.petEggOffset : GlobalData.EggMachine.petFlyEggOffset;
        offset = petConf.AnimLocation ? petConf.AnimLocation : offset;
        let rot = petConf.AnimRotation ? new Rotation(petConf.AnimRotation[0], petConf.AnimRotation[1], petConf.AnimRotation[2]) : Rotation.zero;
        let scale = petConf.AnimScale ? petConf.AnimScale : Vector.one;
        utils.showAllChildExcept(this.pet, false);
        this.pet.setCollision(mw.PropertyStatus.Off);
        this.pet.parent = this.cube2;
        this.pet.localTransform.position = (offset);
        if (petConf.CharacterType === GlobalData.PetCharacterType.Character) {
            this.pet.localTransform.rotation = rot.clone().add(new Rotation(0, 0, 180));
        } else if (petConf.CharacterType === GlobalData.PetCharacterType.GameObject) {
            this.pet.localTransform.rotation = rot.clone();
        }

        this.pet.localTransform.scale = (scale);

        SoundManager.instance.playSound(15);
        this.isStage1 = true;
        this.tweenInit();
        this.isStart = true;
        this.onTweenAc.call(true);
        ModifiedCameraSystem.setOverrideCameraRotation(this.camera.worldTransform.clone().rotation);

    }


    /**宠物动画 */
    public async startTween_Pet(cfgId: number) {
        UICtrl.instance.closeAllUI();
        PlayerModuleC.curPlayer.setAllPetVisible(false);
        this.petId = cfgId;
        let petInfo = GameConfig.PetARR.getElement(cfgId);
        let guid = petInfo.ModelGuid;

        if (petInfo.CharacterType === GlobalData.PetCharacterType.Character) {
            this.pet = await SpawnManager.asyncSpawn({ guid: "Character" });

            (this.pet as Character).gravityScale = 0.1;
            (this.pet as Character).physicsEnabled = false;
            (this.pet as Character).movementEnabled = false;
            (this.pet as Character).jumpEnabled = false;
            (this.pet as Character).maxFallingSpeed = 0.1;
            GToolkit.safeSetDescription(this.pet as Character, guid);
            let stance = (this.pet as Character).loadSubStance(GlobalData.pet.petShowStanceGuid);
            stance.play();

            //加翅膀
            if (petInfo.wingGuid && petInfo.wingTransform) {
                this._wing = await mw.GameObject.asyncSpawn(petInfo.wingGuid);

                (this.pet as Character).attachToSlot(this._wing, HumanoidSlotType.BackOrnamental);
                TimeUtil.delayExecute(() => {
                    (this.pet as Character).setVisibility(false);
                    (this._wing as Effect).play();
                    this._wing.localTransform = new Transform(new Vector(petInfo.wingTransform[0][0], petInfo.wingTransform[0][1], petInfo.wingTransform[0][2]), new Rotation(petInfo.wingTransform[1][0], petInfo.wingTransform[1][1], petInfo.wingTransform[1][2]), new Vector(petInfo.wingTransform[2][0], petInfo.wingTransform[2][1], petInfo.wingTransform[2][2]));;
                }, 10);
            }
            (this.pet as Character).displayName = "";

            this._wing.setVisibility(false);
        } else if (petInfo.CharacterType === GlobalData.PetCharacterType.GameObject) {
            this.pet = await SpawnManager.asyncSpawn({ guid: guid });

        }

        // SpawnManager.asyncSpawn({ guid: guid }).then((obj) => {
        // this.pet = obj;
        let offset = petInfo.MoveWay == 1 ? GlobalData.EggMachine.petEggOffset : GlobalData.EggMachine.petFlyEggOffset;
        utils.showAllChildExcept(this.pet, false);
        this.pet.setCollision(mw.PropertyStatus.Off);
        this.pet.parent = this.cube2;
        this.pet.localTransform.position = (offset);
        if (petInfo.CharacterType === GlobalData.PetCharacterType.Character) {
            this.pet.localTransform.rotation = new Rotation(0, 0, 180);
        } else if (petInfo.CharacterType === GlobalData.PetCharacterType.GameObject) {
            this.pet.localTransform.rotation = Rotation.zero;
        }
        this.state1Over();
        // })
        SoundManager.instance.playSound(15);
        this.isStage1 = true;
        this.isStart = true;
        this.onTweenAc.call(true);
        ModifiedCameraSystem.setOverrideCameraRotation(this.camera.worldTransform.clone().rotation);
    }

    /**任务扭蛋动画
     * @returns 返回扭出的宠物表id
     */
    public startTween_Special(cfgId: number, type: GlobalEnum.SpecialEgg): number {
        let cfg = GameConfig.EggMachine.getElement(cfgId);
        let index = BagTool.calculateWeight(cfg.Weight);
        if (type == GlobalEnum.SpecialEgg.Task)
            this.startTween(this.taskEgg, cfg.petArr[index]);
        else {
            console.error("扭蛋类型错误: " + type);
        }
        return cfg.petArr[index];
    }


    private currentEffId: number = 0;

    private tweenInit(): void {
        const endInfos = GlobalData.EggMachine.eggEndInfos;
        const bezier = GlobalData.EggMachine.tweenBezier[this.order];
        const time = GlobalData.EggMachine.tweenTime[this.order];
        let start = endInfos[this.order];
        let end = endInfos[this.order + 1];
        this.endTween = new mw.Tween(start.clone()).to(end.clone(), time).onUpdate((obj) => {
            this.currentEndInfo = obj;
        }).onComplete(() => {
            this.order++;
            if (this.order == 1) {
                SoundManager.instance.play3DSound(GlobalData.Music.rewardFireworks, this.cube1.worldTransform.position);
                this.currentEffId = EffectManager.instance.playEffectOnPos(11, this.cube1.worldTransform.position);
            }
            if (this.order == 8) {
                TimeUtil.delaySecond(GlobalData.EggMachine.effectAppearTime).then(() => {
                    EffectManager.instance.playEffectOnPos(8, this.cube1.worldTransform.position);
                })
            }
            if (this.order >= endInfos.length - 1) {
                this.state1Over();
                return;
            }
            this.tweenInit();
        }).start().easing(cubicBezier(bezier[0], bezier[1], bezier[2], bezier[3]));
    }

    private currentPetEffId: number = 0;

    /**蛋的动画结束 */
    private state1Over(): void {
        this.isStage1 = false;
        this.order = 0;
        this.cube1.worldTransform.scale = mw.Vector.one;
        if (this.egg)
            this.egg.destroy();
        this.egg = null;
        this.endTween?.stop();
        this.endTween = null;
        utils.showAllChildExcept(this.pet, true, "attack");
        SoundManager.instance.playSound(9);
        this.currentPetEffId = EffectManager.instance.playEffectOnObj(12, this.cube1);
        this.tween2Init();
        this.addTouch();
        this.pet.setVisibility(true);
        this._wing?.setVisibility(true);
        mw.UIService.getUI(P_EggGet).setInfo(this.petId);
    }

    private tween2Init(): void {
        const endInfos = GlobalData.EggMachine.petEndInfos;
        const time = GlobalData.EggMachine.petTweenTime[this.order];
        const bezier = GlobalData.EggMachine.petTweenBezier[this.order];
        let start = endInfos[this.order];
        let end = endInfos[this.order + 1];
        this.endTween = new mw.Tween(start.clone()).to(end.clone(), time).onUpdate((obj) => {
            this.currentEndInfo = obj;
        }).onComplete(() => {
            this.order++;
            if (this.order == 2) {
                if (this.currentPetEffId) {
                    EffectManager.instance.stopEffect(this.currentPetEffId);
                    this.currentPetEffId = 0;
                }
                mw.UIService.getUI(P_EggGet).hide();
            }
            if (this.order >= endInfos.length - 1) {
                this.state2Over();
                this.removeTouch();
                return;
            }
            this.tween2Init();
        }).start().easing(cubicBezier(bezier[0], bezier[1], bezier[2], bezier[3]));
    }


    private state2Over(): void {
        this.isStage1 = true;
        this.order = 0;
        this.isStart = false;
        this.cube1.worldTransform.scale = mw.Vector.one;
        this.pet.destroy();
        this._wing?.destroy();
        this.pet = null;
        this.endTween?.stop();
        this.endTween = null;
        UICtrl.instance.openMainUI();
        PlayerModuleC.curPlayer.setAllPetVisible(true);
        if (this.currentEffId) {
            EffectManager.instance.stopEffect(this.currentEffId);
            this.currentEffId = 0;
        }
        this.onTweenAc.call(false);
        ModifiedCameraSystem.resetOverrideCameraRotation();
    }

    public onUpdate(dt: number): void {
        if (!this.isStart) return;
        if (this.isStage1) {
            this.onUpdate1(dt);
        } else {
            this.onUpdate2(dt);
        }
    }

    /**步骤1update */
    public onUpdate1(dt: number): void {
        const cameraTrans = this.camera.worldTransform.clone();
        const nPos = cameraTrans.transformPosition(GlobalData.EggMachine.eggCameraOffset);
        nPos.z += this.currentEndInfo.posZ;
        const oRot = new mw.Rotation(this.currentEndInfo.rotX, 0, 0);
        this.cube1.worldTransform.position = nPos;
        this.cube1.worldTransform.rotation = cameraTrans.rotation;
        this.cube2.localTransform.rotation = oRot;
        let scale = this.currentEndInfo.scale;
        this.cube1.worldTransform.scale = new mw.Vector(scale, scale, scale);
    }

    /**步骤2update */
    public onUpdate2(dt: number): void {
        const cameraTrans = this.camera.worldTransform.clone();
        const nPos = cameraTrans.transformPosition(GlobalData.EggMachine.eggCameraOffset);
        nPos.z += this.currentEndInfo.posZ;
        const oRot = new mw.Rotation(0, 0, this.currentEndInfo.rotX);
        this.cube1.worldTransform.position = nPos;
        this.cube1.worldTransform.rotation = cameraTrans.rotation;
        this.cube2.localTransform.rotation = oRot;
        let scale = this.currentEndInfo.scale;
        this.cube1.worldTransform.scale = new mw.Vector(scale, scale, scale);
    }

    /**添加touch事件 */
    public addTouch(): void {
        this.touch?.onTouchEnd.clear();
        // this.touch.setPlayerController();
        this.touch?.onTouchEnd.add(this.forceSkip.bind(this));
    }
    /**移除touch事件 */
    public removeTouch(): void {
        this.touch?.onTouchEnd.clear();
    }
    /**强制跳过事件 */
    public forceSkip(a, b, c): void {
        if (this.order == 1) {
            this.endTween.stop()
            this.order++;

            if (this.currentPetEffId) {
                EffectManager.instance.stopEffect(this.currentPetEffId);
                this.currentPetEffId = 0;
            }
            mw.UIService.getUI(P_EggGet).hide();

            this.tween2Init();
        }
    }

}

