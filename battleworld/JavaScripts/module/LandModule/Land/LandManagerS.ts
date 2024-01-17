import { Globaldata } from "../../../const/Globaldata";
import { Singleton } from "../../../tool/FunctionUtil";
import LandCommonSync from "./LandCommonSync";
import ShowHiddenLand from "./ShowHiddenLand";

/**
 * 显示隐藏地块管理类
 */
@Singleton()
export class LandManagerS {
    public static instance: LandManagerS = null;


    private landCommonAsync: LandCommonSync = null;

    private showTween: mw.Tween<any> = null;
    private hideTween: mw.Tween<any> = null;

    private showHideLands: ShowHiddenLand[] = [];

    private delayTimeKey: any = null;

    private isPlaying: boolean = false;

    public async init() {

        this.landCommonAsync = await mw.Script.spawnScript(LandCommonSync, true);

        this.showTween = new mw.Tween({ value: 1 }).to({ value: 0 }, Globaldata.land_matieral_Opacity_time * 1000).onUpdate((data) => {


            if (this.landCommonAsync) {
                this.landCommonAsync.server_setOpacity(data.value);
            }

        }).onComplete(() => {

            for (let index = 0; index < this.showHideLands.length; index++) {
                const landScript = this.showHideLands[index];

                let landObj = landScript.getLand();
                if (landObj == null) {
                    continue;
                }

                landObj.setCollision(PropertyStatus.Off);
            }
            this.delayTimeKey = setTimeout(() => {
                this.delayTimeKey = null;

                if (this.hideTween) {
                    this.hideTween.start();
                }

                // 延迟设置碰撞
                this.delayTimeKey = setTimeout(() => {
                    this.delayTimeKey = null;
                    for (let index = 0; index < this.showHideLands.length; index++) {
                        const landScript = this.showHideLands[index];
                        let landObj = landScript.getLand();
                        if (landObj == null) {
                            continue;
                        }
                        landObj.setCollision(PropertyStatus.On);
                    }
                }, Globaldata.landCollisionTime);
            }, Globaldata.showToHideDelayTime);
        });

        this.hideTween = new mw.Tween({ value: 0 }).to({ value: 1 }, Globaldata.land_matieral_Opacity_time * 1000).onUpdate((data) => {

            if (this.landCommonAsync) {
                this.landCommonAsync.server_setOpacity(data.value);
            }

        }).onComplete(() => {
            this.showTween.start();
        });



    }



    /**添加显示隐藏land */
    public addShowHiddenLand(land: ShowHiddenLand) {

        if (this.showHideLands.includes(land)) {
            return;
        }
        this.showHideLands.push(land);
    }


    private clear_delayTimeKey() {
        if (this.delayTimeKey) {
            clearTimeout(this.delayTimeKey);
            this.delayTimeKey = null;
        }
    }

    /**开启显示隐藏动画 */
    public startShowHideLand() {

        if (this.isPlaying) {
            return;
        }
        this.isPlaying = true;

        this.clear_delayTimeKey();

        if (this.showTween) {
            this.showTween.start();
        }
    }

    /**关闭显示隐藏动画 */
    public stopShowHideLand() {

        if (this.isPlaying == false) {
            return;
        }
        this.isPlaying = false;
        this.showHideLands.length = 0;

        this.clear_delayTimeKey();

        if (this.showTween) {
            this.showTween.stop();
        }
        if (this.hideTween) {
            this.hideTween.stop();
        }

        if (this.landCommonAsync) {
            this.landCommonAsync.recycle();
        }
    }

}