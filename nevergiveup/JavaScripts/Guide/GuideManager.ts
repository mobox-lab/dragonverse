import { GuideDataHelper, GuideModuleC } from "module_guide";
import { StageActions } from "../Actions";
import { GameManager } from "../GameManager";
import { MapManager } from "../MapScript";
import { EmTaskWay } from "../Modules/taskModule/TaskModuleC";
import UI_TaskMain from "../Modules/taskModule/ui/UI_TaskMain";
import { EStageState } from "../StageEnums";
import TowerInfoUI from "../UI/Tower/TowerInfoUI";
import TowerShopUI from "../UI/Tower/TowerShopUI";
import { GuideDialog } from "../UI/UIDialog";
import { GameConfig } from "../config/GameConfig";
import { StageTriggerInst } from "../stage/StageTrigger";
import { MGSTool } from '../tool/MGSTool';
import { TalentTreeContainer } from "../TalentTree/ui/TalentTreeContainer";

export enum GuideState {
    None,
    CreateTowerDialog,
    CreateTower,
    CreateTowerComplete,
    CreateTower2Dialog,
    CreateTower2,
    CreateTower2Complete,
    UpgradeTowerDialog,
    UpgradeTower,
    UpgradeTowerSelect,
    UpgradeTowerSelected,
    UpgradeTowerComplete,
    Complete
}

export namespace GuideManager {
    export let guideState: GuideState = GuideState.None;
    let guideDialogs = null
    let effect: Effect;
    let towerInfoUI: TowerInfoUI;
    let toBeTriggeredGuides: number[] = [];
    let guideTaskPos: Vector;
    let cbStageChanged = (state: EStageState, waitTime: number, wave: number) => {
        if (state == EStageState.Wait) {
            let stage = GameManager.getStageClient();
            if (stage && stage.stageWorldIndex == 99) {
                if (wave == 1) {
                    MGSTool.guide(4);
                }
                else if (wave == 2) {
                    MGSTool.guide(6);
                }
                else if (wave == 3) {
                    MGSTool.guide(7);
                }
            }

            if (stage && stage.stageWorldIndex == 0) {
                if (wave == 2) {
                    MGSTool.guide(13);
                }
            }
        }
        else if (state == EStageState.Settle) {
            let stage = GameManager.getStageClient();
            if (stage && stage.stageWorldIndex == 99) {
                MGSTool.guide(8);
            }
            if (stage && stage.stageWorldIndex == 0) {
                MGSTool.guide(14);
                StageActions.onStageStateChanged.remove(cbStageChanged);
            }
        }
    }

    function hasCompleteClient(id: number) {
        if (id == 0) return true;
        return DataCenterC.getData(GuideDataHelper)?.complateGuideList?.includes(id);
    }

    export function hasCompleteServer(player: Player, id: number) {
        return DataCenterS.getData(player, GuideDataHelper).complateGuideList.includes(id);
    }

    export function initGuideText() {
        guideDialogs = [
            [
                { title: GameConfig.Language.getElement("Text_Pilot").Value, content: GameConfig.Language.getElement("Text_Guide1").Value },
                { title: GameConfig.Language.getElement("Text_Pilot").Value, content: GameConfig.Language.getElement("Text_Guide2").Value }
            ],
            [
                { title: GameConfig.Language.getElement("Text_Pilot").Value, content: GameConfig.Language.getElement("Text_Guide3").Value },
                { title: GameConfig.Language.getElement("Text_Pilot").Value, content: GameConfig.Language.getElement("Text_Guide4").Value }
            ],
            [
                { title: GameConfig.Language.getElement("Text_Pilot").Value, content: GameConfig.Language.getElement("Text_Guide5").Value }
            ],
            [
                { title: GameConfig.Language.getElement("Text_Pilot").Value, content: GameConfig.Language.getElement("Text_Guide6").Value }
            ],
            [
                { title: GameConfig.Language.getElement("Text_Pilot").Value, content: GameConfig.Language.getElement("Text_Guide7").Value }
            ],
            [
                { title: GameConfig.Language.getElement("Text_Pilot").Value, content: GameConfig.Language.getElement("Text_Guide8").Value }
            ],
            [
                { title: GameConfig.Language.getElement("Text_Pilot").Value, content: GameConfig.Language.getElement("Text_Guide9").Value }
            ],
            // guide2
            [
                { title: GameConfig.Language.getElement("Text_Pilot").Value, content: GameConfig.Language.getElement("Text_Guide10").Value }
            ],
            // guide3
            [
                { title: GameConfig.Language.getElement("Text_Pilot").Value, content: GameConfig.Language.getElement("Text_Guide11").Value }
            ]
        ]
    }

