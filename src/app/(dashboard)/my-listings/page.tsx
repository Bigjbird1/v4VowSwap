import AllMyListingsClientSideComponent from "./allMyListingsClientSideComponent";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  status: string;
  photos: { url: string }[];
}

const fetchMyListingsData = async (): Promise<Listing[] | null> => {
  const { getToken } = auth();
  const token = await getToken();

  if (!token) {
    return null;
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/my-listings`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  if (!response.ok) {
    return null;
  }

  return await response.json();
};

export default async function AllMyListingsServerSideComponent() {
  const data = await fetchMyListingsData();

  if (!data) {
    redirect("/sign-in");
    return null;
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AllMyListingsClientSideComponent listings={data} />
    </Suspense>
  );
}
