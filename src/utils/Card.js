const CardQuery = {
    formatNumber: (val) => {
        if(!val) return null;
        var res = "";
        const num = String(val);
        for(var i=0;i<num.length;i++) {
            if(!((i+1)%4) && i) res += num[i] + " ";
            else res += num[i]
        }
        return res;
    },
    formatName: (name) => {
        if(!name) return null;
        const splittedName = name.split(" ");
        if(splittedName[2]) return splittedName[0] +" "+ splittedName[1] +" "+ splittedName[2][0]+".";
        else return name;
    },
    formatExpiry: (val) => {
        if(!val) return null;
        var res = "";
        const date = String(val);
        for(var i=0;i<date.length;i++) {
            if(i===1) res += date[i] + "/ ";
            else res += date[i];
        }
        return res;
    }
}

export default CardQuery;