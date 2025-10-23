import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";

function Login() {
    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8000/api/login', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials : "include",
                body: JSON.stringify(user)
            });

            const data = await response.json();
            console.log("Login successful:", data);
            if(response.status === 200){
                navigate('/')
            }
            else{
                alert(data.message || "Invalid credentials");
            }
            

        } catch (error) {
            console.log(`Login error: ${error}`);
        }
    };

    return (
        <div className="w-full flex justify-center mt-20">
            <form className="rounded-lg w-1/2 p-10 bg-blue-100" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input
                        type="email"
                        name="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        required
                        value={user.email}
                        onChange={handleChange}
                    />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input
                        type="password"
                        name="password"
                        className="form-control"
                        id="exampleInputPassword1"
                        required
                        value={user.password}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                    <Link to="" className="underline ml-2">Forget Password?</Link>
                </div>

                <p>Don't have an account yet?
                    <Link to="/signup" className="underline ml-2">Signup</Link>
                </p>
            </form>
        </div>
    );
}

export default Login;
