"use client"

import { useEffect, useState, useCallback, useMemo, memo } from "react"
import {
  Search, Filter, Trash2, FileImage, Video, Eye, X, Loader2, AlertCircle, Image as ImageIcon
} from "lucide-react"

const API_URL = import.meta.env.VITE_API_URL

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

// Cloudinary URL optimization helper
const optimizeCloudinaryUrl = (url, options = {}) => {
  if (!url || !url.includes('cloudinary.com')) return url
  
  const { width = 300, height = 225, quality = 'auto', format = 'auto' } = options
  
  // Insert transformation parameters before the version or file path
  const transformations = `w_${width},h_${height},c_fill,q_${quality},f_${format}`
  
  if (url.includes('/upload/')) {
    return url.replace('/upload/', `/upload/${transformations}/`)
  }
  
  return url
}

// Generate thumbnail and full-size URLs
const getImageUrls = (originalUrl) => {
  return {
    thumbnail: optimizeCloudinaryUrl(originalUrl, { width: 300, height: 225, quality: 'auto' }),
    fullsize: optimizeCloudinaryUrl(originalUrl, { width: 1200, height: 900, quality: 'auto' }),
    original: originalUrl
  }
}

// Optimized Image Component with lazy loading and Cloudinary optimization
const OptimizedImage = memo(({ src, alt, className, onLoad, priority = false }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [imageSrc, setImageSrc] = useState('')

  useEffect(() => {
    const imageUrls = getImageUrls(src)
    const img = new window.Image() // Use window.Image to avoid conflict
    
    img.onload = () => {
      setImageSrc(imageUrls.thumbnail)
      setIsLoading(false)
      onLoad?.()
    }
    img.onerror = () => {
      // Fallback to original URL if Cloudinary optimization fails
      const fallbackImg = new window.Image()
      fallbackImg.onload = () => {
        setImageSrc(src)
        setIsLoading(false)
        onLoad?.()
      }
      fallbackImg.onerror = () => {
        setHasError(true)
        setIsLoading(false)
      }
      fallbackImg.src = src
    }
    
    // Load optimized image
    img.src = imageUrls.thumbnail
  }, [src, onLoad])

  if (hasError) {
    return (
      <div className={`${className} bg-gray-100 flex items-center justify-center`}>
        <AlertCircle className="h-8 w-8 text-gray-400" />
      </div>
    )
  }

  return (
    <div className="relative">
      {isLoading && (
        <div className={`${className} bg-gray-100 animate-pulse flex items-center justify-center absolute inset-0 z-10`}>
          <Loader2 className="h-6 w-6 text-gray-400 animate-spin" />
        </div>
      )}
      {imageSrc && (
        <img
          src={imageSrc}
          alt={alt}
          className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
          loading={priority ? "eager" : "lazy"}
        />
      )}
    </div>
  )
})

OptimizedImage.displayName = 'OptimizedImage'

// Memoized Media Item Component
const MediaItem = memo(({ item, onView, onDelete }) => {
  const [imageLoaded, setImageLoaded] = useState(false)

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true)
  }, [])

  return (
    <div className="group relative bg-[#FEFAF6] rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="aspect-[4/3] relative overflow-hidden">
        <OptimizedImage
          src={item.url}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          onLoad={handleImageLoad}
        />
        
        {/* Media type indicator */}
        <div className="absolute top-2 left-2 z-20">
          {item.type === "image" ? (
            <div className="bg-black/70 backdrop-blur-sm rounded-full p-1.5">
              <ImageIcon className="h-4 w-4 text-white" />
            </div>
          ) : (
            <div className="bg-black/70 backdrop-blur-sm rounded-full p-1.5">
              <Video className="h-4 w-4 text-white" />
            </div>
          )}
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
          <div className="flex space-x-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <button
              onClick={() => onView(item)}
              className="p-3 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white hover:scale-110 transition-all duration-200 shadow-lg"
              aria-label="View full size"
            >
              <Eye className="h-4 w-4 text-[#102C57]" />
            </button>
            <button
              onClick={() => onDelete(item._id)}
              className="p-3 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white hover:scale-110 transition-all duration-200 shadow-lg"
              aria-label="Delete media"
            >
              <Trash2 className="h-4 w-4 text-red-600" />
            </button>
          </div>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-[#102C57] mb-1 truncate text-sm" title={item.title}>
          {item.title}
        </h3>
        <p className="text-xs text-[#102C57]/60 mb-3 font-medium">{item.category}</p>
        <div className="flex justify-between items-center text-xs text-[#102C57]/50">
          <span>{new Date(item.uploadedAt).toLocaleDateString()}</span>
          <span className="bg-[#EADBC8]/30 px-2 py-1 rounded-full">{item.views} views</span>
        </div>
      </div>
    </div>
  )
})

