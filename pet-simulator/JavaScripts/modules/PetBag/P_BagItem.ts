import { GameConfig } from "../../config/GameConfig";
import { IPetARRElement } from "../../config/PetARR";
import { GlobalData } from "../../const/GlobalData";
import Pet_item_Generate from "../../ui-generate/Pet/Pet_item_generate";
import { petItemDataNew } from "./PetBagModuleData";
import { Singleton, stringToBuff, utils } from "../../util/uitls";
import { BagTool } from "./BagTool";
import { GlobalEnum } from "../../const/Enum";
import { cubicBezier } from "../../util/MoveUtil";
import KeyOperationManager from "../../controller/key-operation-manager/KeyOperationManager";


export class PetBag_Item extends Pet_item_Generate {
    public petData: petItemDataNew = null;
    // UI在背包中的位置
    public count: number = null;
    public isEquip: boolean = false;
    private petInfo: IPetARRElement;
    private clickFun: (item: PetBag_Item) => void;
    private caller: any;

    private equipTween: mw.Tween<{}>;
    private equipTween2: mw.Tween<{ scale: Vector2 }>;
    private movetTween: mw.Tween<{}>;
    private fadeInTween: mw.Tween<{ alpha: number; }>;
    private fadeOutTween: mw.Tween<{ alpha: number; }>;
	private enableHover: boolean = true;
    /**true-开启悬浮ui，false-关闭 */
    public onHoverAC: Action2<boolean, PetBag_Item> = new Action2();
    private undefineBgGuid: string;
    private alphaTween: mw.Tween<{ opacity: number; }>;
    private undefineSelectGuid: string;

    onStart() {
        this.changeAllChild(false);
        this.getUIDate();
        this.undefineBgGuid = this.mPic_Equip.imageGuid;
        this.undefineSelectGuid = this.mPic_Equip_3.imageGuid;
        this.mButton_Equip.onClicked.add(this.onBtnClick.bind(this));
		
		KeyOperationManager.getInstance().onWidgetEntered(this.uiWidgetBase, () => {
			if(!this.enableHover) return;
			this.onHoverAC.call(true, this); 
		});
		KeyOperationManager.getInstance().onWidgetLeave(this.uiWidgetBase, () => {
			if(!this.enableHover) return;
			this.onHoverAC.call(false, this);
		});
    }
    private getUIDate() {
        this.undefineBgGuid = this.mPic_Equip.imageGuid;
    }
    /**初始化 */
    public init(data: petItemDataNew): void {

        // 合成功能用到
        if (this.getLockVis()) {
            this.setLockVis(false);
        }

        this.setItemVis(mw.SlateVisibility.SelfHitTestInvisible);
				// 这个没考虑附魔啊
        // if (data.k == this.petData?.k && data.I == this.petData.I && data.p.n == this.petData.p.n && data.p.a == this.petData.p.a) {
        //     return;
        // }

        this.petData = data;
        this.setPowerColor(data);
        this.mPic_Equip.setImageColorByHex(GlobalData.Bag.bgColors[1]);

        this.petInfo = GameConfig.PetARR.getElement(data.I);
        this.mText_Value.text = utils.formatNumber(data.p.a);
        if (this.petInfo) this.mPic_Peticon.imageGuid = this.petInfo.uiGuid;
        else {
            console.error("petInfo is null!!!!!!!!!");
        }
        this.setQuality(data.I);
        this.setSpecial(data.I);
        const enchantNum = data.p.b?.length ?? 0; // 拥有的附魔词条数目
        if (enchantNum) {
            this.imgEnhance.visibility = mw.SlateVisibility.Visible;
            this.textEnhancenum.text = utils.formatNumber(enchantNum);
        } else this.imgEnhance.visibility = mw.SlateVisibility.Collapsed;

        if (this.mPic_Equip_3.visible) {
            this.mPic_Equip_3.visibility = mw.SlateVisibility.Collapsed;
            this.mPic_Equip_2.visibility = mw.SlateVisibility.Collapsed;
        }
    }
    /**设置战力ui颜色 */
    public setPowerColor(petItem: petItemDataNew) {
        // 2024.06.21 攻击力不需要变颜色了， 始终按照设计稿的白色即可。
        this.mText_Value.text = utils.formatNumber(petItem.p.a);
        this.mText_Value.setFontColorByHex("#FFFFFFFF");

        // if (petItem.p.b.length == 0) {
        //     this.mText_Value.setFontColorByHex("#FFFFFFFF");
        //     return;
        // }
        //
        // let buff = stringToBuff(BagTool.getStr(petItem))
        // if (buff.length == 0) {
        //     this.mText_Value.setFontColorByHex("#FFFFFFFF");
        //     return;
        // }
        // let max: number = 0;
        // buff.forEach((element) => {
        //     if (element.id > max)
        //         max = element.id;
        // })
        // let color = GameConfig.Enchants.getElement(max).Color
        // this.mText_Value.contentColor = mw.LinearColor.colorHexToLinearColor(color)
    }
	public setEnableHover(enable: boolean) {
		this.enableHover = enable;
	}
    private onBtnClick() {
        this.clickFun?.call(this.caller, this);
    }

