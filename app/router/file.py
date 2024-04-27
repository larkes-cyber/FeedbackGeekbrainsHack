from fastapi import FastAPI, File, UploadFile
from app import DB
import pandas as pd
import csv
import codecs

from app.model.file import DownloadLectionStatistiic

app = FastAPI()

@app.post("/exportExel")
def download_file(app: DownloadLectionStatistiic):
    lection = DB.GetLection(app.idLection)
    df = pd.DataFrame()
    df.columns("time", "course", "lection", "qestion1", "qestion2", "qestion3", "qestion4", "qestion5", "is_relevant" , "is_positive ", "object")

    return FileResponse(path='data.xlsx', filename='Статистика покупок.xlsx', media_type='multipart/form-data')




    
@app.post("/importCSV")
def upload(file: UploadFile = File(...)):
    csvReader = csv.DictReader(codecs.iterdecode(file.file, 'utf-8'))
    data = {}
    for rows in csvReader:             
        key = rows['Id']  # Assuming a column named 'Id' to be the primary key
        data[key] = rows  
    
    file.file.close()
    return data

@app.post("/exportExel")
def download_file(app: DownloadLectionStatistiic):
  return FileResponse(path='data.xlsx', filename='Статистика покупок.xlsx', media_type='multipart/form-data')

@app.post("/exportExel")
def upload(file: UploadFile = File(...)):
    csvReader = csv.DictReader(codecs.iterdecode(file.file, 'utf-8'))
    data = {}
    for rows in csvReader:             
        key = rows['Id']  # Assuming a column named 'Id' to be the primary key
        data[key] = rows  
    
    file.file.close()
    return data

#
# Id,course,lection,qestion1,qestion2,qestion3,qestion4,qestion5,is_relevant,is_positive,object,time
# 1,Alice,20,62,120.6
# 2,Freddie,21,74,190.6
# 3,Bob,17,68,120.0