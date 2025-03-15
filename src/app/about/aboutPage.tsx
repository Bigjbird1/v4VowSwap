"use server";

import MainLayout from "../SpeceficLayouts/MainLayout";
import Image from "next/image";

interface AboutProps {
  translations?: Record<string, any>;
}

export default async function About({ translations }: AboutProps) {
  return (
    <MainLayout>
      <div className="bg-base-100">
        <main className="isolate">
          <div className="relative isolate -z-10 overflow-hidden bg-gradient-to-b from-indigo-100/20 pt-14">
            <div
              className="absolute inset-y-0 right-1/2 -z-10 -mr-96 w-[200%] origin-top-right skew-x-[-30deg] bg-base-100 shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:-mr-80 lg:-mr-96"
              aria-hidden="true"
            />
            <div className="mx-auto max-w-7xl px-4 py-2 sm:px-6 sm:py-40 lg:px-8 ">
              <div className="mx-auto max-w-2xl lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-6 xl:grid-cols-1 xl:grid-rows-1 xl:gap-x-8">
                <h1 className="max-w-2xl text-4xl font-bold tracking-tight  sm:text-6xl lg:col-span-2 xl:col-auto">
                  About us
                </h1>
                <div className="mt-6 max-w-xl lg:mt-0 xl:col-end-1 xl:row-start-1">
                  <p className="text-lg leading-8 ">
                    We are a small team of passionate people who love Sneakers.
                    <br />
                    <br />
                    Sneakers for us are not just a piece of clothing, but a way
                    of life.
                    <br />
                    <br />
                    We believe that everyone should have the ability to wear the
                    sneakers they love.
                    <br />
                  </p>
                </div>

                <Image
                  src="https://res.cloudinary.com/dfb584zgd/image/upload/v1722859196/speed%20build%20marketplace/about-us-speed-build-marketplace.webp"
                  alt="About us"
                  width={600}
                  height={800}
                  className="mt-10 aspect-[4/5] w-full max-w-lg rounded-2xl object-cover sm:mt-16 lg:mt-0 lg:max-w-none xl:row-span-2 xl:row-end-2 xl:mt-36"
                />
              </div>
            </div>
            <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-white sm:h-32" />
          </div>
        </main>
      </div>
    </MainLayout>
  );
}
