import { _decorator, Animation, AnimationState, Component, EventKeyboard, Input, input, KeyCode, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Player')
export class Player extends Component {
    animation: Animation | null = null
    direction: string = "up"

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
    }

    onKeyPress(event: EventKeyboard) {
        console.log("按钮按下", event.keyCode)
        switch (event.keyCode) {
            case KeyCode.KEY_Q:
                this.turnLeft();
                break;
            case KeyCode.KEY_E:
                this.turnRight();
                break;
            case KeyCode.KEY_W:
                this.moveUp();
                break;
            case KeyCode.KEY_S:
                this.moveDown();
                break;
            case KeyCode.KEY_A:
                this.moveLeft();
                break;
            case KeyCode.KEY_D:
                this.moveRight();
                break;
        }
    }

    onUpClip(){
        
    }

    turnLeft() {
        if (this.direction === "up") {
            this.playAnimation("lefttoleft", () => {
                this.playAnimation("left")
                this.direction = "left"
            })
        }
        if (this.direction === "left") {
            this.playAnimation("lefttodown", () => {
                this.playAnimation("down")
                this.direction = "down"
            })
        }
        if (this.direction === "down") {
            this.playAnimation("lefttoright", () => {
                this.playAnimation("right")
                this.direction = "right"
            })
        }
        if (this.direction === "right") {
            this.playAnimation("lefttoup", () => {
                this.playAnimation("up")
                this.direction = "up"
            })
        }
    }

    turnRight() {
        if (this.direction === "up") {
            this.playAnimation("righttoright", () => {
                this.playAnimation("right")
                this.direction = "right"
            })
        }
        if (this.direction === "right") {
            this.playAnimation("righttodown", () => {
                this.playAnimation("down")
                this.direction = "down"
            })
        }
        if (this.direction === "down") {
            this.playAnimation("righttoleft", () => {
                this.playAnimation("left")
                this.direction = "left"
            })
        }
        if (this.direction === "left") {
            this.playAnimation("righttoup", () => {
                this.playAnimation("up")
                this.direction = "up"
            })
        }
    }

    moveUp() {
        this.node.setPosition(this.node.x, this.node.position.y + 55)
    }

    moveDown() {
        this.node.setPosition(this.node.x, this.node.position.y - 55)
    }

    moveLeft() {
        this.node.setPosition(this.node.x - 55, this.node.position.y)
    }

    moveRight() {
        this.node.setPosition(this.node.x + 55, this.node.position.y)
    }

    playAnimation(name: string, func?: Function) {
        if (func) {
            const callback = () => {
                func()
                this.animation.off(Animation.EventType.FINISHED, callback, this)
            }
            this.animation.on(Animation.EventType.FINISHED, callback, this)
        }
        // 获取动画的状态
        const state = this.animation.getState(name);
        if (!state.isPlaying) {
            // 通过程序控制动画的内容
            this.animation.play(name)
        }
    }
}


