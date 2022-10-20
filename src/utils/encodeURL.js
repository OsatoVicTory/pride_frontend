export const encodeURL = (url) => {
    if(typeof url === "string") return encodeURIComponent(url);
    return encodeURIComponent(JSON.stringify(url));
}

export const decodeURL = (url) => {
    return JSON.parse(decodeURIComponent(url));
}