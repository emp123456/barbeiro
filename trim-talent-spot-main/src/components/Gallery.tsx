import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";

const images = [
  { src: gallery1, alt: "Corte moderno com fade" },
  { src: gallery2, alt: "Barba bem cuidada" },
  { src: gallery3, alt: "Pompadour clássico" },
  { src: gallery4, alt: "Texturizado moderno" },
];

const Gallery = () => {
  return (
    <section id="gallery" className="py-24 px-4 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Nossa <span className="bg-gradient-gold bg-clip-text text-transparent">Galeria</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Confira alguns dos nossos melhores trabalhos e transformações
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-lg aspect-[4/5] animate-scale-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-foreground transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                <p className="text-sm font-medium">{image.alt}</p>
              </div>
              <div className="absolute inset-0 border-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
