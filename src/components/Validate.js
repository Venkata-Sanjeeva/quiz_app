export default function Validate(i, index, visitedQuestionIndexes) {

    const userObj = JSON.parse(sessionStorage.getItem("user")) || {};
    const info = JSON.parse(sessionStorage.getItem("quizData"));
    const userObjQuestionsArr = userObj[info.username] || [];

    if(i === index) {
        return "selectedQuestionButton";
    } else {
        if(!(visitedQuestionIndexes.find(element => element === i) === i)) {
            return "notVisited";
        }
        else {
            if(Object.values(userObjQuestionsArr[i])[0]) return "visitedAnswered";
            else return "visitedNotAnswered";
        }
    }
}

export function visitedFun(visitedQuestionIndexes) {

    const userObj = JSON.parse(sessionStorage.getItem("user")) || {};
    const info = JSON.parse(sessionStorage.getItem("quizData"));
    const userObjQuestionsArr = userObj[info.username] || [];

    let answered = 0;
    let notAnswered = 0;

    visitedQuestionIndexes.forEach((element) => {
        if(userObjQuestionsArr[element] && Object.values(userObjQuestionsArr[element])[0]) answered++;
        else notAnswered++;
    });
    return [answered, notAnswered];
}