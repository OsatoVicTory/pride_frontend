export const getTime = (distance) => {
    const sec = (distance/50) * 3600; //converts time to secs;
    if(sec > 31536000) return Math.floor(sec / 31536000) + "yr(s)";
    else if(sec > 2592000) return Math.floor(sec / 2592000) + "mnth(s)";
    else if(sec > 86400) return Math.floor(sec / 86400) + "day(s)";
    else if(sec > 3600) return Math.floor(sec / 3600) + "hr(s)";
    else if(sec > 60) return Math.floor(sec / 60) + "min(s)";
    else return sec + "secs";
}

export const estimateDropoff = (distance) => {
    const sec = new Date().getTime();
    const coverageTime = sec+((distance/50) * 3600000);
    const date = new Date(coverageTime);
    const hr = date.getHours();
    const mins = date.getMinutes();
    if(hr > 12) return hr + ":" + (mins>10?mins:"0"+mins) +"PM";
    return (hr>10?hr:"0"+hr) + ":" + (mins>10?mins:"0"+mins) +"AM";
}