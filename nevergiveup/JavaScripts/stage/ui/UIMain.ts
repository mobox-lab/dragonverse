/*
 * @Author: shifu.huang
 * @Date: 2023-12-06 17:21:40
 * @LastEditors: shifu.huang
 * @LastEditTime: 2024-01-24 14:25:49
 * @FilePath: \nevergiveup\JavaScripts\stage\ui\UIMain.ts
 * @Description: 修改描述
 */
import { EnemyActions, StageActions, TowerActions } from "../../Actions";
import TryTowerUI from "../../Game/TryTowerUI";
import { GameManager } from "../../GameManager";
import { TowerEvent } from "../../Modules/TowerModule/TowerEnum";
import { TowerManager } from "../../Modules/TowerModule/TowerManager";
import { TowerModuleC } from "../../Modules/TowerModule/TowerModuleC";
import { EStageState } from "../../StageEnums";
import { GameConfig } from "../../config/GameConfig";
import { Enemy } from "../../enemy/EnemyBase";
import { MGSTool } from "../../tool/MGSTool";
import MainUI_Generate from "../../ui-generate/HUD/MainUI_generate";

export class UIMain extends MainUI_Generate {
    public maxSpeed: number = 1.5;
    public curSpeed: number = 1;
    public playing: boolean = true;
    private _tryTowerUIs: TryTowerUI[] = [];
    private _oriBagPos: mw.Vector2;

    onStart() {
        this.initCompont();
        this.setBossContainerVisible(false);

        EnemyActions.onBossSpawned.add((boss: Enemy) => {
            this.setBossContainerVisible(true);
            this.setBossInfo(boss.name, boss.hp, boss.hpMax, boss.hp / boss.hpMax);
        });

        EnemyActions.onBossHpChanged.add((boss: Enemy) => {
            this.setBossInfo(boss.name, boss.hp, boss.hpMax, boss.hp / boss.hpMax);
        });

        EnemyActions.onBossDie.add(() => {
            this.setBossContainerVisible(false);
        });

        StageActions.onPlayerCountChanged.add(() => {
            this.updateSpeedControl();
        });

        Event.addServerListener("canSkipWave", (count: number, maxCount: number) => {
            this.onCanSkipWave(count, maxCount);
        });

        Event.addServerListener("updateSkipWave", (count: number, maxCount: number) => {
            this.updateSkipWaveCount(count, maxCount);
        });

        this.mSkip.onClicked.add(() => {
            MGSTool.clickBtn("12");
            let stage = GameManager.getStageClient();
            if (stage) {
                Event.dispatchToServer("skipWave", stage.id, true);
            }
        });

        this.mNotSkip.onClicked.add(() => {
            MGSTool.clickBtn("13");
            let stage = GameManager.getStageClient();
            if (stage) {
                Event.dispatchToServer("skipWave", stage.id, false);
            }
        });

        this.mSpeedUp.onClicked.add(() => {
            MGSTool.clickBtn("1");
            this.speedUp();
        });

        this.mPause.onClicked.add(() => {
            MGSTool.clickBtn("2");
            this.pause();
            this.setSpeed(0);
        });

        this.mPlay.onClicked.add(() => {
            this.play();
            this.setSpeed(this.curSpeed);
        });

        this.mSpeeddown.onClicked.add(() => {
            this.speedDown();
        });
    }



    setSpeed(speedMultipler: number) {
        let stage = GameManager.getStageClient();
        if (stage) {
            stage.setSpeed(speedMultipler);
        }
    }

    play() {
        this.mPlay.visibility = SlateVisibility.Collapsed;
        this.mPause.visibility = SlateVisibility.Visible;
        this.mSpeed.text = Math.ceil(this.curSpeed).toFixed(0) + "x";
        this.playing = true;
    }

    pause() {
        this.mPlay.visibility = SlateVisibility.Visible;
        this.mPause.visibility = SlateVisibility.Collapsed;
        this.mSpeed.text = GameConfig.Language.getElement("Text_Pause").Value
        this.playing = false;
    }

    speedUp() {
        this.mSpeedUp.visibility = SlateVisibility.Collapsed;
        this.mSpeeddown.visibility = SlateVisibility.Visible;
        this.curSpeed = this.maxSpeed;
        if (this.playing) {
            this.setSpeed(this.curSpeed);
            this.play();
        }
    }

    speedDown() {
        this.mSpeedUp.visibility = SlateVisibility.Visible;
        this.mSpeeddown.visibility = SlateVisibility.Collapsed;
        this.curSpeed = 1;
        if (this.playing) {
            this.setSpeed(this.curSpeed);
            this.play();
        }
    }

