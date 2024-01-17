import os
import json
from tkinter import filedialog
import chardet
import re
import time
import pandas as pd
import openpyxl


def get_file_encoding(path):
    f = open(path, 'rb')
    data = f.read()
    file_encoding = chardet.detect(data).get('encoding')
    f.close()
    return file_encoding


oldGuidSet = []
# 处理配置表Guid


def ChangeExcelGuid(RootPath: str = ""):
    for filename in os.listdir(RootPath):
        curPath = os.path.join(RootPath, filename)
        if os.path.isdir(curPath):
            ChangeExcelGuid(curPath)
        if not curPath.endswith(".xlsx"):
            continue
        print(filename)
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


def FindAndReplace(content: str, GuidLen: int, FilePath: str):
    return content.strip()

# 遍历所有文件夹下的文件


def walk_files(path, endpoint=None):
    file_list = []
    for root, dirs, files in os.walk(path):
        for file in files:
            # print("file", file)
            file_path = os.path.join(root, file)
            # print("file_path", file_path)

            if file_path.endswith(endpoint):
                file_list.append(file_path)

    return file_list


def main():
    directory = filedialog.askdirectory()
    ChangeExcelGuid(directory)
    print("Success!")


if __name__ == '__main__':
    main()
