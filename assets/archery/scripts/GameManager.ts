import { _decorator, Button, CCFloat, CCInteger, Collider2D, Component, Contact2DType, director, Input, input, instantiate, Label, Node, Prefab, Tween, tween, Vec3 } from 'cc';
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
    // 没通过一关，目标分数增加的数量
    scoreIncrement: number = 2;
    currentScore: number = 0;
    currentLevel: number = 1;

    protected onLoad(): void {
        this.startMenu.active = true;
        this.scoreBoarder.active = false;
        this.targetLabel.string = ""
        this.scoreLabel.string = ""
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
        arrowNode.setParent(this.node);
        arrowNode.setPosition(0, -400, 0);
        const collider = arrowNode.getComponent(Collider2D)
        const arrowTween = tween(arrowNode).to(this.arrowSpeed, new Vec3(0, 600, 0))
        collider.on(Contact2DType.BEGIN_CONTACT, (selfCollider: Collider2D, otherCollider: Collider2D) => {
            console.log("arrow collide")
            arrowTween.stop();
            this.onArrowCollide(selfCollider, otherCollider);
            collider.off(Contact2DType.BEGIN_CONTACT)
        }, this)
        arrowTween.start()
    }

    onArrowCollide(selfCollider: Collider2D, otherCollider: Collider2D) {
        const arrowNode = selfCollider.node;
        // 无论箭是撞到了靶子还是其他箭矢，都需要将箭粘住靶子，方便后续重新开始时清楚箭矢
        this.attachArrowToTarget(arrowNode);
        // 如果箭矢撞到了靶子，则计分+1
        if (otherCollider.node === this.target) {
            this.currentScore++;
            this.scoreLabel.string = `当前射中${this.currentScore}把箭`
            if (this.currentScore >= this.targetScore) {
                this.isGameStart = false;
                this.scoreBoarder.active = true;
                this.scoreBoarderTitle.string = `你通过了第${this.currentLevel}关`
                this.scoreBoarderBtn.node.getChildByName("Label").getComponent(Label).string = "下一关";
                // 成功则增加关卡和目标分数
                this.currentLevel++;
                this.targetScore += this.scoreIncrement;
            }
        } else {
            // 撞到了其他箭矢，则游戏失败
            this.isGameStart = false;
            this.scoreBoarder.active = true;
            this.scoreBoarderTitle.string = `你失败了，通过了${this.currentLevel - 1}关`
            this.scoreBoarderBtn.node.getChildByName("Label").getComponent(Label).string = "重新开始";
            // 失败则重置关卡和目标分数
            this.currentLevel = 1;
            this.targetScore = 2;
        }
    }

    attachArrowToTarget(arrowNode: Node) {
        // 获取靶子箭的世界坐标
        const arrowWorldPos = arrowNode.getWorldPosition();
        // 将箭设置为靶子的子节点，此时箭的世界坐标会发生变化
        arrowNode.setParent(this.target)
        // 重新设置箭的世界坐标，保持和之前相同
        arrowNode.setWorldPosition(arrowWorldPos)
        // 将箭的旋转角度设置为靶子的角度的相反数，防止箭在粘住靶子时歪了
        arrowNode.angle = -this.currentTargetAngle;
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
        this.node.getChildByName("Target").removeAllChildren();
        setTimeout(() => {
            this.isGameStart = true;
        }, 100);
    }

    update(deltaTime: number) {
        if (!this.isGameStart) {
            return;
        }
        const angle = deltaTime * this.targetSpeed;
        let newAngle = this.target.angle + angle;
        if (newAngle >= 360) {
            newAngle = newAngle - 360
        }
        this.currentTargetAngle = this.target.angle = newAngle;
    }
}

