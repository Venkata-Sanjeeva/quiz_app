import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/ScoreCard.module.css';
import ApplySymbolsOptions from './ApplySymbolsOption';
import ApplySymbolsQuestion from './ApplySymbolsQuestion';

export default function ScoreCard() {
    const [score, setScore] = useState(0);
    const [totalQuestions, setTotalQuestions] = useState([]);
    const [username, setUsername] = useState("");
    const [userQuestionsArr, setUserQuestionsArr] = useState([]);

    const getData = () => {
        
        const info = JSON.parse(sessionStorage.getItem("quizData"));
        const userObj = JSON.parse(sessionStorage.getItem("user")) || {};
        const userObjQuestionsArr = userObj[info.username] || [];
        
        const apiQuestions = JSON.parse(sessionStorage.getItem("apiQuestions")) || [];

        setUsername(info.username);
        setTotalQuestions(apiQuestions);
        setUserQuestionsArr(userObjQuestionsArr);

        validateAnswers(userObjQuestionsArr, apiQuestions);
    };

    const validateAnswers = (userSelectedAnswers, originalAnswers) => {
        let userScore = 0;
        userSelectedAnswers.forEach((userAnswer) => {
            originalAnswers.forEach((originalAnswer) => {
                if (originalAnswer && userAnswer[`questionId-${originalAnswer["id"]}`] === originalAnswer["correct_answer"]) {
                    userScore++;
                    return;
                }
            });
        });
        setScore(userScore);
    };

    useEffect(() => {
        getData();
    }, []);

    const generateOptions = (optionsArr) => {
        return (ApplySymbolsOptions(optionsArr.sort()));
    };

    return (
        <div className={styles.container}>
            <div className={styles.titleDiv}>
                <h1>Candidate Name: {username}</h1>
                <h2 className={styles.title}>Score: {score} / {totalQuestions.length}</h2>
            </div>
            <div className={styles.questionsContainer}>
                {totalQuestions.map((question, index) => {
                        return(
                            <div className={styles.question} key={question.id}>
                                <div className={styles.questionTitle}>
                                    <p>{ApplySymbolsQuestion(question)["question"]}</p>
                                    <p>1 Mark</p>
                                </div>
                                <div className={styles.optionsContainer}>
                                    {generateOptions([...question.incorrect_answers, question.correct_answer]).map((option, i) => {
                                        return (
                                            <div key={i} className={`${styles["option"]} ${option === Object.values(userQuestionsArr[index])[0] ? styles["userSelectedOption"] : ""}`}>
                                                <span className={styles.logo}>{option === question.correct_answer ? "✔️" : "❌"}</span>&nbsp;<span className={styles.optionText}>{option}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className={styles.selectedSelectedDiv}>
                                    <p className={styles.selectedAnswerTag}>Selected Answer : {!(Object.values(userQuestionsArr[index])[0]) ? "Not Selected" : Object.values(userQuestionsArr[index])[0]}</p>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
            <Link to="/" className={styles.link}>
                <button className={styles.button}>
                    Go to Home Page
                </button>
            </Link>
        </div>
    );
}
