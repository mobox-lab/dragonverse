export interface IEvtCom{ 
    evtName: string;
    onGetCall(...params:any[]);
}

export function RegisterEvt<T extends { new(...args: any[]): IEvtCom }>(constructor: T): T  { 
    const instance = new constructor();
    Event.addLocalListener(instance.evtName, instance.onGetCall.bind(instance));
    return constructor;
}
