import { useEffect, useState } from 'react';
import axios from "axios";
import styles from '../styles/HomePage.module.css';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';

export default function HomePage() {

    sessionStorage.removeItem("user");
    sessionStorage.removeItem("quizData");
    sessionStorage.removeItem("selectedOption");
    sessionStorage.removeItem("url");
    sessionStorage.removeItem("apiQuestions");
    
    const [username, setUsername] = useState("Guest");
    const [categories, setCategories] = useState([]);
    const [questions, setQuestions] = useState(10);
    const [category, setCategory] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [type, setType] = useState("multiple");

    const navigate = useNavigate();

    useEffect(() => {
        axios.get("https://www.otriviata.com/api_category.php")
        .then(response => {
            setCategories([...response.data.trivia_categories]);
            // console.log(response.data.trivia_categories);
            
        })
        .catch(err => console.error(err));
    }, []);    

    const handleQuestionValue = (e) => {
        let questionNumber = e.target.value;

        if(Number.parseInt(questionNumber) > 50) questionNumber = 10;
        else if(questionNumber === "" || questionNumber === " " || Number.parseInt(questionNumber) < 0) questionNumber = 0;
        
        setQuestions(questionNumber);
    }

    const sendData = () => {
        if(questions === 0) {
            alert("Please enter a valid number of questions");
            return;
        }

        const quizData = { username, questions, category, difficulty, type }
        
        sessionStorage.setItem("quizData", JSON.stringify(quizData));
        console.log("Quiz data set, navigating to quizSection", quizData);
        navigate("/quizSection");
    };

    return (
        <>
            <h1 className={styles.quizTitle}>Welcome to Quiz Application</h1>
            
            <div className={styles.quizContainer}>
                <div className={styles.inputGroup}>
                    Candidate Name: 
                    <input 
                        className={styles.textInput}
                        type='text'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>

                <div className={styles.inputGroup}>
                    Number of Questions: 
                    <input 
                        className={styles.textInput}
                        type='number'
                        value={questions}
                        onChange={handleQuestionValue}
                    />
                </div>

                <div className={styles.selectGroup}>
                    Select Category: 
                    <select 
                        className={styles.selectInput}
                        value={category} 
                        onChange={(e) => setCategory(e.target.value === "Empty" ? 20 : Number.parseInt(e.target.value))}
                    >
                        <option value={"Empty"}>Any Category</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                    </select>
                </div>

                <div className={styles.selectGroup}>
                    Select Difficulty: 
                    <select 
                        className={styles.selectInput}
                        value={difficulty} 
                        onChange={(e) => setDifficulty(e.target.value === "Empty" ? "easy" : e.target.value)}
                    >
                        <option value={"Empty"}>Any Difficulty</option>
                        {["easy", "medium", "hard"].map((level) => (
                            <option key={level} value={level}>
                                {level.charAt(0).toUpperCase() + level.slice(1)}
                            </option>
                        ))}
                    </select>
                </div>

                <div className={styles.radioGroup}>
                    Select Type:
                    <div>
                        <input 
                            className={styles.radioInput}
                            type='radio' 
                            name='type' 
                            value={"boolean"} 
                            checked={type === "boolean"} 
                            onChange={(e) => setType(e.target.value)} 
                        /> 
                        <label className={styles.radioLabel}>True / False</label>
                    </div>
                    <div>
                        <input 
                            className={styles.radioInput}
                            type='radio' 
                            name='type' 
                            value={"multiple"} 
                            checked={type === "multiple"} 
                            onChange={(e) => setType(e.target.value)} 
                        /> 
                        <label className={styles.radioLabel}>Multiple</label>
                    </div>
                </div>

                <button className={styles.quizButton} onClick={sendData}>Start Quiz</button>
            </div>
            <Footer/>
        </>
    );
}
