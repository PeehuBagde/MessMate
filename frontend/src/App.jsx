import { useState, useEffect } from "react";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { jwtDecode } from "jwt-decode";
import AdminPanel from "./pages/AdminPanel";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const decoded = jwtDecode(token);

      setIsLoggedIn(true);
      setRole(decoded.role);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setRole(null);
  };

  return (
    <div>
      {!isLoggedIn ? (
        <>
          <h2>Please Login or Register</h2>
          <Register />
          <Login />
        </>
      ) : (
        <>
          <button onClick={handleLogout}>Logout</button>

          {role === "admin" ? (
            <>
              <h2>👨‍🍳 Admin Dashboard</h2>
              <AdminPanel />
            </>
          ) : (
            <h2>🎓 Student Dashboard</h2>
          )}

          <Dashboard />
        </>
      )}
    </div>
  );
}

export default App;