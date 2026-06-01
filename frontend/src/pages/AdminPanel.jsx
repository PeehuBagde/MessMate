import { useState } from "react";
import axios from "axios";

function AdminPanel() {
  const [form, setForm] = useState({
    date: "",
    breakfast: "",
    lunch: "",
    dinner: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await axios.post("http://localhost:5000/api/menu", form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Menu added successfully!");
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Admin Panel - Add Menu</h2>

      <form onSubmit={handleSubmit}>
        <input type="date" name="date" onChange={handleChange} /><br />
        <input name="breakfast" placeholder="Breakfast" onChange={handleChange} /><br />
        <input name="lunch" placeholder="Lunch" onChange={handleChange} /><br />
        <input name="dinner" placeholder="Dinner" onChange={handleChange} /><br />

        <button type="submit">Add Menu</button>
      </form>
    </div>
  );
}

export default AdminPanel;