import { _decorator, Component, Node } from 'cc';
import { UIBase } from './UIBase';
import { StaticSingleton } from './StaticSingleton';
const { ccclass, property } = _decorator;

@ccclass('FailPane')
export class FailPane extends UIBase {
    protected onLoad(): void {
        super.onLoad();
    }

    onBackToHome() {
        StaticSingleton.GameManager.backToStartMenu();
    }

    onRestartThisLevel() {
        StaticSingleton.GameManager.restartThisLevel();
    }
}

