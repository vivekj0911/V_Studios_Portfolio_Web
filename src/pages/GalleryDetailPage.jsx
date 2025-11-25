import { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Play } from "lucide-react";
import TermsModal from "../components/TermsModal";
import Lightbox from "../components/Lightbox";
import { motion, AnimatePresence } from "framer-motion";

const API_URL = import.meta.env.VITE_API_URL;

// Configuration constants
const INITIAL_SKELETON_COUNT = 8;

// Utility to optimize Cloudinary images
const getOptimizedUrl = (url, width = 800) => {
  if (!url || !url.includes("/upload/")) return url;
  return url.replace("/upload/", `/upload/f_auto,q_auto,w_${width}/`);
};

// Custom hook for terms acceptance
const useTermsAcceptance = () => {
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [hasAcceptedTerms, setHasAcceptedTerms] = useState(false);

  useEffect(() => {
    const acceptedTerms = localStorage.getItem("photography-terms-accepted");
    if (acceptedTerms === "true") {
      setHasAcceptedTerms(true);
    } else {
      setShowTermsModal(true);
    }
  }, []);

  const handleAcceptTerms = useCallback(() => {
    localStorage.setItem("photography-terms-accepted", "true");
    setHasAcceptedTerms(true);
    setShowTermsModal(false);
  }, []);

  return { showTermsModal, hasAcceptedTerms, handleAcceptTerms };
};

