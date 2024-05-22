import { State } from "../../../depend/hfsm/State";
import { StateMachine } from "../../../depend/hfsm/StateMachine";
import i18n from "../../../language/i18n";
import { CompanionModule_C } from "../../../module/companion/CompanionModule_C";
import GToolkit, { Regulator } from "../../../util/GToolkit";
import { SyncRootEntity } from "../base/SyncRootEntity";
import { CompanionStateEnum, CompanionViewController } from "./CompanionController";
import { CompanionState } from "./CompanionState";
import DragonEntity from "./DragonEntity";
import Log4Ts from "../../../depend/log4ts/Log4Ts";
import GameServiceConfig from "../../../const/GameServiceConfig";
import UnifiedRoleController from "../../../module/role/UnifiedRoleController";

class BaseCompanionState extends State<CompanionStateEnum> {

    declare fsm: CompanionLogicController;

}

class InitializeState extends BaseCompanionState {

    protected onEnter(): void {

        TimeUtil.delaySecond(2).then((value) => {
            this.fsm.requestStateChange(CompanionStateEnum.Follow, true);
        });
    }

}

class CompanionIdleState extends BaseCompanionState {

    protected onEnter(): void {

    }

    protected onLogic(): void {

        let distance = this.fsm.follower.worldTransform.position.squaredDistanceTo(this.fsm.target.worldTransform.position);

        if (distance >= (this.fsm.state.offsetNum + GToolkit.random(-10, 10, true)) ** 2) {
            this.fsm.requestStateChange(CompanionStateEnum.Follow, true);
        }
    }

}

class CompanionFollowState extends BaseCompanionState {

    private printSampler: mw.Vector[] = [];

    public onEnter(): void {

        this.printSampler = [];
        mw.Navigation.follow(this.fsm.target, this.fsm.follower, this.fsm.state.offsetNum / 2, this.OnSuccess, this.onFailed);
    }

    protected onLogic(): void {
        const localPlayer = Player.localPlayer;
        let follower: mw.Character = this.fsm.follower as mw.Character;

        if (localPlayer?.character === follower &&
            ((this.fsm.target as mw.Character)?.maxWalkSpeed ?? -1) !== (follower?.maxWalkSpeed ?? -2)) {
            (this.fsm.target as mw.Character).maxWalkSpeed = follower.maxWalkSpeed;
        }

        let shift = this.printSampler.shift();
        if (shift) {
            this.printSampler.push(shift);
        }

        if ((!shift || shift.squaredDistanceTo(this.fsm.follower.worldTransform.position) > GameServiceConfig.PARTNER_DRAGON_FOLLOW_NOISE ** 2) &&
            (follower.isMoving && !follower.isJumping)) {

            this.printSampler.push(this.fsm.follower.worldTransform.position.clone());

            if (this.printSampler.length > 5) {
                this.printSampler.pop();
            }
        }

        let distance = this.fsm.target.worldTransform.position.subtract(this.fsm.follower.worldTransform.position);
        distance.z = 0;

        if (distance.sqrLength >= (GameServiceConfig.PARTNER_DRAGON_FOLLOW_OFFSET * GameServiceConfig.PARTNER_DRAGON_FOLLOW_OFFSET_RATIO) ** 2 &&
            this.printSampler.length >= 5) {
            this.fsm.target.worldTransform.position = this.fsm.selectInitializePoint();
        }

        if (distance.sqrLength < (this.fsm.state.offsetNum) ** 2) {
            this.fsm.requestStateChange(CompanionStateEnum.Idle, true);
        }

    }

    private OnSuccess = () => {
        Log4Ts.log(CompanionFollowState, `follow success.`);
    };

    private onFailed = () => {
        Log4Ts.log(CompanionFollowState, `follow failed.`);
        if (this.fsm.target.worldTransform.position.subtract(this.fsm.follower.worldTransform.position).sqrLength >= (GameServiceConfig.PARTNER_DRAGON_FOLLOW_OFFSET * 2) ** 2) {
            this.fsm.target.worldTransform.position = this.fsm.selectInitializePoint();
        }

        this.fsm.requestStateChange(CompanionStateEnum.Idle, true);
    };

