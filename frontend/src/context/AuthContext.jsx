import { createContext, useState, useContext, useEffect } from 'react';
import { supabase } from '../supabase';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // If supabase is not configured, don't attempt to fetch session
        if (!supabase) {
            setLoading(false);
            return;
        }

        // Check for active session on load
        const getSession = async () => {
            try {
                const { data: { session } } = await supabase.auth.getSession();
                if (session) {
                    // Fetch profile
                    const { data: profile } = await supabase
                        .from('profiles')
                        .select('*')
                        .eq('id', session.user.id)
                        .single();

                    setUser({ ...session.user, ...profile });
                }
            } catch (error) {
                console.error("Error fetching session:", error);
            }
            setLoading(false);
        };

        getSession();

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (_event, session) => {
                if (session) {
                    try {
                        const { data: profile } = await supabase
                            .from('profiles')
                            .select('*')
                            .eq('id', session.user.id)
                            .single();
                        setUser({ ...session.user, ...profile });
                    } catch (error) {
                        console.error("Error fetching profile after auth change:", error);
                        setUser(session.user);
                    }
                } else {
                    setUser(null);
                }
            }
        );

        return () => subscription.unsubscribe();
    }, []);

    const login = async (email, password) => {
        if (!supabase) return { success: false, message: 'Supabase is not configured.' };
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            return { success: false, message: error.message };
        }
        return { success: true };
    };

    const logout = async () => {
        if (!supabase) return;
        await supabase.auth.signOut();
        setUser(null);
    };

    const updateProfile = async (updatedData) => {
        if (!supabase) return { success: false, message: 'Supabase is not configured.' };
        const { error } = await supabase
            .from('profiles')
            .update(updatedData)
            .eq('id', user.id);

        if (error) return { success: false, message: error.message };

        setUser({ ...user, ...updatedData });
        return { success: true };
    };

    const register = async (userData) => {
        if (!supabase) return { success: false, message: 'Supabase is not configured.' };
        const { email, password, name, address, role, mnemonic } = userData;
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        });

        if (error) return { success: false, message: error.message };

        if (data.user) {
            // Create profile
            const { error: profileError } = await supabase
                .from('profiles')
                .insert([
                    {
                        id: data.user.id,
                        name,
                        email,
                        address,
                        role,
                        mnemonic,
                    },
                ]);

            if (profileError) return { success: false, message: profileError.message };
        }

        return { success: true };
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
