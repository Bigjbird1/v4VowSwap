"use client";

import { useState, useEffect } from "react";
import { Disclosure } from "@headlessui/react";
import MainLayout from "../SpeceficLayouts/MainLayout";
import Pagination from "./paginationComponent";
import Link from "next/link";
import Image from "next/image";

interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  photos: { url: string }[];
}

interface ListingsProps {
  listings: Listing[];
}

const priceOptions = [
  { value: "0-50", label: "$0 - $50" },
  { value: "51-100", label: "$51 - $100" },
  { value: "101-200", label: "$101 - $200" },
  { value: "201-500", label: "$201 - $500" },
  { value: "501+", label: "$501+ " },
];

export default function Listings({ listings }: ListingsProps) {
  const [filteredProducts, setFilteredProducts] = useState<Listing[]>(listings);
  const [selectedPriceRange, setSelectedPriceRange] = useState<string[]>([]);

  useEffect(() => {
    filterProductsByPrice();
  }, [selectedPriceRange]);

  const filterProductsByPrice = () => {
    if (selectedPriceRange.length === 0) {
      setFilteredProducts(listings);
    } else {
      const filtered = listings.filter((product) => {
        return selectedPriceRange.some((range) => {
          const [min, max] = range.split("-").map(Number);
          return product.price >= min && (max ? product.price <= max : true);
        });
      });
      setFilteredProducts(filtered);
    }
  };

  const handlePriceChange = (priceRange: string) => {
    setSelectedPriceRange((prevRanges) =>
      prevRanges.includes(priceRange)
        ? prevRanges.filter((range) => range !== priceRange)
        : [...prevRanges, priceRange]
    );
  };

  return (
    <MainLayout>
      <div className="bg-white">
        <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-4 lg:gap-x-8 xl:grid-cols-5 lg:pl-4">
          {/* Filters */}
          <aside className="hidden lg:block lg:col-span-1 xl:col-span-1">
            <h2 className="sr-only">Filters</h2>
            <div className="space-y-10 divide-y divide-gray-200 p-4">
              <fieldset>
                <legend className="block text-sm font-medium text-gray-900">
                  Price
                </legend>
                <div className="space-y-3 pt-6">
                  {priceOptions.map((option) => (
                    <div key={option.value} className="flex items-center">
                      <input
                        id={`price-${option.value}`}
                        name="price"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-gray-600 focus:ring-gray-500"
                        onChange={() => handlePriceChange(option.value)}
                        checked={selectedPriceRange.includes(option.value)}
                      />
                      <label
                        htmlFor={`price-${option.value}`}
                        className="ml-3 text-sm text-gray-500"
                      >
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              </fieldset>
            </div>
          </aside>

          {/* Mobile Filters */}
          <Disclosure as="div" className="lg:hidden">
            {({ open }) => (
              <>
                <Disclosure.Button className="px-4 py-2 w-full text-left text-sm font-medium text-gray-600 hover:text-gray-900">
                  {open ? "Hide" : "Show"} filters
                </Disclosure.Button>
                <Disclosure.Panel className="p-4">
                  <fieldset>
                    <legend className="block text-sm font-medium text-gray-900">
                      Price
                    </legend>
                    <div className="space-y-3 pt-6">
                      {priceOptions.map((option) => (
                        <div key={option.value} className="flex items-center">
                          <input
                            id={`mobile-price-${option.value}`}
                            name="price"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-gray-600 focus:ring-gray-500"
                            onChange={() => handlePriceChange(option.value)}
                            checked={selectedPriceRange.includes(option.value)}
                          />
                          <label
                            htmlFor={`mobile-price-${option.value}`}
                            className="ml-3 text-sm text-gray-500"
                          >
                            {option.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </fieldset>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>

          {/* Product Listings */}
          <main className="lg:col-span-3 xl:col-span-4 px-4 md:px-6 lg:px-8">
            <div className="mt-6 grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:gap-x-8 xl:grid-cols-3 mb-8">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white flex flex-col"
                >
                  <div className="relative w-full h-80 bg-gray-200 group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-3 ">
                    <Image
                      src={product.photos[0].url}
                      alt={product.title}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-medium text-gray-900">
                      {product.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {product.description}
                    </p>
                    <p className="text-lg font-medium text-gray-900">
                      ${product.price}
                    </p>
                    <Link href={`/listings/${product.id}`} passHref>
                      <span className="mt-4 block text-sm font-medium  text-green-600 hover:text-green-500">
                        View details →
                      </span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            <Pagination
              currentPage={1}
              totalPages={1}
              handlePageChange={() => {}}
            />
          </main>
        </div>
      </div>
    </MainLayout>
  );
}
