
class LectionsDataSource{

    _api = "https://22be-185-6-247-97.ngrok-free.app/";

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

    async fetchCoursesWithLections(){
        try{
            const data = await fetch(`${this._api}fetchCourseWithLection`, {
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

    async fetchLectionMain(idLection){
        try{
            const data = await fetch(`${this._api}fetchLectionInfo`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json;charset=utf-8',
                  'Accept': 'application/json',
                  'Access-Control-Allow-Origin': '*',
                  "ngrok-skip-browser-warning": "1"
                },
                body:JSON.stringify({
                    idLection:idLection
                })
            })
            if(data.ok) return await data
            else throw await new Error("some web error")
        }catch(e){

        }
    }    

    async addCourse(title){
        try{
            const data = await fetch(`${this._api}addCourse`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json;charset=utf-8',
                  'Accept': 'application/json',
                  'Access-Control-Allow-Origin': '*',
                  "ngrok-skip-browser-warning": "1"
                },
                body:JSON.stringify({
                    title:title
                })
            })
            if(data.ok) return await data
            else throw await new Error("some web error")
        }catch(e){
            console.log(e);
        }
    }

    async addLection(request){
        try{
            const data = await fetch(`${this._api}addLection`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json;charset=utf-8',
                  'Accept': 'application/json',
                  'Access-Control-Allow-Origin': '*',
                  "ngrok-skip-browser-warning": "1"
                },
                body:JSON.stringify({
                    title:request.title,
                    description:request.description,
                    tutor:request.tutor,
                    idCourse:request.idCourse
                })
            })
            if(data.ok) return await data
            else throw await new Error("some web error")
        }catch(e){
            console.log(e);
        }
    }

    async fetchFiltredLections(text){
        try{
            console.log(text);
            const data = await fetch(`${this._api}filterLection`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json;charset=utf-8',
                  'Accept': 'application/json',
                  'Access-Control-Allow-Origin': '*',
                  "ngrok-skip-browser-warning": "1"
                },
                body:JSON.stringify({
                    title:text
                })
            })
            if(data.ok) return await data
            else throw await new Error("some web error")
        }catch(e){
            console.log(e);
        }
    }

    async fetchStatistics(idLection){
        console.log(idLection);
        try{
            const data = await fetch(`${this._api}fetchStatistic`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json;charset=utf-8',
                  'Accept': 'application/json',
                  'Access-Control-Allow-Origin': '*',
                  "ngrok-skip-browser-warning": "1"
                },
                body:JSON.stringify({
                    idLection:idLection
                })
            })
            if(data.ok) return await data
            else throw await new Error("some web error")
        }catch(e){
            console.log(e);
        }
    }

}

export default LectionsDataSource;