    export function init() {
        ModuleService.getModule(GuideModuleC).reSetToTargetPosDistance(150);
        initGuideText()
        // initGuide1();
        // initGuide2();
        // initGuide3();
        // initGuide4();
        // initGuide5();
        initPosGuide();
        ModuleService.getModule(GuideModuleC).guideComplateAction.add((id: number) => {
            if (DataCenterC.getData(GuideDataHelper).complateGuideList.indexOf(id) == -1) {
                DataCenterC.getData(GuideDataHelper).complateGuideList.push(id);
            }

            if (toBeTriggeredGuides.indexOf(id) > -1) {
                toBeTriggeredGuides.splice(toBeTriggeredGuides.indexOf(id), 1);
            }
            triggerNextGuide();
        });

        // PlayerActions.onPlayerLevelChangedClient.add((level: number) => {
        //     if (level >= 2) {
        //         if (!hasCompleteClient(2) && toBeTriggeredGuides.indexOf(2) == -1) {
        //             toBeTriggeredGuides.push(2);
        //         }
        //     }
        //     if (level >= 3) {
        //         if (!hasCompleteClient(3) && toBeTriggeredGuides.indexOf(3) == -1) {
        //             toBeTriggeredGuides.push(3);
        //         }
        //     }
        //     triggerNextGuide(true);
        // });
    }

    export async function guideToTask(taskID: number) {
        let cfg = GameConfig.Task.getElement(taskID);
        if (!cfg) return;
        UIService.hide(UI_TaskMain);
        await resetTaskGuide();        
        switch (cfg.taskSolveType) {
            case EmTaskWay.UnlockTower:
                UIService.show(TowerShopUI);
                break;
            case EmTaskWay.UnlockTech:
            case EmTaskWay.TalentCount:
            case EmTaskWay.TalentUlti01:
            case EmTaskWay.TalentUlti02:
            case EmTaskWay.TalentUlti03:
                UIService.show(TalentTreeContainer);
                break;
            case EmTaskWay.PassLevel:
                guideTaskPos = StageTriggerInst.posMap[GameConfig.Stage.getElement(cfg.taskSolvetime)?.index];
                ModuleService.getModule(GuideModuleC).triggerGuide(810975);
                break;
            default:
                guideTaskPos = StageTriggerInst.posMap[0];
                ModuleService.getModule(GuideModuleC).triggerGuide(810975);
                break;
        }

    }

    export function triggerNextGuide() {
        while (toBeTriggeredGuides.length > 0 && hasCompleteClient(toBeTriggeredGuides[0])) {
            toBeTriggeredGuides.shift();
        }
        if (toBeTriggeredGuides.length > 0) {
            ModuleService.getModule(GuideModuleC).triggerGuide(toBeTriggeredGuides[0]);
        }
    }



    async function initEffect() {
        if (!effect) {
            let go = await GameObjPool.asyncSpawn("29497")
            if (effect) GameObjPool.despawn(effect);
            if (go) {
                effect = go as Effect;
                effect.loopCount = 0;
            }
        }
    }

    async function setEffectPos(id: number) {
        await initEffect();
        if (effect) {
            effect.worldTransform.position = MapManager.getPositionFromId(id);
            effect.play();
        }
    }

    function getPos(id: number): Vector {
        let pos = MapManager.getPositionFromId(id);
        return pos;
    }

    function hideEffect() {
        if (effect) {
            effect.stop();
        }
    }

    function setDialog(index: number) {
        let dialog = guideDialogs[index];
        for (let i = 0; i < dialog.length; i++) {
            let d = dialog[i];
            GuideDialog.push(d.title, d.content, () => {
                if (i == dialog.length - 1) {
                    GuideDialog.hide();
                }
            });
        }
        GuideDialog.show();
    }

