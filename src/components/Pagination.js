import React from 'react'
import Validate, { visitedFun } from './Validate';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Pagination.module.css';

export default function Pagination({questions, visitedQuestionFun, index, setIndex, storeSelectedAnswers, setTimerFlag, visitedQuestionIndexes}) {

    const navigate = useNavigate();

    const submitQuiz = () => {
        storeSelectedAnswers();
        
        if(window.confirm("Are you sure you want to submit the quiz?")) {
            console.log(JSON.parse(sessionStorage.getItem("user")));
            setTimerFlag(true);
            navigate("/scoreCard");
        }
    }

    return (
        <div className={styles.rightDiv}>
            <div className={styles.questionsDiv}>
                {
                    questions.map((question, i) => 
                        <button key={i} 
                                onClick={() => {
                                    storeSelectedAnswers();
                                    setIndex(i);
                                    visitedQuestionFun(i);
                                }}
                                className={styles[Validate(i, index, visitedQuestionIndexes)]}
                        >
                            <span>{i + 1}</span>
                        </button>
                    )
                }
            </div>
            <div className={styles.questionsInfo}>
                <div className={styles.visitedAnswered}>
                    <span>{visitedFun(visitedQuestionIndexes)[0]}</span> 
                    <span>No.of Answered Questions</span>
                </div>
                <div className={styles.visitedNotAnswered}>
                    <span>{visitedFun(visitedQuestionIndexes)[1]}</span> 
                    <span>No.of Not Answered Questions</span>
                </div>
                <div className={styles.notVisited}>
                    <span>{(questions.length - visitedQuestionIndexes.length)}</span> 
                    <span>No.of Not Visited Questions</span>
                </div>
            </div>

            <div className={styles.submitBtnDiv}>
                <button type="button" className={styles.submitBtn} onClick={submitQuiz}>Submit</button>
            </div>
        </div>
    );
}
