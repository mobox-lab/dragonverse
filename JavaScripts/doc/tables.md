# Dragon Verse | Tables

Dragon Verse 配置表程序侧定义文档

v0.8.4b  
by LviatYi

阅读该文档时，推荐安装以下字体：

- [JetBrainsMono Nerd Font Mono][JetbrainsMonoNerdFont]
- [Sarasa Mono SC][SarasaMonoSC]

## 背包物 BagItem

|   Name   | PropName   | Type    | Desc                |
| :------: | :--------- | ------- | ------------------- |
|    ID    | Id         | int     |                     |
|   名称   | Name       | string  |                     |
|   描述   | Desc       | string  |                     |
|   图标   | Icon       | string  |                     |
| 可完成性 | Achievable | boolean | 是否 可以被图鉴记录 |

## 采集物 CollectibleItem

|      Name       | PropName           | Type | Desc   |
| :-------------: | :----------------- | ---- | ------ |
|       ID        | Id                 | int  |        |
|    背包物 ID    | BagId              | int  |        |
|     品质 ID     | QualityId          | int  |        |
|  最大存在数量   | ExistenceCount     | int  |        |
|    存在时间     | ExistenceTime      | int  | 秒 Sec |
|    生成间隔     | GenerationInterval | int  | 秒 Sec |
|   采集成功率    | SuccessRate        | int  | %      |
|   可采集次数    | HitPoint           | int  |        |
| 采集结果算法 ID | ResultAlgoId       | int  |        |

## 龙 Dragon

|       Name        | PropName           | Type    | Desc   |
| :---------------: | :----------------- | ------- | ------ |
|        ID         | Id                 | int     |        |
|     背包物 ID     | BagId              | int     |        |
|       形象        | Avatar             | UNKNOWN |        |
|      元素 ID      | ElementalId        | int     |        |
|      品质 ID      | QualityId          | int     |        |
|     存在时间      | ExistenceTime      | int     | 秒 Sec |
|     生成间隔      | GenerationInterval | int     | 秒 Sec |
|    可捕捉次数     | HitPoint           | int     |        |
|     捕捉消耗      | Cost               | int     |        |
| 捕捉成功率算法 ID | SuccessRateAlgoId  | int     |        |

## 区域 Area

| Name | PropName | Type    | Desc |
| :--: | :------- | ------- | ---- |
|  ID  | Id       | int     |      |
| 名称 | Name     | string  |      |
| 范围 | Range    | int[][] |      |

范围含义：

```json
[
    [x11,y11,x12,y12,x13,y13...x1m,y1m],
    [x21,y21,x22,y22,x23,y23...x2n,y2n],
    ...
]
```

## 元素 Elemental

| Name | PropName | Type   | Desc |
| :--: | :------- | ------ | ---- |
|  ID  | Id       | int    |      |
| 名称 | Name     | string |      |

## 品质 Quality

| Name | PropName | Type   | Desc |
| :--: | :------- | ------ | ---- |
|  ID  | Id       | int    |      |
| 名称 | Name     | string |      |

## 采集结果算法 CollectResultAlgo

| Name | PropName | Type   | Desc |
| :--: | :------- | ------ | ---- |
|  ID  | Id       | int    |      |
| 名称 | Name     | string |      |

## 捕捉成功率算法 SuccessRateAlgo

| Name | PropName | Type   | Desc |
| :--: | :------- | ------ | ---- |
|  ID  | Id       | int    |      |
| 名称 | Name     | string |      |

## 情绪状态 Emotion

|    Name    | PropName    | Type   | Desc |
| :--------: | :---------- | ------ | ---- |
|     ID     | Id          | int    |      |
|    名称    | Name        | string |      |
| 捕捉成功率 | SuccessRate | int    | %    |

## 对话 Dialogue

![对话树](pic/dialogueExmp.png)

### 对话内容节点 DialogueContentNode

**对话内容节点** 即对「话」的抽象。

|         Name         | PropName        | Type   | Desc              |
| :------------------: | :-------------- | ------ | ----------------- |
|          ID          | Id              | int    | 对话内容节点 Id   |
|     下条内容 Id      | NextId          | int    | 子对话内容节点 Id |
|         内容         | Content         | string |                   |
|     来源角色 Id      | SourceId        | int    |                   |
| 对话交互节点列表 Ids | InteractNodeIds | int[]  |                   |

对于 NextId Content InteractNodeIds 分别为空，配置行的含义为：

| 置空情况 | 屏幕点击反馈 | 对话内容框 | 可交互列表         | 备注         |
| -------- | ------------ | ---------- | ------------------ | ------------ |
| 000      | 无           | 隐藏       | 隐藏               | 直接退出对话 |
| 001      | 无           | 隐藏       | 显示               |              |
| 010      | 退出对话     | 显示       | 隐藏               |              |
| 011      | 无           | 显示       | 显示               |              |
| ~~100~~  | ---          | ---        | ---                | 无意义的     |
| ~~101~~  | ---          | ---        | ---                | 无意义的     |
| 110      | 显示下一条   | 显示       | 隐藏               |              |
| 111      | 显示下一条   | 显示       | Content 完整后显示 |              |

### 对话交互节点 DialogueInteractNode

**对话交互节点** 象征玩家面对来自游戏角色的话语 可选择的回应。

|      Name       | PropName      | Type   | Desc              |
| :-------------: | :------------ | ------ | ----------------- |
|       ID        | Id            | int    | 对话交互节点 Id   |
| 对话内容节点 Id | ContentNodeId | int    | 子对话内容节点 Id |
|      内容       | Content       | string |                   |
| 对话节点功能 Id | FuncId        | int    |                   |
|      图标       | Icon          | string |                   |

对于 ContentNodeId 置空性，配置行的含义为：

- 非空 跳转到对话内容节点。
- 空 直接退出对话。

### 对话节点功能 DialogueNodeFunc

| Name | PropName | Type   | Desc |
| :--: | :------- | ------ | ---- |
|  ID  | Id       | int    |      |
| 名称 | Name     | string |      |

[JetbrainsMonoNerdFont]: https://github.com/ryanoasis/nerd-fonts/releases/download/v3.0.2/JetBrainsMono.zip@fallbackFont
[SarasaMonoSC]: https://github.com/be5invis/Sarasa-Gothic/releases/download/v0.41.6/sarasa-gothic-ttf-0.41.6.7z
