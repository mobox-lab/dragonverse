/**
 * @Author       : zewei.zhang
 * @Date         : 2023-12-10 13:26:42
 * @LastEditors  : zewei.zhang
 * @LastEditTime : 2024-04-23 11:29:59
 * @FilePath     : \DragonVerse\dragon-verse\JavaScripts\gameplay\water-dragon\CloudEffect.ts
 * @Description  : 云朵交互物
 */

import { DragonElemental } from "../../const/DragonElemental";
import { EventDefine } from "../../const/EventDefine";
import AudioController, { SoundIDEnum } from "../../controller/audio/AudioController";
import Log4Ts from "../../depend/log4ts/Log4Ts";
import i18n from "../../language/i18n";
import { CompanionHelper } from "../../module/companion/CompanionHelper";
import { CompanionModule_C } from "../../module/companion/CompanionModule_C";
import { QuestModuleC } from "../../module/quest/QuestModuleC";
import { PromotTips } from "../../ui/common/PromotTips";
import { ProximityPrompts } from "../../ui/common/ProximityPrompts";
import MainPanel from "../../ui/main/MainPanel";
import GameServiceConfig from "../../const/GameServiceConfig";

@Component
export default class CloudEffect extends mw.Script {
    //云朵
    private _clouds: Map<GameObject, Vector> = new Map();

    //云朵锚点
    private _cloudsParents: GameObject[] = [];
    private _startPoint: GameObject;
    private _endPoint: GameObject;
    private _trigger: Trigger;

    private _isFiring: boolean = false;

    protected onStart(): void {

        this.gameObject.getChildren().forEach(element => {
            if (element.name === "clouds") {
                this._cloudsParents.push(element);

                element.getChildren().forEach(cloud => {
                    this._clouds.set(cloud, cloud.localTransform.scale.clone());
                });

            }
        });
        this._startPoint = this.gameObject.getChildByName("startPoint");
        this._endPoint = this.gameObject.getChildByName("endPoint");
        this._trigger = this.gameObject.getChildByName("trigger") as Trigger;
        this._trigger.onEnter.add((go) => {
            if (((go) instanceof mw.Character) && go.player && go.player.playerId === Player.localPlayer.playerId) {
                Log4Ts.log(this, "进入云朵区域");

                // let id = ModuleService.getModule(CompanionModule_C).getCurrentShowupBagId();
                // if (id == null) return;
                // let type = CompanionHelper.getCompanionType(id);
                // if (!type || type !== DragonElemental.Fire) {
                //     PromotTips.showTips(i18n.lan(i18n.lanKeys.Need_FireDargon));
                //     return;
                // };

                if (this.getCanDestroyClouds()) {
                    this.showFireBtn();
                }
            }
        });
        this._trigger.onLeave.add((go) => {
            if (((go) instanceof mw.Character) && go.player.playerId === Player.localPlayer.playerId) {
                Log4Ts.log(this, "离开云朵区域");
                // ProximityPrompts.close();
                mw.UIService.getUI(MainPanel)?.disableCustom();
                PromotTips.hideTips();
            }
        });

        this.useUpdate = true;

        //按下Q键销毁云朵
        // InputUtil.onKeyDown(Keys.Q, () => {

        // });

        //任务如果完成了云就都销毁
        Event.addLocalListener(EventDefine.WaterDragonTaskComplete, () => {
            this._clouds.clear();
            this._cloudsParents.length = 0;
            this.gameObject?.destroy();
        });
    }

