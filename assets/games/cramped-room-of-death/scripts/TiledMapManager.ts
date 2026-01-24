import { _decorator, Component, Node, resources, Sprite, SpriteFrame, UITransform } from 'cc';
const { ccclass, property } = _decorator;
import levels from "../scripts/levels"
import { TileManager } from './TileManager';
import { DataManager } from './runtime/DataManager';
import { ResourceManager } from './runtime/ResourceManager';
import { getRandomIntInclusiveEnd } from './utils';

@ccclass('TiledMapManager')
export class TiledMapManager extends Component {
    start() {

    }

    update(deltaTime: number) {

    }

    async init() {
        const { mapInfo } = DataManager;
        const tiles = await ResourceManager.loadDir("cramped-room-of-death/texture/tile/tile")
        for (let i = 0; i < mapInfo.length; i++) {
            const column = mapInfo[i];
            for (let j = 0; j < column.length; j++) {
                const row = column[j];
                if (row.src === null || row.type === null) {
                    continue;
                }
                let tileIndex = row.src;
                // 如果是地板、竖直的墙、横着的墙，它们各有4个不同版本，这里在偶数瓦片上随机生成4个版本中的一个
                if ([1, 5, 9].indexOf(tileIndex) !== -1 && i % 2 === 0 && j % 2 === 0) {
                    tileIndex += getRandomIntInclusiveEnd(0, 3)
                }
                const spriteFrame = tiles.find(item => item.name === `tile (${tileIndex})`)
                const node = new Node();
                const tileManager = node.addComponent(TileManager);
                tileManager.init(spriteFrame, i, j);
                node.setParent(this.node);
            }
        }
    }
}


