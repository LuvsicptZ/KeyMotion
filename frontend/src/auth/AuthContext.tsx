import { createContext, useContext, useState, useEffect, useMemo } from "react";
import type { LoginInput, RegisterInput, User } from "../api/auth";
import { getMe, login as apiLogin , register as apiRegister} from "../api/auth";
import { clearToken, getToken } from "../api/token";
import { setUnauthorizedHandler } from "../api/client";

type AuthContextValue = {
    user: User | null;
    loading: boolean;
    error: string | null;
    login: (input: LoginInput) => Promise<void>;
    register: (input: RegisterInput) => Promise<void>;
    logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setUnauthorizedHandler(() => {
            clearToken();
            setUser(null);
        });

        const token = getToken();
        if (!token) {
            setLoading(false);
            return;
        }

        getMe()
            .then(setUser)
            .catch(() => clearToken())
            .finally(() => setLoading(false));
    }, []);

    const register = async (input: RegisterInput) => {
        setError(null);
        setLoading(true);
        try {
            await apiRegister(input);
            await login({ email: input.email, password: input.password });
        } catch (e) {
            setError(e instanceof Error ? e.message : "Register failed");
            throw e;
        } finally {
            setLoading(false);
        }
    };

    const login = async (input: LoginInput) => {
        setError(null);
        setLoading(true);
        try {
            await apiLogin(input);
            const me = await getMe();
            setUser(me);
        } catch (e) {
            setError(e instanceof Error ? e.message : "Login failed");
            throw e;
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        clearToken();
        setUser(null);
    };

    const value = useMemo<AuthContextValue>(
        () => ({ user, loading, error, login, register, logout }),
        [user, loading, error],
      );

    return (
        <AuthContext.Provider value={ value }>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
};
