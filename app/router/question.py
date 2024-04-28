from datetime import datetime
import json
from fastapi import APIRouter
from app import DB
from app.db import Answer
import requests

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
    dataQestionAndAnswer.append(Answer(question="О каком вебинаре Вы хотите рассказать?", answer=lection.title))

    for answer in app.question:
        for qestion in questionFilter:
            if (answer.idQestion == qestion.id) and (qestion.id != '000000000000000000000000'):
                dataQestionAndAnswer.append(Answer(question=qestion.question, answer=answer.answer))
    
    data = {"question_1": (dataQestionAndAnswer[0]).answer, "question_2": (dataQestionAndAnswer[1]).answer, "question_3": (dataQestionAndAnswer[2]).answer, "question_4": (dataQestionAndAnswer[3]).answer, "question_5": (dataQestionAndAnswer[4]).answer}
    resp = requests.post('http://83.166.237.206:8000/predict', params={'payload': json.dumps(data)}, verify=False)
    resp = json.loads(resp.text)
    is_relevant, is_positive, objectt = resp["relevance"], resp["is_positive"], resp["review_type"]

    # Добавить пункт основной проблемы вебинара, препода, программы
    DB.AddFeedback(idLection=app.idLection, dataAnswer=dataQestionAndAnswer, is_relevant=is_relevant, is_positive=is_positive, object=objectt, time=datetime.now())