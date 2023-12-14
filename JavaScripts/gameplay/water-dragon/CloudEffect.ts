/** 
 * @Author       : zewei.zhang
 * @Date         : 2023-12-10 13:26:42
 * @LastEditors  : zewei.zhang
 * @LastEditTime : 2023-12-14 10:22:32
 * @FilePath     : \dragon-verse\JavaScripts\gameplay\water-dragon\CloudEffect.ts
 * @Description  : 云朵交互物
 */

import { EventDefine } from "../../const/EventDefine";
import Log4Ts from "../../depend/log4ts/Log4Ts";
import { QuestModuleC } from "../../module/quest/QuestModuleC";

@Component
export default class CloudEffect extends mw.Script {
    private _clouds: GameObject[] = [];
    private _cloudsParents: GameObject[] = [];
    private _startPoint: GameObject;
    private _endPoint: GameObject;
    private _trigger: Trigger;
    private _isInCloudsRange: boolean = false;
    private _isFiring: boolean = false;
    protected onStart(): void {

        this.gameObject.getChildren().forEach(element => {
            if (element.name === "clouds") {
                this._cloudsParents.push(element);

                element.getChildren().forEach(cloud => {
                    this._clouds.push(cloud);
                });

            }
        });
        this._startPoint = this.gameObject.getChildByName("startPoint");
        this._endPoint = this.gameObject.getChildByName("endPoint");
        this._trigger = this.gameObject.getChildByName("trigger") as Trigger;
        this._trigger.onEnter.add((go) => {
            if (((go) instanceof mw.Character) && go.player.playerId === Player.localPlayer.playerId) {
                Log4Ts.log(this, "进入云朵区域");
                this._isInCloudsRange = true;
            }
        });
        this._trigger.onLeave.add((go) => {
            if (((go) instanceof mw.Character) && go.player.playerId === Player.localPlayer.playerId) {
                Log4Ts.log(this, "离开云朵区域");
                this._isInCloudsRange = false;
            }
        });

        this.useUpdate = true;

        //按下Q键销毁云朵
        // InputUtil.onKeyDown(Keys.Q, () => {


        // });

        //任务如果完成了云就都销毁
        Event.addLocalListener(EventDefine.WaterDragonTaskComplete, () => {
            this._clouds.length = 0;
            this._cloudsParents.length = 0;
            this.gameObject?.destroy();
        });
    }


    protected onUpdate(dt: number): void {
        this._clouds.forEach(element => {
            let pos = element.localTransform.position.x;
            let endPos = this._endPoint.localTransform.position.x;
            let startPos = this._startPoint.localTransform.position.x;
            let distance = endPos - pos;

            if (distance < 50) {
                element.worldTransform.scale = new Vector(distance / 50, distance / 50, distance / 50);
            }

            if (distance > Math.abs(endPos - startPos) - 50) {
                element.worldTransform.scale = new Vector((pos - startPos) / 50, (pos - startPos) / 50, (pos - startPos) / 50);
            }

            //改变位置
            if (distance < 1) {
                element.localTransform.position = new Vector(startPos, element.localTransform.position.y, element.localTransform.position.z);
            } else {
                let speed = 1;
                element.localTransform.position = new Vector(pos + speed, element.localTransform.position.y, element.localTransform.position.z);
            }
        });

        if (this._isInCloudsRange && !this._isFiring) {
            this._isFiring = true;

            let anchorGuid = this.getCanDestroyClouds();
            if (!anchorGuid) return;
            SoundService.playSound("162446");
            SoundService.playSound("201831");
            GameObject.asyncSpawn("160357", {
                replicates: false,
                transform: new Transform(Player.localPlayer.character.worldTransform.position.clone().add(new Vector(0, 0, 100)),
                    Player.localPlayer.character.worldTransform.rotation,
                    Vector.one)
            }).then((go) => {
                // (go as Effect).play();
                let target = GameObject.findGameObjectById(anchorGuid).getChildren()[0];
                new Tween(go.worldTransform.position.clone()).to(target.worldTransform.position.clone(), 1000).onUpdate((pos) => {
                    go.worldTransform.position = pos;
                }).onComplete(() => {
                    EffectService.playAtPosition("89080", target.worldTransform.position, { loopCount: 1 });
                    (go as Effect).forceStop();
                    this.destroyClouds(anchorGuid);
                    this._isFiring = false;
                }).start();
            });
        }
    }


    /** 
     * @description: 获取可以销毁的云朵锚点
     */
    public getCanDestroyClouds(): string | null {

        for (let i = 0; i < this._cloudsParents.length; i++) {
            if (this._cloudsParents[i]) {
                return this._cloudsParents[i].gameObjectId;
            }
        }
        return null;
    }

    /** 
     * @description: 销毁锚点下的云朵
     * @param anchorGuid 锚点guid
     */
    public destroyClouds(anchorGuid: string) {

        let cloudsParent = this._cloudsParents.find(element => element.gameObjectId === anchorGuid);

        if (cloudsParent) {
            cloudsParent.getChildren().forEach(element => {
                EffectService.playAtPosition("89589", element.worldTransform.position, { duration: 3, scale: new Vector(2, 2, 2) });
            });

            cloudsParent.getChildren().forEach(element => {
                new mw.Tween(element.worldTransform.scale.clone()).to(new Vector(0, 0, 0), 500).onUpdate((value) => {
                    element.worldTransform.scale = value;
                }).onComplete(() => {
                    this._clouds.splice(this._clouds.indexOf(element), 1);
                    element.destroy();
                    if (this._clouds.length === 0 && this._cloudsParents.length === 0) {
                        //全部销毁
                        this.gameObject.destroy();

                        //任务完成测试
                        // Event.dispatchToLocal(EventDefine.PlayerEnterDestination);
                    }
                }).start();
            });
            this._cloudsParents.splice(this._cloudsParents.indexOf(cloudsParent), 1);
        }
    }
}