import Log4Ts from "../depend/log4ts/Log4Ts";
import GameServiceConfig from "../const/GameServiceConfig";

export class Utils {
    public static Ether = 10n ** 18n;

    // 日志优化 上报
    public static logP12Info(name: string, args: any) {
        Log4Ts.log({name}, JSON.stringify(args) + " #P12");
    }

    public static formatEtherInteger(token: bigint): string {
        const tokenE = token / GameServiceConfig.Ether;
        return tokenE.toString(10);
    }
}