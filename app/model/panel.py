from pydantic import BaseModel
from typing import List

# Заготовки
class Course(BaseModel):
    idCourse: int
    titleCourse: str

class Lection(BaseModel):
    idLection: int
    titleLection: str
    idCourse: int
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


# Request, запросы приходящие на сервак 
class RequestFetchLection(BaseModel):
    idCourse: int

class RequestFetchLectionMain(BaseModel):
    idLection: int


# Response, ответы исходящие с серавка 
class ResponseFetchCourse(BaseModel):
    course: List[Course]

    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "course": [{"idCourse": "int",
                                 "titleCourse": "string"}],
                }
            ]
        }
    }

class ResponseFetchLection(BaseModel):
    qestion: List[Lection]

    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "lection": [{"idLection": "int",
                                 "titleLection": "string",
                                 "idCourse": "int",
                                 "titleCourse": "string"}],
                }
            ]
        }
    }

class ResponseFetchLectionMain(BaseModel):
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