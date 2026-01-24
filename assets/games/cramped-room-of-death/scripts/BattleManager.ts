import { _decorator, Component, Node, UITransform } from 'cc';
import { TiledMapManager } from './TiledMapManager';
import levels, { ILevel } from './levels';
import { DataManager } from './runtime/DataManager';
import { TileManager } from './TileManager';
import { EventManager } from './runtime/EventManager';
import { EVENT_ENUM } from './Enum';
import { PlayerManager } from './PlayerManager';
const { ccclass, property } = _decorator;

@ccclass('BattleManager')
export class BattleManager extends Component {
    level: ILevel | null = null;
    stage: Node | null = null;

    protected onLoad(): void {
        EventManager.on(EVENT_ENUM.NEXT_LEVEL, this.nextLevel, this)
    }

    protected onDestroy(): void {
        EventManager.off(EVENT_ENUM.NEXT_LEVEL, this.nextLevel, this)
    }

    start() {
        this.initStage();
        this.initLevel();
    }

    initStage() {
        const stage = new Node();
        this.stage = stage;
        stage.setParent(this.node)
    }

    clearLevel() {
        this.stage.removeAllChildren();
        DataManager.reset();
    }

    initLevel() {
        this.clearLevel();
        const level = levels[`level${DataManager.levelIndex}`];
        if (level) {
            this.level = level;
            DataManager.mapInfo = level.mapInfo;
            DataManager.mapRowCount = level.mapInfo.length || 0;
            DataManager.mapColCount = level.mapInfo[0].length || 0
            this.generateTiledMap();
            this.generatePlayer();
        }
    }

    generatePlayer() {
        const player = new Node();
        player.setParent(this.stage);
        const playerManager = player.addComponent(PlayerManager);
        playerManager.init();
    }

    nextLevel() {
        DataManager.levelIndex++;
        this.initLevel();
    }

    generateTiledMap() {
        const tiledMap = new Node();
        tiledMap.setParent(this.stage);
        const tiledMapManager = tiledMap.addComponent(TiledMapManager)
        tiledMapManager.init()
        this.adaptScreen();
    }

    adaptScreen() {
        const { mapRowCount, mapColCount } = DataManager;
        const deltaX = mapRowCount * TileManager.TILE_WIDTH / 2;
        const deltaY = mapColCount * TileManager.TILE_HEIGHT / 2;
        this.stage.setPosition(-deltaX, deltaY)
    }
}


