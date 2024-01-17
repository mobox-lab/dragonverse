import { EventManager } from "../../../tool/EventManager";
import Tips from "../../../tool/P_Tips";
import CreateGroup_Generate from "../../../ui-generate/editor_motion/CreateGroup_generate";
import { EFrameNodeType } from "../MontionEnum";
import { UIEvent_editMotion } from "../UIEvent_editMotion";

export class CreateGroupPanel extends CreateGroup_Generate {

    onStart() {

        this.layer = mw.UILayerSystem + 1;

        this.mCloseBtn.onClicked.add(() => {

            mw.UIService.hide(CreateGroupPanel);

        });

        this.mBtn.onClicked.add(() => {

            let groupName = this.mInput.text;

            if (StringUtil.isEmpty(groupName)) {
                Tips.show("组名不得为空");

                return;
            }

            mw.UIService.hide(CreateGroupPanel);

            EventManager.instance.call(UIEvent_editMotion.MotionAddGroupName, groupName);
        });

    }

    onShow() {
        this.mInput.text = "";
    }

}