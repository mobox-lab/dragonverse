import { JModuleS } from "../../depend/jibu-module/JModule";
import { WaveModuleC } from "./WaveModuleC";
import WaveModuleData from "./WaveModuleData";
import { WaveConfig } from "../../StageEnums";
import { WaveUtil } from "../../stage/Wave";

export class WaveModuleS extends JModuleS<WaveModuleC, WaveModuleData> {
    currentWaveMap: Map<string, WaveConfig> = new Map();
    currentWaveUtilMap: Map<string, WaveUtil> = new Map();
    allPassWavesMap: Map<string, WaveConfig[]> = new Map();

    public net_syncCurrentWave(stageId: number, wave: WaveConfig) {
        this.currentWaveMap.set(stageId.toString(), wave);
    }

    public getCurrentWave(stageId: number) {
        return this.currentWaveMap.get(stageId.toString());
    }

    public net_syncWaveUtil(stageId: number, waveUtil: WaveUtil) {
        this.currentWaveUtilMap.set(stageId.toString(), waveUtil);
    }

    public getCurrentWaveUtil(stageId: number) {
        return this.currentWaveUtilMap.get(stageId.toString());
    }

    public net_syncAllPassWaves(stageId: number, allPassWaves: WaveConfig[]) {
        this.allPassWavesMap.set(stageId.toString(), allPassWaves);
    }

    public getAllPassWaves(stageId: number) {
        return this.allPassWavesMap.get(stageId.toString());
    }
}
