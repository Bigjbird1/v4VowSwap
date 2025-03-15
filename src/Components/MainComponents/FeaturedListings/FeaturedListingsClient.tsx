import React from "react";
import Link from "next/link";
import { EnvelopeIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  photos: { url: string }[];
}

interface FeaturedListingsClientProps {
  data: Listing[];
}

export default function FeaturedListingsClient({
  data,
}: FeaturedListingsClientProps) {
  return (
    <div className="bg-base-100 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-left items-left sm:items-center">
          <h2 className="text-2xl font-bold  mb-4 sm:mb-0 sm:mr-6">
            Featured Listings
          </h2>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4">
          {data.map((product) => (
            <div
              key={product.id}
              className="group relative flex flex-row-reverse sm:flex-col overflow-hidden rounded-lg border border-gray-200 bg-base-100 h-32 sm:h-[334px]"
            >
              <div className="relative shrink-0 sm:w-full">
                <Link href={`/listings/${product.id}`}>
                  <Image
                    src={product.photos[0]?.url || ""}
                    alt={product.title}
                    width={500}
                    height={500}
                    className="w-32 h-full object-cover sm:w-full sm:h-52"
                  />
                </Link>

                <button className="absolute bottom-2 right-2 transition-transform duration-100 transform hover:scale-150">
                  <EnvelopeIcon
                    className="h-6 w-6 text-gray-300 hover:text-gray-500"
                    aria-hidden="true"
                  />
                </button>
              </div>

              {/* Content Section */}
              <div className="flex-1 p-4 flex flex-col justify-between sm:order-2">
                <Link href={`/listings/${product.id}`}>
                  <div>
                    <h3 className="text-sm font-medium  line-clamp-1">
                      {product.title}
                    </h3>
                    <p className="text-sm  mt-2 line-clamp-2">
                      {product.description}
                    </p>
                  </div>
                </Link>

                <div className="text-base font-medium text-gray-900">
                  {product.price} €
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6">
          <Link href="/listings">
            <span className="text-green-600 hover:text-green-500 text-xl font-bold">
              See all listings
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
