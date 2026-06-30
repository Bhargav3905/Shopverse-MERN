export const isLoggedIn = () => !!localStorage.getItem("token");

export const isAdmin = () => localStorage.getItem("role") === "admin";

export const logout = () => {
    localStorage.clear();
};