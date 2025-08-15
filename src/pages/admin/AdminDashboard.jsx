import { useEffect, useState, useCallback, useMemo } from "react"
import { Camera, Upload, Image, BarChart3, RefreshCw, AlertCircle, CheckCircle2, XCircle } from "lucide-react"

// Configuration
const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_URL || '',
  timeout: 10000,
}

// Custom hook for API calls
const useApiCall = (endpoint, dependencies = []) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const makeRequest = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      
      const token = localStorage.getItem("adminToken")
      if (!token) throw new Error("Authentication token not found")

      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.timeout)

      const response = await fetch(`${API_CONFIG.baseURL}${endpoint}`, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const result = await response.json()
      setData(result)
      return result
    } catch (err) {
      if (err.name === 'AbortError') {
        setError('Request timed out. Please try again.')
      } else {
        setError(err.message)
      }
      throw err
    } finally {
      setLoading(false)
    }
  }, [endpoint])

  // Auto-fetch on mount and dependency changes
  useEffect(() => {
    makeRequest()
  }, [makeRequest, ...dependencies])

  return { data, loading, error, refetch: makeRequest }
}

// Loading skeleton components
const StatSkeleton = () => (
  <div className="bg-white rounded-xl shadow-sm p-6 border border-[#EADBC8]/30 animate-pulse">
    <div className="flex items-center">
      <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
      <div className="ml-4 space-y-2">
        <div className="w-24 h-4 bg-gray-200 rounded"></div>
        <div className="w-16 h-6 bg-gray-200 rounded"></div>
      </div>
    </div>
  </div>
)

const FeedbackSkeleton = () => (
  <div className="border border-[#EADBC8]/30 p-4 rounded-lg animate-pulse">
    <div className="flex justify-between items-start">
      <div className="space-y-2 flex-1">
        <div className="w-48 h-5 bg-gray-200 rounded"></div>
        <div className="w-24 h-4 bg-gray-200 rounded"></div>
        <div className="w-full h-4 bg-gray-200 rounded"></div>
        <div className="w-32 h-3 bg-gray-200 rounded"></div>
      </div>
      <div className="w-20 h-8 bg-gray-200 rounded-md"></div>
    </div>
  </div>
)

// Error component
const ErrorMessage = ({ message, onRetry }) => (
  <div className="flex items-center justify-between p-4 bg-red-50 border border-red-200 rounded-lg">
    <div className="flex items-center">
      <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
      <p className="text-red-700">{message}</p>
    </div>
    {onRetry && (
      <button
        onClick={onRetry}
        className="flex items-center px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
      >
        <RefreshCw className="h-4 w-4 mr-1" />
        Retry
      </button>
    )}
  </div>
)

// Success toast component
const SuccessToast = ({ message, show, onHide }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onHide, 3000)
      return () => clearTimeout(timer)
    }
  }, [show, onHide])

  if (!show) return null

  return (
    <div className="fixed top-4 right-4 bg-green-50 border border-green-200 rounded-lg p-4 shadow-lg z-50 animate-in slide-in-from-right">
      <div className="flex items-center">
        <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
        <p className="text-green-700">{message}</p>
      </div>
    </div>
  )
}

