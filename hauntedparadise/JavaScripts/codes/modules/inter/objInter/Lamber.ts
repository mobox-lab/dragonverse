/*
 * @Author       : hangyuan.zhang hangyuan.zhang@appshahe.com
 * @Date         : 2023-12-24 14:23:05
 * @LastEditors  : hangyuan.zhang hangyuan.zhang@appshahe.com
 * @LastEditTime : 2023-12-26 11:53:01
 * @FilePath     : \hauntedparadise\JavaScripts\codes\modules\inter\objInter\Lamber.ts
 * @Description  : 
 */

import { MainUI } from "../../../ui/MainUI";

@Component
export default class Lamber extends Script {
    @Property({ displayName: "向下爬梯子动作" })
    public climbDown: string = "164199";
    @Property({ displayName: "向上爬梯子动作" })
    public climbUp: string = "164200";
    @Property({ displayName: "梯子爬到顶以后越过距离" })
    public climbOverDistance: number = 50;
    /**用来设置角色位置的物体 */
    private transformObj: GameObject;

    private _isClimbUp: boolean = false;
    private _isClimbDown: boolean = false;
    /**攀爬时间是否触发了已经 */
    private _isClimbing: boolean = false;
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    private _boundJudgeClimb: any;
    private _animationUpMap: Map<number, Animation> = new Map<number, Animation>();
    private _animationDownMap: Map<number, Animation> = new Map<number, Animation>();
    private _trigger: Trigger;

    private _sizeZ: number;
    protected onStart(): void {
        this.initAsset();
        if (SystemUtil.isServer()) {
            return;
        }
        this._sizeZ = this.gameObject.worldTransform.position.z + this.gameObject.getBoundingBoxExtent().z / 2;

        this._trigger = this.gameObject.getChildByName("trigger") as Trigger;
        this.transformObj = this.gameObject.getChildByName("transformObj");
        this._trigger.onLeave.add((other) => {
            console.log("玩家离开触发器")
            if (other instanceof Character && other == Player.localPlayer.character && this._isClimbing) {
                this.endClimb(true);
                console.log("玩家通过触发器离开梯子")
            }
        });


        //触发爬梯子事件
        Event.addLocalListener("Lamber", (guid) => {
            console.log(guid, "接受到爬梯子事件了");
            if (!this._isClimbing) {
                this.change2Climb();
            } else {
                this.endClimb();
            }
        })

        InputUtil.onKeyDown(Keys.L, () => {
            this.endClimb();
        })

    }

    async change2Climb() {
        this.initAsset();
        this.server_changeStance(Player.localPlayer.playerId);
        this.startClimb();
        this._isClimbing = true;
    }

    private judgeClimb(vec: Vector2) {
        let transform = Player.localPlayer.character.worldTransform
        if (vec.y > 0) {

            Player.localPlayer.character.worldTransform.position = (transform.position.add(transform.getUpVector().multiply(3)));
            if (!this._isClimbUp) {
                this._isClimbUp = true
                this._isClimbDown = false
                this.server_playAnimation(Player.localPlayer.playerId, true);
            }
        }
        if (vec.y < 0) {
            Player.localPlayer.character.worldTransform.position = transform.position.add(transform.getUpVector().multiply(-3));
            if (!this._isClimbDown) {
                this._isClimbDown = true
                this._isClimbUp = false
                this.server_playAnimation(Player.localPlayer.playerId, false);
            }
        }
        if (vec.y == 0) {
            this._isClimbDown = false
            this._isClimbUp = false
            this.server_playAnimation(Player.localPlayer.playerId);
        }
    }

