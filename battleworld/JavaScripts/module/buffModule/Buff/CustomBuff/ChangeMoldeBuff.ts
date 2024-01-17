import { SpawnManager } from '../../../../Modified027Editor/ModifiedSpawn';
import { PlayerManagerExtesion, } from '../../../../Modified027Editor/ModifiedPlayer';
import { BuffData } from "module_buff";
import { oTrace, oTraceError } from "odin";
import { EventManager } from "../../../../tool/EventManager";
import { util } from "../../../../tool/Utils";
import { EPlayerState } from "../../../PlayerModule/FSM/PlyerState";
import { BuffC_Base } from "../BuffC_Base";
import { BuffS_Base } from "../BuffS_Base";
// import { SceneUnitModuleS } from "../../../SceneUnitModule/SceneUnitModuleS";
import { Globaldata } from "../../../../const/Globaldata";
// import SceneUnitModelBase from "../../../SceneUnitModule/model/SceneUnitModelBase";
// import { ISceneUnitBase } from "../../../SceneUnitModule/model/ISceneUnitBase";
import { EModule_Events } from "../../../../const/Enum";
// import SceneUnitModel_Normal from "../../../SceneUnitModule/model/SceneUnitModel_Normal";
//import { BagSkillModuleData } from "../../../BagSkillModule/BagSkillModuleData";
import { GameConfig } from "../../../../config/GameConfig";

// import { P_Game_Role } from "../../../role/ui/P_Game_Role";

/**
 * 修改模型 BUFF   变形法杖
 * 玩家使用后会播放一个motion，被该motion技能击中的目标会随机变成一个四足，被变形期间除了跳，其他均无法操作，持续x秒 
 */
export class ChangeMoldeBuffC extends BuffC_Base {
    /**是否变形了 */
    public static isChangeMolde: boolean = false
    /**隐藏玩家事件msg*/
    public static ChangeMoldeBuffC_HidePlayer: string = "ChangeMoldeBuffC_HidePlayer";
    /**玩家jump事件msg*/
    public static State_ChangeMolde_onCheck: string = "State_ChangeMolde_onCheck";

    /**外观 猫 狗 猪*/
    public animals: string[] = ["160373", "159665", "159890"]
    /**动画 */
    private jumpAnimation: string[] = ["150787", "150781", "150832"]
    /**动画 */
    private idleAnimation: string[] = ["150787", "150781", "150832"]

    /**随机索引 */
    private index: number = 0

    private npc: mw.Character = null
    private pos: mw.Vector = null
    private rotg: mw.Rotation = null

    private bagSkillId: number = null

    constructor(_id: number, staticConfig: BuffData, arg: any) {
        oTrace("ChangeMoldeBuffC constructor _id: ", _id, " configId: ", staticConfig.id, arg);
        super(_id, staticConfig, arg);

        this.index = _id % 3

        oTrace("ChangeMoldeBuffC this.index", this.index)

        EventManager.instance.add(ChangeMoldeBuffC.State_ChangeMolde_onCheck, this.jump.bind(this))
    }

    public init() {
        oTrace("ChangeMoldeBuffC init");
        super.init();
        this.buff_ChangeMolde(true)
    }

    /**
   * 销毁，清理
   */
    public destroy() {
        oTrace("ChangeMoldeBuffC Destroy");
        super.destroy();
        this.buff_ChangeMolde(false)
    }

