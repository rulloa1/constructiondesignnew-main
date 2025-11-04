import { Mail, Phone, MapPin } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  return <footer id="contact" className="py-8 border-t border-border bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-4xl mx-auto mb-6">
          <h2 className="text-2xl md:text-3xl font-light mb-4 text-center">
            Get In Touch
          </h2>
          
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-8">
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-accent/10 mb-3 transition-all duration-300 group-hover:bg-accent/20 group-hover:scale-110">
                <Mail className="w-4 h-4 text-accent transition-transform duration-300 group-hover:scale-110" />
              </div>
              <h3 className="text-xs font-medium tracking-wider text-muted-foreground mb-2">
                EMAIL
              </h3>
              <a href="mailto:mike.rcccon@yahoo.com" className="text-base font-light hover:text-accent transition-all duration-300 hover:tracking-wide">mike.rcccon@yahoo.com</a>
            </div>
            
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-accent/10 mb-3 transition-all duration-300 group-hover:bg-accent/20 group-hover:scale-110">
                <Phone className="w-4 h-4 text-accent transition-transform duration-300 group-hover:scale-110" />
              </div>
              <h3 className="text-xs font-medium tracking-wider text-muted-foreground mb-2">
                PHONE
              </h3>
              <a href="tel:+14352377373" className="text-base font-light hover:text-accent transition-all duration-300 hover:tracking-wide">+1 (435) 237-7373</a>
            </div>
            
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-accent/10 mb-3 transition-all duration-300 group-hover:bg-accent/20 group-hover:scale-110">
                <MapPin className="w-4 h-4 text-accent transition-transform duration-300 group-hover:scale-110" />
              </div>
              <h3 className="text-xs font-medium tracking-wider text-muted-foreground mb-2">
                LOCATION
              </h3>
              <p className="text-base font-light">Spring, Texas</p>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-6 border-t border-border">
          <p className="text-sm font-light text-muted-foreground">
            © {currentYear} Michael Chandler. All rights reserved.
          </p>
        </div>
      </div>
    </footer>;
};