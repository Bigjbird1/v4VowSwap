import "server-only";
import SpecificMessageThreadClientSide from "./specificMessageThreadClientSide";
import { Suspense } from "react";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface Message {
  messageThreadId: string;
  message: string;
  createdAt: string;
  userImage?: { url: string; alt?: string };
  firstName: string;
  lastName: string;
  imageUrl?: string;
  listingId?: ListingDetails;
}

interface ListingDetails {
  title: string;
  description: string;
  price: number;
  photos?: { url: string }[];
}

const fetchSpecificMessages = async (
  messageid: string
): Promise<{ messages: Message[]; listingDetails: ListingDetails | null }> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/get-specific-message/${messageid}`,
      {
        cache: "no-cache",
      }
    );

    if (response.status === 401) {
      return { messages: [], listingDetails: null };
    }

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data: Message[] = await response.json();
    const messages = data || [];
    const listingDetails =
      messages.length > 0 && messages[0].listingId
        ? messages[0].listingId
        : null;

    return { messages, listingDetails };
  } catch (error) {
    console.error("Error fetching message thread:", error);
    return { messages: [], listingDetails: null };
  }
};

interface Params {
  params: {
    messageid: string;
  };
}

export default async function SpecificMessageServerSide({ params }: Params) {
  const { messageid } = params;
  const { messages, listingDetails } = await fetchSpecificMessages(messageid);

  if (messages.length === 0) {
    redirect("/sign-in");
    return null;
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SpecificMessageThreadClientSide
        messages={messages}
        listingDetails={
          listingDetails
            ? { ...listingDetails, photos: listingDetails.photos || [] }
            : null
        }
        messageid={messageid}
      />
    </Suspense>
  );
}
