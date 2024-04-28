from datetime import datetime
import io
import json
from fastapi import APIRouter, File, UploadFile
from fastapi.responses import FileResponse
import requests
from app import DB
from app.db import Answer
import pandas as pd
import random

from app.model.exportAndImport import DownloadLectionStatistiic

router = APIRouter()

@router.get("/exportExel/{idLection}")
def download_file(idLection: str):
    lection = DB.GetLection(idLection)
    df = pd.DataFrame(columns=[ "time", "course", "lection", "answer_1", "answer_2", "answer_3", "answer_4", "answer_5", "is_relevant" , "is_positive ", "object"])

    for statistic in lection.feedback:

        objectName = ""
        if statistic.object == 0:
            objectName = "вебинар"
        elif statistic.object == 1:
            objectName = "программа"
        elif statistic.object == 2:
            objectName = "препод"
    

        df.loc[len(df.index)] = [(statistic.time).strftime('%Y-%m-%d %H:%M:%S'), lection.titleCourse, lection.title, ((statistic.answer)[0]).answer, ((statistic.answer)[1]).answer, ((statistic.answer)[2]).answer, ((statistic.answer)[3]).answer, ((statistic.answer)[4]).answer, statistic.is_relevant, statistic.is_positive, objectName]
    df.to_excel("app/file/output.xlsx")  
    return FileResponse(path='app/file/output.xlsx', filename='Статистика.xlsx', media_type='multipart/form-data')

@router.post("/importExel")
async def upload_file(file: UploadFile = File(...)):
    if file.filename.endswith('.xlsx'):
        f = await file.read()
        df = pd.read_excel(io.BytesIO(f))
    
    dataTitleCourse = list()
    
    for ind in df.index:
        time = df['timestamp'][ind]
        titleCourse = df['question_1'][ind]
        titleLection = df['question_1'][ind]
        answer_2 = df['question_2'][ind]
        answer_3 = df['question_3'][ind]
        answer_4 = df['question_4'][ind]
        answer_5 = df['question_5'][ind]
        
        if titleCourse not in dataTitleCourse:
            idxCourse = DB.AddCourse(titleCourse)
            idxLection = DB.AddLection(titleLection, idxCourse, "Описание курса", "Преподаватель курса")
        dataTitleCourse.append(titleCourse)

        dataBaseQestion = [
            Answer(question="О каком вебинаре Вы хотите рассказать?", answer=titleCourse),
            Answer(question="Что вам больше всего понравилось в теме вебинара и почему?", answer=answer_2),
            Answer(question="Были ли моменты в вебинаре, которые вызвали затруднения в понимании материала? Можете описать их?", answer=answer_3),
            Answer(question="Какие аспекты вебинара, по вашему мнению, нуждаются в улучшении и какие конкретные изменения вы бы предложили?", answer=answer_4),
            Answer(question="Есть ли темы или вопросы, которые вы бы хотели изучить более подробно в следующих занятиях?", answer=answer_5)]
        
        try: 
            time = datetime.strptime(time, '%Y-%m-%d %H:%M:%S')
        except:
            time = datetime.now()
        
        data = {"question_1": titleCourse, "question_2": answer_2, "question_3": answer_3, "question_4": answer_4, "question_5": answer_5}
        resp = requests.post('http://83.166.237.206:8000/predict', params={'payload': json.dumps(data)}, verify=False)
        resp = json.loads(resp.text)
        is_relevant, is_positive, objectt = resp["relevance"], resp["is_positive"], resp["review_type"]

        DB.AddFeedback(idLection=idxLection, dataAnswer=dataBaseQestion, is_relevant=is_relevant, is_positive=is_positive, object=objectt, time=time)