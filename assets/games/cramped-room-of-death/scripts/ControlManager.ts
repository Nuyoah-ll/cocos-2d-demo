import { _decorator, Component, Node } from 'cc';
import { EventManager } from './runtime/EventManager';
import { CONTROLLER_ENUM, EVENT_ENUM } from './Enum';
const { ccclass, property } = _decorator;

@ccclass('ControlManager')
export class ControlManager extends Component {
    protected onLoad(): void {
        this.node.children[1].on(Node.EventType.TOUCH_END, this.moveLeft, this)
        this.node.children[2].on(Node.EventType.TOUCH_END, this.moveUp, this)
        this.node.children[3].on(Node.EventType.TOUCH_END, this.moveDown, this)
        this.node.children[5].on(Node.EventType.TOUCH_END, this.moveRight, this)
        this.node.children[0].on(Node.EventType.TOUCH_END, this.turnLeft, this)
        this.node.children[4].on(Node.EventType.TOUCH_END, this.turnRight, this)
    }

    update(deltaTime: number) {

    }

    moveUp() {
        EventManager.emit(EVENT_ENUM.PLAYER_CTRL, CONTROLLER_ENUM.TOP)
    }

    moveDown() {
        EventManager.emit(EVENT_ENUM.PLAYER_CTRL, CONTROLLER_ENUM.BOTTOM)
    }

    moveLeft() {
        EventManager.emit(EVENT_ENUM.PLAYER_CTRL, CONTROLLER_ENUM.LEFT)
    }

    moveRight() {
        EventManager.emit(EVENT_ENUM.PLAYER_CTRL, CONTROLLER_ENUM.RIGHT)
    }

    turnLeft() {
        EventManager.emit(EVENT_ENUM.PLAYER_CTRL, CONTROLLER_ENUM.TURNLEFT)
    }

    turnRight() {
        EventManager.emit(EVENT_ENUM.PLAYER_CTRL, CONTROLLER_ENUM.TURNRIGHT)
    }
}


