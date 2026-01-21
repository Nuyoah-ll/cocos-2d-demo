import { _decorator, Button, Component, EventHandler, instantiate, Label, Layout, Prefab, Node } from 'cc';
import { StaticSingleton } from './StaticSingleton';
import { levelsInfo, UIType } from './Constant';
import { UIBase } from './UIBase';
import { StartMenu } from './StartMenu';
import { LevelSelect } from './LevelSelect';
import { ControlPane } from './ControlPane';
import { bindTouchEvent } from './Util';
import { LevelInfo } from './Type';
import { GameInfo } from './GameInfo';
const { ccclass, property } = _decorator;

@ccclass('UIManager')
export class UIManager extends Component {
    @property(Prefab)
    startMenuPrefab: Prefab | null = null;
    @property(Prefab)
    levelSelectPrefab: Prefab | null = null;
    @property(Prefab)
    levelItemPrefab: Prefab | null = null;
    @property(Prefab)
    controlPanePrefab: Prefab | null = null;

    @property(Prefab)
    gameInfoPrefab: Prefab | null = null;

    uiMap: Map<UIType, UIBase> = new Map();

    protected onLoad(): void {
        StaticSingleton.setUIManager(this);
        this.initStartMenu();
        this.initLevelSelect();
        this.initControlPane();
        this.initGameInfo();
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
        levelsInfo.map(this.initLevelItem.bind(this)).forEach((item: Node) => levelSelectNode.children[0].addChild(item));
        levelSelectNode.parent = this.node;
        this.uiMap.set(UIType.LevelSelect, levelSelectNode.getComponent(LevelSelect))
    }

    initLevelItem(levelInfo: LevelInfo, index: number) {
        console.log("初始化关卡项:", levelInfo, index);
        const levelItemNode = instantiate(this.levelItemPrefab);
        const foodNode = instantiate(StaticSingleton.GameManager.foodsPrefabs[index])
        const [levelInfoNode, isUnlockLoabel] = levelItemNode.children;
        bindTouchEvent(levelInfoNode, {
            end: (e) => {
                this.changeUI([UIType.ControlPane, UIType.GameInfo]);
                StaticSingleton.GameManager.gameStart(index + 1);
            }
        })
        isUnlockLoabel.getComponent(Label).string = StaticSingleton.GameManager.maxSuccessLevel >= index + 1 ? "已解锁" : "未解锁";
        const [levelLabal, levelFood] = levelInfoNode.children;
        levelLabal.getComponent(Label).string = `${index + 1}`;
        const [foodCount, food] = levelFood.children;
        food.removeFromParent();
        foodCount.getComponent(Label).string = `${levelInfo.foodCount}X`;
        levelFood.addChild(foodNode);
        return levelItemNode;
    }

    initControlPane() {
        const controlPaneNode = instantiate(this.controlPanePrefab);
        controlPaneNode.parent = this.node;
        this.uiMap.set(UIType.ControlPane, controlPaneNode.getComponent(ControlPane))
    }

    initGameInfo() {
        const gameInfoNode = instantiate(this.gameInfoPrefab);
        gameInfoNode.parent = this.node;
        this.uiMap.set(UIType.GameInfo, gameInfoNode.getComponent(GameInfo))
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
        this.changeUI([UIType.ControlPane, UIType.GameInfo]);
        StaticSingleton.GameManager.gameStart();
    }

    toLevelSelectScene() {
        this.changeUI([UIType.LevelSelect]);
    }

    backToStartMenu() {
        this.changeUI([UIType.StartMenu]);
    }

    updateGameInfo(level: number, count: number, totalCount: number) {
        const gameInfo = this.uiMap.get(UIType.GameInfo) as GameInfo;
        gameInfo.changeLevel(level);
        gameInfo.changeCount(count, totalCount);
    }
}

