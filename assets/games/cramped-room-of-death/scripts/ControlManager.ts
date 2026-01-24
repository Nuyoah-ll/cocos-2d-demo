import { _decorator, Component, Node } from 'cc';
import { EventManager } from './runtime/EventManager';
import { EVENT_ENUM } from './Enum';
const { ccclass, property } = _decorator;

@ccclass('ControlManager')
export class ControlManager extends Component {
    protected onLoad(): void {
        this.node.children[0].on(Node.EventType.TOUCH_START, this.handleControl, this)
    }

    update(deltaTime: number) {

    }


    // todo 临时
    handleControl() {
        EventManager.emit(EVENT_ENUM.NEXT_LEVEL)
    }
}


