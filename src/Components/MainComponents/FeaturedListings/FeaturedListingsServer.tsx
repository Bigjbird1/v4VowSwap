"use server";
import FeaturedListingsClient from "./FeaturedListingsClient";

interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  photos: { url: string }[];
}

export default async function FeaturedListingsServerComponent() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/listings`,
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const listings: Listing[] = await response.json();

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
