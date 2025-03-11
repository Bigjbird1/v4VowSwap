import "server-only";
import DashboardPage from "./dashboardPageClientSide";
import { Suspense } from "react";

interface UserData {
  firstName: string;
  isStripeConnected: boolean;
}

const fetchUserData = async (): Promise<UserData | null> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/get-user-data`,
      {
        cache: "no-cache",
      }
    );

    if (response.status === 401) {
      console.error("Unauthorized access. Redirecting.");
      return null;
    }

    if (!response.ok) {
      console.log("Failed to fetch user data");
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
};

export default async function DashboardPageServerSide() {
  const data = await fetchUserData();

  const firstName = data?.firstName ?? "Guest";
  const isStripeConnected = data?.isStripeConnected ?? false;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DashboardPage
        firstName={firstName}
        isStripeConnected={isStripeConnected}
      />
    </Suspense>
  );
}
