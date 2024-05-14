import { GeneralManager } from "../../Modified027Editor/ModifiedStaticAPI";
import { oTraceError } from "odin";
import { GlobalData } from "../../const/GlobalData";
import { SoundManager } from "../../util/SoundManager";
import { VectorUtil } from "../../util/VectorUtil";
import { petItemDataNew } from "../PetBag/PetBagModuleData";
import resourceScript from "../Resources/resource";
import { Accelerate, LongPress, rateEff } from "./Accelerate";
import PetBehavior, { PetState } from "./PetBehavior";
import { PlayerModuleC } from "./PlayerModuleC";
import { Skateboard } from "./Skateboard";
import { EnergyModuleS } from "../Energy/EnergyModule";
import Log4Ts from "../../depend/log4ts/Log4Ts";
import { EnchantBuff } from "../PetBag/EnchantBuff";

export class petInfo {
    key: string = "";
    attack: number = 0;
    tarPoint: number = 0;
    name: string = "";

    constructor(key: string, attack: number, tarPoint: number, name: string) {
        this.key = key;
        this.attack = attack;
        this.tarPoint = tarPoint;
        this.name = name;
    }
}

@Component
export default class PlayerBehavior extends mw.Script {

    /**玩家ID */
    @mw.Property({replicated: true, onChanged: "onInitClientHelper"})
    public charGuid: string = "";
    @mw.Property({replicated: true, onChanged: "onNameChanged"})
    public nickName: string = "";

    /**当前玩家 */
    private owner: mw.Character = null;

    /**当前所有宠物id 字符串表示 用逗号隔开 */
    @mw.Property({replicated: true, onChanged: "onPetsChange"})
    private pets: string = "";

    /**当前所有宠物 */
    private serverPets: petInfo[] = [];
    /**滑板装备状态 */
    @mw.Property({replicated: true, onChanged: "onSkateboardChanged"})
    public skateboardState: boolean = false;

    /**当前自己已跟随宠物数组 只能客户端获取 */
    private myFollowPets: PetBehavior[] = [];
    /**当前装备的滑板 只能客户端获取*/
    private mySkateboard: Skateboard = null;

    /**获取宠物行为 */
    public get PetArr(): PetBehavior[] {
        return this.myFollowPets;
    }

    //----------------------server----------------------

    public async initServer(guid: string, ...args: any[]) {
        this.charGuid = guid;
        this.owner = (await GameObject.asyncFindGameObjectById(this.charGuid)) as mw.Character;
    }

    /**装卸滑板 */
    public changeSkateboard(): boolean {
        this.skateboardState = !this.skateboardState;
        return this.skateboardState;
    }

    public renamePet(key: number, id: number, name: string): void {
        for (let pet of this.serverPets) {
            if (pet.key == key + "_" + id) {
                pet.name = name;
                break;
            }
        }
        this.pets = arrayToString(this.serverPets);
    }

    /**装备多个宠物 */
    public equipPets(petItems: petItemDataNew[]): boolean {
        for (let petItem of petItems) {
            if (this.serverPets.length >= GlobalData.pet.maxFollowCount) return false;
            this.serverPets.push(new petInfo(petItem.k + "_" + petItem.I, petItem.p.a, 0, petItem.p.n));
        }
        this.pets = arrayToString(this.serverPets);
        return true;
    }

    /**装备一个宠物 */
    public equipPet(key: string, atk: number, name: string): boolean {
        if (this.serverPets.length >= GlobalData.pet.maxFollowCount) return false;
        this.serverPets.push(new petInfo(key, atk, 0, name));
        this.pets = arrayToString(this.serverPets);
        return true;
    }

    /**取消装备多个宠物 */
    public unEquipPets(petItems: petItemDataNew[]): void {
        // if (petItems.length == 1) {
        //     this.unEquipPet(petItems[0].k + "_" + petItems[0].I);
        //     return;
        // }
        let str: string[] = [];
        petItems.forEach(petItem => {
            str.push(petItem.k + "_" + petItem.I);
        });
        this.unEquipPet(str);
        // this.serverPets.length = 0;
        // this.pets = "";
    }

