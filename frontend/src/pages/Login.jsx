import { useState } from "react";
import API from "../services/api";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post("/auth/login", formData);

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      window.location.href = "/dashboard";
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#111111] text-white flex">
      <div className="hidden lg:flex w-1/2 bg-[#1f1f1f] p-14 flex-col justify-between border-r border-zinc-800">
        <div>
          <h1 className="text-4xl font-bold">
            <span className="text-indigo-400">Task</span>Flow
          </h1>

          <p className="text-zinc-400 mt-4 text-lg max-w-md">
            A secure workspace for teams to manage projects, assign tasks,
            and track delivery progress.
          </p>
        </div>

        <div className="space-y-5">
          <div className="bg-[#2c2c29] border border-zinc-700 rounded-3xl p-6">
            <h3 className="text-xl font-semibold">Role-based Access</h3>
            <p className="text-zinc-400 mt-2">
              Admins manage projects and tasks, members only access assigned work.
            </p>
          </div>

          <div className="bg-[#2c2c29] border border-zinc-700 rounded-3xl p-6">
            <h3 className="text-xl font-semibold">Live Progress Tracking</h3>
            <p className="text-zinc-400 mt-2">
              Track completed, pending, in-progress, and overdue tasks.
            </p>
          </div>

          <div className="bg-[#2c2c29] border border-zinc-700 rounded-3xl p-6">
            <h3 className="text-xl font-semibold">Secure Team Login</h3>
            <p className="text-zinc-400 mt-2">
              Members login only with credentials created by the admin.
            </p>
          </div>
        </div>

        <p className="text-zinc-500 text-sm">
          © 2026 TaskFlow. Team productivity platform.
        </p>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center px-6">
        <div className="w-full max-w-md">
          <div className="mb-10">
            <p className="text-indigo-400 font-semibold mb-3">
              Welcome back
            </p>

            <h2 className="text-4xl font-bold">
              Sign in to your workspace
            </h2>

            <p className="text-zinc-400 mt-3">
              Use your company email and password to continue.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-sm text-zinc-400">
                Company Email
              </label>

              <input
                type="email"
                name="email"
                placeholder="name@company.com"
                className="mt-2 w-full bg-[#1f1f1f] border border-zinc-700 rounded-2xl px-4 py-4 text-white outline-none focus:border-indigo-400"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="text-sm text-zinc-400">
                Password
              </label>

              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                className="mt-2 w-full bg-[#1f1f1f] border border-zinc-700 rounded-2xl px-4 py-4 text-white outline-none focus:border-indigo-400"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <button className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-4 rounded-2xl font-semibold text-lg">
              Sign in
            </button>
          </form>

          <div className="mt-6 bg-[#1f1f1f] border border-zinc-800 rounded-2xl p-4">
            <p className="text-sm text-zinc-400">
              New member? Contact your project admin to receive login credentials.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;