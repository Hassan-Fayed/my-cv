import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getDatabase } from 'firebase-admin/database';

const firebaseAdminConfig = {
    credential: cert({
        projectId: process.env.PROJECT_ID,
        clientEmail: process.env.CLIENT_EMAIL,
        privateKey: process.env.PRIVATE_KEY?.replace(/\\n/gm, "\n"),
    }),
    databaseURL: process.env.FIREBASE_DB_URL,
}

const adminApp = getApps().length === 0 ? initializeApp(firebaseAdminConfig) : getApps()[0];

const adminDB = getDatabase(adminApp);

const adminAuth = getAuth(adminApp);

export { adminApp, adminAuth, adminDB };