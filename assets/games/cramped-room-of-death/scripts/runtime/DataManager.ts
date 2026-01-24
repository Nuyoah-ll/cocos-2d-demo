import { _decorator, Component, Node } from 'cc';
import { ITile } from '../levels';
const { ccclass, property } = _decorator;

// 全局数据管理
export class DataManager {
    static levelIndex: number = 1
    static mapInfo: Array<Array<ITile>> = [[]]
    static mapRowCount: number = 0
    static mapColCount: number = 0

    static reset() {
        this.mapInfo = [[]]
        this.mapColCount = 0;
        this.mapColCount = 0;
    }
}
