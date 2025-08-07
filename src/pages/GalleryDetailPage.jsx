import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ArrowLeft, Play } from "lucide-react"
import TermsModal from "../components/TermsModal"
import Lightbox from "../components/Lightbox"

const GalleryDetailPage = () => {
  const [showTermsModal, setShowTermsModal] = useState(false)
  const [hasAcceptedTerms, setHasAcceptedTerms] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const [galleryData, setGalleryData] = useState([])

  const navigate = useNavigate()
  const { category } = useParams()

  const readableCategory = decodeURIComponent(category || "All")
  const selectedCategory = readableCategory === "all" ? "All" : readableCategory

  useEffect(() => {
    window.scrollTo(0, 0)
    const acceptedTerms = localStorage.getItem("photography-terms-accepted")
    if (acceptedTerms === "true") {
      setHasAcceptedTerms(true)
    } else {
      setShowTermsModal(true)
    }
  }, [])

  useEffect(() => {
  const incrementMediaViews = async () => {
    if (lightboxIndex !== null && galleryData[lightboxIndex]) {
      try {
        const mediaId = galleryData[lightboxIndex]._id;
        await fetch(`http://localhost:5000/api/media/${mediaId}/view`, {
          method: "POST"
        });
      } catch (error) {
        console.error("Failed to increment view count", error);
      }
    }
  };

  incrementMediaViews();
}, [lightboxIndex]);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const query =
          selectedCategory && selectedCategory !== "All"
            ? `?category=${encodeURIComponent(selectedCategory)}`
            : ""
        const res = await fetch(`http://localhost:5000/api/media${query}`)
        const data = await res.json()
        setGalleryData(data)
      } catch (err) {
        console.error("Failed to load gallery", err)
      }
    }

    if (hasAcceptedTerms) {
      fetchGallery()
    }
  }, [selectedCategory, hasAcceptedTerms])

  const handleAcceptTerms = () => {
    localStorage.setItem("photography-terms-accepted", "true")
    setHasAcceptedTerms(true)
    setShowTermsModal(false)
  }

  const handleContextMenu = (e) => e.preventDefault()

  if (showTermsModal) return <TermsModal onAccept={handleAcceptTerms} />

  return (
    <div className="min-h-screen bg-[#FEFAF6] pt-20" onContextMenu={handleContextMenu}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="flex items-center gap-4 text-[#102C57]">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-[#102C57] hover:text-[#102C57]/70 transition-colors text-sm font-medium"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to Home
          </button>
          <span className="text-xl font-semibold">| {selectedCategory} Gallery</span>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {galleryData.map((item, index) => (
            <div
              key={item._id}
              className="group relative aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
              onClick={() => setLightboxIndex(index)}
            >
              {item.type === "video" ? (
                <video
                  src={item.url}
                  className="w-full h-full object-cover pointer-events-none"
                  muted
                  playsInline
                />
              ) : (
                <img
                  src={item.url}
                  alt={item.title || "Media"}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 select-none pointer-events-none"
                  draggable="false"
                />
              )}

              {item.type === "video" && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <Play className="h-12 w-12 text-white opacity-80" />
                </div>
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-medium text-sm truncate">{item.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        {galleryData.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[#102C57]/60 text-lg">No media found in this category.</p>
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
