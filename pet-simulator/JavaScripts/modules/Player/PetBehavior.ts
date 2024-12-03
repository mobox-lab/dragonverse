import { GeneralManager } from "../../Modified027Editor/ModifiedStaticAPI";
import { oTraceError } from "odin";
import { GameConfig } from "../../config/GameConfig";
import { IPetARRElement } from "../../config/PetARR";
import { GlobalData, endInfo } from "../../const/GlobalData";
import { Arrow } from "../../util/ArrowControul";
import { EffectManager } from "../../util/EffectManager";
import { cubicBezier, getRot, getTransform, setPos, setTransform } from "../../util/MoveUtil";
import { SoundManager } from "../../util/SoundManager";
import { utils } from "../../util/uitls";
import { VectorUtil } from "../../util/VectorUtil";
import ResourceScript, { SceneResourceMap } from "../Resources/Resource";
import { HUDInfo, HUDManager } from "./HUDManager";
import PlayerBehavior from "./PlayerBehavior";
import { GlobalEnum } from "../../const/Enum";
import { EnchantBuff } from "../PetBag/EnchantBuff";
import { SpawnManager } from "../../Modified027Editor/ModifiedSpawn";
import Log4Ts from "mw-log4ts";
import { EnergyModuleC } from "../Energy/EnergyModule";
import GToolkit from "gtoolkit";
import { P_HudPetGift } from "../OnlineModule/P_HudPetGift";
import { TipsManager } from "../Hud/P_TipUI";
import GameServiceConfig from "../../const/GameServiceConfig";

/**宠物状态 */
export enum PetState {
    /**待机 */
    Idle = 0,
    /**移动 */
    Move = 1,
    /**攻击 */
    Attack = 2,
}

export default class PetBehavior {

    public petName: string = "";
    private petTitle: string = "";
    private pet: mw.Character | GameObject = null;
    /**头顶UI */
    private headUI: HUDInfo = null;
    private _state: PetState = PetState.Idle;
    /**当前主人 */
    private owner: mw.Character = null;
    private currentChar: mw.Character = null;
    /**距离主人坐标 */
    public disPos: mw.Vector = mw.Vector.zero;
    /**宠物id */
    private _petId: string = "";
    /**宠物信息 */
    private petInfo: IPetARRElement = null;
    public isReady: boolean = false;
    private height: number = GlobalData.pet.petHeight;
    /**当前特效 */
    private currentEffectIds: mw.Effect[] = [];
    /**主人行为脚本 */
    private ownerBe: PlayerBehavior = null;
    private attackDamage: number = 20;
    /**当前身上的加速特效数量 */
    public accelerateNum: number = 0;
    public addAttackSpeed: number = 1;
    /**宠物key */
    public key: number;
    /**当前裁剪距离 */
    private clipDis: number = 2000;
    /**翅膀特效 */
    private _wing: Effect;

    /**
     * 控制宠物攻击事件
     */
    private _attackListener: EventListener = null;
    /**
     * 控制宠物取消攻击事件
     */
    private _cancelAttackListener: EventListener = null;

    public get PetGameObj(): mw.GameObject {
        return this.pet;
    }

    public get petId(): string {
        return this._petId;
    }

    public get isAttack(): boolean {
        return this._state == PetState.Attack;
    }

    /**通过key获取宠物id */
    public getPetId(key: string): number {
        let ids = key.split("_");
        let id = parseInt(ids[1]);
        this.key = parseInt(ids[0]);
        if (isNaN(id)) return 0;
        return id;
    }

    public reName(name: string): void {
        this.petName = name;
        this.onInfoChange();
    }

