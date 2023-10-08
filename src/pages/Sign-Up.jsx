import React from "react";
import { useState, useEffect } from "react";
import api from "../api";
import './Sign-Up.css';
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmed, setPasswordConfirmed] = useState("");
    const [err, setErr] = useState("");
    const navigate = useNavigate();



    const handleSignup = async (role) => {
        if (!email || !password || !passwordConfirmed) {
            setErr("all fields must be filled!")
            return;
        }
        if (password !== passwordConfirmed) {
            setErr("password fields must be matching!");
            return;
        }
        setErr("");
        if (role === "user") {
            try {
                const response = await api.post("/users/signup", {
                    email,
                    password,
                });
                if (response.data.success) {
                    navigate("/login");
                }
            } catch (error) {
                setErr(error.response.data.message || "Signup failed.");
            }
        }

        else if (role === "admin") {
            try {
                const response = await api.post("/admins/signup", {
                    email,
                    password,
                });
                if (response.data.success) {
                    navigate("/login");
                }
            } catch (error) {
                setErr(error.response.data.message || "Signup failed.");
            }
        }
    }

    return (
        <>
            <div id="login-box">
                <div className="left">
                    <h1>Sign up</h1>

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

                    <input
                        type="password"
                        name="passwordConfrimed"
                        value={passwordConfirmed}
                        placeholder="Confirm password"
                        onChange={(e) => setPasswordConfirmed(e.target.value)}
                        required={true} />

                    {err && <div style={{ color: "red", fontSize: "12px" }}>
                        {err}
                    </div>}

                    <input
                        type="submit"
                        name="signup_submit"
                        value="Sign me up"
                        onClick={() => handleSignup("user")} />
                </div>
            </div>
        </>
    );
};
export default SignUp;