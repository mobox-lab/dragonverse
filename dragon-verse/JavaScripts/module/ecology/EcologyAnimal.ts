import FiniteStateMachine, { Region, State } from "../../depend/finite-state-machine/FiniteStateMachine";
import Log4Ts from "../../depend/log4ts/Log4Ts";
import { RandomGenerator } from "../../util/GToolkit";
import { IAnimalEcologyElement } from "../../config/AnimalEcology";
import { Yoact } from "../../depend/yoact/Yoact";
import Gtk from "../../util/GToolkit";
import bindYoact = Yoact.bindYoact;
import { GameConfig } from "../../config/GameConfig";
import createYoact = Yoact.createYoact;

export class EcologyAnimalStateParam {
    /**
     * 已等待时间.
     * @type {number}
     */
    waitedTime: number = 0;

    /**
     * 当前目标等待时间.
     * @type {number}
     */
    currentWaitFor: number = 0;

    /**
     * 是否可行走.
     * @type {boolean}
     */
    walkValid: boolean = false;

    /**
     * 是否存活.
     * @type {boolean}
     */
    alive: boolean = true;

    /**
     * 重置等待时间.
     * @param {IAnimalEcologyElement} config
     */
    public resetWaitedTime(config: IAnimalEcologyElement) {
        this.waitedTime = 0;
        this.currentWaitFor = Gtk.randomArrayItem(config.restTime);
    }
}

export enum EcologyAnimalStatus {
    /**
     * 空闲
     */
    Idle = "Idle",
    /**
     * 路径查找
     */
    FindPath = "FindPath",
    /**
     * 追逐
     */
    Move = "Move",
    /**
     * 死亡
     */
    Dead = "Dead",
}

export default class EcologyAnimal {
    private _config: IAnimalEcologyElement;

    private _createTime: number;

    public birthPosition: mw.Vector;

    private _machine: FiniteStateMachine<EcologyAnimalStateParam>;

    private _machineEffect: Yoact.Effect;

    private _char: mw.Character;

    private _state: EcologyAnimalStateParam = createYoact(new EcologyAnimalStateParam());

    private _destroyed: boolean = false;

    constructor(id: number, birthPosition: mw.Vector) {
        this._config = GameConfig.AnimalEcology.getElement(id);
        if (Gtk.isNullOrUndefined(this._config)) {
            Log4Ts.log(EcologyAnimal, `config not found. id: ${id}`);
            return;
        }

        this._createTime = Date.now();
        this.birthPosition = birthPosition.clone();
        mw.GameObject
            .asyncSpawn(
                "NPC",
                {
                    replicates: true,
                    transform: new mw.Transform(
                        birthPosition,
                        new mw.Rotation(),
                        mw.Vector.one,
                    ),
                })
            .then(value => {
                    if (this._destroyed || !value) {
                        value?.destroy();
                        return;
                    }
                    this._char = value as mw.Character;
                    Gtk.safeSetDescription(this._char, this._config.prefabGuid);
                    this._char.displayName = this._config.name;
                    this.initStateMachine();
                    mw.TimeUtil.onEnterFrame.add(this.onUpdate);
                },
            );
    }

    public destroy() {
        this._destroyed = true;
        Yoact.stopEffect(this._machineEffect);
        mw.TimeUtil.onEnterFrame.remove(this.onUpdate);
        this._char?.destroy();
    }

    private initStateMachine() {
        const idle = new State<EcologyAnimalStateParam>(EcologyAnimalStatus.Idle)
            .aE(() => {
                logEnterState(idle, this._char.gameObjectId);
                this._state.resetWaitedTime(this._config);
            })
            .aU((dt) => this._state.waitedTime += dt);
        const findPath =
            new State<EcologyAnimalStateParam>(EcologyAnimalStatus.FindPath)
                .aE(() => {
                    logEnterState(findPath, this._char.gameObjectId);
                    const d = this
                        .birthPosition
                        .clone()
                        .add(new RandomGenerator()
                            .randomCircle()
                            .handle(item =>
                                item * Gtk.random(this._config.movementRadius / 2, this._config.movementRadius))
                            .toVector3(1000));
                    let hit = mw.QueryUtil.lineTrace(
                        d,
                        d.clone().add(new mw.Vector(0, 0, -3000)),
                        false,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        this._char);

                    let dest = hit[0].position;
                    if (Gtk.isNullOrUndefined(dest)) this._state.walkValid = false;

                    this._state.walkValid = undefined;
                    mw.Navigation.navigateTo(
                        this._char,
                        dest,
                        undefined,
                        () => this._state.walkValid = false,
                        () => this._state.walkValid = false,
                    );
                    if (this._state.walkValid === undefined) this._state.walkValid = true;
                });
        const run = new State<EcologyAnimalStateParam>(EcologyAnimalStatus.Move)
            .aE(() => {
                logEnterState(run, this._char.gameObjectId);
                this._char.maxWalkSpeed = Gtk.randomArrayItem(this._config.speed) ?? 500;
            })
            .aEx(() => mw.Navigation.stopNavigateTo(this._char));
        const dead = new State<EcologyAnimalStateParam>(EcologyAnimalStatus.Dead)
            .aE(() => this.destroy());
        const alive = new Region<EcologyAnimalStateParam>("alive").include(idle, findPath, run);

        idle.when(arg => arg.waitedTime > arg.currentWaitFor).to(findPath);
        findPath.when(arg => arg.walkValid !== undefined && arg.walkValid).to(run);
        findPath.when(arg => arg.walkValid !== undefined && !arg.walkValid).to(idle);
        run.when(arg => arg.walkValid !== undefined && !arg.walkValid).to(idle);
        alive.when(arg => !arg.alive).to(dead);

        this._machine = new FiniteStateMachine<EcologyAnimalStateParam>(idle);
        this._machineEffect = bindYoact(() => this._machine.evaluate(this._state));
    }

    private onUpdate = (dt: number) => {
        if (Date.now() - this._createTime > this._config.fadeTime) {
            this._state.alive = false;
        }
        this._machine.update(dt);
    };
}

function logEnterState(state: State<EcologyAnimalStateParam>, guid: string) {
    Log4Ts.log(EcologyAnimal,
        `enter ${state.name} state.`,
        `guid: ${guid}.`);
}