"use client";

import { useRef, useState, useEffect, useCallback, useMemo, memo } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Camera, ArrowRight } from "lucide-react";

const categories = [
  {
    id: "all",
    title: "All",
    description: "Browse everything in one place",
    thumb: "/covers/all-400.webp",
    image: "/covers/all-1920.webp",
  },
  {
    id: "Baby shoot",
    title: "Baby Shoot",
    description: "Adorable moments of little ones",
    thumb: "/covers/baby-400.webp",
    image: "/covers/baby-1920.webp",
  },
  {
    id: "Maternity shoot",
    title: "Maternity Shoot",
    description: "Beautiful memories of motherhood",
    thumb: "/covers/maternity-400.webp",
    image: "/covers/maternity-1920.webp",
  },
  {
    id: "Wedding pre-wedding shoot",
    title: "Wedding & Pre-Wedding",
    description: "Celebrate love and togetherness",
    thumb: "/covers/wedding-400.webp",
    image: "/covers/wedding-1920.webp",
  },
  {
    id: "Corporate Photography",
    title: "Corporate Photography",
    description: "Professional events and portraits",
    thumb: "/covers/corporate-400.webp",
    image: "/covers/corporate-1920.webp",
  },
  {
    id: "Videos",
    title: "Videos",
    description: "Creative video storytelling",
    thumb: "/covers/video-400.webp",
    image: "/covers/video-1920.webp",
  },
  {
    id: "Product photography",
    title: "Product Photography",
    description: "Showcase products with style",
    thumb: "/covers/product-400.webp",
    image: "/covers/product-1920.webp",
  },
  {
    id: "Collage photo frame design",
    title: "Collage Frame Design",
    description: "Memories beautifully arranged",
    thumb: "/covers/collage-400.webp",
    image: "/covers/collage-1920.webp",
  },
  {
    id: "Extras",
    title: "Extras",
    description: "Additional services and offerings",
    thumb: "/covers/extras-400.webp",
    image: "/covers/extras-1920.webp",
  },
];

// Enhanced Shimmer Effect Component
const ShimmerPlaceholder = memo(() => (
  <div className="absolute inset-0 bg-gradient-to-r from-[#EADBC8]/20 via-[#EADBC8]/10 to-[#EADBC8]/20 overflow-hidden">
    <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
  </div>
));

ShimmerPlaceholder.displayName = 'ShimmerPlaceholder';

