import React, { useEffect, useState } from 'react'
import styles from '../styles/Options.module.css';
import ApplySymbolsOptions from './ApplySymbolsOption';

export default function Options({optionsArr, question}) {
    
    const [answer, setAnswer] = useState("");
    const [regeneratedOptions, setRegeneratedOptions] = useState([]);

    useEffect(() => {

        setAnswer("");

        ApplySymbolsOptions(optionsArr);

        // const shuffleArray = (array) => {
        //     return array
        //         .map((value) => ({ value, sort: Math.random() }))
        //         .sort((a, b) => a.sort - b.sort)
        //         .map(({ value }) => value);
        // };

        const sortArr = (array) => {
            return (array.sort());
        };
        
        const options = sortArr(optionsArr);

        setRegeneratedOptions([...options]);

        let presentOption = null;
        presentOption = checkIfTheOptionSelectedOrNot();

        if(sessionStorage.getItem("selectedOption") === null) {
            sessionStorage.setItem("selectedOption", JSON.stringify({[`questionId-${question.id}`]: presentOption}));
        }

    }, [optionsArr]);

    const checkIfTheOptionSelectedOrNot = () => {
        const userObj = JSON.parse(sessionStorage.getItem("user")) || {};
        const info = JSON.parse(sessionStorage.getItem("quizData"));

        const userObjQuestionsArr = userObj[info.username] || []; // get the user object from session storage
        let presentOption = null;
        userObjQuestionsArr.forEach((option) => {
            if(Object.keys(option)[0] === `questionId-${question.id}`) {
                presentOption = Object.entries(option)[0][1];
                setAnswer(presentOption);
            }
        });
        return presentOption;
    };

    const handleChange = (option) => {
        setAnswer(option);
        const optionObj = {[`questionId-${question.id}`]: option};
        // console.log(optionObj);
        sessionStorage.setItem("selectedOption", JSON.stringify(optionObj));
    };

    return(<>
        {regeneratedOptions && regeneratedOptions.map((option, index) => (
            <div key={index} className={styles.option}>
                <input
                    checked={answer === option}
                    onChange={() => handleChange(option)}
                    type="radio"
                    name={`${question.id}`}
                    className={styles.radioButton}
                /> &nbsp;
                <p className={styles.optionValue}>
                    <strong>{index + 1}.</strong> &nbsp; 
                    {option}
                </p>
            </div>
        ))}
    </>);
}
