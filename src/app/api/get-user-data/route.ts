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
