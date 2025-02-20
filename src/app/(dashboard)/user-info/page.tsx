import "server-only";
import UserInfoClientSideComponent from "./UserInfoClientSideComponent";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

interface UserData {
  about: string;
  emailReminders: boolean;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  email: string;
  firstName: string;
  image?: {
    url?: string;
    alt?: string;
  };
}

const fetchData = async (): Promise<UserData | null> => {
  const { userId, redirectToSignIn } = await auth();
  if (!userId) return redirectToSignIn();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/get-user-data`,
    {
      cache: "no-cache",
    }
  );

  if (!response.ok) {
    return null;
  }

  const data: UserData = await response.json();
  return data;
};

export default async function UserInfoServerSideComponent() {
  const data = await fetchData();

  if (!data) {
    redirect("/sign-in");
    return null;
  }

  const imageURL = data.image?.url || "/default-image.png";
  const imageALT = data.image?.alt || "Default Image";

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UserInfoClientSideComponent
        formData={data}
        imageURL={imageURL}
        imageALT={imageALT}
      />
    </Suspense>
  );
}
