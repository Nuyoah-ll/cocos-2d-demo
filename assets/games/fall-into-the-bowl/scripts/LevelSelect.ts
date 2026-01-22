import { _decorator, Label, Node } from 'cc';
import { UIBase } from './UIBase';
import { StaticSingleton } from './StaticSingleton';
import { bindTouchEvent } from './Util';
const { ccclass, property } = _decorator;

@ccclass('LevelSelect')
export class LevelSelect extends UIBase {
    @property({ type: Node, displayName: '返回主菜单按钮' })
    backToStartMenuButton: Node | null = null;

    protected onLoad(): void {
        super.onLoad();
        this.addEventListenerForButton()
    }

    addEventListenerForButton() {
        bindTouchEvent(this.backToStartMenuButton, {
            end: () => StaticSingleton.GameManager.backToStartMenu()
        }, this)
    }

    updateLevelItem() {
        this.node.children[0].children.forEach((levelItem, index) => {
            const [levelInfoNode, isUnlockLabel] = levelItem.children;
            isUnlockLabel.getComponent(Label).string = StaticSingleton.GameManager.maxSuccessLevel >= index + 1 ? "已解锁" : "未解锁";
        })
    }
}

