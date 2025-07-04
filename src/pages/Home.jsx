// src/pages/Home.jsx
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="relative h-screen flex items-center justify-center md:justify-start px-6 md:px-20 text-body-text dark:text-dark-text transition-colors duration-300 overflow-hidden">


      {/* Background Image */}
      <div className="absolute inset-0 -z-20">
        <img
          src="https://images.unsplash.com/photo-1504215680853-026ed2a45def"
          alt="Photographer at work"
          className="w-full h-full object-cover brightness-75 dark:brightness-50 scale-105 transition-transform duration-1000 ease-out"
        />
      </div>

      {/* ✅ Fixed Overlay Gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-almond/90 via-almond/20 to-transparent dark:from-dark-bg/90 dark:via-dark-bg/30" />

      {/* Hero Content */}
      <div className="relative z-10 max-w-2xl space-y-6 animate-fadeIn">
        <h1 className="text-4xl md:text-6xl font-heading font-bold leading-tight text-heading dark:text-tan drop-shadow-md">
          Capturing Stories<br className="hidden sm:block" />
          Through the Lens
        </h1>
        <p className="text-lg md:text-xl font-body max-w-md leading-relaxed text-body-text/90 dark:text-dark-text/80">
          Discover timeless frames, emotions, and light through my curated photography collection.
        </p>
        <Link
          to="/gallery"
          className="inline-block mt-4 px-6 py-3 bg-heading text-white dark:bg-tan dark:text-dark-bg font-medium rounded-full shadow hover:scale-105 hover:shadow-lg hover:bg-chamoisee dark:hover:bg-dun transition-all duration-300"
        >
          📸 View Gallery
        </Link>
      </div>
    </section>
  );
}
