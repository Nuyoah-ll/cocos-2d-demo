import { _decorator, Component, Node } from 'cc';
import { StaticSingleton } from './StaticSingleton';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {
    protected onLoad(): void {
        StaticSingleton.setGameManager(this);
    }

    start() {

    }

    update(deltaTime: number) {

    }
}

