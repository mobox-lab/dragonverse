enum TriggerTypeEnum { WhenGameStart = 1, KeyDown_G = 2, KeyDown_H = 3, KeyDown_J = 4, KeyDown_K = 5, KeyDown_L = 6 }

@Component
export default class MyClearNpcSetting extends mw.Script {

    @mw.Property({ displayName: "Display Name", tooltip: "The nickname that will be displayed on the npc head.", group: "Settings" })
    public NPCNickName: string = "";

    @mw.Property({ displayName: "Trigger Type", tooltip: "Choose the timing for animation playback.", enumType: TriggerTypeEnum, group: "Animation" })
    public MyEventType = TriggerTypeEnum.WhenGameStart;

    @mw.Property({ displayName: "Delay", tooltip: "Delay playback by a few seconds when triggered.", group: "Animation" })
    public DelayTime: number = 0;

    @mw.Property({ displayName: "Animation GUID", tooltip: "A string of numeric GUID from the resource library.It is the animation GUID you want to play.", group: "Animation" })
    public AnimeGUID: string = "14759"

    @mw.Property({ displayName: "Loop Time", tooltip: "The number of animation cycles.", group: "Animation" })
    public AnimeLoopTime: number = 1;

    @mw.Property({ displayName: "Animation Rate", tooltip: "Animation playback rate.", group: "Animation" })
    public AnimeRate: number = 1;




    /** When the script is instanced, this function will be called before the first frame is updated */
    protected onStart(): void {
        let MyNPC = this.gameObject as Character;

        AssetUtil.asyncDownloadAsset(this.AnimeGUID)

        if (MyNPC) {

            MyNPC.displayName = this.NPCNickName;

            if (this.MyEventType == TriggerTypeEnum.WhenGameStart) {
                let MyAnime = MyNPC.loadAnimation(this.AnimeGUID);
                MyAnime.loop = this.AnimeLoopTime;
                MyAnime.speed = this.AnimeRate;
                setTimeout(() => {
                    MyAnime.play();
                }, this.DelayTime * 1000);
            }
            else {
                let MyAnime = MyNPC.loadAnimation(this.AnimeGUID);
                MyAnime.loop = this.AnimeLoopTime;
                MyAnime.speed = this.AnimeRate;
                switch (this.MyEventType) {
                    case 2:
                        InputUtil.onKeyDown(Keys.G, () => {
                            setTimeout(() => {
                                MyAnime.play();
                            }, this.DelayTime * 1000);
                        })
                        break;
                    case 3:
                        InputUtil.onKeyDown(Keys.H, () => {
                            setTimeout(() => {
                                MyAnime.play();
                            }, this.DelayTime * 1000);
                        })
                        break;
                    case 4:
                        InputUtil.onKeyDown(Keys.J, () => {
                            setTimeout(() => {
                                MyAnime.play();
                            }, this.DelayTime * 1000);
                        })
                        break;
                    case 5:
                        InputUtil.onKeyDown(Keys.K, () => {
                            setTimeout(() => {
                                MyAnime.play();
                            }, this.DelayTime * 1000);
                        })
                        break;
                    case 6:
                        InputUtil.onKeyDown(Keys.L, () => {
                            setTimeout(() => {
                                MyAnime.play();
                            }, this.DelayTime * 1000);
                        })
                        break;

                    default:
                        break;
                }
            }
        } else {
            console.warn("[MyClearNpcSetting] Could not find a NPC, please check it!");
        }
    }

}