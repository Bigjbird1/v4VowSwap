"use client";
import React, { useState, useEffect, useRef } from "react";
import MainLayout from "../../SpeceficLayouts/MainLayout";
import { useRouter } from "next/navigation";
import { Disclosure, Tab } from "@headlessui/react";
import {
  ShareIcon,
  BookmarkIcon,
  MinusIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import "photoswipe/style.css";
import Image from "next/image";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface ListingData {
  title: string;
  description: string;
  price: number;
  photos: { url: string }[];
  seller: {
    imageUrl: string;
    name: string;
    location: string;
  };
}

interface SpecificListingProps {
  listingData: ListingData;
}

export default function SpecificListing({ listingData }: SpecificListingProps) {
  const { title, description, price, photos, seller } = listingData;
  const [selectedImage, setSelectedImage] = useState(photos[0].url);
  const router = useRouter();
  const lightboxRef = useRef<PhotoSwipeLightbox | null>(null);

  useEffect(() => {
    const lightbox = new PhotoSwipeLightbox({
      gallery: "#gallery",
      children: "a",
      pswpModule: () => import("photoswipe"),
    });
    lightbox.init();

    lightboxRef.current = lightbox;

    return () => lightbox.destroy();
  }, []);

  return (
    <MainLayout>
      <div className="bg-white">
        <main className="mx-auto max-w-7xl sm:px-6 sm:pt-16 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-none">
            <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
              <Tab.Group as="div" className="flex flex-col-reverse">
                <div className="mx-auto mt-6 w-full max-w-2xl lg:max-w-none">
                  <Tab.List className="grid grid-cols-4 gap-6">
                    {photos.map((image, index) => (
                      <Tab
                        key={index}
                        onClick={() => setSelectedImage(image.url)}
                        className="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
                      >
                        <img
                          src={image.url}
                          alt={`Thumbnail ${index}`}
                          className="h-full w-full object-cover rounded-md object-center"
                        />
                      </Tab>
                    ))}
                  </Tab.List>
                </div>

                <Tab.Panels className="aspect-h-1 aspect-w-1 w-full relative">
                  <div className="w-full h-full" id="gallery">
                    <a
                      href={selectedImage}
                      data-pswp-width="1600"
                      data-pswp-height="1600"
                    >
                      <img
                        src={selectedImage}
                        alt="Selected Product"
                        className="h-full w-full object-cover object-center sm:rounded-lg cursor-pointer"
                      />
                    </a>
                    <button
                      onClick={() => router.back()}
                      className="absolute top-0 left-0 z-10 p-2 m-2 text-white bg-black rounded-full hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      aria-label="Go back"
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
                  </div>
                </Tab.Panels>
              </Tab.Group>

              <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                  {title}
                </h1>
                <div className="mt-3">
                  <h2 className="sr-only">Product information</h2>
                  <p className="text-3xl text-gray-900">{price} €</p>
                </div>
                <div className="mt-6">
                  <h3 className="sr-only">Description</h3>
                  <div className="space-y-6 text-base text-gray-700">
                    {description}
                  </div>
                </div>
                <div className="mt-6 flex items-center space-x-4">
                  <button className="flex items-center justify-center rounded-md px-3 py-3 text-gray-400 hover:bg-gray-100 hover:text-gray-500">
                    <BookmarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                  <button className="flex items-center justify-center rounded-md px-3 py-3 text-gray-400 hover:bg-gray-100 hover:text-gray-500">
                    <ShareIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="hidden lg:flex lg:mt-6 lg:space-x-4">
                  <button
                    className="flex-1 items-center justify-center rounded-md border border-gray-300 bg-white px-8 py-3 text-base font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                    onClick={() =>
                      alert("Write Seller functionality not implemented yet")
                    }
                  >
                    Write Seller
                  </button>
                  <button
                    className="flex-1 items-center justify-center rounded-md bg-green-600 px-8 py-3 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                    onClick={() =>
                      alert("Buy Now functionality not implemented yet")
                    }
                  >
                    Buy Now
                  </button>
                </div>
                <div className="mt-10 flex items-center">
                  <img
                    src={seller.imageUrl || "/images/profiles/profile1.jpg"}
                    alt="Seller"
                    className="w-10 h-10 rounded-full object-cover mr-4"
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-700">
                      {seller.name || "Peter"}
                    </p>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className="h-5 w-5 text-yellow-400"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          style={{ marginRight: i < 4 ? "4px" : "0" }}
                        >
                          <path d="M12 .587l3.668 7.571L24 9.412l-6 5.847 1.418 8.268L12 18.896l-7.418 4.631L6 15.259 0 9.412l8.332-1.254L12 .587z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>

                <section
                  aria-labelledby="details-heading"
                  className="mt-6 lg:mt-6"
                >
                  <div className="divide-y divide-gray-200 border-t">
                    <Disclosure as="div">
                      {({ open }) => (
                        <>
                          <h3>
                            <Disclosure.Button className="group relative flex w-full items-center justify-between py-6 text-left">
                              <span
                                className={classNames(
                                  open ? "text-gray-600" : "text-gray-900",
                                  "text-sm font-medium"
                                )}
                              >
                                Additional Details
                              </span>
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <MinusIcon
                                    className="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <PlusIcon
                                    className="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
                                    aria-hidden="true"
                                  />
                                )}
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel
                            as="div"
                            className="prose prose-sm pb-6"
                          >
                            <ul
                              role="list"
                              className="list-disc pl-5 text-gray-500"
                            >
                              <li className="text-gray-500 text-sm p-1">
                                Seller: {seller.name}
                              </li>
                              <li className="text-gray-500 text-sm p-1">
                                Location: {seller.location}
                              </li>
                            </ul>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </main>
        <div className="fixed inset-x-0 bottom-0 bg-white border-t border-gray-200 p-4 lg:hidden">
          <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:space-x-4">
            <button
              className="flex-1 items-center justify-center rounded-md border border-gray-300 bg-white px-8 py-3 text-base font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-50"
              onClick={() =>
                alert("Write Seller functionality not implemented yet")
              }
            >
              Write Seller
            </button>
            <button
              className="flex-1 items-center justify-center rounded-md bg-green-600 px-8 py-3 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-50"
              onClick={() => alert("Buy Now functionality not implemented yet")}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
