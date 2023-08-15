import { useEffect, useState } from "react";
import { database } from "./firebaseSetups";
import { get, ref } from "firebase/database";

const GetData = ( id ) => {

    const [data, setdata] = useState(null);
    const [dataCount, setDataCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(()=> {
        const FetchData = async () => {
            try {
                const membersRef = await ref(database, 'members/' + id);
                const members = await get(membersRef);
                if(!members.exists()){
                    throw new Error("Failed to Fetch Data");
                }
                const mem = members.val()
                setdata(mem);
                setDataCount(mem.length);
                setLoading(false);
            } catch (e){
                setError(e.message);
                setLoading(false);
            }
        }
        FetchData();
    }, []);

    return { data, dataCount, loading, error };
}
 
export default GetData;
