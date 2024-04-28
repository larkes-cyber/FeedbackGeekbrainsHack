from pydantic import BaseModel
from typing import List


# Заготовки
class Course(BaseModel):
    id: str
    title: str

class Lection_2(BaseModel):
    id: str
    title: str
    description: str

class CourseAndLection(BaseModel):
    id: str
    title: str
    lection: List[Lection_2]

class Lection(BaseModel):
    id: str
    title: str
    description: str
    idCourse: str
    titleCourse: str

class LectionInfo(BaseModel):
    title: str
    tutor: str
    discription: str
    counterAnswer: int

class LectionRecommendation(BaseModel):
    tutor: str
    mentor: str
    org: str


###### Подгрузка лекций/курсов
# Request, запросы приходящие на сервак 

class RequestFilterIdLection(BaseModel):
    idLection: str

class RequestFilterLectionByTitle(BaseModel):
    title: str

class RequestFilterLectionByCourse(BaseModel):
    idCourse: str

# Response, ответы исходящие с серавка 
class ResponseFetchCourse(BaseModel):
    course: List[Course]

    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "course": [{"id": "string",
                                "title": "string"}],
                }
            ]
        }
    }

class ResponseFetchCourseAndLection(BaseModel):
    course: List[CourseAndLection]

    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "course": [{"id": "string",
                                "title": "string",
                                "lection": [{"id": "string",
                                             "title": "string",
                                             "description": "string"}]}],
                }
            ]
        }
    }

class ResponseFileterLection(BaseModel):
    lection: List[Lection]

    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "lection": [{"idLection": "string",
                                 "titleLection": "string",
                                 "description": "string",
                                 "idCourse": "string",
                                 "titleCourse": "string"}],
                }
            ]
        }
    }


class ResponseFetchLectionInfo(BaseModel):
    info: LectionInfo
    recommendation: LectionRecommendation

    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "info": {
                        "title": "string",
                        "tutor": "string",
                        "discription": "string",
                        "counterAnswer": "int",
                    },
                    "recommendation": {
                        "tutor": "string",
                        "mentor": "string",
                        "org": "string",
                    }
                }
            ]
        }
    }


###### Работа с Вопросам
# Request, запросы приходящие на сервак 
class RequestEditQestion(BaseModel):
    idLection: str
    question: str
    idQuestion: str

class RequestAddQestion(BaseModel):
    idLection: str
    question: str

class RequestDeleteQestion(BaseModel):
    idLection: str
    idQuestion: str


###### Работа с Курсами
# Request, запросы приходящие на сервак 
class RequestEditCourse(BaseModel):
    idCourse: str
    title: str

class RequestAddCourse(BaseModel):
    title: str

class RequestDeleteCourse(BaseModel):
    idCourse: str

###### Работа с Лекциями
# Request, запросы приходящие на сервак 
class RequestEditLection(BaseModel):
    idLection: str 
    title: str
    description: str
    tutor: str

class RequestAddLection(BaseModel):
    title: str
    description: str
    tutor: str
    idCourse: str

class RequestDeleteLection(BaseModel):
    idLection: str

class RequestFetchStatistic(BaseModel):
    idLection: str

class ResponseFetchStatistic(BaseModel):
    night: int 
    morning: int
    day: int
    evening: int
    
    goodRevue: int
    badRevue: int

    badInformative: int
    goodInformative: int

    tutor: int
    mentor: int
    org: int 