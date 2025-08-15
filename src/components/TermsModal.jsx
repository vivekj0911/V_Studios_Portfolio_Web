"use client";

import { useEffect, useCallback } from "react";
import { X } from "lucide-react";

const TermsModal = ({ onAccept, onDecline = null, showDecline = false }) => {
  // Handle escape key press
  const handleKeyDown = useCallback((event) => {
    if (event.key === "Escape" && onDecline) {
      onDecline();
    }
  }, [onDecline]);

  // Handle backdrop click
  const handleBackdropClick = useCallback((event) => {
    if (event.target === event.currentTarget && onDecline) {
      onDecline();
    }
  }, [onDecline]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    
    return () => {
      document.body.style.overflow = "unset";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  // Focus trap for better accessibility
  useEffect(() => {
    const modal = document.querySelector('[role="dialog"]');
    if (modal) {
      modal.focus();
    }
  }, []);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={handleBackdropClick}
      aria-hidden="true"
    >
      <div
        className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl animate-in zoom-in-95 duration-200 slide-in-from-bottom-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="terms-title"
        aria-describedby="terms-content"
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with optional close button */}
        <div className="flex items-start justify-between mb-6">
          <h2 
            id="terms-title"
            className="text-2xl font-bold text-[#102C57] flex-1"
          >
            Terms & Conditions
          </h2>
          {onDecline && (
            <button
              onClick={onDecline}
              className="ml-4 p-1 text-[#102C57]/60 hover:text-[#102C57] transition-colors rounded-full hover:bg-gray-100"
              aria-label="Close terms modal"
              type="button"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Content */}
        <div 
          id="terms-content"
          className="text-[#102C57]/80 mb-8 text-left space-y-4 leading-relaxed"
        >
          <p className="font-medium">
            All images and videos on this site are copyright protected.
          </p>
          <p>
            You may not download, reproduce, distribute, or use any content 
            from this gallery without explicit written permission.
          </p>
          <p>
            For licensing inquiries or usage permissions, please{" "}
            <span className="font-medium">contact us directly</span>.
          </p>
          <div className="mt-6 p-4 bg-gray-50 rounded-lg border-l-4 border-[#102C57]">
            <p className="text-sm text-[#102C57]/70">
              By accepting these terms, you acknowledge that you understand 
              and agree to respect the copyright restrictions outlined above.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          {showDecline && onDecline && (
            <button
              onClick={onDecline}
              className="flex-1 bg-gray-100 text-[#102C57] py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors font-semibold border border-gray-200"
              type="button"
            >
              Decline
            </button>
          )}
          <button
            onClick={onAccept}
            className={`${
              showDecline ? "flex-1" : "w-full"
            } bg-[#102C57] text-white py-3 px-6 rounded-lg hover:bg-[#102C57]/90 transition-colors font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:transform-none`}
            type="button"
            autoFocus
          >
            Accept & Continue
          </button>
        </div>

        {/* Legal Notice */}
        <div className="mt-6 pt-4 border-t border-gray-100">
          <p className="text-xs text-[#102C57]/50 text-center">
            This agreement is governed by applicable copyright and intellectual property laws.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsModal;