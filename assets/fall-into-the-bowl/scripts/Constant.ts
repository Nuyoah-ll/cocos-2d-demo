import { LevelInfo } from "./Type"

export enum UIType {
  StartMenu,
  LevelSelect,
  ControlPane,
  GameInfo,
  PassPane,
  FailPane
}

export enum FoodType {
  Cake,
  ChickenWing,
  Chips,
  Hamburger,
  Omelette,
  Zongzi,
}

export enum Direction {
  KeppStatic,
  Left,
  Right
}

export const CONTROL_PANE_MAX_RADIUS = 130

export const FOOD_MOVE_SPEED = 300 // 食物移动速度，单位px/s

export const CHECK_FOOD_STATE_INTERVAL = 0.1 // 检测食物状态的时间间隔，单位s

export const levelsInfo: LevelInfo[] = [
  {
    foodCount: 4,
    foodType: FoodType.ChickenWing
  },
  {
    foodCount: 5,
    foodType: FoodType.Omelette
  },
  {
    foodCount: 6,
    foodType: FoodType.Cake
  },
  {
    foodCount: 7,
    foodType: FoodType.Zongzi
  },
  {
    foodCount: 8,
    foodType: FoodType.Chips
  },
  {
    foodCount: 9,
    foodType: FoodType.Hamburger
  }
]