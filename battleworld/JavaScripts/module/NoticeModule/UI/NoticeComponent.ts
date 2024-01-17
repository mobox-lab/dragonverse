export interface NoticeComponent<T> {
    init(targetCanvas: mw.Canvas)
    insert(initAction: (item: T) => void)
    update()
}