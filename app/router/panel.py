from fastapi import APIRouter, Depends, HTTPException
from app import DB
from app.model.panel import Course, Lection, LectionInfo, LectionRecommendation
from app.model.panel import RequestFetchLection, RequestFetchLectionMain
from app.model.panel import ResponseFetchCourse, ResponseFetchLection, ResponseFetchLectionMain

router = APIRouter()

@router.get("/fetchCourse", response_model=ResponseFetchCourse)
async def fetchCourse():
    dataCourse = list()
    for course in DB.FetchCourse():
        newCourse = Course(idCourse=course.id, titleCourse=course.title)
        dataCourse.append(newCourse)
    return ResponseFetchCourse(course=dataCourse)

@router.put("/fetchLectionBy", response_model=ResponseFetchLection)
async def fetchLection(app: RequestFetchLection):
    dataLection = list()
    for lection in DB.FetchLectionByTitle(app.title):
        newLection = Lection(idLection=lection.id, titleLection=lection.title, idCourse=lection.idCourse, titleCourse=lection.titleCourse)
        dataLection.append(newLection)

    return ResponseFetchLection(qestion=dataLection)


@router.put("/fetchLectionMain", response_model=ResponseFetchLectionMain)
async def fetchLectionMain(app: RequestFetchLectionMain):
    lection = DB.FetchLectionByIdx(app.idLection)

    info = LectionInfo(title=lection.title, tutor=lection.tutor, discription=lection.discription, counterAnswer=lection.counterAnswer)
    recommendation = LectionRecommendation(tutor="test", mentor="test", org="org") # нейронка по статистике, среднее. Из статистики

    return ResponseFetchLectionMain(info=info, recommendation=recommendation)