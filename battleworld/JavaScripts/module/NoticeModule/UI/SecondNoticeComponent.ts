import { UIPool } from "../../../tool/UIPool"
import { updater } from "../../../tool/Updater"
import { NoticeComponent } from "./NoticeComponent"
import { SecondNoticeItem } from "./SecondNoticeItem"
import { TopNoticeItem } from "./TopNoticeItem"

export type InitTopNoticeFunction = (item: TopNoticeItem) => void
export type InitSecondNoticeFunction = (item: SecondNoticeItem) => void

export class SecondNoticeComponent implements NoticeComponent<SecondNoticeItem>{
    private static NoticeItemLifeTime = 2
    private static NoticeItemMaxCount = 4
    private static NoticeMoveStepCount = 11
    private static NoticeItemIntervalSpace = 55

    private noticeItemPool: UIPool<SecondNoticeItem>
    private visibleNotice: SecondNoticeItem[]
    private pendingQueue: InitSecondNoticeFunction[]
    private noticeCanvasHeight: number
    private targetCanvas: mw.Canvas
    private insertItemTempLocation: mw.Vector2

    init(targetCanvas: mw.Canvas) {
        this.visibleNotice = []
        this.pendingQueue = []
        this.targetCanvas = targetCanvas
        this.noticeCanvasHeight = this.targetCanvas.size.y
        this.insertItemTempLocation = new mw.Vector2()
        this.noticeItemPool = new UIPool(() => {
            let item = mw.UIService.create(SecondNoticeItem)
            this.targetCanvas.addChild(item.uiObject)
            item.uiObject.size = new mw.Vector2(250, 45)
            return item
        })
    }

    insert(initAction: InitSecondNoticeFunction) {
        this.pendingQueue.push(initAction)
    }

    private insertPendingNotice(initAction: InitSecondNoticeFunction) {
        // 超出显示长度,旧的元素隐藏
        if (this.visibleNotice.length >= SecondNoticeComponent.NoticeItemMaxCount) { this.fadeoutNoticeElement() }
        // 已显示元素上推
        for (let i = 0; i < this.visibleNotice.length; i++) {
            const element = this.visibleNotice[i]
            element.targetHeight =
                (this.noticeCanvasHeight - SecondNoticeComponent.NoticeItemIntervalSpace) -
                ((this.visibleNotice.length - i) * SecondNoticeComponent.NoticeItemIntervalSpace)
        }
        // 插入新的元素
        let recent = this.noticeItemPool.get()
        this.visibleNotice.push(recent)
        initAction(recent)
        recent.startEffect()
        recent.lifeTime = 0
        this.insertItemTempLocation.x = (this.targetCanvas.size.x / 2) - (recent.uiObject.size.x / 2)
        this.insertItemTempLocation.y = this.targetCanvas.size.y - SecondNoticeComponent.NoticeItemIntervalSpace
        recent.setLocation(this.insertItemTempLocation.x, this.insertItemTempLocation.y)
        recent.targetHeight = this.insertItemTempLocation.y
        recent.uiObject.renderOpacity = 0;
        // 插入动效
        new Tween<{ alpha: number }>({ alpha: 0 })
            .to({ alpha: 1 }, 250)
            .onUpdate(arg => {
                recent.uiObject.renderOpacity = arg.alpha;
            })
            .start()
    }

    update() {
        if (this.visibleNotice.length == 0) return
        for (let item of this.visibleNotice) { item.lifeTime += 0.03 }
        let first = this.visibleNotice[0]
        if (first.lifeTime >= SecondNoticeComponent.NoticeItemLifeTime) { this.fadeoutNoticeElement() }

        this.noticeItemPool.eachVisibleItem(item => {
            if (item.targetHeight >= item.position.y) return
            item.setLocation(item.position.x, item.position.y - SecondNoticeComponent.NoticeMoveStepCount)
        })
    }

    private fadeoutNoticeElement() {
        let item = this.visibleNotice.shift()
        new Tween<{ alpha: number }>({ alpha: 1 })
            .to({ alpha: 0 }, 250)
            .onUpdate(arg => {
                item.uiObject.renderOpacity = arg.alpha
            })
            .onComplete(() => {
                this.noticeItemPool.giveBack(item)
            })
            .start()
    }

    @updater.updateByFrameInterval(8, 'update')
    private checkPendingNotice() {
        if (this.pendingQueue.length < 1) return
        this.insertPendingNotice(this.pendingQueue.shift())
    }
}
