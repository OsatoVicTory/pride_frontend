import { useState, useEffect } from "react";

const useDebounce = (value, functionCall, key, setRoute, setErrorData) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        if(!value || value == "") setData(null);
        else {     
            const getData = setTimeout(() => {
                functionCall(value, key).then(res => {
                    setData(res);
                    if(!res) {
                        setRoute("allow");
                        return setErrorData("No Results Found");
                    }
                    setRoute("locations_suggestions");
                }).catch(err => {
                    setErrorData(err?.response?.data?.message||err.message);
                    setData(null);
                    setRoute("allow");
                });
            }, 1000);

            return () => clearTimeout(getData);
        }
    }, [value]);

    return data;
}

export default useDebounce;