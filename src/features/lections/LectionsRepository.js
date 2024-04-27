import LectionsDataSource from './LectionsDataSource';
import QuestionDataSource from './QuestionDataSource';

class LectionRepository{

    _api = "http://lolka.com";

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

}

export default LectionRepository;