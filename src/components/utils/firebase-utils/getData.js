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
                const membersRef = await ref(database, `members/${id}`);
                const members = await get(membersRef);
                if(!members.exists()){
                    throw new Error("Database is Empty. If you want to add members, you can click the 'Add Member' on the Navbar.")
                }
                const memdata = members.val();
                let memList = null

                if(id === ''){
                    memList = Object.values(memdata);
                } else {
                    memList = memdata;
                }

                setdata(memList);
                setDataCount(memList.length);
                setLoading(false);
            } catch (e){
                setError(e.message);
                setLoading(false);
            }
        }
        FetchData();
    }, [id]);

    return { data, dataCount, loading, error };
}
 
export default GetData;
