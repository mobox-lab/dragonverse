import { GameConfig } from "../../config/GameConfig";
import { BoardHelper, BoardKeys } from "../modules/blackboard/BoardDefine";
import Blood_Generate from "../../ui-generate/ShareUI/Blood_generate";
import { CommonUtils } from "../utils/CommonUtils";
const time = [1000, 300];
const bezier = [.0, .65, 1., 1.];


export class P_Blood extends Blood_Generate {
    /**保存当前正在被多少鬼追 */
    private chaseByGhost: number = 0;
    /**保存正在追我的鬼的guid */
    private ghostGuid: string[] = [];
    /**动画时长 */
    private animationTime = 100;
    /**渲染透明度 */
    private opacity: number = 0.2;
    private timeLevel: number[] = [];
    private renderLevel: number[] = [];
    private distacne: number[] = [];

    private _curCav: Canvas;

    private tween_1 = null;;

    // private tween_2 = new mw.Tween({ X: 1 })
    //     .to({ X: 0 })
    //     .duration(time[1])
    //     .onUpdate(val => {
    //         this._curCav.renderOpacity = val.X;
    //     })
    //     .easing(CommonUtils.cubicBezier(bezier[0], bezier[1], bezier[2], bezier[3]))
    //     .start()
    //     .onComplete(() => {
    //         if (this.chaseByGhost) {
    //             this.tween_1.start();
    //         } else {
    //             mw.UIService.hideUI(this);
    //         }
    //     });


    onStart() {
        // this.tween_1.chain(this.tween_2);
        this.timeLevel = GameConfig.Global.timeLevel.array1d;
        this.renderLevel = GameConfig.Global.renderLevel.array1d;
        this.distacne = GameConfig.Global.distance.array1d;
    }

    onShow() {
        this.refreshCurCav();
    }

    refreshCurCav() {
        let curStyle = Number(BoardHelper.GetTargetKeyValue(BoardKeys.Style));
        let cavName = GameConfig.Global.flashUI.stringList[curStyle - 1];
        this._curCav = this[cavName];
        let count = this.rootCanvas.getChildrenCount();
        for (let index = 0; index < count; index++) {
            const element = this.rootCanvas.getChildAt(index);
            element.visibility = SlateVisibility.Collapsed;
        }
        if (!this._curCav) {
            this._curCav = this.m1;
        }
        this._curCav.visibility = SlateVisibility.SelfHitTestInvisible;
    }

    /**开始显隐动画 */
    public showBlood() {
        if (!this.tween_1 || !this.tween_1.isPlaying()) {
            console.log("================");
            this.initTween();
        }
        UIService.showUI(this);
    }

    /**获取等级 */
    private level() {
        let distance: number = 0;
        let level = -1;
        if (this.ghostGuid.length > 0) {
            let myPos = Player.localPlayer.character.worldTransform.position;
            myPos.z = 0;
            for (let i = 0; i < this.ghostGuid.length; i++) {
                let ghost = GameObject.findGameObjectById(this.ghostGuid[i]);
                if (!ghost) {
                    this.ghostGuid.splice(i, 1);
                    i--;
                    continue;
                }
                let ghostPos = ghost.worldTransform.position;
                ghostPos.z = 0;
                let newDistance = Vector.distance(myPos, ghostPos);
                if (i == 0) {
                    distance = newDistance;
                } else if (newDistance < distance) {
                    distance = newDistance;
                }
            }
            for (let i = 0; i < this.distacne.length; i++) {
                if (distance < this.distacne[i]) {
                    level = i;
                    break;
                }
            }
        }
        if (level == -1) {
            level = this.distacne.length;
        }
        return level;
    }


    /**初始化动画 */
    public initTween() {
        let level = this.level();
        this.animationTime = this.timeLevel[level];
        this.opacity = this.renderLevel[level];
        if (this.tween_1) {
            this.tween_1.stop();
            this.tween_1 = null;
        }
        this.tween_1 = this.getTween(this.opacity, this.animationTime, () => {
            if (this.ghostGuid.length > 0) {
                this.initTween();
            } else {
                UIService.hideUI(this);
            }
        });
        this.tween_1.start();
    }


    getTween(val: number, duration: number, noComplateCall?: Function) {
        return new mw.Tween({ X: 0 })
            .to({ X: val })
            .duration(duration)
            .onUpdate(val => {
                this._curCav.renderOpacity = val.X;
                // console.log("打印一下渲染透明度===", this._curCav.renderOpacity);
            })
            .easing(CommonUtils.cubicBezier(bezier[0], bezier[1], bezier[2], bezier[3]))
            .repeat(1)
            .yoyo(true)
            .onComplete(() => {
                //console.log("缓动结束啦=====", Date.now());
                noComplateCall && noComplateCall();
            }).onStart(() => {
                //console.log("记录一下开始缓动动画=====", val, duration, Date.now());
                this._curCav.renderOpacity = 0;

            })
    }

    /**添加正在追我鬼的guid */
    public addGhostGuid(guid: string) {
        if (!this.ghostGuid.includes(guid)) {
            this.ghostGuid.push(guid);
        }
    }

    public removeGhostGuid(guid: string) {
        if (this.ghostGuid.includes(guid)) {
            this.ghostGuid.splice(this.ghostGuid.indexOf(guid), 1);
        }
    }

    // /**
    //     * 更新玩家正在被鬼追的数量
    //     * @param count 数量，可正可负
    //     */
    // public updateChaseByGhost(count: number) {
    //     this.chaseByGhost += count;
    //     this.chaseByGhost = this.chaseByGhost < 0 ? 0 : this.chaseByGhost;
    // }
    // protected onUpdate(dt: number) {
    //     if (this.ghostGuid.length > 0) {
    //         //当前有鬼正在追我
    //         //获取离我最近的鬼的距离
    //         let distance: number = 0;
    //         let renderOpacity = 0;
    //         this.ghostGuid.forEach((guid: string) => {
    //             let myPos = Player.localPlayer.character.worldTransform.position;
    //             myPos.z = 0;
    //             let ghostPos = GameObject.findGameObjectById(guid).worldTransform.position;
    //             ghostPos.z = 0;
    //             let newDistance = Vector.distance(myPos, ghostPos);
    //             if (newDistance < distance) {
    //                 distance = newDistance;
    //             }
    //         })
    //         if (distance < 50) {
    //             renderOpacity = 1;
    //         } else if (distance < 100) {
    //             renderOpacity = 0.7;
    //         } else if (distance < 150) {
    //             renderOpacity = 0.5;
    //         } else if (distance < 200) {
    //             renderOpacity = 0.3;
    //         } else {
    //             renderOpacity = 0.1;
    //         }
    //         this._curCav.renderOpacity = renderOpacity;
    //     } else {
    //         this.canUpdate = false;
    //         UIService.hideUI(this);
    //     }
    // }


}