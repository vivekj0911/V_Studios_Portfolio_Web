
import { lazy, Suspense } from "react";

// Lazy load page components
const Gallery = lazy(() => import("./Gallery"));
const About = lazy(() => import("./About"));
const Contact = lazy(() => import("./Contact"));

export default function Home() {
  return (
    <main className="bg-base-bg text-body-text font-body scroll-smooth">
      {/* HERO SECTION */}
      <section
        id="hero"
        className="min-h-screen flex flex-col justify-center px-6 md:px-20 py-24 gap-6 text-center md:text-left"
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold leading-tight text-heading">
          Transforming Moments <br className="hidden sm:block" />
          Into Artful Stories
        </h1>

        <p className="text-lg sm:text-xl max-w-xl mx-auto md:mx-0 leading-relaxed">
          Dive into a visual journey where every frame is crafted with purpose, emotion, and light.
        </p>

        <a
          href="#gallery"
          className="inline-block self-center md:self-start mt-4 px-6 py-3 rounded-full bg-heading text-white font-medium shadow-md hover:scale-105 hover:shadow-lg hover:bg-tan transition-all duration-300"
        >
          📸 Explore Gallery
        </a>
      </section>

      {/* LAZY SECTIONS BELOW */}
      <Suspense fallback={<div className="text-center py-10">Loading gallery...</div>}>
        <section id="gallery" className="border-t border-beige">
          <Gallery />
        </section>
      </Suspense>

      <Suspense fallback={<div className="text-center py-10">Loading about...</div>}>
        <section id="about" className="border-t border-beige">
          <About />
        </section>
      </Suspense>

      <Suspense fallback={<div className="text-center py-10">Loading contact...</div>}>
        <section id="contact" className="border-t border-beige">
          <Contact />
        </section>
      </Suspense>
    </main>
  );
}
