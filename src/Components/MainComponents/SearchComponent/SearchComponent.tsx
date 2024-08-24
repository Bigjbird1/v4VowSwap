import React, { useState, Fragment } from "react";
import { Combobox, Dialog, Transition } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import Image from "next/image";

interface SearchComponentProps {
  onSearch: (query: string) => Promise<void>;
  searchResults: Array<Listing | User>;
}

interface Listing {
  _id: string;
  title: string;
  description: string;
  price: number;
  photos?: { url: string }[];
}

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  type: "user";
}

const SearchComponent: React.FC<SearchComponentProps> = ({
  onSearch,
  searchResults,
}) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState<string>("");

  function transformImageUrl(url: string): string {
    const transformationString = "q_auto,f_auto,w_500"; // Example transformations
    const parts = url.split("/upload/");
    return `${parts[0]}/upload/${transformationString}/${parts[1]}`;
  }

  const filteredItems = query
    ? searchResults
        .filter((item) => {
          if ("title" in item) {
            return item.title.toLowerCase().includes(query.toLowerCase());
          }
          const fullName = `${item.firstName} ${item.lastName}`.toLowerCase();
          return fullName.includes(query.toLowerCase());
        })
        .map((item) => {
          if ("photos" in item && item.photos) {
            return {
              ...item,
              photos: item.photos.map((photo) => ({
                ...photo,
                url: transformImageUrl(photo.url),
              })),
            };
          }
          return item;
        })
    : [];

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    setQuery(input);
    if (input.length > 0 && onSearch) {
      onSearch(input);
    }
  };

  return (
    <div className="w-full flex justify-left xl:justify-center">
      <div className="w-full">
        <Combobox
          as="div"
          className="relative w-full"
          onChange={(item: Listing | User) => {
            if ("type" in item && item.type === "user") {
              window.location.href = `/seller-profile/${item._id}`;
            } else {
              window.location.href = `/listings/${item._id}`;
            }
          }}
        >
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <MagnifyingGlassIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </div>
            <Combobox.Input
              className="block w-full rounded-md border-0 pr-14 pl-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-300 sm:text-sm sm:leading-6 py-3"
              placeholder=""
              onChange={handleSearchChange}
              value={query}
            />
          </div>

          {query && (
            <Combobox.Options className="absolute z-10 mt-1 w-full max-h-60 overflow-auto rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                  <Combobox.Option
                    key={item._id}
                    value={item}
                    className="cursor-pointer select-none relative py-2 pl-3 pr-9"
                  >
                    {"title" in item ? (
                      <div className="flex items-center space-x-3">
                        <Image
                          src={
                            item.photos && item.photos.length > 0
                              ? item.photos[0].url
                              : "path/to/default/listing/image.jpg"
                          }
                          alt={item.title || "Listing Image"}
                          className="h-10 w-10 flex-shrink-0 object-cover rounded-md"
                        />
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {item.title}
                          </p>
                          <p className="text-xs text-gray-500">
                            {item.description.substring(0, 30)}...
                          </p>
                          {item.price && (
                            <p className="text-sm text-gray-700">
                              {item.price} €
                            </p>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-3">
                        <span className="inline-block h-8 w-8 overflow-hidden rounded-full bg-gray-100">
                          <svg
                            className="h-full w-full text-gray-300"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                          </svg>
                        </span>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {item.firstName} {item.lastName}
                          </p>
                        </div>
                      </div>
                    )}
                  </Combobox.Option>
                ))
              ) : (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  No results found.
                </div>
              )}
            </Combobox.Options>
          )}
        </Combobox>
      </div>
    </div>
  );
};

export default SearchComponent;
