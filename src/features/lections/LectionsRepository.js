import LectionsDataSource from './LectionsDataSource';
import QuestionDataSource from './QuestionDataSource';

class LectionRepository{


    _lectionsDataSource = new LectionsDataSource();
    _questionDataSource = new QuestionDataSource();


    async fetchAllLectionsCourses(){
        const output = []
        const courses = await this._lectionsDataSource.fetchCourses();
        await courses.forEach(course => {
            this._lectionsDataSource.fetchLections(course.courseId).then(res => {
                output.push({
                    course:course,
                    lections:res
                })
            })
        });
        return await output;
    }

    async fetchLectionMain(idLection){
        return await this._lectionsDataSource.fetchLectionMain(idLection);
    }

    async fetchQuestions(){
        return this._questionDataSource.fetchQuestions("12345");
    }

    async addQuestion(question){
        this._questionDataSource.addQuestion(question);
    }

    async deleteQuestion(idQuestion){
        this._questionDataSource.deleteQuestion(idQuestion);
    }
}

export default LectionRepository;