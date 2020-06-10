import {useState, useCallback, useEffect} from 'react';

const storageName = 'userData';

export const useAuth = () => {
    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null);
    const [firstname, setFirstname] = useState(null);
    const [lastname, setLastname] = useState(null);
    const [ready, setReady] = useState(false);

    const login = useCallback( (jwtToken, id, userFirstname, userLastname) => {
        setToken(jwtToken);
        setUserId(id);
        setFirstname(userFirstname);
        setLastname(userLastname);
 
        localStorage.setItem(storageName, JSON.stringify( {
            userId: id, token: jwtToken,  firstname: userFirstname, lastname: userLastname
        }));
    }, []);

    const logout = useCallback( () => {
        setToken(null);
        setUserId(null);
        setFirstname(null);
        setLastname(null);
        localStorage.removeItem(storageName);
    }, []);

    useEffect( () => {
        const data = JSON.parse(localStorage.getItem(storageName));

        if(data && data.token) {
            login(data.token, data.userId, data.firstname, data.lastname);
        }

        setReady(true);
    }, [login]);

    return {login, logout, token, userId, firstname, lastname, ready};
}