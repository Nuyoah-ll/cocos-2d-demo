import { _decorator, animation, AnimationComponent, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('MarionettePlayer')
export class MarionettePlayer extends Component {
    start() {
        const animationComponent = this.node.getComponent(animation.AnimationController)
        const variables = animationComponent.getVariables()
        console.log(variables);
    }

    update(deltaTime: number) {
        
    }
}