    export function skip() {
        let stage = GameManager.getStageClient();
        if (stage && stage.stageWorldIndex == 99) {
            GameManager.leaveStageClient();
        }

        ModuleService.getModule(GuideModuleC).forceComplateGuide(1);
        guideState = GuideState.None;
    }

    // export function initGuide1() {
    //     let guide = ModuleService.getModule(GuideModuleC).addGuideStageHandle(1);

    //     guide.addRunFunc(() => {
    //         GameManager.startGuideClient();
    //     });

    //     guide.addCondition(() => {
    //         let stage = GameManager.getStageClient();
    //         if (stage) {
    //             return stage.hasLoaded;
    //         }
    //         return false;
    //     });

    //     guide.addRunFunc(async () => {
    //         MGSTool.doFirstEvent(FirstEvent.CoreStart);
    //         let stage = GameManager.getStageClient();
    //         stage.setSpeed(0);
    //         guideState = GuideState.CreateTowerDialog;
    //         setDialog(0);
    //         StageActions.onStageStateChanged.add(cbStageChanged);
    //     });

    //     guide.addCondition(() => {
    //         return !GuideDialog.isShow;
    //     });

    //     guide.addRunFunc(() => {
    //         MGSTool.guide(1);
    //     });

    //     let towerUI = UIService.getUI(TowerUI);
    //     guide.addBindUI(towerUI.towerItemUIs[0].createBtn);

    //     guide.addRunFunc(async () => {
    //         guideState = GuideState.CreateTower;
    //         setEffectPos(10);
    //         GuideUI.showAtPos(getPos(10), getPos(11));
    //     });

    //     guide.addBindUI(GuideUI.getBtn());
    //     guide.addRunFunc(() => {
    //         guideState = GuideState.CreateTowerComplete;
    //         GuideUI.hide();
    //         hideEffect();
    //         ModuleService.getModule(TowerModuleC).createTowerByPlaceId(1001, 10);
    //         setDialog(1);
    //         MGSTool.guide(2);
    //         MGSTool.doFirstEvent(FirstEvent.CoreStep1);
    //     });

    //     guide.addCondition(() => {
    //         return !GuideDialog.isShow;
    //     });

    //     guide.addBindUI(towerUI.towerItemUIs[0].createBtn);

    //     guide.addRunFunc(() => {
    //         guideState = GuideState.CreateTower2;
    //         setEffectPos(11);
    //         GuideUI.showAtPos(getPos(11), getPos(12));
    //     });

    //     guide.addBindUI(GuideUI.getBtn());
    //     guide.addCondition(() => {
    //         let stage = GameManager.getStageClient();
    //         return stage != null;
    //     });

    //     guide.addRunFunc(() => {
    //         guideState = GuideState.CreateTower2Complete;
    //         hideEffect();
    //         GuideUI.hide();
    //         ModuleService.getModule(TowerModuleC).createTowerByPlaceId(1001, 11);
    //         let stage = GameManager.getStageClient();
    //         stage.setSpeed(1);
    //         MGSTool.guide(3);
    //         MGSTool.doFirstEvent(FirstEvent.CoreStep2);
    //     });

    //     guide.addCondition(() => {
    //         let stage = GameManager.getStageClient();
    //         if (!stage) return false;
    //         return stage.currentWave == 2;
    //     });

    //     guide.addRunFunc(() => {
    //         let stage = GameManager.getStageClient();
    //         stage.setSpeed(0);
    //         guideState = GuideState.UpgradeTowerDialog;
    //         setDialog(2);
    //     });


    //     guide.addCondition(() => {
    //         return !GuideDialog.isShow;
    //     });

    //     guide.addRunFunc(() => {
    //         guideState = GuideState.UpgradeTower;
    //         setEffectPos(11);
    //         GuideUI.showAtPos(getPos(11), getPos(12));
    //         let stage = GameManager.getStageClient();
    //         stage.setSpeed(0);
    //     });

