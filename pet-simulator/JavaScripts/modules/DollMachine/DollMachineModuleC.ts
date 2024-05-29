import { IDollMachineElement } from "../../config/DollMachine";
import { GameConfig } from "../../config/GameConfig";
import { GlobalEnum } from "../../const/Enum";
import { GlobalData } from "../../const/GlobalData";
import KeyOperationManager from "../../controller/key-operation-manager/KeyOperationManager";
import BuyCoinPanel from "../../ui/BuyCoinPanel";
import MessageBox from "../../util/MessageBox";
import { utils } from "../../util/uitls";
import { AnalyticsTool, ButtonAnaly } from "../Analytics/AnalyticsTool";
import { EggMachineTween } from "../InteractiveObjs/EggMachineTween";
import { PetBagModuleC } from "../PetBag/PetBagModuleC";
import { PlayerModuleC } from "../Player/PlayerModuleC";
import { DollMachineModuleS } from "./DollMachineModuleS";
import { MoveType, P_DollMachine, P_SummerCoin } from "./P_DollMachine";


export enum DollType {
    /**宠物 */
    Pet = 1,
    /**钻石 */
    Diamond = 2,
    /**蛋 */
    Egg = 3,
}

/**娃娃机客户端类 */
class DollMachineC {

    /**id */
    public id: number;
    /**正在使用娃娃机的玩家昵称 */
    public curNameText: mw.TextBlock;
    /**使用时间倒计时 */
    public curTimeCountText: mw.TextBlock;
    /**未使用的UIcanvas */
    public defaultCanvas: mw.Canvas;
    /**使用中的UIcanvas */
    public useCanvas: mw.Canvas;
    /**倒计时定时任务id */
    public timeCountIntervalId: number;
    /**勾爪gameObj */
    public hook: mw.GameObject;
    /**开始抓娃娃世界UI按钮 */
    public startBtn: mw.Button;
    /**点击开始抓娃娃按钮事件 */
    public onClickStartBtnAction: Action1<number> = new Action1();


    constructor(config: IDollMachineElement) {
        this.id = config.id;
        this.init(config);
    }

    private init(config: IDollMachineElement) {
        this.initWorldUI(config);
        this.initStartUI(config);
        this.initGameObjects(config);

    }

    /**初始化世界UI */
    private initWorldUI(conf: IDollMachineElement) {
        let timeObj = GameObject.findGameObjectById(conf.Time) as mw.UIWidget;
        let root = timeObj.getTargetUIWidget().rootContent;
        // 当前操作玩家
        this.curNameText = root.findChildByPath("mCanvas_Using/mTextBlock_Name") as mw.TextBlock;
        this.curNameText.text = "";
        // 倒计时
        this.curTimeCountText = root.findChildByPath("mCanvas_Using/mTextBlock_Time") as mw.TextBlock;
        this.curTimeCountText.text = "";
        // 默认canvas
        this.defaultCanvas = root.findChildByPath("mCanvas_Default") as mw.Canvas;
        // 使用canvas
        this.useCanvas = root.findChildByPath("mCanvas_Using") as mw.Canvas;

        // 设置固定文字
        let text = root.findChildByPath("mCanvas_Using/mTextBlock_Remaining") as mw.TextBlock;
        text.text = GameConfig.Language.Claw_Tips_6.Value;
        text = root.findChildByPath("mCanvas_Default/mTextBlock_Claw1") as mw.TextBlock;
        text.text = GameConfig.Language.Claw_Tips_4.Value;
        text = root.findChildByPath("mCanvas_Default/mTextBlock_Claw2") as mw.TextBlock;
        text.text = GameConfig.Language.Claw_Tips_5.Value;

        timeObj = GameObject.findGameObjectById(conf.Guide) as mw.UIWidget;
        text = timeObj.getTargetUIWidget().rootContent.findChildByPath("mTipsCanvas/TextBlock") as mw.TextBlock;
        text.text = GameConfig.Language.Claw_Tips_8.Value;
        // 初始化倒计时任务id为null
        this.timeCountIntervalId = null;
    }

    private _worldUIPos: Vector = new Vector();

