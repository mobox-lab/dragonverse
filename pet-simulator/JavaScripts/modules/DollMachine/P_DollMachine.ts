import KeyOperationManager from "../../controller/key-operation-manager/KeyOperationManager";
import CoinUI_Generate from "../../ui-generate/Catching/CoinUI_generate";
import ControlUI_Generate from "../../ui-generate/Catching/ControlUI_generate";
import BuyCoinPanel from "../../ui/BuyCoinPanel";
import { utils } from "../../util/uitls";
import { DollMachineModuleC } from "./DollMachineModuleC";


export enum MoveType {
    Up,
    Down,
    Left,
    Right,
}

export class P_DollMachine extends ControlUI_Generate {

    public onMoveAc: Action3<MoveType, boolean, number> = new Action3();
    public catchAc: Action1<number> = new Action1();
    public machineId = 0;

    onStart() {
        // 一号娃娃机
        this.mButton_Up.onPressed.add(() => {
            this.onMoveAc.call(MoveType.Up, true, this.machineId);
        });
        this.mButton_Up.onReleased.add(() => {
            this.onMoveAc.call(MoveType.Up, false, this.machineId);
        });
        this.mButton_Down.onReleased.add(() => {
            this.onMoveAc.call(MoveType.Up, false, this.machineId);
        });
        this.mButton_Down.onPressed.add(() => {
            this.onMoveAc.call(MoveType.Down, true, this.machineId);
        });

        this.mButton_Left.onPressed.add(() => {
            this.onMoveAc.call(MoveType.Left, true, this.machineId);
        });
        this.mButton_Left.onReleased.add(() => {
            this.onMoveAc.call(MoveType.Left, false, this.machineId);
        });
        this.mButton_Right.onPressed.add(() => {
            this.onMoveAc.call(MoveType.Right, true, this.machineId);
        });
        this.mButton_Right.onReleased.add(() => {
            this.onMoveAc.call(MoveType.Right, false, this.machineId);
        });
        this.mButton_Catch.onClicked.add(() => {
            this.catchAc.call(this.machineId);
            console.log("MachineId = " + this.machineId);
        });

        this.showAction.add(() => {
            KeyOperationManager.getInstance().onKeyDown(this, Keys.Up, () => {
                this.onMoveAc.call(MoveType.Up, true, this.machineId);
            });
            KeyOperationManager.getInstance().onKeyDown(this, Keys.Down, () => {
                this.onMoveAc.call(MoveType.Down, true, this.machineId);
            });
            KeyOperationManager.getInstance().onKeyDown(this, Keys.Left, () => {
                this.onMoveAc.call(MoveType.Left, true, this.machineId);
            });
            KeyOperationManager.getInstance().onKeyDown(this, Keys.Right, () => {
                this.onMoveAc.call(MoveType.Right, true, this.machineId);
            });
            KeyOperationManager.getInstance().onKeyUp(this, Keys.Up, () => {
                this.onMoveAc.call(MoveType.Up, false, this.machineId);
            });
            KeyOperationManager.getInstance().onKeyUp(this, Keys.Down, () => {
                this.onMoveAc.call(MoveType.Down, false, this.machineId);
            });
            KeyOperationManager.getInstance().onKeyUp(this, Keys.Left, () => {
                this.onMoveAc.call(MoveType.Left, false, this.machineId);
            });
            KeyOperationManager.getInstance().onKeyUp(this, Keys.Right, () => {
                this.onMoveAc.call(MoveType.Right, false, this.machineId);
            });
            //先把开始抓娃娃的f键取消注册
            KeyOperationManager.getInstance().unregisterKey(null, Keys.F);
            KeyOperationManager.getInstance().onKeyUp(this, Keys.F, () => {
                this.catchAc.call(this.machineId);
                console.log("MachineId = " + this.machineId);
            });
        });
        this.hideAction.add(() => {
            KeyOperationManager.getInstance().unregisterKey(this, Keys.Up);
            KeyOperationManager.getInstance().unregisterKey(this, Keys.Down);
            KeyOperationManager.getInstance().unregisterKey(this, Keys.Left);
            KeyOperationManager.getInstance().unregisterKey(this, Keys.Right);
            KeyOperationManager.getInstance().unregisterKey(this, Keys.F);
            //结束了抓娃娃的f键注册上
            ModuleService.getModule(DollMachineModuleC)?.setDollMachineShortcutKey();
        });

        this.skipBtn.onClicked.add(() => {
            ModuleService.getModule(DollMachineModuleC)?.skipPlay(this.machineId);
        });

    }
}

export class P_SummerCoin extends CoinUI_Generate {


    onStart() {
        this.mAdd_Btn.onClicked.add(() => {
            UIService.show(BuyCoinPanel);
        });
    }

    public setValue(value: number) {
        this.mText_coin.text = utils.formatNumber(value);
    }

}