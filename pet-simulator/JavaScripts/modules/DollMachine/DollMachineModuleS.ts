import { oTraceError } from "odin";
import { GameConfig } from "../../config/GameConfig";
import { BagTool } from "../PetBag/BagTool";
import { DollMachineModuleC, DollType } from "./DollMachineModuleC";
import { PetBagModuleS } from "../PetBag/PetBagModuleS";
import { IDollMachineElement } from "../../config/DollMachine";
import { GlobalData } from "../../const/GlobalData";
import GToolkit from "../../utils/GToolkit";



/**娃娃机服务端类 */
class DollMachineS {

    /**配置信息 */
    public machineConfig: IDollMachineElement;
    /**钩子 */
    public hook: mw.GameObject = null;
    /**娃娃机id */
    public id: number;

    /**当前操作的玩家 */
    public curPlayer: mw.Player = null;
    /** 娃娃机XY方向的速度*/
    public hookSpeedX = 0;
    public hookSpeedY = 0;

    /**绳子 */
    public rope: mw.GameObject = null;
    /**钩子初始位置 */
    public hookPrimaryPos: Vector = null;
    /**娃娃机边界点数组(XY平面) */
    public machineEdgePointList: Vector[] = [];
    /**娃娃机边界点数组(XY平面)(加大版 用于检测娃娃穿模出娃娃机) */
    public machineEdgePointListPlus: Vector[] = [];
    /**四个爪子 */
    public claws: mw.GameObject[] = [];
    /** 宠物蛋生成位置 */
    public eggGeneratePosList: Vector[] = [];
    /**娃娃机边界标志物体 */
    public dollMachineSymbolObj: GameObject = null;
    /**各个娃娃机的扭蛋set (索引从1开始) */
    public eggSet: Set<GameObject> = new Set<GameObject>();
    /**创建蛋定时任务Id */
    public createEggTaskId: number = null;
    /**检查蛋定时任务Id */
    public checkEggTaskId: number = null;


    /**
     * 一台娃娃机对应的配置信息
     * @param config 
     */
    constructor(config: IDollMachineElement) {
        this.id = config.id;
        this.machineConfig = config;
        this.init();
    }

    public init() {

        this.initObj();
        this.findEdgePoints();
        this.initCreate();
        this.initTriggers();
        this.StartCheckEggPosTask();
        console.log(`初始化娃娃机id: ${this.id} 成功`)
    }

    /**初始化游戏对象 */
    private initObj() {
        // 绳索和抓钩
        this.hook = GameObject.findGameObjectById(this.machineConfig.Hook);
        this.rope = GameObject.findGameObjectById(this.machineConfig.Rope);
        // 缓存抓钩的初始位置
        this.hookPrimaryPos = this.hook.worldTransform.position;
        // 设置绳子位置和抓钩一致
        this.rope.worldTransform.position = this.hook.worldTransform.position

        // 娃娃机边界标志物体
        this.dollMachineSymbolObj = GameObject.findGameObjectById(this.machineConfig.Marker);

        // 四个勾爪
        let clawArr = this.machineConfig.Claws;
        for (let i = 0; i < clawArr.length; i++) {
            const element = clawArr[i];
            this.claws.push(GameObject.findGameObjectById(element));
            this.claws[i].localTransform.rotation = GlobalData.DollMachine.ClawArrRota[0][i];
        }
    }

    /** 初始化触发器 */
    private initTriggers() {
        // 娃娃掉落触发器
        let dropTrigger = GameObject.findGameObjectById(this.machineConfig.Trigger) as Trigger;
        dropTrigger.onEnter.add((obj) => {
            console.log(`娃娃机 id=${this.id}抓到了: ${obj.name}`)
            ModuleService.getModule(DollMachineModuleS).onDollDrop(obj, this.id);
        })
    }

    /** 获取娃娃机的四个边界点(XY平面) */
    private findEdgePoints() {
        let symbolObj = GameObject.findGameObjectById(this.machineConfig.Marker);
        // 获取包围盒 , 其中向量乘以的数值为 模型在缩放为1 且模型方向垂直于世界坐标轴时的包围盒大小
        let clawBoxVector = this.hook.worldTransform.scale.clone().multiply(18.32);
        // 设置抓钩的边界
        this.setEdgePointBySymbolObj(this.machineEdgePointList, symbolObj, new Vector2(-clawBoxVector.x, -clawBoxVector.z));  // 标志物体本地Y轴向 对应勾爪本地Z轴向 两物体X本地轴向相同
        // 设置娃娃复位的边界
        this.setEdgePointBySymbolObj(this.machineEdgePointListPlus, symbolObj, new Vector2(150, 150));
    }


