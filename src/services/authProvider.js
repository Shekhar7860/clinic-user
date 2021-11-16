import React, { useState, useEffect } from 'react';
import { getItem, setItem, removeItem } from './storageService';

export const AuthContext = React.createContext();

const STORAGE_USER_KEY = 'user';
const PET_USER_KEY = 'defaultPet';
const STORAGE_TOKEN_KEY = 'token';
const FIREBASE_TOKEN_KEY = 'firebaseToken';

const AuthContextProvider = ({ children }) => {

    const [user, setUser] = useState();
    const [defaultPetIndex, setDefaultPetIndex] = useState();
    const [petProfileData, setPetProfileData] = useState();
    const [token, setToken] = useState();
    const [logout, setLogout] = useState(false);
    const [firebaseToken, setFirebaseToken] = useState();
    const [mesiboToken, setMesiboToken] = useState();
    const [mesiboId, setMesiboId] = useState();
    const [latitude, setLatitude] = useState(28.6139);
    const [longitude, setLongitude] = useState(77.2090);

    useEffect(() => {
        if (logout) {
            (async () => {
                setUser('');
                setToken('');
                setDefaultPetIndex('');
                setLogout(false);
                removeItem(STORAGE_USER_KEY).then(result => {
                    console.log('user logout', result);
                });
                removeItem(STORAGE_TOKEN_KEY).then(result => {
                    console.log('user logout', result);
                });
            })();
        } else if (user && token && user !== '' && token !== '') {
            setItem('user', user);
            setItem('token', token);

        } else if (!user && !token) {
            (async () => {
                getItem(STORAGE_USER_KEY).then(userValue => {
                    if (userValue) {
                        setUser(JSON.parse(userValue));
                    } else {
                        setUser('');
                    }
                });
                getItem(STORAGE_TOKEN_KEY).then(tokenValue => {
                    if (tokenValue) {
                        setToken(tokenValue);
                    } else {
                        setToken('');
                        //setItem(STORAGE_TOKEN_KEY,'AAdssdsadadfdfsfsfdsfsfs')
                    }
                });
                getItem(FIREBASE_TOKEN_KEY).then(firebaseTokenValue => {
                    if (firebaseTokenValue) {
                        setFirebaseToken(firebaseTokenValue);
                    }
                });
            })();
        }

        if (typeof defaultPetIndex != 'undefined') {
            setItem(PET_USER_KEY, defaultPetIndex);
        }
        else if (!defaultPetIndex) {
            (async () => {
                getItem(PET_USER_KEY).then(saveDefaultPet => {
                    if (saveDefaultPet) {
                        setDefaultPetIndex(saveDefaultPet);
                    }
                });
            })
        }
    }, [logout, user, token, defaultPetIndex]);

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                firebaseToken,
                logout,
                defaultPetIndex,
                petProfileData,
                mesiboToken,
                mesiboId,
                latitude,
                longitude,
                setUser,
                setToken,
                setLogout,
                setFirebaseToken,
                setDefaultPetIndex,
                setPetProfileData,
                setMesiboToken,
                setMesiboId,
                setLatitude,
                setLongitude,
            }}>
            {user !== undefined && token !== undefined ? children : null}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
