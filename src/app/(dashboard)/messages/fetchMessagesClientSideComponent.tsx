"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import SuccessFullAlertComponent from "../../../Components/DashboardComponents/SuccessfullAlertComponent/SuccessFullAlertComponent";

interface Message {
  messageThreadId: string;
  message: string;
  createdAt: string;
  status: string;
  sellerName: string;
  buyerName: string;
}

interface Props {
  initialMessages: Message[];
}

export default function FetchMessagesClientSideComponent({
  initialMessages,
}: Props) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(
    null
  );
  const [open, setOpen] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const router = useRouter();
  const { getToken } = useAuth();

  useEffect(() => {
    router.refresh();
  }, []);

  const requestDelete = (messageId: string) => {
    setSelectedMessageId(messageId);
    setOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedMessageId) return;

    try {
      const token = await getToken();
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DELETE_SPECIFIC_MESSAGE_THREAD}/${selectedMessageId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete the conversation.");
      }

      setMessages(
        messages.filter(
          (message) => message.messageThreadId !== selectedMessageId
        )
      );
      setOpen(false);
      setSuccessMessage("Message thread deleted successfully.");
      setShowSuccessAlert(true);
      setTimeout(() => setShowSuccessAlert(false), 5000);
    } catch (error) {
      console.error("Error deleting conversation:", error);
    }
  };

  const statuses: Record<"approved" | "pending_review" | "active", string> = {
    approved: "text-green-700 bg-green-50 ring-green-600/20",
    pending_review: "text-yellow-800 bg-yellow-50 ring-yellow-600/20",
    active: "text-green-700 bg-green-50 ring-green-600/20",
  };

  const getStatusClass = (status: string): string => {
    if (status in statuses) {
      return statuses[status as "approved" | "pending_review" | "active"];
    }
    return "text-gray-500 bg-gray-100";
  };

  const formatStatusText = (status: string) => {
    switch (status) {
      case "approved":
        return "Approved";
      case "pending_review":
        return "Pending review";
      case "active":
        return "Ongoing chat";
      default:
        return "Unknown";
    }
  };

  const truncateMessage = (message: string, maxLength = 50) => {
    return message.length > maxLength
      ? message.substring(0, maxLength) + "..."
      : message;
  };

  return (
    <div className="bg-white sm:rounded-xl">
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-32">
        <DeleteConfirmationModal
          open={open}
          setOpen={setOpen}
          onConfirm={confirmDelete}
        />

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
        <div className="border-b border-gray-200 pb-4 sm:pb-10 mt-6">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
            Messages
          </h1>
          <p className="mt-2 sm:mt-4 text-base text-gray-500 mb-2">
            Here are all your messages.
          </p>
          {showSuccessAlert && (
            <SuccessFullAlertComponent
              message={successMessage}
              onDismiss={() => setShowSuccessAlert(false)}
            />
          )}
        </div>
        {isLoading && <div className="alert alert-info">Loading</div>}

        {!isLoading && messages.length === 0 ? (
          <div className="rounded-md bg-yellow-50 p-4 my-4">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm font-medium text-yellow-800">
                  You have no messages yet.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <ul role="list" className="divide-y divide-gray-100 pb-24 pt-4">
            {messages.map((message) => (
              <li
                key={message.messageThreadId}
                className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 py-4 sm:py-5 rounded-lg bg-white"
              >
                <div className="flex flex-col flex-1">
                  <div className="flex items-center flex-start">
                    <p
                      className={`${getStatusClass(
                        message.status
                      )} rounded-md whitespace-nowrap mb-1 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset sm:hidden `}
                    >
                      {formatStatusText(message.status)}
                    </p>
                  </div>
                  <div className="flex items-center flex-start">
                    <p className="text-sm font-semibold leading-6 text-gray-900">
                      {truncateMessage(message.message)}
                    </p>
                    <p
                      className={`${getStatusClass(
                        message.status
                      )} rounded-md whitespace-nowrap ml-2 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset sm:block hidden`}
                    >
                      {formatStatusText(message.status)}
                    </p>
                  </div>
                  <div className="mt-2 flex items-center gap-2 text-xs leading-5 text-gray-500">
                    <p className="whitespace-nowrap">
                      Sent on
                      <time dateTime={message.createdAt}>
                        {new Date(message.createdAt).toLocaleDateString()}
                      </time>
                    </p>
                    <p className="truncate">
                      {message.sellerName} | {message.buyerName}
                    </p>
                  </div>
                </div>
                <div className="mt-3 sm:mt-0 flex items-center gap-2">
                  {message.status !== "pending_review" ? (
                    <Link
                      href={`/messages/${message.messageThreadId}`}
                      className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:inline-block"
                    >
                      View message
                      <span className="sr-only">, {message.message}</span>
                    </Link>
                  ) : (
                    <div className="rounded-md bg-gray-100 px-2.5 py-1.5 text-sm font-semibold text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 sm:inline-block">
                      Pending approval
                    </div>
                  )}
                  <button
                    onClick={() => requestDelete(message.messageThreadId)}
                    className="rounded-full p-2 hover:bg-gray-200 text-gray-400 hover:text-gray-600"
                    aria-label="Delete conversation"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
