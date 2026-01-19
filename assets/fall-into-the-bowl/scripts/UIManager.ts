import { _decorator, Component, Node } from 'cc';
import { StaticSingleton } from './StaticSingleton';
const { ccclass, property } = _decorator;

@ccclass('UIManager')
export class UIManager extends Component {
    protected onLoad(): void {
        StaticSingleton.setUIManager(this);
    }

    start() {
        console.log(StaticSingleton.GameManager, StaticSingleton.UIManager, "UIManager onLoad");
    }

    update(deltaTime: number) {

    }
}

