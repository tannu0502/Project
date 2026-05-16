import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import API from "../services/api";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
      const response = await API.post("/auth/login", formData);

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      alert("Login successful"); 
      window.location.href = "/dashboard";
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow mx-auto" style={{ maxWidth: "500px" }}>
        <h2 className="text-center mb-4">Login</h2>

        <form onSubmit={handleSubmit}>
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

          <button className="btn btn-success w-100">Login</button>
          <p className="text-center mt-3">
              New user? <Link to="/signup">Create an account</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;