import LectionsDataSource from './LectionsDataSource';
import QuestionDataSource from './QuestionDataSource';

class LectionRepository{


    _lectionsDataSource = new LectionsDataSource();
    _questionDataSource = new QuestionDataSource();



    async fetchAllLectionsCourses(){
        const output = []
        const courses = await this._lectionsDataSource.fetchCourses();
        const parsed = await courses.json();
        await parsed.course.forEach(course => {
            this._lectionsDataSource.fetchLections(course.id).then(res => {
                res.json().then((res) => {
                    output.push({
                        course:course,
                        lections:res.lection
                    })
                })
            })
        });
        return await output;
    }

    async fetchLectionMain(idLection){
        return await this._lectionsDataSource.fetchLectionMain(idLection);
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