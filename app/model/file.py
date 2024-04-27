from pydantic import BaseModel
from typing import List


# Заготовки
class DownloadLectionStatistiic(BaseModel):
    idLection: str
