import { _decorator, Component, Node, tween } from 'cc';
import { UIBase } from './UIBase';
import { StaticSingleton } from './StaticSingleton';
import { bindTouchEvent } from './Util';
const { ccclass, property } = _decorator;

@ccclass('StartMenu')
export class StartMenu extends UIBase {
    @property({ type: Node, displayName: '开始游戏按钮' })
    startGameButton: Node | null = null;

    @property({ type: Node, displayName: '关卡选择按钮' })
    levelSelectButton: Node | null = null;

    protected onLoad(): void {
        super.onLoad();
        this.rotateStartButtonIcon();
        this.addEventListenerForButton()
    }

    addEventListenerForButton() {
        bindTouchEvent(this.startGameButton, {
            end: () => StaticSingleton.GameManager.gameStart()
        }, this)
        bindTouchEvent(this.levelSelectButton, {
            end: () => StaticSingleton.GameManager.toLevelSelectScene()
        }, this)
    }

    private rotateStartButtonIcon() {
        const node = this.startGameButton?.children?.[0]
        node && tween(node).repeatForever(tween().to(0.5, { angle: 10 }).to(0.5, { angle: 0 })).start()
    }
}

