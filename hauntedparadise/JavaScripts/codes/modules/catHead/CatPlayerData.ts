export class CatPlayerData {
    /** 进入的玩家的ids */
    public entryPlayerIds: number[] = [];
    /** 参与贡献的玩家 */
    public contributePlayerIds: number[] = [];
    /** 剩余的狂热时间 */
    public restTime: number = 0;
    /** 是否猫猫头未被点击 */
    public isPreFever: boolean = false;
}
