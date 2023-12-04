import { CompanionModule_C } from "../../../module/companion/CompanionModule_C";
import { SyncRootEntity } from "../base/SyncRootEntity";
import CompanionEntity from "./CompanionEntity";
import { CompanionState } from "./CompanionState";

@mw.Component
export default class CompanionRoot extends SyncRootEntity<CompanionState> {





    protected async onInitialize() {
        await super.onInitialize();
        if (mw.SystemUtil.isClient()) {

            mwext.ModuleService.getModule(CompanionModule_C).getController().registerCompanion(this);
            let script = this.displayObject.getScriptByName("CompanionEntity") as CompanionEntity;
            script.follower = this.gameObject as mw.Character;
            script.initializeComplete();
        }
    }
}