    /**
     * 根据标志物体设置四个边界点
     * @param edgePointList 边界点数组
     * @param symbolObj 标志物体
     * @param extendSize 标志物体边界的基础上 额外扩展的长宽
     */
    private setEdgePointBySymbolObj(edgePointList: Vector[], symbolObj: GameObject, extendSize: Vector2) {
        // 标志物体原点
        let originalPoint = symbolObj.worldTransform.position;
        let machineBoxVector = symbolObj.worldTransform.scale.clone().multiply(100);
        // 边界点相对于原点的偏移
        let lengthX = machineBoxVector.x + extendSize.x;
        let lengthY = machineBoxVector.y + extendSize.y;
        // 计算四个边界点距离标志物体原点的 相对位置偏移量
        let offsetVectorX = this.hook.worldTransform.getForwardVector().multiply(lengthX / 2);
        let offsetVectorY = this.hook.worldTransform.getUpVector().multiply(lengthY / 2);
        // 四个边界点
        let point1 = originalPoint.clone().add(offsetVectorX).add(offsetVectorY);
        let point2 = originalPoint.clone().add(offsetVectorX).subtract(offsetVectorY);
        let point3 = originalPoint.clone().subtract(offsetVectorX).subtract(offsetVectorY);
        let point4 = originalPoint.clone().subtract(offsetVectorX).add(offsetVectorY);
        // 添加进数组
        edgePointList.push(point1);
        edgePointList.push(point2);
        edgePointList.push(point3);
        edgePointList.push(point4);
    }

    /**初始化创建 */
    private initCreate() {
        // 获取所有宠物蛋生成位置
        let generatePos = this.machineConfig.Generate;
        for (let i = 0; i < generatePos.length; i++) {
            this.eggGeneratePosList.push(GameObject.findGameObjectById(generatePos[i]).worldTransform.position);
        }

        // 宠物生成间隔（秒）
        let generateInterval = GlobalData.DollMachine.EggGenerateInterval;
        // 娃娃机宠物最大数量
        let maxNumber = GlobalData.DollMachine.EggMaxNumber;
        // 生成蛋定时任务
        this.createEggTaskId = TimeUtil.setInterval(() => {
            // 如果当前娃娃机内宠物蛋数量 小于娃娃机最大的宠物数量 则新增宠物蛋
            if (this.eggSet.size < maxNumber) {
                this.createEgg();
            }
            // console.log("当前蛋的数量为：" + this.eggSet.size);
        }, generateInterval)
        console.warn("创建蛋任务id为：" + this.createEggTaskId);
    }

    /**
     * 根据配置随机创建宠物蛋
     * @param pos 蛋的生成位置
     */
    public async createEgg() {
        // 通过权重 随机生成一个蛋
        let weightArr = this.machineConfig.Weight;
        let index = BagTool.calculateWeight(weightArr);
        let eggId = this.machineConfig.Egg[index];
        let eggGuid = GameConfig.Doll.getElement(eggId).Guid;
        // 随机创建娃娃机里的蛋
        let egg = await GameObject.asyncSpawn(eggGuid);

        // 开启物理
        let mesh = egg as Model;
        mesh.physicsEnabled = true;
        // 获取随机生成位置
        let pos = this.getEggGeneratePos(this.eggGeneratePosList);
        egg.worldTransform.position = pos;

        // 添加进eggSets
        this.eggSet.add(egg);
    }

    /**获取宠物蛋生成位置 */
    private getEggGeneratePos(posList: Vector[]): Vector {
        // 在随机宠物蛋创建点 创建宠物
        let randInt = Math.floor(Math.random() * posList.length);
        let randomPos = posList[randInt];
        // 宠物蛋应该在xy平面有一些偏移，否则会摞起来
        let randomOffset = new Vector(Math.random() * 5, Math.random() * 5, 0);

        let endPos = Vector.add(randomPos, randomOffset);

        return endPos;
    }