    protected changeAllChild(isShow: boolean) {
        let visibility = isShow ? mw.SlateVisibility.Visible : mw.SlateVisibility.Collapsed;
        this.mPic_Equip_3.visibility = visibility;
        this.mPic_Rainbow.visibility = visibility;
        this.mPic_Heart.visibility = visibility;
        this.mPic_delete.visibility = visibility;
        this.mPic_Effect.visibility = visibility;
        this.mPic_Equip_2.visibility = visibility;
    }



    public setClickFun(fun: (item: PetBag_Item) => void, caller: any) {
        this.clickFun = fun;
        this.caller = caller;
    }

    /**设置可见性 */
    public setItemVis(vis: mw.SlateVisibility) {
        if (this.uiObject.visibility != vis)
            this.uiObject.visibility = vis;
    }
    /**是否正装备 */
    public getLockVis() {
        return this.mPic_Equip_3.visible;
    }

    /**设置UI装备状态 */
    public setLockVis(isEquip: boolean) {

        // if (isEquip == this.isEquip) return;
        // 装备状态发生改变
        this.isEquip = isEquip;
        if (this.equipTween && this.equipTween.isPlaying()) {
            this.equipTween.stop();
        }
        if (isEquip) {
            // 装备
            // this.mPic_Equip_3.visibility = mw.SlateVisibility.SelfHitTestInvisible;
            // this.equipTween = new mw.Tween({ alpha: 0 }).to({ alpha: 1 }, 300)
            //     .onUpdate((obj) => {
            //         this.mPic_Equip_3.renderOpacity = obj.alpha;
            //     })
            //     .start();
            this.mPic_Equip_2.visibility = mw.SlateVisibility.SelfHitTestInvisible;
            // this.mPic_Equip.visibility = mw.SlateVisibility.Collapsed;
            this.setSelectVis(this.petData.I, isEquip);
        } else {
            // 卸载
            // this.equipTween = new mw.Tween({ alpha: 1 }).to({ alpha: 0 }, 300)
            //     .onUpdate((obj) => {
            //         this.mPic_Equip_3.renderOpacity = obj.alpha;
            //     })
            //     .onComplete(() => {
            // this.mPic_Equip_3.visibility = mw.SlateVisibility.Collapsed;
            //     })
            //     .start();
            this.mPic_Equip_3.visibility = mw.SlateVisibility.Collapsed;
            this.mPic_Equip_2.visibility = mw.SlateVisibility.Collapsed;
            this.mPic_Equip.visibility = mw.SlateVisibility.SelfHitTestInvisible;
            this.setSelectVis(this.petData.I, isEquip);
        }
    }



    /**item淡入 */
    public itemFadeInTween(count: number) {

        if (this.fadeInTween && this.fadeInTween.isPlaying()) {
            this.fadeInTween.stop();
        }
        this.uiObject.position = this.calcuItemPos(count);
        let fadeInTween = new mw.Tween({ alpha: 0 }).to({ alpha: 1 }, 300)
            .onUpdate((obj) => {
                if (this.uiObject) {
                    this.uiObject.renderOpacity = obj.alpha;
                }
            })
            .onComplete(() => {

            })
            .start();
        this.fadeInTween = fadeInTween;
    }

