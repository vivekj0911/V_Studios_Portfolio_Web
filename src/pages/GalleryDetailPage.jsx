"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { ArrowLeft, Play } from "lucide-react"
import TermsModal from "../components/TermsModal"
import Lightbox from "../components/Lightbox"

const mockGalleryData = {
  weddings: [
    {
      id: 1,
      type: "image",
      src: "/placeholder.svg?height=600&width=800&text=Wedding+Photo+1",
      title: "Ceremony Moments",
    },
    {
      id: 2,
      type: "image",
      src: "/placeholder.svg?height=600&width=800&text=Wedding+Photo+2",
      title: "Reception Dance",
    },
    {
      id: 3,
      type: "video",
      src: "/placeholder.svg?height=600&width=800&text=Wedding+Video+1",
      title: "Wedding Highlights",
    },
    {
      id: 4,
      type: "image",
      src: "/placeholder.svg?height=600&width=800&text=Wedding+Photo+3",
      title: "Couple Portrait",
    },
    {
      id: 5,
      type: "image",
      src: "/placeholder.svg?height=600&width=800&text=Wedding+Photo+4",
      title: "Family Moments",
    },
    { id: 6, type: "image", src: "/placeholder.svg?height=600&width=800&text=Wedding+Photo+5", title: "Ring Exchange" },
  ],
  portraits: [
    {
      id: 1,
      type: "image",
      src: "/placeholder.svg?height=600&width=800&text=Portrait+Photo+1",
      title: "Professional Headshot",
    },
    {
      id: 2,
      type: "image",
      src: "/placeholder.svg?height=600&width=800&text=Portrait+Photo+2",
      title: "Creative Portrait",
    },
    {
      id: 3,
      type: "image",
      src: "/placeholder.svg?height=600&width=800&text=Portrait+Photo+3",
      title: "Studio Session",
    },
    {
      id: 4,
      type: "image",
      src: "/placeholder.svg?height=600&width=800&text=Portrait+Photo+4",
      title: "Outdoor Portrait",
    },
  ],
  lifestyle: [
    {
      id: 1,
      type: "image",
      src: "/placeholder.svg?height=600&width=800&text=Lifestyle+Photo+1",
      title: "Candid Moments",
    },
    { id: 2, type: "image", src: "/placeholder.svg?height=600&width=800&text=Lifestyle+Photo+2", title: "Daily Life" },
    {
      id: 3,
      type: "video",
      src: "/placeholder.svg?height=600&width=800&text=Lifestyle+Video+1",
      title: "Lifestyle Story",
    },
    {
      id: 4,
      type: "image",
      src: "/placeholder.svg?height=600&width=800&text=Lifestyle+Photo+3",
      title: "Natural Beauty",
    },
  ],
  events: [
    { id: 1, type: "image", src: "/placeholder.svg?height=600&width=800&text=Event+Photo+1", title: "Corporate Event" },
    { id: 2, type: "image", src: "/placeholder.svg?height=600&width=800&text=Event+Photo+2", title: "Conference" },
    { id: 3, type: "image", src: "/placeholder.svg?height=600&width=800&text=Event+Photo+3", title: "Networking" },
  ],
}

const GalleryDetailPage = () => {
  const { category } = useParams()
  const navigate = useNavigate()

  const [showTermsModal, setShowTermsModal] = useState(false)
  const [hasAcceptedTerms, setHasAcceptedTerms] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const [galleryData, setGalleryData] = useState([])

  useEffect(() => {
    const acceptedTerms = localStorage.getItem("photography-terms-accepted")
    if (acceptedTerms === "true") {
      setHasAcceptedTerms(true)
    } else {
      setShowTermsModal(true)
    }

    setGalleryData(mockGalleryData[category] || [])
  }, [category])

  const handleAcceptTerms = () => {
    localStorage.setItem("photography-terms-accepted", "true")
    setHasAcceptedTerms(true)
    setShowTermsModal(false)
  }

  const handleContextMenu = (e) => {
    e.preventDefault()
  }

  const categoryTitles = {
    weddings: "Wedding Gallery",
    portraits: "Portrait Gallery",
    lifestyle: "Lifestyle Gallery",
    events: "Event Gallery",
  }

  if (showTermsModal) {
    return <TermsModal onAccept={handleAcceptTerms} />
  }

  return (
    <div className="min-h-screen bg-[#FEFAF6] pt-20" onContextMenu={handleContextMenu}>
      {/* Clean inline sub-header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          <div className="flex items-center gap-4 text-[#102C57]">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 text-[#102C57] hover:text-[#102C57]/70 transition-colors text-sm font-medium"
            >
              <ArrowLeft className="h-5 w-5" />
              Back to Home
            </button>
            <span className="text-xl font-semibold">| {categoryTitles[category] || "Gallery"}</span>
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {galleryData.map((item, index) => (
            <div
              key={item.id}
              className="group relative aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
              onClick={() => setLightboxIndex(index)}
            >
              <img
                src={item.src}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 select-none pointer-events-none"
                draggable="false"
              />

              {item.type === "video" && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <Play className="h-12 w-12 text-white opacity-80" />
                </div>
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-medium text-sm">{item.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        {galleryData.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[#102C57]/60 text-lg">No images found in this category.</p>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          images={galleryData}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNext={() => setLightboxIndex((lightboxIndex + 1) % galleryData.length)}
          onPrev={() => setLightboxIndex((lightboxIndex - 1 + galleryData.length) % galleryData.length)}
        />
      )}
    </div>
  )
}

export default GalleryDetailPage