import os
import pandas as pd
import json
from chardet.universaldetector import UniversalDetector
import re   

map = {};
filemap={};

def detect_encoding(file_path):
    detector = UniversalDetector()
    with open(file_path, 'rb') as file:
        for line in file:
            detector.feed(line)
            if detector.done:
                break
    detector.close()
    return detector.result['encoding']

def convert_prefab_to_json(prefab_path):
    encoding = detect_encoding(prefab_path)
    with open(prefab_path, 'r',encoding=encoding) as prefab_file:
        # 假设.prefab文件内容是文本形式，你可能需要根据实际情况修改此处的读取方式
        content = prefab_file.read()
        prefab_content = json.loads(content) #.read()
        guid = prefab_content['Guid']
        map[guid] = content;
        filemap[guid] = prefab_path;

    print(f"已成功转换 {prefab_path} 到 {guid}")

def write_string_to_file(file_path, content):
    try:
        with open(file_path, 'w', encoding='utf-8') as file:
            file.write(content)
        #print(f"成功将字符串写入文件: {file_path}")
    except Exception as e:
        print(f"写入文件出错：{e}")


def convert_prefabs_in_folder(folder_path):
    for root, dirs, files in os.walk(folder_path):
        for filename in files:
            if filename.endswith(".prefab"):
                prefab_path = os.path.join(root, filename)
                convert_prefab_to_json(prefab_path)
                
def read_excel_rows(file_path):
    try:
        # 读取 Excel 文件
        df = pd.read_excel(file_path)

        # 遍历每一行并输出
        for index, row in df.iterrows():
            try:
                #print(f"行 {index + 1}: {row['a']} | {row['b']}")
                pre = row['a']
                new = row['b']
                txt = map[pre]
                path = filemap[new]
                txt = replace_guid(txt,pre,new);
                txt = replace_mwnetstatus(txt);
                write_string_to_file(path,txt);
            except Exception as e:
                print(f"读取Excel表格出错：{e}")
           
    except Exception as e:
        print(f"读取Excel表格出错：{e}")
        
def replace_mwnetstatus(input_string):
    # 使用正则表达式匹配并替换
    pattern = r'"MWNetStatus":1'
    replaced_string = re.sub(pattern, r'"MWNetStatus":0', input_string)

    return replaced_string

def replace_guid(text,preguid,newguid):
    # 使用正则表达式匹配"Guid":"${1}"，并替换为"Guid":"${2}"
    pattern = r'"Guid":"'+preguid+'"'
    replaced_text = re.sub(pattern, r'"Guid":"'+newguid+'"',text )

    return replaced_text

# if __name__ == "__main__":
#     excel_file_path = "your_excel_file.xlsx"  # 请替换为你的Excel文件路径
#     extracted_data = read_excel_and_extract_columns(excel_file_path)

#     if extracted_data is not None:
#         print("提取的数据:")
#         print(extracted_data)

if __name__ == "__main__":
    current_folder = os.getcwd()  # 获取当前文件夹路径
    convert_prefabs_in_folder(current_folder)
    read_excel_rows("./1.xlsx");