    /**判断点是否在矩形内 */
    private check_pointInRect(point: mw.Vector, ps: mw.Vector[]): boolean {
        if (ps.length < 3) {
            return false;
        }
        let x = point.x;
        let y = point.y;
        let A = ps[0];
        let B = ps[1];
        let C = ps[2];
        let D = ps[3];
        let a = (B.x - A.x) * (y - A.y) - (B.y - A.y) * (x - A.x);
        let b = (C.x - B.x) * (y - B.y) - (C.y - B.y) * (x - B.x);
        let c = (D.x - C.x) * (y - C.y) - (D.y - C.y) * (x - C.x);
        let d = (A.x - D.x) * (y - D.y) - (A.y - D.y) * (x - D.x);
        if ((a >= 0 && b >= 0 && c >= 0 && d >= 0) || (a <= 0 && b <= 0 && c <= 0 && d <= 0)) {
            return true;
        }
        return false;
    }


    /**开始动画 */
    public startTween() {
        // 清空玩家操作的抓钩速度
        this.hookSpeedX = 0;
        this.hookSpeedY = 0;
        // 开始动画
        this.hookDownTween();
    }


    /**抓钩向下移动动画 */
    private hookDownTween() {
        // 设置正在抓娃娃状态
        this.isCatching = true;
        const doll = GlobalData.DollMachine;
        // 绳子起止位置Z轴坐标
        let startZ = this.hook.worldTransform.position.z;
        let endZ = startZ - doll.ClawUpToDownHight;
        //绳子缩放
        let scale = doll.ClawUpToDownHight / 100;

        let tempScale = this.rope.worldTransform.scale.clone();
        let tempLoc = this.hook.worldTransform.position.clone();

        let tween = new mw.Tween({ z: startZ, s: 0 }).to({ z: endZ, s: scale }, doll.ClawDownTime[0])
            .onUpdate((obj) => {
                tempLoc.z = obj.z;
                this.hook.worldTransform.position = tempLoc;

                tempScale.z = obj.s;
                this.rope.worldTransform.scale = tempScale;
            }).onComplete(() => {
                setTimeout(() => {
                    this.hookTween();
                }, 100);
            }).start();
    }


    /**抓钩向上移动动画 */
    private async hookUpTween() {
        const doll = GlobalData.DollMachine;
        // 绳子起止位置Z轴坐标
        let startZ = this.hookPrimaryPos.z
        let endZ = startZ - doll.ClawUpToDownHight;
        //绳子缩放
        let scale = doll.ClawUpToDownHight / 100;

        let tempScale = this.rope.worldTransform.scale.clone();
        let tempLoc = this.hook.worldTransform.position.clone();
        let tween = new mw.Tween({ z: endZ, s: scale }).to({ z: startZ, s: 0 }, doll.ClawDownTime[0])
            .onUpdate((obj) => {
                tempLoc.z = obj.z;
                this.hook.worldTransform.position = tempLoc;

                tempScale.z = obj.s;
                this.rope.worldTransform.scale = tempScale;
            }).onComplete(() => {
                setTimeout(() => {
                    this.hookBackTween();
                }, 100);
            }).start();
    }


    /**抓钩动画 */
    private async hookTween() {

        const doll = GlobalData.DollMachine.ClawArrRota;
        let tween = new mw.Tween({ up: doll[0][0].clone(), after: doll[0][1].clone(), left: doll[0][2].clone(), right: doll[0][3].clone() }).
            to({ up: doll[1][0].clone(), after: doll[1][1].clone(), left: doll[1][2].clone(), right: doll[1][3].clone() }, GlobalData.DollMachine.ClawDownTime[1])
            .onUpdate((obj) => {
                this.claws[0].localTransform.rotation = obj.up;
                this.claws[1].localTransform.rotation = obj.after;
                this.claws[2].localTransform.rotation = obj.left;
                this.claws[3].localTransform.rotation = obj.right;
            }).onComplete(() => {
                setTimeout(() => {
                    this.hookUpTween();
                }, 100);
            }).start();
    }


