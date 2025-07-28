import { useEffect, useState } from "react"
import { Camera, Upload, ImageIcon, BarChart3 } from "lucide-react"

const AdminDashboard = () => {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/media/stats", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        })
        const data = await res.json()
        console.log("Fetched stats:", data)
        setStats([
          {
            label: "Total Photos",
            value: data.totalPhotos,
            icon: ImageIcon,
            color: "bg-blue-500",
          },
          {
            label: "Categories",
            value: data.totalCategories,
            icon: Camera,
            color: "bg-green-500",
          },
          {
            label: "Recent Uploads",
            value: data.recentUploads,
            icon: Upload,
            color: "bg-purple-500",
          },
          {
            label: "Views This Month",
            value: data.monthlyViews,
            icon: BarChart3,
            color: "bg-orange-500",
          },
        ])
      } catch (err) {
        console.error("Failed to fetch dashboard stats:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#102C57]">Dashboard</h1>
        <p className="text-[#102C57]/60 mt-2">
          Welcome back! Here's an overview of your photography portfolio.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading ? (
          Array.from({ length: 4 }).map((_, idx) => (
            <div
              key={idx}
              className="bg-white animate-pulse rounded-xl shadow-sm p-6 border border-[#EADBC8]/30 h-[100px]"
            />
          ))
        ) : (
          stats?.map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-xl shadow-sm p-6 border border-[#EADBC8]/30"
            >
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
          ))
        )}
      </div>

      {/* Placeholder for Recent Activity (optional future integration) */}
      <div className="bg-white rounded-xl shadow-sm border border-[#EADBC8]/30">
        <div className="p-6 border-b border-[#EADBC8]/30">
          <h2 className="text-xl font-semibold text-[#102C57]">Recent Activity</h2>
        </div>
        <div className="p-6 text-[#102C57]/60">
          Coming soon: Upload logs, category edits, and view analytics.
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
