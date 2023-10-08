import React from "react";
import { useState, useEffect } from "react";
import api from "../api";
import Auth from "../Auth";
import { useNavigate } from "react-router-dom";
import './Sign-Up.css';

const LogIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState("");
    const navigate = useNavigate();


    useEffect(() => {
        Auth.setIsAuth();
        if (Auth.isAuth) {
            navigate("/home");
        }
        else if (!Auth.isAuth) {
            navigate("/login");
        }
    }, []);

    useEffect(() => {
        if (Auth.isAuth) {
            navigate("/home");
        }
        else if (!Auth.isAuth) {
            navigate("/login");
        }
    }, [navigate]);


    const handleLogin = async (role) => {
        if (!email || !password) {
            setErr("all fields must be filled!")
            return;
        }

        setErr("");
        if (role === "user") {
            try {
                const response = await api.post("/users/login", {
                    email,
                    password,
                });
                if (response.data.success) {
                    Auth.authenticate(response.data.token, role, email);
                    Auth.isAuth = true;
                    localStorage.setItem("mannequinPath", response.data.mannequinPath);
                    localStorage.setItem("topPath", response.data.topPath);
                    localStorage.setItem("bottomPath", response.data.bottomPath);
                    localStorage.setItem("skinColor", response.data.skinColor);
                    localStorage.setItem("bodyShape", response.data.bodyShape);
                    localStorage.setItem("mannequinScaleX", response.data.mannequinScaleX.toString());
                    localStorage.setItem("mannequinScaleY", response.data.mannequinScaleY.toString());
                    localStorage.setItem("mannequinScaleZ", response.data.mannequinScaleZ.toString());
                    localStorage.setItem("topScaleX", response.data.topScaleX.toString());
                    localStorage.setItem("topScaleY", response.data.topScaleY.toString());
                    localStorage.setItem("topScaleZ", response.data.topScaleZ.toString());
                    localStorage.setItem("topPositionX", response.data.topPositionX.toString());
                    localStorage.setItem("topPositionY", response.data.topPositionY.toString());
                    localStorage.setItem("topPositionZ", response.data.topPositionZ.toString());
                    localStorage.setItem("bottomScaleX", response.data.bottomScaleX.toString());
                    localStorage.setItem("bottomScaleY", response.data.bottomScaleY.toString());
                    localStorage.setItem("bottomScaleZ", response.data.bottomScaleZ.toString());
                    localStorage.setItem("bottomPositionX", response.data.bottomPositionX.toString());
                    localStorage.setItem("bottomPositionY", response.data.bottomPositionY.toString());
                    localStorage.setItem("bottomPositionZ", response.data.bottomPositionZ.toString());


                    navigate("/home");
                }
            } catch (error) {
                setErr(error.response.data.message || "Login failed.");
            }
        }

        else if (role === "admin") {
            try {
                const response = await api.post("/admins/login", {
                    email,
                    password,
                });
                if (response.data.success) {
                    Auth.authenticate(response.data.token, role, email);
                    navigate("/home");
                }
            } catch (error) {
                setErr(error.response.data.message || "Login failed.");
            }
        }
    }

    return (
        <>
            <div id="login-box" className="login">
                <div className="left">
                    <h1>Login</h1>

                    <input
                        type="email"
                        name="email"
                        value={email}
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                        required={true} />

                    <input
                        type="password"
                        name="password"
                        value={password}
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        required={true} />

                    {err && <div style={{ color: "red", fontSize: "12px" }}>
                        {err}
                    </div>}

                    <input
                        type="submit"
                        name="login_submit"
                        value="Log me in"
                        onClick={() => handleLogin("user")} />
                </div>
            </div>
        </>
    );
};
export default LogIn;