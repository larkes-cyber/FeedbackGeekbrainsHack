import LectionsDataSource from './LectionsDataSource';
import QuestionDataSource from './QuestionDataSource';

class LectionRepository{


    _lectionsDataSource = new LectionsDataSource();
    _questionDataSource = new QuestionDataSource();



    async fetchAllLectionsCourses(){
        const courses = await this._lectionsDataSource.fetchCoursesWithLections();
        const parsedCourses = await courses.json();
        return await parsedCourses.course;
    }

    // id:idLection,
    // name:"Основы программирования",
    // tutor:"Славик Очков Телкович",
    // description:"Прото́н — одна из трёх элементарных частиц, из которых построено обычное вещество. Протоны входят в состав атомных ядер; порядковый номер химического элемента в таблице Менделеева равен количеству протонов в его ядре. В физике протон. ",
    // tutorRec:"Не быть тормозом",
    // mentorRec:"Подумать над увлоьнением",
    // orgRec:"Неисправность с микрофоном 15 лекция",
    // answCount:15

    async fetchLectionMain(idLection){
        const data = await this._lectionsDataSource.fetchLectionMain(idLection);
        const parsedData = await data.json()
        const setupData = await {
            id:idLection,
            name:parsedData.info.title,
            tutor:parsedData.info.tutor,
            description:parsedData.info.discription,
            tutorRec:parsedData.recommendation.tutor,
            mentorRec:parsedData.recommendation.mentor,
            orgRec:parsedData.recommendation.org,
            answCount:parsedData.info.counterAnswer
        }
        return await setupData;
    }

    async fetchQuestions(idLection){
        const data = await this._questionDataSource.fetchQuestions(idLection);
        const parsedData = await data.json();
        return parsedData.question.map(item => ({id:item.id, question:item.question}))
    }

    async addQuestion(question){
       return this._questionDataSource.addQuestion(question);
    }

 
    async addAnswer(answers){
        
        return this._questionDataSource.addAnswer(answers);
    }

    async addCourse(title){
        return this._lectionsDataSource.addCourse(title);
    }

    async addLection(lection){
        return this._lectionsDataSource.addLection(lection);
    }

    async deleteQuestion(idLection, idQuestion){
        return this._questionDataSource.deleteQuestion({
            idLection:idLection,
            idQuestion:idQuestion
        })
    }

    async fetchFiltredLections(text){
        return await this._lectionsDataSource.fetchFiltredLections(text);
    }
}

export default LectionRepository;