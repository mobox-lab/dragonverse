
import { oTrace } from "odin";
import { ClickUIPools } from "./ClickUIs";
import { InteractiveHelper, InteractLogic_C, InteractLogic_S, InteractObject } from "./InteractObject";


/**触发模式 */
enum ExitMode {
    None = "none",//无需退出(非独享)
    ExitBtn = "exitBtn",//UI退出按钮(独享)
    MoveJump = "moveJump"//移动或跳跃(独享)
}
//触发交互-UI操作
@Component
export default class Active_UI extends InteractObject {
    @mw.Property({ displayName: "交互距离", group: "属性" })
    public activeDis: number = 150;//可交互的距离
    @mw.Property({ displayName: "UI图标", group: "属性" })
    public icon: string = "110111";//默认是个小手
    @mw.Property({ displayName: "CDUI图标", group: "属性" })
    public cdIcon: string = "34423";//默认是个小手
    @mw.Property({ displayName: "UI图标偏移", group: "属性" })
    public offset: mw.Vector = new mw.Vector(0, 0, 0);
    @mw.Property({ displayName: "是否独享", group: "属性" })
    public own: boolean = true;
    @mw.Property({ displayName: "退出方式(独享用)", selectOptions: { "无": ExitMode.None, "退出按钮": ExitMode.ExitBtn, "移动跳跃": ExitMode.MoveJump }, group: "属性" })
    public exitMode: ExitMode = ExitMode.ExitBtn;
    @mw.Property({ displayName: "每次取反(共享用)", group: "属性" })
    public isNot: boolean = false;
    @mw.Property({ displayName: "冷却(秒)", group: "属性" })
    public CD: number = 0;
    @mw.Property({ displayName: "外部条件", group: "属性" })
    public activeCondition: string = "";

    //属性同步
    @mw.Property({ replicated: true, hideInEditor: true })
    public ownerPlayerId: number = 0;//当前与之交互的玩家id
    @mw.Property({ replicated: true, hideInEditor: true })
    public isInCD: boolean = false;//是否处于CD中


