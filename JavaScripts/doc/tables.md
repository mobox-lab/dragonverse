# Dragon Verse | Tables

Dragon Verse 配置表程序侧定义文档

v0.0.1b  
by LviatYi

阅读该文档时，推荐安装以下字体：

- [JetBrainsMono Nerd Font Mono][JetbrainsMonoNerdFont]
- [Sarasa Mono SC][SarasaMonoSC]

## 采集物 CollectibleItem

|     Name     | PropName           | Type   | Desc   |
| :----------: | :----------------- | ------ | ------ |
|      ID      | Id                 | int    |        |
|     名称     | Name               | string |        |
|   品质 ID    | Quality            | int    |        |
| 生成区域 ID  | GenerationRange    | int[]  |        |
| 最大存在数量 | MaxExistence       | int    |        |
|   存在时间   | ExistenceTime      | int    | 秒 Sec |
|   生成间隔   | GenerationInterval | int    | 秒 Sec |
|  采集成功率  | SuccessRate        | int    | %      |
|  可采集次数  | HitPoint           | int    |        |
| 采集结果算法 | ResultAlgo         | string |        |

## 区域 Area

|  Name  | PropName | Type    | Desc |
| :----: | :------- | ------- | ---- |
|   ID   | Id       | int     |      |
| 区域名 | Name     | string  |      |
|  范围  | Range    | int[][] |      |

范围含义：

```json
[
    [x11,y11,x12,y12,x13,y13...x1m,y1m],
    [x21,y21,x22,y22,x23,y23...x2n,y2n]
    ...
]
```

## 龙 Dragon

|      Name      | PropName           | Type    | Desc   |
| :------------: | :----------------- | ------- | ------ |
|       ID       | Id                 | int     |        |
|      名称      | Name               | string  |        |
|      形象      | Avatar             | UNKNOWN |        |
|    元素 ID     | Elemental          | int     |        |
|    品质 ID     | Quality            | int     |        |
|    生成范围    | GenerationRange    | int[]   |        |
|    存在时间    | ExistenceTime      | int     | 秒 Sec |
|    生成间隔    | GenerationInterval | int     | 秒 Sec |
|   可捕捉次数   | HitPoint           | int     |        |
|    捕捉消耗    | Cost               | int     |        |
| 捕捉成功率算法 | SuccessRateAlgo    | int     |        |

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

## 采集结果算法

| Name | PropName | Type   | Desc |
| :--: | :------- | ------ | ---- |
|  ID  | Id       | int    |      |
| 名称 | Name     | string |      |

## 捕捉成功率算法

| Name | PropName | Type   | Desc |
| :--: | :------- | ------ | ---- |
|  ID  | Id       | int    |      |
| 名称 | Name     | string |      |

## 情绪状态

|    Name    | PropName    | Type   | Desc |
| :--------: | :---------- | ------ | ---- |
|     ID     | Id          | int    |      |
|    名称    | Name        | string |      |
| 捕捉成功率 | SuccessRate | int    | %    |

## 龙语

|   Name   | PropName | Type   | Desc |
| :------: | :------- | ------ | ---- |
|    ID    | Id       | int    |      |
| 文本 Key | Content  | string |      |

[JetbrainsMonoNerdFont]: https://github.com/ryanoasis/nerd-fonts/releases/download/v3.0.2/JetBrainsMono.zip@fallbackFont
[SarasaMonoSC]: https://github.com/be5invis/Sarasa-Gothic/releases/download/v0.41.6/sarasa-gothic-ttf-0.41.6.7z
