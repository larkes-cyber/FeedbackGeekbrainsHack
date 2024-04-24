import './studentPage.scss';
import LectionsList from '../../components/list/LectionsList';

const StudentPage = () => {
    return(
        <section className='student_page'>
            <div className='container'>
                <div className='student_page__wrapper'>
                    <div className='student_page__lections'>
                       <div className='student_page__lections__title'>Список ваших лекций</div> 
                       <LectionsList/>
                    </div>
                </div>
            </div>
        </section>
    ) 
}

export default StudentPage;