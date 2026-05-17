import { useEffect, useState } from "react";
import API from "../services/api";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

function Projects() {
  const [projects, setProjects] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await API.get("/projects", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProjects(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="flex bg-[#1f1f1f] min-h-screen">
      <Sidebar user={user} />

      <div className="flex-1">
        <Topbar user={user} logout={logout} />

        <div className="p-8">
          <h1 className="text-4xl text-white font-bold mb-8">
            Projects
          </h1>

          <div className="grid grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-[#2c2c29] border border-zinc-700 rounded-3xl p-6"
              >
                <h2 className="text-2xl text-white font-semibold">
                  {project.title}
                </h2>

                <p className="text-zinc-400 mt-3">
                  {project.description || "No description"}
                </p>

                <p className="text-indigo-300 mt-5 text-sm">
                  Project ID: {project.id}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Projects;