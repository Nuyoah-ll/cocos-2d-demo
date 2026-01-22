import { _decorator, Component, Node } from 'cc';
import { UIBase } from './UIBase';
import { StaticSingleton } from './StaticSingleton';
import { bindTouchEvent } from './Util';
const { ccclass } = _decorator;

@ccclass('PassPane')
export class PassPane extends UIBase {
    protected onLoad(): void {
        super.onLoad();
        this.addEventListenerForButton()
    }

    addEventListenerForButton() {
        const [backToHomeButton, nextLevelButton] = this.node.children[1].children;
        bindTouchEvent(backToHomeButton, {
            end: () => StaticSingleton.GameManager.backToStartMenu()
        }, this)
        bindTouchEvent(nextLevelButton, {
            end: () => StaticSingleton.GameManager.toNextLevel()
        }, this)
    }
}

