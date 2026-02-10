import { createContext, useContext, useState, useEffect } from "react";
import type { LoginInput, RegisterInput, User } from "../api/auth";
import { getMe, login as apiLogin , register as apiRegister} from "../api/auth";
import { clearToken, getToken } from "../api/token";

type AuthContextValue = {
    user: User | null;
    login: (input: LoginInput) => Promise<void>;
    register: (input: RegisterInput) => Promise<void>;
    logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const token = getToken();
        if (!token) return;

        getMe()
            .then(setUser)
            .catch(() => clearToken());
    }, []);

    const register = async (input: RegisterInput) => {
        await apiRegister(input);
        await login({ email: input.email, password: input.password });
    };
    
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
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
};
