import { _decorator, Button, CCFloat, CCInteger, Collider2D, Color, Component, Contact2DType, director, FixedJoint2D, Input, input, instantiate, IPhysics2DContact, Label, Node, Prefab, RigidBody2D, Tween, tween, Vec2, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {
    // 开始菜单
    @property(Node)
    startMenu: Node = null;
    // 计分板
    @property(Node)
    scoreBoarder: Node = null;
    // 计分板标题
    @property(Label)
    scoreBoarderTitle: Label = null;
    // 计分板按钮
    @property(Button)
    scoreBoarderBtn: Button = null;

    // 箭矢预制体
    @property(Prefab)
    arrowPrefab: Prefab = null;
    // 靶子
    @property(Node)
    target: Node = null;

    // 显示目标的文案
    @property(Label)
    targetLabel: Label = null;
    // 显示当前得分的文案
    @property(Label)
    scoreLabel: Label = null;
    // 显示当前关卡的文案
    @property(Label)
    levelLabel: Label = null;

    // 箭矢飞行速度
    @property(CCFloat)
    arrowSpeed: number = 0.3;
    // 靶子飞行速度
    @property(CCInteger)
    targetSpeed: number = 100;

    isGameStart: boolean = false;
    currentTargetAngle: number = 0;
    // 初始目标分数
    targetScore: number = 2;
    // 每通过一关，目标分数增加的数量
    scoreIncrement: number = 2;
    // 初始角速度
    targetAngularVelocity = 1;
    // 每通过一关，目标角速度增加的数量
    angularVelocityIncrement = 0.3;
    currentScore: number = 0;
    currentLevel: number = 1;

    protected onLoad(): void {
        this.startMenu.active = true;
        this.scoreBoarder.active = false;
        this.targetLabel.string = ""
        this.scoreLabel.string = ""
        this.levelLabel.string = ""
        input.on(Input.EventType.TOUCH_END, this.onMouseUp, this);
    }

    protected onDestroy(): void {
        input.off(Input.EventType.TOUCH_END, this.onMouseUp, this);
    }

    onMouseUp(): void {
        // 游戏没开始的时候，不做任何操作
        if (!this.isGameStart) {
            return;
        }
        const arrowNode = instantiate(this.arrowPrefab);
        arrowNode.setParent(this.target.parent)
        arrowNode.setPosition(0, -400, 0);
        const collider = arrowNode.getComponent(Collider2D)
        const rigid = arrowNode.getComponent(RigidBody2D)
        rigid.linearVelocity = new Vec2(0, 400)
        collider.on(Contact2DType.BEGIN_CONTACT, (selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact) => {
            this.onArrowCollide(selfCollider, otherCollider, contact);
            collider.off(Contact2DType.BEGIN_CONTACT)
        }, this)
    }

    onArrowCollide(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact) {
        // 如果箭矢撞到了靶子，则计分+1，且将箭固定到靶子上
        if (otherCollider.node === this.target) {
            this.attachArrowToTarget(selfCollider, otherCollider, contact);
            this.currentScore++;
            this.scoreLabel.string = `当前射中${this.currentScore}把箭`
            if (this.currentScore >= this.targetScore) {
                this.isGameStart = false;
                this.scoreBoarder.active = true;
                this.scoreBoarderTitle.string = `你通过了第${this.currentLevel}关`
                this.scoreBoarderTitle.color = new Color(0, 255, 0, 255)
                this.scoreBoarderBtn.node.getChildByName("Label").getComponent(Label).string = "下一关";
                // 成功则增加关卡和目标分数
                this.currentLevel++;
                this.targetScore += this.scoreIncrement;
                this.targetAngularVelocity += this.angularVelocityIncrement
            }
        } else {
            // 撞到了其他箭矢，则游戏失败
            this.isGameStart = false;
            this.scoreBoarder.active = true;
            this.scoreBoarderTitle.string = `你失败了，通过了${this.currentLevel - 1}关`
            this.scoreBoarderTitle.color = new Color(255, 0, 0, 255);
            this.scoreBoarderBtn.node.getChildByName("Label").getComponent(Label).string = "重新开始";
            // 失败则重置关卡和目标分数
            this.currentLevel = 1;
            this.targetScore = 2;
            this.targetAngularVelocity = 1
        }
    }

    attachArrowToTarget(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact) {
        const arrowNode = selfCollider.node
        const arrowRigid = arrowNode.getComponent(RigidBody2D)
        const otherNode = otherCollider.node
        const otherRigid = otherNode.getComponent(RigidBody2D)
        const fixedJoint = arrowNode.addComponent(FixedJoint2D)
        fixedJoint.connectedBody = otherRigid
        const worldPoint = contact.getWorldManifold().points[0]
        const arrowLoc = arrowRigid.getLocalPoint(worldPoint, new Vec2())
        const targetLoc = otherRigid.getLocalPoint(worldPoint, new Vec2())
        fixedJoint.anchor = new Vec2(arrowLoc.x, arrowLoc.y - 10); // -10是避免两个节点重合，然后在靶子转动的过程中，使得箭矢头部和尾部产生不一致的角速度
        fixedJoint.connectedAnchor = targetLoc
        // 碰撞之后防止固定节点抖动
        fixedJoint.dampingRatio = 100000
    }

    onStartBtnClick(): void {
        this.startMenu.active = false;
        this.scoreBoarder.active = false;
        this.levelLabel.string = `第${this.currentLevel}关`
        this.targetLabel.string = `目标：射中${this.targetScore}把箭`;
        this.scoreLabel.string = `当前射中${this.currentScore}把箭`
        setTimeout(() => {
            this.isGameStart = true;
        }, 100);
    }

    onRestartOrNextLevelBtnClick(): void {
        this.scoreBoarder.active = false;
        this.startMenu.active = false;
        this.currentScore = 0;
        this.levelLabel.string = `第${this.currentLevel}关`
        this.targetLabel.string = `目标：射中${this.targetScore}把箭`;
        this.scoreLabel.string = `当前射中${this.currentScore}把箭`
        this.removeAllArrow()
        setTimeout(() => {
            this.isGameStart = true;
        }, 100);
    }

    removeAllArrow() {
        for (let arrow of this.target.parent.children.filter(child => child.name === "Arrow")) {
            arrow.destroy();
        }
    }

    update(deltaTime: number) {
        if (!this.isGameStart) {
            return;
        }
        const rigid = this.target.getComponent(RigidBody2D);
        rigid.angularVelocity = this.targetAngularVelocity
    }
}

