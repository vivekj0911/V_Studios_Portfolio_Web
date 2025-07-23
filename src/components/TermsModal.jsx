"use client"

const TermsModal = ({ onAccept }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <div className="bg-white rounded-2xl p-8 max-w-md mx-4 text-center">
        <h2 className="text-2xl font-bold text-[#102C57] mb-6">Terms & Conditions</h2>
        <div className="text-[#102C57]/80 mb-6 text-left">
          <p className="mb-4">All images and videos on this site are copyright protected.</p>
          <p className="mb-4">Do not download, reuse, or share them without permission.</p>
          <p>Contact us for licensing inquiries.</p>
        </div>
        <button
          onClick={onAccept}
          className="w-full bg-[#102C57] text-white py-3 px-6 rounded-lg hover:bg-[#102C57]/90 transition-colors font-semibold"
        >
          Accept & Continue
        </button>
      </div>
    </div>
  )
}

export default TermsModal
