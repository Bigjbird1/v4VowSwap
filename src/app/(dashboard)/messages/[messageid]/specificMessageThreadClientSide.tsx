"use client";

import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { UserCircleIcon, PaperClipIcon } from "@heroicons/react/24/solid";
import { useUser, useAuth } from "@clerk/nextjs";
import DOMPurify from "isomorphic-dompurify";
import Image from "next/image";

interface Message {
  userImage?: {
    url: string;
    alt?: string;
  };
  firstName: string;
  lastName: string;
  createdAt: string;
  message: string;
  imageUrl?: string;
}

interface ListingDetails {
  title: string;
  description: string;
  price: number;
  photos: { url: string }[];
}

interface SpecificMessageThreadClientSideProps {
  messages: Message[];
  listingDetails: ListingDetails | null;
  messageid: string;
}

export default function SpecificMessageThreadClientSide({
  messages: initialMessages,
  listingDetails: initialListingDetails,
  messageid,
}: SpecificMessageThreadClientSideProps) {
  const router = useRouter();
  const { user } = useUser();
  const { getToken } = useAuth();

  const [messages, setMessages] = useState<Message[]>(initialMessages || []);
  const [isLoading, setIsLoading] = useState(
    !initialMessages || !initialListingDetails
  );
  const [comment, setComment] = useState("");
  const [listingDetails, setListingDetails] = useState<ListingDetails | null>(
    initialListingDetails || null
  );
  const [isSending, setIsSending] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  useEffect(() => {
    setMessages(initialMessages);
    setListingDetails(initialListingDetails);
    setIsLoading(false);
  }, [initialMessages, initialListingDetails]);

  useEffect(() => {
    return () => {
      if (previewImage) {
        URL.revokeObjectURL(previewImage);
        setPreviewImage(null);
      }
    };
  }, [previewImage]);

  const fetchMessages = async () => {
    const token = await getToken();
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_FETCH_A_SPECIFIC_MESSAGE_THREAD}/${messageid}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            cache: "no-cache",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setMessages(data);
      if (data.length > 0 && data[0].listingId) {
        setListingDetails(data[0].listingId);
      }
    } catch (error) {
      console.error("Error fetching message thread:", error);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!comment.trim()) {
      alert("Please enter a message before sending.");
      return;
    }

    if (!user) {
      console.error("User not authenticated");
      router.push("/sign-in");
      return;
    }

    setIsSending(true);

    const formData = new FormData();
    formData.append("messageThreadId", messageid);
    formData.append("message", comment);
    if (image) {
      formData.append("image", image);
    }

    const token = await getToken();

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_POST_A_NEW_MESSAGE_IN_A_THREAD}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      setComment("");
      setImage(null);
      (document.getElementById("file-input") as HTMLInputElement).value = ""; // Reset file input
      setPreviewImage(null);
      URL.revokeObjectURL(previewImage!);

      await fetchMessages();
    } catch (error) {
      console.error("Error posting comment:", error);
      alert("Failed to send the message. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString();
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      const previewUrl = URL.createObjectURL(e.target.files[0]);
      setPreviewImage(previewUrl);
    }
  };

  function transformImageUrl(url: string): string {
    const transformationString = "q_auto,f_auto,w_500";
    const parts = url.split("/upload/");
    return `${parts[0]}/upload/${transformationString}/${parts[1]}`;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="bg-white sm:rounded-xl">
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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

        {listingDetails && (
          <div className="border-b border-gray-200 pb-10 mb-10">
            <h2 className="text-2xl font-bold text-gray-900">
              {listingDetails.title}
            </h2>
            <p className="text-md text-gray-500">
              {listingDetails.description}
            </p>
            <p className="text-lg font-semibold text-gray-900">
              €{listingDetails.price}
            </p>
            {listingDetails.photos && listingDetails.photos.length > 0 && (
              <Image
                src={listingDetails.photos[0].url}
                alt={listingDetails.title}
                className="mt-4 w-full object-cover h-64 rounded-lg"
              />
            )}
          </div>
        )}

        <div className="border-b border-gray-200 pb-10 mt-6">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            Message thread
          </h1>
        </div>

        <ul role="list" className="space-y-6">
          {messages.map((message, index) => (
            <li key={index} className="relative flex gap-x-4 mt-10">
              <div>
                {message.userImage ? (
                  <Image
                    src={message.userImage.url}
                    alt={message.userImage.alt || "User profile picture"}
                    className="h-6 w-6 rounded-full"
                  />
                ) : (
                  <UserCircleIcon className="h-6 w-6 text-gray-500" />
                )}
              </div>
              <div className="flex-auto rounded-md p-3 ring-1 ring-inset ring-gray-200">
                <div className="flex justify-between gap-x-4">
                  <div className="py-0.5 text-xs leading-5 text-gray-500">
                    <span className="font-medium text-gray-900">
                      {message.firstName} {message.lastName}
                    </span>
                  </div>
                  <time
                    dateTime={message.createdAt}
                    className="flex-none py-0.5 text-xs leading-5 text-gray-500"
                  >
                    {formatDate(message.createdAt)}
                  </time>
                </div>
                <div
                  className="text-sm leading-6 text-gray-500"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(message.message),
                  }}
                />
                {message.imageUrl && (
                  <Image
                    src={transformImageUrl(message.imageUrl)}
                    alt="Attached image"
                    className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl max-h-48 object-contain rounded-md"
                  />
                )}
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-6">
          <form onSubmit={handleSubmit} className="relative mb-10">
            <input
              type="file"
              onChange={handleImageChange}
              accept="image/*"
              style={{ display: "none" }}
              id="file-input"
            />
            <div className="rounded-lg shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-gray-600">
              <textarea
                name="comment"
                id="comment"
                className="block w-full resize-none border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                placeholder="Write your message..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                style={{ minHeight: "6rem" }}
              />
            </div>

            <div className="flex justify-between items-center mt-2">
              <button
                type="button"
                className={`flex items-center justify-center rounded-full text-gray-400 hover:text-gray-500 ${
                  previewImage ? "cursor-not-allowed opacity-50" : ""
                }`}
                onClick={() => {
                  if (!previewImage) {
                    document.getElementById("file-input")?.click();
                  }
                }}
                disabled={!!previewImage}
              >
                <PaperClipIcon className="h-5 w-5" aria-hidden="true" />
                <span className="sr-only">Attach a file</span>
              </button>
              <button
                type="submit"
                className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                disabled={isSending}
              >
                {isSending ? "Sending..." : "Send message"}
              </button>
            </div>

            {previewImage && (
              <div className="relative mt-4 flex flex-col items-center">
                <p className="text-sm text-gray-600 mb-2">
                  Attaching this image:
                </p>
                <div className="relative">
                  <Image
                    src={previewImage}
                    alt="Image preview"
                    className="h-auto max-w-full max-h-48 object-contain rounded-md"
                  />
                  <button
                    onClick={() => {
                      setPreviewImage(null);
                      setImage(null);
                      const inputElement = document.getElementById(
                        "file-input"
                      ) as HTMLInputElement;
                      if (inputElement) {
                        inputElement.value = "";
                      }
                    }}
                    className="absolute top-0 right-0 bg-gray-200 p-1 rounded-full text-black hover:bg-gray-300"
                    aria-label="Remove image"
                    style={{ transform: "translate(50%, -50%)" }}
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </main>
    </div>
  );
}