    /**初始化开始抓娃娃世界UI点击事件 */
    private initStartUI(conf: IDollMachineElement) {
        let startBtnObj = GameObject.findGameObjectById(conf.Control) as mw.UIWidget;
        this._worldUIPos = startBtnObj.worldTransform.position;
        this.startBtn = startBtnObj.getTargetUIWidget().rootContent.findChildByPath("mCanvas/Canvas/mButton_Catch") as mw.Button;
        let skipBtn = startBtnObj.getTargetUIWidget().rootContent.findChildByPath("mCanvas/Canvas/skipBtn") as mw.Button;
        if (skipBtn) skipBtn.visibility = SlateVisibility.Hidden;
        this.startBtn.onClicked.add(() => {
            this.onClickStartBtnAction.call(this.id);
            console.log("点击按钮: " + this.id);
        });
        // 设置为未抓娃娃UI
        this.defaultCanvas.visibility = mw.SlateVisibility.SelfHitTestInvisible;
        this.useCanvas.visibility = mw.SlateVisibility.Collapsed;

        this.setStartShortcutKey();
    }

    public setStartShortcutKey() {
        KeyOperationManager.getInstance().onKeyUp(null, Keys.F, () => {
            let distance = Vector.squaredDistance(Player.localPlayer.character.worldTransform.position, this._worldUIPos);
            if (distance < 270000) {
                this.onClickStartBtnAction.call(this.id);
            }
        });
    }

    /**初始化gameObject */
    private initGameObjects(config: IDollMachineElement) {
        // 初始化勾爪
        this.hook = GameObject.findGameObjectById(config.Hook);
    }
}


export class DollMachineModuleC extends ModuleC<DollMachineModuleS, null> {

    private playerMC: PlayerModuleC = null;
    private shakeTween: mw.Tween<{ y: number; }>;
    /**娃娃机数组 (索引从1开始) */
    private machineList: DollMachineC[] = [null];
    /**玩家使用娃娃机的cd */
    public playerCD: number = 0;

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        this.initMachines();
        this.setGettingItemState();
        this.addStartBtnListener();
        this.controlUI = mw.UIService.getUI(P_DollMachine);
        let coinUI = mw.UIService.getUI(P_SummerCoin);

