import pymongo
from pydantic import BaseModel
from typing import List
from bson.objectid import ObjectId
from datetime import datetime

# Заготовки
class Course(BaseModel):
    id: str
    title: str

class Question(BaseModel):
    id: str
    question: str

class Answer(BaseModel):
    question: str
    answer: str

class Feedback(BaseModel):
    id: str
    answer: List[Answer]
    is_relevant: int
    is_positive: int
    object: int
    time: datetime

class Lection(BaseModel):
    id: str
    title: str
    idCourse: str
    titleCourse: str

    description: str
    tutor: str
    countAnswer: int

    question: List[Question]
    feedback: List[Feedback]


sampleCollectionCourse = {"title": "sample"}

sampleCollectionLection = {"title": "sample", 
                           "description": "semple", 
                           "tutor": "semple", 
                           "countAnswer": "semple",
                           "idCourse": -1,
                           "titleCourse": "creater",
                           "question": [{"idQuestion": ObjectId(), "question": "some"}], 
                           "feedback": [{"idFeedbak": ObjectId(), "answer": [{"question": "some", "answer": "some"}], "is_relevant": 0, "is_positive": 1, "object": 2, "time": datetime.time}]
                           }

filterQestion = "На шкале от 1 до 10, насколько вы готовы поделиться вашим мнением о вебинаре?" # 000000000000000000000000
class UseDB():
    def __init__(self, session):
        self.session = session
    
    def RemoveDB(self):
        client = pymongo.MongoClient(self.session)
        client.drop_database("feedback")
        print(client.list_database_names())
    
    def CreateDB(self):
        client = pymongo.MongoClient(self.session)
        if "feedback" not in client.list_database_names():
            dbTable = client["feedback"]
            collectionCourse = dbTable["course"]
            collectionLection = dbTable["lection"]

            collectionCourse.insert_one(sampleCollectionCourse)
            collectionLection.insert_one(sampleCollectionLection)
        client.close()
    
    def GetQestion(self, idLection) -> List[Question]:
        client = pymongo.MongoClient(self.session)
        collection = client.feedback.lection
        lection = collection.find_one({"_id": ObjectId(idLection)})

        dataQestion = list()

        for question in lection["question"]:
            dataQestion.append(Question(id=str(question["idQuestion"]), question=question["question"]))
        
        client.close()

        return dataQestion
    
    def CreateBaseQestion(self, idLection):
        client = pymongo.MongoClient(self.session)
        collection = client.feedback.lection

        dataBaseQestion = [
            {"idQuestion": ObjectId('000000000000000000000000'), "question": "На шкале от 1 до 10, насколько вы готовы поделиться вашим мнением о вебинаре?"},
            {"idQuestion": ObjectId(), "question": "Что вам больше всего понравилось в теме вебинара и почему?"},
            {"idQuestion": ObjectId(), "question": "Были ли моменты в вебинаре, которые вызвали затруднения в понимании материала? Можете описать их?"},
            {"idQuestion": ObjectId(), "question": "Какие аспекты вебинара, по вашему мнению, нуждаются в улучшении и какие конкретные изменения вы бы предложили?"},
            {"idQuestion": ObjectId(), "question": "Есть ли темы или вопросы, которые вы бы хотели изучить более подробно в следующих занятиях?"}]

        collection.update_one({"_id": ObjectId(idLection)}, {"$set": {"question": dataBaseQestion}})
        client.close()
    
    def EditQestion(self, idLection, idQestion, question):
        client = pymongo.MongoClient(self.session)
        collection = client.feedback.lection

        collection.update_one({"_id": ObjectId(idLection), "question": {"idQuestion": ObjectId(idQestion)}}, {"$push", {"question": {"question": question}}})
        client.close()
    
    def AddQestion(self, idLection, questioInput):
        client = pymongo.MongoClient(self.session)
        collection = client.feedback.lection
        qestionFilter = collection.find_one({"_id": ObjectId(idLection)})
        dataQestion = list()
        for question in qestionFilter["question"]:
            dataQestion.append(question)
        dataQestion.append({"idQuestion": ObjectId(), "question": questioInput})
        collection.update_one({"_id": ObjectId(idLection)}, {"$set": {"question": dataQestion}})
        client.close()
    
    def DeleteQestion(self, idLection, idQuestion):
        client = pymongo.MongoClient(self.session)
        collection = client.feedback.lection

        collection.update_many({"_id": ObjectId(idLection)}, {"$pull": {"question": {"idQuestion": ObjectId(idQuestion)}}})
        client.close()
    

    
    def GetAnswer(self, idLection, idFeedback) -> List[Answer]:
        client = pymongo.MongoClient(self.session)
        collection = client.feedback.lection

        lection = collection.find_one({"_id": ObjectId(idLection)})

        dataAnswer = list()
        for feedback in lection["feedback"]:
            if str(feedback["idFeedbak"]) == idFeedback:
                for answer in feedback["answer"]:
                    dataAnswer.append(Answer(question=answer["question"], answer=answer["answer"]))
                    
        client.close()
        return dataAnswer


    def GetFeedback(self, idLection):
        client = pymongo.MongoClient(self.session)
        collection = client.feedback.lection

        lection = collection.find_one({"_id": ObjectId(idLection)})

        dataFeedback = list()
        for feedback in lection["feedback"]:
            dataFeedback.append(Feedback(id=str(feedback["idFeedbak"]), answer=self.GetAnswer(idLection, str(feedback["idFeedbak"])),
                                         is_relevant=feedback["is_relevant"], is_positive=feedback["is_positive"], object=feedback["object"],
                                         time=feedback["time"]))
        
        client.close()
        return dataFeedback
    
    def GetRecomendation(self, idLection):
        client = pymongo.MongoClient(self.session)
        collection = client.feedback.lection
        
        negativTutor, negativMentor, negativOrg = "", "", ""
        for feedback in collection.find({"_id": ObjectId(idLection)})["feedback"]:
            if feedback["object"] == 0:
                for answer in feedback["object"]["answer"]:
                    negativTutor += answer["answer"]
            elif feedback["object"] == 1:
                for answer in feedback["object"]["answer"]:
                    negativMentor += answer["answer"]
            elif feedback["object"] == 2:
                for answer in feedback["object"]["answer"]:
                    negativOrg += answer["answer"]
        
        return "test", "test", "test"

    
    def AddFeedback(self, idLection, dataAnswer:List[Answer], is_relevant, is_positive, object, time):
        client = pymongo.MongoClient(self.session)
        collection = client.feedback.lection

        newDataAnswer = list()
        for answer in dataAnswer:
            newDataAnswer.append({"question": answer.question, "answer": answer.answer})

        
        lection = collection.find_one({"_id": ObjectId(idLection)})

        newFeedback = list()
        for feedback in lection["feedback"]:
            newFeedback.append(feedback)
        newFeedback.append({"idFeedbak": ObjectId(), "answer": newDataAnswer, "is_relevant": is_relevant,
                                          "is_positive": is_positive, "object": object, "time": time})
        
        collection.update_one({"_id": ObjectId(idLection)}, {"$set": {"feedback": newFeedback}})
        
        client.close()
    
    def GetLection(self, idLection) -> Lection:
        client = pymongo.MongoClient(self.session)
        collection = client.feedback.lection

        lection = collection.find_one({"_id": ObjectId(idLection)})

        client.close()
        return Lection(id=str(lection["_id"]), title=lection["title"], idCourse=str(lection["idCourse"]), titleCourse=lection["titleCourse"],
                       description=lection["description"], tutor=lection["tutor"], countAnswer=lection["countAnswer"],
                       question=self.GetQestion(lection["_id"]), feedback=self.GetFeedback(lection["_id"]))
    
    def GetLectionByCourse(self, idCourse) -> List[Lection]:
        client = pymongo.MongoClient(self.session)
        collection = client.feedback.lection

        lectionFilter = collection.find({"idCourse": ObjectId(idCourse)})

        dataLection = list()
        for lection in lectionFilter:
            dataLection.append(Lection(id=str(lection["_id"]), title=lection["title"], idCourse=str(lection["idCourse"]), titleCourse=lection["titleCourse"],
                       description=lection["description"], tutor=lection["tutor"], countAnswer=lection["countAnswer"],
                       question=self.GetQestion(lection["_id"]), feedback=self.GetFeedback(lection["_id"])))
        client.close()
        return dataLection
                       
    
    def GetLectionByTitle(self, title) -> List[Lection]:
        client = pymongo.MongoClient(self.session)
        collection = client.feedback.lection

        if title == "[-1]":
            lectionFilter = collection.find()
        else:
            lectionFilter = collection.find({"title": {"$regex" : title, "$options": "i"}})

        dataLection = list()
        for lection in lectionFilter:
            dataLection.append(Lection(id=str(lection["_id"]), title=lection["title"], idCourse=str(lection["idCourse"]), titleCourse=lection["titleCourse"],
                       description=lection["description"], tutor=lection["tutor"], countAnswer=lection["countAnswer"],
                       question=self.GetQestion(lection["_id"]), feedback=self.GetFeedback(lection["_id"])))
        client.close()
        return dataLection

    def AddLection(self, title, idCourse, description, tutor):
        client = pymongo.MongoClient(self.session)
        collectionCourse = client.feedback.course
        collectionLection = client.feedback.lection

        course = collectionCourse.find_one({"_id": ObjectId(idCourse)})

        lection = collectionLection.insert_one({"title": title, "idCourse": course["_id"], "titleCourse": course["title"],
                                                "description": description, "tutor": tutor, "countAnswer": 0, "question": [], "feedback": []})
        self.CreateBaseQestion(lection.inserted_id)
        client.close()
        return lection.inserted_id

    def EditLection(self, title, idLection, description, tutor):
        client = pymongo.MongoClient(self.session)
        collection = client.feedback.lection

        if title != "[-1]":
            collection.update_one({"_id": ObjectId(idLection)}, { "$set": {"title": title}})
        if description != "[-1]":
            collection.update_one({"_id": ObjectId(idLection)}, { "$set": {"description": description}})
        if tutor != "[-1]":
            collection.update_one({"_id": ObjectId(idLection)}, { "$set": {"title": tutor}})
    
        client.close()
    
    def DeleteLection(self, idLection):
        client = pymongo.MongoClient(self.session)
        collectionLection = client.feedback.lection

        collectionLection.delete_one({"_id": ObjectId(idLection)})
        client.close()
    
    def GetCourse(self, idCourse) -> Course:
        client = pymongo.MongoClient(self.session)
        collection = client.feedback.course

        course = collection.find_one({"_id": ObjectId(idCourse)})
        client.close()
        return Course(id=str(course["_id"]), title=course["title"])

    def GetAllCourse(self) -> List[Course]:
        client = pymongo.MongoClient(self.session)
        collection = client.feedback.course

        dataCourse = list()
        for course in collection.find():
            dataCourse.append(Course(id=str(course["_id"]), title=course["title"]))
        
        client.close()
        return dataCourse
    
    def AddCourse(self, title):
        client = pymongo.MongoClient(self.session)
        collection = client.feedback.course

        idx = collection.insert_one({"title": title})
        client.close()
        return idx.inserted_id
    
    def DeleteCourse(self, idCourse):
        client = pymongo.MongoClient(self.session)
        collectionLection = client.feedback.lection
        collectionCourse = client.feedback.course
        
        collectionCourse.delete_one({"_id": ObjectId(idCourse)})
        collectionLection.delete_many({"idCourse": ObjectId(idCourse)})
        client.close()
    
    def EditCourse(self, title, idCourse):
        client = pymongo.MongoClient(self.session)
        collectionCourse = client.feedback.course

        collectionCourse.update_one({"_id": ObjectId(idCourse)}, { "$set": {"title": title}})
        client.close()
        