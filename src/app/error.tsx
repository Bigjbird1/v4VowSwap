"use client";
import MainLayout from "./SpeceficLayouts/MainLayout";
import Link from "next/link";

interface ErrorProps {
  statusCode: number;
}

export default function Error({ statusCode }: ErrorProps) {
  return (
    <MainLayout>
      <main className="grid min-h-screen place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            {statusCode
              ? `An error ${statusCode} occurred on server`
              : "An error occurred on client"}
          </h1>
          <p className="mt-6 text-base leading-7 text-gray-600">
            Sorry, something went wrong. Please try again later or contact
            support if the problem persists.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/"
              className="rounded-md bg-gray-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600"
            >
              Go back home
            </Link>
            <span className="text-sm font-semibold text-gray-500 ">
              <p>Or contact us at </p>
              <span className="font-bold hover:underline">
                example@example.com
              </span>
            </span>
          </div>
        </div>
      </main>
    </MainLayout>
  );
}

Error.getInitialProps = ({ res, err }: { res?: any; err?: any }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};
