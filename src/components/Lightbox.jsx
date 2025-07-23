"use client"

import { X, ChevronLeft, ChevronRight } from "lucide-react"

const Lightbox = ({ images, currentIndex, onClose, onNext, onPrev }) => {
  const currentImage = images[currentIndex]

  const handleContextMenu = (e) => {
    e.preventDefault()
  }

  const handleKeyDown = (e) => {
    if (e.key === "Escape") onClose()
    if (e.key === "ArrowRight") onNext()
    if (e.key === "ArrowLeft") onPrev()
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
      onContextMenu={handleContextMenu}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
      >
        <X className="h-6 w-6 text-white" />
      </button>

      {/* Navigation Buttons */}
      <button
        onClick={onPrev}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
      >
        <ChevronLeft className="h-6 w-6 text-white" />
      </button>

      <button
        onClick={onNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
      >
        <ChevronRight className="h-6 w-6 text-white" />
      </button>

      {/* Media Content */}
      <div className="max-w-4xl max-h-[90vh] mx-4">
        {currentImage.type === "video" ? (
          <video
            src={currentImage.src}
            controls
            controlsList="nodownload"
            className="max-w-full max-h-full select-none"
            draggable="false"
          />
        ) : (
          <img
            src={currentImage.src || "/placeholder.svg"}
            alt={currentImage.title}
            className="max-w-full max-h-full object-contain select-none pointer-events-none"
            draggable="false"
          />
        )}
      </div>

      {/* Image Info */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center text-white">
        <h3 className="text-lg font-medium mb-1">{currentImage.title}</h3>
        <p className="text-sm text-gray-300">
          {currentIndex + 1} of {images.length}
        </p>
      </div>
    </div>
  )
}

export default Lightbox
