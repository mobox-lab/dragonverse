import { UIPool } from "../../../tool/UIPool"
import { updater } from "../../../tool/Updater"
import { NoticeComponent } from "./NoticeComponent"
import { InitTopNoticeFunction } from "./SecondNoticeComponent"
import { TopNoticeItem } from "./TopNoticeItem"


export class TopNoticeComponent implements NoticeComponent<TopNoticeItem>{
    private static NoticeItemLifeTime = 2
    private static NoticeItemMaxCount = 3
    private static NoticeMoveStepCount = 15
    private static NoticeItemIntervalSpace = 75

    private noticeItemPool: UIPool<TopNoticeItem>
    private visibleNotice: TopNoticeItem[]
    private noticeCanvasHeight: number
    private targetCanvas: mw.Canvas
    private pendingQueue: InitTopNoticeFunction[]
    private insertItemTempLocation: mw.Vector2

    init(targetCanvas: mw.Canvas) {
        this.visibleNotice = []
        this.pendingQueue = []
        this.targetCanvas = targetCanvas
        this.noticeCanvasHeight = this.targetCanvas.size.y
        this.insertItemTempLocation = new mw.Vector2()
        this.noticeItemPool = new UIPool<TopNoticeItem>(() => {
            let item = mw.UIService.create(TopNoticeItem)
            this.targetCanvas.addChild(item.uiObject)
            item.uiObject.size = new mw.Vector2(700, 60)
            return item
        })
    }

    insert(initAction: InitTopNoticeFunction) {
        this.pendingQueue.push(initAction)
    }

    update() {
        if (this.visibleNotice.length == 0) return
        for (let item of this.visibleNotice) { item.lifeTime += 0.03 }
        let first = this.visibleNotice[0]
        if (first.lifeTime >= TopNoticeComponent.NoticeItemLifeTime) { this.fadeoutNoticeElement() }

        this.noticeItemPool.eachVisibleItem(item => {
            if (item.targetHeight >= item.position.y) return
            item.setLocation(item.position.x, item.position.y - TopNoticeComponent.NoticeMoveStepCount)
        })
    }

    private insertPendingNotice(initAction: InitTopNoticeFunction) {
        // 超出显示长度,旧的元素隐藏
        if (this.visibleNotice.length >= TopNoticeComponent.NoticeItemMaxCount) { this.fadeoutNoticeElement() }
        // 已显示元素上推
        for (let i = 0; i < this.visibleNotice.length; i++) {
            const element = this.visibleNotice[i]
            element.targetHeight =
                (this.noticeCanvasHeight - TopNoticeComponent.NoticeItemIntervalSpace) -
                ((this.visibleNotice.length - i) * TopNoticeComponent.NoticeItemIntervalSpace)
            element.stopEffect()
        }
        // 插入新的元素
        let recent = this.noticeItemPool.get()
        this.visibleNotice.push(recent)
        initAction(recent)
        recent.lifeTime = 0
        this.insertItemTempLocation.x = (this.targetCanvas.size.x / 2) - (recent.uiObject.size.x / 2)
        this.insertItemTempLocation.y = this.targetCanvas.size.y - TopNoticeComponent.NoticeItemIntervalSpace
        recent.setLocation(this.insertItemTempLocation.x, this.insertItemTempLocation.y)
        recent.targetHeight = this.insertItemTempLocation.y
        recent.uiObject.renderOpacity = 0;
        recent.playEffect()
        // 插入动效
        new Tween<{ alpha: number }>({ alpha: 0 })
            .to({ alpha: 1 }, 250)
            .onUpdate(arg => {
                recent.uiObject.renderOpacity = arg.alpha;
            })
            .start()
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

    @updater.updateByFrameInterval(15, 'update')
    private checkPendingNotice() {
        if (this.pendingQueue.length < 1) return
        this.insertPendingNotice(this.pendingQueue.shift())
    }
}