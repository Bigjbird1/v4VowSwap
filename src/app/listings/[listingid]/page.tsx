import "server-only";
import SpecificListing from "./specificListing";
import { notFound } from "next/navigation";

type Params = Promise<{ listingid: string }>;
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function SpecificListingPage(props: {
  params: Params;
  searchParams: SearchParams;
}) {
  const params = await props.params;
  const { listingid } = params;

  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    // Use the specific listing endpoint instead of fetching all listings
    const response = await fetch(`${apiUrl}/api/get-specific-listing/${listingid}`, {
      headers: { "Content-Type": "application/json" },
      // Add cache: 'no-store' to prevent caching issues
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
    }

    const listingData = await response.json();

    if (!listingData) {
      return notFound();
    }

    return <SpecificListing listingData={listingData} />;
  } catch (error) {
    console.error("Failed to fetch listing data:", error);
    return (
      <div className="container mx-auto p-8 text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
        <p className="mb-4">We couldn't load the listing information.</p>
        <p className="text-gray-600">Please try again later or contact support if the problem persists.</p>
      </div>
    );
  }
}
