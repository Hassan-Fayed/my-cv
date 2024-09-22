import Cookies from 'js-cookie';

import hash from "@/utils/hash";

export default async function setAntiCSRFCookie() {
    const antiCSRFToken = crypto.randomUUID();
    const hashedAntiCSRFToken = await hash(antiCSRFToken);

    Cookies.set('antiCSRFToken', hashedAntiCSRFToken, {
        expires: new Date(new Date().getTime() + 2 * 60 * 1000), // 2 minutes
        secure: true,
        sameSite: 'strict',
    });
    return antiCSRFToken;
};