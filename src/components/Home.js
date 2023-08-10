import { useState } from "react";
import sortImg from "../assets/up-down-arrow.svg"
import MemberList from "./MemberList";
import useFetch from "./useFetch";

const Home = () => {

    const [sortBy] = useState("Trophies");

    const {data: members, datacount: memCount, loading, error} = useFetch('http://localhost:8000/members');
    
    return ( 
        <div>
            <div className="sorting">
                <h3>Members: {memCount}</h3>
                <button className="sortButton">
                    <img src={sortImg} alt="" className="sortImg"/>
                </button>
                <h3>
                    Sort by: {sortBy}
                </h3>

            </div>
            { error && <div><h3>{error}</h3></div>}
            { loading && <div><h1>Loading...</h1></div> }
            { members && <MemberList members={members} />}
        </div>
        
     );
}
 
export default Home;