const AdminDashboard = () => {
  // State management
  const [feedbacks, setFeedbacks] = useState([])
  const [updatingFeedback, setUpdatingFeedback] = useState(null)
  const [showSuccessToast, setShowSuccessToast] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  // API calls - now stable and won't cause re-renders
  const { data: statsData, loading: statsLoading, error: statsError, refetch: refetchStats } = useApiCall('/api/media/stats')
  const { data: feedbackData, loading: feedbackLoading, error: feedbackError, refetch: refetchFeedbacks } = useApiCall('/api/feedback')

  // Memoized stats computation
  const stats = useMemo(() => {
    if (!statsData) return []
    
    return [
      { 
        label: "Total Photos", 
        value: statsData.totalPhotos?.toLocaleString() || 0, 
        icon: Image, 
        color: "bg-gradient-to-r from-blue-500 to-blue-600",
        change: statsData.photoGrowth || 0
      },
      { 
        label: "Categories", 
        value: statsData.totalCategories || 0, 
        icon: Camera, 
        color: "bg-gradient-to-r from-green-500 to-green-600",
        change: statsData.categoryGrowth || 0
      },
      { 
        label: "Recent Uploads", 
        value: statsData.recentUploads || 0, 
        icon: Upload, 
        color: "bg-gradient-to-r from-purple-500 to-purple-600",
        change: statsData.uploadGrowth || 0
      },
      { 
        label: "Monthly Views", 
        value: statsData.monthlyViews?.toLocaleString() || 0, 
        icon: BarChart3, 
        color: "bg-gradient-to-r from-orange-500 to-orange-600",
        change: statsData.viewGrowth || 0
      },
    ]
  }, [statsData])

  // Update feedbacks when data changes (only once)
  useEffect(() => {
    if (feedbackData && Array.isArray(feedbackData)) {
      setFeedbacks(feedbackData)
    }
  }, [feedbackData])

  // Removed the problematic Promise.allSettled useEffect that was causing re-renders

  // Optimized approval toggle with optimistic updates
  const handleApprovalToggle = useCallback(async (id, currentStatus) => {
    const originalFeedback = feedbacks.find(fb => fb._id === id)
    if (!originalFeedback) return

    // Optimistic update
    setFeedbacks(prev => 
      prev.map(fb => fb._id === id ? { ...fb, isApproved: !currentStatus } : fb)
    )
    setUpdatingFeedback(id)

    try {
      const token = localStorage.getItem("adminToken")
      if (!token) throw new Error("Authentication token not found")

      const response = await fetch(`${API_CONFIG.baseURL}/api/feedback/${id}/approve`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ isApproved: !currentStatus }),
      })

      if (!response.ok) throw new Error(`Failed to update approval: ${response.statusText}`)

      const result = await response.json()
      setFeedbacks(prev => 
        prev.map(fb => fb._id === id ? result.data : fb)
      )

      // Show success message
      setSuccessMessage(`Feedback ${!currentStatus ? 'approved' : 'rejected'} successfully`)
      setShowSuccessToast(true)

    } catch (error) {
      // Revert optimistic update on error
      setFeedbacks(prev => 
        prev.map(fb => fb._id === id ? originalFeedback : fb)
      )
      console.error('Failed to update feedback:', error.message)
    } finally {
      setUpdatingFeedback(null)
    }
  }, [feedbacks])

  // Memoized feedback rendering
  const renderedFeedbacks = useMemo(() => {
    return feedbacks.map((fb) => (
      <div
        key={fb._id}
        className="border border-[#EADBC8]/30 p-4 rounded-lg hover:shadow-md transition-all duration-200 bg-gradient-to-r from-white to-gray-50"
      >
        <div className="flex justify-between items-start">
          <div className="flex-1 mr-4">
            <div className="flex items-center gap-2 mb-2">
              <p className="font-semibold text-[#102C57]">{fb.name}</p>
              <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                {fb.category}
              </span>
              {fb.isApproved && (
                <CheckCircle2 className="h-4 w-4 text-green-500" />
              )}
            </div>
            
            <div className="flex items-center gap-1 mb-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className={`text-sm ${i < fb.rating ? 'text-yellow-400' : 'text-gray-300'}`}>
                  ⭐
                </span>
              ))}
              <span className="text-sm text-[#102C57]/60 ml-1">({fb.rating}/5)</span>
            </div>
            
            <p className="text-[#102C57]/70 text-sm leading-relaxed mb-2">{fb.message}</p>
            <p className="text-xs text-gray-400">
              {new Date(fb.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>
          
          <button
            onClick={() => handleApprovalToggle(fb._id, fb.isApproved)}
            disabled={updatingFeedback === fb._id}
            className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium text-sm transition-all duration-200 min-w-[100px] justify-center ${
              fb.isApproved
                ? "bg-red-100 text-red-700 hover:bg-red-200 disabled:bg-red-50"
                : "bg-green-100 text-green-700 hover:bg-green-200 disabled:bg-green-50"
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {updatingFeedback === fb._id ? (
              <RefreshCw className="h-4 w-4 animate-spin" />
            ) : fb.isApproved ? (
              <>
                <XCircle className="h-4 w-4" />
                Reject
              </>
            ) : (
              <>
                <CheckCircle2 className="h-4 w-4" />
                Approve
              </>
            )}
          </button>
        </div>
      </div>
    ))
  }, [feedbacks, updatingFeedback, handleApprovalToggle])

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Success Toast */}
      <SuccessToast 
        message={successMessage}
        show={showSuccessToast}
        onHide={() => setShowSuccessToast(false)}
      />

      {/* Header */}
      <div className="bg-gradient-to-r from-[#102C57] to-[#1e4d72] rounded-xl p-6 text-white">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-white/80 mt-2">
          Monitor your photography portfolio performance and manage feedback
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsLoading ? (
          Array.from({ length: 4 }).map((_, idx) => <StatSkeleton key={idx} />)
        ) : statsError ? (
          <div className="col-span-full">
            <ErrorMessage message={statsError} onRetry={refetchStats} />
          </div>
        ) : (
          stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-xl shadow-sm p-6 border border-[#EADBC8]/30 hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-center">
                <div className={`p-3 rounded-lg ${stat.color} shadow-lg`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4 flex-1">
                  <p className="text-sm font-medium text-[#102C57]/60">{stat.label}</p>
                  <p className="text-2xl font-bold text-[#102C57]">{stat.value}</p>
                  {stat.change !== undefined && (
                    <p className={`text-xs ${stat.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.change >= 0 ? '↗' : '↘'} {Math.abs(stat.change)}% from last month
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Feedback Management */}
      <div className="bg-white rounded-xl shadow-sm border border-[#EADBC8]/30 overflow-hidden">
        <div className="p-6 border-b border-[#EADBC8]/30 bg-gray-50">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-[#102C57]">Feedback Management</h2>
            <button
              onClick={refetchFeedbacks}
              className="flex items-center gap-2 px-3 py-2 text-sm bg-[#102C57] text-white rounded-md hover:bg-[#102C57]/90 transition-colors"
            >
              <RefreshCw className="h-4 w-4" />
              Refresh
            </button>
          </div>
        </div>

        <div className="p-6">
          {feedbackLoading ? (
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, idx) => <FeedbackSkeleton key={idx} />)}
            </div>
          ) : feedbackError ? (
            <ErrorMessage message={feedbackError} onRetry={refetchFeedbacks} />
          ) : feedbacks.length === 0 ? (
            <div className="text-center py-12">
              <Image className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-[#102C57]/60 text-lg">No feedback submissions yet</p>
              <p className="text-[#102C57]/40 text-sm">Check back later for customer feedback</p>
            </div>
          ) : (
            <div className="space-y-4">
              {renderedFeedbacks}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard