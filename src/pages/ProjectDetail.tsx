import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, X, ChevronLeft, ChevronRight } from "lucide-react";
import { getProjectById } from "@/data/projects";
import { useState, useEffect } from "react";
const ProjectDetail = () => {
  const {
    id
  } = useParams();
  const navigate = useNavigate();
  const project = id ? getProjectById(id) : undefined;
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  // Keyboard navigation
  useEffect(() => {
    if (selectedImageIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedImageIndex(null);
      } else if (e.key === "ArrowLeft" && project) {
        setSelectedImageIndex(prev => prev === 0 ? project.images.length - 1 : (prev ?? 0) - 1);
      } else if (e.key === "ArrowRight" && project) {
        setSelectedImageIndex(prev => prev === project.images.length - 1 ? 0 : (prev ?? 0) + 1);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImageIndex, project]);
  if (!project) {
    return <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-light mb-4">Project Not Found</h1>
          <Button onClick={() => navigate("/")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </div>
      </div>;
  }
  return <>
      <div className="relative min-h-screen bg-charcoal">
        {/* Content */}
        <div className="relative z-10 min-h-screen flex flex-col">
          {/* Back button */}
          <div className="p-4 sm:p-6 lg:p-8">
            <Button variant="outline" onClick={() => navigate("/", {
            state: {
              openPortfolio: true
            }
          })} className="bg-cream border-cream/30 text-charcoal hover:bg-cream/90 hover:shadow-lg transition-all font-medium" size="lg">
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back to All Projects
            </Button>
          </div>

          {/* Project info */}
          <div className="px-4 sm:px-6 lg:px-8 flex-1 flex flex-col justify-center max-w-2xl">
            <span className="text-xs sm:text-sm text-cream/80 font-light tracking-wide uppercase mb-2">
              {project.category}
            </span>
            <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-cream mb-4 md:mb-6">
              {project.title}
            </h1>
            <p className="font-inter text-sm text-cream/70 font-light">
              {project.location}
            </p>
          </div>

          {/* Simple gallery grid */}
          <div className="p-4 sm:p-6 lg:p-8">
            <div className="max-w-6xl mx-auto">
              <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 ${project.category === "Design Build" ? "gap-0.5" : "gap-3"}`}>
                {project.images.map((image, index) => <button key={`${image}-${index}`} onClick={() => setSelectedImageIndex(index)} className="relative aspect-square overflow-hidden rounded-lg group cursor-pointer transition-all hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-cream/50">
                    <img 
                      src={image} 
                      alt={`${project.title} - Image ${index + 1}`} 
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform group-hover:scale-110"
                    />
                  </button>)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImageIndex !== null && <div className="fixed inset-0 z-50 bg-charcoal/95 backdrop-blur-sm animate-fade-in" onClick={() => setSelectedImageIndex(null)}>
          {/* Close button */}
          <button onClick={() => setSelectedImageIndex(null)} className="absolute top-4 right-4 z-50 p-2 rounded-full bg-cream/10 hover:bg-cream/20 text-cream transition-colors focus:outline-none focus:ring-2 focus:ring-cream/50" aria-label="Close">
            <X className="h-6 w-6" />
          </button>

          {/* Image counter */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full bg-cream/10 backdrop-blur-md text-cream text-sm font-light">
            {selectedImageIndex + 1} / {project.images.length}
          </div>

          {/* Previous button */}
          <button onClick={e => {
        e.stopPropagation();
        setSelectedImageIndex(selectedImageIndex === 0 ? project.images.length - 1 : selectedImageIndex - 1);
      }} className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-cream/10 hover:bg-cream/20 text-cream transition-colors focus:outline-none focus:ring-2 focus:ring-cream/50" aria-label="Previous image">
            <ChevronLeft className="h-8 w-8" />
          </button>

          {/* Next button */}
          <button onClick={e => {
        e.stopPropagation();
        setSelectedImageIndex(selectedImageIndex === project.images.length - 1 ? 0 : selectedImageIndex + 1);
      }} className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-cream/10 hover:bg-cream/20 text-cream transition-colors focus:outline-none focus:ring-2 focus:ring-cream/50" aria-label="Next image">
            <ChevronRight className="h-8 w-8" />
          </button>

          {/* Image */}
          <div className="flex items-center justify-center h-full p-16" onClick={e => e.stopPropagation()}>
            <img 
              src={project.images[selectedImageIndex]} 
              alt={`${project.title} - Image ${selectedImageIndex + 1}`} 
              loading="eager"
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl animate-scale-in" 
            />
          </div>
        </div>}
    </>;
};
export default ProjectDetail;