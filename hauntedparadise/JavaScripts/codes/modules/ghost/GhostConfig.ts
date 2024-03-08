/*
 * @Author       : enyu.liu enyu.liu@appshahe.com
 * @Date         : 2023-10-12 16:05:05
 * @LastEditors  : enyu.liu enyu.liu@appshahe.com
 * @LastEditTime : 2023-10-17 11:09:05
 * @FilePath     : \catcompanion\JavaScripts\modules\ghost\GhostConfig.ts
 * @Description  : 
 */
/*
 * @Author       : enyu.liu enyu.liu@appshahe.com
 * @Date         : 2023-10-10 14:50:14
 * @LastEditors  : enyu.liu enyu.liu@appshahe.com
 * @LastEditTime : 2023-10-10 17:38:35
 * @FilePath     : \catcompanion\JavaScripts\modules\ghost\GhostConfig.ts
 * @Description  : 
 */

import { CommonUtils } from "../../utils/CommonUtils";
import { GhostSettings, SoundParam } from "./GhostDefine";



@Component
export default class GhostConfig extends mw.Script {

    @mw.Property()
    casualWalkStance: string = "122549";

    @mw.Property()
    casuleWalkAniRate: number = 1;

    @mw.Property()
    chaseWalkStance: string = "30273";

    @mw.Property()
    chaseWalkAniRate: number = 1;

    @mw.Property()
    casualSound: SoundParam = new SoundParam();

    @mw.Property()
    chaseSound: SoundParam = new SoundParam();

    @mw.Property()
    spawnGhostInsIds: number[] = [1]//Array<mw.Vector> = [Vector.zero];

    @mw.Property()
    openDebug: boolean = true;

    @mw.Property()
    catchAnim: string = "20269";

    @mw.Property()
    shiningVisibleTime: number = 1;

    @mw.Property()
    shiningInvisibleTime: number = 2;

    @mw.Property()
    chaseSoundIds: number[] = [2009];

    @mw.Property()
    soundKeepTime: Vector2 = new Vector2(5, 10);

    onStart() {
        GhostSettings.casualWalkStance = this.casualWalkStance;
        GhostSettings.casuleWalkAniRate = this.casuleWalkAniRate;
        GhostSettings.chaseWalkStance = this.chaseWalkStance;
        GhostSettings.chaseWalkAniRate = this.chaseWalkAniRate
        GhostSettings.casualSound = this.casualSound;
        GhostSettings.chaseSound = this.chaseSound;
        GhostSettings.spawnGhostInsIds = this.spawnGhostInsIds;
        GhostSettings.openDebug = this.openDebug;
        GhostSettings.catchAnim = this.catchAnim;
        GhostSettings.shiningVisibleTime = this.shiningVisibleTime;
        GhostSettings.shiningInvisibleTime = this.shiningInvisibleTime;
        GhostSettings.chaseSoundIds = this.chaseSoundIds;
        GhostSettings.soundKeepTime = this.soundKeepTime;
        CommonUtils.checkAssets(this.casualWalkStance, this.chaseWalkStance, this.catchAnim);
    }
}