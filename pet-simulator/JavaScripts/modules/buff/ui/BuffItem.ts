import { GlobalEnum } from "../../../const/Enum";
import BuffItem_Generate from "../../../ui-generate/Buff/BuffItem_generate";

export class BuffItem extends BuffItem_Generate {

    // buff信息
    public data: BuffInfo;
    // buff时间到了
    public onBuffEnd: Action = new Action();
    // 每秒改一次文本内容
    private textTimer: number = 1;

    /**
     * 设置数据
     */
    public setData(data: BuffInfo) {
        this.data = data;
        if (this.data == null) return;
        this.mTime.text = this.formatTime(this.data.buffTime);
        this.mName.text = data.buffName;
        this.mIcon.imageGuid = data.buffIcon;
    }

    /**
     * 轮询
     */
    public update(dt: number) {
        if (this.data == null || this.data.buffTime <= 0) return;
        this.data.buffTime -= dt;
        this.textTimer -= dt;

        // 文本修改
        if (this.textTimer <= 0) {
            this.textTimer = 1;
            this.mTime.text = this.formatTime(this.data.buffTime);
        }

        if (this.data.buffTime <= 0) {
            this.data.buffTime = 0;
            this.onBuffEnd.call(this.data.type);
        }
    }

    /**
     * 增加时间
     */
    public addBuffTime(time: number) {
        if (this.data == null) return;
        this.data.addBuffTime(time);
        this.mTime.text = this.formatTime(this.data.buffTime);
    }

    /**
     * 设置时间
     */
    public setBuffTime(time: number) {
        if (this.data == null) return;
        this.data.setBuffTime(time);
        this.mTime.text = this.formatTime(this.data.buffTime);
    }

    /**
     * 格式化时间
     */
    private formatTime(time: number) {
        // time转成hh:mm:ss格式
        let hour = Math.floor(time / 3600);
        let min = Math.floor((time - hour * 3600) / 60);
        let sec = Math.floor(time - hour * 3600 - min * 60);
        return `${hour}:${min}:${sec}`;
    }
}

/**
 * buff信息
 */
export class BuffInfo {
    public constructor(
        public buffName: string,
        public buffIcon: string,
        public type: GlobalEnum.BuffType,
        public buffTime: number
    ) { }

    /**
     * 增加buff时间
     */
    public addBuffTime(time: number) {
        this.buffTime += time;
    }

    /**
     * 设置buff时间
     */
    public setBuffTime(time: number) {
        this.buffTime = time;
    }
}