    private initCompont() {
        StageActions.onGoldChanged.add((v: number) => {
            this.goldTxt.text = v.toFixed();
        })
        TowerActions.onMyTowerCountChanged.add(() => {
            this.towerTxt.text = TowerManager.myTowerCount.toFixed() + "/" + ModuleService.getModule(TowerModuleC).maxTower?.toFixed(0);
        })
        StageActions.onPlayerCountChanged.add(() => {
            this.towerTxt.text = TowerManager.myTowerCount.toFixed() + "/" + ModuleService.getModule(TowerModuleC).maxTower?.toFixed(0);
        });

        for (let i = 0; i < 3; i++) {
            let item = UIService.create(TryTowerUI);
            this.towerItemCanvas.addChild(item.uiObject);
            this._tryTowerUIs.push(item);
        }
        this._oriBagPos = this.bagCanvas.position.clone();
        setTimeout(() => {// 延时初始化 等适配完在初始化
            this._oriBagPos = this.bagCanvas.position.clone();
        }, 1500);
    }

    public setTryTower(towerIDs: Map<number, number>) {
        if (!towerIDs || towerIDs.size < 0) return;
        let count = 0;
        for (const [key, value] of towerIDs) {
            this._tryTowerUIs[count]?.init(key, value);
            count++;
        }

        // 初始化剩余的UI元素
        for (let i = count; i < this._tryTowerUIs.length; i++) {
            this._tryTowerUIs[i]?.init(null, 0);
        }

        this.bagCanvas.position = this._oriBagPos.clone().add(new Vector2(-count * (this._tryTowerUIs[0].rootCanvas.size.x + 40), 0));
    }



    setTimer(time: number) {
        let minutes = Math.floor(time / 60);
        let seconds = Math.ceil(time % 60);
        if (minutes < 0) minutes = 0;
        if (seconds < 0) seconds = 0;
        let minutesStr = minutes < 10 ? "0" + minutes : minutes.toString();
        let secondsStr = seconds < 10 ? "0" + seconds : seconds.toString();
        this.mTimer.text = minutesStr + ":" + secondsStr;
    }

    setWave(wave: number, waveMax: number) {
        this.mWave.text = GameConfig.Language.getElement("Text_Wave").Value + wave.toFixed(0) + "/" + waveMax.toFixed(0);
    }

    setHp(hp: number, maxHp: number) {
        this.mHp.text = Math.ceil(hp) + "/" + Math.ceil(maxHp) + " HP";
        this.mHpBar.percent = hp / maxHp;
    }

    setBossContainerVisible(visible: boolean) {
        this.mBossContainer.visibility = visible ? SlateVisibility.Visible : SlateVisibility.Collapsed;
    }

    setBossInfo(name: string, amount: number, maxHP: number, percent: number) {
        this.mBossHP.percent = percent;
        this.mBossInfo.text = name + ":" + amount.toFixed(0) + "/" + maxHP.toFixed(0) + " HP";
    }

    onStateChanged(state: EStageState) {
        this.mSkipWave.visibility = SlateVisibility.Collapsed;
        if (state == EStageState.Game) {
            this.mWave.visibility = SlateVisibility.Visible;
            this.mWait.visibility = SlateVisibility.Collapsed;
            this.updateSpeedControl();
        }
        else if (state == EStageState.Wait) {
            this.mWave.visibility = SlateVisibility.Collapsed;
            this.mWait.visibility = SlateVisibility.Visible;
        }
    }

    onCanSkipWave(count: number, maxCount: number) {
        let stage = GameManager.getStageClient();
        if (stage && stage.stageWorldIndex == 99) return;
        this.mSkipWave.visibility = SlateVisibility.Visible;
        this.updateSkipWaveCount(count, maxCount);
    }

    updateSkipWaveCount(count: number, maxCount: number) {
        this.mSkipCount.text = count + "/" + maxCount;
    }

    updateSpeedControl() {
        let stage = GameManager.getStageClient();
        if (stage && stage.stageWorldIndex == 99) {
            this.mSpeedControl.visibility = SlateVisibility.Collapsed;
        }
        else {
            if (stage && stage.playerIds.length == 1) {
                this.mSpeedControl.visibility = SlateVisibility.Visible;
            }
            else {
                this.mSpeedControl.visibility = SlateVisibility.Collapsed;
            }
        }
    }


    onShow() {
        this.playing = true;
        this.play();
        this.speedDown();
        this.towerTxt.text = TowerManager.myTowerCount.toFixed() + "/" + ModuleService.getModule(TowerModuleC).maxTower?.toFixed(0);
    }
}