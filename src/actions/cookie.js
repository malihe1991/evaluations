import cookie from 'js-cookie';

// set cookie
export const setCookie = (key, value) => {
    if (process.browser) {
        cookie.set(key, value, {
            expires: 1
        });
    }
};

export const removeCookie = key => {
    if (process.browser) {
        cookie.remove(key, {
            expires: 1
        });
    }
};

// get cookie
export const getCookie = key => {
    if (process.browser) {
        return cookie.get(key);
    }
};