    public async init(key: string, attack: number, name: string, owner: mw.Character, currentChar: mw.Character, ownerBe: PlayerBehavior): Promise<void> {
        this._petId = key;
        let petId = this.getPetId(key);
        this.petInfo = GameConfig.PetARR.getElement(petId);
        if (!this.petInfo) return;
        this.attackDamage = attack;
        this.accelerateNum = 0;
        this.ownerBe = ownerBe;
        this.owner = owner;
        this.currentChar = currentChar;
        this.clipDis = owner == currentChar ? GlobalData.Global.selfPetCutDistance : GlobalData.Global.otherPetCutDistance;
        this.speed = this.petInfo.PetSpeed * (1 + EnchantBuff.getPetBuff(Player.localPlayer.playerId, this.key).moveSpeedAdd / 100);
        this.chaseSpeed = this.petInfo.PetChase;
        if (this.petInfo.CharacterType === GlobalData.PetCharacterType.Character) {
            SpawnManager.modifyPoolAsyncSpawn("Character").then(cha => {
                if (!this.owner || !this.owner.worldTransform) this.destroy();
                this.pet = cha as Character;
                if (!(this.pet instanceof Character)) return;
                this.pet.collisionWithOtherCharacterEnabled = false;
                GToolkit.safeSetDescription(this.pet, this.petInfo.ModelGuid);
                this.pet.displayName = "";
                SoundManager.instance.play3DSound(GlobalData.Music.petEquip, this.pet);
                this.petName = name;
                this.setQuality(this.petInfo.QualityType);
                this._state = PetState.Idle;
                this.lastMoveState = true;
                this.onInfoChange();
                this.isReady = true;
                utils.setClipDistance(this.pet, this.clipDis);
                if (this.owner.worldTransform && owner.worldTransform.position)
                    try {
                        setPos(this.pet, this.owner.worldTransform.transformPosition(this.disPos));
                    } catch (error) {
                    }
                if (this.petInfo.PetEffect) {
                    this.petInfo.PetEffect.forEach((id: number) => {
                        this.currentEffectIds.push(EffectManager.instance.playEffOnObjScene(id, this.pet, this.clipDis));
                    });
                }
                //添加翅膀
                let wingGuid = this.petInfo.wingGuid;
                let wingTransform = this.petInfo.wingTransform;
                if (wingGuid && wingTransform) {
                    mw.GameObject.asyncSpawn(wingGuid).then((go) => {
                        this._wing = go as Effect;
                        if (!(this.pet instanceof Character)) return;
                        this.pet.attachToSlot(this._wing, HumanoidSlotType.BackOrnamental);
                        TimeUtil.delayExecute(() => {
                            this._wing.play();
                            this._wing.localTransform = new Transform(new Vector(wingTransform[0][0], wingTransform[0][1], wingTransform[0][2]), new Rotation(wingTransform[1][0], wingTransform[1][1], wingTransform[1][2]), new Vector(wingTransform[2][0], wingTransform[2][1], wingTransform[2][2]));
                        }, 10);
                    });
                }
            });
        } else if (this.petInfo.CharacterType === GlobalData.PetCharacterType.GameObject) {
            let ModelGuid = this.petInfo.ModelGuid;
            let type = GameObjPoolSourceType.Prefab;
            SpawnManager.modifyPoolAsyncSpawn(ModelGuid, type).then(obj => {
                if (!this.owner || !this.owner.worldTransform) this.destroy();
                this.pet = obj;
                this.pet.setCollision(mw.PropertyStatus.Off);
                SoundManager.instance.play3DSound(GlobalData.Music.petEquip, this.pet);
                this.petName = name;
                this.setQuality(this.petInfo.QualityType);
                this._state = PetState.Idle;
                this.lastMoveState = true;
                this.onInfoChange();
                this.isReady = true;
                utils.setClipDistance(this.pet, this.clipDis);
                utils.addOutlineExcept(this.pet, true);
                if (this.owner.worldTransform && owner.worldTransform.position)
                    try {
                        setPos(this.pet, this.owner.worldTransform.transformPosition(this.disPos));
                    } catch (error) {
                    }
                if (this.petInfo.PetEffect) {
                    this.petInfo.PetEffect.forEach((id: number) => {
                        this.currentEffectIds.push(EffectManager.instance.playEffOnObjScene(id, this.pet, this.clipDis));
                    });
                }
            });
        }

        this._attackListener = Event.addLocalListener(GlobalEnum.EventName.PetAttack, (playerId: number, key: number, target: number) => {
            if (this.key === key && this.owner.player.playerId === playerId) this.addTarget(target);
        });

        this._cancelAttackListener = Event.addLocalListener(GlobalEnum.EventName.CancelPetAttack, (playerId: number, key: number) => {
            if (this.key === key && this.owner.player.playerId === playerId) this.changeToIdle();
        });
    }