    /**item平移 */
    public itemMoveTween(fromCount: number, toCount: number, equipChange: boolean) {
        let fromPos = this.calcuItemPos(fromCount);
        let toPos = this.calcuItemPos(toCount);
        if (this.movetTween && this.movetTween.isPlaying()) {
            this.movetTween.stop();
        }
        // let emptyTween = new mw.Tween(null);
        // 移动
        this.count = toCount;
        let moveTween = new mw.Tween({ pos: fromPos }).to({ pos: toPos }, 200)
            .onUpdate(obj => {
                if (this.uiObject) {
                    this.uiObject.position = obj.pos;
                }
            })
            .onComplete(() => {

            });
        // 缩小
        let scaleTween1 = new mw.Tween({ scale: Vector2.one, pos: Vector2 }).to({ scale: new Vector2(0.8, 0.8) }, 100)
            .onUpdate(obj => {
                if (this.uiObject) {
                    this.uiObject.renderScale = obj.scale;
                }
            });
        // 放大
        let scaleTween2 = new mw.Tween({ scale: Vector2.multiply(Vector2.one, 0.8) }).to({ scale: new Vector2(1.2, 1.2) }, 100)
            .onUpdate(obj => {
                if (this.uiObject) {
                    this.uiObject.renderScale = obj.scale;
                }
            });
        // 恢复
        let scaleTween3 = new mw.Tween({ scale: new Vector2(1.2, 1.2) }).to({ scale: Vector2.one }, 100)
            .onUpdate(obj => {
                if (this.uiObject) {
                    this.uiObject.renderScale = obj.scale;
                }
            });
        // 装备状态改变
        if (equipChange) {
            scaleTween1.chain(moveTween);
            moveTween.chain(scaleTween2);
            scaleTween2.chain(scaleTween3);
            scaleTween1.start();
            this.movetTween = scaleTween1;
        }
        // 装备状态不改变，只平移
        else {
            moveTween.delay(20).start();
            this.movetTween = moveTween;
        }
    }

    /**item原地装备的tween */
    public itemEquipTween() {

        if (this.equipTween2 && this.equipTween2.isPlaying()) {
            this.equipTween2.stop();
        }
        // 缩小
        let scaleTween1 = new mw.Tween({ scale: Vector2.one }).to({ scale: new Vector2(0.8, 0.8) }, 20)
            .onUpdate(obj => {
                if (this.uiObject) {
                    this.uiObject.renderScale = obj.scale;
                }
            })
        // 放大
        let scaleTween2 = new mw.Tween({ scale: Vector2.multiply(Vector2.one, 0.8) }).to({ scale: new Vector2(1.2, 1.2) }, 100)
            .onUpdate(obj => {
                if (this.uiObject) {
                    this.uiObject.renderScale = obj.scale;
                }
            })

        // 恢复
        let scaleTween3 = new mw.Tween({ scale: new Vector2(1.2, 1.2) }).to({ scale: Vector2.one }, 100)
            .onUpdate(obj => {
                if (this.uiObject) {
                    this.uiObject.renderScale = obj.scale;
                }
            });
        // 开始！！！
        scaleTween1.chain(scaleTween2);
        scaleTween2.chain(scaleTween3);
        scaleTween1.start();
        this.equipTween2 = scaleTween1;
    }

    /**item淡出 */
    public itemFadeOutTween(itemArr: PetBag_Item[]) {
        // item.uiObject.position = this.calcuItemPos(count);
        if (this.fadeOutTween && this.fadeOutTween.isPlaying()) {
            this.fadeOutTween.stop();
        }
        itemArr.splice(itemArr.indexOf(this), 1);
        let fadeOutTween = new mw.Tween({ alpha: 1 }).to({ alpha: 0 }, 300)
            .onUpdate((obj) => {
                if (this.uiObject) {
                    this.uiObject.renderOpacity = obj.alpha;
                }
            })
            .onComplete(() => {
                this.destroy();
            })
            .start();
        this.fadeOutTween = fadeOutTween;
    }


