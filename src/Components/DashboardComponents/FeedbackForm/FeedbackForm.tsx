import { Fragment, useState, useEffect, ChangeEvent, FormEvent } from "react";
import { Dialog, Transition } from "@headlessui/react";

interface FeedbackFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (feedbackData: any) => void;
  tradePartners: { id: string; name: string }[];
  listingId: string;
  sellerId: string;
  isBuyerFeedback?: boolean;
  buyerId?: string;
}

export default function FeedbackForm({
  isOpen,
  onClose,
  onSubmit,
  tradePartners,
  listingId,
  sellerId,
  isBuyerFeedback = false,
  buyerId,
}: FeedbackFormProps) {
  const [saleExperienceFromSeller, setSaleExperienceFromSeller] =
    useState<number>(5);
  const [saleExperienceFromBuyer, setSaleExperienceFromBuyer] =
    useState<number>(5);
  const [finalSalePrice, setFinalSalePrice] = useState<string>("");
  const [feedbackFromSeller, setFeedbackFromSeller] = useState<string>("");
  const [feedbackFromBuyer, setFeedbackFromBuyer] = useState<string>("");
  const [selectedPartner, setSelectedPartner] = useState<string>("");
  const [isSubmissionComplete, setIsSubmissionComplete] =
    useState<boolean>(false);

  useEffect(() => {
    if (isBuyerFeedback) {
      setSaleExperienceFromSeller(0); // Set it to 0 or any default for buyer feedback
      setFeedbackFromSeller("");
    }
  }, [isBuyerFeedback]);

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedPartner(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isBuyerFeedback && !selectedPartner) {
      alert("Please choose the one you traded with.");
      return;
    }

    if (!isBuyerFeedback && !saleExperienceFromSeller) {
      alert("Please rate your experience.");
      return;
    }

    const feedbackData = isBuyerFeedback
      ? {
          seller: sellerId,
          buyer: buyerId,
          saleExperienceFromBuyer,
          feedbackFromBuyer,
          listingId,
        }
      : {
          seller: sellerId,
          buyer:
            selectedPartner !== "not-on-list" ? selectedPartner : undefined,
          saleExperienceFromSeller,
          feedbackFromSeller,
          listingId,
        };

    onSubmit(feedbackData);
    setIsSubmissionComplete(true);
    onClose();
  };

  useEffect(() => {
    if (!isOpen) {
      setSaleExperienceFromSeller(5);
      setFinalSalePrice("");
      setFeedbackFromSeller("");
      setSelectedPartner("");
    }
  }, [isOpen]);

  const handleClose = () => {
    if (isSubmissionComplete) {
      onClose();
    }
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={handleClose}>
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 transition-opacity" />
            </Transition.Child>

            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="translate-y-0 sm:scale-100"
              leaveTo="translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="flex justify-between items-start">
                    <Dialog.Title
                      as="h3"
                      className="text-lg leading-6 font-medium text-gray-900"
                    >
                      Give rating
                    </Dialog.Title>
                  </div>
                  <div className="mt-2">
                    <form onSubmit={handleSubmit}>
                      {!isBuyerFeedback && (
                        <div className="mb-4">
                          <label
                            htmlFor="trade-partner"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Choose the one you traded with{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <select
                            id="trade-partner"
                            name="trade-partner"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                            value={selectedPartner}
                            onChange={handleSelectChange}
                          >
                            <option value="" disabled>
                              Choose one
                            </option>
                            {tradePartners.map((partner) => (
                              <option key={partner.id} value={partner.id}>
                                {partner.name}
                              </option>
                            ))}
                            <option value="not-on-list">Not on the list</option>
                          </select>
                        </div>
                      )}

                      <div className="mb-4">
                        <label
                          htmlFor="sale-experience"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Rate Experience (1-5, with 5 being Excellent){" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <select
                          id="sale-experience"
                          name="sale-experience"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                          value={
                            isBuyerFeedback
                              ? saleExperienceFromBuyer
                              : saleExperienceFromSeller
                          }
                          onChange={(e) =>
                            isBuyerFeedback
                              ? setSaleExperienceFromBuyer(
                                  parseInt(e.target.value, 10)
                                )
                              : setSaleExperienceFromSeller(
                                  parseInt(e.target.value, 10)
                                )
                          }
                        >
                          {[1, 2, 3, 4, 5].map((number) => (
                            <option key={number} value={number}>
                              {number}
                            </option>
                          ))}
                        </select>
                      </div>

                      {!isBuyerFeedback && (
                        <div className="mb-4">
                          <label
                            htmlFor="final-sale-price"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Final Sale Price
                          </label>
                          <div className="relative mt-2 rounded-md shadow-sm">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                              <span className="text-gray-500 sm:text-sm">
                                €
                              </span>
                            </div>
                            <input
                              type="number"
                              id="final-sale-price"
                              name="final-sale-price"
                              className="block w-full rounded-md border-0 py-1.5 pl-7 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                              placeholder="0.00"
                              value={finalSalePrice}
                              onChange={(e) =>
                                setFinalSalePrice(e.target.value)
                              }
                            />
                          </div>
                        </div>
                      )}

                      <div className="mb-4">
                        <label
                          htmlFor="feedback-from-seller"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Leave a Review
                        </label>
                        <textarea
                          id="feedback-from-seller"
                          name="feedback-from-seller"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                          value={
                            isBuyerFeedback
                              ? feedbackFromBuyer
                              : feedbackFromSeller
                          }
                          onChange={(e) =>
                            isBuyerFeedback
                              ? setFeedbackFromBuyer(e.target.value)
                              : setFeedbackFromSeller(e.target.value)
                          }
                        />
                      </div>

                      <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button
                          type="submit"
                          className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gray-600 text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:ml-3 sm:w-auto sm:text-sm"
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
