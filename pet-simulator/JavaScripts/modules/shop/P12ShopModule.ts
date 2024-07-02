import { JModuleC, JModuleData, JModuleS } from "../../depend/jibu-module/JModule";
import { AuthModuleS } from "../auth/AuthModule";

export class PsP12ShopModuleData extends JModuleData {
}

export class P12ShopModuleC extends JModuleC<P12ShopModuleS, PsP12ShopModuleData> {
    /**
     * 消费货币
     * @returns {Promise<boolean>}
     */
    consumeCurrency() {
        return this.server.net_consumeCurrency();
    }
}

export class P12ShopModuleS extends JModuleS<P12ShopModuleC, PsP12ShopModuleData> {
    private _authS: AuthModuleS;

    private get authS(): AuthModuleS | null {
        if (!this._authS) this._authS = ModuleService.getModule(AuthModuleS);
        return this._authS;
    }

    public async net_consumeCurrency(): Promise<boolean> {
        // this.authS.consumeCurrency()
        const player = this.currentPlayer;
        console.log("playerId: ", player.userId);
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(true);
            }, 3000);
        });
    }
}