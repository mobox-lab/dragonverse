import { AddGMCommand } from "module_gm";
import { GameConfig } from "../../../config/GameConfig";
import { WaitLoop } from "../../utils/AsyncTool";
import { CommonUtils } from "../../utils/CommonUtils";
import MusicMgr from "../../utils/MusicMgr";
import { GhostTraceHelper } from "../../utils/TraceHelper";
import { BoardHelper } from "../blackboard/BoardDefine";
import ItemPicker from "../controller/ItemPicker";
import { PickItemTag } from "../procedure/const/ClueDefine";
import { EquipDefine } from "./EquipDefine";
import { EquipModuleS } from "./EquipModuleS";
import EquipScript from "./EquipScript";
import { Item } from "./items/Item";
import { FlyItemMgr } from "./FlyItemMgr";
import GameStart from "../../GameStart";
import { EGameTheme } from "../../Defines";

export class EquipModuleC extends ModuleC<EquipModuleS, null> {

    public clazzMap: Map<string, Item> = new Map<string, Item>();

    private _curItem: EquipScript;

    private _discardMap: Map<string, GameObject> = new Map();

    private _lastDiscardTime: number = 0;

    private _defaultCameraTrans: Transform;
    private _defaultCameraArmLen: number;
    protected onStart(): void {
        super.onStart();
        Event.addLocalListener(BoardHelper.BoardClearEvent, () => {
            this.server.net_equip(null);
            this._discardMap.forEach(e => {
                e.destroy()
            })
            this._discardMap.clear()// = 0;

        })
        Event.addLocalListener("discardItem", (key: string) => {
            if (this._discardMap.has(key)) {
                this._discardMap.get(key).destroy();
                this._discardMap.delete(key);
            }
        })
        this._defaultCameraTrans = Camera.currentCamera.localTransform.clone()
        this._defaultCameraArmLen = Camera.currentCamera.springArm.length
    }

    public equip(itemId: string) {
        if (itemId === null && this.getPlayerEquip() === -1) {
            return;
        }
        this.server.net_equip(itemId);
    }

    /** 等待秒数 */
    public static waitTime = 0;

    public async useItem(playerId: number, useCount: number) {
        if (!EquipDefine.curPlayerEquipItem) {
            console.error("当前没有装备东西")
            return false;
        }
        let cfg = GameConfig.Item.getElement(EquipDefine.curPlayerEquipItem.cfgId);
        if (cfg) {
            const clazzMap = ModuleService.getModule(EquipModuleC).clazzMap;
            // 检查是否使用成功
            let checkSuccess = clazzMap.get(cfg.clazz)?.use(cfg, useCount);
            if (!checkSuccess) { return false; }
            if (cfg.sound) { MusicMgr.instance.play(cfg.sound); }
        }
        GhostTraceHelper.itemTrace(EquipDefine.curPlayerEquipItem.cfgId, 2);
        if (EquipModuleC.waitTime != 0) {
            TimeUtil.delaySecond(EquipModuleC.waitTime).then(() => {
                this.server.net_useItem(playerId, useCount);
            });
            EquipModuleC.waitTime = 0;
        } else {
            this.server.net_useItem(playerId, useCount);
        }
        return true;
    }

    public async removeItem(playerId: number, useCount: number = 1) {
        if (!EquipDefine.curPlayerEquipItem) {
            console.error("当前没有装备东西")
            return false;
        }
        return await this.server.net_useItem(playerId, useCount);
    }

    public registerEquipScript(scripts: EquipScript) {
        if (scripts.gameObject == Player.localPlayer.character) {
            this._curItem = scripts;
        }
    }

    public getPlayerEquip() {
        if (!EquipDefine.curPlayerEquipItem) {
            return -1;
        }
        return EquipDefine.curPlayerEquipItem.cfgId;
    }

