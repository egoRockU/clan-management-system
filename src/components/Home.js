import { useEffect, useMemo, useState } from "react";
import sortImg from "../assets/up-down-arrow.svg"
import MemberList from "./MemberList";
import { sortByTrophies, sortByTownhall, sortByRole, sortByXp } from "./utils/sortFunctions";
import GetData from "./utils/firebase-utils/getData";

const Home = () => {

    const sortCateg = useMemo(()=> ["Most Trophies", "Highest Town Hall", "By Role", "Highest XP Level"], []);
    const [sortInd, setSortInd] = useState(0);
    const [sortBy, setSortBy] = useState(sortCateg[sortInd]);
    const [sortFunc, setSortFunc] = useState(()=>sortByTrophies);
    const [isSortedByXp, setIsSortedByXp] = useState(false);

    const {data: members, dataCount: memCount, loading, error} = GetData('');
    
    const switchCateg = () => {
        if (sortInd < sortCateg.length-1){
            setSortInd(sortInd+1);
        } else {
            setSortInd(0);
        }
    }

    useEffect(()=>{
        setSortBy(sortCateg[sortInd]);
        switch (sortBy){
            case "Most Trophies":
                setSortFunc(()=>sortByTrophies);
                setIsSortedByXp(false);
                break;
            case "Highest Town Hall":
                setSortFunc(()=>sortByTownhall);
                setIsSortedByXp(false);
                break;
            case "By Role":
                setSortFunc(()=>sortByRole);
                setIsSortedByXp(false);
                break;
            case "Highest XP Level":
                setSortFunc(()=>sortByXp);
                setIsSortedByXp(true);
                break;
            default:
                setSortFunc(()=>sortByTrophies);
                break;
        }

    }, [sortBy, sortCateg, sortInd]);


    return ( 
        <div>
            <div className="sorting">
                <div className="memCount">
                    <h3>Members: {memCount}</h3>
                </div>
                <div className="sort-btn">
                    <button onClick={switchCateg} className="sortButton">
                        <img src={sortImg} alt="" className="sortImg"/>
                    </button>
                </div>
                <div className="sort-lbl">
                    <h3>
                        {sortBy}
                    </h3>
                </div>
            </div>
            { error && <div><h3>{error}</h3></div>}
            { loading && <div><h1>Loading...</h1></div> }
            { members && <MemberList members={members.sort(sortFunc)} isSortedByXp={isSortedByXp} />}
        </div>
        
     );
}
 
export default Home;