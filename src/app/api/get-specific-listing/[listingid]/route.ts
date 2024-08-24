// /app/api/get-specific-listing/[listingid]/route.ts

// --------------------------------------------
// Fake data for testing
import { NextResponse } from "next/server";
import listings from "../../../../exampleData/listings";
import { NextRequest } from "next/server";

interface Params {
  params: {
    listingid: string;
  };
}

export async function GET(request: NextRequest, { params }: Params) {
  const { listingid } = params;

  // Find the listing by its ID
  const specificListing = listings.find((listing) => listing.id === listingid);

  if (!specificListing) {
    return NextResponse.json({ error: "Listing not found" }, { status: 404 });
  }

  return NextResponse.json(specificListing, { status: 200 });
}
// --------------------------------------------

// Uncomment the below code after you have added your MONGODB_URI= in .env file.
// import { NextResponse } from "next/server";
// import connectMongo from "../../../../../libs/connectMongo";
// import Listing from "../../../../../models/listing";
// import { NextRequest } from "next/server";

// interface Params {
//   params: {
//     listingid: string;
//   };
// }

// export async function GET(request: NextRequest, { params }: Params) {
//   const { listingid } = params;

//   try {
//     // Connect to MongoDB
//     await connectMongo();

//     // Find the listing by its ID
//     const specificListing = await Listing.findById(listingid);

//     if (!specificListing) {
//       return NextResponse.json({ error: "Listing not found" }, { status: 404 });
//     }

//     return NextResponse.json(specificListing, { status: 200 });
//   } catch (error) {
//     console.error("Error fetching listing:", error);
//     // Return error message in JSON format with status 500
//     return NextResponse.json(
//       { error: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }
