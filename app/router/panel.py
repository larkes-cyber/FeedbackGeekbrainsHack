from fastapi import APIRouter, Depends, HTTPException
from app.db import UseDB
from app.model.panel import Course, Lection, LectionInfo, LectionRecommendation
from app.model.panel import RequestFetchLection, RequestFetchLectionMain
from app.model.panel import ResponseFetchCourse, ResponseFetchLection, ResponseFetchLectionMain

router = APIRouter()

db = UseDB()

@router.get("/fetchCourse", response_model=ResponseFetchCourse)
async def read_items():
    dataCourse = list()
    for course in db.FetchCourse():
        newCourse = Course(idCourse=course._id, titleCourse=course.title)
        dataCourse.append(newCourse)
    return ResponseFetchCourse(course=dataCourse)

@router.put("/fetchLection", response_model=ResponseFetchLection)
async def read_items(app: RequestFetchLection):
    dataLection = list()
    for lection in db.FetchLectionByTitle(app.title):
        newLection = Lection(idLection=lection._id, idCourse=lection.idCourse, titleCourse=lection.titleCourse, titleLection=lection.title)
        dataLection.append(newLection)

    return ResponseFetchLection(qestion=dataLection)

@router.put("/fetchLectionMain", response_model=ResponseFetchLectionMain)
async def read_items(app: RequestFetchLectionMain):
    lection = db.FetchLectionByIdx(app.idLection)
    fakeInfo = LectionInfo(title=lection.title, tutor=lection.tutor, discription=lection.discription, counterAnswer=lection.counterAnswer)

    fakeRecommendation = LectionRecommendation(tutor="test", mentor="test", org="org") # нейронка по статистике, среднее

    return ResponseFetchLectionMain(info=fakeInfo, recommendation=fakeRecommendation)