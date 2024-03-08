import { ConfigBase } from "../../../../config/ConfigBase";
import { BoardHelper } from "../../blackboard/BoardDefine";

@Component
export default class LanVisCtl extends Script {

    @Property({ displayName: "在什么语言环境下显示", tooltip: "0是英文，1是中文" })
    public languageIndex: number = 1;

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        Event.addLocalListener(BoardHelper.BoardLoadingEvt, () => {
            if (ConfigBase["languageIndex"] != this.languageIndex) {
                this.gameObject.setVisibility(PropertyStatus.Off, true);
                this.gameObject["forbidVisCtl"] = true;
            }
        })
    }
}