import Log4Ts from "../../depend/log4ts/Log4Ts";
import { AuthModuleS } from "../auth/AuthModule";
import { EnergyModuleS } from "../Energy/EnergyModule";
import { JModuleC, JModuleData, JModuleS } from "../../depend/jibu-module/JModule";
import { PlayerModuleS } from "../PlayerModule/PlayerModuleS";
import { Attribute } from "../PlayerModule/sub_attribute/AttributeValueObject";
import { WeaponModuleData } from "../WeaponModule/WeaponModuleData";
import { GameConfig } from "../../config/GameConfig";
import { ShopModuleData } from "../ShopModule/ShopModuleData";

type PlayerStatistic = {
    login: number;

    staPotCnt: number;
    staPotAdd: number;

    goldRed: number;
    goldAdd: number;

    pvpCnt: number;
}

export default class BwStatisticModuleData extends JModuleData {
}

export class StatisticModuleC extends JModuleC<StatisticModuleS, BwStatisticModuleData> {
}

export class StatisticModuleS extends JModuleS<StatisticModuleC, BwStatisticModuleData> {
    /** 玩家加入战场门票 */
    private _playerStatistics: Map<string, PlayerStatistic> = new Map();

    protected onPlayerEnterGame(player: mw.Player) {
        super.onPlayerEnterGame(player);

        const login = Math.floor(Date.now() / 1000);
        // TODO: 等商店需求
        this._playerStatistics.set(player.userId, {
            login,
            staPotAdd: 0,
            staPotCnt: 0,
            goldRed: 0,
            goldAdd: 0,
            pvpCnt: 0,
        });
        Log4Ts.log(StatisticModuleS, `init bw player ${player.userId} data...`);
    }

    protected onPlayerLeft(player: mw.Player) {
        super.onPlayerLeft(player);
        const authS = ModuleService.getModule(AuthModuleS);
        const energyS = ModuleService.getModule(EnergyModuleS);
        const playerS = ModuleService.getModule(PlayerModuleS);
        const statistic = this._playerStatistics.get(player.userId);

        const {login, goldRed, goldAdd, staPotCnt, staPotAdd, pvpCnt} = statistic;
        const logout = Math.floor(Date.now() / 1000);
        const online = logout - login;
        const [stamina, staMax, staRed] = energyS.getPlayerEnergy(player.playerId);
        const gold = playerS.getPlayerAttr(player.playerId, Attribute.EnumAttributeType.money);
        const {weapon, wing, tail} = this.getPlayerEquipment(player);
        Log4Ts.log(StatisticModuleS, `report bw player ${player.userId} data...`);
        console.log("report: ", JSON.stringify({
            gold,
            goldAdd,
            goldRed,
            killCnt: 0,
            killNum: 0,
            killed: 0,
            level: 0,
            login,
            logout,
            lvAdd: 0,
            lvRed: 0,
            online,
            pvpCnt,
            staMax,
            staPotAdd,
            staPotCnt,
            staRed,
            stamina,
            tail,
            weapon,
            wing,
        }));
        authS.reportBattleWorldStatistic(player.userId, {
            gold,
            goldAdd,
            goldRed,
            killCnt: 0,
            killNum: 0,
            killed: 0,
            level: 0,
            login,
            logout,
            lvAdd: 0,
            lvRed: 0,
            online,
            pvpCnt,
            staMax,
            staPotAdd,
            staPotCnt,
            staRed,
            stamina,
            tail,
            weapon,
            wing,
        }).then(() => {
            Log4Ts.log(StatisticModuleS, `report bw player ${player.userId} success.`);
            this._playerStatistics.delete(player.userId);
        });
    }

    private getPlayerEquipment(player: mw.Player) {
        const shopS = DataCenterS.getData(player.playerId, ShopModuleData);
        const weaponD = DataCenterS.getData(player.playerId, WeaponModuleData);
        const equips = {weapon: "", wing: "", tail: ""};

        console.log('shopS: ', shopS.ownItemArr.toString());
        if (weaponD) {
            equips.weapon = weaponD.getOwnWeaponIds().map(item => `${item}-${GameConfig.Weapon.getElement(item).name1}`).toString();
        }

        return equips;
    }

    /**
     * 设置每次的属性变化值
     * @param {number} playerId 用户id
     * @param {keyof Omit<PlayerStatistic, "login">} type 类型
     * @param {number} deltaValue 变化值
     */
    public setAttributeChange(playerId: number, type: keyof Omit<PlayerStatistic, "login">, deltaValue: number) {
        const player = Player.getPlayer(playerId);
        if (!player) return;
        const data = this._playerStatistics.get(player.userId);
        if (!data) return;
        this._playerStatistics.set(player.userId, {...data, [type]: data[type] + deltaValue});
    }
}