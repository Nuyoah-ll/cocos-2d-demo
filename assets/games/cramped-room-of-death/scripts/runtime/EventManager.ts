// 全局事件管理
export class EventManager {
    static eventDic: Map<string, Array<Function>> = new Map();

    static on(eventName: string, func: Function, ctx?: unknown) {
        if (EventManager.eventDic.has(eventName)) {
            EventManager.eventDic.get(eventName).push(func)
        } else {
            EventManager.eventDic.set(eventName, [ctx ? func.bind(ctx) : func])
        }
    }

    static off(eventName: string, func: Function) {
        if (EventManager.eventDic.has(eventName)) {
            const index = EventManager.eventDic.get(eventName).findIndex(item => item === func)
            if (index > -1) {
                EventManager.eventDic.get(eventName).splice(index, 1)
            }
        }
    }

    static emit(eventName: string, ...args: unknown[]) {
        if (EventManager.eventDic.has(eventName)) {
            EventManager.eventDic.get(eventName).forEach(func => {
                func(...args)
            })
        }
    }

    static clear() {
        EventManager.eventDic.clear()
    }
}