    /**返回初始点动画 */
    private async hookBackTween() {

        let tempLoc = this.hook.worldTransform.position.clone();
        let tween = new mw.Tween({ x: tempLoc.x, y: tempLoc.y, z: tempLoc.z }).to({ x: this.hookPrimaryPos.x, y: this.hookPrimaryPos.y, z: this.hookPrimaryPos.z }, GlobalData.DollMachine.ClawDownTime[2])
            .onUpdate((obj) => {
                tempLoc.x = obj.x;
                tempLoc.y = obj.y;
                tempLoc.z = obj.z;
                this.hook.worldTransform.position = tempLoc;
                this.rope.worldTransform.position = tempLoc;
            }).onComplete(() => {
                this.claws[0].localTransform.rotation = GlobalData.DollMachine.ClawArrRota[0][0];
                this.claws[1].localTransform.rotation = GlobalData.DollMachine.ClawArrRota[0][1];
                this.claws[2].localTransform.rotation = GlobalData.DollMachine.ClawArrRota[0][2];
                this.claws[3].localTransform.rotation = GlobalData.DollMachine.ClawArrRota[0][3];
                this.clearTimeCountDown();
                // 关闭抓钩碰撞，让球掉下来
                this.claws.forEach(claw => {
                    claw.setCollision(mw.PropertyStatus.Off);
                })
                // 清除正在抓娃娃状态
                this.isCatching = false;
            }).start();
    }

    public reset() {
        this.clearTimeCountDown();
        this.hook.worldTransform.position = this.hookPrimaryPos;
        this.isCatching = false;
    }

    /**判断当前是否可用 */
    public isUse(): boolean {
        return this.curPlayer == null;
    }

    /**计时 */
    private timeCount: any;
    /**是否正在抓娃娃 */
    private isCatching: boolean = false;
    /**开始倒计时 */
    public async startCountDown() {
        let time = GlobalData.DollMachine.Time;
        let forceTime = GlobalData.DollMachine.ForceDownTime;
        forceTime = time - forceTime;

        this.timeCount = TimeUtil.setInterval(() => {
            time--;
            if (time == forceTime && !this.isCatching) {
                this.hookDownTween();
                ModuleService.getModule(DollMachineModuleS).hideControlUI(this.curPlayer.playerId);
            }
            if (time <= 0) {
                this.clearTimeCountDown();
            }
        }, 1);
        // 开始抓娃娃后，开启抓钩碰撞
        this.claws.forEach(claw => {
            claw.setCollision(mw.PropertyStatus.On);
        })
    }


    /**清除倒计时 */
    private clearTimeCountDown() {
        if (this.timeCount) {
            TimeUtil.clearInterval(this.timeCount);
            this.timeCount = null;
            // 延时清空当前使用娃娃机的玩家（用于判断是谁抓到的娃娃，等娃娃掉下去）
            setTimeout(() => {
                ModuleService.getModule(DollMachineModuleS).setCurPlayer(null, "", this.id);
                console.warn("清除玩家使用状态")
            }, 2000);
        }
    }


    /**更新抓钩位置（根据玩家操作） */
    public updateHookPos() {
        if (this.hookSpeedX == 0 && this.hookSpeedY == 0) return;

        // 计算每帧抓钩移动的位移
        let front = this.hook.worldTransform.getForwardVector();
        let right = this.hook.worldTransform.getUpVector();

        let moveX = front.clone().multiply(this.hookSpeedX);
        let moveY = right.clone().multiply(this.hookSpeedY);
        let move = moveX.add(moveY);

        // 更新后的位置
        let newPos = Vector.add(this.hook.worldTransform.position, move);

        // 检测更新后的位置是否超出边界
        if (!this.check_pointInRect(newPos, this.machineEdgePointList)) {
            // console.log(`新位置: ${newPos}`)
            // this.machineEdgePointList.forEach(item => {
            //     console.log(`边界点位置：${item}`);
            // });
            return;
        }


        // 每帧更新抓钩位置
        this.hook.worldTransform.position = newPos;
        this.rope.worldTransform.position = newPos;
    }

    /**检查蛋的位置，如果不在娃娃机内则复位 */
    public StartCheckEggPosTask() {
        // 保证只有一个定时任务
        if (this.checkEggTaskId != null) return;

        this.checkEggTaskId = TimeUtil.setInterval(() => {
            this.eggSet.forEach((eggObj) => {
                // 检测Z轴位置
                if (eggObj.worldTransform.position.z < this.dollMachineSymbolObj.worldTransform.position.z) {
                    this.onDollOutOfMachine(eggObj);
                    console.error(`穿模, 触发Z轴复位 娃娃z轴${eggObj.worldTransform.position.z} 复位高度: ${this.dollMachineSymbolObj.worldTransform.position.z}`);
                    return;
                }
                // 检测XY平面
                if (!this.check_pointInRect(eggObj.worldTransform.position, this.machineEdgePointListPlus)) {
                    this.onDollOutOfMachine(eggObj);
                    console.error("穿模, 触发XY平面复位");
                    return;
                }
            });
        }, 3);
    }

