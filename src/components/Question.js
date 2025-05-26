import { useEffect, useState } from "react";
import styles from "../styles/Question.module.css"
import Options from "./Options";
import ApplySymbolsQuestion from "./ApplySymbolsQuestion";

export default function Question({question, number}) {

    const [options, setOptions] = useState([]);

    useEffect(() => {
        if(question) {

            question = ApplySymbolsQuestion(question);

            const optionsArr = [...question.incorrect_answers, question.correct_answer];
            
            setOptions([...optionsArr]);
        }
    }, [question]);
    
    
    return (<>
        {question && (
            <div className={styles.questionContainer}>
                {question?.question && (
                    <p className={styles.questionText}>
                        {number}. {question.question}
                    </p>
                )}
                {options.length > 0 && <Options optionsArr={options} question={question} />}
            </div>
        )}
    </>)
}
