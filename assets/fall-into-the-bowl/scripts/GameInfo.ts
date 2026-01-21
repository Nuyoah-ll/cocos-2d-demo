import { _decorator, Component, Label, Node } from 'cc';
import { UIBase } from './UIBase';
const { ccclass, property } = _decorator;

@ccclass('GameInfo')
export class GameInfo extends UIBase {
    protected onLoad(): void {
        super.onLoad();
    }

    changeLevel(level: number) {
        this.node.children[0].getComponent(Label).string = `第${level}关`;
    }

    changeFinishedCount(count: number) {
        this.node.children[1].getComponent(Label).string = `已完成: ${count}`;
    }
}