    protected onExit(): void {
        mw.Navigation.stopFollow(this.fsm.target);
        this.printSampler.length = 0;
    }

}

export class CompanionLogicController extends StateMachine<void, CompanionStateEnum, string> {

    public follower: mw.GameObject;

    public reporter: CompanionRoot;

    public target: mw.GameObject;

    public state: CompanionState;

    setup(follower: mw.GameObject, target: mw.GameObject, reporter: CompanionRoot) {

        this.follower = follower;
        this.target = target;
        this.reporter = reporter;
        this.state = new CompanionState();
        this.addState(CompanionStateEnum.Initialize, new InitializeState());
        this.addState(CompanionStateEnum.Follow, new CompanionFollowState());
        this.addState(CompanionStateEnum.Idle, new CompanionIdleState());
        this.setStartState(CompanionStateEnum.Initialize);
        this.target.worldTransform.position = this.selectInitializePoint();
        this.init();
    }

    protected changeState(name: CompanionStateEnum): void {
        super.changeState(name);
        this.quicklySampleState();
        this.reportCompanionState();
    }

    private quicklySampleState() {
        let now = Date.now();
        this.state.stateName = this.activeState;
        this.state.seed = now;
        this.state.switchTime = now;
        this.state.start = this.target.worldTransform.position;
        this.state.offsetNum = GToolkit.random(
            GameServiceConfig.PARTNER_DRAGON_FOLLOW_OFFSET - GameServiceConfig.PARTNER_DRAGON_FOLLOW_NOISE,
            GameServiceConfig.PARTNER_DRAGON_FOLLOW_OFFSET + GameServiceConfig.PARTNER_DRAGON_FOLLOW_NOISE,
        );
    }

    public selectInitializePoint() {

        let behind = Player.getControllerRotation().rotateVector(Vector.forward).multiply(-1);
        return behind
            .multiply(
                GToolkit.random(
                    GameServiceConfig.PARTNER_DRAGON_MIN_INITIALIZE_DISTANCE,
                    GameServiceConfig.PARTNER_DRAGON_MAX_INITIALIZE_DISTANCE,
                ))
            .add(Camera.currentCamera.worldTransform.position);
    }

    private reportCompanionState() {
        this.reporter.changeLogicState(this.state);
    }
}

@mw.Component
export default class CompanionRoot extends SyncRootEntity<CompanionState> {

    private _logicController: CompanionLogicController;

    public _wing: mw.GameObject;

    private _testRegulator: Regulator = new Regulator(1e3);

    protected async onInitialize() {
        if (mw.SystemUtil.isClient()) {

            mwext.ModuleService.getModule(CompanionModule_C).getController().registerCompanion(this);
            let prefab = this.displayObject = await mw.GameObject.asyncSpawn("Character") as mw.Character;
            GToolkit.safeSetDescription(
                prefab,
                this.displayGuid,
            );
            prefab.maxSwimSpeed = GameServiceConfig.PARTNER_DRAGON_MAX_SWIM_SPEED;
            let character = mw.Player.getPlayer(this.playerId).character;

            //添加翅膀
            if (this.wingGuid && this.wingTransform) {
                this._wing = await mw.GameObject.asyncSpawn(this.wingGuid);

                prefab.attachToSlot(this._wing, HumanoidSlotType.BackOrnamental);
                TimeUtil.delayExecute(() => {
                    (this._wing as Effect).play();
                    this._wing.localTransform = this.wingTransform;
                }, 10);
            }

            prefab.addMovement(mw.Vector.forward);
            prefab.maxWalkSpeed = GameServiceConfig.PARTNER_DRAGON_MAX_WALK_SPEED;
            if (this.isLocalPlayer()) {
                this._logicController = new CompanionLogicController();
                this._logicController.setup(character, prefab, this);
                this.useUpdate = true;
            }

            mw.Script.spawnScript(DragonEntity, false, prefab).then((value) => {
                value.gameObject = prefab;
                value.controller = new CompanionViewController();
                value.controller.target = character;
                value.controller.owner = prefab;
                value.nickName = i18n.lan(this.nickName);
                value.setHosted(this);
            });

        }
    }

    protected onUpdate(dt: number): void {
        if (this._testRegulator.request()) {
            this._logicController?.logic();
        }
    }
}