from pydantic import BaseModel
from app.db import Question
from typing import List

# Заготовки

class Answer(BaseModel):
    idQestion: str
    answer: str


# Request, запросы приходящие на сервак 
class RequestFetchQestion(BaseModel):
    idLection: str

class RequestAnswerQestion(BaseModel):
    idLection: str
    question: List[Answer]

    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "answer": [{"idQestion": "string",
                                "answer": "string"}],
                }
            ]
        }
    }

# Response, ответы исходящие с серавка 
class ResponseFetchQestion(BaseModel):
    question: List[Question]

    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "question": [{"_id": "string",
                                 "question": "string"}],
                }
            ]
        }
    }



