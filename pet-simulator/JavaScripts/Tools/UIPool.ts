
export class UIPool<T extends mw.UIScript>{
    private readonly pool: T[]
    private creator: () => T
    private resetItemFunction: (item: T) => void
    private poolGetFunction: (item: T) => void

    constructor(creator?: () => T) {
        this.pool = []
        this.creator = creator
    }

    get count(): number {
        return this.pool ? this.pool.length : 0
    }

    get firstActiveItem(): T | undefined {
        for (let t of this.pool) {
            if (t.uiObject.visibility == mw.SlateVisibility.Hidden) continue
            return t
        }
    }

    byIndex(index: number): T | undefined {
        return this.pool[index]
    }

    setCreator(func: () => T) {
        this.creator = func
    }

    // 重新激活处理
    setPoolGetFunction(func: (item: T) => void) {
        this.poolGetFunction = func
    }

    setResetItemFunction(resetItemFunction: (item: T) => void) {
        this.resetItemFunction = resetItemFunction
    }

    get(): T {
        for (let item of this.pool) {
            if (item.uiObject.visibility == mw.SlateVisibility.Hidden || item.uiObject.visibility == mw.SlateVisibility.Collapsed) {
                item.uiObject.visibility = mw.SlateVisibility.SelfHitTestInvisible
                if (this.poolGetFunction) this.poolGetFunction(item)
                return item
            }
        }

        let result = this.creator()
        this.pool.push(result)
        return result
    }

    giveBack(item: T) {
        item.uiObject.visibility = (mw.SlateVisibility.Collapsed)
        if (this.resetItemFunction) this.resetItemFunction(item)
    }

    resetAll() {
        for (let item of this.pool) {
            this.giveBack(item)
        }
    }

    eachVisibleItem(action: (item: T) => void) {
        for (let t of this.pool) {
            if (t.uiObject.visibility == mw.SlateVisibility.Hidden) continue
            action(t)
        }
    }

    eachVisibleItemWithoutFocus(action: (item: T) => void, focus: T) {
        for (let t of this.pool) {
            if (t.uiObject.visibility == mw.SlateVisibility.Hidden) continue
            if (t == focus) continue
            action(t)
        }
    }
}