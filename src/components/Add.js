const Add = () => {

    const highestTHlvl = 15;
    const lvlOption = [];

    for(let i=1; i<= highestTHlvl; i++ ){
        lvlOption.push(<option value={"Level " || i}>Level {i}</option>)
    }

    return ( 
        <div>
            <h2>Add Member</h2>
            <form>
                <label>Name</label>
                <input
                    type="text"
                    required
                    value="Name"
                />
                <label>Townhall Level</label>
                <select value="Level">
                    { lvlOption }
                </select>
            </form>
        </div>
    );
}
 
export default Add;