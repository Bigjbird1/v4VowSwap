interface Photo {
  url: string;
}

interface Seller {
  name: string;
  rating?: number;
}

interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  photos: Photo[];
  seller: Seller | string;
  category?: string;
  condition: string;
  story?: string;
}

const listings: Listing[] = [
  {
    id: "1",
    title: "Vintage Lace Wedding Dress",
    description: "Beautiful vintage-inspired lace wedding dress, worn once. Perfect condition.",
    price: 850,
    originalPrice: 2200,
    photos: [{ url: "/images/sneaker1.png" }],
    seller: {
      name: "Emily",
      rating: 4.9
    },
    category: "Dresses",
    condition: "Excellent",
  },
  {
    id: "2",
    title: "Crystal Centerpiece Set",
    description: "Set of 10 crystal centerpieces used for one wedding. Elegant and timeless.",
    price: 320,
    photos: [{ url: "/images/sneaker2.png" }],
    seller: {
      name: "Michael",
      rating: 4.7
    },
    category: "Decor",
    condition: "Like New",
  },
  {
    id: "3",
    title: "Bridal Veil with Pearls",
    description: "Cathedral length veil with pearl detailing along the edges.",
    price: 95,
    originalPrice: 250,
    photos: [{ url: "/images/sneaker3.png" }],
    seller: {
      name: "Sophie",
      rating: 5.0
    },
    category: "Accessories",
    condition: "Excellent",
    story: "Wore this for my beach wedding and received so many compliments!"
  },
  {
    id: "4",
    title: "Gold Table Number Holders",
    description: "Set of 20 gold geometric table number holders. Modern and elegant.",
    price: 75,
    photos: [{ url: "/images/sneaker4.png" }],
    seller: {
      name: "James",
      rating: 4.5
    },
    category: "Decor",
    condition: "Good",
  },
  {
    id: "5",
    title: "Silk Flower Bouquet",
    description: "Handcrafted silk flower bouquet in blush and ivory. Looks just like fresh flowers!",
    price: 120,
    originalPrice: 200,
    photos: [{ url: "/images/sneaker1.png" }],
    seller: {
      name: "Olivia",
      rating: 4.8
    },
    category: "Flowers",
    condition: "New with tags",
  },
  {
    id: "6",
    title: "Bridesmaid Dresses - Set of 4",
    description: "Set of 4 sage green bridesmaid dresses, sizes 4-10. Only worn once.",
    price: 400,
    originalPrice: 1200,
    photos: [{ url: "/images/sneaker2.png" }],
    seller: {
      name: "Jessica",
      rating: 4.6
    },
    category: "Dresses",
    condition: "Excellent",
    story: "My bridesmaids loved these dresses and they photograph beautifully!"
  }
];

export default listings;
