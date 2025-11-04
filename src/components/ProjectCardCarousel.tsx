import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import type { Project } from "@/data/projects";

interface ProjectCardCarouselProps {
  project: Project;
  categoryColor: string;
  index: number;
}

export const ProjectCardCarousel: React.FC<ProjectCardCarouselProps> = ({
  project,
  categoryColor,
  index,
}) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(1);
  const [count, setCount] = useState(project.images.length);

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    const handleSelect = () => {
      setCurrent(api.selectedScrollSnap() + 1);
    };

    api.on("select", handleSelect);

    return () => {
      api.off("select", handleSelect);
    };
  }, [api]);

  return (
    <Link
      to={`/project/${project.id}`}
      className="group cursor-pointer opacity-0 animate-fade-in-up block"
      style={{ animationDelay: `${index * 100 + 400}ms` }}
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-sm mb-4 bg-charcoal hover-lift">
        <Carousel 
          setApi={setApi} 
          className="w-full h-full"
          opts={{
            loop: true,
          }}
        >
          <CarouselContent className="h-full -ml-0">
            {project.images.map((image, imgIndex) => (
              <CarouselItem key={imgIndex} className="h-full pl-0">
                <div className="h-full">
                  <img
                    src={image}
                    alt={`${project.title} - Image ${imgIndex + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          {/* Navigation Arrows - Only show if more than 1 image */}
          {project.images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  api?.scrollPrev();
                }}
                className="absolute left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 h-8 w-8 rounded-full bg-white/90 hover:bg-white text-charcoal flex items-center justify-center z-10"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  api?.scrollNext();
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 h-8 w-8 rounded-full bg-white/90 hover:bg-white text-charcoal flex items-center justify-center z-10"
                aria-label="Next image"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </>
          )}
        </Carousel>

        {/* Image Counter Badge */}
        {project.images.length > 1 && (
          <div className="absolute top-4 right-4 bg-charcoal/80 backdrop-blur-sm text-cream px-3 py-1 rounded-full text-xs font-medium z-10">
            {current} / {count}
          </div>
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500 pointer-events-none" />

        {/* Overlay Content */}
        <div className="absolute inset-0 p-6 flex flex-col justify-end transition-all duration-500 pointer-events-none">
          <span
            className={`inline-block w-fit px-3 py-1 rounded-full text-xs uppercase tracking-wider font-medium mb-3 transition-colors duration-300 ${categoryColor}`}
          >
            {project.category}
          </span>
          <h3 className="font-playfair text-2xl font-semibold text-cream group-hover:text-gold mb-2 transition-colors duration-300">
            {project.title}
          </h3>
          <p className="font-inter text-sm text-cream/80 group-hover:text-cream font-light transition-colors duration-300">
            {project.location}
          </p>
        </div>
      </div>
    </Link>
  );
};
