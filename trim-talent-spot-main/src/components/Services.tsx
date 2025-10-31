import { Card } from "@/components/ui/card";
import { Scissors, Clock, Sparkles } from "lucide-react";
import serviceHaircut from "@/assets/service-haircut.jpg";
import serviceBeard from "@/assets/service-beard.jpg";
import serviceShave from "@/assets/service-shave.jpg";

const services = [
  {
    title: "Corte de Cabelo",
    description: "Cortes modernos e clássicos com técnicas precisas e estilo único",
    price: "R$ 60",
    image: serviceHaircut,
    icon: Scissors,
  },
  {
    title: "Barba & Bigode",
    description: "Aparação e modelagem profissional para um visual impecável",
    price: "R$ 40",
    image: serviceBeard,
    icon: Sparkles,
  },
  {
    title: "Barbear Tradicional",
    description: "Experiência completa com toalhas quentes e navalha profissional",
    price: "R$ 50",
    image: serviceShave,
    icon: Clock,
  },
];

const Services = () => {
  return (
    <section id="services" className="py-24 px-4 bg-gradient-hero">
      <div className="container mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Nossos <span className="bg-gradient-gold bg-clip-text text-transparent">Serviços</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Oferecemos serviços premium com profissionais experientes e produtos de alta qualidade
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card
                key={service.title}
                className="overflow-hidden bg-card border-border hover:border-primary transition-all duration-500 hover:shadow-gold group animate-scale-in"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                  <div className="absolute top-4 right-4 bg-primary/90 backdrop-blur-sm text-background px-4 py-2 rounded-lg font-bold">
                    {service.price}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold">{service.title}</h3>
                  </div>
                  <p className="text-muted-foreground">{service.description}</p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