    private setQuality(type: number) {
        const quality = GlobalEnum.PetQuality;
        let str: string;
        switch (type) {
            case quality.Normal:
                str = GameConfig.Language.PetARR_Quality_1.Value;
                break;
            case quality.Rare:
                str = GameConfig.Language.PetARR_Quality_2.Value;
                break;
            case quality.Legend:
                str = GameConfig.Language.PetARR_Quality_4.Value;
                break;
            case quality.Myth:
                str = GameConfig.Language.PetARR_Quality_5.Value;
                break;
            case quality.Epic:
                str = GameConfig.Language.PetARR_Quality_3.Value;
                break;
            default:
                break;
        }
        this.petTitle = str;
    }

    public get position(): mw.Vector {
        if (!this.pet) return null;
        if (!this.pet.tempLocation) {
            this.pet.tempLocation = this.pet.worldTransform.position;

        }
        ;
        return this.pet.tempLocation;
    }

    public get state(): PetState {
        return this._state;
    }

    public destroy(): void {
        if (!this.pet) {
            this.pet = null;
            return;
        }
        this.currentEffectIds.forEach(eff => {
            eff?.destroy();
        });
        this?.arrow?.destroy();
        this.attackTween?.stop();
        this.attackTween = null;
        this.stopMove();
        if (this.petInfo.CharacterType === GlobalData.PetCharacterType.Character && this.pet instanceof Character) {
            this.pet.detachFromSlot(this._wing);
            this._wing.destroy();
        }
        HUDManager.instance.recHUDInfo(this.pet.gameObjectId);
        // GameObjPool.despawn(this.pet);
        this.pet.destroy();
        this.pet = null;
        this.owner = null;
        this.isReady = false;
        this._attackPrivot = null;
        this.tarResPoint = 0;

        Event.removeListener(this._attackListener);
        Event.removeListener(this._cancelAttackListener);
    }

    /**宠物出现在玩家身后 */
    public appear(): void {
        if (!this.owner) return;
        this.changeIdle();
        let ownerTransform = this.owner.worldTransform.clone();
        let petTransform = this.pet.worldTransform.clone();
        let pos = ownerTransform.transformPosition(this.disPos);
        pos = this.keepOnGround(pos, ownerTransform.position);
        pos.z += 20;
        let rot = ownerTransform.rotation;
        if (this.petInfo.CharacterType === GlobalData.PetCharacterType.GameObject) {
            rot.z += 180;
        }
        petTransform.position = pos;
        petTransform.rotation = rot;
        setTransform(this.pet, petTransform);
    }

    private ownerTransform: Transform = null;
    private _isPlayingAni: boolean = false;
    private _ani: Animation;
    private _petArrived: boolean = false;

    public update(dt: number, transform: Transform): void {

        this.ownerTransform = transform.clone();
        if (!this.owner || !this.pet) return;
        //头顶名字显影逻辑
        let res = QueryUtil.lineTrace(Camera.currentCamera.worldTransform.position, this.pet.worldTransform.position, true, false);
        if (res.length > 0) {
            this.headUI.hide();
        } else {
            this.headUI.show();
        }
        if (this.accelerateNum > 0) {
            this.addAttackSpeed = GlobalData.SpeedUp.petAttackSpeed;
            this.headUI?.startSpeed();
        } else {
            this.addAttackSpeed = 1;
            this.headUI?.stopSpeed();
        }
        switch (this._state) {
            case PetState.Idle:
                this.idleUpdate(dt);
                break;
            case PetState.Move:
                this.moveToRes(dt);
                break;
            case PetState.Attack:
                this.attackUpdate(dt);
                break;
        }
        this.movetoUpdate(dt);

        //播走路动画逻辑
        if (!this._petArrived && !this._isPlayingAni && this.pet instanceof Character) {
            this._ani = this.pet.loadAnimation("272622");
            this._ani.loop = 0;
            this._ani.play();
            this._isPlayingAni = true;
        } else if (this._petArrived && this._isPlayingAni) {
            this._ani.stop();
            this._isPlayingAni = false;
        }
    }

    //上一帧玩家移动状态
    private lastMoveState: boolean = false;

    /**改变为跟随状态 */
    private changeToIdle(): void {
        if (!this.owner) return;
        if (this.owner == this.currentChar) {
            this.ownerBe.onPetBackNormal(this);
        }
        if (this.currentEffect) {
            EffectService.stop(this.currentEffect);
            this.currentEffect = null;
        }
        this.changeIdle();

    }

