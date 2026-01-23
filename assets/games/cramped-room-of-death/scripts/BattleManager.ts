import { _decorator, Component, Node } from 'cc';
import { TiledMapManager } from './TiledMapManager';
import levels, { ILevel } from './levels';
import { dataManager } from './runtime/DataManager';
import { TileManager } from './TileManager';
const { ccclass, property } = _decorator;

@ccclass('BattleManager')
export class BattleManager extends Component {
    level: ILevel | null = null;
    stage: Node | null = null;

    start() {
        this.initStage();
        this.initLevel();
    }

    initStage() {
        const stage = new Node();
        this.stage = stage;
        stage.setParent(this.node)
    }

    initLevel() {
        const level = levels.level1;
        if (level) {
            this.level = level;
            dataManager.mapInfo = level.mapInfo;
            dataManager.mapRowCount = level.mapInfo.length || 0;
            dataManager.mapColCount = level.mapInfo[0].length || 0
            this.generateTiledMap();
        }
    }

    generateTiledMap() {
        const tiledMap = new Node();
        tiledMap.setParent(this.stage);
        const tiledMapManager = tiledMap.addComponent(TiledMapManager)
        tiledMapManager.init()
        this.adaptScreen();
    }

    adaptScreen() {
        const { mapRowCount, mapColCount } = dataManager;
        const deltaX = mapRowCount * TileManager.TILE_WIDTH / 2;
        const deltaY = mapColCount * TileManager.TILE_HEIGHT / 2;
        this.stage.setPosition(-deltaX, deltaY)
    }
}


