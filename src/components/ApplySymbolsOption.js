export default function ApplySymbolsOptions(optionsArr) {
    
    const newOptionsArr = optionsArr.map((option) => {
        if(option.includes("&#039;")) {
            option = option.replaceAll("&#039;", "'");
        } 
        if(option.includes("&eacute;")) {
            option = option.replaceAll("&eacute", "é");
        } 
        if(option.includes("&oacute;")) {
            option = option.replaceAll("&oacute;", "ó");
        } 

        if(option.includes("&amp;")) {
            option = option.replaceAll("&amp;", "&");
        } 

        if(option.includes("&atilde;")) {
            option = option.replaceAll("&atilde;", "ã");
        } 

        if(option.includes("&aacute;")) {
            option = option.replaceAll("&atilde;", "á");
        } 

        if(option.includes("&shy;")) {
            option = option.replaceAll("&shy;", "-");
        } 
        
        if(option.includes("&lrm;")) {
            option = option.replaceAll("&lrm;", "");
        } 
        return option;
    });
    return newOptionsArr;
}