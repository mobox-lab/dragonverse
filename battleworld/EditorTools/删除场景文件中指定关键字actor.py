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
    "\u5149\u73af"
]


filterCount = [
    0
]


def get_file_encoding(path):
    f = open(path, 'rb')
    data = f.read()
    file_encoding = chardet.detect(data).get('encoding')
    f.close()
    return file_encoding


# 遍历场景所有actor


def foreachActor(rootObj, first):
    actors = []
    newChilds = []
    if first:
        actors = rootObj["Scene"]
    else:
        actors = rootObj["Children"]
    for actor in actors:
        if "Name" not in actor:
            continue
        actorName = actor["Name"]
        print("===select "+actorName)
        isHase = False
        findIndex = 0
        for key in filterKeys:
            if actorName in key:
                print("===="+actorName+"===="+key)
                filterCount[findIndex] += 1
                isHase = True
                break
            findIndex += 1
        if isHase:
            return

        newChilds.append(actor)

        if "Children" in actor:
            foreachActor(actor, False)

    if first:
        rootObj["Scene"] = newChilds
    else:
        rootObj["Children"] = newChilds


# 读取区域表excel文件内容


def main():

    global filterKeys
    if len(filterKeys) <= 0:
        print("没有可过滤的关键字")
        return

    for key in filterKeys:
        filterCount.append(0)

    filepath = filedialog.askopenfilename(filetypes=[("NewLevel", "*.level")])
    print("打开路径：", filepath)
    encode = get_file_encoding(filepath)
    print("文件编码格式：", encode)

    with open(filepath, "r", encoding=encode) as f:
        data = json.load(f)
        f.close()
    foreachActor(data, True)

    index = 0
    for key in filterKeys:
        print("删除"+key+"数量:"+str(filterCount[index]))

    with open(filepath, "w", encoding=encode) as wf:
        json.dump(data, wf)
    wf.close()


if __name__ == '__main__':
    main()

os.system("pause")
