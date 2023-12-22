import { State } from "../../../depend/hfsm/State";
import { StateMachine } from "../../../depend/hfsm/StateMachine";
import i18n from "../../../language/i18n";
import { CompanionModule_C } from "../../../module/companion/CompanionModule_C";
import GToolkit from "../../../util/GToolkit";
import { SyncRootEntity } from "../base/SyncRootEntity";
import { CompanionStateEnum, CompanionViewController } from "./CompanionController";
import { CompanionState } from "./CompanionState";
import DragonEntity from "./DragonEntity";

class BaseCompanionState extends State<CompanionStateEnum> {


    declare fsm: CompanionLogicController

}

class InitializeState extends BaseCompanionState {

    protected onEnter(): void {

        TimeUtil.delaySecond(2).then((value) => {
            this.fsm.requestStateChange(CompanionStateEnum.Follow, true)
        })
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
        mw.Navigation.follow(this.fsm.target, this.fsm.follower, this.fsm.state.offsetNum, this.onStart, this.onFailed);
    }

    protected onLogic(): void {

        let shift = this.printSampler.shift();
        if (shift) {
            this.printSampler.push(shift);
        }

        let follower: mw.Character = this.fsm.follower as mw.Character;


        if ((!shift || shift.squaredDistanceTo(this.fsm.follower.worldTransform.position) > 50 ** 2) && (follower.isMoving && !follower.isJumping)) {

            this.printSampler.push(this.fsm.follower.worldTransform.position.clone());

            if (this.printSampler.length > 3) {
                this.printSampler.pop();
            }
        }


        let distance = this.fsm.target.worldTransform.position.subtract(this.fsm.follower.worldTransform.position)
        distance.z = 0;

        if (distance.sqrLength >= 800 ** 2 && this.printSampler.length >= 3) {
            this.fsm.target.worldTransform.position = this.printSampler.pop();
        }

        if (distance.sqrLength < (this.fsm.state.offsetNum + GToolkit.random(-20, 20, true)) ** 2) {
            this.fsm.requestStateChange(CompanionStateEnum.Idle, true);
        }



    }

    private onStart = () => {

    }

    private onFailed = () => {

        this.fsm.requestStateChange(CompanionStateEnum.Idle, true);
    }

    protected onExit(): void {
        mw.Navigation.stopFollow(this.fsm.target);
        this.printSampler.length = 0;
    }

}



export class CompanionLogicController extends StateMachine<void, CompanionStateEnum, string> {

    public follower: mw.GameObject;

    public reporter: CompanionRoot;

    public target: mw.GameObject

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
        this.target.worldTransform.position = this.selectInitializePoint()
        this.init();
    }



    protected changeState(name: CompanionStateEnum): void {
        super.changeState(name)
        this.quicklySampleState();
        this.reportCompanionState();
    }

    private quicklySampleState() {
        let now = Date.now();
        this.state.stateName = this.activeState;
        this.state.seed = now;
        this.state.switchTime = now;
        this.state.start = this.target.worldTransform.position;
        this.state.offsetNum = GToolkit.random(200, 300);

    }

    public selectInitializePoint() {

        let cameraTransform = mw.Camera.currentCamera.worldTransform
        let behind = cameraTransform.getForwardVector().clone().multiply(-1);
        let location = behind.multiply(GToolkit.random(300, 600)).add(cameraTransform.position);
        return location;
    }


    private reportCompanionState() {
        this.reporter.changeLogicState(this.state)
    }
}

@mw.Component
export default class CompanionRoot extends SyncRootEntity<CompanionState> {



    private _logicController: CompanionLogicController


    protected async onInitialize() {
        await super.onInitialize();
        if (mw.SystemUtil.isClient()) {

            mwext.ModuleService.getModule(CompanionModule_C).getController().registerCompanion(this);
            let prefab = this.displayObject = await mw.GameObject.asyncSpawn('Character') as mw.Character;
            prefab.setDescription([this.displayGuid]);
            let character = mw.Player.getPlayer(this.playerId).character;
            prefab.addMovement(mw.Vector.forward);
            if (this.isLocalPlayer()) {
                this._logicController = new CompanionLogicController();
                this._logicController.setup(character, prefab, this);
                this.useUpdate = true;
            }

            mw.Script.spawnScript(DragonEntity, false).then((value) => {
                value.gameObject = prefab;
                value.controller = new CompanionViewController();
                value.controller.target = character;
                value.controller.owner = prefab
                value.nickName = i18n.lan(this.nickName)
                value.setHosted(this);
            })


        }
    }

    protected onUpdate(dt: number): void {
        this._logicController?.logic()
    }
}