import { _decorator, animation, Animation, AnimationClip, Component, math, Node, Sprite, UITransform } from 'cc';
import { TileManager } from './TileManager';
import { ResourceManager } from './runtime/ResourceManager';
import { CONTROLLER_ENUM, EVENT_ENUM } from './Enum';
import { EventManager } from './runtime/EventManager';
const { ccclass, property } = _decorator;

// 动画帧切换速度，1/ 8s，按标准60帧1s，这里相当于是7.5帧切换依次动画
const ANIMATION_SPEED = 1 / 8

@ccclass('PlayerManager')
export class PlayerManager extends Component {
    x: number = 0 // 角色所处坐标
    y: number = 0
    targetX: number = 0
    targetY: number = 0
    // todo 这里的速度指的是什么
    private readonly speed = 1 / 10

    update() {
        this.updateXY();
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

    updateXY() {
        if (this.targetX < this.x) {
            this.x -= this.speed
        }
        if (this.targetX > this.x) {
            this.x += this.speed
        }
        if (this.targetY < this.y) {
            this.y -= this.speed
        }
        if (this.targetY > this.y) {
            this.y += this.speed
        }
        if (Math.abs(this.targetX - this.x) <= 0.1 && Math.abs(this.targetY - this.y) <= 0.1) {
            this.x = this.targetX;
            this.y = this.targetY;
        }
    }

    move(inputDirection: CONTROLLER_ENUM) {
        if (inputDirection === CONTROLLER_ENUM.TOP) {
            this.targetY -= 1
        }
        if (inputDirection === CONTROLLER_ENUM.BOTTOM) {
            this.targetY += 1
        }
        if (inputDirection === CONTROLLER_ENUM.LEFT) {
            this.targetX -= 1
        }
        if (inputDirection === CONTROLLER_ENUM.RIGHT) {
            this.targetX += 1
        }

        // todo 这里的代码的作用是？
        if (Math.abs(this.targetX - this.x) <= 0.1 && Math.abs(this.targetY - this.y) <= 0.1) {
            this.x = this.targetX;
            this.y = this.targetY;
        }
    }

    async init() {
        await this.render()
        EventManager.on(EVENT_ENUM.PLAYER_CTRL, this.move, this)
    }

    // todo 这里还需要再学习下
    async render() {
        // 加载朝上的四个动画帧，作为角色的默认动作
        const topSpriteFrameList = await ResourceManager.loadDir("cramped-room-of-death/texture/player/idle/top");

        // 创建精灵组件
        const sprite = this.node.addComponent(Sprite)
        sprite.sizeMode = Sprite.SizeMode.CUSTOM;

        // 修改角色的尺寸
        const uiTransform = this.node.getComponent(UITransform);
        // 原点放在左上角，和瓦片一样
        uiTransform.setAnchorPoint(0, 1)
        uiTransform.contentSize = new math.Size(TileManager.TILE_WIDTH * 4, TileManager.TILE_HEIGHT * 4);

        // 给角色添加动画组件
        const animationCom = this.node.addComponent(Animation);

        // 创建AnimationClip
        const animationClip = new AnimationClip();
        // 动画持续时间4*1/8
        animationClip.duration = topSpriteFrameList.length * ANIMATION_SPEED;
        // 添加对象轨道并指定该轨道对应的属性是spriteFrame
        const track = new animation.ObjectTrack();
        track.path = new animation.TrackPath().toComponent(Sprite).toProperty("spriteFrame");
        // 设置每一帧对应的帧图片
        track.channel.curve.assignSorted(
            topSpriteFrameList.map((frame, index) => [index * ANIMATION_SPEED, frame]),
        )
        animationClip.addTrack(track);
        // 修改动画为循环播放
        animationClip.wrapMode = AnimationClip.WrapMode.Loop

        // 修改下动画组件相关的属性
        animationCom.defaultClip = animationClip;
        animationCom.playOnLoad = true
        animationCom.addClip(animationClip);
        animationCom.play();
    }
}


