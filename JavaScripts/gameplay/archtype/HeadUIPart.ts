import GToolkit from "../../util/GToolkit";
import { HeadUIScript } from "./HeadUIScript";

interface HeadUIInfo {

    name: string;
}







export class HeadUIPart<T extends HeadUIScript = HeadUIScript> implements HeadUIScript {


    private _headUIObject: mw.UIWidget;


    protected uiLogicScript: T;

    constructor(private parent: mw.GameObject | mw.Character, assetId: string) {

        const headUIObj = this._headUIObject = mw.GameObject.spawn("UIWidget");
        headUIObj.setUIbyID(assetId);
        headUIObj.widgetSpace = mw.WidgetSpaceMode.OverheadUI;
        headUIObj.interaction = true;
        headUIObj.occlusionEnable = false;

        if (parent instanceof mw.Character) {

            parent.attachToSlot(headUIObj, mw.HumanoidSlotType.Head);

        } else {
            headUIObj.parent = parent;
        }

        headUIObj.getScripts().forEach((value) => {

            if (GToolkit.is<HeadUIScript>(value, 'setNickName')) {

                this.uiLogicScript = value as any;
            }
        })
    }

    setNickName(nickName: string): void {

        this.uiLogicScript.setNickName(nickName);
    }






}