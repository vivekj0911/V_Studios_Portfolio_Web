import { useEffect, useState } from "react"
import { Camera, Upload, ImageIcon, BarChart3 } from "lucide-react"

const API_URL = import.meta.env.VITE_API_URL;

const AdminDashboard = () => {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [feedbacks, setFeedbacks] = useState([])
  const [feedbackLoading, setFeedbackLoading] = useState(true)

  const fetchFeedbacks = async () => {
    try {
      const res = await fetch(`${API_URL}/api/feedback`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      })
      const data = await res.json()
      setFeedbacks(data)
    } catch (err) {
      console.error("Failed to fetch feedbacks:", err)
    } finally {
      setFeedbackLoading(false)
    }
  }

  const handleApprovalToggle = async (id, currentStatus) => {
    try {
      const res = await fetch(`${API_URL}/api/feedback/${id}/approve`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
        body: JSON.stringify({ isApproved: !currentStatus }),
      })

      const updated = await res.json()
      setFeedbacks((prev) =>
        prev.map((fb) => (fb._id === id ? updated.data : fb))
      )
    } catch (err) {
      console.error("Failed to update approval:", err)
    }
  }

  useEffect(() => {
    fetchFeedbacks()
  }, [])

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(`${API_URL}/api/media/stats`, {
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

      <div className="bg-white rounded-xl shadow-sm border border-[#EADBC8]/30">
        <div className="p-6 border-b border-[#EADBC8]/30">
          <h2 className="text-xl font-semibold text-[#102C57]">Feedback Approval</h2>
        </div>

        <div className="p-6 space-y-4">
          {feedbackLoading ? (
            <p className="text-[#102C57]/60">Loading feedbacks...</p>
          ) : feedbacks.length === 0 ? (
            <p className="text-[#102C57]/60">No feedbacks submitted yet.</p>
          ) : (
            feedbacks.map((fb) => (
              <div
                key={fb._id}
                className="border border-[#EADBC8]/30 p-4 rounded-lg flex justify-between items-start"
              >
                <div>
                  <p className="font-semibold text-[#102C57]">{fb.name} ({fb.category})</p>
                  <p className="text-[#102C57]/80 text-sm">⭐ {fb.rating}</p>
                  <p className="text-[#102C57]/70 mt-1">{fb.message}</p>
                  <p className="text-xs text-gray-400 mt-1">Submitted: {new Date(fb.createdAt).toLocaleDateString()}</p>
                </div>
                <button
                  onClick={() => handleApprovalToggle(fb._id, fb.isApproved)}
                  className={`text-sm px-4 py-2 rounded-md font-medium ${fb.isApproved
                      ? "bg-red-100 text-red-700 hover:bg-red-200"
                      : "bg-green-100 text-green-700 hover:bg-green-200"
                    }`}
                >
                  {fb.isApproved ? "Reject" : "Approve"}
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
