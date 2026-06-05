import { useState } from "react";
import axios from "axios";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
 
  try {
    const res = await axios.post(
      "https://messmate-liat.onrender.com/api/auth/login",
      form
    );

    localStorage.setItem("token", res.data.token);

    alert("Login successful!");

    window.location.reload(); // 👈 IMPORTANT
  } catch (err) {
    console.error(err);
  }
};

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input name="email" placeholder="Email" onChange={handleChange} /><br />
        <input name="password" placeholder="Password" type="password" onChange={handleChange} /><br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;