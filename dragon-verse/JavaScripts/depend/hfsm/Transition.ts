import { TransitionBase } from './base/TransitionBase';


export type TransitionCondition<TStateId> = (args: Transition<TStateId>) => boolean;

export class Transition<TStateId> extends TransitionBase<TStateId>
{

    public condition: TransitionCondition<TStateId>;


    constructor(from: TStateId, to: TStateId,
        condition: TransitionCondition<TStateId> = null,
        forceInstantly = false) {
        super(from, to, forceInstantly);
        this.condition = condition;

    }

    public init() {

    }

    public enter() {

    }


    public shouldTransition(): boolean {
        if (this.condition === null)
            return true;

        return this.condition?.call(this, this);
    }
}