    /**当娃娃穿模出了娃娃机 */
    private async onDollOutOfMachine(obj: GameObject) {
        // 随机选择位置列表中的其中一个元素
        let ls = this.eggGeneratePosList;

        let randint = Math.floor(Math.random() * ls.length);
        // 重置到指定位置
        obj.worldTransform.position = ls[randint];
    }
}


export class DollMachineModuleS extends ModuleS<DollMachineModuleC, null> {

    /**是否初始化 */
    private isInit: boolean = false;
    /**娃娃机列表，索引从1开始 */
    private dollMachineList: DollMachineS[] = [null];
    /**娃娃名称-娃娃Id Map (根据名称查找id) */
    private dollNameMap: Map<string, number> = new Map();
    /**通行证模块 */
    // public passModuleS: PassModuleS;


    protected async onStart(): Promise<void> {
        // 初始化娃娃机列表
        this.initDollMachineList();
        // 初始化娃娃名-娃娃id字典
        this.initDollNameIdMap();

        // 缓存module类
        // this.passModuleS = ModuleService.getModule(PassModuleS);
    }

    protected onPlayerEnterGame(player: mw.Player): void {
        if (this.isInit) return;

        this.isInit = true;
    }

    /**每帧执行 */
    protected onUpdate(dt: number): void {
        // 更新抓钩位置
        for (let i = 1; i < this.dollMachineList.length; i++) {
            this.dollMachineList[i].updateHookPos();
        }
    }

    /**初始化娃娃机列表 */
    private initDollMachineList() {
        let configs = GameConfig.DollMachine.getAllElement();
        let len = configs.length;
        for (let i = 0; i < len; i++) {
            let machine = new DollMachineS(configs[i]);
            this.dollMachineList.push(machine)
        }
    }

    /**初始化娃娃名列表 */
    private initDollNameIdMap() {
        let dollConfig = GameConfig.Doll.getAllElement();
        // 将所有娃娃名添加进列表
        for (let i = 0; i < dollConfig.length; i++) {
            let conf = dollConfig[i];
            this.dollNameMap.set(conf.RewardName, i + 1);
        }
    }

    public net_startTween(machineId: number) {
        this.dollMachineList[machineId].startTween();
    }


    /**判断当前是否可用 */
    public net_isUse(machineId: number): boolean {
        return this.dollMachineList[machineId].isUse();
    }


    /**玩家请求连接 */
    public net_playerConnect(name: string, machineId: number): boolean {
        let machine = this.dollMachineList[machineId];
        // 有人正在使用娃娃机，返回false
        if (machine.curPlayer) {
            return false;
        }
        // 开始抓娃娃
        this.startCatchDoll(machineId, name);
        return true;
    }


    /**设置玩家 */
    public setCurPlayer(player: mw.Player, name: string, machineId: number) {
        let machine = this.dollMachineList[machineId];
        let playerId = machine.curPlayer?.playerId;
        machine.curPlayer = player;
        this.getAllClient().net_setCurPlayerName(name, machineId, playerId);
        if (machine.curPlayer == null) {
            console.log("结束使用娃娃机")
            // 结束抓娃娃
            this.finishCatchDoll(machineId);
            return;
        }
        machine.startCountDown();
    }


    /**玩家操作娃娃机 通知服务端勾爪速度变化 */
    public net_setHookSpeedX(machineId: number, speedX: number) {
        this.dollMachineList[machineId].hookSpeedX = speedX;
    }
    public net_setHookSpeedY(machineId: number, speedY: number) {
        this.dollMachineList[machineId].hookSpeedY = speedY;
    }


    /**通过扭蛋配置获得随机宠物Id */
    private getRandomPetIdByConfig(cfgId: number): number {
        let cfg = GameConfig.EggMachine.getElement(cfgId);
        let index = BagTool.calculateWeight(cfg.Weight);
        return cfg.petArr[index];
    }

