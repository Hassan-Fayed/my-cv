import { initializeApp } from 'firebase/app';
import { getDatabase, ref } from "firebase/database";

export function getCommentsFirebaseRef() {
    const firebaseConfig = {
        databaseURL: process.env.FIREBASE_DB_URL,
    };
    const app = initializeApp(firebaseConfig);
    const database = getDatabase(app);
    const commentsRef = ref(database, 'comments')
    return commentsRef;
}