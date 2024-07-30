import { Danmuku } from "./Danmuku";

export namespace DanmuManager {
    let _danmukus: { name: string, message: string, type: number }[] = [];
    let _danmukuUIs: Danmuku[] = [];
    let nextTime: number = 0;

    export function init() {
        if (SystemUtil.isClient()) {
            for (let i = 0; i < 10; i++) {
                let danmaku = UIService.create(Danmuku)
                danmaku.overAct.add(() => {
                    _danmukuUIs.push(danmaku);
                });
                _danmukuUIs.push(danmaku);
            }
        }
    }

    export function pushChat(name: string, message: string, type: number) {
        _danmukus.push({ name, message, type });
    }

    export function update(dt: number) {
        if (_danmukus.length > 0 && _danmukuUIs.length > 0) {
            nextTime = TimeUtil.elapsedTime() + 1
            let danmaku = _danmukus.pop()
            let ui = _danmukuUIs.pop()
            UIService.showUI(ui);
            ui.start(danmaku.name, danmaku.message, danmaku.type)
        }
    }
}