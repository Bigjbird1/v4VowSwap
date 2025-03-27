import FeaturedListingsClient from "./FeaturedListingsClient";
import { getAllSupabaseListings } from "../../../../models/supabaseListing";
import config from "../../../../config";
import connectMongo from "../../../../libs/connectMongo";
import Listing from "../../../../models/listing";
import exampleListings from "../../../exampleData/listings";

interface ListingData {
  id: string;
  title: string;
  description: string;
  price: number;
  photos: { url: string }[];
  condition?: string;
  seller?: {
    name: string;
    rating?: number;
  };
}

export default async function FeaturedListingsServerComponent() {
  try {
    let listings: ListingData[] = [];
    
    // Use example data for now to see the UI
    const weddingListings = [
      {
        id: "1",
        title: "Vintage Lace Wedding Dress",
        description: "Beautiful vintage-inspired lace wedding dress, worn once. Perfect condition.",
        price: 850,
        originalPrice: 2200,
        retailPrice: 3500,
        photos: [{ url: "/images/sneaker1.png" }],
        category: "Dresses",
        condition: "Once worn",
        weddingStyle: "Vintage",
        season: "Spring/Summer",
        seller: {
          name: "Emily",
          rating: 4.9
        },
        age: "1 year old",
        story: "I wore this dress at my garden wedding last June. It was absolutely perfect for the setting and I received so many compliments."
      },
      {
        id: "2",
        title: "Crystal Centerpiece Set",
        description: "Set of 10 crystal centerpieces used for one wedding. Elegant and timeless.",
        price: 320,
        retailPrice: 750,
        photos: [{ url: "/images/sneaker2.png" }],
        category: "Decor",
        condition: "Like New",
        weddingStyle: "Glamorous",
        season: "All Seasons",
        seller: {
          name: "Michael",
          rating: 4.7
        }
      },
      {
        id: "3",
        title: "Bridal Veil with Pearls",
        description: "Cathedral length veil with pearl detailing along the edges.",
        price: 95,
        originalPrice: 250,
        retailPrice: 350,
        photos: [{ url: "/images/sneaker3.png" }],
        category: "Accessories",
        condition: "Excellent",
        weddingStyle: "Beach",
        season: "Spring/Summer",
        seller: {
          name: "Sophie",
          rating: 5.0
        },
        story: "Wore this for my beach wedding and received so many compliments!"
      },
      {
        id: "4",
        title: "Gold Table Number Holders",
        description: "Set of 20 gold geometric table number holders. Modern and elegant.",
        price: 75,
        retailPrice: 200,
        photos: [{ url: "/images/sneaker4.png" }],
        category: "Decor",
        condition: "Good",
        weddingStyle: "Modern",
        season: "All Seasons",
        seller: {
          name: "James",
          rating: 4.5
        }
      },
      {
        id: "5",
        title: "Sample Sale Wedding Gown",
        description: "Designer sample sale gown, never worn for a wedding. Satin with beaded bodice.",
        price: 1200,
        originalPrice: 1800,
        retailPrice: 4000,
        photos: [{ url: "/images/sneaker1.png" }],
        category: "Dresses",
        condition: "Sample sale",
        weddingStyle: "Classic",
        season: "Fall/Winter",
        seller: {
          name: "Bridal Boutique",
          rating: 4.8
        }
      },
      {
        id: "6",
        title: "Eucalyptus Garland Set",
        description: "Artificial eucalyptus garlands, perfect for table runners or arch decoration.",
        price: 120,
        retailPrice: 280,
        photos: [{ url: "/images/sneaker3.png" }],
        category: "Flowers",
        condition: "New with tags",
        weddingStyle: "Bohemian",
        season: "All Seasons",
        seller: {
          name: "GreenDecor",
          rating: 4.6
        }
      }
    ];
    
    listings = weddingListings;

    return (
      <div>
        <FeaturedListingsClient data={listings} />
      </div>
    );
  } catch (error) {
    console.error("Failed to fetch listings data:", error);
    return <div>Error fetching data</div>;
  }
}
