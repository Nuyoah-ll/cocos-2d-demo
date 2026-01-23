import { Asset, resources, SpriteFrame } from "cc";

export class ResourceManager {
    static async loadDir(path: string, type = SpriteFrame) {
        return new Promise<SpriteFrame[]>((resolve, reject) => {
            resources.loadDir(path, type, (err, asset) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(asset);
                }
            })
        })
    }
}