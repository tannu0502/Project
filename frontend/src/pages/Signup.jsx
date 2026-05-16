import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import API from "../services/api";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "MEMBER",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post("/auth/signup", formData);

      alert(response.data.message);
      navigate("/login");
      setFormData({
        name: "",
        email: "",
        password: "",
        role: "MEMBER",
      });
    } catch (error) {
      alert(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow mx-auto" style={{ maxWidth: "500px" }}>
        <h2 className="text-center mb-4">Signup</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Enter name"
            className="form-control mb-3"
            value={formData.name}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Enter email"
            className="form-control mb-3"
            value={formData.email}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Enter password"
            className="form-control mb-3"
            value={formData.password}
            onChange={handleChange}
          />

          <select
            name="role"
            className="form-control mb-3"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="MEMBER">Member</option>
            <option value="ADMIN">Admin</option>
          </select>

          <button className="btn btn-primary w-100">
            Signup
          </button>
          <p className="text-center mt-3">
          Already have an account? <Link to="/login">Login here</Link>
         </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;