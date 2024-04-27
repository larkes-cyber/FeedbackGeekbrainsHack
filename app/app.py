from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.router import panel, question, exportAndImport

app = FastAPI()

origins = ["*"]
app.add_middleware(CORSMiddleware, allow_origins=origins, allow_credentials=True, allow_methods=["*"],
                   allow_headers=["*"])

app.include_router(panel.router)
app.include_router(question.router)
app.include_router(exportAndImport.router)


@app.get("/")
async def root():
    return {"message": "Hello Bigger Applications!"}
