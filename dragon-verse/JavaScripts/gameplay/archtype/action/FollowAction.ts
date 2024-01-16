import { FollowContext } from "../context/FollowContext";
import { AAction } from "./base/Action";

export class FollowAction extends AAction<FollowContext> {


    protected onExecuted(context: FollowContext) {
        mw.Navigation.follow(context.owner, context.target, context.radius, () => {

            this.onFollowArrive(context);

        }, () => {

            this.onFollowFailed(context);
        })

    }


    private onFollowArrive(context: FollowContext) {

        this.endInSuccess(context);
    }

    private onFollowFailed(context: FollowContext) {

        this.endInFailure(context);
    }

    protected onUpdate(context: FollowContext) {

    }
    protected onStop(context: FollowContext) {
        mw.Navigation.stopFollow(context.owner);
    }

}