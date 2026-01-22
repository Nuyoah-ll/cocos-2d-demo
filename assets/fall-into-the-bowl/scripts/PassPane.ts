import { _decorator, Component, Node } from 'cc';
import { UIBase } from './UIBase';
import { StaticSingleton } from './StaticSingleton';
const { ccclass, property } = _decorator;

@ccclass('PassPane')
export class PassPane extends UIBase {
    protected onLoad(): void {
        super.onLoad();
    }

    onBackToHome() {
        StaticSingleton.GameManager.backToStartMenu();
    }

    onToNextLevel() {
        StaticSingleton.GameManager.toNextLevel();
    }
}

