// src/components/admin/AdminLayout.jsx

import { useState } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import {
  Camera,
  LayoutDashboard,
  Upload,
  ImageIcon,
  LogOut,
  Menu,
  X,
} from "lucide-react"

const navigation = [
  { name: "Dashboard", page: "dashboard", icon: LayoutDashboard },
  { name: "Upload Media", page: "upload", icon: Upload },
  { name: "Manage Media", page: "manage", icon: ImageIcon },
]

const AdminLayout = () => {
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleNavigate = (page) => {
    navigate(`/admin/${page}`)
    setSidebarOpen(false)
  }

  const handleLogout = () => {
    localStorage.removeItem("adminToken")
    navigate("/admin/login")
  }

  return (
    <div className="min-h-screen bg-[#FEFAF6]">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? "block" : "hidden"}`}>
        <div className="fixed inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
        <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-xl">
          <div className="flex items-center justify-between p-4 border-b border-[#EADBC8]/30">
            <div className="flex items-center space-x-2">
              <Camera className="h-6 w-6 text-[#102C57]" />
              <span className="font-semibold text-[#102C57]">Admin Panel</span>
            </div>
            <button onClick={() => setSidebarOpen(false)}>
              <X className="h-6 w-6 text-[#102C57]/60" />
            </button>
          </div>
          <nav className="p-4 space-y-2">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavigate(item.page)}
                className="flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors w-full text-left text-[#102C57]/60 hover:bg-[#EADBC8]/30"
              >
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
              </button>
            ))}
            <button
              onClick={handleLogout}
              className="flex items-center space-x-3 px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 w-full text-left"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </nav>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:left-0 lg:top-0 lg:h-full lg:w-64 lg:bg-white lg:shadow-sm lg:border-r lg:border-[#EADBC8]/30 lg:block">
        <div className="p-6 border-b border-[#EADBC8]/30">
          <div className="flex items-center space-x-2">
            <Camera className="h-6 w-6 text-[#102C57]" />
            <span className="font-semibold text-[#102C57]">Admin Panel</span>
          </div>
        </div>
        <nav className="p-6 space-y-2">
          {navigation.map((item) => (
            <button
              key={item.name}
              onClick={() => handleNavigate(item.page)}
              className="flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors w-full text-left text-[#102C57]/60 hover:bg-[#EADBC8]/30"
            >
              <item.icon className="h-5 w-5" />
              <span>{item.name}</span>
            </button>
          ))}
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 w-full text-left mt-8"
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </nav>
      </div>

      {/* Main content */}
      <div className="lg:ml-64">
        {/* Top bar */}
        <div className="bg-white shadow-sm border-b border-[#EADBC8]/30 px-4 py-4 lg:px-8">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-[#102C57]/60 hover:text-[#102C57]"
            >
              <Menu className="h-6 w-6" />
            </button>
            <div className="flex items-center space-x-4">
              <span className="text-[#102C57]/60">Welcome back, Pramod</span>
            </div>
          </div>
        </div>

        {/* Page content */}
        <div className="p-4 lg:p-8">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default AdminLayout
