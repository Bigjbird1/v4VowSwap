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
//     const { userId } = auth();

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
