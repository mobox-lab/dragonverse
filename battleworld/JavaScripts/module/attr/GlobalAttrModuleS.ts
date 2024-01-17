import { GlobalAttrModuleC } from "./GlobalAttrModuleC";







import { GlobalAttrHelpler } from "./GlobalAttrHelpler";
import { GlobalAttributeType } from "../../const/Enum";
import GlobalAttribute from "./GlobalAttribute";

export class GlobalAttrModuleS extends ModuleS<GlobalAttrModuleC, null> {

    protected onStart() {
        this.createGlobalScript();
    }

    /**
     * 创建全局脚本
     */
    private async createGlobalScript() {
        let attrSync = await mw.Script.spawnScript(GlobalAttribute);
        GlobalAttrHelpler.setAttr(attrSync);
        await TimeUtil.delaySecond(0.2);
        GlobalAttrHelpler.changeAttr(GlobalAttributeType.Init, 1);
    }
}