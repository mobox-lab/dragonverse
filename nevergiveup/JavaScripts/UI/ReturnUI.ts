import { TowerModuleC } from "../Modules/TowerModule/TowerModuleC";
import returnUI_Generate from "../ui-generate/Return/returnUI_generate";

/**
* 局内按 T 传送回去之前的确认弹窗
*/
export default class ReturnUI extends returnUI_Generate {
   /** 
    * 构造UI文件成功后，在合适的时机最先初始化一次 
    */
    protected onStart() {
        this.btn_Confirm_Use.onClicked.add(() => {
            ModuleService.getModule(TowerModuleC).earlySettle();
            this.hide();
        });
        this.btn_UnConfirm_Use.onClicked.add(() => {
            this.hide();
        });
    }
}
