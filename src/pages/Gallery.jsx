import { useState } from "react";

const galleryImages = [
  // Add more images to test horizontal scroll
  {
    src: "https://images.unsplash.com/photo-1558979158-65a1eaa08691",
    alt: "Portrait with shadows",
    category: "Portrait",
  },
  {
    src: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
    alt: "Candid portrait",
    category: "Portrait",
  },
  {
    src: "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d",
    alt: "Mountain landscape",
    category: "Nature",
  },
  {
    src: "https://images.unsplash.com/photo-1504198266287-1659872e6590",
    alt: "Urban evening",
    category: "Urban",
  },
  {
    src: "https://images.unsplash.com/photo-1504198453319-5ce911bafcde",
    alt: "Studio lighting",
    category: "Studio",
  },
  {
    src: "https://images.unsplash.com/photo-1519682577862-22b62b24e493",
    alt: "Cinematic moment",
    category: "Studio",
  },
  {
    src: "https://images.unsplash.com/photo-1492447166138-50c3889fccb1",
    alt: "Natural light shoot",
    category: "Nature",
  },
  {
    src: "https://images.unsplash.com/photo-1516728778615-2d590ea1859c",
    alt: "City dusk",
    category: "Urban",
  },
];

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const filteredImages = selectedCategory
    ? galleryImages.filter((img) => img.category === selectedCategory)
    : galleryImages;

  return (
    <section className="min-h-screen bg-base-bg dark:bg-dark-bg px-4 md:px-10 py-20 text-text dark:text-dark-text transition-colors duration-300">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-heading font-bold text-heading dark:text-tan">
          My Gallery
        </h2>
        {selectedCategory && (
          <p className="mt-2 text-lg font-body">
            Showing <strong>{selectedCategory}</strong>{" "}
            <button
              onClick={() => setSelectedCategory(null)}
              className="ml-2 text-sm px-3 py-1 bg-chamoisee/20 dark:bg-tan/20 rounded hover:bg-chamoisee/40 dark:hover:bg-tan/30 transition"
            >
              ⬅ Back to All
            </button>
          </p>
        )}
      </div>

      {/* ✅ Desktop: 2 scrollable rows */}
      <div className="hidden md:grid grid-rows-2 gap-6 overflow-x-auto max-h-[80vh] pr-2">
        {[0, 1].map((row) => (
          <div
            key={row}
            className="flex gap-6 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-chamoisee/40"
          >
            {filteredImages
              .filter((_, i) => i % 2 === row)
              .map((image, index) => (
                <GalleryCard
                  key={`${row}-${index}`}
                  image={image}
                  onClick={() => setSelectedCategory(image.category)}
                />
              ))}
          </div>
        ))}
      </div>

      {/* ✅ Mobile: 1 scrollable row */}
      <div className="md:hidden flex gap-6 overflow-x-auto pb-2">
        {filteredImages.map((image, index) => (
          <GalleryCard
            key={index}
            image={image}
            onClick={() => setSelectedCategory(image.category)}
          />
        ))}
      </div>
    </section>
  );
}

function GalleryCard({ image, onClick }) {
  return (
    <div
      onClick={onClick}
      className="min-w-[250px] max-w-xs relative group overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
    >
      <img
        src={image.src}
        alt={image.alt}
        loading="lazy"
        className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 dark:group-hover:bg-white/10 transition duration-300" />
      <div className="absolute bottom-4 left-4 z-10 text-white dark:text-dun opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <h3 className="text-lg font-semibold">{image.category}</h3>
        <p className="text-sm">{image.alt}</p>
      </div>
    </div>
  );
}
