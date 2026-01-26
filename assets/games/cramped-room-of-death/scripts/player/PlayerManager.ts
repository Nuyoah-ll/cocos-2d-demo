import { _decorator } from 'cc';
import {
    CONTROLLER_ENUM,
    DIRECTION_ENUM,
    ENTITY_STATE_ENUM,
    ENTITY_TYPE_ENUM,
    EVENT_ENUM,
} from '../Enum';
import { EventManager } from '../runtime/EventManager';
import { PlayerStatusMachine } from './PlayerStatusMachine';
import { EntityManager } from '../base/EntityManager';
const { ccclass, property } = _decorator;

@ccclass('PlayerManager')
export class PlayerManager extends EntityManager {
    targetX: number = 0
    targetY: number = 0
    // todo 这里的速度指的是什么
    private readonly speed = 1 / 10

    update() {
        this.updateXY();
        super.update();
    }

    updateXY() {
        if (this.targetX < this.x) {
            this.x -= this.speed
        }
        if (this.targetX > this.x) {
            this.x += this.speed
        }
        if (this.targetY < this.y) {
            this.y -= this.speed
        }
        if (this.targetY > this.y) {
            this.y += this.speed
        }
        if (Math.abs(this.targetX - this.x) <= 0.1 && Math.abs(this.targetY - this.y) <= 0.1) {
            this.x = this.targetX;
            this.y = this.targetY;
        }
    }

    move(inputDirection: CONTROLLER_ENUM) {
        // 控制角色移动
        if (inputDirection === CONTROLLER_ENUM.TOP) {
            this.targetY -= 1
        }
        if (inputDirection === CONTROLLER_ENUM.BOTTOM) {
            this.targetY += 1
        }
        if (inputDirection === CONTROLLER_ENUM.LEFT) {
            this.targetX -= 1
        }
        if (inputDirection === CONTROLLER_ENUM.RIGHT) {
            this.targetX += 1
        }
        if (Math.abs(this.targetX - this.x) <= 0.1 && Math.abs(this.targetY - this.y) <= 0.1) {
            this.x = this.targetX;
            this.y = this.targetY;
        }
        // 控制角色向左转，改变方向和角色状态
        if (inputDirection === CONTROLLER_ENUM.TURNLEFT) {
            if (this.direction === DIRECTION_ENUM.TOP) {
                this.direction = DIRECTION_ENUM.LEFT
            } else if (this.direction === DIRECTION_ENUM.LEFT) {
                this.direction = DIRECTION_ENUM.BOTTOM
            } else if (this.direction === DIRECTION_ENUM.BOTTOM) {
                this.direction = DIRECTION_ENUM.RIGHT
            } else if (this.direction === DIRECTION_ENUM.RIGHT) {
                this.direction = DIRECTION_ENUM.TOP
            }
            this.status = ENTITY_STATE_ENUM.TURNLEFT
        }
        // 控制角色向右转，改变方向和角色状态
        if (inputDirection === CONTROLLER_ENUM.TURNRIGHT) {
            if (this.direction === DIRECTION_ENUM.TOP) {
                this.direction = DIRECTION_ENUM.RIGHT
            } else if (this.direction === DIRECTION_ENUM.RIGHT) {
                this.direction = DIRECTION_ENUM.BOTTOM
            } else if (this.direction === DIRECTION_ENUM.BOTTOM) {
                this.direction = DIRECTION_ENUM.LEFT
            } else if (this.direction === DIRECTION_ENUM.LEFT) {
                this.direction = DIRECTION_ENUM.TOP
            }
            this.status = ENTITY_STATE_ENUM.TURNRIGHT
        }
    }

    async init() {
        // 设置初始状态为向上的挂机状态（因为是走的setter，所以会触发动画，坐标为（0,0）
        super.init({
            x: 0,
            y: 0,
            direction: DIRECTION_ENUM.TOP,
            state: ENTITY_STATE_ENUM.IDLE,
            type: ENTITY_TYPE_ENUM.PLAYER,
        })
        // 注册全局的角色控制事件，在ControllerManager中通过各个按钮的点击来触发
        EventManager.on(EVENT_ENUM.PLAYER_CTRL, this.move, this)
    }
}


