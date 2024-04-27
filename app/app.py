from fastapi import Depends, FastAPI

from app.router import panel, question

app = FastAPI()

app.include_router(panel.router)
app.include_router(question.router)


@app.get("/")
async def root():
    return {"message": "Hello Bigger Applications!"}
