import { GameConfig } from "../../../config/GameConfig"
import { Globaldata } from "../../../const/Globaldata"
import { Easing } from "../../../tool/Tween"
import { UIPool } from "../../../tool/UIPool"
import { NoticeComponent } from "./NoticeComponent"
import { InitTopNoticeFunction } from "./SecondNoticeComponent"
import { TopNoticeItem } from "./TopNoticeItem"

export class TopNoticeComponent2 implements NoticeComponent<TopNoticeItem>{
    //Notice提示存在时间
    public static NoticeItemLifeTime = Globaldata.noticeTime;  
    //Notice提示最多存在数量
    private static NoticeItemMaxCount = Globaldata.noticeMaxCount; 
    //Notice提示ui垂直间隔
    private static NoticeItemIntervalSpace = Globaldata.noticeVerticalInterval;
    //Notice提示同类型最多存在数量
    private static NoticeSameItemMaxCount = 3
    //Notice提示移动步长
    private static NoticeMoveStepCount = 15
    //Notice提示 间隔时间
    private static everydiveidetime =  Globaldata.noticeReduceTime;


    private noticeItemPool: UIPool<TopNoticeItem>
    private visibleNotice: TopNoticeItem[]
    private noticeCanvasHeight: number
    private targetCanvas: mw.Canvas
    private insertItemTempLocation: mw.Vector2
    private isLeft: boolean = false;
    private isRemoveing: boolean = false;
    private needmovingNotice: TopNoticeItem[] = []

    init(targetCanvas: mw.Canvas) {
        this.visibleNotice = []
        this.targetCanvas = targetCanvas
        this.noticeCanvasHeight = this.targetCanvas.size.y
        this.insertItemTempLocation = new mw.Vector2()
        this.noticeItemPool = new UIPool<TopNoticeItem>(() => {
            let item = mw.UIService.create(TopNoticeItem)
            this.targetCanvas.addChild(item.uiObject)
            item.uiObject.size = new mw.Vector2(item.uiObject.size.x, item.uiObject.size.y)
            return item
        })
    }

    insert(initAction: InitTopNoticeFunction) {
        this.insertPendingNotice(initAction)
    }

    private isinsert = false;

    update() {
        // if (this.isinsert) return;
        // if (this.isRemoveing) { return }
        if (this.visibleNotice.length == 0) return

        for (let item of this.visibleNotice) {
            item.lifeTime += 0.03
            if (item.lifeTime >= TopNoticeComponent2.NoticeItemLifeTime) {
                if (!this.needmovingNotice.includes(item)) {
                    this.needmovingNotice.push(item)
                }
            }
        }
        this.eachLeftRightItem()

        this.noticeItemPool.eachVisibleItem(item => {
            if (item.targetHeight >= item.position.y) return
            item.setLocation(item.position.x, item.position.y - TopNoticeComponent2.NoticeMoveStepCount)
        })
    }

    // private map: Map<string, number > = new Map<string, number >();

