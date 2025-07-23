"use client"

import { useNavigate } from "react-router-dom"

const categories = [
  {
    id: "weddings",
    title: "Weddings",
    description: "Romantic moments captured forever",
    image: "/placeholder.svg?height=400&width=600&text=Wedding+Photography",
    count: 45,
  },
  {
    id: "portraits",
    title: "Portraits",
    description: "Professional headshots and personal portraits",
    image: "/placeholder.svg?height=400&width=600&text=Portrait+Photography",
    count: 32,
  },
  {
    id: "lifestyle",
    title: "Lifestyle",
    description: "Candid moments and everyday beauty",
    image: "/placeholder.svg?height=400&width=600&text=Lifestyle+Photography",
    count: 28,
  },
  {
    id: "events",
    title: "Events",
    description: "Corporate and social gatherings",
    image: "/placeholder.svg?height=400&width=600&text=Event+Photography",
    count: 19,
  },
]

const GallerySection = () => {
  const navigate = useNavigate()

  return (
    <section id="gallery" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#102C57] mb-4">Photography Gallery</h2>
          <p className="text-xl text-[#102C57]/70 max-w-2xl mx-auto">
            Explore my work across different photography styles and occasions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {categories.map((category) => (
            <div
              key={category.id}
              onClick={() => navigate(`/gallery/${category.id}`)}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] cursor-pointer"
            >
              <div className="aspect-[4/3] relative">
                <img
                  src={category.image || "/placeholder.svg"}
                  alt={category.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">{category.title}</h3>
                <p className="text-gray-200 mb-2">{category.description}</p>
                <span className="text-sm text-gray-300">{category.count} photos</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default GallerySection
