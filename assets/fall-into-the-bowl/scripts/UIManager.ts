import { _decorator, Component, instantiate, Prefab } from 'cc';
import { StaticSingleton } from './StaticSingleton';
import { UIType } from './Constant';
import { UIBase } from './UIBase';
import { StartMenu } from './StartMenu';
import { LevelSelect } from './LevelSelect';
const { ccclass, property } = _decorator;

@ccclass('UIManager')
export class UIManager extends Component {
    @property(Prefab)
    startMenuPrefab: Prefab | null = null;
    @property(Prefab)
    levelSelectPrefab: Prefab | null = null;

    uiMap: Map<UIType, UIBase> = new Map();

    protected onLoad(): void {
        StaticSingleton.setUIManager(this);
        this.initStartMenu();
        this.initLevelSelect();
    }

    start() {
        console.log(StaticSingleton.GameManager, StaticSingleton.UIManager, "UIManager onLoad");
    }

    update(deltaTime: number) {

    }

    initStartMenu() {
        const startMenuNode = instantiate(this.startMenuPrefab);
        startMenuNode.parent = this.node;
        this.uiMap.set(UIType.StartMenu, startMenuNode.getComponent(StartMenu))
    }

    initLevelSelect() {
        const levelSelectNode = instantiate(this.levelSelectPrefab);
        levelSelectNode.parent = this.node;
        this.uiMap.set(UIType.LevelSelect, levelSelectNode.getComponent(LevelSelect))
    }

    changeUI(types: UIType[]) {
        console.log(types);
        this.uiMap.forEach((node, uiType) => {
            console.log(types, uiType)
            if (types.indexOf(uiType) !== -1) {
                node.show();
            } else {
                node.hide();
            }
        })
    }

    gameStart() {
        console.log("游戏开始");
    }

    toLevelSelectScene() {
        this.changeUI([UIType.LevelSelect]);
    }

    backToStartMenu() {
        console.log("返回主菜单" + UIType.StartMenu);
        this.changeUI([UIType.StartMenu]);
    }
}