    public changeIdle(): void {
        this.attackTween?.stop();
        this.attackTween = null;
        this._targetRes = null;
        this.targetPos = null;
        this.resPos = null;
        this._state = PetState.Idle;
        this.accelerateNum = 0;
        this.isStop = false;
        if (this.attackPrivot) this.attackPrivot.localTransform.rotation = mw.Rotation.zero;
        UIService.getUI(P_HudPetGift)?.changePetState(this.key, PetState.Idle);
    }

    //当前显影状态
    private isVisible: boolean = true;

    /**宠物显影 */
    public changeVisible(isVisible: boolean): void {
        if (!this.pet) return;
        if (this.isVisible == isVisible) return;
        this.isVisible = isVisible;
        if (isVisible) {
            this.headUI.show();
            utils.showAllChildExcept(this.pet, true, "attack");
        } else {
            this.headUI.hide();
            utils.showAllChildExcept(this.pet, false);
        }
    }

    /**跟随玩家idle状态 */
    private idleUpdate(dt: number): void {
        if (this.isStop && !this.owner.isMoving) return;
        if (this.isMove) return;
        if (!this.disPos) return;
        if (this.arrow) {
            this.arrow.destroy();
            this.arrow = null;
        }
        this.isStop = false;

        this._petArrived = false;
        let ownerTransform = this.ownerTransform;
        if (!ownerTransform) return;
        let petTransform = getTransform(this.pet);//TODO：大消耗点 pc端100次调用耗时10ms
        let endPos = ownerTransform.transformPosition(this.disPos);
        petTransform.lookAt(endPos);
        let endRot = petTransform.rotation;
        if (this.petInfo.CharacterType === GlobalData.PetCharacterType.GameObject) {
            endRot.set(0, 0, endRot.z + 180);
        } else if (this.petInfo.CharacterType === GlobalData.PetCharacterType.Character) {
            endRot.set(0, 0, endRot.z);
        }

        if (!this.movetoOwnerUpdate(dt, petTransform, new mw.Transform(endPos, endRot, petTransform.scale))) return;

        let currentMoveState = this.owner.isMoving;
        if (!this.lastMoveState && !currentMoveState) return;
        if (this.lastMoveState && !currentMoveState) {  // 上次移动，这次不移动时
            this.lastMoveState = false;
            endPos = this.keepOnGround(endPos, ownerTransform.position);
            if (this.petInfo.CharacterType === GlobalData.PetCharacterType.GameObject) {
                endPos.z += this.height;
            }
            this.moveto(endPos, endRot);
            return;
        }
        this.isMove = false;
        this.changeToPos(dt, petTransform, endPos, endRot);
        this.lastMoveState = this.owner.isMoving;

    }

    /**移动至玩家身后 */
    private movetoOwnerUpdate(dt: number, startTransform: mw.Transform, endTransform: mw.Transform): boolean {
        const currentPos = startTransform.position;
        let endPos = endTransform.position;
        let endRot = endTransform.rotation;//11ms
        let dis = VectorUtil.distancePlane(currentPos, endPos);
        let speed = this.speed * dt;

        if (dis <= speed) {
            this.isMove = false;
            endRot = this.ownerTransform.rotation;
            endPos = this.keepOnGround(endPos);

            if (this.petInfo.CharacterType === GlobalData.PetCharacterType.GameObject) {
                endPos.z += this.height;
                endRot.set(0, 0, endRot.z + 180);
            } else if (this.petInfo.CharacterType === GlobalData.PetCharacterType.Character) {
                endRot.set(0, 0, endRot.z);
            }

            if (this.owner.isMoving) {
                this.changeToPos(dt, startTransform, endPos, endRot);
            } else {
                this.moveto(endPos, endRot);
            }
            return true;
        }

        let dir = VectorUtil.directionPlane(currentPos, endPos);
        let move = mw.Vector.multiply(dir, speed);
        endPos.x = currentPos.x + move.x;
        endPos.y = currentPos.y + move.y;
        this.changeToPos(dt, startTransform, endPos, endRot);
        return false;
    }

