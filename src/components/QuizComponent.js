
import { useEffect, useState } from 'react';
import Question from './Question';
import axios from 'axios';
import styles from '../styles/QuizComponent.module.css';
import Timer from './Timer';
import Pagination from './Pagination';
export default function QuizComponent() {

    sessionStorage.removeItem("selectedOption");
    

    const [questionsList, setQuestionsList] = useState([]);
    const [index, setIndex] = useState(0);
    const [details, setDetails] = useState({});
    const [timerFlag, setTimerFlag] = useState(false);
    const [visitedQuestionsArr, setVisitedQuestionsArr] = useState([0]);
    const getData = (url) => {
        axios.get(url)
        .then(response => {
            const questions = response.data.results;
            sessionStorage.setItem("apiQuestions", JSON.stringify(questions));
            insertUserAnswers(questions);
            setQuestionsList(questions);
        });
    }

    let insertUserAnswers;

    useEffect(() => {
        const data = JSON.parse(sessionStorage.getItem("quizData"));
        setDetails({...data});
        
        const url = `https://www.otriviata.com/api.php?amount=${data.questions}&category=${(data.category === "" ? 9 : data.category)}&difficulty=${(data.difficulty === "" ? "easy" : data.difficulty)}&type=${data.type}`;
        
        sessionStorage.setItem("url", url);
        
        getData(url);

        insertUserAnswers = (apiQuestions) => {
        const arr = [];
        apiQuestions.forEach((question) => {
            arr.push({[`questionId-${question["id"]}`]: null});
        });

        sessionStorage.setItem("user", JSON.stringify({[`${data.username}`]: arr})); 
    }

    }, []);

    const verifyVisitedOrNot = (indexVal) => {
        const arr = [...visitedQuestionsArr];

        const visitedQuestionIndex = arr.find(element => element === indexVal);

        if(visitedQuestionIndex === undefined)  setVisitedQuestionsArr([...arr, indexVal]);
    };

    const prevQuestion = () => {
        storeUserSelectedAnswers();
        if(index > 0) {
            verifyVisitedOrNot(index - 1);
            setIndex(index - 1);
        }
    };

    const storeUserSelectedAnswers = () => {
        const optionObject = JSON.parse(sessionStorage.getItem("selectedOption")) || {};
        const userObj = JSON.parse(sessionStorage.getItem("user")) || {};
        const info = JSON.parse(sessionStorage.getItem("quizData"));
        let userObjQuestionsArr = userObj[info.username] || [];
        let flag = false;
        /*
            user : {
                "userName": [
                    {"questionId-1": "option1"},
                    {"questionId-2": "option2"},
                ]
            }
        */
        
        userObjQuestionsArr.forEach((option, index) => {
            if(Object.keys(option)[0] === Object.keys(optionObject)[0]) {
                userObjQuestionsArr.splice(index, 1, optionObject);
                flag = true;
            }
        });
        
        !flag && userObjQuestionsArr.push(optionObject);
        
        sessionStorage.setItem("user", JSON.stringify({[`${info.username}`]: userObjQuestionsArr}));
    };

    const nextQuestion = () => {
        storeUserSelectedAnswers();
        if(index < questionsList.length - 1) {
            verifyVisitedOrNot(index + 1);
            setIndex(index + 1);
        }
    }

    return (
        <div className={styles.quizContainer}>
            <div className={styles.leftDiv}>
                <div className={styles.firstDiv}>
                    <h2 className={styles.quizSubtitle}>
                        Candidate Name: {details.username}
                    </h2>
                    <Timer stop={timerFlag} numberOfQuestions={Number.parseInt(details.questions)} callBack={storeUserSelectedAnswers}/>
                </div>
                <div className={styles.questionContainer}>
                    <Question question={questionsList[index]} number={index + 1}/>
                </div>

                <div className={styles.buttonGroup}>
                    { 
                        index === 0 ? "" :
                        <button type="button" className={styles.quizButton} onClick={prevQuestion}>
                            Prev
                        </button>
                    }
                    { 
                        index === questionsList.length - 1 ? "" :
                        <button type="button" className={styles.quizButton} onClick={nextQuestion}>
                            Next
                        </button>
                    }
                </div>
            </div>

            <Pagination questions={questionsList} setTimerFlag={setTimerFlag} visitedQuestionFun={verifyVisitedOrNot} index={index} setIndex={setIndex} visitedQuestionIndexes={visitedQuestionsArr} storeSelectedAnswers={storeUserSelectedAnswers}/>
            
        </div>
    );
}
