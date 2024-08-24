import { Webhook } from "svix";
import { NextRequest, NextResponse } from "next/server";
import connectMongo from "../../../../../libs/connectMongo";
import User from "../../../../../models/user";

// export const GET = {
//   config: {
//     api: {
//       bodyParser: false, // Disable the built-in body parser to use raw body parsing
//     },
//   },
// };

interface UserCreatedEvent {
  id: string;
  first_name: string;
  last_name: string;
  email_addresses: { email_address: string }[];
}

export async function POST(request: NextRequest) {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET_USER_CREATED;
  if (!WEBHOOK_SECRET) {
    return NextResponse.json(
      { error: "WEBHOOK_SECRET is not defined" },
      { status: 500 }
    );
  }

  if (request.method !== "POST") {
    return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
  }

  const headers = request.headers;
  const payload = await request.json();

  const svix_id = headers.get("svix-id");
  const svix_timestamp = headers.get("svix-timestamp");
  const svix_signature = headers.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return NextResponse.json(
      { error: "Missing Svix headers" },
      { status: 400 }
    );
  }

  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: { data: UserCreatedEvent; type: string };

  try {
    const payloadString = JSON.stringify(payload);
    evt = wh.verify(payloadString, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as { data: UserCreatedEvent; type: string };
  } catch (err: any) {
    console.error("Webhook verification failed:", err.message);
    return NextResponse.json(
      { error: "Webhook verification failed" },
      { status: 400 }
    );
  }

  const { id } = evt.data;
  const eventType = evt.type;
  const body = evt.data;

  if (eventType === "user.created") {
    const { first_name, last_name, email_addresses } = body;
    const email = email_addresses[0]?.email_address;
    const clerkUserId = id;

    if (!email || !clerkUserId) {
      return NextResponse.json(
        { error: "Invalid user data in webhook payload" },
        { status: 400 }
      );
    }

    try {
      await connectMongo();

      // Check if the user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return NextResponse.json(
          { error: "Email already in use" },
          { status: 400 }
        );
      }

      // Create a new user
      const user = new User({
        email,
        clerkUserId,
        name: `${first_name} ${last_name}`,
        about: "",
        emailReminders: true,
        address: "",
        city: "",
        postalCode: "",
        country: "",
        image: {
          url: "",
          alt: "User Profile Image",
        },
      });

      // Save the new user
      await user.save();
    } catch (error) {
      console.error("Error saving user to database:", error);
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
  }

  return NextResponse.json(
    { success: true, message: "Webhook received" },
    { status: 200 }
  );
}
