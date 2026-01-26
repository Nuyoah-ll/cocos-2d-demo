import { AnimationClip } from 'cc';
import { StatusMachine } from '../base/StatusMachine';
import { Status } from '../base/Status';
import { DIRECTION_ENUM } from '../Enum';
import { DirectionStatusMachine } from '../base/DirectionStatusMachine';

const BASE_URL = "cramped-room-of-death/texture/player/idle"

export class IdleSubStatusMachine extends DirectionStatusMachine {
    constructor(fsm: StatusMachine) {
        super(fsm);
        this.statusMachine.set(DIRECTION_ENUM.TOP, new Status(fsm, `${BASE_URL}/top`, AnimationClip.WrapMode.Loop))
        this.statusMachine.set(DIRECTION_ENUM.BOTTOM, new Status(fsm, `${BASE_URL}/bottom`, AnimationClip.WrapMode.Loop))
        this.statusMachine.set(DIRECTION_ENUM.LEFT, new Status(fsm, `${BASE_URL}/left`, AnimationClip.WrapMode.Loop))
        this.statusMachine.set(DIRECTION_ENUM.RIGHT, new Status(fsm, `${BASE_URL}/right`, AnimationClip.WrapMode.Loop))
    }
}