// Memoized category card component to prevent unnecessary re-renders
const CategoryCard = memo(({ category, loadedImages, onNavigate, onImageLoad }) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = useCallback(() => {
    onNavigate(`/gallery/${encodeURIComponent(category.id)}`);
  }, [category.id, onNavigate]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  }, [handleClick]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !loadedImages[category.id]) {
          onImageLoad(category.id);
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "150px" }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [category.id, loadedImages, onImageLoad]);

  return (
    <div
      ref={cardRef}
      className="group relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl cursor-pointer transition-all duration-500 transform hover:-translate-y-3 will-change-transform focus:outline-none focus:ring-2 focus:ring-[#DAC0A3] focus:ring-offset-2 bg-gray-100"
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="button"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      aria-label={`View ${category.title} gallery`}
    >
      {/* Enhanced Shimmer Loading */}
      {!loadedImages[category.id] && <ShimmerPlaceholder />}
      
      <img
        src={loadedImages[category.id] ? category.image : category.thumb}
        alt={`${category.title} - Professional photography showcase`}
        loading="lazy"
        decoding="async"
        className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 ${
          loadedImages[category.id] ? "opacity-100" : "opacity-0"
        } ${isHovered ? "scale-110" : "scale-100"}`}
      />
      
      {/* Enhanced Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-70 group-hover:opacity-85 transition-opacity duration-300" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#102C57]/10 to-[#DAC0A3]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Loading indicator */}
      {!loadedImages[category.id] && (
        <div className="absolute top-4 right-4 z-10">
          <div className="w-6 h-6 border-2 border-white/20 border-t-white/80 rounded-full animate-spin"></div>
        </div>
      )}
      
      {/* Enhanced Content with Better Typography */}
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 z-10">
        <h3 className="text-xl lg:text-2xl font-bold mb-3 text-white drop-shadow-lg tracking-wide">
          {category.title}
        </h3>
        <p className="text-sm lg:text-base text-gray-200 opacity-90 leading-relaxed mb-4">
          {category.description}
        </p>
        
        {/* Enhanced CTA Button */}
        <div className="opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 delay-100">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-sm rounded-full text-sm font-semibold hover:from-white/30 hover:to-white/20 transition-all duration-200 border border-white/30 hover:border-white/50">
            <span>View Gallery</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
          </div>
        </div>
      </div>
    </div>
  );
});

CategoryCard.displayName = 'CategoryCard';

const GallerySection = () => {
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const resizeTimeoutRef = useRef(null);

  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(2);
  const [loadedImages, setLoadedImages] = useState({});

  // Memoize calculations to prevent unnecessary recalculations
  const totalPages = useMemo(() => 
    Math.ceil(categories.length / itemsPerPage), 
    [itemsPerPage]
  );

  const currentPageCategories = useMemo(() => {
    const startIndex = currentPage * itemsPerPage;
    return categories.slice(startIndex, startIndex + itemsPerPage);
  }, [currentPage, itemsPerPage]);

  const allPages = useMemo(() => 
    Array.from({ length: totalPages }, (_, pageIndex) => {
      const startIndex = pageIndex * itemsPerPage;
      return categories.slice(startIndex, startIndex + itemsPerPage);
    }), 
    [totalPages, itemsPerPage]
  );

  // Debounced resize handler for better performance
  const updatePagination = useCallback(() => {
    const screenWidth = window.innerWidth;
    let itemsPerPageCount;

    if (screenWidth < 768) {
      itemsPerPageCount = 2;
    } else if (screenWidth < 1024) {
      itemsPerPageCount = 4;
    } else {
      itemsPerPageCount = 6;
    }

    setItemsPerPage(itemsPerPageCount);
    
    const newTotalPages = Math.ceil(categories.length / itemsPerPageCount);
    if (currentPage >= newTotalPages) {
      setCurrentPage(0);
    }
  }, [currentPage]);

  const debouncedUpdatePagination = useCallback(() => {
    if (resizeTimeoutRef.current) {
      clearTimeout(resizeTimeoutRef.current);
    }
    resizeTimeoutRef.current = setTimeout(updatePagination, 150);
  }, [updatePagination]);

  useEffect(() => {
    updatePagination();
    window.addEventListener("resize", debouncedUpdatePagination);
    return () => {
      window.removeEventListener("resize", debouncedUpdatePagination);
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
    };
  }, [debouncedUpdatePagination, updatePagination]);

  // Enhanced keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft" && currentPage > 0) {
        e.preventDefault();
        scrollToPage(currentPage - 1);
      } else if (e.key === "ArrowRight" && currentPage < totalPages - 1) {
        e.preventDefault();
        scrollToPage(currentPage + 1);
      } else if (e.key === "Home") {
        e.preventDefault();
        scrollToPage(0);
      } else if (e.key === "End") {
        e.preventDefault();
        scrollToPage(totalPages - 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentPage, totalPages]);

  // Optimized image preloading with batch processing
  const preloadPageImages = useCallback((pageIndex) => {
    if (pageIndex >= totalPages || pageIndex < 0) return;
    
    requestIdleCallback(() => {
      const startIndex = pageIndex * itemsPerPage;
      const imgs = categories.slice(startIndex, startIndex + itemsPerPage);
      imgs.forEach((cat) => {
        if (!loadedImages[cat.id]) {
          const img = new Image();
          img.src = cat.image;
          img.onload = () => {
            setLoadedImages(prev => ({ ...prev, [cat.id]: true }));
          };
        }
      });
    });
  }, [itemsPerPage, totalPages, loadedImages]);

  const scrollToPage = useCallback((pageIndex) => {
    const container = scrollRef.current;
    if (!container || pageIndex === currentPage) return;

    const pageWidth = container.offsetWidth;
    container.scrollTo({ left: pageIndex * pageWidth, behavior: "smooth" });
    setCurrentPage(pageIndex);
    
    // Preload adjacent pages
    preloadPageImages(pageIndex + 1);
    preloadPageImages(pageIndex - 1);
  }, [preloadPageImages, currentPage]);

  const handlePrevPage = useCallback(() => {
    if (currentPage > 0) {
      scrollToPage(currentPage - 1);
    }
  }, [currentPage, scrollToPage]);

  const handleNextPage = useCallback(() => {
    if (currentPage < totalPages - 1) {
      scrollToPage(currentPage + 1);
    }
  }, [currentPage, totalPages, scrollToPage]);

  const handleImageLoad = useCallback((categoryId) => {
    setLoadedImages(prev => ({ ...prev, [categoryId]: true }));
  }, []);

  const handleNavigate = useCallback((path) => {
    navigate(path);
  }, [navigate]);

  // Memoized pagination dots to prevent re-renders
  const paginationDots = useMemo(() => 
    Array.from({ length: totalPages }, (_, index) => (
      <button
        key={index}
        onClick={() => scrollToPage(index)}
        className={`transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#DAC0A3] focus:ring-offset-1 ${
          currentPage === index
            ? "h-4 w-8 bg-gradient-to-r from-[#102C57] to-[#1a3a6b] shadow-lg transform scale-110"
            : "h-3 w-3 bg-gray-300 hover:bg-[#DAC0A3] hover:scale-125"
        }`}
        aria-label={`Go to page ${index + 1}`}
      />
    )), 
    [totalPages, currentPage, scrollToPage]
  );

  // Preload initial images
  useEffect(() => {
    preloadPageImages(0);
    preloadPageImages(1);
  }, [preloadPageImages]);

  return (
    <section 
      id="gallery" 
      className="py-20 bg-gradient-to-b from-[#FEFAF6] to-[#F5F1E8] relative overflow-hidden"
      aria-label="Photography portfolio gallery"
    >
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-[#EADBC8]/8 to-transparent rounded-full transform -translate-x-48 -translate-y-48"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-tl from-[#DAC0A3]/8 to-transparent rounded-full transform translate-x-32 translate-y-32"></div>

      {/* Enhanced Heading */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center relative z-10">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#102C57] mb-6 leading-tight">
          Photography <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#DAC0A3] via-[#EADBC8] to-[#DAC0A3]">Gallery</span>
        </h2>
        <p className="text-xl lg:text-2xl text-[#102C57]/70 max-w-3xl mx-auto leading-relaxed">
          Explore my work across different photography styles and occasions
        </p>
        <div className="h-1.5 w-24 bg-gradient-to-r from-[#DAC0A3] via-[#EADBC8] to-[#DAC0A3] rounded-full mx-auto mt-6"></div>
      </div>

      {/* Navigation */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 0}
          className={`absolute left-2 lg:left-4 top-1/2 transform -translate-y-1/2 z-20 p-3 rounded-full shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#DAC0A3] focus:ring-offset-2 ${
            currentPage === 0
              ? "bg-gray-100 text-gray-400 cursor-not-allowed opacity-50"
              : "bg-white/90 backdrop-blur-sm text-[#102C57] hover:bg-[#102C57] hover:text-white hover:shadow-xl hover:scale-110"
          }`}
          aria-label="Previous page"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages - 1}
          className={`absolute right-2 lg:right-4 top-1/2 transform -translate-y-1/2 z-20 p-3 rounded-full shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#DAC0A3] focus:ring-offset-2 ${
            currentPage === totalPages - 1
              ? "bg-gray-100 text-gray-400 cursor-not-allowed opacity-50"
              : "bg-white/90 backdrop-blur-sm text-[#102C57] hover:bg-[#102C57] hover:text-white hover:shadow-xl hover:scale-110"
          }`}
          aria-label="Next page"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* Gallery */}
        <div className="overflow-hidden rounded-2xl" ref={scrollRef}>
          <div className="flex transition-transform duration-500 ease-in-out will-change-transform">
            {allPages.map((pageCategories, pageIndex) => (
              <div
                key={pageIndex}
                className="w-full flex-shrink-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-rows-2 gap-6 p-4 lg:p-6"
                style={{ minHeight: "600px" }}
              >
                {pageCategories.map(category => (
                  <CategoryCard
                    key={category.id}
                    category={category}
                    loadedImages={loadedImages}
                    onNavigate={handleNavigate}
                    onImageLoad={handleImageLoad}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Pagination */}
        {totalPages > 1 && (
          <div className="mt-12 space-y-4">
            <div className="flex justify-center items-center space-x-3">
              {paginationDots}
            </div>
            <div className="text-center">
              <span className="text-sm text-[#102C57]/60 font-medium">
                Page {currentPage + 1} of {totalPages} • Use arrow keys to navigate
              </span>
            </div>
          </div>
        )}
      </div>
      
      {/* Enhanced CSS with better shimmer animation */}
      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </section>
  );
};

export default GallerySection;
