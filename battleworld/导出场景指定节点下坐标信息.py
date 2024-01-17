import os
import json
import chardet
import re
import time
import pandas as pd
import openpyxl

findGuid = "098F83DF"

output_filename ="导出坐标表.xlsx"

#场景map
sceneMap= {}

def get_file_encoding(path):
    f = open(path, 'rb')
    data = f.read()
    file_encoding = chardet.detect(data).get('encoding')
    f.close()
    return file_encoding

def foreach_child(node):
    if not node["Children"]:
        return
    print("子节点数量:",len(node["Children"]))
    
    excenData = []
    for i in range(len(node["Children"])):
        excenData.append([])
        
    writeIndex =0
    for childGuid in node["Children"]:
        if "RootComponent" in  sceneMap[childGuid]:
            if "Transform" in  sceneMap[childGuid]["RootComponent"]:
                if "Position" in  sceneMap[childGuid]["RootComponent"]["Transform"]:
                    position =sceneMap[childGuid]["RootComponent"]["Transform"]["Position"]
                    excenData[writeIndex].append(childGuid)
                    xyz=str(position["X"])+"|"+str(position["Y"])+"|"+str(position["Z"])
                    excenData[writeIndex].append(xyz)
                    writeIndex=writeIndex+1
                    
    df = pd.DataFrame(excenData, columns=[
                      'string', 'string'])
    df.to_excel(output_filename, index=False)

def main():
    FileList = os.listdir()
    path=""
    if "Levels" in FileList:
        path = os.path.join("Levels","NewLevel.level")
    InProject = False
    if not os.path.exists(path):
        for fileName in FileList:
            if fileName.endswith(".project"):
                InProject = True
                path = fileName
                break
    #if not os.path.exists(path):
    #    print("请将脚本放在项目文件夹下")
    #    return 
    print("openpath：",path)
    encode = get_file_encoding(path)
    print("文件编码格式：",encode)

    with open(path,"r",encoding=encode) as f:
        data = json.load(f)
        f.close()
    SceneArr = data["Scene"]

    for actor in SceneArr:
        if "Guid" in actor:
            sceneMap[actor["Guid"]] = actor
    print("actor数量：",len(sceneMap))
    
    if findGuid in sceneMap:
        foreach_child(sceneMap[findGuid])
   
            

main()

os.system("pause")