    private insertPendingNotice(initAction: InitTopNoticeFunction) {
        this.isinsert = true;
        // 超出显示长度,旧的元素隐藏
        if (this.visibleNotice.length >= TopNoticeComponent2.NoticeItemMaxCount) {
            //限制最多显示10个
            for (let index = 0; index < this.visibleNotice.length; index++) {
                let element = this.visibleNotice[index];
                if (index <= (this.visibleNotice.length - TopNoticeComponent2.NoticeItemMaxCount)) {
                    element.lifeTime += TopNoticeComponent2.NoticeItemLifeTime;
                }
            }
        }

        // 信息越多的时候，消失速度再快一点 （ 3个 1-3 每个加 0.3  5个每个加0.5  10个每个加1）
        if (this.visibleNotice.length >= TopNoticeComponent2.NoticeSameItemMaxCount) {
            let count = this.visibleNotice.length;;
            for (let index = 0; index < count; index++) {
                let element = this.visibleNotice[index];
                element.lifeTime += count * TopNoticeComponent2.everydiveidetime;
            }
        }
        //oTrace("超出显示长度,旧的元素隐藏---------------------", this.visibleNotice.length)


        // this.map.clear();
        // //同类型时间修改
        // for (let index = 0; index < this.visibleNotice.length; index++) {
        //     let element = this.visibleNotice[index];

        //     let infor = element.getInfor();
        //     if (this.map.has(infor)) {
        //         let count = this.map.get(infor);
        //         count++
        //         this.map.set(infor,count);
        //     } else {
        //         this.map.set(infor,1);
        //     }

        //     oTrace("infor------------------->>MAP",infor, this.map.get(infor))
        // }

        // for (let index = 0; index < this.visibleNotice.length; index++) {
        //     let element = this.visibleNotice[index];
        //     let infor = element.getInfor();
        //     if (this.map.has(infor) && this.map.get(infor) > 1) {   //TopNoticeComponent2.NoticeSameItemMaxCount
        //         element.lifeTime += TopNoticeComponent2.NoticeItemLifeTime;
        //     }
        // }


        this.eachLeftRightItem()

        // 已显示元素
        for (let i = 0; i < this.visibleNotice.length; i++) {
            const element = this.visibleNotice[i]
            element.targetHeight = (TopNoticeComponent2.NoticeItemIntervalSpace) + ((i) * TopNoticeComponent2.NoticeItemIntervalSpace)
            element.setLocation(this.insertItemTempLocation.x, element.targetHeight)
            element.stopEffect()
        }

        // 插入新的元素
        let recent = this.noticeItemPool.get()
        this.visibleNotice.push(recent)
        initAction(recent)
        recent.lifeTime = 0

        this.insertItemTempLocation.x = (this.targetCanvas.size.x / 2) - (recent.uiObject.size.x / 2)
        let targetHeight = (TopNoticeComponent2.NoticeItemIntervalSpace) + ((this.visibleNotice.length - 1) * TopNoticeComponent2.NoticeItemIntervalSpace)
        this.insertItemTempLocation.y = targetHeight
        recent.targetHeight = this.insertItemTempLocation.y

        recent.uiObject.renderOpacity = 0
        recent.setLocation(this.insertItemTempLocation.x, -500)

        recent.uiObject.renderOpacity = 1
        new Tween<{ posy: number }>({ posy: -500 })
            .to({ posy: this.insertItemTempLocation.y }, 500)
            .onUpdate(arg => {
                recent.setLocation(this.insertItemTempLocation.x, arg.posy)
            })
            .start()
            .easing(Easing.Linear.None)

        this.isinsert = false;
    }


    private eachLeftRightItem() {
        if (this.needmovingNotice.length <= 0) {
            return
        }

        if (this.isRemoveing) {
            return
        }

        this.isRemoveing = true
        //计时
        new Tween<{ posX: number }>({ posX: 0 })
            .to({ posX: 1 }, 500)
            .onComplete(
                () => {
                    this.isRemoveing = false
                    //oTrace("isRemoveing  false")
                }
            ).start()

        // 已显示元素位置 
        let arr = this.visibleNotice.filter(e => !this.needmovingNotice.includes(e))
        for (let i = 0; i < arr.length; i++) {
            const element = arr[i]

            element.targetHeight = (TopNoticeComponent2.NoticeItemIntervalSpace) + ((i) * TopNoticeComponent2.NoticeItemIntervalSpace)

            new Tween<{ posy: number }>({ posy: element.uiObject.position.y })
                .to({ posy: element.targetHeight }, 500)
                .onUpdate(arg => {
                    element.setLocation(this.insertItemTempLocation.x, arg.posy)
                })
                .onComplete(
                    () => {
                    }
                )
                .easing(Easing.Linear.None)
                .start()

            //element.setLocation(this.insertItemTempLocation.x,  element.targetHeight)  
            //oTrace("visibleNotice---------------------", element.targetHeight)
        }

        // 插入动效
        while (this.needmovingNotice.length > 0) {
            let item = this.needmovingNotice.shift()
            let pos = item.uiObject.position;
            this.isLeft = !this.isLeft
            let target = new mw.Vector(0, pos.y)
            new Tween<{ posX: number }>({ posX: 0 })
                .to({ posX: this.isLeft ? 3000 : -3000 }, 250)
                .onUpdate(arg => {
                    target.x = arg.posX
                    item.uiObject.position = target
                })
                .onComplete(
                    () => {
                        this.noticeItemPool.giveBack(item)
                    }
                )
                .easing(Easing.Linear.None)
                .start()

            //oTrace("needmovingNotice=========", this.needmovingNotice.length)

            let index = this.visibleNotice.findIndex(ele =>
                ele = item
            )
            if (index != -1) {
                this.visibleNotice.splice(index, 1)
            }
        }

    }

}
