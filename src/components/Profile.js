import { useParams } from "react-router-dom";
import useFetch from "./useFetch";
import { getLeague, getTownhall } from "./utils/getImages";
import { useState, useEffect } from "react";
import { calculateLeague } from "./utils/calculateLeague";
import { useHistory } from "react-router-dom";
import GetData from "./utils/firebase-utils/getData";

const Profile = () => {
    const { id } = useParams();
    const url = 'https://egorocku.github.io/cms-api/members.json/'
    const {data:member, loading, error} = GetData(id-1);
    //const [isLoading, setisLoading] = useState(false);
    const highestTHlvl = 15;
    const lvlOption = [];
    const history = useHistory();

    //states to be updated
    const [name, setName] = useState("");
    const [townhall, setTownhall] = useState("Level 1");
    const [TownhallImage, setTownhallImage] = useState(null);
    const [xp, setXp] = useState(1);
    const [trophies, setTrophies] = useState(null);
    const [LeagueImage, setLeagueImage] = useState(null);
    const [role, setRole] = useState(null);
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
        lvlOption.push(<option value={"Level " && i}>Level {i}</option>)
    }


    const updateHandler = (e) => {
        e.preventDefault();
        //setisLoading(true);

        const member = {name, townhall, xp, trophies, league, role};

        fetch(url + id,
        {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(member)
        }).then(()=>{
            //setisLoading(false);
            history.push('/');
        });
    }

    const deleteHandler = (e) => {
        e.preventDefault();

        fetch(url + id, {
            method: 'DELETE'
        }).then(()=>{
            history.push('/');
        })
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
                                    onChange={e=>setXp(parseInt(e.target.value))}
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
                                        setTrophies(parseInt(e.target.value));
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
                        <button onClick={updateHandler} id="btn-Update">Update</button>
                        <button onClick={deleteHandler} id="btn-Delete">Kick out</button>
                    </div>
                </form>
            )}
        </div>
     );
}
 
export default Profile;