import trophyImg from "../assets/Trophy.png";

const MemberList = ({members}) => {


    

    return ( 
        <div className="memberList">
            {members.map((member, index)=>(
            <div className="memberBar" key={member.id}>
                <div className="memberNum">
                    <h2>{index + 1}</h2>
                </div>
                <div className="memberLeague">
                    <p>{member.league}</p>
                </div>
                <div className="memberTownhall">
                    <p> Townhall level: {member.townhall}</p>
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