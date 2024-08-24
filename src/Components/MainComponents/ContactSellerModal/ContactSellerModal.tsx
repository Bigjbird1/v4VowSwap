import React, { useState, useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import MessageForm from "../../../Components/CheckoutComponents/MessageForm/MessageForm";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";

interface ListingData {
  _id: string;
  sellerFirstname: string;
  title: string;
  image: string;
}

interface ContactSellerModalProps {
  isOpen: boolean;
  onClose: () => void;
  listingData: ListingData | null;
  onSuccess: (message: string) => void;
  onError: (message: string) => void;
}

const ContactSellerModal: React.FC<ContactSellerModalProps> = ({
  isOpen,
  onClose,
  listingData,
  onSuccess,
  onError,
}) => {
  const [message, setMessage] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { user, isSignedIn } = useUser();

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || "");
      setEmail(user.primaryEmailAddress?.emailAddress || "");
    }
  }, [user]);

  if (!isOpen || !listingData) return null;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    const formData = {
      emailAddress: email,
      firstName: firstName,
      message,
      listingId: listingData._id,
    };

    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_SEND_A_MESSAGE_TO_THE_SELLER as string,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();

      if (result.success) {
        onSuccess("Message sent");
        setMessage("");
      } else {
        onError("Message failed to send");
      }
    } catch (error) {
      console.error("Error submitting message:", error);
      onError(
        "An error occurred while sending your message. Please try again."
      );
    } finally {
      setIsSubmitting(false);
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-30 z-40"
      onClick={onClose}
    >
      <div
        className={`bg-white shadow sm:rounded-lg relative mx-auto sm:max-w-3xl ${
          isOpen ? "h-full overflow-auto sm:h-auto w-full" : "h-auto"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-4 py-5 sm:p-6 mt-4">
          <h3 className="text-base font-semibold leading-6 text-gray-900">
            Contact {listingData.sellerFirstname} regarding &quot;
            {listingData.title}
            &quot;
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="mt-3">
              <label htmlFor="name" className="sr-only">
                First Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                placeholder="First Name"
                readOnly={isSignedIn}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="mt-3">
              <label htmlFor="email" className="sr-only">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                placeholder="Email address"
                value={email}
                readOnly={isSignedIn}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mt-3">
              <MessageForm
                required={true}
                message={message}
                onMessageChange={setMessage}
                placeholder="Your message"
              />
            </div>
            <button
              type="submit"
              className="mt-4 inline-flex items-center justify-center w-full rounded-md px-3 py-3 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 bg-green-600 hover:bg-green-500"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send message"}
            </button>
          </form>
          <div className="mt-4">
            <Image
              src={listingData.image}
              alt={`Image for ${listingData.title}`}
              className="mx-auto h-40 w-auto"
            />
          </div>
        </div>
        <button
          onClick={onClose}
          className="absolute top-0 right-0 m-4 text-gray-400 hover:text-gray-600"
        >
          <XMarkIcon className="h-6 w-6" aria-hidden="true" />
          <span className="sr-only">Close</span>
        </button>
      </div>
    </div>
  );
};

export default ContactSellerModal;
