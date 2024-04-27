from fastapi import APIRouter, Depends, HTTPException
from app import DB
from app.db import filterQestion
from app.model.qestion import Qestion
from app.model.qestion import RequestFetchQestionByIdxLection, RequestAnswerQestionByIdxLection
from app.model.qestion import ResponseFetchQestionByIdxLection, ResponseAnswerQestionByIdxLection

from app.model.qestion import RequestEditLectionQestionByIdx, RequestAddLectionQestionByIdx, RequestDeleteLectionQestionByIdx
from app.model.qestion import ResponseEditLectionQestionByIdx, ResponseAddLectionQestionByIdx, ResponseDeleteLectionQestionByIdx

from app.model.qestion import RequestEditLection, RequestDeleteLection, RequestAddLection
from app.model.qestion import ResponseEditLection, ResponseDeleteLection, ResponseAddLection

from app.model.qestion import RequestEditCourse, RequestDeleteCourse, RequestAddCourse
from app.model.qestion import ResponseEditCourse, ResponseDeleteCourse, ResponseAddCourse

router = APIRouter()


@router.put("/fetchQestionByIdxLection", response_model=ResponseFetchQestionByIdxLection)
async def fetchQestionByIdxLection(app: RequestFetchQestionByIdxLection):
    lection = DB.FetchLectionByIdx(app.idLesson)
    
    dataQestion = list()
    dataQestion.append(Qestion(idQesion="-1", qestion=filterQestion))
    for qestion in lection.idQuestion:
        print(lection)
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
    idd = DB.AddLectionQestionByIdx(app.idLection, app.title)
    
    return ResponseAddLectionQestionByIdx(status=True)

@router.put("/deleteLectionQestionByIdx", response_model=ResponseDeleteLectionQestionByIdx)
async def deleteLectionQestionByIdx(app: RequestDeleteLectionQestionByIdx):
    DB.DeleteLectionQestionByIdx(app.idQesion)

    return ResponseDeleteLectionQestionByIdx(status=True)

@router.put("/addLection", response_model=ResponseAddLection)
async def addLection(app: RequestAddLection):
    DB.AddLection(app.title, app.description, app.tutor, app.idCourse)

    return ResponseAddLection(status=True)

@router.put("/editLection", response_model=ResponseEditLection)
async def editLection(app: RequestEditLection):
    DB.EditLection(app.title, app.description, app.tutor, app.idLection)

    return ResponseEditLection(status=True)

@router.put("/deleteLection", response_model=ResponseDeleteLection)
async def deleteLection(app: RequestDeleteLection):
    DB.DeleteLection(app.idLection)

    return ResponseDeleteLection(status=True)


@router.put("/addCourse", response_model=ResponseAddCourse)
async def addCourse(app: RequestAddCourse):
    DB.AddCource(app.title)

    return ResponseAddCourse(status=True)

@router.put("/editCourse", response_model=ResponseEditCourse)
async def editCourse(app: RequestEditCourse):
    DB.EditCource(app.title, app.idCourse)

    return ResponseEditCourse(status=True)

@router.put("/deleteCourse", response_model=ResponseDeleteCourse)
async def deleteCourse(app: RequestDeleteCourse):
    DB.DeleteCource(app.idCourse)

    return ResponseDeleteCourse(status=True)