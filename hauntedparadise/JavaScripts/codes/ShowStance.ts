/*
 * @Author       : dal
 * @Date         : 2024-01-25 13:02:20
 * @LastEditors  : dal
 * @LastEditTime : 2024-01-25 13:04:49
 * @FilePath     : \RE\JavaScripts\submodule\ui\common\ShowStance.ts
 * @Description  : 
 */

@Component
export default class ShowStance extends mw.Script {

    @mw.Property({ displayName: "姿态id" })
    public stanceId: string = "";

    @mw.Property({ displayName: "姿态播放插槽", enumType: mw.StanceBlendMode })
    public part: mw.StanceBlendMode = mw.StanceBlendMode.WholeBody;

    private stance: mw.SubStance;

    protected async onStart() {
        let npc = this.gameObject as mw.Character;
        await AssetUtil.asyncDownloadAsset(this.stanceId);
        this.stance = npc.loadSubStance(this.stanceId);
        this.stance.blendMode = this.part;
        this.stance.play();
        npc.displayName = "";
    }
}

