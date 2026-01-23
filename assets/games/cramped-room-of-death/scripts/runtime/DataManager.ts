import { _decorator, Component, Node } from 'cc';
import { ITile } from '../levels';
const { ccclass, property } = _decorator;

// 全局数据管理
export class DataManager {
    static mapInfo: Array<Array<ITile>>
    static mapRowCount: number
    static mapColCount: number
}
