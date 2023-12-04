import GToolkit from "../../../util/GToolkit";
import { TalkAction } from "../../simulate/action/TalkAction";
import { CompanionContext } from "../../simulate/context/CompanionContext";
import { CompanionStateRoot } from "../../simulate/planner/companion/CompanionStateRoot";
import { CompanionState } from "./CompanionState";
import MovementEntity from "./MovementEntity";



const tempCheckPoint = new mw.Vector();

@mw.Component
export default class CompanionEntity extends MovementEntity<CompanionState> {

    /**
     * 跟随者
     */
    @CompanionEntity.required
    public follower: mw.Character;


    private _context: CompanionContext = new CompanionContext();

    private _controller: CompanionStateRoot;

    private _talker: TalkAction;



    public triggerEvents(event: string) {
        this._controller.trigger(event)
    }


    protected onInitialize(): void {
        super.onInitialize();
        (this.gameObject as mw.Character).complexMovementEnabled = false;
        this._controller = new CompanionStateRoot(this._context);
        this._talker = new TalkAction(['test_talk_tips1', 'test_talk_tips2']);

        this.onTalkerCoolDown();
        if (this.isDisplayForLocal()) {
            this._controller.onPostedStateChanged.add(this.onLocalPlayerLogicStateChange, this);
        }
        this.selectInitializePoint();
        this.onLocalPlayerLogicStateChange();
        this.takeEnvironmentShot();
        this._controller.init();
        this.useUpdate = true;
    }


    private onTalkerCoolDown() {

        if (!this.isDisplayForLocal()) {
            return;
        }
        TimeUtil.delaySecond(GToolkit.random(3, 10)).then((value) => {
            if (!this._talker.inCoolDown) {
                this._talker.execute(this._context);
            }
            this.onTalkerCoolDown();
        })
    }


    private selectInitializePoint() {

        let cameraTransform = mw.Camera.currentCamera.worldTransform
        let behind = cameraTransform.getForwardVector().clone().multiply(-1);
        let location = behind.multiply(GToolkit.random(300, 600)).add(cameraTransform.position);
        this.gameObject.worldTransform.position = location;
        this.gameObject.worldTransform.lookAt(this.follower.worldTransform.position);
    }


    public onUpdate(dt: number): void {

        this.takeEnvironmentShot();


        // 跑逻辑
        this._controller.logic();



        this.acceleration.set(this._context.force);
        super.onUpdate(dt);

    }



    private takeEnvironmentShot() {
        const follower = this._context.follower;
        follower.maxForce = this.follower.maxAcceleration;
        follower.maxSpeed = this.follower.maxWalkSpeed;
        follower.position.set(this.follower.worldTransform.position);
        follower.rotation.set(this.follower.worldTransform.rotation);
        follower.velocity.set(this.follower.velocity);

        this._context.force.set(0, 0, 0);
        this._context.entity = this;
        this._context.talker = this.gameObject.gameObjectId;

        tempCheckPoint.set(this.gameObject.worldTransform.getUpVector()).multiply(-10000).add(this.position);

        let result = mw.QueryUtil.lineTrace(this.position, tempCheckPoint, false, true, [this.gameObject.gameObjectId]);

        if (result.length > 0) {
            this._context.closesFloorDist = result[0].distance;
        }
    }



    protected onLocalPlayerLogicStateChange() {

        if (!this._context.syncedState) {
            this._context.syncedState = CompanionState.create(this._controller.activeState);
        }
        let currentState = this._context.syncedState;
        currentState.switchTime = Date.now();
        currentState.seed = GToolkit.random(100000, 9999999);
        currentState.start.set(this.gameObject.worldTransform.position);
        this.setLogicState(currentState);
        this._context.syncedState = currentState;
    }



    protected preLogicStateChange(old: CompanionState, state: CompanionState): CompanionState {
        let fullstate = CompanionState.prototype.clone.apply(state, [old]);
        this._context.syncedState = fullstate;
        return fullstate;
    }

    protected postLogicStateChange(state: CompanionState): void {
        if (this.isDisplayForLocal()) {
            return;
        }
        this.gameObject.worldTransform.position.set(state.start);
        this._controller.requestStateChange(state.stateName, true);
    }

}