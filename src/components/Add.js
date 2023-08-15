import { useState } from "react";
import { useHistory } from "react-router-dom";
import { calculateLeague } from "./utils/calculateLeague";
import GetData from "./utils/firebase-utils/getData";
import { push, ref, set } from "firebase/database";
import { database } from "./utils/firebase-utils/firebaseSetups";

const Add = () => {

    const highestTHlvl = 15;
    const lvlOption = [];
    const history = useHistory();
    const [isLoading, setisLoading] = useState(false);
    const { dataCount } = GetData('');
    const memberListRef = ref(database, 'members/');

    //states to be submitted
    const [name, setName] = useState("You");
    const [townhall, setTownhall] = useState(1);
    const [xp, setXp] = useState(1);
    const [trophies, setTrophies] = useState(0);
    const [role, setRole] = useState("Member");
    const [league, setLeague] = useState("Unranked");



    for(let i=1; i<= highestTHlvl; i++ ){
        lvlOption.push(<option key={"Level " + i} value={"Level " && i}>Level {i}</option>)
    }
    
    const submit = (e) => {
        e.preventDefault();

        setisLoading(true);

        //const member = {name, townhall, xp, trophies, league, role};
        const id = dataCount;

        const AddData = async () => {
            const newMemberRef = push(memberListRef);
            await set(newMemberRef, {
                name: name,
                townhall: townhall,
                xp: xp,
                trophies: trophies,
                league: league,
                role: role,
                id: id+1,
                fid: newMemberRef.key
            })
            setisLoading(false);
            history.push('/');
        }

        AddData();
    }



    return ( 
        <div className="Add">
            <h2>Add Member</h2>
            <form onSubmit={submit}>
                <label>Name</label>
                <input
                    type="text"
                    required
                    value={name}
                    onChange={e=>setName(e.target.value)}
                />
                <label>Townhall Level</label>
                <select value={townhall} 
                        onChange={e=>setTownhall(parseInt(e.target.value))}>
                    { lvlOption }
                </select>
                <label>XP Level</label>
                <input
                    type="number"
                    required
                    value={xp}
                    min="1"
                    onChange={e=>setXp(parseInt(e.target.value))}
                />
                <label>Trophies</label>
                <input
                    type="number"
                    required
                    value={trophies}
                    min="0"
                    onChange={e=>{
                        setTrophies(parseInt(e.target.value));
                        setLeague(calculateLeague(e.target.value));
                    }}
                />
                <label>Role</label>
                <select 
                value={role}
                onChange={e=>setRole(e.target.value)}>
                    <option value="Member">Member</option>
                    <option value="Elder">Elder</option>
                    <option value="Co-leader">Co-leader</option>
                    <option value="Leader">Leader</option>
                </select>
                { !isLoading && <button>Add Member</button> }
                { isLoading && <button>Adding Member...</button> }
            </form>
        </div>
    );
}
 
export default Add;