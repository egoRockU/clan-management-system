import { useState, useEffect } from "react";

const useFetch = (url) => {

    const [data, setdata] = useState(null);
    const [dataCount, setDataCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(()=>{
        fetch(url)
        .then(response => {
            if (!response.ok){
                throw Error('Fetch failed!. Could not fetch the data from the resource.');
            }
            return response.json()
        })
        .then((data) => {
            setdata(data);
            setDataCount(data.length);
            setLoading(false);
            setError(null);
        })
        .catch(e => {
            setError(e.message);
            setLoading(false);
        })
    },[url])

    return { data, dataCount, loading, error };
}

export default useFetch;