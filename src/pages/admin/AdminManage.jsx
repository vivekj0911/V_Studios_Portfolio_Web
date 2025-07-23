"use client"

import { useState } from "react"
import AdminLayout from "../../components/AdminLayout"
import { Search, Filter, Edit, Trash2, ImageIcon, Video, Eye } from "lucide-react"

const mockMedia = [
  {
    id: 1,
    title: "Golden Hour Wedding Portrait",
    category: "Weddings",
    type: "image",
    thumbnail: "/placeholder.svg?height=200&width=300&text=Wedding+Photo",
    uploadDate: "2024-01-15",
    views: 234,
  },
  {
    id: 2,
    title: "Corporate Headshot Session",
    category: "Portraits",
    type: "image",
    thumbnail: "/placeholder.svg?height=200&width=300&text=Portrait+Photo",
    uploadDate: "2024-01-14",
    views: 156,
  },
  {
    id: 3,
    title: "Lifestyle Story Video",
    category: "Lifestyle",
    type: "video",
    thumbnail: "/placeholder.svg?height=200&width=300&text=Lifestyle+Video",
    uploadDate: "2024-01-13",
    views: 89,
  },
  {
    id: 4,
    title: "Family Portrait Session",
    category: "Family",
    type: "image",
    thumbnail: "/placeholder.svg?height=200&width=300&text=Family+Photo",
    uploadDate: "2024-01-12",
    views: 178,
  },
]

const categories = ["All", "Weddings", "Portraits", "Lifestyle", "Events", "Family"]

const AdminManage = ({ navigateTo }) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedType, setSelectedType] = useState("All")
  const [media, setMedia] = useState(mockMedia)

  const filteredMedia = media.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory
    const matchesType = selectedType === "All" || item.type === selectedType
    return matchesSearch && matchesCategory && matchesType
  })

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this media?")) {
      setMedia(media.filter((item) => item.id !== id))
    }
  }

  return (
    <AdminLayout navigateTo={navigateTo}>
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
            <h2 className="text-xl font-semibold text-[#102C57]">Media Library ({filteredMedia.length} items)</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredMedia.map((item) => (
              <div
                key={item.id}
                className="group relative bg-[#FEFAF6] rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="aspect-[4/3] relative">
                  <img
                    src={item.thumbnail || "/placeholder.svg"}
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
                      <button className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors">
                        <Eye className="h-4 w-4 text-[#102C57]" />
                      </button>
                      <button className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors">
                        <Edit className="h-4 w-4 text-[#102C57]" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
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
                    <span>{item.uploadDate}</span>
                    <span>{item.views} views</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredMedia.length === 0 && (
            <div className="text-center py-12">
              <ImageIcon className="h-12 w-12 text-[#EADBC8] mx-auto mb-4" />
              <p className="text-[#102C57]/60">No media found matching your criteria</p>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  )
}

export default AdminManage
