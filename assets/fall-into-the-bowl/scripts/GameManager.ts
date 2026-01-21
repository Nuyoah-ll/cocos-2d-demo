import { _decorator, Component, Node, Prefab, instantiate, RigidBody2D, Collider2D, ERigidBody2DType, Vec2 } from 'cc';
import { StaticSingleton } from './StaticSingleton';
import { Direction, FOOD_MOVE_SPEED, levelsInfo } from './Constant';
import { PhysicsManager } from './physicsManager';
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
    currentLevelInfo: LevelInfo | null = null;
    // 最高通关关卡
    maxSuccessLevel: number = 1;
    // 是否开始游戏了
    isPlaying: boolean = false;
    // 当前控制的食物
    currentFoodNode: Node | null = null;
    // 食物的移动方向
    direction: Direction = Direction.KeppStatic;

    protected onLoad(): void {
        StaticSingleton.setGameManager(this);
    }

    gameStart(level?: number) {
        this.isPlaying = true;
        level = level || (this.maxSuccessLevel === levelsInfo.length ? 1 : this.maxSuccessLevel + 1);
        this.createBowl()
        this.createFood(level)
        this.currentLevel = level;
        this.currentLevelInfo = levelsInfo[level - 1];
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
    }

    update(deltaTime: number) {
        if (this.direction === Direction.Left) {
            this.moveFood(-FOOD_MOVE_SPEED * deltaTime);
        } else if (this.direction === Direction.Right) {
            this.moveFood(FOOD_MOVE_SPEED * deltaTime);
        }
    }
}

