from datetime import datetime
import io
from fastapi import APIRouter, File, UploadFile
from fastapi.responses import FileResponse
from app import DB
from app.db import Answer
import pandas as pd

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
        
        # tutor, mentor, org = DB.GetRecomendation(idLection)

        df.loc[len(df.index)] = [(statistic.time).strftime('%Y-%m-%d %H:%M:%S'), lection.titleCourse, lection.title, ((statistic.answer)[0]).answer, ((statistic.answer)[1]).answer, ((statistic.answer)[2]).answer, ((statistic.answer)[3]).answer, ((statistic.answer)[4]).answer, statistic.is_relevant, statistic.is_positive, objectName]
    df.to_excel("app/file/output.xlsx")  
    return FileResponse(path='app/file/output.xlsx', filename='Статистика.xlsx', media_type='multipart/form-data')

@router.post("/importExel")
async def upload_file(file: UploadFile = File(...)):
    if file.filename.endswith('.xlsx'):
        f = await file.read()
        df = pd.read_excel(io.BytesIO(f))
    
    
    for ind in df.index:
        time = df['timestamp'][ind]
        titleCourse = df['question_1'][ind]
        titleLection = df['question_1'][ind]
        answer_2 = df['question_2'][ind]
        answer_3 = df['question_3'][ind]
        answer_4 = df['question_4'][ind]
        answer_5 = df['question_5'][ind]

        idxCourse = DB.AddCourse(titleCourse)
        idxLection = DB.AddLection(titleLection, idxCourse, "-", "-")

        dataBaseQestion = [
            Answer(qestion="О каком вебинаре Вы хотите рассказать?", answer=titleCourse),
            Answer(qestion="Что вам больше всего понравилось в теме вебинара и почему?", answer=answer_2),
            Answer(qestion="Были ли моменты в вебинаре, которые вызвали затруднения в понимании материала? Можете описать их?", answer=answer_3),
            Answer(qestion="Какие аспекты вебинара, по вашему мнению, нуждаются в улучшении и какие конкретные изменения вы бы предложили?", answer=answer_4),
            Answer(qestion="Есть ли темы или вопросы, которые вы бы хотели изучить более подробно в следующих занятиях?", answer=answer_5)]
        
        try: 
            time = datetime.strptime(time, '%Y-%m-%d %H:%M:%S')
        except:
            time = datetime.now()
        
        is_relevant, is_positive, objectt = 0, 0, 2 #toAI(dataBaseQestion) Фкунция нейронка
        # Добавить пункт основной проблемы вебинара, препода, программы
        
        DB.AddFeedback(idLection=idxLection, dataAnswer=dataBaseQestion, is_relevant=is_relevant, is_positive=is_positive, object=objectt, time=time)

    # for answer in app.question:
    #     for qestion in questionFilter:
    #         if answer["idQestion"] == qestion.id:
    #             dataQestionAndAnswer.append(Answer(qestion=qestion.question, answer=answer["answer"]))
    
    # is_relevant, is_positive, objectt = 0, 0, 2 ## Фкунция генирирующая 
    
    # DB.AddFeedback(idLection=app.idLection, dataAnswer=dataQestionAndAnswer, is_relevant=is_relevant, is_positive=is_positive, object=objectt)

    #     # DB.AddAnswerLection(idxLection, answer_1, answer_2, answer_3, answer_4, answer_5)
    #     print(df['question_1'][ind], df['Stream'][ind])
        
#     if file.filename.endswith('.xlsx'):

        
#         f = file.read()
#         xlsx = io.BytesIO(f)
#         writer = pd.ExcelWriter(xlsx, engine='xlsxwriter')

#         return file

# @app.post("/importExel")
# pd.read_excel(io='temp1.xlsx', engine='openpyxl')



# import io

# b = io.BytesIO(b"Hello World") ## Some random BytesIO Object
# print(type(b))                 ## For sanity's sake
# with open("test.xlsx") as f: ## Excel File
#     print(type(f))           ## Open file is TextIOWrapper
#     bw=io.TextIOWrapper(b)   ## Conversion to TextIOWrapper
#     print(type(bw))  
# @app.post("/importCSV")
# def upload(file: UploadFile = File(...)):
#     csvReader = csv.DictReader(codecs.iterdecode(file.file, 'utf-8'))
#     data = {}
#     for rows in csvReader:             
#         key = rows['Id']  # Assuming a column named 'Id' to be the primary key
#         data[key] = rows  
    
#     file.file.close()
#     return data

# @app.post("/exportExel")
# def download_file(app: DownloadLectionStatistiic):
#   return FileResponse(path='data.xlsx', filename='Статистика покупок.xlsx', media_type='multipart/form-data')

# @app.post("/exportExel")
# def upload(file: UploadFile = File(...)):
#     csvReader = csv.DictReader(codecs.iterdecode(file.file, 'utf-8'))
#     data = {}
#     for rows in csvReader:             
#         key = rows['Id']  # Assuming a column named 'Id' to be the primary key
#         data[key] = rows  
    
#     file.file.close()
#     return data

#
# Id,course,lection,qestion1,qestion2,qestion3,qestion4,qestion5,is_relevant,is_positive,object,time
# 1,Alice,20,62,120.6
# 2,Freddie,21,74,190.6
# 3,Bob,17,68,120.0