    /**取消装备一个宠物 */
    public unEquipPet(key: string[]): boolean {
        //let index = 0;
        // for (let i = 0; i < this.serverPets.length; i++) {
        //     if (this.serverPets[i].key == key) {
        //         index = i;
        //     }
        // }

        key.forEach(element => {
            let index = this.serverPets.findIndex(pet => pet.key == element);
            if (index != -1)
                this.serverPets.splice(index, 1);
        });
        this.pets = arrayToString(this.serverPets);
        return true;
    }

    /**改变当前宠物目标 */
    @RemoteFunction(mw.Server)
    private changePetTarget(key: string, target: number): void {
        for (let pet of this.serverPets) {
            if (pet.key == key) {
                pet.tarPoint = target;
                break;
            }
        }
        this.pets = arrayToString(this.serverPets);
    }

    /**改变所有宠物目标 */
    @RemoteFunction(mw.Server)
    private changeAllPetTarget(tarPoint: number): void {
        //是否所有宠物目标都是同一个
        let isSame = true;
        for (let pet of this.serverPets) {
            if (pet.tarPoint != tarPoint) isSame = false;
        }
        if (isSame) tarPoint = 0;
        for (let pet of this.serverPets) {
            pet.tarPoint = tarPoint;
        }
        this.pets = arrayToString(this.serverPets);
    }

    /**多个宠物取消目标 */
    @RemoteFunction(mw.Server)
    private petsUnTarget(keys: string[]): void {
        for (let pet of this.serverPets) {
            for (let key of keys) {
                if (pet.key == key) {
                    pet.tarPoint = 0;
                    break;
                }
            }
        }
        this.pets = arrayToString(this.serverPets);
    }

    // /**销毁所有宠物 */
    // public destroyAllPet(): void {
    //     this.serverPets.length = 0;
    //     this.pets = "";
    // }

    /**玩家触发传送 */
    public teleport(id: number): void {
        for (let pet of this.serverPets) {
            pet.tarPoint = 0;
        }
        this.pets = arrayToString(this.serverPets, true);
    }

    private serverUpdate(dt: number): void {

    }

    private serverDestroy(): void {
        oTraceError("PlayerBehavior serverDestroy");
    }

    //----------------------client----------------------

    /**玩家模块 */
    private playerModuleC: PlayerModuleC = null;
    /**当前客户端玩家 */
    private currentChar: mw.Character = null;
    private _currentTransform = new mw.Transform();
    /**当前宠物攻击特效 */
    private petAttackEffect: rateEff[] = [];

    /**当前坐标信息 */
    public set currentTransform(tran: mw.Transform) {
        this._currentTransform = tran;
    };

    public get currentTransform(): mw.Transform {
        if (!this._currentTransform) this._currentTransform = this.currentChar.worldTransform;
        return this._currentTransform;
    }

    private clientInit(): void {
        Player.asyncGetLocalPlayer().then((player) => {
            this.currentChar = player.character;
        });
        this.playerModuleC = ModuleService.getModule(PlayerModuleC);
        this.useUpdate = true;
    }

    /**判断当前是否有宠物正在攻击 */
    public get isPetAttack(): boolean {
        for (let pet of this.myFollowPets) {
            if (pet.isAttack) return true;
        }
        return false;
    }

    /**单击攻速按钮 */
    public onClickAttackSpeed(): boolean {
        let hasAttack = false;
        for (let pet of this.myFollowPets) {
            if (pet.isAttack) {
                let eff = new Accelerate(pet, this.currentChar);
                eff.init();
                hasAttack = true;
                this.petAttackEffect.push(eff);
            }
        }
        return hasAttack;
    }

    /**长按攻速按钮 */
    public onLongPressAttackSpeed(): void {
        for (let pet of this.myFollowPets) {
            if (pet.isAttack) {
                let eff = new LongPress(pet, this.currentChar);
                this.petAttackEffect.push(eff);
            }
        }
    }

    /**松开攻速按钮 */
    public onReleaseAttackSpeed(): void {
        for (let eff of this.petAttackEffect) {
            eff.destroy();
        }
        this.petAttackEffect.length = 0;
    }

