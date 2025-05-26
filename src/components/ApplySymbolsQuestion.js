export default function ApplySymbolsQuestion(question) {
    
    if(question.question.includes("&quot;")) {
        question.question = question.question.replaceAll("&quot;", '"');
    } 
    if(question.question.includes("&oacute;")) {
        question.question = question.question.replaceAll("&oacute;", "ó ");
    } 
    if(question.question.includes("&eacute;")) {
        question.question = question.question.replaceAll("&oacute;", "é ");
    } 
    if(question.question.includes("&#039;")) {
        question.question = question.question.replaceAll("&#039;", "'");
    } 
    if(question.question.includes("&amp;")) {
        question.question = question.question.replaceAll("&amp; ", "& ");
    }
    if(question.question.includes("&shy;")) {
        question.question = question.question.replaceAll("&shy;", "-");
    }

    return question;
}