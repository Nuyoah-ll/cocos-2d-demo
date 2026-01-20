import { _decorator, Node } from 'cc';
import { UIBase } from './UIBase';
import { StaticSingleton } from './StaticSingleton';
const { ccclass, property } = _decorator;

@ccclass('LevelSelect')
export class LevelSelect extends UIBase {
    @property({ type: Node, displayName: '返回主菜单按钮' })
    backToStartMenuButton: Node | null = null;
    
    @property({type: Node, displayName: '关卡选择根节点'})
    levelSelectRootNode: Node | null = null;

    protected onLoad(): void {
        super.onLoad();
    }

    onBackToStartMenuButtonClick() {
        StaticSingleton.UIManager.backToStartMenu();
    }
}

