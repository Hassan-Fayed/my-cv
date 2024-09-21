import Cookies from 'js-cookie';

import hash from "@/utils/hash";

export default async function setAntiCSRFCookie() {
    const antiCSRFToken = crypto.randomUUID();
    const hashedAntiCSRFToken = await hash(antiCSRFToken);

    Cookies.set('antiCSRFToken', hashedAntiCSRFToken, {
        expires: 1, // one day - needs to be changed to 5 minutes
        secure: true,
        sameSite: 'strict',
    });
    return antiCSRFToken;
};