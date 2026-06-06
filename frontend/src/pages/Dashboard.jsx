import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

function Dashboard() {
  const [menus, setMenus] = useState([]);
  const [role, setRole] = useState(null);
  const [editMenu, setEditMenu] = useState(null);
  const [selection, setSelection] = useState({});
  const [bill, setBill] = useState(null);
  const [userMeals, setUserMeals] = useState([]);
  const [monthlyPlan, setMonthlyPlan] = useState({
    breakfast: false,
    lunch: false,
    dinner: false,
  });
  console.log("Monthly Plan:", monthlyPlan);

useEffect(() => {
  const fetchMenus = async () => {
    try {
      const token = localStorage.getItem("token");

      if (token) {
        const decoded = jwtDecode(token);
        setRole(decoded.role);
      }

      // 🔹 FETCH MENUS
      const res = await axios.get(
        "https://messmate-liat.onrender.com/api/menu",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMenus(res.data);

      // 🔹 FETCH BILL (ADD THIS PART)
      const billRes = await axios.get(
        "https://messmate-liat.onrender.com/api/bill",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const mealRes = await axios.get(
  "https://messmate-liat.onrender.com/api/meal",
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

setUserMeals(mealRes.data);

      setBill(billRes.data);

    } catch (err) {
      console.error(err);
    }
  };

  fetchMenus();
  fetchMonthlyPlan();
}, []);

  const getDay = (dateString) => {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const date = new Date(dateString);
  return days[date.getDay()];
  };

  const getUserMeal = (date) => {
  return userMeals?.find((m) => m.date === date) || null;
  };

  const handleDelete = async (id) => {
  try {
    const token = localStorage.getItem("token");

    await axios.delete(`https://messmate-liat.onrender.com/api/menu/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    alert("Menu deleted!");
    window.location.reload();
  } catch (err) {
    console.error(err);
  }
};

  const handleUpdate = async () => {
  try {
    const token = localStorage.getItem("token");

    await axios.put(
      `https://messmate-liat.onrender.com/api/menu/${editMenu._id}`,
      editMenu,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Menu updated!");
    window.location.reload();
  } catch (err) {
    console.error(err);
  }
};

const handleChange = (menuId, field) => {
  setSelection((prev) => ({
    ...prev,
    [menuId]: {
      ...prev[menuId],
      [field]: !prev[menuId]?.[field],
    },
  }));
};

const handleSave = async (menu) => {
  try {
    const token = localStorage.getItem("token");

    const selected =
  selection[menu._id] ||
  (monthlyPlan
    ? {
        breakfast: monthlyPlan?.breakfast,
        lunch: monthlyPlan?.lunch,
        dinner: monthlyPlan?.dinner,
      }
    : {});

    const res = await axios.post(
      "https://messmate-liat.onrender.com/api/meal",
      {
        date: menu.date,
        breakfast: selected.breakfast || false,
        lunch: selected.lunch || false,
        dinner: selected.dinner || false,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert(res.data.message); 
    window.location.reload();

  } catch (err) {
    console.error(err);
  }
};

const handleMonthlyChange = (field) => {
  setMonthlyPlan((prev) => ({
    ...prev,
    [field]: !prev[field],
  }));
};

const handleMonthlySave = async () => {
  console.log("CLICK WORKING");
  try {
    const token = localStorage.getItem("token");

    const res = await axios.post(
      "https://messmate-liat.onrender.com/api/meal/monthly",
      monthlyPlan,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert(res.data.message);
  } catch (err) {
    console.error(err);
  }
};

const fetchMonthlyPlan = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.get(
      "https://messmate-liat.onrender.com/api/meal/monthly",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("API DATA:", res.data);

    setMonthlyPlan(res.data);
  } catch (err) {
    console.log(err);
  }
};

  return (
  <div
  style={{
    backgroundColor: "#f8fafc",
    minHeight: "100vh",
    padding: "20px",
    color: "black",
  }}
  >
    <div
        style={{
    backgroundColor: "#ffffff",
    padding: "10px 20px",
    marginBottom: "20px",
    borderBottom: "1px solid #e5e7eb",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  }}>


     <h2 style={{ margin: 0, color: "#1e293b" }}>🍽️ Hostel Mess</h2>
      <div>
    <button
      style={{
        marginRight: "10px",
        padding: "6px 12px",
        borderRadius: "6px", 
        border: "none",
        backgroundColor: "#2563eb",
        color: "white",
        cursor: "pointer"
      }}
    >
      Dashboard
    </button>

    <button
      onClick={() => {
        localStorage.removeItem("token");
        window.location.reload();
      }}
      style={{
        padding: "6px 12px",
        borderRadius: "6px",
        border: "none",
        backgroundColor: "#ef4444",
        color: "white",
        cursor: "pointer"
      }}
    >
      Logout
    </button>
  </div>
  </div>


    <h1 style={{ marginBottom: "20px", fontSize: "28px", color: "#1e293b" }}>
      🍽️ Mess Dashboard
    </h1>

    <h2 style={{ marginBottom: "10px", color: "#cbd5f5" }}>
      Weekly Menu
    </h2>

      {role === "student" && (
  <div
    style={{
      backgroundColor: "#ffffff",
      padding: "15px",
      marginBottom: "20px",
      borderRadius: "10px",
      border: "1px solid #e5e7eb",
    }}
  >
    <h3>📅 Set Monthly Plan</h3>

    <label>
      <input
        type="checkbox"
        checked={monthlyPlan?.breakfast || false}
        onChange={() => handleMonthlyChange("breakfast")}
      />
      Breakfast
    </label>

    <label style={{ marginLeft: "10px" }}>
      <input
        type="checkbox"
        checked={monthlyPlan?.lunch || false}
        onChange={() => handleMonthlyChange("lunch")}
      />
      Lunch
    </label>

    <label style={{ marginLeft: "10px" }}>
      <input
        type="checkbox"
        checked={monthlyPlan?.dinner || false}
        onChange={() => handleMonthlyChange("dinner")}
      />
      Dinner
    </label>

    <br />

    <button
      onClick={handleMonthlySave}
      style={{
        marginTop: "10px",
        padding: "6px 12px",
        borderRadius: "6px",
        border: "none",
        backgroundColor: "#16a34a",
        color: "white",
        cursor: "pointer"
      }}
    >
      Save Monthly Plan
    </button>
  </div>
)}

      {role === "student" && bill && (
<div
  style={{
    backgroundColor: "#ffffff",
    padding: "15px 20px",
    marginBottom: "20px",
    borderRadius: "10px",
    border: "1px solid #e5e7eb",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap"
  }}
>
  <div>
    <h3 style={{ marginBottom: "5px" }}>💰 Monthly Bill</h3>
    <p style={{ margin: "2px 0" }}>Plan: {bill.type}</p>
  </div>

  <div style={{ display: "flex", gap: "20px" }}>
    <p>Base: ₹{bill.base}</p>
    <p>Meal: ₹{bill.mealCost}</p>
    <p style={{ fontWeight: "bold" }}>Total: ₹{bill.total}</p>
  </div>
</div>
)}

      {menus.length === 0 ? (
        <p>No menu available</p>
      ) : (
        <>
        
        {menus.map((menu) => {
  const day = getDay(menu.date);
  const isSunday = day === "Sunday";

  const userMeal = getUserMeal(menu.date);

  return (
    <div
  key={menu._id}
  style={{
    backgroundColor: isSunday ? "#fff7ed" : "#ffffff",
    padding: "15px",
    marginBottom: "15px",
    borderRadius: "10px",
    border: "1px solid #e5e7eb",
  }}
>
      <p><strong>Date:</strong> {menu.date} ({day})</p>

      <p style={{ margin: "4px 0" }}>🍽️ Breakfast: {menu.breakfast}</p>

      <p style={{ margin: "4px 0" }}>
        🍛 Lunch: {menu.lunch}
        {isSunday && <span style={{ color: "red" }}> Sunday Special</span>}
      </p>

      <p style={{ margin: "4px 0" }}>🌙 Dinner: {menu.dinner}</p>

      {role === "admin" && (
        <>
          <button 
                onClick={() => setEditMenu(menu)}
                style={{
                  marginLeft: "10px",
                  padding: "5px 10px",
                  borderRadius: "6px",
                  border: "none",
                  backgroundColor: "#2563eb",
                  color: "white",
                  cursor: "pointer"
                }}
                >
                  ✏️ Edit
          </button>
          <button
                onClick={() => handleDelete(menu._id)}
                style={{
                marginLeft: "10px",
                padding: "5px 10px",
                borderRadius: "6px",
                border: "none",
                backgroundColor: "#ef4444",
                color: "white",
                cursor: "pointer"
                }}
          >
          Delete
          </button>
        </>
      )}
      
{role === "student" && (
  <div>
    <label>
      <input
  type="checkbox"
  checked={
    selection[menu._id]?.breakfast !== undefined
    ? selection[menu._id]?.breakfast
    : userMeal?.breakfast ?? monthlyPlan?.breakfast ?? false
  }
  onChange={() => handleChange(menu._id, "breakfast")}
/>
      Breakfast
    </label>

    <label>
      <input
  type="checkbox"
  checked={
  selection[menu._id]?.lunch !== undefined
    ? selection[menu._id]?.lunch
    : userMeal?.lunch ?? monthlyPlan?.lunch ?? false
  }
  onChange={() => handleChange(menu._id, "lunch")}
/>
      Lunch
    </label>

    <label>
      <input
  type="checkbox"
  checked={
  selection[menu._id]?.dinner !== undefined
    ? selection[menu._id]?.dinner
    : userMeal?.dinner ?? monthlyPlan?.dinner ?? false
  }
  onChange={() => handleChange(menu._id, "dinner")}
/>
      Dinner
    </label>

    <br />

    <button
  onClick={() => handleSave(menu)}
  style={{
    marginTop: "10px",
    padding: "6px 12px",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "#2563eb",
    color: "white",
    cursor: "pointer"
  }}
>
  Save Selection
</button>
  </div>
)}
    </div>
  );
})}

{editMenu && (
  <div style={{ border: "2px solid blue", padding: "10px", marginTop: "20px" }}>
    <h3>Edit Menu</h3>

    <input
      value={editMenu.breakfast}
      onChange={(e) =>
        setEditMenu({ ...editMenu, breakfast: e.target.value })
      }
      placeholder="Breakfast"
    />

    <input
      value={editMenu.lunch}
      onChange={(e) =>
        setEditMenu({ ...editMenu, lunch: e.target.value })
      }
      placeholder="Lunch"
    />

    <input
      value={editMenu.dinner}
      onChange={(e) =>
        setEditMenu({ ...editMenu, dinner: e.target.value })
      }
      placeholder="Dinner"
    />

    <button onClick={handleUpdate}>Save</button>
  </div>
)}

</>
      )}
    </div>
  );
}

export default Dashboard;