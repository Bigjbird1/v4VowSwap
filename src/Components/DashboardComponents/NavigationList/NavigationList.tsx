import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { ElementType } from "react";

function classNames(...classes: (string | boolean)[]) {
  return classes.filter(Boolean).join(" ");
}

interface NavigationItem {
  name: string;
  href: string;
  icon: ElementType;
  current?: boolean;
}

interface NavigationListProps {
  navigation: NavigationItem[];
}

function NavigationList({ navigation }: NavigationListProps) {
  const pathname = usePathname();

  const updatedNavigation = navigation.map((item) => ({
    ...item,
    current: item.href === pathname,
  }));

  return (
    <nav className="flex flex-1 flex-col">
      <ul role="list" className="flex flex-1 flex-col gap-y-7">
        <li>
          <ul role="list" className="-mx-2 space-y-1">
            {updatedNavigation.map((item) => (
              <li key={item.name}>
                <Link href={item.href}>
                  <span
                    className={classNames(
                      item.current
                        ? "bg-gray-50 text-gray-600"
                        : "text-gray-700 hover:text-gray-600 hover:bg-gray-50",
                      "group flex items-center gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold cursor-pointer"
                    )}
                  >
                    <item.icon
                      className={classNames(
                        item.current
                          ? "text-gray-600"
                          : "text-gray-400 group-hover:text-gray-600",
                        "h-6 w-6 shrink-0"
                      )}
                      aria-hidden="true"
                    />
                    {item.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </li>

        {/* Log out button */}
        <li>
          <div>
            <UserButton afterSignOutUrl="/" />
          </div>
        </li>
      </ul>
    </nav>
  );
}

export default NavigationList;
