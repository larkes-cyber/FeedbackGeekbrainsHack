
class LectionsDataSource{

    _api = "http://lolka.com";

    async fetchCourses(){
        // const data = await fetch(`${this._api}/fetchCourses`, {
        //     method: 'GET',
        //     headers: {
        //       'Content-Type': 'application/json;charset=utf-8'
        //     }
        // })
        // if(data.ok) return data.body
        // else throw new Error("some web error")
        return [{
            id:"1234",
            name:"Котлин про с нуля"
        },{
            id:"1234",
            name:"Котлин про с нуля"
        },{
            id:"1234",
            name:"Котлин про с нуля"
        },{
            id:"1234",
            name:"Котлин про с нуля"
        }]
    }

    async fetchLections(courseId){
        // const data = await fetch(`${this._api}/fetchLections`, {
        //     method: 'POST',
        //     headers: {
        //       'Content-Type': 'application/json;charset=utf-8'
        //     },
        //     body:JSON.stringify({
        //         idCourse:courseId
        //     })
        // })
        // if(data.ok) return await data.body
        // else throw await new Error("some web error")
        return [
            {
                name:"Основы программирования",
                id:"3432",
                description:"Прото́н — одна из трёх элементарных частиц, из которых построено обычное вещество. Протоны входят в состав атомных ядер; "
            },
            {
                name:"Основы программирования",
                id:"34321",
                description:"Прото́н — одна из трёх элементарных частиц, из которых построено обычное вещество. Протоны входят в состав атомных ядер; "
            },
            {
                name:"Основы программирования",
                id:"343",
                description:"Прото́н — одна из трёх элементарных частиц, из которых построено обычное вещество. Протоны входят в состав атомных ядер; "
            },
            {
                name:"Основы программирования",
                id:"3432343",
                description:"Прото́н — одна из трёх элементарных частиц, из которых построено обычное вещество. Протоны входят в состав атомных ядер; "
            }
        ]
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

}

export default LectionsDataSource;