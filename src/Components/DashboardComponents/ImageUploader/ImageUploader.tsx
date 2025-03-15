import React, { DragEvent, ChangeEvent, MouseEvent } from "react";
import { PhotoIcon, XCircleIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

interface ImageUploaderProps {
  thumbnails: string[];
  handleRemove: (e: MouseEvent<HTMLButtonElement>, index: number) => void;
  handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleDragOver: (e: DragEvent<HTMLDivElement>) => void;
  handleDrop: (e: DragEvent<HTMLDivElement>) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  thumbnails,
  handleRemove,
  handleFileChange,
  handleDragOver,
  handleDrop,
}) => {
  return (
    <div
      className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="text-center">
        <div
          className={
            thumbnails.length > 0 ? "flex flex-wrap gap-2 mt-2" : "text-center"
          }
        >
          {thumbnails.length > 0 ? (
            thumbnails.map((thumbnail, index) => (
              <div key={index} className="relative">
                <Image
                  src={thumbnail}
                  alt={`Uploaded preview ${index + 1}`}
                  className="h-12 w-12 rounded"
                />
                <button
                  type="button"
                  className="absolute top-0 right-0 p-0.5"
                  onClick={(e) => handleRemove(e, index)}
                >
                  <XCircleIcon
                    className="h-5 w-5 text-red-500"
                    aria-hidden="true"
                  />
                </button>
              </div>
            ))
          ) : (
            <PhotoIcon
              className="mx-auto h-12 w-12 text-gray-300"
              aria-hidden="true"
            />
          )}
        </div>

        <div className="mt-4 flex text-sm leading-6 text-gray-600">
          <label
            htmlFor="file-upload"
            className="relative cursor-pointer rounded-md bg-base-100 font-semibold text-gray-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-gray-600 focus-within:ring-offset-2 hover:text-gray-500"
          >
            <span>Upload pictures </span>
            <input
              id="file-upload"
              name="file-upload"
              type="file"
              accept=".png, .jpg, .jpeg"
              multiple
              className="sr-only"
              onChange={handleFileChange}
            />
          </label>
          <p className="pl-1">or drag and drop them</p>
        </div>
        <p className="text-xs leading-5 text-gray-600">
          PNG, JPG, JPEG up to 5MB
        </p>
      </div>
    </div>
  );
};

export default ImageUploader;
