from fastapi import APIRouter, Depends, HTTPException
from app.model.panel import Course, Lection, LectionInfo, LectionRecommendation
from app.model.panel import RequestFetchLection, RequestFetchLectionMain
from app.model.panel import ResponseFetchCourse, ResponseFetchLection, ResponseFetchLectionMain

router = APIRouter()


@router.get("/fetchCourse", response_model=ResponseFetchCourse)
async def read_items():
    fakeData = [Course(idCourse=0, titleCourse="test"), Course(idCourse=1, titleCourse="test")] # Поиск нужного курса
    return ResponseFetchCourse(course=fakeData)

@router.put("/fetchLection", response_model=ResponseFetchLection)
async def read_items(app: RequestFetchLection):
    fakeData = [Lection(idLection=0, idCourse=0, titleLection="test", titleCourse="test")] # Поиск нужного лекции по курсу
    return ResponseFetchLection(qestion=fakeData)

@router.put("/fetchLectionMain", response_model=ResponseFetchLectionMain)
async def read_items(app: RequestFetchLectionMain):
    fakeInfo = LectionInfo(title="test", tutor="test", discription="test", counterAnswer=3)
    fakeRecommendation = LectionRecommendation(tutor="test", mentor="test", org="org")
    return ResponseFetchLectionMain(info=fakeInfo, recommendation=fakeRecommendation)