import { _decorator, Component, Node } from 'cc';
import { ITile } from '../levels';
const { ccclass, property } = _decorator;

class DataManager {
    mapInfo: Array<Array<ITile>>
    mapRowCount: number
    mapColCount: number
}

export const dataManager = new DataManager();

