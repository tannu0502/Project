import { useEffect, useState } from "react";
import API from "../services/api";
import CreateTaskModal from "../components/CreateTaskModal";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [showCreateTask, setShowCreateTask] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await API.get("/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTasks(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateTaskStatus = async (taskId, status) => {
    try {
      const token = localStorage.getItem("token");

      await API.put(
        `/tasks/${taskId}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchTasks();
    } catch (error) {
      alert(error.response?.data?.message || "Status update failed");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.status === "DONE").length;
  const inProgressTasks = tasks.filter(
    (task) => task.status === "IN_PROGRESS"
  ).length;
  const overdueTasks = tasks.filter(
    (task) => new Date(task.dueDate) < new Date() && task.status !== "DONE"
  ).length;

  return (
    <div className="flex bg-[#1f1f1f] min-h-screen">
      <Sidebar user={user} />

      <div className="flex-1">
        <Topbar user={user} logout={logout} />

        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl text-white font-bold">Dashboard</h1>

            {user?.role === "ADMIN" && (
              <button
                onClick={() => setShowCreateTask(true)}
                className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold"
              >
                + New Task
              </button>
            )}
          </div>

          <div className="grid grid-cols-4 gap-6 mb-10">
            <div className="bg-[#2c2c29] rounded-3xl p-6 border border-zinc-700">
              <h3 className="text-zinc-400 text-lg">Total Tasks</h3>
              <h1 className="text-5xl text-white mt-4">{totalTasks}</h1>
            </div>

            <div className="bg-[#2c2c29] rounded-3xl p-6 border border-zinc-700">
              <h3 className="text-green-400 text-lg">Completed</h3>
              <h1 className="text-5xl text-white mt-4">{completedTasks}</h1>
            </div>

            <div className="bg-[#2c2c29] rounded-3xl p-6 border border-zinc-700">
              <h3 className="text-yellow-400 text-lg">In Progress</h3>
              <h1 className="text-5xl text-white mt-4">{inProgressTasks}</h1>
            </div>

            <div className="bg-[#2c2c29] rounded-3xl p-6 border border-zinc-700">
              <h3 className="text-red-400 text-lg">Overdue</h3>
              <h1 className="text-5xl text-white mt-4">{overdueTasks}</h1>
            </div>
          </div>

          <h2 className="text-2xl text-white font-semibold mb-6">
            {user?.role === "ADMIN" ? "All Tasks" : "My Assigned Tasks"}
          </h2>

          <div className="space-y-5">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="bg-[#2c2c29] border border-zinc-700 rounded-3xl p-6"
              >
                <div className="flex justify-between gap-4">
                  <div>
                    <h3 className="text-2xl text-white font-semibold">
                      {task.title}
                    </h3>

                    <p className="text-zinc-400 mt-2">{task.description}</p>
                  </div>

                  <span
                    className={`px-4 py-2 rounded-full text-sm font-semibold h-fit ${
                      task.status === "DONE"
                        ? "bg-green-200 text-green-700"
                        : task.status === "IN_PROGRESS"
                        ? "bg-yellow-200 text-yellow-700"
                        : "bg-zinc-200 text-zinc-700"
                    }`}
                  >
                    {task.status}
                  </span>
                </div>

                <div className="flex justify-between items-center mt-6">
                  <div className="text-zinc-400">
                    Due: {new Date(task.dueDate).toDateString()}
                  </div>

                  <div className="text-indigo-300">
                    Assigned to: {task.assignedTo?.name}
                  </div>
                </div>

                <div className="flex gap-3 mt-5">
                  {task.status !== "IN_PROGRESS" && task.status !== "DONE" && (
                    <button
                      onClick={() => updateTaskStatus(task.id, "IN_PROGRESS")}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-xl text-sm font-semibold"
                    >
                      Mark In Progress
                    </button>
                  )}

                  {task.status !== "DONE" && (
                    <button
                      onClick={() => updateTaskStatus(task.id, "DONE")}
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl text-sm font-semibold"
                    >
                      Mark Done
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showCreateTask && (
        <CreateTaskModal
          onClose={() => setShowCreateTask(false)}
          onTaskCreated={fetchTasks}
        />
      )}
    </div>
  );
}

export default Dashboard;