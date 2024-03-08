import { MainUI } from "../../ui/MainUI"
import { WaitLoop } from "../../utils/AsyncTool"
import Danmaku from "./DanmakuUI"

export class DanmakuItem {
    public name: string
    public text: string
    public type: number
    public count: number = 1;
}

export class DanmakuModuleC extends ModuleC<DanmakuModuleS, null> {
    private _danmakus: DanmakuItem[] = []
    private _danmakuUIs: Danmaku[] = []
    public nextTime: number = 0

    protected onStart(): void {
        Event.addServerListener("Bubble_ClientMsg", (guid: string, text: string, skinId: number) => {
            let char = GameObject.findGameObjectById(guid) as Character;
            if (!char) {
                return;
            }
            this.net_ChatEmoji(char.displayName, text, 1);
        });
        Event.addServerListener("BubblePic_ClientMsg", (guid: string, img: string, skinId: number) => {
            let char = GameObject.findGameObjectById(guid) as Character;
            if (!char) {
                return;
            }
            this.net_ChatEmoji(char.displayName, img, 2);
        })
    }

    protected async onEnterScene(sceneType: number) {
        for (let i = 0; i < 5; i++) {
            let danmaku = UIService.create(Danmaku)
            danmaku.overAct.add(() => {
                this._danmakuUIs.push(danmaku)
            })
            if (!UIService.getUI(MainUI).rootCanvas) { await WaitLoop.loop(() => { return UIService.getUI(MainUI).rootCanvas; }) }
            UIService.getUI(MainUI).rootCanvas.addChild(danmaku.uiObject)
            danmaku.rootCanvas.visibility = SlateVisibility.Collapsed
            this._danmakuUIs.push(danmaku)
        }
    }

    public chatemoji(text: string, type: number) {
        this.server.net_ChatEmoji(AccountService.getNickName(), text, type)
    }

    public net_ChatEmoji(name: string, text: string, type: number) {
        if (!UIService.getUI(MainUI).visible) {
            return;
        }
        if (type == 2) {
            let item = this._danmakus.find(e => {
                return e.name == name && e.text == text;
            })
            if (item) {
                item.count++;
                return;
            }
        }
        this._danmakus.push({ name: name, text: text, type: type, count: 1 })
    }

    protected onUpdate(dt: number): void {
        if (TimeUtil.elapsedTime() < this.nextTime) {
            return;
        }
        if (this._danmakus.length > 0 && this._danmakuUIs.length > 0) {
            this.nextTime = TimeUtil.elapsedTime() + 1
            let danmaku = this._danmakus.pop()
            let ui = this._danmakuUIs.pop()
            ui.start(danmaku.name, danmaku.text, danmaku.type, danmaku.count)
        }
    }

}

export class DanmakuModuleS extends ModuleS<DanmakuModuleC, null> {
    @Decorator.noReply()
    public net_ChatEmoji(name: string, text: string, type: number) {
        for (const player of Player.getAllPlayers()) {
            this.getClient(player).net_ChatEmoji(name, text, type)
        }
    }
}
