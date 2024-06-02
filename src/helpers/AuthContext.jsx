
import React, { createContext, useContext, useState, useEffect } from 'react';
import { validarToken } from './tokenValidation'
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    const [userInformation, setuserInformation] = useState({})
    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {

            setIsAuthenticated(false);
        } else {
            const { valid, decoded } = validarToken()
           
            if (valid) {
                setuserInformation(decoded)
                setIsAuthenticated(valid)
            } else {
                setuserInformation({})
                setIsAuthenticated(valid)
            }
        }
    }, []);

    const logOut = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, logOut, userInformation }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