    public net_randomGivePet(machineId: number) {
        let machine = this.dollMachineList[machineId];
        machine.reset();
        let obj = GToolkit.randomArrayItem([...machine.eggSet]);
        this.onDollDrop(obj, machineId);
    }


    /** 娃娃掉到触发器后执行的方法 */
    public onDollDrop(obj: GameObject, machineId: number) {
        let machine = this.dollMachineList[machineId];
        let player = Player.getPlayer(machine.curPlayer.playerId);
        if (!player) return;
        let name = obj.name;
        console.log("抓到了 " + name);
        machine.eggSet.delete(obj);
        obj.destroy();
        // 娃娃自己掉出来了，直接销毁
        let curplayer = machine.curPlayer;
        if (curplayer == null) {
            oTraceError("娃娃掉出来了 del" + name);
        } else {
            // 根据娃娃名获得娃娃id，再获得娃娃类型
            let dollId = this.dollNameMap.get(name);
            let dollConfig = GameConfig.Doll.getElement(dollId);
            let type = dollConfig.Type;
            switch (type) {
                case DollType.Pet:
                    // 获得宠物
                    ModuleService.getModule(PetBagModuleS).addPetById(curplayer.playerId, dollConfig.Pet);
                    this.getClient(curplayer).net_getPet(dollConfig.Pet);
                    break;
                case DollType.Diamond:
                    // 获得钻石
                    let val = dollConfig.Diamond;
                    let count = Math.ceil(val / 400);
                    this.getClient(curplayer).net_getDiamond(val, count);
                    break;
                case DollType.Egg:
                    // 获得 宠物蛋
                    console.log("抓到的蛋的id为: " + dollConfig.Egg);
                    let petId = this.getRandomPetIdByConfig(dollConfig.Egg);
                    console.log("随机到的宠物id为：" + petId);
                    let eggId = dollConfig.Egg;
                    ModuleService.getModule(PetBagModuleS).addPetById(curplayer.playerId, petId);
                    this.getClient(curplayer).net_getEgg(petId, eggId);
                    break;
            }
        }

    }

    /**设置娃娃物理模拟 */
    private setPhysics(machineId: number, usePhysics) {
        this.dollMachineList[machineId].eggSet.forEach(egg => {
            let mesh = egg as Model;
            mesh.physicsEnabled = usePhysics;
        })
    }

    /**
     * 开始抓娃娃
     * @param machineId 娃娃机id
     * @param name 抓娃娃的玩家的昵称
     */
    private startCatchDoll(machineId: number, name: string) {
        let machine = this.dollMachineList[machineId];
        // 通知通行证任务
        // this.passModuleS.onTaskUpdateAC.call(this.currentPlayerId, GlobalEnum.VipTaskType.DollMachine, 1);
        // 开启物理
        this.setPhysics(machineId, true);
        // 设置当前使用者
        this.setCurPlayer(this.currentPlayer, name, machineId);
        // 开启各种定时任务
        // 检查蛋的位置(防止穿模)
        machine.StartCheckEggPosTask();
        // 创建蛋(保证定时任务唯一)
        if (machine.createEggTaskId == null) {
            machine.createEggTaskId = TimeUtil.setInterval(() => {
                if (machine.eggSet.size < GlobalData.DollMachine.EggMaxNumber) {
                    machine.createEgg();
                }
            }, 1);
        }
    }

    /**
     * 结束抓娃娃，进行一些使用完后娃娃机的处理操作
     * @param machineId 娃娃机id
     */
    public finishCatchDoll(machineId: number) {
        let machine = this.dollMachineList[machineId];
        // 关闭物理
        setTimeout(() => {
            if (this.net_isUse(machineId)) {
                this.setPhysics(machineId, false);
            } else {
                console.warn("正在使用");
            }

        }, 3000);
        // 关闭各种定时任务
        // 关闭检查蛋
        TimeUtil.clearInterval(machine.checkEggTaskId);
        machine.checkEggTaskId = null;
        // 关闭创建
        TimeUtil.clearInterval(machine.createEggTaskId);
        machine.createEggTaskId = null;
    }

    /**隐藏抓娃娃控制UI */
    public hideControlUI(playerId: number) {
        let player = Player.getPlayer(playerId);
        if (!player) return;
        this.getClient(playerId).net_hideControlUI();
    }


}