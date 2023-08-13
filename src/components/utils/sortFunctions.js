const Role = {
    "Leader": 1,
    "Co-leader": 2,
    "Elder": 3,
    "Member": 4
}

const sortByTrophies = (x, y) => y.trophies - x.trophies;

const sortByTownhall = (x, y) => y.townhall - x.townhall;

const sortByRole = (x, y) => Role[x.role] - Role[y.role]; 

const sortByXp = (x, y) => y.xp - x.xp;




export {sortByTrophies, sortByTownhall, sortByRole, sortByXp};