    private changeToPos(dt: number, petTransform: mw.Transform, endPos: mw.Vector, endRot: mw.Rotation): void {
        if (this.attackTween) {
            this.attackTween.stop();
            this.attackTween = null;
        }
        endPos = this.keepOnGround(endPos);
        if (this.petInfo.CharacterType === GlobalData.PetCharacterType.GameObject) {
            endPos.z += this.height;
            this.jump(dt, endPos, endRot);
        }

        if (GlobalData.pet.isSmoothLerp) {
            const t = GlobalData.pet.smoothValue;
            //耗时2-3ms
            mw.Vector.lerp(petTransform.position, endPos, t, endPos);
            endRot = mw.Rotation.lerp(petTransform.rotation, endRot, t);
        }
        petTransform.position = endPos;
        petTransform.rotation = endRot;
        setTransform(this.pet, petTransform);
    }

    public tarResPoint: number = 0;
    /**资源点坐标 */
    private resPos: mw.Vector = null;
    /**目标点坐标 */
    private targetPos: mw.Vector = null;
    /**当前宠物移动速度 */
    private speed: number = 1000;
    /**当前宠物追击速度 */
    private chaseSpeed: number = 1000;
    /**当前引导 */
    private arrow: Arrow;
    /**当前特效 */
    private currentEffect: number = null;
    /**当前目标资源 */
    private _targetRes: ResourceScript = null;
    public get targetRes(): ResourceScript {
        return this._targetRes;
    }

    /**增加目标 */
    public addTarget(resPoint: number): void {
        if (!ModuleService.getModule(EnergyModuleC).isAfford(GameServiceConfig.STAMINA_COST_PET_ATTACK)) {
            Log4Ts.error(PetBehavior, "体力不足！");
            if (this.owner == this.currentChar) {
                TipsManager.instance.showTip(GameConfig.Language.StaminaNotEnough.Value);
            }
            this.changeToIdle();
            this.attackRotY = 0;
            return;
        }
        if (!this.pet) return;
        if (this.attackTween) {
            this.attackTween.stop();
            this.attackTween = null;
        }
        SoundManager.instance.play3DSound(GlobalData.Music.petFight, this.pet);
        // let gameObject = GameObject.findGameObjectById(resGuid);
        // if (!gameObject) return;
        this.tarResPoint = resPoint;
        this._state = PetState.Move;
        this.startMove();
        let cfg = GameConfig.DropPoint.getElement(resPoint);
        if (!cfg || !SceneResourceMap.get(cfg.areaID)) return;

        let res = SceneResourceMap.get(cfg.areaID).find((item) => {
            return item.pointId == resPoint;
        });
        if (!res || !res.curPos) {
            this.changeToIdle();
            oTraceError("宠物找不到资源点" + resPoint);
            return;
        }
        this.resPos = res.curPos;

        this._targetRes = res;
        const dis = GlobalData.pet.attackDistance;
        //以资源点为圆心，距离为半径，在圆上随机一个点
        if (!this.targetPos) this.targetPos = new mw.Vector();
        this.getRandomPointOnCircle(this.resPos, dis, this.targetPos);
        this.targetPos = this.keepOnGround(this.targetPos, this.resPos);
        if (this.owner != this.currentChar) return;
        if (!this.arrow) this.arrow = new Arrow(this.position, this.resPos);
        //开始攻击
        UIService.getUI(P_HudPetGift)?.changePetState(this.key, PetState.Attack, resPoint);
    }

    private getRandomPointOnCircle(center: mw.Vector, radius: number, end: mw.Vector): void {
        const angle = Math.random() * Math.PI * 2; // 随机生成一个角度
        const x = center.x + radius * Math.cos(angle); // 计算x坐标
        const z = center.z; //  z坐标与圆心相同
        const y = center.y + radius * Math.sin(angle); //
        end.set(x, y, z);
    }

