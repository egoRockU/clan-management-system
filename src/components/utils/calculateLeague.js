let league = "Unranked"

const calculateLeague = (trophies) => {
    if (trophies < 400){
        league = "Unranked"
    }
    if (trophies >= 400){
        league = "Bronze"
    }
    if (trophies >= 800){
        league = "Silver"
    }
    if (trophies >= 1400){
        league = "Gold"
    }
    if (trophies >= 2000){
        league = "Crystal"
    }
    if (trophies >= 2600){
        league = "Master"
    }
    if (trophies >= 3200){
        league = "Champion"
    }
    if (trophies >= 4100){
        league = "Titan"
    }
    if (trophies >= 5000){
        league = "Legend"
    }

    return league;
}

export { calculateLeague };