import { LevelInfo } from "./Type"

export enum UIType {
  StartMenu,
  LevelSelect,
  ControlPane,
  GameInfo,
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

export const levelsInfo: LevelInfo[] = [
  {
    foodCount: 2,
    foodType: FoodType.ChickenWing
  },
  {
    foodCount: 2,
    foodType: FoodType.Omelette
  },
  {
    foodCount: 3,
    foodType: FoodType.Cake
  },
  {
    foodCount: 3,
    foodType: FoodType.Zongzi
  },
  {
    foodCount: 4,
    foodType: FoodType.Chips
  },
  {
    foodCount: 4,
    foodType: FoodType.Hamburger
  }
]