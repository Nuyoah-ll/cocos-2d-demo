import { _decorator, Component, math, Sprite, UITransform } from 'cc';
import { TileManager } from '../TileManager';
import { DIRECTION_ENUM, DIRECTION_ORDER_ENUM, ENTITY_STATE_ENUM, PARAMS_NAME_ENUM } from '../Enum';
import { PlayerStatusMachine } from '../player/PlayerStatusMachine';
import { IEntity } from '../levels';
const { ccclass, property } = _decorator;

@ccclass('EntityManager')
export class EntityManager extends Component {
  x: number = 0 // 实体所处坐标
  y: number = 0
  fsm: PlayerStatusMachine | null = null

  private _direction: DIRECTION_ENUM
  private _status: ENTITY_STATE_ENUM

  get direction() {
    return this._direction
  }

  set direction(value: DIRECTION_ENUM) {
    this._direction = value
    // 当角色方向变更时，需要修改DIRECTION参数，从而选择驱动哪个子动画
    console.log(this._direction)
    console.log(DIRECTION_ORDER_ENUM[this._direction])
    this.fsm.setParams(PARAMS_NAME_ENUM.DIRECTION, DIRECTION_ORDER_ENUM[this._direction])
  }

  get status() {
    return this._status
  }

  set status(value: ENTITY_STATE_ENUM) {
    this._status = value
    // 当实体状态变更时，修改状态机对应的状态的触发器参数，从而执行对应的动画
    this.fsm.setParams(this._status, true)
  }

  update() {
    // 因为角色所处的节点宽高是瓦片的4倍，所以想要角色在视觉效果上刚好处于坐标上，所以需要偏移1.5倍瓦片宽度
    // 下图每每四个0代表一个瓦片。四个1代表角色视觉中心
    // 00|00|00|00
    // 00|00|00|00
    // -----------
    // 00|00|00|00
    // 00|01|10|00
    // -----------
    // 00|01|10|00
    // 00|00|00|00
    // -----------
    // 00|00|00|00
    // 00|00|00|00
    this.node.setPosition(
      this.x * TileManager.TILE_WIDTH - TileManager.TILE_WIDTH * 1.5,
      -this.y * TileManager.TILE_HEIGHT + TileManager.TILE_HEIGHT * 1.5);
  }

  async init(params: IEntity) {
    // 创建精灵组件
    const sprite = this.node.addComponent(Sprite)
    sprite.sizeMode = Sprite.SizeMode.CUSTOM;
    // 修改实体的尺寸
    const uiTransform = this.node.getComponent(UITransform);
    // 原点放在左上角，和瓦片一样
    uiTransform.setAnchorPoint(0, 1)
    uiTransform.contentSize = new math.Size(TileManager.TILE_WIDTH * 4, TileManager.TILE_HEIGHT * 4);

    // 初始化动画状态机, 注意这里的状态机脚本是挂载在对应的节点下面的
    this.fsm = this.node.addComponent(PlayerStatusMachine)
    await this.fsm.init();

    // 设置初始状态
    this.x = params.x
    this.y = params.y
    this.direction = params.direction
    this.status = params.state
  }
}


