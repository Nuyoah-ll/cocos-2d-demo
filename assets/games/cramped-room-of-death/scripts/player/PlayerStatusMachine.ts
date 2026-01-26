import { Animation } from "cc";
import { PARAMS_NAME_ENUM } from "../Enum";
import { getInitParamsNumber, getInitParamsTrigger, StatusMachine } from "../base/StatusMachine";
import { IdleSubStatusMachine } from "./IdleSubStatusMachine";
import { TurnLeftSubStatusMachine } from "./TurnLeftSubStatusMachine";
import { TurnRightSubStatusMachine } from "./TurnRightSubStatusMachine";

/**
 * 动画状态机
 * 初始化的时候，为挂载的节点创建了一个动画组件。
 * 然后通过修改触发器参数（params），来驱动动画状态的改变（currentStatus），然后通过动画状态的run方法来执行动画
 */
export class PlayerStatusMachine extends StatusMachine {
  async init() {
    // 因为PlayerStatusMachine组件是挂载在Player节点下面的，所以这里的this.node其实就是挂载Player节点
    this.animationCom = this.node.addComponent(Animation);
    this.initParams()
    this.initStatusMachine();
    this.initAnimationEvent();
    await Promise.all(this.waitingList);
    this.setParams(PARAMS_NAME_ENUM.IDLE, true)
  }

  // todo 这里需要完善，当某个状态结束后如何过渡到下一个动作状态
  initAnimationEvent() {
    this.animationCom.on(Animation.EventType.FINISHED, () => {
      const name = this.animationCom.defaultClip.name
      const whileList = ["turn"]
      // 当转向动画播放完毕后，进入Idle状态，执行idle状态下对应的动画
      if (whileList.some(item => name.includes(item))) {
        this.setParams(PARAMS_NAME_ENUM.IDLE, true)
      }
    })
  }

  initParams() {
    this.params.set(PARAMS_NAME_ENUM.IDLE, getInitParamsTrigger())
    this.params.set(PARAMS_NAME_ENUM.TURNLEFT, getInitParamsTrigger())
    this.params.set(PARAMS_NAME_ENUM.TURNRIGHT, getInitParamsTrigger())
    this.params.set(PARAMS_NAME_ENUM.DIRECTION, getInitParamsNumber())
  }

  initStatusMachine() {
    this.statusMachine.set(PARAMS_NAME_ENUM.IDLE, new IdleSubStatusMachine(this))
    this.statusMachine.set(PARAMS_NAME_ENUM.TURNLEFT, new TurnLeftSubStatusMachine(this))
    this.statusMachine.set(PARAMS_NAME_ENUM.TURNRIGHT, new TurnRightSubStatusMachine(this))
  }

  // 当currentStatus状态改变时，就会执行对应的状态的run方法
  run() {
    switch (this.currentStatus) {
      // todo 这里为什么在TURFLEFT和TURNRIGHT状态下也要检测？
      case this.statusMachine.get(PARAMS_NAME_ENUM.TURNLEFT):
      case this.statusMachine.get(PARAMS_NAME_ENUM.TURNRIGHT):
      case this.statusMachine.get(PARAMS_NAME_ENUM.IDLE):
        if (this.params.get(PARAMS_NAME_ENUM.TURNLEFT).value) {
          this.currentStatus = this.statusMachine.get(PARAMS_NAME_ENUM.TURNLEFT)
        } else if (this.params.get(PARAMS_NAME_ENUM.TURNRIGHT).value) {
          this.currentStatus = this.statusMachine.get(PARAMS_NAME_ENUM.TURNRIGHT)
        } else if (this.params.get(PARAMS_NAME_ENUM.IDLE).value) {
          this.currentStatus = this.statusMachine.get(PARAMS_NAME_ENUM.IDLE)
        } else {
          this.currentStatus = this.statusMachine.get(PARAMS_NAME_ENUM.IDLE)
        }
        break;
      default:
        this.currentStatus = this.statusMachine.get(PARAMS_NAME_ENUM.IDLE)
    }
  }
}
