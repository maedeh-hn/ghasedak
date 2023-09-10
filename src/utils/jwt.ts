import jwtDecode from 'jwt-decode';
//
import axios from './axios';

// ----------------------------------------------------------------------

const isValidToken = (accessToken: string) => {
    if (!accessToken) {
        return false;
    }

    const decoded: {
        exp: number
    } = jwtDecode(accessToken);
    const currentTime = Date.now() / 1000;

    return decoded.exp > currentTime;
};

// ----------------------------------------------------------------------

const setSession = (accessToken: string | null, refreshToken: string | null) => {
    if (accessToken) {
        localStorage.setItem('accessToken', accessToken);
        if (typeof refreshToken === "string") {
            localStorage.setItem('refreshToken', refreshToken);
        }
        axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    } else {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('panelType')
        delete axios.defaults.headers.common.Authorization;
    }
};

export {isValidToken, setSession};
