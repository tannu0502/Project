import { useEffect, useState } from "react";
import API from "../services/api";

function CreateTaskModal({ onClose, onTaskCreated }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    projectId: "",
    assignedToId: "",
  });

  const [projects, setProjects] = useState([]);
  const [members, setMembers] = useState([]);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");

      const projectResponse = await API.get("/projects", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const memberResponse = await API.get("/users/members", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProjects(projectResponse.data);
      setMembers(memberResponse.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.name === "projectId" ||
        e.target.name === "assignedToId"
          ? Number(e.target.value)
          : e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await API.post("/tasks", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      onTaskCreated();
      onClose();
    } catch (error) {
      alert(error.response?.data?.message || "Task create failed");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="w-full max-w-lg bg-[#2c2c29] border border-zinc-700 rounded-3xl p-8">
        <h2 className="text-2xl text-white font-bold mb-6">
          Create New Task
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="title"
            placeholder="Task title"
            className="w-full bg-[#1f1f1f] border border-zinc-700 rounded-xl px-4 py-3 text-white outline-none"
            value={formData.title}
            onChange={handleChange}
          />

          <textarea
            name="description"
            placeholder="Task description"
            className="w-full bg-[#1f1f1f] border border-zinc-700 rounded-xl px-4 py-3 text-white outline-none"
            value={formData.description}
            onChange={handleChange}
          />

          <input
            type="date"
            name="dueDate"
            className="w-full bg-[#1f1f1f] border border-zinc-700 rounded-xl px-4 py-3 text-white outline-none"
            value={formData.dueDate}
            onChange={handleChange}
          />

          <div>
            <label className="text-zinc-400 text-sm">
              Select Project
            </label>

            <select
              name="projectId"
              className="w-full mt-2 bg-[#1f1f1f] border border-zinc-700 rounded-xl px-4 py-3 text-white outline-none"
              value={formData.projectId}
              onChange={handleChange}
            >
              <option value="">Choose project</option>

              {projects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-zinc-400 text-sm">
              Assign Member
            </label>

            <select
              name="assignedToId"
              className="w-full mt-2 bg-[#1f1f1f] border border-zinc-700 rounded-xl px-4 py-3 text-white outline-none"
              value={formData.assignedToId}
              onChange={handleChange}
            >
              <option value="">Choose member</option>

              {members.map((member) => (
                <option key={member.id} value={member.id}>
                  {member.name} ({member.email})
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-3 pt-3">
            <button className="flex-1 bg-indigo-500 hover:bg-indigo-600 text-white py-3 rounded-xl">
              Create Task
            </button>

            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-zinc-700 hover:bg-zinc-600 text-white py-3 rounded-xl"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateTaskModal;