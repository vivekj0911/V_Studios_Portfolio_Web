import AdminLayout from "../../components/AdminLayout"
import { Camera, Upload, ImageIcon, BarChart3 } from "lucide-react"

const stats = [
  { label: "Total Photos", value: "1,247", icon: ImageIcon, color: "bg-blue-500" },
  { label: "Categories", value: "8", icon: Camera, color: "bg-green-500" },
  { label: "Recent Uploads", value: "23", icon: Upload, color: "bg-purple-500" },
  { label: "Views This Month", value: "5,432", icon: BarChart3, color: "bg-orange-500" },
]

const AdminDashboard = ({ navigateTo }) => {
  return (
    <AdminLayout navigateTo={navigateTo}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-[#102C57]">Dashboard</h1>
          <p className="text-[#102C57]/60 mt-2">Welcome back! Here's an overview of your photography portfolio.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl shadow-sm p-6 border border-[#EADBC8]/30">
              <div className="flex items-center">
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-[#102C57]/60">{stat.label}</p>
                  <p className="text-2xl font-bold text-[#102C57]">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-[#EADBC8]/30">
          <div className="p-6 border-b border-[#EADBC8]/30">
            <h2 className="text-xl font-semibold text-[#102C57]">Recent Activity</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-[#102C57]/80">Uploaded 5 new wedding photos to "Priya & Rohit" collection</span>
                <span className="text-sm text-[#102C57]/50">2 hours ago</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-[#102C57]/80">Created new category "Corporate Events"</span>
                <span className="text-sm text-[#102C57]/50">1 day ago</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-[#102C57]/80">Updated portfolio description</span>
                <span className="text-sm text-[#102C57]/50">3 days ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

export default AdminDashboard