    @RemoteFunction(Server)
    private async server_playAnimation(playerId: number, isUp: boolean = null) {
        let player = await Player.asyncGetPlayer(playerId);
        if (!AssetUtil.assetLoaded(this.climbUp) || !AssetUtil.assetLoaded(this.climbDown)) {
            await AssetUtil.asyncDownloadAsset(this.climbUp);
            await AssetUtil.asyncDownloadAsset(this.climbDown);
        }
        let animationUp: Animation = null
        let animationDown: Animation = null

        if (!this._animationUpMap.has(playerId)) {
            animationUp = player.character.loadAnimation(this.climbUp)
            this._animationUpMap.set(playerId, animationUp);
        }

        if (!this._animationDownMap.has(playerId)) {
            animationDown = player.character.loadAnimation(this.climbDown)
            this._animationDownMap.set(playerId, player.character.loadAnimation(this.climbDown));
        }

        animationUp = this._animationUpMap.get(playerId);
        animationDown = this._animationDownMap.get(playerId);

        if (isUp == null) {
            animationUp.stop();
            animationDown.stop();
            return;
        }
        animationUp.loop = 0;
        animationDown.loop = 0;

        if (isUp) {
            animationUp.play();
        }
        if (isUp == false) {
            animationDown.play();
        }

    }

    @RemoteFunction(Server)
    private async server_changeStance(playerId) {
        if (!AssetUtil.assetLoaded("119920")) {
            await AssetUtil.asyncDownloadAsset("119920");
        }
        (await Player.asyncGetPlayer(playerId)).character.loadSubStance("119920").play();
    }
    /**
     * 初始化攀爬的资源双端都要下载
     */
    private async initAsset() {
        if (!AssetUtil.assetLoaded(this.climbUp) || !AssetUtil.assetLoaded(this.climbDown)) {
            await AssetUtil.asyncDownloadAsset(this.climbUp);
            await AssetUtil.asyncDownloadAsset(this.climbDown);
            await AssetUtil.asyncDownloadAsset("119920");
            console.log("下载资源完成")
        }
    }

    /**
     * 客户端开始攀爬
     */
    private startClimb() {
        Player.localPlayer.character.switchToFlying();
        //判断是在梯子上面还是下面了
        if (Player.localPlayer.character.worldTransform.position.z < this._sizeZ) {
            Player.localPlayer.character.worldTransform.position = this.transformObj.worldTransform.position
        } else {
            Player.localPlayer.character.worldTransform.position = this.transformObj.worldTransform.position.add(new Vector(0, 0, this.gameObject.getBoundingBoxExtent().z - 100));
        }

        Camera.currentCamera.lookAt(this.gameObject);


        UIService.getUI(MainUI).mTouchPad.enable = false

        UIService.getUI(MainUI).mVirtualJoystickPanel.controlType = CameraControlType.None
        this._boundJudgeClimb = this.judgeClimb.bind(this);
        UIService.getUI(MainUI).mVirtualJoystickPanel.onInputDir.add(this._boundJudgeClimb);
    }

    private endClimb(isLeave: boolean = false) {
        Player.localPlayer.character.switchToWalking();
        UIService.getUI(MainUI).mVirtualJoystickPanel.controlType = CameraControlType.MoveType
        // UIService.getUI(MainUI).mVirtualJoystickPanel.onInputDir.remove(this._inputAction);
        UIService.getUI(MainUI).mVirtualJoystickPanel.onInputDir.remove(this._boundJudgeClimb);
        this._boundJudgeClimb = null;
        //UIService.getUI(MainUI).mVirtualJoystickPanel.onInputDir.clear()

        this.server_endClimb(Player.localPlayer.playerId);
        this._isClimbing = false;
        UIService.getUI(MainUI).mTouchPad.enable = true
        if (isLeave && Player.localPlayer.character.worldTransform.position.z > this._sizeZ) {
            Player.localPlayer.character.worldTransform.position = Player.localPlayer.character.worldTransform.position.add(new Vector(0, this.climbOverDistance, 0));
        }
    }

    @RemoteFunction(Server)
    private async server_endClimb(playerId: number) {
        (await Player.asyncGetPlayer(playerId)).character.currentSubStance?.stop();
        this._animationDownMap.get(playerId)?.stop()
        this._animationUpMap.get(playerId)?.stop();
        this._animationDownMap.delete(playerId);
        this._animationUpMap.delete(playerId);
    }

}