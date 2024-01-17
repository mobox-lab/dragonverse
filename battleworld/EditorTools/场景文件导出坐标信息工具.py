import os
import json
from tkinter import filedialog
import chardet
import re
import time
import pandas as pd
import openpyxl
import math

# 筛选关键字
filterKeys = [
    "元素"
]
# 关键字对应什么类型
filterTypes = [
    1
]


output_filename = 'AreaInteractive_场景交互物.xlsx'  # 替换为您要导出的文件名


excenData = []


writeIndex = 0
tableId = 1

# 区域表数据
areaData = []


def get_file_encoding(path):
    f = open(path, 'rb')
    data = f.read()
    file_encoding = chardet.detect(data).get('encoding')
    f.close()
    return file_encoding

# 筛选坐标


def distance(a, b):
    x = b["x"] - a["x"]
    y = b["y"] - a["y"]
    dis = math.sqrt(x * x + y * y)
    return dis

# 解析


def parseData(actor, type):
    actorName = actor["Name"]
    pos = actor["RootComponent"]["Transform"]["Position"]
    rot = actor["RootComponent"]["Transform"]["EulerRotation"]
    scale = actor["RootComponent"]["Transform"]["Scale"]

    posStr = str(pos["X"]) + "|" + str(pos["Y"]) + "|" + str(pos["Z"])
    rotStr = str(rot["X"]) + "|" + str(rot["Y"]) + "|" + str(rot["Z"])
    scaleStr = str(scale["X"]) + "|" + str(scale["Y"]) + "|" + str(scale["Z"])

    global writeIndex
    global tableId

    # print("===len "+len(excenData)-1+"==="+writeIndex)
    if len(excenData) <= writeIndex:
        excenData.append([])

    excenData[writeIndex].append(tableId)
    excenData[writeIndex].append(actorName)

    # 判断属于哪个区域
    global areaData

    curLoc = {}
    curLoc["x"] = pos["X"]
    curLoc["y"] = pos["Y"]
    curLoc["z"] = pos["Z"]

    for cfgData in areaData:
        print("====check distance ")
        print(cfgData["loc"])
        print(curLoc)
        dis = distance(curLoc, cfgData["loc"])
        if dis <= cfgData["range"]:
            excenData[writeIndex].append(cfgData["id"])
            break

    excenData[writeIndex].append(type)
    excenData[writeIndex].append(posStr)
    excenData[writeIndex].append(rotStr)
    excenData[writeIndex].append(scaleStr)
    writeIndex = writeIndex+1
    tableId += 1


def checkActor(actor):
    if "Name" not in actor:
        return
    actorName = actor["Name"]
    index = 0
    for key in filterKeys:
        if key in actorName:
            parseData(actor, filterTypes[index])
            return
        index += 1

# 遍历场景所有actor


def foreachActor(actors):
    for actor in actors:
        checkActor(actor)

        if "Children" in actor:
            foreachActor(actor["Children"])

# 读取区域表excel文件内容


def read(file_path):

    global areaData
    if len(areaData) > 0:
        return

    data_from = pd.read_excel(
        'Area_区域表.xlsx', sheet_name='Sheet1')

    cell_A = data_from.values  # 此时，cell_A是一个矩阵（多维数组

    excelIndex = 4

    for i in range(8):

        data = {}
        areaData.append(data)
        data["id"] = i+1
        data["range"] = cell_A[excelIndex][3]
        locStr = cell_A[excelIndex][5]
        locs = locStr.split("|")

        locData = {}
        locData["x"] = float(locs[0])
        locData["y"] = float(locs[1])
        locData["z"] = float(locs[2])

        data["loc"] = locData

        excelIndex += 1

        print(str(data))


def main():
    curUrl = os.getcwd()
    for filename in os.listdir(curUrl):
        curPath = os.path.join(curUrl, filename)
        if "Area_区域表" in curPath:
            read(curPath)

    filepath = filedialog.askopenfilename(filetypes=[("NewLevel", "*.level")])
    print("打开路径：", filepath)
    encode = get_file_encoding(filepath)
    print("文件编码格式：", encode)

    with open(filepath, "r", encoding=encode) as f:
        data = json.load(f)
        f.close()

    for i in range(3):
        excenData.append([])

    excenData[0].append("id")
    excenData[0].append("name")
    excenData[0].append("areaId")
    excenData[0].append("type")
    excenData[0].append("position")
    excenData[0].append("rotation")
    excenData[0].append("scale")
    excenData[1].append("id")
    excenData[1].append("名称")
    excenData[1].append("所属区域id")
    excenData[1].append("类型")
    excenData[1].append("坐标")
    excenData[1].append("旋转")
    excenData[1].append("缩放")
    excenData[2].append(None)
    excenData[2].append(None)
    excenData[2].append(None)
    excenData[2].append(None)
    excenData[2].append(None)
    excenData[2].append(None)

    global writeIndex
    writeIndex = 3

    SceneArr = data["Scene"]
    foreachActor(SceneArr)

    df = pd.DataFrame(excenData, columns=[
        'int', 'int', 'int', "string", "vector3", "vector3", "vector3"])
    df.to_excel(output_filename, index=False)


if __name__ == '__main__':
    main()

os.system("pause")
