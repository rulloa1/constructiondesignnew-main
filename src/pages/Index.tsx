import React, { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { BookCoverHero } from "@/components/BookCoverHero";
import { Portfolio } from "@/components/Portfolio";
import { MusicPlayer } from "@/components/MusicPlayer";
import { Chatbot } from "@/components/Chatbot";
import { Services } from "@/components/Services";
import { Footer } from "@/components/Footer";
import { ParallaxBackground } from "@/components/ParallaxBackground";
const Index: React.FC = () => {
  const location = useLocation();
  const [bookOpened, setBookOpened] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check for navigation state to open portfolio
  useEffect(() => {
    if (location.state?.openPortfolio) {
      setBookOpened(true);
      // Clear the state after using it
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Handle escape key to close portfolio
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && bookOpened && !animating) {
        handleCloseBook();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [bookOpened, animating, handleCloseBook]);

  // Scroll to top when opening/closing portfolio
  useEffect(() => {
    if (!animating) {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
  }, [bookOpened, animating]);
  
  const handleCloseBook = useCallback(() => {
    if (animating) return; // Prevent double-clicks

    setAnimating(true);

    // Skip animation if user prefers reduced motion
    if (prefersReducedMotion) {
      setBookOpened(false);
      setAnimating(false);
      return;
    }

    // Reverse animation for closing
    setTimeout(() => {
      setBookOpened(false);
      setAnimating(false);
    }, 1500);
  }, [animating, prefersReducedMotion]);

  const handleOpenBook = useCallback(() => {
    if (animating) return; // Prevent double-clicks

    setAnimating(true);

    // Skip animation if user prefers reduced motion
    if (prefersReducedMotion) {
      setBookOpened(true);
      setAnimating(false);
      return;
    }
    setTimeout(() => {
      setBookOpened(true);
      setAnimating(false);
    }, 1500);
  }, [animating, prefersReducedMotion]);
  return <div className="min-h-screen bg-background">
      {/* Parallax Construction Tools Background */}
      <ParallaxBackground />
      
      {/* Book animation overlay */}
      {animating && !prefersReducedMotion && <div className="fixed inset-0 z-50 flex" role="presentation" aria-hidden="true">
          <div className={`w-1/2 h-full bg-charcoal origin-right transition-transform ${!bookOpened ? "animate-book-open-left" : "animate-book-close-left"}`} />
          <div className={`w-1/2 h-full bg-charcoal origin-left transition-transform ${!bookOpened ? "animate-book-open-right" : "animate-book-close-right"}`} />
        </div>}

      {!bookOpened ? <>
          <Header onPortfolioClick={handleOpenBook} />
          <Hero />
          <About onPortfolioClick={handleOpenBook} />
          <Services />
          <BookCoverHero onOpenBook={handleOpenBook} />
        </> : <>
          {/* Portfolio view with navigation header */}
          <div className="sticky top-0 z-30 bg-charcoal/95 backdrop-blur-sm border-b border-white/10">
            <div className="container mx-auto px-4 py-4">
              <button 
                onClick={handleCloseBook} 
                disabled={animating} 
                className="flex items-center gap-2 text-cream bg-cream/10 hover:bg-cream/20 px-6 py-3 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed group font-medium shadow-lg hover:shadow-xl" 
                aria-label="Close portfolio and return to home"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:-translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                <span>Back to Home</span>
              </button>
            </div>
          </div>

          <Portfolio onClose={handleCloseBook} />

        </>}

      <Chatbot />
      
    </div>;
};
export default Index;