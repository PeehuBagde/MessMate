import React, { useState } from "react";
import axios from "axios";

function Landing() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSignup, setIsSignup] = useState(false);

    const handleLogin = async () => {
        try {
            const res = await axios.post(
                "http://localhost:5000/api/auth/login",
                { email, password }
            );
            localStorage.setItem("token", res.data.token);
            window.location.reload();
        } catch (err) {
            alert("Invalid credentials");
        }
    };

    const handleSignup = async () => {
        try {
            await axios.post(
                "http://localhost:5000/api/auth/register",
                { email, password }
            );
            alert("Signup successful! Please login.");
            setIsSignup(false);
        } catch (err) {
            alert("Signup failed");
        }
    };

  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #0f172a, #1e293b)",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          width: "90%",
          maxWidth: "380px",
          padding: "30px",
          borderRadius: "16px",
          background: "rgba(255,255,255,0.05)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
          textAlign: "center",
          color: "white",
        }}
      >
        {/* LOGO */}
        <h1 style={{ fontSize: "35px", marginBottom: "10px" }}>
           MessMate
        </h1>

        <p style={{ fontSize: "14px", color: "#94a3b8", marginBottom: "25px" }}>
          Smart Hostel Mess Management
        </p>

        <p style={{ marginBottom: "15px", color: "#cbd5f5" }}>
            {isSignup ? "Create your account" : "Login to your account"}
        </p>

        <p style={{ marginBottom: "10px", fontSize: "14px", color: "#cbd5f5" }}>
          Enter your details to continue
        </p>

        {/* EMAIL INPUT */}
        <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{
            width: "100%",
            boxSizing: "border-box",
            padding: "12px",
            borderRadius: "10px",
            border: "1px solid rgba(255,255,255,0.2)",
            background: "rgba(255,255,255,0.08)",
            color: "white",
            outline: "none",
            marginBottom: "10px",
        }}
        />

        {/* PASSWORD INPUT */}
        <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{
            width: "100%",
            boxSizing: "border-box",
            padding: "12px",
            borderRadius: "10px",
            border: "1px solid rgba(255,255,255,0.2)",
            background: "rgba(255,255,255,0.08)",
            color: "white",
            outline: "none",
            marginBottom: "15px",
        }}
        />

        {/* LOGIN BUTTON */}
        <button
        style={{
            width: "100%",
            padding: "12px",
            borderRadius: "10px",
            border: "none",
            background: "linear-gradient(to right, #3b82f6, #2563eb)",
            color: "white",
            fontSize: "15px",
            cursor: "pointer",
            transition: "0.3s",
        }}
        onMouseOver={(e) => (e.target.style.opacity = "0.9")}
        onMouseOut={(e) => (e.target.style.opacity = "1")}
        onClick={isSignup ? handleSignup : handleLogin}
        >
        Continue
        </button>

        <p style={{ marginTop: "15px", fontSize: "13px", color: "#94a3b8" }}>
            {isSignup ? "Already have an account?" : "Don't have an account?"}
            <span
            style={{
                color: "#3b82f6",
                cursor: "pointer",
                marginLeft: "5px",
            }}
            onClick={() => setIsSignup(!isSignup)}
            >
            {isSignup ? "Login" : "Sign up"}
            </span>
            </p>

        {/* FOOTER TEXT */}
        <p
          style={{
            marginTop: "20px",
            fontSize: "12px",
            color: "#64748b",
          }}
        >
          By continuing, you agree to MessMate Terms & Privacy
        </p>
      </div>
    </div>
  );
}

export default Landing;