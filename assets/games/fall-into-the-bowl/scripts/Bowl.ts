import { _decorator, Component, Node, tween } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Bowl')
export class Bowl extends Component {
    protected onLoad(): void {
        tween(this.node).repeatForever(
            tween().to(1, {}).call(() => {
                const [frame1, frame2] = this.node.children;
                frame1.active = false
                frame2.active = true
            }).to(0.2, {}).call(() => {
                const [frame1, frame2] = this.node.children;
                frame1.active = true
                frame2.active = false
            })
        ).start();
    }
}


