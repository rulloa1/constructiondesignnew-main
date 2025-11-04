import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import logo from "@/assets/mc-logo.png";

const navigation = [
  { name: "Portfolio", href: "#portfolio" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
];

interface HeaderProps {
  onPortfolioClick?: () => void;
}

export const Header = ({ onPortfolioClick }: HeaderProps) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm bg-background/5 transition-all duration-300">
      <nav className="container mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          <a href="#" className="flex items-center group">
            <img src={logo} alt="Michael Chandler logo" className="h-16 w-auto drop-shadow-lg opacity-70 hover:opacity-100 transition-all duration-300 group-hover:scale-105" />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  if (item.name === "Portfolio" && onPortfolioClick) {
                    e.preventDefault();
                    onPortfolioClick();
                  }
                }}
                className="relative text-sm font-light tracking-wide text-white transition-all duration-300 drop-shadow-md hover:scale-105 after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-accent after:transition-all after:duration-300 hover:after:w-full"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Mobile Navigation */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col gap-6 mt-8">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => {
                      if (item.name === "Portfolio" && onPortfolioClick) {
                        e.preventDefault();
                        onPortfolioClick();
                      }
                    }}
                    className="text-lg font-light tracking-wide hover:text-accent transition-colors"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
};
