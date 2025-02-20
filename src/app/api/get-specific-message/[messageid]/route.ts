// src/app/api/get-specific-message/[messageid]/route.ts
// --------------------------------------------
// Fake data for testing
import { NextResponse } from "next/server";
import messages from "../../../../exampleData/messages";
import { NextRequest } from "next/server";

interface Params {
  params: {
    messageid: string;
  };
}

export async function GET(request: NextRequest, { params }: Params) {
  const { messageid } = params;

  // Find the message thread by its ID
  const specificMessages = messages.filter(
    (message) => message.messageThreadId === messageid
  );

  if (specificMessages.length === 0) {
    return NextResponse.json({ error: "Message not found" }, { status: 404 });
  }

  return NextResponse.json(specificMessages, { status: 200 });
}
// --------------------------------------------

// Uncomment the below code after you have added your MONGODB_URI= in .env file.
// import { NextResponse } from "next/server";
// import connectMongo from "../../../../../libs/connectMongo";
// import Message from "../../../../../models/message";
// import { NextRequest } from "next/server";

// interface Params {
//   params: {
//     messageid: string;
//   };
// }

// export async function GET(request: NextRequest, { params }: Params) {
//   const { messageid } = params;

//   try {
//     // Connect to MongoDB
//     await connectMongo();

//     // Find the message thread by its ID
//     const specificMessages = await Message.find({ messageThreadId: messageid });

//     if (specificMessages.length === 0) {
//       return NextResponse.json({ error: "Message not found" }, { status: 404 });
//     }

//     return NextResponse.json(specificMessages, { status: 200 });
//   } catch (error) {
//     console.error("Error fetching message:", error);
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
// If DATABASE_TYPE is "supabase", it fetches the message from Supabase; otherwise, it defaults to MongoDB.
// --------------------------------------------
// import { NextResponse } from "next/server";
// import config from "../../../../../config";
// import { getSupabaseMessagesByThreadId } from "../../../../../models/supabaseMessage";
// import connectMongo from "../../../../../libs/connectMongo";
// import Message from "../../../../../models/message";

// export async function GET(request: NextRequest, { params }: Params) {
//   const { messageid } = params;

//   try {
//     if (config.databaseType === "supabase") {
//       // Fetch messages from Supabase
//       const messages = await getSupabaseMessagesByThreadId(messageid);
//       if (!messages || messages.length === 0) {
//         return NextResponse.json(
//           { error: "Message not found" },
//           { status: 404 }
//         );
//       }
//       return NextResponse.json(messages, { status: 200 });
//     } else {
//       // Connect to MongoDB and fetch messages
//       await connectMongo();
//       const messages = await Message.find({ messageThreadId: messageid });
//       if (messages.length === 0) {
//         return NextResponse.json(
//           { error: "Message not found" },
//           { status: 404 }
//         );
//       }
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
