import PlayerScript from "./PlayerScript";

export namespace PlayerUtil {
    const playerScript: Map<number, PlayerScript> = new Map<number, PlayerScript>();
    export function setPlayerScript(playerId: number, script: PlayerScript) {
        playerScript.set(playerId, script);
    }

    export function deletePlayerScript(playerId) {
        if (playerScript.has(playerId)) {
            playerScript.get(playerId).destroy();
            playerScript.delete(playerId);
        }
    }

    export function getPlayerScript(playerId) {
        return playerScript.get(playerId);
    }
}