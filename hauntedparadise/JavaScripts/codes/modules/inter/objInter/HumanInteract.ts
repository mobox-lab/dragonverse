import { PlayerManagerExtension } from "../../../Modified027Editor/ModifiedPlayer";

/**
 * 人物交互类，用于管理人的交互状态
 */
export class HumanInteract {
    /**  是否正在交互 */
    public isInteracting: boolean = false;

    /**  交互前角色位置 */
    public charPreLoc: Vector = Vector.zero;

    /**  加载的姿态 */
    private _loadStance: mw.SubStance;

    /**  交互状态改变时的回调函数 */
    public onInteractStatsChange: Action1<boolean> = new Action1()

    /**  是否正在加载姿态 */
    public isLoadingStance: boolean = false;

    /**  交互代理 */
    private _interProxy: Interactor;

    /** 上一个交互点位 */
    private _interpos: GameObject;

    /**
     * 初始化交互对象
     * @returns 初始化是否成功
     */
    async initInterObj() {
        if (!this._interProxy || !this._interProxy.localTransform) {
            this._interProxy = await GameObject.asyncSpawn("Interactor", { replicates: false });
            await this._interProxy.asyncReady();
        }
        if (!this._interProxy || !this._interProxy.localTransform) {
            return false;
        }
        else {
            return true;
        }
    }

    /**
     * 进入交互状态
     * @param interGuid 交互对象的guid
     * @param cfgId 交互配置id
     * @param interObj 交互对象
     * @param isOutSideObj 是否在交互对象外部
     */
    async enterInteract(stanceId: string, interObj: mw.GameObject, slotPos: HumanoidSlotType, isRotcam: boolean) {
        if (!this._interProxy || !this._interProxy.localTransform) {
            this._interProxy = await GameObject.asyncSpawn("Interactor", { replicates: false });
            await this._interProxy.asyncReady();
        }
        const char = Player.localPlayer.character;
        this.charPreLoc = char.worldTransform.position.clone();
        this.isLoadingStance = true;

        let oofset = char.getSlotWorldPosition(HumanoidSlotType.Root);
        char.worldTransform.position = interObj.worldTransform.position.subtract(oofset).add(char.worldTransform.position);
        if (!AssetUtil.assetLoaded(stanceId)) {
            await AssetUtil.asyncDownloadAsset(stanceId);
        }
        this._loadStance = PlayerManagerExtension.loadStanceExtesion(char, stanceId, true);
        if (this._loadStance) {
            this._loadStance.blendMode = mw.StanceBlendMode.WholeBody;
        }

        char.movementEnabled = false;
        char.jumpEnabled = false;
        if (!this.isLoadingStance) {
            console.log("姿态交互过程中取消了交互")
            return;
        }
        console.log("当前交互对象guid" + interObj.gameObjectId)

        this._interProxy.parent = interObj;
        this._interProxy.localTransform.position = Vector.zero;
        this._interProxy.localTransform.rotation = Rotation.zero;
        this._interProxy.onEnter.clear();
        this._interProxy.onEnter.add(() => {
            this._interpos = interObj;
            this._loadStance.play();
            if (isRotcam) {
                Player.setControllerRotation(interObj.worldTransform.rotation);
            }
            this.isInteracting = true;
        })
        this._interProxy.enter(char, slotPos, this._loadStance.assetId);
        console.log("当前的相对位置" + char.localTransform.position);
        Camera.currentCamera.springArm.collisionEnabled = false;

        this.isLoadingStance = false;
        char.localTransform.rotation = Rotation.zero;
        this.onInteractStatsChange.call(true);
    }

    /**
     * 退出交互
     * @param isResetLoc 是否需要重置位置
     * @param leavePos 为false的时候的相对位置
     */
    exitInteract(isResetLoc: boolean, leavePos: Vector = Vector.zero) {
        const char = Player.localPlayer.character;
        char.parent = null;
        char.movementEnabled = true;
        char.jumpEnabled = true;
        Player.localPlayer.character.worldTransform.scale = Vector.one;
        this._interProxy.onLeave.clear();
        this._interProxy.onLeave.add(() => {
            if (this._loadStance) {
                this._loadStance.stop();
            }
        })
        if (!this.isLoadingStance && isResetLoc) {
            if (this._interProxy.getCurrentCharacter()) {
                let offset = this._interpos.worldTransform.rotation.rotateVector(leavePos);
                this._interProxy.leave(char.worldTransform.position.clone().add(offset));
            }
            console.log("设置角色位置" + this.charPreLoc)
        }
        else {
            if (this._interProxy.getCurrentCharacter()) {
                this._interProxy.leave(char.worldTransform.position);
            }
        }
        //char.setCollision(CollisionStatus.On);
        Camera.currentCamera.springArm.collisionEnabled = true;
        this.isInteracting = false;
        let rot = char.worldTransform.rotation;
        rot.x = 0;
        rot.y = 0;
        char.worldTransform.rotation = rot;
        this.onInteractStatsChange.call(false);
    }
}