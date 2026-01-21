import { RigidBody2D, Node, ERigidBody2DType, Vec2 } from "cc";

export class PhysicsManager {
    static changeNodeRigidBodyType(node: Node, type: ERigidBody2DType) {
        const rigid = node.getComponent(RigidBody2D)
        rigid.type = type
    }

    static changeNodeLinearVelocity(node: Node, velocity: Vec2) {
        const rigid = node.getComponent(RigidBody2D)
        rigid.linearVelocity = new Vec2(velocity.x, velocity.y)
    }
}