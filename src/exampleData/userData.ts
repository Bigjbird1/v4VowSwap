interface UserProfileImage {
  url: string;
  alt: string;
}

interface User {
  _id: string;
  name: string;
  about: string;
  email: string;
  emailReminders: boolean;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  image: UserProfileImage;
  isStripeConnected: boolean;
  stripeAccountId: string | null;
  createdAt: Date;
}

const userData: User[] = [
  {
    _id: "60c72b2f4f1a2c001c8e4d5b",
    name: "John Doe",
    about: "Passionate about collecting Sneakers.",
    email: "john.doe@example.com",
    emailReminders: true,
    address: "123 Sneaker Lane",
    city: "Austin",
    postalCode: "00100",
    country: "USA",
    image: {
      url: "/images/profiles/profile1.jpg",
      alt: "User Profile Image",
    },
    isStripeConnected: false,
    stripeAccountId: null,
    createdAt: new Date(),
  },
  {
    _id: "60c72b2f4f1a2c001c8e4d5c",
    name: "Jane Smith",
    about: "Sneaker enthusiast and collector.",
    email: "jane.smith@example.com",
    emailReminders: false,
    address: "456 Sneaker Blvd",
    city: "Los Angeles",
    postalCode: "90210",
    country: "USA",
    image: {
      url: "/images/profiles/profile2.jpg",
      alt: "User Profile Image",
    },
    isStripeConnected: false,
    stripeAccountId: null,
    createdAt: new Date(),
  },
  {
    _id: "60c72b2f4f1a2c001c8e4d5d",
    name: "Alice Johnson",
    about: "Lover of all things sneakers.",
    email: "alice.johnson@example.com",
    emailReminders: true,
    address: "789 Sneaker Street",
    city: "Chicago",
    postalCode: "60601",
    country: "USA",
    image: {
      url: "/images/profiles/profile3.jpg",
      alt: "User Profile Image",
    },
    isStripeConnected: false,
    stripeAccountId: null,
    createdAt: new Date(),
  },
  {
    _id: "60c72b2f4f1a2c001c8e4d5e",
    name: "Bob Lee",
    about: "Sneaker reseller and collector.",
    email: "bob.lee@example.com",
    emailReminders: false,
    address: "101 Sneaker Ave",
    city: "San Francisco",
    postalCode: "94105",
    country: "USA",
    image: {
      url: "/images/profiles/profile4.jpg",
      alt: "User Profile Image",
    },
    isStripeConnected: false,
    stripeAccountId: null,
    createdAt: new Date(),
  },
];

export default userData;
