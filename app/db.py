import pymongo

# myclient = pymongo.MongoClient('mongodb://localhost:27017/')
# myclient.drop_database("test")

# # appdb = myclient["test"]
# # appcoll = appdb["blogcollection"]
# # document = {"user_id": 1, "user": "test"}
# # appcoll.insert_one(document)

# print(myclient.list_database_names())
# myclient.close()
sampleCollectionCourse = {"title": "creater"}

sampleCollectionLection = {"title": "creater", 
                           "description": "creater", 
                           "tutor": "creater", 
                           "countAnswer": -1,
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
            data.append(element)

        return data 
    
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

    def FetchLectionByTitle(self, title):
        client = pymongo.MongoClient(self.session)
        dbTable = client["feedback"]
        collectionLection = dbTable["lection"]
        data = list()

        for element in collectionLection.find({'title':{'$regex':title}}):
            data.append(element)
            
        return data 
    
    def FetchLectionByIdx(self, idx):
        client = pymongo.MongoClient(self.session)
        dbTable = client["feedback"]
        collectionLection = dbTable["lection"]

        return collectionLection.findOne({"_id", idx})
    



