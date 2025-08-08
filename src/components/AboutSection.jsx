import { Star, Quote } from "lucide-react"
import { useState, useEffect } from "react"

const API_URL = import.meta.env.VITE_API_URL;

const AboutSection = () => {
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch(`${API_URL}/api/feedback/top3`)
        const data = await res.json()
        if (Array.isArray(data)) {
          setTestimonials(data)
        } else {
          console.error("Failed to fetch testimonials:", data)
        }
      } catch (err) {
        console.error("Failed to fetch testimonials:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchTestimonials()
  }, [])

  return (
    <section id="about" className="py-20 bg-[#FEFAF6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* About Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="relative">
            <img
              src="/Profile.JPG"
              alt="Pramod Dhamgaye - Professional Photographer"
              className="rounded-2xl shadow-lg w-full"
            />
          </div>

          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#102C57] mb-6">About Us – Vidhi Digitals</h2>
            <div className="space-y-4 text-lg text-[#102C57]/80">
              <p>
                Capturing Emotions for Over 20 Years<br />
                At Vidhi Digital, photography is not just our profession – it’s our passion. With over two decades of experience in the art of photography, we have been turning precious moments into timeless memories since the very beginning.
              </p>
              <p>
                Whether it’s the joy of a wedding, the innocence of childhood, the elegance of a fashion shoot, or the precision of product photography – we bring every frame to life with creativity, clarity, and emotion.
              </p>
              <p>
                Our commitment to quality, the use of modern equipment, and years of hands-on experience make us one of the trusted names in the field.
              </p>
              <p>
                Every photo we take tells a story — your story.
                If you're looking for a photography partner who understands the value of your special moments, Vidhi Digital is here for you.<br />
                We don’t just click photos. We capture emotions.
              </p>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-[#102C57] mb-4">What Clients Say</h3>
          <p className="text-xl text-[#102C57]/70">Trusted by couples, families, and businesses across Raipur</p>
        </div>

        {loading ? (
          <div className="text-center text-[#102C57]/70">Loading testimonials...</div>
        ) : testimonials.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <Quote className="h-8 w-8 text-[#EADBC8] mb-4" />
                <p className="text-[#102C57]/80 mb-4 italic">"{testimonial.message}"</p>

                <div className="flex items-center mb-2">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>

                <div>
                  <p className="font-semibold text-[#102C57]">{testimonial.name}</p>
                  <p className="text-sm text-[#102C57]/60">{testimonial.category}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-[#102C57]/70">No testimonials available yet.</div>
        )}
      </div>
    </section>
  )
}

export default AboutSection
