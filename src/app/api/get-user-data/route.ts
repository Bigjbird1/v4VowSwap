// src/app/api/get-user-data/route.ts
// --------------------------------------------
// Fake data for testing
import { NextResponse } from "next/server";
import userData from "../../../exampleData/userData";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  return NextResponse.json(userData, { status: 200 });
}
// --------------------------------------------

// Uncomment the below code after you have added your MONGODB_URI= in .env file.
// import { NextResponse } from "next/server";
// import connectMongo from "../../../../libs/connectMongo";
// import User from "../../../../models/user";
// import { NextRequest } from "next/server";

// export async function GET(request: NextRequest) {
//   try {
//     // Connect to MongoDB
//     await connectMongo();

//     // Fetch user data (assuming you want to get all users or you might want to get a specific user based on request parameters)
//     const users = await User.find();

//     // If you need to fetch a specific user, you can use something like:
//     // const userId = request.query.userId;
//     // const user = await User.findById(userId);

//     return NextResponse.json(users, { status: 200 });
//   } catch (error) {
//     console.error("Error fetching user data:", error);
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
// If DATABASE_TYPE is "supabase", it fetches the user data from Supabase; otherwise, it defaults to MongoDB.
// --------------------------------------------
// import { NextResponse } from "next/server";
// import { auth } from "@clerk/nextjs/server";
// import config from "../../../../config";
// import { getSupabaseUserById } from "../../../../models/supabaseUser";
// import connectMongo from "../../../../libs/connectMongo";
// import User from "../../../../models/user";

// export async function GET() {
//   try {
//     // 🔥 Get the authenticated user's ID from Clerk
//     const { userId } = await auth();

//     if (!userId) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     let user;

//     if (config.databaseType === "supabase") {
//       // Fetch user data from Supabase
//       user = await getSupabaseUserById(userId);
//     } else {
//       // Fetch user data from MongoDB
//       await connectMongo();
//       user = await User.findOne({ clerkUserId: userId });
//     }

//     if (!user) {
//       return NextResponse.json({ error: "User not found" }, { status: 404 });
//     }

//     return NextResponse.json(user, { status: 200 });
//   } catch (error) {
//     console.error("Error fetching user data:", error);
//     return NextResponse.json(
//       { error: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }
