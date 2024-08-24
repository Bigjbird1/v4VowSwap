// /app/api/get-all-messages/route.ts

// --------------------------------------------
// Fake data for testing
import { NextResponse } from "next/server";
import messages from "../../../exampleData/messages";

// Using types for response
export async function GET() {
  return NextResponse.json(messages, { status: 200 });
}
// --------------------------------------------

// Uncomment the below code after you have added your MONGODB_URI= in .env file.
// import { NextResponse } from "next/server";
// import connectMongo from "../../../../libs/connectMongo";
// import Message from "../../../../models/message";

// // Ensure async MongoDB connection and message fetching
// export async function GET() {
//   try {
//     // Connect to MongoDB
//     await connectMongo();

//     // Fetch all messages from the database
//     const messages = await Message.find();

//     // Return messages in JSON format with status 200
//     return NextResponse.json(messages, { status: 200 });
//   } catch (error) {
//     console.error("Error fetching messages:", error);
//     // Return error message in JSON format with status 500
//     return NextResponse.json(
//       { error: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }
