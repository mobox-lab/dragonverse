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

    lvRed: number;
    lvAdd: number;

    killCnt: number;
    killNum: number;
    killed: number;
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
            lvRed: 0,
            lvAdd: 0,
            killCnt: 0,
            killNum: 0,
            killed: 0,
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

        const {
            login,
            goldRed,
            goldAdd,
            staPotCnt,
            staPotAdd,
            lvRed,
            lvAdd,
            killCnt,
            killed,
            killNum,
            pvpCnt,
        } = statistic;
        const logout = Math.floor(Date.now() / 1000);
        const online = logout - login;
        const [stamina, staMax, staRed] = energyS.getPlayerEnergy(player.playerId);
        const gold = playerS.getPlayerAttr(player.playerId, Attribute.EnumAttributeType.money);
        const level = playerS.getPlayerAttr(player.playerId, Attribute.EnumAttributeType.rankScore);
        const {weapon, wing, tail} = this.getPlayerEquipment(player);

        Log4Ts.log(StatisticModuleS, `report bw player ${player.userId} data...`);
        authS.reportBattleWorldStatistic(player.userId, {
            gold,
            goldAdd,
            goldRed,
            killCnt,
            killNum,
            killed,
            level,
            login,
            logout,
            lvAdd,
            lvRed,
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

    /**
     * 获取已有装备
     * @param {mw.Player} player
     * @returns 武器，拖尾，翅膀
     * @private
     */
    private getPlayerEquipment(player: mw.Player) {
        const shopS = DataCenterS.getData(player.playerId, ShopModuleData);
        const weaponD = DataCenterS.getData(player.playerId, WeaponModuleData);
        const equips = {weapon: "", wing: "", tail: ""};

        if (weaponD) {
            equips.weapon = weaponD.getOwnWeaponIds().map(item => `${item}-${GameConfig.Weapon.getElement(item).name1}`).toString();
        }

        if (shopS) {
            const wings = [];
            const tails = [];
            shopS.ownItemArr.forEach(item => {
                const itemInfo = GameConfig.Shop.getElement(item);
                if (itemInfo.Type === 1) {
                    wings.push(`${item}-${itemInfo.Name}`);
                }
                if (itemInfo.Type === 2) {
                    tails.push(`${item}-${itemInfo.Name}`);
                }
            });
            equips.wing = wings.toString();
            equips.tail = tails.toString();
        }

        return equips;
    }

    /**
     * 设置每次的属性变化值
     * @param {number | string} id 用户 playerId /userId
     * @param {keyof Omit<PlayerStatistic, "login">} type 类型
     * @param {number} deltaValue 变化值
     */
    public setAttributeChange(id: number | string, type: keyof Omit<PlayerStatistic, "login">, deltaValue: number) {
        const player = Player.getPlayer(id);
        if (!player) return;
        const data = this._playerStatistics.get(player.userId);
        if (!data) return;
        this._playerStatistics.set(player.userId, {...data, [type]: data[type] + deltaValue});
    }
}