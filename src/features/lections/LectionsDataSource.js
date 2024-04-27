
class LectionsDataSource{

    _api = "https://4851-185-6-247-97.ngrok-free.app/";

    async fetchCourses(){
        try{
            const data = await fetch(`${this._api}fetchCourse`, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json;charset=utf-8',
                  'Accept': 'application/json',
                  'Access-Control-Allow-Origin': '*',
                  "ngrok-skip-browser-warning": "1"
                }
            });
            return await data;
        }catch(e){
            console.log(e);
        }
    }

    async fetchLections(courseId){
        const data = await fetch(`${this._api}fetchLectionByIdCourse`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*',
                "ngrok-skip-browser-warning": "1"
            },
            body:JSON.stringify({
                idCourse:courseId
            })
        })
        if(data.ok) return await data;
        else throw await new Error("some web error")
    }


    async fetchLectionMain(idLection){
        // const data = await fetch(`${this._api}/fetchLectionMain`, {
        //     method: 'PUT',
        //     headers: {
        //       'Content-Type': 'application/json;charset=utf-8'
        //     },
        //     body:JSON.stringify({
        //         idLection:idLection
        //     })
        // })
        // if(data.ok) return await data.body
        // else throw await new Error("some web error")
        return {
            id:idLection,
            name:"Основы программирования",
            tutor:"Славик Очков Телкович",
            description:"Прото́н — одна из трёх элементарных частиц, из которых построено обычное вещество. Протоны входят в состав атомных ядер; порядковый номер химического элемента в таблице Менделеева равен количеству протонов в его ядре. В физике протон. ",
            tutorRec:"Не быть тормозом",
            mentorRec:"Подумать над увлоьнением",
            orgRec:"Неисправность с микрофоном 15 лекция",
            answCount:15
        }
    }    

    async addCourse(request){
        await fetch(`${this._api}/add`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body:JSON.stringify({
                
            })
        })
    }

    async addCourse(request){
        try{
            await fetch(`${this._api}addCourse`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body:JSON.stringify({
                    title:request.title
                })
            })
        }catch(e){
            console.log(e);
        }
        
    }

}

export default LectionsDataSource;