import { State } from "../../../depend/hfsm/State";
import { StateMachine } from "../../../depend/hfsm/StateMachine";
import i18n from "../../../language/i18n";
import { CompanionModule_C } from "../../../module/companion/CompanionModule_C";
import GToolkit from "../../../util/GToolkit";
import { SyncRootEntity } from "../base/SyncRootEntity";
import { CompanionStateEnum, CompanionViewController } from "./CompanionController";
import { CompanionState } from "./CompanionState";
import DragonEntity from "./DragonEntity";
import GameServiceConfig from "../../../const/GameServiceConfig";
import Log4Ts from "../../../depend/log4ts/Log4Ts";

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

        let shift = this.printSampler.shift();
        if (shift) {
            this.printSampler.push(shift);
        }

        let follower: mw.Character = this.fsm.follower as mw.Character;


        if ((!shift || shift.squaredDistanceTo(this.fsm.follower.worldTransform.position) > GameServiceConfig.PARTNER_DRAGON_FOLLOW_NOISE ** 2) &&
            (follower.isMoving && !follower.isJumping)) {

            this.printSampler.push(this.fsm.follower.worldTransform.position.clone());

            if (this.printSampler.length > 5) {
                this.printSampler.pop();
            }
        }


        let distance = this.fsm.target.worldTransform.position.subtract(this.fsm.follower.worldTransform.position);
        distance.z = 0;

        if (distance.sqrLength >= (GameServiceConfig.PARTNER_DRAGON_FOLLOW_OFFSET * 2) ** 2 && this.printSampler.length >= 5) {
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
            .add(Player.localPlayer.character.worldTransform.position);
    }


    private reportCompanionState() {
        this.reporter.changeLogicState(this.state);
    }
}

@mw.Component
export default class CompanionRoot extends SyncRootEntity<CompanionState> {


    private _logicController: CompanionLogicController;


    protected async onInitialize() {
        if (mw.SystemUtil.isClient()) {

            mwext.ModuleService.getModule(CompanionModule_C).getController().registerCompanion(this);
            let prefab = this.displayObject = await mw.GameObject.asyncSpawn("Character") as mw.Character;
            prefab.setDescription([this.displayGuid]);
            let character = mw.Player.getPlayer(this.playerId).character;
            prefab.addMovement(mw.Vector.forward);
            prefab.maxWalkSpeed = GameServiceConfig.PARTNER_DRAGON_MAX_WALK_SPEED;
            if (this.isLocalPlayer()) {
                this._logicController = new CompanionLogicController();
                this._logicController.setup(character, prefab, this);
                this.useUpdate = true;
            }
            const component = prefab.addComponent(DragonEntity);
            if (component) {
                component.controller = new CompanionViewController();
                component.controller.target = character;
                component.controller.owner = prefab;
                component.nickName = i18n.lan(this.nickName);
                component.setHosted(this);
            }

        }
    }

    protected onUpdate(dt: number): void {
        this._logicController?.logic();
    }
}