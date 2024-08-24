interface Photo {
  url: string;
}

interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  photos: Photo[];
  seller: string;
  primaryColor: string;
  secondaryColor: string;
  yearProduced: number;
  condition: "new" | "used";
  hasLabel: boolean;
  hasOriginalBox: boolean;
}

const listings: Listing[] = [
  {
    id: "1",
    title: "Nike Air Max 97",
    description: "Comfortable and stylish sneakers in great condition.",
    price: 120,
    photos: [{ url: "/images/sneaker1.png" }, { url: "/images/sneaker2.png" }],
    seller: "60c72b2f4f1a2c001c8e4d5b", // Example ObjectId for seller
    primaryColor: "black",
    secondaryColor: "white",
    yearProduced: 2019,
    condition: "used",
    hasLabel: false,
    hasOriginalBox: true,
  },
  {
    id: "2",
    title: "Adidas Yeezy Boost",
    description: "Limited edition sneakers, lightly used.",
    price: 250,
    photos: [{ url: "/images/sneaker2.png" }],
    seller: "60c72b2f4f1a2c001c8e4d5c",
    primaryColor: "white",
    secondaryColor: "none chosen",
    yearProduced: 2020,
    condition: "used",
    hasLabel: true,
    hasOriginalBox: false,
  },
  {
    id: "3",
    title: "Puma Suede Classic",
    description: "Classic style, perfect for everyday wear.",
    price: 80,
    photos: [{ url: "/images/sneaker3.png" }],
    seller: "60c72b2f4f1a2c001c8e4d5d",
    primaryColor: "brown",
    secondaryColor: "none chosen",
    yearProduced: 2018,
    condition: "used",
    hasLabel: false,
    hasOriginalBox: false,
  },
  {
    id: "4",
    title: "New Balance 574",
    description: "Comfort and style combined in these sneakers.",
    price: 100,
    photos: [{ url: "/images/sneaker4.png" }],
    seller: "60c72b2f4f1a2c001c8e4d5e",
    primaryColor: "grey",
    secondaryColor: "none chosen",
    yearProduced: 2021,
    condition: "new",
    hasLabel: true,
    hasOriginalBox: true,
  },
];

export default listings;
