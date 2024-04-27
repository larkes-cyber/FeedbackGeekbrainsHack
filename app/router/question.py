from datetime import datetime
from fastapi import APIRouter
from app import DB
from app.db import Answer

from bson.objectid import ObjectId

from app.model.question import RequestFetchQestion, RequestAnswerQestion
from app.model.question import ResponseFetchQestion

router = APIRouter()


@router.post("/fetchQestion", response_model=ResponseFetchQestion)
async def fetchQestion(app: RequestFetchQestion):
    return ResponseFetchQestion(question=DB.GetQestion(idLection=app.idLection))


@router.post("/answerQestion")
async def answerQestion(app: RequestAnswerQestion):
    questionFilter = DB.GetQestion(idLection=app.idLection)
    lection = DB.GetLection(idLection=app.idLection)

    dataQestionAndAnswer = list()
    dataQestionAndAnswer.append(Answer(qestion="О каком вебинаре Вы хотите рассказать?", answer=lection.title))

    for answer in app.question:
        for qestion in questionFilter:
            if (answer["idQestion"] == qestion.id) and (qestion.id != '000000000000000000000000'):
                dataQestionAndAnswer.append(Answer(qestion=qestion.question, answer=answer["answer"]))
    
    is_relevant, is_positive, objectt = 0, 0, 2 #toAI(dataBaseQestion) Фкунция нейронка
    
    DB.AddFeedback(idLection=app.idLection, dataAnswer=dataQestionAndAnswer, is_relevant=is_relevant, is_positive=is_positive, object=objectt, time=datetime.now())