    /**
     * 点击可破坏物
     * @param res
     * @param isTouch
     * @returns
     */
    public onClickDestroyable(res: resourceScript, isTouch: boolean): void {
        let targetPos = res.Obj.worldTransform.position;
        if (isTouch) {
            this.changeAllPetTarget(res.pointId);
            return;
        }
        for (let pet of this.myFollowPets) {
            if (pet.isReady && pet.state == PetState.Idle) {
                //TODO 优化宠物攻击同步 ，Guid同一样了现在，换其他唯一的属性
                this.changePetTarget(pet.petId, res.pointId);
                return;
            }
        }
        let dis = 0;
        let nPet: PetBehavior = null;
        let pets: PetBehavior[] = [];
        /**遍历所有宠物，寻找最近的一个 */
        for (let pet of this.myFollowPets) {
            if (pet.targetRes && pet.targetRes == res) {
                pets.push(pet);
                continue;
            }
            let tempDis = VectorUtil.squaredDistancePlane(targetPos, pet.position);
            if (tempDis == null) continue;
            if (dis == 0 || tempDis < dis) {
                dis = tempDis;
                nPet = pet;
            }
        }
        if (!nPet) {
            this.onPetsBackNormal(pets);
            return;
        }
        this.changePetTarget(nPet.petId, res.pointId);
    }

    /**多个宠物回归正常状态 */
    public onPetsBackNormal(pets: PetBehavior[]): void {
        let keys: string[] = [];
        for (let pet of pets) {
            keys.push(pet.petId);
        }
        this.petsUnTarget(keys);
    }

    /**宠物回归正常状态 */
    public onPetBackNormal(pet: PetBehavior): void {
        this.changePetTarget(pet.petId, 0);
    }

    /**初始化完成回调 客户端初始化*/
    private async onInitClientHelper() {
        this.owner = (await GameObject.asyncFindGameObjectById(this.charGuid)) as mw.Character;
        let player = GlobalData.Player;
        GeneralManager.modifyaddOutlineEffect(this.owner, player.strokeColor, player.strokeWidth, player.strokeDepthBias, player.strokeRange);
        if (!(this.owner == this.currentChar)) return;
        ModuleService.getModule(PlayerModuleC).initBehaviors(this);
    }

    private clientDestroy(): void {
        oTraceError("PlayerBehavior clientDestroy");
        this.owner = null;
        if (this.moveSoundId) SoundService.stop3DSound(this.moveSoundId);
        this.myFollowPets.forEach(pet => {
            pet.destroy();
        });
        if (this.mySkateboard) {
            this.mySkateboard.unEquipBoard(this.owner, this.currentChar);
            this.mySkateboard = null;
        }
    }

    private async onNameChanged(): Promise<void> {
        if (Player.localPlayer.character.gameObjectId == this.charGuid) {
            oTraceError("PlayerBehavior onNameChanged");
            Player.localPlayer.character.overheadUI.setVisibility(mw.PropertyStatus.Off);
            return;
        }
        oTraceError("PlayerBehavior onNameChanged other");
        if (!this.owner) {
            this.owner = (await GameObject.asyncFindGameObjectById(this.charGuid)) as mw.Character;
            if (!this.owner) {
                return;
            }
        }
        let uiObj = this.owner.overheadUI;
        if (!uiObj) return;
        uiObj.widgetSpace = mw.WidgetSpaceMode.OverheadUI;
        uiObj.setUIbyID("D0BED12042B4E55DD2BA4BAEC52D989B");
        uiObj.headUIMaxVisibleDistance = GlobalData.worldUI.headUIMAxVisDistance;
        uiObj.occlusionEnable = false;
        uiObj.selfOcclusion = true;
        uiObj.localTransform.position = (GlobalData.worldUI.playerHeadUIOffset);
        let targetUI = uiObj.getTargetUIWidget();
        let txt_name = targetUI.findChildByPath("RootCanvas/mUserName") as mw.TextBlock;
        txt_name.text = this.nickName;
        uiObj.setVisibility(mw.PropertyStatus.On);
    }

