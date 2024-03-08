import ExGuideData from "./ExGuideData";
import ExGuideModuleC from "./ExGuideModuleC";

export default class ExGuideModuleS extends ModuleS<ExGuideModuleC, ExGuideData> {
    net_completeGuide(stage: number) {
        this.currentData.guideStage = stage;
        this.currentData.save(true)
    }

}