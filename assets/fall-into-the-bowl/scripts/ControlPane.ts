import { _decorator, Component, EventTouch, misc, Node, UIComponent, UITransform, Vec3 } from 'cc';
import { UIBase } from './UIBase';
import { CONTROL_PANE_MAX_RADIUS } from './Constant';
const { ccclass, property } = _decorator;

@ccclass('ControlPane')
export class ControlPane extends UIBase {
    @property(Node)
    leftButton: Node = null;

    @property(Node)
    rightButton: Node = null;

    @property(Node)
    downButton: Node = null;

    @property(Node)
    midCicleButtonBackground: Node = null;

    @property(Node)
    midCircleButton: Node = null;

    onLoad() {
        super.onLoad();
        this.addEventListenersForMidCircleButton();
    }

    addEventListenersForMidCircleButton() {
        this.midCicleButtonBackground.on(Node.EventType.TOUCH_START, this.midCircleButtonTouchStart, this);
        this.midCicleButtonBackground.on(Node.EventType.TOUCH_MOVE, this.midCircleButtonTouchMove, this);
        this.midCicleButtonBackground.on(Node.EventType.TOUCH_END, this.midCircleButtonTouchEnd, this);
        this.midCicleButtonBackground.on(Node.EventType.TOUCH_CANCEL, this.midCircleButtonTouchEnd, this);
    }

    midCircleButtonTouchStart(event: EventTouch) {
        // 获取触点的世界坐标
        const worldPostion = event.getUILocation();
        // 获取该世界坐标在midCicleButtonBackground节点UI布局下的本地坐标
        const locPosition = this.midCicleButtonBackground.getComponent(UITransform).convertToNodeSpaceAR(worldPostion.toVec3())
        // 因为midCircleButton是midCicleButtonBackground子节点，所以他们相对坐标系重合，所以直接将该本地坐标赋值给midCircleButton即可
        this.midCircleButton.setPosition(this.getlimitedMidButtonPosition(locPosition))
        const angle = misc.radiansToDegrees(Math.atan2(this.midCircleButton.y, this.midCircleButton.x))
        // todo 将食物旋转angle角度
        console.log("将食物旋转:", angle)

    }

    midCircleButtonTouchMove(event) {
        this.midCircleButtonTouchStart(event)
    }

    midCircleButtonTouchEnd(event) {
        this.midCircleButton.setPosition(new Vec3())
    }

    // 限制midCircleButton在midCicleButtonBackground内移动
    getlimitedMidButtonPosition(position: Vec3) {
        const len = position.length()
        const radio = CONTROL_PANE_MAX_RADIUS / len;
        if (len >= CONTROL_PANE_MAX_RADIUS) {
            return new Vec3(position.x * radio, position.y * radio, position.z * radio)
        } else {
            return position
        }
    }

    onLefetButtonClick() {
        console.log('Left button clicked');
    }

    onRightButtonClick() {
        console.log('Right button clicked');
    }

    onDownButtonClick() {
        console.log('Down button clicked');
    }
}


