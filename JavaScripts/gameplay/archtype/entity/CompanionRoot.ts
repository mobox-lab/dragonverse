import { CompanionModule_C } from "../../../module/companion/CompanionModule_C";
import GToolkit from "../../../util/GToolkit";
import { SyncRootEntity } from "../base/SyncRootEntity";
import { CompanionStateEnum, CompanionViewController } from "./CompanionController";
import { CompanionState } from "./CompanionState";
import DragonEntity from "./DragonEntity";

export class CompanionLogicController {

    private _follower: mw.GameObject;

    private _reporter: CompanionRoot;

    private _target: mw.GameObject

    private _state: CompanionState;


    setup(follower: mw.GameObject, target: mw.GameObject, reporter: CompanionRoot) {
        this._follower = follower;
        this._target = target;
        this._reporter = reporter;
        this._state = new CompanionState();
        this.initialize();
    }

    private initialize() {
        this._target.worldTransform.position = this.selectInitializePoint()
        this.quicklySampleState(CompanionStateEnum.Idle);
        this.reportCompanionState();
    }

    private quicklySampleState(stateName: CompanionStateEnum) {
        let now = Date.now();
        this._state.stateName = stateName;
        this._state.seed = now;
        this._state.switchTime = now;
        this._state.start = this._target.worldTransform.position;
        this._state.offsetNum = GToolkit.random(200, 300);

    }

    private selectInitializePoint() {

        let cameraTransform = mw.Camera.currentCamera.worldTransform
        let behind = cameraTransform.getForwardVector().clone().multiply(-1);
        let location = behind.multiply(GToolkit.random(300, 600)).add(cameraTransform.position);
        return location;
    }

    update() {
        let distance = this._target.worldTransform.position.squaredDistanceTo(this._follower.worldTransform.position);

        if (this._state.stateName === CompanionStateEnum.Follow) {

            if (distance <= this._state.offsetNum ** 2) {
                this.quicklySampleState(CompanionStateEnum.Idle);
                this.reportCompanionState();
            }

        } else {

            if (distance > this._state.offsetNum ** 2) {
                this.quicklySampleState(CompanionStateEnum.Follow);
                this.reportCompanionState();
            }
        }

    }




    private reportCompanionState() {
        this._reporter.changeLogicState(this._state)
    }
}

@mw.Component
export default class CompanionRoot extends SyncRootEntity<CompanionState> {



    private _logicController: CompanionLogicController


    protected async onInitialize() {
        await super.onInitialize();
        if (mw.SystemUtil.isClient()) {

            mwext.ModuleService.getModule(CompanionModule_C).getController().registerCompanion(this);
            let prefab = this.displayObject = await mw.GameObject.asyncSpawn(this.displayGuid) as mw.Character;
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
                value.setHosted(this);
            })


        }
    }

    protected onUpdate(dt: number): void {
        this._logicController?.update();
    }
}