    //移动到资源点
    private moveToRes(dt: number): void {
        if (!this.targetPos) return;
        let petTransform = getTransform(this.pet);
        petTransform.lookAt(this.resPos);
        let endPos = petTransform.position;
        let endRot = petTransform.rotation;
        if (this.petInfo.CharacterType === GlobalData.PetCharacterType.GameObject) {
            endRot.z += 180;
        }
        endRot.x = 0;
        endRot.y = 0;
        //根据宠物移动速度向资源点移动
        let dir = mw.Vector.subtract(this.targetPos, endPos);
        let dis = dir.length;
        let moveDis = this.chaseSpeed * dt;
        if (dis < moveDis) {
            if (this.petInfo.CharacterType === GlobalData.PetCharacterType.Character && this.pet instanceof Character) {
                let pos = this.targetPos.clone().subtract(new Vector(0, 0, this.pet.description.advance.bodyFeatures.body.height * GlobalData.pet.chaUnitHeight));
                this.arrow?.update(pos, this.resPos);
            } else {
                this.arrow?.update(this.targetPos, this.resPos);
            }

            this._state = PetState.Attack;
            if (this.petInfo.CharacterType === GlobalData.PetCharacterType.GameObject) {
                this.moveto(new mw.Vector(this.targetPos.x, this.targetPos.y, this.targetPos.z + this.height), endRot);
            } else if (this.petInfo.CharacterType === GlobalData.PetCharacterType.Character && this.pet instanceof Character) {
                this.moveto(new mw.Vector(this.targetPos.x, this.targetPos.y, this.targetPos.z), endRot);
            }

            this.stopMove();
            return;
        }
        this.isMove = false;
        dir.normalize();
        if (moveDis > dis) moveDis = dis;
        let move = mw.Vector.multiply(dir, moveDis);
        endPos.x += move.x;
        endPos.y += move.y;

        endPos = this.keepOnGround(endPos);
        if (this.petInfo.CharacterType === GlobalData.PetCharacterType.Character && this.pet instanceof Character) {
            let pos = this.position.clone().subtract(new Vector(0, 0, this.pet.description.advance.bodyFeatures.body.height * GlobalData.pet.chaUnitHeight));
            this.arrow?.update(pos, this.resPos);
        } else {
            this.arrow?.update(this.position, this.resPos);
        }

        if (this.petInfo.CharacterType === GlobalData.PetCharacterType.GameObject) {
            this.jump(dt, endPos, endRot);
        }
        if (GlobalData.pet.isSmoothLerp) {
            const t = GlobalData.pet.smoothValue;
            mw.Vector.lerp(petTransform.position, endPos, t, endPos);
            endRot = mw.Rotation.lerp(petTransform.rotation, endRot, t);
        }
        petTransform.position = endPos;
        petTransform.rotation = endRot;
        setTransform(this.pet, petTransform);
        this._petArrived = false;
    }

    private endPos: mw.Vector = mw.Vector.zero;
    private endRot: mw.Rotation = mw.Rotation.zero;
    private isMove: boolean = false;

    public isStop: boolean = false;

    private moveto(endPos: mw.Vector, endRot: mw.Rotation): void {
        this.stopMove();
        this.endPos = endPos;
        this.endRot = endRot;
        this.isMove = true;
        this._petArrived = true;
    }

    /**移动至endPos和endRot */
    private movetoUpdate(dt: number): void {
        if (!this.isMove) return;
        let petTransform = getTransform(this.pet);
        if (petTransform.position.equals(this.endPos, 30)) {
            this.isMove = false;
            if (!this.owner.isMoving) this.isStop = true;
            petTransform.position = this.endPos;
            petTransform.rotation = this.endRot;
            if (this._state == PetState.Idle) {
                petTransform.rotation = this.owner.worldTransform.rotation;
                if (this.petInfo.CharacterType === GlobalData.PetCharacterType.GameObject) {
                    petTransform.rotation.z += 180;
                }
            }
            setTransform(this.pet, petTransform);
            return;
        }
        let endPos = mw.Vector.lerp(petTransform.position, this.endPos, 0.1);
        let endRot = mw.Rotation.lerp(petTransform.rotation, this.endRot, 0.1);
        petTransform.position = endPos;
        petTransform.rotation = endRot;
        setTransform(this.pet, petTransform);

    }

    private _attackPrivot: mw.GameObject = null;
    private attackTween: mw.Tween<{ y: number }> = null;
    private attackRotY: number = 0;

    /**攻击点 */
    private get attackPrivot(): mw.GameObject {
        if (!this._attackPrivot) {
            this._attackPrivot = this.pet.getChildByName("attack");
        }
        return this._attackPrivot;
    }

    /**攻击轮询 */
    private attackUpdate(dt: number): void {
        if (!this.targetRes) return;
        if (!this.isResAlive()) return;
        if (!this.attackTween) {
            this.attackTweenInit();
        }
        if (!this.attackPrivot) {
            let pTransform = getTransform(this.pet);
            let rot = pTransform.rotation.clone();
            pTransform.rotation = new mw.Rotation(rot.x, this.attackRotY, rot.z);
            setTransform(this.pet, pTransform);
        } else {
            this.attackPrivot.localTransform.rotation = new mw.Rotation(0, this.attackRotY, 0);
        }
    }

