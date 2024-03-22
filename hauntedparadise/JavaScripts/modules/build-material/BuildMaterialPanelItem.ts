import IScrollViewItem from "../../depend/scroll-view/IScrollViewItem";
import {Yoact} from "../../depend/yoact/Yoact";
import bindYoact = Yoact.bindYoact;
import {GameConfig} from "../../config/GameConfig";
import BuildingIcon_Generate from "../../ui-generate/ShareUI/Building/BuildingIcon_generate";
import {BuildMaterialUnique} from "./BuildMaterialModule";
import GToolkit from "../../utils/GToolkit";

export default class BuildMaterialPanelItem extends BuildingIcon_Generate implements IScrollViewItem<BuildMaterialUnique> {
//#region IScrollViewItem
    bindData(data: BuildMaterialUnique): void {
        this.mImgIcon.imageGuid = GameConfig.Item.getElement(data.id).icon;
    }

    get clickObj(): mw.StaleButton {
        return this.mItemBtn;
    }

    onSetSelect(bool: boolean): void {
        GToolkit.trySetVisibility(this.mImgSelect, bool);
    }

//#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
}