// Custom hook for gallery data management
const useGalleryData = (selectedCategory, hasAcceptedTerms) => {
  const [galleryData, setGalleryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    const fetchGallery = async () => {
      if (!hasAcceptedTerms) return;

      setLoading(true);
      setError(null);

      try {
        const query = selectedCategory && selectedCategory !== "All"
          ? `?category=${encodeURIComponent(selectedCategory)}`
          : "";
        
        const response = await fetch(`${API_URL}/api/media${query}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (!mounted) return;

        // Load all images at once - no progressive loading
        if (Array.isArray(data)) {
          setGalleryData(data);
        } else {
          setGalleryData([]);
        }
      } catch (err) {
        console.error("Failed to load gallery:", err);
        if (mounted) {
          setError(err.message);
          setGalleryData([]);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchGallery();

    return () => {
      mounted = false;
    };
  }, [selectedCategory, hasAcceptedTerms]);

  return { galleryData, loading, error };
};

// Custom hook for image loading state
const useImageLoading = () => {
  const [imageLoaded, setImageLoaded] = useState({});

  const handleImageLoad = useCallback((id) => {
    setImageLoaded(prev => ({ ...prev, [id]: true }));
  }, []);

  return { imageLoaded, handleImageLoad };
};

// Memoized skeleton loader
const SkeletonLoader = ({ count = INITIAL_SKELETON_COUNT }) => (
  <>
    {Array.from({ length: count }, (_, index) => (
      <div
        key={`skeleton-${index}`}
        className="aspect-square bg-gray-200 animate-pulse rounded-lg shadow-md"
      />
    ))}
  </>
);

// Memoized gallery item component
const GalleryItem = ({ item, index, onImageLoad, onItemClick }) => {
  const handleImageLoadComplete = useCallback(() => {
    onImageLoad(item._id);
  }, [item._id, onImageLoad]);

  const handleClick = useCallback(() => {
    onItemClick(index);
  }, [index, onItemClick]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="group relative aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
      onClick={handleClick}
    >
      {item.type === "video" ? (
        <video
          src={item.url}
          className="w-full h-full object-cover pointer-events-none"
          muted
          playsInline
          preload="metadata"
          onLoadedData={handleImageLoadComplete}
        />
      ) : (
        <img
          src={getOptimizedUrl(item.url, 800)}
          alt={item.title || "Gallery image"}
          loading="lazy"
          onLoad={handleImageLoadComplete}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 select-none pointer-events-none"
          draggable="false"
        />
      )}

      {/* Play button for videos */}
      {item.type === "video" && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
          <Play className="h-12 w-12 text-white opacity-80" />
        </div>
      )}

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-white font-medium text-sm truncate">
            {item.title || "Untitled"}
          </h3>
        </div>
      </div>
    </motion.div>
  );
};

// Main component
const GalleryDetailPage = () => {
  const navigate = useNavigate();
  const { category } = useParams();
  const [lightboxIndex, setLightboxIndex] = useState(null);

  // Computed values
  const readableCategory = useMemo(() => 
    decodeURIComponent(category || "All"), [category]
  );
  const selectedCategory = useMemo(() => 
    readableCategory.toLowerCase() === "all" ? "All" : readableCategory, 
    [readableCategory]
  );

  // Custom hooks
  const { showTermsModal, hasAcceptedTerms, handleAcceptTerms } = useTermsAcceptance();
  const { galleryData, loading, error } = useGalleryData(selectedCategory, hasAcceptedTerms);
  const { handleImageLoad } = useImageLoading();

  // Event handlers
  const handleContextMenu = useCallback((e) => e.preventDefault(), []);
  
  const handleBackClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const handleItemClick = useCallback((index) => {
    setLightboxIndex(index);
  }, []);

  const handleLightboxClose = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  const handleLightboxNext = useCallback(() => {
    setLightboxIndex(prev => (prev + 1) % galleryData.length);
  }, [galleryData.length]);

  const handleLightboxPrev = useCallback(() => {
    setLightboxIndex(prev => (prev - 1 + galleryData.length) % galleryData.length);
  }, [galleryData.length]);

  // Optimized lightbox images
  const lightboxImages = useMemo(() => 
    galleryData.map(img => ({
      ...img,
      url: getOptimizedUrl(img.url, 1200) // Higher quality for lightbox
    })), [galleryData]
  );

  // Reset scroll on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (showTermsModal) {
    return <TermsModal onAccept={handleAcceptTerms} />;
  }

  return (
    <div
      className="relative min-h-screen bg-[#FEFAF6] pt-20"
      onContextMenu={handleContextMenu}
    >
      {/* Navigation Header */}
      <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <nav className="flex items-center gap-4 text-[#102C57]" aria-label="Breadcrumb">
          <button
            onClick={handleBackClick}
            className="flex items-center gap-2 text-[#102C57] hover:text-[#102C57]/70 transition-colors text-sm font-medium"
            aria-label="Back to home"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to Home
          </button>
          <span className="text-xl font-semibold" aria-current="page">
            | {selectedCategory} Gallery
          </span>
        </nav>
        
        {/* Image Count */}
        {!loading && !error && galleryData.length > 0 && (
          <div className="mt-4 text-[#102C57]/70 text-sm font-medium">
            Showing {galleryData.length} {galleryData.length === 1 ? 'item' : 'items'}
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error ? (
          <div className="text-center py-12">
            <p className="text-red-600 text-lg mb-4">Failed to load gallery</p>
            <p className="text-[#102C57]/60">{error}</p>
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            role="grid"
            aria-label={`${selectedCategory} gallery`}
          >
            {/* Gallery Items */}
            {galleryData.map((item, index) => (
              <GalleryItem
                key={item._id}
                item={item}
                index={index}
                onImageLoad={handleImageLoad}
                onItemClick={handleItemClick}
              />
            ))}

            {/* Skeleton Loaders */}
            {loading && galleryData.length === 0 && <SkeletonLoader />}
          </motion.div>
        )}

        {/* Empty State */}
        {!loading && !error && galleryData.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[#102C57]/60 text-lg">
              No media found in this category.
            </p>
          </div>
        )}
      </main>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            images={lightboxImages}
            currentIndex={lightboxIndex}
            onClose={handleLightboxClose}
            onNext={handleLightboxNext}
            onPrev={handleLightboxPrev}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default GalleryDetailPage;