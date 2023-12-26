import { Singleton } from "../depend/singleton/Singleton";
import HeadUIPanel_Generate from "../ui-generate/head/HeadUIPanel_generate";


@Serializable
class PlayerPlatFormNickName {

    @mw.Property({ replicated: true })
    public playerId: number = 0;


    @mw.Property({ replicated: true })
    public nickName: string = ''

}

@mw.Component
export default class HeadUIScript extends mw.Script {

    @mw.Property({ replicated: true, onChanged: 'onNickNameChanged' })
    public playerNickNames: PlayerPlatFormNickName[] = [];

    private _cache: Set<number> = new Set();

    protected onStart(): void {
        if (mw.SystemUtil.isServer()) {

            mw.Player.onPlayerLeave.add((player) => {
                this.removePlayerNickName(player.playerId);
            })

        } else {

            this.registerLocalPlatformNickName();
        }
    }

    private registerLocalPlatformNickName() {
        let nickName = mw.AccountService.getNickName();
        if (!nickName) {
            nickName = 'PIE Player';
        }
        let playerId = mw.Player.localPlayer.playerId;
        this.registerPlayerNickName(nickName, playerId);
        this.onNickNameChanged();
    }


    private removePlayerNickName(playerId: number) {
        let index = this.playerNickNames.findIndex((value) => {
            return value.playerId === playerId;
        })

        let newEst = this.playerNickNames.concat();
        if (index !== -1) {
            newEst.splice(index, 1);
            this.playerNickNames = newEst;
        }
    }

    @mw.RemoteFunction(mw.Server)
    private registerPlayerNickName(nickName: string, playerId: number) {

        let data = new PlayerPlatFormNickName();
        data.playerId = playerId;
        data.nickName = nickName;
        this.playerNickNames.push(data)
    }

    private removePlayerNickNameByPlayerId(playerId: number) {
        HeadUIController.getInstance().unregisterHeadUI(playerId.toString());
    }


    private onNickNameChanged() {


        let temp = new Set(this._cache.values());
        this._cache.clear();
        this.playerNickNames.forEach((value) => {
            temp.delete(value.playerId);
            this._cache.add(value.playerId);
            mw.Player.asyncGetPlayer(value.playerId).then((player) => {
                if (!player) {
                    return;
                }
                let type = value.playerId === mw.Player.localPlayer.playerId ? HeadUIType.Self : HeadUIType.OtherPlayer;
                HeadUIController.getInstance().registerHeadUI(player.character, type, value.nickName).then((info) => {
                    if (info) {
                        info.sign = value.playerId.toString();
                    }
                })
            });
        })

        temp.forEach((value) => {
            this.removePlayerNickNameByPlayerId(value);
        })
    }
}


export enum HeadUIType {

    Self,

    OtherPlayer,

    Dragon,

    NPC,
}


const HeadUIImageGuidLookTable = {

    [HeadUIType.Self]: "180121",

    [HeadUIType.OtherPlayer]: "180120",

    [HeadUIType.Dragon]: "180133",

    [HeadUIType.NPC]: "267115",
}

interface HeadUIWidget extends mw.UIWidget {

    uiBehavior: HeadUIPanel_Generate
}


class HeadUIInfo {

    widget: HeadUIWidget;

    gameObject: mw.GameObject;

    sign: string = ''
}


const commonOffset = new mw.Vector(0, 0, 100);

// TODO 做距离剔除
export class HeadUIController extends Singleton<HeadUIController>() {

    private _pools: HeadUIWidget[] = [];


    private _activeInfos: HeadUIInfo[] = [];


    public initialize() {
        if (mw.SystemUtil.isServer()) {

            mw.Script.spawnScript(HeadUIScript, true);
        }
    }


    private async getHeadUIComponent() {
        let ret = this._pools.pop();
        if (!ret) {
            ret = await mw.GameObject.asyncSpawn("UIWidget");
        }
        ret.widgetSpace = mw.WidgetSpaceMode.OverheadUI;
        const headUIWidget = UIService.create(HeadUIPanel_Generate);
        ret.setTargetUIWidget(headUIWidget.uiWidgetBase)
        ret.uiBehavior = headUIWidget;
        return ret;
    }

    /**
     * 注册一个头顶UI
     * @param owner 归属
     * @param type 头顶UI类型
     * @param name 昵称
     * @param offset 边距
     * @returns 存储的头顶UI信息
     */
    public async registerHeadUI(owner: mw.GameObject, type: HeadUIType, name: string, offset?: mw.Vector) {
        let uiWidget = await this.getHeadUIComponent();

        let index = this._activeInfos.findIndex((value) => {

            if (value.gameObject === owner) {
                return true;
            }
            return false;
        })

        if (index !== -1) {
            return;
        }

        let info = new HeadUIInfo();
        info.gameObject = owner;
        info.widget = uiWidget;
        info.sign = owner.gameObjectId;
        this._activeInfos.push(info);

        let guid = HeadUIImageGuidLookTable[type];
        uiWidget.uiBehavior.title.text = name;
        uiWidget.uiBehavior.bg.imageGuid = guid;

        uiWidget.parent = owner;
        if (!offset) {
            offset = commonOffset
        }
        if (owner instanceof Character) {
            owner.displayName = ''
        }
        uiWidget.localTransform.position = offset;
        uiWidget.hideByDistanceEnable = true;
        uiWidget.occlusionEnable = true;
        uiWidget.scaledByDistanceEnable = true;
        uiWidget.headUIMaxVisibleDistance = 1000;
        uiWidget.refresh();

        return info;
    }


    public unregisterHeadUI(owner: mw.GameObject | string) {

        let index = this._activeInfos.findIndex((value) => {

            if (value.gameObject === owner || value.sign === owner) {
                return true;
            }
            return false;
        })

        if (index !== -1) {
            let info = this._activeInfos[index];
            info.widget.destroy();
            this._activeInfos.splice(index, 1);
        }
    }
}