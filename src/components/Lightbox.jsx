import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState, useCallback } from "react";

const API_URL = import.meta.env.VITE_API_URL;

const Lightbox = ({ images, currentIndex, onClose, onNext, onPrev }) => {
  const item = images[currentIndex];
  const viewedRef = useRef(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const imageRef = useRef(null);

  // Track views
  useEffect(() => {
    if (item && !viewedRef.current.has(item._id)) {
      viewedRef.current.add(item._id);
      incrementViews(item._id);
    }
  }, [item]);

  // Reset zoom and position when image changes
  useEffect(() => {
    setZoomLevel(1);
    setDragPosition({ x: 0, y: 0 });
    setIsLoading(true);
    setImageError(false);
  }, [currentIndex]);

  // View increment API call
  const incrementViews = async (id) => {
    try {
      await fetch(`${API_URL}/api/media/${id}/increment-views`, {
        method: "PATCH",
      });
    } catch (err) {
      console.error("Failed to increment views", err);
    }
  };

  // Dynamic aspect ratio calculation
  const getOptimalSize = useCallback((naturalWidth, naturalHeight) => {
    if (!naturalWidth || !naturalHeight) return { width: '90vw', height: '90vh' };
    
    const viewportWidth = window.innerWidth * 0.9;
    const viewportHeight = window.innerHeight * 0.9;
    const imageAspectRatio = naturalWidth / naturalHeight;
    const viewportAspectRatio = viewportWidth / viewportHeight;
    
    let width, height;
    
    if (imageAspectRatio > viewportAspectRatio) {
      // Image is wider than viewport ratio
      width = Math.min(viewportWidth, naturalWidth);
      height = width / imageAspectRatio;
    } else {
      // Image is taller than viewport ratio
      height = Math.min(viewportHeight, naturalHeight);
      width = height * imageAspectRatio;
    }
    
    return {
      width: `${width}px`,
      height: `${height}px`,
      maxWidth: '90vw',
      maxHeight: '90vh'
    };
  }, []);

  // Zoom handlers
  const handleZoomIn = useCallback(() => {
    setZoomLevel(prev => Math.min(prev + 0.25, 3));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoomLevel(prev => Math.max(prev - 0.25, 0.25));
  }, []);

  const handleResetZoom = useCallback(() => {
    setZoomLevel(1);
    setDragPosition({ x: 0, y: 0 });
  }, []);

  const handleFitToScreen = useCallback(() => {
    if (imageRef.current) {
      const img = imageRef.current;
      const containerWidth = window.innerWidth * 0.9;
      const containerHeight = window.innerHeight * 0.9;
      const scaleX = containerWidth / img.naturalWidth;
      const scaleY = containerHeight / img.naturalHeight;
      const optimalScale = Math.min(scaleX, scaleY, 1);
      setZoomLevel(optimalScale);
      setDragPosition({ x: 0, y: 0 });
    }
  }, []);

  // Drag handlers
  const handleMouseDown = useCallback((e) => {
    if (zoomLevel > 1) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - dragPosition.x,
        y: e.clientY - dragPosition.y
      });
    }
  }, [zoomLevel, dragPosition]);

  const handleMouseMove = useCallback((e) => {
    if (isDragging && zoomLevel > 1) {
      setDragPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  }, [isDragging, zoomLevel, dragStart]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Touch handlers for mobile
  const handleTouchStart = useCallback((e) => {
    if (zoomLevel > 1 && e.touches.length === 1) {
      const touch = e.touches[0];
      setIsDragging(true);
      setDragStart({
        x: touch.clientX - dragPosition.x,
        y: touch.clientY - dragPosition.y
      });
    }
  }, [zoomLevel, dragPosition]);

  const handleTouchMove = useCallback((e) => {
    if (isDragging && zoomLevel > 1 && e.touches.length === 1) {
      e.preventDefault();
      const touch = e.touches[0];
      setDragPosition({
        x: touch.clientX - dragStart.x,
        y: touch.clientY - dragStart.y
      });
    }
  }, [isDragging, zoomLevel, dragStart]);

  // Prevent right-click context menu to protect images
  const handleContextMenu = useCallback((e) => {
    e.preventDefault();
  }, []);

  // Enhanced keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowLeft":
        case "a":
        case "A":
          e.preventDefault();
          onPrev();
          break;
        case "ArrowRight":
        case "d":
        case "D":
          e.preventDefault();
          onNext();
          break;
        case "=":
        case "+":
          e.preventDefault();
          handleZoomIn();
          break;
        case "-":
          e.preventDefault();
          handleZoomOut();
          break;
        case "0":
          e.preventDefault();
          handleResetZoom();
          break;
        case "f":
        case "F":
          e.preventDefault();
          handleFitToScreen();
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose, onNext, onPrev, handleZoomIn, handleZoomOut, handleResetZoom, handleFitToScreen]);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  if (!item) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`lightbox-${item._id}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center select-none"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseUp}
        onContextMenu={handleContextMenu}
      >
        {/* Enhanced Controls */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-50">
          {/* Left controls */}
          <div className="flex items-center space-x-2">
            <div className="bg-black/50 backdrop-blur-sm rounded-lg px-3 py-1 text-white text-sm font-medium">
              {currentIndex + 1} / {images.length}
            </div>
            {item.title && (
              <div className="bg-black/50 backdrop-blur-sm rounded-lg px-3 py-1 text-white text-sm max-w-xs truncate">
                {item.title}
              </div>
            )}
          </div>

          {/* Right controls */}
          <div className="flex items-center space-x-2">
            {item.type === "image" && (
              <>
                <button
                  onClick={handleZoomOut}
                  className="p-2 bg-black/50 backdrop-blur-sm text-white rounded-lg hover:bg-black/70 transition-colors disabled:opacity-50"
                  disabled={zoomLevel <= 0.25}
                  title="Zoom Out (-)"
                >
                  <ZoomOut className="w-5 h-5" />
                </button>
                <div className="bg-black/50 backdrop-blur-sm rounded-lg px-2 py-1 text-white text-xs min-w-[60px] text-center">
                  {Math.round(zoomLevel * 100)}%
                </div>
                <button
                  onClick={handleZoomIn}
                  className="p-2 bg-black/50 backdrop-blur-sm text-white rounded-lg hover:bg-black/70 transition-colors disabled:opacity-50"
                  disabled={zoomLevel >= 3}
                  title="Zoom In (+)"
                >
                  <ZoomIn className="w-5 h-5" />
                </button>
              </>
            )}
            <button
              onClick={onClose}
              className="p-2 bg-black/50 backdrop-blur-sm text-white rounded-lg hover:bg-black/70 transition-colors"
              title="Close (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Buttons */}
        {images.length > 1 && (
          <>
            <button
              onClick={onPrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 backdrop-blur-sm text-white rounded-full hover:bg-black/70 transition-all transform hover:scale-110 z-50"
              title="Previous (← or A)"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={onNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 backdrop-blur-sm text-white rounded-full hover:bg-black/70 transition-all transform hover:scale-110 z-50"
              title="Next (→ or D)"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}

        {/* Media Display */}
        <div className="flex items-center justify-center w-full h-full p-4">
          <motion.div
            key={`media-${item._id}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.25 }}
            className="relative"
            style={{
              transform: `translate(${dragPosition.x}px, ${dragPosition.y}px)`,
              cursor: zoomLevel > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default'
            }}
          >
            {item.type === "video" ? (
              <video
                src={item.url}
                controls
                autoPlay
                className="max-w-[90vw] max-h-[90vh] object-contain"
                onLoadStart={() => setIsLoading(false)}
                onError={() => setImageError(true)}
                onContextMenu={handleContextMenu}
                controlsList="nodownload"
              />
            ) : (
              <>
                {isLoading && !imageError && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-lg">
                    <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  </div>
                )}

                {imageError ? (
                  <div className="flex items-center justify-center w-96 h-64 bg-gray-800 rounded-lg">
                    <div className="text-white text-center">
                      <div className="text-4xl mb-2">⚠️</div>
                      <div>Failed to load image</div>
                    </div>
                  </div>
                ) : (
                  <img
                    ref={imageRef}
                    src={item.url}
                    alt={item.title || "Media"}
                    className="object-contain"
                    style={{
                      ...getOptimalSize(
                        imageRef.current?.naturalWidth,
                        imageRef.current?.naturalHeight
                      ),
                      transform: `scale(${zoomLevel})`,
                      transition: isDragging ? 'none' : 'transform 0.3s ease-out'
                    }}
                    draggable="false"
                    onLoad={() => {
                      setIsLoading(false);
                      if (zoomLevel === 1) {
                        handleFitToScreen();
                      }
                    }}
                    onError={() => setImageError(true)}
                    onMouseDown={handleMouseDown}
                    onTouchStart={handleTouchStart}
                    onContextMenu={handleContextMenu}
                  />
                )}
              </>
            )}
          </motion.div>
        </div>

        {/* Copyright Notice */}
        <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm rounded-lg px-3 py-1 text-white text-xs opacity-80">
          © Vidhi Digitals - All Rights Reserved
        </div>

        {/* Keyboard shortcuts help */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm rounded-lg px-4 py-2 text-white text-xs opacity-70">
          Use ←→ or A/D to navigate • +/- to zoom • F to fit • Esc to close
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Lightbox;
