import { createContext, useContext, useState, useEffect, useMemo } from "react";
import type { LoginInput, RegisterInput, User } from "../api/auth";
import { getMe, login as apiLogin , register as apiRegister} from "../api/auth";
import { clearToken, getToken } from "../api/token";
import { setUnauthorizedHandler } from "../api/client";

type AuthResult = {
    ok: boolean;
    message?: string;
};

type AuthContextValue = {
    user: User | null;
    loading: boolean;
    error: string | null;
    login: (input: LoginInput) => Promise<AuthResult>;
    register: (input: RegisterInput) => Promise<AuthResult>;
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

    const getErrorMessage = (e: unknown, fallback: string) => {
        return e instanceof Error ? e.message : fallback;
    };

    const register = async (input: RegisterInput) => {
        setError(null);
        setLoading(true);
        try {
            await apiRegister(input);
            await apiLogin({ email: input.email, password: input.password });
            const me = await getMe();
            setUser(me);
            return { ok: true };
        } catch (e) {
            const message = getErrorMessage(e, "Register failed");
            setError(message);
            return { ok: false, message };
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
            return { ok: true };
        } catch (e) {
            const message = getErrorMessage(e, "Login failed");
            setError(message);
            return { ok: false, message };
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
