export default function Contact() {
  return (
    <section className="min-h-screen px-4 sm:px-6 md:px-20 py-20 sm:py-28 bg-base-bg dark:bg-dark-bg text-text dark:text-dark-text transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-heading text-heading dark:text-tan text-center mb-16">
          Let’s Connect
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Contact Form */}
          <form
            onSubmit={(e) => e.preventDefault()}
            className="lg:col-span-2 bg-white dark:bg-black/20 backdrop-blur rounded-2xl shadow-lg p-6 sm:p-10 space-y-6"
          >
            <div>
              <label htmlFor="name" className="block font-body mb-1 text-heading dark:text-dun">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-3 rounded-lg border border-chamoisee dark:border-rawUmber bg-dun/30 dark:bg-dark-bg text-base focus:outline-none focus:ring-2 focus:ring-rawUmber dark:focus:ring-tan"
                placeholder="John Doe"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block font-body mb-1 text-heading dark:text-dun">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-3 rounded-lg border border-chamoisee dark:border-rawUmber bg-dun/30 dark:bg-dark-bg text-base focus:outline-none focus:ring-2 focus:ring-rawUmber dark:focus:ring-tan"
                placeholder="john@example.com"
                required
              />
            </div>

            <div>
              <label htmlFor="message" className="block font-body mb-1 text-heading dark:text-dun">
                Message
              </label>
              <textarea
                id="message"
                rows="5"
                className="w-full px-4 py-3 rounded-lg border border-chamoisee dark:border-rawUmber bg-dun/30 dark:bg-dark-bg text-base focus:outline-none focus:ring-2 focus:ring-rawUmber dark:focus:ring-tan"
                placeholder="Type your message here..."
                required
              />
            </div>

            <button
              type="submit"
              className="bg-raw-umber dark:bg-tan text-white dark:text-dark-bg font-medium px-6 py-3 rounded-full hover:bg-chamoisee dark:hover:bg-dun transition"
            >
              Send Message →
            </button>
          </form>

          {/* Contact Info + Map */}
          <div className="space-y-6 text-base font-body flex flex-col justify-between">
            <div className="rounded-xl overflow-hidden shadow-lg">
              <iframe
                title="Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.0266870212023!2d73.84716417497455!3d18.56230976742202!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c07638c4f38b%3A0x1cfcff8f7d4f22c4!2sPune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1719144500000!5m2!1sen!2sin"
                width="100%"
                height="220"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                className="w-full h-[220px] md:h-[220px]"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            
            <div className="bg-dun/40 dark:bg-rawUmber/30 p-6 rounded-xl shadow">
              <h4 className="font-heading text-xl text-heading dark:text-tan mb-2">📍 Location</h4>
              <p>Pune, Maharashtra, India</p>
            </div>

            <div className="bg-dun/40 dark:bg-rawUmber/30 p-6 rounded-xl shadow">
              <h4 className="font-heading text-xl text-heading dark:text-tan mb-2">✉️ Email</h4>
              <p>hello@myphotography.com</p>
            </div>

            <div className="bg-dun/40 dark:bg-rawUmber/30 p-6 rounded-xl shadow">
              <h4 className="font-heading text-xl text-heading dark:text-tan mb-2">🔗 Social</h4>
              <div className="flex gap-4 flex-wrap">
                <a href="#" className="hover:text-chamoisee dark:hover:text-dun">Instagram</a>
                <a href="#" className="hover:text-chamoisee dark:hover:text-dun">Facebook</a>
                <a href="#" className="hover:text-chamoisee dark:hover:text-dun">LinkedIn</a>
              </div>
            </div>

            
          </div>
        </div>
      </div>
    </section>
  );
}