    /**
    * 切换模型
    * @param buff 
    * @param t_pid 
    * @param isCreated 
    */
    private async buff_ChangeMolde(isCreated: boolean) {
        oTrace("切换模型--------------------------------------------", isCreated)
        if (this.hostId == null || isNaN(Number(this.hostId))) {
            oTraceError("error:buff_ChangeMolde buff.hostGuid == null ", this.hostId);
            return;
        }
        let t_pid = Number(this.hostId);
        if (t_pid > 0) {
            if (isCreated) {
                if (t_pid == Player.localPlayer.playerId) {
                    let player = Player.getPlayer(t_pid)
                    player.character.setCollision(mw.PropertyStatus.Off, true);
                    player.character.setVisibility(mw.PropertyStatus.Off, true);
                    //todo:显示装扮 挂机
                    //EventManager.instance.call(EPlayerEvents_C.player_setPlayerHeadVisable_c, false);
                    player.character.switchToFlying();
                    player.character.movementEnabled = false
                    player.character.jumpEnabled = false
                    this.playerModuleC.changeState(EPlayerState.ChangeMolde);
                    ChangeMoldeBuffC.isChangeMolde = true

                    EventManager.instance.call(ChangeMoldeBuffC.ChangeMoldeBuffC_HidePlayer, true)

                    //this.bagSkillId = DataCenterC.getData(BagSkillModuleData).bagSkillId;
                    //修改界面按钮
                    EventManager.instance.call(EModule_Events.buff_quickChange, this.param1);

                }

                //隐藏装扮 挂机
                EventManager.instance.call(EModule_Events.playerChangeEquipState, [t_pid], false);
                await TimeUtil.delaySecond(0.5);
                this.changeMolde_player(t_pid, this.index);


            } else {
                if (t_pid == Player.localPlayer.playerId) {
                    let player = Player.getPlayer(t_pid)
                    player.character.worldTransform.position = this.pos;
                    player.character.worldTransform.rotation = this.rotg;
                    player.character.setCollision(mw.PropertyStatus.On, true);
                    player.character.setVisibility(mw.PropertyStatus.On, true);
                    //todo:显示装扮 挂机
                    //EventManager.instance.call(EPlayerEvents_C.player_setPlayerHeadVisable_c, true);
                    player.character.switchToWalking();

                    //打开选角不执行
                    // let roleUI = mw.UIService.getUI(P_Game_Role);
                    // if (roleUI.visible == false) {
                    // ModifiedCameraSystem.setCameraFollowTarget(player.character)
                    Camera.currentCamera.parent = (player.character);
                    // }

                    player.character.movementEnabled = true
                    player.character.jumpEnabled = true

                    this.playerModuleC.changeState(EPlayerState.Idle)
                    ChangeMoldeBuffC.isChangeMolde = false;

                    EventManager.instance.call(ChangeMoldeBuffC.ChangeMoldeBuffC_HidePlayer, false)
                    // //修改界面按钮
                    // if (this.bagSkillId) {
                    //     let bagSkillCfg = GameConfig.BagSkill.getElement(this.bagSkillId);
                    //     if (bagSkillCfg == null) {
                    //         EventManager.instance.call(EModule_Events.buff_quickChange, 0);
                    //     } else {
                    //         EventManager.instance.call(EModule_Events.buff_quickChange, bagSkillCfg.MotionBtnId);
                    //     }
                    // }
                    oTrace("修改界面按钮__", this.bagSkillId,)
                }

                if (this.npc) {
                    mwext.GameObjPool.despawn(this.npc)
                    this.npc = null
                }

                EventManager.instance.call(EModule_Events.playerChangeEquipState, [t_pid], true);
            }

        } else {
            if (isCreated) {
                this.changeMolde_ScenceUnit(t_pid, this.index, true)
            } else {
                this.changeMolde_ScenceUnit(t_pid, this.index, false)
            }
        }

    }

    private jump() {
        if (Number(this.hostId) != Player.localPlayer.playerId) {
            return
        }
        if (this.npc) {
            oTrace("xxxxxxxxxxxxxxjump", this.npc)
            this.npc.jump();
            PlayerManagerExtesion.rpcPlayAnimationLocally(this.npc, this.jumpAnimation[this.index], 1, 1)
        }
    }

    /**
     * 切换玩家模型
     * @param t_pid 
     * @param index 
     */
    private async changeMolde_player(t_pid: number, index: number) {
        oTrace("changeMolde_player--------------------------------------------", t_pid, index)
        let player = Player.getPlayer(t_pid)
        let guid = this.animals[index]
        if (!AssetUtil.assetLoaded(guid)) {
            await AssetUtil.asyncDownloadAsset(guid);
        }
        this.npc = await SpawnManager.modifyPoolAsyncSpawn("NPC") as mw.Character;
        await this.npc.asyncReady();
        this.npc.moveFacingDirection = mw.MoveFacingDirection.FixedDirection;
        this.npc.movementDirection = mw.MovementDirection.AxisDirection;


        this.npc.description.base.wholeBody = guid;

        this.pos = player.character.worldTransform.position.clone()
        this.rotg = player.character.worldTransform.rotation.clone()
        this.npc.worldTransform.position = this.pos.clone();
        this.npc.worldTransform.rotation = this.rotg.clone();
        //player.character.attachToSlot(npc ,23); //ERROR 不行
        oTrace("playerxxxxxxxxxxxxxxxxxxxx", this.npc, player)
        this.npc.maxJumpHeight = 200
        this.npc.displayName = "";
        this.npc.jumpEnabled = true;
        this.npc.movementEnabled = true
        this.npc.jumpMaxCount = 1
        this.npc.setVisibility(mw.PropertyStatus.On);
        this.npc.setCollision(mw.PropertyStatus.On);
        this.npc.gravityScale = Globaldata.dfgravityScale;
        this.npc.switchToWalking()
        this.npc.addMovement(player.character.localTransform.getForwardVector())//BUG ERROR不调用没物理
        // this.npc.animationMode = mw.AnimationMode.Custom;
        // PlayerManagerExtesion.rpcPlayAnimation(this.npc, "150777", 0)

        if (t_pid == Player.localPlayer.playerId) {
            //打开选角不执行
            // let roleUI = mw.UIService.getUI(P_Game_Role);
            // if (roleUI.visible == false) {
            // ModifiedCameraSystem.setCameraFollowTarget(this.npc)
            Camera.currentCamera.parent = (this.npc)

            //}

        }
    }

