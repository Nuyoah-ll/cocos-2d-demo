import { Status } from "./Status";
import { StatusMachine } from "./StatusMachine";

export abstract class SubStatusMachine {
  private _currentStatus: Status | null = null
  statusMachine: Map<string, Status> = new Map()

  constructor(public fsm: StatusMachine) { }

  set currentStatus(status: Status | null) {
    this._currentStatus = status
    this._currentStatus.run();
  }

  get currentStatus() {
    return this._currentStatus
  }
  abstract run(): void
}
