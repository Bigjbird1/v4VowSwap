"use client";
import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/solid";
import ImageUploader from "../../../Components/DashboardComponents/ImageUploader/ImageUploader";
import SuccessFullAlertComponent from "@/Components/DashboardComponents/SuccessfullAlertComponent/SuccessFullAlertComponent";
import SpinnerComponent from "@/Components/DashboardComponents/SpinnerComponent/SpinnerComponent";
import { useRouter } from "next/navigation";
import { useUser, useAuth } from "@clerk/nextjs";

interface FormData {
  title: string;
  description: string;
  price: string;
  primaryColor: string;
  secondaryColor: string;
  yearProduced: string | number;
  hasLabel: string;
  hasOriginalBox: string;
  category: string; // Added for wedding categories
  weddingStyle: string; // Added for wedding style
  season: string; // Added for wedding season
  retailPrice: string; // Added for retail price comparison
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_FILES = 10;

const colorOptions = [
  { label: "⚫ Black", value: "black" },
  { label: "⚪ White", value: "white" },
  { label: "🔵 Blue", value: "blue" },
  { label: "🔴 Red", value: "red" },
  { label: "🟢 Green", value: "green" },
  { label: "🟡 Yellow", value: "yellow" },
  { label: "🌸 Pink", value: "pink" },
  { label: "🔘 Grey", value: "grey" },
  { label: "🟤 Brown", value: "brown" },
  { label: "🟠 Orange", value: "orange" },
  { label: "🟣 Purple", value: "purple" },
  { label: "🔵 Turquoise", value: "turquoise" },
  { label: "🎨 Other", value: "other" },
];

// Wedding category options
const categoryOptions = [
  { label: "Dresses", value: "dresses" },
  { label: "Decor", value: "decor" },
  { label: "Accessories", value: "accessories" },
  { label: "Flowers", value: "flowers" },
  { label: "Invitations", value: "invitations" },
  { label: "Gifts", value: "gifts" },
  { label: "Other", value: "other" },
];

// Wedding style options
const weddingStyleOptions = [
  { label: "Classic", value: "classic" },
  { label: "Modern", value: "modern" },
  { label: "Bohemian", value: "bohemian" },
  { label: "Vintage", value: "vintage" },
  { label: "Rustic", value: "rustic" },
  { label: "Glamorous", value: "glamorous" },
  { label: "Beach", value: "beach" },
  { label: "Other", value: "other" },
];

// Wedding season options
const seasonOptions = [
  { label: "Spring/Summer", value: "spring-summer" },
  { label: "Fall/Winter", value: "fall-winter" },
  { label: "All Seasons", value: "all-seasons" },
];

// Wedding condition options
const weddingConditionOptions = [
  { label: "New with tags", value: "new-with-tags" },
  { label: "Sample sale", value: "sample-sale" },
  { label: "Once worn", value: "once-worn" },
  { label: "Vintage", value: "vintage" },
  { label: "Like New", value: "like-new" },
  { label: "Excellent", value: "excellent" },
  { label: "Good", value: "good" },
];

const INITIAL_FORM_DATA: FormData = {
  title: "",
  description: "",
  price: "",
  primaryColor: "",
  secondaryColor: "",
  yearProduced: "",
  hasLabel: "No",
  hasOriginalBox: "No",
  category: "", // Added for wedding categories
  weddingStyle: "", // Added for wedding style
  season: "", // Added for wedding season
  retailPrice: "", // Added for retail price comparison
};

export default function CreateListing(): JSX.Element {
  const router = useRouter();
  const { getToken } = useAuth();
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [thumbnails, setThumbnails] = useState<string[]>([]);
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
  const [showAdditionalInfo, setShowAdditionalInfo] = useState<boolean>(false);
  const [toggleSign, setToggleSign] = useState<string>("+");
  const [condition, setCondition] = useState<string>("new-with-tags");

  useEffect(() => {
    loggedInFunctionCheck();
  }, []);

  const loggedInFunctionCheck = async () => {
    const token = await getToken();
    if (!token) {
      router.push("/sign-in");
      return;
    }
  };

  const resetForm = () => {
    setFormData(INITIAL_FORM_DATA);
    setSelectedFiles([]);
    setThumbnails([]);
    window.scrollTo(0, 0);
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
    e.stopPropagation();
    const newFiles = [...selectedFiles];
    newFiles.splice(index, 1);
    setSelectedFiles(newFiles);

    const newThumbnails = [...thumbnails];
    newThumbnails.splice(index, 1);
    setThumbnails(newThumbnails);
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === "price" || name === "retailPrice") {
      newValue = value.replace(/[^0-9]/g, "").replace(/^0+/, "");
    }

    setFormData((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!user) {
      console.error("User not authenticated");
      router.push("/sign-in");
      return;
    }

    if (
      formData.title.trim() === "" ||
      formData.description.trim() === "" ||
      selectedFiles.length === 0 ||
      formData.price === "" ||
      formData.category === ""
    ) {
      alert(`Please fill in all required fields.`);
      return;
    }

    setIsLoading(true);

    const token = await getToken();
    const data = new FormData();

    for (const key in formData) {
      let value = formData[key as keyof FormData];

      if (key === "primaryColor" && value === "") {
        value = "none chosen";
      }

      if (key === "secondaryColor" && value === "") {
        value = "none chosen";
      }

      if (key === "yearProduced") {
        value = value === "" || isNaN(Number(value)) ? -1 : Number(value);
      }

      if (key === "price") {
        const price = parseFloat(value as string).toFixed(2);
        if (isNaN(price as unknown as number) || Number(price) <= 0) {
          alert("Please enter a valid price.");
          setIsLoading(false);
          return;
        }
        value = price;
      }

      if (key === "retailPrice" && value !== "") {
        const retailPrice = parseFloat(value as string).toFixed(2);
        if (isNaN(retailPrice as unknown as number) || Number(retailPrice) <= 0) {
          alert("Please enter a valid retail price.");
          setIsLoading(false);
          return;
        }
        value = retailPrice;
      }

      data.append(key, value as string);
    }

    data.append("condition", condition);

    selectedFiles.forEach((file) => {
      data.append("images", file);
    });

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/create-new-listing`,
        {
          method: "POST",
          body: data,
          headers: { Authorization: `Bearer ${token}` },
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
        setFormData(INITIAL_FORM_DATA);
        setSelectedFiles([]);
        setThumbnails([]);
        setShowSuccess(true);
        window.scrollTo(0, 0);
        router.push("/my-listings");
      } else {
        console.error("Error submitting:", result);
        alert("There was a problem submitting your data. Please try again.");
      }
    } catch (error) {
      console.error("Network error:", error);
      alert("There was a network problem. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDismissSuccessAlert = () => {
    setShowSuccess(false);
  };

  const toggleAdditionalInfo = () => {
    setShowAdditionalInfo(!showAdditionalInfo);
    setToggleSign(showAdditionalInfo ? "+" : "-");
  };

  return (
    <div className="space-y-10 divide-y divide-gray-900/10">
      <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-3">
        <div className="px-4 sm:px-0">
          <button
            onClick={() => router.back()}
            className="mt-2 flex items-center justify-center p-2 rounded-full focus:outline-none focus:ring-inset"
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
          <h1 className="text-4xl font-bold tracking-tight mt-6">
            Create a wedding listing
          </h1>
          <p className="mt-1 text-sm leading-6">
            Fill in the following information to create a new wedding listing.
          </p>
        </div>
        <div>
          {showSuccess && (
            <SuccessFullAlertComponent
              message="Listing created successfully."
              onDismiss={handleDismissSuccessAlert}
            />
          )}
        </div>
        <form
          onSubmit={handleSubmit}
          className="bg-base-100 shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2"
        >
          <div className="px-4 py-6 sm:p-8">
            <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              {/* Title */}
              <div className="col-span-full">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium leading-6"
                >
                  Title
                  <span className="text-red-500" title="required">*</span>
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="title"
                    id="title"
                    autoComplete="title"
                    className="block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                    placeholder="Wedding dress, decor item, etc."
                    value={formData.title}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              {/* Wedding Category */}
              <div className="col-span-full">
                <label
                  htmlFor="category"
                  className="block text-sm font-medium leading-6"
                >
                  Wedding Category
                  <span className="text-red-500" title="required">*</span>
                </label>
                <div className="mt-2">
                  <select
                    id="category"
                    name="category"
                    autoComplete="category"
                    className="block pl-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="" disabled>Select a category</option>
                    {categoryOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              {/* Description */}
              <div className="col-span-full">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium leading-6"
                >
                  Description
                  <span className="text-red-500" title="required">*</span>
                </label>
                <div className="mt-2">
                  <textarea
                    id="description"
                    name="description"
                    rows={3}
                    className="block w-full rounded-md pl-3 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                    placeholder="Describe your wedding item in detail"
                    value={formData.description}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              {/* Price */}
              <div className="col-span-full sm:col-span-3">
                <label
                  htmlFor="price"
                  className="block text-sm font-medium leading-6"
                >
                  Your Price
                  <span className="text-red-500" title="required">*</span>
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
                    placeholder="Your selling price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                  />
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    <span className="text-gray-500 sm:text-sm">USD</span>
                  </div>
                </div>
              </div>
              
              {/* Retail Price */}
              <div className="col-span-full sm:col-span-3">
                <label
                  htmlFor="retailPrice"
                  className="block text-sm font-medium leading-6"
                >
                  Original Retail Price
                  <div className="ml-1 text-gray-400 cursor-help relative group inline-block">
                    <QuestionMarkCircleIcon className="h-3 w-3" />
                    <span className="absolute left-0 bottom-full mb-2 w-48 px-2 py-1 text-xs text-base-100 bg-black rounded invisible group-hover:visible">
                      The original retail price helps buyers see the value they're getting.
                    </span>
                  </div>
                </label>
                <div className="relative mt-2 rounded-md shadow-sm">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="number"
                    name="retailPrice"
                    id="retailPrice"
                    min="0"
                    max="1000000"
                    autoComplete="retailPrice"
                    className="block w-full rounded-md border-0 py-1.5 pl-7 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                    placeholder="Original retail price"
                    value={formData.retailPrice}
                    onChange={handleInputChange}
                  />
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    <span className="text-gray-500 sm:text-sm">USD</span>
                  </div>
                </div>
              </div>

              {/* Condition */}
              <div className="col-span-full">
                <label
                  htmlFor="condition"
                  className="block text-sm font-medium leading-6"
                >
                  Condition
                  <span className="text-red-500" title="required">*</span>
                </label>
                <div className="mt-2">
                  <select
                    id="condition"
                    name="condition"
                    autoComplete="condition"
                    className="block pl-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                    value={condition}
                    onChange={(e) => setCondition(e.target.value)}
                    required
                  >
                    {weddingConditionOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              {/* Wedding Style */}
              <div className="col-span-full sm:col-span-3">
                <label
                  htmlFor="weddingStyle"
                  className="block text-sm font-medium leading-6"
                >
                  Wedding Style
                </label>
                <div className="mt-2">
                  <select
                    id="weddingStyle"
                    name="weddingStyle"
                    autoComplete="weddingStyle"
                    className="block pl-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                    value={formData.weddingStyle}
                    onChange={handleInputChange}
                  >
                    <option value="" disabled>Select a style</option>
                    {weddingStyleOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              {/* Season */}
              <div className="col-span-full sm:col-span-3">
                <label
                  htmlFor="season"
                  className="block text-sm font-medium leading-6"
                >
                  Season
                </label>
                <div className="mt-2">
                  <select
                    id="season"
                    name="season"
                    autoComplete="season"
                    className="block pl-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                    value={formData.season}
                    onChange={handleInputChange}
                  >
                    <option value="" disabled>Select a season</option>
                    {seasonOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              {/* Image Upload */}
              <div className="col-span-full">
                <label
                  htmlFor="cover-photo"
                  className="block text-sm font-medium leading-6"
                >
                  Upload photos
                  <span className="text-red-500" title="required">*</span>
                </label>
                <ImageUploader
                  thumbnails={thumbnails}
                  handleRemove={(e, index) => handleRemove(e, index)}
                  handleFileChange={handleFileChange}
                  handleDragOver={handleDragOver}
                  handleDrop={handleDrop}
                />
              </div>
              
              {/* Additional Info Toggle */}
              <div
                className="text-sm col-span-full font-semibold leading-6 text-gray-900 cursor-pointer"
                onClick={toggleAdditionalInfo}
              >
                {toggleSign} Add additional information
              </div>
              
              {/* Additional Info Section */}
              {showAdditionalInfo && (
                <>
                  {/* Colors */}
                  <div className="col-span-full sm:col-span-6 flex flex-col sm:flex-row space-y-8 sm:space-y-0 sm:space-x-4">
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
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:max-w-xs sm:text-sm sm:leading-6"
                          value={formData.primaryColor}
                          onChange={handleInputChange}
                        >
                          <option value="" disabled>Choose one</option>
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
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:max-w-xs sm:text-sm sm:leading-6"
                          value={formData.secondaryColor || ""}
                          onChange={handleInputChange}
                        >
                          <option value="" disabled>Choose one</option>
                          {colorOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Year and Label */}
                  <div className="col-span-full sm:col-span-6 flex flex-col sm:flex-row space-y-8 sm:space-y-0 sm:space-x-4">
                    <div className="flex-1">
                      <label
                        htmlFor="yearProduced"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Year produced
                      </label>
                      <div className="mt-2">
                        <select
                          id="yearProduced"
                          name="yearProduced"
                          autoComplete="yearProduced"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:max-w-xs sm:text-sm sm:leading-6"
                          value={formData.yearProduced || ""}
                          onChange={handleInputChange}
                        >
                          <option value="" disabled>Choose one</option>
                          <option value="-1">Not sure</option>
                          {Array.from({ length: 35 }, (_, i) => 1990 + i).map((year) => (
                            <option key={year} value={year.toString()}>
                              {year}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="flex-1">
                      <label
                        htmlFor="hasLabel"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Comes with a label
                        <div className="ml-1 text-gray-400 cursor-help relative group inline-block">
                          <QuestionMarkCircleIcon className="h-3 w-3" />
                          <span className="absolute left-0 bottom-full mb-2 w-48 px-2 py-1 text-xs text-base-100 bg-black rounded invisible group-hover:visible">
                            With label on increases the value.
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
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Original Box */}
                  <div className="col-span-full sm:col-span-3">
                    <label
                      htmlFor="hasOriginalBox"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Comes in original box?
                      <div className="ml-1 text-gray-400 cursor-help relative group inline-block">
                        <QuestionMarkCircleIcon className="h-3 w-3" />
                        <span className="absolute left-0 bottom-full mb-2 w-48 px-2 py-1 text-xs text-base-100 bg-black rounded invisible group-hover:visible">
                          It will increase the value if it comes in the original box.
                        </span>
                      </div>
                    </label>
                    <div className="mt-2">
                      <select
                        id="hasOriginalBox"
                        name="hasOriginalBox"
                        autoComplete="hasOriginalBox"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:max-w-xs sm:text-sm sm:leading-6"
