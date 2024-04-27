from fastapi import Depends, FastAPI

from app.router import panel, qestion

app = FastAPI()


app.include_router(panel.router)
app.include_router(qestion.router)


@app.get("/")
async def root():
    return {"message": "Hello Bigger Applications!"}



# @app.get("/fetchCourse")
# @app.get("/fetchLecture")


# @app.get("/fetchSetupQestion")
# @app.get("/answerSetupQestion")

# @app.get("/fetchLectionQestion/{token}")
# @app.get("/answerLectionQestion/{token}")



# @app.get("/fetchLectureQestion")
# @app.get("/editLectureQestion")
# @app.get("/addLectureQestion")
# @app.get("/removeLectureQestion")

# @app.get("/fetchLectureQestion")
# @app.get("/fetchLecture")