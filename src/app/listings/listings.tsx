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
  originalPrice?: number;
  photos: { url: string }[];
  category?: string;
  condition?: string;
  weddingStyle?: string;
  season?: string;
}

interface ListingsProps {
  listings: Listing[];
}

// Wedding-specific price ranges
const priceOptions = [
  { value: "0-100", label: "$0 - $100" },
  { value: "101-300", label: "$101 - $300" },
  { value: "301-500", label: "$301 - $500" },
  { value: "501-1000", label: "$501 - $1,000" },
  { value: "1001+", label: "$1,001+" },
];

// Wedding categories
const categoryOptions = [
  { value: "dresses", label: "Dresses" },
  { value: "decor", label: "Decor" },
  { value: "accessories", label: "Accessories" },
  { value: "flowers", label: "Flowers" },
  { value: "shoes", label: "Shoes" },
  { value: "stationery", label: "Stationery" },
  { value: "gifts", label: "Gifts" },
];


// Wedding seasons
const seasonOptions = [
  { value: "spring-summer", label: "Spring/Summer" },
  { value: "fall-winter", label: "Fall/Winter" },
  { value: "all-seasons", label: "All Seasons" },
];

export default function Listings({ listings }: ListingsProps) {
  const [filteredProducts, setFilteredProducts] = useState<Listing[]>(listings);
  const [selectedPriceRange, setSelectedPriceRange] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSeasons, setSelectedSeasons] = useState<string[]>([]);

  useEffect(() => {
    filterProducts();
  }, [selectedPriceRange, selectedCategories, selectedSeasons]);

  const filterProducts = () => {
    let filtered = [...listings];

    // Filter by price
    if (selectedPriceRange.length > 0) {
      filtered = filtered.filter((product) => {
        return selectedPriceRange.some((range) => {
          const [min, max] = range.split("-").map(Number);
          return product.price >= min && (max ? product.price <= max : true);
        });
      });
    }

    // Filter by category
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((product) => 
        product.category && selectedCategories.includes(product.category.toLowerCase())
      );
    }

    // Filter by season
    if (selectedSeasons.length > 0) {
      filtered = filtered.filter((product) => 
        product.season && selectedSeasons.includes(product.season.toLowerCase().replace(/\//g, '-'))
      );
    }


    setFilteredProducts(filtered);
  };

  const handlePriceChange = (priceRange: string) => {
    setSelectedPriceRange((prevRanges) =>
      prevRanges.includes(priceRange)
        ? prevRanges.filter((range) => range !== priceRange)
        : [...prevRanges, priceRange]
    );
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleSeasonChange = (season: string) => {
    setSelectedSeasons((prev) =>
      prev.includes(season)
        ? prev.filter((s) => s !== season)
        : [...prev, season]
    );
  };

  return (
    <MainLayout>
      <div className="bg-white">
        <div className="mx-auto max-w-7xl">
          {/* Page Title */}
          <div className="px-4 py-8 text-center">
            <h1 className="text-3xl font-serif text-navy">Wedding Marketplace</h1>
            <p className="mt-2 text-neutral-600">Find pre-loved wedding items at a fraction of retail price</p>
          </div>
          
          <div className="lg:grid lg:grid-cols-4 lg:gap-x-8 xl:grid-cols-5 lg:pl-4">
            {/* Filters */}
            <aside className="hidden lg:block lg:col-span-1 xl:col-span-1">
              <h2 className="text-lg font-medium text-navy mb-4">Filters</h2>
              <div className="space-y-8 divide-y divide-gray-200 p-4">
                {/* Category Filter */}
                <fieldset>
                  <legend className="block text-sm font-medium text-gray-900 mb-2">
                    Category
                  </legend>
                  <div className="space-y-2">
                    {categoryOptions.map((option) => (
                      <div key={option.value} className="flex items-center">
                        <input
                          id={`category-${option.value}`}
                          name="category"
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary/50"
                          onChange={() => handleCategoryChange(option.value)}
                          checked={selectedCategories.includes(option.value)}
                        />
                        <label
                          htmlFor={`category-${option.value}`}
                          className="ml-3 text-sm text-gray-600"
                        >
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </fieldset>

                {/* Price Filter */}
                <fieldset className="pt-6">
                  <legend className="block text-sm font-medium text-gray-900 mb-2">
                    Price
                  </legend>
                  <div className="space-y-2">
                    {priceOptions.map((option) => (
                      <div key={option.value} className="flex items-center">
                        <input
                          id={`price-${option.value}`}
                          name="price"
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary/50"
                          onChange={() => handlePriceChange(option.value)}
                          checked={selectedPriceRange.includes(option.value)}
                        />
                        <label
                          htmlFor={`price-${option.value}`}
                          className="ml-3 text-sm text-gray-600"
                        >
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </fieldset>

                {/* Season Filter */}
                <fieldset className="pt-6">
                  <legend className="block text-sm font-medium text-gray-900 mb-2">
                    Season
                  </legend>
                  <div className="space-y-2">
                    {seasonOptions.map((option) => (
                      <div key={option.value} className="flex items-center">
                        <input
                          id={`season-${option.value}`}
                          name="season"
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary/50"
                          onChange={() => handleSeasonChange(option.value)}
                          checked={selectedSeasons.includes(option.value)}
                        />
                        <label
                          htmlFor={`season-${option.value}`}
                          className="ml-3 text-sm text-gray-600"
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
            <Disclosure as="div" className="lg:hidden px-4 py-2">
              {({ open }) => (
                <>
                  <Disclosure.Button className="w-full flex justify-between items-center py-2 text-sm font-medium text-gray-600 hover:text-gray-900 border-b border-gray-200">
                    <span>{open ? "Hide" : "Show"} filters</span>
                    <span className="ml-6 flex items-center">
                      {open ? (
                        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M4 10a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                        </svg>
                      )}
                    </span>
                  </Disclosure.Button>
                  <Disclosure.Panel className="pt-4 pb-6 divide-y divide-gray-200">
                    {/* Mobile Category Filter */}
                    <fieldset className="mb-4">
                      <legend className="block text-sm font-medium text-gray-900 mb-2">
                        Category
                      </legend>
                      <div className="grid grid-cols-2 gap-2">
                        {categoryOptions.map((option) => (
                          <div key={option.value} className="flex items-center">
                            <input
                              id={`mobile-category-${option.value}`}
                              name="category"
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary/50"
                              onChange={() => handleCategoryChange(option.value)}
                              checked={selectedCategories.includes(option.value)}
                            />
                            <label
                              htmlFor={`mobile-category-${option.value}`}
                              className="ml-3 text-sm text-gray-600"
                            >
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </fieldset>

                    {/* Mobile Price Filter */}
                    <fieldset className="py-4">
                      <legend className="block text-sm font-medium text-gray-900 mb-2">
                        Price
                      </legend>
                      <div className="grid grid-cols-2 gap-2">
                        {priceOptions.map((option) => (
                          <div key={option.value} className="flex items-center">
                            <input
                              id={`mobile-price-${option.value}`}
                              name="price"
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary/50"
                              onChange={() => handlePriceChange(option.value)}
                              checked={selectedPriceRange.includes(option.value)}
                            />
                            <label
                              htmlFor={`mobile-price-${option.value}`}
                              className="ml-3 text-sm text-gray-600"
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
              {/* Results count */}
              <div className="flex justify-between items-center border-b border-gray-200 pb-4 pt-2">
                <p className="text-sm text-gray-500">
                  Showing <span className="font-medium text-gray-900">{filteredProducts.length}</span> results
                </p>
                <div className="flex items-center">
                  <span className="text-sm text-gray-500 mr-2">Sort by:</span>
                  <select className="text-sm border-gray-300 rounded-md focus:ring-primary focus:border-primary">
                    <option>Newest</option>
                    <option>Price: Low to high</option>
                    <option>Price: High to low</option>
                    <option>Highest savings</option>
                  </select>
                </div>
              </div>

              {/* Product grid */}
              <div className="mt-6 grid grid-cols-1 gap-y-8 sm:grid-cols-2 sm:gap-x-6 lg:gap-x-8 xl:grid-cols-3 mb-8">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white flex flex-col shadow-soft hover:shadow-md transition-all duration-300"
                    >
                      <div className="relative w-full h-80 bg-gray-100 overflow-hidden">
                        <img
                          src={product.photos[0].url}
                          alt={product.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        
                        {/* Category badge */}
                        {product.category && (
                          <div className="absolute top-3 left-3 px-2 py-1 bg-white/80 backdrop-blur-sm rounded-full text-xs font-medium text-gray-800">
                            {product.category}
                          </div>
                        )}
                        
                      </div>
                      
                      <div className="p-4 flex-grow flex flex-col">
                        <div className="mb-2 flex flex-wrap gap-1">
                          {/* Condition tag */}
                          {product.condition && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                              {product.condition}
                            </span>
                          )}
                          
                          {/* Style tag */}
                          {product.weddingStyle && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary/80">
                              {product.weddingStyle}
                            </span>
                          )}
                          
                          {/* Season tag */}
                          {product.season && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {product.season}
                            </span>
                          )}
                        </div>
                        
                        <h3 className="text-sm font-medium text-gray-900 mb-1">
                          {product.title}
                        </h3>
                        <p className="text-sm text-gray-500 mb-2 line-clamp-2 flex-grow">
                          {product.description}
                        </p>
                        
                        <div className="flex justify-between items-end">
                          <div className="flex items-end gap-2">
                            <span className="text-lg font-medium text-gray-900">
                              ${product.price}
                            </span>
                          </div>
                          <a 
                            href={`/listings/${product.id}`}
                            className="text-sm font-medium text-primary hover:text-primary/80"
                          >
                            View details
                          </a>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full py-10 text-center">
                    <p className="text-gray-500">No items match your filters. Try adjusting your criteria.</p>
                  </div>
                )}
              </div>
              
              <Pagination
                currentPage={1}
                totalPages={1}
                handlePageChange={() => {}}
              />
            </main>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
