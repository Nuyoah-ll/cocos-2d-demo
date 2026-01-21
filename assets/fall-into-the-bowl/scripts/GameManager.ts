import { _decorator, Component, Node, Prefab, instantiate, RigidBody2D, Collider2D, ERigidBody2DType, Vec2 } from 'cc';
import { StaticSingleton } from './StaticSingleton';
import { CHECK_FOOD_STATE_INTERVAL, Direction, FOOD_MOVE_SPEED, levelsInfo } from './Constant';
import { PhysicsManager } from './PhysicsManager';
import { LevelInfo } from './Type';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {
    @property(Prefab)
    bowlPrefab: Prefab | null = null;
    @property([Prefab])
    foodsPrefabs: Prefab[] = [];

    // 当前关卡
    currentLevel: number = 1;
    // 当前关卡信息
    currentLevelInfo: LevelInfo | null = null;
    // 最高通关关卡
    maxSuccessLevel: number = 0;
    // 是否开始游戏了
    isPlaying: boolean = false;
    // 当前控制的食物
    currentFoodNode: Node | null = null;
    // 食物是否下落中
    isFoodDropping: boolean = false;
    // 食物的移动方向
    direction: Direction = Direction.KeppStatic;
    // 状态检测计时器
    stateCheckTimer: number = 0;

    protected onLoad(): void {
        StaticSingleton.setGameManager(this);
    }

    gameStart(level?: number) {
        level = level || (this.maxSuccessLevel === levelsInfo.length ? 1 : this.maxSuccessLevel + 1);
        this.createBowl()
        this.createFood(level)
        this.currentLevel = level;
        this.currentLevelInfo = levelsInfo[level - 1];
        StaticSingleton.UIManager.updateGameInfo(level, 1, this.currentLevelInfo.foodCount); // 更新游戏信息UI
        this.isPlaying = true;
    }

    createBowl() {
        const bowl = instantiate(this.bowlPrefab);
        this.node.addChild(bowl);
        bowl.setPosition(0, -200, 0);
    }

    createFood(level: number) {
        const food = instantiate(this.foodsPrefabs[level - 1]);
        this.currentFoodNode = food;
        this.node.insertChild(food, 0);
        food.setPosition(0, 450, 0);
        this.currentFoodNode = food;
    }

    rotateFood(angle: number) {
        if (this.currentFoodNode) {
            this.currentFoodNode.angle = angle;
        }
    }

    moveFood(deltaX: number) {
        if (this.currentFoodNode) {
            this.currentFoodNode.setPosition(this.currentFoodNode.position.x + deltaX, this.currentFoodNode.position.y, 0);
        }
    }

    dropFood() {
        this.direction = Direction.KeppStatic;
        PhysicsManager.changeNodeRigidBodyType(this.currentFoodNode, ERigidBody2DType.Dynamic);
        PhysicsManager.changeNodeLinearVelocity(this.currentFoodNode, new Vec2(0, -10));
        this.isFoodDropping = true;
    }

    checkFoodStatus() {
        if (PhysicsManager.isStatic(this.currentFoodNode)) {
            console.log('食物静止，准备生成下一个食物');
        } else {
            console.log('食物未静止');
        }
    }

    update(deltaTime: number) {
        if (this.isPlaying && this.currentFoodNode) {
            if (this.isFoodDropping) {
                this.stateCheckTimer += deltaTime;
                if (this.stateCheckTimer >= CHECK_FOOD_STATE_INTERVAL) {
                    this.checkFoodStatus()
                    this.stateCheckTimer = 0;
                }
            }
            if (this.direction === Direction.Left) {
                this.moveFood(-FOOD_MOVE_SPEED * deltaTime);
            } else if (this.direction === Direction.Right) {
                this.moveFood(FOOD_MOVE_SPEED * deltaTime);
            }
        }

    }
}

