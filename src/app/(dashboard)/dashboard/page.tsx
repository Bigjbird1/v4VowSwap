import "server-only";
import DashboardPage from "./dashboardPageClientSide";
import { auth } from "@clerk/nextjs/server";
import { Suspense } from "react";

interface UserData {
  firstName: string;
  isStripeConnected: boolean;
}

const fetchUserData = async (): Promise<UserData | null> => {
  const { getToken } = auth();

  try {
    const token = await getToken();

    if (!token) {
      console.error("Token not found. Redirecting to sign-in.");

      return null;
    }

    if (!process.env.NEXT_PUBLIC_DASHBOARD) {
      console.warn(
        "NEXT_PUBLIC_DASHBOARD is not defined. Continuing without fetching user data."
      );
      return null;
    }

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await fetch(process.env.NEXT_PUBLIC_DASHBOARD, {
      headers,
    });

    if (response.status === 401) {
      console.error("Unauthorized access. Redirecting.");

      return null;
    }

    if (response.ok) {
      const data: UserData = await response.json();
      return data;
    } else {
      console.error("Failed to fetch user data");
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
  }

  return null;
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
