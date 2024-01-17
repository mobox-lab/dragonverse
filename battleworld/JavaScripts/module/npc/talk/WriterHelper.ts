@Decorator.autoExecute("init")
export class WriterHelper {

    // 组ID
    private static _groupId: number = 0;
    // 文本列表
    private static contentList: TextContent[] = [];
    // 存储多组数据
    private static groupMap: Map<number, TextContent[]> = new Map<number, TextContent[]>();
    // 对应组里边的当前执行的content
    private static groupIndexMap: Map<number, number> = new Map<number, number>();

    // 初始化
    private static init() {
        TimeUtil.onEnterFrame.add(this.onUpdate, this);
    }

    /**
     * 轮询
     */
    private static onUpdate(dt: number) {
        if (SystemUtil.isServer()) {
            return;
        }
        this.onTextUpdate(dt);
        this.onGroupUpdate(dt);
    }

    /**
     * 单个文本写入轮询
     */
    private static onTextUpdate(dt: number) {
        for (let content of this.contentList) {
            let res = content.onUpdate(dt);
            if (res || content.ui.visible == false) {
                let index = this.contentList.indexOf(content);
                // 触发回调
                if (this.contentList[index].callback != null) {
                    this.contentList[index].callback();
                }
                // 删除
                this.contentList.splice(index, 1);
            }
        }
    }

    /**
     * 组文本写入轮询
     */
    private static onGroupUpdate(dt: number) {
        for (let [groupId, group] of this.groupMap) {
            let index = this.groupIndexMap.get(groupId);
            let content = group[index];
            let res = content.onUpdate(dt);
            if (res || content.ui.visible == false) {
                // 触发回调
                if (group[index].callback != null) {
                    group[index].callback(index);
                }
                index++;
                if (index >= group.length) {
                    this.groupIndexMap.delete(groupId);
                    this.groupMap.delete(groupId);
                } else {
                    this.groupIndexMap.set(groupId, index);
                }
            }
        }
    }

    /**
     * 给文本按照间隔写内容
     * @param ui ui对象可以是文本或者是文字按钮
     * @param content 内容
     * @param interval 显示间隔,(最小为dt) intervale为-1时 直接显示内容
     * @param step 步长
     * @param callback 写入完成回调
     */
    public static write(ui: mw.TextBlock | mw.StaleButton, content: string, interval: number = 0.1, step: number = 2, callback: (...params: any[]) => void = null) {
        if (interval == -1) {
            ui.text = content;
            return;
        }
        // 判断groupMap是否有这个UI,如果有直接return掉
        for (let [groupId, group] of this.groupMap) {
            if (group.some(a => a.ui === ui)) {
                return;
            }
        }
        // 说明之前有
        let index = this.contentList.findIndex(a => a.ui === ui);
        if (index != -1) {
            this.contentList[index].setData(content, interval, callback);
            return;
        }
        // 新加入的
        let textContent = new TextContent(ui, content, interval, step, 0, callback);
        textContent.setText();
        this.contentList.push(textContent);
    }

    /**
     * 停止写入
     * @param ui ui对象可以是文本或者是文字按钮
     * @param flag 是否立即显示全部内容
     */
    public static stop(ui: mw.TextBlock | mw.StaleButton, flag: boolean = false) {
        let index = this.contentList.findIndex(a => a.ui === ui);
        if (index == -1) {
            return;
        }
        if (flag) {
            ui.text = this.contentList[index].richContent;
        }
        this.contentList.splice(index, 1);
    }

    /**
     * 写入一组数据,多个UI会按照顺序写入对应的content
     * @param uiList ui列表
     * @param contentList 内容列表
     * @param interval 间隔 -1为直接显示
     * @param step 步长
     * @param callback 写入完成回调 参数(index)
     * @returns 组Id
     */
    public static writeGroup(uiList: (mw.TextBlock | mw.StaleButton)[], contentList: string[], interval: number = 0.1, step: number = 2, callback: (...params: any[]) => void = null) {
        // -1直接显示内容并触发回调
        if (interval == -1) {
            for (let i = 0; i < uiList.length; i++) {
                uiList[i].text = contentList[i];
                callback(i);
            }
            return;
        }
        // 判断contentList是否包含某个uiList里边的UI,如果有直接return掉
        if (this.contentList.some(a => uiList.some(b => b === a.ui))) {
            return;
        }
        if (uiList.length != contentList.length) {
            return;
        }

        let groupId = this.getNewGroupId();
        let contentGroup: TextContent[] = [];

        for (let i = 0; i < uiList.length; i++) {
            let textContent = new TextContent(uiList[i], contentList[i], interval, step, 0, callback);
            textContent.setText();
            contentGroup.push(textContent);
        }

        this.groupIndexMap.set(groupId, 0);
        this.groupMap.set(groupId, contentGroup);
        return groupId;
    }

    /**
     * 停止写入一组数据
     */
    public static stopGroup(groupId: number) {
        if (this.groupMap.has(groupId)) {
            this.groupMap.delete(groupId);
        }
        if (this.groupIndexMap.has(groupId)) {
            this.groupIndexMap.delete(groupId);
        }
    }

    /**
     * 获取一个新的ID
     */
    private static getNewGroupId() {
        return this._groupId++;
    }
}

/**
 * 文字写入的对象类,包括间隔时间,写入的内容,写入的对象(对外不可见)
 */
class TextContent {
    private _time: number = 0; // 计时器
    private content: string // 去掉富文本的内容

    public constructor(public ui: mw.TextBlock | mw.StaleButton, public richContent: string, public interval: number,
        public step: number, public index: number = 0, public callback: (...params: any[]) => void = null) {
        this.content = this.removeRichTag(richContent);
    }

    /**
     * 重新设置数据 
     */
    public setData(richContent: string, interval: number, callback: (...params: any[]) => void = null) {
        this.index = 0;
        this.content = this.removeRichTag(richContent);
        this.richContent = richContent;
        this.interval = interval;
        this.callback = callback;
        this.setText();
    }

    /**
     * 轮询
     */
    public onUpdate(dt: number): boolean {
        if (StringUtil.isEmpty(this.content)) {
            return true;
        }
        this._time += dt;
        if (this._time >= this.interval) {
            this.setText();
            this._time = 0;
            if (this.index > this.content.length) {
                this.ui.text = this.richContent;
                return true;
            }
        }
        return false;
    }

    /**
     * 设置文本
     */
    public setText() {
        if (this.index >= this.content.length) {
            this.index = this.content.length;
        }
        let str = this.content.substring(0, this.index);
        this.index += this.step;
        this.ui.text = str;
    }

    /**
     * 移除掉富文本的标签
     */
    private removeRichTag(str: string) {
        const result = str.replace(/<color[^>]*>/g, '').replace(/<\/color>/g, '');
        return result;
    }
}