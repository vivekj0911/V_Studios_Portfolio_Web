"use client"

import { useState } from "react"
import { Camera, Eye, EyeOff } from "lucide-react"

const AdminLogin = ({ navigateTo }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate login
    setTimeout(() => {
      setIsLoading(false)
      navigateTo("admin-dashboard")
    }, 1000)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <div className="min-h-screen bg-[#FEFAF6] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center">
            <Camera className="h-12 w-12 text-[#102C57]" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-[#102C57]">Admin Login</h2>
          <p className="mt-2 text-sm text-[#102C57]/60">Access your photography dashboard</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#102C57] mb-2">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-[#EADBC8] rounded-lg focus:ring-2 focus:ring-[#DAC0A3] focus:border-transparent transition-colors"
                placeholder="admin@arjunmehta.photography"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#102C57] mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-[#EADBC8] rounded-lg focus:ring-2 focus:ring-[#DAC0A3] focus:border-transparent transition-colors pr-12"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#102C57]/60 hover:text-[#102C57]"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#102C57] text-white py-3 px-6 rounded-lg hover:bg-[#102C57]/90 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin
