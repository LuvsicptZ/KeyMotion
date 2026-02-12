const TOKEN_KEY = "keymotion_token";

let memoryToken = "";

export const getToken = () => {
    if (memoryToken) return memoryToken;
    const stored = localStorage.getItem(TOKEN_KEY)
    if(stored) {
        memoryToken = stored;
        return stored;
    }
    return "";
};

export const setToken = (token: string) => {
    memoryToken = token;
    localStorage.setItem(TOKEN_KEY, token);
}

export const clearToken = () => {
    memoryToken = "";
    localStorage.removeItem(TOKEN_KEY);
}