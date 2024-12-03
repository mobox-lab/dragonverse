import { PlayerManagerExtesion } from '../../Modified027Editor/ModifiedPlayer';
import { SpawnManager } from '../../Modified027Editor/ModifiedSpawn';
import { GeneralManager, } from '../../Modified027Editor/ModifiedStaticAPI';
import { GlobalData } from "../../const/GlobalData";
import { utils } from "../../util/uitls";


export class Skateboard {
    /**滑板模型 */
    private skateboardObj: mw.GameObject;
    /**滑板特效播放id */
    private effectPlayId: number;
    /**滑板动画 */
    private animation: mw.Animation;


    public async equipBoard(char: mw.Character, curChar: mw.Character) {
        await utils.downloadRes(GlobalData.Ripstik.ripstikGuid)
        this.skateboardObj = await SpawnManager.modifyPoolAsyncSpawn(GlobalData.Ripstik.ripstikGuid);

        char.attachToSlot(this.skateboardObj, GlobalData.Ripstik.slotName);

        if (this.skateboardObj && this.skateboardObj.localTransform) {
            this.skateboardObj.localTransform.position = (GlobalData.Ripstik.relativeLoc);
            this.skateboardObj.localTransform.rotation = (GlobalData.Ripstik.relativeRot);
            this.skateboardObj.localTransform.scale = (GlobalData.Ripstik.relativeScale);
            this.skateboardObj.setCollision(mw.PropertyStatus.Off);
        }


        /**拖尾特效 */
        this.effectPlayId = GeneralManager.rpcPlayEffectOnPlayer(
            utils.randomArray(GlobalData.Ripstik.effectIds),
            char.player,
            GlobalData.Ripstik.slotName,
            0,
            GlobalData.Ripstik.effectrelativeLoc
        )

        /**角色动作 */
        if (!mw.AssetUtil.assetLoaded(GlobalData.Ripstik.animationGuid)) {
            await AssetUtil.asyncDownloadAsset(GlobalData.Ripstik.animationGuid)
        }

        this.animation = char.loadAnimation(GlobalData.Ripstik.animationGuid);
        this.animation.loop = 0;

        this.animation.play();

        this.changeProperty(char, curChar, true);

    }

    public unEquipBoard(char: mw.Character, curChar: mw.Character) {
        if (!this.skateboardObj) return;
        this.skateboardObj.parent = null;
        this.skateboardObj.destroy();
        // GameObjPool.despawn(this.skateboardObj);
        EffectService.stop(this.effectPlayId);
        this.animation?.stop();
        this.changeProperty(char, curChar, false);

    }

    /**续播滑板动画 */
    public continueAnimation() {
        this.animation?.play();
    }


    private changeProperty(char: mw.Character, curChar: mw.Character, isEquip: boolean) {
        if (char != curChar) return;
        //Camera.currentCamera.springArm.localTransform.clone().location = GlobalData.Ripstik.cameraRelativeLoc;
        char.maxAcceleration = isEquip ? char.maxAcceleration + GlobalData.Ripstik.maxAcceleration : char.maxAcceleration - GlobalData.Ripstik.maxAcceleration;
        char.maxWalkSpeed = isEquip ? char.maxWalkSpeed + GlobalData.Ripstik.maxSpeed : char.maxWalkSpeed - GlobalData.Ripstik.maxSpeed;
        char.groundFriction = isEquip ? char.groundFriction - GlobalData.Ripstik.groundFriction : char.groundFriction + GlobalData.Ripstik.groundFriction;
        char.groundFrictionEnabled = !isEquip;
        char.brakingDecelerationWalking = isEquip ? char.brakingDecelerationWalking - GlobalData.Ripstik.walkRate : char.brakingDecelerationWalking + GlobalData.Ripstik.walkRate;
    }

    update(dt: number) {

    }

}