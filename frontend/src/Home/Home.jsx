import { useLocation } from "react-router-dom";
import React from "react";

function Home() {
    const location = useLocation();
    const user = location.state?.user; 

    return (
        <div className="p-5 mt-20">
            <h1>Welcome, {user?.name || "Guest"}!</h1>
            <p>Email: {user?.email || "Not provided"}</p>
        </div>
    );
}

export default Home;
