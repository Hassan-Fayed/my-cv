import { initializeApp, getApps } from 'firebase/app';
import { getDatabase, ref } from "firebase/database";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DB_URL,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID,
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

const auth = getAuth(app);

const database = getDatabase(app);

const commentsRef = ref(database, 'comments');

function getSingleCommentFirebaseRef(commentId: string) {
    const commentRef = ref(database, `comments/${commentId}`);
    return commentRef;
}

export { app, auth, database, commentsRef, getSingleCommentFirebaseRef };