import { _decorator, Component, Node, Sprite, SpriteFrame, UITransform } from 'cc';
const { ccclass, property } = _decorator;


@ccclass('TileManager')
export class TileManager extends Component {
    static TILE_WIDTH = 55;
    static TILE_HEIGHT = 55;

    init(spriteFrame: SpriteFrame, i: number, j: number) {
        this.node.addComponent(TileManager);
        const sprite = this.node.addComponent(Sprite);
        sprite.spriteFrame = spriteFrame;
        const transform = this.node.getComponent(UITransform)
        transform.setAnchorPoint(0, 0)
        transform.setContentSize(TileManager.TILE_WIDTH, TileManager.TILE_HEIGHT)
        this.node.setPosition(i * TileManager.TILE_WIDTH, -j * TileManager.TILE_HEIGHT);
        return this.node
    }
}


