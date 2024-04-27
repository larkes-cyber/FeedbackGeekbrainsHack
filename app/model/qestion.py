from pydantic import BaseModel
from typing import List

# Заготовки
class Qestion(BaseModel):
    idQesion: str
    qestion: str

class Answer(BaseModel):
    idAnswer: str
    answer: str


# Request, запросы приходящие на сервак 
class RequestFetchQestionByIdxLection(BaseModel):
    idLesson: str

class RequestAnswerQestionByIdxLection(BaseModel):
    idLesson: str
    qestion: List[Answer]

    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "qestion": [{"idQesion": "string",
                                 "answer": "string"}],
                }
            ]
        }
    }

class RequestEditLectionQestionByIdx(BaseModel):
    idQesion: str
    title: str

class RequestDeleteLectionQestionByIdx(BaseModel):
    idQesion: str

class RequestAddLectionQestionByIdx(BaseModel):
    idLection: str
    title: str

class RequestEditLection(BaseModel):
    idLection: str 
    title: str
    description: str
    tutor: str

class RequestDeleteLection(BaseModel):
    idLection: str 

class RequestAddLection(BaseModel):
    title: str
    description: str
    tutor: str
    idCourse: str

class RequestAddCourse(BaseModel):
    title: str

class RequestEditCourse(BaseModel):
    idCourse: str
    title: str

class RequestDeleteCourse(BaseModel):
    idCourse: str

# Response, ответы исходящие с серавка 
class ResponseFetchQestionByIdxLection(BaseModel):
    qestion: List[Qestion]

    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "qestion": [{"idQesion": "string",
                                 "qestion": "string"}],
                }
            ]
        }
    }

class ResponseAnswerQestionByIdxLection(BaseModel):
    status: bool

class ResponseEditLectionQestionByIdx(BaseModel):
    status: bool

class ResponseDeleteLectionQestionByIdx(BaseModel):
    status: bool

class ResponseAddLectionQestionByIdx(BaseModel):
    status: bool # Мб id 


class ResponseEditLection(BaseModel):
   status: bool

class ResponseDeleteLection(BaseModel):
    status: bool 

class ResponseAddLection(BaseModel):
    status: bool # Мб id 


class ResponseAddCourse(BaseModel):
    status: bool # Мб id 

class ResponseEditCourse(BaseModel):
    status: bool

class ResponseDeleteCourse(BaseModel):
    status: bool