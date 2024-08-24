import "server-only";
import FetchMessagesClientSideComponent from "./fetchMessagesClientSideComponent";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

interface Message {
  messageThreadId: string;
  message: string;
  createdAt: string;
  status: string;
  sellerName: string;
  buyerName: string;
}

const fetchMessages = async (): Promise<Message[] | null> => {
  const { getToken } = auth();
  const token = await getToken();

  if (!token) {
    return null;
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/get-all-messages`,
    {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-cache",
    }
  );

  if (!response.ok) {
    return null;
  }

  return await response.json();
};

export default async function FetchMessagesServerSideComponent() {
  const data = await fetchMessages();

  if (!data) {
    redirect("/sign-in");
    return null;
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FetchMessagesClientSideComponent initialMessages={data} />
    </Suspense>
  );
}
