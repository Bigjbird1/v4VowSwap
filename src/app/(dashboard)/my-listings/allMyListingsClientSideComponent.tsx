"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { PencilIcon } from "@heroicons/react/20/solid";
import { useUser, useAuth } from "@clerk/nextjs";
import Image from "next/image";

interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  status: string;
  photos: { url: string }[];
}

interface AllMyListingsClientSideComponentProps {
  listings: Listing[];
}

export default function AllMyListingsClientSideComponent({
  listings,
}: AllMyListingsClientSideComponentProps) {
  const router = useRouter();
  const { user } = useUser();
  const { getToken } = useAuth();

  useEffect(() => {
    if (!user) {
      router.push("/sign-in");
    }
  }, [user]);

  const updateListingStatus = async (listingId: string, newStatus: string) => {
    try {
      const token = await getToken();
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_UPDATE_LISTING_STATUS}/${listingId}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );
      if (response.ok) {
        router.refresh();
      } else {
        console.error("Error updating listing status");
      }
    } catch (error) {
      console.error("Error updating listing status:", error);
    }
  };

  return (
    <>
      <div className="bg-white sm:rounded-xl">
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-32">
          <button
            onClick={() => router.back()}
            className="mt-2 flex items-center justify-center p-2 text-white bg-black rounded-full hover:bg-gray-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <div className="border-b border-gray-200 pb-10 mt-6">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              My listings
            </h1>
            <p className="mt-4 text-base text-gray-500">
              Here are all your listings. Click on a listing to edit or delete.
            </p>
          </div>

          {listings.length === 0 ? (
            <div className="border-l-4 border-yellow-400 bg-yellow-50 p-4">
              <div className="flex">
                <p className="text-sm text-yellow-700">
                  You have not added any listings yet.
                  <Link href={"/create-listing"} className="underline">
                    Create your first listing now
                  </Link>
                </p>
              </div>
            </div>
          ) : (
            <section aria-labelledby="products-heading" className="pb-24 pt-6">
              <h2 id="products-heading" className="sr-only">
                Products
              </h2>
              <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-3">
                {listings.map((product) => (
                  <div
                    key={product.id}
                    className="group relative flex sm:flex-col overflow-hidden rounded-lg border border-gray-200 bg-white"
                  >
                    <div className="flex-1 p-4 flex flex-col justify-between sm:order-2">
                      <Link href={`/my-listings/${product.id}`}>
                        <h3 className="text-sm font-medium text-gray-900 line-clamp-1">
                          {product.title}
                        </h3>
                        <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                          {product.description}
                        </p>
                      </Link>
                      <div className="mt-2">
                        <div className="text-base font-medium text-gray-900">
                          €{product.price}
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-4">
                        <button
                          onClick={() =>
                            updateListingStatus(
                              product.id,
                              product.status === "sold" ? "published" : "sold"
                            )
                          }
                          className={`w-full text-sm py-2 px-4 rounded ${
                            product.status === "sold"
                              ? "bg-gray-500 hover:bg-gray-600"
                              : "bg-blue-500 hover:bg-blue-600"
                          } text-white`}
                        >
                          {product.status === "sold"
                            ? "Mark as available"
                            : "Mark as sold"}
                        </button>
                      </div>
                    </div>
                    <div className="relative shrink-0 sm:w-full">
                      <Link href={`/my-listings/${product.id}`}>
                        <div className="relative w-32 h-full sm:w-full sm:h-52">
                          <Image
                            src={product.photos[0]?.url || ""}
                            alt={`Image for ${product.title}`}
                            width={500}
                            height={500}
                            className="w-full h-full object-cover"
                          />
                          <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-400 text-lg font-bold">
                            <PencilIcon className="h-7 w-7" />
                          </span>
                        </div>
                      </Link>
                      {product.status === "sold" && (
                        <div className="absolute top-0 right-0 bg-red-500 text-white text-sm font-bold py-1 px-3 m-2 rounded">
                          Sold
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>
      </div>
    </>
  );
}
