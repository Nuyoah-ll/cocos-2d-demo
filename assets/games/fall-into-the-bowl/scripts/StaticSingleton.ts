import { GameManager } from "./GameManager";
import { UIManager } from "./UIManager";

export class StaticSingleton {
    static GameManager: GameManager | null = null;
    static UIManager: UIManager | null = null;

    static setGameManager(gameManager: GameManager) {
        StaticSingleton.GameManager = gameManager;
    }

    static setUIManager(uiManager: UIManager) {
        StaticSingleton.UIManager = uiManager;
    }
}