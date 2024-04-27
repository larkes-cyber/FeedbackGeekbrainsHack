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
    status: bool


# FetchQestionByidx
# EditLectionQestionByIdx
# AddLectionQestionByIdx
# DeleteLectionQestionByIdx