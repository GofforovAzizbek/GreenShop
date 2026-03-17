import { useEffect } from "react";
import Sidebar from "./Sidebar";

export default function ResponsiveSidebar({
  isOpen,
  onClose,
  onOpen,
  ...sidebarProps
}) {
  useEffect(() => {
    if (!onClose) return;

    const handleResize = () => {
      // Automatically close the mobile drawer when switching to desktop layout
      if (window.innerWidth >= 1024) onClose();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [onClose]);

  return (
    <>
      {/* Desktop sidebar */}
      <div className="hidden lg:block">
        <Sidebar {...sidebarProps} />
      </div>

      {/* Mobile / tablet drawer */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition pointer-events-none ${
          isOpen ? "pointer-events-auto" : ""
        }`}
        aria-hidden={!isOpen}
      >
        <div
          className={`absolute inset-0 bg-black/40 transition-opacity ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={onClose}
        />

        <div
          className={`absolute left-0 top-0 h-full w-full max-w-sm bg-white shadow-xl transition-transform ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between border-b border-gray-100 p-4">
            <h2 className="text-lg font-semibold text-gray-800">Filters</h2>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-800"
              aria-label="Close filters"
            >
              ✕
            </button>
          </div>
          <div className="h-[calc(100%-56px)] overflow-y-auto p-4">
            <Sidebar
              {...sidebarProps}
              className="h-full max-w-none rounded-none shadow-none border-0"
            />
          </div>
        </div>
      </div>

      {/* Floating open button on mobile/tablet */}
      <button
        type="button"
        onClick={onOpen}
        className="fixed bottom-6 left-1/2 z-40 -translate-x-1/2 rounded-full bg-green-600 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-black/10 transition hover:bg-green-700 hidden"
      >
        Filters
      </button>
    </>
  );
}
