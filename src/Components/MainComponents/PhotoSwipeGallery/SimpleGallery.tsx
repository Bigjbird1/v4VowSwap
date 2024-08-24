import React, { useEffect } from "react";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import "photoswipe/style.css";
import Image from "next/image";

interface Image {
  largeURL: string;
  thumbnailURL: string;
  width: number;
  height: number;
}

interface SimpleGalleryProps {
  galleryID: string;
  images: Image[];
}

export default function SimpleGallery({
  galleryID,
  images,
}: SimpleGalleryProps) {
  useEffect(() => {
    let lightbox: PhotoSwipeLightbox | null = new PhotoSwipeLightbox({
      gallery: `#${galleryID}`,
      children: "a",
      pswpModule: () => import("photoswipe"),
    });
    lightbox.init();

    return () => {
      if (lightbox) {
        lightbox.destroy();
        lightbox = null;
      }
    };
  }, [galleryID]);

  return (
    <div
      className="pswp-gallery h-full w-full object-cover object-center sm:rounded-lg"
      id={galleryID}
    >
      {images.map((image, index) => (
        <a
          href={image.largeURL}
          data-pswp-width={image.width}
          data-pswp-height={image.height}
          key={`${galleryID}-${index}`}
          target="_blank"
          rel="noreferrer"
        >
          <Image
            className="h-full w-full object-cover object-center sm:rounded-lg"
            src={image.thumbnailURL}
            alt=""
          />
        </a>
      ))}
    </div>
  );
}
