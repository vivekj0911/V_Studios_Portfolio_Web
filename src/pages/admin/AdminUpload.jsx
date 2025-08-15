"use client"

import { useState, useCallback, useMemo, useRef } from "react"
import { Upload, X, Image, Video, AlertCircle, CheckCircle2, FileText, Camera, Loader2 } from "lucide-react"

const API_URL = import.meta.env.VITE_API_URL || ''

const categories = [
  "Baby shoot",
  "Maternity shoot", 
  "Wedding pre-wedding shoot",
  "Corporate Photography",
  "Videos",
  "Product photography",
  "Collage photo frame design",
  "Extras",
]

// File size limits in bytes
const FILE_SIZE_LIMITS = {
  image: 10 * 1024 * 1024, // 10MB for images
  video: 100 * 1024 * 1024, // 100MB for videos
}

// Supported file types
const SUPPORTED_TYPES = {
  image: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'],
  video: ['video/mp4', 'video/mov', 'video/avi', 'video/webm', 'video/quicktime']
}

// Enhanced modal component
const Modal = ({ show, onClose, title, message, type = 'info', actions }) => {
  if (!show) return null

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto mb-4" />
      case 'error':
        return <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
      default:
        return <FileText className="h-12 w-12 text-blue-500 mx-auto mb-4" />
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md mx-4 transform transition-all">
        {getIcon()}
        <h2 className="text-xl font-bold text-[#102C57] mb-2 text-center">{title}</h2>
        <p className="text-[#102C57]/80 mb-6 text-center leading-relaxed">{message}</p>
        <div className="flex gap-3 justify-center">
          {actions || (
            <button
              onClick={onClose}
              className="px-6 py-2 bg-[#102C57] text-white rounded-lg hover:bg-[#102C57]/90 transition-colors font-medium"
            >
              Close
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

// Progress bar component
const ProgressBar = ({ progress, fileName }) => (
  <div className="mb-4">
    <div className="flex justify-between text-sm mb-2">
      <span className="text-[#102C57]/70 truncate">{fileName}</span>
      <span className="text-[#102C57]/60">{progress}%</span>
    </div>
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div 
        className="bg-gradient-to-r from-[#102C57] to-blue-600 h-2 rounded-full transition-all duration-300"
        style={{ width: `${progress}%` }}
      />
    </div>
  </div>
)

// File validation utility
const validateFile = (file) => {
  const isImage = file.type.startsWith('image/')
  const isVideo = file.type.startsWith('video/')
  
  if (!isImage && !isVideo) {
    return { valid: false, error: 'Only image and video files are supported' }
  }

  const fileType = isImage ? 'image' : 'video'
  const maxSize = FILE_SIZE_LIMITS[fileType]
  const supportedTypes = SUPPORTED_TYPES[fileType]

  if (!supportedTypes.includes(file.type)) {
    return { 
      valid: false, 
      error: `${fileType === 'image' ? 'Image' : 'Video'} type not supported. Supported: ${supportedTypes.join(', ')}` 
    }
  }

  if (file.size > maxSize) {
    const maxSizeMB = Math.round(maxSize / (1024 * 1024))
    return { 
      valid: false, 
      error: `${fileType === 'image' ? 'Image' : 'Video'} size must be under ${maxSizeMB}MB` 
    }
  }

  return { valid: true }
}

const AdminUpload = () => {
  // State management
  const [selectedFiles, setSelectedFiles] = useState([])
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
  })
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState({})
  const [dragActive, setDragActive] = useState(false)

  // Modal state
  const [showModal, setShowModal] = useState(false)
  const [modalContent, setModalContent] = useState({ title: "", message: "", type: "info" })

  // Refs
  const fileInputRef = useRef(null)

  // Validation state
  const isFormValid = useMemo(() => {
    return formData.title.trim() && formData.category && selectedFiles.length > 0
  }, [formData.title, formData.category, selectedFiles.length])

  // File statistics
  const fileStats = useMemo(() => {
    const images = selectedFiles.filter(f => f.type.startsWith('image/')).length
    const videos = selectedFiles.filter(f => f.type.startsWith('video/')).length
    const totalSize = selectedFiles.reduce((sum, file) => sum + file.size, 0)
    
    return { images, videos, totalSize: (totalSize / (1024 * 1024)).toFixed(1) }
  }, [selectedFiles])

  // File handling with validation
  const handleFileSelect = useCallback((files) => {
    const validFiles = []
    const errors = []

    Array.from(files).forEach(file => {
      const validation = validateFile(file)
      if (validation.valid) {
        // Check for duplicates
        const isDuplicate = selectedFiles.some(existing => 
          existing.name === file.name && existing.size === file.size
        )
        if (!isDuplicate) {
          validFiles.push(file)
        } else {
          errors.push(`${file.name}: Already selected`)
        }
      } else {
        errors.push(`${file.name}: ${validation.error}`)
      }
    })

    if (validFiles.length > 0) {
      setSelectedFiles(prev => [...prev, ...validFiles])
    }

    if (errors.length > 0) {
      setModalContent({
        title: "File Validation Issues",
        message: errors.join('\n'),
        type: "error"
      })
      setShowModal(true)
    }
  }, [selectedFiles])

  // Input change handler
  const handleFileInputChange = useCallback((e) => {
    if (e.target.files?.length) {
      handleFileSelect(e.target.files)
    }
  }, [handleFileSelect])

  // Drag and drop handlers
  const handleDragOver = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(true)
  }, [])

  const handleDragLeave = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
  }, [])

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files?.length) {
      handleFileSelect(e.dataTransfer.files)
    }
  }, [handleFileSelect])

  // Remove file handler
  const removeFile = useCallback((index) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index))
  }, [])

  // Form submission with progress tracking
  const handleSubmit = useCallback(async () => {
    if (!isFormValid) return

    setIsUploading(true)
    setUploadProgress({})

    try {
      const token = localStorage.getItem("adminToken")
      if (!token) throw new Error("Authentication token not found")

      let successCount = 0
      const totalFiles = selectedFiles.length

      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i]
        const formDataToSend = new FormData()
        
        formDataToSend.append("file", file)
        formDataToSend.append("title", formData.title)
        formDataToSend.append("category", formData.category)
        if (formData.description) {
          formDataToSend.append("description", formData.description)
        }

        // Update progress
        setUploadProgress(prev => ({
          ...prev,
          [file.name]: { progress: 0, status: 'uploading' }
        }))

        try {
          const response = await fetch(`${API_URL}/api/media/upload`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formDataToSend,
          })

          const result = await response.json()
          
          if (!response.ok) {
            throw new Error(result.message || `Upload failed for ${file.name}`)
          }

          // Update success progress
          setUploadProgress(prev => ({
            ...prev,
            [file.name]: { progress: 100, status: 'success' }
          }))
          
          successCount++
        } catch (fileError) {
          setUploadProgress(prev => ({
            ...prev,
            [file.name]: { progress: 0, status: 'error', error: fileError.message }
          }))
        }
      }

      // Show results
      if (successCount === totalFiles) {
        setModalContent({
          title: "Upload Successful!",
          message: `All ${successCount} files uploaded successfully to ${formData.category}`,
          type: "success"
        })
        
        // Reset form
        setSelectedFiles([])
        setFormData({ title: "", category: "", description: "" })
        setUploadProgress({})
      } else {
        setModalContent({
          title: "Partial Upload",
          message: `${successCount} of ${totalFiles} files uploaded successfully. Check individual file status above.`,
          type: "error"
        })
      }
      
      setShowModal(true)

    } catch (error) {
      console.error("Upload failed:", error.message)
      setModalContent({
        title: "Upload Failed",
        message: error.message || "An unexpected error occurred during upload",
        type: "error"
      })
      setShowModal(true)
    } finally {
      setIsUploading(false)
    }
  }, [isFormValid, selectedFiles, formData])

  // File icon helper
  const getFileIcon = useCallback((file) => {
    if (file.type.startsWith("image/")) {
      return <Image className="h-8 w-8 text-blue-500" />
    } else if (file.type.startsWith("video/")) {
      return <Video className="h-8 w-8 text-purple-500" />
    }
    return <FileText className="h-8 w-8 text-gray-500" />
  }, [])

  // Get file status for progress display
  const getFileStatus = useCallback((fileName) => {
    const status = uploadProgress[fileName]
    if (!status) return null

    switch (status.status) {
      case 'uploading':
        return <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
      case 'success':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-500" />
      default:
        return null
    }
  }, [uploadProgress])

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#102C57] to-[#1e4d72] rounded-xl p-6 text-white">
        <div className="flex items-center gap-3 mb-2">
          <Camera className="h-8 w-8" />
          <h1 className="text-3xl font-bold">Upload Media</h1>
        </div>
        <p className="text-white/80">Add new photos and videos to your portfolio. Use the form below to upload files.</p>
        {fileStats.images > 0 || fileStats.videos > 0 ? (
          <div className="mt-3 text-sm bg-white/10 rounded-lg p-3">
            <span>Ready to upload: </span>
            {fileStats.images > 0 && <span>{fileStats.images} images</span>}
            {fileStats.images > 0 && fileStats.videos > 0 && <span>, </span>}
            {fileStats.videos > 0 && <span>{fileStats.videos} videos</span>}
            <span> ({fileStats.totalSize}MB total)</span>
          </div>
        ) : null}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-[#EADBC8]/30 overflow-hidden">
        <div className="p-6 space-y-6">
          {/* File Upload Area */}
          <div>
            <label className="block text-sm font-medium text-[#102C57] mb-3">
              Select Files to Upload
            </label>
            <div 
              className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
                dragActive 
                  ? 'border-[#102C57] bg-[#102C57]/5 scale-[1.02]' 
                  : 'border-[#EADBC8] hover:border-[#DAC0A3] hover:bg-gray-50'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <Upload className={`h-12 w-12 mx-auto mb-4 transition-colors ${
                dragActive ? 'text-[#102C57]' : 'text-[#DAC0A3]'
              }`} />
              
              <h3 className="text-lg font-semibold text-[#102C57] mb-2">
                {dragActive ? 'Drop files here' : 'Drag and drop files here'}
              </h3>
              
              <div className="space-y-2 mb-4">
                <p className="text-[#102C57]/60">or click to browse and select multiple files</p>
                <div className="text-sm text-[#102C57]/50 space-y-1">
                  <p>📸 <strong>Images:</strong> JPG, PNG, WebP, GIF (max 10MB each)</p>
                  <p>🎥 <strong>Videos:</strong> MP4, MOV, AVI, WebM (max 100MB each)</p>
                  <p>✨ Upload multiple files at once</p>
                </div>
              </div>
              
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*,video/*"
                onChange={handleFileInputChange}
                className="hidden"
                id="file-upload"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#102C57] text-white rounded-lg hover:bg-[#102C57]/90 transition-all duration-200 hover:scale-105 font-medium"
              >
                <Upload className="h-4 w-4" />
                Choose Files
              </button>
            </div>
          </div>

          {/* Upload Progress */}
          {isUploading && Object.keys(uploadProgress).length > 0 && (
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-medium text-[#102C57] mb-3">Upload Progress</h3>
              {Object.entries(uploadProgress).map(([fileName, status]) => (
                <ProgressBar 
                  key={fileName} 
                  progress={status.progress} 
                  fileName={fileName}
                />
              ))}
            </div>
          )}

          {/* Selected Files Display */}
          {selectedFiles.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-[#102C57]">
                  Selected Files ({selectedFiles.length})
                </h3>
                <button
                  type="button"
                  onClick={() => setSelectedFiles([])}
                  className="text-sm text-red-600 hover:text-red-800 font-medium"
                >
                  Clear All
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
                {selectedFiles.map((file, index) => (
                  <div 
                    key={`${file.name}-${index}`} 
                    className="bg-gradient-to-r from-[#FEFAF6] to-gray-50 rounded-lg p-4 border border-[#EADBC8]/30 hover:shadow-md transition-all"
                  >
                    <div className="flex items-center space-x-3">
                      {getFileIcon(file)}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-[#102C57] truncate" title={file.name}>
                          {file.name}
                        </p>
                        <div className="flex items-center justify-between mt-1">
                          <p className="text-xs text-[#102C57]/50">
                            {(file.size / 1024 / 1024).toFixed(1)} MB
                          </p>
                          <div className="flex items-center gap-2">
                            {getFileStatus(file.name)}
                            <button
                              type="button"
                              onClick={() => removeFile(index)}
                              disabled={isUploading}
                              className="text-red-500 hover:text-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-[#102C57] mb-2">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                required
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-4 py-3 border border-[#EADBC8] rounded-lg focus:ring-2 focus:ring-[#102C57]/20 focus:border-[#102C57] transition-all"
                placeholder="Enter a descriptive title"
                maxLength={100}
              />
              <p className="text-xs text-[#102C57]/50 mt-1">
                {formData.title.length}/100 characters
              </p>
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-[#102C57] mb-2">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                id="category"
                required
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                className="w-full px-4 py-3 border border-[#EADBC8] rounded-lg focus:ring-2 focus:ring-[#102C57]/20 focus:border-[#102C57] transition-all"
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-[#102C57] mb-2">
              Description (Optional)
            </label>
            <textarea
              id="description"
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full px-4 py-3 border border-[#EADBC8] rounded-lg focus:ring-2 focus:ring-[#102C57]/20 focus:border-[#102C57] transition-all resize-none"
              placeholder="Add a detailed description for this upload..."
              maxLength={500}
            />
            <p className="text-xs text-[#102C57]/50 mt-1">
              {formData.description.length}/500 characters
            </p>
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-between pt-4 border-t border-[#EADBC8]/30">
            <div className="text-sm text-[#102C57]/60">
              {selectedFiles.length > 0 && (
                <span>Ready to upload {selectedFiles.length} file{selectedFiles.length !== 1 ? 's' : ''}</span>
              )}
            </div>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!isFormValid || isUploading}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-[#102C57] to-blue-600 text-white rounded-lg hover:from-[#102C57]/90 hover:to-blue-600/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 disabled:hover:scale-100 font-medium"
            >
              {isUploading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4" />
                  Upload {selectedFiles.length > 0 ? `${selectedFiles.length} File${selectedFiles.length !== 1 ? 's' : ''}` : 'Files'}
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced Modal */}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        title={modalContent.title}
        message={modalContent.message}
        type={modalContent.type}
      />
    </div>
  )
}

export default AdminUpload