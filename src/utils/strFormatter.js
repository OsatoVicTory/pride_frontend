const formatStringHTML = (str) => {
    let n = str.length;
    let res = "";
    for(var i=0;i<n;i++) {
        if(str[i] === "<") {
            var j = i;
            while(j < n && str[j] !== ">") j++;
            i = j;
        } else {
            res += str[i];
        }
    }
    return res;
}

export const formatString = (input) => {
    if(Array.isArray(input)) {
        const inputs = input.join("");
        if(inputs.includes("<")) return formatStringHTML(inputs);
        return inputs;
    } else {
        if(input.includes("<")) return formatStringHTML(input);
        return input;
    }
}