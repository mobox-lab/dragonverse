export enum GhostMoveState {
    /** 追逐 */
    Follow = 1,
    /** 闲逛 */
    Hang = 2,
    /** 等待 */
    Wait = 3
}

export enum GhostLogicState {
    /** 闲逛 */
    Casual = 1,
    /** 追逐 */
    Chase = 2,
    /** Killing */
    Killing = 3,
    /** 发呆 */
    Protected = 4,
}

export enum GhostAniState {
    /** 普通 */
    Normal = 1,
    /** 推车 */
    PushCar = 2,
}

// export enum GhostPeriodState {
//     /** 正常 */
//     Normal,
//     /** 最终追逐 */
//     FinalChase
// }

export namespace GhostEvents {
    export const CatchPlayer = "GhostCatchPlayer";

    export const ChangeState = "GhostChangeState";

    export const GhostOpenDoor = "GhostOpenDoor";
}


@Serializable
export class SoundParam {
    @mw.Property()
    soundGuid: string = "";

    @mw.Property()
    volume: number = 1;

    @mw.Property()
    innerRadius: number = 200;

    @mw.Property()
    falloffDistance: number = 600;
}

export class GhostSettings {

    static casualWalkStance: string = "122549";

    static casuleWalkAniRate: number = 1;

    @mw.Property()
    static chaseWalkStance: string = "30273";

    static chaseWalkAniRate: number = 1;

    @mw.Property()
    static casualSound: SoundParam = new SoundParam();

    @mw.Property()
    static chaseSound: SoundParam = new SoundParam();

    @mw.Property()
    static spawnGhostInsIds: number[] = [];

    static openDebug: boolean = true;

    static catchAnim: string = "20269";

    static shiningVisibleTime: number = 1;
    static shiningInvisibleTime: number = 2;

    static chaseSoundIds: number[] = [1009];
    static soundKeepTime: Vector2 = new Vector2(5, 10);
}
