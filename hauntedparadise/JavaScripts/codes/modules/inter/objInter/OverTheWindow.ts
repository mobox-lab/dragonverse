/*
 * @Author       : hangyuan.zhang hangyuan.zhang@appshahe.com
 * @Date         : 2023-12-25 17:58:17
 * @LastEditors  : hangyuan.zhang hangyuan.zhang@appshahe.com
 * @LastEditTime : 2024-01-05 10:26:25
 * @FilePath     : \hauntedparadise\JavaScripts\codes\modules\inter\objInter\OverTheWindow.ts
 * @Description  : 
 */
@Component
export default class OverTheWindow extends Script {

    @Property({ displayName: "翻越距离" })
    public width: number = 50;

    @Property({ displayName: "翻越动作" })
    public animationId: string = "121578";

    @Property({ displayName: "翻越时间" })
    public time: number = 2;
    protected onStart(): void {
        this.initAsset();
        Event.addLocalListener("OverTheWindow", (guid) => {
            if (guid != this.gameObject.gameObjectId) return;
            Camera.currentCamera.lookAt(this.gameObject.worldTransform.position)
            this.overTheWindow(Player.localPlayer.playerId);

            new Tween(Player.localPlayer.character.worldTransform.position).to(Player.localPlayer.character.worldTransform.position.add(Player.localPlayer.character.worldTransform.getForwardVector().multiply(this.width)), this.time * 1000)
                .onUpdate((location) => {
                    Player.localPlayer.character.worldTransform.position = location;
                    console.log(location)
                }).start()
            // setTimeout(() => {
            //     Player.localPlayer.character.worldTransform.position = Player.localPlayer.character.worldTransform.position.add(Player.localPlayer.character.worldTransform.getForwardVector().multiply(this.width))
            // }, this.time * 1000);
        })

    }

    @RemoteFunction(Server)
    private async overTheWindow(playerId: number) {
        this.initAsset();
        let player = (await Player.asyncGetPlayer(playerId))

        let anim = player.character.loadAnimation(this.animationId);
        anim.speed = anim.length / this.time;
        anim.play();
    }

    async initAsset() {
        if (!AssetUtil.assetLoaded(this.animationId)) {
            await AssetUtil.asyncDownloadAsset(this.animationId);
        }
    }


}