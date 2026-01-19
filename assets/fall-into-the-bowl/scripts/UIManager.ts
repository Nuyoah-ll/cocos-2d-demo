import { _decorator, Component, instantiate, Node, Prefab } from 'cc';
import { StaticSingleton } from './StaticSingleton';
const { ccclass, property } = _decorator;

@ccclass('UIManager')
export class UIManager extends Component {
    @property(Prefab)
    startMenuPrefab: Prefab | null = null;

    protected onLoad(): void {
        StaticSingleton.setUIManager(this);
        const startMenuNode = instantiate(this.startMenuPrefab);
        startMenuNode.parent = this.node;
    }

    start() {
        console.log(StaticSingleton.GameManager, StaticSingleton.UIManager, "UIManager onLoad");
    }

    update(deltaTime: number) {

    }
}

