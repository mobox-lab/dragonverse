import GToolkit from "../../../util/GToolkit";
import { CompanionContext } from "../../simulate/context/CompanionContext";
import { CompanionStateRoot } from "../../simulate/planner/companion/CompanionStateRoot";
import { CompanionState } from "./CompanionState";
import MovementEntity from "./MovementEntity";



@mw.Component
export default class CompanionEntity extends MovementEntity<CompanionState> {

    /**
     * 跟随者
     */
    @CompanionEntity.required
    public follower: mw.Character;


    private _context: CompanionContext = new CompanionContext();

    private _controller: CompanionStateRoot;



    public triggerEvents(event: string) {
        this._controller.trigger(event)
    }


    protected onInitialize(): void {
        super.onInitialize();
        (this.gameObject as mw.Character).complexMovementEnabled = false;
        this._controller = new CompanionStateRoot(this._context);
        if (this.isDisplayForLocal()) {
            this._controller.onPostedStateChanged.add(this.onLocalPlayerLogicStateChange, this);
        }
        this.selectInitializePoint();
        this.onLocalPlayerLogicStateChange();
        this.takeEnvironmentShot();
        this._controller.init();
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
        this._context.syncedState = state;
        return CompanionState.prototype.clone.apply(state, [old]);
    }

    protected postLogicStateChange(state: CompanionState): void {
        if (this.isDisplayForLocal()) {
            return;
        }
        this.gameObject.worldTransform.position.set(state.start);
        this._controller.requestStateChange(state.stateName, true);
    }

}