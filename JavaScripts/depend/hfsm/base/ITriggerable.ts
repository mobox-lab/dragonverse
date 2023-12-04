
export interface ITriggerable<TEvent = string> {

    /**
     * 当trigger被调用激活时调用
     * @param trigger 
     */
    trigger(trigger: TEvent);
}