    /**
     * 丢弃物品到场景上
     */
    public discard() {
        let curTIme = TimeUtil.elapsedTime();
        if (curTIme - this._lastDiscardTime < 0.5) {
            console.error("操作过于频繁")
            return;
        }
        this._lastDiscardTime = curTIme;
        if (!EquipDefine.curPlayerEquipItem) {
            return;
        }

        if (!GameConfig.Item.getElement(this._curItem.equipData.cfgId).isCanDiscard) { return; }

        let startLoc = this.localPlayer.character.getSlotWorldPosition(HumanoidSlotType.Head);
        let dir = Camera.currentCamera.worldTransform.getForwardVector();
        let res = CommonUtils.getViewCenterWorldHit(300);

        if (res instanceof HitResult && res.impactNormal.z <= 0.2) {
            let res2 = QueryUtil.lineTrace(res.position, res.position.clone().add(res.impactNormal.clone().multiply(10)).add(Vector.down.multiply(300)), true, true);
            for (let index = 0; index < res2.length; index++) {
                const element = res2[index];
                if (element.gameObject instanceof Trigger || element.gameObject instanceof Character) {
                    continue;
                }
                startLoc.set(element.position.clone());
                break;
            }
        }
        else {
            startLoc.set(res instanceof HitResult ? res.position : res);
        }

        this.server.net_discardItem(`CI${Date.now()}`, startLoc);
        GhostTraceHelper.itemTrace(EquipDefine.curPlayerEquipItem.cfgId, 1);
    }

    public async net_insDisItem(key: string, assid: string, fallPos: Vector, discardCount: number) {
        let go = await GameObject.asyncSpawn(assid, { replicates: false })
        let startLoc = this.localPlayer.character.getSlotWorldPosition(HumanoidSlotType.Head);
        try {
            go.worldTransform.position = startLoc;
            go.worldTransform.rotation = this.localPlayer.character.worldTransform.rotation;
        } catch (error) {
            console.error(assid + "生成出现错误，检查表格" + error.stack)
            return;
        }
        let box = go.getBoundingBoxExtent(true, false);
        go.setCollision(CollisionStatus.Off, true);
        let offsetz = Math.max(0, box.z / 2);
        fallPos.z += offsetz;
        let preDt: number = 0;
        const gravity = 300;
        let loc = go.worldTransform.position.clone();
        const time = Vector.distance(loc, fallPos) / 1000;
        let force = this.getHitForce(gravity, 1000, loc, fallPos);
        this.setAsClueItem(go, key);
        this._discardMap.set(key, go);
        let tween = new mw.Tween({ x: 0 }).to({ x: 1 }, time * 1000).onUpdate(num => {
            try {
                let curtime = num.x * time;
                let dt = curtime - preDt;
                preDt = curtime;
                force.z -= dt * gravity;
                loc.add(force.clone().multiply(dt));
                go.worldTransform.position = loc;
            } catch (error) {
                console.log(error);
            }
        }).onComplete(() => {
            try {
                MusicMgr.instance.play(101);
                go.setCollision(CollisionStatus.QueryOnly, true);
            } catch (error) {
                console.log(error);
            }
        }).start();

        // 注入count
        this.insertItemCount(go, discardCount);
    }

    /** 广度遍历该物体下所有脚本，找到ItemPicker脚本，注入丢弃的数量 */
    private insertItemCount(discardGo: GameObject, discardCount: number) {
        for (let script of discardGo.getScripts()) {
            if (script instanceof ItemPicker) {
                script.count = discardCount;
                return;
            }
        }
        discardGo.getChildren().forEach(obj => { this.insertItemCount(obj, discardCount) });
    }

    /**
     * 获得一个打击的力，用于模拟抛物线
     * @param gravity 重力的数值
     * @param speed 速度
     * @param startPos 出发点
     * @param targetPos 目标点
     * @returns 产生的力
     */
    public getHitForce(gravity: number, speed: number, startPos: mw.Vector, targetPos: mw.Vector): mw.Vector {
        const dis = mw.Vector.distance(startPos, targetPos);
        const costTime = dis / speed;
        const disY = targetPos.z - startPos.z;
        let force = new mw.Vector((targetPos.x - startPos.x) / costTime,
            (targetPos.y - startPos.y) / costTime,
            (disY / costTime) + 0.5 * gravity * costTime);
        return force;
    }

