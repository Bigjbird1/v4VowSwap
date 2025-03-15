import { Bars3Icon } from "@heroicons/react/24/outline";

interface TopBarProps {
  openSidebar: () => void;
}

function TopBar({ openSidebar }: TopBarProps) {
  return (
    <div className="sticky top-0 z-40 lg:mx-auto bg-base-100">
      <div className="flex h-16 items-center gap-x-4 border-b border-gray-200 bg-base-100 px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-0 lg:shadow-none">
        <button
          type="button"
          className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
          onClick={openSidebar}
        >
          <span className="sr-only">Open sidebar</span>
          <Bars3Icon className="h-6 w-6" aria-hidden="true" />
        </button>

        {/* Separator */}
        <div className="h-6 w-px bg-gray-200 lg:hidden" aria-hidden="true" />
      </div>
    </div>
  );
}

export default TopBar;
