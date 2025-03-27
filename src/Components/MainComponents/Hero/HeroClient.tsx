"use client";

interface HeroData {
  title: string;
  subtitle: string;
  primaryCta: {
    text: string;
    href: string;
  };
  secondaryCta: {
    text: string;
    href: string;
  };
}

interface HeroClientProps {
  heroVideo: string;
  heroData: HeroData;
}

// Wedding category data
const weddingCategories = [
  {
    name: "Dresses",
    image: "/images/sneaker1.png", // Using existing images for now
    href: "/listings?category=dresses"
  },
  {
    name: "Decor",
    image: "/images/sneaker2.png",
    href: "/listings?category=decor"
  },
  {
    name: "Accessories",
    image: "/images/sneaker3.png",
    href: "/listings?category=accessories"
  },
  {
    name: "Flowers",
    image: "/images/sneaker4.png",
    href: "/listings?category=flowers"
  }
];

export default function HeroClient({ heroVideo, heroData }: HeroClientProps) {
  return (
    <>
      <section className="hero relative py-32 md:py-40 px-6 text-center text-white overflow-hidden">
        {/* Overlay to enhance wedding aesthetic */}
        <div className="absolute inset-0 bg-black/20 z-0"></div>
        
        <video
          className="absolute inset-0 w-full h-full object-cover -z-10"
          src={heroVideo}
          autoPlay
          muted
          loop
          playsInline
        />

        <div className="relative z-10 max-w-4xl mx-auto animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-serif font-light mb-6 tracking-tight">
            {heroData.title.split(' ').map((word, i) => 
              i === 2 ? <span key={i} className="text-primary/90 italic">{word} </span> : word + ' '
            )}
          </h1>
          <p className="text-xl md:text-2xl font-light mb-10 max-w-2xl mx-auto animate-fade-in-delay-1">
            {heroData.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-delay-2">
            <a 
              href={heroData.primaryCta.href}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-full px-8 py-6 text-sm font-medium bg-primary text-navy hover:bg-primary/90 shadow-soft transition-all duration-300 hover:shadow-glow"
            >
              {heroData.primaryCta.text}
            </a>
            <a
              href={heroData.secondaryCta.href}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-full px-8 py-6 text-sm font-medium border border-white text-white hover:bg-white/10 transition-all duration-300"
            >
              {heroData.secondaryCta.text}
            </a>
          </div>
        </div>
      </section>

      {/* Wedding Category Showcase */}
      <section className="py-16 px-6 bg-neutral-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-serif text-center mb-12">Browse Wedding Categories</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {weddingCategories.map((category, index) => (
              <a 
                href={category.href} 
                key={index}
                className="group bg-white rounded-lg overflow-hidden shadow-soft hover:shadow-md transition-all duration-300 relative"
              >
                <div className="relative h-48 overflow-hidden bg-neutral-100">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4 text-center">
                  <h3 className="text-lg font-medium text-neutral-900 group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
