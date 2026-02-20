import { createContext, useState, useContext, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkUser = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const profile = await authAPI.getUser();
                    setUser(profile);
                } catch (error) {
                    console.error("Error fetching user session:", error);
                    localStorage.removeItem('token');
                    setUser(null);
                }
            }
            setLoading(false);
        };

        checkUser();
    }, []);

    const login = async (email, password) => {
        try {
            const { token, user: userData } = await authAPI.login({ email, password });
            localStorage.setItem('token', token);
            setUser(userData);
            return { success: true };
        } catch (error) {
            return { success: false, message: error.message };
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    const updateProfile = async (updatedData) => {
        // This is a simplified version, in a real app you'd have an API call
        // For now, we'll just update the local state since we're focusing on migration
        setUser({ ...user, ...updatedData });
        return { success: true };
    };

    const register = async (userData) => {
        try {
            const { token, user: newUser } = await authAPI.register(userData);
            localStorage.setItem('token', token);
            setUser(newUser);
            return { success: true };
        } catch (error) {
            return { success: false, message: error.message };
        }
    };

    const resetPassword = (email) => {
        // Mock password reset
        return { success: true, message: 'Password reset link sent to your email.' };
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, updateProfile, register, resetPassword, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
