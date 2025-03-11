import Listings from "./listings";

export default async function ListingsPage({}) {
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

    const listings = await response.json();

    return (
      <div>
        <Listings listings={listings} />
      </div>
    );
  } catch (error) {
    console.error("Failed to fetch listings data:", error);
    return <div>Error fetching data</div>;
  }
}
