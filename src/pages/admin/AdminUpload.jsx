"use client"

import { useState } from "react"
import AdminLayout from "../../components/AdminLayout"
import { Upload, X, ImageIcon, Video } from "lucide-react"

const categories = ["Weddings", "Portraits", "Lifestyle", "Events", "Corporate", "Family", "Nature", "Travel"]

const AdminUpload = ({ navigateTo }) => {
  const [selectedFiles, setSelectedFiles] = useState([])
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
  })
  const [isUploading, setIsUploading] = useState(false)

  const handleFileSelect = (e) => {
    if (e.target.files) {
      const files = Array.from(e.target.files)
      setSelectedFiles([...selectedFiles, ...files])
    }
  }

  const removeFile = (index) => {
    setSelectedFiles(selectedFiles.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsUploading(true)
    // Handle upload logic here
    setTimeout(() => {
      setIsUploading(false)
      setSelectedFiles([])
      setFormData({ title: "", category: "", description: "" })
    }, 2000)
  }

  const getFileIcon = (file) => {
    if (file.type.startsWith("image/")) {
      return <ImageIcon className="h-8 w-8 text-blue-500" />
    } else if (file.type.startsWith("video/")) {
      return <Video className="h-8 w-8 text-purple-500" />
    }
    return <ImageIcon className="h-8 w-8 text-gray-500" />
  }

  return (
    <AdminLayout navigateTo={navigateTo}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-[#102C57]">Upload Media</h1>
          <p className="text-[#102C57]/60 mt-2">Add new photos and videos to your portfolio</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-[#EADBC8]/30 p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* File Upload Area */}
            <div>
              <label className="block text-sm font-medium text-[#102C57] mb-2">Select Files</label>
              <div className="border-2 border-dashed border-[#EADBC8] rounded-lg p-8 text-center hover:border-[#DAC0A3] transition-colors">
                <Upload className="h-12 w-12 text-[#DAC0A3] mx-auto mb-4" />
                <p className="text-[#102C57]/60 mb-2">Drag and drop files here, or click to select</p>
                <p className="text-sm text-[#102C57]/50 mb-4">Supports JPG, PNG, MP4, MOV files up to 50MB</p>
                <input
                  type="file"
                  multiple
                  accept="image/*,video/*"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="inline-flex items-center px-4 py-2 bg-[#102C57] text-white rounded-lg hover:bg-[#102C57]/90 cursor-pointer transition-colors"
                >
                  Choose Files
                </label>
              </div>
            </div>

            {/* Selected Files */}
            {selectedFiles.length > 0 && (
              <div>
                <h3 className="text-lg font-medium text-[#102C57] mb-3">Selected Files ({selectedFiles.length})</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {selectedFiles.map((file, index) => (
                    <div key={index} className="bg-[#FEFAF6] rounded-lg p-4 flex items-center space-x-3">
                      {getFileIcon(file)}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-[#102C57] truncate">{file.name}</p>
                        <p className="text-xs text-[#102C57]/50">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-[#102C57] mb-2">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-3 border border-[#EADBC8] rounded-lg focus:ring-2 focus:ring-[#DAC0A3] focus:border-transparent"
                  placeholder="Enter media title"
                />
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-[#102C57] mb-2">
                  Category
                </label>
                <select
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-3 border border-[#EADBC8] rounded-lg focus:ring-2 focus:ring-[#DAC0A3] focus:border-transparent"
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
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-3 border border-[#EADBC8] rounded-lg focus:ring-2 focus:ring-[#DAC0A3] focus:border-transparent"
                placeholder="Add a description for this media..."
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={selectedFiles.length === 0 || isUploading}
                className="px-6 py-3 bg-[#102C57] text-white rounded-lg hover:bg-[#102C57]/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isUploading
                  ? "Uploading..."
                  : `Upload ${selectedFiles.length} File${selectedFiles.length !== 1 ? "s" : ""}`}
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  )
}

export default AdminUpload
