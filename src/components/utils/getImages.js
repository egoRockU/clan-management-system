import { TownhallImages, LeagueImages } from "../../assets";

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

const TownhallImageMapping = {
    1: TownhallImages[0],
    2: TownhallImages[1],
    3: TownhallImages[2],
    4: TownhallImages[3],
    5: TownhallImages[4],
    6: TownhallImages[5],
    7: TownhallImages[6],
    8: TownhallImages[7],
    9: TownhallImages[8],
    10: TownhallImages[9],
    11: TownhallImages[10],
    12: TownhallImages[11],
    13: TownhallImages[12],
    14: TownhallImages[13],
    15: TownhallImages[14],
}

const getLeague = (memberLeague) => {
    const leagueImg = LeagueImageMapping[memberLeague]
        if (leagueImg){
            return leagueImg;
        }
        else{
            return null;
        }
}

const getTownhall = (memberTH) => {
    const townhallImg = TownhallImageMapping[memberTH];
    if (townhallImg){
        return townhallImg;
    } else {
        return null;
    }
}  

export { getLeague, getTownhall };
