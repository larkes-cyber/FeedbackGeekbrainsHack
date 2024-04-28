class QuestionDataSource{

    _api = "https://b9ac-185-6-247-97.ngrok-free.app/";

    async fetchToken(idLection){
        const data = await fetch(`${this._api}/fetchTokenQuestion`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json;charset=utf-8',
              'Accept': 'application/json',
              'Access-Control-Allow-Origin': '*',
              "ngrok-skip-browser-warning": "1"
            },
            body: JSON.stringify({
                idLection:idLection
            })
        });
        if(data.ok) return data.body
        else throw new Error("some web error")
    }

    async fetchQuestions(lectionId){
        try{
            const data = await fetch(`${this._api}fetchQestion`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'Accept': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    "ngrok-skip-browser-warning": "1"
                },
                body:
                JSON.stringify({
                    idLection:lectionId
                })
            });
            if(data.ok) return data
            else throw new Error("some web error")
        }catch(e){

        }
    }

    async addAnswer(answers){
        console.log(answers);
        const data = await fetch(`${this._api}answerQestion`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*',
                "ngrok-skip-browser-warning": "1"
            },
            body:
            JSON.stringify({
                idLection:answers[0].idLection,
                question:answers.map(res => ({
                    idQestion:res.idQestion,
                    answer:res.answer
                }))
            })
        });
        if(data.ok) return data
        else throw new Error("some web error")
    }

    async addQuestion(questionRequest){
        const data = await fetch(`${this._api}addQestion`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*',
                "ngrok-skip-browser-warning": "1"
            },
            body:
            JSON.stringify({
                idLection:questionRequest.idLection,
                question:questionRequest.question
            })
        });
        if(data.ok) return data.body
        else throw new Error("some web error")
    }

    async deleteQuestion(request){
        console.log(request);
        const data = await fetch(`${this._api}deleteQestion`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*',
                "ngrok-skip-browser-warning": "1"
            },
            body:
            JSON.stringify({
                idLection: request.idLection,
                idQuestion: request.idQuestion
            })
        });
        if(data.ok) return data
        else throw new Error("some web error")
    }


}

export default QuestionDataSource;