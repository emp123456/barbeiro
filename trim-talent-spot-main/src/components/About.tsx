import { Award, Users, Clock } from "lucide-react";
import aboutImage from "@/assets/about-interior.jpg";

const stats = [
  {
    icon: Users,
    value: "5000+",
    label: "Clientes Satisfeitos",
  },
  {
    icon: Award,
    value: "15+",
    label: "Anos de Experiência",
  },
  {
    icon: Clock,
    value: "24/7",
    label: "Agendamento Online",
  },
];

const About = () => {
  return (
    <section id="about" className="py-24 px-4 bg-gradient-hero">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1 animate-slide-in-left">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Sobre a{" "}
              <span className="bg-gradient-gold bg-clip-text text-transparent">Royal Cuts</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-6">
              Somos uma barbearia moderna que combina técnicas tradicionais com as últimas
              tendências em estilo masculino. Nossa missão é proporcionar não apenas um corte de
              cabelo, mas uma experiência completa de cuidado e bem-estar.
            </p>
            <p className="text-muted-foreground text-lg mb-8">
              Com profissionais altamente qualificados e um ambiente sofisticado, garantimos que
              cada cliente saia renovado e confiante.
            </p>

            <div className="grid grid-cols-3 gap-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className="text-center animate-fade-in-up"
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <div className="inline-flex p-3 bg-primary/10 rounded-lg mb-3">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="text-2xl md:text-3xl font-bold bg-gradient-gold bg-clip-text text-transparent mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="order-1 lg:order-2 animate-slide-in-right">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-gold opacity-20 blur-3xl rounded-lg" />
              <img
                src={aboutImage}
                alt="Interior da barbearia"
                className="relative rounded-lg shadow-strong w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