    /**切换NPC模型 */
    private async changeMolde_ScenceUnit(t_pid: number, index: number, ischange: boolean) {
        // oTrace("changeMolde_ScenceUnit--------------------------------------------", t_pid, index, ischange)
        // let guid = null
        // let unit: ISceneUnitBase = this.sceneUnitModuleC.getSceneUnit(t_pid)
        // if (unit) {
        //     if (!unit.model || !unit.unitCfg) {
        //         return
        //     }

        //     if (ischange) {
        //         guid = this.animals[index]
        //     } else {
        //         guid = unit.unitCfg.AppearanceGUID[0]
        //     }
        //     if (!AssetUtil.assetLoaded(guid)) {
        //         await AssetUtil.asyncDownloadAsset(guid);
        //     }

        //     if (!(unit instanceof SceneUnitModel_Normal)) {
        //         return;
        //     }

        //     if (!(PlayerManagerExtesion.isNpc(unit.model))) return;

        //     this.npc = unit.model as mw.Character;

        //     if (ischange) {
        //         if (unit instanceof SceneUnitModel_Normal) {
        //             unit.stopAnimationByState();
        //         }
        //         if(unit.unitCfg.charType == 1){
        //             this.npc.description.base.wholeBody = guid;
        //         }

        //         if(unit.unitCfg.charType == 2){
        //             this.npc.clearDescription();
        //             // await TimeUtil.delaySecond(0.5);
        //             // this.npc.description.base.wholeBody = guid;
        //         }
        //     }
        //     else {
        //         if(unit.unitCfg.charType == 1){
        //             this.npc.description.base.wholeBody = guid;
        //         }

        //         if(unit.unitCfg.charType == 2){
        //             // this.npc.description.base.wholeBody = null;
        //             // await TimeUtil.delaySecond(0.5);
        //             // this.changeCloth_V2(guid)
        //         }
        //     }


        //     this.npc.addMovement(this.npc.localTransform.getForwardVector())//BUG ERROR不调用没物理

        // }

    }


    private changeCloth_V2(appearanceGUID: string) {

        this.npc.clearDescription();

        this.npc.setDescription(appearanceGUID);

        this.npc.onDescriptionComplete.clear();
        this.npc.onDescriptionChange.add(() => {

        })
    }

}

export class ChangeMoldeBuffS extends BuffS_Base {
    /**怪模块*/
    // public sceneUnitModuleS: SceneUnitModuleS = null;

    constructor(_id: number, staticConfig: BuffData, arg: any) {
        oTrace("ExampleBuffS constructor ", _id, staticConfig.id, arg);
        super(_id, staticConfig, arg);
    }

    public init() {
        oTrace("ExampleBuffS init");
        super.init();
        // this.sceneUnitModuleS = ModuleService.getModule(SceneUnitModuleS);
        this.buff_ChangeMolde(true)
    }

    /**
    * 销毁，清理
    */
    public destroy() {
        oTrace("ExampleBuffS Destroy");
        super.destroy();
        this.buff_ChangeMolde(false)
    }

    public onUpdate(dt: number): void {
        super.onUpdate(dt);
    }


    /**
     * 切换模型
     * @param buff 
     * @param t_pid 
     * @param isCreated 
     */
    private async buff_ChangeMolde(isCreated: boolean) {

        if (this.hostGuid == null || isNaN(Number(this.hostGuid))) {
            oTraceError("error:buff_ChangeMolde buff.hostGuid == null ", this.hostGuid);
            return;
        }

        let t_pid = Number(this.hostGuid);

        if (t_pid > 0) {
            if (isCreated) {

            } else {

            }

        } else {
            // let unit: SceneUnitModelBase = this.sceneUnitModuleS.getSceneUnitByID(t_pid);
            // if (!(unit instanceof SceneUnitModel_Normal)) {
            //     return;
            // }

            // if(!unit.npc_S){
            //     return;
            // }

            // unit.setweapon(!isCreated);

            // if (isCreated) {
            //     if (unit) {
            //         unit.isChangeModel = true
            //     }

            // } else {
            //     if (unit) {
            //         unit.isChangeModel = false
            //     }
            // }
        }
    }

}