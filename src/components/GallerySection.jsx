"use client"

import { useRef, useState, useEffect, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import { ChevronLeft, ChevronRight } from "lucide-react"

const categories = [
  {
    id: "all",
    title: "All",
    description: "Browse everything in one place",
    image: "/covers/all.png",
  },
  {
    id: "Baby shoot",
    title: "Baby Shoot",
    description: "Adorable moments of little ones",
    image: "/covers/baby.png",
  },
  {
    id: "Maternity shoot",
    title: "Maternity Shoot",
    description: "Beautiful memories of motherhood",
    image: "/covers/maternity.png",
  },
  {
    id: "Wedding pre-wedding shoot",
    title: "Wedding & Pre-Wedding",
    description: "Celebrate love and togetherness",
    image: "/covers/wedding.png",
  },
  {
    id: "Corporate Photography",
    title: "Corporate Photography",
    description: "Professional events and portraits",
    image: "/covers/corporate.png",
  },
  {
    id: "Videos",
    title: "Videos",
    description: "Creative video storytelling",
    image: "/covers/videos.png",
  },
  {
    id: "Product photography",
    title: "Product Photography",
    description: "Showcase products with style",
    image: "/covers/product.png",
  },
  {
    id: "Collage photo frame design",
    title: "Collage Frame Design",
    description: "Memories beautifully arranged",
    image: "/covers/collage.png",
  },
]

const GallerySection = () => {
  const navigate = useNavigate()
  const scrollRef = useRef(null)
  const [currentPage, setCurrentPage] = useState(0)
  const [totalPages, setTotalPages] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(2)

  const updatePagination = useCallback(() => {
    const screenWidth = window.innerWidth
    let itemsPerPageCount
    
    if (screenWidth < 768) {
      itemsPerPageCount = 2 // Small screens: 2 rows × 1 col = 2
    } else if (screenWidth < 1024) {
      itemsPerPageCount = 4 // Medium screens: 2 rows × 2 cols = 4
    } else {
      itemsPerPageCount = 6 // Large screens: 2 rows × 3 cols = 6
    }
    
    setItemsPerPage(itemsPerPageCount)
    setTotalPages(Math.ceil(categories.length / itemsPerPageCount))
    
    // Reset to first page if current page is out of bounds
    if (currentPage >= Math.ceil(categories.length / itemsPerPageCount)) {
      setCurrentPage(0)
    }
  }, [currentPage])

  useEffect(() => {
    updatePagination()
    window.addEventListener("resize", updatePagination)
    return () => window.removeEventListener("resize", updatePagination)
  }, [updatePagination])

  const scrollToPage = useCallback((pageIndex) => {
    const container = scrollRef.current
    if (!container) return

    const pageWidth = container.offsetWidth
    const scrollAmount = pageIndex * pageWidth
    container.scrollTo({ left: scrollAmount, behavior: "smooth" })
    setCurrentPage(pageIndex)
  }, [])

  const handlePrevPage = () => {
    if (currentPage > 0) {
      scrollToPage(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      scrollToPage(currentPage + 1)
    }
  }

  const getCurrentPageItems = () => {
    const startIndex = currentPage * itemsPerPage
    return categories.slice(startIndex, startIndex + itemsPerPage)
  }

  return (
    <section id="gallery" className="py-20 bg-[#FEFAF6] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-[#102C57] mb-4 leading-tight">
          Photography Gallery
        </h2>
        <p className="text-xl text-[#102C57]/70 max-w-2xl mx-auto leading-relaxed">
          Explore my work across different photography styles and occasions
        </p>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Arrows */}
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 0}
          className={`absolute left-2 top-1/2 transform -translate-y-1/2 z-20 p-3 rounded-full shadow-lg transition-all duration-300 ${
            currentPage === 0
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-white text-[#102C57] hover:bg-[#102C57] hover:text-white hover:shadow-xl"
          }`}
          aria-label="Previous page"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages - 1}
          className={`absolute right-2 top-1/2 transform -translate-y-1/2 z-20 p-3 rounded-full shadow-lg transition-all duration-300 ${
            currentPage === totalPages - 1
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-white text-[#102C57] hover:bg-[#102C57] hover:text-white hover:shadow-xl"
          }`}
          aria-label="Next page"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* Gallery Container */}
        <div className="overflow-hidden rounded-2xl" ref={scrollRef}>
          <div className="flex transition-transform duration-500 ease-in-out">
            {Array.from({ length: totalPages }).map((_, pageIndex) => (
              <div
                key={pageIndex}
                className="w-full flex-shrink-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-rows-2 gap-6 p-2"
                style={{ minHeight: "520px" }}
              >
                {categories
                  .slice(pageIndex * itemsPerPage, (pageIndex + 1) * itemsPerPage)
                  .map((category, index) => (
                    <div
                      key={category.id}
                      className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl cursor-pointer transition-all duration-500 transform hover:-translate-y-2"

                      onClick={() => navigate(`/gallery/${encodeURIComponent(category.id)}`)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          navigate(`/gallery/${encodeURIComponent(category.id)}`)
                        }
                      }}
                    >
                      <div className="aspect-[4/3] md:aspect-auto md:h-full relative">
                        <img
                          src={category.image}
                          alt={category.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
                        
                        {/* Hover effect overlay */}
                        <div className="absolute inset-0 bg-[#102C57]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        <h3 className="text-xl font-bold mb-2 text-shadow-lg">
                          {category.title}
                        </h3>
                        <p className="text-sm text-gray-200 opacity-90 leading-relaxed">
                          {category.description}
                        </p>
                        
                        {/* View Gallery Button */}
                        <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                          <span className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium hover:bg-white/30 transition-colors duration-200">
                            View Gallery →
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Pagination Dots */}
        {totalPages > 1 && (
          <div className="mt-8 flex justify-center items-center space-x-3">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToPage(index)}
                className={`transition-all duration-300 rounded-full ${
                  currentPage === index
                    ? "h-4 w-8 bg-[#102C57] shadow-lg"
                    : "h-3 w-3 bg-gray-300 hover:bg-gray-400 hover:scale-110"
                }`}
                aria-label={`Go to page ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Page Counter */}
        <div className="text-center mt-4">
          <span className="text-sm text-[#102C57]/60 font-medium">
            {currentPage + 1} of {totalPages}
          </span>
        </div>
      </div>

      <style jsx>{`
        .text-shadow-lg {
          text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </section>
  )
}

export default GallerySection