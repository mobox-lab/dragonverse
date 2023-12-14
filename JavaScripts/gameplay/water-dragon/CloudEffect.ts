/** 
 * @Author       : zewei.zhang
 * @Date         : 2023-12-10 13:26:42
 * @LastEditors  : zewei.zhang
 * @LastEditTime : 2023-12-14 09:43:16
 * @FilePath     : \dragon-verse\JavaScripts\gameplay\water-dragon\CloudEffect.ts
 * @Description  : 云朵交互物
 */

import { EventDefine } from "../../const/EventDefine";
import Log4Ts from "../../depend/log4ts/Log4Ts";
import { QuestModuleC } from "../../module/quest/QuestModuleC";

@Component
export default class CloudEffect extends mw.Script {
    clouds: GameObject[] = [];
    cloudsParents: GameObject[] = [];
    startPoint: GameObject;
    endPoint: GameObject;

    protected onStart(): void {

        this.gameObject.getChildren().forEach(element => {
            if (element.name === "clouds") {
                this.cloudsParents.push(element);

                element.getChildren().forEach(cloud => {
                    this.clouds.push(cloud);
                });

            }
        });
        this.startPoint = this.gameObject.getChildByName("startPoint");
        this.endPoint = this.gameObject.getChildByName("endPoint");

        this.useUpdate = true;

        //按下Q键销毁云朵
        InputUtil.onKeyDown(Keys.Q, () => {
            let anchorGuid = this.getCanDestroyClouds();
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
                }).start();
                Log4Ts.log(this, "生成云朵");
            });
        });

        //任务如果完成了云就都销毁
        Event.addLocalListener(EventDefine.WaterDragonTaskComplete, () => {
            this.clouds.length = 0;
            this.cloudsParents.length = 0;
            this.gameObject?.destroy();
        });
    }


    protected onUpdate(dt: number): void {
        this.clouds.forEach(element => {
            let pos = element.localTransform.position.x;
            let endPos = this.endPoint.localTransform.position.x;
            let startPos = this.startPoint.localTransform.position.x;
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
    }

    /** 
     * @description: 获取可以销毁的云朵锚点
     */
    public getCanDestroyClouds(): string {

        for (let i = 0; i < this.cloudsParents.length; i++) {
            if (this.cloudsParents[i]) {
                return this.cloudsParents[i].gameObjectId;
            }
        }
    }

    /** 
     * @description: 销毁锚点下的云朵
     * @param anchorGuid 锚点guid
     */
    public destroyClouds(anchorGuid: string) {

        let cloudsParent = this.cloudsParents.find(element => element.gameObjectId === anchorGuid);

        if (cloudsParent) {
            cloudsParent.getChildren().forEach(element => {
                EffectService.playAtPosition("89589", element.worldTransform.position, { duration: 3, scale: new Vector(2, 2, 2) });
            });

            cloudsParent.getChildren().forEach(element => {
                new mw.Tween(element.worldTransform.scale.clone()).to(new Vector(0, 0, 0), 500).onUpdate((value) => {
                    element.worldTransform.scale = value;
                }).onComplete(() => {
                    this.clouds.splice(this.clouds.indexOf(element), 1);
                    element.destroy();
                    if (this.clouds.length === 0 && this.cloudsParents.length === 0) {
                        //全部销毁
                        this.gameObject.destroy();

                        //任务完成测试
                        // Event.dispatchToLocal(EventDefine.PlayerEnterDestination);
                    }
                }).start();
            });
            this.cloudsParents.splice(this.cloudsParents.indexOf(cloudsParent), 1);
        }
    }
}