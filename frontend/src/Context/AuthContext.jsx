import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // Load saved user and token from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedToken = localStorage.getItem("token");

    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedToken) setToken(savedToken);
  }, []);
  useEffect(() => {
  async function checkAuth() {
    try {
      const res = await fetch("http://localhost:8000/api/verify", {
        method: "GET",
        credentials: "include", // <-- important
      });

      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        setToken("cookie-token"); // placeholder
      }
    } catch (err) {
      setUser(null);
      setToken(null);
    }
  }

  checkAuth();
}, []);


  // Save user and token to localStorage whenever they change
  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");

    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
  }, [user, token]);

   const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };


  return (
    <AuthContext.Provider value={{ user, setUser, token, setToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
