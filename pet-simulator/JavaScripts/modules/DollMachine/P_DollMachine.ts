import KeyOperationManager from "../../controller/key-operation-manager/KeyOperationManager";
import CoinUI_Generate from "../../ui-generate/Catching/CoinUI_generate";
import ControlUI_Generate from "../../ui-generate/Catching/ControlUI_generate";
import { utils } from "../../utils/uitls";
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
        })
        this.mButton_Up.onReleased.add(() => {
            this.onMoveAc.call(MoveType.Up, false, this.machineId);
        })
        this.mButton_Down.onReleased.add(() => {
            this.onMoveAc.call(MoveType.Up, false, this.machineId);
        })
        this.mButton_Down.onPressed.add(() => {
            this.onMoveAc.call(MoveType.Down, true, this.machineId);
        })

        this.mButton_Left.onPressed.add(() => {
            this.onMoveAc.call(MoveType.Left, true, this.machineId);
        })
        this.mButton_Left.onReleased.add(() => {
            this.onMoveAc.call(MoveType.Left, false, this.machineId);
        })
        this.mButton_Right.onPressed.add(() => {
            this.onMoveAc.call(MoveType.Right, true, this.machineId);
        })
        this.mButton_Right.onReleased.add(() => {
            this.onMoveAc.call(MoveType.Right, false, this.machineId);
        })
        this.mButton_Catch.onClicked.add(() => {
            this.catchAc.call(this.machineId);
            console.log("MachineId = " + this.machineId)
        })

        this.showAction.add(() => {
            KeyOperationManager.getInstance().onKeyDown(Keys.Up, this, () => {
                this.onMoveAc.call(MoveType.Up, true, this.machineId);
            });
            KeyOperationManager.getInstance().onKeyDown(Keys.Down, this, () => {
                this.onMoveAc.call(MoveType.Down, true, this.machineId);
            });
            KeyOperationManager.getInstance().onKeyDown(Keys.Left, this, () => {
                this.onMoveAc.call(MoveType.Left, true, this.machineId);
            });
            KeyOperationManager.getInstance().onKeyDown(Keys.Right, this, () => {
                this.onMoveAc.call(MoveType.Right, true, this.machineId);
            });
            KeyOperationManager.getInstance().onKeyUp(Keys.Up, this, () => {
                this.onMoveAc.call(MoveType.Up, false, this.machineId);
            });
            KeyOperationManager.getInstance().onKeyUp(Keys.Down, this, () => {
                this.onMoveAc.call(MoveType.Down, false, this.machineId);
            });
            KeyOperationManager.getInstance().onKeyUp(Keys.Left, this, () => {
                this.onMoveAc.call(MoveType.Left, false, this.machineId);
            });
            KeyOperationManager.getInstance().onKeyUp(Keys.Right, this, () => {
                this.onMoveAc.call(MoveType.Right, false, this.machineId);
            });
            //先把开始抓娃娃的f键取消注册
            KeyOperationManager.getInstance().unregisterKey(null, Keys.F);
            KeyOperationManager.getInstance().onKeyUp(Keys.F, this, () => {
                this.catchAc.call(this.machineId);
                console.log("MachineId = " + this.machineId);
            });
        })
        this.hideAction.add(() => {
            KeyOperationManager.getInstance().unregisterKey(this, Keys.Up);
            KeyOperationManager.getInstance().unregisterKey(this, Keys.Down);
            KeyOperationManager.getInstance().unregisterKey(this, Keys.Left);
            KeyOperationManager.getInstance().unregisterKey(this, Keys.Right);
            KeyOperationManager.getInstance().unregisterKey(this, Keys.F);
            //结束了抓娃娃的f键注册上
            ModuleService.getModule(DollMachineModuleC).setDollMachineShortcutKey();
        })


    }
}

export class P_SummerCoin extends CoinUI_Generate {


    onStart() {

    }

    public setValue(value: number) {
        this.mText_coin.text = utils.formatNumber(value);
    }

}