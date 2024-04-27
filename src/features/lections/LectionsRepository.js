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
        const parsedData = await data.json();
        const setupData = await {
            id:idLection,
            name:parsedData.title,
           // tutor:
        }
        return await setupData;
    }

    async fetchQuestions(idLection){
        return this._questionDataSource.fetchQuestions(idLection);
    }

    async addQuestion(question){
        this._questionDataSource.addQuestion(question);
    }

    async deleteQuestion(idQuestion){
        this._questionDataSource.deleteQuestion(idQuestion);
    }
    async addAnswer(){
    }

    async addCourse(title){
        return this._lectionsDataSource.addCourse({title:title});
    }
}

export default LectionRepository;