const events = new Map();


export const EventEmmiter = {

    on(event, listener) {
        if (!events.has(event)) events.set(event, []);
        events.get(event).push(listener);
    },
    emmit(event, data) {
        const listeners = events.get(event);
        listeners?.forEach(listener => listener(data));
    }
};