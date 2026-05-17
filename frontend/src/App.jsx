import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Projects from "./pages/Projects";
import Dashboard from "./pages/Dashboard";
import MyTasks from "./pages/MyTasks";
import OverdueTasks from "./pages/OverdueTasks";
function App() {
  const token = localStorage.getItem("token");

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Navigate to={token ? "/dashboard" : "/login"} />
          }
        />

        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />
        <Route
        path="/projects"
        element={token ? <Projects /> : <Navigate to="/login" />}
        />
        <Route
          path="/dashboard"
          element={
            token ? <Dashboard /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/my-tasks"
          element={token ? <MyTasks /> : <Navigate to="/login" />}
        />
        <Route
          path="/overdue"
          element={token ? <OverdueTasks /> : <Navigate to="/login" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;