    //     guide.addBindUI(GuideUI.getBtn());
    //     guide.addRunFunc(() => {
    //         guideState = GuideState.UpgradeTowerComplete;
    //         hideEffect();
    //         GuideUI.hide();
    //         ModuleService.getModule(TowerModuleC).upgradeTowerByPlaceId(11);
    //         guideState = GuideState.UpgradeTowerSelected;

    //         let stage = GameManager.getStageClient();
    //         towerInfoUI = ModuleService.getModule(TowerModuleC).towerInfoUI;
    //         guide.addBindUI(towerInfoUI.levelBtn);
    //         guide.addRunFunc(() => {
    //             MGSTool.guide(5);
    //             MGSTool.doFirstEvent(FirstEvent.CoreStep4);
    //             MGSTool.doFirstEvent(FirstEvent.CoreEnd);
    //         });

    //         guide.addRunFunc(() => {
    //             let cb = (stage: EStageState) => {
    //                 if (stage == EStageState.End) {
    //                     guideState = GuideState.Complete;
    //                     GuideDialog.hide();
    //                     StageActions.onStageStateChanged.remove(cb);
    //                 }
    //             };
    //             StageActions.onStageStateChanged.add(cb);
    //             setDialog(3);
    //         });

    //         guide.addCondition(() => {
    //             return !GuideDialog.isShow;
    //         });

    //         guide.addRunFunc(() => {
    //             stage.setSpeed(1);
    //         })

    //         guide.addCondition(() => {
    //             return guideState == GuideState.Complete;
    //         });
    //     });
    // }

    // export function initGuide2() {
    //     let guide = ModuleService.getModule(GuideModuleC).addGuideStageHandle(2);
    //     let lobbyUI = UIService.getUI(LobbyUI);
    //     guide.addCondition(() => {
    //         return lobbyUI.visible;
    //     });
    //     guide.addRunFunc(() => {
    //         setDialog(7);
    //     });

    //     guide.addCondition(() => {
    //         return !GuideDialog.isShow;
    //     });

    //     guide.addCondition(() => {
    //         return lobbyUI.visible;
    //     });

    //     guide.addBindUI(lobbyUI.mButton_TaskSmall);

    //     guide.addRunFunc(() => {
    //         MGSTool.guide(15);
    //     });
    // }

    // export function initGuide3() {
    //     let guide = ModuleService.getModule(GuideModuleC).addGuideStageHandle(3);
    //     let lobbyUI = UIService.getUI(LobbyUI);
    //     let taskUI = UIService.getUI(UI_TaskMain);
    //     let techTreeUI = UIService.getUI(UITechTree);

    //     guide.addCondition(() => {
    //         return lobbyUI.visible;
    //     });
    //     guide.addCondition(() => {
    //         return !taskUI.visible;
    //     });

    //     guide.addRunFunc(() => {
    //         setDialog(8);
    //     });
    //     guide.addCondition(() => {
    //         return !GuideDialog.isShow;
    //     });

    //     guide.addCondition(() => {
    //         return lobbyUI.visible;
    //     });
    //     guide.addBindUI(lobbyUI.techTreeBtn);
    //     guide.addRunFunc(() => {
    //         MGSTool.guide(16);
    //         ModuleService.getModule(PlayerModuleC).techTree.show();
    //     });

    //     guide.addCondition(() => {
    //         return techTreeUI.visible;
    //     });

    //     guide.addBindUI(ModuleService.getModule(PlayerModuleC).techTree.getNode(1001).drawNode.uiObject);

    //     guide.addRunFunc(() => {
    //         techTreeUI.selected = 1001;
    //         techTreeUI.updateSelected();

    //         let techTree = ModuleService.getModule(PlayerModuleC).techTree;
    //         if (techTree.getNode(1001).isUnlocked) {
    //             guide.addRunFunc(() => {
    //                 MGSTool.guide(17);
    //             });
    //         }
    //         else {
    //             guide.addBindUI(techTreeUI.infoBtn);
    //             guide.addRunFunc(() => {
    //                 MGSTool.guide(17);
    //             });
    //         }
    //     });
    // }

    // export function initGuide4() {
    //     let guide = ModuleService.getModule(GuideModuleC).addGuideStageHandle(4);
    //     guide.addCondition(() => {
    //         let lobbyUI = UIService.getUI(LobbyUI);
    //         return lobbyUI.visible;
    //     });

