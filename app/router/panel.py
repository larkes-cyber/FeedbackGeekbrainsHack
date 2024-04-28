from fastapi import APIRouter
from app import DB

from app.model.panel import Course, Lection, LectionInfo, LectionRecommendation, CourseAndLection, Lection_2

router = APIRouter()

# Работа с курсами/лекциями
from app.model.panel import RequestFilterLectionByTitle, RequestFilterLectionByCourse
from app.model.panel import ResponseFileterLection, ResponseFetchCourse, ResponseFetchCourseAndLection

from app.model.panel import ResponseFetchLectionInfo
from app.model.panel import RequestFilterIdLection


@router.get("/fetchCourse", response_model=ResponseFetchCourse)
async def fetchCourse():
    courseFilter = DB.GetAllCourse()
    dataCourse = list()
    for course in courseFilter:
        dataCourse.append(Course(id=course.id, title=course.title))
    return ResponseFetchCourse(course=dataCourse)

@router.post("/filterLection", response_model=ResponseFileterLection)
async def filterLection(app: RequestFilterLectionByTitle):
    lectionFilter = DB.GetLectionByTitle(app.title)
    dataLection = list()
    for lection in lectionFilter:
        dataLection.append(Lection(id=str(lection.id), title=lection.title, description=lection.description, idCourse=lection.idCourse, titleCourse=lection.titleCourse))
    return ResponseFileterLection(lection=dataLection)

@router.post("/fetchLectionByIdCourse", response_model=ResponseFileterLection)
async def fetchCourseLection(app: RequestFilterLectionByCourse):
    lectionFilter = DB.GetLectionByCourse(app.idCourse)
    dataLection = list()
    for lection in lectionFilter:
        dataLection.append(Lection(id=str(lection.id), title=lection.title, description=lection.description, idCourse=lection.idCourse, titleCourse=lection.titleCourse))
    return ResponseFileterLection(lection=dataLection)

@router.post("/fetchLectionInfo", response_model=ResponseFetchLectionInfo)
async def fetchLectionMain(app: RequestFilterIdLection):
    lection = DB.GetLection(app.idLection)
    info = LectionInfo(title=lection.title, tutor=lection.tutor, discription=lection.description, counterAnswer=lection.countAnswer)

    tutor, mentor, org = DB.GetRecomendation(app.idLection)

    recommendation = LectionRecommendation(tutor=tutor, mentor=mentor, org=org) # нейронка по статистике, среднее. Из статистики

    return ResponseFetchLectionInfo(info=info, recommendation=recommendation)

@router.get("/fetchCourseWithLection", response_model=ResponseFetchCourseAndLection)
async def fetchCourse():
    courseFilter = DB.GetAllCourse()
    dataCourse = list()
    for course in courseFilter:
        dataLection = list()
        for lection in DB.GetLectionByCourse(course.id):
            dataLection.append(Lection_2(id=lection.id, title=lection.title, description=lection.description))
        dataCourse.append(CourseAndLection(id=course.id, title=course.title, lection=dataLection))
    return ResponseFetchCourseAndLection(course=dataCourse)

# Работа с вопросами

from app.model.panel import RequestEditQestion, RequestAddQestion, RequestDeleteQestion

@router.post("/editQestion")
async def editQestion(app: RequestEditQestion):
    DB.EditQestion(app.idLection, app.idQuestion, app.question)

@router.post("/addQestion")
async def addQestion(app: RequestAddQestion):
    DB.AddQestion(app.idLection, app.question)

@router.post("/deleteQestion")
async def deleteQestion(app: RequestDeleteQestion):
    DB.DeleteQestion(app.idLection, app.idQuestion)


# Работа с Курсами

from app.model.panel import RequestEditCourse, RequestAddCourse, RequestDeleteCourse

@router.post("/addCourse")
async def addCourse(app: RequestAddCourse):
    DB.AddCourse(app.title)

@router.post("/editCourse")
async def editCourse(app: RequestEditCourse):
    DB.EditCourse(app.title, app.idCourse)

@router.post("/deleteCourse")
async def deleteCourse(app: RequestDeleteCourse):
    DB.DeleteCourse(app.idCourse)

# Работа с Лекциями

from app.model.panel import RequestEditLection, RequestAddLection, RequestDeleteLection

@router.post("/addLection")
async def addCourse(app: RequestAddLection):
    DB.AddLection(app.title, app.idCourse, app.description, app.tutor)

@router.post("/editLection")
async def editCourse(app: RequestEditLection):
    DB.EditLection(app.title, app.idLection, app.description, app.tutor)

@router.post("/deleteLection")
async def deleteCourse(app: RequestDeleteLection):
    DB.DeleteLection(app.idLection)


# Работа со статистикой
@router.post("/fetchStatistic")
async def fetchStatistic(app: RequestAddLection):
    pass