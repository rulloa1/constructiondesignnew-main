import React, { useState } from "react";
import { X, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { projects, getProjectsByCategory, type ProjectCategory } from "@/data/projects";
import { ProjectCardCarousel } from "@/components/ProjectCardCarousel";

type Category = "All" | ProjectCategory;

const categories: Category[] = ["All", "Residential", "Commercial", "Hospitality", "Design Build"];

const categoryColors: Record<string, string> = {
  Residential: "bg-gold text-charcoal",
  Commercial: "bg-steelBlue text-white",
  Hospitality: "bg-burgundy text-white",
  "Design Build": "bg-gold text-charcoal",
};

interface PortfolioGridProps {
  onClose: () => void;
  initialCategory?: string;
}

export const PortfolioGrid: React.FC<PortfolioGridProps> = ({ onClose, initialCategory = "All" }) => {
  const [selectedCategory, setSelectedCategory] = useState<Category>(initialCategory as Category);
  const [isClosing, setIsClosing] = useState(false);

  const filteredProjects = getProjectsByCategory(selectedCategory);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 600);
  };

  const getCategoryCount = (category: Category) => {
    if (category === "All") return projects.length;
    return getProjectsByCategory(category).length;
  };

  return (
    <div 
      className={`fixed inset-0 z-40 bg-cream overflow-y-auto transition-opacity duration-600 ${
        isClosing ? 'animate-fade-out' : 'animate-fade-in'
      }`}
    >
      {/* Close button */}
      <Button
        onClick={handleClose}
        variant="ghost"
        size="icon"
        className="fixed top-6 right-6 z-50 text-charcoal hover:text-gold hover:bg-gold/10 transition-all duration-300"
      >
        <X className="h-6 w-6" />
      </Button>

      <div className="container mx-auto px-6 lg:px-12 py-24">
        {/* Back button - shows when category is selected */}
        {selectedCategory !== "All" && (
          <div className="mb-8 opacity-0 animate-fade-in">
            <Button
              onClick={() => setSelectedCategory("All")}
              variant="outline"
              className="bg-cream border-gold/30 text-charcoal hover:bg-gold/10 transition-all font-medium"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to All Projects
            </Button>
          </div>
        )}

        {/* Header */}
        <div className="mb-12 text-center opacity-0 animate-fade-in">
          <h2 className="font-playfair text-5xl md:text-6xl font-semibold text-charcoal mb-4">
            Portfolio
          </h2>
          <p className="font-inter text-muted-foreground text-lg font-light">
            A curated collection of exceptional spaces
          </p>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-16 opacity-0 animate-fade-in delay-200">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`font-inter px-6 py-3 rounded-full text-sm uppercase tracking-wider font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-gold text-charcoal shadow-lg scale-105'
                  : 'bg-white text-charcoal hover:bg-gold/10 border border-gold/20'
              }`}
            >
              {category}
              <span className="ml-2 text-xs opacity-70">
                ({getCategoryCount(category)})
              </span>
            </button>
          ))}
        </div>


        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredProjects.map((project, index) => (
            <ProjectCardCarousel
              key={project.id}
              project={project}
              categoryColor={categoryColors[project.category]}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
