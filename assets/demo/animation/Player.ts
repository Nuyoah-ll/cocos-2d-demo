import { _decorator, Animation, AnimationState, Component, EventKeyboard, Input, input, KeyCode, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Player')
export class Player extends Component {
    animation: Animation | null = null

    protected onLoad(): void {
        console.log("出发了？")
        const animation = this.node.getComponent(Animation);
        this.animation = animation;
        input.on(Input.EventType.KEY_DOWN, this.onKeyPress, this)
        const [upClip] = this.animation.clips;
        // 通过程序给某个动画片段添加帧事件
        upClip.events = [
            {
                frame: 0.1,
                func: "onUpClip",
                params: ["0"]
            }
        ]
        // 监听动画组件的动画事件
        this.animation.on(Animation.EventType.PLAY, (type: Animation.EventType, state: AnimationState) => {
            console.log(type, state, "???")
        }, this)
    }

    onKeyPress(event: EventKeyboard) {
        console.log("按钮按下", event.keyCode)
        switch (event.keyCode) {
            case KeyCode.ARROW_UP:
                this.moveUp();
                break;
            case KeyCode.ARROW_DOWN:
                this.moveDown();
                break;
            case KeyCode.ARROW_LEFT:
                this.moveLeft();
                break;
            case KeyCode.ARROW_RIGHT:
                this.moveRight();
                break;
        }
    }

    onUpClip(...args) {
        console.log(args, "onUpClip")
    }

    moveUp() {
        console.log("向上")
        const move = this.playAnimation("up")
        if (move) {
            this.node.setPosition(this.node.x, this.node.position.y + 55)
        }
    }

    moveDown() {
        console.log("向下")
        const move = this.playAnimation('down')
        if (move) {
            this.node.setPosition(this.node.x, this.node.position.y - 55)
        }
    }


    moveLeft() {
        console.log("向左")
        const move = this.playAnimation("left")
        if (move) {
            this.node.setPosition(this.node.x - 55, this.node.position.y)
        }
    }

    moveRight() {
        console.log("向右")
        const move = this.playAnimation("right")
        if (move) {
            this.node.setPosition(this.node.x + 55, this.node.position.y)
        }
    }

    playAnimation(name: string) {
        // 获取动画的状态
        const state = this.animation.getState(name);
        if (!state.isPlaying) {
            // 通过程序控制动画的内容
            this.animation.play(name)
            return false
        }
        return true
    }

    start() {

    }

    update(deltaTime: number) {

    }
}


