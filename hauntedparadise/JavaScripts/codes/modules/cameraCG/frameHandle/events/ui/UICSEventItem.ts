import { CSEventItemUI_Generate } from "../../../ui/generate/frameInfo/CSEventItemUI_generate";
import { GridSelectContainerItem } from "../../../utils/UIPool";


export class UICSEventItem extends CSEventItemUI_Generate implements GridSelectContainerItem {

    onSelect: mw.Action;
    isSelected: boolean;

    protected onStart(): void {
        this.layer = UILayerTop;
        this.onSelect = new mw.Action();
        this.btn_select.onClicked.add(() => {
            this.onSelect.call();
        });
    }

    setSelected(isTrue: boolean) {
    }

    setData(name: string) {
        this.txt_name.text = name;
    }

}