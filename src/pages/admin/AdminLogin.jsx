// src/components/admin/AdminLogin.jsx
import { useState, useCallback, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { Camera, Eye, EyeOff, AlertCircle, Loader2, CheckCircle } from "lucide-react"

const API_URL = import.meta.env.VITE_API_URL

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [fieldErrors, setFieldErrors] = useState({})
  const [success, setSuccess] = useState(false)

  const navigate = useNavigate()

  // Memoized validation rules
  const validationRules = useMemo(() => ({
    email: {
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Please enter a valid email address"
    },
    password: {
      required: true,
      minLength: 6,
      message: "Password must be at least 6 characters long"
    }
  }), [])

  // Enhanced error message mapping
  const getErrorMessage = useCallback((error, statusCode) => {
    const errorMessages = {
      // Authentication specific errors
      'Invalid credentials': 'The email or password you entered is incorrect. Please try again.',
      'User not found': 'No account found with this email address. Please check and try again.',
      'Invalid password': 'The password you entered is incorrect. Please try again.',
      'Account locked': 'Your account has been temporarily locked. Please contact support.',
      'Account disabled': 'Your account has been disabled. Please contact support.',
      'Too many attempts': 'Too many login attempts. Please wait a few minutes and try again.',
      
      // Network errors
      'Failed to fetch': 'Unable to connect to the server. Please check your internet connection.',
      'Network request failed': 'Network error occurred. Please try again.',
      
      // Server errors
      'Internal server error': 'Server error occurred. Please try again later.',
      'Service unavailable': 'Service is temporarily unavailable. Please try again later.',
    }

    // Handle by status code
    if (statusCode) {
      switch (statusCode) {
        case 400:
          return 'Please check your email and password and try again.'
        case 401:
          return 'Invalid email or password. Please check your credentials.'
        case 403:
          return 'Access denied. You do not have permission to access this area.'
        case 404:
          return 'Login service not found. Please contact support.'
        case 429:
          return 'Too many login attempts. Please wait a few minutes before trying again.'
        case 500:
          return 'Server error occurred. Please try again later.'
        default:
          break
      }
    }

    // Check for specific error messages
    const lowerError = error.toLowerCase()
    for (const [key, message] of Object.entries(errorMessages)) {
      if (lowerError.includes(key.toLowerCase())) {
        return message
      }
    }

    // Default fallback
    return 'Login failed. Please check your credentials and try again.'
  }, [])

  // Client-side validation
  const validateField = useCallback((name, value) => {
    const rule = validationRules[name]
    if (!rule) return null

    if (rule.required && !value.trim()) {
      return `${name === 'email' ? 'Email' : 'Password'} is required`
    }

    if (name === 'email' && value && !rule.pattern.test(value)) {
      return rule.message
    }

    if (name === 'password' && value && value.length < rule.minLength) {
      return rule.message
    }

    return null
  }, [validationRules])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setFieldErrors({})
    setSuccess(false)

    // Client-side validation
    const errors = {}
    Object.keys(formData).forEach(field => {
      const fieldError = validateField(field, formData[field])
      if (fieldError) {
        errors[field] = fieldError
      }
    })

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors)
      setIsLoading(false)
      return
    }

    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout

      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.email,
          password: formData.password,
        }),
        signal: controller.signal
      })

      clearTimeout(timeoutId)

      let data
      try {
        data = await res.json()
      } catch {
        throw new Error('Invalid server response')
      }

      if (!res.ok) {
        throw new Error(data.message || `Server error (${res.status})`)
      }

      if (!data.token) {
        throw new Error('No authentication token received')
      }

      // Success animation
      setSuccess(true)
      localStorage.setItem("adminToken", data.token)

      // Small delay for success animation
      setTimeout(() => {
        navigate("/admin/dashboard")
      }, 1000)

    } catch (err) {
      if (err.name === 'AbortError') {
        setError('Request timed out. Please check your connection and try again.')
      } else {
        const statusCode = err.message.match(/\((\d+)\)/)?.[1]
        setError(getErrorMessage(err.message, parseInt(statusCode)))
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = useCallback((e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear field error when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors(prev => ({ ...prev, [name]: null }))
    }
    
    // Clear general error
    if (error) {
      setError(null)
    }
  }, [fieldErrors, error])

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword(prev => !prev)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FEFAF6] via-[#FEFAF6] to-[#F5F1E8] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center">
            <div className="p-3 bg-gradient-to-r from-[#102C57] to-[#1a3a6b] rounded-full shadow-lg">
              <Camera className="h-8 w-8 text-white" />
            </div>
          </div>
          <h2 className="mt-6 text-3xl font-bold text-[#102C57]">Admin Login</h2>
          <p className="mt-2 text-sm text-[#102C57]/60">Access your photography dashboard</p>
        </div>

        {/* Login Form */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-[#EADBC8]/20 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* General Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-3">
                <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-medium text-red-800">Login Failed</h4>
                  <p className="text-sm text-red-700 mt-1">{error}</p>
                </div>
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <p className="text-sm font-medium text-green-800">Login successful! Redirecting...</p>
              </div>
            )}

            {/* Email Field */}
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
                className={`
                  w-full px-4 py-3 border rounded-lg transition-all duration-200
                  ${fieldErrors.email 
                    ? "border-red-300 focus:ring-2 focus:ring-red-200 focus:border-red-400" 
                    : "border-[#EADBC8] focus:ring-2 focus:ring-[#DAC0A3] focus:border-transparent"
                  }
                  ${success ? "border-green-300" : ""}
                `}
                placeholder="Enter your email address"
                disabled={isLoading || success}
              />
              {fieldErrors.email && (
                <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
                  <AlertCircle className="h-4 w-4" />
                  <span>{fieldErrors.email}</span>
                </p>
              )}
            </div>

            {/* Password Field */}
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
                  className={`
                    w-full px-4 py-3 pr-12 border rounded-lg transition-all duration-200
                    ${fieldErrors.password 
                      ? "border-red-300 focus:ring-2 focus:ring-red-200 focus:border-red-400" 
                      : "border-[#EADBC8] focus:ring-2 focus:ring-[#DAC0A3] focus:border-transparent"
                    }
                    ${success ? "border-green-300" : ""}
                  `}
                  placeholder="Enter your password"
                  disabled={isLoading || success}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#102C57]/60 hover:text-[#102C57] p-1 transition-colors duration-200"
                  disabled={isLoading || success}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {fieldErrors.password && (
                <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
                  <AlertCircle className="h-4 w-4" />
                  <span>{fieldErrors.password}</span>
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || success}
              className={`
                w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 transform
                ${success 
                  ? "bg-green-600 text-white" 
                  : "bg-gradient-to-r from-[#102C57] to-[#1a3a6b] text-white hover:from-[#102C57]/90 hover:to-[#1a3a6b]/90 hover:scale-[1.02] active:scale-[0.98]"
                }
                disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
              `}
            >
              {isLoading && <Loader2 className="inline-block w-4 h-4 mr-2 animate-spin" />}
              {success && <CheckCircle className="inline-block w-4 h-4 mr-2" />}
              {success ? "Success!" : isLoading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          {/* Additional Help */}
          <div className="mt-6 text-center">
            <p className="text-xs text-[#102C57]/40">
              Having trouble? Contact your system administrator
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin
