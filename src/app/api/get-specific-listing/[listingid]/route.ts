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

// --------------------------------------------
// Dynamic Database Selection (Supports MongoDB & Supabase)
// This version dynamically selects the database based on the DATABASE_TYPE setting in the .env file.
// If DATABASE_TYPE is "supabase", it fetches the listing from Supabase; otherwise, it defaults to MongoDB.
// --------------------------------------------
// import { NextResponse } from "next/server";
// import config from "../../../../../config";
// import { getSupabaseListingById } from "../../../../../models/supabaseListing";
// import connectMongo from "../../../../../libs/connectMongo";
// import Listing from "../../../../../models/listing";

// export async function GET(request: NextRequest, { params }: Params) {
//   const { listingid } = params;

//   try {
//     if (config.databaseType === "supabase") {
//       // Fetch listing from Supabase
//       const listing = await getSupabaseListingById(listingid);
//       if (!listing) {
//         return NextResponse.json(
//           { error: "Listing not found" },
//           { status: 404 }
//         );
//       }
//       return NextResponse.json(listing, { status: 200 });
//     } else {
//       // Connect to MongoDB and fetch listing
//       await connectMongo();
//       const listing = await Listing.findById(listingid);
//       if (!listing) {
//         return NextResponse.json(
//           { error: "Listing not found" },
//           { status: 404 }
//         );
//       }
//       return NextResponse.json(listing, { status: 200 });
//     }
//   } catch (error) {
//     console.error("Error fetching listing:", error);
//     return NextResponse.json(
//       { error: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }
