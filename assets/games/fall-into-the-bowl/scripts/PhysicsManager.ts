import { RigidBody2D, Node, ERigidBody2DType, Vec2, misc } from "cc";

export class PhysicsManager {
    static changeNodeRigidBodyType(node: Node, type: ERigidBody2DType) {
        const rigid = node.getComponent(RigidBody2D)
        rigid.type = type
    }

    static changeNodeLinearVelocity(node: Node, velocity: Vec2) {
        const rigid = node.getComponent(RigidBody2D)
        rigid.linearVelocity = new Vec2(velocity.x, velocity.y)
    }

    static isStatic(node: Node): boolean {
        const rigid = node.getComponent(RigidBody2D)
        return rigid.linearVelocity.equals(new Vec2(0, 0), 0) && misc.radiansToDegrees(rigid.angularVelocity) === 0
    }
}