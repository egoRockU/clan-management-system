import trophyImg from "../assets/Trophy.png";
import { TownhallImages, LeagueImages } from "../assets";

const MemberList = ({members}) => {

    const LeagueImageMapping = {
        "Unranked": LeagueImages[0],
        "Bronze": LeagueImages[1],
        "Silver": LeagueImages[2],
        "Gold": LeagueImages[3],
        "Crystal": LeagueImages[4],
        "Master": LeagueImages[5],
        "Champion": LeagueImages[6],
        "Titan": LeagueImages[7],
        "Legend": LeagueImages[8],
    }

    const mapLeague = (member) => {
        const leagueImg = LeagueImageMapping[member.league]
            if (leagueImg){
                return <img src={leagueImg} alt=""></img>
            }
            else{
                <p>{member.league}</p>
            }
    }

    return ( 
        <div className="memberList">
            {members.map((member, index)=>(
            <div className="memberBar" key={member.id}>
                <div className="memberNum">
                    <h2>{index + 1}</h2>
                </div>
                <div className="memberLeague">
                    { mapLeague(member) }
                </div>
                <div className="memberTownhall">
                    { TownhallImages.map((th, i) => {
                        i+=1;
                        if (i == member.townhall){
                            return (<img src={th} alt=""></img>)
                        }
                    }) }
                </div>
                <div className="memberName">
                    <p>{member.name}</p>
                    <small>{member.role}</small>
                </div>
                <div className="memberTrophies">
                    <img src={trophyImg} alt="trophy"></img>
                    <p>{member.trophies}</p>
                </div>
            </div>
            ))}
        </div>
     );
}
 
export default MemberList;