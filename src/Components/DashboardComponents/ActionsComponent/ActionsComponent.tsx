import {
  UserIcon,
  BanknotesIcon,
  FolderIcon,
  InboxIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { FC } from "react";

interface Action {
  title: string;
  description: string;
  href: string;
  icon: FC<React.SVGProps<SVGSVGElement>>;
  iconForeground: string;
  iconBackground: string;
}

function classNames(...classes: (string | boolean | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

const actions: Action[] = [
  {
    title: "My Listings",
    description: "Manage your listings.",
    href: "/my-listings",
    icon: FolderIcon,
    iconForeground: "text-purple-700",
    iconBackground: "bg-purple-50",
  },
  {
    title: "Create a Listing",
    description: "Create a new listing.",
    href: "/create-listing",
    icon: BanknotesIcon,
    iconForeground: "text-purple-700",
    iconBackground: "bg-purple-50",
  },
  {
    title: "Messages",
    description: "View your messages.",
    href: "/messages",
    icon: InboxIcon,
    iconForeground: "text-purple-700",
    iconBackground: "bg-purple-50",
  },
  {
    title: "User Info",
    description: "View and edit your user information.",
    href: "/user-info",
    icon: UserIcon,
    iconForeground: "text-purple-700",
    iconBackground: "bg-purple-50",
  },
];

export default function ActionsComponent() {
  return (
    <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-gray-200 shadow sm:grid sm:grid-cols-2 sm:gap-px sm:divide-y-0">
      {actions.map((action, actionIdx) => (
        <div
          key={action.title}
          className={classNames(
            actionIdx === 0
              ? "rounded-tl-lg rounded-tr-lg sm:rounded-tr-none"
              : "",
            actionIdx === 1 ? "sm:rounded-tr-lg" : "",
            actionIdx === actions.length - 2 ? "sm:rounded-bl-lg" : "",
            actionIdx === actions.length - 1
              ? "rounded-bl-lg rounded-br-lg sm:rounded-bl-none"
              : "",
            "group relative bg-base-100 p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-gray-500"
          )}
        >
          <div>
            <span
              className={classNames(
                action.iconBackground,
                action.iconForeground,
                "inline-flex rounded-lg p-3 ring-4 ring-base-100"
              )}
            >
              <action.icon className="h-6 w-6" aria-hidden="true" />
            </span>
          </div>
          <div className="mt-8">
            <h3 className="text-base font-semibold leading-6 ">
              <Link href={action.href}>
                <span className="absolute inset-0" aria-hidden="true" />
                {action.title}
              </Link>
            </h3>
            <p className="mt-2 text-sm ">{action.description}</p>
          </div>
          <span
            className="pointer-events-none absolute bottom-6 right-6 text-gray-300 group-hover:text-gray-400 transition-transform transform group-hover:rotate-45"
            aria-hidden="true"
          >
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
            </svg>
          </span>
        </div>
      ))}
    </div>
  );
}