    protected onUpdate(dt: number): void {
        this._clouds.forEach((scale, obj) => {
            let pos = obj.localTransform.position.x;
            let endPos = this._endPoint.localTransform.position.x;
            let startPos = this._startPoint.localTransform.position.x;
            let distance = endPos - pos;

            if (distance < 50) {
                obj.worldTransform.scale = scale.clone().multiply(distance / 50);
            }

            if (distance > Math.abs(endPos - startPos) - 50) {
                obj.worldTransform.scale = scale.clone().multiply((pos - startPos) / 50);
                // element.worldTransform.scale = new Vector((pos - startPos) / 50, (pos - startPos) / 50, (pos - startPos) / 50);
            }

            //改变位置
            if (distance < 1) {
                obj.localTransform.position = new Vector(startPos, obj.localTransform.position.y, obj.localTransform.position.z);
            } else {
                let speed = 1;
                obj.localTransform.position = new Vector(pos + speed, obj.localTransform.position.y, obj.localTransform.position.z);
            }
        });
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
                EffectService.playAtPosition("89589", element.worldTransform.position, {
                    duration: 3,
                    scale: new Vector(2, 2, 2),
                });
            });

            cloudsParent.getChildren().forEach(element => {
                new mw.Tween(element.worldTransform.scale.clone()).to(new Vector(0, 0, 0), 500).onUpdate((value) => {
                    element.worldTransform.scale = value;
                }).onComplete(() => {
                    this._clouds.delete(element);
                    element.destroy();
                    if (this._clouds.size === 0 && this._cloudsParents.length === 0) {
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

    private showFireBtn() {
        // ProximityPrompts.show([{
        //     keyBoard: "F",
        //     text: i18n.lan(i18n.lanKeys.TinyGameLanKey0003),
        //     enabled: true,
        //     onSelected: () => {
        //         if (this._isFiring) return;
        //         this._isFiring = true;
        //         let anchorGuid = this.getCanDestroyClouds();
        //         if (!anchorGuid) return;
        //
        //         let target = GameObject.findGameObjectById(anchorGuid).getChildren()[0];
        //         AudioController.getInstance().play(SoundIDEnum.shootFireball, Player.localPlayer.character);
        //         AudioController.getInstance().play(SoundIDEnum.hitCloud, target);
        //         GameObject.asyncSpawn("160357", {
        //             replicates: false,
        //             transform: new Transform(Player.localPlayer.character.worldTransform.position.clone().add(new Vector(0, 0, 100)),
        //                 Player.localPlayer.character.worldTransform.rotation,
        //                 Vector.one),
        //         }).then((go) => {
        //             (go as Effect).play();
        //             new Tween(go.worldTransform.position.clone()).to(target.worldTransform.position.clone(), 1000).onUpdate((pos) => {
        //                 go.worldTransform.position = pos;
        //             }).onComplete(() => {
        //                 EffectService.playAtPosition("89080", target.worldTransform.position, {loopCount: 1});
        //                 (go as Effect).forceStop();
        //                 this.destroyClouds(anchorGuid);
        //                 if (this.getCanDestroyClouds()) {
        //                     //如果还有云朵，继续显示按钮
        //                     this._isFiring = false;
        //                     this.showFireBtn();
        //                 }
        //             }).start();
        //         });
        //     },
        // }]);

        mw.UIService.getUI(MainPanel)?.enableCustom({
            name: i18n.resolves.TinyGameLanKey0003(),
            icon: GameServiceConfig.MAIN_PANEL_INTERACTION_ICON_GUID_CUSTOM,
            onTrigger: () => {
                if (this._isFiring) return;
                this._isFiring = true;
                let anchorGuid = this.getCanDestroyClouds();
                if (!anchorGuid) return;
                let target = GameObject.findGameObjectById(anchorGuid).getChildren()[0];
                AudioController.getInstance().play(SoundIDEnum.shootFireball, Player.localPlayer.character);
                AudioController.getInstance().play(SoundIDEnum.hitCloud, target);
                GameObject.asyncSpawn("160357", {
                    replicates: false,
                    transform: new Transform(Player.localPlayer.character.worldTransform.position.clone().add(new Vector(0, 0, 100)),
                        Player.localPlayer.character.worldTransform.rotation,
                        Vector.one),
                }).then((go) => {
                    (go as Effect).play();
                    new Tween(go.worldTransform.position.clone()).to(target.worldTransform.position.clone(), 1000).onUpdate((pos) => {
                        go.worldTransform.position = pos;
                    }).onComplete(() => {
                        EffectService.playAtPosition("89080", target.worldTransform.position, {loopCount: 1});
                        (go as Effect).forceStop();
                        this.destroyClouds(anchorGuid);
                        if (this.getCanDestroyClouds()) {
                            //如果还有云朵，继续显示按钮
                            this._isFiring = false;
                            this.showFireBtn();
                        }
                    }).start();
                });
            },
        });
    }
}