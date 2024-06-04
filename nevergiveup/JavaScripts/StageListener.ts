
export namespace StageListener {
    let _eventListenerMap: { [id: number]: EventListener[] } = {};
    export function addClientListener(id: number, eventName: string, listener: (player: mw.Player, ...params: unknown[]) => void) {
        let l = Event.addClientListener(eventName, listener);
        if (!_eventListenerMap[id]) {
            _eventListenerMap[id] = [];
        }
        _eventListenerMap[id].push(l);
        return l;
    }

    export function addServerListener(id: number, eventName: string, listener: (...params: unknown[]) => void) {
        let l = Event.addServerListener(eventName, listener);
        if (!_eventListenerMap[id]) {
            _eventListenerMap[id] = [];
        }
        _eventListenerMap[id].push(l);
        return l;
    }

    export function addLocalListener(id: number, eventName: string, listener: (...params: unknown[]) => void) {
        let l = Event.addLocalListener(eventName, listener);
        if (!_eventListenerMap[id]) {
            _eventListenerMap[id] = [];
        }
        _eventListenerMap[id].push(l);
        return l;
    }

    export function removeAllListeners(id: number) {
        let listeners = _eventListenerMap[id];
        if (listeners) {
            let count = 0;
            listeners.forEach(l => {
                count++;
                Event.removeListener(l);
            });
            delete _eventListenerMap[id];
        }
    }
}