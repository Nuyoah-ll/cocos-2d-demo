import { _decorator, Component, Node, resources, Sprite, SpriteFrame, UITransform } from 'cc';
const { ccclass, property } = _decorator;
import levels from "../scripts/levels"
import { TileManager } from './TileManager';
import { dataManager } from './runtime/DataManager';

@ccclass('TiledMapManager')
export class TiledMapManager extends Component {
    start() {

    }

    update(deltaTime: number) {

    }

    async init() {
        const { mapInfo } = dataManager;
        console.log(mapInfo, "mapInfo")
        const tiles = await this.loadRes("cramped-room-of-death/texture/tile/tile")
        for (let i = 0; i < mapInfo.length; i++) {
            const column = mapInfo[i];
            for (let j = 0; j < column.length; j++) {
                const row = column[j];
                if (row.src === null || row.type === null) {
                    continue;
                }
                const spriteFrame = tiles.find(item => item.name === `tile (${row.src})`)
                const node = new Node();
                const tileManager = node.addComponent(TileManager);
                tileManager.init(spriteFrame, i, j);
                node.setParent(this.node);
            }
        }
    }

    loadRes(path: string) {
        return new Promise<SpriteFrame[]>((resolve, reject) => {
            resources.loadDir(path, SpriteFrame, (err, asset) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(asset);
                }
            })
        })
    }
}