    private async onPetsChange(): Promise<void> {
        if (!this.owner) await this.onInitClientHelper();
        if (!this.owner) {
            return;
        }
        try {
            this.currentTransform = this.owner.worldTransform.clone();
        } catch (error) {
        }
        if (this.pets.indexOf("/teleport1") != -1 || this.pets.indexOf("/teleport2") != -1) {
            this.pets = this.pets.replace("/teleport1", "");
            this.pets = this.pets.replace("/teleport2", "");
            this.myFollowPets.forEach(pet => {
                pet.destroy();
            });
            this.myFollowPets.length = 0;
        }
        if (this.pets == "") {
            this.myFollowPets.forEach(pet => {
                pet.destroy();
            });
            this.myFollowPets.length = 0;
            return;
        }
        let arr = stringToArray(this.pets);
        let destorys: PetBehavior[] = [];
        for (let i = 0; i < this.myFollowPets.length; i++) {
            let pet = this.myFollowPets[i];
            let id = pet.petId;
            //如果当前宠物不在列表中 则销毁
            if (arr.findIndex(pet => pet.key == id) == -1) {
                destorys.push(pet);
            } else {
                let index = arr.findIndex(pet => pet.key == id);
                let info = arr[index];
                if (pet.petName != info.name) pet.reName(info.name);
                if (pet.state == PetState.Idle && info.tarPoint != 0) {
                    pet.addTarget(info.tarPoint);
                } else if (info.tarPoint != 0 && pet.tarResPoint != info.tarPoint) {
                    pet.addTarget(info.tarPoint);
                } else if (pet.state != PetState.Idle && info.tarPoint == 0) {
                    pet.changeIdle();
                }
                arr.splice(index, 1);
            }
        }
        //销毁不需要的宠物
        destorys.forEach(pet => {
            pet.destroy();
            let index = this.myFollowPets.findIndex(p => p.petId == pet.petId);
            this.myFollowPets.splice(index, 1);
        });
        //剩下的就是需要创建的宠物

        arr.forEach(petInfo => {
            let pet = new PetBehavior();
            pet.init(petInfo.key, petInfo.attack, petInfo.name, this.owner, this.currentChar, this);
            this.myFollowPets.push(pet);
        });

        this.myFollowPets.forEach(pet => pet.isStop = false);

    }

    private idlePets: PetBehavior[] = [];

    /**改变跟随宠物相对坐标 */
    private changeFollowDis(): void {
        let disOffests = GlobalData.pet.followOffsets;
        this.idlePets.length = 0;
        this.myFollowPets.forEach(pet => {
            if (pet.isReady && pet.state == PetState.Idle) this.idlePets.push(pet);
        });
        if (this.idlePets.length == 0) return;
        let disOffest = disOffests[this.idlePets.length - 1];
        this.idlePets.forEach((pet, index) => {
            pet.disPos = disOffest[index];
        });
    }

    private clientUpdate(dt: number): void {
        if (!this.owner) return;
        try {
            this.playerMoveJump();
        } catch (error) {
            console.error(error);
        }
        this.changeFollowDis();
        if (this.myFollowPets.length <= 0) {
            this.currentTransform = null;
            return;
        }
        if (!this.owner.worldTransform) return;
        try {
            this.currentTransform = this.owner.worldTransform.clone();
        } catch (error) {
        }
        if (this.owner == this.currentChar) {
            this.monterUpdate(dt);
        } else {
            this.otherClientUpdate(dt);
        }
    }

    /**主控端轮询 */
    private monterUpdate(dt: number): void {
        this.myFollowPets.forEach(pet => {
            pet.update(dt, this.currentTransform);
        });
        for (let i = 0; i < this.petAttackEffect.length; i++) {
            let eff = this.petAttackEffect[i];
            eff.update(dt);
            if (eff.isDestroy) {
                this.petAttackEffect.splice(i, 1);
                i--;
            }
        }
    }

    /**其他客户端轮询 */
    private otherClientUpdate(dt: number): void {
        // let curPlayer = PlayerModuleC.curPlayer;
        // let pos = null;
        // if (curPlayer) {
        //     pos = curPlayer.currentTransform.location;
        // } else {
        //     pos = Player.localPlayer.character.worldTransform.position;
        // }
        // let dis = VectorUtil.squaredDistancePlane(pos, this.currentTransform.location);
        this.myFollowPets.forEach(pet => {
            pet.changeVisible(true);
            pet.update(dt, this.currentTransform);
        });
    }

    //玩家上一帧是否跳跃
    private lastJump: boolean = false;
    //玩家上一帧是否移动
    private lastMove: boolean = false;
    /**当前玩家移动音效id */
    private moveSoundId: number = 0;

