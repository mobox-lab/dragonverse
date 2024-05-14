
@Component
export default class RemoveTitleName extends Script {

    /**
     * The function is called when the script is instantiated, before the first frame of the game
     */
    protected onStart(): void {
        if (SystemUtil.isClient()) {
            let selfCharacter = Player.localPlayer.character;
            selfCharacter.asyncReady().then(() => {
                selfCharacter.displayName = " ";
            })
        }
    }

    /**
     * Repeating function, called every frame
     * The function will not be called unless you set "this.useUpdate = true"
     * @param dt Delay(seconds) between the current frame and previous frame
     */
    protected onUpdate(dt: number): void {

    }

    /**
     * The function is called when the script is destroyed
     */
    protected onDestroy(): void {

    }

}

