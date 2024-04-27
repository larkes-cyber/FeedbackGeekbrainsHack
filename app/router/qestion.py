from fastapi import APIRouter, Depends, HTTPException
from app.model.qestion import Qestion
from app.model.qestion import RequestFetchTokenQestion, RequestFetchQestionByToken, RequestAnswerQestionByToken
from app.model.qestion import ResponseFetchTokenQestion, ResponseFetchQestionByToken, ResponseAnswerQestionByToken

router = APIRouter()


@router.put("/fetchTokenQestion", response_model=ResponseFetchTokenQestion)
async def read_items(app: RequestFetchTokenQestion):
    # Генирация нового юзера и ответов 
    return ResponseFetchTokenQestion(token="hash")

@router.put("/fetchQestionByToken", response_model=ResponseFetchQestionByToken)
async def read_items(app: RequestFetchQestionByToken):
    fakeData = [Qestion(idQesion=1, qestion="тест"), Qestion(idQesion=2, qestion="тест")] # Получение вопросов лекции
    return ResponseFetchQestionByToken(question=fakeData)

@router.put("/answerQestionByToken", response_model=ResponseAnswerQestionByToken)
async def read_items(app: RequestAnswerQestionByToken):
    # Проверка на ошибки
    return ResponseAnswerQestionByToken(status=True)