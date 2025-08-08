"use client"

import { useEffect, useState } from "react"
import {
  Search, Filter, Trash2, ImageIcon, Video, Eye, X,
} from "lucide-react"

const API_URL = import.meta.env.VITE_API_URL;

const categories = [
  "All",
  "Baby shoot",
  "Maternity shoot",
  "Wedding pre-wedding shoot",
  "Corporate Photography",
  "Videos",
  "Product photography",
  "Collage photo frame design",
  "Extras",
]

const AdminManage = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedType, setSelectedType] = useState("All")
  const [media, setMedia] = useState([])
  const [loading, setLoading] = useState(true)

  const [showConfirm, setShowConfirm] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [selectedId, setSelectedId] = useState(null)
  const [selectedMedia, setSelectedMedia] = useState(null) // for view full screen

  useEffect(() => {
    fetchMedia()
  }, [])

  const fetchMedia = async () => {
    try {
      const res = await fetch(`${API_URL}/api/media/`)
      const data = await res.json()
      setMedia(data)
    } catch (err) {
      console.error("Failed to fetch media:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteClick = (id) => {
    setSelectedId(id)
    setShowConfirm(true)
  }

  const confirmDelete = async () => {
    const token = localStorage.getItem("adminToken")
    try {
      const res = await fetch(`${API_URL}/api/media/${selectedId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (res.ok) {
        setMedia((prev) => prev.filter((item) => item._id !== selectedId))
        setShowConfirm(false)
        setShowSuccess(true)
        setTimeout(() => setShowSuccess(false), 2000)
      } else {
        console.error("Delete failed")
      }
    } catch (err) {
      console.error("Error deleting media:", err)
    }
  }

  const handleView = (item) => setSelectedMedia(item)

  const filteredMedia = media.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory
    const matchesType = selectedType === "All" || item.type === selectedType
    return matchesSearch && matchesCategory && matchesType
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#102C57]">Manage Media</h1>
        <p className="text-[#102C57]/60 mt-2">View, edit, and organize your photography portfolio</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-[#EADBC8]/30 p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-[#102C57] mb-2">Search</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#102C57]/40" />
              <input
                type="text"
                placeholder="Search media..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-[#EADBC8] rounded-lg focus:ring-2 focus:ring-[#DAC0A3] focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#102C57] mb-2">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2 border border-[#EADBC8] rounded-lg focus:ring-2 focus:ring-[#DAC0A3] focus:border-transparent"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#102C57] mb-2">Type</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-4 py-2 border border-[#EADBC8] rounded-lg focus:ring-2 focus:ring-[#DAC0A3] focus:border-transparent"
            >
              <option value="All">All Types</option>
              <option value="image">Images</option>
              <option value="video">Videos</option>
            </select>
          </div>

          <div className="flex items-end">
            <button className="w-full px-4 py-2 bg-[#EADBC8] text-[#102C57] rounded-lg hover:bg-[#DAC0A3] transition-colors flex items-center justify-center">
              <Filter className="h-4 w-4 mr-2" />
              Apply Filters
            </button>
          </div>
        </div>
      </div>

      {/* Media Grid */}
      <div className="bg-white rounded-xl shadow-sm border border-[#EADBC8]/30 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-[#102C57]">
            Media Library ({filteredMedia.length} items)
          </h2>
        </div>

        {loading ? (
          <p className="text-[#102C57]/50">Loading media...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredMedia.map((item) => (
              <div
                key={item._id}
                className="group relative bg-[#FEFAF6] rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="aspect-[4/3] relative">
                  <img
                    src={item.url}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2">
                    {item.type === "image" ? (
                      <ImageIcon className="h-5 w-5 text-white bg-black/50 rounded p-1" />
                    ) : (
                      <Video className="h-5 w-5 text-white bg-black/50 rounded p-1" />
                    )}
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleView(item)}
                        className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
                      >
                        <Eye className="h-4 w-4 text-[#102C57]" />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(item._id)}
                        className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
                      >
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-medium text-[#102C57] mb-1 truncate">{item.title}</h3>
                  <p className="text-sm text-[#102C57]/60 mb-2">{item.category}</p>
                  <div className="flex justify-between items-center text-xs text-[#102C57]/50">
                    <span>{new Date(item.uploadedAt).toLocaleDateString()}</span>
                    <span>{item.views} views</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && filteredMedia.length === 0 && (
          <div className="text-center py-12">
            <ImageIcon className="h-12 w-12 text-[#EADBC8] mx-auto mb-4" />
            <p className="text-[#102C57]/60">No media found matching your criteria</p>
          </div>
        )}
      </div>

      {/* View Fullscreen Modal */}
      {selectedMedia && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="relative max-w-4xl w-full p-4">
            <button
              className="absolute top-4 right-4 text-white hover:text-red-400"
              onClick={() => setSelectedMedia(null)}
            >
              <X className="w-6 h-6" />
            </button>
            {selectedMedia.type === "image" ? (
              <img src={selectedMedia.url} alt={selectedMedia.title} className="w-full rounded-xl" />
            ) : (
              <video controls src={selectedMedia.url} className="w-full rounded-xl" />
            )}
          </div>
        </div>
      )}

      {/* Confirm Delete Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl shadow-md w-[90%] max-w-md text-center">
            <h2 className="text-xl font-semibold text-[#102C57] mb-4">Delete Media</h2>
            <p className="text-[#102C57]/70 mb-6">Are you sure you want to delete this media?</p>
            <div className="flex justify-center gap-4">
              <button
                className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
                onClick={confirmDelete}
              >
                Yes, Delete
              </button>
              <button
                className="px-4 py-2 rounded border border-[#102C57] text-[#102C57] hover:bg-[#102C57] hover:text-white"
                onClick={() => setShowConfirm(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-md z-50">
          Media deleted successfully!
        </div>
      )}
    </div>
  )
}

export default AdminManage
