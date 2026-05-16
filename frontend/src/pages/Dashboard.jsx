import { useEffect, useState } from "react";
import API from "../services/api";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

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
      alert(error.response?.data?.message || "Failed to load tasks");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);
  const updateStatus = async (taskId, status) => {
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

    alert("Task status updated");
  } catch (error) {
    alert(error.response?.data?.message || "Update failed");
  }
};

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.status === "DONE").length;
  const pendingTasks = tasks.filter((task) => task.status !== "DONE").length;

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Dashboard</h2>

      <div className="alert alert-primary">
        Welcome, {user?.name} ({user?.role})
      </div>

      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card p-3 shadow">
            <h5>Total Tasks</h5>
            <h2>{totalTasks}</h2>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card p-3 shadow">
            <h5>Completed</h5>
            <h2>{completedTasks}</h2>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card p-3 shadow">
            <h5>Pending</h5>
            <h2>{pendingTasks}</h2>
          </div>
        </div>
      </div>

      <h4>All Tasks</h4>

      {tasks.map((task) => (
        <div className="card p-3 mb-3 shadow" key={task.id}>
          <h5>{task.title}</h5>
          <p>{task.description}</p>
          <div className="mb-3">
  <b>Status:</b> {task.status}

  <div className="mt-2 d-flex gap-2">
    <button
      className="btn btn-warning btn-sm"
      onClick={() => updateStatus(task.id, "IN_PROGRESS")}
    >
      In Progress
    </button>

    <button
      className="btn btn-success btn-sm"
      onClick={() => updateStatus(task.id, "DONE")}
    >
      Done
    </button>
  </div>
</div>
          <p>
            <b>Due Date:</b> {new Date(task.dueDate).toDateString()}
          </p>
          <p>
            <b>Assigned To:</b> {task.assignedTo?.name}
          </p>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;