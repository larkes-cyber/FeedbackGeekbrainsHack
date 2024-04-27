class QuestionDataSource{

    _api = "http://lolka.com";

    async fetchToken(idLection){
        const data = await fetch(`${this._api}/fetchTokenQuestion`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                idLection:idLection
            })
        });
        if(data.ok) return data.body
        else throw new Error("some web error")
    }

    async fetchQuestions(token){
        // const data = await fetch(`${this._api}/fetchTokenQuestion`, {
        //     method: 'PUT',
        //     headers: {
        //       'Content-Type': 'application/json;charset=utf-8'
        //     },
        //     body:
        //     JSON.stringify({
        //         token:token
        //     })
        // });
        // if(data.ok) return data.body
        // else throw new Error("some web error")
        return [
            {id:"1234", question:"Очень важный вопрос"},
            {id:"123", question:"Очень важный вопрос"},
            {id:"12345", question:"Очень важный вопрос"},
            {id:"12347", question:"Очень важный вопрос"},
            {id:"12349", question:"Очень важный вопрос"}
        ]
    }


}

export default QuestionDataSource;