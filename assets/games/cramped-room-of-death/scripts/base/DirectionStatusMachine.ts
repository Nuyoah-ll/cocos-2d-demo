import { SubStatusMachine } from "./SubStatusMachine";
import { DIRECTION_ORDER_ENUM, PARAMS_NAME_ENUM } from '../Enum';

export class DirectionStatusMachine extends SubStatusMachine {
  run() {
    // 获取number类型的参数
    const value = this.fsm.getParams(PARAMS_NAME_ENUM.DIRECTION)
    // 修改子状态机的状态，然后执行对应的动画
    console.log("执行的动画为", DIRECTION_ORDER_ENUM[value as number])
    this.currentStatus = this.statusMachine.get(DIRECTION_ORDER_ENUM[value as number])
  }
}

