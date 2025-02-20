// src/app/api/my-listings/route.ts
// --------------------------------------------
// Fake data for testing
import { NextResponse } from "next/server";
import listings from "../../../exampleData/listings";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  return NextResponse.json(listings, { status: 200 });
}
// --------------------------------------------

// Uncomment the below code after you have added your MONGODB_URI= in .env file.

// import { NextResponse } from "next/server";
// import connectMongo from "../../../../libs/connectMongo";
// import Listing from "../../../../models/listing";
// import { auth } from "@clerk/nextjs/server";
// import { NextRequest } from "next/server";

// export async function GET(request: NextRequest) {
//   try {
//     // Connect to MongoDB
//     await connectMongo();

//     // Get the user ID from Clerk's authentication
//     const { userId } = await auth();

//     if (!userId) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     // Fetch listings for the authenticated user
//     const userListings = await Listing.find({ "seller.userId": userId });

//     // Return user listings in JSON format with status 200
//     return NextResponse.json(userListings, { status: 200 });
//   } catch (error) {
//     console.error("Error fetching user listings:", error);
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
// If DATABASE_TYPE is "supabase", it fetches listings for the logged-in user from Supabase; otherwise, it defaults to MongoDB.
// --------------------------------------------
// import { NextResponse } from "next/server";
// import { NextRequest } from "next/server";
// import config from "../../../../config";
// import { getSupabaseListingsByUserId } from "../../../../models/supabaseListing";
// import connectMongo from "../../../../libs/connectMongo";
// import Listing from "../../../../models/listing";
// import { auth } from "@clerk/nextjs/server";

// export async function GET(request: NextRequest) {
//   try {
//     const { userId } = await auth();

//     if (!userId) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     if (config.databaseType === "supabase") {
//       // Fetch listings for the authenticated user from Supabase
//       const userListings = await getSupabaseListingsByUserId(userId);
//       return NextResponse.json(userListings, { status: 200 });
//     } else {
//       // Connect to MongoDB and fetch user listings
//       await connectMongo();
//       const userListings = await Listing.find({ "seller.userId": userId });
//       return NextResponse.json(userListings, { status: 200 });
//     }
//   } catch (error) {
//     console.error("Error fetching user listings:", error);
//     return NextResponse.json(
//       { error: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }
