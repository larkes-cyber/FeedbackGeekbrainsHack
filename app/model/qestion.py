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
class RequestFetchQestionByIdxLection(BaseModel):
    idLesson: int

class RequestAnswerQestionIdxLection(BaseModel):
    idLesson: int
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
class ResponseFetchQestionByIdxLection(BaseModel):
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

class ResponseAnswerQestionIdxLection(BaseModel):
    status: bool