    private _attackAni: Animation;

    private attackTweenInit(): void {

        if (this.petInfo.CharacterType === GlobalData.PetCharacterType.GameObject) {
            const bezier = GlobalData.pet.attackBezier;
            let time = GlobalData.pet.attackTime;
            if (this.owner == this.currentChar) time = GlobalData.pet.attackTime / GlobalData.LevelUp.petAttackSpeed(Player.localPlayer.playerId) / this.addAttackSpeed;
            this.attackTween = new mw.Tween<{ y: number }>({y: 0}).to({
                y: [-30, 0],
            }, time).onUpdate((obj) => {
                this.attackRotY = obj.y;
            }).onComplete(() => {
                if (this.attack()) {
                    this.changeToIdle();
                    this.attackRotY = 0;
                    return;
                }
                this.attackTweenInit();
                //播放特效
                this.playAttackEffect();

            }).start().easing(cubicBezier(bezier[0], bezier[1], bezier[2], bezier[3]));
        } else if (this.petInfo.CharacterType === GlobalData.PetCharacterType.Character && this.pet instanceof Character && (!this._attackAni || !this._attackAni.isPlaying)) {
            this._attackAni = this.pet.loadAnimation(GlobalData.pet.chaAttackAnimGuid);
            this._attackAni.loop = 1;
            let time = GlobalData.pet.attackTime;
            if (this.owner == this.currentChar) time = GlobalData.pet.attackTime / GlobalData.LevelUp.petAttackSpeed(Player.localPlayer.playerId) / this.addAttackSpeed;
            this._attackAni.speed = this._attackAni.length * 1000 / time;
            this._attackAni.onFinish.add(() => {
                if (this.attack()) {
                    this.changeToIdle();
                    this.attackRotY = 0;
                    this._ani.stop();
                    return;
                }
                //播放特效
                this.playAttackEffect();
            });
            this._attackAni.play();

        }
    }

    /**播放攻击特效 */
    private playAttackEffect(): void {
        if (this.owner != this.currentChar) return;
        if (this.currentEffect) {
            EffectService.stop(this.currentEffect);
            this.currentEffect = null;
        }
        let index = this.petInfo.MoveWay == 1 ? 0 : 1;

        if (this.petInfo.CharacterType === 0) {
            this.currentEffect = GeneralManager.rpcPlayEffectOnGameObject(
                GlobalData.pet.qualityEffArr[this.petInfo.QualityType - 1],
                this.pet,
                1,
                GlobalData.pet.attackEffectOffset[index][this.petInfo.QualityType - 1],
                GlobalData.pet.attackEffectRotation[index][this.petInfo.QualityType - 1],
                GlobalData.pet.attackEffectScale[index][this.petInfo.QualityType - 1],
            );
        } else if (this.petInfo.CharacterType === 1) {

            this.currentEffect = GeneralManager.rpcPlayEffectOnGameObject(
                GlobalData.pet.qualityEffArr[this.petInfo.QualityType - 1],
                this.pet,
                1,
                GlobalData.pet.chaAttackEffectOffset[index][this.petInfo.QualityType - 1],
                GlobalData.pet.chaAttackEffectRotation[index][this.petInfo.QualityType - 1],
                GlobalData.pet.attackEffectScale[index][this.petInfo.QualityType - 1],
            );
        }

    }

    /**判断资源是否还活着 */
    private isResAlive(): boolean {
        if (!this.targetRes || this.targetRes.Obj == null) {
            this.changeToIdle();
            return false;
        } else {
            if (this.targetRes.curHp <= 0) {
                this.changeToIdle();
                return false;
            }
        }
        return true;
    }

    /**攻击 */
    private attack(): boolean {
        if (this.owner != this.currentChar) return false;
        if (!this.targetRes) {
            this.changeToIdle();
            return true;
        } else {
            let energyModuleC = ModuleService.getModule(EnergyModuleC);
            if (energyModuleC.consumeViewEnergy(GameServiceConfig.STAMINA_COST_PET_ATTACK)) {

                let res = this.targetRes.injured(
                    this.owner.player.playerId,
                    this.key);
                if (res) {
                    this._targetRes = null;
                    this.targetPos = null;
                    this.resPos = null;
                    if (this.attackPrivot) this.attackPrivot.localTransform.rotation = mw.Rotation.zero;
                    this.changeToIdle();
                    // energyModuleC.consume(0, true);
                    Log4Ts.error(PetBehavior, "挖完了！");
                    return true;
                } else {
                    // energyModuleC.consume();
                    Log4Ts.error(PetBehavior, "扣1体力");
                }
            } else {
                Log4Ts.error(PetBehavior, "体力不足！");
                return true;
            }
        }
        return false;
    }

