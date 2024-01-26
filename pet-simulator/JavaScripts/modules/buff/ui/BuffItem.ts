import { GlobalEnum } from "../../../const/Enum";
import BuffItem_Generate from "../../../ui-generate/Buff/BuffItem_generate";

export class BuffItem extends BuffItem_Generate {

    // buff信息
    public data: BuffInfo;
    // buff时间到了
    public onBuffEnd: Action = new Action();

    /**
     * 设置数据
     */
    public setData(data: BuffInfo) {
        this.data = data;
        if (this.data == null) return;
        this.mName.text = data.buffName;
        this.mIcon.imageGuid = data.buffIcon;
        this.mTime.visibility = SlateVisibility.Collapsed;
    }
 
}

/**
 * buff信息
 */
export class BuffInfo {
    public constructor(
        public buffName: string,
        public buffIcon: string,
        public id:number,
    ) { }
}