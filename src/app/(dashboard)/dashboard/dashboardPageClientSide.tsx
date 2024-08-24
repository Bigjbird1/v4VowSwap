"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import SuccessFullAlertComponent from "../../../Components/DashboardComponents/SuccessfullAlertComponent/SuccessFullAlertComponent";
import ActionsComponent from "../../../Components/DashboardComponents/ActionsComponent/ActionsComponent";
import { ExclamationTriangleIcon } from "@heroicons/react/20/solid";
import Spinner from "../../../Components/DashboardComponents/SpinnerComponent/SpinnerComponent";
import { useUser } from "@clerk/nextjs";

interface DashboardPageProps {
  firstName: string;
  isStripeConnected: boolean;
}

export default function DashboardPageClientSide({
  firstName = "Guest", // Default value in case firstName is undefined
  isStripeConnected = false, // Default value in case isStripeConnected is undefined
}: DashboardPageProps) {
  const searchParams = useSearchParams();
  const emailVerified = searchParams.get("emailVerified");
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(true);
  const [loading, setLoading] = useState(false);
  const { user } = useUser();

  const handleStripeConnect = async () => {
    setLoading(true);
    try {
      const currentUrl = window.location.href;
      const locale = window.location.pathname.split("/")[1];

      const response = await fetch(
        process.env.NEXT_PUBLIC_CONNECT_USER_TO_STRIPE!,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: user?.id, locale, currentUrl }),
        }
      );

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error("Failed to create Stripe account link");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error connecting to Stripe:", error);
      setLoading(false);
    }
  };

  const formattedFirstName = firstName
    ? firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase()
    : "";

  return (
    <>
      {emailVerified && (
        <SuccessFullAlertComponent message={"Email verified"} />
      )}
      {showWelcomeMessage && (
        <SuccessFullAlertComponent
          message={
            formattedFirstName ? `Welcome, ${formattedFirstName}!` : "Welcome!"
          }
          onDismiss={() => setShowWelcomeMessage(false)}
        />
      )}
      {!isStripeConnected && (
        <div className="mt-5">
          <div className="rounded-md bg-yellow-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <ExclamationTriangleIcon
                  className="h-5 w-5 text-yellow-400"
                  aria-hidden="true"
                />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">
                  Attention Needed
                </h3>
                <div className="mt-2 text-sm text-yellow-700">
                  <p>
                    To start receiving payments from your sales, please connect
                    your account with our payment provider Stripe.
                  </p>
                </div>
                <div className="mt-2 ">
                  <button
                    onClick={handleStripeConnect}
                    className={`flex items-center justify-center rounded-md border border-transparent bg-green-600 px-8 py-3 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full ${
                      loading ? "cursor-not-allowed opacity-50" : ""
                    }`}
                    disabled={loading}
                  >
                    {loading ? (
                      <Spinner />
                    ) : (
                      "Connect Your Account to Stripe Connect Now"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mt-4">
        <ActionsComponent />
      </div>
    </>
  );
}