    setAsClueItem(go: GameObject, guid: string) {
        go[PickItemTag] = guid;
        go.getChildren().forEach(e => {
            this.setAsClueItem(e, guid);
        })
    }

    public reqChangeBrandTxt(val: string) {
        this.server.net_changeBrandTxt(val);
    }

    private _inter: any
    private _curTarget: mw.Player
    /**
     * 扫描攻击目标
     */
    public scanTarget() {
        Camera.currentCamera.preset = CameraPreset.FirstPerson;
        this._inter = setInterval(() => {
            let dir = Camera.currentCamera.worldTransform.getForwardVector();
            let startPos = Camera.currentCamera.worldTransform.position.clone().add(dir.clone().multiply(40));
            let endPos = Vector.add(startPos, dir.multiply(100000))
            let result = QueryUtil.lineTrace(startPos, endPos, false, false);
            for (let i = 0; i < result.length; ++i) {
                let obj = result[i].gameObject
                if (!obj) continue;
                if (!(obj instanceof Character)) continue;
                if (obj.player) {
                    this.lockTarget(obj.player)
                    return;
                }
            }
            this.lockTarget(null);
        }, 50)
    }

    /**
     * 锁定目标
     * @param player 
     */
    private lockTarget(player: mw.Player) {
        if (!player) {//丢失目标
            if (this._curTarget) {
                this._curTarget.character.setOutline(false, LinearColor.red, 0.5);
            }
            this._curTarget = null;
        } else {//扫描到目标
            if (!this._curTarget) {
                this._curTarget = player;
                this._curTarget.character.setOutline(true, LinearColor.red, 0.5);
            } else {
                //切换目标
                if (this._curTarget.playerId != player.playerId) {
                    this._curTarget.character.setOutline(false, LinearColor.red, 0.5);
                    player.character.setOutline(true, LinearColor.red, 0.5);
                    this._curTarget = player
                }
            }
        }
    }

    /**
     * 停止扫描目标
     */
    public async stopScanTarget() {
        clearInterval(this._inter);
        if (this._curTarget) {
            this._curTarget.character.setOutline(false, LinearColor.red, 1);
            this._curTarget = null;
        }
        await TimeUtil.delaySecond(1)
        if (EGameTheme.Hall == GameStart.GameTheme) {
            Camera.currentCamera.preset = mw.CameraPreset.ThirdPerson
        } else {
            Camera.currentCamera.preset = mw.CameraPreset.FirstPerson
        }
        Camera.currentCamera.localTransform = this._defaultCameraTrans;
        Camera.currentCamera.springArm.length = this._defaultCameraArmLen;
        this._inter = null;
    }

    /**
     * 对目标使用交互道具
     * @param itemID 
     * @param targetPlayerID 
     */
    public reqUseInteractItem(itemID: number) {
        if (!this._curTarget) return false
        this.server.net_playerUseInteractItem(itemID, this._curTarget.playerId)
        return true
    }

    /**
     * 通知交互道具使用效果 客户端做表现
     */
    public async net_notifyInteractEffect(itemID: number, attackerID: number, targetID: number) {
        let data = GameConfig.Item.getElement(itemID);
        let attacker = Player.getPlayer(attackerID);
        let target = Player.getPlayer(targetID);
        if (!data || !attacker || !target) return;
        let ani = attacker.character.loadAnimation(data.useEffect[0][0]);
        if (attackerID == this.localPlayerId) {//使用者播放使用音效
            if (data.useSound && data.useSound[0]) SoundService.playSound(data.useSound[0])
        }
        //使用特效
        ani.onFinish.add(() => {
            FlyItemMgr.instance.createItem(data, attacker.character.worldTransform.position, target);
        })
        ani.play()
        //使用特效
        let useEffect = await mw.GameObject.asyncSpawn(data.useEffect[0][1])
        attacker.character?.attachToSlot(useEffect, HumanoidSlotType.RightHand);
        await TimeUtil.delaySecond(1)
        useEffect.destroy()
    }

    protected onUpdate(dt: number): void {
        FlyItemMgr.instance.update(dt);
    }
}


