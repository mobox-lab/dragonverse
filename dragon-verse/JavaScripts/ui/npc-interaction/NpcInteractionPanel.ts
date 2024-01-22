/** 
 * @Author       : zewei.zhang
 * @Date         : 2023-12-11 17:50:24
 * @LastEditors  : zewei.zhang
 * @LastEditTime : 2024-01-15 16:24:09
 * @FilePath     : \dragon027\JavaScripts\ui\npc-interaction\NpcInteractionPanel.ts
 * @Description  : npc动作交互面板
 */

import { GameConfig } from "../../config/GameConfig";
import { INPCActionElement, NPCActionConfig } from "../../config/NPCAction";
import { INpcElement } from "../../config/Npc";
import { EventDefine } from "../../const/EventDefine";
import DialogifyManager from "../../depend/dialogify/DialogifyManager";
import NPCActionPanel_Generate from "../../ui-generate/dialogue/NPCActionPanel_generate";
import NPCBigItem_Generate from "../../ui-generate/dialogue/NPCBigItem_generate";


export default class NpcInteractionPanel extends NPCActionPanel_Generate {
    onStart() {
        this.closeBtn3.onClicked.add(() => {
            this.destroy();
        });
        let currentNpcId = DialogifyManager.getInstance().talkingDialogueEntityId;
        if (currentNpcId) {
            this.createActionItem(currentNpcId);
        }

        let listener = Event.addLocalListener(EventDefine.LeaveNpcInteractRange, () => {
            this.destroy();
            Event.removeListener(listener);
        });
    }



    private createActionItem(npcId: number): void {
        let config = GameConfig.Npc.findElement("characterId", npcId);
        for (let i = 0; i < config.npcAction.length; i++) {
            let actionConfig = GameConfig.NPCAction.getElement(config.npcAction[i]);
            let item = UIService.create(NPCBigItem_Generate);
            item.text_Name.text = actionConfig.identity;
            item.img_Thumbnail.imageGuid = actionConfig.icon;
            item.button.touchMethod = ButtonTouchMethod.PreciseTap;
            item.button.onClicked.add(() => {
                //播动作
                Event.dispatchToLocal(EventDefine.ShowNpcAction, actionConfig.id, npcId);
            });
            this.mContent3.addChild(item.uiObject);
        }
    }
}