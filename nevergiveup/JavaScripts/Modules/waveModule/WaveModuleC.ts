import { JModuleC } from "../../depend/jibu-module/JModule";
import { WaveUtil } from "../../stage/Wave";
import { WaveConfig } from "../../StageEnums";
import WaveModuleData from "./WaveModuleData";
import { WaveModuleS } from "./WaveModuleS";

export class WaveModuleC extends JModuleC<WaveModuleS, WaveModuleData> {
    currentWave: WaveConfig;
    waveUtil: WaveUtil;

    public syncCurrentWave(stageId: number, wave: WaveConfig) {
        this.currentWave = wave;
        this.server.net_syncCurrentWave(stageId, wave);
    }

    public syncWaveUtil(stageId: number, waveUtil: WaveUtil) {
        this.waveUtil = waveUtil;
        this.server.net_syncWaveUtil(stageId, waveUtil);
    }
}
