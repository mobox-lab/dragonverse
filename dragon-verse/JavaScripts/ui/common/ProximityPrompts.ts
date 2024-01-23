import { KeyboardManager } from "../../controller/KeyboardManager";
import AudioController from "../../controller/audio/AudioController";
import KeyOperationManager from "../../controller/key-operation-manager/KeyOperationManager";
import PromotItem_Generate from "../../ui-generate/prompt/PromotItem_generate";
import ProximityPrompts_Generate from "../../ui-generate/prompt/ProximityPrompts_generate";

export module ProximityPrompts {







    class ProximityPromptsUI extends ProximityPrompts_Generate {


        private usingPromptItems: PromotItem_Generate[] = [];

        private _selectedIndex: number = 0;


        private data: ProximityPromptInfo[] = [];

        private set selectedIndex(value: number) {
            this._selectedIndex = value;
            this.updateSelectedIndex();
        }

        public get selectedIndex() {
            return this._selectedIndex;
        }


        protected onAwake(): void {
            super.onAwake();

        }

        onShow(infos: ProximityPromptInfo[]) {

            this.reset();
            this.data = infos;
            // KeyboardManager.getInstance().onKeyDown.add(this.onKeyDown, this);
            // KeyboardManager.getInstance().onKeyUp.add(this.onKeyUp, this);

            KeyOperationManager.getInstance().onKeyDown(Keys.Up, this, () => {
                this.handlerIndex(-1);
            });
            KeyOperationManager.getInstance().onKeyDown(Keys.Down, this, () => {
                this.handlerIndex(1);
            });

            for (const item of this.data) {
                KeyOperationManager.getInstance().onKeyDown(item.keyBoard as Keys, this, () => {
                    this.onSelected();
                });
            }


            this.initializeConfigureDetail(infos);
        }

        onHide() {
            // KeyboardManager.getInstance().onKeyDown.remove(this.onKeyDown, this);
            // KeyboardManager.getInstance().onKeyUp.remove(this.onKeyUp, this);

            KeyOperationManager.getInstance().unregisterKey(this, Keys.Up);
            KeyOperationManager.getInstance().unregisterKey(this, Keys.Down);
            for (const item of this.data) {
                KeyOperationManager.getInstance().unregisterKey(this, item.keyBoard as Keys);
            }
            this.reset();
        }




        private initializeConfigureDetail(infos: ProximityPromptInfo[]) {
            for (const v of infos) {
                const item = getPromptItem();
                item.keyText.text = v.keyBoard;
                item.option.text = v.text;
                item.selected.onClicked.add(() => {
                    this.onSelected()
                });
                item.selected.enable = v.enabled;
                item.keyText.visibility = mw.SlateVisibility.Hidden;
                this.options.addChild(item.rootCanvas);
                this.usingPromptItems.push(item);
            }

            this._selectedIndex = 0;
            this.updateSelectedIndex();
        }


        private updateSelectedIndex() {

            for (let i = 0; i < this.usingPromptItems.length; i++) {

                let selected = i === this.selectedIndex;

                let item = this.usingPromptItems[i];
                item.keyText.visibility = selected ? mw.SlateVisibility.Visible : mw.SlateVisibility.Hidden;
            }
        }

        private onSelected() {

            let currentData = this.data[this._selectedIndex];
            AudioController.getInstance().play(5);
            close();
            currentData.onSelected();

        }


        private onKeyDown(key: mw.Keys) {


            if (key === mw.Keys.Up) {

                this.handlerIndex(-1);
            } else if (key === mw.Keys.Down) {

                this.handlerIndex(1);
            }

            let currentData = this.data[this.selectedIndex];

            if (key === currentData.keyBoard) {
                this.onSelected();
            }
        }

        private onKeyUp(key: mw.Keys) {

        }

        private handlerIndex(signal: number) {

            let selectIndex = this._selectedIndex += signal;

            if (selectIndex < 0) {
                this.selectedIndex = this.data.length - 1;
            } else if (this.selectedIndex >= this.data.length) {
                this.selectedIndex = 0;
            }

        }

        private reset() {

            this.options.removeAllChildren();
            this.usingPromptItems.length = 0;
        }


    }




    function getPromptItem() {

        return mw.UIService.create(PromotItem_Generate);
    }








    export interface ProximityPromptInfo {
        keyBoard: string

        text: string,

        onSelected: () => void;

        enabled: boolean;
    }

    export function show(infos: ProximityPromptInfo[]) {

        UIService.show(ProximityPromptsUI, infos);
    }







    export function close() {
        UIService.hide(ProximityPromptsUI);
    }

}