MediaItem.displayName = 'MediaItem'

const AdminManage = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedType, setSelectedType] = useState("All")
  const [media, setMedia] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Modal states
  const [showConfirm, setShowConfirm] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [selectedId, setSelectedId] = useState(null)
  const [selectedMedia, setSelectedMedia] = useState(null)
  const [deleting, setDeleting] = useState(false)

  // Pagination for better performance
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 12

  const fetchMedia = useCallback(async () => {
    try {
      setError(null)
      const res = await fetch(`${API_URL}/api/media/`)
      if (!res.ok) throw new Error('Failed to fetch media')
      const data = await res.json()
      setMedia(data)
    } catch (err) {
      setError(err.message)
      console.error("Failed to fetch media:", err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchMedia()
  }, [fetchMedia])

  const handleDeleteClick = useCallback((id) => {
    setSelectedId(id)
    setShowConfirm(true)
  }, [])

  const confirmDelete = useCallback(async () => {
    if (!selectedId) return
    
    setDeleting(true)
    const token = localStorage.getItem("adminToken")
    
    try {
      const res = await fetch(`${API_URL}/api/media/${selectedId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (res.ok) {
        setMedia(prev => prev.filter(item => item._id !== selectedId))
        setShowConfirm(false)
        setShowSuccess(true)
        setTimeout(() => setShowSuccess(false), 3000)
      } else {
        throw new Error('Delete failed')
      }
    } catch (err) {
      console.error("Error deleting media:", err)
      setError("Failed to delete media")
    } finally {
      setDeleting(false)
    }
  }, [selectedId])

  const handleView = useCallback((item) => {
    setSelectedMedia(item)
  }, [])

  // Memoized filtered media with pagination
  const { filteredMedia, totalPages } = useMemo(() => {
    const filtered = media.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === "All" || item.category === selectedCategory
      const matchesType = selectedType === "All" || item.type === selectedType
      return matchesSearch && matchesCategory && matchesType
    })

    const startIndex = (currentPage - 1) * itemsPerPage
    const paginatedItems = filtered.slice(startIndex, startIndex + itemsPerPage)
    
    return {
      filteredMedia: paginatedItems,
      totalItems: filtered.length,
      totalPages: Math.ceil(filtered.length / itemsPerPage)
    }
  }, [media, searchTerm, selectedCategory, selectedType, currentPage])

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, selectedCategory, selectedType])

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') {
      if (selectedMedia) setSelectedMedia(null)
      if (showConfirm) setShowConfirm(false)
    }
  }, [selectedMedia, showConfirm])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  if (error && !media.length) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-[#102C57]">Manage Media</h1>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-red-200 p-6 text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <p className="text-red-600 mb-4">Failed to load media</p>
          <button
            onClick={fetchMedia}
            className="px-4 py-2 bg-[#102C57] text-white rounded-lg hover:bg-[#102C57]/90 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#102C57] to-[#1e4d72] rounded-xl p-6 text-white">
        <h1 className="text-3xl font-bold">Manage Media</h1>
        <p className="text-white/80 mt-2">
          View, edit, and organize your photography portfolio. Use the filters below to find specific media items quickly.
        </p>
      </div>

      {/* Enhanced Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-[#EADBC8]/30 p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-[#102C57] mb-2">Search</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#102C57]/40" />
              <input
                type="text"
                placeholder="Search media..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-[#EADBC8] rounded-lg focus:ring-2 focus:ring-[#DAC0A3] focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-[#102C57] mb-2">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2.5 border border-[#EADBC8] rounded-lg focus:ring-2 focus:ring-[#DAC0A3] focus:border-transparent transition-all"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Type Filter */}
          <div>
            <label className="block text-sm font-medium text-[#102C57] mb-2">Type</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-4 py-2.5 border border-[#EADBC8] rounded-lg focus:ring-2 focus:ring-[#DAC0A3] focus:border-transparent transition-all"
            >
              <option value="All">All Types</option>
              <option value="image">Images</option>
              <option value="video">Videos</option>
            </select>
          </div>

          {/* Clear Filters */}
          <div className="flex items-end">
            <button 
              onClick={() => {
                setSearchTerm("")
                setSelectedCategory("All")
                setSelectedType("All")
              }}
              className="w-full px-4 py-2.5 bg-[#EADBC8] text-[#102C57] rounded-lg hover:bg-[#DAC0A3] transition-all duration-200 flex items-center justify-center font-medium"
            >
              <X className="h-4 w-4 mr-2" />
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Media Grid */}
      <div className="bg-white rounded-xl shadow-sm border border-[#EADBC8]/30 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-[#102C57]">
            Media Library ({media.length} total items)
          </h2>
          {loading && (
            <Loader2 className="h-5 w-5 text-[#102C57]/50 animate-spin" />
          )}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-[#FEFAF6] rounded-lg overflow-hidden">
                <div className="aspect-[4/3] bg-gray-200 animate-pulse"></div>
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-3 bg-gray-200 rounded animate-pulse w-2/3"></div>
                  <div className="flex justify-between">
                    <div className="h-3 bg-gray-200 rounded animate-pulse w-1/3"></div>
                    <div className="h-3 bg-gray-200 rounded animate-pulse w-1/4"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredMedia.map((item) => (
                <MediaItem
                  key={item._id}
                  item={item}
                  onView={handleView}
                  onDelete={handleDeleteClick}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2 mt-8">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-2 text-sm border border-[#EADBC8] rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#EADBC8] transition-colors"
                >
                  Previous
                </button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter(page => page === 1 || page === totalPages || Math.abs(page - currentPage) <= 2)
                  .map((page, index, array) => (
                    <div key={page} className="flex items-center">
                      {index > 0 && array[index - 1] !== page - 1 && (
                        <span className="px-2 text-[#102C57]/50">...</span>
                      )}
                      <button
                        onClick={() => setCurrentPage(page)}
                        className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                          currentPage === page
                            ? 'bg-[#102C57] text-white'
                            : 'border border-[#EADBC8] hover:bg-[#EADBC8]'
                        }`}
                      >
                        {page}
                      </button>
                    </div>
                  ))}

                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 text-sm border border-[#EADBC8] rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#EADBC8] transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}

        {!loading && filteredMedia.length === 0 && media.length > 0 && (
          <div className="text-center py-12">
            <Search className="h-12 w-12 text-[#EADBC8] mx-auto mb-4" />
            <p className="text-[#102C57]/60 text-lg mb-2">No media found matching your criteria</p>
            <p className="text-[#102C57]/40 text-sm">Try adjusting your search terms or filters</p>
          </div>
        )}

        {!loading && media.length === 0 && (
          <div className="text-center py-12">
            <ImageIcon className="h-12 w-12 text-[#EADBC8] mx-auto mb-4" />
            <p className="text-[#102C57]/60 text-lg">No media found in your library</p>
          </div>
        )}
      </div>

      {/* Enhanced Fullscreen Modal */}
      {selectedMedia && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-6xl w-full max-h-full flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <div className="text-white">
                <h3 className="text-xl font-semibold">{selectedMedia.title}</h3>
                <p className="text-white/70 text-sm">{selectedMedia.category}</p>
              </div>
              <button
                className="text-white hover:text-red-400 transition-colors p-2"
                onClick={() => setSelectedMedia(null)}
                aria-label="Close modal"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="flex-1 flex items-center justify-center min-h-0">
              {selectedMedia.type === "image" ? (
                <img 
                  src={getImageUrls(selectedMedia.url).fullsize} 
                  alt={selectedMedia.title} 
                  className="max-w-full max-h-full object-contain rounded-lg"
                />
              ) : (
                <video 
                  controls 
                  src={selectedMedia.url} 
                  className="max-w-full max-h-full rounded-lg"
                  autoPlay
                />
              )}
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Delete Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
            <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-red-100 rounded-full">
              <Trash2 className="h-6 w-6 text-red-600" />
            </div>
            <h2 className="text-xl font-semibold text-[#102C57] mb-2 text-center">Delete Media</h2>
            <p className="text-[#102C57]/70 mb-6 text-center">
              This action cannot be undone. Are you sure you want to delete this media item?
            </p>
            <div className="flex gap-3">
              <button
                className="flex-1 px-4 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors font-medium"
                onClick={() => setShowConfirm(false)}
                disabled={deleting}
              >
                Cancel
              </button>
              <button
                className="flex-1 px-4 py-2.5 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors font-medium flex items-center justify-center disabled:opacity-50"
                onClick={confirmDelete}
                disabled={deleting}
              >
                {deleting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  'Delete'
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Success Notification */}
      {showSuccess && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center">
          <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
          Media deleted successfully!
        </div>
      )}
    </div>
  )
}

export default AdminManage