    onStart() {
        this.init(ActiveUI_S, ActiveUI_C);
    }
    // /**是否是独享 */
    // public get own(): boolean {
    //     return this.exitMode == ExitMode.ExitBtn || this.exitMode == ExitMode.MoveJump;
    // }
}
//客户端
export class ActiveUI_C extends InteractLogic_C<Active_UI> {
    private static updateFlagS: number = 0;
    private static yourSelf: mw.Player = null;
    private iconIsShow: boolean = false;//交互标记当前是否处于显示状态
    private isInCd: boolean = false;//交互标记当前是否处于CD状态
    private updateFlag: number = 0;//刷新延迟标记
    private clickHandle: () => void = null;
    onStart(): void {
        if (ActiveUI_C.yourSelf == null) {
            Player.asyncGetLocalPlayer().then((player: mw.Player) => {
                ActiveUI_C.yourSelf = player;
            });
        }
        this.updateFlag = ActiveUI_C.updateFlagS++;//MathLibrary.randomInt(0, 100);
        this.useUpdate = true;
    }
    onUpdate(dt: number): void {
        if (++this.updateFlag % 10 != 0) return;
        if (ActiveUI_C.yourSelf == null) return;


        let playerPos: mw.Vector = ActiveUI_C.yourSelf.character.worldTransform.position;
        let pos = this.gameObject.worldTransform.position;
        let isShow: boolean =
            mw.Vector.squaredDistance(playerPos, pos) <= Math.pow(this.info.activeDis, 2) &&
            this.info.ownerPlayerId == 0 &&
            InteractiveHelper.playInteractionEnable(ActiveUI_C.yourSelf, false);

        oTrace("showCkickIconshowCkickIconshowCkickIconshowCkickIcon error=",
            mw.Vector.squaredDistance(playerPos, pos) <= Math.pow(this.info.activeDis, 2),
            this.info.ownerPlayerId == 0,
            InteractiveHelper.playInteractionEnable(ActiveUI_C.yourSelf, false));
        this.showCkickIcon(isShow);
    }
    //设置是否显示点击按钮
    private showCkickIcon(value: boolean): void {


        if (this.isInCd != this.info.isInCD) {
            ClickUIPools.instance.changeIcon(this.info.isInCD ? this.info.cdIcon : this.info.icon, this.gameObject);
            this.isInCd = this.info.isInCD;
        }
        if (this.iconIsShow == value) return;
        this.iconIsShow = value;
        if (value) {
            if (this.clickHandle == null) {
                this.clickHandle = this.clickBtn.bind(this);
            }
            ClickUIPools.instance.show(this.info.isInCD ? this.info.cdIcon : this.info.icon, "", this.gameObject, this.info.offset, this.clickHandle);
        } else {
            ClickUIPools.instance.hide(this.gameObject);
        }
    }
    private async clickBtn() {
        if (this.info.isInCD) {
            InteractiveHelper.showTips(InteractiveHelper.getCDLanguage());
            return;
        }
        let err = await this.callServerFun("net_activeHandle", true);
        if (err != null) {
            oTrace("交互失败 error=" + err);
        } else {
            if (this.info.own) {
                //InteractiveHelper.setPlayInteractState(ActiveUI_C.yourSelf, true);
            }
            //oTrace("交互成功 tag=" + this.gameObject.tag);
            if (!mw.StringUtil.isEmpty(this.gameObject.tag)) {
                InteractiveHelper.onPandoraAnalytics(this.gameObject.gameObjectId, this.gameObject.tag, true, this.info.own);
            }
        }
    }
    /**外部激活 */
    public outSideActive(): void {
        this.clickBtn();
    }
    private net_onPlayerAction(isActive: boolean) {
        if (isActive) {
            InteractiveHelper.addExitInteractiveListener(this.info.exitMode == ExitMode.ExitBtn ? 1 : 2, () => {
                InteractiveHelper.removeExitInteractiveListener();
                this.callServerFun("net_activeHandle", false).then((err: string) => {
                    if (err != null) {
                        //oTrace("退出交互失败 error=" + err);
                    } else {
                        //InteractiveHelper.setPlayInteractState(ActiveUI_C.yourSelf, false);
                        InteractiveHelper.onPandoraAnalytics(this.gameObject.gameObjectId, this.gameObject.tag, false, true);
                        //oTrace("退出交互成功");
                    }
                });
            });
        } else {
            InteractiveHelper.removeExitInteractiveListener();
        }
    }
}
//服务端
export class ActiveUI_S extends InteractLogic_S<Active_UI> {
    private beginCDTime: number = 0;
    private activeNum: number = 0;//激活的次数
    onStart(): void {
        Player.onPlayerLeave.add((player: mw.Player) => {
            if (this.info.ownerPlayerId == player.playerId) {
                this.activeHandle(player, false)
            }
        });
    }
    onPlayerAction(playerId: number, active: boolean, param: any): void {
        if (this.info.own) {
            this.callClientFun(playerId, "net_onPlayerAction", active);
            this.info.ownerPlayerId = active ? playerId : 0;
        }
    }
    //交互|取消交互的操作
    private net_activeHandle(flag: boolean): string {
        return this.activeHandle(this.currentPlayer, flag);
    }
    private activeHandle(player: mw.Player, flag: boolean): string {
        let playerId: number = player.playerId;
        if (flag) {
            if (this.info.own && this.info.ownerPlayerId != 0) {
                return "有人了";
            }
            if (this.beginCDTime > 0) {
                return "CD中";
            }
            if (!InteractiveHelper.playInteractionEnable(player)) {
                return "不能同时交互两个交互物";
            }
            if (!mw.StringUtil.isEmpty(this.info.activeCondition) && !InteractiveHelper.activeConditions(this.info.activeCondition)) {
                return "外部条件不满足";
            }
            if (this.info.own) {
                InteractiveHelper.onPlayInteract(playerId, true);
            }
            let res = this.interact(playerId, true);
            if (res && !this.info.own && this.info.CD > 0) {
                this.startCD();
            }
        } else {
            if (playerId != this.info.ownerPlayerId) {
                return "未和此物交互";
            }
            if (this.info.own) {
                InteractiveHelper.onPlayInteract(playerId, false);
            }
            let res = this.interact(playerId, false);
            if (res && this.info.own && this.info.CD > 0) {
                this.startCD();
            }
        }
        return null;
    }
    //交互
    protected interact(playerId: number, active: boolean, param: any = null): boolean {
        let res = this.interactThis(playerId, active, param);
        if (!res) return false;
        this.interactNext(playerId, active, param);
        return true;
    }
    protected interactThis(playerId: number, active: boolean, param: any = null): boolean {
        let outsideActive: string = this.info['outsideActive'];//外部调用
        if (!mw.StringUtil.isEmpty(outsideActive)) {
            let res = InteractiveHelper.onPlayerAction(playerId, active, param, outsideActive);
            if (res) {
                this.onPlayerAction(playerId, active, param);
            }
            return res;
        } else {
            this.onPlayerAction(playerId, active, param);
        }
        return true;
    }
    protected override interactNext(playerId: number, active: boolean, param: any) {
        if (!this.info.own && this.info.isNot) {//共享||自取反
            super.interactNext(playerId, ++this.activeNum % 2 == 1, param);
        } else {
            super.interactNext(playerId, active, param);
        }

    }
    private startCD() {
        this.beginCDTime = mw.TimeUtil.elapsedTime();
        this.info.isInCD = true;
        this.useUpdate = true;
    }
    onUpdate(dt: number) {
        if (this.beginCDTime == 0) return;
        if (mw.TimeUtil.elapsedTime() - this.beginCDTime >= this.info.CD) {
            this.beginCDTime = 0;
            this.info.isInCD = false;
            this.useUpdate = false;
        }
    }
}

