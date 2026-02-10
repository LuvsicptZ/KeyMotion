import { createContext, useContext, useState } from "react";
import type { LoginInput, User } from "../api/auth";
import { getMe, login as apiLogin } from "../api/auth";
import { clearToken } from "../api/token";

type AuthContextValue = {
    user: User | null;
    login: (input: LoginInput) => Promise<void>;
    logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    const login = async (input: LoginInput) => {
        await apiLogin(input);
        const me = await getMe();
        setUser(me);
    };

    const logout = () => {
        clearToken();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
};