    /**item设置位置 */
    private calcuItemPos(count: number): Vector2 {
        //距离左边的偏移量
        let offX = GlobalData.Bag.itemOffset[0];
        //距离上边的偏移量
        let offY = GlobalData.Bag.itemOffset[1];
        //每个item的间隔
        let space = GlobalData.Bag.itemSpace;
        //每行的个数
        let row = 4;
        //每个item的宽度
        let itemWidth = GlobalData.Bag.itemSize.x;
        //每个item的高度
        let itemHeight = GlobalData.Bag.itemSize.y;
        //计算出每个item的位置
        let index_x: number = count % row;
        if (index_x == 0) {
            index_x = row;
        }
        let x = (index_x - 1) * (itemWidth + space) + offX;  // 1* (200 + 90) + 50
        let y = Math.floor((count - 1) / row) * (itemHeight + space) + offY; // 0 * (200 + 90) + 50
        // item.position = new mw.Vector2(x, y);
        return new mw.Vector2(x, y);
    }

    public setItemScale(size: mw.Vector2) {

        this.uiObject.size = size;
        this.mPic_Equip
    }

    /**品质-设置星星数 */
    private setQuality(id: number) {
        const quality = GlobalEnum.PetQuality;
        let cfg = GameConfig.PetARR.getElement(id);
        if (cfg.QualityType == quality.Normal) {
            this.setBgNormal(0);

        } else if (cfg.QualityType == quality.Rare) {
            this.setBgNormal(1);

        } else if (cfg.QualityType == quality.Epic) {
            this.setBgNormal(2);
        }
        else if (cfg.QualityType == quality.Legend) {//传说
            this.setBgSpecial(0);

        } else if (cfg.QualityType == quality.Myth) { //神话
            this.setBgSpecial(1);
        }
        //巨大化
        if (cfg.Shape == 2) {

            this.mPic_Equip.renderScale = GlobalData.Bag.hugeScale;
            this.mPic_Equip_3.renderScale = GlobalData.Bag.hugeScale;
        }
    } 
    /**设置背景正常状态 */
    public setBgNormal(typeIndex: number) {
        if (this.mPic_Equip.imageGuid != this.undefineBgGuid) {
            this.mPic_Equip.imageGuid = this.undefineBgGuid;
            this.mPic_Equip.renderScale = new mw.Vector2(1, 1);
            this.mPic_Equip_3.renderScale = new mw.Vector2(1, 1);
        }
        //let color = mw.LinearColor.colorHexToLinearColor(GlobalData.Bag.bgColors[1])
        // if (this.mPic_Equip.setImageColorByHex !=) {

        this.mPic_Equip.setImageColorByHex(GlobalData.Bag.rareColor[typeIndex]);
        // }

    }

    /**设置背景特殊状态 */
    public setBgSpecial(typeIndex: number) {
        this.mPic_Equip.imageColor = mw.LinearColor.colorHexToLinearColor(GlobalData.Bag.bgColors[0]);
        if (this.mPic_Equip.imageGuid != GlobalData.Bag.legendBgGuid[typeIndex]) {
            this.mPic_Equip.imageGuid = GlobalData.Bag.legendBgGuid[typeIndex];
            this.mPic_Equip.renderScale = GlobalData.Bag.legendBgScale;
            this.mPic_Equip_3.renderScale = new mw.Vector2(1, 1);
        }
    }
    /**设置传说神话选中态 */
    private setSelectVis(id: number, isVis: boolean) {
        const quality = GlobalEnum.PetQuality;
        const globalData = GlobalData.Bag;
        let cfg = GameConfig.PetARR.getElement(id);
        if (cfg.QualityType == quality.Legend) {//传说
            this.mPic_Equip_3.imageGuid = isVis ? globalData.legendBgSelectGuid[0] : globalData.legendBgGuid[0];

            if (cfg.Shape == 2) {
                this.mPic_Equip_3.renderScale = GlobalData.Bag.hugeScale;
            } else
                this.mPic_Equip_3.renderScale = GlobalData.Bag.legendBgScale;
        } else if (cfg.QualityType == quality.Myth) { //神话
            this.mPic_Equip_3.imageGuid = isVis ? globalData.legendBgSelectGuid[1] : globalData.legendBgGuid[1];

            if (cfg.Shape == 2) {
                this.mPic_Equip_3.renderScale = GlobalData.Bag.hugeScale;
            } else
                this.mPic_Equip_3.renderScale = GlobalData.Bag.legendBgScale;
        } else {
            if (this.mPic_Equip_3.imageGuid != this.undefineSelectGuid) {
                this.mPic_Equip_3.imageGuid = this.undefineSelectGuid;
                this.mPic_Equip_3.renderScale = new mw.Vector2(1, 1);
            }
        }
    }

