import { InformationCircleIcon } from "@heroicons/react/20/solid";
import MainLayout from "@/app/SpeceficLayouts/MainLayout";
import Image from "next/image";

interface ClientBlogPostProps {
  params?: Record<string, any>;
  translations?: Record<string, any>;
}

export default function ClientBlogPost({
  params,
  translations,
}: ClientBlogPostProps): JSX.Element {
  return (
    <MainLayout>
      <div className="bg-white px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
          <p className="text-base font-semibold leading-7 text-gray-600">
            Example
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Title h1
          </h1>
          <p className="mt-6 text-xl leading-8">Blog post text</p>
          <figure className="mt-16">
            <Image
              className="aspect-video rounded-xl bg-gray-50 object-cover"
              src="https://res.cloudinary.com/dfb584zgd/image/upload/v1722859196/speed%20build%20marketplace/about-us-speed-build-marketplace.webp"
              alt="alt text"
              width={500}
            />
            <figcaption className="mt-4 flex gap-x-2 text-sm leading-6 text-gray-500">
              <InformationCircleIcon
                className="mt-0.5 h-5 w-5 flex-none text-gray-300"
                aria-hidden="true"
              />
              Image caption
            </figcaption>
          </figure>
          <div className="mt-10 max-w-2xl">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              H2 text
            </h2>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
