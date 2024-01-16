import os
import pandas as pd
import chardet
import json

filename = '../../../../Logs/MW_Client.log'  # 替换为您要读取的文件名
output_filename = 'DropPoint.xlsx'  # 替换为您要导出的文件名

vehicleDataTag = "areaDatas:"  # 载具路径数据关键字


def get_file_encoding(path):
    f = open(path, 'rb')
    data = f.read()
    file_encoding = chardet.detect(data).get('encoding')
    f.close()
    return file_encoding


encode = get_file_encoding(filename)

with open(filename, 'r', encoding=encode) as f:
    lines = f.readlines()
    results = []
    for line in lines:
        if vehicleDataTag in line:
            index = line.find(vehicleDataTag)
            result = line[index + len(vehicleDataTag):].strip()
            result = result.replace("[MWTS_LogEnd]", "")
            results.append(result)

    nodeDatas = json.loads(results[len(results)-1])
    excenData = []
    for i in range(len(nodeDatas)+3):
        excenData.append([])

    excenData[0].append("id")
    excenData[0].append("areaPoints")
    excenData[1].append("id")
    excenData[1].append("生成点坐标数组")
    excenData[2].append(None)
    excenData[2].append(None)

    writeIndex = 3

    for nodeData in nodeDatas:
        print(nodeData)
        excenData[writeIndex].append(nodeData["id"])

        areapoints = nodeData["areaPoints"]

        pointStr = ""
        curCount = 0
        maxCount = len(areapoints)
        for point in areapoints:
            pointStr = pointStr+str(point["x"])
            pointStr = pointStr + "|"
            pointStr = pointStr + str(point["y"])
            pointStr = pointStr + "|"
            pointStr = pointStr + str(point["z"])
            curCount = curCount+1
            if curCount < maxCount:
                pointStr = pointStr+"||"
        excenData[writeIndex].append(pointStr)
        writeIndex = writeIndex+1

    df = pd.DataFrame(excenData, columns=[
                      'int', "vector3"])
    df.to_excel(output_filename, index=False)

print("导出成功")
os.system("pause")


# with open("vaeExample", "w", encoding=encode) as wf:
#     for result in results:
#         wf.write(result + '\n')
