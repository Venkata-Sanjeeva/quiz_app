import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Timer({stop, numberOfQuestions, callBack}) {

    const [time, setTime] = useState(0);
    const timerRef = useRef(null);
    const navigate = useNavigate();

    const tagStyles = {
        fontSize: "1.5rem",
        fontWeight: "bold"
    };

    if(timerRef.current !== null && stop) {
        clearInterval(timerRef.current);
    }

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    };

    useEffect(() => {
        const minutes = Math.floor(time / 60);

        if (minutes === numberOfQuestions) {
            clearInterval(timerRef.current);
            callBack();
            alert("Time's up");
            navigate("/scoreCard");
        }
    }, [time]); // Runs only when `time` updates
    
    useEffect(() => {
        timerRef.current = setInterval(() => {
            setTime((prevTime) => prevTime + 1);
        }, 1000);

        return () => clearInterval(timerRef.current); // Cleanup on unmount
    }, []);

    return (<div style={tagStyles}>
        <span>{formatTime(time)}&nbsp;/&nbsp;</span>
        <span>{Number.parseInt(numberOfQuestions)}:00</span>
    </div>);
}
