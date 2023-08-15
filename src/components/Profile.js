import { useParams } from "react-router-dom";
import { getLeague, getTownhall } from "./utils/getImages";
import { useState, useEffect } from "react";
import { calculateLeague } from "./utils/calculateLeague";
import { useHistory } from "react-router-dom";
import GetData from "./utils/firebase-utils/getData";
import { database } from "./utils/firebase-utils/firebaseSetups";
import { update, ref, remove } from "firebase/database";

const Profile = () => {
    const { id } = useParams();
    const {data:member, loading, error} = GetData(id);
    const memberRef = ref(database, 'members/' + id);
    const [isLoadingUpdate, setisLoadingUpdate] = useState(false);
    const [isLoadingDelete, setisLoadingDelete] = useState(false);
    const highestTHlvl = 15;
    const lvlOption = [];
    const history = useHistory();

    //states to be updated
    const [name, setName] = useState("");
    const [townhall, setTownhall] = useState("Level 1");
    const [TownhallImage, setTownhallImage] = useState("");
    const [xp, setXp] = useState(1);
    const [trophies, setTrophies] = useState(0);
    const [LeagueImage, setLeagueImage] = useState("");
    const [role, setRole] = useState("");
    const [league, setLeague] = useState("Unranked");

    useEffect(()=>{
        if (member){
            setName(member.name)
            setTownhall(member.townhall);
            setTownhallImage(getTownhall(member.townhall));
            setXp(member.xp);      
            setTrophies(member.trophies);
            setLeague(member.league);
            setLeagueImage(getLeague(member.league));
            setRole(member.role);
        }
    }, [member]);

    useEffect(() => {
        setLeagueImage(getLeague(league));
        setLeague(calculateLeague(trophies));
    }, [trophies, league]);


    //for options in townhall select
    for(let i=1; i<= highestTHlvl; i++ ){
        lvlOption.push(<option key={"Level " + i} value={"Level " && i}>Level {i}</option>)
    }


    const updateHandler = (e) => {
        e.preventDefault();
        setisLoadingUpdate(true);
        const updateData = async() => {
            await update(memberRef, {
                name: name,
                townhall: townhall,
                xp: xp,
                trophies: trophies,
                league: league,
                role: role,
            });
        };
        updateData();
        setisLoadingUpdate(false);
        history.push('/')
    }

    const deleteHandler = (e) => {
        e.preventDefault();
        setisLoadingDelete(true);
        const deleteData = async() => {
            await remove(memberRef);
        }

        deleteData();
        setisLoadingDelete(false)
        history.push('/');
    }

    const parse = (value) => {
        if(value){
            return parseInt(value);
        } else {
            return "";
        }
    }

    return ( 
        <div className="profile-details">
            
            { loading && <div>Loading...</div> }
            { error && <div>{ error }</div> }
            {member && (
                <form>
                    <div className="container">
                        <div className="l-side">
                            <h2>{ member.name }</h2>
                            <div className="profile-th-img">
                            { TownhallImage && <img src={TownhallImage} alt=""></img> }
                            { !TownhallImage && <p>Townhall Level: {townhall}</p> }
                            </div>
                            <select
                            value={townhall}
                            onChange={e=>{
                                setTownhall(parseInt(e.target.value));
                                setTownhallImage(getTownhall(parseInt(e.target.value)));
                                }}>
                                {lvlOption}
                            </select>
                        </div>
                        <div className="r-side">
                            <div className="xp">
                                <label>XP</label>
                                <input 
                                    type="number"
                                    required
                                    value={xp}
                                    min="1"
                                    onChange={e=>setXp(parse(e.target.value))}
                                />
                            </div>
                            <div className="league">
                                { LeagueImage && <img src={LeagueImage} alt=""></img> }
                                { !LeagueImage && <p>{ LeagueImage }</p> }
                                <input 
                                    type="number"
                                    required
                                    value={trophies}
                                    min="0"
                                    onChange={e=>{
                                        setTrophies(parse(e.target.value));
                                    }}
                                />
                            </div>
                            <div className="role">
                                <label>Role</label>
                                <select 
                                value={role}
                                onChange={e=>setRole(e.target.value)}>
                                    <option value="Member">Member</option>
                                    <option value="Elder">Elder</option>
                                    <option value="Co-leader">Co-leader</option>
                                    <option value="Leader">Leader</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="update-buttons">
                        { !isLoadingUpdate && <button onClick={updateHandler} id="btn-Update">Update</button> }
                        { isLoadingUpdate && <button disabled id="btn-Update">Updating...</button> }
                        { !isLoadingDelete && <button onClick={deleteHandler} id="btn-Delete">Kick out</button> }
                        { isLoadingDelete && <button delete id="btn-Delete">Kicking out..</button> }
                        
                    </div>
                </form>
            )}
        </div>
     );
}
 
export default Profile;