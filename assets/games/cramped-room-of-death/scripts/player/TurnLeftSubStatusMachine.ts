import { StatusMachine } from '../base/StatusMachine';
import { Status } from '../base/Status';
import { DIRECTION_ENUM } from '../Enum';
import { DirectionStatusMachine } from '../base/DirectionStatusMachine';

const BASE_URL = "cramped-room-of-death/texture/player/turnleft"

export class TurnLeftSubStatusMachine extends DirectionStatusMachine {
    constructor(fsm: StatusMachine) {
        super(fsm);
        // 在TurnLeft子状态下，向着top方向转向的动画，其他方向同理
        this.statusMachine.set(DIRECTION_ENUM.TOP, new Status(fsm, `${BASE_URL}/top`))
        this.statusMachine.set(DIRECTION_ENUM.BOTTOM, new Status(fsm, `${BASE_URL}/bottom`))
        this.statusMachine.set(DIRECTION_ENUM.LEFT, new Status(fsm, `${BASE_URL}/left`))
        this.statusMachine.set(DIRECTION_ENUM.RIGHT, new Status(fsm, `${BASE_URL}/right`))
    }
}

