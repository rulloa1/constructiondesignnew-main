import heroImage from "@/assets/hero-mc-portfolio.png";

export const Hero = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Michael Chandler Portfolio - Construction site leader"
          className="w-full h-full object-cover object-center"
          loading="eager"
        />
      </div>
      
      {/* Edge Fade Effect */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 65% at 50% 45%, transparent 0%, transparent 50%, hsl(var(--background)) 100%)'
        }}
      />
      
      {/* Text Overlay */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent py-16 px-6">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-light text-white mb-4 [text-shadow:0_0_20px_rgba(228,179,33,0.3),0_0_40px_rgba(228,179,33,0.15)]">
            30+ Years of Quality Craftsmanship
          </h2>
          <p className="text-lg text-white/90 max-w-3xl mx-auto [text-shadow:0_0_15px_rgba(228,179,33,0.2)]">
            From architectural design to landscape restoration, explore our diverse portfolio of projects
          </p>
        </div>
      </div>
    </section>
  );
};
