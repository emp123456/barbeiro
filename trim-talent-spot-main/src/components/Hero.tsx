import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-barber.jpg";

const Hero = () => {
  const scrollToBooking = () => {
    const element = document.getElementById("booking");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Modern barbershop interior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-overlay" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 z-10 relative">
        <div className="max-w-3xl animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Estilo e
            <span className="bg-gradient-gold bg-clip-text text-transparent"> Elegância</span>
            <br />
            em Cada Corte
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 animate-fade-in">
            Mais que um corte de cabelo, uma experiência de luxo e sofisticação
          </p>
          <div className="flex flex-col sm:flex-row gap-4 animate-slide-in-left">
            <Button
              size="lg"
              onClick={scrollToBooking}
              className="bg-gradient-gold text-background hover:opacity-90 transition-opacity shadow-gold text-lg group"
            >
              Agendar Horário
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-background transition-all text-lg"
              onClick={() => {
                const element = document.getElementById("services");
                if (element) element.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Ver Serviços
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-primary rounded-full animate-shimmer" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
