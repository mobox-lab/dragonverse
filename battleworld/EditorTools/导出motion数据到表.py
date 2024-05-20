import os
import pandas as pd
import chardet
import json
import openpyxl

filename = 'E:\Meta031.03\MetaWorldSaved\Saved\MetaWorld\MWLogs\Client_1.log'  # 替换为您要读取的文件名
output_filename = 'MotionClip_技能数据.xlsx'  # 替换为您要导出的文件名

vehicleDataTag = "vae-motion-saveData:"  # 载具路径数据关键字


def get_file_encoding(path):
    f = open(path, 'rb')
    data = f.read()
    file_encoding = chardet.detect(data).get('encoding')
    f.close()
    return file_encoding


def FindAndReplace(content: str, GuidLen: int, FilePath: str):
    return content.strip()


encode = get_file_encoding(filename)

with open(filename, 'r', encoding=encode) as f:
    lines = f.readlines()
    results = []
    for line in lines:
        if vehicleDataTag in line:
            index = line.find(vehicleDataTag)
            result = line[index + len(vehicleDataTag):].strip()
            results.append(result)
    print("数据数量："+str(len(results)))  # [MWTS_LogEnd]
    lineStr = results[len(results)-1]
    lineStr = lineStr.replace("[MWTS_LogEnd]", "")
    nodeDatas = json.loads(lineStr)
    excenData = []
    for i in range(len(nodeDatas)+3):
        excenData.append([])

    excenData[0].append("id")
    excenData[0].append("groupName")
    excenData[0].append("name")
    excenData[0].append("frameCount")
    excenData[0].append("motionData")
    excenData[1].append("id")
    excenData[1].append("组名")
    excenData[1].append("名称")
    excenData[1].append("总帧数")
    excenData[1].append("技能json数据")
    excenData[2].append(None)
    excenData[2].append(None)
    excenData[2].append(None)
    excenData[2].append(None)
    excenData[2].append(None)

    writeIndex = 3
    tableId = 1
    for nodeData in nodeDatas:
        excenData[writeIndex].append(nodeData["motionId"])
        excenData[writeIndex].append(nodeData["groupName"])
        excenData[writeIndex].append(nodeData["name"])
        excenData[writeIndex].append(int(nodeData["frameCount"]))
        excenData[writeIndex].append(json.dumps(nodeData["motionNodeMap"]))
        writeIndex = writeIndex+1
        tableId = tableId+1

    df = pd.DataFrame(excenData, columns=[
                      'int', "string", "string", "int", "string"])
    df.to_excel(output_filename, index=False)
    print("格式化配置表")

    curUrl = os.getcwd()
    print("curUrl:"+curUrl)
    for filename in os.listdir(curUrl):
        curPath = os.path.join(curUrl, filename)
        if not curPath.endswith(".xlsx"):
            continue
        try:
            Excel = openpyxl.load_workbook(curPath)
        except:
            print('e----->', filename)
        else:
            for sheetname in Excel.sheetnames:
                cursheet = Excel[sheetname]
                for row in cursheet.rows:
                    for cell in row:
                        if not isinstance(cell.value, str):
                            continue
                        value = FindAndReplace(str(cell.value), 64, curPath)
                        if value != "None":
                            cell.value = value
                        value = FindAndReplace(str(cell.value), 32, curPath)
                        if value != "None":
                            cell.value = value
            Excel.save(curPath)


print("导出成功")
os.system("pause")
