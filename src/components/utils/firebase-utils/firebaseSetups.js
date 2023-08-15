import { initializeApp } from 'firebase/app'
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    databaseURL: "https://clan-management-system-default-rtdb.firebaseio.com/"
}
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };