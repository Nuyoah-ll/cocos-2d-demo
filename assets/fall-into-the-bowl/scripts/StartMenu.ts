import { _decorator, Component, Node, tween } from 'cc';
import { UIBase } from './UIBase';
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
    }

    private rotateStartButtonIcon() {
        const node = this.startGameButton?.children?.[0]
        node && tween(node).repeatForever(tween().to(0.5, { angle: 10 }).to(0.5, { angle: 0 })).start()
    }

    onStartButtonClick() {
        console.log("开始游戏按钮点击");
    }

    onLevelSelectButtonClick() {
        console.log("关卡选择按钮点击");
    }
}

