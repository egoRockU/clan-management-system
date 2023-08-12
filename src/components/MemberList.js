import trophyImg from "../assets/Trophy.png";
import { getLeague, getTownhall } from "./utils/getImages";
import { Link } from "react-router-dom";

const MemberList = ({members}) => {

    return ( 
        <div className="memberList">
            {members.map((member, index)=>(
            <div className="memberBar" key={member.id}>
                <Link to={`/profile/${member.id}`}>
                    <div className="memberNum">
                        <h2>{index + 1}</h2>
                    </div>
                    <div className="memberLeague">
                        { getLeague(member.league) && <img src={getLeague(member.league)} alt=""></img> }
                        { !getLeague(member.league) && <p>{ member.league }</p> }
                    </div>
                    <div className="memberTownhall">
                        { getTownhall(member.townhall) && <img src={getTownhall(member.townhall)} alt=""></img> }
                        { !getTownhall(member.townhall) && <p>Townhall Level: {member.townhall}</p> }
                    </div>
                    <div className="memberName">
                        <p>{member.name}</p>
                        <small>{member.role}</small>
                    </div>
                    <div className="memberTrophies">
                        <img src={trophyImg} alt="trophy"></img>
                        <p>{member.trophies}</p>
                    </div>
                </Link>
            </div>
            ))}
        </div>
     );
}
 
export default MemberList;