import { _decorator, Component, Node } from 'cc';
import { UIBase } from './UIBase';
import { StaticSingleton } from './StaticSingleton';
import { bindTouchEvent } from './Util';
const { ccclass } = _decorator;

@ccclass('FailPane')
export class FailPane extends UIBase {
    protected onLoad(): void {
        super.onLoad();
        this.addEventListenerForButton()
    }

    addEventListenerForButton() {
        const [backToHomeButton, retryButton] = this.node.children[1].children;
        bindTouchEvent(backToHomeButton, {
            end: () => StaticSingleton.GameManager.backToStartMenu()
        }, this)
        bindTouchEvent(retryButton, {
            end: () => StaticSingleton.GameManager.restartThisLevel()
        }, this)
    }
}

