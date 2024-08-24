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
