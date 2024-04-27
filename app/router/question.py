from fastapi import APIRouter
from app import DB

from bson.objectid import ObjectId

from app.model.question import RequestFetchQestion, RequestAnswerQestion
from app.model.question import ResponseFetchQestion

router = APIRouter()


@router.post("/fetchQestion", response_model=ResponseFetchQestion)
async def fetchQestion(app: RequestFetchQestion):
    print(ResponseFetchQestion(question=DB.GetQestion(idLection=app.idLection)))
    return ResponseFetchQestion(question=DB.GetQestion(idLection=app.idLection))


@router.post("/answerQestion")
async def answerQestion(app: RequestAnswerQestion):
    question = DB.GetQestion(idLection=app.idLection)

    # Составить вопрос ответ
    # Сделать подколючение к нейронке

    # lection = DB.FetchLectionByIdx(app.idLesson) # Сделать провеку
    # fakeData = [Question(idQesion=1, question="тест"), Question(idQesion=2, question="тест")] # Получение вопросов лекции