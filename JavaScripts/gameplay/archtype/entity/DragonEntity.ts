import { HeadUIController, HeadUIType } from "../../../controller/HeadUIController";
import GToolkit from "../../../util/GToolkit";
import { TalkAction } from "../action/TalkAction";
import ClientDisplayEntity from "../base/ClientDisplayEntity";
import { CompanionViewController } from "./CompanionController";
import { CompanionState } from "./CompanionState";




@mw.Component
export default class DragonEntity extends ClientDisplayEntity<CompanionState> {





    @DragonEntity.required
    public controller: CompanionViewController

    public nickName: string = ''

    private _talkAction: TalkAction = new TalkAction(['test_tips_1'])



    protected onInitialize(): void {
        super.onInitialize();
        this.controller.context = this.state;
        this.controller.init();
        this.useUpdate = true;
        if (this.state) {
            this.postLogicStateChange(this.state);

        }
        this._talkAction.coolDown = GToolkit.random(60, 120) * 100
        HeadUIController.getInstance().registerHeadUI(this.gameObject, HeadUIType.Dragon, this.nickName)
    }


    private checkTalkAction() {
        if (!this._talkAction.inCoolDown) {
            this._talkAction.execute({
                ownerGuid: this.gameObject.gameObjectId
            })
            this._talkAction.coolDown = GToolkit.random(60, 120) * 100
        }
    }


    public onUpdate(dt: number): void {
        this.controller.context = this.state;
        this.controller.logic();
        this.checkTalkAction();
    }

    protected preLogicStateChange(old: CompanionState, state: CompanionState): CompanionState {

        return state;
    }

    protected postLogicStateChange(state: CompanionState): void {

        this.gameObject.worldTransform.position = (state.start);
        this.controller.requestStateChange(state.stateName, false);
    }

    public onDestroy(): void {
        super.onDestroy();
        this.controller.exit();
    }

}