        this.controlUI.onMoveAc.add(this.onMoveAc.bind(this));
        this.controlUI.catchAc.add(this.onCatchAc.bind(this));
        this.playerMC = ModuleService.getModule(PlayerModuleC);
        coinUI.setValue(this.playerMC.SummerCoin);
        this.playerMC.onGoldChange.add((type, num) => {
            if (type == GlobalEnum.CoinType.SummerGold) {
                coinUI.setValue(num);
            }
        });
    }

    /**抓娃娃屏幕UI */
    private controlUI: P_DollMachine;
    /**是否交互中 */
    private isInteract: boolean = false;
    /**是否在领取奖励 */
    private isGettingItem: boolean = false;
    /**动画中 */
    private isTween: boolean = false;


    /**监听扭蛋事件，设置扭蛋状态 */
    private setGettingItemState() {
        EggMachineTween.instance.onTweenAc.add((isStart) => {

            if (!isStart) {
                this.isGettingItem = false;
            }
        });
    }

    /**初始化娃娃机数组 */
    private initMachines() {
        let confs = GameConfig.DollMachine.getAllElement();
        let len = confs.length;
        for (let i = 0; i < len; i++) {
            let machine = new DollMachineC(confs[i]);
            this.machineList.push(machine);
        }
    }


    /**添加开始抓娃娃事件 */
    private addStartBtnListener() {
        let len = this.machineList.length;
        for (let machineId = 1; machineId < len; machineId++) {
            this.machineList[machineId].onClickStartBtnAction.add((id) => {
                this.startBtnClick(id);
            });
        }
    }

    public setDollMachineShortcutKey() {
        for (let machineId = 1; machineId < this.machineList.length; machineId++) {
            this.machineList[machineId].setStartShortcutKey();
        }
    }


    /**开始按钮点击 */
    private async startBtnClick(machineId: number) {
        AnalyticsTool.action_click(ButtonAnaly.claw);
        console.log("进入点击事件");
        let name = mw.AccountService.getNickName();
        if (!name) {
            name = "玩家1";
        }
        // 如果自己正在使用娃娃机
        if (this.isInteract) {
            // TODO 换成多语言
            MessageBox.showOneBtnMessage(GameConfig.Language.Claw_Tips_11.Value);
            return;
        }
        // 玩家自己处于使用娃娃机的cd中
        if (this.playerCD > 0) {
            MessageBox.showOneBtnMessage(utils.Format(GameConfig.Language.Claw_Tips_10.Value, this.playerCD));
            return;
        }
        let isCan = await this.server.net_isUse(machineId);
        console.log("isUse = " + isCan);
        // 如果有人在使用娃娃机，或者自己在使用娃娃机
        if (!isCan) {
            MessageBox.showOneBtnMessage(GameConfig.Language.Claw_Tips_3.Value);
            return;
        }
        let petMC = ModuleService.getModule(PetBagModuleC);
        if (petMC.getCurPetNum() >= petMC.getBagCapacity()) {
            MessageBox.showOneBtnMessage(GameConfig.Language.Text_messagebox_4.Value);
            return;
        }
        //提示玩家是否玩
        MessageBox.showTwoBtnMessage(GameConfig.Language.Claw_Tips_1.Value, async (res) => {
            if (res) {
                // 检查是否有足够的抓娃娃币
                let coinCount = this.playerMC.checkGold(GlobalEnum.CoinType.SummerGold);
                let isSuccess = coinCount >= 1;
                if (!isSuccess) {
                    this.buySummerCoin();
                    return;
                }
                isSuccess = await this.server.net_playerConnect(name, machineId);
                console.log("连接状态：" + isSuccess);
                if (!isSuccess) {
                    MessageBox.showOneBtnMessage(GameConfig.Language.Claw_Tips_3.Value);
                    return;
                }
                // 减少抓娃娃币
                // this.playerMC.reduceGold(1, GlobalEnum.CoinType.SummerGold);

                this.isInteract = true;
                this.setUI(true, machineId);
                this.playerCD = GlobalData.DollMachine.PlayerCD;
            }
        });
    }

    /**设置当前玩家名，开始倒计时 */
    public net_setCurPlayerName(name: string, machineId: number, playerId: number) {
        if (name == "") {
            this.FinishCatchDoll(machineId);
            this.setUICanvasShow(true, machineId);
            // console.log("id1 = " + playerId);
            // console.log("id2 = " + this.currentPlayerId);
            // console.log("id是否相等" + (this.currentPlayerId == playerId))
            if (this.localPlayerId == playerId) {
                this.exitInteract();
            }
            return;
        }
        this.machineList[machineId].curNameText.text = name;
        this.timeCountDown(machineId);
        this.setUICanvasShow(false, machineId);
    }

    /**倒计时 */
    private async timeCountDown(machineId: number) {
        let machine = this.machineList[machineId];
        let time = GlobalData.DollMachine.Time;
        machine.timeCountIntervalId = TimeUtil.setInterval(() => {
            time--;
            machine.curTimeCountText.text = time + "/s";
            if (time <= 0) {
                this.FinishCatchDoll(machineId);
            }
        }, 1);
    }

    /**清楚倒计时 */
    private FinishCatchDoll(machineId: number) {
        // 清除倒计时任务
        let interval = this.machineList[machineId].timeCountIntervalId;
        if (interval) {
            TimeUtil.clearInterval(interval);
            this.machineList[machineId].timeCountIntervalId = null;
        }
        // 设置玩家进入抓娃娃cd
        TimeUtil.setInterval(() => {
            this.playerCD--;
        }, 1, () => {
            return this.playerCD <= 0;
        });
        // this.server.net_cancelPhysics(machineId)
    }

    public skipPlay(machineId: number) {
        this.setUI(false);
        this.server.net_randomGivePet(machineId);
    }

    /**移动操作 */
    private onMoveAc(type: MoveType, isDown: boolean, machineId: number) {
        // 按下设置该方向上的速度，松开则将该方向的速度设置为0
        let speed = isDown ? GlobalData.DollMachine.HookMoveSpeed : 0;
        switch (type) {
            case MoveType.Up:
                this.hookShakingTween(6, machineId);
                this.server.net_setHookSpeedX(machineId, speed);
                break;
            case MoveType.Down:
                this.hookShakingTween(4, machineId);
                this.server.net_setHookSpeedX(machineId, -speed);
                break;
            case MoveType.Left:
                this.hookShakingTween(0, machineId);
                this.server.net_setHookSpeedY(machineId, -speed);
                break;
            case MoveType.Right:
                this.hookShakingTween(2, machineId);
                this.server.net_setHookSpeedY(machineId, speed);
                break;
        }
    }


    /**下钩操作 */
    private onCatchAc(machineId: number) {
        if (this.isTween) {
            return;
        }
        this.setUI(false);
        this.isTween = true;
        this.server.net_startTween(machineId);
    }


    /**设置ui展示态 */
    private async setUICanvasShow(isDefault: boolean, machineId) {
        let machine = this.machineList[machineId];
        if (isDefault) {
            machine.defaultCanvas.visibility = mw.SlateVisibility.SelfHitTestInvisible;
            machine.useCanvas.visibility = mw.SlateVisibility.Collapsed;
        } else {
            machine.defaultCanvas.visibility = mw.SlateVisibility.Collapsed;
            machine.useCanvas.visibility = mw.SlateVisibility.SelfHitTestInvisible;
        }
    }

    /**花费钻石购买夏日币 */
    public async buySummerCoin() {

        // let str = utils.Format(GameConfig.Language.Claw_Tips_9.Value, GlobalData.CurrencyExchange.diamondToCoin);
        MessageBox.showTwoBtnMessage(GameConfig.Language.DollCoinNotEnough_Text_1.Value, async (res) => {
            if (res) {
                // let isSuccess = await this.playerMC.reduceDiamond(GlobalData.CurrencyExchange.diamondToCoin);
                // if (!isSuccess) {
                //     MessageBox.showOneBtnMessage(GameConfig.Language.Text_Fuse_UI_3.Value);
                //     return;
                // }
                //  this.playerMC.addGold(1, GlobalEnum.CoinType.SummerGold);
                // MessageBox.showOneBtnMessage(GameConfig.Language.Text_tips_1.Value);
                UIService.show(BuyCoinPanel);
            }
        });
    }


    /**客户端获得宠物UI */
    public net_getPet(petId: number) {
        if (this.isInteract || this.isGettingItem) {
            setTimeout(() => {
                this.net_getPet(petId);
            }, 500);
            return;
        }
        this.isGettingItem = true;
        EggMachineTween.instance.startTween_Pet(petId);
    }


    /**隐藏抓娃娃控制UI */
    public net_hideControlUI() {
        this.setUI(false);
    }

    /**
     * 客户端获得钻石(创建掉落)
     * @param val 掉落总值
     * @param count 掉落数量
     */
    public net_getDiamond(val: number, count: number) {
        if (this.isInteract || this.isGettingItem) {
            setTimeout(() => {
                this.net_getDiamond(val, count);
            }, 500);
            return;
        }

        //DropManager.getInstance().createDrop(this.char.worldTransform.position, GlobalEnum.CoinType.Diamond, val, count);
    }

    /**客户端获得蛋UI */
    public net_getEgg(petId: number, eggId: number) {
        // 正在操作娃娃机或正在领取奖励时则等待
        if (this.isInteract || this.isGettingItem) {
            setTimeout(() => {
                this.net_getEgg(petId, eggId);
            }, 500);
            return;
        }
        this.isGettingItem = true;
        // 获取场景中的扭蛋物体
        let eggObj: GameObject = this.getObjByEggId(eggId);
        // 开始扭蛋动画
        EggMachineTween.instance.startTween(eggObj, petId, eggId);
    }

    /**设置ui显示 */
    private setUI(isShow: boolean, machineId?: number) {
        if (isShow) {
            this.controlUI.machineId = machineId;
            this.controlUI.show();
        } else
            this.controlUI.hide();
    }

    /**退出交互 */
    private exitInteract() {
        if (!this.isInteract) {
            return;
        }
        this.isInteract = false;
        this.isTween = false;
        this.setUI(false);
    }

    private tempRota: mw.Rotation = new mw.Rotation(0, 0, 0);


    /**钩子前后左右动画 */
    private async hookShakingTween(count: number, machineId: number) {
        let hookShaking: number[];
        let machine = this.machineList[machineId];
        hookShaking = GlobalData.DollMachine.HookShaking[count];

        this.tempRota = machine.hook.worldTransform.rotation.clone();

        if (this.shakeTween?.isPlaying()) {
            return;
        }
        this.shakeTween = new mw.Tween({y: hookShaking[0]}).to({y: hookShaking[1]}, 500).onUpdate((rota) => {
            if (count > 3) {
                this.tempRota.x = rota.y;
            } else {
                this.tempRota.y = rota.y;
            }
            machine.hook.worldTransform.rotation = this.tempRota;
        }).onComplete(() => {
            count++;
            this.shakeTween = null;
            if (count % 2 == 0) {
                return;
            }
            this.hookShakingTween(count, machineId);
        }).repeat(1).yoyo(true).start();
    }

    /**
     * 根据扭蛋id获得场景中的扭蛋obj
     * @param eggId 扭蛋id
     */
    private getObjByEggId(eggId: number): GameObject {
        let eggGuid = GameConfig.EggMachine.getElement(eggId).SceneID[1];
        let eggObj = GameObject.findGameObjectById(eggGuid);
        return eggObj;
    }
}
