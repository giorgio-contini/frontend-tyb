import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
/**
 * Locals
 */
import "./QuizPage.scss";
import { showDialogFailed, showDialogInfo } from "../../utils/DialogUtils";
import QuizClient from "../../services/API/openapicode_tyb_user/QuizClient";
import TimerComponent from "../../components/TimerComponent/TimerComponent";
import { AuthContext } from "../../AuthContext";
const QuizPage = () => {
    var _a, _b, _c;
    const { user } = useContext(AuthContext);
    const { state: location } = useLocation();
    const navigate = useNavigate();
    const { topic, idQuiz } = location || {};
    const [questions, setQuestions] = useState([]);
    const [imagesType, setImagesType] = useState(false);
    useEffect(() => {
        getQuiz(topic);
    }, []);
    useEffect(() => {
        setRemainingTime(questions.length * 30);
    }, [questions]);
    // Funzione per recuperare un numero casuale di oggetti dalla lista
    function getDomandeCasuali(lista, numeroDomande) {
        const list = lista[0].questions.sort(() => Math.random() - 0.5).slice(0, numeroDomande);
        setQuestions(lista[0].questions);
    }
    function getQuiz(topic) {
        QuizClient.getQuizUsingGet(topic).then((res) => {
            var _a, _b, _c;
            setQuestions((_a = res === null || res === void 0 ? void 0 : res.data) === null || _a === void 0 ? void 0 : _a.result[0].questions);
            setImagesType(((_c = (_b = res === null || res === void 0 ? void 0 : res.data) === null || _b === void 0 ? void 0 : _b.result[0]) === null || _c === void 0 ? void 0 : _c.imagesQuiz) || false);
        }).catch((error) => {
            var _a;
            showDialogFailed((_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.data.error);
        });
    }
    const [remainingTime, setRemainingTime] = useState(1800);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const loadNextQuestion = () => {
        // Controlla se ci sono ancora domande disponibili
        if (currentQuestionIndex + 1 < (questions === null || questions === void 0 ? void 0 : questions.length)) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
        else {
            saveQuizResult();
        }
    };
    const loadPreviousQuestion = () => {
        if (currentQuestionIndex - 1 >= 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };
    const [buttonStyle, setButtonStyle] = useState(undefined);
    function saveQuizResult() {
        QuizClient.saveQuizUsingPost(userResults).then(response => {
            showDialogInfo("Test completato", "Verrai reindirizzato alla homepage", () => {
                navigate("/home", { replace: true });
            });
        })
            .catch(error => {
            var _a;
            showDialogFailed((_a = error === null || error === void 0 ? void 0 : error.response.data) === null || _a === void 0 ? void 0 : _a.esito.descrizione);
        });
    }
    const [userResults, setUserResults] = useState({
        userId: user.username,
        totalScore: 0,
        topic: topic || ""
    });
    const checkAnswer = (quizId, questionId, answer) => {
        QuizClient.checkAnswerUsingPost(quizId, questionId, { answer }).then((res) => {
            if (res.data) {
                setButtonStyle(Object.assign(Object.assign({}, buttonStyle), { qId: questionId, answer: answer, style: "btn btn-success" }));
                setTimeout(() => {
                    //gestire le risposte corrette
                    setRemainingTime(prevState => (prevState - 15));
                    loadNextQuestion();
                    setUserResults((oldState) => {
                        const newState = Object.assign({}, oldState);
                        newState.totalScore = (newState.totalScore + 10);
                        return newState;
                    });
                }, 500);
            }
            else {
                setButtonStyle(Object.assign(Object.assign({}, buttonStyle), { qId: questionId, answer: answer, style: "btn btn-danger" }));
                setTimeout(() => {
                    //gestire le risposte errate
                    //setRemainingTime(prevState => (prevState - 15));
                    loadNextQuestion();
                    setUserResults((oldState) => {
                        const newState = Object.assign({}, oldState);
                        newState.totalScore = (newState.totalScore - 10);
                        return newState;
                    });
                }, 500);
            }
        }).catch((error) => {
            var _a, _b;
            showDialogFailed((_b = (_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.error);
        });
    };
    const handleTimeout = () => {
        showDialogInfo("Tempo scaduto", "I dati sono stati inviati correttamente", () => {
            navigate("/home", { replace: true });
        });
    };
    function getStyle(answer) {
        return (buttonStyle
            && questions[currentQuestionIndex].id === (buttonStyle === null || buttonStyle === void 0 ? void 0 : buttonStyle.qId)
            && answer === buttonStyle.answer) ? buttonStyle.style : "";
    }
    // Funzione di mescolamento (Fisher-Yates)
    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };
    const [shuffledAnswers, setShuffledAnswers] = useState([]);
    useEffect(() => {
        var _a;
        if ((_a = questions[currentQuestionIndex]) === null || _a === void 0 ? void 0 : _a.answers) {
            // Mescola le risposte ogni volta che cambia la domanda corrente
            setShuffledAnswers(shuffleArray([...questions[currentQuestionIndex].answers]));
        }
    }, [questions, currentQuestionIndex]);
    return _jsxs("div", { children: [_jsxs("div", { className: "d-flex flex-row justify-content-between p-2", style: { alignItems: "center" }, children: [_jsx("h3", { children: (_a = topic === null || topic === void 0 ? void 0 : topic.toUpperCase()) !== null && _a !== void 0 ? _a : "" }), _jsx(TimerComponent, { onTimeout: handleTimeout, remainingTime: remainingTime, setRemainingTime: setRemainingTime }), _jsxs("h6", { children: [" ", 'Domanda ' + (currentQuestionIndex + 1) + " di " + (questions === null || questions === void 0 ? void 0 : questions.length)] })] }), _jsxs("div", { className: "pageContainer mt-5", children: [_jsx("div", { className: "questionContainer d-flex justify-content-center", children: imagesType ? _jsx("img", { src: (_b = questions[currentQuestionIndex]) === null || _b === void 0 ? void 0 : _b.description, alt: "image" }) :
                            _jsx("h2", { children: ((_c = questions[currentQuestionIndex]) === null || _c === void 0 ? void 0 : _c.description) || "" }) }), _jsx("div", { className: "answerGrid mt-4", children: shuffledAnswers === null || shuffledAnswers === void 0 ? void 0 : shuffledAnswers.map((el, index) => {
                            return _jsx("button", { className: 'answerButton ' + getStyle(el.description), onClick: () => {
                                    var _a;
                                    checkAnswer(idQuiz, ((_a = questions[currentQuestionIndex]) === null || _a === void 0 ? void 0 : _a.id) || "", el.description);
                                }, children: el.description }, 'answer_' + index);
                        }) })] }), _jsx("div", { className: "d-flex flex-row mt-5", children: 
                //currentQuestionIndex != questions.length-1?
                _jsx("div", { className: "ms-auto", children: _jsx("button", { className: "btn btn-outline-secondary", onClick: loadNextQuestion, children: "Avanti" }) }) })] });
};
export default QuizPage;
