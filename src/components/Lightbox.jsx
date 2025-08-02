import { X, ChevronLeft, ChevronRight } from "lucide-react"

const Lightbox = ({ images, currentIndex, onClose, onNext, onPrev }) => {
  const item = images[currentIndex]

  if (!item) return null

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white text-3xl z-50"
        aria-label="Close"
      >
        <X />
      </button>

      {/* Previous Button */}
      <button
        onClick={onPrev}
        className="absolute left-4 text-white text-3xl z-50"
        aria-label="Previous"
      >
        <ChevronLeft />
      </button>

      {/* Next Button */}
      <button
        onClick={onNext}
        className="absolute right-4 text-white text-3xl z-50"
        aria-label="Next"
      >
        <ChevronRight />
      </button>

      {/* Media Display */}
      <div className="max-w-[90vw] max-h-[90vh]">
        {item.type === "video" ? (
          <video
            src={item.url}
            controls
            autoPlay
            className="max-w-full max-h-full mx-auto"
          />
        ) : (
          <img
            src={item.url}
            alt={item.title || "Media"}
            className="max-w-full max-h-full mx-auto"
          />
        )}
      </div>
    </div>
  )
}

export default Lightbox
