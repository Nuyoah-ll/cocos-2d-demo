import { Animation, Component, SpriteFrame } from "cc";
import { FSM_PARAM_TYPE_ENUM } from "../Enum";
import { Status } from "./Status";
import { SubStatusMachine } from "./SubStatusMachine";

type ParamsValueType = number | boolean

interface IParamsValue {
  type: FSM_PARAM_TYPE_ENUM
  value: ParamsValueType
}

export const getInitParamsTrigger = (): IParamsValue => ({
  type: FSM_PARAM_TYPE_ENUM.TRIGGER,
  value: false
})

export const getInitParamsNumber = (): IParamsValue => ({
  type: FSM_PARAM_TYPE_ENUM.NUMBER,
  value: 0
})

export abstract class StatusMachine extends Component {
  private _currentStatus: Status | SubStatusMachine | null = null
  params: Map<string, IParamsValue> = new Map()
  statusMachine: Map<string, Status | SubStatusMachine> = new Map()
  animationCom: Animation | null = null;
  waitingList: Array<Promise<SpriteFrame[]>> = []

  set currentStatus(status: Status | SubStatusMachine | null) {
    this._currentStatus = status
    this._currentStatus.run();
  }

  get currentStatus() {
    return this._currentStatus
  }

  getParams(paramsName: string) {
    if (this.params.has(paramsName)) {
      return this.params.get(paramsName).value
    }
  }

  setParams(paramsName: string, value: ParamsValueType) {
    if (this.params.has(paramsName)) {
      this.params.get(paramsName).value = value
      this.run();
      this.resetTrigger();
    }
  }

  resetTrigger() {
    for (const [_, value] of this.params) {
      if (value.type === FSM_PARAM_TYPE_ENUM.TRIGGER) {
        value.value = false
      }
    }
  }

  abstract init(): void
  abstract run(): void
}
