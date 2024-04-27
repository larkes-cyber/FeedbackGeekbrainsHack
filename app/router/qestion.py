from fastapi import APIRouter, Depends, HTTPException
from app import DB
from app.model.qestion import Qestion
from app.model.qestion import RequestFetchQestionByIdxLection, RequestAnswerQestionByIdxLection
from app.model.qestion import ResponseFetchQestionByIdxLection, ResponseAnswerQestionByIdxLection

from app.model.qestion import RequestEditLectionQestionByIdx, RequestAddLectionQestionByIdx, RequestDeleteLectionQestionByIdx
from app.model.qestion import ResponseEditLectionQestionByIdx, ResponseAddLectionQestionByIdx, ResponseDeleteLectionQestionByIdx

router = APIRouter()


@router.put("/fetchQestionByIdxLection", response_model=ResponseFetchQestionByIdxLection)
async def fetchQestionByIdxLection(app: RequestFetchQestionByIdxLection):
    lection = DB.FetchLectionByIdx(app.idLesson)
    
    dataQestion = list()
    for qestion in lection.idQuestion:
        newQestion = DB.FetchQestionByIdx(qestion)
        dataQestion.append(Qestion(idQesion=newQestion.idQesion, qestion=newQestion.qestion))

    return ResponseFetchQestionByIdxLection(qestion=dataQestion)

@router.put("/answerQestionByIdxLection", response_model=ResponseAnswerQestionByIdxLection)
async def answerQestionByIdxLection(app: RequestAnswerQestionByIdxLection):
    lection = DB.FetchLectionByIdx(app.idLesson) # Сделать провеку

    # Аналитика ответа и добавление в статистику

    fakeData = [Qestion(idQesion=1, qestion="тест"), Qestion(idQesion=2, qestion="тест")] # Получение вопросов лекции
    return ResponseAnswerQestionByIdxLection(status=True)


@router.put("/editLectionQestionByIdx", response_model=ResponseEditLectionQestionByIdx)
async def editLectionQestionByIdx(app: RequestEditLectionQestionByIdx):
    DB.EditLectionQestionByIdx(app.idQesion, app.title)

    return ResponseEditLectionQestionByIdx(status=True)


@router.put("/addLectionQestionByIdx", response_model=ResponseAddLectionQestionByIdx)
async def addLectionQestionByIdx(app: RequestAddLectionQestionByIdx):
    idd = DB.AddLectionQestionByIdx(app.idQesion, app.title)
    
    return ResponseAddLectionQestionByIdx(status=True)

@router.put("/deleteLectionQestionByIdx", response_model=ResponseDeleteLectionQestionByIdx)
async def deleteLectionQestionByIdx(app: RequestDeleteLectionQestionByIdx):
    DB.DeleteLectionQestionByIdx(app.idQesion)

    return ResponseDeleteLectionQestionByIdx(status=True)
