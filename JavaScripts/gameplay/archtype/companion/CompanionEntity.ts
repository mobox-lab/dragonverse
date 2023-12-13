import GToolkit from "../../../util/GToolkit";
import { CompanionState } from "./CompanionState";
import MovementEntity from "./MovementEntity";



const tempCheckPoint = new mw.Vector();

@mw.Component
export default class CompanionEntity extends MovementEntity<CompanionState> {






    public triggerEvents(event: string) {
    }


    protected onInitialize(): void {
        super.onInitialize();

    }


    private onTalkerCoolDown() {


    }


    private selectInitializePoint() {

        let cameraTransform = mw.Camera.currentCamera.worldTransform
        let behind = cameraTransform.getForwardVector().clone().multiply(-1);
        let location = behind.multiply(GToolkit.random(300, 600)).add(cameraTransform.position);
        this.gameObject.worldTransform.position = location;
        //this.gameObject.worldTransform.lookAt(this.follower.worldTransform.position);
    }


    public onUpdate(dt: number): void {



    }




    protected onLocalPlayerLogicStateChange() {


    }



    protected preLogicStateChange(old: CompanionState, state: CompanionState): CompanionState {
        let fullstate = CompanionState.prototype.clone.apply(state, [old]);
        //  this._context.syncedState = fullstate;
        return fullstate;
    }

    protected postLogicStateChange(state: CompanionState): void {
        if (this.isDisplayForLocal()) {
            return;
        }
        this.gameObject.worldTransform.position.set(state.start);
        //  this._controller.requestStateChange(state.stateName, true);
    }

}