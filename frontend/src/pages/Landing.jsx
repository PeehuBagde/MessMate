import React, { useState } from "react";
import axios from "axios";

function Landing() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [adminSecret, setAdminSecret] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "https://messmate-liat.onrender.com/api/auth/login",
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
        "https://messmate-liat.onrender.com/api/auth/register",
        {
          name,
          email,
          password,
          adminSecret: isAdmin ? adminSecret : undefined,
        }
      );
      alert("Signup successful! Please login.");
      setIsSignup(false);
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div
      style={{
        height: "100vh",
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

        {/* TOGGLE */}
        <div style={{ display: "flex", marginBottom: "15px" }}>
          <button
            onClick={() => setIsAdmin(false)}
            style={{
              flex: 1,
              padding: "10px",
              background: !isAdmin ? "#2563eb" : "#e5e7eb",
              color: !isAdmin ? "white" : "black",
              border: "none",
              cursor: "pointer",
              borderRadius: "8px 0 0 8px",
            }}
          >
            Student
          </button>

          <button
            onClick={() => setIsAdmin(true)}
            style={{
              flex: 1,
              padding: "10px",
              background: isAdmin ? "#2563eb" : "#e5e7eb",
              color: isAdmin ? "white" : "black",
              border: "none",
              cursor: "pointer",
              borderRadius: "0 8px 8px 0",
            }}
          >
            Admin
          </button>
        </div>

        {/* NAME INPUT */}
        {isSignup && (
          <input
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "10px",
              marginBottom: "10px",
              border: "1px solid rgba(255,255,255,0.2)",
              background: "rgba(255,255,255,0.08)",
              color: "white",
            }}
          />
        )}

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "10px",
            marginBottom: "10px",
            border: "1px solid rgba(255,255,255,0.2)",
            background: "rgba(255,255,255,0.08)",
            color: "white",
          }}
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "10px",
            marginBottom: "10px",
            border: "1px solid rgba(255,255,255,0.2)",
            background: "rgba(255,255,255,0.08)",
            color: "white",
          }}
        />

        {/* ADMIN SECRET */}
        {isAdmin && isSignup && (
          <input
            type="text"
            placeholder="Enter Admin Secret"
            value={adminSecret}
            onChange={(e) => setAdminSecret(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "10px",
              marginBottom: "10px",
              border: "1px solid rgba(255,255,255,0.2)",
              background: "rgba(255,255,255,0.08)",
              color: "white",
            }}
          />
        )}

        {/* BUTTON */}
        <button
          onClick={isSignup ? handleSignup : handleLogin}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "10px",
            border: "none",
            background: "linear-gradient(to right, #3b82f6, #2563eb)",
            color: "white",
            fontSize: "15px",
            cursor: "pointer",
          }}
        >
          Continue
        </button>

        {/* SWITCH */}
        <p style={{ marginTop: "15px", fontSize: "13px", color: "#94a3b8" }}>
          {isSignup ? "Already have an account?" : "Don't have an account?"}
          <span
            style={{ color: "#3b82f6", cursor: "pointer", marginLeft: "5px" }}
            onClick={() => setIsSignup(!isSignup)}
          >
            {isSignup ? "Login" : "Sign up"}
          </span>
        </p>
      </div>
    </div>
  );
}

export default Landing;