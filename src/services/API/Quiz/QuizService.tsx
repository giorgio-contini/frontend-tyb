import axios from "axios";


class QuizService {

    static createQuiz = (payload: any) => {
        return axios.post(`https://backend-1907.azurewebsites.net/api/quiz/create`, payload);
    }

    static getQuestionsByTopic = async (topic: string) => {
        return axios.get(`https://backend-1907.azurewebsites.net/api/quiz/${topic}`);
    }

}

export default QuizService;
