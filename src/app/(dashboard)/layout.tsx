"use client";

import "../../app/globals.css";
import { useState, Fragment, useEffect, ReactNode } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  XMarkIcon,
  HomeIcon,
  FolderIcon,
  BanknotesIcon,
  InboxIcon,
} from "@heroicons/react/24/outline";
import NavigationList from "../../Components/DashboardComponents/NavigationList/NavigationList";
import TopBar from "../../Components/DashboardComponents/TopBar/TopBar";
import { useRouter, usePathname } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

interface NavigationItem {
  name: string;
  href: string;
  icon: React.ElementType;
  current: boolean;
}

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useUser();
  const isAuthenticated = !!user;
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigation: NavigationItem[] = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: HomeIcon,
      current: true,
    },
    {
      name: "My listings",
      href: "/my-listings",
      icon: FolderIcon,
      current: false,
    },
    {
      name: "Create a listing",
      href: "/create-listing",
      icon: BanknotesIcon,
      current: false,
    },
    {
      name: "Messages",
      href: "/messages",
      icon: InboxIcon,
      current: false,
    },
  ];

  const [updatedNavigation, setUpdatedNavigation] = useState(navigation);

  useEffect(() => {
    if (user === undefined) return;
    if (!isAuthenticated) {
      router.push("/sign-in");
    }
  }, [isAuthenticated, user, router]);

  useEffect(() => {
    function getUpdatedNavigation() {
      return navigation.map((item) => ({
        ...item,

        current: item.href === pathname,
      }));
    }

    setUpdatedNavigation(getUpdatedNavigation());
  }, [pathname]);

  return (
    <div className="flex min-h-screen">
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50 lg:hidden"
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 " />
          </Transition.Child>

          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                    <button
                      type="button"
                      className="-m-2.5 p-2.5"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XMarkIcon className="h-6 w-6 " aria-hidden="true" />
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-base-100  px-6 pb-4">
                  <div className="flex h-16 shrink-0 items-center">
                    <Link href={"/"} className="-m-1.5 p-1.5">
                      <span className="sr-only">Marketplace</span>
                    </Link>
                  </div>
                  <div>
                    <Link href={"/"} className="-m-1.5 p-1.5">
                      <span className="text-sm ">← Take me back</span>
                    </Link>
                  </div>
                  <NavigationList navigation={updatedNavigation} />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="hidden flex-shrink-0 lg:flex custom-sidebar-width border-r border-gray-200  mt-10">
        <div className="flex flex-col gap-y-5 overflow-y-auto px-6 pb-4 h-full custom-sidebar-width ">
          MARKETPLACE
          <div>
            <Link href={"/"} className="-m-1.5 p-1.5">
              <span className="text-xs ">← Take me back</span>
            </Link>
          </div>
          <div className="mt-4">
            <NavigationList navigation={updatedNavigation} />
          </div>
        </div>
      </div>

      {/* TopBar and main content */}
      <div className="flex flex-col w-full">
        <TopBar openSidebar={() => setSidebarOpen(true)} />

        <main className="flex-grow py-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
