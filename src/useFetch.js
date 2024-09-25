import {useState, useEffect} from 'react';

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        fetch(url) // returns promise
            .then(res => {  // grab response object
                if (!res.ok) {
                    throw Error('Data could not be reached, please ensure the proper endpoints/permissions are being used')
                }
                return res.json(); // this returns another promise in form of json
            })
            .then(data => { // grab json data from the former promise
                setData(data);
                setIsPending(false);
                setError(null);
            })
            .catch(err => {
                setIsPending(false);
                setError(err.message);
            })
    }, [url]);

    return {data, isPending, error, setData}
}

export default useFetch;