    /**玩家移动跳跃判断 */
    public playerMoveJump(): void {
        let currentJump = this.owner.isJumping;
        let currentMove = this.owner.isMoving;
        //玩家由静止变为移动
        if (!this.lastMove && currentMove && !currentJump) {
            if (!this.moveSoundId) {
                this.moveSoundId = SoundManager.instance.play3DSoundLoop(GlobalData.Music.footStep, this.owner);
                return;
            }
        }
        //玩家由移动变为静止
        if (this.lastMove && !currentMove) {
            if (this.moveSoundId) SoundService.stop3DSound(this.moveSoundId);
            this.moveSoundId = 0;
        }
        //玩家由跳跃变为静止
        if (this.lastJump && !currentJump) {
            SoundManager.instance.play3DSound(GlobalData.Music.land, this.owner);
        }
        this.lastJump = currentJump;
        this.lastMove = currentMove;
    }

    /**所有宠物显影 */
    public setAllPetVisible(visible: boolean): void {
        this.myFollowPets.forEach(pet => {
            pet.changeVisible(visible);
        });
    }

    /**滑板装卸 */
    private async onSkateboardChanged(): Promise<void> {
        if (!this.owner) await this.onInitClientHelper();
        if (!this.owner) {
            return;
        }
        if (!this.skateboardState && this.mySkateboard) {
            this.mySkateboard.unEquipBoard(this.owner, this.currentChar);
            this.mySkateboard = null;
        } else if (this.skateboardState && !this.mySkateboard) {
            this.mySkateboard = new Skateboard();
            this.mySkateboard.equipBoard(this.owner, this.currentChar);
        }
    }

    /**续播滑板动画 */
    public onSkateboardContinue(): void {
        if (!this.mySkateboard) return;
        this.mySkateboard.continueAnimation();
    }

    //----------------------life cycle----------------------

    protected onStart(): void {
        if (SystemUtil.isClient()) this.clientInit();
    }

    protected onUpdate(DeltaTime: number): void {
        if (SystemUtil.isClient()) this.clientUpdate(DeltaTime);
        if (SystemUtil.isServer()) this.serverUpdate(DeltaTime);
    }

    protected onDestroy(): void {
        if (SystemUtil.isClient()) this.clientDestroy();
        if (SystemUtil.isServer()) this.serverDestroy();
    }

    @RemoteFunction(mw.Server)
    petReqAttack(petBehavior: PetBehavior) {
        const index = this.PetArr.indexOf(petBehavior);
        if (index < 0) return;

        let energyModuleS = ModuleService.getModule(EnergyModuleS);
        if (energyModuleS.isAfford(this.owner.player.playerId)) {
            let res = petBehavior.targetRes.injured(petBehavior.owner.player.playerId,
                petBehavior.attackDamage * GlobalData.LevelUp.petDamage * (1 + EnchantBuff.getPetBuff(petBehavior.key).damageAdd / 100), petBehavior.key);
            if (res) {
                petBehavior._targetRes = null;
                petBehavior.targetPos = null;
                petBehavior.resPos = null;
                if (petBehavior.attackPrivot) petBehavior.attackPrivot.localTransform.rotation = mw.Rotation.zero;

                energyModuleS.consume(petBehavior.owner.player.playerId, 0);
                Log4Ts.error(PetBehavior, "挖完了！");
                return true;
            } else {
                energyModuleS.consume(this.owner.player.playerId, 1);
                Log4Ts.error(PetBehavior, "扣1体力");
            }
        } else {
            Log4Ts.error(PetBehavior, "体力不足！");
            return true;
        }

    }
}

let isFirst = true;

/**数组转换为字符串 */
function arrayToString(array: petInfo[], isTeleport: boolean = false): string {
    isFirst = !isFirst;
    let str = "";
    array.forEach(element => {
        str += element.key + "-" + element.attack + "-" + element.tarPoint + "-" + element.name + ",";
    });
    if (isTeleport) {
        str = str + (isFirst ? "/teleport1" : "/teleport2");
    }
    return str;
}

/**字符串转换为数组 */
function stringToArray(str: string): petInfo[] {
    let array: petInfo[] = [];
    let strs = str.split(",");
    strs.forEach(element => {
        let info = element.split("-");
        if (info.length != 4) return;
        array.push(new petInfo(info[0], Number(info[1]), Number(info[2]), info[3]));
    });
    return array;
}