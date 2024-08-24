"use client";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  ChangeEvent,
} from "react";
import SuccessFullAlertComponent from "@/Components/DashboardComponents/SuccessfullAlertComponent/SuccessFullAlertComponent";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useAuth } from "@clerk/nextjs";
import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";
import Image from "next/image";

const libraries: "places"[] = ["places"];

interface UserInfoClientSideProps {
  formData: {
    about: string;
    emailReminders: boolean;
    address: string;
    city: string;
    postalCode: string;
    country: string;
    email: string;
    firstName: string;
  };
  imageURL: string;
  imageALT: string;
}

export default function UserInfoClientSideComponent({
  formData: initialFormData,
  imageURL: initialImageURL,
  imageALT: initialImageALT,
}: UserInfoClientSideProps) {
  const router = useRouter();
  const { user } = useUser();
  const { getToken } = useAuth();

  const { isLoaded: isGoogleMapsLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries,
  });

  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [newImage, setNewImage] = useState<File | null>(null);
  const [imageURL, setImageURL] = useState<string>(initialImageURL);
  const [imageALT, setImageALT] = useState<string>(initialImageALT);
  const [formData, setFormData] = useState(initialFormData);
  const [autocomplete, setAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);
  const [inputValue, setInputValue] = useState<string>(formData.address || "");

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setImageURL(initialImageURL);
    setImageALT(initialImageALT);
    setFormData(initialFormData);
  }, [initialImageURL, initialImageALT, initialFormData]);

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, emailReminders: e.target.checked });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setNewImage(file);
      setImageALT(formData.firstName || "Profile Image");
    }
  };

  const handleImageUploadClick = () => {
    document.getElementById("image-upload")!.click();
  };

  const handleOnPlaceChanged = useCallback(() => {
    if (!autocomplete) return;
    const place = autocomplete.getPlace();
    if (!place || !place.address_components) return;

    const addressComponents = place.address_components;
    const street =
      addressComponents.find((comp) => comp.types.includes("route"))
        ?.long_name || "";
    const streetNumber =
      addressComponents.find((comp) => comp.types.includes("street_number"))
        ?.long_name || "";
    const city =
      addressComponents.find(
        (comp) =>
          comp.types.includes("locality") || comp.types.includes("postal_town")
      )?.long_name || "";
    const zip =
      addressComponents.find((comp) => comp.types.includes("postal_code"))
        ?.long_name || "";
    const country =
      addressComponents.find((comp) => comp.types.includes("country"))
        ?.short_name || "";

    setFormData((prevDetails) => ({
      ...prevDetails,
      address: `${street} ${streetNumber}`.trim(),
      city,
      postalCode: zip,
      country,
    }));
    setInputValue(`${street} ${streetNumber}`.trim());
  }, [autocomplete]);

  const handleAutocompleteLoad = useCallback(
    (autocompleteInstance: google.maps.places.Autocomplete) => {
      setAutocomplete(autocompleteInstance);
    },
    []
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Tab" || e.key === "Enter") {
        if (autocomplete && autocomplete.getPlace()) {
          handleOnPlaceChanged();
        }
      }
    };

    if (inputRef.current) {
      inputRef.current.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      if (inputRef.current) {
        inputRef.current.removeEventListener("keydown", handleKeyDown);
      }
    };
  }, [autocomplete, handleOnPlaceChanged]);

  const handleSave = async () => {
    setLoading(true);

    if (!user) {
      router.push("/sign-in");
      return;
    }

    const token = await getToken();

    const form = new FormData();
    form.append("about", formData.about);
    form.append("emailReminders", String(formData.emailReminders));
    form.append("address", formData.address);
    form.append("city", formData.city);
    form.append("postalCode", formData.postalCode);
    form.append("country", formData.country);

    if (newImage) {
      form.append("image", newImage);
      form.append("imageAlt", imageALT);
    } else if (imageURL) {
      form.append("existingImageUrl", imageURL);
    }

    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_UPDATE_USER_INFO_URL!,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: form,
        }
      );
      const data = await response.json();
      if (response.ok) {
        setSuccessMessage(
          data.message || "User information updated successfully"
        );
        setShowAlert(true);
        window.scrollTo(0, 0);
        router.refresh();
      } else {
        alert("Failed to update user information.");
      }
    } catch (error) {
      console.error("Error updating user info:", error);
      alert(
        "An error occurred while updating your information. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDismissAlert = () => {
    setShowAlert(false);
  };

  return (
    <>
      <div className="mb-6">
        {showAlert && (
          <SuccessFullAlertComponent
            message={successMessage}
            onDismiss={handleDismissAlert}
          />
        )}
      </div>
      <div className="space-y-10 divide-y divide-gray-900/10 ">
        <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-3">
          <div className="px-4 sm:px-0">
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
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 mt-6">
              Profile
            </h1>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Help buyers get to know you better! Update your profile with a
              brief bio and a photo. A complete profile builds trust and
              confidence in your interactions.
            </p>
          </div>

          <form className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
            <div className="px-4 py-6 sm:p-8">
              <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="col-span-full">
                  <div className="flex items-center justify-left">
                    <label
                      htmlFor="email-reminders"
                      className="text-sm font-medium leading-6 text-gray-900 pr-3"
                    >
                      Recieve emails about new listings
                    </label>
                    <input
                      id="email-reminders"
                      name="emailReminders"
                      type="checkbox"
                      checked={formData.emailReminders}
                      onChange={handleCheckboxChange}
                      className="h-4 w-4 text-gray-600 focus:ring-gray-500 border-gray-300 rounded"
                    />
                  </div>
                </div>
                <div className="col-span-full">
                  <label
                    htmlFor="about"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    About
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="about"
                      name="about"
                      rows={3}
                      value={formData.about}
                      onChange={(e) =>
                        setFormData({ ...formData, about: e.target.value })
                      }
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                      placeholder="Write some lines about yourself."
                    />
                  </div>
                  <p className="mt-3 text-sm leading-6 text-gray-600">
                    Write a few lines about yourself.
                  </p>
                </div>
                <div className="sm:col-span-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Email address
                    <span className="ml-2 inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-700">
                      Cannot be changed here
                    </span>
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      readOnly
                      autoComplete="email"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6 bg-gray-100"
                    />
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="photo"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Photo
                  </label>
                  <div className="mt-2 flex items-center gap-x-3">
                    <input
                      type="file"
                      id="image-upload"
                      style={{ display: "none" }}
                      accept="image/jpeg, image/png"
                      onChange={handleImageChange}
                    />
                    {newImage ? (
                      <Image
                        src={URL.createObjectURL(newImage)}
                        alt={formData.firstName || "Profile Image"}
                        width={48}
                        height={48}
                        className="h-12 w-12 rounded-full"
                      />
                    ) : imageURL ? (
                      <Image
                        src={imageURL}
                        width={48}
                        height={48}
                        alt={formData.firstName || "Profile Image"}
                        className="h-12 w-12 rounded-full"
                      />
                    ) : (
                      <UserCircleIcon
                        className="h-12 w-12 text-gray-300"
                        aria-hidden="true"
                      />
                    )}

                    <button
                      type="button"
                      onClick={handleImageUploadClick}
                      className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    >
                      Change
                    </button>
                  </div>
                </div>
                <div className="col-span-full">
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Address
                  </label>
                  {isGoogleMapsLoaded && (
                    <Autocomplete
                      onLoad={handleAutocompleteLoad}
                      onPlaceChanged={handleOnPlaceChanged}
                      options={{
                        componentRestrictions: { country: [] },
                      }}
                      fields={["address_components", "geometry"]}
                    >
                      <input
                        type="text"
                        name="address"
                        id="address"
                        ref={inputRef}
                        value={inputValue}
                        onChange={(e) => {
                          setInputValue(e.target.value);
                          setFormData((prevDetails) => ({
                            ...prevDetails,
                            address: e.target.value,
                          }));
                        }}
                        className="block w-full rounded-md border-0 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                        placeholder="Your street address and number"
                        required
                      />
                    </Autocomplete>
                  )}
                  {!isGoogleMapsLoaded && <p>Loading...</p>}
                </div>
                {formData.address && (
                  <>
                    <div className="col-span-full">
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        City
                      </label>
                      <div className="mt-2">
                        <input
                          id="city"
                          name="city"
                          type="text"
                          value={formData.city}
                          readOnly
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6 bg-gray-100"
                        />
                      </div>
                    </div>
                    <div className="col-span-full">
                      <label
                        htmlFor="postalCode"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Postal code
                      </label>
                      <div className="mt-2">
                        <input
                          id="postalCode"
                          name="postalCode"
                          type="text"
                          value={formData.postalCode}
                          readOnly
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6 bg-gray-100"
                        />
                      </div>
                    </div>
                    <div className="col-span-full">
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Country
                      </label>
                      <div className="mt-2">
                        <input
                          id="country"
                          name="country"
                          type="text"
                          value={formData.country}
                          readOnly
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6 bg-gray-100"
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
              <button
                type="button"
                onClick={handleSave}
                disabled={loading}
                className={`rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {loading ? "Loading" : "Save"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
