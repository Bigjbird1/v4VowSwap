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

const INITIAL_FORM_DATA: FormData = {
  title: "",
  description: "",
  price: "",
  primaryColor: "",
  secondaryColor: "",
  yearProduced: "",
  hasLabel: "No",
  hasOriginalBox: "No",
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
  const [condition, setCondition] = useState<string>("used");

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

    // Handle specific logic for certain inputs (e.g., price)
    if (name === "price") {
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
      formData.price === ""
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
            className="mt-2 flex items-center justify-center p-2  rounded-full  focus:outline-none  focus:ring-inset "
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
          <h1 className="text-4xl font-bold tracking-tight  mt-6">
            Create a new listing
          </h1>
          <p className="mt-1 text-sm leading-6 ">
            Fill in the following information to create a new listing.
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
          <div className="px-4 py-6 sm:p-8 ">
            <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 ">
              <div className="col-span-full">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium leading-6 "
                >
                  Title
                  <span className="text-red-500" title="required">
                    *
                  </span>
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="title"
                    id="title"
                    autoComplete="title"
                    className="block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                    placeholder="A title"
                    value={formData.title}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="col-span-full">
                <label
                  htmlFor="about"
                  className="block text-sm font-medium leading-6 "
                >
                  Description
                  <span className="text-red-500" title="required">
                    *
                  </span>
                </label>
                <div className="mt-2">
                  <textarea
                    id="description"
                    name="description"
                    rows={3}
                    className="block w-full rounded-md pl-3 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                    placeholder="A description"
                    value={formData.description}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="col-span-full">
                <label
                  htmlFor="price"
                  className="block text-sm font-medium leading-6 "
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
                    placeholder="Price"
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
                  className="block text-sm font-medium leading-6 "
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
                    className="block pl-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                    value={condition}
                    onChange={(e) => setCondition(e.target.value)}
                    required
                  >
                    <option value="used">Used</option>
                    <option value="new">New</option>
                  </select>
                </div>
              </div>
              <div className="col-span-full">
                <label
                  htmlFor="cover-photo"
                  className="block text-sm font-medium leading-6 "
                >
                  Upload photos
                  <span className="text-red-500" title="required">
                    *
                  </span>
                </label>

                <ImageUploader
                  thumbnails={thumbnails}
                  handleRemove={(e, index) => handleRemove(e, index)}
                  handleFileChange={handleFileChange}
                  handleDragOver={handleDragOver}
                  handleDrop={handleDrop}
                />
              </div>
              <div
                className="text-sm col-span-full font-semibold leading-6 text-gray-900 cursor-pointer"
                onClick={toggleAdditionalInfo}
              >
                {toggleSign} Add additional information
              </div>
              {showAdditionalInfo && (
                <>
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
                          className={`custom-select block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:max-w-xs sm:text-sm sm:leading-6 `}
                          value={formData.primaryColor}
                          onChange={handleInputChange}
                        >
                          <option value="" disabled>
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
                          <option value="" disabled>
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
                          <option value="2023">2024</option>
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
                          <span className="absolute left-0 bottom-full mb-2 w-48 px-2 py-1 text-xs text-base-100 rounded invisible group-hover:visible">
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
                          value={formData.hasLabel || ""}
                          onChange={handleInputChange}
                        >
                          <option value="" disabled>
                            Choose one
                          </option>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="col-span-full sm:col-span-6 flex flex-col sm:flex-row space-y-8 sm:space-y-0 sm:space-x-4">
                    <div className="flex-1">
                      <label
                        htmlFor="hasOriginalBox"
                        className="block text-sm font-medium leading-6 text-gray-900 relative"
                      >
                        Comes in original box?
                        <div className="ml-1 text-gray-400 cursor-help relative group inline-block">
                          <QuestionMarkCircleIcon className="h-3 w-3" />
                          <span className="absolute left-0 bottom-full mb-2 w-48 px-2 py-1 text-xs text-base-100 bg-black rounded invisible group-hover:visible">
                            It will increase the value if it comes in the
                            original box.
                          </span>
                        </div>
                      </label>
                      <div className="mt-2">
                        <select
                          id="hasOriginalBox"
                          name="hasOriginalBox"
                          autoComplete="hasOriginalBox"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:max-w-xs sm:text-sm sm:leading-6"
                          value={formData.hasOriginalBox || ""}
                          onChange={handleInputChange}
                        >
                          <option value="" disabled>
                            Choose one
                          </option>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
            <button
              type="button"
              className="text-sm font-semibold leading-6 text-gray-900"
              onClick={resetForm}
            >
              Reset
            </button>
            <button
              type="submit"
              className={`relative inline-flex justify-center items-center rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold  shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600 ${
                isLoading ? "cursor-not-allowed" : ""
              }`}
              disabled={isLoading}
            >
              <div
                className={`flex items-center transition-opacity duration-300 ${
                  isLoading ? "opacity-0" : "opacity-100"
                }`}
              >
                Save as draft
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
