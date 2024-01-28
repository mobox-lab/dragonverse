/**
 * 角色进入跑酷触发点 EventArgs.
 * @font JetBrainsMono Nerd Font Mono https://github.com/ryanoasis/nerd-fonts/releases/download/v3.0.2/JetBrainsMono.zip
 * @fallbackFont Sarasa Mono SC https://github.com/be5invis/Sarasa-Gothic/releases/download/v0.41.6/sarasa-gothic-ttf-0.41.6.7z
 */
export default class PlayerInteractObbyItemEventArgs {
    /**
     *
     * @param playerId 进入玩家 playerId.
     * @param itemSyncKey item syncKey.
     */
    constructor(public playerId: number, public itemSyncKey: string) {
    }
}