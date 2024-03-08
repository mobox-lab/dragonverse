import { AnimatorEventTrigger } from "./AnimatorEventTrigger";
import { InferAction } from "./events/InferAction";

export class Animator{



    private static eventsTrigger:AnimatorEventTrigger = new AnimatorEventTrigger();
    
    
    onAnimationEnd: mw.Animator.OnAnimationEndDelegate = new InferAction();
    
    onEventNotified: mw.Animator.EventNotifiedDelegate = new InferAction();

    
    private _registeredEvent:mw.Animator.AnimationEventArgs[]


    protected setRegisteredEvent(value:mw.Animator.AnimationEventArgs[]){
        if(this._registeredEvent){
            Animator.eventsTrigger.remove(this);
        }
        
        this._registeredEvent = value;
        
        if(this._registeredEvent){
            Animator.eventsTrigger.addEvents(this);
        }
    }



    static update(dt:number){
        Animator.eventsTrigger.update(dt);
    }


    protected clear(){
        Animator.eventsTrigger.remove(this);
        this.onAnimationEnd.clear();
        this.onEventNotified.clear();
    }

}