import "./globals.css";
import MainLayout from "./SpeceficLayouts/MainLayout";
import HeroServer from "../Components/MainComponents/Hero/HeroServer";
import FeaturedListingsServerComponent from "@/Components/MainComponents/FeaturedListings/FeaturedListingsServer";
import FeaturedCollection from "@/Components/MainComponents/FeaturedCollection/FeaturedCollection";
import { RenderSchemaTags } from "../../libs/seo";

export default async function Home(): Promise<JSX.Element> {
  // Wedding collections data
  const weddingCollections = [
    {
      title: "Bridal Elegance",
      description: "Stunning pre-loved wedding dresses and accessories for your special day",
      image: "/images/sneaker1.png"
    },
    {
      title: "Venue Decor",
      description: "Transform your venue with beautiful decorations at a fraction of retail cost",
      image: "/images/sneaker2.png"
    },
    {
      title: "Wedding Accessories",
      description: "Complete your bridal look with veils, jewelry, and more",
      image: "/images/sneaker3.png"
    }
  ];

  return (
    <MainLayout>
      <main>
        <HeroServer />
        
        {/* Wedding Benefits section */}
        <section className="py-16 px-6 md:px-10 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-serif mb-8 text-center text-navy">Why Choose Pre-loved Wedding Items?</h2>
            <div className="flex items-center justify-center gap-12 mb-16 text-center flex-wrap">
              <div className="flex flex-col items-center max-w-xs">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-primary">
                    <circle cx="8" cy="8" r="6" />
                    <circle cx="16" cy="16" r="6" />
                    <path d="M8.3 6.3 16 16" />
                  </svg>
                </div>
                <h3 className="font-serif text-lg mb-2">Save 40-80%</h3>
                <p className="text-sm text-neutral-600">Significant savings on designer and high-quality wedding items</p>
              </div>
              <div className="flex flex-col items-center max-w-xs">
                <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-secondary/80">
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                  </svg>
                </div>
                <h3 className="font-serif text-lg mb-2">Sustainable Choice</h3>
                <p className="text-sm text-neutral-600">Eco-friendly option that gives beautiful items a second life</p>
              </div>
              <div className="flex flex-col items-center max-w-xs">
                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-accent/80">
                    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                    <path d="M5 3v4" />
                    <path d="M19 17v4" />
                    <path d="M3 5h4" />
                    <path d="M17 19h4" />
                  </svg>
                </div>
                <h3 className="font-serif text-lg mb-2">Unique Treasures</h3>
                <p className="text-sm text-neutral-600">Find one-of-a-kind pieces that make your wedding truly special</p>
              </div>
            </div>

            <div className="decorative-divider"></div>
          </div>
        </section>
        
        <FeaturedListingsServerComponent />
        
        {/* Wedding Collections section */}
        <section className="py-16 px-6 md:px-10 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
              <div>
                <h2 className="text-2xl md:text-3xl font-serif mb-2 text-navy">Wedding Collections</h2>
                <p className="text-neutral-600">Curated collections for every aspect of your wedding</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {weddingCollections.map((collection, index) => (
                <FeaturedCollection 
                  key={index}
                  title={collection.title}
                  description={collection.description}
                  image={collection.image}
                />
              ))}
            </div>
          </div>
        </section>
        
        {/* Wedding Community section */}
        <section className="py-20 px-6 md:px-10 bg-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-radial from-primary/5 to-transparent opacity-50"></div>
          <div className="max-w-7xl mx-auto text-center relative z-10">
            <h2 className="text-2xl md:text-3xl font-serif mb-4 text-navy">Join Our Wedding Community</h2>
            <p className="text-neutral-600 max-w-2xl mx-auto mb-8">
              Connect with other brides and grooms, share wedding planning tips, and discover unique pre-loved items for your special day.
            </p>
            <div className="flex justify-center gap-8 mt-10">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-blush/20 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-primary">
                    <circle cx="12" cy="12" r="10" />
                    <circle cx="12" cy="10" r="3" />
                    <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" />
                  </svg>
                </div>
                <h3 className="font-serif text-lg">Engaged Couples</h3>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-sage/20 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-secondary/80">
                    <path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4" />
                    <path d="M4 6v12c0 1.1.9 2 2 2h14v-4" />
                    <path d="M18 12a2 2 0 0 0-2 2c0 1.1.9 2 2 2h4v-4h-4z" />
                  </svg>
                </div>
                <h3 className="font-serif text-lg">Newlyweds</h3>
              </div>
            </div>
          </div>
        </section>
      </main>
      <RenderSchemaTags />
    </MainLayout>
  );
}
