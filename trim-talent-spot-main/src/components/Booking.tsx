import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Calendar, Clock, User, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Booking = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    date: "",
    time: "",
    service: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Agendamento Realizado! ✂️",
      description: "Entraremos em contato para confirmar seu horário.",
    });
    setFormData({ name: "", phone: "", date: "", time: "", service: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section id="booking" className="py-24 px-4 bg-background">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Agende seu{" "}
            <span className="bg-gradient-gold bg-clip-text text-transparent">Horário</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Reserve seu horário de forma rápida e fácil
          </p>
        </div>

        <Card className="p-8 bg-card border-border shadow-strong animate-scale-in">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2">
                  <User className="h-4 w-4 text-primary" />
                  Nome Completo
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Seu nome"
                  required
                  className="bg-input border-border focus:border-primary transition-colors"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-primary" />
                  Telefone
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="(00) 00000-0000"
                  required
                  className="bg-input border-border focus:border-primary transition-colors"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="date" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  Data
                </Label>
                <Input
                  id="date"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="bg-input border-border focus:border-primary transition-colors"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="time" className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  Horário
                </Label>
                <Input
                  id="time"
                  name="time"
                  type="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                  className="bg-input border-border focus:border-primary transition-colors"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="service">Serviço</Label>
              <select
                id="service"
                name="service"
                value={formData.service}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-input border border-border rounded-md focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
              >
                <option value="">Selecione um serviço</option>
                <option value="haircut">Corte de Cabelo - R$ 60</option>
                <option value="beard">Barba & Bigode - R$ 40</option>
                <option value="shave">Barbear Tradicional - R$ 50</option>
                <option value="combo">Corte + Barba - R$ 90</option>
              </select>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-gold text-background hover:opacity-90 transition-opacity shadow-gold text-lg py-6"
            >
              Confirmar Agendamento
            </Button>
          </form>
        </Card>
      </div>
    </section>
  );
};

export default Booking;
