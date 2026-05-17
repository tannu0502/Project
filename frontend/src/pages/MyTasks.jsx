import { useEffect, useState } from "react";
import API from "../services/api";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

function MyTasks() {
  const [tasks, setTasks] = useState([]);
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

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="flex bg-[#1f1f1f] min-h-screen">
      <Sidebar user={user} />

      <div className="flex-1">
        <Topbar user={user} logout={logout} />

        <div className="p-8">
          <h1 className="text-4xl text-white font-bold mb-8">
            My Tasks
          </h1>

          <div className="space-y-5">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="bg-[#2c2c29] border border-zinc-700 rounded-3xl p-6"
              >
                <div className="flex justify-between">
                  <div>
                    <h2 className="text-2xl text-white font-semibold">
                      {task.title}
                    </h2>

                    <p className="text-zinc-400 mt-3">
                      {task.description}
                    </p>
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

                <div className="mt-5 text-zinc-400">
                  Due: {new Date(task.dueDate).toDateString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyTasks;