import { animation, AnimationClip, Sprite } from "cc";
import { ResourceManager } from "../runtime/ResourceManager";
import { StatusMachine } from "./StatusMachine";

// 动画帧切换速度，1/ 8s，按标准60帧1s，这里相当于是7.5帧切换依次动画
const ANIMATION_SPEED = 1 / 8

export class Status {
  private animationClip: AnimationClip | null = null

  constructor(
    private fsm: StatusMachine,
    private path: string,
    private wrapMode = AnimationClip.WrapMode.Normal) {
    this.init();
  }

  // todo 这里还需要再学习下如何用代码创建AnimationClip
  async init() {
    const promise = ResourceManager.loadDir(this.path);
    this.fsm.waitingList.push(promise);
    // 加载朝上的四个动画帧，作为角色的默认动作
    const topSpriteFrameList = await promise
    // 创建AnimationClip
    this.animationClip = new AnimationClip();
    // 动画持续时间4*1/8
    this.animationClip.duration = topSpriteFrameList.length * ANIMATION_SPEED;
    // 添加对象轨道并指定该轨道对应的属性是spriteFrame
    const track = new animation.ObjectTrack();
    track.path = new animation.TrackPath().toComponent(Sprite).toProperty("spriteFrame");
    // 设置每一帧对应的帧图片
    track.channel.curve.assignSorted(
      topSpriteFrameList.map((frame, index) => [index * ANIMATION_SPEED, frame]),
    )
    this.animationClip.addTrack(track);
    this.animationClip.name = this.path
    // 修改动画为循环播放
    this.animationClip.wrapMode = this.wrapMode
  }

  run() {
    this.fsm.animationCom.defaultClip = this.animationClip;
    this.fsm.animationCom.play();
  }
}