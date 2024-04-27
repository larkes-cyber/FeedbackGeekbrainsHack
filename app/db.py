import pymongo
from bson.objectid import ObjectId

from pydantic import BaseModel
from typing import List

# Заготовки
class Qestion(BaseModel):
    idQesion: int
    qestion: str

class CollectionLection(BaseModel):
    id: str
    title: str
    description: str
    tutor: str
    countAnswer: int
    idCourse: str
    titleCourse: str
    idQuestion: List[str]
    idStatistic: str

class CollectionCourse(BaseModel):
    id: str
    title: str

class CollectionQuesion(BaseModel):
    id: str
    title: str

class CollectionStatistic(BaseModel):
    id: str
    tutor: str
    metodist: str
    org: str
    pass

# myclient = pymongo.MongoClient('mongodb://localhost:27017/')
# myclient.drop_database("test")

# # appdb = myclient["test"]
# # appcoll = appdb["blogcollection"]
# # document = {"user_id": 1, "user": "test"}
# # appcoll.insert_one(document)

# print(myclient.list_database_names())
# myclient.close()
sampleCollectionCourse = {"title": "sample"}

sampleCollectionLection = {"title": "sample", 
                           "description": "semple", 
                           "tutor": "semple", 
                           "countAnswer": "semple",
                           "idCourse": -1,
                           "titleCourse": "creater",
                           "idQuestion": [-1], 
                           "idStatistic": -1
                           }

sampleCollectionSession = {"id": -1,
                           "title": "creater"
                           }

sampleCollectionQestion = {"id": -1,
                           "title": "creater"
                           }

class UseDB():
    def __init__(self, session):
        self.session = session
    
    def CreateDB(self):
        client = pymongo.MongoClient(self.session)
        if "feedback" not in client.list_database_names():
            dbTable = client["feedback"]

            collectionCourse = dbTable["course"]
            collectionLection = dbTable["lection"]
            collectionQestion = dbTable["qestion"]

            collectionSession = dbTable["session"]

            collectionCourse.insert_one(sampleCollectionCourse)
            collectionLection.insert_one(sampleCollectionLection)
            collectionSession.insert_one(sampleCollectionSession)
        
        client.close()
    
    
    def FetchCourse(self):
        client = pymongo.MongoClient(self.session)
        dbTable = client["feedback"]
        collectionCourse = dbTable["course"]
        data = list()

        for element in collectionCourse.find():
            collectionCourse = CollectionCourse(id=((element["_id"]).toString()), title=element["title"])
            data.append(collectionCourse)
        
        client.close()
        return data 
    
        
    def FetchLectionByIdx(self, idx: str):
        client = pymongo.MongoClient(self.session)
        dbTable = client["feedback"]
        collectionLection = dbTable["lection"]
        element = collectionLection.find_one({"_id": ObjectId(idx)})

        response = CollectionLection(id=((element["_id"]).toString()), title=element["title"], description=element["description"],
                                              tutor=element["tutor"], countAnswer=element["countAnswer"], idCourse=element["idCourse"],
                                              titleCourse=element["titleCourse"], idQuestion=element["idQuestion"], idStatistic=element["idStatistic"])
        
        client.close()
        return response


    def FetchLectionByTitle(self, title:str):
        client = pymongo.MongoClient(self.session)
        dbTable = client["feedback"]
        collectionLection = dbTable["lection"]
        dataResponse = list()

        for element in collectionLection.find({'title':{'$regex':title}}):
            response = CollectionLection(id=((element["_id"]).toString()), title=element["title"], description=element["description"],
                                              tutor=element["tutor"], countAnswer=element["countAnswer"], idCourse=element["idCourse"],
                                              titleCourse=element["titleCourse"], idQuestion=element["idQuestion"], idStatistic=element["idStatistic"])
            data.append(response)
        
        client.close()
        return dataResponse 
    

    def FetchQestionByidx(self, idx: str):
        client = pymongo.MongoClient(self.session)
        dbTable = client["feedback"]
        collectionQestion = dbTable["qestion"]

        element = collectionQestion.find_one({"_id": ObjectId(idx)}) #  Поиск по индексу

        response = Qestion(element=(element["_id"]).toString(), qestion=element["qestion"])
        client.close()
        return response

    def EditLectionQestionByIdx(self, idx: str, title: str):
        client = pymongo.MongoClient(self.session)
        dbTable = client["feedback"]
        collectionQestion = dbTable["qestion"]

        collectionQestion.update_one({"_id": ObjectId(idx)}, {"title": title})
        client.close()
        return True
    
    def DeleteLectionQestionByIdx(self, idx: str):
        client = pymongo.MongoClient(self.session)
        dbTable = client["feedback"]
        collectionQestion = dbTable["qestion"]

        collectionQestion.delete_one({"_id": ObjectId(idx)})
        client.close()
        return True
    
    def AddLectionQestionByIdx(self, idLection: str, title: str):
        client = pymongo.MongoClient(self.session)
        dbTable = client["feedback"]
        collectionQestion = dbTable["qestion"]

        newElement = collectionQestion.insert_one({"title": title})

        lection = self.FetchLectionByIdx(idLection)
        newQestions = list()
        newQestions += lection.idQuestion
        newQestions.append(newElement.inserted_id)
        collectionQestion.update_one({"_id": ObjectId(idLection)}, {"idQuestion": newQestions})

        client.close()
        return newElement.inserted_id


    
    # def FetchCourseByIdx(self, idx):
    #     client = pymongo.MongoClient(self.session)
    #     dbTable = client["feedback"]
    #     collectionCourse = dbTable["course"]
    #     return collectionCourse.findOne({"_id", idx})
    
    # def FetchLectionByCourse(self):
    #     client = pymongo.MongoClient(self.session)
    #     dbTable = client["feedback"]
    #     collectionLection = dbTable["lection"]
    #     data = list()

    #     for element in collectionCourse.find():
    #         data.append(element)
            
    #     return data 

    # def FetchLectionByTitle(self, title):
    #     client = pymongo.MongoClient(self.session)
    #     dbTable = client["feedback"]
    #     collectionLection = dbTable["lection"]
    #     data = list()

    #     for element in collectionLection.find({'title':{'$regex':title}}):
    #         data.append(element)
            
    #     return data 