    /**特殊化 爱心彩虹 */
    private setSpecial(id: number) {
        const dev = GlobalEnum.PetDevType;
        let cfg = GameConfig.PetARR.getElement(id);
        if (!cfg) return;
        if (cfg.DevType == dev.Normal) {
            //普通
            // this.mPic_Heart.visibility = mw.SlateVisibility.Collapsed;
            this.mPic_Rainbow.visibility = mw.SlateVisibility.Collapsed;
        }

        if (cfg.DevType == dev.Love) {
            //爱心化
            this.mPic_Rainbow.visibility = mw.SlateVisibility.SelfHitTestInvisible;
						this.mPic_Rainbow.imageGuid = GlobalData.Bag.itemSpecialIconGuid[0]; 
        } 

        if (cfg.DevType == dev.Rainbow) {
            //彩虹化
            this.mPic_Rainbow.visibility = mw.SlateVisibility.SelfHitTestInvisible;
						this.mPic_Rainbow.imageGuid = GlobalData.Bag.itemSpecialIconGuid[1];
        }
    }
    /**设置删除图片可见性 */
    public setDelImgVis(isVis: boolean) {
        if (!this.mPic_delete.visible && isVis) {
            this.mPic_delete.visibility = mw.SlateVisibility.SelfHitTestInvisible;
        } else if (this.mPic_delete.visible && !isVis) {
            this.mPic_delete.visibility = mw.SlateVisibility.Collapsed;
        }
    }
    /**设置删除背景可见性 */
    public setDelBackVis(isVis: boolean) {

        if (!this.mPic_Effect.visible && isVis) {
            this.mPic_Effect.visibility = mw.SlateVisibility.SelfHitTestInvisible
        } else if (this.mPic_Effect.visible && !isVis) {
            this.mPic_Effect.visibility = mw.SlateVisibility.Collapsed
        }
    }
    public getDelImageVis() {
        return this.mPic_delete.visible;
    }
    /**提示动画 */
    public tipsTween() {
        let cfg = GameConfig.PetARR.getElement(this.petData.I)

        this.setDelBackVis(true);
        const data = GlobalData.Bag;
        this.alphaTween = new mw.Tween({ opacity: data.alphaRange[1] }).to({ opacity: data.alphaRange[0] }, data.alphaTime * 1000)
            .onUpdate((v) => {
                //巨大化

                if (cfg.Shape == 2) {
                    this.mPic_Effect.renderScale = GlobalData.Bag.legendBgScale;
                } else {
                    let scale = new mw.Vector2(1, 1)
                    if (this.mPic_Effect.renderScale != scale) {
                        this.mPic_Effect.renderScale = scale;
                    }
                }
                this.mPic_Effect.renderOpacity = v.opacity;
            })
            .yoyo(true)
            .easing(cubicBezier(data.alphaBezier[0], data.alphaBezier[1], data.alphaBezier[2], data.alphaBezier[3]))
            .repeat(1)
            .start()
            .onComplete(() => {
                setTimeout(() => {
                    this.alphaTween.start();
                }, 10);
            })

    }
    /**停止提示动画 */
    public stopTipsTween() {
        this.setDelBackVis(false);
        if (this.alphaTween && this.alphaTween.isPlaying()) {
            this.alphaTween.stop();
        }
    }
}