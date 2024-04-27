from pydantic import BaseModel
from typing import List

# Заготовки
class Qestion(BaseModel):
    idQesion: int
    qestion: str

class Answer(BaseModel):
    idAnswer: int
    answer: str


# Request, запросы приходящие на сервак 
class RequestFetchTokenQestion(BaseModel):
    idLesson: int

class RequestFetchQestionByToken(BaseModel):
    token: str

class RequestAnswerQestionByToken(BaseModel):
    qestion: List[Answer]

    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "qestion": [{"idQesion": "int",
                                 "answer": "string"}],
                }
            ]
        }
    }


# Response, ответы исходящие с серавка 
class ResponseFetchTokenQestion(BaseModel):
    token: str

class ResponseFetchQestionByToken(BaseModel):
    qestion: List[Qestion]

    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "qestion": [{"idQesion": "int",
                                 "qestion": "string"}],
                }
            ]
        }
    }

class ResponseAnswerQestionByToken(BaseModel):
    status: bool