    //     guide.addRunFunc(() => {
    //         setDialog(4);
    //     });

    //     guide.addCondition(() => {
    //         return !GuideDialog.isShow;
    //     });

    //     guide.addRunFunc(() => {
    //         let lobbyUI = UIService.getUI(LobbyUI);
    //         guide.addBindUI(lobbyUI.cardBtn);
    //         guide.addRunFunc(() => {
    //             UIService.show(TowerShopUI);
    //         });

    //         guide.addCondition(() => {
    //             let ui = UIService.getUI(TowerShopUI);
    //             return ui.visible;
    //         });


    //         guide.addRunFunc(() => {
    //             let ui = UIService.getUI(TowerShopUI);
    //             let index = ui.shopItemUIs.findIndex((item => {
    //                 return item.cfgID == 2001;
    //             }));
    //             console.log(index);

    //             // console.log(ui.showItemUIs[index].uiObject.position, "pos");
    //             if (index > -1) {
    //                 let rowIndex = Math.floor(index / 3);
    //                 ui.mScrollBox.scrollOffset = 240 * rowIndex;
    //                 guide.addBindUI(ui.shopItemUIs[index].chooseBtn);
    //                 guide.addBindUI(ui.infoBtn);
    //             }
    //             guide.addRunFunc(() => {
    //                 MGSTool.guide(9);
    //             });

    //             guide.addRunFunc(() => {
    //                 UIService.hide(TowerShopUI);
    //             });

    //             guide.addRunFunc(() => {
    //                 setDialog(5);
    //             });

    //             guide.addCondition(() => {
    //                 return !GuideDialog.isShow;
    //             });
    //         })

    //     });
    // }

    // export function initGuide5() {
    //     let guide = ModuleService.getModule(GuideModuleC).addGuideStageHandle(5);

    //     guide.addCondition(() => {
    //         let lobbyUI = UIService.getUI(LobbyUI);
    //         return lobbyUI.visible;
    //     });

    //     guide.addRunFunc(() => {
    //         let pos = StageTriggerInst.posMap[0].clone();
    //         pos.z -= 200;
    //         Utils.faceCameraToTarget(pos);
    //     });

    //     guide.addBindWorldPos(StageTriggerInst.posMap[0]);

    //     guide.addRunFunc(() => {
    //         GuideActions.onGuideStageTriggered.call();
    //         let ui = UIService.getUI(UIStageSelect);
    //         guide.addCondition(() => {
    //             return ui.visible;
    //         });
    //         guide.addBindUI(ui.mGo);

    //         guide.addRunFunc(() => {
    //             GuideActions.onGuideStageSelect.call();
    //         });

    //         guide.addCondition(() => {
    //             return GameManager.getStageClient() != null;
    //         });

    //         guide.addRunFunc(() => {
    //             MGSTool.guide(10);
    //             setDialog(6);
    //             let stage = GameManager.getStageClient();
    //             stage && stage.setSpeed(0);
    //         });

    //         guide.addCondition(() => {
    //             return !GuideDialog.isShow;
    //         });


    //         guide.addRunFunc(() => {
    //             MGSTool.guide(11);
    //         })

    //         let mainUI = UIService.getUI(UIMain);
    //         guide.addCondition(() => {
    //             return mainUI.visible;
    //         });

    //         guide.addBindUI(mainUI.mSpeedControl);

    //         guide.addRunFunc(() => {
    //             MGSTool.guide(12);
    //             mainUI.mSpeedUp.onClicked.broadcast();
    //         });

    //         guide.addRunFunc(() => {
    //             let stage = GameManager.getStageClient();
    //             stage && stage.setSpeed(1.5);
    //         });
    //     });
    // }

    async function initPosGuide() {
        let guide = ModuleService.getModule(GuideModuleC).addGuideStageHandle(810975);
        guide
            .addCondition(() => { return toBeTriggeredGuides.length <= 0 })
            .addRunFunc(() => {
                guide["taskStage"] = [];
                guide.addBindWorldPos(guideTaskPos)
            })
    }

    export async function resetTaskGuide() {
        await ModuleService.getModule(GuideModuleC).resetGuideById(810975);
    }
}