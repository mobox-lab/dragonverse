import { PlayerManagerExtesion, } from '../../Modified027Editor/ModifiedPlayer';
import { GlobalData } from "../../const/GlobalData";
import { RankModuleC } from "./RankModuleC";

@Component
export default class DanceNpcBehaviour extends mw.Script {

    // 当前脚本绑定的Npc对应的玩家发生变动时执行
    @mw.Property({ replicated: true, onChanged: "onRankPlayerChange" })
    public userId: string = null;

    /**跳舞动作 */
    private anim: mw.Animation = null;


    /**当该npc对应的玩家发生改变时执行 (客户端) */
    private async onRankPlayerChange() {

        return;

        let npc = this.gameObject as mw.Character;
        mw.AccountService.getUserData(this.userId, 0, (data) => {
            mw.AccountService.setUserData(this.gameObject as mw.Character, data, async (state) => {
                // 播放跳舞动画
                let danceGuid = GlobalData.Rank.npcDanceMap.get(this.gameObject.gameObjectId);
                if (this.anim == null) {
                    await AssetUtil.asyncDownloadAsset(GlobalData.Rank.npcDanceMap.get(this.gameObject.gameObjectId));
                    this.anim = PlayerManagerExtesion.loadAnimationExtesion(npc, danceGuid);
                    this.anim.loop = 0;
                }
                PlayerManagerExtesion.rpcPlayAnimation(npc, danceGuid);
            });
        });

    }

    /**播放动画 */
    private playAnimation() {
        // this.anim.play();
        let npc = this.gameObject as mw.Character;
        // 下面代码存在的原因是因为上面这一行的play可能不执行，反复检查是否在跳舞，不在跳舞则调用play方法，
        let loopCount = 0
        TimeUtil.setInterval(() => {
            loopCount++;
            // 检查 如果没在跳舞，则调用跳舞方法
            if (!npc.currentAnimation?.isPlaying) {
                this.anim.play();
            }
        }, 0.05, () => {
            return loopCount > 20;
        })

        setTimeout(() => {
            this.anim.play();
        }, 200);
    }

}