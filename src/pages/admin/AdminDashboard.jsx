// src/pages/AdminDashboard.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminUpload from "../../components/AdminUploadForm"; // or component location

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate]);

  if (!isAuthenticated) return null;

  return (
    <div>
      <h1 className="text-2xl font-bold text-center my-4">Admin Dashboard</h1>
      <button
        onClick={() => {
          localStorage.removeItem("adminToken");
          navigate("/admin/login");
        }}
        className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded"
      >
        Logout
      </button>

      <AdminUpload />
    </div>
  );
};

export default AdminDashboard;