    /**宠物坐标保持在地面 大消耗点 100次调用7ms */
    private keepOnGround(endPos: mw.Vector, currentPos?: mw.Vector): mw.Vector {
        if (!currentPos) currentPos = this.ownerTransform.position;
        if (this.petInfo.CharacterType === GlobalData.PetCharacterType.GameObject && utils.frameCount < GlobalData.pet.gravityFrame && (this.owner != this.currentChar)) {
            endPos.z = currentPos.z - this.owner.collisionExtent.z;
            return endPos;
        }
        let start = new mw.Vector(endPos.x, endPos.y, endPos.z + 1000);
        let end = new mw.Vector(endPos.x, endPos.y, endPos.z - 1000);
        let hitResults = QueryUtil.lineTrace(start, end, true, false);
        let isSuccess = false;
        for (let i = 0; i < hitResults.length; i++) {
            const element = hitResults[i];
            let tag = element.gameObject.tag;
            if (!tag) continue;
            if (element.gameObject.tag.indexOf(GlobalData.pet.floorTag) != -1) {
                endPos = element.impactPoint;
                isSuccess = true;
                break;
            }
        }
        if (!isSuccess && this.petInfo.CharacterType === GlobalData.PetCharacterType.GameObject) endPos.z = currentPos.z - this.owner.collisionExtent.z;
        if (this.petInfo.CharacterType === GlobalData.PetCharacterType.Character && this.pet instanceof Character) endPos.z += this.pet.description.advance.bodyFeatures.body.height * GlobalData.pet.chaUnitHeight;
        return endPos;
    }

    private async onInfoChange(): Promise<void> {
        if (!this.headUI) {
            if (!this.pet) return;
            let guid = this.pet.gameObjectId;
            this.headUI = await HUDManager.instance.getHUDInfo(guid, this.pet, this.petName, this.petTitle, this.petInfo, this.clipDis);
            if (!this.owner) HUDManager.instance.recHUDInfo(guid);
        } else {
            this.headUI.updateInfo(this.petName, this.petTitle);
        }
    }

    /**蹦跶 */
    private jump(dt: number, currentPos: mw.Vector, currentRot: mw.Rotation): void {
        if (!this.moveEnd || !this.endTween) this.startMove();
        if (!this.moveEnd) return;
        if (this.moveEnd.jumpHeight <= 0 && this.petInfo.MoveWay == 1) {
            SoundManager.instance.play3DSound(GlobalData.Music.petMove, currentPos);
        }
        currentPos.z += this.moveEnd.jumpHeight;
        currentRot.y += this.moveEnd.yRot;
    }

    /**顺序 */
    private order: number = 0;

    private moveEnd: endInfo = new endInfo(0, 0);

    private endTween: mw.Tween<endInfo> = null;

    /**开始移动 */
    private startMove(): void {
        this.order = 0;
        this.endTween?.stop();
        this.tweenInit();
    }

    /**停止移动 */
    private stopMove(): void {
        this.order = 0;
        this.endTween?.stop();
        this.endTween = null;
        this.moveEnd = null;
    }

    private tweenInit(): void {
        const endInfos = this.petInfo.MoveWay == 1 ? GlobalData.pet.jumpOrder : GlobalData.pet.flyOrder;
        const bezier = this.petInfo.MoveWay == 1 ? GlobalData.pet.jumpBezier : GlobalData.pet.flyBezier;
        const time = this.petInfo.MoveWay == 1 ? GlobalData.pet.jumpTime : GlobalData.pet.flyTime;
        let start = endInfos[this.order];
        let end = endInfos[this.order + 1];
        this.endTween = new mw.Tween(start.clone()).to(end.clone(), time).onUpdate((obj) => {
            this.moveEnd = obj;
        }).onComplete(() => {
            this.order++;
            if (this.order >= endInfos.length - 1) this.order = 0;
            this.tweenInit();
        }).start().easing(cubicBezier(bezier[0], bezier[1], bezier[2], bezier[3]));
    }

}

