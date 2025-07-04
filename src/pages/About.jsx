import { useState, useEffect } from "react";

const testimonials = [
  {
    quote: "One of the most passionate photographers I’ve worked with. The way he captures emotions is magic.",
    name: "Anjali Verma",
    title: "Wedding Client",
  },
  {
    quote: "Our brand campaign came to life through his lens. Professional, creative, and visionary.",
    name: "Karan Singh",
    title: "Creative Director, LightCo",
  },
  {
    quote: "Each photo told a story. His style is unique and timeless.",
    name: "Neha Patel",
    title: "Model & Actor",
  },
];

const gear = [
  { label: "Canon EOS R6", emoji: "📷" },
  { label: "Sigma Art 35mm f/1.4", emoji: "🔍" },
  { label: "Godox Flash Kit", emoji: "💡" },
  { label: "Lightroom & Photoshop", emoji: "🖥️" },
  { label: "DJI Mavic Air 2", emoji: "🚁" },
  { label: "Color Grading Expertise", emoji: "🎨" },
];

export default function About() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((i) => (i + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="min-h-screen bg-base-bg dark:bg-dark-bg px-4 sm:px-6 md:px-20 py-20 sm:py-24 text-text dark:text-dark-text transition-colors duration-300">
      {/* Top Section */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
        {/* Profile Image */}
        <div className="w-full md:w-1/2 relative group">
          <div className="rounded-3xl overflow-hidden shadow-xl border-4 border-tan dark:border-rawUmber transition-all duration-300 group-hover:scale-105 aspect-[4/5] md:aspect-auto">
            <img
              src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe"
              alt="Photographer at work"
              className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-500"
            />
          </div>
        </div>

        {/* Text Content */}
        <div className="w-full md:w-1/2 space-y-6 mt-10 md:mt-0">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading text-heading dark:text-tan">
            About Me
          </h2>
          <div className="h-1 w-16 sm:w-20 bg-chamoisee dark:bg-dun rounded-full" />
          <p className="text-base sm:text-lg font-body leading-relaxed tracking-wide">
            I’m a passionate photographer with a love for storytelling through light and composition.
            From portraits to landscapes, I aim to capture the essence of the moment in every frame.
          </p>
          <p className="text-base sm:text-lg font-body leading-relaxed tracking-wide">
            With over 7 years of experience behind the lens, my approach is both technical and intuitive.
            Every shoot is a chance to create timeless visuals that speak louder than words.
          </p>
          <p className="text-base sm:text-lg font-body leading-relaxed tracking-wide">
            Let’s create something unforgettable together.
          </p>
        </div>
      </div>

      {/* Testimonials */}
      <div className="mt-20 sm:mt-24 max-w-4xl mx-auto text-center px-4">
        <h3 className="text-2xl sm:text-3xl font-heading text-heading dark:text-tan mb-6">
          ✨ What Clients Say
        </h3>
        <div className="relative">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className={`transition-opacity duration-700 ${
                i === activeIndex ? "opacity-100" : "opacity-0 absolute inset-0"
              }`}
            >
              <div className="bg-white/40 dark:bg-black/20 backdrop-blur-xl border border-chamoisee/20 dark:border-tan/20 rounded-2xl p-6 sm:p-8 shadow-lg max-w-3xl mx-auto">
                <blockquote className="text-base sm:text-xl italic font-body text-chamoisee dark:text-dun leading-relaxed">
                  “{t.quote}”
                </blockquote>
                <p className="mt-3 text-xs sm:text-sm font-semibold text-coffee dark:text-tan">
                  — {t.name}, <span className="italic font-light">{t.title}</span>
                </p>
              </div>
            </div>
          ))}
          <div className="flex justify-center gap-2 mt-4">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`h-2 w-2 rounded-full transition-all duration-300 ${
                  i === activeIndex
                    ? "bg-raw-umber dark:bg-tan scale-110"
                    : "bg-gray-400 dark:bg-gray-600"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Gear Grid */}
      <div className="mt-20 sm:mt-24 max-w-5xl mx-auto text-center px-2 sm:px-4">
        <h3 className="text-2xl sm:text-3xl font-heading text-heading dark:text-tan mb-6">
          🛠️ My Gear & Tools
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 font-body text-lg text-coffee dark:text-dun">
          {gear.map((item, i) => (
            <div
              key={i}
              className="bg-dun/20 dark:bg-rawUmber/30 rounded-2xl p-5 shadow-md hover:shadow-xl hover:scale-[1.03] transition-all"
            >
              <div className="text-3xl mb-2">{item.emoji}</div>
              <p className="font-medium">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
