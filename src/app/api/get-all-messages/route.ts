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

// --------------------------------------------
// Dynamic Database Selection (Supports MongoDB & Supabase)
// This version dynamically selects the database based on the DATABASE_TYPE setting in the .env file.
// If DATABASE_TYPE is "supabase", it fetches messages from Supabase; otherwise, it defaults to MongoDB.
// --------------------------------------------

// import { NextResponse } from "next/server";
// import config from "../../../../config";
// import { getAllSupabaseMessages } from "../../../../models/supabaseMessage";
// import connectMongo from "../../../../libs/connectMongo";
// import Message from "../../../../models/message";

// export async function GET() {
//   try {
//     if (config.databaseType === "supabase") {
//       // Fetch messages from Supabase
//       const messages = await getAllSupabaseMessages();
//       return NextResponse.json(messages, { status: 200 });
//     } else {
//       // Connect to MongoDB and fetch messages
//       await connectMongo();
//       const messages = await Message.find();
//       return NextResponse.json(messages, { status: 200 });
//     }
//   } catch (error) {
//     console.error("Error fetching messages:", error);
//     return NextResponse.json(
//       { error: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }
