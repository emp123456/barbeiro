import { useState, useEffect } from "react";
import { Menu, X, Scissors } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "bg-background/95 backdrop-blur-md shadow-strong" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-2 animate-fade-in">
            <Scissors className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold bg-gradient-gold bg-clip-text text-transparent">
              Royal Cuts
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection("home")}
              className="text-foreground hover:text-primary transition-colors duration-300"
            >
              Início
            </button>
            <button
              onClick={() => scrollToSection("services")}
              className="text-foreground hover:text-primary transition-colors duration-300"
            >
              Serviços
            </button>
            <button
              onClick={() => scrollToSection("gallery")}
              className="text-foreground hover:text-primary transition-colors duration-300"
            >
              Galeria
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="text-foreground hover:text-primary transition-colors duration-300"
            >
              Sobre
            </button>
            <Button
              onClick={() => scrollToSection("booking")}
              className="bg-gradient-gold text-background hover:opacity-90 transition-opacity shadow-gold"
            >
              Agendar
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 animate-fade-in">
            <div className="flex flex-col gap-4">
              <button
                onClick={() => scrollToSection("home")}
                className="text-foreground hover:text-primary transition-colors duration-300 text-left"
              >
                Início
              </button>
              <button
                onClick={() => scrollToSection("services")}
                className="text-foreground hover:text-primary transition-colors duration-300 text-left"
              >
                Serviços
              </button>
              <button
                onClick={() => scrollToSection("gallery")}
                className="text-foreground hover:text-primary transition-colors duration-300 text-left"
              >
                Galeria
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="text-foreground hover:text-primary transition-colors duration-300 text-left"
              >
                Sobre
              </button>
              <Button
                onClick={() => scrollToSection("booking")}
                className="bg-gradient-gold text-background hover:opacity-90 transition-opacity shadow-gold w-full"
              >
                Agendar
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
