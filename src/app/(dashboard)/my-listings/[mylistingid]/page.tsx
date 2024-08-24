"use client";

import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import SuccessFullAlertComponent from "@/Components/DashboardComponents/SuccessfullAlertComponent/SuccessFullAlertComponent";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/solid";
import ImageUploader from "@/Components/DashboardComponents/ImageUploader/ImageUploader";
import SpinnerComponent from "@/Components/DashboardComponents/SpinnerComponent/SpinnerComponent";
import { useUser } from "@clerk/nextjs";
import { useAuth } from "@clerk/nextjs";

interface FormData {
  title: string;
  description: string;
  price: string;
  primaryColor: string;
  secondaryColor: string;
  yearProduced: string;
  hasLabel: string;
  hasOriginalBox: string;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_FILES = 10;

const INITIAL_FORM_DATA: FormData = {
  title: "",
  description: "",
  price: "",
  primaryColor: "",
  secondaryColor: "",
  yearProduced: "",
  hasLabel: "",
  hasOriginalBox: "",
};

interface MyListingInfoPageProps {
  params: {
    mylistingid: string;
  };
}

export default function MyListingInfoPage({ params }: MyListingInfoPageProps) {
  const router = useRouter();
  const { user } = useUser();
  const { getToken } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<(File | { id: string })[]>(
    []
  );
  const [thumbnails, setThumbnails] = useState<string[]>([]);
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
  const [condition, setCondition] = useState("used");

  const { mylistingid } = params;

  const colorOptions = [
    { label: "Black", value: "black" },
    { label: "White", value: "white" },
    { label: "Blue", value: "blue" },
    { label: "Red", value: "red" },
    { label: "Green", value: "green" },
    { label: "Yellow", value: "yellow" },
    { label: "Pink", value: "pink" },
    { label: "Grey", value: "grey" },
    { label: "Brown", value: "brown" },
    { label: "Orange", value: "orange" },
    { label: "Purple", value: "purple" },
    { label: "Turquoise", value: "turquoise" },
    { label: "Other", value: "other" },
  ];

  useEffect(() => {
    if (mylistingid) {
      fetchProductDetails();
    }
  }, [mylistingid]);

  const fetchProductDetails = async () => {
    const token = await getToken();
    try {
      const response = await fetch(`/api/get-specific-listing/${mylistingid}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setFormData((prevState) => ({
        ...prevState,
        ...data,
      }));

      setCondition(data.condition || "used");
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    processFiles(files);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    processFiles(files);
  };

  const processFiles = (files: File[]) => {
    if (selectedFiles.length + files.length > MAX_FILES) {
      alert(`You can upload up to ${MAX_FILES} files.`);
      return;
    }
    const validFiles = files.filter((file) => file.size <= MAX_FILE_SIZE);
    setSelectedFiles((prevFiles) => [...prevFiles, ...validFiles]);

    validFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        setThumbnails((prevThumbnails) => [
          ...prevThumbnails,
          reader.result as string,
        ]);
      };

      reader.readAsDataURL(file);
    });
  };

  const handleRemove = (
    e: React.MouseEvent<HTMLButtonElement>,
    index: number
  ) => {
    e.preventDefault();
    e.stopPropagation();

    const newFiles = [...selectedFiles];
    newFiles.splice(index, 1);
    setSelectedFiles(newFiles);

    const newThumbnails = [...thumbnails];
    newThumbnails.splice(index, 1);
    setThumbnails(newThumbnails);
  };

  const handleDismissSuccessAlert = () => {
    setShowSuccess(false);
  };

  const handleDeleteButton = async (
    e: React.MouseEvent<HTMLButtonElement>,
    mylistingid: string
  ) => {
    e.preventDefault();
    if (!user) {
      router.push("/sign-in");
      return;
    }

    if (!confirm(`Are you sure you want to delete this listing?`)) return;

    const token = await getToken();

    try {
      setIsLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DELETE_SPECIFIC_LISTING}/${mylistingid}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      if (response.ok) {
        alert(`Listing deleted successfully`);
        router.push("/dashboard");
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(`Failed to delete the listing: ${error.message}`);
      } else {
        alert("Failed to delete the listing due to an unknown error.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user) {
      router.push("/sign-in");
      return;
    }

    if (
      formData.title.trim() === "" ||
      formData.description.trim() === "" ||
      selectedFiles.length === 0 ||
      formData.price === ""
    ) {
      alert("Please fill out all required fields.");
      return;
    }

    setIsLoading(true);

    const data = new FormData();
    data.append("title", formData.title.trim());
    data.append("description", formData.description.trim());
    data.append("primaryColor", formData.primaryColor);
    data.append("hasLabel", formData.hasLabel);
    data.append("hasOriginalBox", formData.hasOriginalBox);
    data.append("condition", condition);

    const price = parseFloat(formData.price);
    if (isNaN(price) || price <= 0) {
      alert("Please enter a valid price between €0 and €100,000.");
      setIsLoading(false);
      return;
    }
    data.append("price", price.toFixed(2));
    data.append("secondaryColor", formData.secondaryColor || "none chosen");
    data.append("yearProduced", formData.yearProduced || "-1");

    const keptImageIds: string[] = [];
    for (const file of selectedFiles) {
      if (file instanceof File) {
        data.append("images", file);
      } else if ("id" in file) {
        keptImageIds.push(file.id);
      }
    }
    data.append("keptImageIds", keptImageIds.join(","));

    const token = await getToken();

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_UPDATE_EXISTING_LISTING_ENDPOINT}/${mylistingid}`,
        {
          method: "PUT",
          body: data,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 401) {
        alert("Session has expired. Please log in again.");
        setIsLoading(false);
        router.push("/sign-in");
        return;
      }

      const result = await response.json();

      if (response.ok) {
        setShowSuccess(true);
        window.scrollTo(0, 0);
      } else {
        console.error("Error updating listing:", result);
        alert("There was a problem updating your listing. Please try again.");
      }
    } catch (error) {
      console.error("Network error:", error);
      alert("There was a network problem. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-10 divide-y divide-gray-900/10">
      <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-3">
        <div className="px-4 sm:px-0">
          {/* Go back button */}
          <button
            onClick={() => router.back()}
            className="mt-2 flex items-center justify-center p-2 text-white bg-black rounded-full hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
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
          <h2 className="text-base font-semibold mt-6 leading-7 text-gray-900">
            Edit listing
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Go ahead and edit the following listing elements.
          </p>
        </div>
        <div>
          {showSuccess && (
            <SuccessFullAlertComponent
              message="Successfully updated"
              onDismiss={handleDismissSuccessAlert}
            />
          )}
        </div>
        <form
          onSubmit={handleFormSubmit}
          className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2"
        >
          <div className="px-4 py-6 sm:p-8">
            <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              {/* Default Title Input */}
              <div className="col-span-full">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Title
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="title"
                    id="title"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                    placeholder="Enter default title here..."
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              {/* Default Description Input */}
              <div className="col-span-full">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Description
                </label>
                <div className="mt-2">
                  <textarea
                    id="description"
                    name="description"
                    rows={3}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                    placeholder="Enter default description here..."
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="price"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Price
                  <span className="text-red-500" title="required">
                    *
                  </span>
                </label>
                <div className="relative mt-2 rounded-md shadow-sm">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="number"
                    name="price"
                    id="price"
                    min="0"
                    max="1000000"
                    autoComplete="price"
                    className="block w-full rounded-md border-0 py-1.5 pl-7 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                    placeholder="Price in dollar ($)"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                  />
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    <span className="text-gray-500 sm:text-sm">USD</span>
                  </div>
                </div>
              </div>
              <div className="col-span-full">
                <label
                  htmlFor="condition"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Condition
                  <span className="text-red-500" title="required">
                    *
                  </span>
                </label>
                <div className="mt-2">
                  <select
                    id="condition"
                    name="condition"
                    autoComplete="condition"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                    value={condition}
                    onChange={(e) => setCondition(e.target.value)}
                    required
                  >
                    <option value="used">Used</option>
                    <option value="new">New</option>
                  </select>
                </div>
              </div>

              <div className="col-span-full sm:col-span-6 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <div className="flex-1">
                  <label
                    htmlFor="primary-color"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Primary color
                  </label>
                  <div className="mt-2">
                    <select
                      id="primary-color"
                      name="primaryColor"
                      autoComplete="primary-color"
                      className={`custom-select block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:max-w-xs sm:text-sm sm:leading-6 `}
                      value={formData.primaryColor}
                      onChange={handleInputChange}
                    >
                      <option
                        value=""
                        disabled
                        selected={!formData.primaryColor}
                      >
                        Choose one
                      </option>

                      {colorOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="flex-1">
                  <label
                    htmlFor="secondary-color"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Secondary color
                  </label>
                  <div className="mt-2">
                    <select
                      id="secondary-color"
                      name="secondaryColor"
                      autoComplete="secondary-color"
                      className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:max-w-xs sm:text-sm sm:leading-6 `}
                      value={formData.secondaryColor || ""}
                      onChange={handleInputChange}
                    >
                      <option
                        value=""
                        disabled
                        selected={!formData.secondaryColor}
                      >
                        Choose one
                      </option>
                      {colorOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="col-span-full sm:col-span-6 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <div className="flex-1">
                  <label
                    htmlFor="yearProduced"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Year the sneaker was produced
                  </label>
                  <div className="mt-2">
                    <select
                      id="yearProduced"
                      name="yearProduced"
                      autoComplete="yearProduced"
                      className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:max-w-xs sm:text-sm sm:leading-6`}
                      value={formData.yearProduced || ""}
                      onChange={handleInputChange}
                    >
                      <option value="" disabled>
                        Choose one
                      </option>
                      <option value="-1">Not sure</option>
                      <option value="1990">1990</option>
                      <option value="1991">1991</option>
                      <option value="1992">1992</option>
                      <option value="1993">1993</option>
                      <option value="1994">1994</option>
                      <option value="1995">1995</option>
                      <option value="1996">1996</option>
                      <option value="1997">1997</option>
                      <option value="1998">1998</option>
                      <option value="1999">1999</option>
                      <option value="2000">2000</option>
                      <option value="2001">2001</option>
                      <option value="2002">2002</option>
                      <option value="2003">2003</option>
                      <option value="2004">2004</option>
                      <option value="2005">2005</option>
                      <option value="2006">2006</option>
                      <option value="2007">2007</option>
                      <option value="2008">2008</option>
                      <option value="2009">2009</option>
                      <option value="2010">2010</option>
                      <option value="2011">2011</option>
                      <option value="2012">2012</option>
                      <option value="2013">2013</option>
                      <option value="2014">2014</option>
                      <option value="2015">2015</option>
                      <option value="2016">2016</option>
                      <option value="2017">2017</option>
                      <option value="2018">2018</option>
                      <option value="2019">2019</option>
                      <option value="2020">2020</option>
                      <option value="2021">2021</option>
                      <option value="2022">2022</option>
                      <option value="2023">2023</option>
                    </select>
                  </div>
                </div>
                <div className="flex-1">
                  <label
                    htmlFor="hasLabel"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Comes with label still on?
                    <div className="ml-1 text-gray-400 cursor-help relative group inline-block">
                      <QuestionMarkCircleIcon className="h-3 w-3" />
                      <span className="absolute left-0 bottom-full mb-2 w-48 px-2 py-1 text-xs text-white bg-black rounded invisible group-hover:visible">
                        Sneakers with a label still on are generally more
                        valuable.
                      </span>
                    </div>
                  </label>
                  <div className="mt-2">
                    <select
                      id="hasLabel"
                      name="hasLabel"
                      autoComplete="hasLabel"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      value={formData.hasLabel}
                      onChange={handleInputChange}
                    >
                      <option value="" disabled>
                        Choose one
                      </option>
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="col-span-full sm:col-span-6 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <div className="flex-1">
                  <label
                    htmlFor="hasOriginalBox"
                    className="block text-sm font-medium leading-6 text-gray-900 relative"
                  >
                    Comes in original box?
                    <div className="ml-1 text-gray-400 cursor-help relative group inline-block">
                      <QuestionMarkCircleIcon className="h-3 w-3" />
                      <span className="absolute left-0 bottom-full mb-2 w-48 px-2 py-1 text-xs text-white bg-black rounded invisible group-hover:visible">
                        Sneakers that comes in original box are generally more
                        valuable.
                      </span>
                    </div>
                  </label>
                  <div className="mt-2">
                    <select
                      id="hasOriginalBox"
                      name="hasOriginalBox"
                      autoComplete="hasOriginalBox"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      value={formData.hasOriginalBox}
                      onChange={handleInputChange}
                    >
                      <option value="" disabled>
                        Choose one
                      </option>
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="cover-photo"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Upload photos
                  <span className="text-red-500" title="required">
                    *
                  </span>
                </label>

                <ImageUploader
                  thumbnails={thumbnails}
                  handleRemove={handleRemove}
                  handleFileChange={handleFileChange}
                  handleDragOver={handleDragOver}
                  handleDrop={handleDrop}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
            <div>
              <button
                onClick={(e) => handleDeleteButton(e, mylistingid)}
                type="button" // Set to 'button' so it doesn't submit the form
                className={`relative inline-flex justify-center items-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 ${
                  isLoading ? "cursor-not-allowed" : ""
                }`}
                disabled={isLoading}
              >
                <div
                  className={`flex items-center transition-opacity duration-300 ${
                    isLoading ? "opacity-0" : "opacity-100"
                  }`}
                >
                  Delete
                </div>
                <div
                  className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
                    isLoading ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <SpinnerComponent />
                </div>
              </button>
            </div>
            <button
              type="submit"
              className={`relative inline-flex justify-center items-center rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600 ${
                isLoading ? "cursor-not-allowed" : ""
              }`}
              disabled={isLoading}
            >
              <div
                className={`flex items-center transition-opacity duration-300 ${
                  isLoading ? "opacity-0" : "opacity-100"
                }`}
              >
                Save listing
              </div>
              <div
                className={`absolute flex items-center transition-opacity duration-300 ${
                  isLoading ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className="mr-2">
                  <SpinnerComponent />
                </div>
                <span>Saving</span>
              </div>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
