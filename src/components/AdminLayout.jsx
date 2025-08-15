// src/components/admin/AdminLayout.jsx
import { useState, useCallback, useMemo } from "react"
import { Outlet, useNavigate, useLocation } from "react-router-dom"
import {
  Camera,
  LayoutDashboard,
  Upload,
  ImageIcon,
  LogOut,
  Menu,
  X,
  ChevronRight,
  User
} from "lucide-react"

const AdminLayout = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Memoize navigation items to prevent recreating on every render
  const navigation = useMemo(() => [
    { name: "Dashboard", page: "dashboard", icon: LayoutDashboard, path: "/admin/dashboard" },
    { name: "Upload Media", page: "upload", icon: Upload, path: "/admin/upload" },
    { name: "Manage Media", page: "manage", icon: ImageIcon, path: "/admin/manage" },
  ], [])

  // Get current page info for breadcrumb
  const currentPage = useMemo(() => {
    const current = navigation.find(item => location.pathname.includes(item.page))
    return current || { name: "Dashboard", page: "dashboard" }
  }, [location.pathname, navigation])

  // Memoized handlers to prevent unnecessary re-renders
  const handleNavigate = useCallback((page) => {
    navigate(`/admin/${page}`)
    setSidebarOpen(false)
  }, [navigate])

  const handleLogout = useCallback(() => {
    localStorage.removeItem("adminToken")
    navigate("/", { replace: true });
  }, [navigate])

  const toggleSidebar = useCallback(() => {
    setSidebarOpen(prev => !prev)
  }, [])

  const closeSidebar = useCallback(() => {
    setSidebarOpen(false)
  }, [])

  // Check if navigation item is active
  const isActiveNavItem = useCallback((itemPath) => {
    return location.pathname === itemPath || location.pathname.includes(itemPath.split('/').pop())
  }, [location.pathname])

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FEFAF6] via-[#FEFAF6] to-[#F5F1E8]">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden transition-opacity duration-300"
          onClick={closeSidebar}
        />
      )}

      {/* Mobile sidebar - slimmed down */}
      <div className={`
        fixed left-0 top-0 z-50 h-full w-64 transform transition-transform duration-300 ease-in-out lg:hidden
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        <div className="h-full bg-white/95 backdrop-blur-xl shadow-2xl border-r border-[#EADBC8]/20">
          <div className="flex items-center justify-between p-4 border-b border-[#EADBC8]/20 bg-gradient-to-r from-[#102C57] to-[#1a3a6b]">
            <div className="flex items-center space-x-2">
              <Camera className="h-5 w-5 text-white" />
              <span className="font-semibold text-white">Admin Panel</span>
            </div>
            <button 
              onClick={closeSidebar}
              className="p-1 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          
          <nav className="p-4 space-y-2">
            {navigation.map((item) => {
              const isActive = isActiveNavItem(item.path)
              return (
                <button
                  key={item.name}
                  onClick={() => handleNavigate(item.page)}
                  className={`
                    flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200 w-full text-left group
                    ${isActive 
                      ? "bg-gradient-to-r from-[#102C57] to-[#1a3a6b] text-white shadow-md" 
                      : "text-[#102C57]/70 hover:bg-[#EADBC8]/30 hover:text-[#102C57]"
                    }
                  `}
                >
                  <item.icon className="h-4 w-4" />
                  <span className="font-medium text-sm">{item.name}</span>
                </button>
              )
            })}
            
            <div className="pt-4 mt-4 border-t border-[#EADBC8]/20">
              <button
                onClick={handleLogout}
                className="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-red-600 hover:bg-red-50 hover:text-red-700 w-full text-left transition-all duration-200"
              >
                <LogOut className="h-4 w-4" />
                <span className="font-medium text-sm">Logout</span>
              </button>
            </div>
          </nav>
        </div>
      </div>

      {/* Desktop sidebar - slimmed down */}
      <div className="hidden lg:fixed lg:left-0 lg:top-0 lg:h-full lg:w-64 lg:block">
        <div className="h-full bg-white/80 backdrop-blur-xl shadow-lg border-r border-[#EADBC8]/20">
          <div className="p-4 border-b border-[#EADBC8]/20 bg-gradient-to-r from-[#102C57] to-[#1a3a6b]">
            <div className="flex items-center space-x-2">
              <Camera className="h-5 w-5 text-white" />
              <span className="font-semibold text-white">Admin Panel</span>
            </div>
          </div>
          
          <nav className="p-4 space-y-2">
            {navigation.map((item) => {
              const isActive = isActiveNavItem(item.path)
              return (
                <button
                  key={item.name}
                  onClick={() => handleNavigate(item.page)}
                  className={`
                    flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200 w-full text-left group
                    ${isActive 
                      ? "bg-gradient-to-r from-[#102C57] to-[#1a3a6b] text-white shadow-md" 
                      : "text-[#102C57]/70 hover:bg-[#EADBC8]/30 hover:text-[#102C57]"
                    }
                  `}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="font-medium">{item.name}</span>
                </button>
              )
            })}
            
            <div className="pt-4 mt-6 border-t border-[#EADBC8]/20">
              <button
                onClick={handleLogout}
                className="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-red-600 hover:bg-red-50 hover:text-red-700 w-full text-left transition-all duration-200"
              >
                <LogOut className="h-5 w-5" />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:ml-64">
        {/* Simplified Top bar */}
        <div className="bg-white/90 backdrop-blur-xl shadow-sm border-b border-[#EADBC8]/20 sticky top-0 z-30">
          <div className="px-4 py-4 lg:px-8">
            <div className="flex items-center justify-between">
              {/* Left section */}
              <div className="flex items-center space-x-4">
                <button
                  onClick={toggleSidebar}
                  className="lg:hidden p-2 text-[#102C57]/60 hover:text-[#102C57] hover:bg-[#EADBC8]/20 rounded-lg transition-all duration-200"
                >
                  <Menu className="h-5 w-5" />
                </button>
                
                {/* Breadcrumb */}
                <div className="flex items-center space-x-2 text-sm">
                  <span className="text-[#102C57]/40">Admin</span>
                  <ChevronRight className="h-4 w-4 text-[#102C57]/40" />
                  <span className="text-[#102C57] font-medium">{currentPage.name}</span>
                </div>
              </div>

              {/* Right section - simplified */}
              <div className="flex items-center space-x-3">
                {/* User Profile */}
                <div className="flex items-center space-x-3 bg-gradient-to-r from-[#102C57]/5 to-[#EADBC8]/20 rounded-lg px-3 py-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-[#102C57] to-[#1a3a6b] rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <div className="hidden sm:block">
                    <p className="text-sm font-medium text-[#102C57]">Pramod</p>
                    <p className="text-xs text-[#102C57]/60">Administrator</p>
                  </div>
                </div>
              </div>
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
